import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q2.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Review7_Page1_Q2 = () => {
  const items = [
    { text: "Where is the boy? I can’t see", answer: "him" },
    { text: "There’s a rainbow in the sky. Look at", answer: "it" },
    { text: "Where are my shoes? Can you see", answer: "them" },
    { text: "Your sister is laughing. I can hear", answer: "her" },
    { text: "Look! A dolphin! Can you see", answer: "it" },
    { text: "Our teacher is Miss May. We like", answer: "her" },
    { text: "The birds are singing. Can you hear", answer: "them" },
    { text: "Hooray! John is the winner! Look at", answer: "him" },
  ];

  const wordBank = ["him", "her", "it", "them"];

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
            <span  style={{ marginRight: "10px" }}>
              B
            </span>
            Complete the sentences. Use the words below.
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          ></div>
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
                  // justifyContent: "center",
                }}
              >
                {wordBank.map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={`season-${word}`}
                    index={index}
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
                          cursor: "grab",
                          fontSize: "16px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {word}
                      </span>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* CONTENT */}

          <div className="space-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  whiteSpace: "nowrap", // 🔥 هذا المهم
                }}
              >
                {/* TEXT */}
                <span className="text-base">
                  {i + 1}. {item.text}
                </span>

                {/* INLINE DROP */}
                <Droppable droppableId={`${i}`}>
                  {(provided, snapshot) => {
                    const isWrong = wrongMarks.some((w) => w.qIndex === i);

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          position: "relative",
                          minWidth: "120px",
                          textAlign: "center",
                          fontWeight: "bold",
                          color: answers[i] ? "#1C398E" : "black", // الكلمة أزرق غامق
                          borderBottom: `2px solid ${
                            showCorrect
                              ? isWrong
                                ? "red"
                                : "#1C398E"
                              : "black"
                          }`,
                          paddingBottom: "4px",
                        }}
                      >
                        {snapshot.isDraggingOver && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-2px",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              border: "2px dashed #2c5287",
                              borderRadius: "6px",
                              backgroundColor: "#e6f0ff",
                              pointerEvents: "none",
                            }}
                          />
                        )}

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
                {i === 5 && <span>very much.</span>}
              </div>
            ))}
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

export default Review7_Page1_Q2;
