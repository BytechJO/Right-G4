import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 4.svg";

const SOFT_RED = "#fde8e8";
const DOT_COLOR = "#9ca3af";
const TEXT_COLOR = "#111";
const PATH_COLOR = "#9ca3af";


const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";


const LEFT_ITEMS = [
  { id: 1, img: img1, label: "go to school" },
  { id: 2, img: img2, label: "go to the library" },
  { id: 3, img: img3, label: "go to the gym" },
  { id: 4, img: img4, label: "go to summer camp" },
];

const RIGHT_ITEMS = [
  {
    id: 1,
    bars: 4,
    prefixTop: "She",
    prefixBottom: "",
    correctAnswer: "usually rides a bike to the gym.",
  },
  {
    id: 2,
    bars: 0,
    prefixTop: "He",
    prefixBottom: "",
    correctAnswer: "never walks to summer camp.",
  },
  {
    id: 3,
    bars: 5,
    prefixTop: "He always",
    prefixBottom: "",
    correctAnswer: "takes a bus to school.",
  },
  {
    id: 4,
    bars: 2,
    prefixTop: "He",
    prefixBottom: "",
    correctAnswer: "sometimes takes the train to the library.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "usually rides a bike to the gym." },
  { id: 2, value: "never walks to summer camp." },
  { id: 3, value: "takes a bus to school." },
  { id: 4, value: "sometimes takes the train to the library." },
];

const CORRECT_MATCHES = {
  1: 3,
  2: 4,
  3: 1,
  4: 2,
};

const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(16px, 2vw, 24px)",
    width: "100%",
  },

  wordBankWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  wordBank: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(8px, 1vw, 12px)",
    padding: "clamp(10px, 1.2vw, 14px)",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    background: "#fff",
    boxSizing: "border-box",
  },

  dragItem: {
    minHeight: "clamp(30px, 3.8vw, 46px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "clamp(5px, 0.8vw, 9px) clamp(8px, 1vw, 14px)",
    borderRadius: "clamp(8px, 1vw, 12px)",
    fontSize: "clamp(11px, 1.35vw, 18px)",
    fontWeight: 500,
    userSelect: "none",
    transition: "0.2s ease",
    boxSizing: "border-box",
    touchAction: "none",
    lineHeight: 1.2,
  },

  mainBoard: {
    position: "relative",
    width: "100%",
    minHeight: "clamp(420px, 72vw, 860px)",
  },

  connectArea: {
    position: "relative",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: "clamp(24px, 8vw, 120px)",
    alignItems: "start",
  },

  svgLayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "visible",
    zIndex: 1,
  },

  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 2vw, 24px)",
    zIndex: 2,
    minWidth: 0,
  },

  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 4.5vw, 48px)",
    zIndex: 2,
    minWidth: 0,
    paddingTop: "clamp(12px, 2.4vw, 28px)",
  },

  leftItem: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  leftNumber: {
    fontSize: "clamp(16px, 1.9vw, 30px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(14px, 1.8vw, 24px)",
    flexShrink: 0,
  },

  leftCardWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(5px, 0.9vw, 10px)",
    minWidth: 0,
    width: "100%",
    maxWidth: "clamp(120px, 24vw, 260px)",
  },

  imageBox: {
    width: "100%",
    aspectRatio: "1.95 / 1",
    borderRadius: "clamp(10px, 1vw, 16px)",
    overflow: "hidden",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(3px, 0.5vw, 6px)",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  leftLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px, 0.8vw, 10px)",
    width: "100%",
  },

  leftLabel: {
    fontSize: "clamp(12px, 1.8vw, 24px)",
    color: TEXT_COLOR,
    lineHeight: 1.15,
    textAlign: "center",
    flex: 1,
  },

  rightItem: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  sentenceBox: {
    flex: 1,
    minWidth: 0,
  },

  barsWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    marginRight: "clamp(6px, 0.8vw, 10px)",
    verticalAlign: "middle",
  },

  bar: {
    width: "clamp(10px, 1.6vw, 18px)",
    height: "clamp(8px, 1.3vw, 14px)",
    border: "1.5px solid #9e9e9e",
    boxSizing: "border-box",
  },

  sentenceLineTop: {
    fontSize: "clamp(12px, 1.6vw, 24px)",
    color: TEXT_COLOR,
    lineHeight: 1.15,
    borderBottom: "2px solid #444",
    display: "inline",
    paddingBottom: "2px",
    wordBreak: "break-word",
  },

  dropLine: {
    marginTop: "clamp(6px, 0.8vw, 10px)",
    minHeight: "clamp(24px, 3.2vw, 40px)",
    borderBottom: "2px solid #444",
    display: "flex",
    alignItems: "flex-end",
    position: "relative",
    paddingBottom: "2px",
    boxSizing: "border-box",
    cursor: "pointer",
    width: "100%",
  },

  dropText: {
    fontSize: "clamp(12px, 1.6vw, 24px)",
    lineHeight: 1.15,
    wordBreak: "break-word",
    color: ANSWER_COLOR,
  },

  dot: {
    width: "clamp(9px, 1.2vw, 14px)",
    height: "clamp(9px, 1.2vw, 14px)",
    borderRadius: "50%",
    background: DOT_COLOR,
    flexShrink: 0,
    cursor: "pointer",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(15px, 1.8vw, 22px)",
    height: "clamp(15px, 1.8vw, 22px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(8px, 0.9vw, 12px)",
    fontWeight: 700,
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    zIndex: 3,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(14px, 2vw, 24px)",
  },
};

