import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/2.svg";
import sheep  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/3.svg";
import cat    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/4.svg";
import dogs   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/5.svg";
import fish   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/6.svg";
import horse  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/7.svg";
import goats  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/8.svg";
import tv     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/9.svg";

const BORDER_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";
const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";

const DRAG_ITEMS = [
  { id: "d1", value: "a horse"              },
  { id: "d2", value: "a TV on the farm"     },
  { id: "d3", value: "dogs, sheep, and goats" },
  { id: "d4", value: "a cat on the farm"    },
];

const QUESTIONS = [
  { id: 1, before: "There was",      after: "on the farm.", correct: "a horse"               },
  { id: 2, before: "There wasn't",   after: ".",            correct: "a TV on the farm"      },
  { id: 3, before: "They had",       after: ".",            correct: "dogs, sheep, and goats" },
  { id: 4, before: "They didn't have", after: ".",          correct: "a cat on the farm"     },
];

const SCENE_IMGS = [
  { src: sheep, alt: "sheep",  w: "clamp(60px,9vw,110px)"  },
  { src: cat,   alt: "cat",    w: "clamp(40px,6vw,76px)"   },
  { src: dogs,  alt: "dogs",   w: "clamp(90px,14vw,180px)" },
  { src: fish,  alt: "fish",   w: "clamp(28px,4vw,52px)"   },
  { src: horse, alt: "horse",  w: "clamp(65px,10vw,130px)" },
  { src: goats, alt: "goats",  w: "clamp(60px,9vw,110px)"  },
  { src: tv,    alt: "tv",     w: "clamp(58px,9vw,110px)"  },
];

export default function WB_Page47_F() {
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
    const allFilled = QUESTIONS.every((q) => answers[`a-${q.id}`]?.value);
    if (!allFilled) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    QUESTIONS.forEach((q) => { if (answers[`a-${q.id}`]?.value === q.correct) score++; });
    setShowResults(true);
    const total = QUESTIONS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    QUESTIONS.forEach((q) => {
      const d = DRAG_ITEMS.find((d) => d.value === q.correct);
      filled[`a-${q.id}`] = { dragId: d?.id ?? `ans-${q.id}`, value: q.correct };
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

  const isWrong = (q) =>
    showResults && !showAns && answers[`a-${q.id}`]?.value !== q.correct;

  const renderDropZone = (q) => {
    const boxKey = `a-${q.id}`;
    const value  = answers[boxKey]?.value || "";
    const wrong  = isWrong(q);

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemove(boxKey)}
        style={{
          position:      "relative",
          minWidth:      "clamp(100px,18vw,280px)",
          minHeight:     "clamp(26px,3vw,36px)",
          borderBottom:  `2px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
          display:       "inline-flex",
          alignItems:    "flex-end",
          paddingBottom: "2px",
          cursor:        value && !showAns ? "pointer" : "default",
          boxSizing:     "border-box",
        }}
      >
        {value && (
          <span style={{
            fontSize:  "clamp(14px,1.7vw,22px)",
            fontWeight: 700,
            color:      wrong ? WRONG_COLOR : RED_COLOR,
            lineHeight: 1.2,
            wordBreak:  "break-word",
          }}>
            {value}
          </span>
        )}
        {wrong && (
          <div style={{
            position:        "absolute",
            top:             "-8px",
            left:            "-6px",
            width:           "clamp(14px,1.6vw,18px)",
            height:          "clamp(14px,1.6vw,18px)",
            borderRadius:    "50%",
            backgroundColor: WRONG_COLOR,
            border:          "1px solid #fff",
            color:           "#fff",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "clamp(8px,0.8vw,10px)",
            fontWeight:      700,
            boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
            zIndex:          3,
            pointerEvents:   "none",
          }}>✕</div>
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
          gap:           "clamp(14px,2vw,22px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">F</span> Read and write.
        </h1>

        {/* الفقاعة + الولد */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(6px,1vw,14px)", justifyContent: "center" }}>
          <div style={{
            position:     "relative",
            flex:         1,
            maxWidth:     "clamp(260px,55vw,600px)",
            border:       "2px solid #8a8a8a",
            borderRadius: "clamp(10px,1.2vw,16px)",
            background:   "#fff",
            padding:      "clamp(10px,1.2vw,16px) clamp(12px,1.5vw,20px)",
            fontSize:     "clamp(13px,1.6vw,20px)",
            lineHeight:   1.5,
            color:        "#222",
            boxSizing:    "border-box",
          }}>
            My father was a farmer. We had dogs, sheep, and goats. I had a horse.
            {/* ذيل الفقاعة */}
            <div style={{
              position:        "absolute",
              right:           "clamp(-28px,-3.5vw,-18px)",
              top:             "40%",
              width:           "clamp(20px,3vw,40px)",
              height:          "2px",
              backgroundColor: "#8a8a8a",
              transform:       "rotate(-16deg)",
              transformOrigin: "left center",
            }} />
          </div>
          <img
            src={boyImg}
            alt="boy"
            style={{
              width:        "clamp(70px,12vw,140px)",
              height:       "auto",
              objectFit:    "contain",
              display:      "block",
              flexShrink:   0,
              userSelect:   "none",
              pointerEvents:"none",
            }}
          />
        </div>

        {/* صف الصور */}
        <div style={{
          display:        "flex",
          justifyContent: "center",
          alignItems:     "flex-end",
          gap:            "clamp(6px,1.2vw,16px)",
          flexWrap:       "wrap",
          width:          "100%",
        }}>
          {SCENE_IMGS.map((img) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              style={{
                width:         img.w,
                height:        "auto",
                objectFit:     "contain",
                display:       "block",
                userSelect:    "none",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* Word Bank */}
        <div style={{
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
        }}>
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
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color:           isUsed ? "#999" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.6 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(13px,1.5vw,20px)",
                  fontWeight:      600,
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

        {/* الأسئلة */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.4vw,18px)", width: "100%" }}>
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                display:    "flex",
                alignItems: "flex-end",
                flexWrap:   "wrap",
                gap:        "clamp(4px,0.6vw,8px)",
              }}
            >
              {/* رقم */}
              <span style={{ fontSize: "clamp(15px,1.8vw,24px)", fontWeight: 700, color: "#111", flexShrink: 0, minWidth: "clamp(14px,1.8vw,22px)" }}>
                {q.id}
              </span>
              {/* before */}
              <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111", whiteSpace: "nowrap" }}>
                {q.before}
              </span>
              {/* drop zone */}
              {renderDropZone(q)}
              {/* after */}
              <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111", whiteSpace: "nowrap" }}>
                {q.after}
              </span>
            </div>
          ))}
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
          left:          touchPos.x - 80,
          top:           touchPos.y - 20,
          background:    SOFT_COLOR,
          padding:       "8px 14px",
          borderRadius:  "10px",
          border:        `1.5px solid ${BORDER_COLOR}`,
          boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents: "none",
          zIndex:        9999,
          fontSize:      "clamp(13px,1.5vw,18px)",
          fontWeight:    600,
          color:         "#222",
          maxWidth:      "260px",
          textAlign:     "center",
          lineHeight:    1.3,
        }}>
          {touchItem.value}
        </div>
      )}
    </div>
  );
}