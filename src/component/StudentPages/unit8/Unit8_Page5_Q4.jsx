import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — صورة واحدة لكل item تحتوي الاثنتين
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 16.svg"; // She cooked dinner
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 17.svg"; // He played the violin
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 18.svg";; // He listened to the radio
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 19.svg";; // She cleaned her room

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR     = "#2b2b2b";
const NUMBER_COLOR   = "#2b2b2b";
const CHECK_COLOR    = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TX = "#ffffff";
const HALF_HOVER     = "rgba(33,149,166,0.08)";
const HALF_SEL       = "rgba(33,149,166,0.12)";
const HALF_WRONG     = "rgba(239,68,68,0.08)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "left" | "right"  — النصف الصحيح في الصورة
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "She cooked dinner.",      src: img1, correct: "right" },
  { id: 2, text: "He played the violin.",   src: img2, correct: "left"  },
  { id: 3, text: "He listened to the radio.", src: img3, correct: "right" },
  { id: 4, text: "She cleaned her room.",   src: img4, correct: "right" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QD() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, side) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: side }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please select an image for each question."); return; }
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

  // ── Half state ──
  const getHalfState = (item, side) => {
    const sel = selected[item.id];
    if (sel !== side) return "idle";
    if (showAns)      return "correct";
    if (showResults)  return side === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const halfBg = (state) => {
    if (state === "selected") return HALF_SEL;
    if (state === "wrong")    return HALF_WRONG;
    return "transparent";
  };

  const renderItem = (item) => {
    const leftState  = getHalfState(item, "left");
    const rightState = getHalfState(item, "right");

    const showLeftChk  = leftState  === "selected" || leftState  === "correct";
    const showRightChk = rightState === "selected" || rightState === "correct";
    const leftWrong    = leftState  === "wrong";
    const rightWrong   = rightState === "wrong";

    return (
      <div key={item.id} className="rlwd-item">

        {/* Sentence */}
        <div className="rlwd-sentence-row">
          <span className="rlwd-num">{item.id}</span>
          <span className="rlwd-text">{item.text}</span>
        </div>

        {/* Single image split into left/right halves */}
        <div className="rlwd-img-wrap">
          <img src={item.src} alt={`img-${item.id}`} className="rlwd-img" />

          {/* Left half overlay */}
          <div
            className={["rlwd-half rlwd-half--left", isLocked ? "rlwd-half--locked" : ""].filter(Boolean).join(" ")}
            onClick={() => handleSelect(item.id, "left")}
          >
            {showLeftChk && (
              <div className="rlwd-check-badge">
                <span style={{ color: CHECK_COLOR, fontSize: "clamp(14px,2vw,24px)", fontWeight: 900 }}>✓</span>
              </div>
            )}
            {leftWrong && <div className="rlwd-wrong-badge">✕</div>}
          </div>

          {/* Right half overlay */}
          <div
            className={["rlwd-half rlwd-half--right", isLocked ? "rlwd-half--locked" : ""].filter(Boolean).join(" ")}
            onClick={() => handleSelect(item.id, "right")}
          >
            {showRightChk && (
              <div className="rlwd-check-badge">
                <span style={{ color: CHECK_COLOR, fontSize: "clamp(14px,2vw,24px)", fontWeight: 900 }}>✓</span>
              </div>
            )}
            {rightWrong && <div className="rlwd-wrong-badge">✕</div>}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2×2 grid ── */
        .rlwd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        .rlwd-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rlwd-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rlwd-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image container */
        .rlwd-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .rlwd-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* Half overlays */
        .rlwd-half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          cursor: pointer;
          transition: background 0.12s;
        }
        .rlwd-half--right { right: 0; }
        .rlwd-half--locked { cursor: default; }

        /* ✓ badge bottom-right of each half */
        .rlwd-check-badge {
          position: absolute;
          bottom: clamp(4px, 0.6vw, 8px);
          right: clamp(4px, 0.6vw, 8px);
          width: clamp(24px, 3vw, 36px);
          height: clamp(24px, 3vw, 36px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          z-index: 2;
        }

        /* ✕ badge top-right */
        .rlwd-wrong-badge {
          position: absolute;
          top: 6px; right: 6px;
          width: clamp(16px, 1.9vw, 22px);
          height: clamp(16px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TX};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .rlwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwd-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A-1">D</span>
          Read, look, and write <span style={{color : "red"}}>✓</span> .
        </h1>

        {/* ── 2×2 Grid ── */}
        <div className="rlwd-grid">
          {ITEMS.map((item) => renderItem(item))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwd-buttons">
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