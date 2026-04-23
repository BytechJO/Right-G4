import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    sentence: "It’s the 7th month of the year.",
    correct: "July",
  },
  {
    id: 2,
    sentence: "It’s the 2nd month of the year.",
    correct: "February",
  },
  {
    id: 3,
    sentence: "It’s the 5th month of the year.",
    correct: "May",
  },
  {
    id: 4,
    sentence: "It’s the 3rd month of the year.",
    correct: "March",
  },
  {
    id: 5,
    sentence: "It’s the 9th month of the year.",
    correct: "September",
  },
  {
    id: 6,
    sentence: "It’s the 12th month of the year.",
    correct: "December",
  },
];

const OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function WB_Unit3_Page20_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelectChange = (id, value) => {
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
    const filledAnswers = {};

    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });

    setAnswers(filledAnswers);
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

  return (
    <div className="main-container-component">
      <style>{`
        .wb-months-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 22px !important;
          width: 100% !important;
          max-width: 1120px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-months-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 26px !important;
          width: 100% !important;
        }

        .wb-months-row {
          display: grid !important;
          grid-template-columns: 34px minmax(320px, 1fr) minmax(320px, 460px) !important;
          gap: 16px !important;
          align-items: center !important;
          width: 100% !important;
        }

        .wb-months-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
        }

        .wb-months-sentence {
          font-size: 24px !important;
          color: #111 !important;
          line-height: 1.4 !important;
        }

        .wb-months-answer-wrap {
          position: relative !important;
          width: 100% !important;
        }

        .wb-months-select {
          width: 100% !important;
          min-height: 54px !important;
          font-size: 28px !important;
          color: #000000ff !important;
          border: none !important;
          border-bottom: 3px solid #222 !important;
          outline: none !important;
          background: transparent !important;
          padding: 0 34px 2px 8px !important;
          text-align: center !important;
          text-align-last: center !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
        }

        .wb-months-select:disabled {
          opacity: 1 !important;
          cursor: default !important;
        }

        .wb-months-arrow {
          position: absolute !important;
          right: 8px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-size: 14px !important;
          color: #666 !important;
          pointer-events: none !important;
        }

        .wb-months-wrong {
          position: absolute !important;
          top: -8px !important;
          right: -8px !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18) !important;
          box-sizing: border-box !important;
        }

        .wb-months-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-months-row {
            grid-template-columns: 34px 1fr !important;
          }

          .wb-months-answer-wrap {
            grid-column: 2 / 3 !important;
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
          }}
        >
          <span className="WB-ex-A">C</span> Read and write.
        </h1>
        <div className="wb-months-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-months-row">
              <div className="wb-months-num">{item.id}</div>

              <div className="wb-months-sentence">{item.sentence}</div>

              <div className="wb-months-answer-wrap">
                <select
                  className="wb-months-select"
                  value={answers[item.id] || ""}
                  disabled={showAns}
                  onChange={(e) => handleSelectChange(item.id, e.target.value)}
                >
                  <option value="" disabled>
                    Select month
                  </option>

                  {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {!showAns && <div className="wb-months-arrow">▼</div>}

                {isWrong(item) && <div className="wb-months-wrong">✕</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-months-buttons">
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