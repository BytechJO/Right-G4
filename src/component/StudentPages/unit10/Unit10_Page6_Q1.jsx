import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Ex D 4.svg";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

const exerciseQuestions = [
  {
    id: "g1",
    img: img1,
    questions: [
      { id: "q1", text: "She will go to the beach.", correctAnswer: true },
      {
        id: "q2",
        text: "She will go to the library.",
        correctAnswer: false,
      },
    ],
  },
  {
    id: "g2",
    img: img2,
    questions: [
      { id: "q3", text: "He will plant a tree.", correctAnswer: false },
      { id: "q4", text: "He will go to his grandparents’ farm.", correctAnswer: true },
    ],
  },
  {
    id: "g3",
    img: img3,
    questions: [
      { id: "q5", text: "She will go to the park.", correctAnswer: true },
      {
        id: "q6",
        text: "She will go to a restaurant.",
        correctAnswer: false,
      },
    ],
  },
  {
    id: "g4",
    img: img4,
    questions: [
      { id: "q7", text: "She will do her homework.", correctAnswer: true },
      { id: "q8", text: "She will watch TV.", correctAnswer: false },
    ],
  },
];

const Unit10_Page6_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleShowAnswer = () => {
    const correct = {};

    exerciseQuestions.forEach((group) => {
      group.questions.forEach((q) => {
        correct[q.id] = q.correctAnswer;
      });
    });

    setUserAnswers(correct);
  };
  const handleStartAgain = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const checkAnswers = () => {
    let totalQuestions = 0;
    let correctCount = 0;

    exerciseQuestions.forEach((group) => {
      group.questions.forEach((q) => {
        totalQuestions++;

        if (userAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
    });

    if (Object.keys(userAnswers).length < totalQuestions) {
      ValidationAlert.info();
      return;
    }

    setShowResults(true);

    if (correctCount === totalQuestions) {
      ValidationAlert.success(`Score: ${correctCount}/${totalQuestions}`);
    } else if (correctCount === 0) {
      ValidationAlert.error(`Score: ${correctCount}/${totalQuestions}`);
    } else {
      ValidationAlert.warning(`Score: ${correctCount}/${totalQuestions}`);
    }
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
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-3">D</span>
          Read, look, and write <span className="text-[#D1232A]">
            ✓
          </span> and <span className="text-[#D1232A]">✕</span>
        </h5>

        <div>
          {exerciseQuestions.map((group, groupIndex) => (
            <div key={group.id} className="mb-5">
              <div className="grid grid-cols-[300px_1fr_auto] gap-x-6 items-start ">
                {/* left side: number + image */}
                <div className="flex items-start gap-3 ">
                  <span className="font-bold text-black text-[22px] leading-none mt-2 w-6">
                    {groupIndex + 1}
                  </span>

                  <img
                    src={group.img}
                    alt={`Group ${groupIndex + 1}`}
                    style={{
                      width: "260px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* right: true / false boxes */}
                <div className="flex flex-col gap-6 pt-2">
                  {group.questions.map((question) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between"
                    >
                      {/* النص */}
                      <p className="text-[20px] text-black font-medium leading-[1.8]">
                        {question.text}
                      </p>

                      {/* البوكسات */}
                      <div className="flex items-center gap-x-4 relative">
                        {/* ✓ */}
                        <div
                          onClick={() => handleSelectAnswer(question.id, true)}
                          className={`w-8 h-8 border-2 border-orange-500 rounded-md cursor-pointer flex items-center justify-center `}
                        >
                          {userAnswers[question.id] === true && (
                            <span className="text-blue-900 font-bold text-2xl">
                              ✓
                            </span>
                          )}
                        </div>

                        {/* ✕ */}
                        <div
                          onClick={() => handleSelectAnswer(question.id, false)}
                          className={`w-8 h-8 border-2 border-orange-500 rounded-md cursor-pointer flex items-center justify-center`}
                        >
                          {userAnswers[question.id] === false && (
                            <span className="text-blue-900 font-bold text-2xl">
                              ✕
                            </span>
                          )}
                        </div>
                        {showResults &&
                          userAnswers[question.id] !== undefined &&
                          userAnswers[question.id] !==
                            exerciseQuestions
                              .flatMap((g) => g.questions)
                              .find((q) => q.id === question.id)
                              ?.correctAnswer && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "-5px",
                                right: "-40px",
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
                                boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                pointerEvents: "none",
                              }}
                            >
                              ✕
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page6_Q1;
