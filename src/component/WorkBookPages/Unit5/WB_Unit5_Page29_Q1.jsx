import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgDesk from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/SVG/Asset 1.svg";
import imgBed from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/SVG/Asset 3.svg";
import imgShelf from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/SVG/Asset 4.svg";
import imgToyBox from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/SVG/Asset 2.svg";
import imgChair from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/SVG/Asset 5.svg";

const WORD_BANK = ["in", "on", "next to", "between", "under"];

const SCENE_ITEMS = [
  { id: 1, img: imgDesk, className: "wb-e-scene-desk", alt: "desk" },
  { id: 2, img: imgBed, className: "wb-e-scene-bed", alt: "bed" },
  { id: 3, img: imgShelf, className: "wb-e-scene-shelf", alt: "shelf" },
  { id: 4, img: imgToyBox, className: "wb-e-scene-toybox", alt: "toy box" },
  { id: 5, img: imgChair, className: "wb-e-scene-chair", alt: "chair" },
];

const ITEMS = [
  {
    id: 1,
    fixed: true,
    question: "Where is the pen?",
    answer: "It is on the desk.",
  },
  {
    id: 2,
    fixed: false,
    question: "Where is the doll?",
    options: [
      "It is under the bed.",
      "It is on the bed.",
      "It is next to the chair.",
      "It is in the toy box.",
    ],
    correct: "It is under the bed.",
  },
  {
    id: 3,
    fixed: false,
    question: "Where is the teddy?",
    options: [
      "It is between the books.",
      "It is under the desk.",
      "It is next to the ball.",
      "It is in the toy box.",
    ],
    correct: "It is between the books.",
  },
  {
    id: 4,
    fixed: false,
    question: "Where is the car?",
    options: [
      "It is in the toy box.",
      "It is under the chair.",
      "It is on the shelf.",
      "It is next to the bed.",
    ],
    correct: "It is in the toy box.",
  },
  {
    id: 5,
    fixed: false,
    question: "Where is the ball?",
    options: [
      "It is next to the chair.",
      "It is under the desk.",
      "It is between the books.",
      "It is on the shelf.",
    ],
    correct: "It is next to the chair.",
  },
];

