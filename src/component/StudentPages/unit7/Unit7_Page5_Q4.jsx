import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 7.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const GIVEN_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Q row: parts[] — { t:"text"|"input", v, id, correct, answer }
//  A row: same pattern
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    Q: [
      { t: "input", id: "1q", correct: ["Were there any watermelons"], answer: "Were there any watermelons"    },
      { t: "text",  v: " ?"                                                      },
    ],
    A: [
      { t: "given", v: "Yes, there were some." },
    ],
  },
  {
    id:  2,
    src: img2,
    Q: [
      { t: "input", id: "2q", correct: ["Was there any"], answer: "Was there any"         }, // no input here — see below
      { t: "text",  v: " cake?"                                 },
    ],
    A: [
      { t: "text",  v: "No, "                                                                     },
      { t: "input", id: "2a", correct: ["there wasn't any","there wasnt any"], answer: "there wasn't any" },
      { t: "text",  v: "."                                                                         },
    ],
  },
];

// ─────────────────────────────────────────────
//  ALL INPUT IDs for scoring (exclude empty ones)
// ─────────────────────────────────────────────
const ALL_INPUTS = [];
ITEMS.forEach((item) => {
  [...item.Q, ...item.A].forEach((p) => {
    if (p.t === "input" && p.correct[0] !== "") ALL_INPUTS.push(p);
  });
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
export default function WB_LookReadWrite_QD() {
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
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongPart    = (p) =>
    showResults && !showAns && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) =>
    showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  // ── Render a row of parts ──
  const renderParts = (parts) =>
    parts.map((part, i) => {
      if (part.t === "given") {
        return (
          <span key={i} className="lrwd-given">{part.v}</span>
        );
      }
      if (part.t === "text") {
        return <span key={i} className="lrwd-text">{part.v}</span>;
      }
      // input
      if (part.correct[0] === "") return null; // skip empty input slots
      const wrong    = isWrongPart(part);
      const disabled = isDisabledPart(part);
      const value    = answers[part.id] || "";
      const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
      const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

      return (
        <span key={part.id} className="lrwd-input-wrap">
          <input
            type="text"
            className={[
              "lrwd-input",
              wrong   ? "lrwd-input--wrong"  : "",
              showAns ? "lrwd-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
            style={{ borderBottomColor: uColor, color: tColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="lrwd-badge">✕</span>}
        </span>
      );
    });

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .lrwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
          margin : 8% 0 ; 
        }

        /* Single item */
        .lrwd-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Q row: num + img + parts */
        .lrwd-q-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwd-num {
          font-size: clamp(14px, 1.7vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwd-img {
          width: 12%;
          height: auto;
          object-fit: contain;
          flex-shrink: 0;
        }

        /* A row: indented under Q */
        .lrwd-a-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          padding-left: clamp(30px, 4.5vw, 60px); /* indent = num + img width */
        }

        /* Text spans */
        .lrwd-text,
        .lrwd-given {
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.6;
        }

        /* Input wrap */
        .lrwd-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lrwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.6;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrwd-input:disabled  { opacity: 1; cursor: default; }
        .lrwd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwd-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge */
        .lrwd-badge {
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

        .lrwd-buttons {
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
          <span className="WB-ex-A">D</span>
          Look, read, and write.
        </h1>

        {/* ── Items ── */}
        <div className="lrwd-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwd-item">

              {/* Q row: num + img + Q parts */}
              <div className="lrwd-q-row">
                <span className="lrwd-num">{item.id}</span>
                <img src={item.src} alt={`img-${item.id}`} className="lrwd-img" />
                {renderParts(item.Q)}
              </div>

              {/* A row */}
              <div className="lrwd-a-row">
                {renderParts(item.A)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwd-buttons">
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