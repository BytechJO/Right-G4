import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 27.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 28.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 29.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 30.svg";
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
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR = "#2b2b2b";
const WRONG_COLOR = "#ef4444";
const RIGHT_COLOR = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";

// ─────────────────────────────────────────────
//  📝  IMAGE CARDS DATA
// ─────────────────────────────────────────────
const CARDS = [
  { id: 1, src: img1, label1: "heavy", label2: "heavier" },
  { id: 2, src: img2, label1: "young", label2: "younger" },
  { id: 3, src: img3, label1: "light", label2: "lighter" },
  { id: 4, src: img4, label1: "old", label2: "older" },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "young", correct: "old" },
  { id: 2, word: "heavier", correct: "lighter" },
  { id: 3, word: "light", correct: "heavy" },
  { id: 4, word: "older", correct: "younger" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_LookWriteOpposite_QF() {
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

  const getState = (item) =>
    showAns ? "answer" : results[item.id] || "editing";

  const getColor = (item) => {
    const state = getState(item);
    if (state === "answer") return ANSWER_COLOR;
    if (state === "correct") return RIGHT_COLOR;
    if (state === "wrong") return WRONG_COLOR;
    return TEXT_DEFAULT;
  };

  // عمودين: فردي يسار، زوجي يمين
  const leftItems = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => {
    const state = getState(item);
    const color = getColor(item);
    const val = answers[item.id] || "";

    return (
      <div key={item.id} className="owo-row">
        <span className="owo-num">{item.id}</span>
        <span className="owo-word">{item.word}</span>

        <span className="owo-input-wrap">
          <input
            placeholder="Answer"
            aria-invalid={results[item.id] === "wrong"}
            title={
              answerTargets.find((target) => target.key === item.id)?.label ||
              "Write an answer"
            }
            aria-label={
              answerTargets.find((target) => target.key === item.id)?.label ||
              "Write an answer"
            }
            {...fieldKeys}
            className="owo-input"
            type="text"
            value={state === "answer" ? item.correct : val}
            disabled={showAns || results[item.id] === "correct"}
            onChange={(e) => handleChange(item.id, e.target.value)}
            style={{
              ...{
                color: state === "answer" ? color : "AccentColor",
                borderBottomColor: state !== "editing" ? color : LINE_COLOR,
              },
              borderBottomColor:
                showAns || results[item.id] === "correct"
                  ? "#16a34a"
                  : results[item.id] === "wrong"
                    ? "#ef4444"
                    : {
                        color: state === "answer" ? color : "AccentColor",
                        borderBottomColor:
                          state !== "editing" ? color : LINE_COLOR,
                      }.borderBottomColor,
            }}
          />
          {state === "wrong" && <div className="owo-badge">✕</div>}
        </span>
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit4_Unit4_Page6_Q2"
      className="main-container-component"
    >
      <style>{`[data-adapt-scope="unit4_Unit4_Page6_Q2"] input:focus-visible, [data-adapt-scope="unit4_Unit4_Page6_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_Unit4_Page6_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── صف الصور ── */
        .owo-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
          margin-top :  8% ;
        }

        .owo-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .owo-card img {
          width: 100%;
          object-fit: cover;
          display: block;
          height : auto ;
        }

        .owo-card-label {
          background: #e8e8e8;
          text-align: center;
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${TEXT_DEFAULT};
          padding: clamp(5px, 0.6vw, 8px) 0;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* ── Grid الأسئلة ── */
        .owo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 2vw, 26px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف سؤال ── */
        .owo-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1vw, 12px);
        }

        .owo-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .owo-word {
          font-size: clamp(14px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .owo-input-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
          min-width: clamp(80px, 10vw, 130px);
        }

        .owo-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${LINE_COLOR};
          outline: none;
          background: transparent;
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 600;
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          color: ${TEXT_DEFAULT};
        }
        .owo-input:disabled { opacity: 1; cursor: default; }

        .owo-hint {
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          margin-top: 2px;
          padding: 0 4px;
        }

        /* ✕ badge */
        .owo-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .owo-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
        }

        @media (max-width: 560px) {
          .owo-cards { grid-template-columns: repeat(2, 1fr); }
          .owo-grid  { grid-template-columns: 1fr; }
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
          sectionLetter="F"
          title={<>Look and write the opposite.</>}
          subTitle={"Use each picture pair and word form as clues, then write the correct opposite before checking."}
        />

        {/* ── صف الصور ── */}
        <div className="owo-cards">
          {CARDS.map((card) => (
            <div key={card.id} className="owo-card">
              <img
                src={card.src}
                alt={
                  {
                    [img1]: "A television next to a bed.",
                    [img2]: "An older girl next to a younger girl.",
                    [img3]:
                      "A man next to an elderly man with glasses and a walking stick.",
                    [img4]: "A robot next to two feathers.",
                  }[card.src]
                }
              />
            </div>
          ))}
        </div>

        {/* ── Grid الأسئلة ── */}
        <div className="owo-grid">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px,2vw,24px)",
            }}
          >
            {leftItems.map(renderItem)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px,2vw,24px)",
            }}
          >
            {rightItems.map(renderItem)}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="owo-buttons">
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
