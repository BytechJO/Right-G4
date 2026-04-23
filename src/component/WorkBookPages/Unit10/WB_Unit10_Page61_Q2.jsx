import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/8.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/9.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/10.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR  = "#ef4444";
const DRAG_COLOR   = "#f29a1f";
const BORDER_COLOR = "#f39b42";

// ── الفقرة ─────────────────────────────────────────────────────
const PARAGRAPH = `We are planning our vacation to the beach. Tonight, Dad will show us a brochure of the hotel where we will stay. We'll go to the store to buy new swimsuits tomorrow. On Tuesday, I'll choose what to pack. I'll start packing in three days. Next week, we'll be at the beach! We'll come home from the vacation in two weeks. I can't wait!`;

// ── بيانات الأسئلة ─────────────────────────────────────────────
const QUESTIONS = [
  { id: 1, label: "tonight",    correct: "Tonight, dad will show us a brochure of the hotel where we will stay." },
  { id: 2, label: "tomorrow",   correct: "We'll go to the store to buy new swimsuits tomorrow."                  },
  { id: 3, label: "Tuesday",    correct: "On Tuesday, I'll choose what to pack."                                 },
  { id: 4, label: "two weeks",  correct: "We'll come home from the vacation in two weeks."                       },
];

// ── بيانات الصور + الترتيب الصحيح ─────────────────────────────
const IMAGE_CARDS = [
  { id: 1, img: img1, correctNumber: 1 },
  { id: 2, img: img2, correctNumber: 3 },
  { id: 3, img: img3, correctNumber: 2 },
  { id: 4, img: img4, correctNumber: 6 },
  { id: 5, img: img5, correctNumber: 4 },
  { id: 6, img: img6, correctNumber: 5 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6];

// ── normalize للمقارنة ──────────────────────────────────────────
const normalize = (t) =>
  (t || "").replace(/[""،".!?']/g, "").replace(/\s+/g, " ").trim().toLowerCase();

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -8,
      right:           -8,
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
export default function WB_Unit10_Page61_QJ() {
  // ── state الصور ──
  const [imgAnswers,    setImgAnswers]    = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem,     setTouchItem]     = useState(null);
  const [touchPos,      setTouchPos]      = useState({ x: 0, y: 0 });

  // ── state الجمل ──
  const [textAnswers,   setTextAnswers]   = useState({});

  // ── state عام ──
  const [checked,  setChecked]  = useState(false);
  const [showAns,  setShowAns]  = useState(false);

  const dropRefs    = useRef({});
  const usedNumbers = Object.values(imgAnswers);

  // ── applyDrop ──
  const applyDrop = (id, num) => {
    if (!num || showAns) return;
    setChecked(false);
    setImgAnswers((prev) => {
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
      if (touchPos.x >= r.left && touchPos.x <= r.right &&
          touchPos.y >= r.top  && touchPos.y <= r.bottom)
        applyDrop(Number(key), touchItem);
    });
    setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleRemoveImg = (id) => {
    if (showAns) return;
    setChecked(false);
    setImgAnswers((prev) => { const u = { ...prev }; delete u[id]; return u; });
  };

  // ── نص الجمل ──
  const handleTextChange = (id, value) => {
    if (showAns) return;
    setChecked(false);
    setTextAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // ── isWrong helpers ──
  const isImgWrong  = (id) => checked && imgAnswers[id] !== IMAGE_CARDS.find(c => c.id === id)?.correctNumber;
  const isTextWrong = (id) => checked && normalize(textAnswers[id]) !== normalize(QUESTIONS.find(q => q.id === id)?.correct);
  const isTextRight = (id) => checked && normalize(textAnswers[id]) === normalize(QUESTIONS.find(q => q.id === id)?.correct);

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns) return;
    const allImgs  = IMAGE_CARDS.every((c) => imgAnswers[c.id]);
    const allTexts = QUESTIONS.every((q) => textAnswers[q.id]?.trim());
    if (!allImgs || !allTexts) {
      ValidationAlert.error("Please complete all answers first! ✏️");
      return;
    }
    let imgScore  = IMAGE_CARDS.filter((c) => imgAnswers[c.id] === c.correctNumber).length;
    let textScore = QUESTIONS.filter((q) => normalize(textAnswers[q.id]) === normalize(q.correct)).length;
    const correct = imgScore + textScore;
    const total   = IMAGE_CARDS.length + QUESTIONS.length;
    setChecked(true);
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    const imgs = {};
    IMAGE_CARDS.forEach((c) => { imgs[c.id] = c.correctNumber; });
    setImgAnswers(imgs);
    const texts = {};
    QUESTIONS.forEach((q) => { texts[q.id] = q.correct; });
    setTextAnswers(texts);
    setChecked(false);
    setShowAns(true);
    setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleReset = () => {
    setImgAnswers({});
    setTextAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(16px,2.5vw,28px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span>{" "}
          Read and write. Number the pictures in order.
        </h1>

        {/* ── الصف الأعلى: الصور + الفقرة ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "clamp(14px,2vw,24px)",
            alignItems:          "start",
          }}
        >
          {/* الصور 3×2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.5vw,16px)" }}>

            {/* الأرقام للسحب */}
            <div
              style={{
                display:        "flex",
                justifyContent: "center",
                gap:            "clamp(8px,1.2vw,14px)",
                flexWrap:       "wrap",
              }}
            >
              {DRAG_NUMBERS.map((num) => {
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
                      width:           "clamp(32px,4vw,46px)",
                      height:          "clamp(32px,4vw,46px)",
                      borderRadius:    "50%",
                      backgroundColor: disabled || showAns ? "#cfcfd4" : DRAG_COLOR,
                      color:           "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontWeight:      700,
                      fontSize:        "clamp(15px,2vw,24px)",
                      cursor:          disabled || showAns ? "not-allowed" : "grab",
                      opacity:         disabled ? 0.55 : 1,
                      userSelect:      "none",
                      touchAction:     "none",
                      transition:      "0.2s ease",
                      transform:       selected ? "scale(1.1)" : "scale(1)",
                      boxShadow:       selected
                        ? "0 0 0 3px rgba(242,154,31,0.35)"
                        : "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

            {/* الصور 3×2 */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                gap:                 "clamp(6px,1vw,12px)",
              }}
            >
              {IMAGE_CARDS.map((card) => {
                const wrong = isImgWrong(card.id);
                const num   = imgAnswers[card.id];
                return (
                  <div
                    key={card.id}
                    ref={(el) => (dropRefs.current[card.id] = el)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(card.id)}
                    style={{
                      position:     "relative",
                      width:        "100%",
                      aspectRatio:  "4 / 3",
                      border:       `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                      borderRadius: "clamp(8px,1vw,12px)",
                      overflow:     "visible",
                      background:   "#f7f7f7",
                      transition:   "border-color 0.2s",
                    }}
                  >
                    {/* الصورة */}
                    <div
                      style={{
                        position:     "absolute",
                        inset:        0,
                        borderRadius: "clamp(8px,1vw,12px)",
                        overflow:     "hidden",
                      }}
                    >
                      <img
                        src={card.img}
                        alt={`card-${card.id}`}
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

                    {/* صندوق الرقم top-right */}
                    <div
                      onClick={() => handleRemoveImg(card.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(card.id)}
                      style={{
                        position:        "absolute",
                        top:             "clamp(3px,0.6vw,6px)",
                        right:           "clamp(3px,0.6vw,6px)",
                        width:           "clamp(22px,3vw,36px)",
                        height:          "clamp(22px,3vw,36px)",
                        borderRadius:    "clamp(4px,0.6vw,7px)",
                        border:          `2px solid ${wrong ? WRONG_COLOR : "#bbb"}`,
                        backgroundColor: "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "clamp(12px,1.8vw,22px)",
                        fontWeight:      700,
                        color:           wrong ? WRONG_COLOR : DRAG_COLOR,
                        boxShadow:       "0 2px 4px rgba(0,0,0,0.15)",
                        zIndex:          4,
                        cursor:          num && !showAns ? "pointer" : "default",
                        transition:      "border-color 0.2s, color 0.2s",
                        boxSizing:       "border-box",
                      }}
                    >
                      {num || ""}
                    </div>

                    {wrong && <ErrorBadge />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* الفقرة */}
          <div
            style={{
              border:          "2px solid #e5e7eb",
              borderRadius:    "clamp(10px,1.2vw,16px)",
              backgroundColor: "#fff",
              padding:         "clamp(12px,1.5vw,20px)",
            }}
          >
            <p
              style={{
                margin:     0,
                fontSize:   "clamp(13px,1.6vw,18px)",
                lineHeight: 1.85,
                color:      "#222",
                fontWeight: 500,
              }}
            >
              {PARAGRAPH}
            </p>
          </div>
        </div>

        {/* ── الجمل ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.5vw,18px)" }}>
          {QUESTIONS.map((q) => {
            const wrong = isTextWrong(q.id);
            const right = isTextRight(q.id);
            return (
              <div
                key={q.id}
                style={{
                  position:   "relative",
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(6px,1vw,12px)",
                  flexWrap:   "nowrap",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize:   "clamp(15px,1.9vw,22px)",
                    fontWeight: 700,
                    color:      "#111",
                    flexShrink: 0,
                    minWidth:   "clamp(14px,1.8vw,20px)",
                  }}
                >
                  {q.id}
                </span>

                {/* التصنيف */}
                <span
                  style={{
                    fontSize:   "clamp(13px,1.6vw,18px)",
                    fontWeight: 600,
                    color:      "#555",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  ({q.label})
                </span>

                {/* حقل الإجابة */}
                <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                  <input
                    type="text"
                    disabled={showAns}
                    value={textAnswers[q.id] || ""}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    style={{
                      width:           "100%",
                      border:          "none",
                      borderBottom:    `2px solid ${wrong ? WRONG_COLOR : right ? "#22c55e" : "#888"}`,
                      outline:         "none",
                      background:      "transparent",
                      fontSize:        "clamp(13px,1.6vw,18px)",
                      fontWeight:      600,
                      color:           wrong ? WRONG_COLOR : right ? "#16a34a" : "#dc2626",
                      padding:         "2px 4px",
                      cursor:          showAns ? "default" : "text",
                      caretColor:      "#dc2626",
                      boxSizing:       "border-box",
                      transition:      "border-color 0.2s, color 0.2s",
                    }}
                  />
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
            left:            touchPos.x - 23,
            top:             touchPos.y - 23,
            width:           "clamp(32px,4vw,46px)",
            height:          "clamp(32px,4vw,46px)",
            borderRadius:    "50%",
            backgroundColor: DRAG_COLOR,
            color:           "#fff",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "clamp(15px,2vw,24px)",
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