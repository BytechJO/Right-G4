import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 1.svg";
import img2 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 2.svg"
import img3 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 3.svg"
import img4 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 4.svg"

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
const WORD_BANK = ["friends", "birthday", "gifts", "Good morning!"];

const ITEMS = [
  { id: 1, src: img1, correct: ["friends"],       answer: "friends"       },
  { id: 2, src: img2, correct: ["Good morning!"], answer: "Good morning!" },
  { id: 3, src: img3, correct: ["gifts"],         answer: "gifts"         },
  { id: 4, src: img4, correct: ["birthday"],      answer: "birthday"      },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9!\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QA_U3() {
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
        .rlwa3-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 16px);
          justify-content: space-around;
          width: 105%;
          margin-top : 7% ;
        }
        .rlwa3-pill {
          border: 2px solid #e8eff1;
          border-radius: 10px;
          padding: clamp(5px, 0.6vw, 8px) clamp(16px, 2.2vw, 26px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }
        .rlwa3-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }
        .rlwa3-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }
        .rlwa3-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(3px, 0.4vw, 5px);
          width: 100%;
        }
        .rlwa3-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }
        .rlwa3-img {
          flex: 1;
          width: 50%;
          object-fit: cover;
          display: block;
          height : 100% ; 
        }
        .rlwa3-input-wrap {
          position: relative;
          width: 100%;
          left : 1.8em ;
        }
        .rlwa3-input {
          width: 80%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
          padding: 4px 2px;
        }
        .rlwa3-input:disabled   { opacity: 1; cursor: default; }
        .rlwa3-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwa3-input--answer    { color: ${INPUT_ANSWER_COLOR}; }
        .rlwa3-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
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
        .rlwa3-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
        @media (max-width: 560px) {
          .rlwa3-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="div-forall" style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}>

        <h1 className="WB-header-title-page8" style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span className="WB-ex-A">A</span>
          Look, read, and write. Use the words below.
        </h1>

        <div className="rlwa3-bank">
          {WORD_BANK.map((w) => <div key={w} className="rlwa3-pill">{w}</div>)}
        </div>

        <div className="rlwa3-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rlwa3-card">
                <div className="rlwa3-img-row">
                  <span className="rlwa3-num">{item.id}</span>
                  <img src={item.src} alt={`img-${item.id}`} className="rlwa3-img" />
                </div>
                <div className="rlwa3-input-wrap">
                  <input
                    type="text"
                    className={["rlwa3-input", wrong ? "rlwa3-input--wrong" : "", showAns ? "rlwa3-input--answer" : ""].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlwa3-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rlwa3-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}