import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit9_Page5_Q2.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 51.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 52.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 53.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 54.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 80/unit9-pg80-EXB.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit9_Page5_Q2 = () => {
  const items = [
    {
      img: img1,
      options: ["dogs", "rocks", "bumps"],
      correct: ["rocks"],
    },
    {
      img: img2,
      options: ["frogs", "racks", "books"],
      correct: ["racks", "books"],
    },
    {
      img: img3,
      options: ["shoulders", "bats", "tacos"],
      correct: ["shoulders"],
    },
    {
      img: img4,
      options: ["sacks", "maps", "chairs"],
      correct: ["maps"],
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill([]));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
   const captions = [
    {
      start: 0.119,
      end: 11.699,
      text: "Page 80. Write activities. Exercise B. Listen and circle the words with the same final S sound. One, socks,",
    },
    { start: 12.859, end: 17.739, text: "dogs, rocks, bumps. Two, spoons," },
    { start: 18.979, end: 24.6, text: "frogs, racks, books. Three, folders," },
    { start: 25.76, end: 31.679, text: "shoulders, bats, tacos. Four, caps," },
    { start: 32.919, end: 35.399, text: "sacks, maps, chairs" },
  ];
  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    const current = newSelected[i];

    if (current.includes(value)) {
      // remove
      newSelected[i] = current.filter((v) => v !== value);
    } else {
      // add
      newSelected[i] = [...current, value];
    }

    setSelected(newSelected);
  };
  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };
  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    let total = 0;

    items.forEach((item, i) => {
      total += item.correct.length;

      // ✅ الصح
      item.correct.forEach((correctAns) => {
        if (selected[i]?.includes(correctAns)) {
          score++;
        }
      });

      // ❌ الغلط
      selected[i]?.forEach((ans) => {
        if (!item.correct.includes(ans)) {
          score--;
        }
      });
    });

    // ❗ ما نخليه ينزل تحت الصفر
    if (score < 0) score = 0;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
    setShowResult(true);
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
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-3">B</span>
          Listen and circle the words with the same final
          <span style={{ color: "#2e3192" }}>-s sound </span>?
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={9.5}
        />
        <div className="flex w-full">
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-y-10 gap-x-64 mt-1 mb-12">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col justify-center h-50">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[20px] font-bold text-[#2a4e7c]">
                      {i + 1}
                    </span>

                    <img
                      src={item.img}
                      alt=""
                      style={{
                        width: "150px",
                        height: "auto",
                      }}
                    />

                    {/* OPTIONS تحت الصورة وبالعرض */}
                    <div className="flex gap-3 text-[18px] mt-2">
                      {item.options.map((opt, idx) => (
                        <span
                          key={idx}
                          onClick={() => chooseOption(i, opt)}
                          className={`relative cursor-pointer px-3 py-1 rounded-full border-2 ${
                            selected[i]?.includes(opt)
                              ? showResult
                                ? items[i].correct.includes(opt)
                                  ? "border-[#1C398E] bg-blue-50"
                                  : "border-red-500"
                                : "border-[#1C398E] bg-blue-50"
                              : "border-transparent hover:bg-gray-100"
                          }`}
                        >
                          {opt}

                          {/* ❌ على الخيار الغلط */}
                          {showResult &&
                            selected[i]?.includes(opt) &&
                            !items[i].correct.includes(opt) && (
                              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                                ✕
                              </span>
                            )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit9_Page5_Q2;
