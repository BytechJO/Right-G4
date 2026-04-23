import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: [
      "She has a few apples in the bowl.",
      "She has a little apples in the bowl.",
    ],
    correct: "She has a few apples in the bowl.",
  },
  {
    id: 2,
    img: img2,
    options: [
      "She has a few water in the glass.",
      "She has a little water in the glass.",
    ],
    correct: "She has a little water in the glass.",
  },
  {
    id: 3,
    img: img3,
    options: [
      "There is a few chicken on the plate.",
      "There is a little chicken on the plate.",
    ],
    correct: "There is a little chicken on the plate.",
  },
  {
    id: 4,
    img: img4,
    options: [
      "They have a few cookies on the plate.",
      "They have a little cookies on the plate.",
    ],
    correct: "They have a few cookies on the plate.",
  },
];

export default function WB_Unit3_Page17_QJ() {
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
    const showCorrectAsSelected = showAns && item.correct === option;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        className={`wb-j-option ${
          selected || showCorrectAsSelected ? "selected" : ""
        } ${wrong ? "wrong" : ""} ${showAns ? "disabled" : ""}`}
      >
        {option}

        {wrong && <div className="wb-j-wrong-mark">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-j-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(18px, 3vw, 34px);
          row-gap: clamp(18px, 2.4vw, 22px);
          align-items: start;
          width: 100%;
        }

        .wb-j-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          min-width: 0;
        }

        .wb-j-number {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          margin: 0 0 clamp(6px, 1vw, 8px) 0;
        }

        .wb-j-img-frame {
          width: 100%;
          max-width: clamp(260px, 38vw, 420px);
          min-height: clamp(120px, 18vw, 150px);
          height: clamp(120px, 18vw, 150px);
          border: 2px solid #f39b42;
          border-radius: clamp(12px, 1.8vw, 14px);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-sizing: border-box;
          margin-bottom: clamp(8px, 1.2vw, 10px);
          padding: clamp(6px, 1vw, 8px);
        }

        .wb-j-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-j-options {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 10px);
          width: 100%;
          padding-left: 0;
          min-width: 0;
        }

        .wb-j-option-row {
          width: 100%;
          min-width: 0;
        }

        .wb-j-option {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: fit-content;
          max-width: 100%;
          padding: clamp(6px, 1vw, 8px) clamp(12px, 1.8vw, 16px);
          border-radius: 999px;
          border: 2px solid transparent;
          background: transparent;
          color: #111;
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.35;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          white-space: normal;
          word-break: break-word;
        }

        .wb-j-option.selected {
          border: 2px solid #d62828;
        }

        .wb-j-option.wrong {
          border: 2px solid #ef4444;
        }

        .wb-j-option.disabled {
          cursor: default;
        }

        .wb-j-wrong-mark {
          position: absolute;
          top: clamp(-10px, -1vw, -8px);
          right: clamp(-10px, -1vw, -8px);
          width: clamp(18px, 2vw, 22px);
          height: clamp(18px, 2vw, 22px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          box-sizing: border-box;
        }

        .wb-j-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(2px, 0.8vw, 4px);
        }

        @media (max-width: 900px) {
          .wb-j-grid {
            grid-template-columns: 1fr;
            row-gap: 18px;
          }

          .wb-j-img-frame {
            max-width: 100%;
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .wb-j-img-frame {
            height: clamp(140px, 42vw, 180px);
            min-height: clamp(140px, 42vw, 180px);
          }

          .wb-j-option {
            font-size: clamp(14px, 3.8vw, 16px);
            width: 100%;
            border-radius: 18px;
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
          <span className="WB-ex-A"> J </span> Read, look, and circle.
        </h1>

        <div className="wb-j-wrap">
          <div className="wb-j-grid">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-j-card">
                <div className="wb-j-number">{item.id}</div>

                <div className="wb-j-img-frame">
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    className="wb-j-img"
                  />
                </div>

                <div className="wb-j-options">
                  {item.options.map((option) => (
                    <div key={option} className="wb-j-option-row">
                      {renderOption(item, option)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="wb-j-buttons">
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