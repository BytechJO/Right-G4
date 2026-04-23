import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/5.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const DRAG_COLOR  = "#ffca94";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, img: img1,
    lines: ["Where's Helen's mom?", "She's in a taxi."],
  },
  {
    id: 2, img: img2,
    lines: ["Where's Stella's mom?", "She's in the kitchen."],
  },
  {
    id: 3, img: img3,
    lines: ["Where are Jack and Sarah?", "They're on the playground."],
  },
  {
    id: 4, img: img4,
    lines: ["Where is Tom?", "He's at school."],
  },
];

const CORRECT_ANSWERS = { 1: 3, 2: 4, 3: 1, 4: 2 };
const NUMBERS         = [1, 2, 3, 4];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = ({ top = -8, right = -8 }) => (
  <div
    style={{
      position:        "absolute",
      top,
      right,
      width:           18,
      height:          18,
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        9,
      fontWeight:      700,
      border:          "1.5px solid #fff",
      pointerEvents:   "none",
      zIndex:          5,
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit9_Page55_QI() {
  const [answers,       setAnswers]       = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem,     setTouchItem]     = useState(null);
  const [touchPos,      setTouchPos]      = useState({ x: 0, y: 0 });
  const [checked,       setChecked]       = useState(false);
  const [showAns,       setShowAns]       = useState(false);

  const dropRefs   = useRef({});
  const usedNumbers = Object.values(answers);

  // ── Drag (desktop) ──
  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (id) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(id, draggedNumber);
    setDraggedNumber(null);
  };

  // ── Touch (mobile) ──
  const handleTouchStart = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;
    const t = e.touches[0];
    setTouchItem(num);
    setDraggedNumber(num);
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
    setDraggedNumber(null);
  };

  const applyDrop = (id, num) => {
    setChecked(false);
    const updated = { ...answers };
    Object.keys(updated).forEach((k) => { if (updated[k] === num) delete updated[k]; });
    updated[id] = num;
    setAnswers(updated);
  };

  const handleRemove = (id) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
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
    ITEMS.forEach((item) => { if (answers[item.id] === CORRECT_ANSWERS[item.id]) correct++; });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    setAnswers({ ...CORRECT_ANSWERS });
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => checked && answers[id] !== CORRECT_ANSWERS[id];

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
          <span className="WB-ex-A">I</span>{" "}
          Read, look, and number.
        </h1>

        {/* ── الأرقام للسحب ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "clamp(10px,1.5vw,16px)",
            flexWrap:       "wrap",
          }}
        >
          {NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);
            const selected = draggedNumber === num || touchItem === num;

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                onTouchStart={(e) => handleTouchStart(e, num)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  width:          "clamp(40px,5vw,56px)",
                  height:         "clamp(40px,5vw,56px)",
                  borderRadius:   "50%",
                  backgroundColor: disabled || showAns ? "#cfcfd4" : DRAG_COLOR,
                  color:          "#fff",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontWeight:     700,
                  fontSize:       "clamp(18px,2.4vw,28px)",
                  cursor:         disabled || showAns ? "not-allowed" : "grab",
                  opacity:        disabled ? 0.55 : 1,
                  userSelect:     "none",
                  touchAction:    "none",
                  transition:     "0.2s ease",
                  transform:      selected ? "scale(1.1)" : "scale(1)",
                  boxShadow:      selected
                    ? `0 0 0 3px rgba(242,154,31,0.35)`
                    : "0 3px 10px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* ── الأسئلة ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,1.8vw,20px)" }}>
          {ITEMS.map((item) => {
            const wrong = isWrong(item.id);
            const num   = answers[item.id];

            return (
              <div
                key={item.id}
                style={{
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "clamp(10px,2vw,24px)",
                  flexWrap:    "wrap",
                }}
              >
                {/* رقم السؤال + النص */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "flex-start",
                    gap:        "clamp(8px,1vw,14px)",
                    flex:       1,
                    minWidth:   "200px",
                  }}
                >
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,24px)",
                      fontWeight: 700,
                      color:      "#111",
                      minWidth:   "clamp(16px,1.9vw,24px)",
                      flexShrink: 0,
                      marginTop:  "2px",
                    }}
                  >
                    {item.id}
                  </span>

                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    {item.lines.map((line, i) => (
                      <p
                        key={i}
                        style={{
                          margin:     0,
                          fontSize:   "clamp(14px,1.7vw,20px)",
                          color:      "#222",
                          lineHeight: 1.45,
                          fontWeight: 500,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* الصورة + صندوق الإجابة */}
                <div
                  ref={(el) => (dropRefs.current[item.id] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  style={{
                    position:        "relative",
                    width:           "clamp(160px,22vw,220px)",
                    aspectRatio:     "3 / 2",
                    border:          `2px solid "#f39b42"}`,
                    borderRadius:    "clamp(10px,1.2vw,16px)",
                    overflow:        "visible",
                    backgroundColor: "#f7f7f7",
                    flexShrink:      0,
                    transition:      "border-color 0.2s",
                  }}
                >
                  {/* الصورة داخل clip */}
                  <div
                    style={{
                      position:     "absolute",
                      inset:        0,
                      borderRadius: "clamp(10px,1.2vw,16px)",
                      overflow:     "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`item-${item.id}`}
                      style={{
                        width:         "100%",
                        height:        "100%",
                        objectFit:     "cover",
                        display:       "block",
                        userSelect:    "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* صندوق الرقم - top right */}
                  <div
                    onClick={() => handleRemove(item.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(item.id)}
                    style={{
                      position:        "absolute",
                      top:             "clamp(4px,0.8vw,8px)",
                      right:           "clamp(4px,0.8vw,8px)",
                      width:           "clamp(28px,3.8vw,44px)",
                      height:          "clamp(28px,3.8vw,44px)",
                      borderRadius:    "clamp(5px,0.7vw,8px)",
                      border:          `2px solid  "#f39b42"}`,
                      backgroundColor: "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(14px,2.2vw,28px)",
                      fontWeight:      700,
                      color:           wrong ? WRONG_COLOR : DRAG_COLOR,
                      boxShadow:       "0 2px 6px rgba(0,0,0,0.15)",
                      zIndex:          4,
                      cursor:          num && !showAns ? "pointer" : "default",
                      transition:      "border-color 0.2s, color 0.2s",
                      boxSizing:       "border-box",
                    }}
                  >
                    {num || ""}
                  </div>

                  {/* بادج الخطأ */}
                  {wrong && <ErrorBadge top={-8} right={-8} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
            handleShowAnswer={handleShowAnswer}
          />
        </div>

      </div>

      {/* ── Ghost للمس ── */}
      {touchItem !== null && (
        <div
          style={{
            position:        "fixed",
            left:            touchPos.x - 28,
            top:             touchPos.y - 28,
            width:           "clamp(40px,5vw,56px)",
            height:          "clamp(40px,5vw,56px)",
            borderRadius:    "50%",
            backgroundColor: DRAG_COLOR,
            color:           "#fff",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "clamp(18px,2.4vw,28px)",
            fontWeight:      700,
            pointerEvents:   "none",
            zIndex:          9999,
            boxShadow:       "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}