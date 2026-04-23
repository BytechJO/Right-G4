import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ── استبدلي المسارات بمساراتك الفعلية
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.6.svg";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#d62828";
const LINE_COLOR   = "#2f2f2f";

// الـ word bank — كل الكلمات مع بعض
const DRAG_ITEMS = [
  { id: "d1", value: "first"               },
  { id: "d2", value: "second"              },
  { id: "d3", value: "fifth"               },
  { id: "d4", value: "is running"          },
  { id: "d5", value: "is eating an ice cream" },
  { id: "d6", value: "is singing"          },
];

// الأسئلة الستة
const ITEMS = [
  {
    id: 1,
    img: img3,
    sentence: { before: "The third boy", after: "." },
    correct: "is running",
    type: "verb",
  },
  {
    id: 2,
    img: img1,
    sentence: { before: "The", after: "boy is riding a bike." },
    correct: "first",
    type: "ordinal",
  },
  {
    id: 3,
    img: img6,
    sentence: { before: "The sixth boy", after: "." },
    correct: "is eating an ice cream",
    type: "verb",
  },
  {
    id: 4,
    img: img5,
    sentence: { before: "The", after: "boy is kicking the ball." },
    correct: "fifth",
    type: "ordinal",
  },
  {
    id: 5,
    img: img4,
    sentence: { before: "The fourth boy", after: "." },
    correct: "is singing",
    type: "verb",
  },
  {
    id: 6,
    img: img2,
    sentence: { before: "The", after: "boy is skateboarding." },
    correct: "second",
    type: "ordinal",
  },
];

