import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";


import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/123/Asset 8.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000ff";

const DRAG_ITEMS = [
  { id: 1, value: "She usually irons the clothes." },
  { id: 2, value: "He sometimes reads the newspaper." },
  { id: 3, value: "They never play chess." },
  { id: 4, value: "She always goes to bed." },
];

const ANSWERS = [
  {
    id: 1,
    correct: "She usually irons the clothes.",
    img: img2,
    frequencyLevel: 3, // usually
  },
  {
    id: 2,
    correct: "He sometimes reads the newspaper.",
    img: img3,
    frequencyLevel: 2, // sometimes
  },
  {
    id: 3,
    correct: "They never play chess.",
    img: img4,
    frequencyLevel: 0, // never
  },
  {
    id: 4,
    correct: "She always goes to bed.",
    img: img1,
    frequencyLevel: 4, // always
  },
];

export default function WB_LookAndWrite_PageE() {
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

  const renderFrequencyBars = (level) => {
    return (
      <div
        style={{
          position: "absolute",
          top: "clamp(6px, 0.8vw, 10px)",
          right: "clamp(8px, 1vw, 12px)",
          display: "flex",
          gap: "2px",
          zIndex: 2,
          background: "rgba(255,255,255,0.7)",
          padding: "2px",
          borderRadius: "4px",
        }}
      >
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            style={{
              width: "clamp(10px, 1.2vw, 16px)",
              height: "clamp(8px, 1vw, 12px)",
              backgroundColor: bar <= level ? "#6d6d6d" : "#efefef",
              border: "1px solid #8f8f8f",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>
    );
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          cursor: value && !showAns ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        <div
          style={{
            minHeight: "clamp(34px, 5vw, 46px)",
            fontSize: "clamp(16px, 2vw, 24px)",
            lineHeight: "1.35",
            color: value ? ANSWER_COLOR : "#111",
            fontWeight: 500,
            wordBreak: "break-word",
            textAlign: "left",
            paddingBottom: "2px",
          }}
        >
          {value}
        </div>

        <div
          style={{
            width: "100%",
            borderBottom: "3px solid #3a3a3a",
          }}
        />

        
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
                        border:" 1px solid #ffffffff",

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
          <span className="WB-ex-A">E</span>  Look and write the            sentences. Use the words from the box.

          
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
              maxWidth: "980px",
              border: "2px solid #f39b42",
              borderRadius: "18px",
              padding: "10px 14px",
              boxSizing: "border-box",
              display: "flex",
              gap: "10px",
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
                    padding: "10px 14px",
                    borderRadius: "14px",
                    border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                    backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                    color: isUsed ? "#999" : "#222",
                    cursor: isUsed || showAns ? "not-allowed" : "grab",
                    opacity: isUsed ? 0.6 : 1,
                    userSelect: "none",
                    fontSize: "clamp(13px, 1.3vw, 18px)",
                    fontWeight: 500,
                    boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                    transition: "0.2s ease",
                    touchAction: "none",
                    textAlign: "center",
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
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "clamp(22px, 3vw, 34px) clamp(18px, 2.5vw, 34px)",
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
                alignItems: "flex-start",
                gap: "clamp(10px, 1.3vw, 14px)",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(8px, 1vw, 14px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(18px, 2vw, 30px)",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1,
                    paddingTop: "4px",
                    minWidth: "clamp(16px, 2vw, 24px)",
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </span>

                <div
                  style={{
                    flex: 1,
                    height: "clamp(105px, 17vw, 150px)",
                    border: "2px solid #f39b42",
                    borderRadius: "14px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    boxSizing: "border-box",
                    position: "relative",
                    minWidth: 0,
                  }}
                >
                  <img
                    src={item.img}
                    alt={`exercise-${item.id}`}
                    style={{

                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  paddingLeft: "clamp(24px, 3vw, 32px)",
                  boxSizing: "border-box",
                }}
              >
                {renderDropBox(`a-${item.id}`, isWrong(item))}
              </div>
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
            left: touchPos.x - 120,
            top: touchPos.y - 20,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "16px",
            fontWeight: 600,
            color: "#222",
            maxWidth: "240px",
            textAlign: "center",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}