/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 15.svg";
import img16 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 16.svg";
import img17 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 17.svg";
import img18 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 18.svg";
import img19 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 19.svg";
import img20 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 20.svg";
import img21 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 91/Ex C 21.svg";

const Review10_Page2_Q1 = () => {
  const options = [
    { key: "cr", color: "red" },
    { key: "dr", color: "blue" },
    { key: "tr", color: "green" },
  ];

  const questions = [
    { id: 1, img: img1, word: "train", correct: "tr" },
    { id: 2, img: img2, word: "cry", correct: "cr" },
    { id: 3, img: img3, word: "draw", correct: "dr" },
    { id: 4, img: img4, word: "truck", correct: "tr" },
    { id: 5, img: img5, word: "crescent", correct: "cr" },
    { id: 6, img: img6, word: "drop", correct: "dr" },
    { id: 7, img: img7, word: "tree", correct: "tr" },

    { id: 8, img: img8, word: "crown", correct: "cr" },
    { id: 9, img: img9, word: "drapes", correct: "dr" },
    { id: 10, img: img10, word: "drill", correct: "dr" },
    { id: 11, img: img11, word: "crab", correct: "cr" },
    { id: 12, img: img12, word: "traffic light", correct: "tr" },
    { id: 13, img: img13, word: "drain", correct: "dr" },
    { id: 14, img: img14, word: "triangle", correct: "tr" },

    { id: 15, img: img15, word: "dress", correct: "dr" },
    { id: 16, img: img16, word: "trash", correct: "tr" },
    { id: 17, img: img17, word: "crowd", correct: "cr" },
    { id: 18, img: img18, word: "cream", correct: "cr" },
    { id: 19, img: img19, word: "driver", correct: "dr" },
    { id: 20, img: img20, word: "treasure", correct: "tr" },
    { id: 21, img: img21, word: "drink", correct: "dr" },
  ];
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectAnswer = (id) => {
    if (!selectedOption || locked) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: selectedOption.key,
    }));
  };
  const showAnswers = () => {
    const corrects = {};
    questions.forEach((q) => {
      corrects[q.id] = q.correct; // ✓ أو ✗
    });

    setAnswers(corrects);
    setShowResult([]); // إخفاء كل X
    setLocked(true); // 🔒 قفل التعديل
  };

  const checkAnswers = () => {
    if (locked) return;
    // 1) فحص الخانات الفارغة
    const isEmpty = questions.some((q) => !answers[q.id]);
    if (isEmpty) {
      ValidationAlert.info("Please choose ✓ or ✗ for all questions!");
      return;
    }

    // 2) مقارنة الإجابات
    const results = questions.map((q) =>
      answers[q.id] === q.correct ? "correct" : "wrong",
    );

    setShowResult(results);
    setLocked(true); // 🔒 قفل التعديل
    // 3) حساب السكور
    const correctCount = results.filter((r) => r === "correct").length;
    const total = questions.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${scoreMsg}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers({});
    setShowResult([]);
    setLocked(false); // ← مهم جداً
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "15px" }}>C</span>
          Color each box according to the sound you hear in the word.
        </h5>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelectedOption(opt)}
              style={{
                backgroundColor: opt.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                color: "white",
                margin: "10px",
                padding: "10px 20px",
                border:
                  selectedOption?.key === opt.key ? "3px solid black" : "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              {opt.key}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "15px",
            marginBottom: "50px",
          }}
        >
          {questions.map((q, index) => {
            const userAnswer = answers[q.id];
            const selectedOpt = options.find((o) => o.key === userAnswer);

            return (
              <div
                key={q.id}
                onClick={() => handleSelectAnswer(q.id)}
                style={{
                  position: "relative",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* 🖼️ بوكس الصورة */}
                <div
                  onClick={() => handleSelectAnswer(q.id)}
                  style={{
                    border: "2px solid #f4a261",
                    borderRadius: "10px",
                    padding: "5px",
                    width: "100%",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#fff",
                  }}
                >
                  <img
                    src={q.img}
                    alt=""
                    style={{ width: "100%", height: "70px" }}
                  />

                  {/* الكلمة داخل نفس البوكس */}
                  <div style={{ marginTop: "5px", fontWeight: "bold" }}>
                    {q.word}
                  </div>
                </div>

                {/* 🎨 بوكس التلوين (منفصل) */}
                <div
                  style={{
                    marginTop: "5px",
                    width: "80%",
                    height: "25px",
                    border: "2px solid #f4a261",
                    borderRadius: "8px",
                    backgroundColor: userAnswer
                      ? selectedOpt?.color
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {userAnswer}
                </div>

                {/* ✅ ❌ */}
                {showResult[index] === "wrong" && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-10px",
                      top: "90%",
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
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                        transform: "translateY(-1px)",
                      }}
                    >
                      ✕
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="action-buttons-container">
          <button onClick={resetAnswers} className="try-again-button">
            Start Again ↻
          </button>
          {/* ⭐⭐⭐ NEW — زر Show Answer */}
          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
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

export default Review10_Page2_Q1;
