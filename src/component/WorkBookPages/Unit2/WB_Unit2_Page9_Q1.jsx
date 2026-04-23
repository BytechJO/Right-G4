import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 5.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 4.svg";

const WRONG_COLOR = "#ef4444";
const BORDER_COLOR = "#f39b42";

const OPTIONS = [
  "take a taxi",
  "take a subway",
  "take a bus",
  "ride a bike",
];

const ANSWERS = [
  { id: 1, correct: "take a subway", img: img1 },
  { id: 2, correct: "ride a bike",   img: img2 },
  { id: 3, correct: "take a bus",    img: img3 },
  { id: 4, correct: "take a taxi",   img: img4 },
];

export default function WB_Transport_Dropdown() {
  const [selected, setSelected]     = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns]       = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ANSWERS.every((a) => selected[a.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ANSWERS.forEach((a) => { if (selected[a.id] === a.correct) score++; });
    setShowResults(true);
    if (score === ANSWERS.length)    ValidationAlert.success(`Score: ${score} / ${ANSWERS.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${ANSWERS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${ANSWERS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ANSWERS.forEach((a) => { filled[a.id] = a.correct; });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({ 1: "", 2: "", 3: "", 4: "" });
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && selected[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">A</span> Look and write.
        </h1>

        {/* ── Main layout: word bank LEFT  |  grid RIGHT ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(140px, 0.65fr) minmax(0, 1fr)",
            gap: "clamp(16px, 2vw, 28px)",
            alignItems: "start",
            width: "100%",
          }}
        >
          {/* Word Bank */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "clamp(160px, 20vw, 230px)",
                border: `2px solid ${BORDER_COLOR}`,
                borderRadius: "clamp(12px, 1.4vw, 18px)",
                padding: "clamp(12px, 1.8vw, 22px) clamp(10px, 1.4vw, 16px)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px, 1vw, 12px)",
                background: "#fff",
              }}
            >
              {OPTIONS.map((opt) => (
                <div
                  key={opt}
                  style={{
                    textAlign: "center",
                    fontSize: "clamp(14px, 1.6vw, 22px)",
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.3,
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* 2×2 Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "clamp(24px, 3.5vw, 48px) clamp(16px, 2.5vw, 36px)",
              width: "100%",
            }}
          >
            {ANSWERS.map((item) => {
              const wrong = isWrong(item);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "clamp(8px, 1.2vw, 14px)",
                    minWidth: 0,
                  }}
                >
                  {/* Number + Image row */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(6px, 0.8vw, 12px)", width: "100%" }}>
                    <span
                      style={{
                        fontSize: "clamp(18px, 2.2vw, 30px)",
                        fontWeight: "700",
                        color: "#111",
                        lineHeight: 1,
                        paddingTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      {item.id}
                    </span>

                    <div
                      style={{
                        flex: 1,
                        borderRadius: "clamp(10px, 1.2vw, 18px)",
                        overflow: "hidden",
                        border: `2px solid ${BORDER_COLOR}`,
                        background: "#f7f7f7",
                        aspectRatio: "1.85 / 1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={`transport-${item.id}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  </div>

                  {/* Dropdown answer */}
                  <div style={{ width: "100%", position: "relative" }}>
                    <select
                      disabled={showAns}
                      value={selected[item.id]}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        width: "100%",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: `3px solid ${wrong ? WRONG_COLOR : "#3f3f3f"}`,
                        borderRadius: 0,
                        outline: "none",
                        fontSize: "clamp(16px, 2vw, 26px)",
                        fontWeight: 500,
                        color: "#000" ,
                        padding: "4px clamp(4px, 0.8vw, 10px) 4px 2px",
                        background: "transparent",
                        cursor: showAns ? "default" : "pointer",
                        appearance: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Wrong badge */}
                    {wrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "clamp(18px, 2.2vw, 28px)",
                          transform: "translateY(-50%)",
                          width: "clamp(16px, 1.8vw, 22px)",
                          height: "clamp(16px, 1.8vw, 22px)",
                          borderRadius: "50%",
                          backgroundColor: WRONG_COLOR,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(9px, 0.9vw, 12px)",
                          fontWeight: 700,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(8px, 1.5vw, 14px)" }}>
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