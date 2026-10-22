import React, { useState, useRef } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgJapan from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 13.svg";
import imgRussia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 14.svg";
import imgUK from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 15.svg";
import imgAus from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 16.svg";
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
const NUMBER_COLOR = "#2b2b2b";
const TEXT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

const ITEMS = [
  {
    id: 1,
    prefix: "Did she have a bike?",
    src: imgJapan,
    correct: ["Yes, she did."],
    answer: "Yes, she did.",
  },
  {
    id: 2,
    prefix: "Did he have a boat?",
    src: imgRussia,
    correct: ["Yes, he did."],
    answer: "Yes, he did.",
  },
  {
    id: 3,
    prefix: "Did she have a chicken?",
    src: imgUK,
    correct: [
      "No, she did'nt",
      "No, she didnt",
      "No, she didnot",
      "No, she did not",
    ],
    answer: "No, she did'nt.",
  },
  {
    id: 4,
    prefix: "Did he have a cap?",
    src: imgAus,
    correct: ["Yes, he did."],
    answer: "Yes, he did.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = normalizeAnswer;

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadWrite_QD() {
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
    <div className="main-container-component" data-unit3-scope="Unit3_Page6_Q2">
      <style>{`[data-unit3-scope="Unit3_Page6_Q2"] input:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
        .lrwd-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: center;
          width: 100%;
        }

        .lrwd-pill {
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(4px, 0.5vw, 6px) clamp(14px, 2vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2×2 grid ── */
        .lrwd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single card: num+prefix | image | input */
        .lrwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* Prefix row */
        .lrwd-prefix-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        .lrwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwd-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image */
        .lrwd-img {
          width: 50%;
          height : auto ;
          object-fit: cover;
          display: block;
        }

        /* Input wrap */
        .lrwd-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrwd-input {
    width: 80%;
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
        .lrwd-input:disabled   { opacity: 1; cursor: default; }
        .lrwd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwd-badge {
          position: absolute;
          top: -8px;     right: 5em;

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
        .lrwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lrwd-grid { grid-template-columns: 1fr; }
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
          title="Listen, read, and write."
          subTitle={
            "Study the picture first, then write the correct short answer for each question before checking."
          }
        />

        {/* ── 2×2 grid ── */}
        <div className="lrwd-grid">
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
              <div key={item.id} className="lrwd-card">
                {/* Prefix */}
                <div className="lrwd-prefix-row">
                  <span className="lrwd-num">{item.id}</span>
                  <span className="lrwd-prefix">{item.prefix}</span>
                </div>

                {/* Image */}
                <img
                  src={item.src}
                  alt={
                    [
                      "A girl wearing a helmet and riding a bicycle.",
                      "A boy wearing a life jacket on a sailboat.",
                      "A girl holding a doll.",
                      "A boy wearing a cap and backpack inside a shop.",
                    ][item.id - 1]
                  }
                  className="lrwd-img"
                />

                {/* Input */}
                <div className="lrwd-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. ${item.prefix} Write the answer.`}
                    title={`Question ${item.id}. ${item.prefix} Write the answer.`}
                    placeholder="Answer"
                    aria-invalid={wrong}
                    type="text"
                    className={[
                      "lrwd-input",
                      wrong ? "lrwd-input--wrong" : "",
                      showAns ? "lrwd-input--answer" : "",
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
                  {wrong && <div className="lrwd-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwd-buttons">
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
