import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 24.svg"; // She
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 25.svg"; // He
import img3 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 26.svg"; // They
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 27.svg"; // We
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 28.svg"; // You
import img6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 29.svg"; // I

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR      = "#2b2b2b";
const NUMBER_COLOR    = "#2b2b2b";
const PRONOUN_COLOR   = "#2b2b2b";
const CIRCLE_SELECTED = "#2195a6";
const CIRCLE_CORRECT  = "#2195a6";
const CIRCLE_WRONG    = "#ef4444";
const WRONG_BADGE_BG  = "#ef4444";
const WRONG_BADGE_TX  = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: img1, pronoun: "She",  correct: "has"  },
  { id: 2, src: img2, pronoun: "He",   correct: "has"  },
  { id: 3, src: img3, pronoun: "They", correct: "have" },
  { id: 4, src: img4, pronoun: "We",   correct: "have" },
  { id: 5, src: img5, pronoun: "You",  correct: "have" },
  { id: 6, src: img6, pronoun: "I",    correct: "have" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircle_QB() {
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

  const getState = (item, value) => {
    const sel = selected[item.id];
    if (sel !== value) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return value === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const borderColor = (state) => {
    if (state === "selected") return CIRCLE_SELECTED;
    if (state === "correct")  return CIRCLE_CORRECT;
    if (state === "wrong")    return CIRCLE_WRONG;
    return "transparent";
  };

  const renderOption = (item, value) => {
    const state   = getState(item, value);
    const isWrong = state === "wrong";

    return (
      <div
        key={value}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2.5px solid ${borderColor(state)}`,
          borderRadius: "999px",
          padding: "clamp(4px,0.5vw,8px) clamp(14px,1.8vw,24px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          minWidth: "clamp(56px,7vw,90px)",
        }}
        onClick={() => handleSelect(item.id, value)}
      >
        <span style={{
          fontSize: "clamp(14px,1.7vw,20px)",
          color: TEXT_COLOR,
          fontWeight: state !== "idle" ? 600 : 400,
          lineHeight: 1.4,
        }}>
          {value}
        </span>
        {isWrong && (
          <div style={{
            position: "absolute", top: -7, right: -7,
            width: "clamp(14px,1.6vw,17px)", height: "clamp(14px,1.6vw,17px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TX,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700,
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
        .rcb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.4vw, 32px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single item */
        .rcb-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* num row */
        .rcb-num-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rcb-img {
          width:50%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* Options + pronoun */
        .rcb-options-col {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 12px);
          align-items: flex-start;
        }

        .rcb-pronoun {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PRONOUN_COLOR};
          font-weight: 500;
          line-height: 1.4;
        }

        /* img + options side by side */
        .rcb-body {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        .rcb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rcb-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 360px) {
          .rcb-grid { grid-template-columns: 1fr; }
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
          Read and circle.
        </h1>

        {/* ── 3×2 Grid ── */}
        <div className="rcb-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcb-item">

              {/* Num */}
              <span className="rcb-num">{item.id}</span>

              {/* Image + options */}
              <div className="rcb-body">
                <img src={item.src} alt={`img-${item.id}`} className="rcb-img" />

                <div className="rcb-options-col">
                  {renderOption(item, "have")}
                  <span className="rcb-pronoun">{item.pronoun}</span>
                  {renderOption(item, "has")}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rcb-buttons">
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