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
const NUMBER_COLOR            = "#2b2b2b";
const SCRAMBLED_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    scrambled: "the  he  won't  go  library  to",
    correct:   ["He won't go to the library.", "He won't go to the library"],
    answer:    "He won't go to the library.",
  },
  {
    id:        2,
    scrambled: "will  they  eat  pizza ?",
    correct:   ["Will they eat pizza?", "Will they eat pizza"],
    answer:    "Will they eat pizza?",
  },
  {
    id:        3,
    scrambled: "the  I  won't  swim  sea  in",
    correct:   ["I won't swim in the sea.", "I won't swim in the sea"],
    answer:    "I won't swim in the sea.",
  },
  {
    id:        4,
    scrambled: "will  you  clean  room  the ?",
    correct:   ["Will you clean the room?", "Will you clean the room"],
    answer:    "Will you clean the room?",
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
export default function WB_UnscrambleWrite_QE() {
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

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .uswe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          margin : 5% 0 ;
        }

        /* ── Single item: scrambled row + input row ── */
        .uswe-item {
          display: flex;
          flex-direction: column;
        }

        /* Scrambled row */
        .uswe-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .uswe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .uswe-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.5;
        }

        /* Input wrap — full width, indented */
        .uswe-input-wrap {
          position: relative;
          width: 100%;
          padding-left: clamp(18px, 2.2vw, 28px);
          box-sizing: border-box;
        }

        .uswe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .uswe-input:disabled   { opacity: 1; cursor: default; }
        .uswe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .uswe-badge {
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

        /* Buttons */
        .uswe-buttons {
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
          <span className="WB-ex-A">E</span>
          Unscramble and write.
        </h1>

        {/* ── Items ── */}
        <div className="uswe-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="uswe-item">

                {/* Scrambled words */}
                <div className="uswe-scrambled-row">
                  <span className="uswe-num">{item.id}</span>
                  <span className="uswe-scrambled">{item.scrambled}</span>
                </div>

                {/* Answer input */}
                <div className="uswe-input-wrap">
                  <input
                    type="text"
                    className={[
                      "uswe-input",
                      wrong   ? "uswe-input--wrong"  : "",
                      showAns ? "uswe-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="uswe-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="uswe-buttons">
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