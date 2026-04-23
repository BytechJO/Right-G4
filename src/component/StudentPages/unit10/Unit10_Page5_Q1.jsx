import React, { useState } from "react";
import "./Unit10_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 4.svg";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WrongMark from "../../WrongMark";

const data = [
  { img: img1, pattern: "uck", answer: "tr" },
  { img: img2, pattern: "eam", answer: "dr" },
  { img: img3, pattern: "ess", answer: "dr" },
  { img: img4, pattern: "ee", answer: "tr" },
];
const Unit10_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW
  const lettersBank = [
    { id: "l1", value: "dr" },
    { id: "l2", value: "tr" },
  ];

  const onDragEnd = (result) => {
    if (!result.destination || showAnswer) return;

    const letter = lettersBank.find((l) => l.id === result.draggableId)?.value;
    const targetIndex = Number(result.destination.droppableId);

    setInputs((prev) => {
      const copy = [...prev];
      copy[targetIndex] = letter; // ✔ نفس الحرف مسموح يتكرر
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (showAnswer) return; // ❌ ممنوع التعديل بعد Show Answer

    if (inputs.some((val) => val.trim() === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrongFlags = [];

    data.forEach((item, index) => {
      if (inputs[index].toLowerCase() === item.answer) {
        correctCount++;
        wrongFlags[index] = false;
      } else {
        wrongFlags[index] = true;
      }
    });

    setWrongInputs(wrongFlags);
    setShowAnswer(true);
    const total = data.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const correct = data.map((item) => item.answer);
    setInputs(correct); // ⭐ تعبئة الإجابة الصحيحة
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(false);
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "60%",
            justifyContent: "flex-start",
          }}
        >
          <h5 className="header-title-page8 pb-2.5">
            <span className="ex-A mr-3">A</span>
            <span style={{ color: "#2e3192", marginRight: "10px" }}>1</span>
            Look and write
            <span style={{ color: "#2e3192" }}>dr</span>or
            <span style={{ color: "#2e3192" }}>tr</span>.
          </h5>

          <Droppable droppableId="letters" direction="horizontal">
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
                  // justifyContent: "center",
                }}
              >
                {lettersBank.map((l, i) => (
                  <Draggable
                    key={l.id}
                    draggableId={l.id}
                    index={i}
                    isDragDisabled={showAnswer}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "7px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          cursor: "grab",
                          fontSize: "22px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {l.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-7">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-10 relative p-3"
              >
                {/* الرقم */}
                <span className="absolute -top-2 -left-2 text-lg font-bold">
                  {index + 1}
                </span>

                {/* الصورة */}
                <div className="w-[150px] h-24 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt=""
                    className="max-w-full max-h-full"
                  />
                </div>

                {/* الكلمة */}
                <div className="flex items-center gap-1 text-xl">
                  {/* drop */}
                  <Droppable
                    droppableId={String(index)}
                    isDropDisabled={showAnswer}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-w-[30px] text-center font-bold border-b-4 transition-all ${
                          wrongInputs[index] ? "border-red-500" : "border-black"
                        } ${
                          inputs[index]
                            ? "text-blue-800 bg-blue-50 rounded px-1"
                            : "text-black"
                        }`}
                      >
                        {inputs[index]}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* pattern */}
                  <span>{item.pattern}</span>
                </div>

                {/* Wrong mark */}
                {wrongInputs[index] && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <WrongMark />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⭐ BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </DragDropContext>
  );
};

export default Unit10_Page5_Q1;
