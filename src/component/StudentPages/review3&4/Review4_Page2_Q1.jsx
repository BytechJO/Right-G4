import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 4.svg";
import Button from "../../Button";

const Review4_Page2_Q1 = () => {
  const items = [
    {
      img: img1,
      options: ["that", "bath"],
      correct: "bath",
    },
    {
      img: img2,
      options: ["this", "Thursday"],
      correct: "Thursday",
    },
    {
      img: img3,
      options: ["mother", "Thursday"],
      correct: "mother",
    },
    {
      img: img4,
      options: ["bath", "thirsty"],
      correct: "thirsty",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
    setShowResult(true); // 🔥 مهم
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
          <span style={{ marginRight: "10px" }}>D</span>
          Look, read, and choose.
        </h5>

        <div className="grid grid-cols-2 gap-y-16 gap-x-20 mt-10 ">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-15px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {i + 1}
              </span>

              <img
                src={item.img}
                alt=""
                style={{
                  width: "15vw",
                  height: "20vh",
                  border: "2px solid orange",
                  borderRadius: 5,
                }}
              />

              <div className="flex flex-col gap-5 text-[20px]">
                {item.options.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span
                      onClick={() => chooseOption(i, opt)}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",

                        border:
                          selected[i] === opt
                            ? locked
                              ? opt === item.correct
                                ? "2px solid #1C398E"
                                : "2px solid #ef4444"
                              : "2px solid #1C398E"
                            : "2px solid transparent",
                      }}
                    >
                      {opt}
                    </span>

                    {showResult &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "50%",
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review4_Page2_Q1;
