import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 4.svg";

const Review2_Page1_Q2 = () => {
  const questions = [
    {
      id: 1,
      img: img1,
      subject: "She",
      questionEnd: "clean her room?",
      answerEnd: "cleans her room.",
      words: ["never"],
      correct: [[], ["never"]],
      fixedQuestion: ["How often does she"],
    },
    {
      id: 2,
      img: img2,
      subject: "She",
      questionEnd: "jump rope?",
      answerEnd: "jumps rope.",
      words: ["does", "often", "usually", "she"],
      correct: [["often", "does", "she"], ["usually"]],
      fixedQuestion: ["How"],
    },
    {
      id: 3,
      img: img3,
      subject: "He",
      questionEnd: "go to the store?",
      answerEnd: "goes to the store.",
      words: ["does", "often", "sometimes", "he"],
      correct: [["often", "does", "he"], ["sometimes"]],
      fixedQuestion: ["How"],
    },
    {
      id: 4,
      img: img4,
      subject: "He",
      questionEnd: "go to bed?",
      answerEnd: "goes to bed.",
      words: ["always", "often", "he", "does"],
      correct: [["often", "does", "he"], ["always"]],
      fixedQuestion: ["How"],
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map((q) => [
      new Array(q.correct[0].length).fill(""),
      new Array(q.correct[1].length).fill(""),
    ]),
  );

  const [locked, setLocked] = useState(false);

  /* ================= Drag ================= */
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    const word = draggableId.split("-").slice(2).join("-");
    const [qIndex, row, col] = destination.droppableId.split("-").map(Number);

    setAnswers((prev) => {
      const updated = prev.map((q) => q.map((r) => [...r]));

      // منع التكرار داخل نفس السؤال فقط (لا نحذف الكلمة من أسئلة أخرى)
      updated[qIndex].forEach((r) =>
        r.forEach((c, j) => {
          if (c === word) r[j] = "";
        }),
      );

      updated[qIndex][row][col] = word;
      return updated;
    });
  };

  /* ================= Check ================= */
  const checkAnswers = () => {
    if (locked) return;

    // 1️⃣ نتأكد إنو كل الخانات مليانة
    if (answers.some((qAns) => qAns.some((row) => row.includes("")))) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    let total = 0;
    let wrong = [];

    answers.forEach((qAns, qi) => {
      qAns.forEach((row, ri) => {
        row.forEach((cell, ci) => {
          total++;
          if (cell === questions[qi].correct[ri][ci]) score++;
          else wrong.push(`${qi}-${ri}-${ci}`);
        });
      });
    });

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
            <span style={{ marginRight: "20px" }}>B</span>
            Look at Exercise A. Write the questions and answers
          </h5>

          {questions.map((q, qi) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "40px",
                marginTop: "20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {q.id}.
                </div>
                <img src={q.img} style={{ width: "100px", height: "100px" }} />
              </div>

              <div style={{ flex: 1 }}>
                <Droppable
                  droppableId={`bank-${qi}`}
                  direction="horizontal"
                  isDropDisabled
                >
                  {(provided) => (
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
                      {q.words.map((w, index) => {
                        const isUsed = answers[qi].flat().includes(w);
                        return (
                          <Draggable
                            key={w}
                            draggableId={`word-${qi}-${w}`}
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
                                  cursor: isUsed ? "not-allowed" : "grab",
                                  opacity: isUsed ? 0.4 : 1,
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {w}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  {q.fixedQuestion.join(" ")}{" "}
                  {answers[qi][0].map((word, i) => {
                    return (
                      <Droppable droppableId={`${qi}-0-${i}`} key={i}>
                        {(provided) => (
                          <span
                            style={{
                              position: "relative",
                              display: "inline-block",
                              margin: "0 12px 0 5px",
                            }}
                          >
                            <span
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                borderBottom: locked
                                  ? word === q.correct[0][i]
                                    ? "2px solid #000"
                                    : "2px solid #ef4444"
                                  : "2px solid #000",
                                minWidth: "60px",
                                display: "inline-block",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: word ? "#1C398E" : "#000",
                              }}
                            >
                              {word}
                              {provided.placeholder}
                            </span>
                            {/* ❌ Wrong icon inline */}
                            {locked && word && word !== q.correct[0][i] && (
                              <div
                                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                 w-5 h-5  text-xs bg-red-500 text-white rounded-full
      flex items-center justify-center font-bold border-2 border-white
      pointer-events-none shadow-lg"
                              >
                                ✕
                              </div>
                            )}
                          </span>
                        )}
                      </Droppable>
                    );
                  })}{" "}
                  {q.questionEnd}
                </div>

                <div style={{ fontSize: "18px" }}>
                  {q.subject}{" "}
                  {answers[qi][1].map((word, i) => {
                    return (
                      <Droppable droppableId={`${qi}-1-${i}`} key={i}>
                        {(provided) => (
                          <span
                            style={{
                              position: "relative",
                              display: "inline-block",
                              margin: "0 5px",
                            }}
                          >
                            <span
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                borderBottom: locked
                                  ? word === q.correct[1][i]
                                    ? "2px solid #000"
                                    : "2px solid #ef4444"
                                  : "2px solid #000",
                                minWidth: "60px",
                                display: "inline-block",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: word ? "#1C398E" : "#000",
                              }}
                            >
                              {word}
                              {provided.placeholder}
                            </span>

                            {/* ❌ Wrong icon */}
                            {locked && word && word !== q.correct[1][i] && (
                              <div
                                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                 w-5 h-5  text-xs bg-red-500 text-white rounded-full
      flex items-center justify-center font-bold border-2 border-white
      pointer-events-none shadow-lg"
                              >
                                ✕
                              </div>
                            )}
                          </span>
                        )}
                      </Droppable>
                    );
                  })}{" "}
                  {q.answerEnd}
                </div>
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

export default Review2_Page1_Q2;
