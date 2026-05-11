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
const WORD_LIST_BORDER    = "#2096a6";
const WORD_TEXT_COLOR     = "#37474f";

const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e","#039be5",
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// Grid from the book image (8 cols × 8 rows)
const GRID = [
  ["y","g","g","l","s","s","c","g"],
  ["s","u","u","r","r","t","s","e"],
  ["d","e","l","d","y","u","t","s"],
  ["t","s","l","l","s","m","r","c"],
  ["s","s","a","r","r","b","a","a"],
  ["r","e","e","n","o","l","n","r"],
  ["a","r","c","s","c","e","g","y"],
  ["p","o","n","d","k","d","e","a"],
];

// Word paths verified against the grid image:
// guess    → col 1, rows 0–4 (vertical down): g,u,e,s,s
// stumbled → col 5, rows 0–7 (vertical down): s,t,u,m,b,l,e,d
// strange  → col 6, rows 1–7 (vertical down): s,t,r,a,n,g,e
// scary    → col 7, rows 2–6 (vertical down): s,c,a,r,y
// pond     → row 7, cols 0–3 (horizontal):    p,o,n,d
// rock     → diagonal down-right from [1,4]:  r[1,4],o[2,?]...
//            best match: [4,3]→[5,2]→[6,1]→? or [1,4]r,[2,3]d no
//            After careful check: r[5,0],o—not available.
//            Using [4,4]=r,[5,3]=n — no. 
//            r[6,1],[7,0] — no o.
//            Visible in image: diagonal circle middle-area.
//            [3,3]=l,[4,2]=a... 
//            Best match found: [1,3]=r,[2,2]=l — no.
//            rock: r[4,3],o[5,4],c[6,5]? [6,5]=e — no.
//            r[4,4],o[5,5]? [5,5]=l — no.
//            Diagonal up: r[6,1],o[5,0]=r — no.
//            Checking [5,4]=o: up-left: [4,3]=r ✓, [5,4]=o ✓, [6,5]=e — no c.
//            [5,4]=o, [6,3]=s — no.
//            Only valid rock path: r[1,4],o—next diagonal...
//            [1,4]=r,[2,5]=u no. [1,3]=r down: [2,3]=d no.
//            Given grid, rock may be: [4,4]r,[3,3]l — reversed?
//            Checking UP diagonal [7,3]=d going up-left — pond area.
//            
//            FINAL: From image the diagonal circle covers approx rows 4–7, cols 0–3 area
//            but pond is there. The other diagonal covers col area 3-6.
//            r[1,4],o[2,3]=d no. r[4,3],o[5,2]=e no. r[4,4],o[5,3]=n no.
//            
//            Conclusion: "rock" must go diagonally up-right or another direction.
//            r[7,0]=p no. Checking all diagonals for r,o,c,k:
//            [5,0]r→ down-right: [6,1]r,[7,2]n — no
//            [6,1]r→ up-right: [5,2]e,[4,3]r,[3,4]s — no  
//            [3,6]r→ down-left: [4,5]b — no; up-left: [2,5]u — no
//            [1,3]r→ down-right: [2,4]y — no; down-left: [2,2]l — no
//            [1,4]r→ down-left: [2,3]d — no; up-right→ out of bounds
//            [4,3]r→ up-left: [3,2]l — no; up-right: [3,4]s — no
//            [4,4]r→ up-left: [3,3]l — no; down-right: [5,5]l — no; down-left: [5,3]n — no; up-right: [3,5]m — no
//            [5,7]r→ up-left: [4,6]a,[3,5]m — no; up-right→ out; down-left: [6,6]g — no
//            
//            There is NO valid path for "rock" in this grid.
//            The word list and grid in the original code are WRONG/placeholder data.
//            Using the image word list: strange, scary, rock, stumbled, guess, pond
//            rock path needs to be confirmed with actual book answer key.
//            Placeholder: using [4,3],[5,2],[6,1] reversed = r,e,r — wrong.
//            
//            Setting rock as best-effort diagonal [1,4],[2,3],[3,2],[4,1] = r,d,l,s — wrong.
//            
//            NOTE TO DEVELOPER: "rock" path cannot be verified from this grid.
//            Please confirm with the answer key. Marked as TODO below.

const WORD_DEFS = [
  // guess: col 1, rows 0–4 ↓
  { word: "guess",    cells: [[0,1],[1,1],[2,1],[3,1],[4,1]] },
  // stumbled: col 5, rows 0–7 ↓
  { word: "stumbled", cells: [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5]] },
  // strange: col 6, rows 1–7 ↓
  { word: "strange",  cells: [[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6]] },
  // scary: col 7, rows 2–6 ↓
  { word: "scary",    cells: [[2,7],[3,7],[4,7],[5,7],[6,7]] },
  // pond: row 7, cols 0–3 →
  { word: "pond",     cells: [[7,0],[7,1],[7,2],[7,3]] },
  // rock: TODO — confirm with answer key.
  // Best guess from image diagonal circle (middle area):
  // Trying [0,2],[1,3],[2,4],[3,5] = g,r,y,m — no
  // Trying [2,0],[3,1],[4,2],[5,3] = d,s,a,n — no
  // Leaving as placeholder — update when answer key confirmed:
  { word: "rock",     cells: [[4,4],[5,4],[6,4],[7,4]] },
  // Note: [3,6]=r,[4,5]=b,[5,4]=o,[6,3]=s — still wrong.
  // This entry MUST be updated with the correct answer key path.
];

const WORD_LIST = ["strange","scary","rock","stumbled","guess","pond"];

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

  // The grid is 8 columns wide
  const COLS = GRID[0].length; // 8

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
        margin : 2em 0;
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
        .wsk-congrats {
          text-align: center;
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 800;
          color: #27ae60;
          animation: wsk-pop 0.4s ease both;
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