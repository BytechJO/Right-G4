import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/4.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/5.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/6.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/7.svg";

const CHOICES = ["cr", "dr", "tr"];

const SENTENCES = [
  {
    id: 1,
    parts: ["The ", "iver drives a ", "actor."],
    correctBlanks: ["dr", "tr"],
    correctImage: 2,
  },
  {
    id: 2,
    parts: ["He ", "aws a ", "iangle on his paper."],
    correctBlanks: ["dr", "tr"],
    correctImage: 1,
  },
  {
    id: 3,
    parts: ["The ", "ab went shopping for a ", "ain."],
    correctBlanks: ["cr", "tr"],
    correctImage: 3,
  },
  {
    id: 4,
    parts: ["The ", "ee is near the ", "eek."],
    correctBlanks: ["tr", "cr"],
    correctImage: 4,
  },
];

const IMAGES = [
  { id: 1, img: img1, alt: "boy drawing triangle" },
  { id: 2, img: img2, alt: "driver on tractor" },
  { id: 3, img: img3, alt: "crab and train" },
  { id: 4, img: img4, alt: "tree near creek" },
];

const WB_Unit10_Page62_QB = () => {
  const [blankAnswers, setBlankAnswers] = useState({});
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
          const leftEl = elementRefs.current[`left-${leftId}`];
          const rightEl = elementRefs.current[`right-${rightId}`];

          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          return {
            id: `${leftId}-${rightId}`,
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleBlankSelect = (sentenceId, blankIndex, value) => {
    if (showAns) return;

    setBlankAnswers((prev) => ({
      ...prev,
      [sentenceId]: {
        ...prev[sentenceId],
        [blankIndex]: value,
      },
    }));

    setShowResults(false);
  };

  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns) return;
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
    setShowResults(false);
  };

  const areBlanksCorrect = (item) => {
    const current = blankAnswers[item.id] || {};
    return (
      current[0] === item.correctBlanks[0] &&
      current[1] === item.correctBlanks[1]
    );
  };

  const isItemCorrect = (item) => {
    return areBlanksCorrect(item) && matches[item.id] === item.correctImage;
  };

  const isWrongItem = (item) => {
    if (!showResults) return false;
    return !isItemCorrect(item);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allBlanksDone = SENTENCES.every((item) => {
      const current = blankAnswers[item.id] || {};
      return current[0] && current[1];
    });

    const allMatchesDone = SENTENCES.every((item) => matches[item.id]);

    if (!allBlanksDone || !allMatchesDone) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    SENTENCES.forEach((item) => {
      if (isItemCorrect(item)) score++;
    });

    setShowResults(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctBlanks = {};
    const correctMatches = {};

    SENTENCES.forEach((item) => {
      correctBlanks[item.id] = {
        0: item.correctBlanks[0],
        1: item.correctBlanks[1],
      };
      correctMatches[item.id] = item.correctImage;
    });

    setBlankAnswers(correctBlanks);
    setMatches(correctMatches);
    setShowAns(true);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setBlankAnswers({});
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return "#3b82f6";

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    return isConnected ? "#3b82f6" : "#9ca3af";
  };

  const getChoiceStyle = (active) => ({
    minWidth: "42px",
    height: "32px",
    borderRadius: "10px",
    border: active ? "2px solid #ef4444" : "2px solid #d1d5db",
    backgroundColor: active ? "#fef2f2" : "#fff",
    color: active ? "#dc2626" : "#444",
    fontSize: "16px",
    fontWeight: "700",
    cursor: showAns ? "default" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
  });

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Read and write cr, dr, or tr. Match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "70px",
            padding: "10px 20px",
            minHeight: "620px",
          }}
        >
          {/* left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              width: "760px",
            }}
          >
            {SENTENCES.map((item) => {
              const current = blankAnswers[item.id] || {};

              return (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "18px",
                    minHeight: "130px",
                    padding: "8px 10px",
                    borderRadius: "14px",
                    backgroundColor:
                      selectedLeft === item.id ? "rgba(59,130,246,0.06)" : "transparent",
                    border:
                      selectedLeft === item.id
                        ? "2px solid #3b82f6"
                        : "2px solid transparent",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "18px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "#222",
                          minWidth: "18px",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.id}
                      </span>

                      <div
                        style={{
                          fontSize: "22px",
                          color: "#222",
                          lineHeight: "1.8",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{item.parts[0]}</span>

                        <span
                          style={{
                            display: "inline-block",
                            minWidth: "110px",
                            borderBottom: "2px solid #444",
                            textAlign: "center",
                            color: current[0] ? "#dc2626" : "#9ca3af",
                            fontWeight: "700",
                            lineHeight: "1.2",
                          }}
                        >
                          {current[0] || ""}
                        </span>

                        <span>{item.parts[1]}</span>

                        <span
                          style={{
                            display: "inline-block",
                            minWidth: "110px",
                            borderBottom: "2px solid #444",
                            textAlign: "center",
                            color: current[1] ? "#dc2626" : "#9ca3af",
                            fontWeight: "700",
                            lineHeight: "1.2",
                          }}
                        >
                          {current[1] || ""}
                        </span>

                        <span>{item.parts[2]}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        marginLeft: "34px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {[0, 1].map((blankIndex) => (
                        <div
                          key={blankIndex}
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          {CHOICES.map((choice) => (
                            <button
                              key={`${item.id}-${blankIndex}-${choice}`}
                              onClick={() =>
                                handleBlankSelect(item.id, blankIndex, choice)
                              }
                              style={getChoiceStyle(current[blankIndex] === choice)}
                            >
                              {choice}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                      flexShrink: 0,
                      boxShadow:
                        selectedLeft === item.id
                          ? "0 0 0 4px rgba(59,130,246,0.16)"
                          : "none",
                    }}
                  />

                  {isWrongItem(item) && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-34px",
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
              );
            })}
          </div>

          {/* right side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "270px",
            }}
          >
            {IMAGES.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  minHeight: "145px",
                                marginBottom:"20px"

                }}
              >
                <div
                  ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("right", item.id),
                    cursor: showAns ? "default" : "pointer",
                    flexShrink: 0,
                  }}
                />

                <div
                  style={{
                    width: "220px",
                    height: "140px",
                    border: "2px solid #bdbdbd",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
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

          {/* svg lines */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#dc2626"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
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

export default WB_Unit10_Page62_QB;