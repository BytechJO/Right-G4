import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 2.svg";
import img1c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 3.svg";

import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 4.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 5.svg";
import img2c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 6.svg";

import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 7.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 8.svg";
import img3c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 9.svg";

const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    question: "Which is the biggest animal?",
    images: [
      { key: "lion", src: img1a, alt: "lion" },
      { key: "cat", src: img1b, alt: "cat" },
      { key: "bird", src: img1c, alt: "bird" },
    ],
    correctImage: "lion",
    options: [
      "The lion is the biggest animal.",
      "The cat is the biggest animal.",
      "The bird is the biggest animal.",
    ],
    correctText: "The lion is the biggest animal.",
  },
  {
    id: 2,
    question: "Which is the fastest?",
    images: [
      { key: "car", src: img2a, alt: "car" },
      { key: "bike", src: img2b, alt: "bike" },
      { key: "skateboard", src: img2c, alt: "skateboard" },
    ],
    correctImage: "car",
    options: [
      "The car is the fastest.",
      "The bike is the fastest.",
      "The skateboard is the fastest.",
    ],
    correctText: "The car is the fastest.",
  },
  {
    id: 3,
    question: "Which is the heaviest?",
    images: [
      { key: "pen", src: img3a, alt: "pen" },
      { key: "book", src: img3b, alt: "book" },
      { key: "desk", src: img3c, alt: "desk" },
    ],
    correctImage: "desk",
    options: [
      "The pen is the heaviest.",
      "The book is the heaviest.",
      "The desk is the heaviest.",
    ],
    correctText: "The desk is the heaviest.",
  },
];

