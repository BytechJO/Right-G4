import React, { useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 8.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    firstOptions: ["The fridge", "The TV"],
    middle: "is bigger than",
    lastOptions: ["the fridge.", "the TV."],
    correctFirst: "The fridge",
    correctLast: "the TV.",
  },
  {
    id: 2,
    img: img2,
    firstOptions: ["The car", "The bike"],
    middle: "is faster than",
    lastOptions: ["the car.", "the bike."],
    correctFirst: "The car",
    correctLast: "the bike.",
  },
  {
    id: 3,
    img: img3,
    firstOptions: ["Harley", "His dad"],
    middle: "is younger than",
    lastOptions: ["Harley.", "his dad."],
    correctFirst: "Harley",
    correctLast: "his dad.",
  },
  {
    id: 4,
    img: img4,
    firstOptions: ["The ball", "The feathers"],
    middle: "is heavier than",
    lastOptions: ["the ball.", "the feathers."],
    correctFirst: "The ball",
    correctLast: "the feathers.",
  },
];

export default function WB_Unit1_Page4_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (id, field, value) => {
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
      const firstCorrect = answers[item.id]?.first === item.correctFirst;
      const lastCorrect = answers[item.id]?.last === item.correctLast;
      if (firstCorrect && lastCorrect) score += 1;
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
      filled[item.id] = { first: item.correctFirst, last: item.correctLast };
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
    if (!checked || showAns) return false;
    return (
      answers[item.id]?.first !== item.correctFirst ||
      answers[item.id]?.last !== item.correctLast
    );
  };

  const getValue = (itemId, field) => answers[itemId]?.[field] || "";

  return (
    <div className="main-container-component">
      <style>{`
        .wd-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px 34px;
          align-items: start;
          width: 100%;
        }

        .wd-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          min-width: 0;
        }

        .wd-media-wrap {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
        }

        .wd-number {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          line-height: 1;
          margin-top: 8px;
          min-width: 20px;
          flex-shrink: 0;
        }

        .wd-image-box {
          width: 100%;
          height: 220px;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          box-sizing: border-box;
          flex: 1;
          min-width: 0;
        }

        .wd-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .wd-answer-wrap {
          position: relative;
          width: 100%;
          padding-left: 32px;
          box-sizing: border-box;
        }

        .wd-answer-line {
          width: 100%;
          border-bottom: 3px solid #4a4a4a;
          padding-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 10px);
          flex-wrap: nowrap;
          min-height: 58px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .wd-select-box {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 2px solid #bfbfbf;
          border-radius: 12px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .wd-select {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-align: center;
          text-align-last: center;
          font-size: clamp(12px, 1.4vw, 18px);
          font-weight: 500;
          color: #222;
          cursor: pointer;
          padding: 0 clamp(22px, 2.5vw, 36px) 0 clamp(6px, 1vw, 14px);
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wd-arrow {
          position: absolute;
          right: clamp(6px, 1vw, 12px);
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8px, 1vw, 12px);
          color: #777;
          pointer-events: none;
          flex-shrink: 0;
        }

        .wd-middle-text {
          font-size: clamp(12px, 1.4vw, 20px);
          color: #111;
          line-height: 1.3;
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .wd-wrong-badge {
          position: absolute;
          top: -6px;
          right: -6px;
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
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          border: 2px solid #fff;
        }

        .wd-buttons-wrap {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 950px) {
          .wd-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 768px) {
          .wd-image-box {
            height: 180px;
          }

          .wd-answer-wrap {
            padding-left: 0;
          }

          .wd-answer-line {
            flex-wrap: wrap;
            justify-content: flex-start;
          }

          .wd-select-box {
            flex: 1 1 40%;
            min-width: 0;
          }

          .wd-middle-text {
            width: 100%;
            text-align: center;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .wd-image-box {
            height: 150px;
          }

          .wd-select {
            font-size: 12px;
          }

          .wd-answer-line {
            gap: 8px;
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
          <span className="WB-ex-A">D</span>
          Look and write.
        </h1>

        <div className="wd-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wd-card">
              <div className="wd-media-wrap">
                <div className="wd-number">{item.id}</div>
                <div className="wd-image-box">
                  <img
                    src={item.img}
                    alt={`comparison-${item.id}`}
                    className="wd-image"
                  />
                </div>
              </div>

              <div className="wd-answer-wrap">
                <div className="wd-answer-line">
                  <div className="wd-select-box">
                    <select
                      value={getValue(item.id, "first")}
                      disabled={showAns}
                      onChange={(e) =>
                        handleChange(item.id, "first", e.target.value)
                      }
                      className="wd-select"
                      style={{ cursor: showAns ? "default" : "pointer" }}
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
                    {!showAns && <span className="wd-arrow">▼</span>}
                  </div>

                  <span className="wd-middle-text">{item.middle}</span>

                  <div className="wd-select-box">
                    <select
                      value={getValue(item.id, "last")}
                      disabled={showAns}
                      onChange={(e) =>
                        handleChange(item.id, "last", e.target.value)
                      }
                      className="wd-select"
                      style={{ cursor: showAns ? "default" : "pointer" }}
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
                    {!showAns && <span className="wd-arrow">▼</span>}
                  </div>
                </div>

                {isWrong(item) && <div className="wd-wrong-badge">✕</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="wd-buttons-wrap">
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