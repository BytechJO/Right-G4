import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page8/SVG/1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#ef4444";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const SENTENCE_COLOR     = "#2b2b2b";
const LABEL_COLOR        = "#2b2b2b";
const PARA_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Tim will visit the new Museum of Inventions tomorrow. He will take his little brother and friend with him. They will take a bus at eight o'clock and arrive at the museum at nine o'clock. Tim will pack a lunch in case they get hungry. He will have to remember to take his camera with him, so he can take pictures in the museum. Tim is certain they will have a lot of fun at the museum tomorrow.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: "a", sentence: "Tim will have to remember to take his camera with him.", correct: ["4"], answer: "4" },
  { id: "b", sentence: "Tim will pack a lunch.",                                   correct: ["3"], answer: "3" },
  { id: "c", sentence: "Tim will visit the museum tomorrow.",                      correct: ["1"], answer: "1" },
  { id: "d", sentence: "They will have fun at the museum.",                        correct: ["5"], answer: "5" },
  { id: "e", sentence: "Tim will take his brother and friend.",                    correct: ["2"], answer: "2" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    if (value !== "" && !/^[1-9]$/.test(value)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));

    // انتقال تلقائي للتالي
    if (value.length === 1) {
      const currentIdx = ITEMS.findIndex((i) => i.id === id);
      const next = ITEMS[currentIdx + 1];
      if (next) inputRefs.current[next.id]?.focus();
    }
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
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph + image row ── */
        .rnqc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .rnqc-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          text-indent: clamp(14px, 1.8vw, 22px);
          margin: 0;
        }

        .rnqc-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .rnqc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* Single row: label | sentence | box */
        .rnqc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .rnqc-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rnqc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Number input box */
        .rnqc-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rnqc-input {
          width: clamp(40px, 4.2vw, 40px);
          height: clamp(40px, 4.2vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px ;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .rnqc-input:disabled   { opacity: 1; cursor: default; }
        .rnqc-input--answer    { color: ${BOX_TEXT_ANSWER}; border-color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rnqc-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
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

        /* Buttons */
        .rnqc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rnqc-top { grid-template-columns: 1fr; }
          .rnqc-img { width: 100%; }
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
          <span className="WB-ex-A">C</span>
          Listen, read, and number.
        </h1>

        {/* ── Paragraph + Image ── */}
        <div className="rnqc-top">
          <p className="rnqc-para">{PARAGRAPH}</p>
          <img src={imgScene} alt="museum" className="rnqc-img" />
        </div>

        {/* ── Items ── */}
        <div className="rnqc-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
            const bColor   = wrong ? BOX_BORDER_WRONG : showAns ? BOX_TEXT_ANSWER : BOX_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rnqc-row">

                {/* Label a/b/c... */}
                <span className="rnqc-label">{item.id}</span>

                {/* Sentence */}
                <span className="rnqc-sentence">{item.sentence}</span>

                {/* Circle number input */}
                <div className="rnqc-input-wrap">
                  <input
                    ref={(el) => (inputRefs.current[item.id] = el)}
                    type="text"
                    maxLength={1}
                    className={[
                      "rnqc-input",
                      wrong   ? "rnqc-input--wrong"  : "",
                      showAns ? "rnqc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rnqc-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rnqc-buttons">
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