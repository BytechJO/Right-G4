import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 1.svg";  // tomatoes
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 2.svg";  // bread
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 3.svg";     // milk
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 4.svg"; 

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const CHECK_COLOR             = "#2b2b2b";
const CROSS_COLOR             = "#2b2b2b";
const CIRCLE_BORDER           = "#9ca3af";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  sentence: الجملة مقسمة لـ before/after
//  symbol: "check" ✓ | "cross" ✕  — الرمز المعروض يمين الجملة
//  correct: الإجابة الصحيحة للـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    before:  "There",
    after:   "mangoes in the bowl.",
    symbol:  "cross",
    correct: ["weren't", "were not"],
    answer:  "weren't",
  },
  {
    id:      2,
    src:     img2,
    before:  "There",
    after:   "steak on the plate.",
    symbol:  "check",
    correct: ["was"],
    answer:  "was",
  },
  {
    id:      3,
    src:     img3,
    before:  "There",
    after:   "oranges in the basket.",
    symbol:  "cross",
    correct: ["weren't", "were not"],
    answer:  "weren't",
  },
  {
    id:      4,
    src:     img4,
    before:  "There",
    after:   "cupcakes on the plate.",
    symbol:  "check",
    correct: ["were"],
    answer:  "were",
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
export default function WB_ReadComplete_QD() {
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
        /* ── 2×2 grid ── */
        .rcd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(28px, 4vw, 56px);
          width: 100%;
          margin : 2% 0 ;
        }

        /* Single card */
        .rcd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        /* num + img row */
        .rcd-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }

        .rcd-img {
          width: clamp(100px, 16vw, 210px);
          height:  clamp(50px, 16vw, 110px);
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }

        /* Sentence + input + symbol row */
        .rcd-sentence-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
              flex-wrap: nowrap;

        }

        .rcd-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .rcd-input-wrap {
          position: relative;
          flex: 0 1 clamp(70px, 9vw, 130px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rcd-input {
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
        .rcd-input:disabled  { opacity: 1; cursor: default; }
        .rcd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcd-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        .rcd-input-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(14px, 1.6vw, 17px);
          height: clamp(14px, 1.6vw, 17px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Symbol circle — ✓ or ✕ — fixed يمين */
        .rcd-symbol {
          width: clamp(28px, 3.4vw, 42px);
          height: clamp(28px, 3.4vw, 42px);
          border-radius: 50%;
          border: 2px solid ${CIRCLE_BORDER};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: auto;
          font-size: clamp(14px, 1.9vw, 22px);
          font-weight: 900;
          color: ${CHECK_COLOR};
          user-select: none;
        }

        .rcd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rcd-grid { grid-template-columns: 1fr; }
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
          Read and complete.
        </h1>

        {/* ── 2×2 Grid ── */}
        <div className="rcd-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rcd-card">

                {/* Num + Image */}
                <div className="rcd-img-row">
                  <span className="rcd-num">{item.id}</span>
                  <img src={item.src} alt={`img-${item.id}`} className="rcd-img" />
                </div>

                {/* Sentence row */}
                <div className="rcd-sentence-row">
                  {item.before && <span className="rcd-text">{item.before}</span>}

                  <div className="rcd-input-wrap">
                    <input
                      type="text"
                      className={[
                        "rcd-input",
                        wrong   ? "rcd-input--wrong"  : "",
                        showAns ? "rcd-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={disabled}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rcd-input-badge">✕</div>}
                  </div>

                  {item.after && <span className="rcd-text">{item.after}</span>}

                  {/* Symbol circle */}
                  <div className="rcd-symbol" style={{ color: item.symbol === "check" ? CHECK_COLOR : CROSS_COLOR }}>
                    {item.symbol === "check" ? "✓" : "✕"}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcd-buttons">
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