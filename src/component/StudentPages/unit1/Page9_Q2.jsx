import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page9_Q2 = () => {
  const questions = [
    {
      options: ["shorter", "cat", "bear"],
      correct: ["cat", "shorter", "bear"],
    },
    {
      options: ["mouse", "dog", "smaller"],
      correct: ["mouse", "smaller", "dog"],
    },
    {
      options: ["younger", "basketball player", "referee"],
      correct: ["basketball player", "younger", "referee"],
    },
    {
      options: ["bigger", "scoreboard", "basketball court"],
      correct: ["basketball court", "bigger", "scoreboard"],
    },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ["", "", ""]));
  const [locked, setLocked] = useState(false);
  const [wrong, setWrong] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const { draggableId, destination } = result;

    // 🚫 إذا السحب داخل البنك (options) تجاهله
    if (destination.droppableId.startsWith("bank")) return;

    const word = draggableId.split("-").slice(1).join("-");

    const [qIndex, slotIndex] = destination.droppableId
      .replace("drop-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);

      copy[qIndex] = copy[qIndex].map((w) => (w === word ? "" : w));

      copy[qIndex][slotIndex] = word;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((row) => row.includes(""));

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }
    let wrongArr = [];
    let score = 0;

    questions.forEach((q, i) => {
      const isCorrect =
        JSON.stringify(answers[i]) === JSON.stringify(q.correct);

      if (isCorrect) score++;
      else wrongArr.push(i);
    });

    setWrong(wrongArr);
    setLocked(true);

    const msg = `
          Score: ${score} / ${questions.length}
            `;
    if (score === questions.length) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const reset = () => {
    setAnswers(questions.map(() => ["", "", ""]));
    setWrong([]);
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers(questions.map((q) => q.correct));
    setWrong([]);
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
          <h5 className="header-title-page8 pb-2.5">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              E
            </span>
            Read and write the sentences.
          </h5>

          <div className="flex flex-col gap-8 mt-6">
            {questions.map((q, qIndex) => {
              const isWrong = wrong.includes(qIndex);

              return (
                <div key={qIndex} className="flex flex-col gap-3">
                  {/* OPTIONS */}
                  <Droppable
                    droppableId={`bank-${qIndex}`}
                    direction="horizontal"
                    isDropDisabled={true}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-3"
                      >
                        {q.options.map((word, i) => {
                          const isUsed = answers[qIndex].includes(word);

                          return (
                            <Draggable
                              key={word}
                              draggableId={`${qIndex}-${word}`}
                              index={i}
                              isDragDisabled={locked || isUsed}
                            >
                              {(provided) => (
                                <span
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
                                    opacity: isUsed ? 0.5 : 1,
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

                  {/* SENTENCE */}
                  <div
                    style={{
                      position: "relative",
                      borderBottom: "2px solid #000",
                      paddingBottom: "6px",
                      minHeight: "30px",
                    }}
                  >
                    The {/* الفراغ الأول */}
                    <Droppable droppableId={`drop-${qIndex}-0`}>
                      {(provided) => {
                        const value = answers[qIndex][0];
                        return (
                          <span
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "80px",
                              height: "28px",
                              margin: "0 6px",
                              borderBottom: locked
                                ? wrong.includes(qIndex)
                                  ? "2px solid #ef4444" // 🔴 غلط
                                  : "2px solid #000" // ⚫ صح
                                : "2px dashed #999",
                              verticalAlign: "middle",
                              color: value ? "#1C398E" : "#000",
                              fontWeight: value ? "bold" : "normal",
                            }}
                          >
                            {value}
                            {provided.placeholder}
                          </span>
                        );
                      }}
                    </Droppable>{" "}
                    is {/* الفراغ الثاني */}
                    <Droppable droppableId={`drop-${qIndex}-1`}>
                      {(provided) => {
                        const value = answers[qIndex][1];
                        return (
                          <span
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "80px",
                              height: "28px",
                              margin: "0 6px",
                              borderBottom: locked
                                ? wrong.includes(qIndex)
                                  ? "2px solid #ef4444" // 🔴 غلط
                                  : "2px solid #000" // ⚫ صح
                                : "2px dashed #999",
                              verticalAlign: "middle",
                              color: value ? "#1C398E" : "#000",
                              fontWeight: value ? "bold" : "normal",
                            }}
                          >
                            {value}
                            {provided.placeholder}
                          </span>
                        );
                      }}
                    </Droppable>{" "}
                    than the {/* الفراغ الثالث */}
                    <Droppable droppableId={`drop-${qIndex}-2`}>
                      {(provided) => {
                        const value = answers[qIndex][2];
                        return (
                          <span
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "80px",
                              height: "28px",
                              borderBottom: locked
                                ? wrong.includes(qIndex)
                                  ? "2px solid #ef4444" // 🔴 غلط
                                  : "2px solid #000" // ⚫ صح
                                : "2px dashed #999",
                              margin: "0 6px",
                              verticalAlign: "middle",
                              color: value ? "#1C398E" : "#000",
                              fontWeight: value ? "bold" : "normal",
                            }}
                          >
                            {value}
                            {provided.placeholder}
                          </span>
                        );
                      }}
                    </Droppable>
                    .
                    {locked && isWrong && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-25px",
                          top: "0",
                          zIndex: 10,
                        }}
                      >
                        <WrongMark />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            handleShowAnswer={showAnswer}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Page9_Q2;
