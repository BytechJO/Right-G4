import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex G 1.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  { id: 1, correct: "dolls?" },
  { id: 2, correct: "cars?" },
  { id: 3, correct: "balls?" },
  { id: 4, correct: "trains?" },
  { id: 5, correct: "kites?" },
];

const DRAG_ITEMS = [
  { id: 1, value: "dolls?" },
  { id: 2, value: "cars?" },
  { id: 3, value: "balls?" },
  { id: 4, value: "trains?" },
  { id: 5, value: "kites?" },

];

export default function WB_Unit3_Page18_QB() {
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
    if (showAns || !item) return;

    setAnswers((prev) => {
      const newAnswers = { ...prev };

      Object.keys(newAnswers).forEach((key) => {
        if (newAnswers[key]?.dragId === item.id) {
          delete newAnswers[key];
        }
      });

      newAnswers[boxKey] = {
        dragId: item.id,
        value: item.value,
      };

      return newAnswers;
    });

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

    const allAnswered = ITEMS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
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
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? `a-${item.id}`,
        value: item.correct,
      };
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
    setTouchPos({ x: 0, y: 0 });
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, wrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={(el) => {
          dropRefs.current[boxKey] = el;
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        className={`wb-g18-drop-box ${wrong ? "wrong" : ""}`}
        style={{
          color: showAns ? "#d93025" : "#111",
        }}
      >
        {value}

        {wrong && (
          <div className="wb-g18-wrong-badge">
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-g18-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 28px);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-g18-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 12px);
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .wb-g18-chip {
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.5vw, 16px);
          border-radius: clamp(10px, 1.4vw, 14px);
          user-select: none;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          touch-action: none;
          text-align: center;
        }

        .wb-g18-stage {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .wb-g18-board {
          position: relative;
          width: 100%;
          max-width: clamp(320px, 88vw, 860px);
        }

        .wb-g18-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
                              border: 2px solid #f39b42;
                              border-radius: 2%;

        }

        .wb-g18-panel {
          position: absolute;
          right: clamp(6px, 2vw, 18px);
          top: clamp(160px, 49.5vw, 425px);
          width: clamp(170px, 40vw, 345px);
          background: #f8f8f8;
          border: 2px solid #9b9b9b;
          border-radius: clamp(10px, 1.6vw, 12px);
          padding: clamp(10px, 1.8vw, 16px) clamp(8px, 1.6vw, 14px) clamp(10px, 1.6vw, 14px);
          box-sizing: border-box;
        }

        .wb-g18-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.8vw, 6px);
          margin-bottom: clamp(8px, 1.2vw, 10px);
        }

        .wb-g18-row:last-child {
          margin-bottom: 0;
        }

        .wb-g18-prefix {
          font-size: clamp(11px, 1.9vw, 18px);
          color: #111;
          line-height: 1.1;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .wb-g18-drop-box {
          min-width: clamp(74px, 15vw, 150px);
          width: 100%;
          min-height: clamp(24px, 3.6vw, 32px);
          border-bottom: 2px solid #3f3f3f;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: clamp(13px, 2vw, 18px);
          line-height: 1.1;
          color: #111;
          padding: 0 4px 2px;
          box-sizing: border-box;
          position: relative;
          font-weight: 500;
          background: transparent;
          word-break: break-word;
        }

        .wb-g18-drop-box.wrong {
          background-color: rgba(239, 68, 68, 0.08);
          border-radius: 6px 6px 0 0;
        }

        .wb-g18-wrong-badge {
          position: absolute;
          top: clamp(-10px, -1vw, -8px);
          right: clamp(-10px, -1vw, -8px);
          width: clamp(16px, 2vw, 20px);
          height: clamp(16px, 2vw, 20px);
          border-radius: 50%;
          background-color: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        .wb-g18-buttons {
          margin-top: clamp(4px, 1vw, 6px);
          display: flex;
          justify-content: center;
        }

        .wb-g18-chip-selected {
          transform: scale(1.06);
          box-shadow: 0 0 0 3px rgba(243, 155, 66, 0.2);
        }

        .wb-g18-chip-disabled {
          box-shadow: none !important;
          cursor: not-allowed !important;
          opacity: 0.6;
        }

        .wb-g18-touch-preview {
          position: fixed;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          padding: 10px 14px;
          min-width: max-content;
          border-radius: 14px;
          background: ${ACTIVE_COLOR};
          color: #fff;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 600;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .wb-g18-panel {
            top: clamp(150px, 49vw, 340px);
            width: clamp(160px, 43vw, 250px);
          }
        }

        @media (max-width: 480px) {
          .wb-g18-prefix {
            font-size: clamp(10px, 3vw, 13px);
          }

          .wb-g18-drop-box {
            min-width: clamp(60px, 20vw, 100px);
            font-size: clamp(12px, 3.4vw, 14px);
          }

          .wb-g18-panel {
            right: 6px;
            top: clamp(138px, 48vw, 240px);
            width: clamp(150px, 45vw, 210px);
            padding: 8px 8px 10px;
          }

          .wb-g18-row {
            gap: 4px;
            margin-bottom: 8px;
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
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">B</span> Look and write the questions and answers.
        </h1>

        <div className="wb-g18-bank">
          {DRAG_ITEMS.map((item) => {
            const isUsed = usedDragIds.includes(item.id);
            const isSelected = draggedItem?.id === item.id || touchItem?.id === item.id;

            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`wb-g18-chip ${isUsed || showAns ? "wb-g18-chip-disabled" : ""} ${isSelected ? "wb-g18-chip-selected" : ""}`}
                style={{
                  border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color: isUsed ? "#999" : "#222",
                  cursor: isUsed || showAns ? "not-allowed" : "grab",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        <div className="wb-g18-stage">
          <div className="wb-g18-board">
            <img
              src={exerciseImg}
              alt="exercise"
              className="wb-g18-image"
            />

            <div className="wb-g18-panel">
              {ITEMS.map((item) => (
                <div key={item.id} className="wb-g18-row">
                  <span className="wb-g18-prefix">Do you have any</span>
                  {renderDropBox(`a-${item.id}`, isWrong(item))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wb-g18-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>

      {touchItem && (
        <div
          className="wb-g18-touch-preview"
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