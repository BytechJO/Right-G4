import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/1_8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/2_8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/3_6.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/4_6.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/5_6.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/6_8.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/7_6.svg";

// ── ثوابت ─────────────────────────────────────────────────────
const CELL_SIZE    = 60;
const WRONG_COLOR  = "#ef4444";
const SELECT_COLOR = "#f39b42";

// ── بيانات الأسئلة ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, img: img1, answer: "radio",
    pairs: [
      { top: "r", bottom: "m" }, { top: "f", bottom: "a" },
      { top: "d", bottom: "e" }, { top: "i", bottom: "w" },
      { top: "a", bottom: "o" },
    ],
  },
  {
    id: 2, img: img2, answer: "tractor",
    pairs: [
      { top: "t", bottom: "y" }, { top: "w", bottom: "r" },
      { top: "a", bottom: "b" }, { top: "c", bottom: "m" },
      { top: "d", bottom: "t" }, { top: "e", bottom: "o" },
      { top: "r", bottom: "k" },
    ],
  },
  {
    id: 3, img: img3, answer: "farm",
    pairs: [
      { top: "f", bottom: "k" }, { top: "s", bottom: "a" },
      { top: "r", bottom: "x" }, { top: "e", bottom: "m" },
    ],
  },
  {
    id: 4, img: img4, answer: "cottage",
    pairs: [
      { top: "c", bottom: "h" }, { top: "p", bottom: "o" },
      { top: "o", bottom: "t" }, { top: "t", bottom: "c" },
      { top: "j", bottom: "a" }, { top: "g", bottom: "r" },
      { top: "q", bottom: "e" },
    ],
  },
  {
    id: 5, img: img5, answer: "dog",
    pairs: [
      { top: "d", bottom: "v" }, { top: "w", bottom: "o" },
      { top: "g", bottom: "z" },
    ],
  },
  {
    id: 6, img: img6, answer: "sheep",
    pairs: [
      { top: "t", bottom: "s" }, { top: "h", bottom: "d" },
      { top: "e", bottom: "x" }, { top: "i", bottom: "e" },
      { top: "p", bottom: "v" },
    ],
  },
  {
    id: 7, img: img7, answer: "horse",
    pairs: [
      { top: "h", bottom: "g" }, { top: "f", bottom: "o" },
      { top: "r", bottom: "w" }, { top: "s", bottom: "q" },
      { top: "e", bottom: "o" },
    ],
  },
];

