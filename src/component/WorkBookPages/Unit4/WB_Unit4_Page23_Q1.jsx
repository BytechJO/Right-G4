import React, { useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23//Ex E 4.svg";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "February",
    fixed: true,
  },
  {
    id: 2,
    img: img2,
    correct: "July",
    fixed: false,
  },
  {
    id: 3,
    img: img3,
    correct: "October",
    fixed: false,
  },
  {
    id: 4,
    img: img4,
    correct: "May",
    fixed: false,
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(26px, 5vw, 48px) clamp(24px, 6vw, 80px)",
    alignItems: "start",
    justifyItems: "center",
    width: "100%",
  },

  card: {
    width: "100%",
    maxWidth: "clamp(280px, 44vw, 420px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "clamp(12px, 2vw, 18px)",
    minWidth: 0,
  },

  questionRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "clamp(8px, 1.6vw, 16px)",
    flexWrap: "wrap",
    width: "100%",
  },

  qNumber: {
    fontSize: "clamp(20px, 2.4vw, 28px)",
    fontWeight: "700",
    color: "#222",
    lineHeight: 1,
    flexShrink: 0,
  },

  qText: {
    fontSize: "clamp(20px, 2.8vw, 30px)",
    color: "#222",
    lineHeight: 1.2,
    fontWeight: "400",
    wordBreak: "break-word",
  },

  imageWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "clamp(150px, 28vw, 220px)",
    height: "clamp(150px, 28vw, 220px)",
    objectFit: "contain",
    display: "block",
    maxWidth: "100%",
  },

  answerWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "2px",
  },

  answerFieldOuter: {
    position: "relative",
    width: "100%",
    maxWidth: "340px",
    minHeight: "clamp(48px, 7vw, 60px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  answerLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "8px",
    borderBottom: "3px solid #333",
  },

  answerInner: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    flexWrap: "wrap",
    width: "100%",
    textAlign: "center",
  },

  textStyle: {
    fontSize: "clamp(20px, 3vw, 34px)",
    color: "#222",
    fontWeight: "400",
    lineHeight: 1.1,
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },

  selectWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "clamp(140px, 22vw, 190px)",
    width: "fit-content",
    maxWidth: "100%",
    height: "clamp(34px, 6vw, 40px)",
  },

  select: {
    width: "100%",
    minWidth: "clamp(140px, 22vw, 190px)",
    maxWidth: "100%",
    height: "clamp(34px, 6vw, 40px)",
    border: "none",
    outline: "none",
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    textAlign: "center",
    textAlignLast: "center",
    fontSize: "clamp(20px, 3vw, 34px)",
    lineHeight: 1.1,
    color: "#222",
    fontWeight: "400",
    cursor: "pointer",
    padding: "0 28px 0 8px",
  },

  selectArrow: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    color: "#666",
    pointerEvents: "none",
    lineHeight: 1,
  },

  wrongBadge: {
    position: "absolute",
    top: "-2px",
    right: "-10px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#ef4444",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    zIndex: 3,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
  },
};

export default function WB_Months_Page230_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);

    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const handleChange = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.filter((item) => !item.fixed).every(
      (item) => answers[item.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      const userAnswer = item.fixed ? item.correct : answers[item.id];
      if (userAnswer === item.correct) {
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
      if (!item.fixed) {
        filled[item.id] = item.correct;
      }
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
    if (!checked || item.fixed) return false;
    return answers[item.id] !== item.correct;
  };

  const renderAnswerField = (item) => {
    if (item.fixed) {
      return (
        <div style={styles.answerFieldOuter}>
          <div style={styles.answerLine} />

          <div
            style={{
              ...styles.answerInner,
              background: "transparent",
            }}
          >
            <span
              style={{
                ...styles.textStyle,
                color: "#222",
              }}
            >
              It’s
            </span>

            <span
              style={{
                ...styles.textStyle,
                color: "#222",
                padding: "0 4px",
              }}
            >
              {item.correct}
            </span>

            <span
              style={{
                ...styles.textStyle,
                color: "#222",
              }}
            >
              .
            </span>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.answerFieldOuter}>
        <div style={styles.answerLine} />

        <div style={styles.answerInner}>
          <span
            style={{
              ...styles.textStyle,
              color: showAns || answers[item.id] ? "#000000" : "#222",
            }}
          >
            It’s
          </span>

          <div style={styles.selectWrap}>
            <select
              value={answers[item.id] || ""}
              disabled={showAns}
              onChange={(e) => handleChange(item.id, e.target.value)}
              style={{
                ...styles.select,
                color: showAns || answers[item.id] ? "#000000" : "#222",
                cursor: showAns ? "default" : "pointer",
              }}
            >
              <option value="" disabled>
                —
              </option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            {!showAns && <span style={styles.selectArrow}>▼</span>}
          </div>

          <span
            style={{
              ...styles.textStyle,
              color: showAns || answers[item.id] ? "#000000" : "#222",
            }}
          >
            .
          </span>
        </div>

        {isWrong(item) && <div style={styles.wrongBadge}>✕</div>}
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
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        <div style={styles.pageWrap}>
          <div
            style={{
              ...styles.grid,
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(2, minmax(0, 1fr))",
            }}
          >
            {ITEMS.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.questionRow}>
                  <span style={styles.qNumber}>{item.id}</span>

                  <span style={styles.qText}>What month is it?</span>
                </div>

                <div style={styles.imageWrap}>
                  <img
                    src={item.img}
                    alt={`month-${item.id}`}
                    style={styles.image}
                  />
                </div>

                <div style={styles.answerWrap}>{renderAnswerField(item)}</div>
              </div>
            ))}
          </div>
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