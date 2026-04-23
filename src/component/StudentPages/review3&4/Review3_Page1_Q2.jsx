import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q2.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex B 1.svg";

const Review3_Page1_Q2 = () => {
  const items = [
    { text: "Do they have any milkshakes?", answer: "Yes, they have some." },
    { text: "Does she have any potatoes?", answer: "No, she hasn’t any" },
    { text: "Does he have any salad?", answer: "No, he hasn’t any." },
    { text: "Does she have any fruit?", answer: "Yes, she has some." },
  ];

  const wordBank = [
    "Yes, they have some.",
    "No, she hasn’t any",
    "No, he hasn’t any.",
    "Yes, she has some.",
  ];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // =========================
  // DRAG END (🔥 FIXED)
  // =========================
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const value = draggableId.replace("season-", "");
    const index = Number(destination.droppableId);

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // =========================
  // SHOW ANSWERS (🔥 FIXED)
  // =========================
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showCorrect) return;

    // ❌ إذا في فراغ
    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = items.length;
    let wrong = [];

    items.forEach((item, i) => {
      if (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()) {
        score++;
      } else {
        wrong.push({ qIndex: i });
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const usedWords = answers.filter(Boolean);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <span style={{ marginRight: "10px" }}>B</span>Read, look, and
            answer. Use the sentences below
          </h5>
          {/* WORD BANK */}
          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  marginTop: "20px",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                {wordBank.map((word, index) => {
                  const isUsed = usedWords.includes(word);

                  return (
                    <Draggable
                      key={word}
                      draggableId={`season-${word}`}
                      index={index}
                      isDragDisabled={isUsed}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="season-chip"
                          style={{
                            padding: "7px 14px",
                            border: "2px solid #2c5287",
                            borderRadius: "8px",
                            background: "white",
                            fontWeight: "bold",
                            cursor: isUsed ? "not-allowed" : "grab",
                            fontSize: "16px",
                            opacity: isUsed ? 0.4 : 1,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {word}
                        </span>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* CONTENT */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "30px",
            }}
          >
            {/* 🟠 IMAGE LEFT */}
            <div
              style={{
                width: "300px",
                height: "300px",
                overflow: "hidden",
                border: "2px solid orange",
                borderRadius: 5,
              }}
            >
              <img
                src={img1}
                alt="exercise"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 85%",
                  transform: "scale(1.1)",
                }}
              />
            </div>

            {/* 🔵 QUESTIONS RIGHT */}
            <div className="space-y-6">
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column", // 🔥 أهم تغيير
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  {/* TEXT */}
                  <span
                    className="text-base"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {i + 1}. {item.text}
                  </span>

                  <Droppable droppableId={`${i}`}>
                    {(provided) => {
                      const isWrong = wrongMarks.some((w) => w.qIndex === i);

                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            position: "relative",
                            minWidth: "250px",
                            width: "100%",
                            maxWidth: "400px",
                            fontWeight: "bold",
                            color: answers[i] ? "#1C398E" : "black",

                            borderBottom: `3px solid ${
                              isWrong ? "red" : "black"
                            }`,

                            marginTop: "20px",
                            paddingBottom: "6px",
                          }}
                        >
                          {answers[i]}
                          {provided.placeholder}

                          {showCorrect && isWrong && (
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "-28px",
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
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
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
    </DragDropContext>
  );
};

export default Review3_Page1_Q2;
