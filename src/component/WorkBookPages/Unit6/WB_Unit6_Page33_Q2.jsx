import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─── استبدل هذه المسارات بمساراتك الحقيقية ──────────────────
import imgCar1    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar2    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar3    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgMedals  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.2.svg";
// ─────────────────────────────────────────────────────────────

// ─── ألوان الفرشاة ───────────────────────────────────────────
const BRUSH_COLORS = [
  { name: "red",    hex: "#ef4444" },
  { name: "blue",   hex: "#3b82f6" },
  { name: "orange", hex: "#f97316" },
  { name: "green",  hex: "#22c55e" },
  { name: "yellow", hex: "#eab308" },
  { name: "purple", hex: "#a855f7" },
  { name: "pink",   hex: "#ec4899" },
  { name: "brown",  hex: "#92400e" },
];

// ─── بيانات الجمل ────────────────────────────────────────────
const SENTENCES = [
  {
    id: 1,
    parts: [
      { type: "text", value: "The "       },
      { type: "slot", slotId: "1-color", answer: "red"    },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "1-place", answer: "second" },
      { type: "text", value: " place."    },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text", value: "The "       },
      { type: "slot", slotId: "2-color", answer: "blue"   },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "2-place", answer: "first"  },
      { type: "text", value: " place."    },
    ],
  },
  {
    id: 3,
    parts: [
      { type: "text", value: "The "       },
      { type: "slot", slotId: "3-color", answer: "orange" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "3-place", answer: "third"  },
      { type: "text", value: " place."    },
    ],
  },
];

const WORD_BANK_WORDS = ["second", "blue", "first", "red", "third", "orange"];

// ─── مكوّن Canvas للتلوين ─────────────────────────────────────
function PaintCanvas({ imgSrc, label, brushColor, brushSize }) {
  const canvasRef   = useRef(null);
  const isDrawing   = useRef(false);
  const lastPos     = useRef(null);

  // رسم الصورة عند التحميل
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const img    = new Image();
    img.src      = imgSrc;
    img.onload   = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imgSrc]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current   = getPos(e, canvasRef.current);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha  = 0.55;
    ctx.strokeStyle  = brushColor;
    ctx.lineWidth    = brushSize;
    ctx.lineCap      = "round";
    ctx.lineJoin     = "round";

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDraw = (e) => {
    e.preventDefault();
    isDrawing.current = false;
    lastPos.current   = null;
  };

  // مسح التلوين فقط وإعادة رسم الصورة
  const clearPaint = () => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.globalAlpha              = 1;
    ctx.globalCompositeOperation = "source-over";
    const img  = new Image();
    img.src    = imgSrc;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <canvas
        ref={canvasRef}
        width={160}
        height={90}
        style={{
          border:       "1.5px solid #e2e8f0",
          borderRadius: 10,
          cursor:       "crosshair",
          touchAction:  "none",
          background:   "#fff",
          maxWidth:     "100%",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{label}</span>
        <button
          onClick={clearPaint}
          style={{
            fontSize:     10,
            padding:      "2px 8px",
            borderRadius: 8,
            border:       "1px solid #e2e8f0",
            background:   "#f8fafc",
            color:        "#64748b",
            cursor:       "pointer",
          }}
        >
          ↺ clear
        </button>
      </div>
    </div>
  );
}

