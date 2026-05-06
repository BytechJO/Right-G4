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
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Qtype: "fixed" | "input"
//  hint: shown after Q input (like "(skateboard)")
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    Qtype:    "fixed",
    question: "What did she have? (scarf)",
    correctA: ["She had a scarf.", "she had a scarf"],
    answerA:  "She had a scarf.",
  },
  {
    id:       2,
    Qtype:    "fixed",
    question: "What did he have? (car)",
    correctA: ["He had a car.", "he had a car"],
    answerA:  "He had a car.",
  },
  {
    id:       3,
    Qtype:    "input",
    hint:     "(skateboard)",
    correctQ: ["What did they have?", "what did they have"],
    answerQ:  "What did they have?",
    correctA: ["They had a skateboard.", "they had a skateboard"],
    answerA:  "They had a skateboard.",
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => {
  const arr = [];
  if (item.Qtype === "input") arr.push({ key: `${item.id}q`, correct: item.correctQ, answer: item.answerQ });
  arr.push({ key: `${item.id}a`, correct: item.correctA, answer: item.answerA });
  return arr;
});

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
export default function WB_ReadWriteQA_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (showResults && inp && isCorrect(answers[key] || "", inp.correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((inp) => { if (isCorrect(answers[inp.key] || "", inp.correct)) score++; });
    setShowResults(true);
    if (score === ALL_INPUTS.length)   ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const getWrong    = (key, correctArr) => showResults && !showAns && !isCorrect(answers[key] || "", correctArr);
  const getDisabled = (key, correctArr) => showAns || (showResults && isCorrect(answers[key] || "", correctArr));

  const renderInput = (key, correctArr, flex = 1) => {
    const wrong    = getWrong(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = getDisabled(key, correctArr);
    return (
      <div className="rwqf-input-wrap" style={{ flex }}>
        <input
          type="text"
          className={["rwqf-input", wrong ? "rwqf-input--wrong" : "", showAns ? "rwqf-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwqf-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rwqf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top :8%
        }

        /* Single item */
        .rwqf-item {
          display: flex;
          flex-direction: column;
          gap: clamp(5px, 0.7vw, 8px);
        }

        /* Q line */
        .rwqf-q-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          min-width: 0;
        }

        .rwqf-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqf-qfixed {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqf-hint {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${HINT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* A line — indented */
        .rwqf-a-line {
          padding-left: clamp(22px, 2.8vw, 34px);
        }

        /* Input wrap */
        .rwqf-input-wrap {
          position: relative;
          min-width: clamp(100px, 14vw, 260px);
        }

        .rwqf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwqf-input:disabled   { opacity: 1; cursor: default; }
        .rwqf-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwqf-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwqf-badge {
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

        /* Buttons */
        .rwqf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">F</span>
          Read and write the question or answer.
        </h1>

        {/* ── Items ── */}
        <div className="rwqf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwqf-item">

              {/* Q line */}
              <div className="rwqf-q-line">
                <span className="rwqf-num">{item.id}</span>
                {item.Qtype === "fixed" ? (
                  <span className="rwqf-qfixed">{item.question}</span>
                ) : (
                  <>
                    {renderInput(`${item.id}q`, item.correctQ)}
                    {item.hint && <span className="rwqf-hint">{item.hint}</span>}
                  </>
                )}
              </div>

              {/* A line */}
              <div className="rwqf-a-line">
                {renderInput(`${item.id}a`, item.correctA)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwqf-buttons">
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