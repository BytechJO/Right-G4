import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

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
const WORD_BANK = ["know", "about you?", "enjoying", "am."];

const ITEMS = [
  {
    id: 1,
    before: "I'm really",
    after: "",
    correct: ["enjoying"],
    answer: "enjoying",
  },
  {
    id: 2,
    before: "How",
    after: "",
    correct: ["about you?", "about you"],
    answer: "about you?",
  },
  {
    id: 3,
    before: "I",
    after: "",
    correct: ["know"],
    answer: "know",
  },
  {
    id: 4,
    before: "I sure",
    after: "",
    correct: ["am.", "am"],
    answer: "am.",
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

export default function WB_ReadWrite_QB() {
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
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    setResults(
      Object.fromEntries(
        ITEMS.map((item) => [
          item.id,
          results[item.id] === "correct" ||
          isCorrect(answers[item.id] || "", item.correct)
            ? "correct"
            : "wrong",
        ]),
      ),
    );
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
    <div className="main-container-component" data-unit2-scope="Unit2_Page5_Q2">
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        [data-unit2-scope="Unit2_Page5_Q2"] input:focus-visible {
          outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
        }
      `}</style>
      <style>{`
        /* ── Word bank ── */
        .rwb-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 16px);
          justify-content: center;
          width: 100%;
        }

        .rwb-pill {
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(4px, 0.5vw, 7px) clamp(14px, 2vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2-col grid ── */
        .rwb-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(35px, 1.8vw, 35px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single sentence row */
        .rwb-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rwb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwb-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwb-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 130px);
        }

        .rwb-input {
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
        .rwb-input:disabled   { opacity: 1; cursor: default; }
        .rwb-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwb-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwb-badge {
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
        .rwb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rwb-grid { grid-template-columns: 1fr; }
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
          sectionLetter={"B"}
          title={"Read, look, and write. Use the words below."}
          subTitle={
            "Check the picture or sentence clue first, then choose the matching word and complete each blank before checking"
          }
        />
      </div>
      {/* ── Header ── */}

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "10% 0",
        }}
      >
        {/* ── Word bank ── */}
        <div className="rwb-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwb-pill">
              {w}
            </div>
          ))}
        </div>

        {/* ── 2-col grid ── */}
        <div className="rwb-grid">
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
              <div key={item.id} className="rwb-row">
                <span className="rwb-num">{item.id}</span>
                {item.before && <span className="rwb-text">{item.before}</span>}
                <div className="rwb-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      title={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      placeholder="Word"
                    aria-invalid={wrong}
                    type="text"
                    className={[
                      "rwb-input",
                      wrong ? "rwb-input--wrong" : "",
                      showAns ? "rwb-input--answer" : "",
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
                  {wrong && <div className="rwb-badge">✕</div>}
                </div>
                {item.after && <span className="rwb-text">{item.after}</span>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwb-buttons">
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
