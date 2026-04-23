import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import stellaImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/1.svg";
import take1     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/2.svg";
import take2     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/3.svg";
import take3     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/4.svg";
import take4     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/5.svg";
import notTake1  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/6.svg";
import notTake2  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/7.svg";
import notTake3  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/8.svg";
import notTake4  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/9.svg";

const WRONG_COLOR  = "#ef4444";
const ACTIVE_COLOR = "#f39b42";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";

const QUESTIONS = [
  { id: 1, text: "Will Stella take her bag on the trip tomorrow?", correct: "Yes, she will."  },
  { id: 2, text: "Will she take her red skirt on the trip?",       correct: "No, she won't."  },
  { id: 3, text: "Will she take an umbrella?",                     correct: "Yes, she will."  },
  { id: 4, text: "Will she take her shoes?",                       correct: "Yes, she will."  },
  { id: 5, text: "Will she take her lunchbox?",                    correct: "Yes, she will."  },
  { id: 6, text: "Will she take her green shirt?",                 correct: "No, she won't."  },
];

const ANSWER_OPTIONS = ["Yes, she will.", "No, she won't."];
const TAKE_IMAGES     = [take1, take2, take3, take4];
const NOT_TAKE_IMAGES = [notTake1, notTake2, notTake3, notTake4];

export default function WB_Unit8_Page59_QE() {
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
    const allAnswered = QUESTIONS.every((q) => selected[q.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    QUESTIONS.forEach((q) => { if (selected[q.id] === q.correct) score++; });
    setShowResults(true);
    const total = QUESTIONS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    QUESTIONS.forEach((q) => { filled[q.id] = q.correct; });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (q) =>
    showResults && !showAns && selected[q.id] !== q.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(14px,2vw,22px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">E</span> Read, look, and write.
        </h1>

        {/* ── Answer options — ثابتة فوق ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "clamp(16px,3vw,40px)",
            flexWrap:       "wrap",
          }}
        >
          {ANSWER_OPTIONS.map((opt) => (
            <div
              key={opt}
              style={{
                minWidth:     "clamp(140px,20vw,220px)",
                padding:      "clamp(8px,1vw,14px) clamp(14px,1.8vw,24px)",
                border:       `2.5px solid #f39b42`,
                borderRadius: "clamp(10px,1.2vw,16px)",
                background:   "#fff",
                fontSize:     "clamp(14px,1.8vw,22px)",
                fontWeight:   600,
                color:        "#222",
                textAlign:    "center",
                userSelect:   "none",
              }}
            >
              {opt}
            </div>
          ))}
        </div>

        {/* ── Trip title ── */}
        <div
          style={{
            textAlign:      "center",
            fontSize:       "clamp(16px,2vw,26px)",
            fontWeight:     700,
            color:          "#222",
            textDecoration: "underline",
          }}
        >
          Trip to the Grand Canyon
        </div>

        {/* ── Top layout: Stella | Take | Not Take ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "clamp(100px,15vw,170px) 1fr 1fr",
            gap:                 "clamp(10px,1.5vw,20px)",
            alignItems:          "stretch",
            width:               "100%",
          }}
        >
          {/* Stella */}
          <div
            style={{
              border:       "2px solid #f39b42",
              borderRadius: "clamp(10px,1.2vw,16px)",
              overflow:     "hidden",
              background:   "#fff",
              aspectRatio:  "1 / 1",
            }}
          >
            <img
              src={stellaImg}
              alt="Stella"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }}
            />
          </div>

          {/* Things to Take */}
          <div
            style={{
              border:       "2px solid #f39b42",
              borderRadius: "clamp(10px,1.2vw,16px)",
              padding:      "clamp(8px,1vw,14px)",
              background:   "#fff",
              boxSizing:    "border-box",
            }}
          >
            <div
              style={{
                textAlign:      "center",
                fontSize:       "clamp(13px,1.6vw,20px)",
                fontWeight:     600,
                color:          "#222",
                textDecoration: "underline",
                marginBottom:   "clamp(6px,0.8vw,10px)",
              }}
            >
              Things to Take
            </div>
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap:                 "clamp(6px,0.8vw,10px)",
                justifyItems:        "center",
              }}
            >
              {TAKE_IMAGES.map((img, i) => (
                <img key={i} src={img} alt={`take-${i+1}`}
                  style={{ width: "clamp(40px,6vw,72px)", height: "clamp(40px,6vw,72px)", objectFit: "contain", display: "block", userSelect: "none" }}
                />
              ))}
            </div>
          </div>

          {/* Things Not to Take */}
          <div
            style={{
              border:       "2px solid #f39b42",
              borderRadius: "clamp(10px,1.2vw,16px)",
              padding:      "clamp(8px,1vw,14px)",
              background:   "#fff",
              boxSizing:    "border-box",
            }}
          >
            <div
              style={{
                textAlign:      "center",
                fontSize:       "clamp(13px,1.6vw,20px)",
                fontWeight:     600,
                color:          "#222",
                textDecoration: "underline",
                marginBottom:   "clamp(6px,0.8vw,10px)",
              }}
            >
              Things Not to Take
            </div>
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap:                 "clamp(6px,0.8vw,10px)",
                justifyItems:        "center",
              }}
            >
              {NOT_TAKE_IMAGES.map((img, i) => (
                <img key={i} src={img} alt={`not-take-${i+1}`}
                  style={{ width: "clamp(40px,6vw,72px)", height: "clamp(40px,6vw,72px)", objectFit: "contain", display: "block", userSelect: "none" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Questions with dropdown ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(12px,1.8vw,20px)",
            width:         "100%",
          }}
        >
          {QUESTIONS.map((q) => {
            const wrong = isWrong(q);
            return (
              <div
                key={q.id}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(8px,1.2vw,16px)",
                  minWidth:   0,
                  flexWrap:   "wrap",
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
                    minWidth:   "clamp(14px,1.8vw,22px)",
                  }}
                >
                  {q.id}
                </span>

                {/* question text */}
                <span
                  style={{
                    fontSize:  "clamp(13px,1.7vw,22px)",
                    fontWeight: 500,
                    color:     "#222",
                    lineHeight: 1.35,
                    flex:      1,
                    minWidth:  "clamp(160px,30vw,300px)",
                    wordBreak: "break-word",
                  }}
                >
                  {q.text}
                </span>

                {/* dropdown */}
                <div
                  style={{
                    position:  "relative",
                    flexShrink: 0,
                  }}
                >
                  <select
                    disabled={showAns}
                    value={selected[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    style={{
                      minWidth:     "clamp(140px,20vw,240px)",
                      borderTop:    "none",
                      borderLeft:   "none",
                      borderRight:  "none",
                      borderBottom: `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                      borderRadius: 0,
                      outline:      "none",
                      fontSize:     "clamp(13px,1.7vw,22px)",
                      fontWeight:   600,
                      color:        RED_COLOR,
                      padding:      "0 clamp(4px,0.6vw,8px) 4px 2px",
                      background:   "transparent",
                      cursor:       showAns ? "default" : "pointer",
                      appearance:   "auto",
                      boxSizing:    "border-box",
                    }}
                  >
                    <option value="" disabled hidden></option>
                    {ANSWER_OPTIONS.map((opt) => (
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