import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 4.svg";
import "./Review10_Page1_Q2.css";
const Review10_Page1_Q2 = () => {
  const questions = [
    {
      img: img1,
      q: "What will she do on the weekend?",
      type: "fixed",
      answer: "She will read a book.",
    },
    {
      img: img2,
      q: "What will they do on the weekend?",
      type: "input",
      blank: ["will", "They", "eat", "at", "restaurant", "a"],
      correct: "They will eat at a restaurant",
    },
    {
      img: img3,
      type: "reverse",
      answer: "He will build a sandcastle.",
      blank: ["he", "What", "do", "will", "weekend", "the", "on"],
      correct: "What will he do on the weekend",
    },
    {
      img: img4,
      q: "What will she do on the weekend?",
      type: "input",
      blank: ["do", "She", "homework", "will", "her"],
      correct: "She will do her homework",
    },
  ];

  const correct = {};
  questions.forEach((q, i) => {
    if (q.type === "input" || q.type === "reverse") {
      correct[i] = q.correct;
    }
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
      return { ...prev, [qIndex]: updated };
    });
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
  };

  const showAnswers = () => {
    const formatted = {};
    questions.forEach((q, i) => {
      if (q.type === "input" || q.type === "reverse") {
        formatted[i] = q.correct.split(" ");
      }
    });
    setAnswers(formatted);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    let score = 0;

    const empty = questions.some(
      (q, i) => (q.type === "input" || q.type === "reverse") && !answers[i],
    );
    if (empty) {
      ValidationAlert.info();
      return;
    }

    Object.keys(correct).forEach((key) => {
      const userAnswer = answers[key]?.join(" ");
      if (userAnswer === correct[key]) score++;
    });

    const total = Object.keys(correct).length;
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
          <span className="mr-3">B</span>Look, read, and write the questions or
          answers.
        </h5>

        <div className="questions-grid mb-20">
          {questions.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                height: "300px",
              }}
            >
              {/* الرقم - جزء من الـ flex بدل absolute */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  minWidth: "24px",
                  paddingTop: "4px",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              {/* محتوى السؤال */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",

                  flex: 1,
                  height: "100%", // 🔥 مهم
                  justifyContent: "space-between",
                }}
              >
                {/* الصورة */}
                <img
                  src={item.img}
                  alt="question"
                  style={{
                    width: "200px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />

                {/* نص السؤال */}
                {item.q && (
                  <p style={{ margin: 0, fontWeight: "500" }}>{item.q}</p>
                )}

                {/* نوع fixed */}
                {item.type === "fixed" && (
                  <div
                    style={{
                      borderBottom: "2px solid black",
                      padding: "5px 0",
                      fontWeight: "bold",
                      width: "250px",
                      color: "#000",
                    }}
                  >
                    {item.answer}
                  </div>
                )}

                {/* أنواع input و reverse */}
                {(item.type === "input" || item.type === "reverse") && (
                  <>
                    {/* حبات الكلمات */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
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
                              fontSize: "14px",
                              userSelect: "none",
                              transition: "opacity 0.2s",
                            }}
                          >
                            {word}
                          </div>
                        );
                      })}
                    </div>

                    {/* خط الإجابة */}
                    <div
                      style={{
                        minHeight: "40px",
                        borderBottom: isWrong(i)
                          ? "2px solid red"
                          : "2px solid black",
                        padding: "5px 0",
                        fontWeight: "bold",
                        width: "250px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "4px",
                        position: "relative",
                      }}
                    >
                      {answers[i]?.map((word, idx) => (
                        <span
                          key={idx}
                          onClick={() => removeWord(i, idx)}
                          style={{
                            cursor: locked ? "default" : "pointer",
                            color: "#1e3a8a",
                          }}
                        >
                          {word}
                        </span>
                      ))}
                      <span
                        style={{
                          position: "absolute",
                          right: "0",
                          bottom: "-2px", // 🔥 على الخط نفسه
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {item.type === "reverse" ? "?" : "."}
                      </span>
                      {isWrong(i) && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-30px",
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

                    {/* الجواب النهائي يظهر فقط لنوع reverse */}
                    {item.type === "reverse" && (
                      <div
                        style={{
                          padding: "5px 0",
                          fontWeight: "bold",
                          width: "250px",
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* الأزرار */}
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

export default Review10_Page1_Q2;
