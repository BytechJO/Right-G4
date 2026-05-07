import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — place + person per item
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 42.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 43.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 44.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    prefix:  "She's going to the",
    correct: ["store."],
    answer:  "store.",
  },
  {
    id:      2,
    src:     img2,
    prefix:  "",
    correct: ["He is going to the cafe.", "He's going to the cafe.", "he is going to the cafe", "he's going to the cafe"],
    answer:  "He is going to the cafe.",
  },
  {
    id:      3,
    src:     img3,
    prefix:  "",
    correct: ["He is going to the hotel.", "He's going to the hotel.", "he is going to the hotel", "he's going to the hotel"],
    answer:  "He is going to the hotel.",
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
export default function WB_LookWriteGoingTo_QF() {
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
        /* ── Items list ── */
        .lwgt-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
        }

        /* Single row: num + sentence-area | images */
        .lwgt-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
        }

        /* Left: num + prefix + input */
        .lwgt-left {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 8px);
          min-width: 0;
        }

        .lwgt-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lwgt-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: #2b2b2b;
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lwgt-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 240px);
        }

        .lwgt-input {
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
        .lwgt-input:disabled   { opacity: 1; cursor: default; }
        .lwgt-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwgt-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwgt-badge {
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

        /* Right: single image */
        .lwgt-imgs {
          flex-shrink: 0;
        }

        .lwgt-place {
          width: clamp(100px, 14vw, 180px);
          height: auto;
          display: block;
        }

        /* Buttons */
        .lwgt-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwgt-row { grid-template-columns: 1fr; }
          .lwgt-imgs { flex-direction: row; align-items: flex-end; }
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
          <span className="WB-ex-A-1">F</span>
          Look and write sentences using <em style={{ margin: "0 4px" ,color : "#ff8c00ff" }}>going to</em>.
        </h1>

        {/* ── Items ── */}
        <div className="lwgt-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwgt-row">

                {/* Left: num + prefix + input */}
                <div className="lwgt-left">
                  <span className="lwgt-num">{item.id}</span>
                  {item.prefix && <span className="lwgt-prefix">{item.prefix}</span>}
                  <div className="lwgt-input-wrap">
                    <input
                      type="text"
                      className={[
                        "lwgt-input",
                        wrong   ? "lwgt-input--wrong"  : "",
                        showAns ? "lwgt-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lwgt-badge">✕</div>}
                  </div>
                </div>

                {/* Right: image */}
                <div className="lwgt-imgs">
                  <img src={item.src} alt={`img-${item.id}`} className="lwgt-place" />
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwgt-buttons">
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