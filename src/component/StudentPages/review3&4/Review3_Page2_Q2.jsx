import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Review3_Page2_Q2.css";
import Button from "../../Button";

const Review3_Page2_Q2 = () => {
  const questions = [
    {
      lines: [
        "I end with ch.",
        "I rhyme with crunch.",
        "I am an afternoon meal.",
        "What am I?",
      ],
    },
    {
      lines: [
        "I end with sh.",
        "I am an animal.",
        "I am a super swimmer.",
        "What am I?",
      ],
    },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [wrongInput, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const correctAnswers = ["lunch", "fish"];
  // 🧲 Drag logic
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || showAnswer) return;

    if (destination.droppableId.startsWith("slot-")) {
      const newIndex = Number(destination.droppableId.split("-")[1]);
      const word = draggableId.replace("word-", "");

      const updated = [...answers];

      // 🔍 نشوف إذا الكلمة موجودة بخانة ثانية
      const oldIndex = updated.findIndex((ans) => ans === word);

      // إذا كانت موجودة → نفرغ مكانها القديم
      if (oldIndex !== -1) {
        updated[oldIndex] = "";
      }

      // 🔁 نحطها بالمكان الجديد
      updated[newIndex] = word;

      setAnswers(updated);
      setWrongInputs([]);
    }
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.some((ans) => ans === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let score = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) {
        score++;
      } else {
        wrong.push(i); // 🔥 أهم تعديل
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);
    const total = correctAnswers.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `);
  };

  const reset = () => {
    setAnswers(Array(questions.length).fill(""));
    setWrongInputs([]);
    setShowAnswer(false);
  };

  const showAnswerFun = () => {
    setAnswers(correctAnswers);
    setWrongInputs([]);
    setShowAnswer(true);
  };
  const usedWords = answers.filter(Boolean);
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
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>D</span> Answer each riddle
            with a <span style={{ color: "#2e3192" }}>ch</span>or{" "}
            <span style={{ color: "#2e3192" }}>sh</span> word.
          </h5>

          {/* 🔤 الكلمات (فوق – نفس الكتاب) */}
          <Droppable droppableId="words" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                // className="word-bank-unit2-p8-q2"
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
                {["lunch", "bench", "sandwich", "fish", "dish", "brush"].map(
                  (word, index) => {
                    const isUsed = usedWords.includes(word);

                    return (
                      <Draggable
                        key={word}
                        draggableId={`word-${word}`}
                        index={index}
                        isDragDisabled={isUsed} // 🔥 تعطيل
                      >
                        {(provided) => (
                          <span
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`word-item-unit2-p8-q2 ${
                              isUsed ? "used" : ""
                            }`}
                            style={{
                              padding: "7px 14px",
                              border: "2px solid #2c5287",
                              borderRadius: "8px",
                              background: "white",
                              fontWeight: "bold",
                              cursor: isUsed ? "not-allowed" : "grab", // 🔥 cursor
                              opacity: isUsed ? 0.4 : 1, // 🔥 opacity
                              ...provided.draggableProps.style,
                            }}
                          >
                            {word}
                          </span>
                        )}
                      </Draggable>
                    );
                  },
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {questions.map((q, index) => (
              <div key={index} className="flex flex-col gap-2">
                {/* أول سطر + الرقم */}
                <div className="flex items-start gap-2">
                  <span className="font-bold text-lg w-6 text-right">
                    {index + 1}.
                  </span>
                  <span>{q.lines[0]}</span>
                </div>

                {/* باقي السطور */}
                {q.lines.slice(1).map((line, i) => (
                  <span key={i} className="ml-8">
                    {line}
                  </span>
                ))}

                {/* الفراغ */}
                <Droppable droppableId={`slot-${index}`}>
                  {(provided) => (
                    <div className="relative inline-block ml-6">
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="w-[90px] text-center font-bold"
                        style={{
                          paddingTop: 20,
                          borderBottom: `3px solid ${
                            wrongInput.includes(index) ? "red" : "black"
                          }`,
                        }}
                      >
                        <span className="text-[#1C398E]">{answers[index]}</span>
                        {provided.placeholder}
                      </div>

                      {showAnswer && wrongInput.includes(index) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "100px",
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
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>

          {/* 🔘 الأزرار نفسها */}
          <Button
            handleShowAnswer={showAnswerFun}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review3_Page2_Q2;
