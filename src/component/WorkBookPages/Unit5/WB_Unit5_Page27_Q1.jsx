import { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 27/A6.svg";

const YELLOW_COLOR = "#f39b42";
const RED_COLOR = "#ef4444";
const TEXT_COLOR = "#222";
const BORDER_COLOR = "#d4d4d4";

const DATA = [
  {
    id: 1,
    img: img1,
    options: ["bathroom", "garage", "bedroom"],
    correct: "bedroom",
  },
  {
    id: 2,
    img: img2,
    options: ["dining room", "basement", "hall"],
    correct: "dining room",
  },
  {
    id: 3,
    img: img3,
    options: ["kitchen", "living room", "dining room"],
    correct: "kitchen",
  },
  {
    id: 4,
    img: img4,
    options: ["living room", "office", "basement"],
    correct: "office",
  },
  {
    id: 5,
    img: img5,
    options: ["basement", "garage", "kitchen"],
    correct: "basement",
  },
  {
    id: 6,
    img: img6,
    options: ["hall", "bathroom", "stairs"],
    correct: "bathroom",
  },
];

const initialSelections = {
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
    gap: "clamp(18px, 4vw, 42px)",
    width: "100%",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(10px, 2vw, 18px)",
    minWidth: 0,
  },

  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "clamp(10px, 1.8vw, 18px)",
    width: "100%",
    flexWrap: "nowrap",
  },

  number: {
    fontSize: "clamp(18px, 2.2vw, 28px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    lineHeight: 1,
    paddingTop: "clamp(4px, 0.7vw, 8px)",
    flexShrink: 0,
  },

  imageWrap: {
    width: "clamp(78px, 14vw, 140px)",
    height: "clamp(78px, 14vw, 140px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  optionsWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(8px, 1.2vw, 12px)",
    minWidth: 0,
    flex: 1,
    paddingTop: "clamp(2px, 0.5vw, 6px)",
  },

  optionButton: {
    position: "relative",
    border: "none",
    background: "transparent",
    padding: "0 clamp(12px, 2vw, 20px)",
    minHeight: "clamp(26px, 3vw, 36px)",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: "500",
    color: TEXT_COLOR,
    cursor: "pointer",
    borderRadius: "999px",
    lineHeight: 1.2,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(8px, 2vw, 16px)",
    width: "100%",
  },
};

const WB_Unit7_Page27_Q1 = () => {
  const [userSelections, setUserSelections] = useState(initialSelections);
  const [showAnswers, setShowAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  const handleSelect = (id, option) => {
    if (showAnswers) return;

    setUserSelections((prev) => ({
      ...prev,
      [id]: option,
    }));

    setCheckedAnswers(false);
    setWrongAnswers({});
  };

  const checkAnswers = () => {
    if (showAnswers) return;
    const allAnswered = Object.values(userSelections).every((val) => val !== null);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let currentScore = 0;
    const totalQuestions = DATA.length;
    const newWrong = {};

    DATA.forEach((item) => {
      const userAnswer = userSelections[item.id];

      if (userAnswer === item.correct) {
        currentScore++;
        newWrong[item.id] = false;
      } else {
        newWrong[item.id] = true;
      }
    });

    setWrongAnswers(newWrong);
    setCheckedAnswers(true);

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Score: ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 0) {
      ValidationAlert.warning(`Score: ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    const answers = {};
    DATA.forEach((item) => {
      answers[item.id] = item.correct;
    });

    setUserSelections(answers);
    setShowAnswers(true);
    setCheckedAnswers(false);
    setWrongAnswers({});
  };

  const handleStartAgain = () => {
    setUserSelections(initialSelections);
    setShowAnswers(false);
    setWrongAnswers({});
    setCheckedAnswers(false);
  };

  const getOptionStyle = (item, option) => {
    const isSelected = userSelections[item.id] === option;
    const isCorrect = option === item.correct;
    const isWrongSelected =
      checkedAnswers && wrongAnswers[item.id] && isSelected;

    if (showAnswers && isCorrect) {
      return {
        ...styles.optionButton,
        border: `3px solid ${YELLOW_COLOR}`,
      };
    }

    if (isWrongSelected) {
      return {
        ...styles.optionButton,
        border: `3px solid ${RED_COLOR}`,
      };
    }

    if (isSelected) {
      return {
        ...styles.optionButton,
        border: `3px solid ${YELLOW_COLOR}`,
      };
    }

    return {
      ...styles.optionButton,
      border: "3px solid transparent",
      background: "transparent",
    };
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
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">A</span>
          Look, read, and circle.
        </h1>

        <div className="wb-u7-q1-grid" style={styles.grid}>
          {DATA.map((item) => (
            <div key={item.id} style={styles.card}>
              <div className="wb-u7-q1-row" style={styles.topRow}>
                <div style={styles.number}>{item.id}</div>

                <div style={styles.imageWrap}>
                  <img src={item.img} alt={`option-${item.id}`} style={styles.image} />
                </div>

                <div style={styles.optionsWrap}>
                  {item.options.map((option) => {
                    const isWrongSelected =
                      checkedAnswers &&
                      wrongAnswers[item.id] &&
                      userSelections[item.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(item.id, option)}
                        style={{
                          ...getOptionStyle(item, option),
                          cursor: showAnswers ? "default" : "pointer",
                        }}
                      >
                        {option}

                        {isWrongSelected && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              width: "clamp(18px, 2vw, 22px)",
                              height: "clamp(18px, 2vw, 22px)",
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
};

export default WB_Unit7_Page27_Q1;