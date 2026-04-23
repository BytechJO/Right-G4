import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  4.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/1.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  2.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  8.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    correct: "✕",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    correct: "✓",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    correct: "✓",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    correct: "✕",
  },
];

const OPTIONS = ["✓", "✕"];

export default function WB_Unit3_Page18_QB() {
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

  const renderChoice = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;
    const correctSelected = showAns && item.correct === value;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        style={{
          position: "relative",
          width: "58px",
          height: "58px",
          borderRadius: "14px",
          border: selected || correctSelected ? "2px solid #f39b42" : "2px solid #cfcfcf",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "34px",
            fontWeight: "700",
            color:
              value === "✓"
                ? "#000000ff"
                : "#000000ff",
            lineHeight: 1,
          }}
        >
          {value}
        </span>

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#ff0000ff",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid #f39b42",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-b-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          width: 100% !important;
          max-width: 1120px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-b-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          column-gap: 44px !important;
          row-gap: 18px !important;
          width: 100% !important;
          align-items: start !important;
        }

        .wb-b-item {
          display: flex !important;
          align-items: flex-start !important;
          gap: 14px !important;
          width: 100% !important;
        }

        .wb-b-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          min-width: 24px !important;
          padding-top: 10px !important;
        }

        .wb-b-card {
          width: 100% !important;
          max-width: 430px !important;
          border: 2px solid #f39b42 !important;
          border-radius: 18px !important;
          background: #fff !important;
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          position: relative !important;
          overflow: visible !important;
          box-sizing: border-box !important;
        }

        .wb-b-half {
          min-height: 170px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 12px !important;
          box-sizing: border-box !important;
        }

        .wb-b-half:first-child {
          border-right: 2px solid #f39b42 !important;
        }

        .wb-b-img {
          max-width: 100% !important;
          max-height: 140px !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-b-answer-box {
          position: absolute !important;
          left: 50% !important;
          bottom: -2px !important;
          transform: translateX(-50%) !important;
          width: 54px !important;
          height: 42px !important;
          border: 2px solid #f39b42 !important;
          border-radius: 8px !important;
          background: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-sizing: border-box !important;
          z-index: 2 !important;
        }

        .wb-b-answer-text {
          font-size: 34px !important;
          font-weight: 700 !important;
          color: #000000ff !important;
          line-height: 1 !important;
        }

        .wb-b-options-row {
          display: flex !important;
          justify-content: center !important;
          gap: 14px !important;
          margin-top: 8px !important;
        }

        .wb-b-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-b-grid {
            grid-template-columns: 1fr !important;
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
        <h1    className="WB-header-title-page8"
          style={{
            margin: 0,
          }}>
          <span className="WB-ex-A">B</span> Do they both have the same sound? Write ✓ or ✕.
        </h1>

        <div className="wb-b-grid">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div className="wb-b-item">
                <div className="wb-b-num">{item.id}</div>

                <div className="wb-b-card">
                  <div className="wb-b-half">
                    <img
                      src={item.leftImg}
                      alt={`left-${item.id}`}
                      className="wb-b-img"
                    />
                  </div>

                  <div className="wb-b-half">
                    <img
                      src={item.rightImg}
                      alt={`right-${item.id}`}
                      className="wb-b-img"
                    />
                  </div>

                  {(answers[item.id] || showAns) && (
                    <div className="wb-b-answer-box">
                      <span className="wb-b-answer-text">
                        {answers[item.id]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="wb-b-options-row">
                {OPTIONS.map((option) => (
                  <div key={option}>{renderChoice(item, option)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-b-buttons">
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