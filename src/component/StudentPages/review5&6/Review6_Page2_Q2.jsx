import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — جدولين كل واحد صورة واحدة
// ─────────────────────────────────────────────
import tableHarley from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 55/SVG/Asset 49.svg";
import tableJack   from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 55/SVG/Asset 50.svg"


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
//  كل section: صورة الجدول + 3 جمل
// ─────────────────────────────────────────────
const SECTIONS = [
  {
    id:    "harley",
    table: tableHarley,
    items: [
      {
        id:      "h1",
        before:  "Harley doesn't eat much",
        after:   ".",
        correct: ["bread"],
        answer:  "bread",
      },
      {
        id:      "h2",
        before:  "He doesn't eat many",
        after:   ".",
        correct: ["carrots"],
        answer:  "carrots",
      },
      {
        id:      "h3",
        before:  "He eats lots of",
        after:   ".",
        correct: ["grapes"],
        answer:  "grapes",
      },
    ],
  },
  {
    id:    "jack",
    table: tableJack,
    items: [
      {
        id:      "j1",
        before:  "Jack doesn't eat much",
        after:   ".",
        correct: ["meat"],
        answer:  "meat",
      },
      {
        id:      "j2",
        before:  "He doesn't eat many",
        after:   ".",
        correct: ["fruit"],
        answer:  "fruit",
      },
      {
        id:      "j3",
        before:  "He eats lots of",
        after:   ".",
        correct: ["tomatoes"],
        answer:  "tomatoes",
      },
    ],
  },
];
 
// flat list of all items for validation
const ALL_ITEMS = SECTIONS.flatMap((s) => s.items);
 
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
    const allAnswered = ALL_ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ALL_ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    const total = ALL_ITEMS.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };
 
  const handleShowAnswer = () => {
    const filled = {};
    ALL_ITEMS.forEach((item) => { filled[item.id] = item.answer; });
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
 
  const renderItem = (item, index) => {
    const wrong    = isWrong(item);
    const value    = answers[item.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(item);
 
    return (
      <div key={item.id} className="lrw-row">
        <span className="lrw-num">{index + 1}</span>
        <span className="lrw-text">{item.before}</span>
 
        <div className="lrw-input-wrap">
          <input
            type="text"
            className={[
              "lrw-input",
              wrong   ? "lrw-input--wrong"  : "",
              showAns ? "lrw-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(item.id, e.target.value, item.correct)}
            style={{ borderBottomColor: uColor, color: tColor }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="lrw-badge">✕</div>}
        </div>
 
        {item.after && <span className="lrw-text">{item.after}</span>}
      </div>
    );
  };
 
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Sections stacked ── */
        .lrw-sections {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.6vw, 48px);
          width: 80%;
        }
 
        /* Single section */
        .lrw-section {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }
 
        /* Table image */
        .lrw-table-img {
          width: 100%;
          height: auto;
          display: block;
        }
 
        /* Items list */
        .lrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }
 
        /* Single row: num | before-text | input stretches to end */
        .lrw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          width: 100%;
        }
 
        .lrw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }
 
        .lrw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }
 
        /* Input wrap — يمتد لملء باقي المساحة */
        .lrw-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }
 
        .lrw-input {
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
        .lrw-input:disabled  { opacity: 1; cursor: default; }
        .lrw-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer   { color: ${INPUT_ANSWER_COLOR};}
 
        /* ✕ badge */
        .lrw-badge {
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
 
        .lrw-buttons {
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
          <span className="WB-ex-A-1">D</span>
          Look, read, and write.
        </h1>
 
        {/* ── Sections ── */}
        <div className="lrw-sections">
          {SECTIONS.map((section) => (
            <div key={section.id} className="lrw-section">
 
              {/* Table image */}
              <img
                src={section.table}
                alt={`table-${section.id}`}
                className="lrw-table-img"
              />
 
              {/* Sentences */}
              <div className="lrw-list">
                {section.items.map((item, index) => renderItem(item, index))}
              </div>
 
            </div>
          ))}
        </div>
 
        {/* ── Buttons ── */}
        <div className="lrw-buttons">
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