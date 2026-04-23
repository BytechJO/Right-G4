import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import sceneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/7.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR   = "#2f2f2f";

const DRAG_ITEMS = [

  { id: "d3", value: "in the living room"       },
  { id: "d4", value: "at the computer"          },
  { id: "d5", value: "in the living room ironing clothes" },
];

const ITEMS = [
  {
    id:      1,
    fixed:   true,
    question: "Can you see Helen?",
    answer:  "Yes, I can see her in the living room.",
  },
  {
    id:      2,
    fixed:   false,
    question: "Can you see Helen's brother?",
    before:  "Yes, I can see",
    middle:  "him",
    middleFixed: true,
    after:   "",
    dropKey: "loc",
    correct: "at the computer",
    beforeDrop: "Yes, I can see him",
    afterDrop:  ".",
  },
  {
    id:      3,
    fixed:   false,
    question: "Can you see Helen's mom?",
    beforeDrop: "Yes, I can see her",
    afterDrop:  ".",
    correct: "in the living room ironing clothes",
  },
];

export default function WB_LookReadFind_PageD() {
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
    const editables = ITEMS.filter((i) => !i.fixed);
    const allAnswered = editables.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    editables.forEach((i) => { if (answers[`a-${i.id}`]?.value === i.correct) score++; });
    setShowResults(true);
    const total = editables.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.fixed).forEach((i) => {
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

  const renderDropZone = (item) => {
    const boxKey = `a-${item.id}`;
    const value  = answers[boxKey]?.value || "";
    const wrong  = isWrong(item);

    return (
      <div
        style={{
          display:    "flex",
          alignItems: "flex-end",
          flexWrap:   "wrap",
          gap:        "6px",
          width:      "100%",
        }}
      >
        <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111" }}>
          {item.beforeDrop}
        </span>

        <div
          ref={(el) => (dropRefs.current[boxKey] = el)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(boxKey)}
          onClick={() => handleRemove(boxKey)}
          style={{
            position:       "relative",
            minWidth:       "clamp(120px,18vw,260px)",
            minHeight:      "clamp(28px,3.2vw,38px)",
            borderBottom:   `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
            display:        "flex",
            alignItems:     "flex-end",
            paddingBottom:  "3px",
            cursor:         value && !showAns ? "pointer" : "default",
          }}
        >
          {value && (
            <span style={{
              fontSize:   "clamp(14px,1.6vw,20px)",
              fontWeight: 600,
              color:       ANSWER_COLOR,
              lineHeight: 1,
              wordBreak:  "break-word",
            }}>
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
              border:          "1px solid #fff",
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

        <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111" }}>
          {item.afterDrop}
        </span>
      </div>
    );
  };

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
          <span className="WB-ex-A">D</span> Look, read, and find. Write.
        </h1>

        {/* ── Layout: يسار أسئلة + يمين صورة ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr auto",
            gap:                 "clamp(16px,2.5vw,30px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {/* ── يسار: Word Bank + الأسئلة ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,24px)" }}>

            {/* Word Bank */}
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
                      color:           isUsed ? "#aaa" : "#222",
                      cursor:          isUsed || showAns ? "not-allowed" : "grab",
                      opacity:         isUsed ? 0.55 : 1,
                      userSelect:      "none",
                      fontSize:        "clamp(13px,1.4vw,18px)",
                      fontWeight:      500,
                      boxShadow:       isUsed ? "none" : "0 2px 6px rgba(0,0,0,0.07)",
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

            {/* الأسئلة */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,24px)" }}>
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "clamp(6px,0.8vw,10px)",
                  }}
                >
                  {/* رقم + سؤال */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111", flexShrink: 0 }}>
                      {item.id}
                    </span>
                    <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111" }}>
                      {item.question}
                    </span>
                  </div>

                  {/* الإجابة */}
                  {item.fixed ? (
                    <div style={{
                      fontSize:     "clamp(14px,1.6vw,20px)",
                      fontWeight:   500,
                      color:        "#111",
                      borderBottom: `2.5px solid ${LINE_COLOR}`,
                      paddingBottom:"4px",
                      width:        "100%",
                    }}>
                      {item.answer}
                    </div>
                  ) : (
                    renderDropZone(item)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── يمين: الصورة ── */}
          <div
            style={{
              width:        "clamp(220px,32vw,400px)",
              border:       `2px solid ${BORDER_COLOR}`,
              borderRadius: "clamp(12px,1.4vw,18px)",
              overflow:     "hidden",
              background:   "#f7f7f7",
              flexShrink:   0,
            }}
          >
            <img
              src={sceneImg}
              alt="scene"
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            />
          </div>
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
          left:          touchPos.x - 60,
          top:           touchPos.y - 20,
          background:    "#ffca94",
          padding:       "8px 14px",
          borderRadius:  "10px",
          border:        `1.5px solid ${BORDER_COLOR}`,
          boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents: "none",
          zIndex:        9999,
          fontSize:      "clamp(13px,1.5vw,18px)",
          fontWeight:    600,
          color:         "#222",
          maxWidth:      "220px",
          textAlign:     "center",
          lineHeight:    1.3,
        }}>
          {touchItem.value}
        </div>
      )}
    </div>
  );
}