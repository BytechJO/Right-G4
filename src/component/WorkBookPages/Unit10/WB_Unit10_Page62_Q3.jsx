import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import AudioWithCaption from "../../AudioWithCaption";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd13pg62instruction1-adult-lady_lYm3lMP5.mp3"; 

const TOP_ITEMS = [
  { id: 1, text: "1" },
  { id: 2, text: "2" },
  { id: 3, text: "3" },
  { id: 4, text: "4" },
  { id: 5, text: "5" },
  { id: 6, text: "6" },
];

const BOTTOM_ITEMS = [
  { id: 1, text: "tr" },
  { id: 2, text: "dr" },
  { id: 3, text: "cr" },
  { id: 4, text: "dr" },
  { id: 5, text: "tr" },
  { id: 6, text: "cr" },
];

const correctMatches = {
  1: 2,
  2: 3,
  3: 5,
  4: 1,
  5: 4,
  6: 6,
};

export default function WB_Unit8_Page62_QC() {
  const [selectedTop, setSelectedTop] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lines, setLines] = useState([]);
const captions = [
  { start: 0.40, end: 3.08, text: "Page 62, phonics exercise C." },
  { start: 3.08, end: 4.82, text: "Listen and match." },
  { start: 5.86, end: 7.32, text: "1- dragon." },
  { start: 7.32, end: 10.12, text: "2- cranberry." },
  { start: 11.14, end: 12.78, text: "3- trust." },
  { start: 12.78, end: 15.38, text: "4- trace." },
  { start: 15.38, end: 18.22, text: "5- drive." },
];
  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([topId, bottomId]) => {
          const topEl = elementRefs.current[`top-${topId}`];
          const bottomEl = elementRefs.current[`bottom-${bottomId}`];

          if (!topEl || !bottomEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `${topId}-${bottomId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.top + topRect.height / 2 - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top + bottomRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleTopClick = (id) => {
    setSelectedTop(id);
    setShowResults(false);
  };

  const handleBottomClick = (id) => {
    if (selectedTop === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === id) {
        delete newMatches[key];
      }
    });

    newMatches[selectedTop] = id;
    setMatches(newMatches);
    setSelectedTop(null);
  };

  const isWrong = (topId) => {
    if (!showResults) return false;
    if (!matches[topId]) return false;

    return matches[topId] !== correctMatches[topId];
  };

  const checkAnswers = () => {
    const allAnswered = TOP_ITEMS.every((item) => matches[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    TOP_ITEMS.forEach((item) => {
      if (matches[item.id] === correctMatches[item.id]) {
        score++;
      }
    });

    setShowResults(true);

    if (score === TOP_ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${TOP_ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${TOP_ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${TOP_ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(correctMatches);
    setSelectedTop(null);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setShowResults(false);
    setLines([]);
  };

  const getTopCircleStyle = (id) => {
    const isActive = selectedTop === id;

    return {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "2px solid #a3a3a3",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      color: "#222",
      cursor: "pointer",
      boxShadow: isActive ? "0 0 0 4px rgba(59,130,246,0.15)" : "none",
      transform: isActive ? "scale(1.05)" : "scale(1)",
      transition: "all 0.2s ease",
    };
  };

  const getDotStyle = (type, id) => {
    const isConnected =
      type === "top"
        ? !!matches[id]
        : Object.values(matches).includes(id);

    const isActiveTop = type === "top" && selectedTop === id;

    return {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      backgroundColor: isActiveTop || isConnected ? "#3b82f6" : "#9ca3af",
      cursor: "pointer",
      transition: "all 0.2s ease",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>
          Listen and match.
        </h1>
<div style={{ display: "flex", justifyContent: "center" }}>
  <AudioWithCaption src={sound1} captions={captions} />
</div>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            minHeight: "260px",
            padding: "20px 20px 10px 20px",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              alignItems: "start",
              justifyItems: "center",
              marginBottom: "70px",
            }}
          >
            {TOP_ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div style={getTopCircleStyle(item.id)}>
                  {item.text}
                </div>

                <div
                  ref={(el) => (elementRefs.current[`top-${item.id}`] = el)}
                  onClick={() => handleTopClick(item.id)}
                  style={getDotStyle("top", item.id)}
                />

                {isWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
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
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              alignItems: "start",
              justifyItems: "center",
            }}
          >
            {BOTTOM_ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  ref={(el) => (elementRefs.current[`bottom-${item.id}`] = el)}
                  onClick={() => handleBottomClick(item.id)}
                  style={getDotStyle("bottom", item.id)}
                />

                <div
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1",
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
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
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}