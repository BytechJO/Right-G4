import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 1.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 17.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 16.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#d62828";

const DRAG_ITEMS = [
  { id: 1, value: "glue" },
  { id: 2, value: "cup" },
  { id: 3, value: "bug" },
  { id: 4, value: "tune" },
  { id: 5, value: "blue" },
  { id: 6, value: "run" },
];

const ANSWERS = [
  { id: 1, correct: "glue", img: img1 },
  { id: 2, correct: "cup", img: img2 },
  { id: 3, correct: "bug", img: img3 },
  { id: 4, correct: "tune", img: img4 },
  { id: 5, correct: "blue", img: img5 },
  { id: 6, correct: "run", img: img6 },
];

export default function WB_Unit3_Page17_QB() {
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
          width: "100%",
          maxWidth: "220px",
          minHeight: "42px",
          borderBottom: "3px solid #2f2f2f",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          lineHeight: "1.1",
          color: value ? ANSWER_COLOR : "#111",
          padding: "0 6px 3px",
          boxSizing: "border-box",
          position: "relative",
          fontWeight: 500,
          cursor: value && !showAns ? "pointer" : "default",
          userSelect: "none",
          wordBreak: "break-word",
        }}
      >
        {value}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: WRONG_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
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
          gap: "28px",
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
          <span className="WB-ex-A">B</span> Look and write.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "920px",
              border: "2px solid #b8b8b8",
              borderRadius: "18px",
              padding: "8px 12px",
              boxSizing: "border-box",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
            }}
          >
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
                    padding: "10px 18px",
                    borderRadius: "16px",
                    border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                    backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                    color: isUsed ? "#999" : "#222",
                    cursor: isUsed || showAns ? "not-allowed" : "grab",
                    opacity: isUsed ? 0.6 : 1,
                    userSelect: "none",
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    fontWeight: 500,
                    boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                    transition: "0.2s ease",
                    touchAction: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(28px, 4vw, 42px) clamp(20px, 2.5vw, 28px)",
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {ANSWERS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(10px, 1.5vw, 14px)",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1,
                    paddingLeft: "4px",
                  }}
                >
                  {item.id}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  height: "clamp(86px, 12vw, 120px)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={item.img}
                  alt={`exercise-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {renderDropBox(`a-${item.id}`, isWrong(item))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
            left: touchPos.x - 40,
            top: touchPos.y - 20,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "18px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}