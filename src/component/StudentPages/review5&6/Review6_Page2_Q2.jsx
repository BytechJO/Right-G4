import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page2_Q2.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 5.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 6.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 7.svg";

const Review6_Page2_Q2 = () => {
  const [locked, setLocked] = useState(false);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const items = [
    { word: "an", correct: false, img: img1 },
    { word: "fl", correct: true, img: img2 },
    { word: "cr", correct: true, img: img3 },
    { word: "cra", correct: false, img: img4 },
    { word: "lio", correct: false, img: img5 },
    { word: "sk", correct: true, img: img6 },
  ];
  const [answers, setAnswers] = useState(Array(items.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const handleSelect = (index, value) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  const showAnswers = () => {
    const correct = items.map((item) => (item.correct ? "y" : "n"));
    setAnswers(correct);
    setShowResult(true);
    setShowedAnswer(true);
    setLocked(true);
  };
  const resetAll = () => {
    setAnswers(Array(items.length).fill(null)); // ❗ مش ""
    setShowResult(false);
    setLocked(false);
    setShowedAnswer(false);
  };
  const checkAnswers = () => {
    if (locked || showedAnswer) return;

    // ❗ لازم يجاوب الكل
    const allAnswered = answers.every((a) => a !== null);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (
        (item.correct && answers[i] === "y") ||
        (!item.correct && answers[i] === "n")
      ) {
        score++;
      }
    });

    const total = items.length; // 🔥 = 6

    const message = `
        Score: ${score} / ${total}
  `;

    setShowResult(true);
    setLocked(true);

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ width: "60%" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>E</span>
          Write <span style={{ color: "#2e3192" }}>y</span> in the blank only
          under the pictures that end with
          <span style={{ color: "#2e3192" }}>y</span>.
        </h5>
        <div className="grid grid-cols-3 gap-10">
          {items.map((item, i) => {
            const isWrong =
              showResult &&
              ((item.correct && answers[i] !== "y") ||
                (!item.correct && answers[i] !== "n"));

            return (
              <div key={i} className="relative text-center">
                {/* الصورة */}
                <img
                  src={item.img}
                  style={{ width: "90px", height: "auto" }}
                  className="mb-2 mx-auto"
                />

                {/* الكلمة + الخط */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {i + 1} {item.word}
                  </span>

                  {/* الخط + البوكسين */}
                  <div className="relative w-24">
                    {/* الخط */}
                    <div
                      className={`border-b-2 w-full h-6
                  "border-black"
              `}
                    />

                    {/* البوكسين فوق الخط */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      {/* Y */}
                      <div
                        onClick={() => handleSelect(i, "y")}
                        className={`px-2 py-0.5 border rounded text-xs font-bold cursor-pointer
                  ${answers[i] === "y" ? "bg-[#1C398E] text-white" : "bg-white"}
                  ${locked ? "cursor-not-allowed " : "hover:bg-[#1C398E]"}
                `}
                      >
                        Y
                      </div>

                      {/* NO */}
                      <div
                        onClick={() => handleSelect(i, "n")}
                        className={`px-2 py-0.5 border rounded text-xs font-bold cursor-pointer 
                  ${answers[i] === "n" ? "bg-[#1C398E] text-white" : "bg-white"}
                  ${locked ? "cursor-not-allowed " : "hover:bg-gray-200"}
                `}
                      >
                        No
                      </div>
                    </div>
                  </div>
                </div>

                {/* ❌ الغلط */}
                {isWrong && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review6_Page2_Q2;
