import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 4.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#b0b0b0";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";

const ANSWERS = [
  { id: 1, correct: "take a subway", img: img1 },
  { id: 2, correct: "ride a bike", img: img2 },
  { id: 3, correct: "take a bus", img: img3 },
  { id: 4, correct: "take a taxi", img: img4 },
];

const DRAG_ITEMS = [
  { id: 1, value: "take a taxi" },
  { id: 2, value: "take a subway" },
  { id: 3, value: "take a bus" },
  { id: 4, value: "ride a bike" },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 0.75fr) minmax(0, 1fr)",
    gap: "clamp(16px, 2vw, 28px)",
    alignItems: "start",
    width: "100%",
  },

  bankWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  bankBox: {
    width: "100%",
    maxWidth: "clamp(180px, 22vw, 250px)",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(14px, 1.6vw, 22px)",
    padding: "clamp(14px, 2vw, 24px) clamp(10px, 1.5vw, 18px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.2vw, 16px)",
    background: "#fff",
  },

  dragItem: {
    minHeight: "clamp(38px, 5vw, 56px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "clamp(6px, 1vw, 10px) clamp(8px, 1.1vw, 14px)",
    borderRadius: "clamp(10px, 1.2vw, 16px)",
    fontSize: "clamp(16px, 1.8vw, 24px)",
    fontWeight: 500,
    userSelect: "none",
    transition: "0.2s ease",
    boxSizing: "border-box",
    touchAction: "none",
    wordBreak: "break-word",
  },

  rightArea: {
    width: "100%",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(28px, 4vw, 56px) clamp(20px, 3vw, 46px)",
    width: "100%",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(10px, 1.5vw, 16px)",
    minWidth: 0,
  },

  topRow: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(8px, 1vw, 14px)",
  },

  number: {
    fontSize: "clamp(20px, 2.4vw, 34px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
    minWidth: "clamp(20px, 2vw, 34px)",
    paddingTop: "2px",
    flexShrink: 0,
  },

  imageBox: {
    flex: 1,
    width: "100%",
    borderRadius: "clamp(14px, 1.5vw, 22px)",
    overflow: "hidden",
    border: `2px solid ${BORDER_COLOR}`,
    background: "#f7f7f7",
    aspectRatio: "1.85 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  answerWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  dropBox: {
    width: "100%",
    maxWidth: "clamp(220px, 30vw, 430px)",
    minHeight: "clamp(44px, 5vw, 58px)",
    borderBottom: "3px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 clamp(6px, 1vw, 10px) 3px",
    boxSizing: "border-box",
    position: "relative",
    fontSize: "clamp(20px, 2.5vw, 28px)",
    lineHeight: 1.1,
    fontWeight: 500,
    cursor: "pointer",
    userSelect: "none",
    wordBreak: "break-word",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -0.7vw, -4px)",
    right: "clamp(-10px, -1vw, -6px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 13px)",
    fontWeight: 700,
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
  },

  buttonsWrap: {
    marginTop: "clamp(8px, 1.5vw, 14px)",
    display: "flex",
    justifyContent: "center",
  },
};

export default function WB_Transport_DragDrop() {
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
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

  const handleTouchStart = (e, item) => {
    if (showAns || usedDragIds.includes(item.id)) return;

    const touch = e.touches[0];
    setTouchItem(item);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchItem) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchItem) return;

    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom
      ) {
        applyDrop(key, touchItem);
      }
    });

    setTouchItem(null);
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

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ANSWERS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ANSWERS.length;

    ANSWERS.forEach((item) => {
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

    ANSWERS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
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
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemoveAnswer(boxKey)}
        style={{
          ...styles.dropBox,
          color: value ? ANSWER_COLOR : "#111",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
        }}
      >
        {value}

        {wrong && (
          <div style={styles.wrongBadge}>
            ✕
          </div>
        )}
      </div>
    );
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
          <span className="WB-ex-A">A</span> Look and write.
        </h1>

        <div style={styles.pageWrap}>
          <div
            style={styles.contentWrap}
          >
            <div style={styles.bankWrap}>
              <div style={styles.bankBox}>
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
                      style={{
                        ...styles.dragItem,
                        border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                        backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                        color: isUsed ? "#999" : "#222",
                        cursor: isUsed || showAns ? "not-allowed" : "grab",
                        opacity: isUsed ? 0.6 : 1,
                        boxShadow: isUsed
                          ? "none"
                          : "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      {item.value}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.rightArea}>
              <div style={styles.grid}>
                {ANSWERS.map((item) => (
                  <div key={item.id} style={styles.card}>
                    <div style={styles.topRow}>
                      <span style={styles.number}>{item.id}</span>

                      <div style={styles.imageBox}>
                        <img
                          src={item.img}
                          alt={`transport-${item.id}`}
                          style={styles.image}
                        />
                      </div>
                    </div>

                    <div style={styles.answerWrap}>
                      {renderDropBox(`a-${item.id}`, isWrong(item))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>

      {touchItem && (
        <div
          style={{
            position: "fixed",
            left: touchPos.x - 60,
            top: touchPos.y - 22,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "clamp(15px, 1.7vw, 18px)",
            fontWeight: 600,
            color: "#222",
            maxWidth: "180px",
            textAlign: "center",
          }}
        >
          {touchItem.value}
        </div>
      )}

      <style>
        {`
          @media (max-width: 900px) {
            .div-forall-responsive-fix {}
          }

          @media (max-width: 820px) {
            .main-container-component .transport-grid-mobile-fix {}
          }

          @media (max-width: 768px) {
            .main-container-component .transport-grid-mobile-fix {}
          }

          @media (max-width: 760px) {
            .main-container-component .transport-layout-stack {
              display: block;
            }
          }
        `}
      </style>
    </div>
  );
}