import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import AudioWithCaption from "../../AudioWithCaption";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd5pg26instruction2-adult-lady_CHBq9E0z.mp3"; // ← غيّر المسار حسب ملف الأوديو

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#ffca94";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
  top: [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
  ],
  bottom: [
    { id: 1, text: "thick" },
    { id: 2, text: "father" },
    { id: 3, text: "this" },
    { id: 4, text: "they" },
    { id: 5, text: "thank" },
    { id: 6, text: "math" },
  ],
  correctMatches: {
    1: 6, // 1 -> math
    2: 1, // 2 -> thick
    3: 3, // 3 -> this
    4: 2, // 4 -> father
    5: 5, // 5 -> thank
    6: 4, // 6 -> they
  },
};

export default function WB_Unit5_Page26_QD() {
  const [selectedTop, setSelectedTop] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});
const captions = [
  { start: 0.30, end: 3.06, text: "Page 26, phonics." },
  { start: 3.06, end: 6.54, text: "Exercise D. Listen and match." },
  { start: 7.56, end: 9.40, text: "1- math." },
  { start: 9.40, end: 12.10, text: "2- thick." },
  { start: 13.40, end: 15.26, text: "3- this." },
  { start: 16.38, end: 18.00, text: "4- father." },
  { start: 19.34, end: 20.80, text: "5- thank." },
  { start: 22.34, end: 23.60, text: "6- they." },
];
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
            y1: topRect.bottom - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top - containerRect.top,
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
    if (showAns) return;
    setSelectedTop(id);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || selectedTop === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedTop] = bottomId;

    setMatches(newMatches);
    setSelectedTop(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allConnected = exerciseData.top.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((topId) => {
      if (matches[topId] === exerciseData.correctMatches[topId]) {
        score++;
      }
    });

    const totalQuestions = exerciseData.top.length;

    if (score === totalQuestions) {
      ValidationAlert.success(`Score: ${score} / ${totalQuestions}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(exerciseData.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setSelectedTop(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "top" && selectedTop === id) return ACTIVE_COLOR;

    const isConnected =
      side === "top" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return INACTIVE_COLOR;

    return ACTIVE_COLOR;
  };

  const isWrongMatch = (topId) => {
    if (!showResults) return false;
    if (!matches[topId]) return false;
    return matches[topId] !== exerciseData.correctMatches[topId];
  };

  const isTopSelected = (id) => selectedTop === id;
  const isTopConnected = (id) => !!matches[id];
  const isBottomConnected = (id) => Object.values(matches).includes(id);
  const isSelectedBottomMatch = (id) =>
    selectedTop !== null && matches[selectedTop] === id;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-d-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
          max-width: 1150px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-d-title {
          margin: 0 !important;
        }

        .wb-d-board {
          position: relative !important;
          width: 100% !important;
          min-height: 340px !important;
          padding: 24px 20px 12px !important;
          box-sizing: border-box !important;
        }

        .wb-d-top-row {
          display: grid !important;
          grid-template-columns: repeat(6, 1fr) !important;
          gap: 12px !important;
          align-items: start !important;
          margin-bottom: 110px !important;
          position: relative !important;
          z-index: 2 !important;
        }

        .wb-d-bottom-row {
          display: grid !important;
          grid-template-columns: repeat(6, 1fr) !important;
          gap: 12px !important;
          align-items: start !important;
          position: relative !important;
          z-index: 2 !important;
        }

        .wb-d-top-item,
        .wb-d-bottom-item {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          position: relative !important;
        }

        .wb-d-number-circle {
          width: 34px !important;
          height: 34px !important;
          border-radius: 50% !important;
          border: 2px solid #9d9d9d !important;
          background: #fff !important;
          color: #333 !important;
          font-size: 24px !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          line-height: 1 !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
          transition: all 0.2s ease !important;
        }

        .wb-d-number-circle.selected {
          border: 3px solid ${ACTIVE_COLOR} !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35) !important;
          background: rgba(243, 155, 66, 0.08) !important;
        }

        .wb-d-number-circle.connected {
          border: 2px solid ${LINE_COLOR} !important;
          background: rgba(255, 202, 148, 0.12) !important;
        }

        .wb-d-dot {
          width: 14px !important;
          height: 14px !important;
          border-radius: 50% !important;
          margin-top: 10px !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
        }

        .wb-d-dot.selected {
          transform: scale(1.12) !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35) !important;
        }

        .wb-d-word {
          font-size: 22px !important;
          line-height: 1.2 !important;
          color: #222 !important;
          padding: 8px 12px !important;
          border-radius: 12px !important;
          border: 2px solid transparent !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          text-align: center !important;
          min-width: 90px !important;
          box-sizing: border-box !important;
        }

        .wb-d-word.selected {
          border: 3px solid ${ACTIVE_COLOR} !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35) !important;
          background: rgba(243, 155, 66, 0.08) !important;
        }

        .wb-d-word.connected {
          border: 2px solid ${LINE_COLOR} !important;
          background: rgba(255, 202, 148, 0.12) !important;
        }

        .wb-d-wrong {
          position: absolute !important;
          top: -8px !important;
          right: -10px !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background-color: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
        }

        .wb-d-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-d-top-row,
          .wb-d-bottom-row {
            grid-template-columns: repeat(3, 1fr) !important;
            row-gap: 24px !important;
          }

          .wb-d-board {
            min-height: 500px !important;
          }
        }

        @media (max-width: 560px) {
          .wb-d-top-row,
          .wb-d-bottom-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

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
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >            <span className="WB-ex-A">D</span>
          Listen and match.
        </h1>
<div style={{ display: "flex", justifyContent: "center" }}>
  <AudioWithCaption src={sound1} captions={captions} />
</div>

        <div ref={containerRef} className="wb-d-board">
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
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
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="wb-d-top-row">
            {exerciseData.top.map((item) => {
              const selected = isTopSelected(item.id);
              const connected = isTopConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div key={item.id} className="wb-d-top-item">
                  <div
                    className={`wb-d-number-circle ${
                      selected ? "selected" : connected ? "connected" : ""
                    }`}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`top-${item.id}`] = el)}
                    className={`wb-d-dot ${selected ? "selected" : ""}`}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      backgroundColor: getDotColor("top", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && <div className="wb-d-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          <div className="wb-d-bottom-row">
            {exerciseData.bottom.map((item) => {
              const selectedMatch = isSelectedBottomMatch(item.id);
              const connected = isBottomConnected(item.id);

              return (
                <div key={item.id} className="wb-d-bottom-item">
                  <div
                    ref={(el) => (elementRefs.current[`bottom-${item.id}`] = el)}
                    className={`wb-d-dot ${selectedMatch ? "selected" : ""}`}
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      backgroundColor: getDotColor("bottom", item.id),
                      marginBottom: "10px",
                      marginTop: "0",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  <div
                    className={`wb-d-word ${
                      selectedMatch ? "selected" : connected ? "connected" : ""
                    }`}
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wb-d-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}