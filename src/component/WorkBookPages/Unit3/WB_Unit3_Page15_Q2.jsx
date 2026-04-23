import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 4.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What does he have?",
    fixedAnswer: "He has a glove.",
    correctQuestion: "What does he have?",
    correctAnswer: "He has a glove.",
    lockQuestion: true,
    lockAnswer: true,
  },
  {
    id: 2,
    img: img2,
    fixedQuestion: "What does she have?",
    correctQuestion: "What does she have?",
    correctAnswer: "She has an apple.",
    lockQuestion: true,
    lockAnswer: false,
  },
  {
    id: 3,
    img: img3,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a banana.",
    lockQuestion: false,
    lockAnswer: false,
  },
  {
    id: 4,
    img: img4,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a doll.",
    lockQuestion: false,
    lockAnswer: false,
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "What does she have?" },
  { id: 2, value: "What does she have?" },
  { id: 3, value: "She has an apple." },
  { id: 4, value: "She has a banana." },
  { id: 5, value: "She has a doll." },
];

export default function WB_Unit3_Page15_QB() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const dropRefs = useRef({});

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
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

  const handleDragEnd = () => {
    setDraggedItem(null);
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
        const matchedQuestion = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctQuestion
        );

        filled[`q-${item.id}`] = {
          dragId: matchedQuestion?.id ?? `q-${item.id}`,
          value: item.correctQuestion,
        };
      }

      if (!item.lockAnswer) {
        const matchedAnswer = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctAnswer
        );

        filled[`a-${item.id}`] = {
          dragId: matchedAnswer?.id ?? `a-${item.id}`,
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

  const handleRemoveAnswer = (boxKey) => {
    if (showAns) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setShowResults(false);
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
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemoveAnswer(boxKey)}
        className="wb-b15-line-box"
        style={{
          color: "#111",
          backgroundColor: isWrong ? "rgba(255, 255, 255, 0.08)" : "transparent",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
        }}
      >
        {value}
      </div>
    );
  };

  const renderFixedLine = (text, color = "#111") => {
    return (
      <div
        className="wb-b15-line-box"
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
        .wb-b15-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 12px);
          justify-content: center;
          align-items: center;
          padding: clamp(6px, 1vw, 8px) 0 clamp(2px, 0.7vw, 4px);
        }

        .wb-b15-chip {
          padding: clamp(8px, 1vw, 10px) clamp(10px, 1.4vw, 14px);
          border-radius: clamp(10px, 1.4vw, 14px);
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          user-select: none;
          transition: 0.2s ease;
          box-sizing: border-box;
          text-align: center;
          touch-action: none;
        }

        .wb-b15-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(24px, 4vw, 40px) clamp(24px, 5vw, 50px);
          width: 100%;
        }

        .wb-b15-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(10px, 1.6vw, 14px);
          min-width: 0;
        }

        .wb-b15-num {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          font-size: clamp(18px, 2vw, 20px);
          font-weight: 700;
          line-height: 1;
        }

        .wb-b15-img {
          width: clamp(120px, 20vw, 180px);
          height: clamp(105px, 17vw, 150px);
          object-fit: contain;
          border: 2px solid #bfbfbf;
          border-radius: clamp(12px, 1.6vw, 16px);
          background: #fff;
          display: block;
          box-sizing: border-box;
          padding: clamp(4px, 0.8vw, 6px);
        }

        .wb-b15-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 10px);
          width: 100%;
          align-items: center;
        }

        .wb-b15-line-box {
          width: min(100%, clamp(240px, 32vw, 320px));
          min-height: clamp(40px, 5vw, 44px);
          border-bottom: 2px solid #444;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: clamp(15px, 1.7vw, 18px);
          line-height: 1.35;
          border-radius: 8px 8px 0 0;
          padding: 0 clamp(8px, 1vw, 10px);
          box-sizing: border-box;
          transition: 0.2s ease;
          word-break: break-word;
        }

        .wb-b15-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(4px, 1vw, 8px);
        }

        .wb-b15-touch-preview {
          position: fixed;
          background: #fff;
          padding: 8px 12px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 9999;
          font-size: clamp(15px, 1.7vw, 18px);
          font-weight: 600;
          color: #222;
          max-width: 180px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .wb-b15-grid {
            gap: 24px 24px;
          }

          .wb-b15-line-box {
            width: min(100%, 300px);
          }
        }

        @media (max-width: 700px) {
          .wb-b15-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .wb-b15-card {
            align-items: center;
          }

          .wb-b15-num {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .wb-b15-chip {
            width: 100%;
            max-width: 100%;
          }

          .wb-b15-img {
            width: clamp(120px, 42vw, 170px);
            height: clamp(100px, 34vw, 145px);
          }

          .wb-b15-line-box {
            width: 100%;
            min-height: 40px;
            font-size: clamp(14px, 4vw, 16px);
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
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span> Look and write the questions and answers.
        </h1>

        <div className="wb-b15-bank">
          {DRAG_ITEMS.map((item) => {
            const isUsed = usedDragIds.includes(item.id);

            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="wb-b15-chip"
                style={{
                  border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#efefef" : SOFT_COLOR,
                  color: isUsed ? "#9a9a9a" : "#222",
                  cursor: isUsed || showAns ? "not-allowed" : "grab",
                  opacity: isUsed ? 0.55 : 1,
                  boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        <div className="wb-b15-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-b15-card">
              <div className="wb-b15-num">{item.id}</div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                className="wb-b15-img"
              />

              <div className="wb-b15-lines">
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

        <div className="wb-b15-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      {touchItem && (
        <div
          className="wb-b15-touch-preview"
          style={{
            left: touchPos.x - 60,
            top: touchPos.y - 22,
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}