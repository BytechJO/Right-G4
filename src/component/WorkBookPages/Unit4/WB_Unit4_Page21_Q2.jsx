import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import topImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 5.svg";
import topImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 6.svg";
import topImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 7.svg";
import topImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 8.svg";

import bottomImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 1.svg";
import bottomImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 2.svg";
import bottomImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 3.svg";
import bottomImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 4.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a3a3a3";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  top: [
    { id: 1, img: topImg1 }, // flower
    { id: 2, img: topImg2 }, // leaf
    { id: 3, img: topImg3 }, // umbrella
    { id: 4, img: topImg4 }, // snowman
  ],
  middle: [
    { id: 1, text: "summer" },
    { id: 2, text: "winter" },
    { id: 3, text: "spring" },
    { id: 4, text: "autumn" },
  ],
  bottom: [
    { id: 1, img: bottomImg1 }, // spring scene
    { id: 2, img: bottomImg2 }, // summer scene
    { id: 3, img: bottomImg3 }, // winter scene
    { id: 4, img: bottomImg4 }, // autumn scene
  ],

  // top image -> season
  correctTopMatches: {
    1: 3, // flower -> spring
    2: 4, // leaf -> autumn
    3: 1, // umbrella -> summer
    4: 2, // snowman -> winter
  },

  // season -> bottom image
  correctBottomMatches: {
    1: 2, // summer -> summer picture
    2: 3, // winter -> winter picture
    3: 1, // spring -> spring picture
    4: 4, // autumn -> autumn picture
  },
};

