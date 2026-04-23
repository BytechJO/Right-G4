import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/4.svg";

const YELLOW_COLOR = "#f39b42";
const RED_COLOR = "#ef4444";
const TEXT_COLOR = "#222";

const DATA = [
  {
    id: 1,
    question: "Are they on the playground?",
    img: img1,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "Yes, they are.",
  },
  {
    id: 2,
    question: "Are they at the zoo?",
    img: img2,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "No, they aren't.",
  },
  {
    id: 3,
    question: "Are they at the clinic?",
    img: img3,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "Yes, they are.",
  },
  {
    id: 4,
    question: "Are they at the circus?",
    img: img4,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "No, they aren't.",
  },
];

const initialSelections = { 1: null, 2: null, 3: null, 4: null };

const WB_Unit9_Page54_QG = () => {
  const [userSelections, setUserSelections] = useState(initialSelections);
  const [showAnswers, setShowAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  const handleSelect = (id, option) => {
    if (showAnswers) return;
    setUserSelections((prev) => ({ ...prev, [id]: option }));
    setCheckedAnswers(false);
    setWrongAnswers({});
  };

  const checkAnswers = () => {
    const allAnswered = DATA.every((item) => userSelections[item.id] !== null);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }
    let score = 0;
    const newWrong = {};
    DATA.forEach((item) => {
      if (userSelections[item.id] === item.correct) {
        score++;
        newWrong[item.id] = false;
      } else {
        newWrong[item.id] = true;
      }
    });
    setWrongAnswers(newWrong);
    setCheckedAnswers(true);
    if (score === DATA.length) ValidationAlert.success(`Score: ${score} / ${DATA.length}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${DATA.length}`);
    else ValidationAlert.error(`Score: ${score} / ${DATA.length}`);
  };

  const handleShowAnswer = () => {
    const answers = {};
    DATA.forEach((item) => { answers[item.id] = item.correct; });
    setUserSelections(answers);
    setShowAnswers(true);
    setCheckedAnswers(false);
    setWrongAnswers({});
  };

  const handleStartAgain = () => {
    setUserSelections(initialSelections);
    setShowAnswers(false);
    setWrongAnswers({});
    setCheckedAnswers(false);
  };

  // ── لون وشكل كل option ──
  const getOptionStyle = (item, option) => {
    const isSelected = userSelections[item.id] === option;
    const isCorrect = option === item.correct;
    const isWrongSelected = checkedAnswers && wrongAnswers[item.id] && isSelected;

    const base = {
      position: "relative",
      background: "transparent",
      border: "2.5px solid transparent",
      borderRadius: "999px",
      padding: "clamp(4px,0.6vw,8px) clamp(18px,2.5vw,32px)",
      fontSize: "clamp(14px,1.8vw,20px)",
      fontWeight: "500",
      color: TEXT_COLOR,
      cursor: showAnswers ? "default" : "pointer",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    };

    if (showAnswers && isCorrect) return { ...base, border: `2.5px solid ${YELLOW_COLOR}` };
    if (isWrongSelected) return { ...base, border: `2.5px solid ${RED_COLOR}` };
    if (isSelected) return { ...base, border: `2.5px solid ${YELLOW_COLOR}` };
    return base;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px,3vw,36px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">G</span>
          Read, look, and circle.
        </h1>

        {/* Grid 2×2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(24px,4vw,48px) clamp(28px,5vw,60px)",
            width: "100%",
          }}
        >
          {DATA.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "clamp(8px,1.2vw,14px)",
                minWidth: 0,
              }}
            >
              {/* ── السؤال ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(6px,0.8vw,10px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(16px,2vw,24px)",
                    fontWeight: "700",
                    color: TEXT_COLOR,
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(14px,1.7vw,20px)",
                    fontWeight: "500",
                    color: TEXT_COLOR,
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                </span>
              </div>

              {/* ── الصورة ── */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  borderRadius: "clamp(8px,1vw,14px)",
                  border: `2px solid #d4d4d4`,
                  background: "#f5f5f5",
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.img}
                  alt={`img-${item.id}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block"                           ,  border: "2px solid #f39b42", }}
                />
              </div>

              {/* ── الخيارات تحت الصورة ── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(6px,1vw,10px)",
                  width: "100%",
                  marginTop: "clamp(2px,0.4vw,6px)",
                }}
              >
                {item.options.map((option) => {
                  const isWrongSelected =
                    checkedAnswers && wrongAnswers[item.id] && userSelections[item.id] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(item.id, option)}
                      style={getOptionStyle(item, option)}
                    >
                      {option}

                      {/* ✕ badge للإجابة الخاطئة */}
                      {isWrongSelected && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "clamp(16px,1.8vw,22px)",
                            height: "clamp(16px,1.8vw,22px)",
                            borderRadius: "50%",
                            background: RED_COLOR,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "clamp(9px,0.9vw,12px)",
                            fontWeight: "700",
                            border: "2px solid #fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                            boxSizing: "border-box",
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(4px,1vw,12px)" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit9_Page54_QG;