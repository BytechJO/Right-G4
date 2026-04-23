import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/8.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const DRAG_BG     = "#ffca94";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, img: img1, question: "Is the teacher at the library?",       correct: "No, he isn't."    },
  { id: 2, img: img2, question: "Are the kids in the taxi?",            correct: "No, they aren't." },
  { id: 3, img: img3, question: "Are Hansel and Helen at the zoo?",     correct: "Yes, they are."   },
  { id: 4, img: img4, question: "Is Hansel in the living room?",        correct: "Yes, he is."      },
];

const DRAG_ITEMS = [
  "No, he isn't.",
  "No, they aren't.",
  "Yes, they are.",
  "Yes, he is.",
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -9,
      right:           -9,
      width:           "clamp(16px,1.8vw,20px)",
      height:          "clamp(16px,1.8vw,20px)",
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        "clamp(8px,0.9vw,11px)",
      fontWeight:      700,
      border:          "1.5px solid #fff",
      boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
      zIndex:          5,
      pointerEvents:   "none",
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page55_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [touchItem,   setTouchItem]   = useState(null);
  const [touchPos,    setTouchPos]    = useState({ x: 0, y: 0 });
  const [checked,     setChecked]     = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const dropRefs   = useRef({});
  const usedValues = Object.values(answers);

  // ── applyDrop مشترك ──
  const applyDrop = (id, value) => {
    if (!value || showAns) return;
    setChecked(false);
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { if (updated[k] === value) delete updated[k]; });
      updated[id] = value;
      return updated;
    });
  };

  // ── Mouse drag ──
  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (id) => {
    if (!draggedText) return;
    applyDrop(id, draggedText);
    setDraggedText(null);
  };

  // ── Touch drag ──
  const handleTouchStart = (e, value) => {
    if (showAns || usedValues.includes(value)) return;
    const t = e.touches[0];
    setTouchItem(value);
    setDraggedText(value);
    setTouchPos({ x: t.clientX, y: t.clientY });
  };

  const handleTouchMove = (e) => {
    if (touchItem === null) return;
    const t = e.touches[0];
    setTouchPos({ x: t.clientX, y: t.clientY });
  };

  const handleTouchEnd = () => {
    if (touchItem === null) return;
    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (
        touchPos.x >= r.left && touchPos.x <= r.right &&
        touchPos.y >= r.top  && touchPos.y <= r.bottom
      ) applyDrop(Number(key), touchItem);
    });
    setTouchItem(null);
    setDraggedText(null);
  };

  const handleRemove = (id) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => { const u = { ...prev }; delete u[id]; return u; });
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.error("Please complete all answers first! ✏️");
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
    setTouchItem(null);
    setDraggedText(null);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) =>
    checked && answers[id] !== ITEMS.find((item) => item.id === id)?.correct;

  return (
      <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px,3vw,36px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span>{" "}
          Read, look, and write.
        </h1>

        {/* ── بنك الكلمات ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "clamp(8px,1.2vw,12px)",
            flexWrap:       "wrap",
          }}
        >
          {DRAG_ITEMS.map((value, index) => {
            const disabled = usedValues.includes(value);
            const selected = draggedText === value || touchItem === value;

            return (
              <div
                key={index}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(value)}
                onTouchStart={(e) => handleTouchStart(e, value)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding:         "clamp(6px,0.8vw,10px) clamp(12px,1.5vw,18px)",
                  borderRadius:    "20px",
                  backgroundColor: disabled ? "#f1f5f9" : DRAG_BG,
                  border:          `1.5px solid ${disabled ? "#e2e8f0" : "#e08a10"}`,
                  color:           disabled ? "#cbd5e1" : "#fff",
                  fontSize:        "clamp(13px,1.5vw,18px)",
                  fontWeight:      600,
                  cursor:          disabled || showAns ? "not-allowed" : "grab",
                  opacity:         disabled ? 0.7 : 1,
                  userSelect:      "none",
                  touchAction:     "none",
                  transition:      "all 0.15s",
                  textDecoration:  disabled ? "line-through" : "none",
                  transform:       selected ? "scale(1.05)" : "scale(1)",
                  boxShadow:       selected
                    ? "0 0 0 3px rgba(242,154,31,0.35)"
                    : "0 2px 6px rgba(0,0,0,0.10)",
                }}
              >
                {value}
              </div>
            );
          })}
        </div>

        {/* ── الأسئلة 2×2 ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(20px,3vw,36px) clamp(16px,3vw,46px)",
            alignItems:          "start",
          }}
        >
          {ITEMS.map((item) => {
            const value = answers[item.id];
            const wrong = isWrong(item.id);

            return (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "clamp(8px,1.2vw,14px)",
                }}
              >
                {/* رقم + سؤال */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(8px,1vw,12px)" }}>
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,24px)",
                      fontWeight: 700,
                      color:      "#111",
                      flexShrink: 0,
                      lineHeight: 1,
                      marginTop:  "3px",
                    }}
                  >
                    {item.id}
                  </span>
                  <p
                    style={{
                      margin:     0,
                      fontSize:   "clamp(14px,1.7vw,20px)",
                      lineHeight: 1.4,
                      color:      "#222",
                      fontWeight: 500,
                    }}
                  >
                    {item.question}
                  </p>
                </div>

                {/* الصورة */}
                <img
                  src={item.img}
                  alt={`question-${item.id}`}
                  style={{
                    width:      "100%",
                    height:     "auto",
                    aspectRatio:"16 / 9",
                    objectFit:  "contain",
                    display:    "block",
                    borderRadius: "clamp(8px,1vw,12px)",
                    border : "2px soild #f39b42"
                  }}
                />

                {/* خلية الإجابة */}
                <div
                  ref={(el) => (dropRefs.current[item.id] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  onClick={() => handleRemove(item.id)}
                  style={{
                    position:       "relative",
                    minHeight:      "clamp(34px,4vw,48px)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    padding:        "4px 8px",
                    borderBottom:   `2px solid ${wrong ? WRONG_COLOR : "#555"}`,
                    color:          wrong
                      ? WRONG_COLOR
                      : value ? "#d92d20" : "#bbb",
                    fontSize:       "clamp(14px,1.7vw,20px)",
                    fontWeight:     value ? 600 : 400,
                    textAlign:      "center",
                    cursor:         value && !showAns ? "pointer" : "default",
                    transition:     "border-color 0.2s, color 0.2s",
                  }}
                >
                  {value || "— drop here —"}
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

      {/* ── Ghost للمس ── */}
      {touchItem !== null && (
        <div
          style={{
            position:        "fixed",
            left:            touchPos.x - 70,
            top:             touchPos.y - 20,
            padding:         "8px 14px",
            borderRadius:    "16px",
            backgroundColor: DRAG_BG,
            color:           "#fff",
            fontSize:        "clamp(13px,1.5vw,16px)",
            fontWeight:      600,
            pointerEvents:   "none",
            zIndex:          9999,
            boxShadow:       "0 4px 12px rgba(0,0,0,0.25)",
            whiteSpace:      "nowrap",
            opacity:         0.9,
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}