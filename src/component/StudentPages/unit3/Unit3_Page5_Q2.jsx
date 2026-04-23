import React, { useState } from "react";
import "./Unit3_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 6.svg";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Button from "../../Button";

const data = [
  {
    img: img1,
    before: "There are",
    after: "bananas in the fridge.",
    answer: "a few",
  },
  {
    img: img2,
    before: "There’s",
    after: "orange juice.",
    answer: "a little",
  },
  {
    img: img3,
    before: "There is",
    after: "water in the glass.",
    answer: "a little",
  },
  {
    img: img4,
    before: "There is",
    after: "chocolate cake.",
    answer: "a little",
  },
  {
    img: img5,
    before: "There’s",
    after: "sugar.",
    answer: "a little",
  },
  {
    img: img6,
    before: "There are",
    after: "apples in the bowl.",
    answer: "a few",
  },
];

const options = [
  { id: "o1", value: "a little" },
  { id: "o2", value: "a few" },
];

export default function Unit3_Page5_Q2() {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination || showAnswer) return;

    const value = options.find((o) => o.id === result.draggableId)?.value;

    const index = Number(result.destination.droppableId);

    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (inputs.some((i) => i === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correct = 0;
    const wrong = [];

    data.forEach((item, i) => {
      if (inputs[i] === item.answer) {
        correct++;
        wrong[i] = false;
      } else {
        wrong[i] = true;
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const total = data.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

    if (correct === total) ValidationAlert.success(scoreMessage);
    else if (correct === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    setInputs(data.map((d) => d.answer));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const handleReset = () => {
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
                B
              </span>
             Look, read, and write.
            </h5>

            {/* OPTIONS */}
            <Droppable droppableId="options" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "flex",
                    gap: "15px",
                    margin: "20px 0",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {options.map((opt, i) => (
                    <Draggable
                      key={opt.id}
                      draggableId={opt.id}
                      index={i}
                      isDragDisabled={showAnswer}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "8px 16px",
                            border: "2px solid #2c5287",
                            borderRadius: "20px",
                            background: "#eee",
                            fontWeight: "bold",
                            cursor: "grab",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {opt.value}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* QUESTIONS */}
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // 🔥 عمودين
                gap: "30px 60px",
              }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "15px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{index + 1}</span>
                  <div style={{ position: "relative" }}>
                    <img
                      src={item.img}
                      style={{ width: "90px", height: "90px" }}
                    />
                    {wrongInputs[index] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "-6px",
                          width: "22px",
                          height: "22px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "bold",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>

                  {/* 🔥 الجمل */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap", // 🔥 يخليها ذكية
                    }}
                  >
                    {/* السطر الأول (فيه drag) */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{item.before}</span>

                      <Droppable droppableId={String(index)}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              minWidth: "100px",
                              borderBottom: `3px solid ${
                                wrongInputs[index] ? "red" : "#000"
                              }`,
                              textAlign: "center",
                              color: inputs[index] ? "#1C398E" : "#000",
                              fontWeight: "bold",
                            }}
                          >
                            {inputs[index]}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>

                    {/* السطر الثاني */}
                    <span>{item.after}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
