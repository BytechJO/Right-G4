import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 2.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 5.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 6.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 7.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page9_Q1.css";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page9_Q1 = () => {
  const questions = [
    { id: 1, text: "The clown is taller than the boy.", answer: 2 },
    { id: 2, text: "The car is faster than the bike.", answer: 3 },
    { id: 3, text: "The couch is bigger than the TV.", answer: 6 },
    { id: 4, text: "The book is heavier than the pen.", answer: 1 },
    { id: 5, text: "The clown is thinner than the panda bear.", answer: 5 },
    { id: 6, text: "The feather is lighter than the bag.", answer: 4 },
  ];
  const wordBank = ["1", "2", "3", "4", "5", "6"];
  const images = [img1, img2, img3, img4, img5, img6];
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل
  const [showResult, setShowResult] = useState(false);
  const onDragEnd = (result) => {
    if (locked) return;

    const { destination, draggableId } = result;

    if (!destination) return;

    const value = Number(draggableId.replace("season-", ""));

    // ✅ إذا رجع للبنك
    if (destination.droppableId === "bank") {
      setAnswers((prev) => {
        const newAnswers = { ...prev };

        Object.keys(newAnswers).forEach((key) => {
          if (newAnswers[key] === value) {
            delete newAnswers[key];
          }
        });

        return newAnswers;
      });

      return;
    }

    // ✅ إذا راح على صورة
    const imageIndex = Number(destination.droppableId.split("-")[1]);

    setAnswers((prev) => ({
      ...prev,
      [imageIndex]: value,
    }));
  };
  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(answers).length < images.length) {
      ValidationAlert.info();
      return;
    }

    setShowResult(true); // 🔥 مهم

    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b style="color:${color};">Score: ${correct} / ${total}</b>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };

  const reset = () => {
    setAnswers({});
    setLocked(false); // ⭐ NEW — إعادة التعديل
    setShowResult(false);
  };

  // ⭐⭐⭐ NEW — showAnswer
  const showAnswer = () => {
    const correct = {};

    questions.forEach((q, index) => {
      correct[index] = q.answer;
    });

    setAnswers(correct);
    setLocked(true);
  };
  const usedWords = Object.values(answers).filter(Boolean);
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
              D
            </span>
            Read and number the pictures.
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
                }}
              >
                {wordBank.map((word, index) => {
                  const isUsed = usedWords.includes(Number(word));

                  return (
                    <Draggable
                      key={word}
                      draggableId={`season-${word}`}
                      index={index}
                      isDragDisabled={locked || isUsed}
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
          <div className=" mt-6 flex gap-10">
            <div className="flex flex-col gap-12 w-1/2">
              {questions.map((q) => (
                <p key={q.id}>
                  <span className="font-bold mr-2">{q.id}</span>
                  {q.text}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-1/2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="border-2 border-orange-400 rounded-xl relative overflow-hidden"
                  style={{ height: "100px" }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                  {showResult && answers[i] && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        left: "-6px",
                        right: "-6px",
                        bottom: "-6px",
                        border:
                          Number(answers[i]) === questions[i].answer
                            ? "3px solid green"
                            : "3px solid red",
                        borderRadius: "16px",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* ❌ WrongMark */}
                  {showResult &&
                    answers[i] &&
                    Number(answers[i]) !== questions[i].answer && (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: 10, // 🔥 هذا المهم
                        }}
                      >
                        <WrongMark
                          top="bottom-2.5"
                          left="left-6"
                          marginLeft=""
                        />
                      </div>
                    )}

                  {/* input */}
                  <Droppable droppableId={`image-${i}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="
                                          absolute bottom-0 left-0
                                          w-10 h-10
                                          border border-orange-400
                                          bg-white
                                          flex items-center justify-center
                                          rounded-xl rounded-bl-none
                                          font-bold
                                        "
                      >
                        <span style={{ color: "#2c5287" }}>
                          {answers[i] && answers[i]}
                        </span>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
          {/* BUTTONS */}
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

export default Page9_Q1;
