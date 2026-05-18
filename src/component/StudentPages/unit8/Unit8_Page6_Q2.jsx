import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 20.svg"; // rowing boat
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 21.svg"; // rowing boat
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 22.svg"; // rowing boat
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 24.svg"; // rowing boat

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER_DEF   = "#2096a6";
const BOX_BORDER_SEL   = "#2096a6";
const BOX_BORDER_CORR  = "#2096a6";
const BOX_BORDER_WRONG = "#2096a6";
const BOX_BG_SEL       = "transparent";
const BOX_BG_WRONG     = "transparent";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "a" | "b"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    textA:   "He fixed the fence.",
    textB:   "He rowed the boat.",
    correct: "b",
  },
  {
    id:      2,
    src:     img2,
    textA:   "She washed the car.",
    textB:   "She cooked dinner.",
    correct: "b",
  },
  {
    id:      3,
    src:     img3,
    textA:   "She cleaned the floor.",
    textB:   "She painted a picture.",
    correct: "b",
  },
  {
    id:      4,
    src:     img4,
    textA:   "She played with her doll.",
    textB:   "She fixed her toy.",
    correct: "a",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QF() {
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
    if (!allAnswered) { ValidationAlert.info("Please select a sentence for each picture."); return; }
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

  // ── Box state ──
  const getBoxState = (item, side) => {
    const sel = selected[item.id];
    if (sel !== side) return "idle";
    if (showAns)      return "correct";
    if (showResults)  return side === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderSentenceRow = (item, side) => {
    const text  = side === "a" ? item.textA : item.textB;
    const state = getBoxState(item, side);
    const showChk = state === "selected" || state === "correct";
    const isWrong = state === "wrong";

    let boxBg  = "#ffffff";
    let boxBd  = BOX_BORDER_DEF;
    if (state === "selected") { boxBg = BOX_BG_SEL;   boxBd = BOX_BORDER_SEL;   }
    if (state === "correct")  { boxBg = "#ffffff";     boxBd = BOX_BORDER_CORR;  }
    if (state === "wrong")    { boxBg = BOX_BG_WRONG;  boxBd = BOX_BORDER_WRONG; }

    return (
      <div
        key={side}
        className={["rlwf-sent-row", isLocked ? "rlwf-sent-row--locked" : ""].filter(Boolean).join(" ")}
        onClick={() => handleSelect(item.id, side)}
      >
        <span className="rlwf-sent-text">{text}</span>

        {/* Circular checkbox */}
        <div style={{
          position: "relative",
          width:  "clamp(40px,3.4vw,40px)",
          height: "clamp(40px,3.4vw,40px)",
          borderRadius: "30%",
          border: `2px solid ${boxBd}`,
          background: boxBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.15s, background 0.15s",
        }}>
          {showChk && (
            <span style={{ color: CHECK_COLOR, fontSize: "clamp(14px,2vw,24px)", fontWeight: 900, lineHeight: 1 }}>✓</span>
          )}
          {isWrong && (
            <div style={{
              position: "absolute", top: -7, right: -7,
              width: "clamp(13px,1.5vw,16px)", height: "clamp(13px,1.5vw,16px)",
              borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700,
              border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none", zIndex: 3,
            }}>✕</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2×2 grid ── */
        .rlwf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 70%;
        }

        /* Single item */
        .rlwf-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Num + image */
        .rlwf-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        .rlwf-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Sentence row: text + checkbox */
        .rlwf-sent-row {
            position: relative;
    right: -1.35em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 1vw, 14px);
          cursor: pointer;
          user-select: none;
          padding: clamp(3px, 0.4vw, 6px) 0;
        }
        .rlwf-sent-row--locked { cursor: default; }

        .rlwf-sent-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          flex: 1;
        }

        .rlwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwf-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">F</span>
          Read, look, and write <span style={{color : "RED"}}>✓</span> .
        </h1>

        {/* ── 2×2 Grid ── */}
        <div className="rlwf-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwf-item">

              {/* Num + Image */}
              <div className="rlwf-img-row">
                <span className="rlwf-num">{item.id}</span>
                <img src={item.src} alt={`img-${item.id}`} className="rlwf-img" />
              </div>

              {/* Two sentences */}
              {renderSentenceRow(item, "a")}
              {renderSentenceRow(item, "b")}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwf-buttons">
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