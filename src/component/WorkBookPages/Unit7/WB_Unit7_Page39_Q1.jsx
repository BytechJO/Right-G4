import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/1.svg";

const BORDER_COLOR = "#f39b42";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";
const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";

const ITEMS = [
  {
    id:      1,
    example: true,
    question: "Can you see Hansel?",
    answer:   "Yes, I can see him by the tree.",
  },
  {
    id:      2,
    example: false,
    question: "Can you see the cat?",
    answer:   "Yes, I can see it in the kitchen.",
  },
  {
    id:      3,
    example: false,
    question: "Can you see Dad?",
    answer:   "Yes, I can see him near the bed in the bedroom.",
  },
  {
    id:      4,
    example: false,
    question: "Can you see Mom?",
    answer:   "Yes, I can see her in front of the washing machine in the basement.",
  },
];

const DRAG_ITEMS = ITEMS.filter((i) => !i.example).map((i) => ({
  id:    `ans-${i.id}`,
  value: i.answer,
}));

export default function SB_LookAndAnswer_PageA() {
  const [answers,     setAnswers]     = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem,   setTouchItem]   = useState(null);
  const [touchPos,    setTouchPos]    = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const dropRefs = useRef({});
  const usedIds  = Object.values(answers).filter(Boolean).map((e) => e.dragId);

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
      filled[`a-${i.id}`] = { dragId: d?.id ?? `ans-${i.id}`, value: i.answer };
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

  const renderDropZone = (item) => {
    const boxKey = `a-${item.id}`;
    const value  = answers[boxKey]?.value || "";
    const wrong  = isWrong(item);

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemove(boxKey)}
        style={{
          position:      "relative",
          minHeight:     "clamp(28px,4vw,48px)",
          borderBottom:  `2px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
          display:       "flex",
          alignItems:    "flex-end",
          paddingBottom: "3px",
          boxSizing:     "border-box",
          cursor:        value && !showAns ? "pointer" : "default",
          width:         "100%",
        }}
      >
        {value && (
          <span
            style={{
              fontSize:   "clamp(13px,1.6vw,20px)",
              fontWeight: 600,
              color:      RED_COLOR,
              lineHeight: 1.35,
              wordBreak:  "break-word",
            }}
          >
            {value}
          </span>
        )}

        {/* wrong badge — يسار فقط */}
        {wrong && (
          <div
            style={{
              position:        "absolute",
              top:             "-8px",
              left:            "-8px",
              width:           "clamp(16px,1.8vw,22px)",
              height:          "clamp(16px,1.8vw,22px)",
              borderRadius:    "50%",
              border:"1px solid #fff",
              backgroundColor: WRONG_COLOR,
              color:           "#fff",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              fontSize:        "clamp(9px,0.9vw,12px)",
              fontWeight:      700,
              boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
              zIndex:          3,
              pointerEvents:   "none",
            }}
          >
            ✕
          </div>
        )}
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
          gap:           "18px",
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
          }}
        >
          <span className="WB-ex-A">A</span> Look and answer the questions.
        </h1>

        {/* Word bank */}
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
                  padding:         "clamp(7px,0.9vw,12px) clamp(12px,1.4vw,18px)",
                  borderRadius:    "14px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color:           isUsed ? "#999" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.6 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(12px,1.4vw,18px)",
                  fontWeight:      600,
                  boxShadow:       isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition:      "0.2s ease",
                  touchAction:     "none",
                  textAlign:       "center",
                  lineHeight:      1.3,
                  maxWidth:        "clamp(200px,40vw,400px)",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* Main layout: house LEFT | Q&A RIGHT */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
            gap:                 "clamp(16px,2.5vw,32px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {/* House image */}
          <div
            style={{
              width:        "100%",
              borderRadius: "clamp(12px,1.4vw,18px)",
              overflow:     "hidden",
              background:   "#f7f7f7",
              flexShrink:   0,
            }}
          >
            <img
              src={houseImg}
              alt="house"
              style={{
                width:      "100%",
                height:     "auto",
                display:    "block",
                userSelect: "none",
              }}
            />
          </div>

          {/* Q&A list */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(16px,2.5vw,30px)",
              minWidth:      0,
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "clamp(6px,0.8vw,10px)",
                  minWidth:      0,
                }}
              >
                {/* number + question */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "baseline",
                    gap:        "clamp(6px,0.8vw,12px)",
                  }}
                >
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,26px)",
                      fontWeight: 700,
                      color:      "#111",
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth:   "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      fontSize:   "clamp(14px,1.7vw,22px)",
                      fontWeight: 500,
                      color:      "#111",
                      lineHeight: 1.35,
                      wordBreak:  "break-word",
                    }}
                  >
                    {item.question}
                  </span>
                </div>

                {/* answer line */}
                {item.example ? (
                  /* example — static red text على سطرين إذا احتاج */
                  <div
                    style={{
                      fontSize:      "clamp(13px,1.6vw,20px)",
                      fontWeight:    600,
                      color:         RED_COLOR,
                      borderBottom:  `2px solid ${LINE_COLOR}`,
                      paddingBottom: "3px",
                      lineHeight:    1.4,
                      wordBreak:     "break-word",
                    }}
                  >
                    {item.answer}
                  </div>
                ) : (
                  renderDropZone(item)
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
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
            position:       "fixed",
            left:           touchPos.x - 100,
            top:            touchPos.y - 20,
            background:     "#fff",
            padding:        "8px 14px",
            borderRadius:   "10px",
            boxShadow:      "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents:  "none",
            zIndex:         9999,
            fontSize:       "clamp(12px,1.4vw,17px)",
            fontWeight:     600,
            color:          "#222",
            maxWidth:       "280px",
            textAlign:      "center",
            lineHeight:     1.3,
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}