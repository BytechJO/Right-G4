import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 41/SVG/1.svg";

const WRONG_COLOR = "#ef4444";
const RED_COLOR   = "#000000ff";
const LINE_COLOR  = "#333";
const OPTIONS     = ["in", "on", "in front of"];

const ITEMS = [
  {
    id:      1,
    before:  "There's a cat",
    after:   "the toy house.",
    correct: "on",
  },
  {
    id:      2,
    before:  "There's a mouse",
    after:   "the toy house.",
    correct: "in",
  },
  {
    id:      3,
    before:  "There's cheese",
    after:   "the toy house.",
    correct: "in front of",
  },
];

export default function WB_ReadLookWrite_PageE() {
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
          <span className="WB-ex-A">E</span>
          Read, look, and write{" "}
          <strong style={{ fontWeight: 900 }}>in</strong>,{" "}
          <strong style={{ fontWeight: 900 }}>on</strong>, or{" "}
          <strong style={{ fontWeight: 900 }}>in front of</strong>.
        </h1>

        {/* Main layout: sentences LEFT | house image RIGHT */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr auto",
            gap:                 "clamp(20px,3vw,40px)",
            alignItems:          "center",
            width:               "100%",
          }}
        >
          {/* Sentences */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(20px,3vw,36px)",
              minWidth:      0,
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
                    gap:        "clamp(8px,1vw,14px)",
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
                      minWidth:   "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>

                  {/* sentence block */}
                  <div
                    style={{
                      display:   "flex",
                      flexWrap:  "wrap",
                      alignItems:"baseline",
                      gap:       "clamp(4px,0.5vw,7px)",
                      minWidth:  0,
                      flex:      1,
                    }}
                  >
                    {/* before */}
                    <span
                      style={{
                        fontSize:   "clamp(14px,1.8vw,24px)",
                        fontWeight: 500,
                        color:      "#111",
                        lineHeight: 1.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.before}
                    </span>

                    {/* dropdown */}
                    <div
                      style={{
                        position: "relative",
                        display:  "inline-flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <select
                        disabled={showAns}
                        value={selected[item.id] || ""}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        style={{
                          minWidth:     "clamp(80px,14vw,180px)",
                          borderTop:    "none",
                          borderLeft:   "none",
                          borderRight:  "none",
                          borderBottom: `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                          borderRadius: 0,
                          outline:      "none",
                          fontSize:     "clamp(14px,1.8vw,24px)",
                          fontWeight:   700,
                          color:        RED_COLOR,
                          padding:      "0 clamp(4px,0.6vw,8px) 3px 2px",
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

                    {/* after */}
                    <span
                      style={{
                        fontSize:   "clamp(14px,1.8vw,24px)",
                        fontWeight: 500,
                        color:      "#111",
                        lineHeight: 1.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.after}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* House image */}
          <div
            style={{
              width:        "clamp(180px,28vw,340px)",
              flexShrink:   0,
            }}
          >
            <img
              src={houseImg}
              alt="toy house"
              style={{
                width:         "100%",
                height:        "auto",
                display:       "block",
                userSelect:    "none",
                pointerEvents: "none",
              }}
            />
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