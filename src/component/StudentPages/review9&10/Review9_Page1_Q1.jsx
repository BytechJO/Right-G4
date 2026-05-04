import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 4.svg";
import Button from "../../Button";

const Review9_Page1_Q1 = () => {
  const questions = [
    { id: 1, img: img1, correct: "were", sentence: "at the park." },
    { id: 2, img: img2, correct: "wasn’t", sentence: "at the store." },
    { id: 3, img: img3, correct: "was", sentence: "at the farm." },
    { id: 4, img: img4, correct: "weren’t", sentence: "at the mall." },
  ];

  const words = ["was", "were", "wasn’t", "weren’t"];
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const sentence = result.draggableId;
    const slotId = result.destination.droppableId;

    setAnswers((prev) => ({
      ...prev,
      [slotId]: sentence,
    }));
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = questions.some((q) => !answers[`slot-${q.id}`]);

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[`slot-${q.id}`] === q.correct) {
        score++;
      }
    });

    const total = questions.length;

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
    setShowResult(true);
    setLocked(true);
  };
  const showAnswers = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      correctAnswers[`slot-${q.id}`] = q.correct;
    });

    setAnswers(correctAnswers);
    setLocked(true);
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };
  const pronouns = {
    1: "They",
    2: "She",
    3: "He",
    4: "They",
  };
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
            Look, read, and write. Use the words below.
          </h5>
          {/* بنك الكلمات */}
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
                {words.map((word, index) => {
                  return (
                    <Draggable
                      key={word}
                      draggableId={word}
                      index={index}
                      isDragDisabled={locked}
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
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الأسئلة */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto", // 🔥 بدل 1fr
              gap: "20px",
              justifyContent: "center",
              columnGap: "80px",
              rowGap: "2px",
            }}
          >
            {questions.map((q) => (
              <div key={q.id} style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: "bold" }}>{q.id}</div>

                <img
                  src={q.img}
                  style={{
                    width: "300px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <Droppable droppableId={`slot-${q.id}`}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        marginTop: "10px",
                        minHeight: "35px",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block", // 🔥 هذا الحل
                        }}
                      >
                        {pronouns[q.id]}
                        <span
                          style={{
                            display: "inline-block",
                            minWidth: "80px",
                            borderBottom: locked
                              ? answers[`slot-${q.id}`] === q.correct
                                ? "2px solid #000"
                                : "2px solid #ef4444"
                              : "2px solid #000",
                            textAlign: "center",
                            margin: "0 5px",
                          }}
                        >
                          {answers[`slot-${q.id}`] && (
                            <Draggable
                              draggableId={`slot-${q.id}-${answers[`slot-${q.id}`]}`}
                              index={0}
                              isDragDisabled={locked}
                            >
                              {(provided) => (
                                <span
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    color: answers[`slot-${q.id}`]
                                      ? "#1C398E"
                                      : "#000",
                                    fontWeight: answers[`slot-${q.id}`]
                                      ? "bold"
                                      : "normal",
                                  }}
                                >
                                  {answers[`slot-${q.id}`]}
                                </span>
                              )}
                            </Draggable>
                          )}
                        </span>{" "}
                        {q.sentence}
                        {/* ❌ WrongMark */}
                        {showResult &&
                          answers[`slot-${q.id}`] &&
                          answers[`slot-${q.id}`] !== q.correct && (
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
                  )}
                </Droppable>
              </div>
            ))}
          </div>
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review9_Page1_Q1;
