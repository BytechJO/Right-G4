import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import raceImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 36/H.1.svg";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR   = "#2f2f2f";

// الحروف A-L كـ drag items
const DRAG_ITEMS = [
  { id: "dA", value: "A" },
  { id: "dB", value: "B" },
  { id: "dC", value: "C" },
  { id: "dD", value: "D" },
  { id: "dE", value: "E" },
  { id: "dF", value: "F" },
  { id: "dG", value: "G" },
  { id: "dH", value: "H" },
  { id: "dI", value: "I" },
  { id: "dJ", value: "J" },
  { id: "dK", value: "K" },
  { id: "dL", value: "L" },
];

const ITEMS = [
  { id: 1, question: "Who is first?",    correct: "L" },
  { id: 2, question: "Who is third?",    correct: "J" },
  { id: 3, question: "Who is ninth?",    correct: "D" },
  { id: 4, question: "Who is fifth?",    correct: "H" },
  { id: 5, question: "Who is fourth?",   correct: "I" },
  { id: 6, question: "Who is eleventh?", correct: "B" },
  { id: 7, question: "Who is seventh?",  correct: "F" },
  { id: 8, question: "Who is tenth?",    correct: "C" },
];

export default function WB_ReadAndWrite_PageH() {
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
          <span className="WB-ex-A">H</span> Read and write the answers.
        </h1>

        {/* ── صورة السباق ── */}
        <div
          style={{
            width:        "100%",
            borderRadius: "clamp(12px,1.4vw,18px)",
            overflow:     "hidden",
            background:   "#f9f9f9",
            padding:      "clamp(8px,1vw,14px)",
            boxSizing:    "border-box",
          }}
        >
          <img
            src={raceImg}
            alt="runners"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>

        {/* ── Word Bank: الحروف A-L ── */}
        <div
          style={{
            width:          "100%",
            border:         `2px solid ${BORDER_COLOR}`,
            borderRadius:   "clamp(12px,1.4vw,18px)",
            padding:        "clamp(10px,1.2vw,16px)",
            boxSizing:      "border-box",
            display:        "flex",
            flexWrap:       "wrap",
            gap:            "clamp(6px,0.8vw,10px)",
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
                  width:           "clamp(36px,5vw,56px)",
                  height:          "clamp(36px,5vw,56px)",
                  borderRadius:    "10px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : "#ffca94",
                  color:           isUsed ? "#aaa" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.55 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(16px,2vw,26px)",
                  fontWeight:      700,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
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

        {/* ── الأسئلة: شبكة 2 عمود ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(14px,2vw,24px) clamp(24px,4vw,48px)",
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
                  gap:        "clamp(8px,1vw,14px)",
                  minWidth:   0,
                }}
              >
                {/* رقم السؤال */}
                <span
                  style={{
                    fontSize:      "clamp(18px,2vw,26px)",
                    fontWeight:    700,
                    color:         "#111",
                    flexShrink:    0,
                    paddingBottom: "6px",
                  }}
                >
                  {item.id}
                </span>

                {/* نص السؤال */}
                <span
                  style={{
                    fontSize:      "clamp(14px,1.6vw,20px)",
                    fontWeight:    500,
                    color:         "#111",
                    flexShrink:    0,
                    paddingBottom: "6px",
                    whiteSpace:    "nowrap",
                  }}
                >
                  {item.question}
                </span>

                {/* Drop zone */}
                <div
                  ref={(el) => (dropRefs.current[boxKey] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(boxKey)}
                  onClick={() => handleRemove(boxKey)}
                  style={{
                    position:       "relative",
                    minWidth:       "clamp(40px,5vw,64px)",
                    height:         "clamp(32px,4vw,46px)",
                    borderBottom:   `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                    display:        "flex",
                    alignItems:     "flex-end",
                    justifyContent: "center",
                    paddingBottom:  "4px",
                    cursor:         value && !showAns ? "pointer" : "default",
                    flexShrink:     0,
                  }}
                >
                  {value && (
                    <span
                      style={{
                        fontSize:   "clamp(16px,2vw,26px)",
                        fontWeight: 700,
                        color:      wrong ? WRONG_COLOR : ANSWER_COLOR,
                        lineHeight: 1,
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
                        width:           "clamp(16px,1.8vw,20px)",
                        height:          "clamp(16px,1.8vw,20px)",
                        borderRadius:    "50%",
                        backgroundColor: WRONG_COLOR,
                        color:           "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "clamp(9px,0.9vw,11px)",
                        fontWeight:      700,
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}
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

      {/* Touch ghost */}
      {touchItem && (
        <div
          style={{
            position:      "fixed",
            left:          touchPos.x - 28,
            top:           touchPos.y - 28,
            background:    "#ffca94",
            width:         "56px",
            height:        "56px",
            borderRadius:  "10px",
            border:        `1.5px solid ${BORDER_COLOR}`,
            boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex:        9999,
            fontSize:      "26px",
            fontWeight:    700,
            color:         "#222",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}