export default function WB_Unit3_Page3_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleImageSelect = (itemId, imageKey) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], image: imageKey },
    }));
    setChecked(false);
  };

  const handleTextSelect = (itemId, text) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], text },
    }));
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.image && answers[item.id]?.text
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      const imageCorrect = answers[item.id]?.image === item.correctImage;
      const textCorrect = answers[item.id]?.text === item.correctText;
      if (imageCorrect && textCorrect) {
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = { image: item.correctImage, text: item.correctText };
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

  const isImageSelected = (itemId, imageKey) =>
    answers[itemId]?.image === imageKey;

  const isTextSelected = (itemId, option) =>
    answers[itemId]?.text === option;

  const isWrongImage = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id]?.image !== item.correctImage;
  };

  const isWrongText = (item, option) => {
    if (!checked || showAns) return false;
    return answers[item.id]?.text === option && option !== item.correctText;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-qb-root,
        .wb-qb-root * {
          box-sizing: border-box !important;
        }

        .wb-qb-root {
          width: 100%;
        }

        .wb-qb-main-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 34px);
          width: 100%;
        }

        .wb-qb-row {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 38%);
          gap: clamp(16px, 2.6vw, 28px) !important;
          align-items: start !important;
          width: 100%;
        }

        .wb-qb-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 14px);
          min-width: 0;
          width: 100%;
        }

        .wb-qb-question-wrap {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.4vw, 14px);
          min-width: 0;
        }

        .wb-qb-number {
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          margin-top: clamp(2px, 0.6vw, 6px);
          min-width: clamp(16px, 2vw, 18px);
          flex-shrink: 0;
        }

        .wb-qb-question {
          font-size: clamp(16px, 2.2vw, 24px);
          color: #111;
          line-height: 1.35;
          font-weight: 500;
          min-width: 0;
        }

        .wb-qb-images-row {
          display: flex !important;
          align-items: flex-end !important;
          gap: clamp(10px, 1.8vw, 18px) !important;
          flex-wrap: wrap !important;
          padding-left: clamp(22px, 4vw, 34px) !important;
          overflow: visible !important;
          width: 100%;
        }

        .wb-qb-image-click {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
          overflow: visible;
        }

        .wb-qb-image-holder {
          width: clamp(72px, 13vw, 150px) !important;
          height: clamp(68px, 12vw, 140px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          overflow: visible !important;
          flex-shrink: 0 !important;
        }

        .wb-qb-root img,
        .wb-qb-force-img {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          max-width: clamp(64px, 12vw, 140px) !important;
          max-height: clamp(60px, 11vw, 130px) !important;
          min-width: clamp(34px, 6vw, 70px) !important;
          min-height: clamp(34px, 6vw, 70px) !important;
          object-fit: contain !important;
          flex-shrink: 0 !important;
          overflow: visible !important;
        }

        .wb-qb-image-ring {
          position: absolute;
          inset: clamp(-8px, -1vw, -10px);
          border: clamp(2px, 0.35vw, 4px) solid ${ACTIVE_COLOR};
          border-radius: 999px;
          pointer-events: none;
        }

        .wb-qb-image-ring-wrong {
          position: absolute;
          inset: clamp(-8px, -1vw, -10px);
          border: clamp(2px, 0.35vw, 4px) solid ${WRONG_COLOR};
          border-radius: 999px;
          pointer-events: none;
        }

        .wb-qb-image-wrong-badge {
          position: absolute;
          top: clamp(-7px, -0.8vw, -8px);
          right: clamp(-7px, -0.8vw, -8px);
          width: clamp(16px, 2.2vw, 22px);
          height: clamp(16px, 2.2vw, 22px);
          border-radius: 50%;
          background-color: ${WRONG_COLOR};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          z-index: 2;
        }

        .wb-qb-right-col {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.3vw, 10px);
          padding-top: clamp(8px, 3vw, 36px);
          width: 100%;
          min-width: 0;
        }

        .wb-qb-option-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(30px, 4vw, 46px);
          gap: clamp(8px, 1.4vw, 14px);
          align-items: center;
          width: 100%;
        }

        .wb-qb-option-text {
          font-size: clamp(14px, 2vw, 22px);
          color: #222;
          line-height: 1.35;
          font-weight: 500;
          min-width: 0;
          word-break: break-word;
        }

        .wb-qb-checkbox {
          width: clamp(28px, 3.8vw, 40px);
          height: clamp(28px, 3.8vw, 40px);
          border-radius: 6px;
          border: 2px solid #bbb;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .wb-qb-checkbox.wrong {
          border-color: ${WRONG_COLOR};
          background: rgba(239, 68, 68, 0.08);
        }

        .wb-qb-wrong {
          position: absolute;
          top: clamp(-7px, -0.8vw, -8px);
          right: clamp(-7px, -0.8vw, -8px);
          width: clamp(16px, 2.2vw, 22px);
          height: clamp(16px, 2.2vw, 22px);
          border-radius: 50%;
          background-color: ${WRONG_COLOR};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .wb-qb-row {
            grid-template-columns: 1fr !important;
          }

          .wb-qb-right-col {
            padding-top: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .wb-qb-images-row {
            padding-left: 0 !important;
          }
        }
      `}</style>

      <div
        className="div-forall "
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
          <span className="WB-ex-A">B</span>
          Read, look, circle, and write ✓.
        </h1>

        <div className="wb-qb-main-list">
          {ITEMS.map((item) => {
            const wrongImage = isWrongImage(item);

            return (
              <div key={item.id} className="wb-qb-row">
                <div className="wb-qb-left-col">
                  <div className="wb-qb-question-wrap">
                    <div className="wb-qb-number">{item.id}</div>
                    <div className="wb-qb-question">{item.question}</div>
                  </div>

                  <div className="wb-qb-images-row">
                    {item.images.map((img) => {
                      const selected = isImageSelected(item.id, img.key);
                      const isThisWrong = wrongImage && selected;

                      return (
                        <div
                          key={img.key}
                          className="wb-qb-image-click"
                          onClick={() => handleImageSelect(item.id, img.key)}
                          style={{ cursor: showAns ? "default" : "pointer" }}
                        >
                          {selected && !isThisWrong && (
                            <div className="wb-qb-image-ring" />
                          )}

                          {isThisWrong && (
                            <>
                              <div className="wb-qb-image-ring-wrong" />
                              <div className="wb-qb-image-wrong-badge">✕</div>
                            </>
                          )}

                          <div className="wb-qb-image-holder">
                            <img
                              className="wb-qb-force-img"
                              src={img.src}
                              alt={img.alt}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="wb-qb-right-col">
                  {item.options.map((option) => {
                    const selected = isTextSelected(item.id, option);
                    const wrong = isWrongText(item, option);
                    const showCorrect = showAns && item.correctText === option;

                    return (
                      <div key={option} className="wb-qb-option-row">
                        <div className="wb-qb-option-text">{option}</div>

                        <div
                          onClick={() => handleTextSelect(item.id, option)}
                          className={`wb-qb-checkbox ${wrong ? "wrong" : ""}`}
                          style={{ cursor: showAns ? "default" : "pointer" }}
                        >
                          {(selected || showCorrect) && (
                            <svg
                              width="65%"
                              height="65%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline
                                points="4,13 9,18 20,6"
                                stroke="#e53935"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {wrong && <div className="wb-qb-wrong">✕</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
            width: "100%",
          }}
        >
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