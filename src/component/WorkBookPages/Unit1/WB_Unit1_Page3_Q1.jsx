import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

const ACTIVE_COLOR = "#c81e1e";
const BORDER_COLOR = "#f39b42";
const TEXT_COLOR = "#2b2b2b";
const HEADER_BG = "#ffffff";

const EXERCISE_DATA = [
  { id: 1, text: "The car is faster than the skateboard.",    correctAnswer: "true"  },
  { id: 2, text: "The grandpa is younger than the grandson.", correctAnswer: "false" },
  { id: 3, text: "The lion is larger than the cat.",          correctAnswer: "true"  },
  { id: 4, text: "The truck is smaller than the car.",        correctAnswer: "false" },
  { id: 5, text: "The snake is longer than the worm.",        correctAnswer: "true"  },
  { id: 6, text: "The book is heavier than the pen.",         correctAnswer: "true"  },
];

const styles = {
  wrapper: { width: "100%", overflowX: "auto" },

  table: {
    width: "100%",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(10px, 1.5vw, 18px)",
    overflow: "hidden",
    background: "#fff",
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) clamp(70px, 10vw, 95px) clamp(70px, 10vw, 95px)",
    minHeight: "clamp(42px, 5vw, 58px)",
    background: HEADER_BG,
    borderBottom: `2px solid ${BORDER_COLOR}`,
  },

  headerCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(14px, 1.6vw, 20px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    padding: "8px",
    boxSizing: "border-box",
  },

  bodyRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) clamp(70px, 10vw, 95px) clamp(70px, 10vw, 95px)",
    minHeight: "clamp(52px, 6vw, 78px)",
    borderBottom: `1.5px solid ${BORDER_COLOR}`,
  },

  sentenceCell: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 16px)",
    padding: "clamp(8px, 1.2vw, 14px)",
    boxSizing: "border-box",
    minWidth: 0,
  },

  number: {
    flexShrink: 0,
    fontSize: "clamp(16px, 1.8vw, 22px)",
    fontWeight: "700",
    color: TEXT_COLOR,
    width: "clamp(18px, 2vw, 26px)",
    textAlign: "center",
  },

  sentenceText: {
    fontSize: "clamp(14px, 2vw, 21px)",
    fontWeight: "500",
    color: TEXT_COLOR,
    lineHeight: 1.25,
    wordBreak: "break-word",
  },

  optionCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderLeft: `1.5px solid ${BORDER_COLOR}`,
    padding: "6px",
    boxSizing: "border-box",
    cursor: "pointer",
    position: "relative",
    userSelect: "none",
  },

  checkMark: {
    fontSize: "clamp(34px, 5vw, 62px)",
    fontWeight: "900",
    lineHeight: 1,
    transform: "rotate(-6deg)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
};

const WB_TrueFalse_Table = () => {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (questionId, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;
    const allAnswered = EXERCISE_DATA.every((item) => answers[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all items first."); return; }

    setShowResults(true);

    let score = 0;
    const total = EXERCISE_DATA.length;
    EXERCISE_DATA.forEach((item) => { if (answers[item.id] === item.correctAnswer) score++; });

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)  ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                 ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    EXERCISE_DATA.forEach((item) => { correctAnswers[item.id] = item.correctAnswer; });
    setAnswers(correctAnswers);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  /* ── helpers ── */
  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] && answers[item.id] !== item.correctAnswer;

  const getCheckColor = (item) => (isWrong(item) ? "#ef4444" : ACTIVE_COLOR);

  const renderMark = (item, optionValue) => {
    if (answers[item.id] !== optionValue) return null;
    return (
      <span style={{ ...styles.checkMark, color: getCheckColor(item) }}>✓</span>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">A</span> Read and write ✓.
        </h1>

        <div style={styles.wrapper}>
          <div style={styles.table}>
            {/* Header */}
            <div style={styles.headerRow}>
              <div style={styles.headerCell}></div>
              <div style={{ ...styles.headerCell, borderLeft: `1.5px solid ${BORDER_COLOR}` }}>True</div>
              <div style={{ ...styles.headerCell, borderLeft: `1.5px solid ${BORDER_COLOR}` }}>False</div>
            </div>

            {/* Rows */}
            {EXERCISE_DATA.map((item, index) => (
              <div
                key={item.id}
                style={{
                  ...styles.bodyRow,
                  borderBottom: index === EXERCISE_DATA.length - 1 ? "none" : `1.5px solid ${BORDER_COLOR}`,
                  background:  "transparent",
                  transition: "background 0.2s",
                }}
              >
                {/* Sentence */}
                <div style={styles.sentenceCell}>
                  <span style={styles.number}>{item.id}</span>
                  <span style={styles.sentenceText}>{item.text}</span>

                  {/* ✗ badge */}
                  {isWrong(item) && (
                    <span
                      style={{
                        marginLeft:     "auto",
                        flexShrink:     0,
                        background:     "#ef4444",
                        color:          "#fff",
                        border : "1px solid #fff ",
                        borderRadius:   "50%",
                        width:          "clamp(18px,2vw,26px)",
                        height:         "clamp(18px,2vw,26px)",
                        fontSize:       "clamp(11px,1.2vw,15px)",
                        fontWeight:     700,
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        boxShadow:      "0 1px 4px rgba(0,0,0,0.18)",
                        flexShrink:     0,
                      }}
                    >
                      X
                    </span>
                  )}
                </div>

                {/* True cell */}
                <div
                  onClick={() => handleSelect(item.id, "true")}
                  style={{
                    ...styles.optionCell,
                    cursor: showAns ? "default" : "pointer",
                  }}
                >
                  {renderMark(item, "true")}
                </div>

                {/* False cell */}
                <div
                  onClick={() => handleSelect(item.id, "false")}
                  style={{
                    ...styles.optionCell,
                    cursor: showAns ? "default" : "pointer",
                  }}
                >
                  {renderMark(item, "false")}
                </div>
              </div>
            ))}
          </div>
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

export default WB_TrueFalse_Table;