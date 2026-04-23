import React, { useState } from "react";
import "./Review8_Page1_Q1.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 72/Review 8.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const Review8_Page1_Q1 = () => {
  const items = [
    {
      text: "Was the teacher in the classroom?",
      options: ["yes", "no"],
      correct: "yes",
    },
    {
      text: "What was her name?",
      options: ["Miss Rose", "Miss Anna", "Miss Sara"],
      correct: "Miss Rose",
    },
    {
      text: "Were the students in the classroom?",
      options: ["yes", "no"],
      correct: "no",
    },
    {
      text: "Was there a clock in the classroom?",
      options: ["yes", "no"],
      correct: "no",
    },
    {
      text: "Where were the students?",
      options: ["in the classroom", "outside the classroom", "at the door"],
      correct: "outside the classroom",
    },
  ];
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [showResult, setShowResult] = useState(false);

  const [locked, setLocked] = useState(false);

  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);
  };
  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLocked(true);
  };
  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
    setShowResult(true); // 🔥 مهم
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{ width: "60%", marginBottom: "40px" }}
      >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>A</span>
          Read and look at the picture. Then answer the questions.
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={img1}
            style={{
              width: "650px",
              height: "auto",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
        </div>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-6 flex-wrap">
              {/* السؤال */}
              <span className="text-base">
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  {i + 1}
                </span>
                {item.text}
              </span>

              {/* الخيارات */}
              <div className="flex items-center gap-4">
                {item.options.map((opt, idx) => (
                  <span
                    key={idx}
                    onClick={() => chooseOption(i, opt)}
                    style={{
                      position: "relative", // 🔥 مهم
                      padding: "6px 12px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      border:
                        selected[i] === opt
                          ? locked
                            ? opt === item.correct
                              ? "2px solid #1C398E"
                              : "2px solid red"
                            : "2px solid #1C398E"
                          : "2px solid transparent",

                      transition: "0.2s",
                      fontWeight: "bold",
                    }}
                  >
                    {opt}

                    {showResult &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <span
                          style={{
                            position: "absolute",
                            right: "-18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </span>
                      )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={resetAll}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Review8_Page1_Q1;
