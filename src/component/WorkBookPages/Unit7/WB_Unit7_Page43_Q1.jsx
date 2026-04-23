import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import person1Img  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/1.svg";
import person2Img  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/2.svg";
import person3Img  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/3.svg";
import person4Img  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/4.svg";

const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";
const OPTIONS      = ["me", "you", "it"];

// كل bubble: جهة الصورة (left/right) + جهة السهم
const ITEMS = [
  {
    id:        1,
    before:    "Look at",
    after:     "!",
    correct:   "me",
    imgSrc:    person1Img,
    imgSide:   "left",   // الصورة يسار والفقاعة يمين
  },
  {
    id:        2,
    before:    "Can I play with",
    after:     "?",
    correct:   "you",
    imgSrc:    person2Img,
    imgSide:   "right",  // الصورة يمين والفقاعة يسار
  },
  {
    id:        3,
    before:    "I can't draw",
    after:     "!",
    correct:   "you",
    imgSrc:    person3Img,
    imgSide:   "left",
  },
  {
    id:        4,
    before:    "Please play with",
    after:     "!",
    correct:   "me",
    imgSrc:    person4Img,
    imgSide:   "right",
  },
];

export default function SB_LookReadWrite_PageI() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => selected[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (selected[i.id] === i.correct) score++; });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = i.correct; });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && selected[item.id] !== item.correct;

  const renderBubble = (item) => {
    const wrong = isWrong(item);
    return (
      <div
        style={{
          display:      "flex",
          alignItems:   "center",
          gap:          "clamp(6px,1vw,14px)",
          width:        "100%",
          flexDirection: item.imgSide === "left" ? "row" : "row-reverse",
        }}
      >
        {/* صورة الشخص */}
        <div
          style={{
            width:        "clamp(70px,12vw,140px)",
            flexShrink:   0,
            display:      "flex",
            alignItems:   "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={item.imgSrc}
            alt={`person-${item.id}`}
            style={{
              width:         "100%",
              height:        "auto",
              objectFit:     "contain",
              display:       "block",
              userSelect:    "none",
              pointerEvents: "none",
            }}
          />
        </div>

     

        {/* فقاعة الكلام */}
        <div
          style={{
            position:     "relative",
            flex:         1,
            minWidth:     0,
            border:       `2px solid #555`,
            borderRadius: "clamp(10px,1.4vw,18px)",
            padding:      "clamp(8px,1.2vw,16px) clamp(12px,1.6vw,20px)",
            background:   "#fff",
            display:      "flex",
            alignItems:   "center",
            flexWrap:     "wrap",
            gap:          "clamp(4px,0.5vw,8px)",
            boxSizing:    "border-box",
            transition:   "border-color 0.2s",
          }}
        >
          {/* before text */}
          <span
            style={{
              fontSize:   "clamp(14px,1.9vw,26px)",
              fontWeight: 500,
              color:      "#111",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {item.before}
          </span>

          {/* dropdown */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "flex-end" }}>
            <select
              disabled={showAns}
              value={selected[item.id] || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              style={{
                minWidth:     "clamp(60px,10vw,130px)",
                borderTop:    "none",
                borderLeft:   "none",
                borderRight:  "none",
                borderBottom: `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                borderRadius: 0,
                outline:      "none",
                fontSize:     "clamp(14px,1.9vw,26px)",
                fontWeight:   700,
                color:         RED_COLOR,
                padding:      "0 clamp(4px,0.5vw,6px) 2px 2px",
                background:   "transparent",
                cursor:       showAns ? "default" : "pointer",
                appearance:   "auto",
                boxSizing:    "border-box",
              }}
            >
              <option value="" disabled hidden></option>
              {OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {/* wrong badge — يسار أعلى */}
            {wrong && (
              <div
                style={{
                  position:        "absolute",
                  top:             "-8px",
                  left:            "-8px",
                  width:           "clamp(16px,1.8vw,22px)",
                  height:          "clamp(16px,1.8vw,22px)",
                  borderRadius:    "50%",
                  backgroundColor: WRONG_COLOR,
                  border:          "1px solid #fff",
                  color:           "#fff",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  fontSize:        "clamp(9px,0.9vw,12px)",
                  fontWeight:      700,
                  boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                  zIndex:          3,
                  pointerEvents:   "none",
                }}
              >
                ✕
              </div>
            )}
          </div>

          {/* after text */}
          <span
            style={{
              fontSize:   "clamp(14px,1.9vw,26px)",
              fontWeight: 500,
              color:      "#111",
              lineHeight: 1.3,
            }}
          >
            {item.after}
          </span>
        </div>
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
          <span className="WB-ex-A">I</span>
          Look, read, and write{" "}
          <strong style={{ fontWeight: 900 }}>me</strong>,{" "}
          <strong style={{ fontWeight: 900 }}>you</strong>, or{" "}
          <strong style={{ fontWeight: 900 }}>it</strong>.
        </h1>

        {/* Bubbles */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(18px,3vw,36px)",
            width:         "100%",
          }}
        >
          {ITEMS.map((item) => renderBubble(item))}
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