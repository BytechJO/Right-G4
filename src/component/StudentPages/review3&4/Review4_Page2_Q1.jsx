import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 4 characters A B C D
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 1.svg";
import imgB from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 2.svg";
import imgC from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 3.svg";
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const LABEL_BG                = "#9e9e9e";
const LABEL_TEXT              = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const CHARS = [
  { label: "A", src: imgA },
  { label: "B", src: imgB },
  { label: "C", src: imgC },
  { label: "D", src: imgD },
];

const ITEMS = [
  {
    id:      1,
    question: "Who is the shortest?",
    correct: ["D is the shortest.", "d is the shortest"],
    answer:  "D is the shortest.",
  },
  {
    id:      2,
    question: "Who is younger, A or B?",
    correct: ["A is younger.", "a is younger"],
    answer:  "A is younger.",
  },
  {
    id:      3,
    question: "Who is lighter, A or C?",
    correct: ["C is lighter.", "c is lighter"],
    answer:  "C is lighter.",
  },
  {
    id:      4,
    question: "Who is the oldest?",
    correct: ["B is the oldest.", "b is the oldest"],
    answer:  "B is the oldest.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWrite_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Characters row ── */
        .lwqd-chars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          align-items: flex-end;
        }

        .lwqd-char-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lwqd-char-img {
          width: clamp(70px, 10vw, 140px);
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Label circle (A / B / C / D) */
        .lwqd-char-label {
          width: clamp(28px, 3.2vw, 40px);
          height: clamp(28px, 3.2vw, 40px);
          border-radius: 50%;
          background: ${LABEL_BG};
          color: ${LABEL_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ── Questions list ── */
        .lwqd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          margin-top: clamp(8px, 1.2vw, 16px);
        }

        /* Single row: num | question | input */
        .lwqd-row {
          display: grid;
          grid-template-columns: auto clamp(180px, 24vw, 300px) 1fr;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        .lwqd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lwqd-question {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${QUESTION_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        /* Input wrap */
        .lwqd-input-wrap {
          position: relative;
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
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwqd-input:disabled  { opacity: 1; cursor: default; }
        .lwqd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqd-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

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

        .lwqd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwqd-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .lwqd-input-wrap { grid-column: 1 / -1; }
          .lwqd-question   { white-space: normal; }
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">D</span>
          Look and write.
        </h1>

        {/* ── Characters row ── */}
        <div className="lwqd-chars">
          {CHARS.map((ch) => (
            <div key={ch.label} className="lwqd-char-card">
              <img src={ch.src} alt={`char-${ch.label}`} className="lwqd-char-img" />
              <div className="lwqd-char-label">{ch.label}</div>
            </div>
          ))}
        </div>

        {/* ── Questions ── */}
        <div className="lwqd-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwqd-row">
                <span className="lwqd-num">{item.id}</span>
                <span className="lwqd-question">{item.question}</span>
                <div className="lwqd-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lwqd-input",
                      wrong   ? "lwqd-input--wrong"  : "",
                      showAns ? "lwqd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
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
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}