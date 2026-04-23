import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgHouse from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/B1.svg";

const DRAG_ITEMS = [
  { id: "act1", value: "bedroom" },
  { id: "act2", value: "basement" },
  { id: "act3", value: "garage" },
  { id: "act4", value: "kitchen" },
  { id: "act5", value: "living room" },
  { id: "act6", value: "dining room" },
  { id: "act7", value: "office" },
  { id: "act8", value: "bathroom" },
];

const ITEMS = [
  { id: 1, correct: "bedroom", fixed: true },
  { id: 2, correct: "basement" },
  { id: 3, correct: "garage" },
  { id: 4, correct: "kitchen" },
  { id: 5, correct: "living room" },
  { id: 6, correct: "dining room" },
  { id: 7, correct: "office" },
  { id: 8, correct: "bathroom" },
];

export default function WB_Unit5_Page27_Q2() {
  const [answers, setAnswers] = useState({
    "a-1": { dragId: "act1", value: "bedroom" },
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const dropRefs = useRef({});

  const usedDragIds = Object.entries(answers)
    .filter(([key, entry]) => key !== "a-1" && entry)
    .map(([, entry]) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const targetItem = ITEMS.find((q) => `a-${q.id}` === boxKey);
    if (!targetItem || targetItem.fixed || showAns) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (key !== "a-1" && newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setChecked(false);
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
    const targetItem = ITEMS.find((q) => `a-${q.id}` === boxKey);
    if (!targetItem || targetItem.fixed || showAns) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setChecked(false);
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
    const filled = {};

    ITEMS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);
      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? `act-${item.id}`,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({
      "a-1": { dragId: "act1", value: "bedroom" },
    });
    setDraggedItem(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!checked || showAns || item.fixed) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (item) => {
    const boxKey = `a-${item.id}`;
    const value = answers[boxKey]?.value || "";

    return (
      <div className="wb-house-line-wrap">
        <div
          ref={(el) => (dropRefs.current[boxKey] = el)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(boxKey)}
          onClick={() => handleRemoveAnswer(boxKey)}
          className={`wb-house-line ${item.fixed ? "wb-house-line--fixed" : ""}`}
          style={{
            cursor:
              item.fixed || showAns
                ? "default"
                : value
                ? "pointer"
                : "pointer",
          }}
        >
          {value ? (
            <span
              className={`wb-house-answer ${
                item.fixed ? "wb-house-answer--fixed" : ""
              }`}
            >
              {value}
            </span>
          ) : (
            <span className="wb-house-placeholder"></span>
          )}
        </div>

        {isWrong(item) && <div className="wb-house-wrong">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
    <style>{`
  .wb-house-wrap {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 8px 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .wb-house-title {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .wb-house-chips {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .wb-house-chip {
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: clamp(11px, 0.9vw, 15px);
    font-weight: 500;
    user-select: none;
    box-sizing: border-box;
    transition: 0.2s ease;
    touch-action: none;
    word-break: break-word;
    background: #ffd09b;
    color: #111;
    border: 1.5px solid #ee9a42;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .wb-house-chip--used {
    background: #ececec;
    color: #b7b7b7;
    border-color: #dadada;
    box-shadow: none;
    opacity: 0.95;
    cursor: not-allowed;
  }

  .wb-house-chip--active {
    cursor: grab;
  }

  .wb-house-layout {
    display: grid;
    grid-template-columns: minmax(210px, 1fr) minmax(260px, 0.95fr) minmax(210px, 1fr);
    gap: clamp(20px, 3vw, 42px);
    align-items: center;
    width: 100%;
  }

  .wb-house-col {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, 2vw, 26px);
    min-width: 0;
  }

  .wb-house-item {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    width: 100%;
  }

  .wb-house-num {
    font-size: clamp(14px, 1.2vw, 20px);
    font-weight: 700;
    line-height: 1;
    color: #1f1f1f;
  }

  .wb-house-line-wrap {
    position: relative;
    width: 100%;
  }

  .wb-house-line {
    width: 100%;
    min-height: 36px;
    border-bottom: 3px solid #2c2c2c;
    display: flex;
    align-items: center;
    padding: 0 4px 4px;
    box-sizing: border-box;
    user-select: none;
  }

  .wb-house-line--fixed {
    cursor: default !important;
  }

  .wb-house-answer {
    font-size: clamp(13px, 1.4vw, 20px);
    line-height: 1.1;
    color: #000000ff;
    font-weight: 500;
    word-break: break-word;
  }

  .wb-house-answer--fixed {
    color: #1f1f1f;
  }

  .wb-house-placeholder {
    display: block;
    width: 100%;
    min-height: 26px;
  }

  .wb-house-wrong {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #ef4444;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    box-sizing: border-box;
  }

  .wb-house-image-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wb-house-image {
    display: block;
    width: 100%;
    max-width: clamp(340px, 42vw, 600px);
    height: auto;
    object-fit: contain;
  }

  .wb-house-buttons {
    display: flex;
    justify-content: center;
    margin-top: 4px;
  }

  @media (max-width: 980px) {
    .wb-house-layout {
      grid-template-columns: 1fr;
      gap: 22px;
    }

    .wb-house-image-wrap {
      order: -1;
    }

    .wb-house-image {
      max-width: min(100%, 480px);
    }

    .wb-house-col {
      gap: 16px;
    }
  }

  @media (max-width: 700px) {
    .wb-house-item {
      grid-template-columns: 26px minmax(0, 1fr);
      gap: 10px;
    }

    .wb-house-line {
      min-height: 36px;
    }

    .wb-house-chips {
      justify-content: flex-start;
    }
  }

  @media (max-width: 520px) {
    .wb-house-wrap {
      gap: 18px;
    }

    .wb-house-chip {
      font-size: 11px;
      padding: 5px 10px;
    }

    .wb-house-wrong {
      right: -4px;
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
          <span className="WB-ex-A">B</span>
          Label the rooms in Tom’s house.
        </h1>

        <div className="wb-house-chips">
          {DRAG_ITEMS.map((item) => {
            const isUsed =
              item.id === "act1"
                ? true
                : usedDragIds.includes(item.id);

            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item)}
                onTouchStart={(e) => handleTouchStart(e, item)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`wb-house-chip ${
                  isUsed || showAns
                    ? "wb-house-chip--used"
                    : "wb-house-chip--active"
                }`}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        <div className="wb-house-layout">
          <div className="wb-house-col">
            {ITEMS.filter((item) => [1, 3, 5, 7].includes(item.id)).map((item) => (
              <div key={item.id} className="wb-house-item">
                <div className="wb-house-num">{item.id}</div>
                {renderDropBox(item)}
              </div>
            ))}
          </div>

          <div className="wb-house-image-wrap">
            <img
              src={imgHouse}
              alt="house scene"
              className="wb-house-image"
            />
          </div>

          <div className="wb-house-col">
            {ITEMS.filter((item) => [2, 4, 6, 8].includes(item.id)).map((item) => (
              <div key={item.id} className="wb-house-item">
                <div className="wb-house-num">{item.id}</div>
                {renderDropBox(item)}
              </div>
            ))}
          </div>
        </div>

        <div className="wb-house-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

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
            fontSize: "17px",
            fontWeight: 600,
            color: "#d72626",
            maxWidth: "180px",
            textAlign: "center",
            border: "1px solid #f5c28a",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}