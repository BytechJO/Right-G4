import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 9.svg";
import img2 from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 10.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type "given" → سطر معطى (مثال)
//  type "input" → فيه input
//  questionParts: مصفوفة أجزاء الجملة { t: "text" | "input", ... }
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:           1,
    src:          img1,
    type:         "given",
    questionText: "Was there any honey?",
    answerText:   "Yes, there was some.",
  },
  {
    id:   2,
    src:  img2,
    type: "input",
    // السؤال: "Were there any ___ figs?"
    questionParts: [
      { t: "text",  v: "Were there any"                                    },
      { t: "input", id: "2q", correct: ["figs"], answer: "figs"           },
      { t: "text",  v: "?"                                                  },
    ],
    // الجواب: "Yes, there were some."
    answerParts: [
      { t: "input", id: "2a", correct: ["Yes, there were some.", "Yes, there were some"], answer: "Yes, there were some." },
    ],
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// collect all input parts
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.type === "input"
    ? [
        ...item.questionParts.filter((p) => p.t === "input"),
        ...item.answerParts.filter((p) => p.t === "input"),
      ]
    : []
);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteQA_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value, correctArr) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[id] || "", correctArr)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((p) => { if (isCorrect(answers[p.id] || "", p.correct)) score++; });
    const total = ALL_INPUTS.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((p) => { filled[p.id] = p.answer; });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrongPart    = (p) => showResults && !showAns && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) => showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  const renderPart = (part, i) => {
    if (part.t === "text") {
      return <span key={i} className="lwqa-text">{part.v}</span>;
    }

    const wrong    = isWrongPart(part);
    const disabled = isDisabledPart(part);
    const value    = answers[part.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="lwqa-input-wrap">
        <input
          type="text"
          className={[
            "lwqa-input",
            wrong   ? "lwqa-input--wrong"  : "",
            showAns ? "lwqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="lwqa-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 44px);
          width: 100%;
        }

        /* Single item */
        .lwqa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        /* num + img row */
        .lwqa-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lwqa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }

        .lwqa-img {
          width: clamp(70px, 10vw, 140px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* Sentence row */
        .lwqa-sentence-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          width: 100%;
        }

        .lwqa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Given lines (item 1) */
        .lwqa-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        /* Input wrap */
        .lwqa-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1;
          min-width: clamp(80px, 10vw, 160px);
        }

        .lwqa-input {
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
        .lwqa-input:disabled  { opacity: 1; cursor: default; }
        .lwqa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqa-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwqa-badge {
          position: absolute;
          top: -8px; right: -4px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
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

        .lwqa-buttons {
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
          <span className="WB-ex-A-1">F</span>
          Look and write the question and answer.
        </h1>

        {/* ── Items ── */}
        <div className="lwqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwqa-item">

              {/* Num + Image */}
              <div className="lwqa-img-row">
                <span className="lwqa-num">{item.id}</span>
                <img src={item.src} alt={`img-${item.id}`} className="lwqa-img" />
              </div>

              {item.type === "given" ? (
                <>
                  <div className="lwqa-sentence-row">
                    <span className="lwqa-given">{item.questionText}</span>
                  </div>
                  <div className="lwqa-sentence-row">
                    <span className="lwqa-given">{item.answerText}</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Question row */}
                  <div className="lwqa-sentence-row">
                    {item.questionParts.map((p, i) => renderPart(p, i))}
                  </div>
                  {/* Answer row */}
                  <div className="lwqa-sentence-row">
                    {item.answerParts.map((p, i) => renderPart(p, i))}
                  </div>
                </>
              )}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqa-buttons">
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