export default function WB_LookReadWrite_PageD() {
  const [answers,     setAnswers]     = useState({});
  const [touchItem,   setTouchItem]   = useState(null);
  const [touchPos,    setTouchPos]    = useState({ x: 0, y: 0 });
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const dropRefs = useRef({});

  const usedIds = Object.values(answers)
    .filter(Boolean)
    .map((e) => e.dragId);

  const applyDrop = (boxKey, item) => {
    const upd = { ...answers };
    // إذا الكلمة مستخدمة بمكان ثاني، امسحها منه
    Object.keys(upd).forEach((k) => {
      if (upd[k]?.dragId === item.id) delete upd[k];
    });
    upd[boxKey] = { dragId: item.id, value: item.value };
    setAnswers(upd);
    setShowResults(false);
  };

  // ── Mouse drag
  const handleDragStart = (item) => {
    if (showAns || usedIds.includes(item.id)) return;
    setDraggedItem(item);
  };
  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

  // ── Touch drag
  const handleTouchStart = (e, item) => {
    if (showAns || usedIds.includes(item.id)) return;
    const t = e.touches[0];
    setTouchItem(item);
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchMove = (e) => {
    if (!touchItem) return;
    const t = e.touches[0];
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchEnd = () => {
    if (!touchItem) return;
    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (
        touchPos.x >= r.left && touchPos.x <= r.right &&
        touchPos.y >= r.top  && touchPos.y <= r.bottom
      ) applyDrop(key, touchItem);
    });
    setTouchItem(null);
  };

  const handleRemove = (boxKey) => {
    if (showAns) return;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[boxKey];
      return u;
    });
    setShowResults(false);
  };

  // ── Check
  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.correct) score++;
    });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correct);
      filled[`a-${i.id}`] = { dragId: d?.id ?? `auto-${i.id}`, value: i.correct };
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[`a-${item.id}`]?.value !== item.correct;

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
          <span className="WB-ex-A">D</span> Look, read, and write.
        </h1>

        {/* ── صور الأولاد الستة ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(6, minmax(0,1fr))",
            gap:                 "clamp(6px,1vw,12px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              {/* رقم الصورة */}
              <span
                style={{
                  fontSize:   "clamp(11px,1.2vw,16px)",
                  fontWeight: 700,
                  color:      "#555",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  width:        "100%",
                  aspectRatio:  "0.75 / 1",
                  borderRadius: "clamp(8px,1vw,14px)",
                  overflow:     "hidden",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.img}
                  alt={`boy-${item.id}`}
                  style={{ width: "90%", height: "90%", objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Word Bank ── */}
        <div
          style={{
            width:          "100%",
            border:         `2px solid ${BORDER_COLOR}`,
            borderRadius:   "clamp(12px,1.4vw,18px)",
            padding:        "clamp(10px,1.2vw,16px)",
            boxSizing:      "border-box",
            display:        "flex",
            flexWrap:       "wrap",
            gap:            "clamp(8px,1vw,12px)",
            justifyContent: "center",
            background:     "#fff",
          }}
        >
          {DRAG_ITEMS.map((item) => {
            const isUsed = usedIds.includes(item.id);
            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item)}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding:         "clamp(6px,0.8vw,10px) clamp(12px,1.4vw,18px)",
                  borderRadius:    "14px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : "#ffca94",
                  color:           isUsed ? "#999" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.6 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(13px,1.4vw,18px)",
                  fontWeight:      500,
                  boxShadow:       isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition:      "0.2s ease",
                  touchAction:     "none",
                  textAlign:       "center",
                  lineHeight:      1.3,
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* ── الأسئلة: شبكة 2 عمود ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(14px,2vw,24px) clamp(20px,3vw,40px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const boxKey = `a-${item.id}`;
            const value  = answers[boxKey]?.value || "";
            const wrong  = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display:    "flex",
                  alignItems: "flex-end",
                  gap:        "6px",
                  flexWrap:   "wrap",
                  minWidth:   0,
                }}
              >
                {/* رقم السؤال */}
                <span
                  style={{
                    fontSize:   "clamp(18px,2vw,26px)",
                    fontWeight: 700,
                    color:      "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    paddingBottom: "6px",
                  }}
                >
                  {item.id}
                </span>

                {/* النص قبل الـ drop zone */}
                <span
                  style={{
                    fontSize:   "clamp(14px,1.6vw,20px)",
                    fontWeight: 500,
                    color:      "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    paddingBottom: "6px",
                  }}
                >
                  {item.sentence.before}
                </span>

                {/* Drop zone */}
                <div
                  ref={(el) => (dropRefs.current[boxKey] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(boxKey)}
                  onClick={() => handleRemove(boxKey)}
                  style={{
                    position:      "relative",
                    minWidth:      "clamp(80px,10vw,140px)",
                    minHeight:     "clamp(28px,3.5vw,40px)",
                    borderBottom:  `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                    display:       "flex",
                    alignItems:    "flex-end",
                    justifyContent:"center",
                    paddingBottom: "4px",
                    cursor:        value && !showAns ? "pointer" : "default",
                    flexShrink:    0,
                  }}
                >
                  {value && (
                    <span
                      style={{
                        fontSize:   "clamp(14px,1.6vw,20px)",
                        fontWeight: 600,
                        color:      wrong ? WRONG_COLOR : ANSWER_COLOR,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {value}
                    </span>
                  )}

                  {wrong && (
                    <div
                      style={{
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
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                {/* النص بعد الـ drop zone */}
                <span
                  style={{
                    fontSize:      "clamp(14px,1.6vw,20px)",
                    fontWeight:    500,
                    color:         "#111",
                    lineHeight:    1,
                    flexShrink:    0,
                    paddingBottom: "6px",
                  }}
                >
                  {item.sentence.after}
                </span>
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

      {/* Touch ghost */}
      {touchItem && (
        <div
          style={{
            position:      "fixed",
            left:          touchPos.x - 80,
            top:           touchPos.y - 20,
            background:    "#fff",
            padding:       "8px 14px",
            borderRadius:  "10px",
            boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex:        9999,
            fontSize:      "clamp(13px,1.5vw,18px)",
            fontWeight:    600,
            color:         "#222",
            maxWidth:      "220px",
            textAlign:     "center",
            lineHeight:    1.3,
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}