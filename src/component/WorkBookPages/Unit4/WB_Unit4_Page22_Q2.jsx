import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

// غيّري مسارات الصور حسب مكان ملفاتك
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 4.svg";
import rightImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 5.svg";
import rightImg2 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 6.svg";
import rightImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 7.svg";
import rightImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 8.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#9ca3af";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  left: [
    { id: 1, img: img1, text: "It’s cold." },
    { id: 2, img: img2, text: "It’s sunny." },
    { id: 3, img: img3, text: "It’s rainy." },
    { id: 4, img: img4, text: "It’s hot." },
  ],

  right: [
    { id: 1, img: rightImg1, before: "Wear your", after: "T-shirt." },
    { id: 2, img: rightImg2, before: "Wear your", after: "coat." },
    { id: 3, img: rightImg3, before: "Wear your", after: "sunglasses." },
    { id: 4, img: rightImg4, before: "Get your", after: "umbrella." },
  ],

  correctMatches: {
    1: 2, // cold -> coat
    2: 3, // sunny -> sunglasses
    3: 4, // rainy -> umbrella
    4: 1, // hot -> T-shirt
  },
};

const styles = {
  matchArea: {
    position: "relative",
    width: "100%",
    minHeight: "clamp(420px, 70vw, 760px)",
  },

  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 3vw, 34px)",
    position: "relative",
    zIndex: 2,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) clamp(40px, 8vw, 80px) minmax(0, 1fr)",
    alignItems: "center",
    gap: "clamp(8px, 2vw, 18px)",
    width: "100%",
  },

  leftSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "clamp(8px, 1.5vw, 16px)",
    minWidth: 0,
  },

  leftNumber: {
    fontSize: "clamp(18px, 2vw, 28px)",
    fontWeight: "700",
    color: "#111",
    width: "clamp(18px, 2vw, 28px)",
    textAlign: "center",
    flexShrink: 0,
  },

  leftImage: {
    width: "clamp(44px, 8vw, 90px)",
    height: "clamp(44px, 8vw, 90px)",
    objectFit: "contain",
    flexShrink: 0,
  },

  bubbleLeftWrap: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    flex: 1,
  },

  bubbleRightWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 0,
  },

  bubble: {
    position: "relative",
    minHeight: "clamp(46px, 6vw, 72px)",
    border: "2px solid #222",
    borderRadius: "14px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "clamp(8px, 1.2vw, 14px) clamp(12px, 1.8vw, 20px)",
    boxSizing: "border-box",
    fontSize: "clamp(14px, 2vw, 24px)",
    color: "#222",
    lineHeight: 1.15,
    gap: "clamp(8px, 1vw, 12px)",
    maxWidth: "100%",
  },

  leftBubble: {
    width: "clamp(150px, 24vw, 280px)",
    justifyContent: "flex-start",
  },

  rightBubble: {
    width: "clamp(200px, 34vw, 420px)",
    justifyContent: "flex-start",
  },

  leftTail: {
    position: "absolute",
    left: "-36px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "18px",
  },

  rightTail: {
    position: "absolute",
    right: "-36px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "18px",
  },

  centerDotWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: "clamp(12px, 1.5vw, 18px)",
    height: "clamp(12px, 1.5vw, 18px)",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
  },

  rightItemWrap: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  rightImage: {
    width: "clamp(26px, 4vw, 46px)",
    height: "clamp(26px, 4vw, 46px)",
    objectFit: "contain",
    flexShrink: 0,
  },

  text: {
    whiteSpace: "nowrap",
  },

  wrongBadge: {
    position: "absolute",
    width: "clamp(16px, 2vw, 22px)",
    height: "clamp(16px, 2vw, 22px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(9px, 1vw, 12px)",
    fontWeight: "700",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    width: "100%",
  },
};

