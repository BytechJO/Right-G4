import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 4.svg";
import { object } from "framer-motion/client";

const WORDS = ["hot", "cold", "rainy", "windy"];

const ITEMS = [
  { id: 1, img: img1, correct: "cold" },
  { id: 2, img: img2, correct: "rainy" },
  { id: 3, img: img3, correct: "hot" },
  { id: 4, img: img4, correct: "windy" },
];

const styles = {
  page: {
    width: "100%",
    padding: "12px 20px 28px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "980px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "26px",
  },

  title: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  wordBankWrap: {
    display: "flex",
    justifyContent: "center",
  },

  wordBank: {
    minWidth: "min(100%, 520px)",
    maxWidth: "620px",
    border: "2px solid #f39b42",
    borderRadius: "18px",
    padding: "14px 22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "34px",
    background: "#fff",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  word: {
    fontSize: "22px",
    color: "#222",
    lineHeight: 1.1,
    fontWeight: 500,
  },

grid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "34px 42px",
  alignItems: "start",
},

  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  mediaWrap: {
    position: "relative",
    width: "100%",
  },

  numberBadge: {
    position: "absolute",
    top: "-12px",
    left: "-10px",
    minWidth: "34px",
    height: "34px",
    borderRadius: "999px",
    background: "#fff",
    border: "2px solid #f39b42",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: 700,
    color: "#222",
    zIndex: 2,
  },

  imageBox: {
    width: "100%",
    height: "170px",
    border: "2px solid #f39b42",
    objectfit:"contain",
    borderRadius: "18px",
    overflow: "hidden",
    background: "#fff",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  answerWrap: {
    position: "relative",
    width: "100%",
    paddingTop: "6px",
  },

  answerLine: {
    width: "100%",
    borderBottom: "3px solid #4a4a4a",
    paddingBottom: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "68px",
    boxSizing: "border-box",
  },

  selectBox: {
    position: "relative",
    width: "190px",
    height: "48px",
    borderRadius: "12px",
    background: "#fff",
    border: "1.5px solid #d4d4d4",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
  },

  select: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    padding: "0 40px 0 14px",
    textAlign: "center",
    textAlignLast: "center",
    fontSize: "27px",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "12px",
  },

  arrow: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    color: "#666",
    pointerEvents: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "-4px",
    right: "-8px",
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    background: "#ef4444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Weather_Page228_QA() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
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

  const isWrong = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  const getSelectColor = (item) => {
    if (answers[item.id]) return "#000000ff";
    return "#222";
  };

  return (
    <div className="main-container-component">
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
        <h1 className="WB-header-title-page8" style={styles.title}>
          <span className="WB-ex-A">A</span>
          Look, read, and write.
        </h1>

        <div style={styles.wordBankWrap}>
          <div style={styles.wordBank}>
            {WORDS.map((word) => (
              <span key={word} style={styles.word}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <div style={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.mediaWrap}>
                <div style={styles.numberBadge}>{item.id}</div>

                <div style={styles.imageBox}>
                  <img
                    src={item.img}
                    alt={`weather-${item.id}`}
                    style={styles.image}
                  />
                </div>
              </div>

              <div style={styles.answerWrap}>
                <div style={styles.answerLine}>
                  <div style={styles.selectBox}>
                    <select
                      value={answers[item.id] || ""}
                      disabled={showAns}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        ...styles.select,
                        color: getSelectColor(item),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      <option value="" disabled hidden>
                        —
                      </option>
                      {WORDS.map((word) => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>

                    {!showAns && <span style={styles.arrow}>▼</span>}
                  </div>
                </div>

                {isWrong(item) && <div style={styles.wrongBadge}>✕</div>}
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