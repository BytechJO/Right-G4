import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";
const VARY_COLOR              = "#c81e1e";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  open-ended — no correct answer check
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "inside"  },
  { id: 2, word: "through" },
  { id: 3, word: "between" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteOwn_QF() {
  const [answers,  setAnswers]  = useState({});
  const [checked,  setChecked]  = useState(false);

  const handleChange = (id, value) => {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please write a sentence for each word."); return; }
    setChecked(true);
    ValidationAlert.success(`Score: ${ITEMS.length} / ${ITEMS.length}`);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  // no show answer for open-ended
  const handleShowAnswer = () => {
    ValidationAlert.info("Students' answers will vary.");
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Header note ── */
        .rwof-vary {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${VARY_COLOR};
          font-style: italic;
          font-weight: 600;
          margin-left: clamp(8px, 1vw, 14px);
        }

        /* ── Items list ── */
        .rwof-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
          margin: 12% 0;
        }

        /* Single row: num | word | input */
        .rwof-row {
          display: grid;
          grid-template-columns: auto clamp(80px, 10vw, 130px) 1fr;
          align-items: flex-end;
          gap: clamp(10px, 1.4vw, 20px);
          min-width: 0;
        }

        .rwof-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwof-word {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${WORD_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        .rwof-input-wrap {
          position: relative;
        }

        .rwof-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwof-input:disabled { opacity: 1; cursor: default; }

        .rwof-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rwof-row {
            grid-template-columns: auto clamp(70px, 20vw, 100px) 1fr;
            gap: 8px;
          }
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
          Read and write your own sentences.
        </h1>

        {/* ── Items ── */}
        <div className="rwof-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwof-row">
              <span className="rwof-num">{item.id}</span>
              <span className="rwof-word">{item.word}</span>
              <div className="rwof-input-wrap">
                <input
                  type="text"
                  className="rwof-input"
                  value={answers[item.id] || ""}
                  disabled={checked}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  style={{ borderBottomColor: INPUT_UNDERLINE_DEFAULT }}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwof-buttons">
          <Button
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}