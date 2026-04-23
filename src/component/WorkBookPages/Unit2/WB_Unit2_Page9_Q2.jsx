import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 11.svg";
import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 6.svg";

import busImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 7.svg";
import taxiImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 8.svg";
import carImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 9.svg";
import subwayImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 10.svg";
import bikeImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 12.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";

const DRAG_ITEMS = [
  { id: 1, value: "goes to the library by taxi." },
  { id: 2, value: "goes to the library by bus." },
  { id: 3, value: "goes to the mall by bike." },
  { id: 4, value: "goes to the mall by car." },
  { id: 5, value: "goes to the mall by the subway." },
];

const EXERCISE_GROUPS = [
  {
    id: "harley",
    personImg: boyImg,
    placeText: "going to\nthe library",
    days: [
      { day: "Sat", img: busImg },
      { day: "Sun", img: taxiImg },
      { day: "Mon", img: busImg },
      { day: "Tues", img: busImg },
      { day: "Wed", img: taxiImg },
      { day: "Thu", img: carImg },
    ],
    questions: [
      {
        id: 1,
        prefix: "Harley rarely",
        fixed: "goes to the library by car.",
        mode: "fixed",
      },
      {
        id: 2,
        prefix: "Harley sometimes",
        correct: "goes to the library by taxi.",
        mode: "drop",
      },
      {
        id: 3,
        prefix: "Harley usually",
        correct: "goes to the library by bus.",
        mode: "drop",
      },
    ],
  },
  {
    id: "helen",
    personImg: girlImg,
    placeText: "going to\nthe mall",
    days: [
      { day: "Sat", img: subwayImg },
      { day: "Sun", img: bikeImg },
      { day: "Mon", img: bikeImg },
      { day: "Tues", img: carImg },
      { day: "Wed", img: carImg },
      { day: "Thu", img: carImg },
    ],
    questions: [
      {
        id: 4,
        prefix: "Helen sometimes",
        correct: "goes to the mall by bike.",
        mode: "drop",
      },
      {
        id: 5,
        prefix: "Helen usually",
        correct: "goes to the mall by car.",
        mode: "drop",
      },
      {
        id: 6,
        prefix: "Helen rarely",
        correct: "goes to the mall by the subway.",
        mode: "drop",
      },
    ],
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 2.5vw, 30px)",
    width: "100%",
  },

  wordBankWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  wordBank: {
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(8px, 1vw, 12px)",
    padding: "clamp(10px, 1.2vw, 16px)",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    boxSizing: "border-box",
    background: "#fff",
  },

  dragItem: {
    minHeight: "clamp(30px, 4vw, 52px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "clamp(5px, 0.8vw, 10px) clamp(8px, 1vw, 16px)",
    borderRadius: "clamp(8px, 1vw, 14px)",
    fontSize: "clamp(10px, 1.45vw, 22px)",
    fontWeight: 500,
    userSelect: "none",
    transition: "0.2s ease",
    boxSizing: "border-box",
    touchAction: "none",
    lineHeight: 1.2,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px, 1.8vw, 22px)",
    width: "100%",
  },

  scheduleTableWrap: {
    width: "100%",
    overflow: "hidden",
  },

  scheduleTable: {
    width: "100%",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(10px, 1.5vw, 18px)",
    overflow: "hidden",
    background: "#fff",
  },

  scheduleRow: {
    display: "grid",
    gridTemplateColumns: "clamp(92px, 21%, 160px) repeat(6, minmax(0, 1fr))",
    width: "100%",
  },

  headerCell: {
    minHeight: "clamp(36px, 4.2vw, 58px)",
    borderRight: `1.5px solid ${BORDER_COLOR}`,
    borderBottom: `1.5px solid ${BORDER_COLOR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(4px, 0.7vw, 8px)",
    boxSizing: "border-box",
    fontSize: "clamp(10px, 1.45vw, 22px)",
    fontWeight: 500,
    color: "#111",
    background: "#fff",
  },

  leftTopCell: {
    minHeight: "clamp(36px, 4.2vw, 58px)",
    borderRight: `1.5px solid ${BORDER_COLOR}`,
    borderBottom: `1.5px solid ${BORDER_COLOR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    padding: "clamp(2px, 0.5vw, 4px)",
    boxSizing: "border-box",
  },

  leftBottomCell: {
    minHeight: "clamp(62px, 8vw, 106px)",
    borderRight: `1.5px solid ${BORDER_COLOR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(6px, 1vw, 12px)",
    boxSizing: "border-box",
    fontSize: "clamp(10px, 1.55vw, 24px)",
    lineHeight: 1.15,
    color: "#111",
    whiteSpace: "pre-line",
    textAlign: "center",
  },

  transportCell: {
    minHeight: "clamp(62px, 8vw, 106px)",
    borderRight: `1.5px solid ${BORDER_COLOR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(2px, 0.7vw, 6px)",
    boxSizing: "border-box",
    background: "#fff",
  },

  smallImg: {
    width: "100%",
    height: "100%",
    maxWidth: "clamp(24px, 7vw, 86px)",
    maxHeight: "clamp(18px, 5vw, 62px)",
    objectFit: "contain",
    display: "block",
  },

  personImg: {
    width: "clamp(24px, 4vw, 58px)",
    height: "clamp(24px, 4vw, 58px)",
    objectFit: "contain",
    display: "block",
  },

  questionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.4vw, 14px)",
    width: "100%",
  },

  questionRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "clamp(6px, 1vw, 12px)",
    width: "100%",
    minWidth: 0,
  },

  qNumber: {
    fontSize: "clamp(14px, 1.7vw, 28px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
    minWidth: "clamp(16px, 1.7vw, 30px)",
    flexShrink: 0,
  },

  qPrefix: {
    fontSize: "clamp(13px, 1.7vw, 26px)",
    color: "#111",
    lineHeight: 1.15,
    flexShrink: 1,
    minWidth: 0,
  },

  fixedAnswerLine: {
    flex: 1,
    minHeight: "clamp(28px, 3.8vw, 54px)",
    borderBottom: "3px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    fontSize: "clamp(13px, 1.7vw, 28px)",
    color: "#111",
    lineHeight: 1.1,
    minWidth: 0,
    wordBreak: "break-word",
  },

  dropBox: {
    flex: 1,
    minHeight: "clamp(28px, 3.8vw, 54px)",
    borderBottom: "3px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    position: "relative",
    fontSize: "clamp(13px, 1.7vw, 30px)",
    lineHeight: 1.1,
    fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(15px, 1.8vw, 24px)",
    height: "clamp(15px, 1.8vw, 24px)",
    borderColor: "#fff",
    borderWidth: "2px",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(8px, 0.9vw, 13px)",
    fontWeight: 700,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
  },
};