export default function WB_Unit5_Page28_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const nonFixedItems = ITEMS.filter((item) => !item.fixed);

    const allAnswered = nonFixedItems.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = nonFixedItems.length;

    nonFixedItems.forEach((item) => {
      if (answers[item.id] === item.correct) {
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
      <div className="wb-e-select-wrap">
        <select
          value={getValue(item.id)}
          disabled={showAns}
          onChange={(e) => handleChange(item.id, e.target.value)}
          className={`wb-e-select ${getValue(item.id) ? "wb-e-select--filled" : ""}`}
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
        {!showAns && <span className="wb-e-arrow">▼</span>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-scene-stage img,
        .wb-e-scene-item img {
          width: 100% !important;
          height: auto !important;
          max-height: none !important;
          object-fit: contain;
          display: block;
        }

        .wb-e-scene-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .wb-e-scene-stage {
          width: min(100%, 980px);
          aspect-ratio: 980 / 360;
          position: relative;
          overflow: visible;
          flex-shrink: 0;
        }

        .wb-e-scene-item {
          position: absolute;
          transform-origin: top left;
        }

        .wb-e-scene-desk {
          width: 16.8%;
          left: 2.2%;
          top: 7%;
        }

        .wb-e-scene-bed {
          width: 33.5%;
          left: 30.8%;
          top: 3%;
          z-index: 2;
        }

        .wb-e-scene-shelf {
          width: 25.2%;
          right: 3%;
          top: 0.5%;
        }

        .wb-e-scene-toybox {
          width: 16.8%;
          left: 17.4%;
          top: 46.2%;
          z-index: 1;
        }

        .wb-e-scene-chair {
          width: 10.8%;
          right: 11.3%;
          top: 36.6%;
        }

        .wb-e-bank-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .wb-e-bank {
          width: 100%;
          max-width: 560px;
          min-height: 52px;
          border: 3px solid #f39b42;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2vw, 34px);
          padding: 10px 18px;
          box-sizing: border-box;
          flex-wrap: wrap;
          background: #fff;
        }

        .wb-e-bank-word {
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.1;
          color: #222;
          font-weight: 500;
        }

        .wb-e-list {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wb-e-row {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
          width: 100%;
        }

        .wb-e-num {
          font-size: clamp(14px, 1.4vw, 20px);
          font-weight: 700;
          line-height: 1;
          color: #222;
          padding-top: 8px;
        }

        .wb-e-line-wrap {
          position: relative;
          width: 100%;
        }

        .wb-e-line {
          width: 100%;
          min-height: 40px;
          border-bottom: 3px solid #2f2f2f;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 4px;
          box-sizing: border-box;
          min-width: 0;
          flex-wrap: nowrap;
        }

        .wb-e-question {
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.3;
          color: #111;
          font-weight: 500;
          white-space: nowrap;
          flex: 0 1 auto;
        }

        .wb-e-answer-fixed {
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.3;
          color: #111;
          font-weight: 500;
        }

        .wb-e-answer-show {
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.3;
          color: #d62828;
          font-weight: 500;
          word-break: break-word;
        }

        .wb-e-wrong {
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

        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1 1 auto;
          min-width: 180px;
          max-width: 380px;
        }

        .wb-e-select {
          width: 100%;
          min-width: 0;
          height: clamp(30px, 3vw, 38px);
          border: 2px solid #c9c9c9;
          border-radius: 10px;
          background: #fff;
          padding: 0 34px 0 12px;
          font-size: clamp(12px, 1.3vw, 17px);
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

        .wb-e-select--filled {
          color: #111;
        }

        .wb-e-select:disabled {
          opacity: 1;
          cursor: default;
        }

        .wb-e-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #666;
          pointer-events: none;
        }

        .wb-e-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .wb-e-row {
            grid-template-columns: 28px 1fr;
            gap: 10px;
          }

          .wb-e-line {
            min-height: auto;
            gap: 6px;
            padding-bottom: 8px;
          }

          .wb-e-question {
            white-space: normal;
          }

          .wb-e-select-wrap {
            flex: 1 1 180px;
          }

          .wb-e-bank {
            gap: 12px 18px;
            border-width: 2px;
            border-radius: 16px;
            min-height: 48px;
            padding: 8px 14px;
          }
        }

        @media (max-width: 560px) {
          .wb-e-select {
            height: 36px;
            padding: 0 28px 0 10px;
            font-size: 13px;
          }

          .wb-e-line {
            flex-wrap: wrap;
            min-height: auto;
            gap: 6px;
            padding-bottom: 8px;
          }

          .wb-e-question {
            white-space: normal;
          }

          .wb-e-select-wrap {
            flex: 1 1 180px;
            max-width: 100%;
          }

          .wb-e-arrow {
            right: 10px;
            font-size: 11px;
          }

          .wb-e-bank-word {
            font-size: 13px;
          }

          .wb-e-wrong {
            right: -4px;
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
            fontSize: "clamp(16px, 1.8vw, 24px)",
          }}
        >
          <span className="WB-ex-A">E</span>
          Look, read, and answer.
        </h1>

        <div className="wb-e-scene-wrap">
          <div className="wb-e-scene-stage">
            {SCENE_ITEMS.map((item) => (
              <div key={item.id} className={`wb-e-scene-item ${item.className}`}>
                <img src={item.img} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="wb-e-bank-wrap">
          <div className="wb-e-bank">
            {WORD_BANK.map((word) => (
              <span key={word} className="wb-e-bank-word">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="wb-e-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-e-row">
              <div className="wb-e-num">{item.id}</div>

              <div className="wb-e-line-wrap">
                <div className="wb-e-line">
                  <span className="wb-e-question">{item.question}</span>

                  {item.fixed ? (
                    <span className="wb-e-answer-fixed">{item.answer}</span>
                  ) : showAns ? (
                    <span className="wb-e-answer-show">{item.correct}</span>
                  ) : (
                    renderSelect(item)
                  )}
                </div>

                {isWrong(item) && <div className="wb-e-wrong">✕</div>}
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