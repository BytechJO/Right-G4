import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
// import { div } from "framer-motion/client";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR = "#2096a6";
const CIRCLE_WRONG = "#ef4444";
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR = "#2b2b2b";
const WRONG_COLOR = "#ef4444";
const RIGHT_COLOR = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    before: "I",
    after: ".",
    correct: "forgot",
    options: [
      { label: "a", text: "forgot" },
      { label: "b", text: "guys doing" },
    ],
  },
  {
    id: 2,
    before: "It sure",
    after: "!",
    correct: "does",
    options: [
      { label: "a", text: "hey" },
      { label: "b", text: "does" },
    ],
  },
  {
    id: 3,
    before: "What are you guys",
    after: "?",
    correct: "doing",
    options: [
      { label: "a", text: "you" },
      { label: "b", text: "doing" },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadCircleWrite_QA() {
  const [selected, setSelected] = useState({}); // { itemId: optionText }
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId, text) => {
    if (showAns || results[itemId] === "correct") return;
    setSelected((prev) => ({ ...prev, [itemId]: text }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setAnnouncement("Selection updated.");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (
      !ITEMS.every(
        (item) =>
          selected[item.id] !== undefined &&
          selected[item.id] !== null &&
          selected[item.id] !== "",
      )
    ) {
      ValidationAlert.info("Please choose an answer for each question.");
      setAnnouncement("Please choose an answer for each question.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || selected[item.id] === item.correct
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (value) => value === "correct",
    ).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  const getOptionState = (item, optText) => {
    const isSel = selected[item.id] === optText;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (results[item.id] !== undefined)
      return item.correct === optText ? "correct" : "wrong";
    return "selected";
  };

  const getInputValue = (item) => {
    const sel = selected[item.id];
    if (!sel) return "";
    return sel;
  };

  const getInputColor = (item) =>
    showAns || results[item.id] === "correct"
      ? "#16a34a"
      : results[item.id] === "wrong"
        ? WRONG_COLOR
        : ANSWER_COLOR;

  return (
    <div
      data-adapt-scope="unit4_Unit4_Page5_Q3"
      className="main-container-component"
    >
      <style>{`[data-adapt-scope="unit4_Unit4_Page5_Q3"] input:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── كل صف ── */
        .rcw-row {
          display: flex;
          align-items: baseline;
          gap: clamp(24px, 4vw, 60px);
          width: 100%;
          flex-wrap: nowrap;
          
          }
          
          /* ── الجملة يسار ── */
        .rcw-sentence {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex: 1;
          min-width: 0;
          flex-wrap: nowrap;
        }
        
        .rcw-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
        }
        
        .rcw-text {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          flex-shrink: 0;
          }
          
          /* input الجملة */
          .rcw-input-wrap {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: clamp(80px, 10vw, 140px);
            }
            
            .rcw-input {
              width: 100%;
              border: none;
              border-bottom: 1px solid ${LINE_COLOR};
              outline: none;
              background: transparent;
              font-size: clamp(15px, 1.8vw, 22px);
              font-weight: 700;
              padding: 0 4px 2px;
              text-align: center;
              caret-color: transparent;
              cursor: default;
              pointer-events: none;
              }
              
        /* ── الخيارات يمين ── */
        .rcw-options {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 28px);
          flex-shrink: 0;
          }

          .rcw-option {
            display: flex;
            align-items: center;
            gap: 6px;
            }
            
            .rcw-opt-label {
              font-size: clamp(13px, 1.5vw, 18px);
              font-weight: 700;
              color: ${TEXT_DEFAULT};
              flex-shrink: 0;
              }
              
              /* الكلمة مع الدائرة */
              .rcw-opt-word {
                position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 6px) clamp(12px, 1.6vw, 20px);
          cursor: pointer;
          user-select: none;
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          }
          .rcw-opt-word--locked { cursor: default; }
          
          .rcw-oval {
            position: absolute;
            inset: 0;
            border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
          }

          .rcw-opt-word--selected .rcw-oval { border-color: ${CIRCLE_COLOR}; }
        .rcw-opt-word--correct  .rcw-oval { border-color: ${CIRCLE_COLOR}; }
        .rcw-opt-word--wrong    .rcw-oval { border-color: ${CIRCLE_WRONG}; }
        
        /* ✕ badge */
        .rcw-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.6vw, 19px);
          height: clamp(15px, 1.6vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
          }
          
          .rcw-buttons {
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
          gap: "clamp(20px, 2.8vw, 36px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <ExerciseHeader
          sectionLetter="C"
          title={<>Read, circle, and write.</>}
          subTitle={"Read the clue carefully, select the correct option first, then complete the blank before checking."}
        />

        {/* Rows */}
        {ITEMS.map((item) => {
          const inputVal = getInputValue(item);
          const inputColor = getInputColor(item);

          return (
            <div style={{ marginTop: "5%  " }}>
              <div key={item.id} className="rcw-row">
                {/* ── الجملة ── */}
                <div className="rcw-sentence">
                  <span className="rcw-num">{item.id}</span>
                  <span className="rcw-text">{item.before}</span>

                  <span className="rcw-input-wrap">
                    <input
                      aria-label={`Question ${item.id}. Selected answer.`}
                      title={`Question ${item.id}. Selected answer.`}
                      className="rcw-input"
                      type="text"
                      readOnly
                      value={inputVal}
                      style={{
                        color: inputColor,
                        borderBottomColor: inputVal ? inputColor : LINE_COLOR,
                      }}
                    />
                  </span>

                  <span className="rcw-text">{item.after}</span>
                </div>

                {/* ── الخيارات ── */}
                <div className="rcw-options">
                  {item.options.map((opt) => {
                    const state = getOptionState(item, opt.text);
                    return (
                      <div key={opt.label} className="rcw-option">
                        <span className="rcw-opt-label">{opt.label}</span>
                        <span
                          style={{
                            ...{},
                            borderRadius: {}.borderRadius || "6px",
                            background:
                              selected[item.id] === opt.text &&
                              !showAns &&
                              results[item.id] === undefined
                                ? "#dbeafe"
                                : {}.background,
                            boxShadow:
                              selected[item.id] === opt.text
                                ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                                : undefined,
                          }}
                          role="button"
                          tabIndex={0}
                          data-keyboard-choice
                          {...activationKeys}
                          aria-label={`Question ${item.id}. ${opt.text}`}
                          aria-pressed={selected[item.id] === opt.text}
                          aria-disabled={
                            showAns || results[item.id] === "correct"
                          }
                          className={[
                            "rcw-opt-word",
                            isLocked ? "rcw-opt-word--locked" : "",
                            state === "selected"
                              ? "rcw-opt-word--selected"
                              : "",
                            state === "correct" ? "rcw-opt-word--correct" : "",
                            state === "wrong" ? "rcw-opt-word--wrong" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => handleSelect(item.id, opt.text)}
                        >
                          <div className="rcw-oval" />
                          {opt.text}
                          {state === "wrong" && (
                            <div className="rcw-badge">✕</div>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Buttons */}
        <div className="rcw-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              aria-label="Check Answer"
              {...activationKeys}
              onClick={handleCheck}
              disabled={checkDisabled}
              style={{ cursor: checkDisabled ? "not-allowed" : "pointer" }}
              className="check-button2"
            >
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
