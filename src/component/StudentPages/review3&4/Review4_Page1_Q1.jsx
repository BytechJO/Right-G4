import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const OPTION_LABEL_CLR        = "#2b2b2b";
const CIRCLE_DEFAULT          = "#9ca3af";
const CIRCLE_SELECTED         = "#2096a6";
const CIRCLE_WRONG            = "#ef4444";
const CIRCLE_CORRECT          = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "Tim was very happy to have a new",
    after:   "sister.",
    correct: "c",
    answer:  "baby",
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
    answer:  "grass",
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
    answer:  "picnic",
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
    answer:  "leave",
    options: [
      { label: "a", text: "leave" },
      { label: "b", text: "over" },
      { label: "c", text: "taller" },
    ],
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChooseWrite_QA() {
  const [selected,    setSelected]    = useState({});   // { 1: "c", ... }
  const [written,     setWritten]     = useState({});   // { 1: "baby", ... }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  // ── Handlers ──
  const handleSelect = (id, label) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: label }));
  };

  const handleWrite = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && normalize(written[id] || "") === normalize(item.answer)) return;
    setWritten((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allCircled = ITEMS.every((item) => selected[item.id]);
    const allWritten = ITEMS.every((item) => written[item.id]?.trim());
    if (!allCircled || !allWritten) {
      ValidationAlert.info("Please choose and write an answer for each question.");
      return;
    }
    let score = 0;
    const total = ITEMS.length * 2;
    ITEMS.forEach((item) => {
      if (selected[item.id] === item.correct)                           score++;
      if (normalize(written[item.id] || "") === normalize(item.answer)) score++;
    });
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filledSel = {};
    const filledWr  = {};
    ITEMS.forEach((item) => {
      filledSel[item.id] = item.correct;
      filledWr[item.id]  = item.answer;
    });
    setSelected(filledSel);
    setWritten(filledWr);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setWritten({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── State helpers ──
  const getCircleState = (item, label) => {
    const sel = selected[item.id];
    if (sel !== label) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return label === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const isWriteWrong = (item) => {
    if (!showResults || showAns) return false;
    return normalize(written[item.id] || "") !== normalize(item.answer);
  };

  const isWriteDisabled = (item) => {
    if (showAns) return true;
    if (showResults && normalize(written[item.id] || "") === normalize(item.answer)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rcwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 34px);
          width: 100%;
        }

        .rcwa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
        }

        /* ── Sentence row ── */
        .rcwa-sentence {
          display: flex;
          align-items: flex-end;
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

        /* Input wrap inline in sentence */
        .rcwa-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rcwa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rcwa-input:disabled  { opacity: 1; cursor: default; }
        .rcwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rcwa-input-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Options row ── */
        .rcwa-options {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.8vw, 24px);
          padding-left: clamp(18px, 2.2vw, 28px);
        }

        .rcwa-option {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.6vw, 8px);
          cursor: pointer;
          user-select: none;
        }
        .rcwa-option--locked { cursor: default; }

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

        .rcwa-circle-badge {
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
            const writeWrong    = isWriteWrong(item);
            const writeDisabled = isWriteDisabled(item);
            const writeValue    = written[item.id] || "";
            const writeTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const writeUColor   = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rcwa-item">

                {/* ── Sentence + inline input ── */}
                <div className="rcwa-sentence">
                  <span className="rcwa-num">{item.id}</span>
                  <span className="rcwa-text">{item.before}</span>

                  <div className="rcwa-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rcwa-input",
                        writeWrong ? "rcwa-input--wrong"  : "",
                        showAns    ? "rcwa-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={writeValue}
                      disabled={writeDisabled}
                      onChange={(e) => handleWrite(item.id, e.target.value)}
                      style={{ borderBottomColor: writeUColor, color: writeTColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {writeWrong && <div className="rcwa-input-badge">✕</div>}
                  </div>

                  <span className="rcwa-text">{item.after}</span>
                </div>

                {/* ── Options with circles ── */}
                <div className="rcwa-options">
                  {item.options.map((opt) => {
                    const state   = getCircleState(item, opt.label);
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
                          {isWrong && <div className="rcwa-circle-badge">✕</div>}
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