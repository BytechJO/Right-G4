import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Asset 82.svg";

const Review4_Page1_Q3 = () => {
  const [lines, setLines] = useState([]);
  const [startDot, setStartDot] = useState(null);

  const imageDotRefs = useRef([]);
  const textDotRefs = useRef([]);
  const containerRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const images = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
  ];

  const words = [`cloudy`, `rainy`, `cold`, `warm`, `hot`];
  const correctMatches = {
    4: 0, 
    3: 1, 
    0: 2,
    1: 3,
    2: 4,
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
  };

  const checkAnswers = () => {
    if (showedAnswer) return;
    if (lines.length !== images.length) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all matches before checking.",
      );
      return;
    }

    let score = 0;

    lines.forEach((line) => {
      const imageIndex =
        line.from.type === "image" ? line.from.index : line.to.index;

      const textIndex =
        line.from.type === "text" ? line.from.index : line.to.index;

      if (correctMatches[imageIndex] === textIndex) {
        score++;
      }
    });

    const total = images.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;
    setIsChecked(true);
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };
  const wrongWords = [];

  if (isChecked) {
    lines.forEach((line) => {
      const imageIndex =
        line.from.type === "image" ? line.from.index : line.to.index;

      const textIndex =
        line.from.type === "text" ? line.from.index : line.to.index;

      if (correctMatches[imageIndex] !== textIndex) {
        wrongWords.push(textIndex);
      }
    });
  }
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
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>C</span> Match and write the
          words.
        </h5>

        {/* TEXTS TOP */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-12 lg:gap-15 mb-10 md:mb-20 lg:mb-30 mt-5 md:mt-10 lg:mt-7">
          {words.map((word, i) => {
            const isWrong = wrongWords.includes(i);

            return (
              <div key={`text-${i}`} className="relative inline-block">
                <p
                  className={`px-10 py-2 rounded-[20px] font-semibold text-[15px] cursor-pointer min-w-[120px] text-center whitespace-pre-line
        ${
          startDot?.index === i && startDot?.type === "text"
            ? "border-2 border-[#F79530] bg-[#fdecea]"
            : "bg-[#FEF3E6]"
        }
        ${isChecked && isWrong ? "border-red-500" : ""}
        `}
                  onClick={() => handleDotClick(i, "text")}
                >
                  {word}
                </p>

                {/* ❌ */}
                {isChecked && isWrong && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                        transform: "translateY(-1px)",
                      }}
                    >
                      ✕
                    </span>
                  </div>
                )}

                <div
                  ref={(el) => (textDotRefs.current[i] = el)}
                  onClick={() => handleDotClick(i, "text")}
                  className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-[#F79530] rounded-full cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* IMAGES BOTTOM */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {images.map((item, i) => (
            <div
              key={`img-${i}`}
              className="flex flex-col items-center relative"
            >
              <div
                ref={(el) => (imageDotRefs.current[i] = el)}
                onClick={() => handleDotClick(i, "image")}
                className="w-3 h-3 bg-[#F79530] rounded-full cursor-pointer "
              />

              <img
                src={item.image}
                onClick={() => handleDotClick(i, "image")}
                style={{
                  height:
                    window.innerWidth >= 768 && window.innerWidth < 1024
                      ? "120px" // iPad
                      : "120px", // باقي الأجهزة
                  width:
                    window.innerWidth >= 768 && window.innerWidth < 1024
                      ? "180px"
                      : "150px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "16px",
                  border: "2px solid #F79530",
                  transition: "all 0.3s ease",
                  transform:
                    startDot?.index === i && startDot?.type === "image"
                      ? "scale(1.05)"
                      : "scale(1)",
                  boxShadow:
                    startDot?.index === i && startDot?.type === "image"
                      ? "0 4px 10px rgba(0,0,0,0.2)"
                      : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

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

          const x1 = txtRect.left + txtRect.width / 2 - containerRect.left;
          const y1 = txtRect.top + txtRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

          const midY = (y1 + y2) / 2;

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
              stroke="#F79530"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
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
  );
};

export default Review4_Page1_Q3;