const WB_UnitX_Page21_QB = () => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedMiddle, setSelectedMiddle] = useState(null);

  const [topMatches, setTopMatches] = useState({});
  const [bottomMatches, setBottomMatches] = useState({});

  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [topLines, setTopLines] = useState([]);
  const [bottomLines, setBottomLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newTopLines = Object.entries(topMatches)
        .map(([topId, middleId]) => {
          const topEl = elementRefs.current[`top-dot-${topId}`];
          const middleEl = elementRefs.current[`middle-top-dot-${middleId}`];

          if (!topEl || !middleEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const middleRect = middleEl.getBoundingClientRect();

          return {
            id: `top-${topId}-${middleId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.top + topRect.height / 2 - containerRect.top,
            x2: middleRect.left + middleRect.width / 2 - containerRect.left,
            y2: middleRect.top + middleRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      const newBottomLines = Object.entries(bottomMatches)
        .map(([middleId, bottomId]) => {
          const middleEl = elementRefs.current[`middle-bottom-dot-${middleId}`];
          const bottomEl = elementRefs.current[`bottom-dot-${bottomId}`];

          if (!middleEl || !bottomEl) return null;

          const middleRect = middleEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `bottom-${middleId}-${bottomId}`,
            x1: middleRect.left + middleRect.width / 2 - containerRect.left,
            y1: middleRect.top + middleRect.height / 2 - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top + bottomRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setTopLines(newTopLines);
      setBottomLines(newBottomLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [topMatches, bottomMatches]);

  const handleTopClick = (id) => {
    if (showAns) return;
    setSelectedTop(id);
    setSelectedMiddle(null);
    setShowResults(false);
  };

  const handleMiddleTopClick = (middleId) => {
    if (showAns || selectedTop === null) return;

    const newMatches = { ...topMatches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === middleId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedTop] = middleId;

    setTopMatches(newMatches);
    setSelectedTop(null);
    setShowResults(false);
  };

  const handleMiddleBottomClick = (middleId) => {
    if (showAns) return;
    setSelectedMiddle(middleId);
    setSelectedTop(null);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || selectedMiddle === null) return;

    const newMatches = { ...bottomMatches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedMiddle] = bottomId;

    setBottomMatches(newMatches);
    setSelectedMiddle(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allTopConnected = EXERCISE_DATA.top.every((item) => topMatches[item.id]);
    const allBottomConnected = EXERCISE_DATA.middle.every(
      (item) => bottomMatches[item.id]
    );

    if (!allTopConnected || !allBottomConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    const total =
      EXERCISE_DATA.top.length + EXERCISE_DATA.middle.length;

    Object.keys(EXERCISE_DATA.correctTopMatches).forEach((topId) => {
      if (topMatches[topId] === EXERCISE_DATA.correctTopMatches[topId]) {
        score++;
      }
    });

    Object.keys(EXERCISE_DATA.correctBottomMatches).forEach((middleId) => {
      if (bottomMatches[middleId] === EXERCISE_DATA.correctBottomMatches[middleId]) {
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
    setTopMatches(EXERCISE_DATA.correctTopMatches);
    setBottomMatches(EXERCISE_DATA.correctBottomMatches);
    setShowResults(true);
    setShowAns(true);
    setSelectedTop(null);
    setSelectedMiddle(null);
  };

  const handleStartAgain = () => {
    setTopMatches({});
    setBottomMatches({});
    setSelectedTop(null);
    setSelectedMiddle(null);
    setShowResults(false);
    setShowAns(false);
    setTopLines([]);
    setBottomLines([]);
  };

  const getTopDotColor = (topId) => {
    if (selectedTop === topId) return ACTIVE_COLOR;
    if (topMatches[topId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getMiddleTopDotColor = (middleId) => {
    const isConnected = Object.values(topMatches).includes(middleId);
    const isSelected = selectedTop !== null && topMatches[selectedTop] === middleId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getMiddleBottomDotColor = (middleId) => {
    const isConnected = !!bottomMatches[middleId];
    if (selectedMiddle === middleId) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getBottomDotColor = (bottomId) => {
    const isConnected = Object.values(bottomMatches).includes(bottomId);
    const isSelected =
      selectedMiddle !== null && bottomMatches[selectedMiddle] === bottomId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongTopMatch = (topId) => {
    if (!showResults || !topMatches[topId]) return false;
    return topMatches[topId] !== EXERCISE_DATA.correctTopMatches[topId];
  };

  const isWrongBottomMatch = (middleId) => {
    if (!showResults || !bottomMatches[middleId]) return false;
    return bottomMatches[middleId] !== EXERCISE_DATA.correctBottomMatches[middleId];
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
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">B</span> Look, read, and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "560px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
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
            {topLines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

            {bottomLines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "start",
              zIndex: 2,
            }}
          >
            {EXERCISE_DATA.top.map((item) => {
              const wrong = isWrongTopMatch(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-start",
                      paddingLeft: "6px",
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#111",
                    }}
                  >
                    {item.id}
                  </div>

                  <div
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      width: "110px",
                      height: "110px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: showAns ? "default" : "pointer",
                      border:
                        selectedTop === item.id
                          ? `3px solid ${ACTIVE_COLOR}`
                          : topMatches[item.id]
                          ? `2px solid #f5d0a8`
                          : "2px solid transparent",
                      borderRadius: "14px",
                      background:
                        selectedTop === item.id
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",
                      transition: "0.2s ease",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`top-${item.id}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`top-dot-${item.id}`] = el)}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getTopDotColor(item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "14px",
                        top: "36px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: WRONG_COLOR,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        border: "2px solid #fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Middle row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "center",
              zIndex: 2,
              marginTop: "8px",
            }}
          >
            {EXERCISE_DATA.middle.map((item) => {
              const wrong = isWrongBottomMatch(item.id);
              const topSelectedMatch =
                selectedTop !== null && topMatches[selectedTop] === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    ref={(el) =>
                      (elementRefs.current[`middle-top-dot-${item.id}`] = el)
                    }
                    onClick={() => handleMiddleTopClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getMiddleTopDotColor(item.id),
                      cursor:
                        showAns || selectedTop === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => {
                      if (selectedTop !== null) {
                        handleMiddleTopClick(item.id);
                      } else {
                        handleMiddleBottomClick(item.id);
                      }
                    }}
                    style={{
                      minWidth: "130px",
                      minHeight: "56px",
                      padding: "0 18px",
                      borderRadius: "16px",
                      border:
                        selectedMiddle === item.id || topSelectedMatch
                          ? `3px solid ${ACTIVE_COLOR}`
                          : bottomMatches[item.id] || Object.values(topMatches).includes(item.id)
                          ? "2px solid #f39b42"
                          : "2px solid #f39b42",
                      background:
                        selectedMiddle === item.id || topSelectedMatch
                          ? "rgba(243,155,66,0.08)"
                          : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      color: "#222",
                      lineHeight: "1",
                      cursor: showAns ? "default" : "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) =>
                      (elementRefs.current[`middle-bottom-dot-${item.id}`] = el)
                    }
                    onClick={() => handleMiddleBottomClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getMiddleBottomDotColor(item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "6px",
                        bottom: "26px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: WRONG_COLOR,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        border: "2px solid #fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "start",
              zIndex: 2,
              marginTop: "4px",
            }}
          >
            {EXERCISE_DATA.bottom.map((item) => {
              const isSelected =
                selectedMiddle !== null && bottomMatches[selectedMiddle] === item.id;
              const isConnected = Object.values(bottomMatches).includes(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`bottom-dot-${item.id}`] = el)}
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getBottomDotColor(item.id),
                      cursor:
                        showAns || selectedMiddle === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      width: "180px",
                      height: "130px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #f39b42"
                        : "2px solid #f39b42",
                      background:
                        isSelected ? "rgba(243,155,66,0.08)" : "#fff",
                      cursor:
                        showAns || selectedMiddle === null ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`bottom-${item.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
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

export default WB_UnitX_Page21_QB;