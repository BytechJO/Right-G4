import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/0000.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00000.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 12.svg";

const WORDS = [
  { id: 1, text: "scoreboard" },
  { id: 2, text: "referee" },
  { id: 3, text: "whistle" },
  { id: 4, text: "bike" },
];

const IMAGES = [
  { id: 3, img: img2, alt: "whistle" },
  { id: 1, img: img1, alt: "scoreboard" },
  { id: 2, img: img3, alt: "referee" },
  { id: 4, img: img4, alt: "bike" },
];

const CORRECT_ANSWERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

const DRAG_NUMBERS = [1, 2, 3, 4];

export default function WB_Vocabulary_Page213_H() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const dropRefs = useRef({});

  const usedNumbers = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  const applyDrop = (imageId, num) => {
    const updated = { ...imageAnswers };

    Object.keys(updated).forEach((key) => {
      if (updated[key] === num) {
        delete updated[key];
      }
    });

    updated[imageId] = num;
    setImageAnswers(updated);
    setDraggedNumber(null);
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (imageId) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(imageId, draggedNumber);
  };

  const handleTouchStart = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;

    const touch = e.touches[0];
    setTouchItem(num);
    setDraggedNumber(num);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (touchItem === null) return;

    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (touchItem === null) return;

    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom
      ) {
        applyDrop(Number(key), touchItem);
      }
    });

    setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleRemoveNumber = (imageId) => {
    if (showAns) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[imageId];
      return updated;
    });
  };

  const getScore = () => {
    let score = 0;

    Object.keys(CORRECT_ANSWERS).forEach((imageId) => {
      if (imageAnswers[imageId] === CORRECT_ANSWERS[imageId]) {
        score += 1;
      }
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = Object.keys(CORRECT_ANSWERS).every(
      (itemId) => imageAnswers[itemId]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = Object.keys(CORRECT_ANSWERS).length;
    const score = getScore();

    setChecked(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setImageAnswers(CORRECT_ANSWERS);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isImageWrong = (imageId) => {
    if (!checked) return false;
    return imageAnswers[imageId] !== CORRECT_ANSWERS[imageId];
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
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
          <span className="WB-ex-A">H</span>
          Read, look, and number.
        </h1>

        <div className="wb-content-grid">
          <div className="wb-words-list">
            {WORDS.map((word) => (
              <div key={word.id} className="wb-word-row">
                <div className="wb-word-box">
                  <span className="wb-word-number-inline">{word.id}</span>
                  <span className="wb-word-text">{word.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="wb-images-grid">
            {IMAGES.map((item) => (
              <div
                key={item.id}
                ref={(el) => (dropRefs.current[item.id] = el)}
                className={`wb-image-card ${
                  draggedNumber !== null ? "wb-image-card--active" : ""
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="wb-image"
                  draggable={false}
                />

                <button
                  type="button"
                  className={`wb-corner-number ${
                    imageAnswers[item.id] ? "wb-corner-number--filled" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveNumber(item.id);
                  }}
                  disabled={!imageAnswers[item.id] || showAns}
                >
                  {imageAnswers[item.id] || ""}
                </button>

                {isImageWrong(item.id) && (
                  <span className="wb-wrong-badge">✕</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="wb-drag-numbers">
          {DRAG_NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);
            const selected = draggedNumber === num || touchItem === num;

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                onTouchStart={(e) => handleTouchStart(e, num)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`wb-drag-circle ${
                  disabled || showAns ? "wb-drag-circle--disabled" : ""
                } ${selected ? "wb-drag-circle--selected" : ""}`}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div className="wb-buttons-wrap">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      {touchItem !== null && (
        <div
          className="wb-touch-preview"
          style={{
            left: touchPos.x - 24,
            top: touchPos.y - 24,
          }}
        >
          {touchItem}
        </div>
      )}

      <style jsx>{`
        .wb-content-grid {
          display: grid;
          grid-template-columns: minmax(250px, 320px) 1fr;
          gap: 30px;
          align-items: start;
        }

        .wb-words-list {
          display: flex;
          flex-direction: column;
          gap: 56px;
          padding-top: 10px;
        }

        .wb-word-row {
          display: flex;
          align-items: center;
        }

        .wb-word-box {
          min-height: 44px;
          padding: 0 12px;
          border: 2px solid #f39b42;
          border-radius: 12px;
          background: #fff;
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          width: 170px;
          gap: 10px;
        }

        .wb-word-number-inline {
          font-size: 18px;
          font-weight: 700;
          color: #111;
          line-height: 1;
          flex-shrink: 0;
        }

        .wb-word-text {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.1;
          color: #222;
          text-transform: lowercase;
        }

        .wb-images-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(190px, 1fr));
          gap: 18px 28px;
          align-items: start;
        }

        .wb-image-card {
          position: relative;
          min-height: 154px;
          border: 2px solid #ec9b32;
          border-radius: 14px;
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          box-sizing: border-box;
          transition: 0.2s ease;
        }

        .wb-image-card--active {
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.12);
        }

        .wb-image {
          width: 100%;
          height: 100%;
          max-height: 130px;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .wb-corner-number {
          position: absolute;
          top: 0;
          right: 0;
          width: 38px;
          height: 38px;
          border: none;
          border-left: 2px solid #ec9b32;
          border-bottom: 2px solid #ec9b32;
          border-bottom-left-radius: 10px;
          background: #fff;
          color: #000000;
          font-size: 22px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          line-height: 1;
        }

        .wb-corner-number:disabled {
          cursor: default;
          opacity: 1;
        }

        .wb-wrong-badge {
          position: absolute;
          top: 38px;
          right: 0;
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
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
          z-index: 11111;
          pointer-events: none;
        }

        .wb-drag-numbers {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 8px;
        }

        .wb-drag-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ec9b32;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          cursor: grab;
          user-select: none;
          transition: 0.2s ease;
          -webkit-tap-highlight-color: transparent;
          touch-action: none;
        }

        .wb-drag-circle--selected {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.2);
        }

        .wb-drag-circle--disabled {
          background: #cfcfd4;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .wb-buttons-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-touch-preview {
          position: fixed;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #8d8d93;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .ipad-header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 56px;
            background: #232323;
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .WB-header-title-page8 {
            font-size: 26px;
          }

          .wb-content-grid {
            grid-template-columns: minmax(220px, 290px) 1fr;
            gap: 24px;
          }

          .wb-words-list {
            gap: 42px;
          }

          .wb-word-box {
            width: 160px;
            min-height: 42px;
          }

          .wb-word-text,
          .wb-word-number-inline {
            font-size: 17px;
          }

          .wb-images-grid {
            grid-template-columns: repeat(2, minmax(160px, 1fr));
            gap: 18px 22px;
          }

          .wb-image-card {
            min-height: 140px;
          }

          .wb-image {
            max-height: 118px;
          }

          .wb-corner-number {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }

          .wb-drag-circle,
          .wb-touch-preview {
            width: 46px;
            height: 46px;
            font-size: 20px;
          }
        }

        @media (max-width: 767px) {
          .WB-header-title-page8 {
            font-size: 23px;
          }

          .WB-ex-A {
            width: 32px;
            height: 32px;
            min-width: 32px;
            font-size: 20px;
          }

          .wb-content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .wb-words-list {
            gap: 16px;
            padding-top: 0;
          }

          .wb-word-box {
            width: 100%;
            max-width: 220px;
            min-height: 42px;
          }

          .wb-word-number-inline,
          .wb-word-text {
            font-size: 16px;
          }

          .wb-images-grid {
            grid-template-columns: repeat(2, minmax(130px, 1fr));
            gap: 14px;
          }

          .wb-image-card {
            min-height: 125px;
            padding: 8px;
          }

          .wb-image {
            max-height: 100px;
          }

          .wb-corner-number {
            width: 32px;
            height: 32px;
            font-size: 18px;
          }

          .wb-drag-circle,
          .wb-touch-preview {
            width: 42px;
            height: 42px;
            font-size: 19px;
          }
        }

        @media (max-width: 520px) {
          .wb-images-grid {
            grid-template-columns: 1fr;
          }

          .wb-word-box {
            max-width: 100%;
          }

          .wb-image-card {
            min-height: 150px;
          }

          .wb-image {
            max-height: 120px;
          }
        }
      `}</style>
    </div>
  );
}