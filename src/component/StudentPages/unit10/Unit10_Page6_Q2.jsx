import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgIndia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 2.svg";
import imgEgypt from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 3.svg";
import imgSaudiArabia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 4.svg";
import imgAustralia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 5.svg";
import imgMorocco from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 6.svg";

const CELL_BORDER = "#2096a6";
const CELL_BG = "#e8eff1";
const CELL_SEL_BG = "#b2dfdb";
const CELL_SEL_TEXT = "#004d40";
const CELL_WRONG_BG = "#ffcdd2";
const CELL_WRONG_TX = "#b71c1c";
const CELL_DEF_TEXT = "#263238";
const CELL_FND_TEXT = "#ffffff";
const WORD_TEXT = "#37474f";
const CHECK_COLOR = "#c81e1e";
const INPUT_UL = "#3f3f3f";
const INPUT_UL_ERR = "#ef4444";
const ANSWER_COLOR = "#c81e1e";
const BADGE_BG = "#ef4444";
const BADGE_TEXT = "#ffffff";

const FOUND_COLORS = ["#e53935", "#e67e22", "#43a047", "#1e88e5", "#8e24aa"];

const GRID = [
  ["i", "p", "b", "t", "i", "g", "e", "r", "s", "t"],
  ["q", "v", "y", "e", "z", "a", "s", "t", "l", "e"],
  ["n", "p", "y", "r", "a", "m", "i", "d", "s", "y"],
  ["s", "k", "o", "d", "e", "s", "e", "r", "t", "g"],
  ["t", "l", "k", "o", "a", "l", "a", "v", "x", "f"],
];
const COLS = GRID[0].length;

const WORD_DEFS = [
  {
    word: "tiger",
    cells: [
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
  },
  {
    word: "pyramids",
    cells: [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ],
  },
  {
    word: "desert",
    cells: [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
    ],
  },
  {
    word: "koala",
    cells: [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
    ],
  },
];
const WORD_LIST = ["tiger", "pyramids", "camel", "desert", "koala"];

const COUNTRIES = [
  { name: "India", src: imgIndia },
  { name: "Egypt", src: imgEgypt },
  { name: "Saudi Arabia", src: imgSaudiArabia },
  { name: "Australia", src: imgAustralia },
  { name: "Morocco", src: imgMorocco },
];

const CORRECT_COUNTRIES = new Set([
  "India",
  "Egypt",
  "Saudi Arabia",
  "Australia",
]);

const SENTENCE_PREFIX =
  "Use the puzzle and countries above to help you. Louis is a pilot. Louis hasn't been to";
const SENTENCE_CORRECT = ["washed the dishes.", "washed the dishes"];
const SENTENCE_ANSWER = "washed the dishes.";

const cellKey = (r, c) => `${r}-${c}`;

const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr = b[0] - a[0],
    dc = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc))
    return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr),
    sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

const checkMatch = (cells, foundNames) => {
  if (!cells.length) return null;
  const sel = new Set(cells.map(([r, c]) => `${r}-${c}`));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const ds = new Set(def.cells.map(([r, c]) => `${r}-${c}`));
    if ([...sel].every((k) => ds.has(k))) return def;
  }
  return null;
};

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const isSentOk = (v) =>
  SENTENCE_CORRECT.some((c) => normalize(v) === normalize(c));