// ── مكوّن الخلية المقسومة قطرياً ──────────────────────────────
function DiagonalCell({ pair, selected, disabled, onSelectTop, onSelectBottom }) {
  const topActive    = selected === "top";
  const bottomActive = selected === "bottom";

  return (
    <div
      style={{
        position:        "relative",
        width:           `${CELL_SIZE}px`,
        height:          `${CELL_SIZE}px`,
        border:          "2px solid #2b2b2b",
        borderRadius:    "10px",
        backgroundColor: "#fff",
        overflow:        "hidden",
        boxSizing:       "border-box",
        flexShrink:      0,
      }}
    >
      {/* منطقة الضغط - الجزء العلوي */}
      <button
        type="button"
        disabled={disabled}
        onClick={onSelectTop}
        style={{
          position:        "absolute",
          inset:           0,
          clipPath:        "polygon(0 0, 100% 0, 0 100%)",
          border:          "none",
          backgroundColor: topActive ? SELECT_COLOR : "transparent",
          cursor:          disabled ? "default" : "pointer",
          zIndex:          1,
        }}
      />

      {/* منطقة الضغط - الجزء السفلي */}
      <button
        type="button"
        disabled={disabled}
        onClick={onSelectBottom}
        style={{
          position:        "absolute",
          inset:           0,
          clipPath:        "polygon(100% 0, 100% 100%, 0 100%)",
          border:          "none",
          backgroundColor: bottomActive ? SELECT_COLOR : "transparent",
          cursor:          disabled ? "default" : "pointer",
          zIndex:          1,
        }}
      />

      {/* الخط القطري */}
      <svg
        width={CELL_SIZE}
        height={CELL_SIZE}
        viewBox={`0 0 ${CELL_SIZE} ${CELL_SIZE}`}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <line
          x1="2" y1={CELL_SIZE - 2}
          x2={CELL_SIZE - 2} y2="2"
          stroke="#2b2b2b" strokeWidth="1.5"
        />
      </svg>

      {/* الحرف العلوي */}
      <span
        style={{
          position:      "absolute",
          top:           "6px",
          left:          "10px",
          fontSize:      "clamp(16px,2vw,26px)",
          fontWeight:    600,
          color:         "#111",
          zIndex:        3,
          userSelect:    "none",
          pointerEvents: "none",
          lineHeight:    1,
        }}
      >
        {pair.top}
      </span>

      {/* الحرف السفلي */}
      <span
        style={{
          position:      "absolute",
          bottom:        "6px",
          right:         "10px",
          fontSize:      "clamp(16px,2vw,26px)",
          fontWeight:    600,
          color:         "#111",
          zIndex:        3,
          userSelect:    "none",
          pointerEvents: "none",
          lineHeight:    1,
        }}
      >
        {pair.bottom}
      </span>
    </div>
  );
}

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -8,
      right:           -8,
      width:           20,
      height:          20,
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        10,
      fontWeight:      700,
      border:          "1.5px solid #fff",
      pointerEvents:   "none",
      zIndex:          5,
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page45_QA() {
  const [selections, setSelections] = useState({});
  const [checked,    setChecked]    = useState(false);
  const [showAns,    setShowAns]    = useState(false);

  // ── بناء الكلمة من الاختيارات ──
  const buildWord = (itemId) => {
    const item    = ITEMS.find((x) => x.id === itemId);
    const current = selections[itemId] || [];
    return item.pairs
      .map((pair, i) => {
        if (current[i] === "top")    return pair.top;
        if (current[i] === "bottom") return pair.bottom;
        return "";
      })
      .join("");
  };

  const isRowComplete = (item) => {
    const current = selections[item.id] || [];
    return current.length === item.pairs.length && current.every(Boolean);
  };

  const isRowCorrect = (item) =>
    buildWord(item.id).toLowerCase() === item.answer.toLowerCase();

  // ── handlers ──
  const handleSelect = (itemId, index, side) => {
    if (showAns) return;
    setChecked(false);
    setSelections((prev) => {
      const current    = prev[itemId] ? [...prev[itemId]] : [];
      current[index]   = side;
      return { ...prev, [itemId]: current };
    });
  };

  const handleCheck = () => {
    const allAnswered = ITEMS.every((item) => isRowComplete(item));
    if (!allAnswered) {
      ValidationAlert.error("Please complete all words first! ✏️");
      return;
    }

    let correct = 0;
    ITEMS.forEach((item) => { if (isRowCorrect(item)) correct++; });
    setChecked(true);
    setShowAns(false);

    const total = ITEMS.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    const solved = {};
    ITEMS.forEach((item) => {
      solved[item.id] = item.pairs.map((pair, i) => {
        const expected = item.answer[i]?.toLowerCase();
        return pair.top.toLowerCase() === expected ? "top" : "bottom";
      });
    });
    setSelections(solved);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelections({});
    setChecked(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Find and write the words.
        </h1>

        {/* ── الأسئلة ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,22px)" }}>
          {ITEMS.map((item) => {
            const word    = buildWord(item.id);
            const isWrong = checked && isRowComplete(item) && !isRowCorrect(item);

            return (
              <div
                key={item.id}
                style={{
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "clamp(10px,1.5vw,20px)",
                  flexWrap:    "wrap",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize:   "clamp(16px,1.9vw,24px)",
                    fontWeight: 700,
                    color:      "#111",
                    minWidth:   "clamp(16px,1.9vw,24px)",
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </span>

                {/* الخلايا */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {item.pairs.map((pair, index) => (
                    <DiagonalCell
                      key={`${item.id}-${index}`}
                      pair={pair}
                      selected={(selections[item.id] || [])[index]}
                      disabled={showAns}
                      onSelectTop={()    => handleSelect(item.id, index, "top")}
                      onSelectBottom={() => handleSelect(item.id, index, "bottom")}
                    />
                  ))}
                </div>

                {/* الصورة */}
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width:      "clamp(56px,7vw,84px)",
                    height:     "clamp(56px,7vw,84px)",
                    objectFit:  "contain",
                    flexShrink: 0,
                  }}
                />

                {/* الكلمة المُكوَّنة */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div
                    style={{
                      minWidth:     "clamp(100px,14vw,200px)",
                      borderBottom: `2px solid ${isWrong ? WRONG_COLOR : "#888"}`,
                      fontSize:     "clamp(16px,1.9vw,24px)",
                      fontWeight:   600,
                      color:        isWrong ? WRONG_COLOR : word ? "#dc2626" : "transparent",
                      paddingBottom: "3px",
                      minHeight:    "32px",
                      textTransform: "lowercase",
                      transition:   "border-color 0.2s, color 0.2s",
                    }}
                  >
                    {word || " "}
                  </div>
                  {isWrong && <ErrorBadge />}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
            handleShowAnswer={handleShowAnswer}
          />
        </div>
      </div>
    </div>
  );
}