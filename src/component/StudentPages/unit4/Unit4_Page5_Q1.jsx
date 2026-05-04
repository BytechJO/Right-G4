import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import image from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex A 1.svg";
import Button from "../../Button";

const Unit4_Page5_Q1 = () => {
  const [selected, setSelected] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
  // ✅ الكلمات + أماكنها (بالنسب)
  const words = [
    { id: "they", top: "23.32%", left: "32.21%", correct: true },
    { id: "that", top: "49.82%", left: "14.31%", correct: true },
    { id: "this", top: "48.10%", left: "43%", correct: true },
    { id: "mother", top: "30.25%", left: "59.5%", correct: true },
    { id: "brother", top: "65.43%", left: "79.94%", correct: true },
    { id: "father", top: "93.68%", left: "23.92%", correct: true },
    { id: "birthday", top: "73%", left: "60%", correct: true },

    // ❌ غلط
    { id: "bath", top: "10.53%", left: "79.13%", correct: false },
    { id: "thirsty", top: "73.42%", left: "16.03%", correct: false },
    { id: "thick", top: "73%", left: "38%", correct: false },
    { id: "thin", top: "92.48%", left: "45.68%", correct: false },
  ];

  const handleClick = (word) => {
    if (locked) return;

    const exists = selected.find((w) => w.id === word.id);

    if (exists) {
      setSelected(selected.filter((w) => w.id !== word.id));
    } else {
      setSelected([...selected, word]);
    }
  };

  const handleCheck = () => {
    if (locked || showAnswer) return;
    if (locked || showAnswer) return;

    const totalCorrect = words.filter((w) => w.correct).length;

    // ❌ ما اختار ولا شي
    if (selected.length === 0) {
      return ValidationAlert.info();
    }

    let correctCount = 0;
    let wrong = [];

    selected.forEach((w) => {
      if (w.correct) {
        correctCount++;
      } else {
        wrong.push(w.id);
      }
    });

    setWrongWords(wrong);
    setLocked(true);

    const color =
      correctCount === totalCorrect
        ? "green"
        : correctCount === 0
          ? "red"
          : "orange";

    ValidationAlert[
      correctCount === totalCorrect
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning"
    ](`<b style="color:${color}">Score: ${correctCount} / ${totalCorrect}</b>`);

    setLocked(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setLocked(true);
    setSelected(words.filter((w) => w.correct));
  };

  const handleReset = () => {
    setSelected([]);
    setWrongWords([]);
    setLocked(false);
    setShowAnswer(false);
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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "flex-start",
        }}
      >
        <div className="unscramble-container">
          <h5 className="header-title-page8 pb-2.5">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              A
            </span>
            Follow the words with the
            <span style={{ color: "#2e3192" }}>voiced th</span>sound.
          </h5>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px", // ⭐ تحكم بالحجم العام
              margin: "0 auto",
            }}
          >
            {/* الصورة */}
            <img
              src={image}
              alt="interactive"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            {/* START */}
            <div
              style={{
                position: "absolute",
                top: "10.53%",
                left: "10.18%",
                transform: "translate(-50%, -50%) rotate(-15deg)",
                fontSize: "clamp(20px, 1vw, 16px)",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              Start
            </div>

            {/* FINISH */}
            <div
              style={{
                position: "absolute",
                top: "82.75%",
                left: "88.65%",
                transform: "translate(-50%, -50%) rotate(-15deg)",
                fontSize: "clamp(20px, 1vw, 16px)",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              Finish
            </div>
            {/* ✅ الدوائر */}
            {selected.map((word, i) => {
              const isWrong = wrongWords.includes(word.id);

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: word.top,
                    left: word.left,
                    width: "10%",
                    height: "16%",
                    border: `0.2vw solid ${isWrong ? "red" : "#1C398E"}`, // 🔥 التغيير
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                >
                  {/* ❌ X */}
                  {isWrong && (
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
              );
            })}

            {/* ✅ مناطق الضغط */}
            {words.map((word, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleClick(word)}
                  style={{
                    position: "absolute",
                    top: word.top,
                    left: word.left,
                    transform: "translate(-50%, -50%)",
                    fontSize: "clamp(10px, 1vw, 16px)",
                    padding: "0.2vw 0.6vw",
                    borderRadius: "0.5vw",
                    whiteSpace: "nowrap",
                    cursor: "pointer",

                    // 🔥 هذا المهم
                    border: "0.2vw solid orange",
                  }}
                >
                  {word.id}
                </div>
              );
            })}

            {/* ✅ الكلمات */}
            {words.map((word, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: word.top,
                  left: word.left,
                  transform: "translate(-50%, -50%)",
                  fontSize: "clamp(10px, 1vw, 16px)", // ⭐ responsive ذكي
                  background: "white",
                  padding: "0.2vw 0.6vw",
                  borderRadius: "0.5vw",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {word.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⭐ BUTTONS */}
      <Button
        handleShowAnswer={handleShowAnswer}
        handleStartAgain={handleReset}
        checkAnswers={handleCheck}
      />
    </div>
  );
};

export default Unit4_Page5_Q1;
