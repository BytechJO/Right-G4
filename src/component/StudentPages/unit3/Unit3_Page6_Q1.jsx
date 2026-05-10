import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27/SVG/Asset 1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#2b2b2b";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Qtype: "fixed" = question is shown, "input" = student writes question
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    Qtype:    "fixed",
    question: "Did he have a chair?",
    correctA: ["Yes, he had a chair.", "yes he had a chair"],
    answerA:  "Yes, he had a chair.",
  },
  {
    id:       2,
    Qtype:    "input",
    correctQ: ["Did he have a robot?", "did he have a robot"],
    answerQ:  "Did he have a robot?",
    correctA: ["Yes, he had a robot.", "yes he had a robot"],
    answerA:  "Yes, he had a robot.",
  },
  {
    id:       3,
    Qtype:    "fixed",
    question: "Did he have a ball?",
    correctA: ["No, he didn't have a ball.", "no he didnt have a ball", "no he didnot have a ball" , "no he did not have a ball",],
    answerA:  "No, he didn't have a ball.",
  },
  {
    id:       4,
    Qtype:    "fixed",
    question: "Did he have a bike in his room?",
    correctA: ["No, he didn't have a bike.", "no he didnt have a bike", "no he didnot have a bike", , "no he did not have a bike"],
    answerA:  "No, he didn't have a bike.",
  },
];

// build ALL_INPUTS
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
export default function WB_LookReadAnswer_QD() {
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

  const renderInput = (key, correctArr) => {
    const wrong    = getWrong(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = getDisabled(key, correctArr);
    return (
      <div className="lrad-input-wrap">
        <input
          type="text"
          className={["lrad-input", wrong ? "lrad-input--wrong" : "", showAns ? "lrad-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrad-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Layout: left QA | right image ── */
        .lrad-layout {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
          margin : 5% 0 ;
        }

        .lrad-img {
    width: 100%;
    height: 100%;
    display: block;
        }

        /* Items list */
        .lrad-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
        }

        /* Single item */
        .lrad-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Q line */
        .lrad-q-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lrad-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lrad-qlabel {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lrad-qfixed {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Answer line — indented */
        .lrad-a-line {
          padding-left: clamp(22px, 2.8vw, 34px);
        }

        /* Input wrap */
        .lrad-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 260px);
        }

        .lrad-input {
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
        .lrad-input:disabled   { opacity: 1; cursor: default; }
        .lrad-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrad-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrad-badge {
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
        .lrad-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrad-layout { grid-template-columns: 1fr; }
          .lrad-img { width: 100%; }
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
          <span className="WB-ex-A">D</span>
          Look, read, and answer. Use a long answer.
        </h1>

        {/* ── Layout ── */}
        <div className="lrad-layout">

          {/* Left: items */}
          <div className="lrad-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="lrad-item">

                {/* Question line */}
                <div className="lrad-q-line">
                  <span className="lrad-num">{item.id}</span>
                  {item.Qtype === "fixed" ? (
                    <span className="lrad-qfixed">{item.question}</span>
                  ) : (
                    <>
                      <span className="lrad-qlabel">Q:</span>
                      {renderInput(`${item.id}q`, item.correctQ)}
                    </>
                  )}
                </div>

                {/* Answer line */}
                <div className="lrad-a-line">
                  {renderInput(`${item.id}a`, item.correctA)}
                </div>

              </div>
            ))}
          </div>

          {/* Right: image */}
          <img src={imgScene} alt="bedroom" className="lrad-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="lrad-buttons">
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