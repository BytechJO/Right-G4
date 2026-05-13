import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 1.svg";

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
// ─────────────────────────────────────────────
const WORD_BANK = ["pond", "dream", "song", "frogs"];

const ITEMS = [
  {
    id:      1,
    before:  "I had a bad",
    after:   ".",
    correct: ["dream"],
    answer:  "dream",
  },
  {
    id:      2,
    before:  "The",
    after:   "has very blue water.",
    correct: ["pond"],
    answer:  "pond",
  },
  {
    id:      3,
    before:  "The",
    after:   "ate the bugs.",
    correct: ["frogs"],
    answer:  "frogs",
  },
  {
    id:      4,
    before:  "She sang a beautiful",
    after:   ".",
    correct: ["song"],
    answer:  "song",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QA() {
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
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank ── */
        .rwa-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          width: 100%;
        }

        .rwa-pill {
          background: #e8eff1;
          border-radius: 8px;
          padding: clamp(5px, 0.6vw, 8px) clamp(16px, 2vw, 24px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Body: items + image ── */
        .rwa-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
        }

        /* ── Items list ── */
        .rwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
        }

        /* num | [before] | input | [after] */
        .rwa-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwa-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 13vw, 190px);
        }

        .rwa-input {
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
          text-align: center;
        }
        .rwa-input:disabled  { opacity: 1; cursor: default; }
        .rwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        .rwa-badge {
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
        .rwa-scene-img {
          width: clamp(180px, 26vw, 340px);
          height: auto;
          display: block;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .rwa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwa-body { grid-template-columns: 1fr; }
          .rwa-scene-img { width: 100%; max-width: 300px; margin: 0 auto; }
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
          <span className="WB-ex-A-1">A</span>
          Read and write. Use the words below.
        </h1>

        {/* ── Word bank ── */}
        <div className="rwa-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwa-pill">{w}</div>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="rwa-body">

          {/* Items */}
          <div className="rwa-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rwa-row">
                  <span className="rwa-num">{item.id}</span>

                  {item.before && <span className="rwa-text">{item.before}</span>}

                  <div className="rwa-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rwa-input",
                        wrong   ? "rwa-input--wrong"  : "",
                        showAns ? "rwa-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwa-badge">✕</div>}
                  </div>

                  {item.after && <span className="rwa-text">{item.after}</span>}
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="rwa-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rwa-buttons">
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