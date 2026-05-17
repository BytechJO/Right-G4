import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const UNDERLINE_COLOR  = "#2b2b2b";
const BOX_BORDER       = "#2096a6";
const BOX_RADIUS       = "8px";
const BOX_SIZE_MIN     = "32px";

// Check box colors
const CHECK_COLOR      = "#c81e1e";   // أحمر — نفس الكتاب
const CROSS_COLOR      = "#c81e1e";

// Selected (before check)
const BOX_SELECTED_BG  = "transparent";
const BOX_SELECTED_BD  = "#2096a6";

// After check
const BOX_CORRECT_BG   = "transparent";
const BOX_CORRECT_BD   = "#2096a6";
const BOX_WRONG_BG     = "transparent";
const BOX_WRONG_BD     = "#2096a6";

const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "I",      underlined: "pack",    rest: "many books in my backpack.",    correct: "check" },
  { id: 2, text: "Tom wears", underlined: "science", rest: "every day.",                 correct: "cross"  },
  { id: 3, text: "Lewis doesn't like to", underlined: "keys", rest: "coats in the winter.", correct: "cross" },
  { id: 4, text: "Megan is studying for her", underlined: "gym", rest: ".",              correct: "cross"  },
  { id: 5, text: "The",   underlined: "keys",    rest: "are in the car.",                correct: "check" },
  { id: 6, text: "We have a math", underlined: "test", rest: "today.",                   correct: "check" },
  { id: 7, text: "Roy plays soccer in", underlined: "gym", rest: "class.",               correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckCross_QA() {
  const [selected,    setSelected]    = useState({});   // { id: "check" | "cross" | null }
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
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── Box state ──
  // returns: "idle" | "selected" | "correct" | "wrong"
  const getBoxState = (item, boxType) => {
    const sel = selected[item.id];
    if (sel !== boxType) return "idle";
    if (showAns)         return "correct";
    if (showResults)     return boxType === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderBox = (item, boxType) => {
    const state   = getBoxState(item, boxType);
    const symbol  = boxType === "check" ? "✓" : "✕";
    const isWrong = state === "wrong";
    const show    = state !== "idle";

    let bg = "#ffffff";
    let bd = BOX_BORDER;
    let symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;

    if (state === "selected") { bg = BOX_SELECTED_BG; bd = BOX_SELECTED_BD; }
    if (state === "correct")  { bg = BOX_CORRECT_BG;  bd = BOX_CORRECT_BD;  }
    if (state === "wrong")    { bg = BOX_WRONG_BG;    bd = BOX_WRONG_BD;    }

    return (
      <div
        key={boxType}
        style={{
          position: "relative",
          width:  `clamp(40px, 3.8vw, 40px)`,
          height: `clamp(40px, 3.8vw, 40px)`,
          border: `2px solid ${bd}`,
          borderRadius: BOX_RADIUS,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          transition: "border-color 0.15s, background 0.15s",
          flexShrink: 0,
          userSelect: "none",
        }}
        onClick={() => handleSelect(item.id, boxType)}
      >
        {show && (
          <span style={{
            fontSize: `clamp(16px, 2.2vw, 28px)`,
            fontWeight: 700,
            color: symColor,
            lineHeight: 1,
          }}>
            {symbol}
          </span>
        )}
        {isWrong && (
          <div style={{
            position: "absolute",
            top: -7, right: -7,
            width: "clamp(14px,1.6vw,18px)",
            height: "clamp(14px,1.6vw,18px)",
            borderRadius: "50%",
            background: WRONG_BADGE_BG,
            color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px,0.8vw,10px)",
            fontWeight: 700,
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rwcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* Single row: num | sentence | boxes */
        .rwcc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        .rwcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        /* Sentence: normal + underlined + normal */
        .rwcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          flex-wrap: wrap;
          display: flex;
          align-items: baseline;
          gap: 0;
        }

        .rwcc-word {
          white-space: pre-wrap;
        }

        .rwcc-underlined {
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
        }

        /* Two boxes: ✓ then ✕ */
        .rwcc-boxes {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          flex-shrink: 0;
        }

        .rwcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
          <span className="WB-ex-A">A</span>
          Read and write <span style={{color :"red"}} >✓ </span> or <span style={{color :"red"}} >✕</span> .
        </h1>

        {/* ── Items ── */}
        <div className="rwcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwcc-row">

              {/* Number */}
              <span className="rwcc-num">{item.id}</span>

              {/* Sentence */}
              <div className="rwcc-sentence">
                {item.text && <span className="rwcc-word">{item.text}&nbsp;</span>}
                <span className="rwcc-underlined">{item.underlined}</span>
                {item.rest  && <span className="rwcc-word">&nbsp;{item.rest}</span>}
              </div>

              {/* Two boxes: ✓ | ✕ */}
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