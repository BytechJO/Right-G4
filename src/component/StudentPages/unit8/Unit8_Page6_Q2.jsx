import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit8_Page6_Q1.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import bigImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 11.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 4.svg";

const Unit8_Page6_Q2 = () => {
  const items = [
    {
      text: "(clean)",
      answer: "Did Stella clean her shoes?",
      img: img1,
      sentenc: "No, she didn’t.",
    },
    {
      text: "(help)",
      answer: "Did Tom help his mom?",
      img: img2,
      sentenc: "Yes, he did.",
    },
    {
      text: "(play)",
      answer: "Did Jack play soccer?",
      img: img3,
      sentenc: "No, he didn’t",
    },
    {
      text: "(watch)",
      answer: "Did John watch TV?",
      img: img4,
      sentenc: "Yes, he did.",
    },
  ];

  const wordBank = [
    "Did Jack play soccer?",
    "Did John watch TV?",
    "Did Tom help his mom?",
    "Did Stella clean her shoes?",
  ];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // =========================
  // DRAG END (🔥 FIXED)
  // =========================
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const value = draggableId.replace("season-", "");
    const index = Number(destination.droppableId);

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // =========================
  // SHOW ANSWERS (🔥 FIXED)
  // =========================
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showCorrect) return;

    // ❌ إذا في فراغ
    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = items.length;
    let wrong = [];

    items.forEach((item, i) => {
      if (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()) {
        score++;
      } else {
        wrong.push({ qIndex: i });
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

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
          style={{ width: "60%", marginBottom: "40px" }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              E
            </span>
            Look, read, and write the questions. Use the pictures from Ex. D.
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <img
              src={bigImage}
              style={{ width: "auto", height: "auto", objectFit: "cover" }}
            />
          </div>
          {/* WORD BANK */}
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
                {wordBank.map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={`season-${word}`}
                    index={index}
                    isDragDisabled={answers.includes(word)}
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
                          cursor: answers.includes(word)
                            ? "not-allowed"
                            : "grab",
                          opacity: answers.includes(word) ? 0.4 : 1,
                          fontSize: "16px",
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
          {/* CONTENT */}

          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-7">
                {/* TEXT */}
                <span className="text-2xl md:text-xl lg:text-1xl">
                  {i + 1}. {item.text}
                </span>

                {/* INLINE DROP */}
                <Droppable droppableId={`${i}`}>
                  {(provided) => {
                    const isWrong = wrongMarks.some((w) => w.qIndex === i);

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          position: "relative",
                          flex: 1, // 🔥 هذا السر
                          textAlign: "center",
                          fontWeight: "bold",
                          color: answers[i] ? "#1C398E" : "black",
                          borderBottom: `2px solid ${
                            showCorrect
                              ? isWrong
                                ? "red"
                                : "#1C398E"
                              : "black"
                          }`,
                          paddingBottom: "4px",
                        }}
                      >
                        {answers[i]}
                        {provided.placeholder}

                        {showCorrect && isWrong && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "-28px",
                              transform: "translateY(-50%)",
                              width: "22px",
                              height: "22px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Droppable>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center", // 🔥 نفس المستوى
                    gap: "10px", // مسافة بينهم
                  }}
                >
                  <img
                    src={item.img}
                    style={{
                      width: "auto",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />

                  <span style={{ fontSize: 18 }}>{item.sentenc}</span>
                </div>
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

export default Unit8_Page6_Q2;
