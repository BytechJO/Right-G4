import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const OPTION_LABEL_CLR = "#2b2b2b";
const CIRCLE_DEFAULT   = "#9ca3af";
const CIRCLE_SELECTED  = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const CIRCLE_CORRECT   = "#2096a6";
const ANSWER_COLOR     = "#c81e1e";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "Tim was very happy to have ___________ a new",
    after:   "sister.",
    correct: "c",
    options: [
      { label: "a", text: "picnic" },
      { label: "b", text: "cousin" },
      { label: "c", text: "baby" },
    ],
  },
  {
    id:      2,
    before:  "The",
    after:   "is very green and lush.",
    correct: "c",
    options: [
      { label: "a", text: "cousin" },
      { label: "b", text: "baby" },
      { label: "c", text: "grass" },
    ],
  },
  {
    id:      3,
    before:  "We are going on a",
    after:   "the park.",
    correct: "b",
    options: [
      { label: "a", text: "today" },
      { label: "b", text: "picnic" },
      { label: "c", text: "leave" },
    ],
  },
  {
    id:      4,
    before:  "Jake will",
    after:   "for Australia next month.",
    correct: "a",
    options: [
      { label: "a", text: "leave" },
      { label: "b", text: "over" },
      { label: "c", text: "taller" },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChooseWrite_QA() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, label) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: label }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose an answer for each question."); return; }
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

  const getOptionState = (item, label) => {
    const sel = selected[item.id];
    if (sel !== label) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return label === item.correct ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rcwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single item */
        .rcwa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Sentence row */
        .rcwa-sentence {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rcwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcwa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Answer word shown inline */
        .rcwa-answer-word {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${ANSWER_COLOR};
          border-bottom: 1px solid ${ANSWER_COLOR};
          padding-bottom: 1px;
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Options row */
        .rcwa-options {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.6vw, 20px);
          padding-left: clamp(18px, 2.2vw, 28px);
        }

        /* Single option */
        .rcwa-option {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.6vw, 8px);
          cursor: pointer;
          user-select: none;
        }
        .rcwa-option--locked { cursor: default; }

        /* Circle */
        .rcwa-circle {
          position: relative;
          width: clamp(18px, 2.2vw, 26px);
          height: clamp(18px, 2.2vw, 26px);
          border-radius: 50%;
          border: 2px solid ${CIRCLE_DEFAULT};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s;
        }
        .rcwa-circle--selected { border-color: ${CIRCLE_SELECTED}; }
        .rcwa-circle--correct  { border-color: ${CIRCLE_CORRECT}; }
        .rcwa-circle--wrong    { border-color: ${CIRCLE_WRONG}; }

        .rcwa-dot {
          width: clamp(8px, 1vw, 12px);
          height: clamp(8px, 1vw, 12px);
          border-radius: 50%;
          background: ${CIRCLE_SELECTED};
        }
        .rcwa-dot--correct { background: ${CIRCLE_CORRECT}; }
        .rcwa-dot--wrong   { background: ${CIRCLE_WRONG}; }

        /* ✕ badge */
        .rcwa-badge {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rcwa-option-label {
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${OPTION_LABEL_CLR};
          font-weight: 600;
          line-height: 1;
        }

        .rcwa-option-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1;
        }

        .rcwa-buttons {
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
          <span className="WB-ex-A-1">A</span>
          Read, choose, and write.
        </h1>

        {/* ── Items ── */}
        <div className="rcwa-list">
          {ITEMS.map((item) => {
            const sel         = selected[item.id];
            const correctOpt  = item.options.find((o) => o.label === item.correct);
            const selectedOpt = sel ? item.options.find((o) => o.label === sel) : null;
            const showWord    = showAns ? correctOpt : (showResults && sel ? selectedOpt : null);
            const wordColor   = showAns || (showResults && sel === item.correct) ? ANSWER_COLOR : CIRCLE_WRONG;

            return (
              <div key={item.id} className="rcwa-item">

                {/* Sentence */}
                <div className="rcwa-sentence">
                  <span className="rcwa-num">{item.id}</span>
                  <span className="rcwa-text">{item.before}</span>
                  {showWord && (
                    <span className="rcwa-answer-word" style={{ color: wordColor, borderBottomColor: wordColor }}>
                      {showWord.text}
                    </span>
                  )}
                  <span className="rcwa-text">{item.after}</span>
                </div>

                {/* Options */}
                <div className="rcwa-options">
                  {item.options.map((opt) => {
                    const state = getOptionState(item, opt.label);
                    const isWrong = state === "wrong";

                    return (
                      <div
                        key={opt.label}
                        className={["rcwa-option", isLocked ? "rcwa-option--locked" : ""].filter(Boolean).join(" ")}
                        onClick={() => handleSelect(item.id, opt.label)}
                      >
                        <div className={[
                          "rcwa-circle",
                          state === "selected" ? "rcwa-circle--selected" : "",
                          state === "correct"  ? "rcwa-circle--correct"  : "",
                          state === "wrong"    ? "rcwa-circle--wrong"    : "",
                        ].filter(Boolean).join(" ")}>
                          {state !== "idle" && (
                            <div className={[
                              "rcwa-dot",
                              state === "correct" ? "rcwa-dot--correct" : "",
                              state === "wrong"   ? "rcwa-dot--wrong"   : "",
                            ].filter(Boolean).join(" ")} />
                          )}
                          {isWrong && <div className="rcwa-badge">✕</div>}
                        </div>
                        <span className="rcwa-option-label">{opt.label}</span>
                        <span className="rcwa-option-text">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcwa-buttons">
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