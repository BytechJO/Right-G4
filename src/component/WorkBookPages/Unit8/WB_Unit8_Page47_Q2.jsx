import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 32.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 34.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 35.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 36.svg";

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
//  question / answer: أجزاء — { type: "text" } أو { type: "input", key, correct, answer }
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    question: [
      { type: "text",  value: "Did she chop the vegetables?" },
    ],
    answer: [
      { type: "text",  value: "Yes, she did." },
    ],
    // لا توجد inputs — الجملتان ثابتتان (مثال للطالب)
    inputs: [],
  },
  {
    id:  2,
    src: img2,
    question: [
      { type: "input", key: "2q", correct: ["Did he"], answer: "Did he" },
      { type: "text",  value: "ride a bike?" },
    ],
    answer: [
      { type: "input", key: "2a", correct: ["No, he didn't.", "No, he didn't"], answer: "No, he didn't." },
    ],
    inputs: ["2q", "2a"],
  },
  {
    id:  3,
    src: img3,
    question: [
      { type: "input", key: "3q", correct: ["Did he"], answer: "Did he" },
      { type: "text",  value: "wash the car?" },
    ],
    answer: [
      { type: "input", key: "3a", correct: ["No, he didn't.", "No, he didn't"], answer: "No, he didn't." },
    ],
    inputs: ["3q", "3a"],
  },
  {
    id:  4,
    src: img4,
    question: [
      { type: "text",  value: "Did" },
      { type: "input", key: "4q", correct: ["Did she fly a kite?", "she fly a kite?"], answer: "Did she fly a kite?" },
      { type: "text",  value: "?" },
    ],
    answer: [
      { type: "input", key: "4a", correct: ["Yes, she did.", "Yes, she did"], answer: "Yes, she did." },
    ],
    inputs: ["4q", "4a"],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.question.filter((p) => p.type === "input"),
  ...item.answer.filter((p) => p.type === "input"),
]);

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
export default function WB_ReadLookWrite_QF() {
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

  const isWrong = (inp) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[inp.key] || "", inp.correct);
  };

  const isDisabled = (inp) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[inp.key] || "", inp.correct)) return true;
    return false;
  };

  // render part (text or input)
  const renderPart = (part, i) => {
    if (part.type === "text") {
      return <span key={i} className="rlwf-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="rlwf-input-wrap">
        <input
          type="text"
          className={[
            "rlwf-input",
            wrong   ? "rlwf-input--wrong"  : "",
            showAns ? "rlwf-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rlwf-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rlwf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row: num | question | img | answer ── */
        .rlwf-row {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr;
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
          min-width: 0;
        }

        .rlwf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          margin-left: 10% ; 
        }

        /* Question / answer parts */
        .rlwf-parts {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          min-width: 0;
          justify-content: center;
        }

        .rlwf-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Input wrap */
        .rlwf-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 11vw, 160px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rlwf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 4px 5px;
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rlwf-input:disabled   { opacity: 1; cursor: default; }
        .rlwf-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwf-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwf-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Image */
        .rlwf-img {
          height: clamp(50px, 7vw, 90px);
          width: auto;
          display: block;
          border-radius: 6px;
          flex-shrink: 0;
        }

        /* Buttons */
        .rlwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlwf-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .rlwf-img { grid-column: 2; }
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
          <span className="WB-ex-A">F</span>
          Read, look, and write.
        </h1>

        {/* ── Items ── */}
        <div className="rlwf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwf-row">

              {/* Number */}
              <span className="rlwf-num">{item.id}</span>

              {/* Question parts */}
              <div className="rlwf-parts">
                {item.question.map((part, i) => renderPart(part, i))}
              </div>

              {/* Image */}
              <img src={item.src} alt={`scene-${item.id}`} className="rlwf-img" />

              {/* Answer parts */}
              <div className="rlwf-parts">
                {item.answer.map((part, i) => renderPart(part, i))}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwf-buttons">
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