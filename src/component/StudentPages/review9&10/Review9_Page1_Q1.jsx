import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CELL_BORDER_COLOR   = "#2096a6";
const CELL_BG_DEFAULT     = "#e8eff1";
const CELL_BG_SELECTING   = "#b2dfdb";
const CELL_TEXT_SELECTING = "#004d40";
const CELL_BG_WRONG       = "#ffcdd2";
const CELL_TEXT_WRONG     = "#b71c1c";
const CELL_TEXT_DEFAULT   = "#263238";
const CELL_TEXT_FOUND     = "#ffffff";
const WORD_TEXT_COLOR     = "#37474f";

const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e","#039be5",
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const GRID = [
  ["c","a","l","l","s","e","a","d","w"],
  ["h","r","e","b","t","e","e","o","t"],
  ["o","o","m","e","o","h","r","e","t"],
  ["r","o","t","h","s","r","r","m","d"],
  ["e","m","a","i","o","e","e","i","v"],
  ["s","m","n","m","m","u","r","d","e"],
  ["g","i","o","h","m","g","r","o","o"],
  ["f","t","o","g","e","t","h","e","r"],
  ["v","i","d","e","o","g","a","m","e"],
];

const WORD_DEFS = [
  // calls: row 0, cols 0-4 →
  { word: "calls",      cells: [[0,0],[0,1],[0,2],[0,3],[0,4]] },
  // chores: col 0, rows 0-5 ↓
  { word: "chores",     cells: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]] },
  // room: col 1, rows 1-4 ↓
  { word: "room",       cells: [[1,1],[2,1],[3,1],[4,1]] },
  // together: row 7, cols 1-8 →
  { word: "together",   cells: [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]] },
  // video game: row 8, cols 0-8 →
  { word: "video game", cells: [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]] },
  // bored: diagonal ↓→ rows 1-5, cols 3-7
  { word: "bored",      cells: [[1,3],[2,4],[3,5],[4,6],[5,7]] },
  // tomorrow: diagonal ↓← rows 1-7, cols 8-2 (NOT found valid — kept as placeholder)
  // finished: diagonal ↑→ rows 7-0, cols 0-7
  { word: "finished",   cells: [[7,0],[6,1],[5,2],[4,3],[3,4],[2,5],[1,6],[0,7]] },
  // hour: diagonal ↓→ rows 3-6, cols 3-6
  { word: "hour",       cells: [[3,3],[4,4],[5,5],[6,6]] },
];

// Words shown in the word list panel (must match WORD_DEFS)
const WORD_LIST = WORD_DEFS.map((d) => d.word);

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const cellKey = (r, c) => `${r}-${c}`;

const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr  = b[0] - a[0];
  const dc  = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

