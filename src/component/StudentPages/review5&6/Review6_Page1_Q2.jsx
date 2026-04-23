import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page2_Q2.css";

const Review6_Page1_Q2 = () => {
  const [lines, setLines] = useState([]);
  const [startDot, setStartDot] = useState(null);
  const [wrongTextIndexes, setWrongTextIndexes] = useState([]);
  const imageDotRefs = useRef([]);
  const textDotRefs = useRef([]);
  const containerRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const items = [
    { letter: "a", word: "3rd" },
    { letter: "b", word: "4th" },
    { letter: "c", word: "1st" },
    { letter: "d", word: "2nd" },
    { letter: "e", word: "8th" },
    { letter: "f", word: "6th" },
    { letter: "g", word: "9th" },
    { letter: "h", word: "10th" },
    { letter: "i", word: "7th" },
    { letter: "j", word: "5th" },
  ];

  const words = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ];

  const correctMatches = {
    0: 2, // a → third
    1: 3, // b → fourth
    2: 0, // c → first
    3: 1, // d → second
    4: 7, // e → eighth
    5: 5, // f → sixth
    6: 8, // g → ninth
    7: 9, // h → tenth
    8: 6, // i → seventh
    9: 4, // j → fifth
  };
  const handleDotClick = (index, type) => {
    if (isChecked || showedAnswer) return;
    if (!startDot) {
      setStartDot({ index, type });
      return;
    }

    if (startDot.type === type) {
      setStartDot(null);
      return;
    }

    const imageIndex = startDot.type === "image" ? startDot.index : index;

    const textIndex = startDot.type === "text" ? startDot.index : index;

    setLines((prevLines) => {
      let updatedLines = [...prevLines];

      updatedLines = updatedLines.filter((line) => {
        const img =
          line.from.type === "image" ? line.from.index : line.to.index;

        return img !== imageIndex;
      });

      updatedLines = updatedLines.filter((line) => {
        const txt = line.from.type === "text" ? line.from.index : line.to.index;

        return txt !== textIndex;
      });

      updatedLines.push({
        from: { index: imageIndex, type: "image" },
        to: { index: textIndex, type: "text" },
      });

      return updatedLines;
    });

    setStartDot(null);
  };
  const formatOrdinal = (word) => {
    const match = word.match(/(\d+)(st|nd|rd|th)/);
    if (!match) return word;

    return (
      <>
        {match[1]}
        <sup style={{ fontSize: "0.6em", marginLeft: "1px" }}>{match[2]}</sup>
      </>
    );
  };
  const showAnswers = () => {
    if (isChecked) return;

    const answerLines = Object.keys(correctMatches).map((imgIndex) => ({
      from: { index: parseInt(imgIndex), type: "image" },
      to: { index: correctMatches[imgIndex], type: "text" },
    }));

    setLines(answerLines);
    setShowedAnswer(true);
  };
  const resetAll = () => {
    setLines([]);
    setStartDot(null);
    setIsChecked(false);
    setShowedAnswer(false);
    setWrongTextIndexes([]);
  };

  const checkAnswers = () => {
    if (showedAnswer) return;

    if (lines.length !== items.length) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all matches before checking.",
      );
      return;
    }

    let score = 0;
    const wrongIndexes = [];

    lines.forEach((line) => {
      const imageIndex =
        line.from.type === "image" ? line.from.index : line.to.index;

      const textIndex =
        line.from.type === "text" ? line.from.index : line.to.index;

      if (correctMatches[imageIndex] === textIndex) {
        score++;
      } else {
        wrongIndexes.push(textIndex);
      }
    });

    setWrongTextIndexes(wrongIndexes);

    const total = items.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    setIsChecked(true);
    setShowedAnswer(true);

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
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
      <div className="div-forall" style={{ width: "60%" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span>
          Match.
        </h5>
        <div className="flex justify-center mt-7">
          {/* 🟢 LEFT SIDE (words) */}
          <div className="w-[35%] flex flex-col gap-4">
            {words.map((word, i) => (
              <div
                key={i}
                onClick={() => handleDotClick(i, "text")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    width: "30%", // 🔥 مهم
                    justifyContent: "flex-start",
                    padding: "2px 6px",
                    borderRadius: "6px",
                    background:
                      startDot?.index === i && startDot?.type === "text"
                        ? "#fde68a"
                        : "transparent",
                  }}
                >
                  {isChecked && wrongTextIndexes.includes(i) && (
                    <span
                      style={{
                        position: "absolute",
                        left: "-20px",
                        top: "20%",
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
                      }}
                    >
                      ✕
                    </span>
                  )}
                  <span style={{ fontWeight: "bold", marginRight: 4 }}>
                    {i + 1}
                  </span>
                  {word}
                </span>

                <div
                  ref={(el) => (textDotRefs.current[i] = el)}
                  className="w-3 h-3 bg-[orange] rounded-full"
                />
              </div>
            ))}
          </div>

          {/* 🟠 RIGHT SIDE (letters + ordinals) */}
          <div
            className="flex flex-col gap-4 items-end"
            style={{
              width: "30%", // 🔥 صغّر العرض
              alignItems: "flex-end",
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => handleDotClick(i, "image")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // 🔥
                  width: "40%", // 🔥 مهم
                  cursor: "pointer",
                }}
              >
                <div
                  ref={(el) => (imageDotRefs.current[i] = el)}
                  className="w-3 h-3 bg-[orange] rounded-full"
                />

                <span
                  style={{
                    display: "inline-block",
                    width: "80px",
                    padding: "2px 6px",
                    borderRadius: "6px",
                    background:
                      startDot?.index === i && startDot?.type === "image"
                        ? "#fde68a"
                        : "transparent",
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: 10 }}>
                    {item.letter}
                  </span>
                  {formatOrdinal(item.word)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {lines.map((line, i) => {
            const imageIndex =
              line.from.type === "image" ? line.from.index : line.to.index;

            const textIndex =
              line.from.type === "text" ? line.from.index : line.to.index;

            const imgDot = imageDotRefs.current[imageIndex];
            const txtDot = textDotRefs.current[textIndex];

            if (!imgDot || !txtDot || !containerRef.current) return null;

            const imgRect = imgDot.getBoundingClientRect();
            const txtRect = txtDot.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const x1 = imgRect.left + imgRect.width / 2 - containerRect.left;
            const y1 = imgRect.top + imgRect.height / 2 - containerRect.top;

            const x2 = txtRect.left + txtRect.width / 2 - containerRect.left;
            const y2 = txtRect.top + txtRect.height / 2 - containerRect.top;

            return (
              <path
                key={i}
                d={`
                  M ${x1} ${y1}
                  C ${(x1 + x2) / 2} ${y1},
                    ${(x1 + x2) / 2} ${y2},
                    ${x2} ${y2}
                `}
                stroke="orange"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6,6" // 🔥 هذا اللي بخلي الخط منقط
              />
            );
          })}
        </svg>

        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review6_Page1_Q2;