// ─── المكوّن الرئيسي ──────────────────────────────────────────
export default function WB_Unit6_Page33_Q2() {
  const [selectedColor, setSelectedColor] = useState(BRUSH_COLORS[0].hex);
  const [brushSize,     setBrushSize]     = useState(12);

  // drag & drop
  const [slots,    setSlots]    = useState({});
  const [checked,  setChecked]  = useState(false);
  const [showAns,  setShowAns]  = useState(false);
  const [wrongIds, setWrongIds] = useState({});

  const draggingWord = useRef(null);
  const draggingFrom = useRef(null);

  const usedWords = Object.values(slots).filter(Boolean);

  // ── Drag ──
  const onDragStartBank = (word) => {
    draggingWord.current = word;
    draggingFrom.current = "bank";
  };

  const onDragStartSlot = (slotId) => {
    draggingWord.current = slots[slotId];
    draggingFrom.current = slotId;
  };

  const onDropSlot = (targetSlotId) => {
    if (!draggingWord.current || showAns) return;
    setChecked(false);
    setWrongIds({});
    const newSlots = { ...slots };
    if (draggingFrom.current !== "bank") newSlots[draggingFrom.current] = null;
    newSlots[targetSlotId] = draggingWord.current;
    setSlots(newSlots);
    draggingWord.current = null;
    draggingFrom.current = null;
  };

  const onDropBank = () => {
    if (!draggingWord.current || draggingFrom.current === "bank" || showAns) return;
    setChecked(false);
    setWrongIds({});
    const newSlots = { ...slots };
    newSlots[draggingFrom.current] = null;
    setSlots(newSlots);
    draggingWord.current = null;
    draggingFrom.current = null;
  };

  // ── Check ──
  const handleCheck = () => {
    const allSlotIds = SENTENCES.flatMap(s =>
      s.parts.filter(p => p.type === "slot").map(p => p.slotId)
    );
    if (!allSlotIds.every(id => slots[id])) {
      ValidationAlert.error("Please fill all the blanks first! ✏️");
      return;
    }
    const newWrong = {};
    let correct    = 0;
    SENTENCES.forEach(s =>
      s.parts.filter(p => p.type === "slot").forEach(p => {
        if (slots[p.slotId] === p.answer) correct++;
        else newWrong[p.slotId] = true;
      })
    );
    setWrongIds(newWrong);
    setChecked(true);
    setShowAns(false);
    const total = allSlotIds.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  // ── Show Answer ──
  const handleShowAnswer = () => {
    const newSlots = {};
    SENTENCES.forEach(s =>
      s.parts.filter(p => p.type === "slot").forEach(p => { newSlots[p.slotId] = p.answer; })
    );
    setSlots(newSlots);
    setWrongIds({});
    setChecked(false);
    setShowAns(true);
  };

  // ── Reset ──
  const handleReset = () => {
    setSlots({});
    setChecked(false);
    setShowAns(false);
    setWrongIds({});
  };

  // ── ستايل الفراغ ──
  const slotStyle = (slotId) => ({
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    minWidth:       66,
    height:         26,
    borderRadius:   6,
    border:         slots[slotId] ? "2px solid #93c5fd" : "2px dashed #93c5fd",
    background:     slots[slotId] ? "#dbeafe" : "#eff6ff",
    fontSize:       12,
    fontWeight:     600,
    color:          "#1e40af",
    cursor:         showAns ? "default" : "pointer",
    position:       "relative",
    padding:        "0 6px",
    userSelect:     "none",
  });

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: 20 }}>

        {/* ── العنوان ── */}
