import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 25.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 24.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 17/SVG/Asset 23.svg";
import ExerciseHeader from "../../ExerciseHeader";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  icon: "check" ✓ | "cross" ✕
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    icon: "check",
    correct: ["She will write a letter.", "she will write a letter"],
    answer: "She will write a letter.",
  },
  {
    id: 2,
    src: img2,
    icon: "cross",
    correct: [
      "They won't watch a movie.",
      "they wont watch a movie",
      "they willnot watch a movie",
      "they will not watch a movie",
    ],
    answer: "They won't watch a movie.",
  },
  {
    id: 3,
    src: img3,
    icon: "check",
    correct: ["She will go shopping.", "she will go shopping"],
    answer: "She will go shopping.",
  },
  {
    id: 4,
    src: img4,
    icon: "cross",
    correct: [
      "They won't play soccer.",
      "they wont play soccer",
      "they willnot play soccer",
      "they will not play soccer",
    ],
    answer: "They won't play soccer.",
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

export default function WB_LookWrite_QD() {
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
      data-review12-scope="Review1_Page2_Q1"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review1_Page2_Q1"] input:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        /* ── 2×2 grid ── */
        .lwqd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(14px, 2.2vw, 28px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single card */
        .lwqd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* num + img wrap */
        .lwqd-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lwqd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        /* img + icon wrapper */
        .lwqd-img-wrap {
          position: relative;
          flex: 1;
          overflow: hidden;
        }

        .lwqd-img {
          width: 70%;
          height: auto ; 
          object-fit: cover;
          display: block;
        }

        /* ✓/✕ icon — bottom right */
       
        /* Input wrap */
        .lwqd-input-wrap {
          position: relative;
    width: 60%;
    right: -2em;
        }

        .lwqd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lwqd-input:disabled   { opacity: 1; cursor: default; }
        .lwqd-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwqd-badge {
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
        .lwqd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lwqd-grid { grid-template-columns: 1fr; }
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
          sectionLetter={"D"}
          title={"Look and write a sentence using will or won't."}
          subTitle={
            "se the picture clue to decide what will or won't happen, then write the complete sentence before checking."
          }
        />
        {/* ── Grid ── */}
        <div className="lwqd-grid">
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
              <div key={item.id} className="lwqd-card">
                {/* Number + Image + Icon */}
                <div className="lwqd-img-row">
                  <span className="lwqd-num">{item.id}</span>
                  <div className="lwqd-img-wrap">
                    <img
                      src={item.src}
                      alt={`img-${item.id}`}
                      className="lwqd-img"
                    />
                  </div>
                </div>

                {/* Input */}
                <div className="lwqd-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      title={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      placeholder="Sentence"
                    aria-invalid={wrong}
                    type="text"
                    className={[
                      "lwqd-input",
                      wrong ? "lwqd-input--wrong" : "",
                      showAns ? "lwqd-input--answer" : "",
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
                  {wrong && <div className="lwqd-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqd-buttons">
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
