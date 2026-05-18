import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 45.svg"; // radio
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 46.svg"; // horse
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 27 (2).svg"; // picture
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 47.svg"; // violin
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 49.svg"; // yo-yo
import img6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 48.svg"; // flowers

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR     = "#2b2b2b";
const NUMBER_COLOR   = "#2b2b2b";
const CHECK_COLOR    = "#c81e1e";
const CROSS_COLOR    = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TX = "#ffffff";
const IMG_BORDER_DEF = "#e5e7eb";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" ✓ | "cross" ✕
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: img1, text: "He has listened to the radio.",  correct: "check" },
  { id: 2, src: img2, text: "She has ridden a horse.",        correct: "cross" },
  { id: 3, src: img3, text: "He has taken a picture.",        correct: "check" },
  { id: 4, src: img4, text: "He has played the violin.",      correct: "check" },
  { id: 5, src: img5, text: "She has broken her yo-yo.",      correct: "cross" },
  { id: 6, src: img6, text: "She has watered the flowers.",   correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheckX_QC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, value) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: prev[id] === value ? null : value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setSelected({}); setShowResults(false); setShowAns(false);
  };

  const getState = (item) => {
    const sel = selected[item.id];
    if (!sel)        return "empty";
    if (showAns)     return "correct";
    if (showResults) return sel === item.correct ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2×3 grid (2 cols) ── */
        .rlwx-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(18px, 2.6vw, 36px) clamp(22px, 3.2vw, 48px);
          width: 100%;
        }

        /* Single item */
        .rlwx-item {
          display: flex;
          flex-direction: column;
          gap: clamp(5px, 0.7vw, 9px);
        }

        /* Sentence row */
        .rlwx-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwx-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rlwx-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image + badge container */
        .rlwx-img-wrap {
          position: relative;
          width: 60%;
          overflow: visible;
          cursor: pointer;
          transition: border-color 0.12s;
        }
        .rlwx-img-wrap--locked { cursor: default; }

        .rlwx-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ✓ / ✕ badge — bottom right */
        .rlwx-symbol-badge {
          position: absolute;
          bottom: clamp(4px, 0.6vw, 8px);
          right: clamp(4px, 0.6vw, 8px);
          width: clamp(28px, 3.6vw, 44px);
          height: clamp(28px, 3.6vw, 44px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(16px, 2.2vw, 26px);
          font-weight: 900;
          pointer-events: none;
          z-index: 2;
          transition: border-color 0.12s;
        }

        /* ✕ wrong badge top-right */
        .rlwx-wrong-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TX};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .rlwx-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlwx-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">C</span>
          Read, look, and write
          <span style={{ color: CHECK_COLOR, fontWeight: 900 }}> ✓ </span>
          or
          <span style={{ color: CROSS_COLOR, fontWeight: 900 }}> X</span>.
        </h1>

        {/* ── 2×3 Grid ── */}
        <div className="rlwx-grid">
          {ITEMS.map((item) => {
            const state   = getState(item);
            const sel     = selected[item.id];
            const symbol  = sel === "check" ? "✓" : sel === "cross" ? "✕" : null;
            const symClr  = sel === "check" ? CHECK_COLOR : CROSS_COLOR;
            const isWrong = state === "wrong";
            const locked  = isLocked;

            return (
              <div key={item.id} className="rlwx-item">
                {/* Sentence */}
                <div className="rlwx-sentence-row">
                  <span className="rlwx-num">{item.id}</span>
                  <span className="rlwx-text">{item.text}</span>
                </div>

                {/* Image — click toggles check↔cross */}
                <div
                  className={["rlwx-img-wrap", locked ? "rlwx-img-wrap--locked" : ""].filter(Boolean).join(" ")}
                  onClick={() => {
                    if (locked) return;
                    const cur = selected[item.id];
                    const next = !cur ? "check" : cur === "check" ? "cross" : null;
                    setSelected((prev) => ({ ...prev, [item.id]: next }));
                  }}
                >
                  <img src={item.src} alt={`img-${item.id}`} className="rlwx-img" />

                  {/* Symbol badge */}
                  {symbol && (
                    <div className="rlwx-symbol-badge" style={{ color: symClr, borderColor: isWrong ? WRONG_BADGE_BG : "#e5e7eb" }}>
                      {symbol}
                    </div>
                  )}

                  {/* ✕ wrong badge */}
                  {isWrong && <div className="rlwx-wrong-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwx-buttons">
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