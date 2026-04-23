import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q1.css";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 6.svg";
import big from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Asset 17.svg";

const Review7_Page1_Q1 = () => {
  const wordBank = ["A", "B", "C", "D", "E", "F"];
  const questions = [
    { id: 1, img: imgA, object: "1", correct: "C" },
    { id: 2, img: imgB, object: "2", correct: "D" },
    { id: 3, img: imgC, object: "3", correct: "A" },
    { id: 4, img: imgD, object: "4", correct: "E" },
    { id: 5, img: imgE, object: "5", correct: "B" },
    { id: 6, img: imgF, object: "6", correct: "F" },
  ];
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const onDragEnd = (result) => {
    if (locked) return;

    const { destination, draggableId } = result;
    if (!destination) return;

    const value = draggableId.replace("season-", ""); // A B C

    if (destination.droppableId.startsWith("room")) {
      const index = Number(destination.droppableId.split("-")[1]);

      setAnswers((prev) => ({
        ...prev,
        [index]: value,
      }));
    }
  };
  const reset = () => {
    setAnswers({});
    setWrongAnswers({});
    setLocked(false);
  };
  const showAnswers = () => {
    const filled = {};

    questions.forEach((q) => {
      filled[q.id] = q.correct;
    });

    setAnswers(filled);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = questions.some((q) => !answers[q.id]);
    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const wrong = {};

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      } else {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b style="color:${color};">Score: ${correct} / ${total}</b>
    </div>
  `;
    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };
  const usedWords = Object.values(answers).filter(Boolean);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <span style={{ marginRight: "10px" }}>A</span>
            Read and match. Write the letters.
          </h5>

          <div className="w-full mx-auto mb-10">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={big}
                alt="sentences"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            {/*  BANK */}
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
                        isDragDisabled={locked || isUsed}
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

            {/* QUESTIONS GRID */}
            <div className="grid grid-cols-3 gap-10 mb-10">
              {questions.map((q) => (
                <div key={q.id} className="flex flex-col items-start">
                  <div className="flex gap-2 items-start">
                    <span className="font-bold text-lg">{q.id}</span>
                    <img
                      src={q.img}
                      style={{
                        height: "120px",
                        border: "2px solid orange",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="questions-grid">
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{q.id}</span>
                  <Droppable droppableId={`room-${q.id}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          position: "relative", // 🔥 مهم
                          minWidth: "120px",
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          borderBottom: `2px solid ${
                            locked
                              ? wrongAnswers[q.id]
                                ? "red"
                                : "#2c5287"
                              : "black"
                          }`,
                        }}
                      >
                        {/* 🔥 البوكس فوق */}
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

                        {/* المحتوى */}
                        {answers[q.id] && (
                          <Draggable
                            draggableId={`room-${answers[q.id]}`}
                            index={0}
                          >
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  fontWeight: "bold",
                                  color: "#2c5287",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {answers[q.id]}
                              </span>
                            )}
                          </Draggable>
                        )}

                        {provided.placeholder}
                        {locked && wrongAnswers[q.id] && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "-15px",
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
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
          <div className="action-buttons-container mt-10">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
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
    </DragDropContext>
  );
};

export default Review7_Page1_Q1;
