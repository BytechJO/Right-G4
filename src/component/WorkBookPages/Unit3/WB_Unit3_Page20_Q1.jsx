import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  3.svg";

const OPTIONS = ["ch", "tch", "sh"];

const SENTENCES = [
  {
    id: 1,
    parts: ["The ", "icken is eating a pea", " at the bea", "."],
    answers: ["ch", "ch", "ch"],
  },
  {
    id: 2,
    parts: ["He wants a ", "ell. He doesn’t want a wa", "."],
    answers: ["sh", "ch"],
  },
  {
    id: 3,
    parts: ["There is fi", " in the ki", "en."],
    answers: ["sh", "tch"],
  },
];

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
];

const correctImageAnswers = {
  1: 2,
  2: 3,
  3: 1,
};

const NUMBERS = [1, 2, 3];

export default function WB_Phonics_Page227_QA() {
  const [selectAnswers, setSelectAnswers] = useState({});
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const dropRefs = useRef({});

  const usedNumbers = Object.values(imageAnswers);

  const handleSelectChange = (key, value) => {
    if (showAns) return;
    setSelectAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyDrop = (imageId, num) => {
    if (showAns || num === null || num === undefined) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === num) {
          delete updated[key];
        }
      });

      updated[imageId] = num;
      return updated;
    });

    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDragEnd = () => {
    setDraggedNumber(null);
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
    e.preventDefault();

    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (touchItem === null) return;

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
        applyDrop(Number(key), touchItem);
        dropped = true;
      }
    });

    setTouchItem(null);
    setDraggedNumber(null);
  };

  const getTotalBlanks = () =>
    SENTENCES.reduce((acc, s) => acc + s.answers.length, 0);

  const getScore = () => {
    let score = 0;

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        const key = `s${sentence.id}-b${idx}`;
        if (selectAnswers[key] === ans) score++;
      });
    });

    IMAGES.forEach((img) => {
      if (imageAnswers[img.id] === correctImageAnswers[img.id]) score++;
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allSelectsAnswered = SENTENCES.every((sentence) =>
      sentence.answers.every((_, idx) => selectAnswers[`s${sentence.id}-b${idx}`])
    );

    const allImagesAnswered = IMAGES.every((img) => imageAnswers[img.id]);

    if (!allSelectsAnswered || !allImagesAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = getTotalBlanks() + IMAGES.length;
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
    const filledSelects = {};

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        filledSelects[`s${sentence.id}-b${idx}`] = ans;
      });
    });

    setSelectAnswers(filledSelects);
    setImageAnswers(correctImageAnswers);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setSelectAnswers({});
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isSelectWrong = (sentenceId, blankIndex, correctValue) => {
    if (!checked || showAns) return false;
    return selectAnswers[`s${sentenceId}-b${blankIndex}`] !== correctValue;
  };

  const isImageWrong = (id) => {
    if (!checked || showAns) return false;
    return imageAnswers[id] !== correctImageAnswers[id];
  };

  const renderSelect = (sentenceId, blankIndex, correctValue) => {
    const key = `s${sentenceId}-b${blankIndex}`;
    const value = selectAnswers[key] || "";
    const wrong = isSelectWrong(sentenceId, blankIndex, correctValue);

    return (
      <span className="wb-a20-select-wrap">
        <select
          value={value}
          disabled={showAns}
          onChange={(e) => handleSelectChange(key, e.target.value)}
          className="wb-a20-select"
          style={{
            cursor: showAns ? "default" : "pointer",
          }}
        >
          <option value="" disabled>
            —
          </option>
          {OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {!showAns && <span className="wb-a20-select-arrow">▼</span>}

        {wrong && <span className="wb-a20-wrong-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-a20-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-a20-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(120px, 22vw, 230px);
          gap: clamp(10px, 2vw, 28px);
          align-items: start;
          width: 100%;
        }

        .wb-a20-left {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 4vw, 62px);
          padding-top: clamp(2px, 1vw, 18px);
          min-width: 0;
        }

        .wb-a20-sentence-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 18px);
          flex-wrap: wrap;
          width: 100%;
        }

        .wb-a20-sentence-num {
          font-size: clamp(16px, 2vw, 28px);
          font-weight: 700;
          color: #222;
          min-width: clamp(16px, 2vw, 24px);
          line-height: 1;
          flex-shrink: 0;
          padding-top: clamp(2px, 0.5vw, 6px);
        }

        .wb-a20-sentence-text {
          font-size: clamp(14px, 2.1vw, 22px);
          color: #222;
          line-height: 1.5;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          min-width: 0;
          flex: 1;
        }

        .wb-a20-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin: 0 4px;
        }

        .wb-a20-select {
          min-width: clamp(42px, 6vw, 78px);
          width: clamp(42px, 6vw, 78px);
          height: clamp(28px, 4vw, 42px);
          font-size: clamp(14px, 2vw, 22);
          font-weight: 500;
          color: #000;
          border: none;
          outline: none;
          background: transparent;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-align: center;
          line-height: 1;
        }

        .wb-a20-select-arrow {
          position: absolute;
          right: 0.2px;
          bottom: 10px;
          font-size: clamp(11px, 1.3vw, 14px);
          color: #666;
          pointer-events: none;
        }

        .wb-a20-wrong-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          width: clamp(18px, 2vw, 20px);
          height: clamp(18px, 2vw, 20px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 11px);
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        .wb-a20-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.4vw, 16px);
          align-items: center;
          min-width: 0;
        }

        .wb-a20-image-card {
          position: relative;
          width: clamp(110px, 20vw, 230px);
          height: clamp(78px, 12vw, 145px);
          border: 3px solid #f39b42;
          border-radius: clamp(10px, 2vw, 18px);
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .wb-a20-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .wb-a20-image-number {
          position: absolute;
          right: 0;
          bottom: 0;
          width: clamp(24px, 3.4vw, 38px);
          height: clamp(24px, 3.4vw, 38px);
          border-top: 3px solid #f39b42;
          border-left: 3px solid #f39b42;
          border-top-left-radius: 8px;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: #111;
        }

        .wb-a20-image-wrong {
          position: absolute;
          top: 6px;
          left: 6px;
          width: clamp(18px, 2vw, 22px);
          height: clamp(18px, 2vw, 22px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 700;
        }

        .wb-a20-number-bank {
          display: flex;
          justify-content: center;
          gap: clamp(10px, 1.6vw, 14px);
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .wb-a20-number-chip {
          width: clamp(34px, 4.6vw, 44px);
          height: clamp(34px, 4.6vw, 44px);
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: clamp(16px, 2.2vw, 22px);
          user-select: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          touch-action: none;
        }

        .wb-a20-number-chip.disabled {
          box-shadow: none;
          opacity: 0.55;
        }

        .wb-a20-touch-preview {
          position: fixed;
          z-index: 9999;
          transform: translate(-50%, -50%);
          pointer-events: none;
          width: clamp(34px, 4.6vw, 44px);
          height: clamp(34px, 4.6vw, 44px);
          border-radius: 50%;
          background: #f39b42;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: clamp(16px, 2.2vw, 22px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        }

        .wb-a20-buttons {
          display: flex;
          justify-content: center;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .wb-a20-main-grid {
            grid-template-columns: minmax(0, 1fr) clamp(105px, 18vw, 160px);
            gap: 10px;
          }

          .wb-a20-left {
            gap: 18px;
            padding-top: 0;
          }

          .wb-a20-sentence-text {
            font-size: clamp(13px, 1.7vw, 18px);
            line-height: 1.45;
          }

          .wb-a20-sentence-num {
            font-size: clamp(15px, 1.8vw, 20px);
          }

          .wb-a20-select {
            min-width: 42px;
            width: 42px;
            height: 28px;
            font-size: 14px;
            padding: 0 12px 2px 2px;
          }

          .wb-a20-select-arrow {
            right: 2px;
            bottom: 7px;
            font-size: 10px;
          }

          .wb-a20-image-card {
            width: clamp(100px, 16vw, 150px);
            height: clamp(72px, 11vw, 105px);
          }

          .wb-a20-image-number {
            width: 22px;
            height: 22px;
            font-size: 13px;
          }
        }

        @media (max-width: 600px) {
          .wb-a20-main-grid {
            grid-template-columns: minmax(0, 1fr) 92px;
            gap: 8px;
          }

          .wb-a20-left {
            gap: 30px;
          }

          .wb-a20-sentence-row {
            gap: 23px;
          }

          .wb-a20-sentence-text {
            font-size: 12px;
            line-height: 1.35;
          }

          .wb-a20-sentence-num {
            font-size: 14px;
            min-width: 14px;
          }

          .wb-a20-select {
            min-width: 38px;
            width: 38px;
            height: 24px;
            font-size: 12px;
            border-bottom-width: 2px;
            padding: 0 10px 2px 2px;
          }

          .wb-a20-select-arrow {
            right: 1px;
            bottom: 5px;
            font-size: 9px;
          }

          .wb-a20-image-card {
            width: 92px;
            height: 64px;
            border-width: 2px;
          }

          .wb-a20-image-number {
            width: 20px;
            height: 20px;
            font-size: 12px;
            border-top-width: 2px;
            border-left-width: 2px;
          }

          .wb-a20-number-chip {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }

          .wb-a20-touch-preview {
            width: 34px;
            height: 34px;
            font-size: 16px;
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
          <span className="WB-ex-A">A</span>
          Write ch, tch, or sh. Then number the pictures.
        </h1>

        <div className="wb-a20-wrap">
          <div className="wb-a20-main-grid">
            <div className="wb-a20-left">
              <div className="wb-a20-sentence-row">
                <span className="wb-a20-sentence-num">1</span>
                <div className="wb-a20-sentence-text">
                  <span>{SENTENCES[0].parts[0]}</span>
                  {renderSelect(1, 0, "ch")}
                  <span>{SENTENCES[0].parts[1]}</span>
                  {renderSelect(1, 1, "ch")}
                  <span>{SENTENCES[0].parts[2]}</span>
                  {renderSelect(1, 2, "ch")}
                  <span>{SENTENCES[0].parts[3]}</span>
                </div>
              </div>

              <div className="wb-a20-sentence-row">
                <span className="wb-a20-sentence-num">2</span>
                <div className="wb-a20-sentence-text">
                  <span>{SENTENCES[1].parts[0]}</span>
                  {renderSelect(2, 0, "sh")}
                  <span>{SENTENCES[1].parts[1]}</span>
                  {renderSelect(2, 1, "ch")}
                  <span>{SENTENCES[1].parts[2]}</span>
                </div>
              </div>

              <div className="wb-a20-sentence-row">
                <span className="wb-a20-sentence-num">3</span>
                <div className="wb-a20-sentence-text">
                  <span>{SENTENCES[2].parts[0]}</span>
                  {renderSelect(3, 0, "sh")}
                  <span>{SENTENCES[2].parts[1]}</span>
                  {renderSelect(3, 1, "tch")}
                  <span>{SENTENCES[2].parts[2]}</span>
                </div>
              </div>
            </div>

            <div className="wb-a20-right">
              {IMAGES.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    dropRefs.current[item.id] = el;
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  className="wb-a20-image-card"
                >
                  <img
                    src={item.img}
                    alt={`phonics-${item.id}`}
                    className="wb-a20-image"
                  />

                  <div className="wb-a20-image-number">
                    {imageAnswers[item.id] || ""}
                  </div>

                  {isImageWrong(item.id) && (
                    <div className="wb-a20-image-wrong">✕</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="wb-a20-number-bank">
            {NUMBERS.map((num) => {
              const disabled = usedNumbers.includes(num);

              return (
                <div
                  key={num}
                  draggable={!disabled && !showAns}
                  onDragStart={() => handleDragStart(num)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(e, num)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`wb-a20-number-chip ${disabled ? "disabled" : ""}`}
                  style={{
                    backgroundColor: disabled ? "#d1d5db" : "#f39b42",
                    cursor: disabled || showAns ? "not-allowed" : "grab",
                  }}
                >
                  {num}
                </div>
              );
            })}
          </div>

          <div className="wb-a20-buttons">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
              checkAnswers={handleCheck}
            />
          </div>
        </div>
      </div>

      {touchItem !== null && (
        <div
          className="wb-a20-touch-preview"
          style={{
            left: touchPos.x,
            top: touchPos.y,
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}