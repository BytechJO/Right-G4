import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 7.svg";
import img4 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 8.svg";;

const RED = "#d62828";
const ORANGE = "#f29a1f";
const BORDER = "#b6b6b6";
const WRONG = "#ef4444";
const TEXT = "#111";

const WORD_BANK = [
  { id: 1, value: "usually" },
  { id: 2, value: "usually" },
  { id: 3, value: "sometimes" },
  { id: 4, value: "sometimes" },
];

const SENTENCES = [
  {
    id: 1,
    before: "She",
    correctWord: "usually",
    after: "takes a bus to school.",
  },
  {
    id: 2,
    before: "Stella’s dad",
    correctWord: "usually",
    after: "takes a taxi.",
  },
  {
    id: 3,
    before: "He",
    correctWord: "sometimes",
    after: "rides a scooter.",
  },
  {
    id: 4,
    before: "Helen’s mom",
    correctWord: "sometimes",
    after: "takes the subway to the supermarket.",
  },
];

const PICTURES = [
  {
    id: 1,
    img: img1,
    alt: "bus",
    bars: 4,
    correctNumber: 1,
  },
  {
    id: 2,
    img: img2,
    alt: "scooter",
    bars: 2,
    correctNumber: 3,
  },
  {
    id: 3,
    img: img3,
    alt: "taxi",
    bars: 4,
    correctNumber: 2,
  },
  {
    id: 4,
    img: img4,
    alt: "subway",
    bars: 2,
    correctNumber: 4,
  },
];

const DRAG_NUMBERS = [1, 2, 3, 4];

