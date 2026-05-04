import React, { useState } from "react";
import "./Unit3_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 4.svg";

const questions = [
  {
    id: 1,
    text: "Do they have any vegetables?",
    image: img1,
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    text: "Does she have any hats?",
    image: img2,
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    text: "Do they have any hot drinks?",
    image: img3,
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 4,
    text: "Does she have any ice cream?",
    image: img4,
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "No, she doesn’t have any.",
  },
];

export default function CircleQuestions() {
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qId, option) => {
    if (showResult) return;
    setAnswers({ ...answers, [qId]: option });
  };

  // ✅ CHECK
  const checkAnswers = () => {
    if (showResult) return;

    if (Object.keys(answers).length !== questions.length) {
      ValidationAlert.info(
        "Oops!",
        "Please answer all questions before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrong = {};

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
        wrong[q.id] = false;
      } else {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);
    setShowResult(true);

    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ✅ SHOW ANSWERS
  const showAnswers = () => {
    const correct = {};
    questions.forEach((q) => {
      correct[q.id] = q.correct;
    });

    setAnswers(correct);
    setWrongAnswers({});
    setShowResult(true);
  };

  // ✅ RESET
  const reset = () => {
    setAnswers({});
    setWrongAnswers({});
    setShowResult(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        paddingBottom: "120px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // 🔥 عمودين
            gap: "40px 60px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {questions.map((q) => (
            <div
              key={q.id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* QUESTION */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontWeight: "bold", color: "#2c5287" }}>
                  {q.id}
                </span>
                <span>{q.text}</span>
              </div>

              {/* IMAGE */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  aspectRatio: "16 / 9",
                  border: "3px solid orange",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={q.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    transform: "scale(1.1)", // 🔥 الحل
                  }}
                />
              </div>
              {/* OPTIONS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrect = opt === q.correct;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(q.id, opt)}
                      style={{
                        cursor: "pointer",
                        padding: "8px 16px",
                        borderRadius: "25px",
                        border: "2px solid",
                        width: "fit-content",
                        fontSize: "16px",

                        borderColor: isSelected
                          ? showResult
                            ? isCorrect
                              ? "#1C398E"
                              : "red"
                            : "#1C398E"
                          : "#ccc",

                        color: isSelected ? "#1C398E" : "black",

                        background: "#fff",
                      }}
                    >
                      {opt}

                      {/* ❌ WRONG */}
                      {showResult && isSelected && !isCorrect && (
                        <span
                          style={{
                            marginLeft: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "18px",
                            height: "18px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "12px",
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
