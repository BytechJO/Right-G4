import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 27.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 28.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 29.svg";
import ExerciseHeader from "../../ExerciseHeader";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const HINT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    icon: "check",
    hint: "+ they",
    correctQ: ["Will they go to the moon?", "will they go to the moon"],
    answerQ: "Will they go to the moon?",
    correctA: ["Yes, they will.", "yes they will"],
    answerA: "Yes, they will.",
  },
  {
    id: 2,
    src: img2,
    icon: "cross",
    hint: "+ she",
    correctQ: ["Will she go to the beach?", "will she go to the beach"],
    answerQ: "Will she go to the beach?",
    correctA: [
      "No, she won't go to the beach.",
      "No, she won't.",
      "no she won't go to the beach",
      "no she won't",
    ],
    answerA: "No, she won't go to the beach.",
  },
  {
    id: 3,
    src: img3,
    icon: "check",
    hint: "+ you",
    correctQ: ["Will you go to the library?", "will you go to the library"],
    answerQ: "Will you go to the library?",
    correctA: [
      "Yes, I will go to the library.",
      "Yes, I will.",
      "yes i will go to the library",
      "yes i will",
    ],
    answerA: "Yes, I will go to the library.",
  },
];

// all inputs: Q then A per item
const ALL_INPUTS = ITEMS.flatMap((item) => [
  { key: `${item.id}q`, correct: item.correctQ, answer: item.answerQ },
  { key: `${item.id}a`, correct: item.correctA, answer: item.answerA },
]);

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

export default function WB_LookWriteQA_QE() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ALL_INPUTS.every((inp) => results[inp.key] === "correct");

  const handleChange = (key, value) => {
    if (showAns || results[key] === "correct") return;
    if (!ALL_INPUTS.some((inp) => inp.key === key)) return;

    setAnswers((previous) => ({ ...previous, [key]: value }));
    setResults((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!ALL_INPUTS.every((inp) => answers[inp.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const checked = Object.fromEntries(
      ALL_INPUTS.map((inp) => [
        inp.key,
        results[inp.key] === "correct" ||
        isCorrect(answers[inp.key] || "", inp.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ALL_INPUTS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ALL_INPUTS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((inp) => {
      filled[inp.key] = inp.answer;
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

  const getWrong = (key) => !showAns && results[key] === "wrong";

  const getDisabled = (key) => showAns || results[key] === "correct";

  const renderInput = (key, correctArr) => {
    const wrong = getWrong(key, correctArr);
    const value = answers[key] || "";
    const tColor = INPUT_TEXT_COLOR;
    const uColor = wrong
      ? INPUT_UNDERLINE_WRONG
      : getDisabled(key)
        ? "#16a34a"
        : INPUT_UNDERLINE_DEFAULT;
    const disabled = getDisabled(key, correctArr);
    return (
      <div className="lwqa-input-wrap">
        <input
          {...fieldKeys}
          aria-label={`Question ${key.slice(0, -1)}. Write the ${key.endsWith("q") ? "question" : "answer"} for the picture.`}
                      title={`Question ${key.slice(0, -1)}. Write the ${key.endsWith("q") ? "question" : "answer"} for the picture.`}
                      placeholder={key.endsWith("q") ? "Question" : "Answer"}
          aria-invalid={wrong}
          type="text"
          className={[
            "lwqa-input",
            wrong ? "lwqa-input--wrong" : "",
            showAns ? "lwqa-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lwqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div
      className="main-container-component"
      data-review12-scope="Review1_Page2_Q2"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review1_Page2_Q2"] input:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        /* ── Items list ── */
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single row: num | img+icon | hint + Q + A */
        .lwqa-row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        .lwqa-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
          line-height: 1;
        }

        /* img + icon */
        .lwqa-img-wrap {
          position: relative;
          width: 70%;
          flex-shrink: 0;
          overflow: hidden;
        }

        .lwqa-img {
          width: 100%;
height : auto ; 
          object-fit: cover;
          display: block;
        }

     

        /* Right side: hint + Q + A */
        .lwqa-right {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* Hint + Q line */
        .lwqa-q-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 8px);
          min-width: 0;
        }

        .lwqa-hint {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${HINT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Input wrap */
        .lwqa-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 260px);
        }

        .lwqa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwqa-input:disabled   { opacity: 1; cursor: default; }
        .lwqa-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqa-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwqa-badge {
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
        .lwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwqa-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .lwqa-right { grid-column: 1 / -1; }
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
        <ExerciseHeader
          isReview
          sectionLetter={"E"}
          title={"Look and write a question and an answer."}
          subTitle={
            "Use the picture or grammar clue, say the full question and answer first, then type both before checking."
          }
        />
        {/* ── Items ── */}
        <div className="lwqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwqa-row">
              {/* Number */}
              <span className="lwqa-num">{item.id}</span>

              {/* Image + icon */}
              <div className="lwqa-img-wrap">
                <img
                  src={item.src}
                  alt={`img-${item.id}`}
                  className="lwqa-img"
                />
              </div>

              {/* Hint + Q + A */}
              <div className="lwqa-right">
                {/* Question line */}
                <div className="lwqa-q-line">
                  <span className="lwqa-hint">{item.hint}</span>
                  {renderInput(`${item.id}q`, item.correctQ)}
                </div>
                {/* Answer line */}
                {renderInput(`${item.id}a`, item.correctA)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqa-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              {...activationKeys}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
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
