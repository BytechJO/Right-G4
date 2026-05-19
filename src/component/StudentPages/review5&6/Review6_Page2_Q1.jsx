import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

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
//  correct: "yes" | "no"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    question: "Should we throw trash in the trash can?",
    correct:  ["Yes, we should.", "yes we should"],
    answer:   "Yes, we should.",
  },
  {
    id:      2,
    question: "Should we drink lots of water?",
    correct:  ["Yes, we should.", "yes we should"],
    answer:   "Yes, we should.",
  },
  {
    id:      3,
    question: "Should we cut down lots of trees?",
    correct:  ["No, we shouldn't.", "no we shouldnt", "no we should not"],
    answer:   "No, we shouldn't.",
  },
  {
    id:      4,
    question: "Should we eat lots of candy?",
    correct:  ["No, we shouldn't.", "no we shouldnt", "no we should not"],
    answer:   "No, we shouldn't.",
  },
  {
    id:      5,
    question: "Should we step on plants and flowers?",
    correct:  ["No, we shouldn't.", "no we shouldnt", "no we should not"],
    answer:   "No, we shouldn't.",
  },
  {
    id:      6,
    question: "Should we brush our teeth every day?",
    correct:  ["Yes, we should.", "yes we should"],
    answer:   "Yes, we should.",
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
export default function WB_ReadWriteYesNo_QC() {
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
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
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
        /* ── 2-column grid ── */
        .rwyn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(18px, 2.8vw, 36px) clamp(24px, 4vw, 56px);
          width: 100%;
          margin : 7% 0 ;
        }

        /* Single card */
        .rwyn-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Question row: num + text */
        .rwyn-question {
          display: flex;
          align-items: flex-start;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rwyn-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rwyn-q-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Input wrap */
        .rwyn-input-wrap {
          position: relative;
          width: 100%;
        }

        .rwyn-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.8;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          font-style: italic;
        }
        .rwyn-input:disabled  { opacity: 1; cursor: default; }
        .rwyn-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwyn-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwyn-badge {
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

        .rwyn-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwyn-grid { grid-template-columns: 1fr; }
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
          Read and write <em style={{color : "orange"}}>Yes, we should.</em> or <em style={{color : "orange"}}>No, we shouldn't.</em>
        </h1>

        {/* ── 2×3 Grid ── */}
        <div className="rwyn-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rwyn-card">

                {/* Question */}
                <div className="rwyn-question">
                  <span className="rwyn-num">{item.id}</span>
                  <span className="rwyn-q-text">{item.question}</span>
                </div>

                {/* Answer input */}
                <div className="rwyn-input-wrap">
                  <input
                    type="text"
                    className={[
                      "rwyn-input",
                      wrong   ? "rwyn-input--wrong"  : "",
                      showAns ? "rwyn-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwyn-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwyn-buttons">
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