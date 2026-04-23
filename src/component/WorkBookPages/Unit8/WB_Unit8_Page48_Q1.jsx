import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/7.svg";// الأشكال هي الخيارات — والقيمة الصحيحة هي الشكل نفسه
// ■ = a   ▲ = o   ◆ = e   ★ = i
const SHAPE_MAP  = { "■": "a", "▲": "o", "◆": "e", "★": "i" };
// الخيارات في الـ dropdown هي الأشكال نفسها
const SHAPE_OPTIONS = ["■", "▲", "◆", "★"];

const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#cc0000";
const LINE_COLOR   = "#333";
const BORDER_COLOR = "#f39b42";

// كل shape في parts = dropdown — الإجابة الصحيحة هي الشكل نفسه
const ITEMS = [
  {
    id: 1, img: img1,
    parts: [{ text: "g" }, { shape: "■" }, { text: "rd" }, { shape: "◆" }, { text: "n" }],
    answer: "garden",
  },
  {
    id: 2, img: img2,
    parts: [{ text: "r" }, { shape: "▲" }, { shape: "▲" }, { text: "f" }],
    answer: "roof",
  },
  {
    id: 3, img: img3,
    parts: [{ text: "ch" }, { shape: "★" }, { text: "mn" }, { shape: "◆" }, { text: "y" }],
    answer: "chimney",
  },
  {
    id: 4, img: img4,
    parts: [{ text: "n" }, { shape: "◆" }, { text: "st" }],
    answer: "nest",
  },
  {
    id: 5, img: img5,
    parts: [{ text: "sw" }, { shape: "★" }, { text: "ng" }],
    answer: "swing",
  },
  {
    id: 6, img: img6,
    parts: [{ text: "w" }, { shape: "■" }, { text: "ll" }],
    answer: "wall",
  },
  {
    id: 7, img: img7,
    parts: [{ text: "fl" }, { shape: "▲" }, { shape: "▲" }, { text: "r" }],
    answer: "floor",
  },
];

// الإجابة الصحيحة لكل dropdown هي الشكل نفسه (مش الحرف)
const buildCorrect = () => {
  const correct = {};
  ITEMS.forEach((item) =>
    item.parts.forEach((part, idx) => {
      if (part.shape) correct[`${item.id}-${idx}`] = part.shape;
    })
  );
  return correct;
};
const CORRECT = buildCorrect();

