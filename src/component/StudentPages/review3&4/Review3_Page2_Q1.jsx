import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex C 1.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Review3_Page2_Q1.css";
const Review3_Page2_Q1 = () => {
  const correctAnswers = ["sh", "ch", "ch", "sh", "ch", "sh"];
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);

  /* ================= Drag Logic ================= */
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    if (destination.droppableId.startsWith("slot-")) {
      const index = Number(destination.droppableId.split("-")[1]);
      const word = draggableId.replace("word-", "");

      setAnswers((prev) => {
        const updated = [...prev];

        updated[index] = word;
        return updated;
      });

      setWrongInputs([]);
    }
  };

  /* ================= Check Answers (كما هو) ================= */
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((ans) => ans === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let tempScore = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) tempScore++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);

    const total = correctAnswers.length;
    const color =
      tempScore === total ? "green" : tempScore === 0 ? "red" : "orange";

    ValidationAlert[
      tempScore === total ? "success" : tempScore === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${tempScore} / ${total}
        </span>
      </div>
    `);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", "", "", ""]);
    setWrongInputs([]);
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="question-wrapper-unit3-page6-q1"
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
          }}
        >
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>C</span>Read and complete the
            sentences. Write
            <span style={{ color: "#2e3192" }}>sh</span>or{" "}
            <span style={{ color: "#2e3192" }}>ch</span>
          </h5>
          {/* 🔤 Word Bank */}
          <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  // margin: "10px 0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {["sh", "ch"].map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={`word-${word}`}
                    index={index}
                    isDragDisabled={locked}
                  >
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "7px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          cursor: "grab",
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
          <div className="w-full flex gap-10 mt-6">
            {/* 🔵 LEFT (QUESTIONS) */}
            <div className="flex-1 space-y-6">
              {[
                "There was a big spla____ when Jan dived in the pool.",
                "Mar____ is the third month of the year.",
                "Mrs. Bell is the best tea____er in the school.",
                "____ut the door when you leave.",
                "We used a knife to ____op the peppers.",
                "Aunt Jo went ____opping at the mall.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2"
                  style={{ position: "relative" }}
                >
                  <span className="text-lg font-medium">
                    {i + 1}{" "}
                    {text.split("____").map((part, j) => {
                      const isWrong = wrongInputs.includes(i);

                      return (
                        <span key={j}>
                          {part}

                          {j === 0 && (
                            <Droppable droppableId={`slot-${i}`}>
                              {(provided) => (
                                <span
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`inline-block min-w-10 text-center font-bold relative ${
                                    isWrong ? "border-red-500" : "border-black"
                                  } border-b-2 mx-1`}
                                >
                                  <span style={{ color: "#1C398E" }}>
                                    {answers[i]}
                                  </span>
                                  {provided.placeholder}

                                  {isWrong && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "0%",
                                        left: "30px",
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
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
                                </span>
                              )}
                            </Droppable>
                          )}
                        </span>
                      );
                    })}
                  </span>
                </div>
              ))}
            </div>

            {/* 🟠 RIGHT (IMAGE) */}
            <div>
              <img
                src={img1}
                alt="exercise"
                style={{
                  width: "200px",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>

          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
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

export default Review3_Page2_Q1;
