import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/4.svg";

const exerciseData = {
  left: [
    {
      id: 1,
      img: img1,
      text: "Where were they this morning?",
    },
    {
      id: 2,
      img: img2,
      text: "Where is she now?",
    },
    {
      id: 3,
      img: img3,
      text: "Where was she this morning?",
    },
    {
      id: 4,
      img: img4,
      text: "Where is he now?",
    },
  ],
  right: [
    {
      id: 1,
      text: "She was in the computer lab.",
    },
    {
      id: 2,
      text: "She is on the playground.",
    },
    {
      id: 3,
      text: "He is at the swimming pool.",
    },
    {
      id: 4,
      text: "They were at the circus.",
    },
  ],
  correctMatches: {
    1: 4,
    2: 2,
    3: 1,
    4: 3,
  },
};

const WB_Unit8_Page53_QF = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-${leftId}`];
          const rightEl = elementRefs.current[`right-${rightId}`];

          if (leftEl && rightEl) {
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();

            return {
              id: `${leftId}-${rightId}`,
              x1: leftRect.right - containerRect.left,
              y1: leftRect.top + leftRect.height / 2 - containerRect.top,
              x2: rightRect.left - containerRect.left,
              y2: rightRect.top + rightRect.height / 2 - containerRect.top,
            };
          }

          return null;
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleLeftClick = (id) => {
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (selectedLeft === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedLeft] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;

    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const checkAnswers = () => {
    const totalQuestions = exerciseData.left.length;

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let currentScore = 0;

    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        currentScore++;
      }
    });

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Score: ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 0) {
      ValidationAlert.warning(`Score: ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(exerciseData.correctMatches);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setLines([]);
  };

  const getLineColor = () => {
    return "#f39b42";
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) {
      return "#f39b42";
    }

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return "#9ca3af";

    return "#f39b42";
  };

  const isLeftSelected = (id) => selectedLeft === id;

  return (
<div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(18px,2.5vw,28px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span>
          Look, read, and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "230px 280px 260px",
            gap: "26px",
            alignItems: "start",
          }}
        >
          {/* الصور */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {exerciseData.left.map((item) => (
              <div
                key={`img-${item.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#111",
                    minWidth: "16px",
                  }}
                >
                  {item.id}
                </div>

                <div
                  style={{
                    width: "170px",
                    height: "130px",
                    border: isLeftSelected(item.id)
                      ? "4px solid #f39b42"
                      : "2px solid #f39b42",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    boxShadow: isLeftSelected(item.id)
                      ? "0 0 0 4px rgba(59,130,246,0.12)"
                      : "none",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* الأسئلة */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {exerciseData.left.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  minHeight: "130px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                   
                    gap: "14px",
                    width: "100%",
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("left", item.id),
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      transform: selectedLeft === item.id ? "scale(1.2)" : "scale(1)",
                    }}
                  />

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      fontSize: "22px",
                      color: "#222",
                      lineHeight: "1.3",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {item.text}
                  </div>
                </div>

                {isWrongMatch(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* الإجابات */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {exerciseData.right.map((item) => (
              <div
                key={item.id}
                style={{
                  minHeight: "130px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    width: "100%",
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("right", item.id),
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  />

                  <div
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      fontSize: "22px",
                      color: "#222",
                      lineHeight: "1.3",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SVG Lines */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={getLineColor(line.id)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
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

export default WB_Unit8_Page53_QF;