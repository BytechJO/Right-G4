import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 50/SVG/Asset 2.svg";

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
const KEYWORD_COLOR           = "#ff9900ff";  // should / shouldn't في الـ header

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  before: text before input | after: text after input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "You",
    after:   "put trash in trash cans.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      2,
    before:  "We",
    after:   "always recycle paper and plastic.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      3,
    before:  "Henry",
    after:   "brush his teeth after a meal.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      4,
    before:  "Sam",
    after:   "slam the door loudly.",
    correct: ["shouldn't", "shouldnt", "should not"],
    answer:  "shouldn't",
  },
  {
    id:      5,
    before:  "I",
    after:   "study for my test tomorrow.",
    correct: ["should"],
    answer:  "should",
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
export default function WB_ReadWriteShouldShouldnt_QC() {
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
        /* ── Body: items ysar | image yamin ── */
        .rwss-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
          margin : 8% 0 ;
        }

        /* ── Items list ── */
        .rwss-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 26px);
        }

        /* Single row: num | before | input | after */
        .rwss-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rwss-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwss-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwss-input-wrap {
          position: relative;
          flex: 0 1 clamp(90px, 11vw, 150px);
          min-width: clamp(80px, 10vw, 130px);
        }

        .rwss-input {
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
        .rwss-input:disabled  { opacity: 1; cursor: default; }
        .rwss-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwss-input--answer   { color: ${INPUT_ANSWER_COLOR} }

        /* ✕ badge */
        .rwss-badge {
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
        .rwss-scene-img {
          width: 100% ; 
          height: 100%;
          flex-shrink: 0;
        }

        .rwss-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwss-body { grid-template-columns: 1fr; }
          .rwss-scene-img { width: 100%; max-width: 280px; margin: 0 auto; }
          .rwss-text { white-space: normal; }
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
          <span className="WB-ex-A">C</span>
          Read and write{" "}
          <em style={{ color: KEYWORD_COLOR, fontStyle: "normal", fontWeight: 700 }}>should</em>
          {" "}or{" "}
          <em style={{ color: KEYWORD_COLOR, fontStyle: "normal", fontWeight: 700 }}>shouldn't</em>.
        </h1>

        {/* ── Body ── */}
        <div className="rwss-body">

          {/* Items */}
          <div className="rwss-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled = isDisabled(item);

              return (
                <div key={item.id} className="rwss-row">
                  <span className="rwss-num">{item.id}</span>
                  <span className="rwss-text">{item.before}</span>

                  <div className="rwss-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rwss-input",
                        wrong   ? "rwss-input--wrong"  : "",
                        showAns ? "rwss-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwss-badge">✕</div>}
                  </div>

                  <span className="rwss-text">{item.after}</span>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="rwss-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rwss-buttons">
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