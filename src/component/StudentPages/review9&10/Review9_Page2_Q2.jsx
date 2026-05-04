import React, { useState } from "react";
import "./Review9_Page2_Q2.css";

import ValidationAlert from "../../Popup/ValidationAlert";
import blue from "../../../assets/audio/ClassBook/Unit 10/P 89/full.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Review9_Page2_Q2 = () => {
  const captions = [
    {
      start: 0.399,
      end: 3.859,
      text: "Page 89, review nine, exercise D.",
    },
    {
      start: 5.119,
      end: 27.559,
      text: "Do both words have the same final S sound? Listen and write check or X. One, trees, vets. Two, keys, bees. Three, rabbits, maps. Four, ducks, tools",
    },
  ];

  const groups = [
    { id: 1, word1: "trees", word2: "vets", answer: "no" },
    { id: 2, word1: "keys", word2: "bees", answer: "yes" },
    { id: 3, word1: "rabbits", word2: "maps", answer: "yes" },
    { id: 4, word1: "ducks", word2: "tools", answer: "no" },
  ];

  const [selected, setSelected] = useState(Array(groups.length).fill(null));
  const [showResult2, setShowResult2] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleSelect = (groupIndex, value) => {
    if (locked || showResult2) return;

    const updated = [...selected];
    updated[groupIndex] = value;
    setSelected(updated);
  };

  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.answer);
    setSelected(correctSelections);
    setShowResult2(true);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked || showResult2) return;

    if (selected.some((val) => val === null)) {
      ValidationAlert.info("Please choose ✓ or ✗ for all items!");
      return;
    }

    let correctCount = 0;

    groups.forEach((group, index) => {
      if (selected[index] === group.answer) {
        correctCount++;
      }
    });

    const total = groups.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }

    setShowResult2(true);
    setLocked(true);
  };

  const reset = () => {
    setSelected(Array(groups.length).fill(null));
    setShowResult2(false);
    setLocked(false);
  };

  const renderChoiceBox = (index, value, symbol) => {
    const isSelected = selected[index] === value;
    const isWrong =
      showResult2 &&
      selected[index] === value &&
      groups[index].answer !== value;

    return (
      <div
        onClick={() => handleSelect(index, value)}
        style={{
          width: "34px",
          height: "34px",
          border: "2px solid #F79530",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: locked ? "default" : "pointer",
          background: isSelected ? "#fff" : "#fff",
          position: "relative",
          fontSize: "22px",
          fontWeight: "700",
          color: isSelected ? "#2c5287" : "transparent",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {isSelected ? symbol : ""}

        {isWrong && (
          <span
            style={{
              position: "absolute",
              right: "-14px",
              top: "50%",
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
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            ✕
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>D</span> Do both words have the
          same final <span style={{ color: "#2e3192" }}> -s sound</span>? Listen
          and write <span style={{ color: "#D52328" }}>✓</span> or{" "}
          <span style={{ color: "#D52328" }}>✗</span>.
        </h5>

        <QuestionAudioPlayer src={blue} captions={captions} stopAtSecond={11.22} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            columnGap: "70px",
            rowGap: "34px",
            marginTop: "10px",
          }}
        >
          {groups.map((group, index) => (
            <div
              key={group.id}
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "14px",
                minHeight: "52px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#1f1f1f",
                }}
              >
                {group.id}
              </span>

              <span
                style={{
                  fontSize: "18px",
                  color: "#2b2b2b",
                  width: "120px", // 🔥 ثابت
                  display: "inline-block",
                }}
              >
                {group.word1}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#2b2b2b",
                  width: "120px",
                  display: "inline-block",
                }}
              >
                {group.word2}
              </span>

              {renderChoiceBox(index, "yes", "✓")}
              {renderChoiceBox(index, "no", "✗")}
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
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

export default Review9_Page2_Q2;
