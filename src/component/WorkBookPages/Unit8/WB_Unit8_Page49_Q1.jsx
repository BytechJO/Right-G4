import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: [
      "There were horses on the farm.",
      "There weren’t horses on the farm.",
    ],
    correct: "There were horses on the farm.",
  },
  {
    id: 2,
    img: img2,
    options: [
      "They were at the bus station.",
      "They weren’t at the bus station.",
    ],
    correct: "They weren’t at the bus station.",
  },
  {
    id: 3,
    img: img3,
    options: [
      "They were watching TV at home.",
      "They weren’t watching TV at home.",
    ],
    correct: "They were watching TV at home.",
  },
  {
    id: 4,
    img: img4,
    options: ["He was at school.", "He wasn’t at school."],
    correct: "He wasn’t at school.",
  },
];

export default function WB_Unit8_Page48_QI() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!showResults) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
  };

  const renderCheckBox = (itemId, text) => {
    const selected = answers[itemId] === text;

    return (
      <button
        onClick={() => handleSelect(itemId, text)}
        style={{
          width: "44px",
          height: "44px",
          border: "2px solid #f39b42",
          borderRadius: "8px",
          backgroundColor: "#fff",
          color: selected ? "#dc2626" : "transparent",
          fontSize: "40px",
          lineHeight: "1",
          fontWeight: "700",
          cursor: showAns ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 0,
        }}
      >
        ✓
      </button>
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
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">I</span> Look, read, and write ✓.
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "360px 1fr",
                gap: "18px",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* left side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1",
                    marginTop: "10px",
                  }}
                >
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt={`question-${item.id}`}
                  style={{
                    width: "310px",
                    height: "150px",
                    objectFit: "cover",
                              border: "2px solid #f39b42",
                              borderRadius : "6%",

                    display: "block",
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* right side */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  width: "100%",
                }}
              >
                {item.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 50px",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "26px",
                        lineHeight: "1.35",
                        color: "#222",
                      }}
                    >
                      {option}
                    </p>

                    {renderCheckBox(item.id, option)}
                  </div>
                ))}
              </div>

              {isWrong(item.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "700",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
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