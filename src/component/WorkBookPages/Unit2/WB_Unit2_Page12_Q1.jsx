import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 6.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["a ship", "a police car"],
    correct: "a ship",
  },
  {
    id: 2,
    img: img2,
    options: ["a car", "a bike"],
    correct: "a car",
  },
  {
    id: 3,
    img: img3,
    options: ["a motorcycle", "a bike"],
    correct: "a bike",
  },
  {
    id: 4,
    img: img4,
    options: ["a taxi", "a truck"],
    correct: "a taxi",
  },
  {
    id: 5,
    img: img5,
    options: ["an airplane", "a bus"],
    correct: "an airplane",
  },
  {
    id: 6,
    img: img6,
    options: ["a scooter", "the subway"],
    correct: "the subway",
  },
];
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

export default function WB_Unit3_Page6_QG() {
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return answers[item.id] && answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;
    const showCorrectAsSelected = showAns && item.correct === option;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        className={`wb-g6-option ${
          selected || showCorrectAsSelected ? "selected" : ""
        } ${wrong ? "wrong" : ""} ${showAns ? "disabled" : ""}`}
      >
        {option}

        {wrong && <div className="wb-g6-wrong-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-g6-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-g6-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(28px, 4vw, 46px);
          row-gap: clamp(18px, 2.4vw, 28px);
          width: 100%;
          align-items: start;
        }

        .wb-g6-item {
          display: grid;
          grid-template-columns: clamp(20px, 2.4vw, 28px) clamp(70px, 11vw, 115px) minmax(0, 1fr);
          gap: clamp(10px, 1.6vw, 18px);
          align-items: center;
          width: 100%;
        }

        .wb-g6-number {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-g6-image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(72px, 11vw, 120px);
        }

        .wb-g6-image {
          max-width: 100%;
          max-height: clamp(72px, 11vw, 120px);
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-g6-options {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
          min-width: 0;
        }

        .wb-g6-option {
          position: relative;
          width: fit-content;
          max-width: 100%;
          padding: clamp(4px, 0.6vw, 6px) clamp(16px, 2vw, 26px);
          border: 3px solid transparent;
          border-radius: 999px;
          background: transparent;
          color: #222;
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 500;
          line-height: 1.2;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          box-sizing: border-box;
          white-space: normal;
          word-break: break-word;
        }

        .wb-g6-option.selected {
          border-color: ${ACTIVE_COLOR};
        }

        .wb-g6-option.wrong {
          border-color: ${WRONG_COLOR};
        }

        .wb-g6-option.disabled {
          cursor: default;
        }

        .wb-g6-wrong-badge {
          position: absolute;
          top: clamp(-8px, -0.8vw, -6px);
          right: clamp(-8px, -0.8vw, -6px);
          width: clamp(18px, 2vw, 22px);
          height: clamp(18px, 2vw, 22px);
          border-radius: 50%;
          background: ${WRONG_COLOR};
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

        .wb-g6-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(2px, 0.8vw, 6px);
        }

        @media (max-width: 900px) {
          .wb-g6-grid {
            column-gap: 22px;
            row-gap: 20px;
          }

          .wb-g6-item {
            grid-template-columns: 22px clamp(62px, 10vw, 90px) minmax(0, 1fr);
            gap: 10px;
          }

          .wb-g6-option {
            font-size: clamp(14px, 1.8vw, 18px);
          }
        }

        @media (max-width: 650px) {
          .wb-g6-grid {
            grid-template-columns: 1fr;
            row-gap: 18px;
          }

          .wb-g6-item {
            grid-template-columns: 22px clamp(70px, 16vw, 90px) minmax(0, 1fr);
          }

          .wb-g6-image-wrap {
            min-height: 76px;
          }

          .wb-g6-image {
            max-height: 76px;
          }
        }

        @media (max-width: 430px) {
          .wb-g6-item {
            grid-template-columns: 18px 58px minmax(0, 1fr);
            gap: 8px;
          }

          .wb-g6-option {
            font-size: 14px;
            padding: 4px 14px;
            border-width: 2px;
          }

          .wb-g6-number {
            font-size: 17px;
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
          <span className="WB-ex-A">G</span> Look, read, and circle.
        </h1>

        <div className="wb-g6-wrap">
          <div className="wb-g6-grid">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-g6-item">
                <div className="wb-g6-number">{item.id}</div>

                <div className="wb-g6-image-wrap">
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    className="wb-g6-image"
                  />
                </div>

                <div className="wb-g6-options">
                  {item.options.map((option) => (
                    <div key={option}>{renderOption(item, option)}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="wb-g6-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>
      </div>
    </div>
  );
}