export default function WB_WordSearch_QE() {
  const [selecting, setSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [checked, setChecked] = useState(new Set());
  const [sentVal, setSentVal] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const foundNames = new Set(foundWords.map((f) => f.word));

  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selCells = getCellsBetween(startCell, hovered);
  const selKeys = new Set(selCells.map(([r, c]) => cellKey(r, c)));

  const onMouseDown = (r, c) => {
    if (showAns) return;
    setSelecting(true);
    setStartCell([r, c]);
    setHovered([r, c]);
  };
  const onMouseEnter = (r, c) => {
    if (selecting) setHovered([r, c]);
  };
  const onMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);
    if (selCells.length > 1) {
      const m = checkMatch(selCells, foundNames);
      if (m) {
        const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
        setFoundWords((p) => [...p, { word: m.word, cells: m.cells, color }]);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
      }
    }
    setStartCell(null);
    setHovered(null);
  };

  const toggleCountry = (name) => {
    if (showAns) return;
    setChecked((p) => {
      const n = new Set(p);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const handleCheck = () => {
    if (showAns) return;
    if (!sentVal.trim()) {
      ValidationAlert.info("Please complete the sentence.");
      return;
    }
    setShowRes(true);
    isSentOk(sentVal)
      ? ValidationAlert.success("Correct!")
      : ValidationAlert.error("Check your answer.");
  };

  const handleShowAnswer = () => {
    setShowAns(true);
    setShowRes(false);
    setSentVal(SENTENCE_ANSWER);
    setFoundWords(
      WORD_DEFS.map((def, i) => ({
        word: def.word,
        cells: def.cells,
        color: FOUND_COLORS[i % FOUND_COLORS.length],
      })),
    );
    setChecked(new Set(CORRECT_COUNTRIES));
  };

  const handleReset = () => {
    setFoundWords([]);
    setChecked(new Set());
    setSentVal("");
    setShowRes(false);
    setShowAns(false);
    setWrongFlash(false);
    setStartCell(null);
    setHovered(null);
    setSelecting(false);
  };

  const getCellStyle = (key, isSel, isWrong) => {
    if (isWrong) return { background: CELL_WRONG_BG };
    if (isSel) return { background: CELL_SEL_BG };
    const colors = foundCellMap[key];
    if (!colors || !colors.length) return { background: CELL_BG };
    if (colors.length === 1) return { background: colors[0] };
    const step = 100 / colors.length;
    const stops = colors.flatMap((c, i) => [
      `${c} ${(i * step).toFixed(1)}%`,
      `${c} ${((i + 1) * step).toFixed(1)}%`,
    ]);
    return { background: `linear-gradient(135deg,${stops.join(",")})` };
  };

  const sentWrong = showRes && !showAns && !isSentOk(sentVal);
  const sentDisabled = showAns || (showRes && isSentOk(sentVal));

  return (
    <div
      className="main-container-component"
      onMouseUp={onMouseUp}
      onMouseLeave={() => {
        if (selecting) onMouseUp();
      }}
    >
      <style>{`
        .wse-countries{display:flex;gap:clamp(10px,1.4vw,20px);align-items:flex-start;flex-wrap:wrap;width:100%;}
        .wse-country{display:flex;flex-direction:column;align-items:center;gap:clamp(4px,0.6vw,8px);flex:1;min-width:clamp(65px,9vw,120px);}
        .wse-cimg{width:100%;height:clamp(50px,7.5vw,105px);object-fit:cover;border-radius:8px;border:2px solid #e5e7eb;display:block;}
        .wse-cname{font-size:clamp(10px,1.1vw,13px);color:#2b2b2b;font-weight:500;text-align:center;line-height:1.3;}
        .wse-ccheck{width:clamp(24px,3vw,36px);height:clamp(24px,3vw,36px);border-radius:50%;border:2px solid #2195a6
;background:#fff;display:flex;align-items:center;justify-content:center;font-size:clamp(13px,1.8vw,21px);font-weight:900;color:${CHECK_COLOR};cursor:pointer;transition:border-color 0.15s;user-select:none;}
        .wse-ccheck--locked{cursor:default;}
        .wse-body{display:flex;gap:clamp(16px,2.4vw,40px);align-items:flex-start;flex-wrap:wrap;}
        .wse-wlist{border:2px solid ${CELL_BORDER};border-radius:12px;padding:clamp(10px,1.3vw,16px) clamp(12px,1.6vw,20px);display:flex;flex-direction:column;gap:13px;min-width:clamp(75px,9vw,120px);flex-shrink:0;background:${CELL_BG};}
        .wse-witem{font-size:clamp(12px,1.4vw,16px);font-weight:700;color:${WORD_TEXT};line-height:1.3;user-select:none;align-self:center;transition:opacity .25s;}
        .wse-witem--found{text-decoration:line-through;opacity:.38;}
        .wse-grid{position:relative;display:grid;grid-template-columns:repeat(${COLS},1fr);gap:0;cursor:crosshair;user-select:none;-webkit-user-select:none;border:2px solid ${CELL_BORDER};border-radius:8px;overflow:hidden;flex-shrink:0;}
        .wse-cell{width:clamp(26px,3.3vw,42px);height:clamp(26px,3.3vw,42px);display:flex;align-items:center;justify-content:center;font-size:clamp(11px,1.3vw,16px);font-weight:700;color:${CELL_DEF_TEXT};border-right:1px solid ${CELL_BORDER};border-bottom:1px solid ${CELL_BORDER};background:${CELL_BG};transition:background .1s,color .1s;}
         .wse-cell:nth-child(n+${COLS * (GRID.length - 1) + 1}){border-bottom:none;}
        .wse-cell--sel{color:${CELL_SEL_TEXT};}
        .wse-cell--err{color:${CELL_WRONG_TX}!important;}
        .wse-cell--fnd{color:${CELL_FND_TEXT};}
        .wse-sent-area{width:100%;display:flex;flex-direction:column;gap:clamp(5px,0.7vw,9px);}
        .wse-sent-prefix{font-size:clamp(13px,1.6vw,19px);color:#2b2b2b;line-height:1.6;}
        .wse-iwrap{position:relative;width:100%;}
        .wse-input{width:100%;background:transparent;border:none;border-bottom:1px solid ${INPUT_UL};outline:none;font-size:clamp(14px,1.8vw,22px);color:#2b2b2b;line-height:1.5;box-sizing:border-box;font-family:inherit;transition:border-color .2s;}
        .wse-input:disabled{opacity:1;cursor:default;}
        .wse-input--err{border-bottom-color:${INPUT_UL_ERR};}
        .wse-input--ans{color:${ANSWER_COLOR};font-weight:700;}
        .wse-ibadge{position:absolute;top:-8px;right:0;width:clamp(15px,1.7vw,19px);height:clamp(15px,1.7vw,19px);border-radius:50%;background:${BADGE_BG};color:${BADGE_TEXT};display:flex;align-items:center;justify-content:center;font-size:clamp(7px,0.8vw,10px);font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.2);pointer-events:none;z-index:2;}
        .wse-buttons{display:flex;justify-content:center;margin-top:clamp(8px,1.6vw,18px);}
        @media(max-width:600px){.wse-body{flex-direction:column;}.wse-countries{justify-content:center;}}
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

<div className="WB-header-title-page8"  style={{
            margin: 0,
            display: "flex",
            alignItems: "start",
            gap: "12px",
          }}>
          <span className="WB-ex-A">I</span>
          <div style={{ display: "block"  }}>
            Find and circle the words.  Then <span className="text-[#D1252B]"> ✓</span>  the countries for each word you find. 
            <div style={{ marginTop: "0" }}>
             One word is not in the puzzle, so one country won’t be checked.
            </div>
          </div>
        </div>
 
        <p
          style={{
            fontSize: "clamp(12px,1.4vw,16px)",
            color: "#6b7280",
            marginTop: "-8px",
          }}
        >
          One word is not in the puzzle, so one country won't be checked.
        </p>

        {/* Countries */}
        <div className="wse-countries">
          {COUNTRIES.map((country) => {
            const on = checked.has(country.name);
            return (
              <div key={country.name} className="wse-country">
                <img
                  src={country.src}
                  alt={country.name}
                  className="wse-cimg"
                />
                <span className="wse-cname">{country.name}</span>
                <div
                  className={[
                    "wse-ccheck",
                    on ? "wse-ccheck--on" : "",
                    showAns ? "wse-ccheck--locked" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => toggleCountry(country.name)}
                >
                  {on && "✓"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Word search */}
        <div className="wse-body">
          <div className="wse-wlist">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={[
                  "wse-witem",
                  foundNames.has(w) ? "wse-witem--found" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="wse-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key = cellKey(r, c);
                const fColors = foundCellMap[key];
                const isFound = fColors && fColors.length > 0;
                const isSel = selKeys.has(key) && !isFound;
                const isWrong = isSel && wrongFlash;
                const isSeling = isSel && !wrongFlash;
                return (
                  <div
                    key={key}
                    className={[
                      "wse-cell",
                      isFound ? "wse-cell--fnd" : "",
                      isSeling ? "wse-cell--sel" : "",
                      isWrong ? "wse-cell--err" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={getCellStyle(key, isSeling, isWrong)}
                    onMouseDown={() => onMouseDown(r, c)}
                    onMouseEnter={() => onMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Sentence */}
        <div className="wse-sent-area">
          <span className="wse-sent-prefix">{SENTENCE_PREFIX}</span>
          <div className="wse-iwrap">
            <input
              type="text"
              className={[
                "wse-input",
                sentWrong ? "wse-input--err" : "",
                showAns ? "wse-input--ans" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              value={sentVal}
              disabled={sentDisabled}
              onChange={(e) => handleSentenceChange(e.target.value)}
              style={{ borderBottomColor: sentWrong ? INPUT_UL_ERR : INPUT_UL }}
              spellCheck={false}
              autoComplete="off"
            />
            {sentWrong && <div className="wse-ibadge">✕</div>}
          </div>
        </div>

        <div className="wse-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );

  function handleSentenceChange(val) {
    if (showAns) return;
    if (showRes && isSentOk(sentVal)) return;
    setSentVal(val);
  }
}