<h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>          Write the names in ABC order. Answer the questions.

        </h1>

        {/* ── صورة الميداليات ── */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            src={imgMedals}
            alt="medals 1st 2nd 3rd"
            style={{ height: 72, objectFit: "contain" }}
          />
        </div>

        {/* ── أدوات الرسم ── */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          10,
            flexWrap:     "wrap",
            padding:      "8px 12px",
            background:   "#f8fafc",
            borderRadius: 12,
            border:       "1px solid #e2e8f0",
          }}
        >
          {/* لوحة الألوان */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {BRUSH_COLORS.map(c => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setSelectedColor(c.hex)}
                style={{
                  width:        26,
                  height:       26,
                  borderRadius: "50%",
                  background:   c.hex,
                  border:       selectedColor === c.hex
                    ? "3px solid #1e293b"
                    : "2px solid #fff",
                  outline:      selectedColor === c.hex ? "2px solid " + c.hex : "none",
                  cursor:       "pointer",
                  boxSizing:    "border-box",
                  transition:   "transform 0.1s",
                  transform:    selectedColor === c.hex ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* حجم الفرشاة */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>Brush</span>
            <input
              type="range"
              min={4}
              max={28}
              value={brushSize}
              onChange={e => setBrushSize(+e.target.value)}
              style={{ width: 72 }}
            />
            <div
              style={{
                width:        brushSize,
                height:       brushSize,
                borderRadius: "50%",
                background:   selectedColor,
                minWidth:     4,
                minHeight:    4,
                border:       "1px solid #e2e8f0",
              }}
            />
          </div>
        </div>

        {/* ── السيارات للتلوين ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 16,
          }}
        >
          <PaintCanvas imgSrc={imgCar1} label="Car 1" brushColor={selectedColor} brushSize={brushSize} />
          <PaintCanvas imgSrc={imgCar2} label="Car 2" brushColor={selectedColor} brushSize={brushSize} />
          <PaintCanvas imgSrc={imgCar3} label="Car 3" brushColor={selectedColor} brushSize={brushSize} />
        </div>

        <hr style={{ borderColor: "#e2e8f0" }} />

        {/* ── بنك الكلمات ── */}
        <div
          style={{
            display:       "flex",
            flexWrap:      "wrap",
            gap:           8,
            justifyContent:"center",
            padding:       "10px 14px",
            background:    "#f8fafc",
            borderRadius:  14,
            border:        "1.5px dashed #cbd5e1",
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={onDropBank}
        >
          {WORD_BANK_WORDS.map(word => {
            const isUsed = usedWords.includes(word);
            return (
              <span
                key={word}
                draggable={!isUsed && !showAns}
                onDragStart={() => onDragStartBank(word)}
                style={{
                  padding:        "4px 14px",
                  borderRadius:   20,
                  fontSize:       13,
                  fontWeight:     600,
                  background:     isUsed ? "#f1f5f9" : "#3b82f6",
                  color:          isUsed ? "#cbd5e1" : "#fff",
                  border:         isUsed ? "1.5px solid #e2e8f0" : "1.5px solid #2563eb",
                  textDecoration: isUsed ? "line-through" : "none",
                  cursor:         isUsed || showAns ? "default" : "grab",
                  userSelect:     "none",
                  transition:     "all 0.15s",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* ── الجمل ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SENTENCES.map(sentence => (
            <div
              key={sentence.id}
              style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}
            >
              <span style={{ fontWeight: 700, color: "#f97316", fontSize: 14, marginRight: 2 }}>
                {sentence.id}
              </span>

              {sentence.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <span key={i} style={{ fontSize: 14, color: "#1f2937", fontWeight: 500 }}>
                      {part.value}
                    </span>
                  );
                }

                const word    = slots[part.slotId];
                const isWrong = checked && wrongIds[part.slotId];

                return (
                  <span
                    key={part.slotId}
                    style={slotStyle(part.slotId)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => onDropSlot(part.slotId)}
                    draggable={!!word && !showAns}
                    onDragStart={() => word && onDragStartSlot(part.slotId)}
                  >
                    {word || (
                      <span style={{ color: "#93c5fd", fontSize: 10 }}>drop</span>
                    )}

                    {/* بادج الخطأ */}
                    {isWrong && (
                      <div style={{
                        position:       "absolute",
                        top:            -7,
                        right:          -7,
                        width:          16,
                        height:         16,
                        background:     "#ef4444",
                        color:          "#fff",
                        borderRadius:   "50%",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        fontSize:       9,
                        fontWeight:     700,
                        border:         "1.5px solid #fff",
                        pointerEvents:  "none",
                      }}>
                        ✕
                      </div>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
            showAnswer={handleShowAnswer}
          />
        </div>

      </div>
    </div>
  );
}