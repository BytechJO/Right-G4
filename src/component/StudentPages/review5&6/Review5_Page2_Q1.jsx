import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 6.svg";

const Review5_Page2_Q1 = () => {
  const senteces = ["sky", "baby", "party", "July", "candy", "fly"];
  const [wrongMap, setWrongMap] = useState({});
  const questions = [
    {
      id: 1,
      img: imgA,
      answer: "sky",
    },
    {
      id: 2,
      img: imgB,
      answer: "baby",
    },
    {
      id: 3,
      img: imgC,
      answer: "party",
    },
    {
      id: 4,
      img: imgD,
      answer: "July",
    },
    {
      id: 5,
      img: imgE,
      answer: "candy",
    },
    {
      id: 6,
      img: imgF,
      answer: "fly",
    },
  ];
  const [answers, setAnswers] = useState(questions.map(() => ""));

  const [locked, setLocked] = useState(false);
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    const word = draggableId.split("-").slice(1).join("-");

    // 👇 الحل هون
    const qIndex = Number(destination.droppableId.split("-")[1]) - 1;

    setAnswers((prev) => {
      const updated = [...prev];

      const existingIndex = updated.findIndex((a) => a === word);
      if (existingIndex !== -1) updated[existingIndex] = "";

      updated[qIndex] = word;
      return updated;
    });
  };

  const reset = () => {
    setAnswers(questions.map(() => ""));
    setWrongMap({});
    setLocked(false);
  };

  const showAnswers = () => {
    const filled = questions.map((q) => q.answer);
    setAnswers(filled);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    const empty = questions.some((q) => !answers[q.id - 1]);

    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const wrongs = {};

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        correct++;
      } else {
        wrongs[q.id] = true;
      }
    });

    setWrongMap(wrongs);
    const total = questions.length;

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b>Score: ${correct} / ${total}</b>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };
  const usedWords = answers.flat().filter(Boolean);

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
            <span style={{ marginRight: "10px" }}>C</span>
            Look and write the words ending in{" "}
            <span style={{ color: "#2e3192" }}>-y</span>.
          </h5>

          {/* IMAGES */}
          <div className="w-[70%] mx-auto">
            {/* ANSWERS BANK */}

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
                  {senteces.map((word, index) => {
                    const isUsed = usedWords.includes(word);

                    return (
                      <Draggable
                        key={word}
                        draggableId={`season-${word}`}
                        index={index}
                        isDragDisabled={isUsed} // 🔥 يمنع السحب
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
                              opacity: isUsed ? 0.4 : 1, // 🔥 تخفيف اللون
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

            <div className="grid grid-cols-3 gap-10 mb-20">
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
                  {/* خط */}
                  <Droppable droppableId={`answer-${q.id}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          width: "200px",
                          borderBottom: `3px solid ${
                            wrongMap[q.id] ? "red" : "black"
                          }`,
                          minHeight: "35px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {answers[q.id - 1] && (
                          <Draggable
                            draggableId={answers[q.id - 1]}
                            index={0}
                            isDragDisabled={locked}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  position: "relative", // 👈 أضف هذا
                                }}
                              >
                                <span className="text-[#1C398E] font-semibold text-center block">
                                  {answers[q.id - 1]}
                                </span>
                                {wrongMap[q.id] && (
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "100%",
                                      top: "46%",
                                      transform: "translateY(-50%)",
                                      width: "20px",
                                      height: "20px",
                                      background: "#ef4444",
                                      color: "white",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      border: "2px solid white",
                                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                      pointerEvents: "none",
                                      zIndex: 3,
                                    }}
                                  >
                                    ✕
                                  </span>
                                )}
                              </div>
                            )}
                          </Draggable>
                        )}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
          {/* BUTTONS */}

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

export default Review5_Page2_Q1;
