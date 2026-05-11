import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 50/SVG/Asset 1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["All set", "What about", "I'm", "Okay"];

const ITEMS = [
  {
    id:      1,
    after:   "almost ready.",
    correct: ["I'm", "im"],
    answer:  "I'm",
  },
  {
    id:      2,
    after:   ", dear.",
    correct: ["Okay", "okay"],
    answer:  "Okay",
  },
  {
    id:      3,
    after:   "these?",
    correct: ["What about", "what about"],
    answer:  "What about",
  },
  {
    id:      4,
    after:   "for school?",
    correct: ["All set", "all set"],
    answer:  "All set",
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
export default function WB_ReadWrite_QB() {
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
        /* ── Word bank ── */
        .rwb-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: flex-start;
          width: 100%; 
          margin : 5% 0 %
        }

        .rwb-pill {
          background: #e8eff1;
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(5px, 0.6vw, 8px) clamp(14px, 1.8vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Body: items ysar | image yamin ── */
        .rwb-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        /* ── Items list ── */
        .rwb-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
        }

        /* Single row: num | input | after */
        .rwb-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        .rwb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwb-input-wrap {
          position: relative;
          flex: 0 1 clamp(120px, 16vw, 220px);
          min-width: clamp(100px, 14vw, 190px);
        }

        .rwb-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwb-input:disabled  { opacity: 1; cursor: default; }
        .rwb-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwb-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

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

        .rwb-after {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Scene image */
        .rwb-scene-img {
          width: 100%;
          height: 105%;
          display: block;
          flex-shrink: 0;
        }

        .rwb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwb-body { grid-template-columns: 1fr; }
          .rwb-scene-img { width: 100%; max-width: 320px; margin: 0 auto; }
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
          <span className="WB-ex-A-1">B</span>
          Read and write. Use the words below.
        </h1>

        {/* ── Word bank ── */}
        <div className="rwb-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwb-pill">{w}</div>
          ))}
        </div>

        {/* ── Body: items + image ── */}
        <div className="rwb-body">

          {/* Items */}
          <div className="rwb-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rwb-row">
                  <span className="rwb-num">{item.id}</span>

                  <div className="rwb-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rwb-input",
                        wrong   ? "rwb-input--wrong"  : "",
                        showAns ? "rwb-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwb-badge">✕</div>}
                  </div>

                  <span className="rwb-after">{item.after}</span>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="rwb-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rwb-buttons">
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