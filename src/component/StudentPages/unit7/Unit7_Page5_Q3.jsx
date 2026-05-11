import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 12.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  before: نص قبل input (فارغ = input في البداية)
//  after:  نص بعد input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "",
    after:   "happened next?",
    correct: ["What", "what"],
    answer:  "What",
  },
  {
    id:      2,
    before:  "Oh,",
    after:   "!",
    correct: ["my", "My"],
    answer:  "my",
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
export default function WB_ReadComplete_QC() {
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
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
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

  const isWrong    = (item) =>
    showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) =>
    showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Body: items يسار | image يمين ── */
        .rcc-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
          margin : 8% 0 ;
        }

        /* ── Items list ── */
        .rcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 38px);
        }

        /* num | [before] | input | [after] */
        .rcc-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcc-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input grows to fill remaining space */
        .rcc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(130px, 20vw, 300px);
        }

        .rcc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.6;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rcc-input:disabled  { opacity: 1; cursor: default; }
        .rcc-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcc-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rcc-badge {
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

        /* Scene image */
        .rcc-scene-img {
          width: 100%;
          height: auto;
          display: block;
          flex-shrink: 0;
        }

        .rcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 540px) {
          .rcc-body { grid-template-columns: 1fr; }
          .rcc-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
          <span className="WB-ex-A-1">C</span>
          Read and complete.
        </h1>

        {/* ── Body ── */}
        <div className="rcc-body">

          {/* Items */}
          <div className="rcc-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rcc-row">
                  <span className="rcc-num">{item.id}</span>

                  {item.before && (
                    <span className="rcc-text">{item.before}</span>
                  )}

                  <div className="rcc-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rcc-input",
                        wrong   ? "rcc-input--wrong"  : "",
                        showAns ? "rcc-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rcc-badge">✕</div>}
                  </div>

                  {item.after && (
                    <span className="rcc-text">{item.after}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="rcc-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rcc-buttons">
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