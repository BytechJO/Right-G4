import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 25/Ex H 5.svg";

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
];

const SENTENCES = [
  {
    id: 1,
    text: "It is January. It is cold. I made a snowman.",
    correct: 2,
  },
  {
    id: 2,
    text: "It is June. It is sunny. They are in the park.",
    correct: 3,
  },
  {
    id: 3,
    text: "It is October. It is windy. We wear jackets.",
    correct: 5,
  },
  {
    id: 4,
    text: "It is April. It is rainy. We are under our umbrellas.",
    correct: 4,
  },
  {
    id: 5,
    text: "It is August. It is hot. They are at the beach.",
    correct: 1,
  },
];

const NUMBERS = [1, 2, 3, 4, 5];

export default function WB_Unit_Months_Page232_QH() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [dragData, setDragData] = useState({
    active: false,
    number: null,
    x: 0,
    y: 0,
  });

  const dropRefs = useRef({});
  const activePointerIdRef = useRef(null);

  const usedNumbers = useMemo(() => Object.values(answers), [answers]);

  const assignNumberToSentence = (sentenceId, number) => {
    if (showAns || number == null) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === number) {
          delete updated[key];
        }
      });

      updated[sentenceId] = number;
      return updated;
    });
  };

  const clearDrag = () => {
    setDragData({
      active: false,
      number: null,
      x: 0,
      y: 0,
    });
    activePointerIdRef.current = null;
  };

  const handlePointerDownNumber = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;

    activePointerIdRef.current = e.pointerId;

    setDragData({
      active: true,
      number: num,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerMove = (e) => {
    if (!dragData.active) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    setDragData((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  };

  const handlePointerUp = (e) => {
    if (!dragData.active) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    const dropTarget = Object.entries(dropRefs.current).find(([, element]) => {
      if (!element) return false;

      const rect = element.getBoundingClientRect();

      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
    });

    if (dropTarget) {
      const sentenceId = Number(dropTarget[0]);
      assignNumberToSentence(sentenceId, dragData.number);
    }

    clearDrag();
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};
    SENTENCES.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
    clearDrag();
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    clearDrag();
  };

  const isWrong = (sentenceId) => {
    if (!checked) return false;
    const sentence = SENTENCES.find((item) => item.id === sentenceId);
    return answers[sentenceId] !== sentence.correct;
  };

  const renderNumberBox = (sentenceId) => {
    const value = answers[sentenceId] || "";
    const isDropActive = dragData.active;

    return (
      <div
        ref={(el) => {
          dropRefs.current[sentenceId] = el;
        }}
        style={{
          width: "clamp(38px, 5vw, 46px)",
          height: "clamp(38px, 5vw, 46px)",
          border: `2px solid ${
            isDropActive ? "#f39b42" : "#f39b42"
          }`,
          borderRadius: "8px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(18px, 2.4vw, 22px)",
          fontWeight: "500",
          color: value ? "#000" : "#666",
          position: "relative",
          flexShrink: 0,
          boxSizing: "border-box",
          transition: "0.15s ease",
        }}
      >
        {value}

        {isWrong(sentenceId) && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  const renderImageCard = (item) => (
    <div
      key={item.id}
      style={{
        position: "relative",
        width:
          item.id <= 2
            ? "clamp(150px, 22vw, 200px)"
            : "clamp(135px, 20vw, 180px)",
        height:
          item.id <= 2
            ? "clamp(110px, 17vw, 148px)"
            : "clamp(120px, 18vw, 160px)",
        border: "2px solid #f39b42",
        borderRadius: "14px",
        overflow: "visible",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <img
        src={item.img}
        alt={`match-${item.id}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "14px",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "2px solid #f39b42",
          background: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "700",
          color: "#444",
          boxSizing: "border-box",
        }}
      >
        {item.id}
      </div>
    </div>
  );

  return (
    <div
      className="main-container-component"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={clearDrag}
      style={{
        touchAction: "none",
      }}
    >
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
          <span className="WB-ex-A">H</span>
          Look, read, and match.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            marginTop: "-6px",
            flexWrap: "wrap",
          }}
        >
          {NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);
            const isDragging = dragData.active && dragData.number === num;

            return (
              <div
                key={num}
                onPointerDown={(e) => handlePointerDownNumber(e, num)}
                style={{
                  width: "clamp(38px, 5vw, 42px)",
                  height: "clamp(38px, 5vw, 42px)",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#d1d5db" : "#f39b42",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "clamp(18px, 2.3vw, 21px)",
                  cursor: disabled || showAns ? "not-allowed" : "grab",
                  opacity: disabled ? 0.55 : isDragging ? 0.3 : 1,
                  userSelect: "none",
                  boxShadow: disabled
                    ? "none"
                    : "0 2px 8px rgba(0,0,0,0.12)",
                  touchAction: "none",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "42px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "34px",
              flexWrap: "wrap",
            }}
          >
            {IMAGES.slice(0, 2).map(renderImageCard)}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "34px",
              flexWrap: "wrap",
            }}
          >
            {IMAGES.slice(2).map(renderImageCard)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "760px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {SENTENCES.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              {renderNumberBox(item.id)}

              <div
                style={{
                  fontSize: "clamp(15px, 2vw, 18px)",
                  lineHeight: "1.5",
                  color: "#222",
                  paddingTop: "4px",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>

      {dragData.active && dragData.number !== null && (
        <div
          style={{
            position: "fixed",
            left: dragData.x,
            top: dragData.y,
            transform: "translate(-50%, -50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#f39b42",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "22px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {dragData.number}
        </div>
      )}
    </div>
  );
}