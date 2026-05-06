import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 26/SVG/Asset 5.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#2096a6";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const SENTENCE_COLOR     = "#2b2b2b";
const NUMBER_COLOR       = "#2b2b2b";
const PARA_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Two years ago, my friends and I built a tree house in my backyard. It was big. It had chairs and tables. It had large windows. There were two bookcases in the tree house. We had a TV, so we could watch movies on the weekends.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "The tree house had a TV.",      correct: ["true",  "True"],  answer: "True"  },
  { id: 2, sentence: "It had beds and tables.",        correct: ["false", "False"], answer: "False" },
  { id: 3, sentence: "It had large windows.",          correct: ["true",  "True"],  answer: "True"  },
  { id: 4, sentence: "The tree house had a desk.",     correct: ["false", "False"], answer: "False" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim().toLowerCase() === c.toLowerCase());

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadTrueFalse_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    // only allow "true", "false" or partial typing
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
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

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrtf-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .lrtf-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          margin: 0;
        }

        .lrtf-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .lrtf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* Single row: num | sentence | box */
        .lrtf-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrtf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrtf-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Input box */
        .lrtf-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrtf-input {
          width: clamp(70px, 9vw, 110px);
          height: clamp(34px, 4.2vw, 46px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 600;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0 4px;
          box-sizing: border-box;
          cursor: text;
        }
        .lrtf-input:disabled   { opacity: 1; cursor: default; }
        .lrtf-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .lrtf-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .lrtf-badge {
          position: absolute;
          top: -8px; right: -8px;
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
        .lrtf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrtf-top { grid-template-columns: 1fr; }
          .lrtf-img { width: 100%; }
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
          <span className="WB-ex-A">C</span>
          Listen, read, and write <span style={{ color: "#ff9900ff", margin: "0 4px" }}>true</span> or <span style={{ color: "#ff9900ff", margin: "0 4px" }}>false</span>.
        </h1>

        {/* ── Paragraph + Image ── */}
        <div className="lrtf-top">
          <p className="lrtf-para">{PARAGRAPH}</p>
          <img src={imgScene} alt="treehouse" className="lrtf-img" />
        </div>

        {/* ── Items ── */}
        <div className="lrtf-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
            const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrtf-row">
                <span className="lrtf-num">{item.id}</span>
                <span className="lrtf-sentence">{item.sentence}</span>
                <div className="lrtf-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lrtf-input",
                      wrong   ? "lrtf-input--wrong"  : "",
                      showAns ? "lrtf-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="true / false"
                  />
                  {wrong && <div className="lrtf-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrtf-buttons">
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