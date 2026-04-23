import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 8.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    question: "Which one is lighter, the tiger or the cat?",
    middleText: "is lighter than",
    firstOptions: ["The tiger", "The cat"],
    lastOptions: ["the tiger", "the cat"],
    correctFirst: "The cat",
    correctLast: "the tiger",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    question: "Which one is taller, the man or the boy?",
    middleText: "is taller than",
    firstOptions: ["The man", "The boy"],
    lastOptions: ["the man", "the boy"],
    correctFirst: "The man",
    correctLast: "the boy",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    question: "Which one is faster, the skateboard or the car?",
    middleText: "is faster than",
    firstOptions: ["The skateboard", "The car"],
    lastOptions: ["the skateboard", "the car"],
    correctFirst: "The car",
    correctLast: "the skateboard",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    question: "Which one is thinner, the tree or the flower?",
    middleText: "is thinner than",
    firstOptions: ["The tree", "The flower"],
    lastOptions: ["the tree", "the flower"],
    correctFirst: "The flower",
    correctLast: "the tree",
  },
];

export default function WB_Unit3_Page19_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, field, value) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.first && answers[item.id]?.last
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      const isCorrect =
        answers[item.id]?.first === item.correctFirst &&
        answers[item.id]?.last === item.correctLast;
      if (isCorrect) score += 1;
    });
    setChecked(true);
    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => {
      filledAnswers[item.id] = {
        first: item.correctFirst,
        last: item.correctLast,
      };
    });
    setAnswers(filledAnswers);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item, field) => {
    if (!checked || showAns) return false;
    if (field === "first") return answers[item.id]?.first !== item.correctFirst;
    return answers[item.id]?.last !== item.correctLast;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(18px, 4vw, 54px);
          row-gap: clamp(18px, 3vw, 34px);
          align-items: start;
          width: 100%;
        }

        .wb-e-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.4vw, 14px);
          min-width: 0;
          width: 100%;
        }

        .wb-e-top {
          display: flex;
          gap: clamp(8px, 1vw, 14px);
          align-items: flex-start;
          min-width: 0;
          width: 100%;
        }

        .wb-e-num {
          min-width: clamp(16px, 2vw, 24px);
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          padding-top: clamp(4px, 1vw, 8px);
          flex-shrink: 0;
        }

        .wb-e-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 12px);
          min-width: 0;
        }

        .wb-e-images {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 22px);
          min-height: clamp(56px, 12vw, 120px);
          width: 100%;
        }

        .wb-e-img-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(56px, 12vw, 120px);
          min-width: 0;
        }

        .wb-e-img {
          max-width: 100%;
          max-height: clamp(56px, 12vw, 120px);
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-e-question {
          font-size: clamp(13px, 1.7vw, 20px);
          line-height: 1.3;
          color: #222;
          font-weight: 500;
          word-break: break-word;
        }

        .wb-e-answer-block {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 10px);
          width: 100%;
          min-width: 0;
        }

        .wb-e-answer-line {
          border-bottom: 3px solid #4a4a4a;
          padding-bottom: clamp(4px, 0.8vw, 6px);
          min-height: clamp(34px, 6vw, 54px);
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.8vw, 8px);
          width: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
        }

        .wb-e-select {
          width: 100%;
          height: clamp(32px, 3.2vw, 42px);
          min-width: 0;
          border: 2px solid #c9c9c9;
          border-radius: clamp(7px, 1vw, 10px);
          background: #fff;
          padding: 0 clamp(20px, 2.2vw, 32px) 0 clamp(6px, 0.8vw, 10px);
          font-size: clamp(10px, 1.2vw, 16px);
          font-weight: 500;
          color: #333;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          box-sizing: border-box;
          line-height: 1.1;
          text-align: center;
          text-align-last: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wb-e-select.has-value {
          color: #000000ff;
        }

        .wb-e-select.wrong {
          border-color: #e53935;
        }

        .wb-e-select:disabled {
          cursor: default;
        }

        .wb-e-arrow {
          position: absolute;
          right: clamp(5px, 0.7vw, 10px);
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8px, 0.9vw, 11px);
          color: #666;
          pointer-events: none;
        }

        .wb-e-middle {
          font-size: clamp(10px, 1.2vw, 16px);
          font-weight: 500;
          color: #222;
          line-height: 1.2;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .wb-e-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .wb-e-grid {
            grid-template-columns: 1fr;
          }

          .wb-e-answer-line {
            flex-wrap: nowrap;
          }

          .wb-e-middle {
            font-size: clamp(12px, 2vw, 18px);
          }

          .wb-e-select {
            font-size: clamp(12px, 2vw, 16px);
          }
        }

        @media (max-width: 600px) {
          .wb-e-answer-line {
            flex-wrap: wrap;
          }

          .wb-e-select-wrap {
            flex: 1 1 40%;
          }

          .wb-e-middle {
            width: 100%;
            text-align: center;
            font-size: 15px;
          }

          .wb-e-select {
            font-size: 13px;
            height: 36px;
          }
        }

        @media (max-width: 420px) {
          .wb-e-answer-line {
            flex-direction: column;
            align-items: stretch;
          }

          .wb-e-select-wrap {
            width: 100%;
            flex: 1 1 auto;
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
          <span className="WB-ex-A">E</span>
          Look and read. Answer the questions.
        </h1>

        <div className="wb-e-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-e-item">
              <div className="wb-e-top">
                <div className="wb-e-num">{item.id}</div>

                <div className="wb-e-content">
                  <div className="wb-e-images">
                    <div className="wb-e-img-box">
                      <img
                        src={item.leftImg}
                        alt={`left-${item.id}`}
                        className="wb-e-img"
                      />
                    </div>
                    <div className="wb-e-img-box">
                      <img
                        src={item.rightImg}
                        alt={`right-${item.id}`}
                        className="wb-e-img"
                      />
                    </div>
                  </div>

                  <div className="wb-e-question">{item.question}</div>

                  <div className="wb-e-answer-block">
                    <div className="wb-e-answer-line">
                      <div className="wb-e-select-wrap">
                        <select
                          value={answers[item.id]?.first || ""}
                          disabled={showAns}
                          onChange={(e) =>
                            handleSelect(item.id, "first", e.target.value)
                          }
                          className={`wb-e-select ${isWrong(item, "first") ? "wrong" : ""} ${answers[item.id]?.first ? "has-value" : ""}`}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {item.firstOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {!showAns && <span className="wb-e-arrow">▼</span>}
                      </div>

                      <span className="wb-e-middle">{item.middleText}</span>

                      <div className="wb-e-select-wrap">
                        <select
                          value={answers[item.id]?.last || ""}
                          disabled={showAns}
                          onChange={(e) =>
                            handleSelect(item.id, "last", e.target.value)
                          }
                          className={`wb-e-select ${isWrong(item, "last") ? "wrong" : ""} ${answers[item.id]?.last ? "has-value" : ""}`}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {item.lastOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {!showAns && <span className="wb-e-arrow">▼</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-e-buttons">
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