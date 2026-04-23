import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Asset 17 (1).svg";
import WrongMark from "../../WrongMark";
import Button from "../../Button";

const Review1_Page1_Q1 = () => {
  const answersBank = ["A", "B", "C", "D", "E", "F"];

  const questions = [
    { id: 1, text: "Who is the oldest?", answer: "B" },
    { id: 2, text: "Who is the tallest?", answer: "F" },
    { id: 3, text: "Who is the shortest?", answer: "C" },
    { id: 4, text: "Who is the saddest?", answer: "A" },
    { id: 5, text: "Who is the loudest?", answer: "D" },
    { id: 6, text: "Who is the thinnest?", answer: "E" },
    {
      id: 7,
      text: "Which is your favorite clown? Why?",
      answer: "",
    },
  ];
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const sentence = result.draggableId;
    const id = result.destination.droppableId.split("-")[1];

    setAnswers((prev) => ({
      ...prev,
      [id]: sentence,
    }));
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.answer;
    });
    setAnswers(filled);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const requiredQuestions = questions.slice(0, 6);

    if (Object.keys(answers).length < requiredQuestions.length) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;

    requiredQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });

    const total = requiredQuestions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${total}
    </span>
  </div>
`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
    setShowResult(true);
    setLocked(true);
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
            Look, read, and answer the questions.
          </h5>

          {/* IMAGES */}
          <div >
            <div className="flex justify-center gap-8 ">
              <div className="relative">
                <img
                  src={imgA}
                  style={{
                    width: "100%",
                    height: "40vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            {/* ANSWERS BANK */}

            <Droppable droppableId="bank" direction="horizontal">
              {(provided) => (
                <div style={{ textAlign: "center" }}>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-wrap gap-4 mb-5 mt-2"
                    style={{
                      display: "inline-flex", 
                      border: "2px dashed #2c5287",
                      borderRadius: "12px",
                      padding: "10px",
                    }}
                  >
                    {answersBank.map((a, index) => {
                      const isUsed = Object.values(answers).includes(a);

                      return (
                        <Draggable
                          key={a}
                          draggableId={a}
                          index={index}
                          isDragDisabled={locked || isUsed}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: "6px 14px",
                                border: "2px solid #2c5287",
                                borderRadius: "10px",
                                background: "#fff",
                                fontWeight: "bold",
                                fontSize: "14px",
                                cursor: isUsed ? "not-allowed" : "grab",
                                opacity: isUsed ? 0.4 : 1,
                                ...provided.draggableProps.style,
                              }}
                            >
                              {a}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>

            {/* QUESTIONS GRID */}

            <div className="grid grid-cols-2 gap-x-16 mb-20 ">
              {questions.map((q) => (
                <div key={q.id}>
                  <div className="flex gap-3 text-lg">
                    <span className="font-bold">{q.id}</span>
                    <p>{q.text}</p>
                  </div>

                  {q.id === 7 ? (
                    <input
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      disabled={locked}
                      placeholder="Type your answer..."
                      className="border-b-2 border-black w-full mt-2 outline-none"
                    />
                  ) : (
                    <Droppable droppableId={`answer-${q.id}`}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            borderBottom: locked
                              ? answers[q.id] === q.answer
                                ? "2px solid #000" // صح
                                : "2px solid #ef4444" // غلط
                              : "2px solid #000",
                          }}
                          className=" min-h-10 mt-2"
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <p>
                              Clown{" "}
                              <span
                                style={{
                                  color: answers[q.id] ? "#1C398E" : "#000",
                                  fontWeight: answers[q.id] ? "bold" : "normal",
                                }}
                              >
                                {answers[q.id] || "___"}
                              </span>{" "}
                              is the {q.text.split("the ")[1].replace("?", "")}.
                            </p>

                            {showResult &&
                              answers[q.id] &&
                              answers[q.id] !== q.answer && (
                                <div
                                  style={{
                                    position: "absolute",
                                    right: "-20px",
                                    top: "0",
                                  }}
                                >
                                  <WrongMark />
                                </div>
                              )}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* BUTTONS */}

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

export default Review1_Page1_Q1;
