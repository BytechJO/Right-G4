import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import imgBoat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 7.svg";
import imgKate from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 8.svg";
import imgHansel from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 9.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a9a9a9";
const ACTIVE_BG = "rgba(243, 155, 66, 0.08)";

const exerciseData = {
  rows: [
    {
      id: 1,
      text: "Kate wants a bike, coat, and cake.",
      image: imgBoat,
      alt: "boat",
    },
    {
      id: 2,
      text: "Hansel likes the cat and ducks.",
      image: imgKate,
      alt: "kate items",
    },
    {
      id: 3,
      text: "There are two flags on the top of the boat.",
      image: imgHansel,
      alt: "hansel ducks",
    },
  ],
  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

export default function WB_Unit3_Page8_QC() {
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
            x1: leftRect.left + leftRect.width / 2 - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left + rightRect.width / 2 - containerRect.left,
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
      if (newMatches[key] === rightId) delete newMatches[key];
    });
    newMatches[selectedLeft] = rightId;
    setMatches(newMatches);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;
    const allConnected = exerciseData.rows.every((item) => matches[item.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    setShowResults(true);
    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) score++;
    });
    const totalQuestions = exerciseData.rows.length;
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
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isRightConnected = (id) => Object.values(matches).includes(id);
  const isSelectedRightMatch = (id) =>
    selectedLeft !== null && matches[selectedLeft] === id;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-board {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-c-grid {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 30px);
        }

        /* ✅ الـ row: نص | نقطة يسار | spacer | نقطة يمين | صورة */
        .wb-c-row {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) 28px clamp(60px, 8vw, 100px) 28px minmax(0, 0.7fr);
          align-items: center;
          min-height: clamp(70px, 9vw, 100px);
        }

        /* col 1: رقم + نص */
        .wb-c-left-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          min-width: 0;
          padding-right: 4px;
        }

        .wb-c-left-num {
          font-size: 22px;
          font-weight: 700;
          color: #111;
          line-height: 1;
          flex-shrink: 0;
        }

        .wb-c-left-text {
          font-size: 22px;
          font-weight: 500;
          color: #111;
          line-height: 1.4;
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 8px 10px;
          transition: 0.2s ease;
          box-sizing: border-box;
          min-width: 0;
          cursor: pointer;
        }

        .wb-c-left-text.active {
          border-color: ${ACTIVE_COLOR};
          background: ${ACTIVE_BG};
        }

        /* col 2 & 4: نقطة */
        .wb-c-dot-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        /* col 3: spacer */
        .wb-c-spacer {
          height: 100%;
        }

        /* col 5: صورة */
        .wb-c-right-cell {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          min-width: 0;
          padding-left: clamp(8px, 1vw, 14px);
          cursor: pointer;
        }

        .wb-c-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
          box-sizing: border-box;
        }

        .wb-c-dot.selected {
          transform: scale(1.12);
          box-shadow: 0 0 0 5px rgba(243, 155, 66, 0.22);
        }

        /* ✅ الصورة: حجم واضح مع min-height */
        .wb-c-right-img {
          display: block;
          width: auto;
          height: clamp(60px, 9vw, 100px);
          max-width: 100%;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        .wb-c-wrong {
          position: absolute;
          top: -7px;
          right: -7px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
          z-index: 3;
        }

        .wb-c-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 820px) {
          .wb-c-row {
            grid-template-columns: minmax(0, 1.3fr) 24px clamp(40px, 6vw, 70px) 24px minmax(0, 0.75fr);
          }
          .wb-c-left-num,
          .wb-c-left-text { font-size: 18px; }
          .wb-c-right-img { height: clamp(50px, 8vw, 80px); }
        }

        @media (max-width: 640px) {
          .wb-c-row {
            grid-template-columns: minmax(0, 1fr) 20px clamp(30px, 5vw, 50px) 20px minmax(0, auto);
          }
          .wb-c-svg-lines { display: none; }
          .wb-c-left-num,
          .wb-c-left-text { font-size: 16px; }
          .wb-c-right-img { height: clamp(44px, 7vw, 65px); }
        }

        @media (max-width: 480px) {
          .wb-c-row {
            grid-template-columns: minmax(0, 1fr) 16px clamp(20px, 4vw, 36px) 16px minmax(80px, auto);
          }
          .wb-c-dot { width: 11px; height: 11px; }
          .wb-c-left-num,
          .wb-c-left-text { font-size: 13px; }
          .wb-c-right-img { height: clamp(36px, 6vw, 52px); }
        }
      `}</style>

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
          <span className="WB-ex-A">C</span>
          Read, look, and match.
        </h1>

        <div ref={containerRef} className="wb-c-board">
          <svg
            className="wb-c-svg-lines"
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
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="wb-c-grid">
            {exerciseData.rows.map((row) => {
              const selected = isLeftSelected(row.id);
              const wrong = isWrongMatch(row.id);
              const selectedMatch = isSelectedRightMatch(row.id);
              const connected = isRightConnected(row.id);

              return (
                <div key={row.id} className="wb-c-row">

                  {/* col 1: رقم + نص */}
                  <div className="wb-c-left-cell">
                    <div className="wb-c-left-num">{row.id}</div>
                    <div
                      className={`wb-c-left-text ${selected ? "active" : ""}`}
                      onClick={() => handleLeftClick(row.id)}
                      style={{ cursor: showAns ? "default" : "pointer" }}
                    >
                      {row.text}
                    </div>
                    {wrong && <div className="wb-c-wrong">✕</div>}
                  </div>

                  {/* col 2: نقطة اليسار */}
                  <div className="wb-c-dot-cell">
                    <div
                      ref={(el) => (elementRefs.current[`left-${row.id}`] = el)}
                      className={`wb-c-dot ${selected ? "selected" : ""}`}
                      onClick={() => handleLeftClick(row.id)}
                      style={{
                        backgroundColor: getDotColor("left", row.id),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    />
                  </div>

                  {/* col 3: spacer */}
                  <div className="wb-c-spacer" />

                  {/* col 4: نقطة اليمين */}
                  <div className="wb-c-dot-cell">
                    <div
                      ref={(el) => (elementRefs.current[`right-${row.id}`] = el)}
                      className={`wb-c-dot ${selectedMatch ? "selected" : ""}`}
                      onClick={() => handleRightClick(row.id)}
                      style={{
                        backgroundColor: getDotColor("right", row.id),
                        cursor: showAns ? "default" : "pointer",
                        boxShadow: connected
                          ? "0 0 0 5px rgba(243, 155, 66, 0.18)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* col 5: الصورة */}
                  <div
                    className="wb-c-right-cell"
                    onClick={() => handleRightClick(row.id)}
                    style={{ cursor: showAns ? "default" : "pointer" }}
                  >
                    <img
                      src={row.image}
                      alt={row.alt}
                      className="wb-c-right-img"
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        <div className="wb-c-buttons">
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