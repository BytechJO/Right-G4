import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.6.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const RIGHT_COLOR  = "#22c55e";

const ITEMS = [
  { id: 1, img: img1, correct: true  },
  { id: 2, img: img2, correct: false },
  { id: 3, img: img3, correct: true  },
  { id: 4, img: img4, correct: false },
  { id: 5, img: img5, correct: false },
  { id: 6, img: img6, correct: true  },
];

export default function WB_YSound_PageA() {
  const [answers,     setAnswers]     = useState({});   // id → true | false
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  /* ── select ✓ or ✕ for a card ── */
  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) =>
      prev[id] === value
        ? (() => { const upd = { ...prev }; delete upd[id]; return upd; })()  // deselect
        : { ...prev, [id]: value }
    );
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id] !== undefined);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (answers[i.id] === i.correct) score++; });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = i.correct; });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  /* ── helpers ── */
  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  const getCardBorderColor = (item) =>
    isWrong(item) ? WRONG_COLOR : BORDER_COLOR;

  /* colour of a box given which symbol it holds */
  const getBoxStyle = (item, boxValue) => {
    const selected   = answers[item.id] === boxValue;
    const isCorrect  = item.correct === boxValue;

    let bg      = "transparent";
    let border  = `2px solid ${BORDER_COLOR}`;
    let color   = boxValue ? RIGHT_COLOR : WRONG_COLOR;

    if (selected) {
      if (!showResults) {
        // before check — highlight with symbol colour tint
        bg = boxValue ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)";
        border = `2px solid ${boxValue ? RIGHT_COLOR : WRONG_COLOR}`;
      } else {
        // after check — green if correct answer selected, red if wrong
        const correct = answers[item.id] === item.correct;
        bg     = correct ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)";
        border = `2px solid ${correct ? RIGHT_COLOR : WRONG_COLOR}`;
        color  = correct ? RIGHT_COLOR : WRONG_COLOR;
      }
    }

    return { bg, border, color };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* ── Title ── */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">A</span>
          Does it have a <strong style={{ fontWeight: 900 }}>-y sound</strong>? Write ✓ or ✕.
        </h1>

        {/* ── Cards grid ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(6, minmax(0,1fr))",
            gap:                 "clamp(8px,1.2vw,16px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const borderColor = getCardBorderColor(item);

            return (
              <div
                key={item.id}
                style={{
                  position:     "relative",
                  width:        "100%",
                  display:      "flex",
                  flexDirection:"column",
                  gap:          "clamp(4px,0.6vw,8px)",
                  userSelect:   "none",
                }}
              >
                {/* ── Image card ── */}
                <div
                  style={{
                    position:     "relative",
                    width:        "100%",
                    aspectRatio:  "1 / 1",
                    border:       `2px solid ${borderColor}`,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    background:   "#fff",
                    overflow:     "hidden",
                    boxSizing:    "border-box",
                    boxShadow:    wrong
                      ? `0 0 0 2px ${WRONG_COLOR}40`
                      : "0 2px 8px rgba(0,0,0,0.07)",
                    transition:   "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      position:       "absolute",
                      top:            "clamp(4px,0.7vw,8px)",
                      left:           "clamp(4px,0.7vw,8px)",
                      width:          "clamp(20px,2.8vw,36px)",
                      height:         "clamp(20px,2.8vw,36px)",
                      borderRadius:   "clamp(5px,0.6vw,8px)",
                      border:         `2px solid ${BORDER_COLOR}`,
                      background:     "#fff",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontSize:       "clamp(11px,1.5vw,20px)",
                      fontWeight:     700,
                      color:          "#111",
                      zIndex:         2,
                      boxSizing:      "border-box",
                    }}
                  >
                    {item.id}
                  </div>

                  {/* Image */}
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:         "100%",
                      height:        "100%",
                      objectFit:     "contain",
                      display:       "block",
                      padding:       "clamp(10px,1.6vw,20px)",
                      boxSizing:     "border-box",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Wrong badge */}
                  {wrong && (
                    <div
                      style={{
                        position:        "absolute",
                        top:             "-8px",
                        right:           "-8px",
                        width:           "clamp(16px,1.8vw,22px)",
                        height:          "clamp(16px,1.8vw,22px)",
                        borderRadius:    "50%",
                        backgroundColor: WRONG_COLOR,
                        color:           "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "clamp(9px,0.9vw,12px)",
                        fontWeight:      700,
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
                        zIndex:          5,
                        pointerEvents:   "none",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                {/* ── Two answer boxes: ✓ | ✕ ── */}
                <div
                  style={{
                    display:       "flex",
                    gap:           "clamp(4px,0.5vw,6px)",
                    width:         "100%",
                  }}
                >
                  {[true, false].map((boxValue) => {
                    const { bg, border, color } = getBoxStyle(item, boxValue);
                    const symbol = boxValue ? "✓" : "✕";

                    return (
                      <button
                        key={String(boxValue)}
                        onClick={() => handleSelect(item.id, boxValue)}
                        disabled={showAns}
                        style={{
                          flex:           1,
                          height:         "clamp(28px,4vw,48px)",
                          border,
                          borderRadius:   "clamp(6px,0.8vw,10px)",
                          background:     bg,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          fontSize:       "clamp(14px,2.2vw,30px)",
                          fontWeight:     900,
                          color,
                          cursor:         showAns ? "default" : "pointer",
                          transition:     "background 0.15s, border 0.15s",
                          outline:        "none",
                          padding:        0,
                          lineHeight:     1,
                        }}
                      >
                        {symbol}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}