import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    words: ["cats", "bats", "bees", "tops"],
    correct: "bees",
  },
  {
    id: 2,
    words: ["ducks", "cups", "bags", "cats"],
    correct: "bags",
  },
  {
    id: 3,
    words: ["girls", "socks", "beets", "bats"],
    correct: "girls",
  },
  {
    id: 4,
    words: ["cups", "nuts", "caps", "cubs"],
    correct: "cubs",
  },
  {
    id: 5,
    words: ["bees", "tops", "rats", "socks"],
    correct: "bees",
  },
];

export default function WB_Unit9_Page56_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (columnId, word) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [columnId]: word,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all columns first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!showResults) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
  };

  const getWordStyle = (columnId, word) => {
    const selected = answers[columnId] === word;

    return {
      minWidth: "128px",
      minHeight: "52px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      lineHeight: "1.2",
      color: "#222",
      cursor: showAns ? "default" : "pointer",
      border: selected ? "4px solid #dc2626" : "4px solid transparent",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
      padding: "0 10px",
    };
  };

  return (
        <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px,3vw,36px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">B</span> Read and say. Circle the word with a different -s sound.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "26px",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "6px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                  }}
                >
                  {item.id}
                </span>
              </div>

              <div
                style={{
                  width: "160px",
                  minHeight: "330px",
                  border: "3px solid #a3a3a3",
                  borderRadius: "24px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: "12px 8px",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                {item.words.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.id, word)}
                    style={getWordStyle(item.id, word)}
                  >
                    {word}
                  </button>
                ))}

                {isWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                    }}
                  >
                    ✕
                  </div>
                )}
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
    </div>
  );
}