const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(16px, 2vw, 24px)",
    width: "100%",
  },

  bankWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  bank: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(8px, 1vw, 12px)",
    padding: "clamp(10px, 1.2vw, 14px)",
    border: `2px solid ${BORDER}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    boxSizing: "border-box",
    background: "#fff",
  },

  dragWord: {
    minHeight: "clamp(30px, 3.8vw, 44px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(5px, 0.8vw, 8px) clamp(12px, 1vw, 18px)",
    borderRadius: "999px",
    border: `2px solid ${RED}`,
    background: "#fde8e8",
    color: RED,
    fontSize: "clamp(16px, 2vw, 24px)",
    fontWeight: 500,
    lineHeight: 1,
    cursor: "grab",
    userSelect: "none",
    touchAction: "none",
    boxSizing: "border-box",
  },

  sentencesWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px, 2vw, 22px)",
    width: "100%",
  },

  sentenceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "clamp(8px, 1vw, 14px)",
    width: "100%",
    flexWrap: "wrap",
  },

  sentenceNumber: {
    fontSize: "clamp(18px, 2vw, 28px)",
    fontWeight: 700,
    color: TEXT,
    lineHeight: 1,
    minWidth: "clamp(18px, 2vw, 28px)",
    flexShrink: 0,
  },

  sentenceText: {
    fontSize: "clamp(16px, 2vw, 24px)",
    color: TEXT,
    lineHeight: 1.2,
    fontWeight: 500,
  },

  wordDrop: {
    minWidth: "clamp(120px, 18vw, 200px)",
    minHeight: "clamp(28px, 3vw, 42px)",
    borderBottom: "3px solid #333",
    display: "inline-flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "0 6px 2px",
    position: "relative",
    boxSizing: "border-box",
    cursor: "pointer",
  },

  dropText: {
    fontSize: "clamp(16px, 2vw, 24px)",
    lineHeight: 1,
    color: RED,
    fontWeight: 500,
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 3,
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "clamp(10px, 1.4vw, 18px)",
    width: "100%",
    alignItems: "start",
  },

  card: {
    position: "relative",
    minHeight: "clamp(150px, 27vw, 240px)",
    border: `2px solid ${ORANGE}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    background: "#fff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "clamp(10px, 1vw, 14px)",
    boxSizing: "border-box",
    transition: "0.2s ease",
  },

  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
    width: "100%",
  },

  barsWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    width: "fit-content",
  },

  bar: {
    width: "clamp(16px, 2.4vw, 28px)",
    height: "clamp(12px, 1.7vw, 20px)",
    border: `1.5px solid ${BORDER}`,
    boxSizing: "border-box",
  },

  cornerDrop: {
    position: "relative",
    width: "clamp(34px, 5vw, 50px)",
    height: "clamp(34px, 5vw, 50px)",
    border: `2px solid ${ORANGE}`,
    borderRadius: "clamp(8px, 1vw, 12px)",
    background: "#fff",
    color: RED,
    fontSize: "clamp(18px, 2.4vw, 32px)",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    flexShrink: 0,
    boxSizing: "border-box",
  },

  imageWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(8px, 1.2vw, 14px) 0 0",
    boxSizing: "border-box",
    minHeight: "clamp(110px, 18vw, 170px)",
  },

  image: {
    width: "100%",
    height: "100%",
    maxWidth: "clamp(95px, 18vw, 180px)",
    maxHeight: "clamp(95px, 18vw, 180px)",
    objectFit: "contain",
    display: "block",
    userSelect: "none",
    pointerEvents: "none",
  },

  dragNumbersWrap: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(10px, 1.4vw, 16px)",
  },

  dragCircle: {
    width: "clamp(40px, 5vw, 52px)",
    height: "clamp(40px, 5vw, 52px)",
    borderRadius: "50%",
    background: ORANGE,
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

export default function WB_Unit3_Page22_QJ() {
  const [wordAnswers, setWordAnswers] = useState({});
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedWord, setDraggedWord] = useState(null);
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchType, setTouchType] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const wordDropRefs = useRef({});
  const numberDropRefs = useRef({});

  const usedWordIds = useMemo(
    () => Object.values(wordAnswers).map((entry) => entry?.dragId).filter(Boolean),
    [wordAnswers]
  );

  const usedNumbers = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  const applyWordDrop = (sentenceId, item) => {
    const updated = { ...wordAnswers };

    Object.keys(updated).forEach((key) => {
      if (updated[key]?.dragId === item.id) {
        delete updated[key];
      }
    });

    updated[sentenceId] = {
      dragId: item.id,
      value: item.value,
    };

    setWordAnswers(updated);
    setDraggedWord(null);
    setChecked(false);
  };

  const applyNumberDrop = (cardId, num) => {
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

  const handleWordDragStart = (item) => {
    if (showAns || usedWordIds.includes(item.id)) return;
    setDraggedWord(item);
  };

  const handleNumberDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleWordDrop = (sentenceId) => {
    if (showAns || !draggedWord) return;
    applyWordDrop(sentenceId, draggedWord);
  };

  const handleNumberDrop = (cardId) => {
    if (showAns || draggedNumber === null) return;
    applyNumberDrop(cardId, draggedNumber);
  };

  const handleTouchStartWord = (e, item) => {
    if (showAns || usedWordIds.includes(item.id)) return;

    const touch = e.touches[0];
    setTouchItem(item);
    setTouchType("word");
    setDraggedWord(item);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchStartNumber = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;

    const touch = e.touches[0];
    setTouchItem(num);
    setTouchType("number");
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

    if (touchType === "word") {
      Object.entries(wordDropRefs.current).forEach(([key, ref]) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        if (
          touchPos.x >= rect.left &&
          touchPos.x <= rect.right &&
          touchPos.y >= rect.top &&
          touchPos.y <= rect.bottom
        ) {
          applyWordDrop(Number(key), touchItem);
        }
      });
    }

    if (touchType === "number") {
      Object.entries(numberDropRefs.current).forEach(([key, ref]) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        if (
          touchPos.x >= rect.left &&
          touchPos.x <= rect.right &&
          touchPos.y >= rect.top &&
          touchPos.y <= rect.bottom
        ) {
          applyNumberDrop(Number(key), touchItem);
        }
      });
    }

    setTouchItem(null);
    setTouchType(null);
    setDraggedWord(null);
    setDraggedNumber(null);
  };

  const handleRemoveWord = (sentenceId) => {
    if (showAns) return;

    setWordAnswers((prev) => {
      const updated = { ...prev };
      delete updated[sentenceId];
      return updated;
    });

    setChecked(false);
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

    SENTENCES.forEach((item) => {
      if (wordAnswers[item.id]?.value === item.correctWord) {
        score += 1;
      }
    });

    PICTURES.forEach((item) => {
      if (imageAnswers[item.id] === item.correctNumber) {
        score += 1;
      }
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allWordsDone = SENTENCES.every((item) => wordAnswers[item.id]?.value);
    const allNumbersDone = PICTURES.every((item) => imageAnswers[item.id]);

    if (!allWordsDone || !allNumbersDone) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = SENTENCES.length + PICTURES.length;
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
    const filledWords = {};
    const filledNumbers = {};

    SENTENCES.forEach((item) => {
      const matched = WORD_BANK.find(
        (word) => !Object.values(filledWords).some((v) => v?.dragId === word.id) && word.value === item.correctWord
      );

      filledWords[item.id] = {
        dragId: matched?.id ?? item.id,
        value: item.correctWord,
      };
    });

    PICTURES.forEach((item) => {
      filledNumbers[item.id] = item.correctNumber;
    });

    setWordAnswers(filledWords);
    setImageAnswers(filledNumbers);
    setChecked(true);
    setShowAns(true);
    setDraggedWord(null);
    setDraggedNumber(null);
    setTouchItem(null);
    setTouchType(null);
  };

  const handleReset = () => {
    setWordAnswers({});
    setImageAnswers({});
    setDraggedWord(null);
    setDraggedNumber(null);
    setTouchItem(null);
    setTouchType(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWordWrong = (sentenceId, correctWord) => {
    if (!checked || showAns) return false;
    return wordAnswers[sentenceId]?.value !== correctWord;
  };

  const isNumberWrong = (cardId, correctNumber) => {
    if (!checked || showAns) return false;
    return imageAnswers[cardId] !== correctNumber;
  };

  const renderBars = (count) => {
    return (
      <div style={styles.barsWrap}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              ...styles.bar,
              background: n <= count ? RED : "#fff",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
          align-items: start;
        }

        .wb-j-card-active {
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.12);
        }

        .wb-j-card-wrong {
          border-color: #d63b3b !important;
        }

        .wb-j-drag-selected {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.2);
        }

        .wb-j-drag-disabled {
          background: #cfcfd4 !important;
          cursor: not-allowed !important;
          opacity: 0.6;
        }

        .wb-j-touch-preview {
          position: fixed;
          padding: 0 14px;
          min-width: 48px;
          height: 48px;
          border-radius: 999px;
          background: #8d8d93;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .wb-j-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .wb-j-cards-grid {
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
          <span className="WB-ex-A">J</span>
          Look and complete the sentences. Number the pictures.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.contentWrap}>
            <div style={styles.bankWrap}>
              <div style={styles.bank}>
                {WORD_BANK.map((item) => {
                  const disabled = usedWordIds.includes(item.id);
                  const selected = draggedWord?.id === item.id || (touchType === "word" && touchItem?.id === item.id);

                  return (
                    <div
                      key={item.id}
                      draggable={!disabled && !showAns}
                      onDragStart={() => handleWordDragStart(item)}
                      onTouchStart={(e) => handleTouchStartWord(e, item)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      style={styles.dragWord}
                      className={`${disabled || showAns ? "wb-j-drag-disabled" : ""} ${
                        selected ? "wb-j-drag-selected" : ""
                      }`}
                    >
                      {item.value}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.sentencesWrap}>
              {SENTENCES.map((item) => (
                <div key={item.id} style={styles.sentenceRow}>
                  <div style={styles.sentenceNumber}>{item.id}</div>

                  <span style={styles.sentenceText}>{item.before}</span>

                  <div
                    ref={(el) => (wordDropRefs.current[item.id] = el)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleWordDrop(item.id)}
                    onClick={() => handleRemoveWord(item.id)}
                    style={styles.wordDrop}
                  >
                    {wordAnswers[item.id]?.value ? (
                      <span style={styles.dropText}>{wordAnswers[item.id].value}</span>
                    ) : null}

                    {isWordWrong(item.id, item.correctWord) && (
                      <span style={styles.wrongBadge}>✕</span>
                    )}
                  </div>

                  <span style={styles.sentenceText}>{item.after}</span>
                </div>
              ))}
            </div>

            <div className="wb-j-cards-grid">
              {PICTURES.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => (numberDropRefs.current[item.id] = el)}
                  style={styles.card}
                  className={`${draggedNumber !== null ? "wb-j-card-active" : ""} ${
                    isNumberWrong(item.id, item.correctNumber) ? "wb-j-card-wrong" : ""
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleNumberDrop(item.id)}
                >
                  <div style={styles.topRow}>
                    {renderBars(item.bars)}

                    <button
                      type="button"
                      style={styles.cornerDrop}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNumber(item.id);
                      }}
                      disabled={!imageAnswers[item.id] || showAns}
                    >
                      {imageAnswers[item.id] || ""}
                      {isNumberWrong(item.id, item.correctNumber) && (
                        <span style={styles.wrongBadge}>✕</span>
                      )}
                    </button>
                  </div>

                  <div style={styles.imageWrap}>
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={styles.image}
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.dragNumbersWrap}>
              {DRAG_NUMBERS.map((num) => {
                const disabled = usedNumbers.includes(num);
                const selected = draggedNumber === num || (touchType === "number" && touchItem === num);

                return (
                  <div
                    key={num}
                    draggable={!disabled && !showAns}
                    onDragStart={() => handleNumberDragStart(num)}
                    onTouchStart={(e) => handleTouchStartNumber(e, num)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={styles.dragCircle}
                    className={`${disabled || showAns ? "wb-j-drag-disabled" : ""} ${
                      selected ? "wb-j-drag-selected" : ""
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
          className="wb-j-touch-preview"
          style={{
            left: touchPos.x - 40,
            top: touchPos.y - 24,
          }}
        >
          {touchType === "word" ? touchItem.value : touchItem}
        </div>
      )}
    </div>
  );
}