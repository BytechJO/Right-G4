import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 1.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ANSWERS = [
  { id: 1, correct: "tall" },
  { id: 2, correct: "short" },
  { id: 3, correct: "fast" },
  { id: 4, correct: "slow" },
  { id: 5, correct: "old" },
  { id: 6, correct: "young" },
];

const DRAG_ITEMS = [
  { id: 1, value: "tall" },
  { id: 2, value: "short" },
  { id: 3, value: "fast" },
  { id: 4, value: "slow" },
  { id: 5, value: "old" },
  { id: 6, value: "young" },

  // distractors
  { id: 7, value: "big" },
  { id: 8, value: "small" },
  { id: 9, value: "happy" },
];

export default function WB_Vocabulary_Page214_QI() {
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

  // desktop drag
  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

  // touch for ipad/tablet
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
          minWidth: "180px",
          width: "100%",
          maxWidth: "320px",
          height: "42px",
          borderBottom: "3px solid #3f3f3f",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "24px",
          lineHeight: "1",
          color: showAns ? "#d62828" : "#111",
          padding: "0 4px 2px",
          boxSizing: "border-box",
          position: "relative",
          fontWeight: 500,
          cursor: value && !showAns ? "pointer" : "default",
          userSelect: "none",
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
              backgroundColor: "#ef4444",
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
          <span className="WB-ex-A">I</span>Look and write a vocabulary word.
        </h1>

        {/* main image */}
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
              maxWidth: "1000px",
            }}
          >
            <img
              src={exerciseImg}
              alt="exercise"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>

        {/* drag items */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
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
                  padding: "10px 16px",
                  borderRadius: "14px",
                  border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color: isUsed ? "#999" : "#222",
                  cursor: isUsed || showAns ? "not-allowed" : "grab",
                  opacity: isUsed ? 0.6 : 1,
                  userSelect: "none",
                  fontSize: "18px",
                  fontWeight: 500,
                  boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "0.2s ease",
                  touchAction: "none",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* answer lines */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
            gap: "24px 40px",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {ANSWERS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#111",
                  minWidth: "28px",
                }}
              >
                {item.id}
              </span>

              <div style={{ flex: 1 }}>
                {renderDropBox(`a-${item.id}`, isWrong(item))}
              </div>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div
          style={{
            marginTop: "6px",
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

      {/* floating preview on touch */}
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