import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — صورة لكل سؤال
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 2.svg";  // tomatoes
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 3.svg";  // bread
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 4.svg";     // milk
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 5.svg";    // honey

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
//  parts: مصفوفة من عناصر لكل سطر
//  { t: "text", v }   → نص عادي
//  { t: "img",  src } → صورة
//  { t: "input", id, correct, answer } → input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { t: "text",  v: "There were"                                                   },
      { t: "img",   src: img1                                                          },
      { t: "input", id: "1a", correct: ["tomatoes"], answer: "tomatoes"               },
      { t: "text",  v: "on the plate."                                                },
    ],
  },
  {
    id: 2,
    parts: [
      { t: "text",  v: "There"                                                         },
      { t: "input", id: "2a", correct: ["was","were"], answer: "was"                  },
      { t: "img",   src: img2                                                          },
      { t: "input", id: "2b", correct: ["bread"], answer: "bread"                     },
      { t: "text",  v: "in the basket."                                               },
    ],
  },
  {
    id: 3,
    parts: [
      { t: "text",  v: "There"                                                         },
      { t: "input", id: "3a", correct: ["was","were"], answer: "was"                  },
      { t: "img",   src: img3                                                          },
      { t: "input", id: "3b", correct: ["milk"], answer: "milk"                       },
      { t: "text",  v: "in the carton."                                               },
    ],
  },
  {
    id: 4,
    parts: [
      { t: "text",  v: "There"                                                         },
      { t: "input", id: "4a", correct: ["was","were"], answer: "was"                  },
      { t: "img",   src: img4                                                          },
      { t: "input", id: "4b", correct: ["honey"], answer: "honey"                     },
      { t: "text",  v: "in the jar."                                                  },
    ],
  },
];

// collect all input parts
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.t === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookComplete_QC() {
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
      return <span key={i} className="rlcc-text">{part.v}</span>;
    }

    if (part.t === "img") {
      return (
        <img key={i} src={part.src} alt="food" className="rlcc-food-img" />
      );
    }

    // input
    const wrong    = isWrongPart(part);
    const disabled = isDisabledPart(part);
    const value    = answers[part.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="rlcc-input-wrap">
        <input
          type="text"
          className={[
            "rlcc-input",
            wrong   ? "rlcc-input--wrong"  : "",
            showAns ? "rlcc-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="rlcc-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .rlcc-list {
          display: flex;
          flex-direction: column;
          gap:clamp(45px, 2.8vw, 45px);
          width: 100%;
        }

        /* Single row */
        .rlcc-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlcc-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Inline food image */
        .rlcc-food-img {
          height: clamp(36px, 5.5vw, 70px);
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
          vertical-align: middle;
        }

        /* Input wrap */
        .rlcc-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rlcc-input {
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
          text-align: center;
        }
        .rlcc-input:disabled  { opacity: 1; cursor: default; }
        .rlcc-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlcc-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rlcc-badge {
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

        .rlcc-buttons {
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
          <span className="WB-ex-A-1">C</span>
          Read, look, and complete the sentences.
        </h1>

        {/* ── Items ── */}
        <div className="rlcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc-row">
              <span className="rlcc-num">{item.id}</span>
              {item.parts.map((part, i) => renderPart(part, i))}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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