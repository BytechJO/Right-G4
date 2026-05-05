/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "./Unit8_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex A2-6.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import blue from "../../../assets/audio/ClassBook/Unit 8/P 68/unit8-pg68-EXA2.mp3";

const Unit8_Page5_Q2 = () => {
  const [locked, setLocked] = useState(false);

  const questions = [
    {
      id: 1,
      image1: img1,
      image2: img2,
      correct: "✗",
    },
    { id: 2, image1: img3, image2: img4, correct: "✓" },
    {
      id: 3,
      image1: img5,
      image2: img6,
      correct: "✓",
    },
  ];
  const captions = [
    {
      start: 0.459,
      end: 13.119,
      text: "Page sixty-eight, Write Activities. Exercise A, number two. Does it have the same E-S sound? Listen and write check or X.",
    },
    {
      start: 14.139,
      end: 25.179,
      text: "One, bikes, horses. Two, foxes, boxes. Three, buses, sandwiches",
    },
  ];
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);

  const selectAnswer = (id, value) => {
    if (locked) return;
    setAnswers({ ...answers, [id]: value });
    setShowResult(false);
  };

  const showAnswers = () => {
    const corrects = {};
    questions.forEach((q) => {
      corrects[q.id] = q.correct;
    });
    setAnswers(corrects);
    setShowResult([]);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => !answers[q.id]);
    if (isEmpty) {
      ValidationAlert.info("Please choose ✓ or ✗ for all questions!");
      return;
    }

    const results = questions.map((q) =>
      answers[q.id] === q.correct ? "correct" : "wrong",
    );
    setShowResult(results);
    setLocked(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = questions.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${scoreMsg}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers({});
    setShowResult([]);
    setLocked(false);
  };

  return (
    <>
      <div
        className="u8p5-wrapper"
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
          <h5 className="header-title-page8">
            <span style={{ color: "#2e3192", marginRight: "10px" }}>2</span>{" "}
            Does it have the same <span style={{ color: "#2e3192" }}>-es </span>
            sound? Listen and write
            <span style={{ color: "#D52328" }}>✓</span> or{" "}
            <span style={{ color: "#D52328" }}>✗</span>.
          </h5>
          <QuestionAudioPlayer
            src={blue}
            captions={captions}
            stopAtSecond={13.2}
          />

          <div className="grid grid-cols-3 gap-[30px] u8p5-grid">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="u8p5-card p-4 bg-white flex flex-col items-center gap-3 relative"
              >
                {/* رقم السؤال */}
                <p className="w-full text-left text-[20px] u8p5-card-num">
                  <span className="text-[darkblue] font-bold">{q.id}.</span>
                </p>

                <div className="flex flex-col items-center gap-3.5">
                  {/* الصور */}
                  <div className="u8p5-images-box border-2 border-[#ff6b57] rounded-xl p-4 w-[250px]">
                    <div className="flex">
                      {/* الديف الأول */}
                      <div className="u8p5-img-cell w-1/2 border-r-2 border-[#ff6b57] flex items-center justify-center h-[150px]">
                        <img
                          src={q.image1}
                          alt=""
                          style={{ height: "120px", objectFit: "contain" }}
                        />
                      </div>

                      {/* الديف الثاني */}
                      <div className="u8p5-img-cell w-1/2 flex items-center justify-center h-[150px]">
                        <img
                          src={q.image2}
                          alt=""
                          style={{ height: "120px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* الخيارات */}
                  <div className="u8p5-opts-row flex gap-5">
                    {/* ✓ */}
                    <div className="relative">
                      <div
                        className={`u8p5-opt-btn w-[45px] h-[45px] border-2 border-[#ff6b57] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 hover:bg-[#ffe3df] ${
                          answers[q.id] === "✓"
                            ? "bg-[#2c5287] text-white"
                            : "bg-white"
                        }`}
                        onClick={() => selectAnswer(q.id, "✓")}
                      >
                        ✓
                      </div>

                      {showResult[index] === "wrong" &&
                        answers[q.id] === "✓" && (
                          <div className="u8p5-wrong-badge absolute -top-2.5 -right-2.5 w-[22px] h-[22px] rounded-full bg-red-500 text-white flex items-center justify-center text-[14px] font-bold border-2 border-white z-3">
                            ✕
                          </div>
                        )}
                    </div>

                    {/* ✗ */}
                    <div className="relative">
                      <div
                        className={`u8p5-opt-btn w-[45px] h-[45px] border-2 border-[#ff6b57] rounded-md flex items-center justify-center cursor-pointer text-[22px] font-bold transition-all duration-150 ${
                          answers[q.id] === "✗"
                            ? "bg-[#2c5287] text-white"
                            : "bg-white hover:bg-[#ffe3df]"
                        }`}
                        onClick={() => selectAnswer(q.id, "✗")}
                      >
                        ✗
                      </div>

                      {showResult[index] === "wrong" &&
                        answers[q.id] === "✗" && (
                          <div className="u8p5-wrong-badge absolute -top-2.5 -right-2.5 w-[22px] h-[22px] rounded-full bg-red-500 text-white flex items-center justify-center text-[14px] font-bold border-2 border-white z-3">
                            ✕
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons-container">
            <button onClick={resetAnswers} className="try-again-button">
              Start Again ↻
            </button>
            <button
              onClick={showAnswers}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unit8_Page5_Q2;
