import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 7.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 8.svg";

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
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    Qparts: [
      { type: "input", key: "1q", correct: ["What are they going to do", "what are they going to do"], answer: "What are they going to do" },
      { type: "text",  value: "on the weekend?" },
    ],
    Aparts: [
      { type: "text",  value: "They're" },
      { type: "input", key: "1a", correct: ["going to"], answer: "going to" },
      { type: "text",  value: "go to the playground." },
    ],
  },
  {
    id:  2,
    src: img2,
    Qparts: [
      { type: "text",  value: "What is he" },
      { type: "input", key: "2q", correct: ["going to do on the weekend", "going to do on the weekend?"], answer: "going to do on the weekend" },
      { type: "text",  value: "?" },
    ],
    Aparts: [
      { type: "text",  value: "He's" },
      { type: "input", key: "2a1", correct: ["going to"], answer: "going to" },
      { type: "text",  value: "go to the" },
      { type: "input", key: "2a2", correct: ["library"], answer: "library" },
      { type: "text",  value: "." },
    ],
  },
  {
    id:  3,
    src: img3,
    Qparts: [
      { type: "input", key: "3q", correct: ["What are they going to do on the weekend", "What are they going to do on the weekend?"], answer: "What are they going to do on the weekend" },
      { type: "text",  value: "?" },
    ],
    Aparts: [
      { type: "input", key: "3a", correct: ["They're going to go to a farm", "Theyre going to go to a farm.", "They are going to go to a farm."], answer: "They're going to go to a farm" },
      { type: "text",  value: "." },
    ],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.Qparts.filter((p) => p.type === "input"),
  ...item.Aparts.filter((p) => p.type === "input"),
]);

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
export default function WB_ReadWrite_QE() {
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

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return <span key={i} className="rwqe-text">{part.value}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="rwqe-input-wrap">
        <input
          type="text"
          className={["rwqe-input", wrong ? "rwqe-input--wrong" : "", showAns ? "rwqe-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwqe-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rwqe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        .rwqe-row {
          display: grid;
          grid-template-columns: auto clamp(120px, 16vw, 200px) 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        .rwqe-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        .rwqe-img {
          width: 100%;
          height: clamp(90px, 12vw, 150px);
          object-fit: cover;
          display: block;
          border-radius: 8px;
        }

        .rwqe-qa {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        .rwqe-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          min-width: 0;
        }

        .rwqe-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqe-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(70px, 9vw, 150px);
        }

        .rwqe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwqe-input:disabled   { opacity: 1; cursor: default; }
        .rwqe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }

        .rwqe-badge {
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

        .rwqe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwqe-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rwqe-qa  { grid-column: 1 / -1; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">E</span>
          Read and write. Use <span style={{ color: "#f89631" }}>going to</span> and verbs <span style={{ color: "#f89631" }}>to be</span>.
        </h1>

        <div className="rwqe-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwqe-row">
              <span className="rwqe-num">{item.id}</span>
              <img src={item.src} alt={`img-${item.id}`} className="rwqe-img" />
              <div className="rwqe-qa">
                <div className="rwqe-line">{item.Qparts.map((p, i) => renderPart(p, i))}</div>
                <div className="rwqe-line">{item.Aparts.map((p, i) => renderPart(p, i))}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rwqe-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}