import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 10/SVG/Asset 6.svg";

const RED_COLOR = "#d62828";
const BORDER_COLOR = "#a8a8a8";
const WRONG_COLOR = "#ef4444";
const TEXT_COLOR = "#111";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    correct: "x",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    correct: "check",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    correct: "x",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    correct: "check",
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "clamp(12px, 1.6vw, 20px)",
    width: "100%",
    alignItems: "start",
  },

  cardWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(6px, 0.9vw, 10px)",
    minWidth: 0,
  },

  number: {
    fontSize: "clamp(18px, 2vw, 28px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(16px, 1.8vw, 24px)",
    paddingTop: "clamp(4px, 0.7vw, 8px)",
    flexShrink: 0,
  },

  card: {
    position: "relative",
    flex: 1,
    minWidth: 0,
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    background: "#fff",
    overflow: "hidden",
    padding: "clamp(12px, 1.4vw, 16px) clamp(10px, 1.2vw, 14px) clamp(18px, 2.5vw, 34px)",
    boxSizing: "border-box",
    minHeight: "clamp(138px, 21vw, 210px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(8px, 1vw, 14px)",
    alignItems: "center",
    width: "100%",
  },

  imageBox: {
    width: "100%",
    height: "clamp(74px, 11vw, 126px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },

  answerBox: {
    position: "absolute",
    left: "50%",
    bottom: "clamp(2px, 0.4vw, 6px)",
    transform: "translateX(-50%)",
    width: "clamp(30px, 4vw, 40px)",
    height: "clamp(30px, 4vw, 40px)",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(6px, 0.8vw, 10px)",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxSizing: "border-box",
    lineHeight: 1,
  },

  icon: {
    fontSize: "clamp(24px, 3.2vw, 44px)",
    fontWeight: 700,
    color: RED_COLOR,
    lineHeight: 1,
    transform: "translateY(-1px)",
  },

  toggleWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(8px, 1vw, 12px)",
    marginTop: "clamp(4px, 0.6vw, 6px)",
    flexWrap: "wrap",
  },

  toggleBtn: {
    minWidth: "clamp(44px, 6vw, 64px)",
    minHeight: "clamp(32px, 4vw, 42px)",
    padding: "0 clamp(10px, 1vw, 16px)",
    borderRadius: "999px",
    border: "2px solid transparent",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 3,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit1_Page10_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score += 1;
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

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return answers[item.id] !== item.correct;
  };

  const renderMark = (value) => {
    if (value === "check") {
      return <span style={styles.icon}>✓</span>;
    }

    if (value === "x") {
      return <span style={styles.icon}>✕</span>;
    }

    return null;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-root * {
          box-sizing: border-box !important;
        }

        @media (max-width: 950px) {
          .wb-c-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 560px) {
          .wb-c-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
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
          <span className="WB-ex-A">C</span>
          Do they both have the same <b>u</b> sound? Listen and write ✓ or ✕.
        </h1>

        <div className="wb-c-root" style={styles.pageWrap}>
          <div className="wb-c-grid" style={styles.cardsGrid}>
            {ITEMS.map((item) => {
              const selected = answers[item.id];
              const wrong = isWrong(item);

              return (
                <div key={item.id} style={styles.cardWrap}>
                  <div style={styles.number}>{item.id}</div>

                  <div style={styles.card}>
                    <div style={styles.imagesRow}>
                      <div style={styles.imageBox}>
                        <img
                          src={item.leftImg}
                          alt={`left-${item.id}`}
                          style={styles.image}
                        />
                      </div>

                      <div style={styles.imageBox}>
                        <img
                          src={item.rightImg}
                          alt={`right-${item.id}`}
                          style={styles.image}
                        />
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        handleSelect(
                          item.id,
                          selected === "check" ? "x" : "check"
                        )
                      }
                      style={{
                        ...styles.answerBox,
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      {renderMark(selected)}
                      {wrong && <div style={styles.wrongBadge}>✕</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.toggleWrap}>
            {["check", "x"].map((type) => (
              <div
                key={type}
                style={{
                  ...styles.toggleBtn,
                  borderColor: "#d9d9d9",
                  cursor: "default",
                }}
              >
                {renderMark(type)}
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