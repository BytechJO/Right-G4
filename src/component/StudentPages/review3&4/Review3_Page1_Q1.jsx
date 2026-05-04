import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q1.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import boy from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 1.svg";
import girl from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 2.svg";
import sarah from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 3.svg";
import jack from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 4.svg";

const Review3_Page1_Q1 = () => {
  const items = [
    {
      text: "What do you have in your lunchbox?",
      answer: null,
      speaker: "boy",
    },

    {
      text: "I have ______ sandwiches.",
      answer: "lunch meat",
      speaker: "girl",
    },

    { text: "Do you have ______ fruit?", answer: "any", speaker: "boy" },

    {
      text: "Yes, I have some ______ and ______.",
      answer: ["grapes", "cherries"],
      speaker: "girl",
    },

    { text: "Do you have any sweets?", answer: null, speaker: "boy" },

    {
      text: "No, I haven’t any ______, but I have some ______.",
      answer: ["sweets", "chips"],
      speaker: "girl",
    },

    { text: "Can I have ______?", answer: "some", speaker: "boy" },

    {
      text: "What’s the ______? Are you ______?",
      answer: ["matter", "hungry"],
      speaker: "girl",
    },

    { text: "Yes, I am!", answer: null, speaker: "boy" },
  ];

  const wordBank = [
    "sweets",
    "chips",
    "some",
    "lunch meat",
    "hungry",
    "any",
    "grapes",
    "matter",
    "cherries",
  ];

  const [answers, setAnswers] = useState(
    items.map((item) =>
      !item.answer
        ? [] // 🔥 جملة بدون فراغ
        : Array.isArray(item.answer)
          ? ["", ""]
          : [""],
    ),
  );
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // =========================
  // DRAG END (🔥 FIXED)
  // =========================
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const value = draggableId.replace("season-", "");
    const [qIndex, blankIndex] = destination.droppableId.split("-").map(Number);

    const updated = [...answers];
    updated[qIndex][blankIndex] = value;

    setAnswers(updated);
  };

  // =========================
  // SHOW ANSWERS (🔥 FIXED)
  // =========================
  const showAnswers = () => {
    setAnswers(
      items.map((item) =>
        Array.isArray(item.answer) ? item.answer : [item.answer],
      ),
    );
    setShowCorrect(true);
    setWrongMarks([]);
  };
  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(
      items.map((item) =>
        !item.answer ? [] : Array.isArray(item.answer) ? ["", ""] : [""],
      ),
    );
    setShowCorrect(false);
    setWrongMarks([]);
  };
  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showCorrect) return;

    // ❌ تحقق إذا في فراغ
    const hasEmpty = answers.some((arr) => arr.some((val) => val === ""));
    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = 0;
    let wrong = [];

    items.forEach((item, i) => {
      // 🔥 تجاهل الجمل اللي بدون فراغ
      if (!item.answer) return;

      if (Array.isArray(item.answer)) {
        item.answer.forEach((ans, j) => {
          total++;
          if (answers[i][j]?.trim().toLowerCase() === ans.toLowerCase()) {
            score++;
          } else {
            wrong.push({ qIndex: i, blankIndex: j });
          }
        });
      } else {
        total++;
        if (answers[i][0]?.trim().toLowerCase() === item.answer.toLowerCase()) {
          score++;
        } else {
          wrong.push({ qIndex: i, blankIndex: 0 });
        }
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
  const usedWords = answers.flat().filter(Boolean);
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
            <span style={{ marginRight: "10px" }}>A</span>Read and complete the
            conversation. Use the words below.
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              flexWrap: "wrap",
            }}
          ></div>
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
                {wordBank.map((word, index) => {
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
          {/* CONTENT */}
          <div
            style={{
              position: "relative", // 🔥 مهم
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {/* 🔵 LEFT SIDE (QUESTIONS) */}
            <div style={{ flex: 1 }}>
              <div className="space-y-6">
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={item.speaker === "boy" ? boy : girl}
                      alt="avatar"
                      style={{ width: "35px", height: "35px" }}
                    />

                    <div>
                      <div>
                        {!item.answer ? (
                          <span>{item.text}</span>
                        ) : (
                          item.text.split("______").map((part, j) => {
                            const isWrong = wrongMarks.some(
                              (w) => w.qIndex === i && w.blankIndex === j,
                            );

                            return (
                              <span key={j}>
                                {part}

                                {j < (answers[i]?.length || 0) && (
                                  <Droppable droppableId={`${i}-${j}`}>
                                    {(provided) => (
                                      <span
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                          display: "inline-block",
                                          minWidth: "100px",
                                          borderBottom: `2px solid ${
                                            showCorrect
                                              ? isWrong
                                                ? "red"
                                                : "#1C398E"
                                              : "black"
                                          }`,
                                          margin: "0 5px",
                                          textAlign: "center",
                                          fontWeight: "bold",
                                          position: "relative",
                                          color: "#1C398E",
                                        }}
                                      >
                                        {answers[i][j]}
                                        {provided.placeholder}

                                        {showCorrect && isWrong && (
                                          <div
                                            style={{
                                              position: "absolute",
                                              top: "-6px",
                                              right: "-6px",
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
                                              boxShadow:
                                                "0 2px 6px rgba(0,0,0,0.2)",
                                              pointerEvents: "none",
                                            }}
                                          >
                                            ✕
                                          </div>
                                        )}
                                      </span>
                                    )}
                                  </Droppable>
                                )}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟠 RIGHT SIDE (IMAGES) */}
            <div
              style={{
                position: "absolute",
                top: "50px", // 🔥 عدلها حسب المكان
                right: "0px", // 🔥 أو 20px حسب المسافة
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={sarah}
                alt="sarah"
                style={{ width: "150px", height: "120px" }}
              />
              <img
                src={jack}
                alt="jack"
                style={{ width: "150px", height: "120px" }}
              />
            </div>
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

export default Review3_Page1_Q1;
