import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.6.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const DRAG_BG      = "#f29a1f";
const TEXT_COLOR   = "#111";

const SENTENCES = [
  { id: 1, text: "A small cat and a big dog are running down the hill." },
  { id: 2, text: "They're running across the street."                    },
  { id: 3, text: "The cat can go through the fence. The dog can't."     },
  { id: 4, text: "The dog can't jump over the fence."                   },
  { id: 5, text: "The cat is climbing up a tree."                       },
  { id: 6, text: "The cat is happy. The dog is sad."                    },
];

const IMAGE_CARDS = [
  { id: 1, img: img1, correctNumber: 3 },
  { id: 2, img: img2, correctNumber: 5 },
  { id: 3, img: img3, correctNumber: 2 },
  { id: 4, img: img4, correctNumber: 6 },
  { id: 5, img: img5, correctNumber: 1 },
  { id: 6, img: img6, correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6];

export default function SB_ReadLookNumber_PageC() {
  const [imageAnswers,  setImageAnswers]  = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem,     setTouchItem]     = useState(null);
  const [touchPos,      setTouchPos]      = useState({ x: 0, y: 0 });
  const [checked,       setChecked]       = useState(false);
  const [showAns,       setShowAns]       = useState(false);

  const dropRefs    = useRef({});
  const boxRefs     = useRef({});
  const usedNumbers = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  const applyDrop = (cardId, num) => {
    const updated = { ...imageAnswers };
    Object.keys(updated).forEach((k) => { if (updated[k] === num) delete updated[k]; });
    updated[cardId] = num;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setChecked(false);
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (cardId) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(cardId, draggedNumber);
  };

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
    // تحقق من drop على الـ card كاملة أو على الـ box
    const allRefs = { ...dropRefs.current };
    Object.entries(allRefs).forEach(([key, ref]) => {
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

  const handleRemoveNumber = (cardId) => {
    if (showAns) return;
    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = IMAGE_CARDS.every((c) => imageAnswers[c.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    IMAGE_CARDS.forEach((c) => { if (imageAnswers[c.id] === c.correctNumber) score++; });
    setChecked(true);
    const total = IMAGE_CARDS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    IMAGE_CARDS.forEach((c) => { correct[c.id] = c.correctNumber; });
    setImageAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isCardWrong = (cardId) => {
    if (!checked || showAns) return false;
    const card = IMAGE_CARDS.find((c) => c.id === cardId);
    return imageAnswers[cardId] !== card.correctNumber;
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
          <span className="WB-ex-A">C</span>
          Read, look, and number the pictures. Point and say.
        </h1>

        {/* Sentences */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(6px,0.9vw,12px)",
            width:         "100%",
          }}
        >
          {SENTENCES.map((s) => (
            <div
              key={s.id}
              style={{
                display:    "flex",
                alignItems: "baseline",
                gap:        "clamp(8px,1vw,14px)",
              }}
            >
              <span
                style={{
                  fontSize:   "clamp(16px,1.9vw,26px)",
                  fontWeight: 700,
                  color:      TEXT_COLOR,
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth:   "clamp(16px,1.9vw,26px)",
                }}
              >
                {s.id}
              </span>
              <span
                style={{
                  fontSize:   "clamp(14px,1.7vw,22px)",
                  fontWeight: 500,
                  color:      TEXT_COLOR,
                  lineHeight: 1.35,
                  wordBreak:  "break-word",
                }}
              >
                {s.text}
              </span>
            </div>
          ))}
        </div>

        {/* Image cards 3×2 */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap:                 "clamp(10px,1.5vw,20px)",
            width:               "100%",
          }}
        >
          {IMAGE_CARDS.map((card) => {
            const wrong = isCardWrong(card.id);
            const num   = imageAnswers[card.id];

            return (
              <div
                key={card.id}
                ref={(el) => (dropRefs.current[card.id] = el)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(card.id)}
                style={{
                  position:     "relative",
                  width:        "100%",
                  aspectRatio:  "1.5 / 1",
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  overflow:     "visible",
                  border:       `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                  background:   "#f7f7f7",
                  boxSizing:    "border-box",
                  transition:   "border-color 0.2s",
                }}
              >
                {/* image — inner clip */}
                <div
                  style={{
                    position:     "absolute",
                    inset:        0,
                    borderRadius: "clamp(10px,1.2vw,16px)",
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

                {/* ── White box — دايماً موجود top right ── */}
                <div
                  ref={(el) => (boxRefs.current[card.id] = el)}
                  onClick={() => handleRemoveNumber(card.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(card.id)}
                  style={{
                    position:        "absolute",
                    top:             "clamp(4px,0.8vw,10px)",
                    right:           "clamp(4px,0.8vw,10px)",
                    width:           "clamp(28px,3.8vw,48px)",
                    height:          "clamp(28px,3.8vw,48px)",
                    borderRadius:    "clamp(6px,0.8vw,10px)",
                    border:          `2px solid ${wrong ? WRONG_COLOR : "#bbb"}`,
                    backgroundColor: "#fff",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    fontSize:        "clamp(14px,2.2vw,30px)",
                    fontWeight:      700,
                    color:           wrong ? WRONG_COLOR : "#111",
                    boxShadow:       "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex:          4,
                    cursor:          num && !showAns ? "pointer" : "default",
                    transition:      "border-color 0.2s, color 0.2s",
                    boxSizing:       "border-box",
                  }}
                >
                  {num || ""}
                </div>

                {/* wrong badge — خارج الـ overflow */}
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
                      boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
                      zIndex:          5,
                      pointerEvents:   "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drag numbers */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "clamp(10px,1.4vw,16px)",
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
                  width:        "clamp(40px,5vw,56px)",
                  height:       "clamp(40px,5vw,56px)",
                  borderRadius: "50%",
                  background:   disabled || showAns ? "#cfcfd4" : DRAG_BG,
                  color:        "#fff",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  fontSize:     "clamp(18px,2.4vw,30px)",
                  fontWeight:   700,
                  cursor:       disabled || showAns ? "not-allowed" : "grab",
                  userSelect:   "none",
                  opacity:      disabled ? 0.55 : 1,
                  touchAction:  "none",
                  transition:   "0.2s ease",
                  transform:    selected ? "scale(1.08)" : "scale(1)",
                  boxShadow:    selected
                    ? "0 0 0 3px rgba(242,154,31,0.35)"
                    : "0 3px 10px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
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
            handleStartAgain={handleReset}
          />
        </div>
      </div>

      {/* Touch ghost */}
      {touchItem !== null && (
        <div
          style={{
            position:       "fixed",
            left:           touchPos.x - 28,
            top:            touchPos.y - 28,
            width:          "clamp(40px,5vw,56px)",
            height:         "clamp(40px,5vw,56px)",
            borderRadius:   "50%",
            background:     DRAG_BG,
            color:          "#fff",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       "clamp(18px,2.4vw,30px)",
            fontWeight:     700,
            pointerEvents:  "none",
            zIndex:         9999,
            boxShadow:      "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}