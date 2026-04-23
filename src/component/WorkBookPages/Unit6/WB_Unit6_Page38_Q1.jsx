import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/A.1.svg";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR  = "#ef4444";
const CHECK_COLOR  = "#ef4444";

const ITEMS = [
  { id: 1, text: "The cat is playing with a flag.", correct: "false" },
  { id: 2, text: "The man is sleeping.",            correct: "true"  },
  { id: 3, text: "There are flowers on the chair.", correct: "false" },
  { id: 4, text: "There are plates on the table.",  correct: "true"  },
];

export default function WB_TrueFalse_PageA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
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

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  // ── Checkbox component ──
  const renderCheckbox = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong    = isWrong(item) && selected;
    const showCheck = selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        style={{
          position:        "relative",
          width:           "clamp(28px,3.5vw,44px)",
          height:          "clamp(28px,3.5vw,44px)",
          border:          `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
          borderRadius:    "clamp(5px,0.6vw,8px)",
          background:      "#fff",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          showAns ? "default" : "pointer",
          boxSizing:       "border-box",
          flexShrink:      0,
          transition:      "border-color 0.2s",
        }}
      >
        {/* checkmark */}
        {showCheck && (
          <span
            style={{
              fontSize:   "clamp(18px,2.8vw,36px)",
              fontWeight: 900,
              color:      wrong ? WRONG_COLOR : CHECK_COLOR,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ✓
          </span>
        )}

        {/* wrong badge */}
        {wrong && (
          <div
            style={{
              position:        "absolute",
              top:             "-7px",
              right:           "-7px",
              width:           "clamp(14px,1.6vw,20px)",
              height:          "clamp(14px,1.6vw,20px)",
              borderRadius:    "50%",
              backgroundColor: WRONG_COLOR,
              color:           "#fff",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              border : "1px solid #fff",
              fontSize:        "clamp(8px,0.8vw,11px)",
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
    );
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
        {/* Title */}
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
          Look, read, and write ✓ for{" "}
          <strong style={{ fontWeight: 900 }}>true</strong> or{" "}
          <strong style={{ fontWeight: 900 }}>false</strong>.
        </h1>

        {/* Room image */}
        <div
          style={{
            width:        "100%",
            borderRadius: "clamp(12px,1.4vw,18px)",
            overflow:     "hidden",
            border:       `2px solid ${BORDER_COLOR}`,
            background:   "#f7f7f7",
          }}
        >
          <img
            src={roomImg}
            alt="room"
            style={{
              width:      "100%",
              height:     "auto",
              display:    "block",
              userSelect: "none",
            }}
          />
        </div>

        {/* Table: sentences + True + False */}
        <div
          style={{
            width:     "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
              gap:                 "clamp(8px,1vw,14px)",
              marginBottom:        "clamp(8px,1vw,12px)",
              paddingRight:        "clamp(4px,0.5vw,8px)",
            }}
          >
            <div />
            <div
              style={{
                textAlign:  "center",
                fontSize:   "clamp(16px,2vw,26px)",
                fontWeight: 700,
                color:      "#111",
              }}
            >
              True
            </div>
            <div
              style={{
                textAlign:  "center",
                fontSize:   "clamp(16px,2vw,26px)",
                fontWeight: 700,
                color:      "#111",
              }}
            >
              False
            </div>
          </div>

          {/* Item rows */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(12px,1.8vw,22px)",
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr clamp(60px,10vw,120px) clamp(60px,10vw,120px)",
                  gap:                 "clamp(8px,1vw,14px)",
                  alignItems:          "center",
                }}
              >
                {/* sentence */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        "clamp(8px,1vw,14px)",
                    minWidth:   0,
                  }}
                >
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,26px)",
                      fontWeight: 700,
                      color:      "#111",
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth:   "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      fontSize:   "clamp(14px,1.7vw,22px)",
                      fontWeight: 500,
                      color:     "#111",
                      lineHeight: 1.35,
                      wordBreak:  "break-word",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.text}
                  </span>
                </div>

                {/* True checkbox */}
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "center",
                    alignItems:     "center",
                  }}
                >
                  {renderCheckbox(item, "true")}
                </div>

                {/* False checkbox */}
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "center",
                    alignItems:     "center",
                  }}
                >
                  {renderCheckbox(item, "false")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
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