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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["party", "delicious", "gifts", "birthday"];

const ITEMS = [
  {
    id: 1,
    before: "He got many",
    after: "for his birthday.",
    correct: ["gifts"],
    answer: "gifts",
  },
  {
    id: 2,
    before: "We had a big birthday",
    after: "with singing and games.",
    correct: ["party"],
    answer: "party",
  },
  {
    id: 3,
    before: "The cake was sweet and",
    after: ".",
    correct: ["delicious"],
    answer: "delicious",
  },
  {
    id: 4,
    before: "Newton has a",
    after: "in August.",
    correct: ["birthday"],
    answer: "birthday",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QA() {
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

  const isWrong = (item) => !showAns && results[item.id] === "wrong";

  return (
    <div
      data-adapt-scope="review3&4_Review3_Page1_Q1"
      className="main-container-component"
    >
      <style>{`[data-adapt-scope="review3&4_Review3_Page1_Q1"] input:focus-visible, [data-adapt-scope="review3&4_Review3_Page1_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review3_Page1_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Word bank ── */
        .rwa-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: center;
          width: 100%;
          margin-top : 7%  ;
        }

        .rwa-pill {
          border: 2px solid #e8eff1;
          border-radius: 6px;
          padding: clamp(4px, 0.5vw, 7px) clamp(18px, 2.4vw, 30px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Items list ── */
        .rwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(35px, 1.8vw, 35px);;
          width: 100%;
        }

        /* Single row */
        .rwa-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
        }

        .rwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwa-input-wrap {
          position: relative;
          flex: 0 1 clamp(100px, 12vw, 180px);
          min-width: clamp(90px, 11vw, 160px);
        }

        .rwa-input {
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
        .rwa-input:disabled  { opacity: 1; cursor: default; }
        .rwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwa-badge {
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

        /* Buttons */
        .rwa-buttons {
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
        <ExerciseHeader
          isReview={true}
          sectionLetter="A"
          title={<>Read and write. Use the words below.</>}
          subTitle="Check the picture or sentence clue first, then choose the matching word and complete each blank before checking."
        />

        {/* ── Word bank ── */}
        <div className="rwa-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwa-pill">
              {w}
            </div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rwa-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong
              ? INPUT_UNDERLINE_WRONG
              : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rwa-row">
                <span className="rwa-num">{item.id}</span>
                <span className="rwa-text">{item.before}</span>
                <div className="rwa-input-wrap">
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
                    type="text"
                    className={[
                      "rwa-input",
                      wrong ? "rwa-input--wrong" : "",
                      showAns ? "rwa-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{
                      ...{ borderBottomColor: uColor, color: tColor },
                      borderBottomColor:
                        showAns || results[item.id] === "correct"
                          ? "#16a34a"
                          : results[item.id] === "wrong"
                            ? "#ef4444"
                            : { borderBottomColor: uColor, color: tColor }
                                .borderBottomColor,
                    }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwa-badge">✕</div>}
                </div>
                <span className="rwa-text">{item.after}</span>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwa-buttons">
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