const checkSelection = (cells, foundNames) => {
  if (cells.length === 0) return null;
  const selectedSet = new Set(cells.map(([r, c]) => `${r}-${c}`));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const defSet = new Set(def.cells.map(([r, c]) => `${r}-${c}`));
    const isMatch = [...selectedSet].every((k) => defSet.has(k));
    if (isMatch) return def;
  }
  return null;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WordSearch_QK() {
  const [selecting,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]);
  const [wrongFlash,  setWrongFlash]  = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const foundNames = new Set(foundWords.map((f) => f.word));

  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selectionCells = getCellsBetween(startCell, hoveredCell);
  const selectionKeys  = new Set(selectionCells.map(([r, c]) => cellKey(r, c)));

  const handleMouseDown = (r, c) => {
    setSelecting(true);
    setStartCell([r, c]);
    setHoveredCell([r, c]);
  };

  const handleMouseEnter = (r, c) => {
    if (selecting) setHoveredCell([r, c]);
  };

  const handleMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);
    if (selectionCells.length > 1) {
      const match = checkSelection(selectionCells, foundNames);
      if (match) {
        const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
        setFoundWords((prev) => [...prev, { word: match.word, cells: match.cells, color }]);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
      }
    }
    setStartCell(null);
    setHoveredCell(null);
  };

  const handleReset = () => {
    setAnswerShown(false);
    setFoundWords([]);
    setStartCell(null);
    setHoveredCell(null);
    setSelecting(false);
    setWrongFlash(false);
  };

  const handleShowAnswer = () => {
    setAnswerShown(true);
    setFoundWords(
      WORD_DEFS.map((def, i) => ({
        word:  def.word,
        cells: def.cells,
        color: FOUND_COLORS[i % FOUND_COLORS.length],
      }))
    );
  };

  const handleCheck = () => {
    if (answerShown) return;
    if (foundNames.size < WORD_DEFS.length) {
      ValidationAlert.info("Please find all words first.");
    } else {
      ValidationAlert.success(`Score: ${WORD_DEFS.length} / ${WORD_DEFS.length}`);
    }
  };

  const getCellStyle = (key, isSelecting, isWrong) => {
    if (isWrong)     return { background: CELL_BG_WRONG };
    if (isSelecting) return { background: CELL_BG_SELECTING };
    const colors = foundCellMap[key];
    if (!colors || colors.length === 0) return { background: CELL_BG_DEFAULT };
    if (colors.length === 1) return { background: colors[0] };
    const step = 100 / colors.length;
    const stops = colors.flatMap((c, i) => [
      `${c} ${(i * step).toFixed(1)}%`,
      `${c} ${((i + 1) * step).toFixed(1)}%`,
    ]);
    return { background: `linear-gradient(135deg, ${stops.join(", ")})` };
  };

  const COLS = GRID[0].length;

  return (
    <div
      className="main-container-component"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { if (selecting) handleMouseUp(); }}
    >
      <style>{`
        .wsk-body {
          display: flex;
          gap: clamp(20px, 3vw, 48px);
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .wsk-word-list {
          margin: 2em 0;
          border: 2px solid ${CELL_BORDER_COLOR};
          border-radius: 14px;
          padding: clamp(12px, 1.6vw, 20px) clamp(16px, 2vw, 26px);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: clamp(110px, 15vw, 160px);
          flex-shrink: 0;
          background: ${CELL_BG_DEFAULT};
        }
        .wsk-word-item {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 700;
          color: ${WORD_TEXT_COLOR};
          line-height: 1.3;
          transition: opacity 0.25s;
          user-select: none;
          align-self: center;
        }
        .wsk-word-item--found {
          text-decoration: line-through;
          opacity: 0.38;
        }
        .wsk-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          gap: 0;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
          border: 2px solid ${CELL_BORDER_COLOR};
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .wsk-cell {
          width:  clamp(30px, 3.8vw, 46px);
          height: clamp(30px, 3.8vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${CELL_TEXT_DEFAULT};
          border-right: 1px solid ${CELL_BORDER_COLOR};
          border-bottom: 1px solid ${CELL_BORDER_COLOR};
          background: ${CELL_BG_DEFAULT};
          transition: background 0.1s, color 0.1s;
          position: relative;
        }
        .wsk-cell:nth-child(${COLS}n) { border-right: none; }
        .wsk-cell:nth-child(n+${COLS * (GRID.length - 1) + 1}) { border-bottom: none; }
        .wsk-cell--selecting { color: ${CELL_TEXT_SELECTING}; }
        .wsk-cell--wrong     { color: ${CELL_TEXT_WRONG} !important; }
        .wsk-cell--found     { color: ${CELL_TEXT_FOUND}; }
        .wsk-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
        @keyframes wsk-pop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @media (max-width: 600px) {
          .wsk-body { flex-direction: column; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 24px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">B</span>
          Find and circle the words.
        </h1>

        {/* Body */}
        <div className="wsk-body">

          {/* Word list */}
          <div className="wsk-word-list">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={`wsk-word-item ${foundNames.has(w) ? "wsk-word-item--found" : ""}`}
              >
                {w}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="wsk-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key         = cellKey(r, c);
                const foundColors = foundCellMap[key];
                const isFound     = foundColors && foundColors.length > 0;
                const isSel       = selectionKeys.has(key) && !isFound;
                const isWrong     = isSel && wrongFlash;
                const isSelecting = isSel && !wrongFlash;

                return (
                  <div
                    key={key}
                    className={[
                      "wsk-cell",
                      isFound     ? "wsk-cell--found"     : "",
                      isSelecting ? "wsk-cell--selecting" : "",
                      isWrong     ? "wsk-cell--wrong"     : "",
                    ].filter(Boolean).join(" ")}
                    style={getCellStyle(key, isSelecting, isWrong)}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="wsk-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>

      </div>
    </div>
  );
}