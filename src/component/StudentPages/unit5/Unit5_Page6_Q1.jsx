import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 3.svg";

const Unit5_Page6_Q1 = () => {
  const questions = [
    {
      id: 1,
      img: img1,
      question: "Is there a bathtub behind the toilet?",
      correct: "No, there isn’t.",
    },
    {
      id: 2,
      img: img2,
      question: "Are there books in front of the door?",
      correct: "No, there aren’t",
    },
    {
      id: 3,
      img: img3,
      question: "Is there a telephone next to the sink?",
      correct: "Yes, there is.",
    },
  ];
  const senteces = [
    "No, there isn’t.",
    "No, there aren’t",
    "Yes, there is.",
    "Yes, there are.",
  ];
  const [answers, setAnswers] = useState(questions.map(() => ""));

  const [locked, setLocked] = useState(false);

  /* ================= Drag ================= */
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    const word = draggableId.split("-").slice(1).join("-"); // إصلاح
    const qIndex = Number(destination.droppableId);

    setAnswers((prev) => {
      const updated = [...prev];

      // منع التكرار
      const existingIndex = updated.findIndex((a) => a === word);
      if (existingIndex !== -1) updated[existingIndex] = "";

      updated[qIndex] = word;
      return updated;
    });
  };

  /* ================= Check ================= */
  const checkAnswers = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    answers.forEach((ans, i) => {
      if (ans === questions[i].correct) score++;
    });

    const total = questions.length;
    // const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
        Score: ${score} / ${total}
  `);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(
      questions.map((q) => [
        new Array(q.correct[0].length).fill(""),
        new Array(q.correct[1].length).fill(""),
      ]),
    );
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers(questions.map((q) => q.correct));
    setLocked(true);
  };
  const usedWords = answers.flat().filter(Boolean);
  const getStatus = (index) => {
    if (!locked) return null;

    if (answers[index] === questions[index].correct) return "correct";
    return "wrong";
  };
  /* ================= UI ================= */
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
            <span className="ex-A" style={{ marginRight: "10px" }}>
              D
            </span>
            Look, read, and answer.
          </h5>
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
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "30px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {/* 🖼️ الصورة */}
              <img
                src={q.img}
                alt=""
                style={{
                  width: "180px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                }}
              />

              {/* ❓ السؤال + الإجابة */}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {q.question}
                </p>

                <Droppable droppableId={`${index}`}>
                  {(provided) => {
                    const status = getStatus(index);

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          position: "relative",
                          minHeight: "40px",
                          borderBottom: `2px solid ${
                            status === "wrong" ? "red" : "black"
                          }`,
                          padding: "5px",
                          fontSize: "16px",
                        }}
                      >
                        <span
                          style={{
                            color: answers[index] ? "#2c5287" : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {answers[index]}
                        </span>
                        {status === "wrong" && (
                          <span
                            style={{
                              position: "absolute",
                              left: "25%",
                              top: "50%",
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
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          ))}
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

export default Unit5_Page6_Q1;
