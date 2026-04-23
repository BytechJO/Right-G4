import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Do they have any vegetables?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    img: img2,
    question: "Does she have any hats?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    img: img3,
    question: "Do they have any drinks?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "Yes, they do have some.",
  },
  {
    id: 4,
    img: img4,
    question: "Does she have any ice cream?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "Yes, she has some.",
  },
];

export default function WB_Unit3_Page16_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        className={`wb-d16-option ${selected ? "selected" : ""} ${
          wrong ? "wrong" : ""
        }`}
        style={{
          cursor: showAns ? "default" : "pointer",
        }}
      >
        {option}

        {wrong && <div className="wb-d16-wrong-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-d16-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-d16-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 26px);
          width: 100%;
        }

        .wb-d16-row {
          display: grid;
          grid-template-columns:
            clamp(26px, 3vw, 38px)
            minmax(150px, clamp(220px, 27vw, 330px))
            minmax(0, 1fr);
          gap: clamp(12px, 1.8vw, 18px);
          align-items: center;
          width: 100%;
        }

        .wb-d16-num {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-d16-img {
          width: clamp(150px, 26vw, 320px);
          height: clamp(90px, 15vw, 170px);
          object-fit: contain;
          display: block;
          justify-self: start;
                              border: 2px solid #f39b42;
object-fit: cover;
        }

        .wb-d16-content {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 12px);
          justify-content: center;
          min-width: 0;
        }

        .wb-d16-question {
          font-size: clamp(16px, 2vw, 20px);
          color: #111;
          line-height: 1.4;
          margin-bottom: 2px;
          word-break: break-word;
        }

        .wb-d16-options {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.5vw, 16px);
          align-items: center;
        }

        .wb-d16-option {
          position: relative;
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.8vw, 18px);
          border-radius: 999px;
          border: 2px solid transparent;
          background-color: transparent;
          color: #111;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          transition: all 0.2s ease;
          box-sizing: border-box;
          min-width: fit-content;
          line-height: 1.35;
        }

        .wb-d16-option.selected {
          border-color: #f39b42;
        }

        .wb-d16-option.wrong {
          border-color: #dc2626;
        }

        .wb-d16-wrong-badge {
          position: absolute;
          top: clamp(-8px, -0.8vw, -6px);
          right: clamp(-8px, -0.8vw, -6px);
          width: clamp(18px, 2vw, 20px);
          height: clamp(18px, 2vw, 20px);
          border-radius: 50%;
          background-color: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        }

        .wb-d16-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(4px, 0.8vw, 6px);
        }

        @media (max-width: 900px) {
          .wb-d16-row {
            grid-template-columns:
              clamp(24px, 3vw, 34px)
              minmax(130px, clamp(180px, 30vw, 260px))
              minmax(0, 1fr);
            gap: 14px;
          }

          .wb-d16-img {
            width: clamp(140px, 28vw, 250px);
            height: clamp(90px, 18vw, 145px);
          }
        }

        @media (max-width: 700px) {
          .wb-d16-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-d16-num {
            font-size: clamp(18px, 4.8vw, 21px);
          }

          .wb-d16-img {
            justify-self: center;
            width: clamp(160px, 52vw, 280px);
            height: clamp(100px, 34vw, 170px);
          }

          .wb-d16-content {
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .wb-d16-question {
            font-size: clamp(15px, 4.2vw, 18px);
          }

          .wb-d16-option {
            width: 100%;
            text-align: center;
            font-size: clamp(14px, 3.8vw, 15px);
          }

          .wb-d16-options {
            width: 100%;
            gap: 10px;
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">C</span> Look, circle, and answer.
        </h1>

        <div className="wb-d16-wrap">
          <div className="wb-d16-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-d16-row">
                <div className="wb-d16-num">{item.id}</div>

                <img
                  src={item.img}
                  alt={`question-${item.id}`}
                  className="wb-d16-img"
                />

                <div className="wb-d16-content">
                  <div className="wb-d16-question">{item.question}</div>

                  <div className="wb-d16-options">
                    {item.options.map((option) => (
                      <React.Fragment key={option}>
                        {renderOption(item, option)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="wb-d16-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}