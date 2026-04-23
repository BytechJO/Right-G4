import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    words: ["the", "mother", "they", "think"],
    correct: "think",
  },
  {
    id: 2,
    words: ["thin", "that", "math", "thirsty"],
    correct: "that",
  },
  {
    id: 3,
    words: ["thank", "this", "bath", "thin"],
    correct: "thank",
  },
  {
    id: 4,
    words: ["father", "the", "thick", "brother"],
    correct: "thick",
  },
  {
    id: 5,
    words: ["birthday", "these", "thin", "thank"],
    correct: "these",
  },
];

const styles = {
  page: {
    width: "100%",
    padding: "12px 20px 28px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  title: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
    gap: "26px 22px",
    alignItems: "start",
  },

  itemWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },

  itemNumber: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#222",
    lineHeight: 1,
    marginTop: "8px",
    minWidth: "18px",
  },

  card: {
    width: "100%",
    maxWidth: "160px",
    minHeight: "290px",
    border: "2px solid  #f39b42",
    borderRadius: "20px",
    background: "#fff",
    padding: "16px 10px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  wordBtn: {
    position: "relative",
    minWidth: "110px",
    minHeight: "48px",
    padding: "4px 12px",
    borderRadius: "999px",
    border: "3px solid transparent",
    background: "transparent",
    color: "#222",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: 1.1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
    boxSizing: "border-box",
    textAlign: "center",
  },

  selectedWord: {
    border: "4px solid #d62828",
  },

  wrongBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    background: "#ef4444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    border: "2px solid #fff",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit4_Page233_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, word) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: word,
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score += 1;
      }
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item, word) => {
    if (!checked || showAns) return false;
    return answers[item.id] === word && word !== item.correct;
  };

  const isSelected = (item, word) => {
    if (showAns) return item.correct === word;
    return answers[item.id] === word;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={styles.container}>
        <h1 className="WB-header-title-page8" style={styles.title}>
          <span className="WB-ex-A">B</span>
          Circle the word in each box that has a different th sound.
        </h1>

        <div style={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.id} style={styles.itemWrap}>
              <div style={styles.itemNumber}>{item.id}</div>

              <div style={styles.card}>
                {item.words.map((word) => {
                  const selected = isSelected(item, word);
                  const wrong = isWrong(item, word);

                  return (
                    <div
                      key={word}
                      onClick={() => handleSelect(item.id, word)}
                      style={{
                        ...styles.wordBtn,
                        ...(selected ? styles.selectedWord : {}),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      {word}

                      {wrong && <div style={styles.wrongBadge}>✕</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.buttonsWrap}>
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