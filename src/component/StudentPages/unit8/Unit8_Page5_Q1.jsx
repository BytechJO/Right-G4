import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const OPTION_LABEL_CLR        = "#2b2b2b";
const CIRCLE_SELECTED         = "#2195a6";
const CIRCLE_WRONG            = "#ef4444";
const CIRCLE_CORRECT          = "#2195a6";
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
    before:  "They are playing",
    after:   "at the beach.",
    correct: "b",
    answer:  "volleyball",
    options: [
      { label: "a", text: "garden"     },
      { label: "b", text: "volleyball" },
      { label: "c", text: "library"    },
    ],
  },
  {
    id:      2,
    before:  "He has many plants in his",
    after:   ".",
    correct: "a",
    answer:  "garden",
    options: [
      { label: "a", text: "garden"   },
      { label: "b", text: "baseball" },
      { label: "c", text: "library"  },
    ],
  },
  {
    id:      3,
    before:  "The cars were very fast in the",
    after:   ".",
    correct: "c",
    answer:  "car race",
    options: [
      { label: "a", text: "baseball" },
      { label: "b", text: "museum"   },
      { label: "c", text: "car race" },
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
  const [selected,    setSelected]    = useState({});
  const [written,     setWritten]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, label) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: label }));
  };

  const handleWrite = (id, value, answer) => {
    if (showAns) return;
    if (showResults && normalize(written[id] || "") === normalize(answer)) return;
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

  const getOptionState = (item, label) => {
    const sel = selected[item.id];
    if (sel !== label) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return label === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const isWriteWrong    = (item) =>
    showResults && !showAns && normalize(written[item.id] || "") !== normalize(item.answer);
  const isWriteDisabled = (item) =>
    showAns || (showResults && normalize(written[item.id] || "") === normalize(item.answer));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Two-column grid: sentence left | options right ── */
        .rcwa-table {
          display: grid;
          grid-template-columns: 1fr auto;
          width: 100%;
         row-gap: clamp(45px, 2.4vw, 45px);
          align-items: center;
          margin : 12% 0 ;
        }

        /* ── LEFT: sentence cell ── */
        .rcwa-sentence-cell {
          display: flex;
          align-items: flex-end;

          gap: clamp(4px, 0.5vw, 8px);
          padding-right: clamp(16px, 2vw, 32px);
        }

        .rcwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.6;
          min-width: 1.4em;
        }

        .rcwa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.6;
          white-space: nowrap;
        }

        /* Input underline */
        .rcwa-input-wrap {
          position: relative;
          flex: 0 1 clamp(90px, 11vw, 170px);
          min-width: clamp(80px, 10vw, 150px);
        }

        .rcwa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.6;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rcwa-input:disabled  { opacity: 1; cursor: default; }
        .rcwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

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

        /* ── RIGHT: options cell ── */
        .rcwa-options-cell {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 28px);
        }

        /* Single option pill */
        .rcwa-option {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.5vw, 7px);
          cursor: pointer;
          user-select: none;
          border: 2px solid transparent;
          border-radius: 999px;
          padding: clamp(3px, 0.4vw, 6px) clamp(10px, 1.2vw, 16px);
          transition: border-color 0.15s;
          white-space: nowrap;
          min-width: clamp(75px, 8.5vw, 115px);
        }
        .rcwa-option--locked   { cursor: default; }
        .rcwa-option--selected { border-color: ${CIRCLE_SELECTED}; }
        .rcwa-option--correct  { border-color: ${CIRCLE_CORRECT};  }
        .rcwa-option--wrong    { border-color: ${CIRCLE_WRONG};    }

        .rcwa-option-badge {
          position: absolute;
          top: -7px; right: -7px;
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
          font-weight: 700;
          line-height: 1;
        }

        .rcwa-option-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1;
        }

        .rcwa-buttons {
          grid-column: 1 / -1;
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
          Read, choose, and write.
        </h1>

        {/* ── Two-column grid ── */}
        <div className="rcwa-table">
          {ITEMS.map((item) => {
            const writeWrong    = isWriteWrong(item);
            const writeDisabled = isWriteDisabled(item);
            const writeValue    = written[item.id] || "";
            const writeTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const writeUColor   = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <React.Fragment key={item.id}>

                {/* ── LEFT: sentence + input ── */}
                <div className="rcwa-sentence-cell">
                  <span className="rcwa-num">{item.id}</span>
                  {item.before && <span className="rcwa-text">{item.before}</span>}

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
                      onChange={(e) => handleWrite(item.id, e.target.value, item.answer)}
                      style={{ borderBottomColor: writeUColor, color: writeTColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {writeWrong && <div className="rcwa-input-badge">✕</div>}
                  </div>

                  {item.after && <span className="rcwa-text">{item.after}</span>}
                </div>

                {/* ── RIGHT: options (a, b, c) ── */}
                <div className="rcwa-options-cell">
                  {item.options.map((opt) => {
                    const state   = getOptionState(item, opt.label);
                    const isWrong = state === "wrong";
                    return (
                      <div
                        key={opt.label}
                        className={[
                          "rcwa-option",
                          state === "selected" ? "rcwa-option--selected" : "",
                          state === "correct"  ? "rcwa-option--correct"  : "",
                          state === "wrong"    ? "rcwa-option--wrong"    : "",
                          isLocked             ? "rcwa-option--locked"   : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() => handleSelect(item.id, opt.label)}
                      >
                        <span className="rcwa-option-label">{opt.label}</span>
                        <span className="rcwa-option-text">{opt.text}</span>
                        {isWrong && <div className="rcwa-option-badge">✕</div>}
                      </div>
                    );
                  })}
                </div>

              </React.Fragment>
            );
          })}

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
    </div>
  );
}