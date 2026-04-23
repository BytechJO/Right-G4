import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/6.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR  = "#ef4444";
const DRAG_COLOR   = "#ffca94";
const BORDER_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  { id: 1, text: "He will swim in the sea."       },
  { id: 2, text: "She won't fly a kite."           },
  { id: 3, text: "They will go to the beach."      },
  { id: 4, text: "She will do her homework."       },
  { id: 5, text: "She won't plant a flower."       },
  { id: 6, text: "He won't play the drum."         },
];

const ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
];

const CORRECT_ANSWERS = { 1: 4, 2: 2, 3: 5, 4: 3, 5: 6, 6: 1 };
const NUMBERS         = [1, 2, 3, 4, 5, 6];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -8,
      right:           -8,
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
export default function WB_Unit10_Page57_QA() {
  const [answers,       setAnswers]       = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem,     setTouchItem]     = useState(null);
  const [touchPos,      setTouchPos]      = useState({ x: 0, y: 0 });
  const [checked,       setChecked]       = useState(false);
  const [showAns,       setShowAns]       = useState(false);

  const dropRefs    = useRef({});
  const usedNumbers = Object.values(answers);

  // ── applyDrop مشترك ──
  const applyDrop = (id, num) => {
    if (!num || showAns) return;
    setChecked(false);
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { if (updated[k] === num) delete updated[k]; });
      updated[id] = num;
      return updated;
    });
  };

  // ── Mouse drag ──
  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (id) => {
    if (draggedNumber === null) return;
    applyDrop(id, draggedNumber);
    setDraggedNumber(null);
  };

  // ── Touch drag ──
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
    setTouchItem(null);
    setDraggedNumber(null);
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
      <div className="div-forall" style={{ gap: "clamp(16px,2vw,24px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>{" "}
          Read, look, and number the pictures.
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
                  width:           "clamp(38px,5vw,52px)",
                  height:          "clamp(38px,5vw,52px)",
                  borderRadius:    "50%",
                  backgroundColor: disabled || showAns ? "#cfcfd4" : DRAG_COLOR,
                  color:           "#fff",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  fontWeight:      700,
                  fontSize:        "clamp(17px,2.2vw,26px)",
                  cursor:          disabled || showAns ? "not-allowed" : "grab",
                  opacity:         disabled ? 0.55 : 1,
                  userSelect:      "none",
                  touchAction:     "none",
                  transition:      "0.2s ease",
                  transform:       selected ? "scale(1.1)" : "scale(1)",
                  boxShadow:       selected
                    ? "0 0 0 3px rgba(242,154,31,0.35)"
                    : "0 3px 10px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* ── اليسار: الجمل | اليمين: الصور ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1.1fr 0.95fr",
            gap:                 "clamp(16px,3vw,30px)",
            alignItems:          "start",
          }}
        >
          {/* الجمل */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,24px)" }}>
            {SENTENCES.map((item) => (
              <div
                key={item.id}
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        "clamp(8px,1vw,14px)",
                }}
              >
                <span
                  style={{
                    fontSize:   "clamp(15px,1.9vw,22px)",
                    fontWeight: 700,
                    color:      "#111",
                    minWidth:   "clamp(16px,1.9vw,22px)",
                    lineHeight: 1.4,
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </span>
                <p
                  style={{
                    margin:     0,
                    fontSize:   "clamp(14px,1.7vw,20px)",
                    color:      "#222",
                    lineHeight: 1.45,
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* الصور 2×3 */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap:                 "clamp(8px,1.2vw,14px)",
            }}
          >
            {ITEMS.map((item) => {
              const wrong = isWrong(item.id);
              const num   = answers[item.id];

              return (
                <div
                  key={item.id}
                  ref={(el) => (dropRefs.current[item.id] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  style={{
                    position:     "relative",
                    width:        "100%",
                    aspectRatio:  "3 / 2",
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    overflow:     "visible",
                    border:       `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    background:   "#f7f7f7",
                    boxSizing:    "border-box",
                    transition:   "border-color 0.2s",
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

                  {/* صندوق الرقم */}
                  <div
                    onClick={() => handleRemove(item.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(item.id)}
                    style={{
                      position:        "absolute",
                      top:             "clamp(4px,0.8vw,8px)",
                      right:           "clamp(4px,0.8vw,8px)",
                      width:           "clamp(26px,3.5vw,40px)",
                      height:          "clamp(26px,3.5vw,40px)",
                      borderRadius:    "clamp(5px,0.7vw,8px)",
                      border:          `2px solid  #f39b42`,
                      backgroundColor: "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(13px,2vw,24px)",
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
                  {wrong && <ErrorBadge />}
                </div>
              );
            })}
          </div>
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
            left:            touchPos.x - 26,
            top:             touchPos.y - 26,
            width:           "clamp(38px,5vw,52px)",
            height:          "clamp(38px,5vw,52px)",
            borderRadius:    "50%",
            backgroundColor: DRAG_COLOR,
            color:           "#fff",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "clamp(17px,2.2vw,26px)",
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