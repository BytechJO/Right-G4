import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/8.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/9.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/10.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";

const ITEMS = [
  {
    id: 1, img: img1,
    options: ["bus station", "music room", "computer lab"],
    correct: "music room",
  },
  {
    id: 2, img: img2,
    options: ["street", "class", "cafeteria"],
    correct: "cafeteria",
  },
  {
    id: 3, img: img3,
    options: ["bus station", "soccer field", "library"],
    correct: "bus station",
  },
  {
    id: 4, img: img4,
    options: ["soccer field", "music room", "cafeteria"],
    correct: "soccer field",
  },
  {
    id: 5, img: img5,
    options: ["computer lab", "class", "street"],
    correct: "class",
  },
  {
    id: 6, img: img6,
    options: ["soccer field", "bus station", "computer lab"],
    correct: "computer lab",
  },
];

export default function WB_LookReadCircle_PageJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
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

  const getOptionStyle = (item, opt) => {
    const isSelected = answers[item.id] === opt;
    const isWrong    = showResults && !showAns && answers[item.id] === opt && opt !== item.correct;
    const isCorrectShown = showAns && opt === item.correct;

    if (isWrong) {
      return {
        border:          `2.5px solid ${WRONG_COLOR}`,
        color:           WRONG_COLOR,
      };
    }
    if (isSelected || isCorrectShown) {
      return {
        border:          `2.5px solid ${BORDER_COLOR}`,
        color:           "#111",
      };
    }
    return {
      border:          "2.5px solid transparent",
      color:           "#444",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(18px,2.5vw,28px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">J</span> Look, read, and circle.
        </h1>

        {/* ── Grid 3×2 ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap:                 "clamp(16px,2.5vw,32px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                gap:           "clamp(6px,0.8vw,10px)",
              }}
            >
              {/* رقم */}
              <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111", alignSelf: "flex-start" }}>
                {item.id}
              </span>

              {/* الصورة */}
              <div
                style={{
                  width:        "100%",
                  aspectRatio:  "1.4 / 1",
                  border:       `2px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  overflow:     "hidden",
                  background:   "#f7f7f7",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* الخيارات */}
              <div
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           "clamp(4px,0.5vw,7px)",
                  width:         "100%",
                }}
              >
                {item.options.map((opt) => {
                  const isSelected = answers[item.id] === opt;
                  const isWrong    = showResults && !showAns && answers[item.id] === opt && opt !== item.correct;

                  return (
                    <div key={opt} style={{ position: "relative", width: "100%" }}>
                      <button
                        onClick={() => handleSelect(item.id, opt)}
                        style={{
                          width:        "100%",
                          padding:      "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                          borderRadius: "999px",
                          fontSize:     "clamp(13px,1.4vw,18px)",
                          fontWeight:   isSelected ? 700 : 500,
                          cursor:       showAns ? "default" : "pointer",
                          transition:   "all 0.15s",
                          userSelect:   "none",
                          textAlign:    "center",
                          boxSizing:    "border-box",
                          background:   "transparent",
                          ...getOptionStyle(item, opt),
                        }}
                      >
                        {opt}
                      </button>

                      {/* Wrong badge */}
                      {isWrong && (
                        <div style={{
                          position:        "absolute",
                          top:             "-6px",
                          right:           "-6px",
                          width:           "clamp(16px,1.8vw,20px)",
                          height:          "clamp(16px,1.8vw,20px)",
                          borderRadius:    "50%",
                          border:          "1px solid #fff",
                          backgroundColor: WRONG_COLOR,
                          color:           "#fff",
                          display:         "flex",
                          alignItems:      "center",
                          justifyContent:  "center",
                          fontSize:        "clamp(9px,0.9vw,11px)",
                          fontWeight:      700,
                          boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                          pointerEvents:   "none",
                        }}>
                          ✕
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,1vw,12px)" }}>
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