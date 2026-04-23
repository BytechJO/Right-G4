import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR   = "#2f2f2f";

const DRAG_ITEMS = [
  { id: "da", value: "a" },
  { id: "db", value: "b" },
  { id: "dc", value: "c" },
  { id: "dd", value: "d" },
  { id: "de", value: "e" },
  { id: "df", value: "f" },
  { id: "dg", value: "g" },
  { id: "dh", value: "h" },
];

const LEFT_ITEMS = [
  { id: 1, text: "The bag"        },
  { id: 2, text: "The guitar"     },
  { id: 3, text: "The cat"        },
  { id: 4, text: "The game"       },
  { id: 5, text: "The shirt"      },
  { id: 6, text: "The doll"       },
  { id: 7, text: "The teddy bear" },
  { id: 8, text: "The table lamp" },
];

const RIGHT_ITEMS = [
  { id: "a", text: "is on the bed."              },
  { id: "b", text: "is next to the chair."       },
  { id: "c", text: "is next to the bed."         },
  { id: "d", text: "is on the chair."            },
  { id: "e", text: "is under the bed."           },
  { id: "f", text: "is on the table."            },
  { id: "g", text: "is in front of the pillow."  },
  { id: "h", text: "is under the table."         },
];

const CORRECT = {
  1: "d",
  2: "e",
  3: "h",
  4: "f",
  5: "a",
  6: "g",
  7: "b",
  8: "c",
};

export default function WB_LookReadMatch_PageH() {
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
    const allAnswered = LEFT_ITEMS.every((i) => answers[`a-${i.id}`]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === CORRECT[i.id]) score++;
    });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LEFT_ITEMS.forEach((i) => {
      const correctVal = CORRECT[i.id];
      const d = DRAG_ITEMS.find((d) => d.value === correctVal);
      filled[`a-${i.id}`] = { dragId: d?.id, value: correctVal };
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

  const isWrong = (id) =>
    showResults && !showAns && answers[`a-${id}`]?.value !== CORRECT[id];

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
          <span className="WB-ex-A">H</span> Look, read, and match.
        </h1>

        {/* ── الصورة ── */}
        <div
          style={{
            width:        "100%",
            maxWidth:     "520px",
            margin:       "0 auto",
            border:       `2px solid ${BORDER_COLOR}`,
            borderRadius: "clamp(12px,1.4vw,18px)",
            overflow:     "hidden",
            background:   "#f7f7f7",
          }}
        >
          <img
            src={roomImg}
            alt="bedroom"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>

        {/* ── Word Bank: الحروف a-h ── */}
        <div
          style={{
            width:          "100%",
            border:         `2px solid ${BORDER_COLOR}`,
            borderRadius:   "clamp(12px,1.4vw,18px)",
            padding:        "clamp(10px,1.2vw,16px)",
            boxSizing:      "border-box",
            display:        "flex",
            flexWrap:       "wrap",
            gap:            "clamp(6px,0.8vw,12px)",
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
                  width:           "clamp(36px,5vw,54px)",
                  height:          "clamp(36px,5vw,54px)",
                  borderRadius:    "10px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : "#ffca94",
                  color:           isUsed ? "#aaa" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.55 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(16px,2vw,24px)",
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

        {/* ── القائمتان ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "clamp(16px,3vw,40px)",
            width:               "100%",
            alignItems:          "start",
          }}
        >
          {/* يسار: الأرقام مع drop zone */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.4vw,18px)" }}>
            {LEFT_ITEMS.map((item) => {
              const boxKey = `a-${item.id}`;
              const value  = answers[boxKey]?.value || "";
              const wrong  = isWrong(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        "clamp(8px,1vw,14px)",
                  }}
                >
                  {/* Drop zone — الحرف */}
                  <div
                    ref={(el) => (dropRefs.current[boxKey] = el)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(boxKey)}
                    onClick={() => handleRemove(boxKey)}
                    style={{
                      position:        "relative",
                      width:           "clamp(32px,4vw,48px)",
                      height:          "clamp(32px,4vw,48px)",
                      borderRadius:    "8px",
                      border:          `2px solid ${ BORDER_COLOR}`,
                      background:      "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      cursor:          value && !showAns ? "pointer" : "default",
                      flexShrink:      0,
                      boxSizing:       "border-box",
                    }}
                  >
                    {value && (
                      <span style={{
                        fontSize:   "clamp(14px,1.8vw,22px)",
                        fontWeight: 700,
                        color:       ANSWER_COLOR,
                        lineHeight: 1,
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

                  {/* رقم + نص */}
                  <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 700, color: "#111", flexShrink: 0 }}>
                    {item.id}
                  </span>
                  <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111" }}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* يمين: الحروف + النصوص */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.4vw,18px)" }}>
            {RIGHT_ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(8px,1vw,14px)",
                  minHeight:  "clamp(32px,4vw,48px)",
                }}
              >
                <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 700, color: "#111", flexShrink: 0 }}>
                  {item.id}
                </span>
                <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111" }}>
                  {item.text}
                </span>
              </div>
            ))}
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
          left:          touchPos.x - 27,
          top:           touchPos.y - 27,
          background:    "#ffca94",
          width:         "54px",
          height:        "54px",
          borderRadius:  "10px",
          border:        `1.5px solid ${BORDER_COLOR}`,
          boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents: "none",
          zIndex:        9999,
          fontSize:      "24px",
          fontWeight:    700,
          color:         "#222",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
        }}>
          {touchItem.value}
        </div>
      )}
    </div>
  );
}