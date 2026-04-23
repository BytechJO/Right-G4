import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.5.svg";
import AudioWithCaption from "../../AudioWithCaption";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd7pg38instruction-adult-lady_MkitoI5l.mp3";

const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR  = "#ef4444";
const SELECT_COLOR = "#f39b42";

const OPTIONS = ["fl", "pl", "sl"];

const ITEMS = [
  { id: 1, img: img1, correct: "pl" },
  { id: 2, img: img2, correct: "fl" },
  { id: 3, img: img3, correct: "sl" },
  { id: 4, img: img4, correct: "pl" },
  { id: 5, img: img5, correct: "fl" },
];

export default function WB_ListenAndCircle_PageB() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const captions = [
  { start: 0.58, end: 4.36, text: "Page 38, phonics exercise B." },
  { start: 4.36, end: 8.74, text: "Listen and circle FL, PL, or SL." },
  { start: 9.86, end: 11.78, text: "1- plate." },
  { start: 11.78, end: 14.64, text: "2- fly." },
  { start: 14.64, end: 17.70, text: "3- slide." },
  { start: 17.70, end: 21.60, text: "4- plant." },
  { start: 21.60, end: 23.60, text: "5- flag." },
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

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

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
          <span className="WB-ex-A">B</span>
          Listen and circle{" "}
          <strong>fl</strong>, <strong>pl</strong>, or <strong>sl</strong>.
        </h1>
<div style={{ display: "flex", justifyContent: "center" }}>
  <AudioWithCaption src={sound1} captions={captions} />
</div>

        {/* ── Cards: 5 في صف ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap:                 "clamp(10px,1.5vw,20px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           "clamp(8px,1vw,14px)",
                }}
              >
                {/* رقم */}
                <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111" }}>
                  {item.id}
                </span>

                {/* الصورة */}
                <div
                  style={{
                    width:        "100%",
                    aspectRatio:  "1 / 1",
                    border:       `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    overflow:     "hidden",
                    background:   "#f9f9f9",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    position:     "relative",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{ width: "85%", height: "85%", objectFit: "contain" }}
                  />

                  {/* Wrong badge */}
                  {wrong && (
                    <div style={{
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
                    }}>
                      ✕
                    </div>
                  )}
                </div>

                {/* الخيارات: fl / pl / sl */}
                <div
                  style={{
                    width:          "100%",
                    border:         `2px solid ${BORDER_COLOR}`,
                    borderRadius:   "999px",
                    padding:        "clamp(4px,0.6vw,8px) clamp(6px,0.8vw,10px)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-around",
                    background:     "#fff",
                    boxSizing:      "border-box",
                    gap:            "2px",
                  }}
                >
                  {OPTIONS.map((opt) => {
                    const isSelected = answers[item.id] === opt;
                    const isCorrectShown = showAns && item.correct === opt;
                    const isWrongSelected =
                      showResults && !showAns && answers[item.id] === opt && opt !== item.correct;

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(item.id, opt)}
                        style={{
                          fontSize:     "clamp(13px,1.5vw,19px)",
                          fontWeight:   isSelected || isCorrectShown ? 800 : 500,
                          color:        isWrongSelected
                            ? WRONG_COLOR
                            : isSelected || isCorrectShown
                            ? "#111"
                            : "#555",
                          background:   "transparent",
                          border:       isSelected || isCorrectShown
                            ? `2px solid ${isWrongSelected ? WRONG_COLOR : SELECT_COLOR}`
                            : "2px solid transparent",
                          borderRadius: "999px",
                          padding:      "clamp(2px,0.4vw,5px) clamp(6px,0.8vw,10px)",
                          cursor:       showAns ? "default" : "pointer",
                          transition:   "all 0.15s",
                          lineHeight:   1,
                          userSelect:   "none",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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