import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";


import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.6.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";

const ICON = {
  must:    { symbol: "✓", bg: "rgba(255, 255, 255, 1)", border: "#000000ff", color: "#000000ff" },
  mustn_t: { symbol: "✕", bg: "rgba(255, 255, 255, 1)", border: "#000000ff", color: "#000000ff" },
};

const OPTIONS = ["must", "mustn't"];

const ITEMS = [
  { id: 1, img: img1, icon: "mustn_t", before: "She",  after: "eat the cake.",        correct: "mustn't" },
  { id: 2, img: img2, icon: "must",    before: "She",  after: "go to school.",         correct: "must"    },
  { id: 3, img: img3, icon: "mustn_t", before: "They", after: "play in the street.",   correct: "mustn't" },
  { id: 4, img: img4, icon: "must",    before: "She",  after: "eat fruit.",            correct: "must"    },
  { id: 5, img: img5, icon: "must",    before: "They", after: "wash the dishes.",      correct: "must"    },
  { id: 6, img: img6, icon: "mustn_t", before: "He",   after: "watch TV.",             correct: "mustn't" },
];

export default function WB_LookReadWrite_PageE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (answers[i.id] === i.correct) score++; });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = i.correct; });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .wb-e-select {
          height: clamp(30px,3.5vw,42px);
          border: none;
          border-bottom: 2.5px solid #2f2f2f;
          background: transparent;
          padding: 0 24px 0 4px;
          font-size: clamp(14px,1.6vw,20px);
          font-weight: 700;
          color: #000000ff;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          min-width: clamp(80px,9vw,120px);
          text-align: center;
          text-align-last: center;
        }

        .wb-e-select.wrong {
          border-bottom-color: #000000ff;
          color: #000000ff;
        }

        .wb-e-select:disabled {
          opacity: 1;
          cursor: default;
        }

        .wb-e-arrow {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: #666;
          pointer-events: none;
        }

        .wb-e-wrong-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          width: clamp(16px,1.8vw,20px);
          height: clamp(16px,1.8vw,20px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px,0.9vw,11px);
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          pointer-events: none;
        }
      `}</style>

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
          <span className="WB-ex-A">E</span> Look, read, and write.
        </h1>

        {/* ── Cards Grid 2×3 ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(16px,2.5vw,30px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const value   = answers[item.id] || "";
            const wrong   = isWrong(item);
            const iconCfg = ICON[item.icon];

            return (
              <div
                key={item.id}
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "clamp(8px,1vw,12px)",
                }}
              >
                {/* رقم */}
                <span style={{ fontSize: "clamp(16px,1.8vw,24px)", fontWeight: 700, color: "#111" }}>
                  {item.id}
                </span>

                {/* الصورة + أيقونة */}
                <div
                  style={{
                    position:     "relative",
                    width:        "100%",
                    aspectRatio:  "1.55 / 1",
                    border:       `2px solid ${BORDER_COLOR}`,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    overflow:     "hidden",
                    background:   "#f7f7f7",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* أيقونة ✓/✕ */}
                  <div
                    style={{
                      position:        "absolute",
                      bottom:          "8px",
                      right:           "8px",
                      width:           "clamp(26px,3.5vw,40px)",
                      height:          "clamp(26px,3.5vw,40px)",
                      borderRadius:    "8px",
                      backgroundColor: iconCfg.bg,
                      border:          `2px solid ${iconCfg.border}`,
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(14px,2vw,22px)",
                      fontWeight:      900,
                      color:           iconCfg.color,
                    }}
                  >
                    {iconCfg.symbol}
                  </div>
                </div>

                {/* الجملة مع select */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "flex-end",
                    flexWrap:   "wrap",
                    gap:        "6px",
                  }}
                >
                  <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111", paddingBottom: "4px" }}>
                    {item.before}
                  </span>

                  {/* Select */}
                  <div className="wb-e-select-wrap" style={{ position: "relative" }}>
                    <select
                      disabled={showAns}
                      value={value}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      className={`wb-e-select${wrong ? " wrong" : ""}`}
                    >
                      <option value="" disabled hidden />
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    {!showAns && <span className="wb-e-arrow">▼</span>}

                    {wrong && <div className="wb-e-wrong-badge">✕</div>}
                  </div>

                  <span style={{ fontSize: "clamp(14px,1.6vw,20px)", fontWeight: 500, color: "#111", paddingBottom: "4px" }}>
                    {item.after}
                  </span>
                </div>
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
    </div>
  );
}