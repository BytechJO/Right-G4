import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex F 4.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const Unit8_Page6_Q3 = () => {
  const questions = [
    { id: 1, text: "First, she washed the dishes", answer: 2 },
    { id: 2, text: "Next, she shopped in the supermarket.", answer: 4 },
    { id: 3, text: "She carried home a grocery bag.", answer: 1 },
    { id: 4, text: "Then, she played with her sister Sarah.", answer: 3 },
  ];
  const images = [img1, img2, img3, img4];
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل
  const [showResult, setShowResult] = useState(false);

  const wordBank = ["1", "2", "3", "4"];
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
              F
            </span>
            Read and number the pictures.{" "}
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
          <div className="mt-6 flex flex-col gap-10 mb-7">
            {/* الصور أول */}
            <div className="flex gap-4 justify-center flex-wrap">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="border-2 border-orange-400 rounded-xl relative "
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "200px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* نفس الكود تبعك بدون تغيير 👇 */}
                  {showResult && answers[i] && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        left: "-6px",
                        right: "-6px",
                        bottom: "-6px",
                        borderRadius: "16px",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {showResult &&
                    answers[i] &&
                    Number(answers[i]) !== Number(questions[i].answer) && (
                      <div
                        style={{
                          position: "absolute",
                          top: "5%",
                          left: "-6px",
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
                          zIndex: 999,
                        }}
                      >
                        ✕
                      </div>
                    )}

                  <Droppable droppableId={`image-${i}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="
                          absolute top-0 left-0
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

            {/* الجمل تحت */}
            <div className="flex flex-col gap-6 text-left">
              <p>Yesterday, Stella did many things.</p>

              {questions.map((q) => (
                <p key={q.id}>
                  <span className="font-bold mr-2">{q.id}</span>
                  {q.text}
                </p>
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

export default Unit8_Page6_Q3;
