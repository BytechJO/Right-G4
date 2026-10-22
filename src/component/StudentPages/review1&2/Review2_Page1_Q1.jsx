import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — a through f
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 30.svg";
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 31.svg";
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 32.svg";
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 35.svg";
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 34.svg";
import imgF from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 18/SVG/Asset 33.svg";
import ExerciseHeader from "../../ExerciseHeader";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const WORD_COLOR = "#2b2b2b";
const IMG_LABEL_BG = "#ffffff";
const IMG_LABEL_BORDER = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORDS = [
  { id: 1, word: "kangaroo", correct: ["b", "B"], answer: "b" },
  { id: 2, word: "New York City", correct: ["c", "C"], answer: "c" },
  { id: 3, word: "Australia", correct: ["d", "D"], answer: "d" },
  { id: 4, word: "Japan", correct: ["a", "A"], answer: "a" },
  { id: 5, word: "Statue of Liberty", correct: ["f", "F"], answer: "f" },
  { id: 6, word: "summer", correct: ["e", "E"], answer: "e" },
];

const IMAGES = [
  { label: "a", src: imgA },
  { label: "b", src: imgB },
  { label: "c", src: imgC },
  { label: "d", src: imgD },
  { label: "e", src: imgE },
  { label: "f", src: imgF },
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

export default function WB_ReadLookMatch_QJ() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || WORDS.every((w) => results[w.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns || results[id] === "correct") return;
    if (!WORDS.some((w) => w.id === id)) return;
    if (value.length > 1) return;
    setAnswers((previous) => ({ ...previous, [id]: value }));
    setResults((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!WORDS.every((w) => answers[w.id]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const checked = Object.fromEntries(
      WORDS.map((w) => [
        w.id,
        results[w.id] === "correct" || isCorrect(answers[w.id] || "", w.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${WORDS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === WORDS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    WORDS.forEach((w) => {
      filled[w.id] = w.answer;
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

  const isWrong = (w) => !showAns && results[w.id] === "wrong";

  const isDisabled = (w) => showAns || results[w.id] === "correct";

  return (
    <div
      className="main-container-component"
      data-review12-scope="Review2_Page1_Q1"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review2_Page1_Q1"] input:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        .rlm-layout {
          display: grid;
          grid-template-columns: clamp(160px, 22vw, 280px) 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
          margin : 5% 0 ;
        }

        .rlm-words {
          display: flex;
          flex-direction: column;
gap: 1.5em;        }

        .rlm-word-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);

        }

        .rlm-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rlm-input {
          width: clamp(100px, 4.5vw, 100px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rlm-input:disabled  { opacity: 1; cursor: default; }
        .rlm-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlm-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rlm-badge {
          position: absolute;
          top: -8px; right: -6px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rlm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rlm-word {
          font-size: clamp(14px, 1.7vw, 18px);
          font-weight: 400;
          color: ${WORD_COLOR};
          line-height: 1;
        }

        /* Images grid — aspect-ratio يضمن تساوي الارتفاعات */
        .rlm-images {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap:clamp(30px, 1.2vw, 30px) clamp(30px, 1.2vw, 30px) ;
    align-self: center;
          
        }

        .rlm-img-card {
          position: relative;
            width: 112%;
              height: 110%;
        }

        .rlm-img {
          width: 100%;
              height: 100%;

          display: block;
        }

        .rlm-img-label {
          position: absolute;
          top: 4px; right: 4px;
          width: clamp(20px, 2.4vw, 28px);
          height: clamp(20px, 2.4vw, 28px);
          border-radius: 5px;
          background: ${IMG_LABEL_BG};
          border: 1.5px solid ${IMG_LABEL_BORDER};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 700;
          color: ${IMG_LABEL_BORDER};
          line-height: 1;
          user-select: none;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlm-layout { grid-template-columns: 1fr; }
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
          title={"Read, look, and match."}
          subTitle={
            "Start with one item, then connect it to the picture, word, or sentence that matches before moving to the next pair."
          }
        />
        <div className="rlm-layout">
          {/* Words */}
          <div className="rlm-words">
            {WORDS.map((w) => {
              const wrong = isWrong(w);
              const value = answers[w.id] || "";
              const tColor = INPUT_TEXT_COLOR;
              const uColor = wrong
                ? INPUT_UNDERLINE_WRONG
                : isDisabled(w)
                  ? "#16a34a"
                  : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(w);

              return (
                <div key={w.id} className="rlm-word-row">
                  <div className="rlm-input-wrap">
                    <input
                      {...fieldKeys}
                      aria-label={`Question ${w.id}. ${w.word}. Enter the matching picture letter, a to f.`}
                      title={`Question ${w.id}. ${w.word}. Enter the matching picture letter, a to f.`}
                      placeholder="a-f"
                      aria-invalid={wrong}
                      type="text"
                      maxLength={1}
                      className={[
                        "rlm-input",
                        wrong ? "rlm-input--wrong" : "",
                        showAns ? "rlm-input--answer" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(w.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rlm-badge">✕</div>}
                  </div>
                  <span className="rlm-num">{w.id}</span>
                  <span className="rlm-word">{w.word}</span>
                </div>
              );
            })}
          </div>

          {/* Images 3×2 */}
          <div className="rlm-images">
            {IMAGES.map((img) => (
              <div key={img.label} className="rlm-img-card">
                <img
                  src={img.src}
                  alt={`img-${img.label}`}
                  className="rlm-img"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rlm-buttons">
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
