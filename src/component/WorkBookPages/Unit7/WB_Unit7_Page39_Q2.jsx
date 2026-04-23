import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// صور الشخصيات — غيري المسارات
import char1L from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/2.svg";
import char1R from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/3.svg";
import char2L from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/4.svg";
import char2R from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/5.svg";
import char3L from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/6.svg";
import char3R from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/7.svg";
import char4L from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/8.svg";
import char4R from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/9.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR   = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "d1", value: "him" },
  { id: "d2", value: "her" },
  { id: "d3", value: "it"  },
  { id: "d4", value: "you" },
  { id: "d5", value: "me"  },
];

const ITEMS = [
  {
    id:      1,
    charL:   char1L,
    charR:   char1R,
    bubble1: "Can you see Tom?",
    before:  "No, I can't see",
    after:   ".",
    correct: "him",
  },
  {
    id:      2,
    charL:   char2L,
    charR:   char2R,
    bubble1: "I like Sarah.",
    before:  "Yes. I like",
    after:   ", too.",
    correct: "her",
  },
  {
    id:      3,
    charL:   char3L,
    charR:   char3R,
    bubble1: "Do you like football?",
    before:  "No, I don't like",
    after:   ".",
    correct: "it",
  },
  {
    id:      4,
    charL:   char4L,
    charR:   char4R,
    bubble1: "Can you see me?",
    before:  "No, I can hear",
    after:   ".",
    correct: "you",
  },
];

export default function WB_CompleteTheSentences_PageB() {
  const [answers,     setAnswers]     = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem,   setTouchItem]   = useState(null);
  const [touchPos,    setTouchPos]    = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const dropRefs = useRef({});

  const usedIds = Object.values(answers).filter(Boolean).map((e) => e.dragId);

  const applyDrop = (boxKey, item) => {
    const upd = { ...answers };
    Object.keys(upd).forEach((k) => { if (upd[k]?.dragId === item.id) delete upd[k]; });
    upd[boxKey] = { dragId: item.id, value: item.value };
    setAnswers(upd);
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedIds.includes(item.id)) return;
    setDraggedItem(item);
  };
  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

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
    setAnswers((prev) => { const u = { ...prev }; delete u[boxKey]; return u; });
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (answers[`a-${i.id}`]?.value === i.correct) score++; });
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
      filled[`a-${i.id}`] = { dragId: d?.id, value: i.correct };
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

  // ── مكوّن الـ bubble
  const Bubble = ({ text, side = "right" }) => (
    <div
      style={{
        position:     "relative",
        background:   "#fff",
        border:       `2px solid ${BORDER_COLOR}`,
        borderRadius: "clamp(10px,1.2vw,16px)",
        padding:      "clamp(6px,0.8vw,10px) clamp(10px,1.3vw,16px)",
        fontSize:     "clamp(13px,1.4vw,17px)",
        fontWeight:   500,
        color:        "#222",
        whiteSpace:   "nowrap",
        boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
      }}
    >
      {text}
      {/* ذيل الـ bubble */}
      <div style={{
        position:    "absolute",
        top:         "50%",
        transform:   "translateY(-50%)",
        [side === "right" ? "right" : "left"]: "-10px",
        width:       0,
        height:      0,
        borderTop:   "8px solid transparent",
        borderBottom:"8px solid transparent",
        [side === "right" ? "borderLeft" : "borderRight"]: `10px solid ${BORDER_COLOR}`,
      }} />
    </div>
  );

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
          Complete the sentences and write{" "}
          <strong>him</strong>, <strong>her</strong>, <strong>you</strong>,{" "}
          <strong>me</strong>, and <strong>it</strong>.
        </h1>

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
            gap:            "clamp(8px,1vw,14px)",
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
                  padding:         "clamp(7px,0.9vw,11px) clamp(18px,2.2vw,30px)",
                  borderRadius:    "14px",
                  border:          `"#222"`,
                  backgroundColor: isUsed ? "#eeeeee" : "#ffca94",
                  color:           isUsed ? "#aaa" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.55 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(15px,1.7vw,22px)",
                  fontWeight:      700,
                  boxShadow:       isUsed ? "none" : "0 2px 6px rgba(0,0,0,0.07)",
                  transition:      "0.2s ease",
                  touchAction:     "none",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* ── الأسطر الأربعة ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,22px)", width: "100%" }}>
          {ITEMS.map((item) => {
            const boxKey = `a-${item.id}`;
            const value  = answers[boxKey]?.value || "";
            const wrong  = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display:     "grid",
                  gridTemplateColumns: "auto auto 1fr auto",
                  alignItems:  "center",
                  gap:         "clamp(8px,1.2vw,16px)",
                  width:       "100%",
                }}
              >
                {/* رقم + صورة يسار */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111" }}>
                    {item.id}
                  </span>
                  <img
                    src={item.charL}
                    alt={`charL-${item.id}`}
                    style={{ height: "clamp(44px,6vw,72px)", width: "auto", objectFit: "contain" }}
                  />
                </div>

                {/* Bubble يسار */}
                <Bubble text={item.bubble1} side="right" />

                {/* Bubble يمين مع drop zone */}
                <div
                  style={{
                    background:   "#fff",
                    border:       `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    padding:      "clamp(6px,0.8vw,10px) clamp(10px,1.3vw,16px)",
                    fontSize:     "clamp(13px,1.4vw,17px)",
                    fontWeight:   500,
                    color:        "#222",
                    display:      "flex",
                    alignItems:   "center",
                    flexWrap:     "wrap",
                    gap:          "5px",
                    boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
                    position:     "relative",
                  }}
                >
                  <span>{item.before}</span>

                  {/* Drop zone */}
                  <div
                    ref={(el) => (dropRefs.current[boxKey] = el)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(boxKey)}
                    onClick={() => handleRemove(boxKey)}
                    style={{
                      position:       "relative",
                      minWidth:       "clamp(50px,6vw,80px)",
                      minHeight:      "clamp(24px,2.8vw,34px)",
                      borderBottom:   `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                      display:        "flex",
                      alignItems:     "flex-end",
                      justifyContent: "center",
                      paddingBottom:  "2px",
                      cursor:         value && !showAns ? "pointer" : "default",
                    }}
                  >
                    {value && (
                      <span
                        style={{
                          fontSize:   "clamp(13px,1.4vw,18px)",
                          fontWeight: 700,
                          color:       ANSWER_COLOR,
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {value}
                      </span>
                    )}

                    {wrong && (
                      <div style={{
                        position:        "absolute",
                        top:             "-8px",
                        right:           "-8px",
                        width:           "18px",
                        height:          "18px",
                        borderRadius:    "50%",
                                      border:"1px solid #fff",

                        backgroundColor: WRONG_COLOR,
                        color:           "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "10px",
                        fontWeight:      700,
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                      }}>
                        ✕
                      </div>
                    )}
                  </div>

                  <span>{item.after}</span>
                </div>

                {/* صورة يمين */}
                <img
                  src={item.charR}
                  alt={`charR-${item.id}`}
                  style={{ height: "clamp(44px,6vw,72px)", width: "auto", objectFit: "contain", flexShrink: 0 }}
                />
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
        <div style={{
          position:      "fixed",
          left:          touchPos.x - 40,
          top:           touchPos.y - 20,
          background:    "#ffca94",
          padding:       "8px 16px",
          borderRadius:  "10px",
          border:        `1.5px solid ${BORDER_COLOR}`,
          boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents: "none",
          zIndex:        9999,
          fontSize:      "18px",
          fontWeight:    700,
          color:         "#222",
        }}>
          {touchItem.value}
        </div>
      )}
    </div>
  );
}