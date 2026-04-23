import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 9.svg";

const Review1_Page1_Q2 = () => {
  const answersBank = ["A", "B", "C"];

  const questions = [
    {
      id: 1,
      label: "fast",
      images: [img1, img2, img3],
      answers: { fastest: "C", slowest: "A" },
    },
    {
      id: 2,
      label: "short",
      images: [img4, img5, img6],
      answers: { shortest: "C", tallest: "B" },
    },
    {
      id: 3,
      label: "old",
      images: [img7, img8, img9],
      answers: { oldest: "A", youngest: "C" },
    },
  ];

  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const key = result.destination.droppableId;
    const draggedLetter = result.draggableId;

    const qIndex = key.split("-")[0];

    const alreadyUsed = Object.keys(answers).some(
      (k) => k.startsWith(qIndex + "-") && answers[k] === draggedLetter,
    );

    if (alreadyUsed) return;

    setAnswers((prev) => ({
      ...prev,
      [key]: draggedLetter,
    }));
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        filled[`${qIndex}-${type}`] = value;
      });
    });
    setAnswers(filled);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const totalInputs = questions.reduce(
      (acc, q) => acc + Object.keys(q.answers).length,
      0,
    );

    if (Object.keys(answers).length < totalInputs) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        total++;
        if (answers[`${qIndex}-${type}`] === value) correct++;
      });
    });

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
            <span style={{ marginRight: "10px" }}>B</span>
            Read, look, and write. You can answer in two ways.
          </h5>

          {/* ANSWER BANK */}
          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <div style={{ textAlign: "center" }}>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px",
                    border: "2px dashed #2c5287",
                    borderRadius: "12px",
                    padding: "10px",
                  }}
                >
                  {answersBank.map((a, index) => (
                    <Draggable
                      key={a}
                      draggableId={a}
                      index={index}
                      isDragDisabled={locked}
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
                            ...provided.draggableProps.style,
                          }}
                        >
                          {a}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          {/* QUESTIONS */}
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "50px",
                marginBottom: "40px",
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px auto",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div style={{ fontWeight: "bold", gap: "10px" }}>
                  {q.id} {q.label}
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  {q.images.map((img, i) => {
                    const letter = ["A", "B", "C"][i];
                    return (
                      <div key={i} style={{ textAlign: "center" }}>
                        <img
                          src={img}
                          alt=""
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                          }}
                        />
                        <p style={{ fontWeight: "bold" }}>{letter}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ width: "320px" }}>
                {Object.keys(q.answers).map((type) => (
                  <Droppable key={type} droppableId={`${qIndex}-${type}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          marginBottom: "12px",
                          minHeight: "40px",
                          background: snapshot.isDraggingOver
                            ? "#dbeafe"
                            : "#f9f9f9",
                          borderBottom: locked
                            ? answers[`${qIndex}-${type}`] === q.answers[type]
                              ? "2px solid #000"
                              : "2px solid #ef4444"
                            : "2px solid #000",
                          padding: "5px",
                          position: "relative",
                        }}
                      >
                        <p>
                          <span
                            style={{
                              color: answers[`${qIndex}-${type}`]
                                ? "#1C398E"
                                : "#000",
                              fontWeight: answers[`${qIndex}-${type}`]
                                ? "bold"
                                : "normal",
                            }}
                          >
                            {answers[`${qIndex}-${type}`] || "___"}
                          </span>{" "}
                          is the {type}.
                        </p>

                        {/* WRONG MARK */}
                        {showResult &&
                          answers[`${qIndex}-${type}`] &&
                          answers[`${qIndex}-${type}`] !== q.answers[type] && (
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

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          ))}

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

export default Review1_Page1_Q2;
