import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// صور الأنشطة (اليسار)
import actImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.1.svg"; // swimming
import actImg2 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.2.svg"; // tennis
import actImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.3.svg"; // cooking
import actImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.4.svg"; // biking
import actImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.5.svg"; // running

// صور الشخصيات (اليمين)
import charImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.6.svg";
import charImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.7.svg";
import charImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.8.svg"
import charImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.9.svg"
import charImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/J.10.svg"

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const CHECK_COLOR  = "#16a34a";

const ITEMS = [
  {
    id:       1,
    actImg:   actImg1,
    charImg:  charImg1,
    activity: "swimming",
    must:     { word: "swimsuit", icon: "✓" },
    mustnt:   { word: "glasses",  icon: "✕" },
    options:  ["swimsuit", "glasses"],
    correct1: "swimsuit",
    correct2: "glasses",
  },
  {
    id:       2,
    actImg:   actImg2,
    charImg:  charImg2,
    activity: "tennis",
    must:     { word: "socks",    icon: "✓" },
    mustnt:   { word: "necklace", icon: "✕" },
    options:  ["socks", "necklace"],
    correct1: "socks",
    correct2: "necklace",
  },
  {
    id:       3,
    actImg:   actImg3,
    charImg:  charImg3,
    activity: "cooking",
    must:     { word: "apron",    icon: "✓" },
    mustnt:   { word: "boots",    icon: "✕" },
    options:  ["apron", "boots"],
    correct1: "apron",
    correct2: "boots",
  },
  {
    id:       4,
    actImg:   actImg4,
    charImg:  charImg4,
    activity: "biking",
    must:     { word: "helmet",   icon: "✓" },
    mustnt:   { word: "scarf",    icon: "✕" },
    options:  ["helmet", "scarf"],
    correct1: "helmet",
    correct2: "scarf",
  },
  {
    id:       5,
    actImg:   actImg5,
    charImg:  charImg5,
    activity: "running",
    must:     { word: "shoes",    icon: "✕" },
    mustnt:   { word: "coat",     icon: "✓" },
    options:  ["shoes", "coat"],
    correct1: "shoes",
    correct2: "coat",
  },
];

export default function WB_LookAndWrite_PageJ() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, field, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [`${id}-${field}`]: value }));
    setShowResults(false);
  };

  const getValue = (id, field) => answers[`${id}-${field}`] || "";

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (i) => getValue(i.id, "1") && getValue(i.id, "2")
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (getValue(i.id, "1") === i.correct1 && getValue(i.id, "2") === i.correct2) score++;
    });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[`${i.id}-1`] = i.correct1;
      filled[`${i.id}-2`] = i.correct2;
    });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong1 = (item) =>
    showResults && !showAns && getValue(item.id, "1") !== item.correct1;
  const isWrong2 = (item) =>
    showResults && !showAns && getValue(item.id, "2") !== item.correct2;

  const renderSelect = (item, field, isWrong) => {
    const value = getValue(item.id, field);
    return (
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <select
          disabled={showAns}
          value={value}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{
            height:          "clamp(28px,3vw,38px)",
            border:          "none",
            borderBottom:    `2.5px solid ${isWrong ? WRONG_COLOR : "#2f2f2f"}`,
            background:      "transparent",
            padding:         "0 22px 0 4px",
            fontSize:        "clamp(13px,1.4vw,18px)",
            fontWeight:      700,
            color:           isWrong ?"#2f2f2f" : "#2f2f2f",
            outline:         "none",
            appearance:      "none",
            WebkitAppearance:"none",
            cursor:          showAns ? "default" : "pointer",
            minWidth:        "clamp(70px,8vw,110px)",
            textAlign:       "center",
            textAlignLast:   "center",
          }}
        >
          <option value="" disabled hidden />
          {item.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {!showAns && (
          <span style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", fontSize: "10px", color: "#666", pointerEvents: "none" }}>
            ▼
          </span>
        )}

        {isWrong && (
          <div style={{
            position:        "absolute",
            top:             "-8px",
            right:           "-8px",
            width:           "18px",
            height:          "18px",
            borderRadius:    "50%",
            backgroundColor: WRONG_COLOR,
            color:           "#fff",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "10px",
            fontWeight:      700,
            boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
            pointerEvents:   "none",
          }}>
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
          <span className="WB-ex-A">J</span> Look and write ✓ and ✕. Write sentences.
        </h1>

        {/* ── الأسطر الخمسة ── */}
        {ITEMS.map((item) => {
          const w1 = isWrong1(item);
          const w2 = isWrong2(item);

          return (
            <div
              key={item.id}
              style={{
                display:     "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap:         "clamp(10px,1.5vw,20px)",
                alignItems:  "center",
                width:       "100%",
              }}
            >
              {/* ── يسار: رقم + صورة نشاط + الملابس ── */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1vw,14px)", flexShrink: 0 }}>
                {/* رقم */}
                <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111", minWidth: "18px" }}>
                  {item.id}
                </span>

                {/* صورة النشاط */}
                <div style={{
                  width:        "clamp(60px,8vw,100px)",
                  aspectRatio:  "1 / 1",
                  border:       `2px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(8px,1vw,12px)",
                  overflow:     "hidden",
                  background:   "#f9f9f9",
                  flexShrink:   0,
                }}>
                  <img src={item.actImg} alt={`act-${item.id}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>

                {/* الملابس + الأيقونات */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {/* must item */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "clamp(12px,1.3vw,16px)", fontWeight: 500, color: "#111" }}>
                      {item.must.word}
                    </span>
                    <div style={{
                      width:           "clamp(22px,2.8vw,32px)",
                      height:          "clamp(22px,2.8vw,32px)",
                      borderRadius:    "6px",
                      border:          `2px solid ${CHECK_COLOR}`,
                      backgroundColor: "rgba(22,163,74,0.1)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(12px,1.5vw,18px)",
                      fontWeight:      900,
                      color:           CHECK_COLOR,
                    }}>
                      {item.must.icon}
                    </div>
                  </div>

                  {/* mustn't item */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "clamp(12px,1.3vw,16px)", fontWeight: 500, color: "#111" }}>
                      {item.mustnt.word}
                    </span>
                    <div style={{
                      width:           "clamp(22px,2.8vw,32px)",
                      height:          "clamp(22px,2.8vw,32px)",
                      borderRadius:    "6px",
                      border:          `2px solid ${WRONG_COLOR}`,
                      backgroundColor: "rgba(239,68,68,0.1)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(12px,1.5vw,18px)",
                      fontWeight:      900,
                      color:           WRONG_COLOR,
                    }}>
                      {item.mustnt.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── وسط: الجملة ── */}
              <div
                style={{
                  border:       `2px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  padding:      "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
                  background:   "#fff",
                  display:      "flex",
                  alignItems:   "center",
                  flexWrap:     "wrap",
                  gap:          "4px",
                  fontSize:     "clamp(13px,1.4vw,18px)",
                  fontWeight:   500,
                  color:        "#111",
                  lineHeight:   1.5,
                  minWidth:     0,
                }}
              >
                <span>You must wear a</span>
                {renderSelect(item, "1", w1)}
                <span>for {item.activity}, but you mustn't wear a</span>
                {renderSelect(item, "2", w2)}
                <span>.</span>
              </div>

              {/* ── يمين: صورة الشخصية ── */}
              <div style={{
                width:       "clamp(50px,7vw,85px)",
                aspectRatio: "0.6 / 1",
                flexShrink:  0,
              }}>
                <img
                  src={item.charImg}
                  alt={`char-${item.id}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          );
        })}

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