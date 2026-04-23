import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/3.svg";
import img4 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/4.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR  = "#ef4444";
const SELECT_COLOR = "#f39b42";
const RED_MARK     = "#d92525";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, img: img1, subject: "She",   boxMark: "check",
    modalOptions:  ["will", "won't"],
    actionOptions: ["do her homework.", "do her homework."],
    correctModal:  "will", correctAction: "do her homework.",
  },
  {
    id: 2, img: img2, subject: "He",  boxMark: "x",
    modalOptions:  ["will", "won't"],
    actionOptions: ["go to the beach.", "plant a tree."],
    correctModal:  "won't",  correctAction: "plant a tree..",
  },
  {
    id: 3, img: img3, subject: "They",   boxMark: "check",
    modalOptions:  ["will", "won't"],
    actionOptions: ["eat at a restaurant.", "eat at a restaurant."],
    correctModal:  "will",  correctAction: "eat at a restaurant.",
  },
  {
    id: 4, img: img4, subject: "She", boxMark: "x",
    modalOptions:  ["will", "won't"],
    actionOptions: ["go to the store.", "go to the store."],
    correctModal:  "won't", correctAction: "go to the store.",
  },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -7,
      right:           -7,
      width:           "clamp(13px,1.5vw,17px)",
      height:          "clamp(13px,1.5vw,17px)",
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        "clamp(7px,0.8vw,10px)",
      fontWeight:      700,
      border:          "1.5px solid #fff",
      pointerEvents:   "none",
      zIndex:          6,
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page58_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, field, value) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const isItemCorrect = (item) => {
    const ans = answers[item.id];
    return ans?.modal === item.correctModal && ans?.action === item.correctAction;
  };

  // ── هل هاد الخيار بالذات غلط؟ ──
  const isOptionWrong = (item, field, value) => {
    if (!checked || showAns) return false;
    const ans = answers[item.id];
    return ans?.[field] === value && value !== (field === "modal" ? item.correctModal : item.correctAction);
  };

  // ── handlers ──
  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]?.modal && answers[i.id]?.action);
    if (!allAnswered) {
      ValidationAlert.error("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((i) => { if (isItemCorrect(i)) correct++; });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = { modal: i.correctModal, action: i.correctAction }; });
    setAnswers(filled);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  // ── رسم خيار واحد كدائرة ──
  const renderOption = (item, field, value) => {
    const selected = answers[item.id]?.[field] === value;
    const wrong    = isOptionWrong(item, field, value);

    return (
      <div
        key={value}
        onClick={() => handleSelect(item.id, field, value)}
        style={{
          position:       "relative",
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "clamp(2px,0.4vw,4px) clamp(8px,1.2vw,14px)",
          cursor:         showAns ? "default" : "pointer",
          userSelect:     "none",
          fontSize:       "clamp(13px,1.7vw,20px)",
          lineHeight:     1.3,
          color:          wrong ? WRONG_COLOR : "#222",
          fontWeight:     selected ? 700 : 500,
          transition:     "color 0.15s",
          whiteSpace:     "nowrap",
        }}
      >
        {/* الدائرة — تظهر عند الاختيار */}
        {selected && (
          <div
            style={{
              position:     "absolute",
              inset:        "-2px -4px",
              border:       `2.5px solid ${wrong ? WRONG_COLOR : SELECT_COLOR}`,
              borderRadius: "999px",
              pointerEvents:"none",
              transition:   "border-color 0.15s",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{value}</span>

        {/* بادج الخطأ على الدائرة */}
        {wrong && selected && <ErrorBadge />}
      </div>
    );
  };

  const renderCornerMark = (type) => (
    <span
      style={{
        color:      RED_MARK,
        fontSize:   "clamp(22px,3.2vw,42px)",
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {type === "check" ? "✓" : "✕"}
    </span>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(18px,2.5vw,30px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>{" "}
          Look, read, and circle. Say.
        </h1>

        {/* ── شبكة 2×2 ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(20px,3.5vw,48px) clamp(20px,4vw,55px)",
            alignItems:          "start",
          }}
        >
          {ITEMS.map((item) => {
            const current = answers[item.id] || {};

            return (
              <div
                key={item.id}
                style={{
                  position:      "relative",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "clamp(10px,1.4vw,16px)",
                  minWidth:      0,
                }}
              >
                {/* رقم + صورة */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "flex-start",
                    gap:        "clamp(8px,1vw,14px)",
                  }}
                >
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,26px)",
                      fontWeight: 700,
                      color:      "#111",
                      flexShrink: 0,
                      minWidth:   "clamp(14px,1.8vw,22px)",
                    }}
                  >
                    {item.id}
                  </span>

                  <div
                    style={{
                      position:     "relative",
                      width:        "clamp(120px,20vw,220px)",
                      height:       "clamp(90px,15vw,170px)",
                      border:       "2px solid #f39b42",
                      borderRadius: "clamp(10px,1.2vw,16px)",
                      overflow:     "hidden",
                      background:   "#fff",
                      flexShrink:   0,
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

                    {/* صندوق ✓/✕ في الزاوية */}
                    <div
                      style={{
                        position:        "absolute",
                        top:             "clamp(4px,0.6vw,8px)",
                        right:           "clamp(4px,0.6vw,8px)",
                        width:           "clamp(28px,3.8vw,44px)",
                        height:          "clamp(28px,3.8vw,44px)",
                        backgroundColor: "#fff",
                        border:          "2px solid #f39b42",
                        borderRadius:    "clamp(5px,0.6vw,8px)",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        boxSizing:       "border-box",
                      }}
                    >
                      {renderCornerMark(item.boxMark)}
                    </div>
                  </div>
                </div>

                {/* الجملة: subject | modal | action */}
                <div
                  style={{
                    display:     "flex",
                    alignItems:  "flex-start",
                    gap:         "clamp(6px,0.8vw,12px)",
                    paddingLeft: "clamp(20px,2.5vw,32px)",
                    flexWrap:    "wrap",
                  }}
                >
                  {/* subject */}
                  <span
                    style={{
                      fontSize:   "clamp(13px,1.7vw,20px)",
                      color:      "#222",
                      lineHeight: "clamp(28px,4vw,42px)",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.subject}
                  </span>

                  {/* modal options */}
                  <div
                    style={{
                      borderLeft:    "2.5px solid #222",
                      paddingLeft:   "clamp(6px,0.8vw,12px)",
                      display:       "flex",
                      flexDirection: "column",
                      gap:           "clamp(2px,0.4vw,6px)",
                      flexShrink:    0,
                    }}
                  >
                    {item.modalOptions.map((opt) => renderOption(item, "modal", opt))}
                  </div>

                  {/* action options */}
                  <div
                    style={{
                      borderLeft:    "2.5px solid #222",
                      paddingLeft:   "clamp(6px,0.8vw,12px)",
                      display:       "flex",
                      flexDirection: "column",
                      gap:           "clamp(2px,0.4vw,6px)",
                      flex:          1,
                      minWidth:      0,
                    }}
                  >
                    {item.actionOptions.map((opt) => renderOption(item, "action", opt))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
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