import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import rightImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex A  1.svg";
import rightImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex A  2.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#ffca94";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
  left: [
    {
      id: 1,
      text: "Lolo is thirsty.",
    },
    {
      id: 2,
      text: "He thanks his mother with a flower.",
    },
  ],
  right: [
    {
      id: 1,
      img: rightImg1,
    },
    {
      id: 2,
      img: rightImg2,
    },
  ],
  correctMatches: {
    1: 2,
    2: 1,
  },
};

export default function WB_Unit3_Page26_QA() {
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

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        score++;
      }
    });

    const totalQuestions = exerciseData.left.length;

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
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return ACTIVE_COLOR;

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return INACTIVE_COLOR;

    return ACTIVE_COLOR;
  };

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;
    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isLeftConnected = (id) => !!matches[id];
  const isRightConnected = (id) => Object.values(matches).includes(id);
  const isSelectedRightMatch = (id) =>
    selectedLeft !== null && matches[selectedLeft] === id;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-a26-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
          max-width: 1180px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-a26-title {
          margin: 0 !important;
        }

        .wb-a26-grid {
          position: relative !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: 1fr 230px 320px !important;
          gap: 22px !important;
          align-items: start !important;
        }

        .wb-a26-left-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 56px !important;
          z-index: 2 !important;
        }

        .wb-a26-right-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 46px !important;
          z-index: 2 !important;
          padding-top: 0 !important;
        }

        .wb-a26-left-row {
          display: grid !important;
          grid-template-columns: 28px 1fr 18px !important;
          gap: 14px !important;
          align-items: center !important;
          min-height: 124px !important;
          position: relative !important;
        }

        .wb-a26-right-row {
          display: grid !important;
          grid-template-columns: 18px 1fr !important;
          gap: 16px !important;
          align-items: center !important;
          min-height: 134px !important;
          position: relative !important;
        }

        .wb-a26-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
        }

        .wb-a26-text {
          font-size: 23px !important;
          line-height: 1.35 !important;
          color: #222 !important;
          cursor: pointer !important;
          padding: 10px 12px !important;
          border-radius: 12px !important;
          border: 2px solid transparent !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
        }

        .wb-a26-text.selected {
          border: 2px solid ${ACTIVE_COLOR} !important;
          background-color: rgba(243, 155, 66, 0.08) !important;
        }

        .wb-a26-text.connected {
          border: 2px solid ${LINE_COLOR} !important;
        }

        .wb-a26-dot {
          width: 18px !important;
          height: 18px !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
        }

        .wb-a26-dot.selected {
          transform: scale(1.12) !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35) !important;
        }

        .wb-a26-right-img-wrap {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          min-height: 118px !important;
          cursor: pointer !important;
          padding: 10px !important;
          border-radius: 14px !important;
          border: 2px solid transparent !important;
          background: #fff !important;
          box-sizing: border-box !important;
          transition: all 0.2s ease !important;
        }

        .wb-a26-right-img-wrap.selected {
          border: 3px solid ${ACTIVE_COLOR} !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.45) !important;
          background-color: rgba(243, 155, 66, 0.08) !important;
        }

        .wb-a26-right-img-wrap.connected {
          border: 2px solid ${LINE_COLOR} !important;
        }

        .wb-a26-right-img {
          max-width: 190px !important;
          max-height: 126px !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-a26-wrong {
          position: absolute !important;
          right: -28px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
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

        .wb-a26-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-a26-grid {
            grid-template-columns: 1fr !important;
          }

          .wb-a26-left-col,
          .wb-a26-right-col {
            gap: 20px !important;
          }

          .wb-a26-left-row,
          .wb-a26-right-row {
            min-height: auto !important;
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
        >             <span className="WB-ex-A">A</span>
          Read and match.
        </h1>

        <div ref={containerRef} className="wb-a26-grid">
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

          <div className="wb-a26-left-col">
            {exerciseData.left.map((item) => {
              const selected = isLeftSelected(item.id);
              const connected = isLeftConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div key={item.id} className="wb-a26-left-row">
                  <div className="wb-a26-num">{item.id}</div>

                  <div
                    className={`wb-a26-text ${
                      selected ? "selected" : connected ? "connected" : ""
                    }`}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    className={`wb-a26-dot ${selected ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && <div className="wb-a26-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          <div />

          <div className="wb-a26-right-col">
            {exerciseData.right.map((item) => {
              const selectedMatch = isSelectedRightMatch(item.id);
              const connected = isRightConnected(item.id);

              return (
                <div key={item.id} className="wb-a26-right-row">
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    className={`wb-a26-dot ${selectedMatch ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("right", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  <div
                    className={`wb-a26-right-img-wrap ${
                      selectedMatch ? "selected" : connected ? "connected" : ""
                    }`}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`match-${item.id}`}
                      className="wb-a26-right-img"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wb-a26-buttons">
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