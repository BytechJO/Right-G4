import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page2_Q3.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 8.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 9.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 10.svg";

const Review7_Page2_Q3 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);

  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
  ];

  const sentences = [
    { id: 0, text: "r" },
    { id: 1, text: "a" },
    { id: 2, text: "c" },
    { id: 3, text: "t" },
  ];

  const correct = {
    0: 2,
    1: 3,
    2: 0,
    3: 1,
  };

  const selectImage = (id) => {
    if (locked || showResult) return;

    // إذا اختار جملة → اربط
    if (selectedSentence !== null) {
      setMatches((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((imgKey) => {
          if (updated[imgKey] === selectedSentence) {
            delete updated[imgKey];
          }
        });

        updated[id] = selectedSentence;
        return updated;
      });

      setSelectedSentence(null);
      return;
    }

    // السلوك القديم (اختيار صورة)
    setSelectedImg(id);
  };

  const selectSentence = (id) => {
    if (locked || showResult) return;

    // إذا في صورة مختارة → اربط
    if (selectedImg !== null) {
      setMatches((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((imgKey) => {
          if (updated[imgKey] === id) {
            delete updated[imgKey];
          }
        });

        updated[selectedImg] = id;
        return updated;
      });

      setSelectedImg(null);
      return;
    }
    setSelectedSentence(id);
  };
  const checkAnswers = () => {
    if (locked || showResult) return;

    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = images.length;

    const message = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) {
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }

    setShowResult(true);
    setLocked(true);
  };

  const showAnswers = () => {
    setMatches(correct);
    setLocked(true);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedSentence(null);
    setSelectedImg(null);
    setMatches({});
    setShowResult(false);
    setLocked(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>E</span>
          Look and match. 
        </h5>

        <div className="w-full flex flex-col items-center gap-16">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-10 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => selectImage(i)}
                className="flex flex-col items-center gap-2 cursor-pointer transition relative"
              >
                {/* 🔥 الرقم */}
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {i + 1}
                </span>
                <img
                  src={img.img}
                  style={{
                    width: "85px",
                    height: "85px",
                    objectFit: "contain",
                    border:
                      selectedImg === i
                        ? "3px solid #f97316"
                        : "3px solid transparent",
                    borderRadius: "12px",
                    padding: "4px",
                    backgroundColor:
                      selectedImg === i ? "#ffedd5" : "transparent",
                  }}
                />

                <div
                  ref={(el) => (imageRefs.current[i] = el)} // 🔥 الريف هون على الدوت
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor: selectedImg === i ? "#f97316" : "#fb923c",
                    transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                    boxShadow:
                      selectedImg === i
                        ? "0 0 0 4px rgba(249,115,22,0.2)"
                        : "none",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-4 gap-10 w-full place-items-center mt-10">
            {sentences.map((sent, i) => (
              <div
                key={i}
                onClick={() => selectSentence(i)}
                className="relative flex flex-col items-center cursor-pointer"
              >
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#f97316",
                    transform:
                      selectedSentence === i ? "scale(1.4)" : "scale(1)",
                    boxShadow:
                      selectedSentence === i
                        ? "0 0 0 4px rgba(249,115,22,0.2)"
                        : "none",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div
                  className="relative px-4 py-2 rounded-2xl text-sm text-center transition"
                  style={{
                    backgroundColor:
                      selectedSentence === i ? "#fed7aa" : "#ffedd5",
                    border:
                      selectedSentence === i
                        ? "2px solid #f97316"
                        : "2px solid transparent",
                  }}
                >
                  {sent.text}
                  {showResult &&
                    Object.entries(matches).some(
                      ([imgId, sentId]) =>
                        sentId == i && correct[imgId] !== sentId,
                    ) && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          transform: "translateY(-50%)",
                          width: "20px",
                          height: "20px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                        }}
                      >
                        ✕
                      </span>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Object.entries(matches).map(([imgId, sentId], i) => {
          const imgDot = imageRefs.current[imgId];
          const sentDot = sentenceRefs.current[sentId];

          if (!imgDot || !sentDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const sentRect = sentDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y1 = sentRect.top + sentRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="orange"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review7_Page2_Q3;
