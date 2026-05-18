import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — الصورة الكاملة مع الـ names و emojis و places
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 26 (1).svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const PREFIX_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  prefix: "Why?" | "Why not?"  — ثابت قبل الـ input
//  before: نص ثابت قبل الـ input (مثل "Because John likes the")
//  after:  نص ثابت بعد الـ input (إذا موجود)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    prefix:  "Why?",
    before:  "Because John likes the",
    after:   "",
    correct: ["library", "Library"],
    answer:  "library",
  },
  {
    id:      2,
    prefix:  "Why not?",
    before:  "Because he doesn't like the",
    after:   "",
    correct: ["swimming pool", "Swimming pool"],
    answer:  "swimming pool.",
  },
  {
    id:      3,
    prefix:  "Why?",
    before:  "Because she likes the",
    after:   "",
    correct: ["zoo", "Zoo"],
    answer:  "zoo.",
  },
  {
    id:      4,
    prefix:  "Why?",
    before:  "Because she likes the",
    after:   "",
    correct: ["farm", "Farm"],
    answer:  "farm.",
  },
  {
    id:      5,
    prefix:  "Why not?",
    before:  "Because she doesn't like the",
    after:   "",
    correct: ["mall", "Mall"],
    answer:  "mall.",
  },
  {
    id:      6,
    prefix:  "Why?",
    before:  "Because he likes the",
    after:   "",
    correct: ["cinema", "Cinema"],
    answer:  "cinema",
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
export default function WB_LookWrite_QD() {
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
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Scene image ── */
        .lwd-scene-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Sentences list ── */
        .lwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
        }

        /* Single row: num | prefix | before | input | after */
        .lwd-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-prefix {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PREFIX_COLOR};
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-text {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PREFIX_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .lwd-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(90px, 12vw, 170px);
        }

        .lwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwd-input:disabled  { opacity: 1; cursor: default; }
        .lwd-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwd-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwd-badge {
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

        .lwd-buttons {
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
          Look and write.
        </h1>

        {/* ── Scene image ── */}
        <img src={imgScene} alt="scene" className="lwd-scene-img" />

        {/* ── Sentences ── */}
        <div className="lwd-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lwd-row">
                <span className="lwd-num">{item.id}</span>
                <span className="lwd-prefix">{item.prefix}</span>
                {item.before && <span className="lwd-text">{item.before}</span>}

                <div className="lwd-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lwd-input",
                      wrong   ? "lwd-input--wrong"  : "",
                      showAns ? "lwd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwd-badge">✕</div>}
                </div>

                {item.after && <span className="lwd-text">{item.after}</span>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwd-buttons">
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