export default function WB_ReadLookWrite_Page() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const dropRefs = useRef({});

  const dropQuestions = EXERCISE_GROUPS.flatMap((group) =>
    group.questions.filter((q) => q.mode === "drop")
  );

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

  const handleTouchStart = (e, item) => {
    if (showAns || usedDragIds.includes(item.id)) return;

    const touch = e.touches[0];
    setTouchItem(item);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchItem) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchItem) return;

    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom
      ) {
        applyDrop(key, touchItem);
      }
    });

    setTouchItem(null);
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = dropQuestions.every(
      (item) => answers[`a-${item.id}`]?.value
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = dropQuestions.length;

    dropQuestions.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setShowResults(true);

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

    dropQuestions.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (question) => {
    if (!showResults || question.mode !== "drop") return false;
    return answers[`a-${question.id}`]?.value !== question.correct;
  };

  const renderDropBox = (boxKey, wrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemoveAnswer(boxKey)}
        style={{
          ...styles.dropBox,
          color: value ? ANSWER_COLOR : "#111",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
        }}
      >
        {value}
        {wrong && <div style={styles.wrongBadge}>✕</div>}
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
          <span className="WB-ex-A">B</span> Read, look, and write.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.contentWrap}>
            <div style={styles.wordBankWrap}>
              <div style={styles.wordBank}>
                {DRAG_ITEMS.map((item) => {
                  const isUsed = usedDragIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      draggable={!isUsed && !showAns}
                      onDragStart={() => handleDragStart(item)}
                      onTouchStart={(e) => handleTouchStart(e, item)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      style={{
                        ...styles.dragItem,
                        border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                        backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                        color: isUsed ? "#999" : "#222",
                        cursor: isUsed || showAns ? "not-allowed" : "grab",
                        opacity: isUsed ? 0.6 : 1,
                        boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      {item.value}
                    </div>
                  );
                })}
              </div>
            </div>

            {EXERCISE_GROUPS.map((group) => (
              <div key={group.id} style={styles.section}>
                <div style={styles.scheduleTableWrap}>
                  <div style={styles.scheduleTable}>
                    <div style={styles.scheduleRow}>
                      <div style={styles.leftTopCell}>
                        <img
                          src={group.personImg}
                          alt={group.id}
                          style={styles.personImg}
                        />
                      </div>

                      {group.days.map((item, index) => (
                        <div
                          key={`${group.id}-head-${index}`}
                          style={{
                            ...styles.headerCell,
                            borderRight:
                              index === group.days.length - 1
                                ? "none"
                                : `1.5px solid ${BORDER_COLOR}`,
                          }}
                        >
                          {item.day}
                        </div>
                      ))}
                    </div>

                    <div style={styles.scheduleRow}>
                      <div style={styles.leftBottomCell}>{group.placeText}</div>

                      {group.days.map((item, index) => (
                        <div
                          key={`${group.id}-img-${index}`}
                          style={{
                            ...styles.transportCell,
                            borderRight:
                              index === group.days.length - 1
                                ? "none"
                                : `1.5px solid ${BORDER_COLOR}`,
                          }}
                        >
                          <img
                            src={item.img}
                            alt={`${group.id}-${item.day}`}
                            style={styles.smallImg}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={styles.questionsWrap}>
                  {group.questions.map((question) => (
                    <div key={question.id} style={styles.questionRow}>
                      <span style={styles.qNumber}>{question.id}</span>

                      <span style={styles.qPrefix}>{question.prefix}</span>

                      {question.mode === "fixed" ? (
                        <div style={styles.fixedAnswerLine}>{question.fixed}</div>
                      ) : (
                        renderDropBox(`a-${question.id}`, isWrong(question))
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>

      {touchItem && (
        <div
          style={{
            position: "fixed",
            left: touchPos.x - 90,
            top: touchPos.y - 22,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "clamp(12px, 1.4vw, 18px)",
            fontWeight: 600,
            color: "#222",
            maxWidth: "clamp(120px, 35vw, 240px)",
            textAlign: "center",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}