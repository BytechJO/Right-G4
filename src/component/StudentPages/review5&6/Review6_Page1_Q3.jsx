import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page2_Q2.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Review6_Page1_Q3 = () => {
  const wordBank = [
    "June",
    "July",
    "August",
    "September",
    "October",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const correctAnswers = [
    ["June", "Monday"],
    ["September", "Thursday"],
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
  ]);

  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // ================= DRAG =================
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const value = draggableId.replace("word-", "");
    const [qIndex, blankIndex] = destination.droppableId.split("-");

    const updated = [...answers];
    updated[qIndex][blankIndex] = value;

    setAnswers(updated);
  };

  // ================= SHOW =================
  const showAnswers = () => {
    setAnswers(correctAnswers);
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // ================= RESET =================
  const resetAll = () => {
    setAnswers([
      ["", ""],
      ["", ""],
    ]);
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // ================= CHECK =================
  const checkAnswers = () => {
    if (showCorrect) return;

    if (answers.some((q) => q.includes(""))) {
      ValidationAlert.info("Oops!", "Please complete all answers.");
      return;
    }

    let score = 0;
    let wrong = [];

    answers.forEach((q, qi) => {
      q.forEach((ans, i) => {
        if (ans === correctAnswers[qi][i]) {
          score++;
        } else {
          wrong.push(`${qi}-${i}`);
        }
      });
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const total = 4;
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

  const usedWords = answers.flat().filter(Boolean);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col items-center p-8">
        <div className="div-forall w-[60%]">
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>C</span>
            Read and write.
          </h5>

          {/* 🔵 MONTHS */}
          <Droppable droppableId="months" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-3 p-3 border-2 border-dashed rounded-xl mt-5 justify-center"
              >
                {wordBank
                  .filter((w) =>
                    ["June", "July", "August", "September", "October"].includes(
                      w,
                    ),
                  )
                  .map((word, index) => {
                    const isUsed = usedWords.includes(word);

                    return (
                      <Draggable
                        key={word}
                        draggableId={`word-${word}`}
                        index={index}
                        isDragDisabled={isUsed}
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
                              cursor: isUsed ? "not-allowed" : "grab",
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

          {/* 🟢 DAYS */}
          <Droppable droppableId="days" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-3 p-3 border-2 border-dashed rounded-xl mt-3 justify-center"
              >
                {wordBank
                  .filter((w) =>
                    [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].includes(w),
                  )
                  .map((word, index) => {
                    const isUsed = usedWords.includes(word);

                    return (
                      <Draggable
                        key={word}
                        draggableId={`word-${word}`}
                        index={index}
                        isDragDisabled={isUsed}
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
                              cursor: isUsed ? "not-allowed" : "grab",
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

          {/* 🟢 QUESTIONS */}
          <div className="mt-10 space-y-8 text-lg">
            {[0, 1].map((qIndex) => (
              <div key={qIndex}>
                <div className="mb-2">
                  <b>{qIndex + 1}</b>{" "}
                  {qIndex === 0
                    ? "It is the sixth month of the year and the second day of the week."
                    : "It is the ninth month of the year and the fifth day of the week."}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span>The month is</span>

                  {[0, 1].map((blankIndex) => {
                    const id = `${qIndex}-${blankIndex}`;
                    const isWrong = wrongMarks.includes(id);

                    return (
                      <React.Fragment key={id}>
                        <Droppable droppableId={id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="relative min-w-[140px] border-b-2 px-2 font-bold text-[#1C398E]"
                              style={{
                                borderColor: isWrong ? "red" : "black",
                              }}
                            >
                              {answers[qIndex][blankIndex]}
                              {provided.placeholder}

                              {showCorrect && isWrong && (
                                <span className="absolute -right-1 top-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                                  ✕
                                </span>
                              )}
                            </div>
                          )}
                        </Droppable>

                        {blankIndex === 0 && <span>, and the day is</span>}
                      </React.Fragment>
                    );
                  })}

                  <span>.</span>
                </div>

                <div className="border-b mt-2"></div>
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

export default Review6_Page1_Q3;
