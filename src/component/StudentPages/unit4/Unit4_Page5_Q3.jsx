import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import { div } from "framer-motion/client";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR     = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const ANSWER_COLOR     = "#c0392b";
const TEXT_DEFAULT     = "#2b2b2b";
const LINE_COLOR       = "#2b2b2b";
const WRONG_COLOR      = "#ef4444";
const RIGHT_COLOR      = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    before: "I",
    after: ".",
    correct: "forgot",
    options: [
      { label: "a", text: "forgot" },
      { label: "b", text: "guys doing" },
    ],
  },
  {
    id: 2,
    before: "It sure",
    after: "!",
    correct: "does",
    options: [
      { label: "a", text: "hey" },
      { label: "b", text: "does" },
    ],
  },
  {
    id: 3,
    before: "What are you guys",
    after: "?",
    correct: "doing",
    options: [
      { label: "a", text: "you" },
      { label: "b", text: "doing" },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadCircleWrite_QA() {
  const [selected,    setSelected]    = useState({});  // { itemId: optionText }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, text) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: text }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please circle an answer for each sentence."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const getOptionState = (item, optText) => {
    const isSel = selected[item.id] === optText;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (showResults) return item.correct === optText ? "correct" : "wrong";
    return "selected";
  };

  const getInputValue = (item) => {
    const sel = selected[item.id];
    if (!sel) return "";
    return sel;
  };

  const getInputColor = (item) => {
    if (!showResults && !showAns) return ANSWER_COLOR;
    if (showAns) return ANSWER_COLOR;
    return selected[item.id] === item.correct ? RIGHT_COLOR : WRONG_COLOR;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── كل صف ── */
        .rcw-row {
          display: flex;
          align-items: baseline;
          gap: clamp(24px, 4vw, 60px);
          width: 100%;
          flex-wrap: nowrap;
          
          }
          
          /* ── الجملة يسار ── */
        .rcw-sentence {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex: 1;
          min-width: 0;
          flex-wrap: nowrap;
        }
        
        .rcw-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
        }
        
        .rcw-text {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          flex-shrink: 0;
          }
          
          /* input الجملة */
          .rcw-input-wrap {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: clamp(80px, 10vw, 140px);
            }
            
            .rcw-input {
              width: 100%;
              border: none;
              border-bottom: 2px solid ${LINE_COLOR};
              outline: none;
              background: transparent;
              font-size: clamp(15px, 1.8vw, 22px);
              font-weight: 700;
              padding: 0 4px 2px;
              text-align: center;
              caret-color: transparent;
              cursor: default;
              pointer-events: none;
              }
              
        /* ── الخيارات يمين ── */
        .rcw-options {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 28px);
          flex-shrink: 0;
          }

          .rcw-option {
            display: flex;
            align-items: center;
            gap: 6px;
            }
            
            .rcw-opt-label {
              font-size: clamp(13px, 1.5vw, 18px);
              font-weight: 700;
              color: ${TEXT_DEFAULT};
              flex-shrink: 0;
              }
              
              /* الكلمة مع الدائرة */
              .rcw-opt-word {
                position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 6px) clamp(12px, 1.6vw, 20px);
          cursor: pointer;
          user-select: none;
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          }
          .rcw-opt-word--locked { cursor: default; }
          
          .rcw-oval {
            position: absolute;
            inset: 0;
            border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
          }

          .rcw-opt-word--selected .rcw-oval { border-color: ${CIRCLE_COLOR}; }
        .rcw-opt-word--correct  .rcw-oval { border-color: ${CIRCLE_COLOR}; }
        .rcw-opt-word--wrong    .rcw-oval { border-color: ${CIRCLE_WRONG}; }
        
        /* ✕ badge */
        .rcw-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.6vw, 19px);
          height: clamp(15px, 1.6vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
          }
          
          .rcw-buttons {
            display: flex;
            justify-content: center;
            margin-top: clamp(10px, 1.8vw, 20px);
            }
            `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.8vw, 36px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">B</span>
          Read, circle, and write.
        </h1>

        {/* Rows */}
        {ITEMS.map((item) => {
          const inputVal   = getInputValue(item);
          const inputColor = getInputColor(item);

          return (
            <div style={{marginTop : "5%  "}}>
            
            <div key={item.id} className="rcw-row">

              {/* ── الجملة ── */}
              <div className="rcw-sentence">
                <span className="rcw-num">{item.id}</span>
                <span className="rcw-text">{item.before}</span>

                <span className="rcw-input-wrap">
                  <input
                    className="rcw-input"
                    type="text"
                    readOnly
                    value={inputVal}
                    style={{ color: inputColor, borderBottomColor: inputVal ? inputColor : LINE_COLOR }}
                  />
                </span>

                <span className="rcw-text">{item.after}</span>
              </div>

              {/* ── الخيارات ── */}
              <div className="rcw-options">
                {item.options.map((opt) => {
                  const state = getOptionState(item, opt.text);
                  return (
                    <div key={opt.label} className="rcw-option">
                      <span className="rcw-opt-label">{opt.label}</span>
                      <span
                        className={[
                          "rcw-opt-word",
                          isLocked          ? "rcw-opt-word--locked"   : "",
                          state === "selected" ? "rcw-opt-word--selected" : "",
                          state === "correct"  ? "rcw-opt-word--correct"  : "",
                          state === "wrong"    ? "rcw-opt-word--wrong"    : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() => handleSelect(item.id, opt.text)}
                      >
                        <div className="rcw-oval" />
                        {opt.text}
                        {state === "wrong" && <div className="rcw-badge">✕</div>}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
        </div>
          );
        })}

        {/* Buttons */}
        <div className="rcw-buttons">
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