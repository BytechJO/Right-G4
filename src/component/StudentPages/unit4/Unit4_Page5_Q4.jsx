import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR   = "#2b2b2b";
const WRONG_COLOR  = "#ef4444";
const RIGHT_COLOR  = "#2096a6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, before: "They sound",          after: "professional than the other group.", correct: "more" },
  { id: 2, before: "The youngest sister is the", after: "practical.",                  correct: "most" },
  { id: 3, before: "Laura is",            after: "elegant than Rachel.",               correct: "more" },
  { id: 4, before: "The baseball team is the",   after: "famous.",                     correct: "most" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadAndComplete_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleChange = (id, val) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = ITEMS.every((item) => (answers[item.id] || "").trim() !== "");
    if (!allFilled) { ValidationAlert.info("Please fill in all the blanks."); return; }
    let score = 0;
    ITEMS.forEach((item) => {
      if ((answers[item.id] || "").trim().toLowerCase() === item.correct) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const getState = (item) => {
    if (showAns) return "answer";
    if (showResults) {
      const val = (answers[item.id] || "").trim().toLowerCase();
      return val === item.correct ? "correct" : "wrong";
    }
    return "editing";
  };

  const getColor = (item) => {
    const state = getState(item);
    if (state === "answer")  return ANSWER_COLOR;
    if (state === "correct") return RIGHT_COLOR;
    if (state === "wrong")   return WRONG_COLOR;
    return TEXT_DEFAULT;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rc-rows {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
          max-width: 900px;
          margin: 10% 0;
        }

        .rc-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .rc-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.4em;
        }

        .rc-text {
          font-size: clamp(18px, 1.6vw, 18px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .rc-input-wrap {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          min-width: clamp(80px, 10vw, 130px);
          flex-shrink: 0;
          position: relative;
        }

        .rc-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${LINE_COLOR};
          outline: none;
          background: transparent;
          font-size: clamp(18px, 1.8vw, 18px);
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          color: ${TEXT_DEFAULT};
        }
        .rc-input:disabled { opacity: 1; cursor: default; }

        .rc-wrong-hint {
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          color: ${ANSWER_COLOR};
          margin-top: 2px;
        }

        /* ✕ badge */
        .rc-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_COLOR};
          color: #ffffff;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
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
        {/* Header */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">D</span>
          Read and complete. Use{" "}
          <span style={{ color: "#ff9900ff" }}>more</span>{" "}
          or{" "}
          <span style={{ color: "#ff9900ff" }}>most.</span>
        </h1>

        {/* Rows */}
        <div className="rc-rows">
          {ITEMS.map((item) => {
            const state = getState(item);
            const color = getColor(item);
            const val   = answers[item.id] || "";

            return (
              <div key={item.id} className="rc-row">

                <span className="rc-num">{item.id}</span>
                <span className="rc-text">{item.before}</span>

                <span className="rc-input-wrap">
                  <input
                    className="rc-input"
                    type="text"
                    value={state === "answer" ? item.correct : val}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{
                      borderBottomColor: state === "wrong" ? WRONG_COLOR : val ? LINE_COLOR : LINE_COLOR,
                    }}
                  />
                  {state === "wrong" && <div className="rc-badge">✕</div>}
                 
                </span>

                <span className="rc-text">{item.after}</span>

              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="rc-buttons">
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