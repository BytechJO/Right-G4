import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 6 صور
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 11.svg"; // under
import img2 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 12.svg"; // around
import img3 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 13.svg"; // through
import img4 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 9.svg"; // next to
import img5 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 15.svg"; // in front of
import img6 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 14.svg"; // over

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
const WORD_BANK = ["under", "around", "in front of", "next to", "through", "over"];

const ITEMS = [
  {
    id:      1,
    src:     img1,
    correct: ["under"],
    answer:  "under",
  },
  {
    id:      2,
    src:     img2,
    correct: ["around"],
    answer:  "around",
  },
  {
    id:      3,
    src:     img3,
    correct: ["through"],
    answer:  "through",
  },
  {
    id:      4,
    src:     img4,
    correct: ["next to"],
    answer:  "next to",
  },
  {
    id:      5,
    src:     img5,
    correct: ["in front of"],
    answer:  "in front of",
  },
  {
    id:      6,
    src:     img6,
    correct: ["over"],
    answer:  "over",
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
export default function WB_LookWrite_QE() {
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
        .lwe-bank {

              display: flex;
    flex-wrap: nowrap;

    justify-content: space-around;
    width: 100%;

        }

        .lwe-pill {
          background: #e8eff1;
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(5px, 0.6vw, 8px) clamp(14px, 1.8vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 3×2 grid ── */
        .lwe-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.6vw, 36px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single card: num + img + input */
        .lwe-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(8px, 1vw, 12px);
        }

        /* num + img row */
        .lwe-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.5vw, 7px);
          width: 80%;
        }

        .lwe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        .lwe-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* Input wrap */
        .lwe-input-wrap {
          position: relative;
          width: 78%;
              align-self: center;
left : -5px ;
        }

        .lwe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 23px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwe-input:disabled  { opacity: 1; cursor: default; }
        .lwe-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwe-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge */
        .lwe-badge {
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

        .lwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwe-grid { grid-template-columns: repeat(2, 1fr); }
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
          <span className="WB-ex-A">E</span>
          Look and write. Use the words below.
        </h1>

        {/* ── Word bank ── */}
        <div className="lwe-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="lwe-pill">{w}</div>
          ))}
        </div>

        {/* ── 3×2 Grid ── */}
        <div className="lwe-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwe-card">

                {/* Number + Image */}
                <div className="lwe-img-row">
                  <span className="lwe-num">{item.id}</span>
                  <img src={item.src} alt={`img-${item.id}`} className="lwe-img" />
                </div>

                {/* Input */}
                <div className="lwe-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lwe-input",
                      wrong   ? "lwe-input--wrong"  : "",
                      showAns ? "lwe-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwe-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwe-buttons">
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