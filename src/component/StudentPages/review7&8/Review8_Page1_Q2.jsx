import React, { useState } from "react";
import Button from "../../Button";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "talk",  example: "She talked to her friend." },
  { id: 2, word: "cook",  example: "" },
  { id: 3, word: "paint", example: "" },
  { id: 4, word: "jump",  example: "" },
  { id: 5, word: "wash",  example: "" },
  { id: 6, word: "play",  example: "" },
  { id: 7, word: "help",  example: "" },
  { id: 8, word: "pull",  example: "" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWritePastTense_QB() {
  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rwpt-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
        }

        .rwpt-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.9vw, 12px);
        }

        .rwpt-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(16px, 2vw, 24px);
        }

        .rwpt-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${WORD_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(50px, 7vw, 90px);
        }

        .rwpt-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
        }

        .rwpt-buttons {
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
          <span className="WB-ex-A-1">B</span>
          Read and write sentences in the past tense.
        </h1>

        {/* ── Items ── */}
        <div className="rwpt-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwpt-row">
              <span className="rwpt-num">{item.id}</span>
              <span className="rwpt-word">{item.word}</span>
              <input
                type="text"
                className="rwpt-input"
                value={answers[item.id] || (item.example && item.id === 1 ? item.example : "")}
                onChange={(e) => handleChange(item.id, e.target.value)}
                placeholder={item.id === 1 ? item.example : ""}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {/* ── Reset only ── */}
        <div className="rwpt-buttons">
     <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        </div>
      </div>
    </div>
  );
}