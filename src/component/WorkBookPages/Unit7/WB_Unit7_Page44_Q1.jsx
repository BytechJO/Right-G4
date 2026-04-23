import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import AudioWithCaption from "../../AudioWithCaption";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd8pg44instruction1-adult-lady_BcSB6hth.mp3"; // ← غيّر المسار حسب ملف الأوديو

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/5.svg";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";

const ITEMS = [
  { id: 1, img: img1, options: ["h", "s", "g"], correct: "h" },
  { id: 2, img: img2, options: ["p", "r", "m"], correct: "m" },
  { id: 3, img: img3, options: ["c", "t", "k"], correct: "t" },
  { id: 4, img: img4, options: ["v", "k", "s"], correct: "k" },
  { id: 5, img: img5, options: ["n", "m", "b"], correct: "n" },
];

export default function WB_ListenAndCircle_PageA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const captions = [
  { start: 0.54, end: 3.20, text: "Page 44, phonics exercise A." },
  { start: 3.20, end: 6.16, text: "Listen and circle the beginning sound." },
  { start: 7.26, end: 8.94, text: "1- house." },
  { start: 9.96, end: 11.74, text: "2- moon." },
  { start: 12.80, end: 14.72, text: "3- tie." },
  { start: 14.72, end: 17.54, text: "4- kite." },
  { start: 18.60, end: 20.40, text: "5- net." },
];
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

  const getOptStyle = (item, opt) => {
    const isSelected     = answers[item.id] === opt;
    const isWrong        = showResults && !showAns && answers[item.id] === opt && opt !== item.correct;
    const isCorrectShown = showAns && opt === item.correct;

    if (isWrong) return { border: `2.5px solid ${WRONG_COLOR}`, color: WRONG_COLOR };
    if (isSelected || isCorrectShown) return { border: `2.5px solid ${BORDER_COLOR}`, color: "#111" };
    return { border: "2.5px solid transparent", color: "#444" };
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">A</span>
          Listen and circle the <strong>beginning sound</strong>.
        </h1>
<div style={{ display: "flex", justifyContent: "center" }}>
  <AudioWithCaption src={sound1} captions={captions} />
</div>

        {/* ── Grid 5 في صف ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap:                 "clamp(10px,1.5vw,20px)",
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
              <span style={{ fontSize: "clamp(15px,1.7vw,22px)", fontWeight: 700, color: "#111", alignSelf: "flex-start" }}>
                {item.id}
              </span>

              {/* الصورة */}
              <div style={{
                width:        "100%",
                aspectRatio:  "1 / 1",
                border:       `2px solid ${BORDER_COLOR}`,
                borderRadius: "clamp(10px,1.2vw,16px)",
                overflow:     "hidden",
                background:   "#f7f7f7",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
              }}>
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{ width: "85%", height: "85%", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* الحروف */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(4px,0.5vw,7px)", width: "100%" }}>
                {item.options.map((opt) => {
                  const isWrong = showResults && !showAns && answers[item.id] === opt && opt !== item.correct;
                  return (
                    <div key={opt} style={{ position: "relative", width: "100%" }}>
                      <button
                        onClick={() => handleSelect(item.id, opt)}
                        style={{
                          width:        "100%",
                          padding:      "clamp(3px,0.5vw,6px)",
                          borderRadius: "999px",
                          fontSize:     "clamp(15px,1.8vw,22px)",
                          fontWeight:   answers[item.id] === opt ? 700 : 500,
                          cursor:       showAns ? "default" : "pointer",
                          transition:   "all 0.15s",
                          userSelect:   "none",
                          textAlign:    "center",
                          boxSizing:    "border-box",
                          background:   "transparent",
                          ...getOptStyle(item, opt),
                        }}
                      >
                        {opt}
                      </button>

                      {isWrong && (
                        <div style={{
                          position:        "absolute",
                          top:             "-6px",
                          right:           "-6px",
                          width:           "clamp(14px,1.6vw,18px)",
                          height:          "clamp(14px,1.6vw,18px)",
                          borderRadius:    "50%",
                          border:          "1px solid #fff",
                          backgroundColor: WRONG_COLOR,
                          color:           "#fff",
                          display:         "flex",
                          alignItems:      "center",
                          justifyContent:  "center",
                          fontSize:        "9px",
                          fontWeight:      700,
                          boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                          pointerEvents:   "none",
                        }}>✕</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,1vw,12px)" }}>
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleStartAgain} />
        </div>
      </div>
    </div>
  );
}