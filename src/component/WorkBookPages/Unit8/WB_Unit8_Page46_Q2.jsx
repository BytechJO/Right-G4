import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/2.svg";
import img2  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/3.svg";
import img3  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/4.svg";
import img4  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/5.svg";
import img5  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/6.svg";
import img6  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/7.svg";
import img7  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/8.svg";
import img8  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/9.svg";
import img9  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/10.svg";
import img10 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/11.svg";
import img11 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/12.svg";
import img12 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/13.svg";
import img13 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/14.svg";
import img14 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/15.svg";
import img15 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/16.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000ff";
const LINE_COLOR   = "#2f2f2f";

const LEFT_GROUP = [
  { id: 1, person: img1,  yesImg: img2,  noImg: img3  },
  { id: 2, person: img4,  yesImg: img5,  noImg: img6  },
  { id: 3, person: img7,  yesImg: img8,  noImg: img9  },
];

const RIGHT_GROUP = [
  { id: 4, person: img10, yesImg: img11, noImg: img12 },
  { id: 5, person: img13, yesImg: img14, noImg: img15 },
];

const SENTENCES = [
  { id: 1, first: "She had a doll,",    second: "she didn't have a computer." },
  { id: 2, first: "He had a kite,",     second: "he didn't have a car."       },
  { id: 3, first: "He had a ball,",     second: "he didn't have a train."     },
  { id: 4, first: "They had a radio,",  second: "they didn't have a TV."      },
  { id: 5, first: "She had a book,",    second: "she didn't have a robot."    },
];

const DRAG_ITEMS = [
  { id: "d1a", value: "She had a doll,"              },
  { id: "d1b", value: "she didn't have a computer."  },
  { id: "d2a", value: "He had a kite,"               },
  { id: "d2b", value: "he didn't have a car."        },
  { id: "d3a", value: "He had a ball,"               },
  { id: "d3b", value: "he didn't have a train."      },
  { id: "d4a", value: "They had a radio,"            },
  { id: "d4b", value: "they didn't have a TV."       },
  { id: "d5a", value: "She had a book,"              },
  { id: "d5b", value: "she didn't have a robot."     },
];