export default function WB_Unit2_Page10_QB() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);

  const boardRef = useRef(null);
  const pointRefs = useRef({});
  const dropRefs = useRef({});

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  useLayoutEffect(() => {
    const updatePaths = () => {
      if (!boardRef.current) return;

      const boardRect = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const startEl = pointRefs.current[`left-${leftId}`];
          const endEl = pointRefs.current[`right-${rightId}`];

          if (!startEl || !endEl) return null;

          const startRect = startEl.getBoundingClientRect();
          const endRect = endEl.getBoundingClientRect();

          const x1 = startRect.left + startRect.width / 2 - boardRect.left;
          const y1 = startRect.top + startRect.height / 2 - boardRect.top;
          const x2 = endRect.left + endRect.width / 2 - boardRect.left;
          const y2 = endRect.top + endRect.height / 2 - boardRect.top;

          const dx = Math.abs(x2 - x1);
          const c1x = x1 + dx * 0.42;
          const c1y = y1;
          const c2x = x2 - dx * 0.42;
          const c2y = y2;

          const isCorrect = Number(rightId) === CORRECT_MATCHES[leftId];

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`,
            isCorrect,
          };
        })
        .filter(Boolean);

      setPaths(newPaths);
    };

    updatePaths();

    const onResize = () => requestAnimationFrame(updatePaths);
    window.addEventListener("resize", onResize);

    let observer;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => requestAnimationFrame(updatePaths));
      observer.observe(boardRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (observer) observer.disconnect();
    };
  }, [matches]);

  const handleLeftSelect = (leftId) => {
    if (showAns) return;
    setSelectedLeft(leftId);
    setShowResults(false);
  };

  const handleRightSelect = (rightId) => {
    if (showAns || selectedLeft === null) return;

    const updated = { ...matches };

    Object.keys(updated).forEach((key) => {
      if (updated[key] === rightId) {
        delete updated[key];
      }
    });

    updated[selectedLeft] = rightId;

    setMatches(updated);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const applyDrop = (boxKey, item) => {
    const updated = { ...answers };

    Object.keys(updated).forEach((key) => {
      if (updated[key]?.dragId === item.id) {
        delete updated[key];
      }
    });

    updated[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(updated);
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

    const allConnected = LEFT_ITEMS.every((item) => matches[item.id]);
    const allDropped = RIGHT_ITEMS.every((item) => answers[`r-${item.id}`]?.value);

    if (!allConnected || !allDropped) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = LEFT_ITEMS.length + RIGHT_ITEMS.length;

    LEFT_ITEMS.forEach((item) => {
      if (matches[item.id] === CORRECT_MATCHES[item.id]) {
        score += 1;
      }
    });

    RIGHT_ITEMS.forEach((item) => {
      if (answers[`r-${item.id}`]?.value === item.correctAnswer) {
        score += 1;
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
    const filledMatches = { ...CORRECT_MATCHES };
    const filledAnswers = {};

    RIGHT_ITEMS.forEach((item) => {
      const matchedDrag = DRAG_ITEMS.find((d) => d.value === item.correctAnswer);

      filledAnswers[`r-${item.id}`] = {
        dragId: matchedDrag?.id ?? item.id,
        value: item.correctAnswer,
      };
    });

    setMatches(filledMatches);
    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setMatches({});
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
  };

  const isWrongMatch = (leftId) => {
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== CORRECT_MATCHES[leftId];
  };

  const isWrongDrop = (rightItem) => {
    if (!showResults) return false;
    return answers[`r-${rightItem.id}`]?.value !== rightItem.correctAnswer;
  };

  const getLeftConnected = (leftId) => !!matches[leftId];
  const getRightConnected = (rightId) => Object.values(matches).includes(rightId);

  const renderBars = (count) => {
    return (
      <span style={styles.barsWrap}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              ...styles.bar,
              background: n <= count ? ACTIVE_COLOR : "#fff",
            }}
          />
        ))}
      </span>
    );
  };

  const renderDropBox = (item) => {
    const boxKey = `r-${item.id}`;
    const value = answers[boxKey]?.value || "";
    const wrong = isWrongDrop(item);

    return (
      <div
        ref={(el) => (dropRefs.current[boxKey] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        onClick={() => handleRemoveAnswer(boxKey)}
        style={{
          ...styles.dropLine,
          background: value ? "transparent" : "transparent",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
        }}
      >
        {value ? <span style={styles.dropText}>{value}</span> : null}
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
          <span className="WB-ex-A">D</span> Connect and write.
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
                        backgroundColor: isUsed ? "rgb(243, 155, 66);" : "rgb(243, 155, 66);",
                        color: isUsed ? "#999" : ANSWER_COLOR,
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

            <div ref={boardRef} style={styles.mainBoard}>
              <svg style={styles.svgLayer}>
                {paths.map((path) => (
                  <path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke={path.isCorrect ? PATH_COLOR : WRONG_COLOR}
                    strokeWidth="2.4"
                    strokeDasharray={path.isCorrect ? "0" : "6 5"}
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              <div style={styles.connectArea}>
                <div style={styles.leftCol}>
                  {LEFT_ITEMS.map((item) => {
                    const connected = getLeftConnected(item.id);
                    const selected = selectedLeft === item.id;
                    const wrong = isWrongMatch(item.id);

                    return (
                      <div key={item.id} style={styles.leftItem}>
                        <div style={styles.leftNumber}>{item.id}</div>

                        <div style={styles.leftCardWrap}>
                          <div
                            onClick={() => handleLeftSelect(item.id)}
                            style={{
                              ...styles.imageBox,
                              border: selected
                                ? `2px solid ${ACTIVE_COLOR}`
                                : connected
                                ? `2px solid #000000`
                                : `2px solid ${BORDER_COLOR}`,
                              boxShadow: wrong
                                ? "0 0 0 2px rgba(239,68,68,0.18) inset"
                                : "none",
                              cursor: showAns ? "default" : "pointer",
                            }}
                          >
                            <img src={item.img} alt={item.label} style={styles.image} />
                          </div>

                          <div style={styles.leftLabelRow}>
                            <div style={styles.leftLabel}>{item.label}</div>

                            <div
                              ref={(el) => (pointRefs.current[`left-${item.id}`] = el)}
                              onClick={() => handleLeftSelect(item.id)}
                              style={{
                                ...styles.dot,
                                background:
                                  selected || connected ? ACTIVE_COLOR : DOT_COLOR,
                                cursor: showAns ? "default" : "pointer",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={styles.rightCol}>
                  {RIGHT_ITEMS.map((item) => {
                    const connected = getRightConnected(item.id);

                    return (
                      <div key={item.id} style={styles.rightItem}>
                        <div
                          ref={(el) => (pointRefs.current[`right-${item.id}`] = el)}
                          onClick={() => handleRightSelect(item.id)}
                          style={{
                            ...styles.dot,
                            background: connected ? ACTIVE_COLOR : DOT_COLOR,
                            cursor:
                              showAns || selectedLeft === null ? "default" : "pointer",
                          }}
                        />

                        <div
                          onClick={() => handleRightSelect(item.id)}
                          style={{
                            ...styles.sentenceBox,
                            cursor:
                              showAns || selectedLeft === null ? "default" : "pointer",
                          }}
                        >
                          <div style={styles.sentenceLineTop}>
                            {renderBars(item.bars)}
                            {item.prefixTop}
                          </div>

                          {renderDropBox(item)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
            top: touchPos.y - 20,
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 9999,
            fontSize: "clamp(11px, 1.2vw, 16px)",
            fontWeight: 600,
            color: ANSWER_COLOR,
            maxWidth: "clamp(120px, 34vw, 220px)",
            textAlign: "center",
          }}
        >
          {touchItem.value}
        </div>
      )}
    </div>
  );
}