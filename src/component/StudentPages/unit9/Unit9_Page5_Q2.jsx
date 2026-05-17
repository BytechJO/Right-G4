import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const CIRCLE_SELECTED  = "#2195a6";
const CIRCLE_WRONG     = "#ef4444";
const CIRCLE_CORRECT   = "#2195a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "right" | "wrong"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "No up.",                    correct: "wrong" },
  { id: 2, text: "Oh, well.",                 correct: "right" },
  { id: 3, text: "What's really?",            correct: "wrong" },
  { id: 4, text: "Thanks anyway.",            correct: "right" },
  { id: 5, text: "Can you come to my sorry?", correct: "wrong" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircleRightWrong_QB() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, value) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
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

  // ── Option state ──
  const getState = (item, value) => {
    const sel = selected[item.id];
    if (sel !== value) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return value === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderOption = (item, value) => {
    const state   = getState(item, value);
    const isWrong = state === "wrong";

    let bd = "transparent";
    if (state === "selected") bd = CIRCLE_SELECTED;
    if (state === "correct")  bd = CIRCLE_CORRECT;
    if (state === "wrong")    bd = CIRCLE_WRONG;

    return (
      <div
        key={value}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${bd}`,
          borderRadius: "999px",
          padding: "clamp(2px,0.3vw,5px) clamp(14px,1.8vw,24px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          minWidth: "clamp(50px,7vw,90px)",
        }}
        onClick={() => handleSelect(item.id, value)}
      >
        <span style={{
          fontSize: "clamp(13px,1.6vw,19px)",
          color: TEXT_COLOR,
          fontWeight: state !== "idle" ? 600 : 400,
          lineHeight: 1.5,
        }}>
          {value}
        </span>
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
        .rcrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
          margin : 7% 0 ;
        }

        /* num | sentence | right | wrong */
        .rcrw-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 18px);
        }

        .rcrw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcrw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        .rcrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rcrw-row { grid-template-columns: auto 1fr; }
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
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">B</span>
          Read and circle{" "}
          <span style={{ color: "#ff8c00ff", fontWeight: 700 }}>right</span>
          {" "}or{" "}
          <span style={{ color: "#ff8c00ff", fontWeight: 700 }}>wrong</span>.
        </h1>

        {/* ── Items ── */}
        <div className="rcrw-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcrw-row">
              <span className="rcrw-num">{item.id}</span>
              <span className="rcrw-text">{item.text}</span>
              {renderOption(item, "right")}
              {renderOption(item, "wrong")}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rcrw-buttons">
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