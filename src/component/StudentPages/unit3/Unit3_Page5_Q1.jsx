import React, { useState } from "react";
import "./Unit3_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 9.svg";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WrongMark from "../../WrongMark";

const data = [
  { img: img1, pattern: "icken", answer: "ch", position: "start" },
  { img: img2, pattern: "pea", answer: "ch", position: "end" },
  { img: img3, pattern: "fi", answer: "sh", position: "end" },
  { img: img4, pattern: "wa", answer: "tch", position: "end" },
  { img: img5, pattern: "ell", answer: "sh", position: "start" },
  { img: img6, pattern: "ma", answer: "tch", position: "end" },
  { img: img7, pattern: "kitchen", answer: "tch", position: "middle" },
  { img: img8, pattern: "bea", answer: "ch", position: "end" },
  { img: img9, pattern: "op", answer: "sh", position: "start" },
];
const Unit3_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW
  const lettersBank = [
    { id: "l1", value: "ch" },
    { id: "l2", value: "tch" },
    { id: "l3", value: "sh" },
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
          <div className="unscramble-container">
            <h5 className="header-title-page8 pb-2.5">
              <span className="ex-A" style={{ marginRight: "10px" }}>
                A
              </span>
              Look and write<span style={{ color: "#2e3192" }}>ch</span>,
              <span style={{ color: "#2e3192" }}>tch</span>or<span style={{ color: "#2e3192" }}>sh</span>.
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

            <div className="unscramble-row-wb-unit1-p8-q1 ">
              {data.map((item, index) => (
                <div className="unscramble-box" key={index}>
                  <div className="input-row-wb-unit1-p8-q1">
                    <span
                      className="num"
                      style={{ fontSize: "25px", fontWeight: "600" }}
                    >
                      {index + 1}
                    </span>
                    <div className="img-box-wb-unit1-p8-q1">
                      <img src={item.img} alt="" />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="pattern"
                        style={{
                          fontSize: "22px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {/* start */}
                        {item.position === "start" && (
                          <Droppable
                            droppableId={String(index)}
                            isDropDisabled={showAnswer}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`WB-unit1-p8-q1-input ${
                                  wrongInputs[index] ? "wrong-line" : ""
                                }`}
                                style={{
                                  color: inputs[index] ? "#1C398E" : "#000",
                                }}
                              >
                                {inputs[index]}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}

                        {item.position !== "middle" && item.pattern}

                        {/* end */}
                        {item.position === "end" && (
                          <Droppable
                            droppableId={String(index)}
                            isDropDisabled={showAnswer}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`WB-unit1-p8-q1-input ${
                                  wrongInputs[index] ? "wrong-line" : ""
                                }`}
                                style={{
                                  color: inputs[index] ? "#1C398E" : "#000",
                                }}
                              >
                                {inputs[index]}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}

                        {/* middle */}
                        {item.position === "middle" && (
                          <>
                            {"ki"} {/* أول جزء */}
                            <Droppable
                              droppableId={String(index)}
                              isDropDisabled={showAnswer}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`WB-unit1-p8-q1-input ${
                                    wrongInputs[index] ? "wrong-line" : ""
                                  }`}
                                  style={{
                                    color: inputs[index] ? "#1C398E" : "#000",
                                  }}
                                >
                                  {inputs[index]}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                            {"en"} {/* آخر جزء */}
                          </>
                        )}
                      </span>

                      {/* ✅ WrongMark INLINE */}
                      {wrongInputs[index] && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-1px",
                            top: "50%",
                            marginLeft: 0,
                          }}
                        >
                          <WrongMark />
                        </div>
                      )}
                    </div>
                  </div>
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
      </div>
    </DragDropContext>
  );
};

export default Unit3_Page5_Q1;
