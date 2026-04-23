import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import char1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/5.svg";
import char2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/6.svg";
import char3 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/7.svg";
import char4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/8.svg";

import place1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/9.svg";
import place2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/10.svg";
import place3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/11.svg";
import place4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/12.svg";

const exerciseData = {
  left: [
    {
      id: 1,
      text: "Stella is at the store.",
      img: char1,
    },
    {
      id: 2,
      text: "Sarah and John are at the playground.",
      img: char2,
    },
    {
      id: 3,
      text: "Mom is in the kitchen.",
      img: char3,
    },
    {
      id: 4,
      text: "Dad is at the office.",
      img: char4,
    },
  ],
  right: [
    {
      id: 1,
      img: place1, // office
    },
    {
      id: 2,
      img: place2, // kitchen
    },
    {
      id: 3,
      img: place3, // store
    },
    {
      id: 4,
      img: place4, // playground
    },
  ],
  correctMatches: {
    1: 3,
    2: 4,
    3: 2,
    4: 1,
  },
};

const WB_Unit8_Page54_QH = () => {
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

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return "#f39b42";

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return "#f39b42";

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
          <span className="WB-ex-A">H</span>
          Read, look, and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "380px 80px 220px",
            gap: "26px",
            alignItems: "start",
          }}
        >
          {/* Left side: sentence + character */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {exerciseData.left.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  minHeight: "112px",
                  display: "grid",
                  gridTemplateColumns: "1fr 70px 18px",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => handleLeftClick(item.id)}
                  style={{
                    border: isLeftSelected(item.id)
                      ? "3px solid #f39b42"
                      : "2px solid transparent",
                    borderRadius: "14px",
                    padding: "10px 12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: isLeftSelected(item.id)
                      ? "rgba(59,130,246,0.06)"
                      : "transparent",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#111",
                        minWidth: "16px",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.id}
                    </span>

                    <span
                      style={{
                        fontSize: "22px",
                        lineHeight: "1.3",
                        color: "#222",
                        userSelect: "none",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    border: isLeftSelected(item.id)
                      ? "3px solid #f39b42"
                      : "2px solid transparent",
                    borderRadius: "14px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxSizing: "border-box",
                    boxShadow: isLeftSelected(item.id)
                      ? "0 0 0 4px rgba(59,130,246,0.12)"
                      : "none",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => handleLeftClick(item.id)}
                >
                  <img
                    src={item.img}
                    alt={`left-${item.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  onClick={() => handleLeftClick(item.id)}
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("left", item.id),
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    transform: selectedLeft === item.id ? "scale(1.18)" : "scale(1)",
                  }}
                />

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

          {/* Middle spacer for lines feel */}
          <div />

          {/* Right side: places */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {exerciseData.right.map((item) => (
              <div
                key={item.id}
                style={{
                  minHeight: "112px",
                  display: "grid",
                  gridTemplateColumns: "18px 1fr",
                  gap: "12px",
                  alignItems: "center",
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
                    transition: "all 0.2s ease",
                  }}
                />

                <div
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    width: "160px",
                    height: "100px",
                    border: "2px solid #f39b42",
                    borderRadius: "14px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`right-${item.id}`}
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
                stroke="#f39b42"
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

export default WB_Unit8_Page54_QH;