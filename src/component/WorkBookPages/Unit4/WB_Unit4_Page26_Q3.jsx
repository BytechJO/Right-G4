import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  8.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    correct: "✓",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    correct: "✕",
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
    correct: "✓",
  },
];

const OPTIONS = ["✓", "✕"];

export default function WB_Unit3_Page18_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setChecked(false);
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
        score += 1;
      }
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
      filledAnswers[item.id] = item.correct;
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

  const isWrong = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrongSelected = isWrong(item) && selected;

    return (
      <button
        type="button"
        onClick={() => handleSelect(item.id, option)}
        disabled={showAns}
        style={{
          width: "62px",
          height: "62px",
          borderRadius: "16px",
          border: selected ? "2px solid #9d9d9d" : "2px solid #f39b42",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ? "default" : "pointer",
          position: "relative",
          boxSizing: "border-box",
          transition: "0.2s ease",
          padding: 0,
        }}
      >
        <span
          style={{
            fontSize: option === "✓" ? "40px" : "38px",
            fontWeight: 700,
            lineHeight: 1,
            color: "#1f1f1f",
            transform: option === "✓" ? "translateY(-1px)" : "translateY(-1px)",
          }}
        >
          {option}
        </span>

        {wrongSelected && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#e12626",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          >
            ✕
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-wrap {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 8px 18px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .wb-c-title {
          margin: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .wb-c-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(320px, 1fr));
          column-gap: 52px;
          row-gap: 28px;
          align-items: start;
        }

        .wb-c-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wb-c-top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .wb-c-num {
          min-width: 24px;
          font-size: 24px;
          font-weight: 700;
          color: #222;
          line-height: 1;
          padding-top: 8px;
        }

        .wb-c-card-wrap {
          position: relative;
          width: 100%;
          max-width: 430px;
        }

        .wb-c-card {
          width: 100%;
          min-height: 176px;
          border: 2px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-sizing: border-box;
        }

        .wb-c-half {
          min-height: 176px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          box-sizing: border-box;
          background: #fff;
        }

        .wb-c-half:first-child {
          border-right: 2px solid #f39b42;
        }

        .wb-c-img {
          max-width: 100%;
          max-height: 130px;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-c-answer-box {
          position: absolute;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          width: 54px;
          height: 42px;
          border: 2px solid #f39b42;
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          box-sizing: border-box;
        }

        .wb-c-answer-text {
          font-size: 34px;
          font-weight: 700;
          color: #000000ff;
          line-height: 1;
          transform: translateY(-1px);
        }

        .wb-c-options {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-left: 38px;
          margin-top: 2px;
        }

        .wb-c-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .wb-c-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .wb-c-wrap {
            padding: 8px 10px 20px;
          }

          .wb-c-top {
            gap: 10px;
          }

          .wb-c-num {
            font-size: 22px;
          }

          .wb-c-card {
            min-height: 156px;
          }

          .wb-c-half {
            min-height: 156px;
            padding: 10px;
          }

          .wb-c-img {
            max-height: 110px;
          }

          .wb-c-options {
            margin-left: 30px;
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
        >          <span className="WB-ex-A">C</span>
          Do they both have the same <strong>th</strong> sound? Listen and write ✓ or ✕.
        </h1>

        <div className="wb-c-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c-item">
              <div className="wb-c-top">
                <div className="wb-c-num">{item.id}</div>

                <div className="wb-c-card-wrap">
                  <div className="wb-c-card">
                    <div className="wb-c-half">
                      <img
                        src={item.leftImg}
                        alt={`left-${item.id}`}
                        className="wb-c-img"
                      />
                    </div>

                    <div className="wb-c-half">
                      <img
                        src={item.rightImg}
                        alt={`right-${item.id}`}
                        className="wb-c-img"
                      />
                    </div>
                  </div>

                  {(answers[item.id] || showAns) && (
                    <div className="wb-c-answer-box">
                      <span className="wb-c-answer-text">
                        {answers[item.id]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="wb-c-options">
                {OPTIONS.map((option) => (
                  <div key={option}>{renderOption(item, option)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c-buttons">
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