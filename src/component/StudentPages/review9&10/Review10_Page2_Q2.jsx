import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — صورة واحدة كاملة لكل item (شخص + مركبة)
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 10.svg";  // she + bus
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 7.svg"; // he + boat
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 8.svg";  // he + motorcycle
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 9.svg"; // he + airplane

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const GIVEN_COLOR      = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" | "input"
//  before: نص ثابت قبل الـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    type:    "input",
    before:  "",
    correct: ["She has been on a bus", "She has been on a bus."],

    answer:   "She has been on a bus.",
  },
  {
    id:      2,
    src:     img2,
    type:    "input",
    before:  "",
    correct: ["He has been on a boat.", " He has been on a boat"],
    answer:  "He has been on a boat.",
  },
  {
    id:      3,
    src:     img3,
    type:    "input",
    before:  "",
    correct: ["He has been on a motorcycle.", "he has been on a motorcycle"],
    answer:  "He has been on a motorcycle.",
  },
  {
    id:      4,
    src:     img4,
    type:    "input",
    before:  "",
    correct: ["He has been on an airplane.", "he has been on an airplane"],
    answer:  "He has been on an airplane.",
  },
];

const INPUT_ITEMS = ITEMS.filter((i) => i.type === "input");

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
export default function WB_LookWrite_QD_R10() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = INPUT_ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = INPUT_ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    INPUT_ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === INPUT_ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${INPUT_ITEMS.length}`);
    else if (score > 0)                 ValidationAlert.warning(`Score: ${score} / ${INPUT_ITEMS.length}`);
    else                                ValidationAlert.error(`Score: ${score} / ${INPUT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    INPUT_ITEMS.forEach((item) => { filled[item.id] = item.answer; });
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
        .lwd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 50px);
          width: 100%;
        }

        /* Single card */
        .lwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Num */
        .lwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Single image */
        .lwd-img {
          width: 70%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          margin-bottom : 1em ;
        }

        /* Sentence area */
        .lwd-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lwd-given {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        .lwd-before {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${GIVEN_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwd-input:disabled  { opacity: 1; cursor: default; }
        .lwd-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwd-input--answer   { color: ${INPUT_ANS_COLOR};  }

        .lwd-badge {
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

        .lwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwd-grid { grid-template-columns: 1fr; }
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

        {/* ── 2×2 Grid ── */}
        <div className="lwd-grid">
          {ITEMS.map((item) => {
            const wrong    = item.type === "input" ? isWrong(item) : false;
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            const disabled = item.type === "input" ? isDisabled(item) : false;

            return (
              <div key={item.id} className="lwd-card">

                {/* Number */}
                <span className="lwd-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={`img-${item.id}`} className="lwd-img" />

                {/* Sentence */}
                <div className="lwd-sentence">
                  {item.type === "given" ? (
                    <span className="lwd-given">{item.given}</span>
                  ) : (
                    <>
                      {item.before && <span className="lwd-before">{item.before}</span>}
                      <div className="lwd-input-wrap">
                        <input
                          type="text"
                          className={["lwd-input", wrong?"lwd-input--wrong":"", showAns?"lwd-input--answer":""].filter(Boolean).join(" ")}
                          value={value}
                          disabled={disabled}
                          onChange={(e) => handleChange(item.id, e.target.value)}
                          style={{ borderBottomColor: uColor, color: tColor }}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {wrong && <div className="lwd-badge">✕</div>}
                      </div>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwd-buttons">
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