import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/J3.svg";

const BORDER_COLOR = "#f39b42";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000";
const LINE_COLOR   = "#333";

const ITEMS = [
  {
    id: 1,
    img: img1,
    example: true,
    answer: "The bowl of fruit is on the table in the living room.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    answer: "The cat is in the basket in the living room.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    answer: "The fridge is in the kitchen.",
  },
];

const DRAG_ITEMS = ITEMS.filter((i) => !i.example).map((i) => ({
  id:    i.id,
  value: i.answer,
}));

export default function SB_LookAndWrite_PageJ() {
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
    e.preventDefault(); // بس نمنع السكرول لما يكون شايل عنصر فعلاً
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
    const editables = ITEMS.filter((i) => !i.example);
    const allAnswered = editables.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    editables.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.answer) score++;
    });
    setShowResults(true);
    const total = editables.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.example).forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.answer);
      filled[`a-${i.id}`] = { dragId: d?.id ?? i.id, value: i.answer };
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
    showResults && !showAns && answers[`a-${item.id}`]?.value !== item.answer;

  return (
    <div
      className="main-container-component"
      // السكرول مسموح دايماً على الـ container
      // بس لما يكون touchItem موجود نمنع السكرول عبر handleTouchMove
    >
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(14px,2vw,22px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
            fontSize:   "clamp(16px,1.8vw,24px)",
          }}
        >
          <span className="WB-ex-A">J</span> Look and write.
        </h1>

        {/* Word bank */}
        <div
          style={{
            width:          "100%",
            border:         `2px solid ${BORDER_COLOR}`,
            borderRadius:   "clamp(10px,1.2vw,16px)",
            padding:        "clamp(8px,1vw,14px)",
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
                  padding:         "clamp(6px,0.8vw,10px) clamp(10px,1.2vw,16px)",
                  borderRadius:    "12px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color:           isUsed ? "#999" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.6 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(12px,1.3vw,17px)",
                  fontWeight:      500,
                  boxShadow:       isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition:      "0.2s ease",
                  // ← هنا الفرق: touchAction فقط لما يكون شايل عنصر
                  touchAction:     touchItem?.id === item.id ? "none" : "auto",
                  textAlign:       "center",
                  lineHeight:      1.3,
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* Items list */}
        {ITEMS.map((item) => {
          const boxKey = `a-${item.id}`;
          const value  = answers[boxKey]?.value || "";
          const wrong  = isWrong(item);

          return (
            <div
              key={item.id}
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "clamp(8px,1vw,14px)",
                width:         "100%",
              }}
            >
              {/* Number + Image */}
              <div
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        "clamp(8px,1vw,14px)",
                }}
              >
                <span
                  style={{
                    fontSize:   "clamp(14px,1.5vw,22px)",
                    fontWeight: 700,
                    color:      "#111",
                    lineHeight: 1,
                    paddingTop: "4px",
                    flexShrink: 0,
                    minWidth:   "clamp(14px,1.5vw,22px)",
                  }}
                >
                  {item.id}
                </span>

                <div
                  style={{
                    width:        "clamp(140px,22vw,240px)",
                    aspectRatio:  "1.55 / 1",
                    borderRadius: "clamp(8px,1vw,12px)",
                    border:       `2px solid ${BORDER_COLOR}`,
                    background:   "#f7f7f7",
                    flexShrink:   0,
                  }}
                >
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:     "100%",
                      height:    "100%",
                      objectFit: "cover",
                      display:   "block",
                    }}
                  />
                </div>
              </div>

              {/* Answer line */}
              {item.example ? (
                <div
                  style={{
                    fontSize:      "clamp(12px,1.4vw,18px)",
                    fontWeight:    500,
                    color:         ANSWER_COLOR,
                    borderBottom:  `2px solid ${LINE_COLOR}`,
                    paddingBottom: "4px",
                    width:         "100%",
                    lineHeight:    1.3,
                  }}
                >
                  {item.answer}
                </div>
              ) : (
                <div
                  ref={(el) => (dropRefs.current[boxKey] = el)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(boxKey)}
                  onClick={() => handleRemove(boxKey)}
                  style={{
                    width:         "100%",
                    minHeight:     "clamp(28px,3.5vw,40px)",
                    borderBottom:  `2px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                    display:       "flex",
                    alignItems:    "flex-end",
                    paddingBottom: "4px",
                    boxSizing:     "border-box",
                    position:      "relative",
                    cursor:        value && !showAns ? "pointer" : "default",
                  }}
                >
                  {value && (
                    <span
                      style={{
                        fontSize:   "clamp(12px,1.4vw,18px)",
                        fontWeight: 500,
                        color:      ANSWER_COLOR,
                        lineHeight: 1.3,
                        wordBreak:  "break-word",
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
              )}
            </div>
          );
        })}

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(4px,0.8vw,10px)",
          }}
        >
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
            left:          touchPos.x - 100,
            top:           touchPos.y - 20,
            background:    "#fff",
            padding:       "6px 12px",
            borderRadius:  "10px",
            boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex:        9999,
            fontSize:      "clamp(12px,1.3vw,17px)",
            fontWeight:    600,
            color:         "#222",
            maxWidth:      "260px",
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