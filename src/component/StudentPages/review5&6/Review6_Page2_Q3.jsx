import React, { useState } from "react";
import Button from "../../Button";


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, before: "I eat many",     after: "." },
  { id: 2, before: "I don't eat much", after: "." },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WhatDoYouEat_QE() {
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
        .wdye-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
          margin: 15% 0;
        }

        .wdye-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .wdye-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .wdye-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .wdye-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 20vw, 300px);
        }

        .wdye-input {
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
        }

        /* ── Reset button ── */
        .wdye-reset-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(12px, 2vw, 24px);
        }

        .wdye-reset-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: clamp(8px, 1vw, 12px) clamp(22px, 3vw, 36px);
          background: transparent;
          border: 2px solid #9ca3af;
          border-radius: 999px;
          font-size: clamp(13px, 1.5vw, 17px);
          color: #6b7280;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.18s, color 0.18s;
        }
        .wdye-reset-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .wdye-reset-icon {
          font-size: clamp(14px, 1.6vw, 18px);
          line-height: 1;
        }
            .lrw-buttons {
          display: flex;
          justify-content: center;
             margin-top: 8.6% ;

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
          <span className="WB-ex-A-1">E</span>
          What do you eat? Read and write.
        </h1>

        {/* ── Items ── */}
        <div className="wdye-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wdye-row">
              <span className="wdye-num">{item.id}</span>
              <span className="wdye-text">{item.before}</span>
              <div className="wdye-input-wrap">
                <input
                  type="text"
                  className="wdye-input"
                  value={answers[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <span className="wdye-text">{item.after}</span>
            </div>
          ))}
        </div>

        {/* ── Reset only ── */}
        <div className="lrw-buttons">
    <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        </div>
      </div>
    </div>
  );
}