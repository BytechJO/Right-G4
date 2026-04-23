import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/4.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR  = "#ef4444";
const SELECT_COLOR = "#dc2626";
const CARD_BORDER  = "#a3a3a3";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, img: img1, options: ["dogs",  "ducks"], correct: "dogs" },
  { id: 2, img: img2, options: ["bees",  "beets"], correct: "bees" },
  { id: 3, img: img3, options: ["bags",  "bats"],  correct: "bats" },
  { id: 4, img: img4, options: ["cups",  "cubs"],  correct: "cups" },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -10,
      right:           -10,
      width:           "clamp(18px,2vw,24px)",
      height:          "clamp(18px,2vw,24px)",
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        "clamp(10px,1vw,13px)",
      fontWeight:      700,
      border:          "1.5px solid #fff",
      boxShadow:       "0 2px 6px rgba(0,0,0,0.2)",
      zIndex:          5,
      pointerEvents:   "none",
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit9_Page56_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // ── handlers ──
  const handleSelect = (id, value) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.error("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) correct++; });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => { correctMap[item.id] = item.correct; });
    setAnswers(correctMap);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) =>
    checked && answers[id] !== ITEMS.find((item) => item.id === id)?.correct;

  // ── ستايل زر الاختيار ──
  const optionStyle = (itemId, option) => {
    const selected = answers[itemId] === option;
    const wrong    = isWrong(itemId) && selected;

    return {
      minWidth:        "clamp(80px,10vw,120px)",
      minHeight:       "clamp(38px,4.5vw,52px)",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        "clamp(16px,2vw,24px)",
      fontWeight:      selected ? 700 : 500,
      color:           wrong ? WRONG_COLOR : selected ? SELECT_COLOR : "#555",
      cursor:          showAns ? "default" : "pointer",
      border:          selected
        ? `3px solid ${wrong ? WRONG_COLOR : SELECT_COLOR}`
        : "3px solid transparent",
      borderRadius:    "999px",
      backgroundColor: "transparent",
      transition:      "all 0.15s ease",
      boxSizing:       "border-box",
      padding:         "0 clamp(6px,0.8vw,12px)",
    };
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(20px,3vw,36px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>{" "}
          Look, read, and circle. Say.
        </h1>

        {/* ── البطاقات 4 في صف ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            gap:                 "clamp(14px,2vw,26px)",
            alignItems:          "start",
            justifyItems:        "center",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item.id);

            return (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           "clamp(6px,0.8vw,10px)",
                  width:         "100%",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize:   "clamp(16px,1.9vw,22px)",
                    fontWeight: 700,
                    color:      "#111",
                    alignSelf:  "flex-start",
                    paddingLeft: "4px",
                  }}
                >
                  {item.id}
                </span>

                {/* البطاقة */}
                <div
                  style={{
                    position:        "relative",
                    width:           "100%",
                    border:          `2.5px solid ${wrong ? WRONG_COLOR : CARD_BORDER}`,
                    borderRadius:    "clamp(14px,1.8vw,24px)",
                    backgroundColor: "#fff",
                    display:         "flex",
                    flexDirection:   "column",
                    alignItems:      "center",
                    padding:         "clamp(10px,1.2vw,16px) clamp(8px,1vw,14px) clamp(14px,1.6vw,20px)",
                    boxSizing:       "border-box",
                    gap:             "clamp(8px,1vw,14px)",
                    transition:      "border-color 0.2s",
                  }}
                >
                  {/* الصورة */}
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:      "100%",
                      height:     "clamp(120px,15vw,180px)",
                      objectFit:  "contain",
                      display:    "block",
                      userSelect: "none",
                    }}
                  />

                  {/* خيارات الاختيار */}
                  <div
                    style={{
                      width:          "100%",
                      display:        "flex",
                      justifyContent: "space-around",
                      alignItems:     "center",
                      gap:            "clamp(4px,0.6vw,10px)",
                    }}
                  >
                    {item.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.id, option)}
                        style={optionStyle(item.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* بادج الخطأ */}
                  {wrong && <ErrorBadge />}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
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