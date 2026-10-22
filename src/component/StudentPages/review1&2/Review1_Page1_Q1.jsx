import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 21.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 20.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 19.svg";
import ExerciseHeader from "../../ExerciseHeader";

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
const WORD_BANK = ["drive", "learn", "buildings", "homework"];

const ITEMS = [
  {
    id: 1,
    src: img1,
    before: "They will",
    after: "many things in school.",
    correct: ["learn"],
    answer: "learn",
  },
  {
    id: 2,
    src: img2,
    before: "My dad will",
    after: "a big truck.",
    correct: ["drive"],
    answer: "drive",
  },
  {
    id: 3,
    src: img3,
    before: "There are so many",
    after: "in this city.",
    correct: ["buildings"],
    answer: "buildings",
  },
  {
    id: 4,
    src: img4,
    before: "I can't go to the mall because I have",
    after: "to finish.",
    correct: ["homework"],
    answer: "homework",
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

export default function WB_ReadLookWrite_Review_QA() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns || results[id] === "correct") return;
    if (!ITEMS.some((item) => item.id === id)) return;

    setAnswers((previous) => ({ ...previous, [id]: value }));
    setResults((previous) => {
      const next = { ...previous };
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
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
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
    <div
      className="main-container-component"
      data-review12-scope="Review1_Page1_Q1"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review1_Page1_Q1"] input:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        /* ── Word bank ── */
        .rlwr-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: space-around;
          width: 100%;
        }

        .rlwr-pill {
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(4px, 0.5vw, 7px) clamp(16px, 2.2vw, 26px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Items list ── */
        .rlwr-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        /* Single row: num | sentence+input | img */
        .rlwr-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
        }

        .rlwr-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Sentence line */
        .rlwr-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          min-width: 0;
        }

        .rlwr-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rlwr-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 160px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rlwr-input {
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
        .rlwr-input:disabled   { opacity: 1; cursor: default; }
        .rlwr-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwr-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwr-badge {
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

        /* Image */
        .rlwr-img {
          width: 50%;
          height: auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        /* Buttons */
        .rlwr-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlwr-row { grid-template-columns: auto 1fr; }
          .rlwr-img { grid-column: 2; }
          .rlwr-sentence { flex-wrap: wrap; }
          .rlwr-text { white-space: normal; }
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
          sectionLetter={"A"}
          title={"Look, read, and write. Use the words below."}
          subTitle={
            "Check the picture or sentence clue first, then choose the matching word and complete each blank before checking."
          }
        />
        {/* ── Word bank ── */}
        <div className="rlwr-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rlwr-pill">
              {w}
            </div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rlwr-list">
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
              <div key={item.id} className="rlwr-row">
                {/* Number */}
                <span className="rlwr-num">{item.id}</span>

                {/* Sentence */}
                <div className="rlwr-sentence">
                  <span className="rlwr-text">{item.before}</span>
                  <div className="rlwr-input-wrap">
                    <input
                      {...fieldKeys}
                      aria-label={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      title={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      placeholder="Word"
                      aria-invalid={wrong}
                      type="text"
                      className={[
                        "rlwr-input",
                        wrong ? "rlwr-input--wrong" : "",
                        showAns ? "rlwr-input--answer" : "",
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
                    {wrong && <div className="rlwr-badge">✕</div>}
                  </div>
                  <span className="rlwr-text">{item.after}</span>
                </div>

                {/* Image */}
                <img
                  src={item.src}
                  alt={`img-${item.id}`}
                  className="rlwr-img"
                />
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwr-buttons">
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
