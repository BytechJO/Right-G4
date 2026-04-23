import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 9.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 10.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 11.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 12.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 13.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 14.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 15.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 16.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a9a9a9";

const exerciseData = {
  left: [
    { id: 1, text: "The eagle flies higher than the dove." },
    { id: 2, text: "The scooter is slower than the train." },
    { id: 3, text: "The tortoise is smarter than the hare." },
    { id: 4, text: "The pencil is lighter than the pencil case." },
  ],
  right: [
    {
      id: 1,
      images: [
        { src: img1, alt: "scooter" },
        { src: img2, alt: "train" },
      ],
    },
    {
      id: 2,
      images: [
        { src: img3, alt: "tortoise" },
        { src: img4, alt: "hare" },
      ],
    },
    {
      id: 3,
      images: [
        { src: img5, alt: "pencil" },
        { src: img6, alt: "pencil case" },
      ],
    },
    {
      id: 4,
      images: [
        { src: img7, alt: "eagle" },
        { src: img8, alt: "dove" },
      ],
    },
  ],
  correctMatches: {
    1: 4,
    2: 1,
    3: 2,
    4: 3,
  },
};

export default function WB_Unit3_Page5_QF() {
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
    setSelectedLeft((prev) => (prev === id ? null : id));
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
    const allConnected = exerciseData.left.every((item) => matches[item.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    setShowResults(true);
    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) score++;
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
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isRightConnected = (id) => Object.values(matches).includes(id);
  const isSelectedRightMatch = (id) =>
    selectedLeft !== null && matches[selectedLeft] === id;

  const count = exerciseData.left.length;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-f-board {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-f-master-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) clamp(18px, 2vw, 28px) clamp(60px, 8vw, 100px) clamp(18px, 2vw, 28px) minmax(200px, 0.95fr);
          width: 100%;
        }

        .wb-f-cell {
          display: flex;
          align-items: center;
          min-height: clamp(80px, 10vw, 110px);
          box-sizing: border-box;
        }

        .wb-f-cell-text {
          padding: clamp(6px, 1vw, 10px) clamp(8px, 1.2vw, 14px);
          border-radius: 12px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.4vw, 14px);
          transition: border 0.2s ease, background 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .wb-f-cell-text.is-selected {
          border: 2.5px solid ${ACTIVE_COLOR};
          background: rgba(243, 155, 66, 0.06);
        }

        .wb-f-cell-text.not-selected {
          border: 2.5px solid transparent;
          background: transparent;
        }

        .wb-f-left-num {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          line-height: 1;
          flex-shrink: 0;
          min-width: clamp(18px, 2.5vw, 28px);
        }

        .wb-f-left-text {
          font-size: 22px;
          font-weight: 500;
          color: #111;
          line-height: 1.35;
        }

        .wb-f-cell-dot {
          justify-content: center;
        }

        .wb-f-cell-right {
          justify-content: flex-start;
          padding-left: clamp(8px, 1vw, 14px);
          cursor: pointer;
        }

        .wb-f-dot {
          width: clamp(14px, 1.8vw, 18px);
          height: clamp(14px, 1.8vw, 18px);
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
          box-sizing: border-box;
        }

        .wb-f-dot.selected {
          transform: scale(1.1);
          box-shadow: 0 0 0 5px rgba(243, 155, 66, 0.22);
        }

        .wb-f-right-pair {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 22px);
          flex-wrap: nowrap;
          width: 100%;
        }

        .wb-f-right-img {
          display: block;
          width: auto;
          height: auto;
          max-width: clamp(60px, 12vw, 130px);
          max-height: clamp(55px, 10vw, 100px);
          object-fit: contain;
          user-select: none;
          pointer-events: none;
          flex: 1 1 0;
          min-width: 0;
        }

        .wb-f-wrong {
          position: absolute;
          top: -8px;
          right: -8px;
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

        .wb-f-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 760px) {
          .wb-f-master-grid {
            grid-template-columns: minmax(0, 1fr) clamp(14px, 2vw, 20px) clamp(40px, 6vw, 70px) clamp(14px, 2vw, 20px) minmax(140px, 0.7fr);
          }

          .wb-f-svg-lines {
            display: none;
          }

          .wb-f-right-img {
            max-width: clamp(44px, 10vw, 80px);
            max-height: clamp(40px, 9vw, 70px);
          }

          .wb-f-left-num,
          .wb-f-left-text {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .wb-f-master-grid {
            grid-template-columns: 1fr auto clamp(30px, 5vw, 50px) auto minmax(100px, auto);
          }

          .wb-f-right-img {
            max-width: clamp(32px, 9vw, 55px);
            max-height: clamp(28px, 8vw, 48px);
          }

          .wb-f-left-num,
          .wb-f-left-text {
            font-size: 13px;
          }
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
          <span className="WB-ex-A">F</span>
          Read and match.
        </h1>

        <div ref={containerRef} className="wb-f-board">
          <svg
            className="wb-f-svg-lines"
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
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="wb-f-master-grid">
            {Array.from({ length: count }, (_, i) => {
              const leftItem = exerciseData.left[i];
              const rightItem = exerciseData.right[i];
              const selected = isLeftSelected(leftItem.id);
              const wrong = isWrongMatch(leftItem.id);
              const selectedMatch = isSelectedRightMatch(rightItem.id);
              const connected = isRightConnected(rightItem.id);

              return (
                <>
                  {/* col 1: النص */}
                  <div className="wb-f-cell" key={`text-${leftItem.id}`}>
                    <div
                      className={`wb-f-cell-text ${selected ? "is-selected" : "not-selected"}`}
                      onClick={() => handleLeftClick(leftItem.id)}
                      style={{ cursor: showAns ? "default" : "pointer" }}
                    >
                      <div className="wb-f-left-num">{leftItem.id}</div>
                      <div className="wb-f-left-text">{leftItem.text}</div>
                      {wrong && <div className="wb-f-wrong">✕</div>}
                    </div>
                  </div>

                  {/* col 2: نقطة اليسار */}
                  <div className="wb-f-cell wb-f-cell-dot" key={`ldot-${leftItem.id}`}>
                    <div
                      ref={(el) => (elementRefs.current[`left-${leftItem.id}`] = el)}
                      className={`wb-f-dot ${selected ? "selected" : ""}`}
                      onClick={() => handleLeftClick(leftItem.id)}
                      style={{
                        backgroundColor: getDotColor("left", leftItem.id),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    />
                  </div>

                  {/* col 3: spacer */}
                  <div className="wb-f-cell" key={`spacer-${leftItem.id}`} />

                  {/* col 4: نقطة اليمين */}
                  <div className="wb-f-cell wb-f-cell-dot" key={`rdot-${rightItem.id}`}>
                    <div
                      ref={(el) => (elementRefs.current[`right-${rightItem.id}`] = el)}
                      className={`wb-f-dot ${selectedMatch ? "selected" : ""}`}
                      onClick={() => handleRightClick(rightItem.id)}
                      style={{
                        backgroundColor: getDotColor("right", rightItem.id),
                        cursor: showAns ? "default" : "pointer",
                        boxShadow: connected
                          ? "0 0 0 5px rgba(243, 155, 66, 0.18)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* col 5: الصور */}
                  <div
                    className="wb-f-cell wb-f-cell-right"
                    key={`imgs-${rightItem.id}`}
                    onClick={() => handleRightClick(rightItem.id)}
                    style={{ cursor: showAns ? "default" : "pointer" }}
                  >
                    <div className="wb-f-right-pair">
                      {rightItem.images.map((img, index) => (
                        <img
                          key={`${rightItem.id}-${index}`}
                          src={img.src}
                          alt={img.alt}
                          className="wb-f-right-img"
                        />
                      ))}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="wb-f-buttons">
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