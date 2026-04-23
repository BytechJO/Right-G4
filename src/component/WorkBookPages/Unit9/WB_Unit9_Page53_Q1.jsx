import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/2.svg";
import img2a from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/3.svg";
import img2b from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/6.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/5.svg";
import img3b from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/4.svg";
import img4a from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/7.svg";
import img4b from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/8.svg";

const ITEMS = [
  {
    id: 1,
    sentence: "They are at the bus stop.",
    options: [
      { id: "a", img: img1a },
      { id: "b", img: img1b },
    ],
    correct: "a",
  },
  {
    id: 2,
    sentence: "She is at the train station.",
    options: [
      { id: "a", img: img2a },
      { id: "b", img: img2b },
    ],
    correct: "b",
  },
  {
    id: 3,
    sentence: "He was at school.",
    options: [
      { id: "a", img: img3a },
      { id: "b", img: img3b },
    ],
    correct: "b",
  },
  {
    id: 4,
    sentence: "They were at the airport.",
    options: [
      { id: "a", img: img4a },
      { id: "b", img: img4b },
    ],
    correct: "b",
  },
];

export default function WB_Unit8_Page53_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (questionId, optionId) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
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
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);

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
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const renderChoiceBox = (questionId, optionId) => {
    const selected = answers[questionId] === optionId;

    return (
      <div
        onClick={() => handleSelect(questionId, optionId)}
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          width: "38px",
          height: "38px",
          backgroundColor: "#fff",
          border: "2px solid #f39b42",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ? "default" : "pointer",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        {selected && (
          <span
            style={{
              color: "#ef4444",
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: "1",
            }}
          >
            ✓
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
          display: "flex",
          flexDirection: "column",
          gap: "clamp(18px,2.5vw,28px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">E</span>
          Read, look, and write ✓.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px 40px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                  }}
                >
                  {item.id}
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {item.sentence}
                </p>
              </div>

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {item.options.map((option) => (
                  <div
                    key={option.id}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "160px",
                      border: "2px solid #f39b42",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={option.img}
                      alt={`${item.id}-${option.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {renderChoiceBox(item.id, option.id)}
                  </div>
                ))}

                {isWrong(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "-8px",
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}