import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 4.svg";

const Review4_Page1_Q1 = () => {
  const questions = [
    {
      text: "It is cold. There is snow on the ground. The trees have no leaves.",
      answer: "winter",
      correctImage: 3,
    },
    {
      text: "It is hot. The sun is shining. We are playing in the yard.",
      answer: "summer",
      correctImage: 4,
    },
    {
      text: "It is cool. The leaves on the trees are turning brown. We like to play in the leaves.",
      answer: "autumn",
      correctImage: 1,
    },
    {
      text: "It is warm. The flowers and plants are growing. There are baby birds in the trees.",
      answer: "spring",
      correctImage: 2,
    },
  ];

  const wordBank = ["spring", "summer", "autumn", "winter"];
  const numbers = [1, 2, 3, 4];
  const images = [img1, img2, img3, img4];

  const [answers, setAnswers] = useState(Array(4).fill(""));
  const [imageNumbers, setImageNumbers] = useState([null, null, null, null]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // =========================
  // DRAG END
  // =========================
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // ✨ كلمات
    if (draggableId.startsWith("season-")) {
      const value = draggableId.replace("season-", "");
      const index = Number(destination.droppableId);

      if (!isNaN(index)) {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
      }
    }

    // 🔥 أرقام
    if (draggableId.startsWith("num-")) {
      const number = Number(draggableId.split("-")[1]);

      if (destination.droppableId.startsWith("image-")) {
        const index = Number(destination.droppableId.split("-")[1]);

        const updated = [...imageNumbers];
        updated[index] = number;
        setImageNumbers(updated);
      }
    }
  };

  // =========================
  // SHOW ANSWERS
  // =========================
  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));

    // 🔥 هاي الإضافة
    setImageNumbers(questions.map((q) => q.correctImage));

    setShowCorrect(true);
    setWrongMarks([]);
  };

  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(questions.map(() => ""));
    setImageNumbers([null, null, null, null]);
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // =========================
  // CHECK ANSWERS
  // =========================
  const checkAnswers = () => {
    if (showCorrect) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let wrong = [];

    questions.forEach((q, i) => {
      const wordCorrect =
        answers[i]?.trim().toLowerCase() === q.answer.toLowerCase();

      const imageCorrect = imageNumbers[i] === q.correctImage;

      if (!wordCorrect || !imageCorrect) {
        wrong.push({
          qIndex: i,
          wordWrong: !wordCorrect,
          imageWrong: !imageCorrect,
        });
      }

      if (wordCorrect) score++;
      if (imageCorrect) score++;
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const total = questions.length * 2;
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
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>A</span> Read and write the
            season. Number the pictures .
          </h5>
          <Droppable droppableId="mixed" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "8px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  marginTop: "15px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* 🔢 الأرقام */}
                {[1, 2, 3, 4].map((num, index) => {
                  const isUsed = imageNumbers.includes(num);

                  return (
                    <Draggable
                      key={`num-${num}`}
                      draggableId={`num-${num}`}
                      index={index}
                      isDragDisabled={isUsed} // 🔥 disable
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            width: "32px",
                            height: "32px",
                            border: "2px solid #1C398E",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "14px",
                            opacity: isUsed ? 0.4 : 1, // 🔥 opacity
                            cursor: isUsed ? "not-allowed" : "grab",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            {...provided.dragHandleProps}
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {num}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {/* 🌸 الكلمات */}
                {wordBank.map((word, index) => {
                  const isUsed = answers.includes(word);

                  return (
                    <Draggable
                      key={`season-${word}`}
                      draggableId={`season-${word}`}
                      index={index + 10}
                      isDragDisabled={isUsed} // 🔥 disable
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            padding: "5px 10px",
                            border: "2px solid #2c5287",
                            borderRadius: "6px",
                            background: "white",
                            fontWeight: "bold",
                            fontSize: "13px",
                            opacity: isUsed ? 0.4 : 1, // 🔥 opacity
                            cursor: isUsed ? "not-allowed" : "grab",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <span
                            {...provided.dragHandleProps}
                            style={{
                              display: "inline-block",
                              cursor: isUsed ? "not-allowed" : "grab",
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* الصور */}
          <div style={{ marginTop: "20px" }}>
            {questions.map((q, i) => {
              const wrongItem = wrongMarks.find((w) => w.qIndex === i);

              const isWordWrong = wrongItem?.wordWrong;
              const isImageWrong = wrongItem?.imageWrong;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    gap: "20px",
                  }}
                >
                  {/* 🟢 TEXT */}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: "bold" }}>{i + 1}</span> {q.text}
                    <br />
                    It’s{" "}
                    <Droppable droppableId={`${i}`}>
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            borderBottom: `2px solid ${
                              showCorrect
                                ? isWordWrong
                                  ? "red"
                                  : "#1C398E"
                                : "black"
                            }`,
                            display: "inline-block",
                            padding: "0 4px",
                            minWidth: answers[i] ? "auto" : "60px", // 🔥 الحل
                            marginLeft: "8px",
                            color: "#1C398E",
                            fontWeight: "bold",
                            position: "relative",
                            textAlign: "center",
                          }}
                        >
                          {answers[i]}
                          {provided.placeholder}

                          {/* ❌ للكلمة */}
                          {showCorrect && isWordWrong && (
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "-30px",
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
                    .
                  </div>

                  {/* 🟠 IMAGE + NUMBER */}
                  <Droppable droppableId={`image-${i}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          position: "relative",
                          border: "2px solid orange",
                          borderRadius: "16px",
                          padding: "6px",
                          background: "#fff",
                        }}
                      >
                        <img
                          src={images[i]}
                          style={{
                            width: "170px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />

                        {/* 🔢 الرقم */}
                        <div
                          style={{
                            position: "absolute",
                            right: "-10px",
                            bottom: "-10px",
                            width: "40px",
                            height: "40px",
                            background: "white",
                            border: "2px solid orange",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "18px",
                            color:
                              showCorrect && isImageWrong ? "red" : "black",
                          }}
                        >
                          {imageNumbers[i]}

                          {/* ❌ للرقم */}
                          {showCorrect && isImageWrong && (
                            <span
                              style={{
                                position: "absolute",
                                top: "-1px",
                                right: "-8px",
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
                            </span>
                          )}
                        </div>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>

        {/* buttons */}
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

export default Review4_Page1_Q1;
