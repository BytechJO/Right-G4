import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 1.svg"

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const GIVEN_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    given:   "He has been to the dentist this month.",
    correct: ["He hasn't been to the dentist this month.", "he hasn't been to the dentist this month", "he has not been to the dentist this month"],
    answer:  "He hasn't been to the dentist this month.",
  },
  {
    id:      2,
    given:   "You have been very good.",
    correct: ["You haven't been very good.", "you haven't been very good", "you have not been very good"],
    answer:  "You haven't been very good.",
  },
  {
    id:      3,
    given:   "Sally has brushed her teeth.",
    correct: ["Sally hasn't brushed her teeth.", "sally hasn't brushed her teeth", "sally has not brushed her teeth"],
    answer:  "Sally hasn't brushed her teeth.",
  },
  {
    id:      4,
    given:   "We have been to many museums.",
    correct: ["We haven't been to many museums.", "we haven't been to many museums", "we have not been to many museums"],
    answer:  "We haven't been to many museums.",
  },
  {
    id:      5,
    given:   "I have visited most of the countries in Europe.",
    correct: ["I haven't visited most of the countries in Europe.", "i haven't visited most of the countries in europe", "i have not visited most of the countries in europe"],
    answer:  "I haven't visited most of the countries in Europe.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim().replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "’");;

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteNegative_QD() {
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
        /* ── Body: items + image ── */
        .rwnd-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        .rwnd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 26px);
        }

        /* Single item */
        .rwnd-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Given sentence row */
        .rwnd-given-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwnd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwnd-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
        }

        /* Input row — indented */
        .rwnd-input-wrap {
          position: relative;
          width: 100%;
          padding-left: clamp(22px, 3vw, 36px);
        }

        .rwnd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.8vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwnd-input:disabled  { opacity: 1; cursor: default; }
        .rwnd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwnd-input--answer   { color: ${INPUT_ANSWER_COLOR};}

        /* ✕ badge */
        .rwnd-badge {
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
        .rwnd-scene-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .rwnd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwnd-body { grid-template-columns: 1fr; }
          .rwnd-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
          <span className="WB-ex-A">D</span>
          Read and write the negative form for each sentence.
        </h1>

        {/* ── Body ── */}
        <div className="rwnd-body">

          {/* Items */}
          <div className="rwnd-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rwnd-item">

                  {/* Given sentence */}
                  <div className="rwnd-given-row">
                    <span className="rwnd-num">{item.id}</span>
                    <span className="rwnd-given">{item.given}</span>
                  </div>

                  {/* Input */}
                  <div className="rwnd-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rwnd-input",
                        wrong   ? "rwnd-input--wrong"  : "",
                        showAns ? "rwnd-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwnd-badge">✕</div>}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="rwnd-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rwnd-buttons">
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