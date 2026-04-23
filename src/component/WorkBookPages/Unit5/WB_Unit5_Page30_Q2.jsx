import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ── House image (one full image)
import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H1.svg";

// ── Character images
import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H2.svg";
import boyImg  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H3.svg";

// ── Bottom item images
import armchairImg  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H4.svg";
import chairImg     from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H5.svg";
import bathtubImg   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H6.svg";
import fridgeImg    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H7.svg";
import telephoneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/H8.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const RED_COLOR    = "#000000ff";

const LABELS = [
  { id: 1, correct: "bedroom",     style: { top: "12%", left: "30%" } },
  { id: 2, correct: "living room", style: { top: "12%", left: "72%" } },
  { id: 3, correct: "bathroom",    style: { top: "58%", left: "30%" } },
  { id: 4, correct: "kitchen",     style: { top: "58%", left: "72%" } },
];

const OPTIONS = ["bedroom", "living room", "bathroom", "kitchen"];

const BOTTOM_ITEMS = [
  { id: 1, img: armchairImg,  alt: "armchair"  },
  { id: 2, img: chairImg,     alt: "chair"     },
  { id: 3, img: bathtubImg,   alt: "bathtub"   },
  { id: 4, img: fridgeImg,    alt: "fridge"    },
  { id: 5, img: telephoneImg, alt: "telephone" },
];

export default function WB_Unit5_Page30_Q2() {
  const [selected, setSelected] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns]         = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = LABELS.every((l) => selected[l.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    LABELS.forEach((l) => { if (selected[l.id] === l.correct) score++; });
    setShowResults(true);
    if (score === LABELS.length)      ValidationAlert.success(`Score: ${score} / ${LABELS.length}`);
    else if (score > 0)               ValidationAlert.warning(`Score: ${score} / ${LABELS.length}`);
    else                              ValidationAlert.error(`Score: ${score} / ${LABELS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    LABELS.forEach((l) => { filled[l.id] = l.correct; });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({ 1: "", 2: "", 3: "", 4: "" });
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (label) =>
    showResults && selected[label.id] !== label.correct;

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
        {/* ── Title ── */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">H</span> Label the rooms and ask a friend.
        </h1>

        {/* ── House image + overlaid dropdowns ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            border: `2px solid ${BORDER_COLOR}`,
            borderRadius: "clamp(12px, 1.4vw, 18px)",
            overflow: "hidden",
            background: "#f7f7f7",
          }}
        >
          <img
            src={houseImg}
            alt="house rooms"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {LABELS.map((label) => {
            const wrong = isWrong(label);
            return (
              <div
                key={label.id}
                style={{
                  position: "absolute",
                  ...label.style,
                  transform: "translateX(-50%)",
                  zIndex: 2,
                }}
              >
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    disabled={showAns}
                    value={selected[label.id]}
                    onChange={(e) => handleChange(label.id, e.target.value)}
                    style={{
                      background: "#fff",
                      border: `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                      borderRadius: "999px",
                      padding: "clamp(3px,0.5vw,6px) clamp(10px,1.5vw,20px)",
                      fontSize: "clamp(12px,1.5vw,18px)",
                      fontWeight: 700,
                      color: RED_COLOR,
                      cursor: showAns ? "default" : "pointer",
                      outline: "none",
                      appearance: "auto",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                      minWidth: "clamp(100px,14vw,180px)",
                    }}
                  >
                    <option value="" disabled hidden></option>
                    {OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        width: "clamp(16px,1.8vw,22px)",
                        height: "clamp(16px,1.8vw,22px)",
                        borderRadius: "50%",
                        backgroundColor: WRONG_COLOR,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(9px,0.9vw,12px)",
                        fontWeight: 700,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        zIndex: 3,
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

        {/* ── Dialogue section: girl LEFT | boy RIGHT ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(10px,2vw,24px)",
            flexWrap: "wrap",
          }}
        >
          {/* ── Girl + her bubbles ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px,1vw,14px)",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Bubbles LEFT of girl */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,0.8vw,10px)",
                alignItems: "flex-end",
              }}
            >
              {[
                "Where's the telephone?",
                "Is there a bathtub in the kitchen?",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "2px solid #ccc",
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    padding:
                      "clamp(5px,0.7vw,9px) clamp(10px,1.3vw,16px)",
                    fontSize: "clamp(12px,1.4vw,17px)",
                    fontWeight: 500,
                    color: "#222",
                    maxWidth: "clamp(160px,24vw,280px)",
                    lineHeight: 1.3,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>

            {/* Girl image */}
            <img
              src={girlImg}
              alt="girl"
              style={{
                height: "clamp(70px,11vw,130px)",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>

          {/* ── Boy + his bubbles ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px,1vw,14px)",
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-end",
            }}
          >
            {/* Boy image */}
            <img
              src={boyImg}
              alt="boy"
              style={{
                height: "clamp(70px,11vw,130px)",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            {/* Bubbles RIGHT of boy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,0.8vw,10px)",
                alignItems: "flex-start",
              }}
            >
              {["It's in the living room.", "No, there isn't."].map(
                (text, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "2px solid #ccc",
                      borderRadius: "clamp(10px,1.2vw,16px)",
                      padding:
                        "clamp(5px,0.7vw,9px) clamp(10px,1.3vw,16px)",
                      fontSize: "clamp(12px,1.4vw,17px)",
                      fontWeight: 500,
                      color: "#222",
                      maxWidth: "clamp(160px,24vw,280px)",
                      lineHeight: 1.3,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    }}
                  >
                    {text}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom item images ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "clamp(14px,2.5vw,36px)",
            flexWrap: "wrap",
            padding: "clamp(6px,1vw,12px) 0",
          }}
        >
          {BOTTOM_ITEMS.map((item) => (
            <img
              key={item.id}
              src={item.img}
              alt={item.alt}
              style={{
                height: "clamp(55px,9vw,105px)",
                width: "auto",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* ── Buttons ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
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