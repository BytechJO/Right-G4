import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";


import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/8.svg";



const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";
const LINE_COLOR   = "#333";
const BORDER_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";

// ── الـ drag items: كل الأجزاء الحمراء اللي تُسحب ──
const DRAG_ITEMS = [
  { id: "d1", value: "she did."      },
  { id: "d2", value: "she didn't."   },
  { id: "d3", value: "he didn't."    },
  { id: "d4", value: "she have a horse" }, // للسؤال رقم 4
  { id: "d5", value: "she did."      },    // نسخة ثانية لرقم 4
];

// ── الأسئلة ──
// questionBefore/questionBlank/questionAfter → فيه blank في السؤال (رقم 4)
// question                                   → سؤال عادي
// answerPrefix  → الجزء الثابت من الإجابة
// answerKey     → مفتاح drop zone الإجابة
// answerCorrect → الـ value الصحيح للإجابة
// questionKey / questionCorrect → للـ blank في السؤال (رقم 4)
const ITEMS = [
  {
    id:            1,
    img:           img1,
    question:      "Did she ride a bike?",
    answerPrefix:  "Yes, ",
    answerKey:     "ans-1",
    answerCorrect: "she did.",
  },
  {
    id:            2,
    img:           img2,
    question:      "Did she watch a TV?",
    answerPrefix:  "No, ",
    answerKey:     "ans-2",
    answerCorrect: "she didn't.",
  },
  {
    id:            3,
    img:           img3,
    question:      "Did he go to the supermarket?",
    answerPrefix:  "No, ",
    answerKey:     "ans-3",
    answerCorrect: "he didn't.",
  },
  {
    id:              4,
    img:             img4,
    questionBefore:  "Did ",
    questionAfter:   "?",
    questionKey:     "q-4",
    questionCorrect: "she have a horse",
    answerPrefix:    "Yes, ",
    answerKey:       "ans-4",
    answerCorrect:   "she did.",
  },
];

// جمع كل الـ drop zones مع إجاباتها الصحيحة
const ALL_ZONES = [];
ITEMS.forEach((item) => {
  if (item.questionKey) ALL_ZONES.push({ key: item.questionKey, correct: item.questionCorrect });
  ALL_ZONES.push({ key: item.answerKey, correct: item.answerCorrect });
});

export default function WB_LookReadWrite_PageJ() {
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
    const allFilled = ALL_ZONES.every(({ key }) => answers[key]?.value);
    if (!allFilled) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_ZONES.forEach(({ key, correct }) => {
      if (answers[key]?.value === correct) score++;
    });
    setShowResults(true);
    const total = ALL_ZONES.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_ZONES.forEach(({ key, correct }) => {
      const d = DRAG_ITEMS.find((d) => d.value === correct);
      filled[key] = { dragId: d?.id ?? key, value: correct };
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

  const isWrong = (key, correct) =>
    showResults && !showAns && answers[key]?.value !== correct;

  // ── drop zone ──
  const renderDropZone = (boxKey, correct, minWidth = "clamp(120px,16vw,240px)") => {
    const value = answers[boxKey]?.value || "";
    const wrong = isWrong(boxKey, correct);

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemove(boxKey)}
        style={{
          position:      "relative",
          minWidth,
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

  // ── card واحد ──
  const renderItem = (item) => (
    <div
      key={item.id}
      style={{
        display:       "flex",
        flexDirection: "column",
        gap:           "clamp(8px,1vw,14px)",
      }}
    >
      {/* رقم */}
      <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111" }}>
        {item.id}
      </span>

      {/* صورة */}
      <div style={{
        width:        "100%",
        aspectRatio:  "1.5 / 1",
        border:       `2px solid ${BORDER_COLOR}`,
        borderRadius: "clamp(10px,1.2vw,16px)",
        overflow:     "hidden",
        background:   "#f7f7f7",
      }}>
        <img
          src={item.img}
          alt={`item-${item.id}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none", pointerEvents: "none" }}
        />
      </div>

      {/* السؤال */}
      <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: "4px" }}>
        {item.questionBefore ? (
          <>
            <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111" }}>
              {item.questionBefore}
            </span>
            {renderDropZone(item.questionKey, item.questionCorrect, "clamp(140px,20vw,280px)")}
            <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111" }}>
              {item.questionAfter}
            </span>
          </>
        ) : (
          <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111" }}>
            {item.question}
          </span>
        )}
      </div>

      {/* الإجابة */}
      <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: "4px" }}>
        <span style={{ fontSize: "clamp(14px,1.7vw,22px)", fontWeight: 500, color: "#111", borderBottom: `2px solid ${LINE_COLOR}`, paddingBottom: "2px" }}>
          {item.answerPrefix}
        </span>
        {renderDropZone(item.answerKey, item.answerCorrect)}
      </div>
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
          <span className="WB-ex-A">J</span> Look, read, and write.
        </h1>

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

        {/* Grid 2×2 */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(2, minmax(0,1fr))",
          gap:                 "clamp(20px,3vw,40px)",
          width:               "100%",
        }}>
          {ITEMS.map(renderItem)}
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