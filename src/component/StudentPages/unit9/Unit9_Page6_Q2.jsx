import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81/Ex E 4.svg";
import Button from "../../Button";

const Unit9_Page6_Q2 = () => {
  const items = [
    {
      img: img1,
      q: "Was he at the zoo?",
      options: ["Yes, he was.", "No, he wasn’t."],
      correct: "No, he wasn’t.",
    },
    {
      q: "Was she in the restaurant?",
      img: img2,
      options: ["Yes, she was.", "No, she wasn’t."],
      correct: "Yes, she was.",
    },
    {
      q: "Was she at the bakery?",
      img: img3,
      options: ["Yes, she was.", "No, she wasn’t."],
      correct: "No, she wasn’t.",
    },
    {
      q: "Where is she now?",
      img: img4,
      options: ["She is on the train.", "She is in the computer lab."],
      correct: "She is in the computer lab.",
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
          <span className="ex-A" style={{ marginRight: "10px" }}>
            E
          </span>
          Read, look, and circle
        </h5>

        <div className="grid grid-cols-2 gap-y-5 gap-x-20 mt-10 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                position: "relative",
              }}
            >
              {/* الرقم + السؤال */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: "18px" }}>{item.q}</span>
              </div>

              {/* الصورة */}
              <img
                src={item.img}
                alt=""
                style={{
                  width: "300px",
                  height: "auto",
                  border: "2px solid orange",
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
              />

              {/* الخيارات */}
              <div className="flex flex-col gap-3 text-[20px]">
                {item.options.map((opt, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <span
                      onClick={() => chooseOption(i, opt)}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
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

                    {/* ❌ */}
                    {showResult &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "50%",
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
                          }}
                        >
                          ✕
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

export default Unit9_Page6_Q2;
