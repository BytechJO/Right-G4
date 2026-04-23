import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/8.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/9.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/10.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/11.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/12.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 44/SVG/13.svg";

const BORDER_COLOR = "#e0e0e0";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#d62828";

// الصناديق العلوية — كل واحد بكلمة ناقصة حرف
const BOXES = [
  { id: 1, word: ["n _", "e", "_ t"],  missingLetter: "e", correctImgId: 1 },
  { id: 2, word: ["b _", "a", "_ g"],  missingLetter: "a", correctImgId: 2 },
  { id: 3, word: ["f _", "i", "_ g"],  missingLetter: "i", correctImgId: 3 },
  { id: 4, word: ["t _", "e", "_ n"],  missingLetter: "e", correctImgId: 4 },
  { id: 5, word: ["l _", "e", "_ g"],  missingLetter: "e", correctImgId: 5 },
  { id: 6, word: ["b _", "e", "_ d"],  missingLetter: "e", correctImgId: 6 },
  { id: 7, word: ["h _", "a", "_ t"],  missingLetter: "a", correctImgId: 7 },
  { id: 8, word: ["g _", "u", "_ m"],  missingLetter: "u", correctImgId: 8 },
];

// الصور في الأسفل — مرتبة بشكل مختلف
const DRAG_IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
  { id: 8, img: img8 },
];

