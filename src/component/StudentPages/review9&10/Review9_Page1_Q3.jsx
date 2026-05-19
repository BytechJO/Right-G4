import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 30.svg"; // guitar
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 34.svg";// kite
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 35.svg";; // car
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 36.svg"; // photo
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 38.svg";; // rabbit

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
//  type: "given" → معطى | "input" → يكتبه الطالب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:    1,
    src:   img1,
    type:  "given",
    given: "He is playing a song because he likes to play the guitar.",
  },
  {
    id:      2,
    src:     img2,
    type:    "input",
    correct: ["She is flying a kite because she likes kites.", "she is flying a kite because she likes kites"],
    answer:  "She is flying a kite because she likes kites.",
  },
  {
    id:      3,
    src:     img3,
    type:    "input",
    correct: ["They are in the car because they are driving.", "they are in the car because they are driving"],
    answer:  "They are in the car because they are driving.",
  },
  {
    id:      4,
    src:     img4,
    type:    "input",
    correct: ["He is taking a photo because he likes pictures.", "he is taking a photo because he likes pictures"],
    answer:  "He is taking a photo because he likes pictures.",
  },
  {
    id:      5,
    src:     img5,
    type:    "input",
    correct: ["The rabbit doesn't like trees because it can't climb them.", "the rabbit doesn't like trees because it can't climb them", "the rabbit does not like trees because it cannot climb them"],
    answer:  "The rabbit doesn't like trees because it can't climb them.",
  },
];

const INPUT_ITEMS = ITEMS.filter((i) => i.type === "input");

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
export default function WB_LookWrite_QC() {
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
        .lwc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single row: num | img | text/input */
        .lwc-row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lwc-img {
          width: 50%;
          height:auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        /* Given text */
        .lwc-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        /* Input wrap */
        .lwc-input-wrap {
          position: relative;
          width: 100%;
        }

        .lwc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwc-input:disabled  { opacity: 1; cursor: default; }
        .lwc-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwc-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwc-badge {
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

        .lwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lwc-row { grid-template-columns: auto 1fr; }
          .lwc-img  { grid-column: 2; }
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
          Look and write.
        </h1>

        {/* ── Items ── */}
        <div className="lwc-list">
          {ITEMS.map((item) => {
            if (item.type === "given") {
              return (
                <div key={item.id} className="lwc-row">
                  <span className="lwc-num">{item.id}</span>
                  <img src={item.src} alt={`img-${item.id}`} className="lwc-img" />
                  <span className="lwc-given">{item.given}</span>
                </div>
              );
            }

            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwc-row">
                <span className="lwc-num">{item.id}</span>
                <img src={item.src} alt={`img-${item.id}`} className="lwc-img" />
                <div className="lwc-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lwc-input",
                      wrong   ? "lwc-input--wrong"  : "",
                      showAns ? "lwc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwc-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwc-buttons">
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