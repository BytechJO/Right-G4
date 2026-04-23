import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import busImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 1.svg";
import scooterImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 2.svg";
import carImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 3.svg";
import motorcycleImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 4.svg";

const SENTENCES = [
  {
    id: 1,
    text: "She usually takes a bus to work.",
  },
  {
    id: 2,
    text: "She usually drives a car to the library.",
  },
  {
    id: 3,
    text: "She sometimes rides a scooter to the park.",
  },
  {
    id: 4,
    text: "She rarely rides a motorcycle to the mall.",
  },
];

const IMAGE_CARDS = [
  {
    id: 1,
    img: busImg,
    alt: "bus",
    correctNumber: 1,
  },
  {
    id: 2,
    img: scooterImg,
    alt: "scooter",
    correctNumber: 3,
  },
  {
    id: 3,
    img: carImg,
    alt: "car",
    correctNumber: 2,
  },
  {
    id: 4,
    img: motorcycleImg,
    alt: "motorcycle",
    correctNumber: 4,
  },
];

const DRAG_NUMBERS = [1, 2, 3, 4];

const WRONG_COLOR = "#ef4444";
const TEXT_COLOR = "#111";
const NUMBER_COLOR = "#000000ff";
const DRAG_BG = "#f29a1f";

const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px, 2vw, 22px)",
    width: "100%",
  },

  sentencesWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 2vw, 24px)",
    width: "100%",
  },

  sentenceRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(10px, 1.4vw, 16px)",
    width: "100%",
  },

  sentenceNumber: {
    fontSize: "clamp(18px, 2vw, 30px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(18px, 2vw, 28px)",
    flexShrink: 0,
    paddingTop: "2px",
  },

  sentenceText: {
    fontSize: "clamp(16px, 2.2vw, 28px)",
    fontWeight: 500,
    color: TEXT_COLOR,
    lineHeight: 1.25,
    wordBreak: "break-word",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "clamp(10px, 1.4vw, 18px)",
    width: "100%",
    alignItems: "start",
  },

  cardDropArea: {
    position: "relative",
    width: "100%",
    minWidth: 0,
    cursor: "pointer",
    transition: "0.2s ease",
    borderRadius: "clamp(12px, 1.4vw, 18px)",
  },

  imageWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  },

  numberOverlay: {
    position: "absolute",
    top: "0.01%",
    right: "1.2%",
    width: "14%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: NUMBER_COLOR,
    fontSize: "clamp(22px, 2.5vw, 38px)",
    fontWeight: 500,
    lineHeight: 1,
    background: "transparent",
    border: "none",
    boxSizing: "border-box",
    pointerEvents: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 3,
    pointerEvents: "none",
  },

  dragNumbersWrap: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(10px, 1.4vw, 16px)",
    marginTop: "clamp(2px, 0.6vw, 8px)",
  },

  dragCircle: {
    width: "clamp(40px, 5vw, 52px)",
    height: "clamp(40px, 5vw, 52px)",
    borderRadius: "50%",
    background: DRAG_BG,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(20px, 2.4vw, 28px)",
    fontWeight: 700,
    cursor: "grab",
    userSelect: "none",
    transition: "0.2s ease",
    touchAction: "none",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit3_Page21_QI() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const dropRefs = useRef({});

  const usedNumbers = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  const applyDrop = (cardId, num) => {
    const updated = { ...imageAnswers };

    Object.keys(updated).forEach((key) => {
      if (updated[key] === num) {
        delete updated[key];
      }
    });

    updated[cardId] = num;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setChecked(false);
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (cardId) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(cardId, draggedNumber);
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

  const handleRemoveNumber = (cardId) => {
    if (showAns) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });

    setChecked(false);
  };

  const getScore = () => {
    let score = 0;

    IMAGE_CARDS.forEach((card) => {
      if (imageAnswers[card.id] === card.correctNumber) {
        score += 1;
      }
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = IMAGE_CARDS.every((card) => imageAnswers[card.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = IMAGE_CARDS.length;
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
    const correctMap = {};

    IMAGE_CARDS.forEach((card) => {
      correctMap[card.id] = card.correctNumber;
    });

    setImageAnswers(correctMap);
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

  const isCardWrong = (cardId) => {
    if (!checked || showAns) return false;
    const card = IMAGE_CARDS.find((item) => item.id === cardId);
    return imageAnswers[cardId] !== card.correctNumber;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-i-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
          align-items: start;
        }

        .wb-i-card-active {
          transform: translateY(-1px);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08));
        }

        .wb-i-card-wrong {
          filter: drop-shadow(0 0 0 rgba(0,0,0,0));
        }

        .wb-i-drag-selected {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.2);
        }

        .wb-i-drag-disabled {
          background: #cfcfd4 !important;
          cursor: not-allowed !important;
          opacity: 0.6;
        }

        .wb-i-touch-preview {
          position: fixed;
          width: clamp(40px, 5vw, 52px);
          height: clamp(40px, 5vw, 52px);
          border-radius: 50%;
          background: #8d8d93;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 700;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 900px) {
          .wb-i-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .wb-i-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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
          <span className="WB-ex-A">I</span>
          Read, look, and number.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.contentWrap}>
            <div style={styles.sentencesWrap}>
              {SENTENCES.map((item) => (
                <div key={item.id} style={styles.sentenceRow}>
                  <div style={styles.sentenceNumber}>{item.id}</div>
                  <div style={styles.sentenceText}>{item.text}</div>
                </div>
              ))}
            </div>

            <div className="wb-i-cards-grid">
              {IMAGE_CARDS.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => (dropRefs.current[item.id] = el)}
                  style={styles.cardDropArea}
                  className={`${draggedNumber !== null ? "wb-i-card-active" : ""} ${
                    isCardWrong(item.id) ? "wb-i-card-wrong" : ""
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  onClick={() => handleRemoveNumber(item.id)}
                >
                  <div style={styles.imageWrap}>
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={styles.image}
                      draggable={false}
                    />

                    <div style={styles.numberOverlay}>
                      {imageAnswers[item.id] || ""}
                      {isCardWrong(item.id) && (
                        <span style={styles.wrongBadge}>✕</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.dragNumbersWrap}>
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
                    style={styles.dragCircle}
                    className={`${disabled || showAns ? "wb-i-drag-disabled" : ""} ${
                      selected ? "wb-i-drag-selected" : ""
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      {touchItem !== null && (
        <div
          className="wb-i-touch-preview"
          style={{
            left: touchPos.x - 24,
            top: touchPos.y - 24,
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}