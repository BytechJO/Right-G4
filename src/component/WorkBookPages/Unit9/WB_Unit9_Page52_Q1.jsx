import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/1.svg";
import boy1Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/2.svg";
import boy2Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/3.svg";

const PEOPLE = [
  {
    id: 1,
    img: girlImg,
    lines: [
      "She was in the swimming pool this morning.",
      "She is in the post office now.",
    ],
  },
  {
    id: 2,
    img: boy1Img,
    lines: [
      "He is at the gym now.",
      "He was at the bus stop this morning.",
    ],
  },
  {
    id: 3,
    img: boy2Img,
    lines: [
      "He was at the bakery this morning.",
      "He is on the playground now.",
    ],
  },
];

const DRAG_ITEMS = [
  "at the swimming pool",
  "at the bus stop",
  "at the bakery",
  "at the post office",
  "at the gym",
  "on the playground",
];

const CORRECT_ANSWERS = {
  "morning-1": "at the swimming pool",
  "morning-2": "at the bus stop",
  "morning-3": "at the bakery",
  "now-1": "at the post office",
  "now-2": "at the gym",
  "now-3": "on the playground",
};

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";

export default function WB_Unit8_Page52_QC() {
  const [answers, setAnswers]       = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns]       = useState(false);

  // Touch drag support
  const touchItemRef  = useRef(null); // text being dragged
  const ghostRef      = useRef(null); // visual ghost element
  const cellRefs      = useRef({});   // refs for drop cells

  const usedValues = Object.values(answers);

  /* ─── Mouse drag handlers ─── */
  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (cellKey) => {
    if (showAns || !draggedText) return;
    const newAnswers = { ...answers };
    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedText) delete newAnswers[key];
    });
    newAnswers[cellKey] = draggedText;
    setAnswers(newAnswers);
    setDraggedText(null);
  };

  /* ─── Touch drag handlers ─── */
  const createGhost = (text, x, y) => {
    const ghost = document.createElement("div");
    ghost.innerText = text;
    ghost.style.cssText = `
      position: fixed;
      left: ${x - 60}px;
      top:  ${y - 20}px;
      padding: 8px 14px;
      border-radius: 10px;
      background: #e39c56ff;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.9;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      white-space: nowrap;
    `;
    document.body.appendChild(ghost);
    ghostRef.current = ghost;
  };

  const removeGhost = () => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  };

  const getCellKeyAtPoint = (x, y) => {
    for (const [key, ref] of Object.entries(cellRefs.current)) {
      if (!ref) continue;
      const rect = ref.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return key;
      }
    }
    return null;
  };

  const handleTouchStart = (value, e) => {
    if (showAns || usedValues.includes(value)) return;
    e.preventDefault();
    touchItemRef.current = value;
    setDraggedText(value);
    const touch = e.touches[0];
    createGhost(value, touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!ghostRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    ghostRef.current.style.left = `${touch.clientX - 60}px`;
    ghostRef.current.style.top  = `${touch.clientY - 20}px`;
  };

  const handleTouchEnd = (e) => {
    removeGhost();
    if (!touchItemRef.current) return;
    const touch = e.changedTouches[0];
    const cellKey = getCellKeyAtPoint(touch.clientX, touch.clientY);
    if (cellKey && !showAns) {
      const newAnswers = { ...answers };
      Object.keys(newAnswers).forEach((key) => {
        if (newAnswers[key] === touchItemRef.current) delete newAnswers[key];
      });
      newAnswers[cellKey] = touchItemRef.current;
      setAnswers(newAnswers);
    }
    touchItemRef.current = null;
    setDraggedText(null);
  };

  /* ─── Button handlers ─── */
  const handleCheck = () => {
    if (showAns) return;
    const allFilled = Object.keys(CORRECT_ANSWERS).every((key) => answers[key]);
    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    Object.keys(CORRECT_ANSWERS).forEach((key) => {
      if (answers[key] === CORRECT_ANSWERS[key]) score++;
    });
    setShowResults(true);
    const total = Object.keys(CORRECT_ANSWERS).length;
    if (score === total)       ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)        ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                       ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setAnswers(CORRECT_ANSWERS);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongCell = (cellKey) => {
    if (!showResults || showAns) return false;
    if (!answers[cellKey]) return false;
    return answers[cellKey] !== CORRECT_ANSWERS[cellKey];
  };

  /* ─── Drop cell renderer ─── */
  const renderDropCell = (cellKey) => {
    const value = answers[cellKey];
    const wrong = isWrongCell(cellKey);

    return (
      <div
        ref={(el) => (cellRefs.current[cellKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(cellKey)}
        style={{
          position:       "relative",
          minHeight:      "clamp(48px,6vw,68px)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-start",
          padding:        "6px 10px",
          fontSize:       "clamp(12px,1.5vw,18px)",
          lineHeight:     "1.3",
          backgroundColor:"transparent",
          boxSizing:      "border-box",
          transition:     "color 0.2s",
        }}
      >
        {value || ""}

        {wrong && (
          <div
            style={{
              position:        "absolute",
              top:             "-7px",
              right:           "-7px",
              width:           "clamp(14px,1.6vw,20px)",
              height:          "clamp(14px,1.6vw,20px)",
              borderRadius:    "50%",
              backgroundColor: WRONG_COLOR,
              border:          "1px solid #fff",
              color:           "#fff",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              fontSize:        "clamp(8px,0.8vw,11px)",
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
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(14px,2vw,24px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">C</span> Read and write in the chart.
        </h1>

        {/* Sentences */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(10px,1.5vw,18px)",
            marginBottom:  "4px",
          }}
        >
          {PEOPLE.map((person) => (
            <div
              key={person.id}
              style={{
                display:        "grid",
                gridTemplateColumns: "clamp(18px,2.5vw,28px) clamp(48px,6vw,70px) 1fr",
                alignItems:     "center",
                columnGap:      "clamp(8px,1.2vw,16px)",
              }}
            >
              <div
                style={{
                  fontSize:   "clamp(16px,2vw,22px)",
                  fontWeight: "700",
                  color:      "#222",
                }}
              >
                {person.id}
              </div>

              <img
                src={person.img}
                alt={`person-${person.id}`}
                style={{
                  width:      "clamp(40px,5vw,56px)",
                  height:     "clamp(52px,7vw,74px)",
                  objectFit:  "contain",
                  display:    "block",
                }}
              />

              <div
                style={{
                  fontSize:   "clamp(13px,1.6vw,18px)",
                  lineHeight: "1.35",
                  color:      "#222",
                }}
              >
                <div>{person.lines[0]}</div>
                <div>{person.lines[1]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Drag bank */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "clamp(6px,1vw,10px)",
            flexWrap:       "wrap",
            marginBottom:   "4px",
          }}
        >
          {DRAG_ITEMS.map((item, index) => {
            const disabled = usedValues.includes(item);

            return (
              <div
                key={`${item}-${index}`}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item)}
                onTouchStart={(e) => handleTouchStart(item, e)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding:         "clamp(6px,0.8vw,8px) clamp(10px,1.2vw,14px)",
                  borderRadius:    "10px",
                  backgroundColor: "#ffca94",
                                            border:     "2px solid #f39b42",

                  color:           "#fff",
                  fontSize:        "clamp(12px,1.4vw,15px)",
                  fontWeight:      "600",
                  cursor:          disabled || showAns ? "not-allowed" : "grab",
                  opacity:         disabled ? 0.5 : 1,
                  userSelect:      "none",
                  boxShadow:       "0 2px 6px rgba(0,0,0,0.12)",
                  touchAction:     "none",
                  transition:      "opacity 0.2s, background-color 0.2s",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div
          style={{
            width:           "100%",
            display:         "flex",
            justifyContent:  "center",
            overflowX:       "auto",
          }}
        >
          <div
            style={{
              width:           "100%",
              maxWidth:        "760px",
              minWidth:        "320px",
              border:          `2px solid ${BORDER_COLOR}`,
              borderRadius:    "clamp(10px,1.5vw,18px)",
              overflow:        "hidden",
              backgroundColor: "#fff",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                borderBottom:        `2px solid ${BORDER_COLOR}`,
              }}
            >
              <div style={{ minHeight: "clamp(60px,8vw,86px)", borderRight: `2px solid ${BORDER_COLOR}` }} />
              {PEOPLE.map((person, index) => (
                <div
                  key={person.id}
                  style={{
                    minHeight:      "clamp(60px,8vw,86px)",
                    borderRight:    index !== PEOPLE.length - 1 ? `2px solid ${BORDER_COLOR}` : "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={person.img}
                    alt={`head-${person.id}`}
                    style={{
                      width:     "clamp(36px,5vw,56px)",
                      height:    "clamp(44px,6vw,68px)",
                      objectFit: "contain",
                      display:   "block",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Morning row */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                borderBottom:        `2px solid ${BORDER_COLOR}`,
              }}
            >
              <div
                style={{
                  minHeight:      "clamp(56px,7vw,82px)",
                  borderRight:    `2px solid ${BORDER_COLOR}`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "clamp(14px,1.8vw,20px)",
                  color:          "#222",
                  fontWeight:     600,
                }}
              >
                Morning
              </div>
              <div style={{ borderRight: `2px solid ${BORDER_COLOR}` }}>{renderDropCell("morning-1")}</div>
              <div style={{ borderRight: `2px solid ${BORDER_COLOR}` }}>{renderDropCell("morning-2")}</div>
              <div>{renderDropCell("morning-3")}</div>
            </div>

            {/* Now row */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
              }}
            >
              <div
                style={{
                  minHeight:      "clamp(56px,7vw,82px)",
                  borderRight:    `2px solid ${BORDER_COLOR}`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "clamp(14px,1.8vw,20px)",
                  color:          "#222",
                  fontWeight:     600,
                }}
              >
                Now
              </div>
              <div style={{ borderRight: `2px solid ${BORDER_COLOR}` }}>{renderDropCell("now-1")}</div>
              <div style={{ borderRight: `2px solid ${BORDER_COLOR}` }}>{renderDropCell("now-2")}</div>
              <div>{renderDropCell("now-3")}</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(4px,0.8vw,8px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}