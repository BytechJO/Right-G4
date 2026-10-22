import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 1.svg";
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
const INPUT_UNDERLINE_DEFAULT = "#2b2b2b";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Qtype: "fixed" = question is shown, "input" = student writes question
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    Qtype: "fixed",
    question: "Did he have a chair?",
    correctA: ["Yes, he had a chair.", "yes he had a chair"],
    answerA: "Yes, he had a chair.",
  },
  {
    id: 2,
    Qtype: "input",
    correctQ: ["Did he have a robot?", "did he have a robot"],
    answerQ: "Did he have a robot?",
    correctA: ["Yes, he had a robot.", "yes he had a robot"],
    answerA: "Yes, he had a robot.",
  },
  {
    id: 3,
    Qtype: "fixed",
    question: "Did he have a ball?",
    correctA: [
      "No, he didn't have a ball.",
      "no he didnt have a ball",
      "no he didnot have a ball",
      "no he did not have a ball",
    ],
    answerA: "No, he didn't have a ball.",
  },
  {
    id: 4,
    Qtype: "fixed",
    question: "Did he have a bike in his room?",
    correctA: [
      "No, he didn't have a bike.",
      "no he didnt have a bike",
      "no he didnot have a bike",
      "no he did not have a bike",
    ],
    answerA: "No, he didn't have a bike.",
  },
];

// build ALL_INPUTS
const ALL_INPUTS = ITEMS.flatMap((item) => {
  const arr = [];
  if (item.Qtype === "input")
    arr.push({
      key: `${item.id}q`,
      correct: item.correctQ,
      answer: item.answerQ,
    });
  arr.push({
    key: `${item.id}a`,
    correct: item.correctA,
    answer: item.answerA,
  });
  return arr;
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = normalizeAnswer;

const isCorrect = (value, alternatives) =>
  alternatives.some((answer) => normalize(value) === normalize(answer));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadAnswer_QD() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const [showAns, setShowAns] = useState(false);
  const checkDisabled =
    showAns || ALL_INPUTS.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    if (
      showAns ||
      results[key] === "correct" ||
      !ALL_INPUTS.some((item) => item.key === key)
    )
      return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!ALL_INPUTS.every((item) => answers[item.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      ALL_INPUTS.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        isCorrect(answers[item.key] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (result) => result === "correct",
    ).length;
    setResults(next);
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
    resetButtonRef.current?.focus({ preventScroll: true });
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
    const disabled = getDisabled(key);
    return (
      <div className="lrad-input-wrap">
        <input
          {...fieldKeys}
          aria-label={`Question ${key[0]}. Write the ${key.endsWith("q") ? "question" : "answer"}${ITEMS.find((item) => String(item.id) === key[0])?.question ? ": " + ITEMS.find((item) => String(item.id) === key[0]).question : " using the picture or hint"}.`}
          title={`Question ${key[0]}. Write the ${key.endsWith("q") ? "question" : "answer"}${ITEMS.find((item) => String(item.id) === key[0])?.question ? ": " + ITEMS.find((item) => String(item.id) === key[0]).question : " using the picture or hint"}.`}
          placeholder="Sentence"
          type="text"
          className={[
            "lrad-input",
            wrong ? "lrad-input--wrong" : "",
            showAns ? "lrad-input--answer" : "",
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
        {wrong && <div className="lrad-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-unit3-scope="Unit3_Page6_Q1" className="main-container-component">
      <style>{`[data-unit3-scope="Unit3_Page6_Q1"] input:focus-visible, [data-unit3-scope="Unit3_Page6_Q1"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Layout: left QA | right image ── */
        .lrad-layout {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
          margin : 5% 0 ;
        }

        .lrad-img {
    width: 100%;
    height: 100%;
    display: block;
        }

        /* Items list */
        .lrad-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
        }

        /* Single item */
        .lrad-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Q line */
        .lrad-q-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lrad-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lrad-qlabel {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lrad-qfixed {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Answer line — indented */
        .lrad-a-line {
          padding-left: clamp(22px, 2.8vw, 34px);
        }

        /* Input wrap */
        .lrad-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 260px);
        }

        .lrad-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrad-input:disabled   { opacity: 1; cursor: default; }
        .lrad-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrad-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrad-badge {
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
        .lrad-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrad-layout { grid-template-columns: 1fr; }
          .lrad-img { width: 100%; }
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
          sectionLetter="D"
          title={<>Look, read, and answer. Use a long answer.</>}
          subTitle={
            "Study the picture first, then answer each question with a complete long answer before checking."
          }
        />

        {/* ── Layout ── */}
        <div className="lrad-layout">
          {/* Left: items */}
          <div className="lrad-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="lrad-item">
                {/* Question line */}
                <div className="lrad-q-line">
                  <span className="lrad-num">{item.id}</span>
                  {item.Qtype === "fixed" ? (
                    <span className="lrad-qfixed">{item.question}</span>
                  ) : (
                    <>
                      <span className="lrad-qlabel">Q:</span>
                      {renderInput(`${item.id}q`, item.correctQ)}
                    </>
                  )}
                </div>

                {/* Answer line */}
                <div className="lrad-a-line">
                  {renderInput(`${item.id}a`, item.correctA)}
                </div>
              </div>
            ))}
          </div>

          {/* Right: image */}
          <img
            src={imgScene}
            alt="A boy in his bedroom beside a bed, with a robot on the bed, a chair, a lamp and a computer."
            className="lrad-img"
          />
        </div>

        {/* ── Buttons ── */}
        <div className="lrad-buttons">
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
