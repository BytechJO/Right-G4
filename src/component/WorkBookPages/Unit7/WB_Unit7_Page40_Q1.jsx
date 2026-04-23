import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/6.svg";

const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";
const OPTIONS      = ["him", "her", "it"];

const ITEMS = [
  { id: 1, before: "Hansel likes",    after: ".",  correct: "him", img: img1 },
  { id: 2, before: "Stella likes",    after: ".",  correct: "her", img: img2 },
  { id: 3, before: "I like",          after: ".",  correct: "it",  img: img3 },
  { id: 4, before: "Tom likes",       after: ".",  correct: "him", img: img4 },
  { id: 5, before: "Look at",         after: ".",  correct: "it",  img: img5 },
  { id: 6, before: "Helen sits next to", after: ".", correct: "her", img: img6 },
];

export default function SB_ReadLookWrite_PageC() {
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
          <span className="WB-ex-A">C</span>
          Read, look, and write{" "}
          <strong style={{ fontWeight: 900 }}>him</strong>,{" "}
          <strong style={{ fontWeight: 900 }}>her</strong>, or{" "}
          <strong style={{ fontWeight: 900 }}>it</strong>.
        </h1>

        {/* Items */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(16px,2.5vw,30px)",
            width:         "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            return (
              <div
                key={item.id}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(10px,1.5vw,20px)",
                  width:      "100%",
                  minWidth:   0,
                }}
              >
                {/* number */}
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

                {/* sentence + dropdown */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "baseline",
                    flexWrap:   "wrap",
                    gap:        "clamp(4px,0.6vw,8px)",
                    flex:       1,
                    minWidth:   0,
                  }}
                >
                  {/* before text */}
                  <span
                    style={{
                      fontSize:   "clamp(14px,1.8vw,24px)",
                      fontWeight: 500,
                      color:      "#111",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.before}
                  </span>

                  {/* dropdown — زي السطر المسطر */}
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "flex-end" }}>
                    <select
                      disabled={showAns}
                      value={selected[item.id] || ""}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        minWidth:        "clamp(80px,12vw,160px)",
                        borderTop:       "none",
                        borderLeft:      "none",
                        borderRight:     "none",
                        borderBottom:    `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                        borderRadius:    0,
                        outline:         "none",
                        fontSize:        "clamp(14px,1.8vw,24px)",
                        fontWeight:      700,
                        color:           wrong ? WRONG_COLOR : RED_COLOR,
                        padding:         "0 clamp(4px,0.6vw,8px) 3px 2px",
                        background:      "transparent",
                        cursor:          showAns ? "default" : "pointer",
                        appearance:      "auto",
                        boxSizing:       "border-box",
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
                      fontSize:   "clamp(14px,1.8vw,24px)",
                      fontWeight: 500,
                      color:      "#111",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.after}
                  </span>
                </div>

                {/* image — يمين */}
                <div
                  style={{
                    width:        "clamp(50px,8vw,90px)",
                    aspectRatio:  "1 / 1",
                    flexShrink:   0,
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:         "100%",
                      height:        "100%",
                      objectFit:     "contain",
                      display:       "block",
                      userSelect:    "none",
                      pointerEvents: "none",
                    }}
                  />
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
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}