import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// غيّري المسارات حسب ملفاتك
import q1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E1.svg"
import q1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E2.svg"

import q2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F2.svg"
import q2b from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F3.svg"

import q3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E3.svg"
import q3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E4.svg";

import q4a from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F4.svg"
import q4b from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F5.svg"

import q5a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E5.svg"
import q5b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F1.svg"

import q6a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F6.svg"
import q6b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F7.svg"

const YELLOW_COLOR = "#f39b42";
const RED_COLOR = "#ef4444";
const TEXT_COLOR = "#222";
const BORDER_COLOR = "#d4d4d4";

const QUESTIONS = [
  {
    id: 1,
    text: "The cat is under the bed.",
    options: [
      { id: "a", img: q1a },
      { id: "b", img: q1b },
    ],
    correct: "a",
  },
  {
    id: 2,
    text: "The duck is in front of the bathtub.",
    options: [
      { id: "a", img: q2a },
      { id: "b", img: q2b },
    ],
    correct: "a",
  },
  {
    id: 3,
    text: "The chair is behind the table.",
    options: [
      { id: "a", img: q3a },
      { id: "b", img: q3b },
    ],
    correct: "a",
  },
  {
    id: 4,
    text: "The book is on the table.",
    options: [
      { id: "a", img: q4a },
      { id: "b", img: q4b },
    ],
    correct: "b",
  },
  {
    id: 5,
    text: "The cup is between the dishes.",
    options: [
      { id: "a", img: q5a },
      { id: "b", img: q5b },
    ],
    correct: "a",
  },
  {
    id: 6,
    text: "The table is next to the sofa.",
    options: [
      { id: "a", img: q6a },
      { id: "b", img: q6b },
    ],
    correct: "b",
  },
];

const initialAnswers = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(20px, 4vw, 42px)",
    width: "100%",
  },

  item: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.5vw, 16px)",
    minWidth: 0,
  },

  topRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(8px, 1vw, 14px)",
    minWidth: 0,
  },

  number: {
    fontSize: "clamp(20px, 2vw, 30px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    lineHeight: 1,
    flexShrink: 0,
    paddingTop: "clamp(2px, 0.4vw, 6px)",
  },

  optionsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(10px, 1.5vw, 18px)",
    width: "100%",
    minWidth: 0,
  },

  imageButton: {
    position: "relative",
    width: "100%",
    border: "3px solid transparent",
    borderRadius: "999px",
    background: "transparent",
    padding: "clamp(12px, 2vw, 21px)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },

  imageBox: {
    width: "100%",
    aspectRatio: "1.3 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: "16px",
    boxSizing: "border-box",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  sentence: {
    fontSize: "clamp(18px, 2vw, 26px)",
    lineHeight: 1.35,
    color: TEXT_COLOR,
    fontWeight: "500",
    paddingLeft: "clamp(28px, 3vw, 38px)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(4px, 1vw, 10px)",
    width: "100%",
  },
};

export default function WB_Unit5_Page29_QF() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState({});

  const handleSelect = (questionId, optionId) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    setChecked(false);
    setWrongAnswers({});
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allAnswered = Object.values(answers).every((value) => value !== null);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;
    const newWrongAnswers = {};

    QUESTIONS.forEach((item) => {
      const isCorrect = answers[item.id] === item.correct;

      if (isCorrect) {
        score++;
        newWrongAnswers[item.id] = false;
      } else {
        newWrongAnswers[item.id] = true;
      }
    });

    setWrongAnswers(newWrongAnswers);
    setChecked(true);

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};

    QUESTIONS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });

    setAnswers(filledAnswers);
    setChecked(true);
    setShowAns(true);
    setWrongAnswers({});
  };

  const handleStartAgain = () => {
    setAnswers(initialAnswers);
    setChecked(false);
    setShowAns(false);
    setWrongAnswers({});
  };

  const getCircleStyle = (question, optionId) => {
    const isSelected = answers[question.id] === optionId;
    const isWrongSelected =
      checked &&
      wrongAnswers[question.id] &&
      answers[question.id] === optionId;

    const isCorrectShown = showAns && question.correct === optionId;

    if (isWrongSelected) {
      return {
        border: `4px solid ${RED_COLOR}`,
      };
    }

    if (isSelected || isCorrectShown) {
      return {
        border: `4px solid ${YELLOW_COLOR}`,
      };
    }

    return {
      border: "4px solid transparent",
      background: "transparent",
    };
  };

  return (
    <div className="main-container-component">
      <style>{`
        @media (max-width: 900px) {
          .wb-f-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .wb-f-options {
            gap: 8px !important;
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
          <span className="WB-ex-A">F</span>
          Read, look, and circle.
        </h1>

        <div className="wb-f-grid" style={styles.grid}>
          {QUESTIONS.map((question) => (
            <div key={question.id} style={styles.item}>
              <div style={styles.topRow}>
                <div style={styles.number}>{question.id}</div>

                <div
                  className="wb-f-options"
                  style={styles.optionsWrap}
                >
                  {question.options.map((option) => {
                    const isWrongSelected =
                      checked &&
                      wrongAnswers[question.id] &&
                      answers[question.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(question.id, option.id)}
                        style={{
                          ...styles.imageButton,
                          ...getCircleStyle(question, option.id),
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        <div style={styles.imageBox}>
                          <img
                            src={option.img}
                            alt={`q${question.id}-${option.id}`}
                            style={styles.image}
                          />
                        </div>

                        {isWrongSelected && (
                          <span
                            style={{
                              position: "absolute",
                              top: "2px",
                              right: "2px",
                              width: "clamp(20px, 2vw, 24px)",
                              height: "clamp(20px, 2vw, 24px)",
                              borderRadius: "50%",
                              background: RED_COLOR,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "clamp(10px, 1vw, 12px)",
                              fontWeight: "700",
                              border: "2px solid #fff",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                              boxSizing: "border-box",
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={styles.sentence}>{question.text}</div>
            </div>
          ))}
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}