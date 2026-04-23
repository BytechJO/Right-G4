import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have gloves.",
    lockQuestion: true,
    lockAnswer: false,
  },
  {
    id: 2,
    img: img2,
    fixedAnswer: "They have some fruit.",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some fruit.",
    lockQuestion: false,
    lockAnswer: true,
  },
  {
    id: 3,
    img: img3,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some dolls.",
    lockQuestion: true,
    lockAnswer: false,
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "They have gloves." },
  { id: 2, value: "What do they have?" },
  { id: 3, value: "They have some dolls." },
];

export default function WB_Unit3_Page16_QE() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const dropRefs = useRef({});

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    if (showAns || !item) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
  };

  const handleTouchStart = (e, item) => {
    if (showAns || usedDragIds.includes(item.id)) return;

    const touch = e.touches[0];
    setTouchItem(item);
    setDraggedItem(item);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchItem) return;
    e.preventDefault();

    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchItem) return;

    let dropped = false;

    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref || dropped) return;

      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom
      ) {
        applyDrop(key, touchItem);
        dropped = true;
      }
    });

    setTouchItem(null);
    setDraggedItem(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => {
      const qReady = item.lockQuestion || answers[`q-${item.id}`]?.value;
      const aReady = item.lockAnswer || answers[`a-${item.id}`]?.value;
      return qReady && aReady;
    });

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;

    ITEMS.forEach((item) => {
      const userQuestion = item.lockQuestion
        ? item.correctQuestion
        : answers[`q-${item.id}`]?.value;

      const userAnswer = item.lockAnswer
        ? item.correctAnswer
        : answers[`a-${item.id}`]?.value;

      if (userQuestion === item.correctQuestion) score++;
      if (userAnswer === item.correctAnswer) score++;

      total += 2;
    });

    setShowResults(true);

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
      if (!item.lockQuestion) {
        const qMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctQuestion
        );

        filled[`q-${item.id}`] = {
          dragId: qMatch?.id ?? `q-${item.id}`,
          value: item.correctQuestion,
        };
      }

      if (!item.lockAnswer) {
        const aMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctAnswer
        );

        filled[`a-${item.id}`] = {
          dragId: aMatch?.id ?? `a-${item.id}`,
          value: item.correctAnswer,
        };
      }
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setDraggedItem(null);
    setTouchItem(null);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongQuestion = (item) => {
    if (!showResults || item.lockQuestion) return false;
    return answers[`q-${item.id}`]?.value !== item.correctQuestion;
  };

  const isWrongAnswer = (item) => {
    if (!showResults || item.lockAnswer) return false;
    return answers[`a-${item.id}`]?.value !== item.correctAnswer;
  };

  const renderDropBox = (boxKey, isWrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={(el) => {
          dropRefs.current[boxKey] = el;
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        className={`wb-e17-drop ${isWrong ? "wrong" : ""}`}
        style={{
          color: showAns ? "#000000ff" : "#111",
        }}
      >
        {value}

        {isWrong && <div className="wb-e17-wrong-badge">✕</div>}
      </div>
    );
  };

  const renderFixedLine = (text, color = "#111") => {
    return (
      <div
        className="wb-e17-drop wb-e17-fixed"
        style={{
          color,
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e17-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 28px);
          width: 100%;
        }

        .wb-e17-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.4vw, 12px);
          justify-content: center;
          align-items: center;
          padding-top: 2px;
        }

        .wb-e17-chip {
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.6vw, 16px);
          border-radius: clamp(12px, 1.4vw, 14px);
          user-select: none;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          touch-action: none;
          text-align: center;
        }

        .wb-e17-chip.disabled {
          box-shadow: none;
          opacity: 0.55;
        }

        .wb-e17-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 22px);
        }

        .wb-e17-row {
          display: grid;
          grid-template-columns:
            clamp(26px, 3vw, 38px)
            minmax(150px, clamp(220px, 28vw, 340px))
            minmax(0, 1fr);
          gap: clamp(12px, 1.8vw, 18px);
          align-items: center;
          width: 100%;
        }

        .wb-e17-num {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-e17-img {
          width: clamp(150px, 28vw, 330px);
          height: clamp(95px, 16vw, 180px);
          object-fit: contain;
          display: block;
          justify-self: start;
                              border: 2px solid #f39b42;
object-fit: cover;
                              border-radius: 10%;

        }

        .wb-e17-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 12px);
          width: 100%;
          justify-content: center;
          min-width: 0;
        }

        .wb-e17-drop {
          width: min(100%, clamp(280px, 48vw, 520px));
          min-height: clamp(40px, 5vw, 44px);
          border-bottom: 2px solid #444;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: clamp(17px, 2.2vw, 26px);
          line-height: 1.35;
          background-color: transparent;
          border-radius: 6px 6px 0 0;
          padding: 0 clamp(6px, 1vw, 8px) 4px;
          box-sizing: border-box;
          position: relative;
          word-break: break-word;
        }

        .wb-e17-fixed {
          background: transparent;
        }

        .wb-e17-wrong-badge {
          position: absolute;
          top: clamp(-10px, -1vw, -8px);
          right: clamp(-10px, -1vw, -8px);
          width: clamp(18px, 2vw, 22px);
          height: clamp(18px, 2vw, 22px);
          border-radius: 50%;
          background-color: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        }

        .wb-e17-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-e17-touch-preview {
          position: fixed;
          z-index: 9999;
          transform: translate(-50%, -50%);
          pointer-events: none;
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.6vw, 16px);
          border-radius: clamp(12px, 1.4vw, 14px);
          background: ${SOFT_COLOR};
          border: 1.5px solid ${ACTIVE_COLOR};
          color: #222;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.14);
          max-width: min(80vw, 320px);
          text-align: center;
        }

        @media (max-width: 900px) {
          .wb-e17-row {
            grid-template-columns:
              clamp(24px, 3vw, 34px)
              minmax(130px, clamp(180px, 30vw, 260px))
              minmax(0, 1fr);
            gap: 14px;
          }

          .wb-e17-img {
            width: clamp(140px, 30vw, 250px);
            height: clamp(95px, 20vw, 150px);
          }

          .wb-e17-drop {
            width: min(100%, 100%);
          }
        }

        @media (max-width: 700px) {
          .wb-e17-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-e17-num {
            font-size: clamp(18px, 4.8vw, 21px);
          }

          .wb-e17-img {
            justify-self: center;
            width: clamp(170px, 56vw, 290px);
            height: clamp(110px, 36vw, 185px);
          }

          .wb-e17-lines {
            align-items: flex-start;
          }

          .wb-e17-drop {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wb-e17-chip {
            width: 100%;
          }

          .wb-e17-drop {
            font-size: clamp(15px, 4vw, 19px);
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
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">E</span> Look and write the questions or answers.
        </h1>

        <div className="wb-e17-wrap">
          <div className="wb-e17-bank">
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedDragIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  draggable={!isUsed && !showAns}
                  onDragStart={() => handleDragStart(item)}
                  onTouchStart={(e) => handleTouchStart(e, item)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`wb-e17-chip ${isUsed ? "disabled" : ""}`}
                  style={{
                    border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                    backgroundColor: isUsed ? "#efefef" : SOFT_COLOR,
                    color: isUsed ? "#9a9a9a" : "#222",
                    cursor: isUsed || showAns ? "not-allowed" : "grab",
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>

          <div className="wb-e17-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-e17-row">
                <div className="wb-e17-num">{item.id}</div>

                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  className="wb-e17-img"
                />

                <div className="wb-e17-lines">
                  {item.lockQuestion
                    ? renderFixedLine(item.fixedQuestion, "#111")
                    : renderDropBox(`q-${item.id}`, isWrongQuestion(item))}

                  {item.lockAnswer
                    ? renderFixedLine(item.fixedAnswer, "#111")
                    : renderDropBox(`a-${item.id}`, isWrongAnswer(item))}
                </div>
              </div>
            ))}
          </div>

          <div className="wb-e17-buttons">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={handleCheck}
            />
          </div>
        </div>
      </div>

      {touchItem && (
        <div
          className="wb-e17-touch-preview"
          style={{
            left: touchPos.x,
            top: touchPos.y,
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}