const TailLeft = () => (
  <svg viewBox="0 0 36 18" style={styles.leftTail}>
    <path
      d="M36 2 L0 9 L36 16"
      fill="#fff"
      stroke="#222"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const TailRight = () => (
  <svg viewBox="0 0 36 18" style={styles.rightTail}>
    <path
      d="M0 2 L36 9 L0 16"
      fill="#fff"
      stroke="#222"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const WB_ReadAndMatch_Page22 = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-dot-${leftId}`];
          const rightEl = elementRefs.current[`right-dot-${rightId}`];

          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          return {
            id: `line-${leftId}-${rightId}`,
            x1: leftRect.left + leftRect.width / 2 - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left + rightRect.width / 2 - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const rafUpdate = () => requestAnimationFrame(updateLines);

    rafUpdate();
    window.addEventListener("resize", rafUpdate);

    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        rafUpdate();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafUpdate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [matches, showAns, showResults]);

  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns || selectedLeft === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedLeft] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allConnected = EXERCISE_DATA.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    const total = EXERCISE_DATA.left.length;

    Object.keys(EXERCISE_DATA.correctMatches).forEach((leftId) => {
      if (matches[leftId] === EXERCISE_DATA.correctMatches[leftId]) {
        score++;
      }
    });

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(EXERCISE_DATA.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getLeftDotColor = (leftId) => {
    if (selectedLeft === leftId) return ACTIVE_COLOR;
    if (matches[leftId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getRightDotColor = (rightId) => {
    const isConnected = Object.values(matches).includes(rightId);
    const isSelected =
      selectedLeft !== null && matches[selectedLeft] === rightId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongMatch = (leftId) => {
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== EXERCISE_DATA.correctMatches[leftId];
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
          <span className="WB-ex-A">D</span> Read and match.
        </h1>

        <div ref={containerRef} style={styles.matchArea}>
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div style={styles.rowsWrap}>
            {EXERCISE_DATA.left.map((leftItem, index) => {
              const rightItem = EXERCISE_DATA.right[index];
              const wrong = isWrongMatch(leftItem.id);
              const isSelected = selectedLeft === leftItem.id;
              const isConnected = !!matches[leftItem.id];

              return (
                <div key={leftItem.id} style={styles.row}>
                  <div style={styles.leftSide}>
                    <div style={styles.leftNumber}>{leftItem.id}</div>

                    <img
                      src={leftItem.img}
                      alt={`left-${leftItem.id}`}
                      style={styles.leftImage}
                    />

                    <div style={styles.bubbleLeftWrap}>
                      <div
                        onClick={() => handleLeftClick(leftItem.id)}
                        style={{
                          ...styles.bubble,
                          ...styles.leftBubble,
                          border: isSelected
                            ? `3px solid ${ACTIVE_COLOR}`
                            : isConnected
                            ? "2px solid #f5d0a8"
                            : "2px solid #222",
                          background: isSelected
                            ? "rgba(243,155,66,0.08)"
                            : "#fff",
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        <TailLeft />
                        <span style={styles.text}>{leftItem.text}</span>

                        {wrong && (
                          <div
                            style={{
                              ...styles.wrongBadge,
                              right: "-8px",
                              top: "-8px",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={styles.centerDotWrap}>
                    <div
                      ref={(el) =>
                        (elementRefs.current[`left-dot-${leftItem.id}`] = el)
                      }
                      onClick={() => handleLeftClick(leftItem.id)}
                      style={{
                        ...styles.dot,
                        backgroundColor: getLeftDotColor(leftItem.id),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    />
                  </div>

                  <div style={styles.bubbleRightWrap}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(8px, 2vw, 18px)",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        ref={(el) =>
                          (elementRefs.current[`right-dot-${rightItem.id}`] = el)
                        }
                        onClick={() => handleRightClick(rightItem.id)}
                        style={{
                          ...styles.dot,
                          backgroundColor: getRightDotColor(rightItem.id),
                          cursor:
                            showAns || selectedLeft === null
                              ? "default"
                              : "pointer",
                        }}
                      />

                      <div
                        onClick={() => handleRightClick(rightItem.id)}
                        style={{
                          ...styles.bubble,
                          ...styles.rightBubble,
                          border:
                            selectedLeft !== null &&
                            matches[selectedLeft] === rightItem.id
                              ? `3px solid ${ACTIVE_COLOR}`
                              : Object.values(matches).includes(rightItem.id)
                              ? "2px solid #d1d5db"
                              : "2px solid #222",
                          background:
                            selectedLeft !== null &&
                            matches[selectedLeft] === rightItem.id
                              ? "rgba(243,155,66,0.08)"
                              : "#fff",
                          cursor:
                            showAns || selectedLeft === null
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <div style={styles.rightItemWrap}>
                          <span style={styles.text}>{rightItem.before}</span>
                          <img
                            src={rightItem.img}
                            alt={`right-${rightItem.id}`}
                            style={styles.rightImage}
                          />
                          <span style={styles.text}>{rightItem.after}</span>
                        </div>
                        <TailRight />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

export default WB_ReadAndMatch_Page22;