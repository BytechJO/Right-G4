import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/6.svg";

const WRONG_COLOR  = "#ef4444";
const ACTIVE_COLOR = "#f39b42";
const CARD_BORDER  = "#a3a3a3";

const ITEMS = [
  { id: 1, img: img1, options: ["beach",      "dig"],   correct: "beach"      },
  { id: 2, img: img2, options: ["garden",     "barn"],  correct: "barn"       },
  { id: 3, img: img3, options: ["swim",       "dig"],   correct: "swim"       },
  { id: 4, img: img4, options: ["skateboard", "bike"],  correct: "skateboard" },
  { id: 5, img: img5, options: ["boat",       "car"],   correct: "boat"       },
  { id: 6, img: img6, options: ["zoo",        "farm"],  correct: "farm"       },
];

export default function WB_Unit8_Page58_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) score++; });
    setChecked(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => { correctMap[item.id] = item.correct; });
    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    checked && !showAns && answers[item.id] !== item.correct;

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
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">C</span> Look, read, and circle.
        </h1>

        {/* Grid 2×3 */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(16px,2.5vw,32px) clamp(20px,4vw,50px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            return (
              <div
                key={item.id}
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        "clamp(10px,1.4vw,18px)",
                  position:   "relative",
                  minWidth:   0,
                }}
              >
                {/* number */}
                <span
                  style={{
                    fontSize:   "clamp(16px,1.9vw,26px)",
                    fontWeight: 700,
                    color:      "#111",
                    lineHeight: 1.4,
                    flexShrink: 0,
                    minWidth:   "clamp(14px,1.8vw,22px)",
                  }}
                >
                  {item.id}
                </span>

                {/* image */}
                <div
                  style={{
                    width:        "clamp(100px,16vw,200px)",
                    height:       "clamp(80px,13vw,160px)",
                    border:       `2px solid #f39b42`,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    overflow:     "hidden",
                    background:   "#fff",
                    flexShrink:   0,
                  }}
                >
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:      "100%",
                      height:     "100%",
                      objectFit:  "cover",
                      display:    "block",
                      userSelect: "none",
                    }}
                  />
                </div>

                {/* options */}
                <div
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "clamp(10px,1.5vw,20px)",
                    paddingTop:    "clamp(6px,0.8vw,12px)",
                    minWidth:      0,
                    flex:          1,
                  }}
                >
                  {item.options.map((option) => {
                    const selected = answers[item.id] === option;
                    const optWrong = wrong && selected;

                    // لون الدايرة: برتقالي عادي، أحمر لما غلط
                    const circleColor = optWrong ? WRONG_COLOR : ACTIVE_COLOR;

                    return (
                      <div
                        key={option}
                        onClick={() => handleSelect(item.id, option)}
                        style={{
                          position:       "relative",
                          display:        "inline-flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          padding:        "clamp(4px,0.6vw,8px) clamp(10px,1.4vw,18px)",
                          fontSize:       "clamp(14px,1.8vw,24px)",
                          fontWeight:     selected ? 700 : 500,
                          color:  
                             "#333",
                          cursor:         showAns ? "default" : "pointer",
                          userSelect:     "none",
                          lineHeight:     1.2,
                          transition:     "color 0.15s",
                          whiteSpace:     "nowrap",
                        }}
                      >
                        {/* دايرة الاختيار */}
                        {selected && (
                          <div
                            style={{
                              position:     "absolute",
                              inset:        0,
                              border:       `3px solid ${circleColor}`,
                              borderRadius: "999px",
                              pointerEvents:"none",
                            }}
                          />
                        )}

                        <span style={{ position: "relative", zIndex: 1 }}>
                          {option}
                        </span>

                        {/* wrong badge — يسار أعلى على الكلمة */}
                        {optWrong && (
                          <div
                            style={{
                              position:        "absolute",
                              top:             "-8px",
                              left:            "-8px",
                              width:           "clamp(16px,1.8vw,22px)",
                              height:          "clamp(16px,1.8vw,22px)",
                              borderRadius:    "50%",
                              backgroundColor: WRONG_COLOR,
                              border:          "1.5px solid #fff",
                              color:           "#fff",
                              display:         "flex",
                              alignItems:      "center",
                              justifyContent:  "center",
                              fontSize:        "clamp(9px,0.9vw,12px)",
                              fontWeight:      700,
                              boxShadow:       "0 2px 6px rgba(0,0,0,0.2)",
                              zIndex:          5,
                              pointerEvents:   "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}