export default function WB_FindMissingLetters_PageG() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value) => {
    if (showAns) return;
    setSelected((prev) => ({ ...prev, [key]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allKeys     = Object.keys(CORRECT);
    const allAnswered = allKeys.every((k) => selected[k]);
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    allKeys.forEach((k) => { if (selected[k] === CORRECT[k]) score++; });
    setShowResults(true);
    const total = allKeys.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setSelected({ ...CORRECT });
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const isKeyWrong = (key) =>
    showResults && !showAns && selected[key] !== CORRECT[key];

  const isItemAllCorrect = (item) =>
    item.parts
      .map((part, idx) => ({ part, key: `${item.id}-${idx}` }))
      .filter(({ part }) => part.shape)
      .every(({ key }) => selected[key] === CORRECT[key]);

  // ── رندر الكلمة: نص ثابت + dropdown بالأشكال ──
  const renderWord = (item) => (
    <div
      style={{
        display:        "flex",
        alignItems:     "flex-end",
        justifyContent: "center",
        flexWrap:       "nowrap",
        gap:            "0px",
        width:          "100%",
      }}
    >
      {item.parts.map((part, idx) => {
        // نص ثابت
        if (!part.shape) {
          return (
            <span
              key={idx}
              style={{
                fontSize:      "clamp(14px,1.8vw,22px)",
                fontWeight:    600,
                color:         "#111",
                paddingBottom: "3px",
                lineHeight:    1,
                whiteSpace:    "nowrap",
              }}
            >
              {part.text}
            </span>
          );
        }

        // dropdown — الخيارات هي الأشكال ■ ▲ ◆ ★
        const key   = `${item.id}-${idx}`;
        const val   = selected[key] || "";
        const wrong = isKeyWrong(key);

        return (
          <div
            key={idx}
            style={{
              position:   "relative",
              display:    "inline-flex",
              alignItems: "flex-end",
            }}
          >
            <select
              disabled={showAns}
              value={val}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{
                // ✅ appearance auto = سهم المتصفح يظهر
                appearance:       "auto",
                WebkitAppearance: "auto",
                MozAppearance:    "menulist",
                // عرض يكفي الشكل + السهم
                width:            "clamp(52px,6vw,72px)",
                borderTop:        "none",
                borderLeft:       "none",
                borderRight:      "none",
                borderBottom:     `2.5px solid ${wrong ? WRONG_COLOR : LINE_COLOR}`,
                borderRadius:     0,
                outline:          "none",
                // حجم خط الشكل
                fontSize:         "clamp(14px,1.8vw,22px)",
                fontWeight:       700,
                color:            wrong ? WRONG_COLOR : "#111",
                padding:          "0 2px 3px 2px",
                background:       "transparent",
                cursor:           showAns ? "default" : "pointer",
                textAlign:        "center",
                boxSizing:        "border-box",
              }}
            >
              <option value="" disabled hidden></option>
              {SHAPE_OPTIONS.map((shape) => (
                <option key={shape} value={shape}>{shape}</option>
              ))}
            </select>

            {/* wrong badge */}
            {wrong && (
              <div
                style={{
                  position:        "absolute",
                  top:             "-8px",
                  left:            "-6px",
                  width:           "clamp(14px,1.5vw,18px)",
                  height:          "clamp(14px,1.5vw,18px)",
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
                }}
              >
                ✕
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── card واحد ──
  const renderItem = (item) => (
    <div
      key={item.id}
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "clamp(4px,0.6vw,8px)",
      }}
    >
      {/* رقم */}
      <span
        style={{
          fontSize:   "clamp(15px,1.8vw,22px)",
          fontWeight: 700,
          color:      "#111",
          alignSelf:  "flex-start",
        }}
      >
        {item.id}
      </span>

      {/* صورة */}
      <div
        style={{
          width:        "100%",
          aspectRatio:  "1 / 1",
          border:       `2px solid ${BORDER_COLOR}`,
          borderRadius: "clamp(10px,1.2vw,16px)",
          overflow:     "hidden",
          background:   "#f7f7f7",
        }}
      >
        <img
          src={item.img}
          alt={`item-${item.id}`}
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

      {/* الكلمة مع dropdowns الأشكال */}
      {renderWord(item)}

      {/* سطر الكلمة الكاملة — تظهر لما تكون كل الأشكال صح */}
      <div
        style={{
          width:         "100%",
          borderBottom:  `2px solid ${LINE_COLOR}`,
          textAlign:     "center",
          fontSize:      "clamp(13px,1.6vw,20px)",
          fontWeight:    700,
          color:         RED_COLOR,
          paddingBottom: "2px",
          minHeight:     "clamp(20px,2.2vw,28px)",
          lineHeight:    1.2,
        }}
      >
        {(showAns || (showResults && isItemAllCorrect(item))) ? item.answer : ""}
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
          gap:           "clamp(16px,2.2vw,26px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">G</span> Find the missing letters. Write the words.
        </h1>

        {/* Layout: أسئلة يسار + legend يمين */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr auto",
            gap:                 "clamp(18px,2.5vw,36px)",
            alignItems:          "center",
            width:               "100%",
          }}
        >
          {/* الأسئلة: صفين */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.2vw,28px)" }}>

            {/* Row 1: 1-4 */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap:                 "clamp(10px,1.4vw,18px)",
              }}
            >
              {ITEMS.slice(0, 4).map(renderItem)}
            </div>

            {/* Row 2: 5-7 + placeholder */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap:                 "clamp(10px,1.4vw,18px)",
              }}
            >
              {ITEMS.slice(4).map(renderItem)}
              <div />
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(10px,1.2vw,18px)",
              padding:       "clamp(12px,1.4vw,20px) clamp(16px,2vw,28px)",
              border:        `2px solid ${BORDER_COLOR}`,
              borderRadius:  "clamp(12px,1.4vw,18px)",
              background:    "#fff",
              alignSelf:     "center",
            }}
          >
            {Object.entries(SHAPE_MAP).map(([shape, letter]) => (
              <div
                key={shape}
                style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1vw,14px)" }}
              >
                <span
                  style={{
                    fontSize:  "clamp(18px,2.2vw,28px)",
                    lineHeight: 1,
                    color:     "#111",
                    minWidth:  "clamp(20px,2.4vw,32px)",
                    textAlign: "center",
                  }}
                >
                  {shape}
                </span>
                <span style={{ fontSize: "clamp(16px,1.8vw,24px)", color: "#555", fontWeight: 500 }}>
                  =
                </span>
                <span
                  style={{
                    fontSize:      "clamp(18px,2.2vw,28px)",
                    fontWeight:    700,
                    color:         RED_COLOR,
                    borderBottom:  `2px solid ${LINE_COLOR}`,
                    minWidth:      "clamp(28px,3.5vw,48px)",
                    textAlign:     "center",
                    paddingBottom: "2px",
                    lineHeight:    1.2,
                  }}
                >
                  {letter}
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
    </div>
  );
}