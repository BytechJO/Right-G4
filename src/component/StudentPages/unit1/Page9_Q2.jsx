import React, { useState, useRef } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const SCRAMBLED_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    scrambled: "the  he  won't  go  library  to",
    correct: ["He won't go to the library.", "He won't go to the library"],
    answer: "He won't go to the library.",
  },
  {
    id: 2,
    scrambled: "will  they  eat  pizza ?",
    correct: ["Will they eat pizza?", "Will they eat pizza"],
    answer: "Will they eat pizza?",
  },
  {
    id: 3,
    scrambled: "the  I  won't  swim  sea  in",
    correct: ["I won't swim in the sea.", "I won't swim in the sea"],
    answer: "I won't swim in the sea.",
  },
  {
    id: 4,
    scrambled: "will  you  clean  room  the ?",
    correct: ["Will you clean the room?", "Will you clean the room"],
    answer: "Will you clean the room?",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
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

export default function WB_UnscrambleWrite_QE() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (!item || results[id] === "correct") return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. ${ITEMS.map((item) => `Question ${item.id}: ${checked[item.id]}`).join(". ")}`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setResults({});
    setShowAns(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  const isDisabled = (item) => showAns || results[item.id] === "correct";

  return (
    <div className="main-container-component sb-unit1-page9_q2">
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .sb-unit1-page9_q2 .uswe-input:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
        /* ── Items list ── */
        .uswe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          margin : 5% 0 ;
        }

        /* ── Single item: scrambled row + input row ── */
        .uswe-item {
          display: flex;
          flex-direction: column;
        }

        /* Scrambled row */
        .uswe-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .uswe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .uswe-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.5;
        }

        /* Input wrap — full width, indented */
        .uswe-input-wrap {
          position: relative;
          width: 100%;
          padding-left: clamp(18px, 2.2vw, 28px);
          box-sizing: border-box;
        }

        .uswe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .uswe-input:disabled   { opacity: 1; cursor: default; }
        .uswe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .uswe-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .uswe-buttons {
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
          sectionLetter="E"
          title={"Unscramble and write."}
          subTitle={
            "Say the correct word or sentence first, then reorder the parts and write the answer before checking."
          }
        />

        {/* ── Items ── */}
        <div className="uswe-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = INPUT_TEXT_COLOR;
            const uColor = wrong
              ? INPUT_UNDERLINE_WRONG
              : isDisabled(item)
                ? "#16a34a"
                : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="uswe-item">
                {/* Scrambled words */}
                <div className="uswe-scrambled-row">
                  <span className="uswe-num">{item.id}</span>
                  <span className="uswe-scrambled">{item.scrambled}</span>
                </div>

                {/* Answer input */}
                <div className="uswe-input-wrap">
                  <input
                    type="text"
                    aria-label={`Question ${item.id}. Unscramble: ${item.scrambled}`}
                    aria-invalid={wrong}
                    {...fieldKeys}
                    className={[
                      "uswe-input",
                      wrong ? "uswe-input--wrong" : "",
                      showAns ? "uswe-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="uswe-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="uswe-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              onClick={handleReset}
              {...activationKeys}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              onClick={handleShowAnswer}
              {...activationKeys}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              onClick={handleCheck}
              {...activationKeys}
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
