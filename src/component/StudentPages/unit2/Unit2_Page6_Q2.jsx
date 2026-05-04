import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 8.svg";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Unit2_Page6_Q2 = () => {
  const questions = [
    { img: img1, option: ["a taxi", "a bus"], answer: "a bus" },
    { img: img2, option: ["an airplane", "a train"], answer: "a train" },
    { img: img3, option: ["a boat", "an airplane"], answer: "an airplane" },
    { img: img4, option: ["a car", "a ship"], answer: "a ship" },
    { img: img5, option: ["a bike", "a bus"], answer: "a bike" },
    { img: img6, option: ["a ship", "a taxi"], answer: "a taxi" },
    { img: img7, option: ["a car", "a scooter"], answer: "a car" },
    { img: img8, option: ["the subway", "a bike"], answer: "the subway" },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [locked, setLocked] = useState(false);

  const choose = (index, value) => {
    if (locked) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const resetAll = () => {
    setAnswers(Array(questions.length).fill(""));
    setLocked(false);
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    answers.forEach((a, i) => {
      if (a === questions[i].answer) score++;
    });

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const message = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color};font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

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
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            E
          </span>
          Look, read, and circle.
        </h5>
        {/* 🔥 GRID */}
        <div className="grid grid-cols-4 gap-6 text-center mt-5">
          {questions.map((q, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              {/* IMAGE + NUMBER */}
              <div className="relative">
                <img
                  src={q.img}
                  style={{
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <div className="absolute -top-3 -left-3 font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              <div
                className="bg-[#ead6cc] rounded-xl  flex flex-col  items-center"
                style={{
                  width: "160px", 
                }}
              >
                {q.option.map((type) => {
                  const selected = answers[index] === type;

                  return (
                    <div
                      key={type}
                      onClick={() => choose(index, type)}
                      className={`cursor-pointer px-2 py-1 rounded-full`}
                      style={{
                        border: selected
                          ? locked
                            ? type === q.answer
                              ? "2px solid #1C398E" // 🔵 صح
                              : "2px solid #ef4444" // 🔴 غلط
                            : "2px solid #1C398E" // قبل check
                          : "2px solid transparent",
                        position: "relative",
                      }}
                    >
                      {type} a
                      {locked && selected && type !== q.answer && <WrongMark />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit2_Page6_Q2;
