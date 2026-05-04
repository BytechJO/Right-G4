import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/test6.png";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex B 7.svg";
const Page8_Q3 = () => {
  const [showResult, setShowResult] = useState(false);
  const questions = [
    {
      id: 1,
      text: "Jad is older than his dad.",
      answer: "false",
      images: [img1], // صورة وحدة
    },
    {
      id: 2,
      text: "The giraffe is taller than the bear.",
      answer: "true",
      images: [img2, img3], // صورتين
    },
    {
      id: 3,
      text: "The bus is faster than the airplane.",
      answer: "false",
      images: [img4, img5],
    },
    {
      id: 4,
      text: "The car is bigger than the bike.",
      answer: "true",
      images: [img6, img7],
    },
  ];

  const [answers, setAnswers] = useState({});

  const [locked, setLocked] = useState(false);

  const reset = () => {
    setAnswers({ 1: "", 2: "", 3: "" });
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.answer;
    });
    setAnswers(filled);
    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (questions.some((q) => !answers[q.id])) {
      ValidationAlert.info("Please answer all questions");
      return;
    }

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
    setLocked(true);
  };
  return (
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
            B
          </span>
          Look and write
          <span style={{ color: "#2e3192" }}>true</span>or
          <span style={{ color: "#2e3192" }}>false</span>.
        </h5>
        <div className=" flex flex-col  gap-8 mt-8">
          {questions.map((q) => (
            <div key={q.id} className="flex items-center">
              <div className="flex items-center gap-4 w-[55%]">
                <span className="font-bold text-xl">{q.id}</span>
                <span className="text-[1.2rem]">{q.text}</span>
              </div>

              <div className="flex flex-col items-center w-[25%]">
                <div className="flex gap-6 mb-2">
                  {["true", "false"].map((val) => {
                    const isSelected = answers[q.id] === val;
                    const isCorrect = q.answer === val;

                    return (
                      <span
                        key={val}
                        onClick={() => {
                          if (locked) return;
                          setAnswers({ ...answers, [q.id]: val });
                        }}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          padding: "4px 12px",
                          display: "inline-block",
                        }}
                      >
                        {val}

                        {/* الدائرة */}
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              left: "-10px",
                              right: "-10px",
                              bottom: "-6px",
                              border: isSelected
                                ? showResult
                                  ? isCorrect
                                    ? "2px solid #1C398E"
                                    : "2px solid #ef4444"
                                  : "2px solid #1C398E"
                                : "none",
                              borderRadius: "20px",
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {showResult && isSelected && !isCorrect && (
                          <div
                            style={{
                              position: "absolute",
                              right: "-2px", // 🔥 حركها يمين
                              top: "0px", // 🔥 حركها لأعلى
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                      </span>
                    );
                  })}
                </div>

                {/* الخط */}
                <div className="w-[70%] border-b-[3px] border-gray-500"></div>
              </div>

              {/* الصورة */}
                <div className="w-[50%] flex justify-center gap-2">
                  {q.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt=""
                      style={{
                        width: q.images.length === 1 ? "100px" : "70px",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Page8_Q3;
