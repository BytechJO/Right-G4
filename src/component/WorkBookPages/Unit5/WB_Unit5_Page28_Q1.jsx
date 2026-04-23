import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import topImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C1.svg";
import topImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C2.svg";
import topImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C3.svg";
import topImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C4.svg";
import topImg5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C5.svg";

import iconBoy1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C6.svg";
import iconBoy2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C7.svg";
import iconGirl1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C8.svg";
import iconGirl2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C9.svg";
import iconSofa from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C10.svg";
import iconFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 28/C11.svg";

const ITEMS = [
  {
    id: 1,
    question: "Is he in the bedroom?",
    icon: iconBoy1,
    lines: [
      {
        key: "line1",
        type: "select",
        options: ["Yes, he is.", "No, he isn't."],
        correct: "No, he isn't.",
      },
      {
        key: "line2",
        type: "select",
        options: [
          "He's in the bathroom.",
          "He's in the kitchen.",
          "He's in the bedroom.",
          "He's in the living room.",
        ],
        correct: "He's in the bathroom.",
      },
    ],
  },
  {
    id: 2,
    question: "Is he in the living room?",
    icon: iconBoy2,
    lines: [
      {
        key: "line1",
        type: "select",
        options: ["Yes, he is.", "No, he isn't."],
        correct: "Yes, he is.",
      },
      {
        key: "line2",
        type: "empty",
      },
    ],
  },
  {
    id: 3,
    question: "Is she in the bedroom?",
    icon: iconGirl1,
    lines: [
      {
        key: "line1",
        type: "select",
        options: ["Yes, she is.", "No, she isn't."],
        correct: "Yes, she is.",
      },
      {
        key: "line2",
        type: "empty",
      },
    ],
  },
  {
    id: 4,
    question: "Is she in the dining room?",
    icon: iconGirl2,
    lines: [
      {
        key: "line1",
        type: "select",
        options: ["Yes, she is.", "No, she isn't."],
        correct: "No, she isn't.",
      },
      {
        key: "line2",
        type: "select",
        options: [
          "She's in the kitchen.",
          "She's in the bedroom.",
          "She's in the bathroom.",
          "She's in the living room.",
        ],
        correct: "She's in the kitchen.",
      },
    ],
  },
  {
    id: 5,
    question: "Where's the sofa?",
    icon: iconSofa,
    lines: [
      {
        key: "line1",
        type: "select",
        options: [
          "It's in the living room.",
          "It's in the kitchen.",
          "It's in the bathroom.",
          "It's in the bedroom.",
        ],
        correct: "It's in the living room.",
      },
      {
        key: "line2",
        type: "empty",
      },
    ],
  },
  {
    id: 6,
    question: "Where's the fridge?",
    icon: iconFridge,
    lines: [
      {
        key: "line1",
        type: "select",
        options: [
          "It's in the kitchen.",
          "It's in the bathroom.",
          "It's in the living room.",
          "It's in the bedroom.",
        ],
        correct: "It's in the kitchen.",
      },
      {
        key: "line2",
        type: "empty",
      },
    ],
  },
];

const TOP_IMAGES = [topImg1, topImg2, topImg3, topImg4, topImg5];

