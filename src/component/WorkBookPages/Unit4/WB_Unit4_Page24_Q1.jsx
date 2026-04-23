import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import left1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 1.svg";
import right1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 2.svg";
import left2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 3.svg";
import right2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 4.svg";
import left3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 5.svg";
import right3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 6.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: left1,
    rightImg: right1,
    prompt:
      "The trees don’t have any leaves. There are a lot of leaves on the ground. The weather is very cool, and I need to wear a jacket. What season is it?",
    correct: "autumn",
  },
  {
    id: 2,
    leftImg: left2,
    rightImg: right2,
    prompt:
      "The sun is shining in the sky most days. The weather is getting warm. The flowers are blooming, and everything is green. Which season is it?",
    correct: "spring",
  },
  {
    id: 3,
    leftImg: left3,
    rightImg: right3,
    prompt:
      "The weather is very hot. We cool off by going to the beach. I have to wear T-shirts. What season is it?",
    correct: "summer",
  },
];

const OPTIONS = ["spring", "summer", "autumn", "winter"];

export default function WB_Unit3_Page24_QG() {
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
      ValidationAlert.info("Please complete all answers first.");
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

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const bubbleBase = {
    position: "relative",
    background: "#fff",
    border: "2px solid #444",
    borderRadius: "12px",
    boxSizing: "border-box",
  };

  const leftBubbleTail = (
    <>
      <span
        style={{
          position: "absolute",
          left: "-34px",
          bottom: "18px",
          width: "38px",
          height: "2px",
          background: "#444",
          transform: "rotate(-18deg)",
          transformOrigin: "right center",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "-28px",
          bottom: "24px",
          width: "30px",
          height: "2px",
          background: "#444",
          transform: "rotate(-6deg)",
          transformOrigin: "right center",
        }}
      />
    </>
  );

  const rightBubbleTail = (
    <>
      <span
        style={{
          position: "absolute",
          right: "-34px",
          top: "18px",
          width: "38px",
          height: "2px",
          background: "#444",
          transform: "rotate(20deg)",
          transformOrigin: "left center",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: "-28px",
          top: "24px",
          width: "30px",
          height: "2px",
          background: "#444",
          transform: "rotate(6deg)",
          transformOrigin: "left center",
        }}
      />
    </>
  );

  return (
    <div className="main-container-component">
      <style>{`
        .wb-g24-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
          max-width: 980px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-g24-title {
          margin: 0 !important;
        }

        .wb-g24-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 34px !important;
          width: 100% !important;
        }

        .wb-g24-row {
          display: grid !important;
          grid-template-columns: 28px 92px 1fr 92px !important;
          gap: 16px !important;
          align-items: center !important;
          width: 100% !important;
        }

        .wb-g24-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          align-self: start !important;
          padding-top: 34px !important;
        }

        .wb-g24-side-img {
          width: 84px !important;
          height: 110px !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-g24-middle {
          display: flex !important;
          flex-direction: column !important;
          gap: 14px !important;
          width: 100% !important;
        }

        .wb-g24-prompt {
          max-width: 390px !important;
          min-height: 94px !important;
          padding: 12px 14px !important;
          font-size: 18px !important;
          line-height: 1.25 !important;
          color: #222 !important;
        }

        .wb-g24-answer-wrap {
          display: flex !important;
          justify-content: flex-end !important;
        }

        .wb-g24-answer-bubble {
          min-width: 180px !important;
          height: 56px !important;
          padding: 8px 14px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .wb-g24-answer-text {
          font-size: 18px !important;
          color: #222 !important;
          white-space: nowrap !important;
        }

        .wb-g24-select {
          border: none !important;
          outline: none !important;
          background: transparent !important;
          font-size: 18px !important;
          color: #000000ff !important;
          border-bottom: 2px dotted #444 !important;
          padding: 0 20px 2px 2px !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          min-width: 92px !important;
          cursor: pointer !important;
          text-transform: lowercase !important;
        }

        .wb-g24-select:disabled {
          cursor: default !important;
          opacity: 1 !important;
        }

        .wb-g24-select-wrap {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
        }

        .wb-g24-arrow {
          position: absolute !important;
          right: 4px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-size: 12px !important;
          color: #666 !important;
          pointer-events: none !important;
        }

        .wb-g24-wrong {
          position: absolute !important;
          top: -10px !important;
          right: -10px !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background-color: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18) !important;
        }

        .wb-g24-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-g24-row {
            grid-template-columns: 1fr !important;
          }

          .wb-g24-num {
            padding-top: 0 !important;
          }

          .wb-g24-middle {
            order: 2 !important;
          }

          .wb-g24-side-left {
            order: 1 !important;
          }

          .wb-g24-side-right {
            order: 3 !important;
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
          }}
        >
          <span className="WB-ex-A">G</span>
          Read and complete the conversations.
        </h1>

        <div className="wb-g24-list">
          {ITEMS.map((item) => {
            const value = answers[item.id] || "";

            return (
              <div key={item.id} className="wb-g24-row">
                <div className="wb-g24-num">{item.id}</div>

                <div className="wb-g24-side-left">
                  <img
                    src={item.leftImg}
                    alt={`left-${item.id}`}
                    className="wb-g24-side-img"
                  />
                </div>

                <div className="wb-g24-middle">
                  <div
                    style={bubbleBase}
                    className="wb-g24-prompt"
                  >
                    {item.prompt}
                    {leftBubbleTail}
                  </div>

                  <div className="wb-g24-answer-wrap">
                    <div
                      style={bubbleBase}
                      className="wb-g24-answer-bubble"
                    >
                      <span className="wb-g24-answer-text">It’s</span>

                      <div className="wb-g24-select-wrap">
                        <select
                          value={value}
                          disabled={showAns}
                          onChange={(e) => handleSelect(item.id, e.target.value)}
                          className="wb-g24-select"
                        >
                          <option value="" disabled>
                            select
                          </option>
                          {OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        {!showAns && <span className="wb-g24-arrow">▼</span>}
                      </div>

                      <span
                        style={{
                          fontSize: "18px",
                          color: "#000000ff",
                          lineHeight: 1,
                        }}
                      >
                        .
                      </span>

                      {rightBubbleTail}

                      {isWrong(item) && <div className="wb-g24-wrong">✕</div>}
                    </div>
                  </div>
                </div>

                <div className="wb-g24-side-right">
                  <img
                    src={item.rightImg}
                    alt={`right-${item.id}`}
                    className="wb-g24-side-img"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="wb-g24-buttons">
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