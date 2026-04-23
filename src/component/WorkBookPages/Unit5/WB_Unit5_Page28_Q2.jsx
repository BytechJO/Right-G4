import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/Asset 92.svg";

const ITEMS = [
  {
    id: 1,
    fixed: true,
    prefix: "The mirror is",
    correct: "above the dresser.",
  },
  {
    id: 2,
    fixed: false,
    prefix: "The clock is next to the",
    options: ["window.", "bed.", "chair.", "dresser."],
    correct: "window.",
  },
  {
    id: 3,
    fixed: false,
    prefix: "The rug is",
    options: [
      "in front of the dresser.",
      "under the bed.",
      "next to the chair.",
      "above the bed.",
    ],
    correct: "in front of the dresser.",
  },
  {
    id: 4,
    fixed: false,
    prefix: "The chair is",
    options: [
      "under the clock.",
      "next to the window.",
      "in front of the bed.",
      "above the dresser.",
    ],
    correct: "under the clock.",
  },
  {
    id: 5,
    fixed: false,
    prefix: "The window is",
    options: [
      "above the bed.",
      "next to the rug.",
      "under the chair.",
      "in front of the clock.",
    ],
    correct: "above the bed.",
  },
  {
    id: 6,
    fixed: false,
    prefix: "The bed is",
    options: [
      "next to the chair.",
      "under the rug.",
      "above the window.",
      "in front of the mirror.",
    ],
    correct: "next to the chair.",
  },
];

export default function WB_Unit5_Page28_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.filter((item) => !item.fixed).every(
      (item) => answers[item.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      const userAnswer = item.fixed ? item.correct : answers[item.id];
      if (userAnswer === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      if (!item.fixed) {
        filled[item.id] = item.correct;
      }
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!checked || showAns || item.fixed) return false;
    return answers[item.id] !== item.correct;
  };

  const getValue = (id) => answers[id] || "";

  const renderSelect = (item) => {
    return (
      <div className="wb-room-select-wrap">
        <select
          value={getValue(item.id)}
          disabled={showAns}
          onChange={(e) => handleChange(item.id, e.target.value)}
          className={`wb-room-select ${
            getValue(item.id) ? "wb-room-select--filled" : ""
          }`}
        >
          <option value="" disabled hidden>
            Select
          </option>
          {item.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {!showAns && <span className="wb-room-arrow">▼</span>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-room-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 8px 0 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .wb-room-title {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .wb-room-image-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .wb-room-image-box {
          width: 100%;
          max-width: 520px;
          display: flex;
          justify-content: center;
        }

        .wb-room-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 14px;
        }

        .wb-room-list {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .wb-room-row {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
          width: 100%;
        }

        .wb-room-num {
          font-size: clamp(14px, 1.4vw, 20px);
          font-weight: 700;
          line-height: 1;
          color: #222;
          padding-top: 6px;
        }

        .wb-room-line-wrap {
          position: relative;
          width: 100%;
        }

        .wb-room-line {
          width: 100%;
          min-height: 40px;
          border-bottom: 3px solid #2f2f2f;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 4px;
          box-sizing: border-box;
          min-width: 0;
          flex-wrap: wrap;
        }

        .wb-room-prefix {
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.3;
          color: #111;
          font-weight: 500;
          white-space: nowrap;
        }

        .wb-room-answer-fixed {
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.3;
          color: #111;
          font-weight: 500;
        }

        .wb-room-answer-show {
          font-size: clamp(14px, 1.5vw, 20px);
          line-height: 1.3;
          color: #000000ff;
          font-weight: 500;
          word-break: break-word;
        }

        .wb-room-wrong {
          position: absolute;
          top: -7px;
          right: -7px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          box-sizing: border-box;
        }

        .wb-room-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 0 1 clamp(210px, 34vw, 430px);
          min-width: 170px;
          max-width: 100%;
        }

        .wb-room-select {
          width: 100%;
          min-width: 0;
          height: clamp(32px, 3vw, 38px);
          border: 2px solid #c9c9c9;
          border-radius: 10px;
          background: #fff;
          padding: 0 34px 0 12px;
          font-size: clamp(13px, 1.3vw, 18px);
          font-weight: 500;
          color: #222;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
          text-align-last: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wb-room-select--filled {
          color: #111;
        }

        .wb-room-select:disabled {
          opacity: 1;
          cursor: default;
        }

        .wb-room-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #666;
          pointer-events: none;
        }

        .wb-room-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .wb-room-list {
            gap: 12px;
          }

          .wb-room-line {
            min-height: 38px;
          }
        }

        @media (max-width: 768px) {
          .wb-room-wrapper {
            gap: 24px;
          }

          .wb-room-row {
            grid-template-columns: 28px 1fr;
            gap: 10px;
          }

          .wb-room-line {
            min-height: auto;
            padding-bottom: 6px;
            gap: 6px;
          }

          .wb-room-prefix {
            white-space: normal;
          }

          .wb-room-select-wrap {
            flex: 1 1 220px;
          }

          .wb-room-image-box {
            max-width: 420px;
          }
        }

        @media (max-width: 560px) {
          .wb-room-line {
            gap: 6px;
          }

          .wb-room-select {
            height: 40px;
            padding: 0 30px 0 10px;
            font-size: 15px;
          }

          .wb-room-arrow {
            right: 10px;
            font-size: 11px;
          }

          .wb-room-image-box {
            max-width: 320px;
          }
        }
      `}</style>

      <div
        className="div-forall"
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
            fontSize: "clamp(16px, 1.8vw, 24px)",
          }}
        >
          <span className="WB-ex-A">D</span>
          Read, look, and write.
        </h1>

        <div className="wb-room-image-wrap">
          <div className="wb-room-image-box">
            <img src={roomImg} alt="room" className="wb-room-image" />
          </div>
        </div>

        <div className="wb-room-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-room-row">
              <div className="wb-room-num">{item.id}</div>

              <div className="wb-room-line-wrap">
                <div className="wb-room-line">
                  <span className="wb-room-prefix">{item.prefix}</span>

                  {item.fixed ? (
                    <span className="wb-room-answer-fixed">{item.correct}</span>
                  ) : showAns ? (
                    <span className="wb-room-answer-show">{item.correct}</span>
                  ) : (
                    renderSelect(item)
                  )}
                </div>

                {isWrong(item) && <div className="wb-room-wrong">✕</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-room-buttons">
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