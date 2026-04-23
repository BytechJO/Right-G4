import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 20.svg";
import Button from "../../Button";

const Review2_Page1_Q1 = () => {
  const questions = [
    { id: 1, img: img1, correct: "never", sentence: "clean my room." },
    { id: 2, img: img2, correct: "usually", sentence: "jump rope." },
    { id: 3, img: img3, correct: "sometimes", sentence: "go to the store." },
    { id: 4, img: img4, correct: "always", sentence: "go to bed." },
  ];

  const words = ["always", "usually", "sometimes", "never"];
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
            <span style={{ marginRight: "20px" }}>A</span>
            Write sentences. Use the words below.
          </h5>
          {/* بنك الكلمات */}
          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-3 p-3 border-2 border-dashed border-gray-300 rounded-xl justify-center mt-3"
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                {words.map((w, index) => {
                  const isUsed = Object.values(answers).includes(w);
                  return (
                    <Draggable
                      key={w}
                      draggableId={w}
                      index={index}
                      isDragDisabled={locked || isUsed}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#eee",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            cursor: isUsed ? "not-allowed" : "grab",
                            opacity: isUsed ? 0.4 : 1,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {/* البار */}
                          <div style={{ display: "flex" }}>
                            {[1, 2, 3, 4].map((i) => {
                              const activeCount =
                                w === "always"
                                  ? 4
                                  : w === "usually"
                                    ? 3
                                    : w === "sometimes"
                                      ? 2
                                      : 0;

                              return (
                                <div
                                  key={i}
                                  style={{
                                    width: "12px",
                                    height: "12px",
                                    marginRight: "2px",
                                    background:
                                      i <= activeCount ? "#ef4444" : "#fff",
                                    border: "1px solid #ef4444",
                                  }}
                                />
                              );
                            })}
                          </div>

                          {/* النص */}
                          <span style={{ fontSize: "14px" }}>= {w}</span>
                        </div>
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
                    objectFit: "contain",
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
                        I{" "}
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
                            <div
                              style={{
                                position: "absolute",
                                left: "100%", // 🔥 يجي جنب الجملة
                                marginLeft: "8px", // مسافة صغيرة
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            >
                              <WrongMark />
                            </div>
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

export default Review2_Page1_Q1;
