import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  SCENE IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 36/SVG/Asset 1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CELL_BORDER_COLOR   = "#2195a6";   // أزرق فاتح — مطابق للصورة
const CELL_BG_DEFAULT     = "#d3e1e5";
const CELL_BG_SELECTING   = "#b2dfdb";
const CELL_TEXT_SELECTING = "#004d40";
const CELL_TEXT_WRONG     = "#b71c1c";
const CELL_TEXT_DEFAULT   = "#263238";
const CELL_TEXT_FOUND     = "#ffffff";
const WORD_LIST_BORDER    = "#2195a6";
const WORD_TEXT_COLOR     = "#37474f";

const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e",
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  الجدول 8×8 — مطابق للصورة حرفاً بحرف
// ─────────────────────────────────────────────
const GRID = [
  ["o","p","i","c","n","i","c","c"],
  ["l","s","o","t","c","i","o","m"],
  ["t","h","l","o","u","s","u","c"],
  ["y","o","u","n","g","e","s","t"],
  ["o","r","a","r","m","o","i","f"],
  ["v","t","a","o","l","c","n","g"],
  ["e","e","e","v","s","h","e","y"],
  ["r","r","l","e","a","v","e","a"],
];

const COLS = GRID[0].length; // 8

// مسارات الكلمات — [row, col] تبدأ من 0
const WORD_DEFS = [
  { word: "picnic",   cells: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]] },          // أفقي صف 0
  { word: "cousin",   cells: [[0,6],[1,6],[2,6],[3,6],[4,6],[5,6]] },           // عمودي col 7
  { word: "shorter",  cells: [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]] },     // عمودي col 1
  { word: "youngest", cells: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]] },// أفقي صف 3
  { word: "over",     cells: [[4,0],[5,0],[6,0],[7,0]] },                        // عمودي col 0
  { word: "hey",      cells: [[6,5],[6,6],[6,7]] },                              // أفقي صف 6
  { word: "leave",    cells: [[7,2],[7,3],[7,4],[7,5],[7,6]] },                  // أفقي صف 7
];

const WORD_LIST = [
  "cousin","leave","over","shorter","youngest","hey","picnic",
];

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
    if ([...selectedSet].every((k) => defSet.has(k))) return def;
  }
  return null;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_FindCircleWords_QB() {
  const [selecting,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]);
  const [wrongFlash,  setWrongFlash]  = useState(false);
  const [answerShown, setAnswerShown] = useState(false);

  const foundNames = new Set(foundWords.map((f) => f.word));

  // خريطة: cellKey → [color, ...]
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

  // ── Handlers ──
  const handleMouseDown  = (r, c) => { setSelecting(true); setStartCell([r, c]); setHoveredCell([r, c]); };
  const handleMouseEnter = (r, c) => { if (selecting) setHoveredCell([r, c]); };

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

  const getCellStyle = (key, isSel, isWrong) => {
    if (isWrong) return { background: "#ffcdd2" };
    if (isSel)   return { background: CELL_BG_SELECTING };
    const colors = foundCellMap[key];
    if (!colors?.length) return { background: CELL_BG_DEFAULT };
    if (colors.length === 1) return { background: colors[0] };
    const step  = 100 / colors.length;
    const stops = colors.flatMap((c, i) => [
      `${c} ${(i * step).toFixed(1)}%`,
      `${c} ${((i + 1) * step).toFixed(1)}%`,
    ]);
    return { background: `linear-gradient(135deg, ${stops.join(", ")})` };
  };

  return (
    <div
      className="main-container-component"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { if (selecting) handleMouseUp(); }}
    >
      <style>{`
        /* ── Layout: grid | word-list | scene ── */
        .fcwb-body {
          display: flex;
          align-items: flex-start;
          gap: clamp(14px, 2vw, 28px);
          flex-wrap: nowrap;
        }

        /* ── الجدول ── */
        .fcwb-grid {
          display: grid;
          grid-template-columns: repeat(${COLS}, 1fr);
          border: 2px solid ${CELL_BORDER_COLOR};
          border-radius: 10px;
          overflow: hidden;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
          flex-shrink: 0;
        }

        .fcwb-cell {
          width:  clamp(36px, 4.6vw, 58px);
          height: clamp(36px, 4.6vw, 58px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 1.7vw, 22px);
          font-weight: 700;
          color: ${CELL_TEXT_DEFAULT};
          border-right:  1.5px solid ${CELL_BORDER_COLOR};
          border-bottom: 1.5px solid ${CELL_BORDER_COLOR};
          background: ${CELL_BG_DEFAULT};
          transition: background 0.1s, color 0.1s;
        }

        /* آخر عمود وآخر صف بدون border */
        .fcwb-cell:nth-child(${COLS}n)            { border-right: none; }
        .fcwb-cell:nth-last-child(-n+${COLS})      { border-bottom: none; }

        .fcwb-cell--selecting { color: ${CELL_TEXT_SELECTING}; }
        .fcwb-cell--wrong     { color: ${CELL_TEXT_WRONG} !important; }
        .fcwb-cell--found     { color: ${CELL_TEXT_FOUND}; }

        /* ── قائمة الكلمات ── */
        .fcwb-word-list {
          border: 2px solid ${WORD_LIST_BORDER};
          border-radius: 14px;
          padding: clamp(10px, 1.4vw, 18px) clamp(16px, 2vw, 26px);
          display: flex;
          flex-direction: column;
          gap: clamp(30px, 0.9vw, 30px);
          min-width: clamp(110px, 13vw, 155px);
          align-self: center;
              background-color: #d3e1e5;

        }

        .fcwb-word-item {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 600;
          color: ${WORD_TEXT_COLOR};
          text-align: center;
          line-height: 1.5;
          transition: opacity 0.25s;
          user-select: none;
        }

        .fcwb-word-item--found {
          text-decoration: line-through;
          opacity: 0.35;
        }

        /* ── الصورة ── */
        .fcwb-scene {
          flex: 1;
          min-width: clamp(160px, 22vw, 280px);
          align-self: center;
        }

        .fcwb-scene-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* ── Buttons ── */
        .fcwb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .fcwb-body { flex-direction: column; }
          .fcwb-scene { min-width: unset; width: 100%; }
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
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">B</span>
          Find and circle the words.
        </h1>

        {/* ── Body: grid | word-list | scene ── */}
        <div className="fcwb-body">

          {/* الجدول */}
          <div className="fcwb-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key      = cellKey(r, c);
                const colors   = foundCellMap[key];
                const isFound  = colors && colors.length > 0;
                const isSel    = selectionKeys.has(key) && !isFound;
                const isWrong  = isSel && wrongFlash;
                const isSeling = isSel && !wrongFlash;

                return (
                  <div
                    key={key}
                    className={[
                      "fcwb-cell",
                      isFound  ? "fcwb-cell--found"     : "",
                      isSeling ? "fcwb-cell--selecting" : "",
                      isWrong  ? "fcwb-cell--wrong"     : "",
                    ].filter(Boolean).join(" ")}
                    style={getCellStyle(key, isSeling, isWrong)}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

          {/* قائمة الكلمات */}
       
   <div className="fcwb-word-list">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={`fcwb-word-item ${foundNames.has(w) ? "fcwb-word-item--found" : ""}`}
              >
                {w}
              </span>
            ))}
          </div>
          {/* الصورة */}
          <div className="fcwb-scene">
            <img src={imgScene} alt="scene" className="fcwb-scene-img" />
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="fcwb-buttons">
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