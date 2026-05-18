import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const BOX_BORDER_DEF   = "#2096a6";
const BOX_BORDER_SEL   = "#2096a6";
const BOX_BG_SEL       = "#f0f9ff";
const CHECK_COLOR      = "#c81e1e";
const CROSS_COLOR      = "#c81e1e";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "No up.",                  correct: "cross" },
  { id: 2, text: "Thanks anyway.",          correct: "check" },
  { id: 3, text: "I'm really problem.",     correct: "cross" },
  { id: 4, text: "Can you come to my sorry?", correct: "cross" },
  { id: 5, text: "Oh, well.",               correct: "check" },
  { id: 6, text: "What's up?",              correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckCross_QB() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, value) => {
    if (isLocked) return;
    // toggle: same value → deselect
    setSelected((prev) => ({ ...prev, [id]: prev[id] === value ? null : value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setSelected({}); setShowResults(false); setShowAns(false);
  };

  // ── Box state ──
  // isWrong = الطالب اختار هاي الخانة وهي غلط
  const isBoxWrong = (item, boxType) => {
    if (!showResults || showAns) return false;
    return selected[item.id] === boxType && boxType !== item.correct;
  };

  const isBoxSelected = (item, boxType) => selected[item.id] === boxType;

  const renderBox = (item, boxType) => {
    const symbol   = boxType === "check" ? "✓" : "✕";
    const symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;
    const isSel    = isBoxSelected(item, boxType);
    const isWrong  = isBoxWrong(item, boxType);

    let bd = BOX_BORDER_DEF;
    let bg = "#ffffff";
    if (isSel && !isWrong) { bd = BOX_BORDER_SEL; bg = BOX_BG_SEL; }
    // wrong: no border change — only badge

    return (
      <div
        style={{
          position: "relative",
          width:  "clamp(40px,3.8vw,40px)",
          height: "clamp(40px,3.8vw,40px)",
          borderRadius: "8px",
          border: `2px solid ${bd}`,
          background: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          flexShrink: 0,
          userSelect: "none",
          transition: "border-color 0.15s, background 0.15s",
        }}
        onClick={() => handleSelect(item.id, boxType)}
      >
        {isSel && (
          <span style={{ fontSize: "clamp(16px,2.2vw,26px)", fontWeight: 900, color: symColor, lineHeight: 1 }}>
            {symbol}
          </span>
        )}
        {/* ✕ badge فقط لو غلط */}
        {isWrong && (
          <div style={{
            position: "absolute", top: -7, right: -7,
            width: "clamp(14px,1.6vw,18px)", height: "clamp(14px,1.6vw,18px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px,0.8vw,10px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 3×2 grid ── */
        .rwcc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2vw, 26px) clamp(16px, 2.4vw, 36px);
          width: 100%;
          margin : 14% 0 ;
        }

        /* Single item: num | text | ✓box | ✕box */
        .rwcc-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .rwcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rwcc-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
              white-space: nowrap;

        }

        .rwcc-boxes {
          display: flex;
          gap: clamp(4px, 0.5vw, 7px);
          flex-shrink: 0;
        }

        .rwcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .rwcc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A-1">B</span>
          Read and write
          <span style={{ color: CHECK_COLOR, fontWeight: 900 }}> ✓ </span>
          and
          <span style={{ color: CROSS_COLOR, fontWeight: 900 }}> X </span>.
        </h1>

        {/* ── 3×2 Grid ── */}
        <div className="rwcc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwcc-item">
              <span className="rwcc-num">{item.id}</span>
              <span className="rwcc-text">{item.text}</span>
              <div className="rwcc-boxes">
                {renderBox(item, "check")}
                {renderBox(item, "cross")}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwcc-buttons">
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