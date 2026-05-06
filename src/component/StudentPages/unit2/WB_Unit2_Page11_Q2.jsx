import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 8.svg";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";
const ANSWER_COLOR = "#d62828";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#3f3f3f";

const ITEMS = [
  {
    id: 1,
    img: img1,
    example: true,
    question: "How often does she iron clothes?",
    answer: "She usually irons clothes.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    question: "How often does he read the newspaper?",
    answer: "He sometimes reads the newspaper.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    question: "How often does he play chess?",
    answer: "He never plays chess.",
  },
  {
    id: 4,
    img: img4,
    example: false,
    question: "How often does she go to bed?",
    answer: "She always goes to bed.",
  },
];

const QUESTION_DRAG_ITEMS = ITEMS.filter((item) => !item.example).map((item) => ({
  id: `q-${item.id}`,
  type: "question",
  value: item.question,
}));

const ANSWER_DRAG_ITEMS = ITEMS.filter((item) => !item.example).map((item) => ({
  id: `a-${item.id}`,
  type: "answer",
  value: item.answer,
}));

export default function WB_Unit2_Page11_QF() {
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
      type: item.type,
    };

    setAnswers(newAnswers);
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey, expectedType) => {
    if (showAns || !draggedItem) return;
    if (draggedItem.type !== expectedType) {
      setDraggedItem(null);
      return;
    }

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

      const expectedType = ref.dataset.type;
      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom &&
        touchItem.type === expectedType
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

    const editableItems = ITEMS.filter((item) => !item.example);

    const allAnswered = editableItems.every(
      (item) => answers[`q-${item.id}`]?.value && answers[`a-${item.id}`]?.value
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = editableItems.length * 2;

    editableItems.forEach((item) => {
      if (answers[`q-${item.id}`]?.value === item.question) score++;
      if (answers[`a-${item.id}`]?.value === item.answer) score++;
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

    ITEMS.filter((item) => !item.example).forEach((item) => {
      const matchedQuestion = QUESTION_DRAG_ITEMS.find((d) => d.value === item.question);
      const matchedAnswer = ANSWER_DRAG_ITEMS.find((d) => d.value === item.answer);

      filled[`q-${item.id}`] = {
        dragId: matchedQuestion?.id ?? `q-${item.id}`,
        value: item.question,
        type: "question",
      };

      filled[`a-${item.id}`] = {
        dragId: matchedAnswer?.id ?? `a-${item.id}`,
        value: item.answer,
        type: "answer",
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

  const isWrong = (item, field) => {
    if (!showResults || showAns) return false;

    if (field === "question") {
      return answers[`q-${item.id}`]?.value !== item.question;
    }

    return answers[`a-${item.id}`]?.value !== item.answer;
  };

  const renderDropBox = (boxKey, expectedType, wrong, isAnswerLine = false) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={(el) => {
          dropRefs.current[boxKey] = el;
        }}
        data-type={expectedType}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey, expectedType)}
        onClick={() => handleRemoveAnswer(boxKey)}
        style={{
          width: "100%",
          minHeight: isAnswerLine ? "clamp(28px, 3.8vw, 44px)" : "clamp(28px, 3.8vw, 44px)",
          borderBottom: `2px solid ${LINE_COLOR}`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          fontSize: "clamp(14px, 2vw, 28px)",
          lineHeight: 1.15,
          color: value ? ANSWER_COLOR : "#111",
          padding: "0 4px 3px",
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
              top: "clamp(-8px, -1vw, -4px)",
              right: "clamp(-8px, -1vw, -4px)",
              width: "clamp(16px, 2vw, 22px)",
              height: "clamp(16px, 2vw, 22px)",
              borderRadius: "50%",
              backgroundColor: WRONG_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(9px, 1vw, 11px)",
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

  const renderDragItem = (item) => {
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
          padding: "clamp(7px, 1vw, 10px) clamp(10px, 1.3vw, 16px)",
          borderRadius: "clamp(10px, 1vw, 14px)",
          border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
          backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
          color: isUsed ? "#999" : "#222",
          cursor: isUsed || showAns ? "not-allowed" : "grab",
          opacity: isUsed ? 0.6 : 1,
          userSelect: "none",
          fontSize: "clamp(12px, 1.55vw, 18px)",
          fontWeight: 500,
          boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "0.2s ease",
          touchAction: "none",
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        {item.value}
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
          <span className="WB-ex-A">F</span>
          Look at Exercise E. Write the questions and answers.
        </h1>

        {/* question bank */}
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 1vw, 10px)",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {QUESTION_DRAG_ITEMS.map(renderDragItem)}
        </div>

        {/* answer bank */}
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 1vw, 10px)",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ANSWER_DRAG_ITEMS.map(renderDragItem)}
        </div>

        {/* rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px, 2vw, 26px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(24px, 4vw, 40px) clamp(54px, 9vw, 92px) minmax(0, 1fr)",
                gap: "clamp(8px, 1.3vw, 16px)",
                alignItems: "start",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(18px, 2vw, 32px)",
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1,
                  paddingTop: "clamp(8px, 1.4vw, 16px)",
                  textAlign: "center",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  width: "clamp(50px, 8vw, 88px)",
                  height: "clamp(50px, 8vw, 88px)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: "clamp(2px, 0.4vw, 4px)",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={item.img}
                  alt={`person-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(8px, 1vw, 12px)",
                  minWidth: 0,
                }}
              >
                {item.example ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        borderBottom: `2px solid ${LINE_COLOR}`,
                        paddingBottom: "3px",
                        fontSize: "clamp(14px, 2vw, 28px)",
                        lineHeight: 1.2,
                        color: "#111",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.question}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        borderBottom: `2px solid ${LINE_COLOR}`,
                        paddingBottom: "3px",
                        fontSize: "clamp(14px, 2vw, 28px)",
                        lineHeight: 1.2,
                        color: ANSWER_COLOR,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.answer}
                    </div>
                  </>
                ) : (
                  <>
                    {renderDropBox(`q-${item.id}`, "question", isWrong(item, "question"))}
                    {renderDropBox(`a-${item.id}`, "answer", isWrong(item, "answer"), true)}
                  </>
                )}
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
            left: touchPos.x - 60,
            top: touchPos.y - 20,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "clamp(12px, 1.4vw, 18px)",
            fontWeight: 600,
            color: "#222",
            maxWidth: "min(320px, 70vw)",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}