// ── جدول الصور
const GroupTable = ({ rows }) => (
  <div style={{
    display:             "grid",
    gridTemplateColumns: "clamp(60px,7vw,80px) clamp(80px,10vw,110px) clamp(80px,10vw,110px)",
    gridTemplateRows:    `clamp(28px,3.5vw,38px) repeat(${rows.length}, clamp(72px,10vw,96px))`,
    borderRadius:        "14px",
    overflow:            "visible",
  }}>
    {/* Header */}
    <div style={{ background: "transparent" }} />
    {["✓", "✕"].map((sym) => (
      <div key={sym} style={{
        border:         `2px solid ${BORDER_COLOR}`,
        borderBottom:   "none",
        borderLeft:     sym === "✕" ? "none" : undefined,
        borderTopLeftRadius:  sym === "✓" ? "14px" : 0,
        borderTopRightRadius: sym === "✕" ? "14px" : 0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       "clamp(18px,2.5vw,28px)",
        color:          "#7c7c7c",
        fontWeight:     700,
        background:     "#f9f9f9",
      }}>{sym}</div>
    ))}

    {/* Rows */}
    {rows.map((row, index) => (
      <React.Fragment key={row.id}>
        {/* صورة الشخص */}
        <div style={{
          position:             "relative",
          border:               `2px solid #f39b42`,
          borderTop:            index === 0 ? `2px solid #f39b42` : "none",
          borderRight:          "none",
          borderTopLeftRadius:  index === 0 ? "14px" : 0,
          borderBottomLeftRadius: index === rows.length - 1 ? "14px" : 0,
          display:              "flex",
          alignItems:           "center",
          justifyContent:       "center",
          background:           "#fff",
          overflow:             "hidden",
        }}>
          <div style={{
            position:   "absolute",
            top:        "5px",
            left:       "5px",
            width:      "clamp(18px,2.2vw,24px)",
            height:     "clamp(18px,2.2vw,24px)",
            borderRadius: "50%",
            border:     "1.5px solid #f39b42",
            background: "#fff",
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize:   "clamp(11px,1.3vw,14px)",
            color:      "#555",
            fontWeight: 700,
            zIndex:     2,
          }}>{row.id}</div>
          <img src={row.person} alt={`person-${row.id}`}
            style={{ width: "80%", height: "80%", objectFit: "contain" }} />
        </div>

        {/* صورة ✓ */}
        <div style={{
          border:    `2px solid #f39b42`,
          borderTop: index === 0 ? `2px solid #f39b42` : "none",
          borderRight: "none",
          display:   "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          overflow:  "hidden",
        }}>
          <img src={row.yesImg} alt={`yes-${row.id}`}
            style={{ width: "85%", height: "75%", objectFit: "contain" }} />
        </div>

        {/* صورة ✕ */}
        <div style={{
          border:    `2px solid #f39b42`,
          borderTop: index === 0 ? `2px solid #f39b42` : "none",
          borderBottomRightRadius: index === rows.length - 1 ? "14px" : 0,
          display:   "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          overflow:  "hidden",
        }}>
          <img src={row.noImg} alt={`no-${row.id}`}
            style={{ width: "85%", height: "75%", objectFit: "contain" }} />
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default function WB_Unit8_Page46_QD() {
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

  const isItemWrong = (item) => {
    if (!showResults || showAns) return false;
    return (
      answers[`${item.id}-first`]?.value  !== item.first ||
      answers[`${item.id}-second`]?.value !== item.second
    );
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = SENTENCES.every(
      (i) => answers[`${i.id}-first`]?.value && answers[`${i.id}-second`]?.value
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }
    let score = 0;
    SENTENCES.forEach((i) => {
      if (
        answers[`${i.id}-first`]?.value  === i.first &&
        answers[`${i.id}-second`]?.value === i.second
      ) score++;
    });
    setShowResults(true);
    const total = SENTENCES.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    SENTENCES.forEach((i) => {
      const d1 = DRAG_ITEMS.find((d) => d.value === i.first);
      const d2 = DRAG_ITEMS.find((d) => d.value === i.second);
      filled[`${i.id}-first`]  = { dragId: d1?.id, value: i.first  };
      filled[`${i.id}-second`] = { dragId: d2?.id, value: i.second };
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

  const renderDropZone = (boxKey) => {
    const value = answers[boxKey]?.value || "";
    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemove(boxKey)}
        style={{
          minWidth:      "clamp(120px,18vw,240px)",
          minHeight:     "clamp(26px,3vw,36px)",
          borderBottom:  `2.5px solid ${LINE_COLOR}`,
          display:       "flex",
          alignItems:    "flex-end",
          paddingBottom: "3px",
          cursor:        value && !showAns ? "pointer" : "default",
          flexShrink:    0,
        }}
      >
        {value && (
          <span style={{
            fontSize:   "clamp(13px,1.4vw,18px)",
            fontWeight: 600,
            color:      ANSWER_COLOR,
            lineHeight: 1,
            wordBreak:  "break-word",
          }}>
            {value}
          </span>
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
          <span className="WB-ex-A">D</span> Find and write sentences.
        </h1>

        {/* ── الجداول ── */}
        <div style={{
          display:        "flex",
          justifyContent: "center",
          alignItems:     "flex-start",
          gap:            "clamp(16px,3vw,40px)",
          flexWrap:       "wrap",
        }}>
          <GroupTable rows={LEFT_GROUP}  />
          <GroupTable rows={RIGHT_GROUP} />
        </div>

        {/* ── Word Bank ── */}
        <div style={{
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
                  padding:         "clamp(6px,0.8vw,10px) clamp(10px,1.2vw,14px)",
                  borderRadius:    "14px",
                  border:          `1.5px solid ${isUsed ? "#d9d9d9" : BORDER_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : "#ffca94",
                  color:           isUsed ? "#aaa" : "#222",
                  cursor:          isUsed || showAns ? "not-allowed" : "grab",
                  opacity:         isUsed ? 0.55 : 1,
                  userSelect:      "none",
                  fontSize:        "clamp(12px,1.3vw,17px)",
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

        {/* ── الجمل ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,1.8vw,20px)", width: "100%" }}>
          {SENTENCES.map((item) => {
            const wrong = isItemWrong(item);
            return (
              <div
                key={item.id}
                style={{
                  position:   "relative",
                  display:    "flex",
                  alignItems: "flex-end",
                  gap:        "clamp(6px,0.8vw,10px)",
                  flexWrap:   "wrap",
                }}
              >
                {/* رقم */}
                <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111", flexShrink: 0, paddingBottom: "4px" }}>
                  {item.id}
                </span>

                {/* first drop zone */}
                {renderDropZone(`${item.id}-first`)}

                {/* but */}
                <span style={{ fontSize: "clamp(13px,1.4vw,18px)", fontWeight: 600, color: "#111", paddingBottom: "4px", flexShrink: 0 }}>
                  but
                </span>

                {/* second drop zone */}
                {renderDropZone(`${item.id}-second`)}

                {/* Wrong badge */}
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
                    pointerEvents:   "none",
                  }}>✕</div>
                )}
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
        <div style={{
          position:      "fixed",
          left:          touchPos.x - 70,
          top:           touchPos.y - 20,
          background:    "#ffca94",
          padding:       "8px 12px",
          borderRadius:  "10px",
          border:        `1.5px solid ${BORDER_COLOR}`,
          boxShadow:     "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents: "none",
          zIndex:        9999,
          fontSize:      "clamp(12px,1.3vw,16px)",
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