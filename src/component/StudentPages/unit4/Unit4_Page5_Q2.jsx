import React, { useState } from "react";
import "./Unit4_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 4.svg";
import Button from "../../Button";
const questions = [
  {
    id: 1,
    image: img1,
    options: ["His", "Our"],
    correct: "His",
    word: "cap",
    rest: "flies away.",
  },
  {
    id: 2,
    image: img2,
    options: ["Their", "Her"],
    correct: "Their",
    word: "pets",
    rest: "have fun.",
  },
  {
    id: 3,
    image: img3,
    options: ["His", "Her"],
    correct: "Her",
    word: "pet",
    rest: "wins the race.",
  },
  {
    id: 4,
    image: img4,
    options: ["Our", "His"],
    correct: "Our",
    word: "feet",
    rest: "hurt.",
  },
];
const Unit4_Page5_Q2 = () => {
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState({});
  const [wrong, setWrong] = useState({});
  const handleSelect = (qIndex, option) => {
    if (locked) return;

    setAnswers({
      ...answers,
      [qIndex]: option,
    });
  };
  // ===============================
  // 🔵 4) فحص الإجابات
  // ===============================
  const checkAnswers = () => {
    if (locked || showResult) return;

    if (Object.keys(answers).length !== questions.length) {
      return ValidationAlert.info("Oops!", "Please answer all questions.");
    }

    let correct = 0;
    const wrongMap = {};

    questions.forEach((q, qIndex) => {
      if (answers[qIndex] === q.correct) {
        correct++;
      } else {
        wrongMap[qIndex] = true;
      }
    });

    setWrong(wrongMap);
    setShowResult(true);
    setLocked(true);

    const total = questions.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    ValidationAlert[
      correct === total ? "success" : correct === 0 ? "error" : "warning"
    ](`<b style="color:${color}">Score: ${correct} / ${total}</b>`);
  };
  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, i) => {
      filled[i] = q.correct;
    });

    setAnswers(filled);
    setShowResult(true);
    setLocked(true);
  };
  const reset = () => {
    setAnswers({});
    setWrong({});
    setShowResult(false);
    setLocked(false);
  };

  // ===============================
  // 🔵 JSX
  // ===============================
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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "flex-start",
        }}
      >
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            B
          </span>
          Look, read, and choose
        </h5>
        <div className="grid grid-cols-2 gap-10 max-w-[1000px] w-full">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="flex items-center gap-4">
              <span style={{ fontWeight: "bold" }}>{q.id}</span>
              {/* الصورة */}
              <img
                src={q.image}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />

              {/* الخيارات فوق بعض */}
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => {
                  const isSelected = answers[qIndex] === opt;
                  const isWrong = wrong[qIndex];

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(qIndex, opt)}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        padding: "2px 6px",
                        width: "fit-content",
                      }}
                    >
                      {/* النص */}
                      <span
                        style={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        {opt}
                      </span>

                      {/* ✅ الدائرة */}
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "50px",
                            height: "50px",
                            border: `2px solid ${isWrong ? "red" : "#1C398E"}`,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                          }}
                        >
                          {/* ❌ X */}
                          {showResult && isWrong && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-6px",
                                right: "-6px",
                                width: "20px",
                                height: "20px",
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
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* الخط الأول */}
              <div
                style={{
                  width: "1px", // ⭐ أهم تعديل
                  height: "1.5em", // ⭐ مرتبط بالنص
                  background: "#444",
                  alignSelf: "center",
                }}
              />

              {/* الكلمة */}
              <span className="text-[16px]">{q.word}</span>

              {/* الخط الثاني */}
              <div
                style={{
                  width: "1px", // ⭐ أهم تعديل
                  height: "1.5em", // ⭐ مرتبط بالنص
                  background: "#444",
                  alignSelf: "center",
                }}
              />

              {/* باقي الجملة */}
              <span className="text-[16px]">{q.rest}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit4_Page5_Q2;
