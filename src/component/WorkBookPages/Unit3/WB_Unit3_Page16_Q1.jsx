import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    prefix: "They have some",
    correct: "fruits.",
  },
  {
    id: 2,
    img: img2,
    prefix: "They have some",
    correct: "caps.",
  },
  {
    id: 3,
    img: img3,
    prefix: "They have some",
    correct: "sweets.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "fruits." },
  { id: 2, value: "caps." },
  { id: 3, value: "sweets." },
];

export default function WB_Unit3_Page16_QC() {
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
      const matchedAnswer = DRAG_ITEMS.find(
        (drag) => drag.value === item.correct
      );

      filled[`a-${item.id}`] = {
        dragId: matchedAnswer?.id ?? `a-${item.id}`,
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

  const isWrongAnswer = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, isWrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemoveAnswer(boxKey)}
        className="wb-c16-drop-box"
        style={{
          color: showAns ? "#d93025" : "#111",
          backgroundColor: isWrong ? "rgba(217, 48, 37, 0.08)" : "transparent",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
        }}
      >
        {value}

        {isWrong && <div className="wb-c16-wrong">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c16-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 12px);
          justify-content: center;
          align-items: center;
          padding: clamp(4px, 0.8vw, 6px) 0 0;
        }

        .wb-c16-chip {
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.5vw, 16px);
          border-radius: clamp(10px, 1.4vw, 14px);
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          user-select: none;
          touch-action: none;
          text-align: center;
        }

        .wb-c16-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 18px);
          width: 100%;
        }

        .wb-c16-row {
          display: grid;
          grid-template-columns: clamp(24px, 3vw, 34px) clamp(180px, 29vw, 320px) minmax(0, 1fr);
          gap: clamp(10px, 1.5vw, 14px);
          align-items: center;
          width: 100%;
        }

        .wb-c16-num {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-c16-img {
          width: 100%;
          max-width: clamp(220px, 31vw, 310px);
          height: clamp(120px, 16vw, 170px);
          object-fit: contain;
          display: block;
                    border: 2px solid #f39b42;
object-fit: cover;

        }

        .wb-c16-sentence-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 8px);
          justify-content: center;
          min-width: 0;
        }

        .wb-c16-sentence-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(8px, 1vw, 10px);
          flex-wrap: wrap;
          position: relative;
          min-width: 0;
        }

        .wb-c16-prefix {
          font-size: clamp(18px, 2.4vw, 24px);
          color: #222;
          line-height: 1.2;
        }

        .wb-c16-drop-box {
          width: min(100%, clamp(150px, 22vw, 190px));
          min-height: clamp(38px, 5vw, 42px);
          border-bottom: 2px solid #444;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(18px, 2.4vw, 24px);
          color: #111;
          border-radius: 8px 8px 0 0;
          padding: 0 8px 4px;
          box-sizing: border-box;
          position: relative;
          text-align: center;
          word-break: break-word;
          transition: 0.2s ease;
        }

        .wb-c16-long-line {
          width: 100%;
          border-bottom: 2px solid #555;
          height: 12px;
        }

        .wb-c16-wrong {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        }

        .wb-c16-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-c16-touch-preview {
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
          .wb-c16-row {
            grid-template-columns: clamp(24px, 3vw, 34px) clamp(160px, 32vw, 280px) minmax(0, 1fr);
          }
        }

        @media (max-width: 760px) {
          .wb-c16-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-c16-num {
            margin-bottom: -4px;
          }

          .wb-c16-img {
            max-width: clamp(220px, 56vw, 320px);
            height: clamp(120px, 34vw, 190px);
          }

          .wb-c16-sentence-wrap {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wb-c16-chip {
            width: 100%;
          }

          .wb-c16-prefix,
          .wb-c16-drop-box {
            font-size: clamp(16px, 4.4vw, 18px);
          }

          .wb-c16-drop-box {
            width: min(100%, 170px);
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
          <span className="WB-ex-A">C</span> Look and complete the sentences.
        </h1>

        <div className="wb-c16-bank">
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
                className="wb-c16-chip"
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

        <div className="wb-c16-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c16-row">
              <div className="wb-c16-num">{item.id}</div>

              <img
                src={item.img}
                alt={`sentence-${item.id}`}
                className="wb-c16-img"
              />

              <div className="wb-c16-sentence-wrap">
                <div className="wb-c16-sentence-line">
                  <span className="wb-c16-prefix">{item.prefix}</span>
                  {renderDropBox(`a-${item.id}`, isWrongAnswer(item))}
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="wb-c16-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      {touchItem && (
        <div
          className="wb-c16-touch-preview"
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