export default function WB_Unit5_Page28_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (itemId, lineKey, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [lineKey]: value,
      },
    }));

    setChecked(false);
  };

  const getValue = (itemId, lineKey) => answers[itemId]?.[lineKey] || "";

  const isLineWrong = (item, line) => {
    if (!checked || showAns || line.type !== "select") return false;
    return getValue(item.id, line.key) !== line.correct;
  };

  const isItemWrong = (item) => {
    if (!checked || showAns) return false;

    return item.lines.some((line) => {
      if (line.type !== "select") return false;
      return getValue(item.id, line.key) !== line.correct;
    });
  };

  const checkAnswers = () => {
    if (showAns) return;

    const requiredLines = ITEMS.flatMap((item) =>
      item.lines.filter((line) => line.type === "select").map((line) => ({
        itemId: item.id,
        lineKey: line.key,
      }))
    );

    const allAnswered = requiredLines.every(
      ({ itemId, lineKey }) => getValue(itemId, lineKey).trim() !== ""
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      const allCorrect = item.lines.every((line) => {
        if (line.type !== "select") return true;
        return getValue(item.id, line.key) === line.correct;
      });

      if (allCorrect) score += 1;
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
    const filled = {};

    ITEMS.forEach((item) => {
      filled[item.id] = {};
      item.lines.forEach((line) => {
        if (line.type === "select") {
          filled[item.id][line.key] = line.correct;
        }
      });
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

  const renderLine = (item, line) => {
    if (line.type === "empty") {
      return <div className="wb-c-line wb-c-line--empty" />;
    }

    return (
      <div className="wb-c-line-wrap">
        <div className="wb-c-line">
          <div className="wb-c-select-wrap">
            <select
              value={getValue(item.id, line.key)}
              disabled={showAns}
              onChange={(e) => handleChange(item.id, line.key, e.target.value)}
              className={`wb-c-select ${
                getValue(item.id, line.key) ? "wb-c-select--filled" : ""
              }`}
            >
              <option value="" disabled hidden>
                Select
              </option>
              {line.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {!showAns && <span className="wb-c-arrow">▼</span>}
          </div>
        </div>

        {isLineWrong(item, line) && <div className="wb-c-wrong">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
          box-sizing: border-box;
        }

        .wb-c-top-images {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(6px, 1vw, 12px);
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
        }

        .wb-c-top-card {
          background: #f2f2f2;
          border: 2px solid #f39b42;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 1.12 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wb-c-top-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .wb-c-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(22px, 4vw, 40px) clamp(30px, 5vw, 70px);
          width: 100%;
          align-items: start;
        }

        .wb-c-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        .wb-c-question-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 14px);
          min-width: 0;
          flex-wrap: wrap;
        }

        .wb-c-num {
          font-size: clamp(11px, 0.9vw, 15px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          flex-shrink: 0;
        }

        .wb-c-icon {
          width: clamp(28px, 3vw, 42px);
          height: clamp(28px, 3vw, 42px);
          object-fit: contain;
          flex-shrink: 0;
        }

        .wb-c-question {
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.35;
          color: #111;
          font-weight: 500;
          min-width: 0;
        }

        .wb-c-answer-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: clamp(42px, 5vw, 58px);
        }

        .wb-c-line-wrap {
          position: relative;
          width: 100%;
        }

        .wb-c-line {
          width: 100%;
          min-height: clamp(32px, 3.5vw, 42px);
          border-bottom: 2.5px solid #3a3a3a;
          display: flex;
          align-items: center;
          padding-bottom: 3px;
          box-sizing: border-box;
        }

        .wb-c-line--empty {
          width: 100%;
          min-height: clamp(32px, 3.5vw, 42px);
          border-bottom: 2.5px solid #3a3a3a;
        }

        .wb-c-select-wrap {
          position: relative;
          width: 100%;
          max-width: 100%;
        }

        .wb-c-select {
          width: 100%;
          height: clamp(28px, 3vw, 36px);
          border: none;
          background: transparent;
          padding: 0 30px 0 0;
          font-size: clamp(12px, 1.3vw, 17px);
          line-height: 1.2;
          color: #000000ff;
          font-weight: 500;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          box-sizing: border-box;
          text-align: center;
          text-align-last: center;
          cursor: pointer;
        }

        .wb-c-select:disabled {
          cursor: default;
        }

        .wb-c-select option {
          color: #222;
          background: #fff;
        }

        .wb-c-arrow {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 11px;
          color: #666;
          pointer-events: none;
        }

        .wb-c-wrong {
          position: absolute;
          top: -8px;
          right: -8px;
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

        .wb-c-buttons {
          display: flex;
          justify-content: center;
          margin-top: 6px;
        }

        @media (max-width: 980px) {
          .wb-c-top-images {
            max-width: 680px;
          }

          .wb-c-grid {
            gap: 24px 28px;
          }
        }

        @media (max-width: 768px) {
          .wb-c-top-images {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            max-width: 520px;
          }

          .wb-c-grid {
            grid-template-columns: 1fr;
          }

          .wb-c-answer-block {
            padding-left: 0;
          }
        }

        @media (max-width: 560px) {
          .wb-c-top-images {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 340px;
          }

          .wb-c-question-row {
            align-items: flex-start;
          }

          .wb-c-question {
            font-size: 13px;
          }

          .wb-c-select {
            font-size: 13px;
          }

          .wb-c-wrong {
            width: 20px;
            height: 20px;
            font-size: 11px;
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
          <span className="WB-ex-A">C</span>
          Look, read, and write.
        </h1>

        <div className="wb-c-top-images">
          {TOP_IMAGES.map((img, index) => (
            <div key={index} className="wb-c-top-card">
              <img src={img} alt={`room-${index + 1}`} className="wb-c-top-img" />
            </div>
          ))}
        </div>

        <div className="wb-c-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c-item">
              <div className="wb-c-question-row">
                <div className="wb-c-num">{item.id}</div>
                <img src={item.icon} alt={`icon-${item.id}`} className="wb-c-icon" />
                <div className="wb-c-question">{item.question}</div>
              </div>

              <div className="wb-c-answer-block">
                {item.lines.map((line) => (
                  <React.Fragment key={line.key}>
                    {renderLine(item, line)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c-buttons">
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}