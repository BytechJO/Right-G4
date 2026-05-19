import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  SCENE IMAGE (صورة كبيرة واحدة)
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 9.svg"

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const GIVEN_TEXT_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" → سطر معطى (عرضه فقط)
//        "input" → سطر فيه input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:   1,
    type: "given",
    text: "Harley is under the tree.",
  },
  {
    id:      2,
    type:    "input",
    correct: [
      "The kite is over Stella's head.",
      "the kite is over stella's head",
      "The kite is over Stella's head",
    ],
    answer:  "The kite is over Stella's head.",
  },
  {
    id:      3,
    type:    "input",
    correct: [
      "Helen is sitting on the bench with her grandparents.",
      "helen is sitting on the bench with her grandparents",
    ],
    answer:  "Helen is sitting on the bench with her grandparents.",
  },
  {
    id:      4,
    type:    "input",
    correct: [
      "Tilly is running behind Lolo.",
      "tilly is running behind lolo",
    ],
    answer:  "Tilly is running behind Lolo.",
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
export default function WB_LookWritePrepositions_QE() {
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
    const total = INPUT_ITEMS.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    INPUT_ITEMS.forEach((item) => { filled[item.id] = item.answer; });
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
        /* ── Scene image ── */
        .lwp-scene-img {
          width: 70%;
          height: auto;
          display: block;
          border-radius: 10px; 
              align-self: center;
        }

        /* ── Items list ── */
        .lwp-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        /* Single row */
        .lwp-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        .lwp-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(16px, 2vw, 24px);
        }

        /* Given text */
        .lwp-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_TEXT_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          flex: 1;
          padding-bottom: 2px;
        }

        /* Input wrap */
        .lwp-input-wrap {
          position: relative;
          flex: 1;
        }

        .lwp-input {
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
        }
        .lwp-input:disabled  { opacity: 1; cursor: default; }
        .lwp-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwp-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwp-badge {
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

        .lwp-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
          <span className="WB-ex-A-1">E</span>
          Look and write sentences with prepositions.
        </h1>

        {/* ── Scene image ── */}
        <img src={imgScene} alt="scene" className="lwp-scene-img" />

        {/* ── Items ── */}
        <div className="lwp-list">
          {ITEMS.map((item) => {
            if (item.type === "given") {
              return (
                <div key={item.id} className="lwp-row">
                  <span className="lwp-num">{item.id}</span>
                  <span className="lwp-given">{item.text}</span>
                </div>
              );
            }

            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwp-row">
                <span className="lwp-num">{item.id}</span>
                <div className="lwp-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lwp-input",
                      wrong   ? "lwp-input--wrong"  : "",
                      showAns ? "lwp-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwp-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwp-buttons">
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