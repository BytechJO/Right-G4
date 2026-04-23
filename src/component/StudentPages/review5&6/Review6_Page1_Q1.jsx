import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page1_Q1.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 54/Ex A 1.svg";

const Review6_Page1_Q1 = () => {
  const items = [
    { text: "The hen is", answer: "fourth" },
    { text: "The rabbit is", answer: "second" },
    { text: "The dog is", answer: "third" },
    { text: "The horse is", answer: "first" },
  ];

  const wordBank = ["fourth", "second", "third", "first"];

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
            <span style={{ marginRight: "10px" }}>A</span>Read,
            look, and write. Use the words below.
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
            {/* 🟠 IMAGE */}
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
                  transform: "scale(1.05)",
                }}
              />
            </div>

            {/* 🔵 RIGHT SIDE (النص + الأسئلة) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* ✨ الفقرة */}
              <div
                style={{
                  marginBottom: "20px",
                  lineHeight: "1.6",
                  fontSize: "18px",
                }}
              >
                <div>The animals are in a race!</div>
                <div>Go, go, go!</div>
                <div>Some are fast,</div>
                <div>And some are slow.</div>
              </div>

              {/* ✨ الأسئلة */}
              <div className="space-y-6">
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px", // 🔥 أهم تغيير
                      marginBottom: "15px",
                    }}
                  >
                    {/* TEXT */}
                    <span
                      style={{
                        fontSize: "18px",
                        minWidth: "100px", // 🔥 مهم
                        whiteSpace: "nowrap", // 🔥 يمنع النزول سطر ثاني
                      }}
                    >
                      {item.text}
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

export default Review6_Page1_Q1;
