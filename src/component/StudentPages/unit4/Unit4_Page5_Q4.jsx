import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR = "#2b2b2b";
const WRONG_COLOR = "#ef4444";
const RIGHT_COLOR = "#2096a6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    before: "They sound",
    after: "professional than the other group.",
    correct: "more",
  },
  {
    id: 2,
    before: "The youngest sister is the",
    after: "practical.",
    correct: "most",
  },
  { id: 3, before: "Laura is", after: "elegant than Rachel.", correct: "more" },
  {
    id: 4,
    before: "The baseball team is the",
    after: "famous.",
    correct: "most",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadAndComplete_QA() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ITEMS.map((item) => ({
    key: item.id,
    correct: Array.isArray(item.correct) ? item.correct : [item.correct],
    answer: item.answer ?? item.correct,
    label: `Question ${item.id}. ${item.scrambled ? "Unscramble: " + item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.question || item.cue || item.hint || "Write an answer using the diagram."}`,
  }));
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    if (showAns || results[key] === "correct") return;
    if (!answerTargets.some((item) => item.key === key)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!answerTargets.every((item) => answers[item.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      answerTargets.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        item.correct.some(
          (answer) =>
            normalizeAnswer(answers[item.key] || "") ===
            normalizeAnswer(answer),
        )
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
      `Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === answerTargets.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);
    else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);
  };

  const handleShowAnswer = () => {
    setAnswers(
      Object.fromEntries(answerTargets.map((item) => [item.key, item.answer])),
    );
    setResults({});
    setShowResults(false);
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const getState = (item) =>
    showAns ? "answer" : results[item.id] || "editing";

  // const getColor = (item) => {
  //   const state = getState(item);
  //   if (state === "answer") return ANSWER_COLOR;
  //   if (state === "correct") return RIGHT_COLOR;
  //   if (state === "wrong") return WRONG_COLOR;
  //   return TEXT_DEFAULT;
  // };

  return (
    <div
      data-adapt-scope="unit4_Unit4_Page5_Q4"
      className="main-container-component"
    >
      <style>{`[data-adapt-scope="unit4_Unit4_Page5_Q4"] input:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q4"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q4"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
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
        <ExerciseHeader
          sectionLetter="D"
          title={"Read and complete. Use more or most."}
          subTitle={
            "Read the whole sentence, decide whether it compares two or more than two, then complete it with more or most."
          }
        />

        {/* Rows */}
        <div className="rc-rows">
          {ITEMS.map((item) => {
            const state = getState(item);
            // const color = getColor(item);
            const val = answers[item.id] || "";

            return (
              <div key={item.id} className="rc-row">
                <span className="rc-num">{item.id}</span>
                <span className="rc-text">{item.before}</span>

                <span className="rc-input-wrap">
                  <input
                    placeholder="Answer"
                    aria-invalid={results[item.id] === "wrong"}
                    title={
                      answerTargets.find((target) => target.key === item.id)
                        ?.label || "Write an answer"
                    }
                    aria-label={
                      answerTargets.find((target) => target.key === item.id)
                        ?.label || "Write an answer"
                    }
                    {...fieldKeys}
                    className="rc-input"
                    type="text"
                    value={state === "answer" ? item.correct : val}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{
                      ...{
                        borderBottomColor:
                          state === "wrong"
                            ? WRONG_COLOR
                            : val
                              ? LINE_COLOR
                              : LINE_COLOR,
                      },
                      borderBottomColor:
                        showAns || results[item.id] === "correct"
                          ? "#16a34a"
                          : results[item.id] === "wrong"
                            ? "#ef4444"
                            : {
                                borderBottomColor:
                                  state === "wrong"
                                    ? WRONG_COLOR
                                    : val
                                      ? LINE_COLOR
                                      : LINE_COLOR,
                              }.borderBottomColor,
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
