import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 15.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 16.svg";
import Button from "../../Button";

const Unit8_Page5_Q3 = () => {
  const items = [
    {
      img: img1,
      options: ["She was in class.", "She wasn’t in class."],
      correct: "She was in class.",
    },
    {
      img: img2,
      options: ["He was at the beach.", "He wasn’t at the beach."],
      correct: "He wasn’t at the beach.",
    },
    {
      img: img3,
      options: ["She was cleaning the car.", "She wasn’t cleaning the car."],
      correct: "She was cleaning the car.",
    },
    {
      img: img4,
      options: ["They were at the farm.", "They weren’t at the farm."],
      correct: "They weren’t at the farm.",
    },
  ];
  const [hovered, setHovered] = useState(null);
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
          <span className="ex-A" style={{ marginRight: "10px" }}>
            B
          </span>
          Look, read, and circle.
        </h5>

        <div
          className="
grid grid-cols-1 
lg:grid-cols-2 
gap-y-16 
gap-x-50
xl:gap-x-20   /* 🔥 للويب فقط */
mt-10
"
        >
          {" "}
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
                  width: "140px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div className="flex flex-col gap-5 text-[18px]">
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
                      onMouseEnter={() => setHovered(i + "-" + idx)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "inline-block",
                        padding: "6px 7px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",
                        whiteSpace: "nowrap",
                        background:
                          hovered === i + "-" + idx ? "#e0f2fe" : "transparent",

                        border:
                          selected[i] === opt
                            ? locked
                              ? opt === item.correct
                                ? "2px solid #1C398E"
                                : "2px solid #ef4444"
                              : "2px solid #1C398E"
                            : hovered === i + "-" + idx
                              ? "2px solid #60a5fa"
                              : "2px solid transparent",

                        transition: "0.2s", // 🔥 حركة ناعمة
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

export default Unit8_Page5_Q3;
