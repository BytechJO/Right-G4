import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — وهمية، عدّلها لاحقاً
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 3.svg";


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
//  Q row: qBefore + qInput + qAfter (ثابت يمين)
//  A row: aInput (full width)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    // Q: "Did he clean his shoes?"
    qBefore: "",
    qAfter:  "",
    qInput:  { id: "1q", correct: ["Did he clean his shoes?", "did he clean his shoes"], answer: "Did he clean his shoes?" },
    // A: "Yes, he did."
    aInput:  { id: "1a", correct: ["Yes, he did.", "yes he did"], answer: "Yes, he did." },
  },
  {
    id:  2,
    src: img2,
    // Q: "Did they play _____ baseball?"
    qBefore: "Did they play",
    qAfter:  "baseball?",
    qInput:  { id: "2q", correct: [""], answer: "" }, // no input in Q middle — full sentence input
    // A: "No, they didn't."
    aInput:  { id: "2a", correct: ["No, they didn't.", "no they didn't", "no they didnt"], answer: "No, they didn't." },
    // Override: Q is: input(full) + fixed "baseball?"
    qFullInput: { id: "2qf", correct: ["Did they play", "did they play"], answer: "Did they play" },
  },
  {
    id:  3,
    src: img3,
    // Q: "Did they play _____ jump rope?"
    qBefore: "Did they play",
    qAfter:  "jump rope?",
    qInput:  { id: "3q", correct: [""], answer: "" },
    aInput:  { id: "3a", correct: ["No, they didn't.", "no they didn't", "no they didnt"], answer: "No, they didn't." },
    qFullInput: { id: "3qf", correct: ["Did they play", "did they play"], answer: "Did they play" },
  },
];

// All inputs flat
const ALL_INPUTS = [];
ITEMS.forEach((item) => {
  if (item.qFullInput) {
    ALL_INPUTS.push(item.qFullInput);
  } else if (item.qInput.correct[0] !== "") {
    ALL_INPUTS.push(item.qInput);
  } else {
    ALL_INPUTS.push(item.qInput); // item 1 full Q
  }
  ALL_INPUTS.push(item.aInput);
});

// rebuild
const INPUTS_FLAT = [];
ITEMS.forEach((item) => {
  if (item.id === 1) {
    INPUTS_FLAT.push(item.qInput);
  } else {
    INPUTS_FLAT.push(item.qFullInput);
  }
  INPUTS_FLAT.push(item.aInput);
});

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
export default function WB_LookWriteQA_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value, correct) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[id] || "", correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = INPUTS_FLAT.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    INPUTS_FLAT.forEach((p) => { if (isCorrect(answers[p.id] || "", p.correct)) score++; });
    const total = INPUTS_FLAT.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    INPUTS_FLAT.forEach((p) => { filled[p.id] = p.answer; });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrongPart    = (p) => showResults && !showAns && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) => showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  const renderInput = (p, flex = true) => {
    const wrong    = isWrongPart(p);
    const disabled = isDisabledPart(p);
    const value    = answers[p.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={p.id} style={{ position: "relative", flex: flex ? 1 : "0 1 clamp(140px,18vw,260px)", minWidth: 0 }}>
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(p.id, e.target.value, p.correct)}
          style={{
            width: "100%", background: "transparent", border: "none",
            borderBottom: `1px solid ${uColor}`, outline: "none",
            fontSize: "clamp(13px,1.6vw,19px)", color: tColor,
            lineHeight: 1.5, fontFamily: "inherit", boxSizing: "border-box",
            fontWeight: showAns ? 700 : 400, transition: "border-color 0.2s",
          }}
          spellCheck={false} autoComplete="off"
        />
        {wrong && (
          <div style={{
            position: "absolute", top: -8, right: 0,
            width: "clamp(16px,1.8vw,20px)", height: "clamp(16px,1.8vw,20px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(8px,0.9vw,11px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 2,
          }}>✕</div>
        )}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 38px);
          width: 100%;
        }

        .lwqa-item {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: clamp(6px, 0.8vw, 12px);
          align-items: start;
        }

        .lwqa-num {
          font-size: clamp(14px,1.7vw,20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        .lwqa-img {
          width: clamp(100px,14vw,190px);
          height: clamp(70px,10vw,135px);
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          display: block;
          flex-shrink: 0;
        }

        .lwqa-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        /* Q row */
        .lwqa-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.5vw, 7px);
          min-width: 0;
        }

        .lwqa-fixed {
          font-size: clamp(13px,1.6vw,19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px,1.6vw,18px);
        }

        @media (max-width: 520px) {
          .lwqa-item { grid-template-columns: auto 1fr; }
          .lwqa-img  { grid-column: 2; }
        }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        <h1 className="WB-header-title-page8" style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
          <span className="WB-ex-A-1">C</span>
          Look and write questions. Then answer.
        </h1>

        <div className="lwqa-list">
          {ITEMS.map((item) => {
            const qPart = item.id === 1 ? item.qInput : item.qFullInput;
            const aPart = item.aInput;

            return (
              <div key={item.id} className="lwqa-item">
                <span className="lwqa-num">{item.id}</span>
                <img src={item.src} alt={`img-${item.id}`} className="lwqa-img" />

                <div className="lwqa-lines">
                  {/* Q line */}
                  <div className="lwqa-row">
                    {renderInput(qPart, true)}
                    {item.qAfter && (
                      <span className="lwqa-fixed">{item.qAfter}</span>
                    )}
                  </div>

                  {/* A line */}
                  <div className="lwqa-row">
                    {renderInput(aPart, true)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lwqa-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}