import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/12.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/14.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const RED_MARK    = "#d92525";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, img: img1, boxMark: "check", correctSubject: "He",  correctModal: "will",  correctAction: "watch a movie."  },
  { id: 2, img: img2, boxMark: "x",     correctSubject: "She", correctModal: "won't", correctAction: "read a book."    },
  { id: 3, img: img3, boxMark: "x",     correctSubject: "He",  correctModal: "won't", correctAction: "ride a bike."    },
  { id: 4, img: img4, boxMark: "check", correctSubject: "She", correctModal: "will",  correctAction: "plant a flower." },
];

const SUBJECT_OPTIONS = ["He", "She"];
const MODAL_OPTIONS   = ["will", "won't"];
const ACTION_OPTIONS  = [
  "watch a movie.",
  "read a book.",
  "ride a bike.",
  "plant a flower.",
];

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
      boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
      zIndex:          5,
      pointerEvents:   "none",
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page59_QF() {
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
    return (
      ans?.subject === item.correctSubject &&
      ans?.modal   === item.correctModal   &&
      ans?.action  === item.correctAction
    );
  };

  const isWrong = (item) => checked && !isItemCorrect(item);

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (i) => answers[i.id]?.subject && answers[i.id]?.modal && answers[i.id]?.action
    );
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
    ITEMS.forEach((i) => {
      filled[i.id] = { subject: i.correctSubject, modal: i.correctModal, action: i.correctAction };
    });
    setAnswers(filled);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const renderCornerMark = (type) => (
    <span
      style={{
        color:      type === "check" ? RED_MARK : "#777",
        fontSize:   "clamp(20px,3vw,36px)",
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {type === "check" ? "✓" : "✕"}
    </span>
  );

  // ── select بسيط ──
  const sel = (id, field, value, options, placeholder, flex = "1") => (
    <select
      value={value || ""}
      onChange={(e) => handleSelect(id, field, e.target.value)}
      disabled={showAns}
      style={{
        flex,
        minWidth:        0,
        border:          `1.5px solid #f39b42 `,
        borderRadius:    "8px",
        padding:         "clamp(4px,0.5vw,6px) clamp(4px,0.5vw,8px)",
        fontSize:        "clamp(12px,1.5vw,17px)",
        outline:         "none",
        backgroundColor: "#fff",
        color:          "#000000ff",
        cursor:          showAns ? "default" : "pointer",
        fontWeight:      value ? 600 : 400,
        transition:      "border-color 0.15s",
        appearance:      "auto",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(16px,2.5vw,28px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span>{" "}
          Look and write.
        </h1>

        {/* ── شبكة 2×2 ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap:                 "clamp(16px,3vw,32px) clamp(16px,4vw,48px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const current = answers[item.id] || {};
            const wrong   = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "clamp(8px,1.2vw,14px)",
                  minWidth:      0,
                }}
              >
                {/* رقم + صورة */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(6px,0.8vw,10px)" }}>
                  <span
                    style={{
                      fontSize:   "clamp(15px,1.9vw,22px)",
                      fontWeight: 700,
                      color:      "#111",
                      flexShrink: 0,
                      minWidth:   "clamp(14px,1.8vw,20px)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.id}
                  </span>

                  {/* الصورة — تتمدد مع الشبكة */}
                  <div
                    style={{
                      position:        "relative",
                      flex:            1,
                      minWidth:        0,
                      aspectRatio:     "3 / 2",
                      borderRadius:    "clamp(8px,1.2vw,14px)",
                      overflow:        "hidden",
                      backgroundColor: "#fff",

                      transition:      "border-color 0.2s",
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
                                                      border:          `2px solid #f39b42 `,

                      }}
                    />

                    {/* صندوق ✓/✕ في الزاوية */}
                    <div
                      style={{
                        position:        "absolute",
                        bottom:          "clamp(4px,0.6vw,8px)",
                        right:           "clamp(4px,0.6vw,8px)",
                        width:           "clamp(26px,3.5vw,42px)",
                        height:          "clamp(26px,3.5vw,42px)",
                        backgroundColor: "#fff",
                        border:          "2px solid #f39b42",
                        borderRadius:    "clamp(4px,0.6vw,8px)",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        boxSizing:       "border-box",
                      }}
                    >
                      {renderCornerMark(item.boxMark)}
                    </div>

                    {wrong && <ErrorBadge />}
                  </div>
                </div>

                {/* ── السطر: selects تتمدد ولا تنكسر ── */}
                <div
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "clamp(4px,0.5vw,6px)",
                    paddingLeft:  "clamp(18px,2.2vw,28px)",
                    paddingBottom:"clamp(4px,0.5vw,6px)",
                    borderBottom: `2px solid ${wrong ? WRONG_COLOR : "#666"}`,
                    minWidth:     0,
                    overflow:     "hidden",
                    transition:   "border-color 0.2s",
                  }}
                >
                  {/* subject — حجم ثابت نسبياً */}
                  {sel(item.id, "subject", current.subject, SUBJECT_OPTIONS, "He/She", "0 0 auto")}

                  {/* modal */}
                  {sel(item.id, "modal", current.modal, MODAL_OPTIONS, "will/won't", "0 0 auto")}

                  {/* action — يأخذ باقي المساحة */}
                  {sel(item.id, "action", current.action, ACTION_OPTIONS, "action...", "1 1 0")}
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