export default function WB_MissingLetter_PageC() {
  const [boxAnswers,   setBoxAnswers]   = useState({});
  const [draggedItem,  setDraggedItem]  = useState(null);
  const [touchItem,    setTouchItem]    = useState(null);
  const [touchPos,     setTouchPos]     = useState({ x: 0, y: 0 });
  const [checked,      setChecked]      = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const dropRefs   = useRef({});
  const usedImgIds = useMemo(() => Object.values(boxAnswers).filter(Boolean), [boxAnswers]);

  const applyDrop = (boxId, imgId) => {
    const updated = { ...boxAnswers };
    // شيل من أي صندوق تاني
    Object.keys(updated).forEach((k) => { if (updated[k] === imgId) delete updated[k]; });
    updated[boxId] = imgId;
    setBoxAnswers(updated);
    setDraggedItem(null);
    setChecked(false);
  };

  const handleDragStart = (imgId) => {
    if (showAns || usedImgIds.includes(imgId)) return;
    setDraggedItem(imgId);
  };

  const handleDrop = (boxId) => {
    if (showAns || draggedItem === null) return;
    applyDrop(boxId, draggedItem);
  };

  const handleTouchStart = (e, imgId) => {
    if (showAns || usedImgIds.includes(imgId)) return;
    const t = e.touches[0];
    setTouchItem(imgId);
    setDraggedItem(imgId);
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
    setDraggedItem(null);
  };

  const handleRemove = (boxId) => {
    if (showAns) return;
    setBoxAnswers((prev) => {
      const u = { ...prev };
      delete u[boxId];
      return u;
    });
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = BOXES.every((b) => boxAnswers[b.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please fill all boxes first.");
      return;
    }
    let score = 0;
    BOXES.forEach((b) => { if (boxAnswers[b.id] === b.correctImgId) score++; });
    setChecked(true);
    const total = BOXES.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    BOXES.forEach((b) => { correct[b.id] = b.correctImgId; });
    setBoxAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setDraggedItem(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setBoxAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (boxId) => {
    if (!checked || showAns) return false;
    const box = BOXES.find((b) => b.id === boxId);
    return boxAnswers[boxId] !== box.correctImgId;
  };

  const renderWord = (box) => {
    // كلمة زي: n _ e _ t
    // [before, missingLetter, after]
    const [before, letter, after] = box.word;
    return (
      <div
        style={{
          display:        "flex",
          alignItems:     "baseline",
          justifyContent: "center",
          gap:            "2px",
          fontSize:       "clamp(14px,2vw,24px)",
          fontWeight:     600,
          color:          "#111",
          lineHeight:     1,
          flexWrap:       "nowrap",
          whiteSpace:     "nowrap",
        }}
      >
        <span>{before}</span>
        <span style={{ color: RED_COLOR, fontWeight: 700 }}>{letter}</span>
        <span>{after}</span>
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
            gap:        "10px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">C</span>
          Write the missing letter for the pictures below. Then draw the pictures in the correct boxes.
        </h1>

        {/* 2 rows × 4 boxes */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(12px,1.8vw,22px)",
            width:         "100%",
          }}
        >
          {[BOXES.slice(0, 4), BOXES.slice(4, 8)].map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap:                 "clamp(10px,1.5vw,18px)",
                width:               "100%",
              }}
            >
              {row.map((box) => {
                const wrong  = isWrong(box.id);
                const imgId  = boxAnswers[box.id];
                const imgSrc = imgId ? DRAG_IMAGES.find((d) => d.id === imgId)?.img : null;

                return (
                  <div
                    key={box.id}
                    style={{
                      display:       "flex",
                      flexDirection: "column",
                      alignItems:    "flex-start",
                      gap:           "clamp(4px,0.5vw,7px)",
                    }}
                  >
                    {/* number */}
                    <span
                      style={{
                        fontSize:   "clamp(14px,1.7vw,22px)",
                        fontWeight: 700,
                        color:      "#111",
                        lineHeight: 1,
                      }}
                    >
                      {box.id}
                    </span>

                    {/* drop box */}
                    <div
                      ref={(el) => (dropRefs.current[box.id] = el)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(box.id)}
                      onClick={() => handleRemove(box.id)}
                      style={{
                        position:       "relative",
                        width:          "100%",
                        aspectRatio:    "1 / 1",
                        border:         `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                        borderRadius:   "clamp(8px,1vw,14px)",
                        background:     "#fff",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        cursor:         imgId && !showAns ? "pointer" : "default",
                        boxSizing:      "border-box",
                        overflow:       "visible",
                        transition:     "border-color 0.2s",
                      }}
                    >
                      {/* image inside box */}
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={`box-${box.id}`}
                          style={{
                            width:         "85%",
                            height:        "85%",
                            objectFit:     "contain",
                            display:       "block",
                            userSelect:    "none",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* wrong badge */}
                      {wrong && (
                        <div
                          style={{
                            position:        "absolute",
                            top:             "-8px",
                            left:            "-8px",
                            width:           "clamp(16px,1.8vw,22px)",
                            height:          "clamp(16px,1.8vw,22px)",
                            borderRadius:    "50%",
                            backgroundColor: WRONG_COLOR,
                            border:          "1px solid #fff",
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

                    {/* word with missing letter */}
                    {renderWord(box)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom drag images row */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(8, minmax(0,1fr))",
            gap:                 "clamp(6px,1vw,12px)",
            width:               "100%",
            border:              `2px solid ${ACTIVE_COLOR}`,
            borderRadius:        "clamp(10px,1.2vw,16px)",
            padding:             "clamp(8px,1vw,14px)",
            boxSizing:           "border-box",
            background:          "#fff",
          }}
        >
          {DRAG_IMAGES.map((item) => {
            const isUsed   = usedImgIds.includes(item.id);
            const selected = draggedItem === item.id || touchItem === item.id;
            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item.id)}
                onTouchStart={(e) => handleTouchStart(e, item.id)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  position:     "relative",
                  aspectRatio:  "1 / 1",
                  border:       `2px solid ${selected ? ACTIVE_COLOR : BORDER_COLOR}`,
                  borderRadius: "clamp(8px,1vw,12px)",
                  background:   isUsed ? "#f3f4f6" : "#fafafa",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  cursor:       isUsed || showAns ? "not-allowed" : "grab",
                  opacity:      isUsed ? 0.45 : 1,
                  touchAction:  "none",
                  transition:   "0.2s ease",
                  transform:    selected ? "scale(1.06)" : "scale(1)",
                  boxSizing:    "border-box",
                  userSelect:   "none",
                }}
              >
                <img
                  src={item.img}
                  alt={`drag-${item.id}`}
                  style={{
                    width:         "80%",
                    height:        "80%",
                    objectFit:     "contain",
                    display:       "block",
                    pointerEvents: "none",
                    userSelect:    "none",
                  }}
                />
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
            left:           touchPos.x - 35,
            top:            touchPos.y - 35,
            width:          "70px",
            height:         "70px",
            borderRadius:   "10px",
            background:     "#fff",
            border:         `2px solid ${ACTIVE_COLOR}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            pointerEvents:  "none",
            zIndex:         9999,
            boxShadow:      "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={DRAG_IMAGES.find((d) => d.id === touchItem)?.img}
            alt="drag"
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}