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

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const ITEMS = [
  {
    id: 1,
    scrambled: "all at Not",
    correct: ["Not at all.", "Not at all"],
    answer: "Not at all.",
  },
  {
    id: 2,
    scrambled: "part That best the was",
    correct: ["That was the best part.", "That was the best part"],
    answer: "That was the best part.",
  },
  {
    id: 3,
    scrambled: "party a was it Yeah, great",
    correct: ["Yeah, it was a great party.", "Yeah, it was a great party"],
    answer: "Yeah, it was a great party.",
  },
];

const normalize = normalizeAnswer;

const isCorrect = (value, alternatives) =>
  alternatives.some((answer) => normalize(value) === normalize(answer));

export default function WB_UnscrambleWrite_QB_U3() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const [showAns, setShowAns] = useState(false);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (
      showAns ||
      results[id] === "correct" ||
      !ITEMS.some((item) => item.id === id)
    )
      return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!ITEMS.every((item) => answers[item.id]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (result) => result === "correct",
    ).length;
    setResults(next);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
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
    resetButtonRef.current?.focus({ preventScroll: true });
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
    <div data-unit3-scope="Unit3_Page5_Q2" className="main-container-component">
      <style>{`[data-unit3-scope="Unit3_Page5_Q2"] input:focus-visible, [data-unit3-scope="Unit3_Page5_Q2"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .usw3-list { display: flex; flex-direction: column; gap: clamp(55px, 1.8vw, 55px); width: 100%; margin-top : 10%  }
        .usw3-row  { display: flex; align-items: flex-end; gap: clamp(5px, 0.7vw, 9px); min-width: 0; }
        .usw3-num  { font-size: clamp(14px, 1.7vw, 20px); font-weight: 700; color: ${NUMBER_COLOR}; flex-shrink: 0; padding-bottom: 4px; line-height: 1; }
        .usw3-scrambled { font-size: clamp(13px, 1.6vw, 19px); color: #2b2b2b; white-space: nowrap; flex-shrink: 0; padding-bottom: 4px; line-height: 1; }
        .usw3-input-wrap { position: relative; flex: 1; min-width: clamp(80px, 10vw, 200px); }
        .usw3-input {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none; font-size: clamp(13px, 1.6vw, 19px); color: ${INPUT_TEXT_COLOR};
          line-height: 1; box-sizing: border-box;
          font-family: inherit; transition: border-color 0.2s;
        }
        .usw3-input:disabled   { opacity: 1; cursor: default; }
        .usw3-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .usw3-input--answer    { color: ${INPUT_ANSWER_COLOR}; }
        .usw3-badge {
          position: absolute; top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px); height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%; background: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px); font-weight: 700;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none; z-index: 2;
        }
        .usw3-buttons { display: flex; justify-content: center; margin-top: clamp(8px, 1.6vw, 18px); }
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
        <ExerciseHeader
          sectionLetter="B"
          title={<>Unscramble and write.</>}
          subTitle={
            "Say the correct word or sentence first, then reorder the parts and write the answer before checking."
          }
        />

        <div className="usw3-list">
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
              <div key={item.id} className="usw3-row">
                <span className="usw3-num">{item.id}</span>
                <span className="usw3-scrambled">{item.scrambled}</span>
                <div className="usw3-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. Unscramble: ${item.scrambled}`}
                    title={`Question ${item.id}. Unscramble: ${item.scrambled}`}
                    placeholder="Sentence"
                    type="text"
                    className={[
                      "usw3-input",
                      wrong ? "usw3-input--wrong" : "",
                      showAns ? "usw3-input--answer" : "",
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
                  {wrong && <div className="usw3-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="usw3-buttons">
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
