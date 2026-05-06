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

export default function WB_Unit3_Page19_QG() {
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
    if (!showResults || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;
    const showCorrectAsSelected = showAns && item.correct === option;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        className={`g-option ${
          selected || showCorrectAsSelected ? "selected" : ""
        } ${wrong ? "wrong" : ""} ${showAns ? "disabled" : ""}`}
      >
        {option}
        {wrong && <div className="g-wrong-mark">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-g-wrapper * {
          box-sizing: border-box !important;
        }

        .wb-g-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          column-gap: clamp(18px, 2.5vw, 42px) !important;
          row-gap: clamp(28px, 4vw, 60px) !important;
          align-items: start !important;
          width: 100% !important;
        }

        .wb-g-card {
          display: flex !important;
          align-items: flex-start !important;
          gap: clamp(10px, 1.2vw, 16px) !important;
          width: 100% !important;
          min-width: 0 !important;
        }

        .wb-g-number {
          font-size: clamp(18px, 2vw, 28px) !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          min-width: clamp(18px, 2vw, 28px) !important;
          margin-top: clamp(4px, 0.6vw, 8px) !important;
          flex-shrink: 0 !important;
        }

        .wb-g-content {
          display: flex !important;
          align-items: flex-start !important;
          gap: clamp(10px, 1.5vw, 18px) !important;
          width: 100% !important;
          min-width: 0 !important;
        }

        .wb-g-img-wrap {
          width: clamp(100px, 15vw, 170px) !important;
          height: clamp(80px, 11vw, 130px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
          min-width: 0 !important;
        }

        .wb-g-img {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-g-options {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(8px, 1vw, 12px) !important;
          min-width: 0 !important;
          width: 100% !important;
          padding-top: clamp(2px, 0.4vw, 6px) !important;
          flex: 1 1 auto !important;
        }

        .wb-g-option-row {
          width: 100% !important;
          min-width: 0 !important;
        }

        .g-option {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: auto !important;
          max-width: 100% !important;
          min-height: clamp(30px, 4vw, 42px) !important;
          padding: clamp(4px, 0.6vw, 6px) clamp(12px, 1.4vw, 18px) !important;
          border-radius: 999px !important;
          border: 3px solid transparent !important;
          background: transparent !important;
          color: #111 !important;
          font-size: clamp(15px, 1.6vw, 24px) !important;
          line-height: 1.2 !important;
          cursor: pointer !important;
          user-select: none !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          white-space: nowrap !important;
          word-break: normal !important;
          overflow-wrap: normal !important;
          text-align: center !important;
        }

        .g-option.selected {
          border-color: #d62828 !important;
        }

        .g-option.wrong {
          border-color: #ef4444 !important;
        }

        .g-option.disabled {
          cursor: default !important;
        }

        .g-wrong-mark {
          position: absolute !important;
          top: -10px !important;
          right: -10px !important;
          width: clamp(18px, 2vw, 24px) !important;
          height: clamp(18px, 2vw, 24px) !important;
          border-radius: 50% !important;
          background: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: clamp(10px, 1vw, 12px) !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18) !important;
          box-sizing: border-box !important;
          z-index: 2 !important;
        }

        .wb-g-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 4px !important;
        }

        @media (max-width: 1024px) {
          .wb-g-content {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .wb-g-img-wrap {
            width: clamp(110px, 22vw, 180px) !important;
            height: clamp(84px, 17vw, 135px) !important;
          }

          .wb-g-options {
            width: 100% !important;
          }

          .g-option {
            font-size: clamp(15px, 2vw, 22px) !important;
          }
        }

        @media (max-width: 700px) {
          .wb-g-grid {
            grid-template-columns: 1fr !important;
            row-gap: clamp(22px, 4vw, 34px) !important;
          }

          .wb-g-card {
            gap: 10px !important;
          }

          .wb-g-content {
            gap: 10px !important;
          }
        }
      `}</style>

      <div
        className="div-forall wb-g-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">G</span> Look, read, and circle.
        </h1>

        <div className="wb-g-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-g-card">
              <div className="wb-g-number">{item.id}</div>

              <div className="wb-g-content">
                <div className="wb-g-img-wrap">
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    className="wb-g-img"
                  />
                </div>

                <div className="wb-g-options">
                  {item.options.map((option) => (
                    <div key={option} className="wb-g-option-row">
                      {renderOption(item, option)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-g-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}