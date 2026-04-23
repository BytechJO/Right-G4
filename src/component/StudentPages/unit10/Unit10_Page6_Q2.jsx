import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 110.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 111.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 112.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 113.svg";

const Unit10_Page6_Q2 = () => {
  const questions = [
    {
      img: img1,
      q: "Where will Tom go?",
      blank: ["go", "He’ll", "the", "to", "park"],
      correct: "He’ll go to the park",
    },
    {
      img: img2,
      q: "Where will Helen go?",
      blank: ["the", "go", "restaurant", "She’ll", "to"],
      correct: "She’ll go to the restaurant",
    },
    {
      img: img3,
      q: "Where will Harley go?",
      blank: ["to", "go", "the", "store", "He’ll", "toy"],
      correct: "He’ll go to the toy store",
    },
    {
      img: img4,
      q: "Where will Stella go?",
      blank: ["to", "go", "office", "She’ll", "the", "post"],
      correct: "She’ll go to the post office",
    },
  ];
  const correct = {};
  questions.forEach((q, i) => {
    correct[i] = q.correct;
  });
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const addWord = (qIndex, word) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [qIndex]: prev[qIndex] ? [...prev[qIndex], word] : [word],
    }));
  };
  const removeWord = (qIndex, index) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev[qIndex]];
      updated.splice(index, 1);

      return {
        ...prev,
        [qIndex]: updated,
      };
    });
  };
  const reset = () => {
    setAnswers({});
    setLocked(false);
  };

  const showAnswers = () => {
    const formatted = {};

    questions.forEach((q, i) => {
      formatted[i] = q.correct.split(" "); // 🔥 أهم سطر
    });

    setAnswers(formatted);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;
    let score = 0;

    Object.keys(correct).forEach((key) => {
      const userAnswer = answers[key]?.join(" ");
      if (userAnswer === correct[key]) score++;
    });
    const empty = questions.some((_, i) => !answers[i]);

    if (empty) {
      ValidationAlert.info();
      return;
    }
    const total = questions.length;
    if (score < total) {
      ValidationAlert.warning(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:orange;">Score: ${score} / ${total}</b>
        </div>
      `);
    } else {
      ValidationAlert.success(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:green;">Score: ${score} / ${total}</b>
        </div>
      `);
    }

    setLocked(true);
  };
  const isWrong = (index) => {
    if (!locked) return false;

    const userAnswer = answers[index]?.join(" ");
    return userAnswer !== questions[index].correct;
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
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-5">E</span>Write.
        </h5>
        {questions.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            {/* اليسار: السؤال + الكلمات */}
            <div>
              {/* رقم + السؤال */}
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <span style={{ fontWeight: "bold" }}>{i + 1}</span>
                <p style={{ margin: 0 }}>{item.q}</p>
              </div>

              {/* الكلمات */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {item.blank.map((word, index) => {
                  const isUsed = answers[i]?.includes(word);

                  return (
                    <div
                      key={index}
                      onClick={() => !isUsed && addWord(i, word)}
                      style={{
                        padding: "6px 12px",
                        border: "2px solid orange",
                        borderRadius: "8px",
                        cursor: isUsed ? "not-allowed" : "pointer",
                        opacity: isUsed ? 0.4 : 1,
                      }}
                    >
                      {word}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  minHeight: "40px",
                  borderBottom: isWrong(i)
                    ? "2px solid red"
                    : "2px solid black",
                  marginBottom: "10px",
                  padding: "5px",
                  fontWeight: "bold",
                  width: "350px",
                  fontSize: "18px",
                  position: "relative", // 🔥 مهم
                }}
              >
                {answers[i]?.map((word, idx) => (
                  <span
                    key={idx}
                    onClick={() => removeWord(i, idx)}
                    style={{
                      marginRight: "8px",
                      cursor: "pointer",
                      color: "#1e3a8a",
                    }}
                  >
                    {word}
                  </span>
                ))}
                {isWrong(i) && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      right: "-40px",
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
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </div>

            {/* اليمين: الصورة */}
            <img
              src={item.img}
              alt="question"
              style={{
                width: "180px",
                height: "auto",
                objectFit: "contain",
                marginLeft: "10px",
              }}
            />
          </div>
        ))}
        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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

export default Unit10_Page6_Q2;
