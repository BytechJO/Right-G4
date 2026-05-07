import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  CHART IMAGE — صورة واحدة كاملة للجدول
// ─────────────────────────────────────────────
import imgChartTable from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 23.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHART_BORDER     = "#d1d5db";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const NAME_COLOR       = "#2b2b2b";
const DOT_DEFAULT      = "#9ca3af";
const DOT_SELECTED     = "#3b82f6";
const LINE_DEFAULT     = "#9ca3af";
const LINE_CORRECT     = "#16a34a";
const LINE_WRONG       = "#ef4444";
const LINE_SHOW_ANS    = "#c81e1e";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// الجدول صورة واحدة كاملة — لا حاجة لـ CHART_ROWS

// LEFT items: id + sentence label
const LEFT_ITEMS = [
  { id: 1, sentence: "Naomi is shorter than" },
  { id: 2, sentence: "Ned is stronger than"  },
  { id: 3, sentence: "Alex is taller than"   },
  { id: 4, sentence: "Susan is slower than"  },
];

// RIGHT items: name + correct left-id that maps to it
const RIGHT_ITEMS = [
  { name: "Tanya",  correctLeftId: 4 },
  { name: "Rachel", correctLeftId: 1 },
  { name: "Trevor", correctLeftId: 2 },
  { name: "Andy",   correctLeftId: 3 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChartMatch_QE() {
  // connections: { leftId -> rightName }
  const [connections, setConnections] = useState({});
  const [selectedLeft, setSelectedLeft]  = useState(null); // leftId or null
  const [showResults,  setShowResults]   = useState(false);
  const [showAns,      setShowAns]       = useState(false);

  const containerRef = useRef(null);
  const leftRefs     = useRef({});  // leftId  -> DOM el
  const rightRefs    = useRef({});  // name    -> DOM el
  const [, forceUpdate] = useState(0);

  // Re-draw lines whenever layout changes
  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Helpers ──────────────────────────────────
  const getDotCenter = useCallback((el) => {
    if (!el || !containerRef.current) return null;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: eRect.left - cRect.left + eRect.width  / 2,
      y: eRect.top  - cRect.top  + eRect.height / 2,
    };
  }, []);

  const lineColor = useCallback((leftId, rightName) => {
    if (showAns) return LINE_SHOW_ANS;
    if (!showResults) return LINE_DEFAULT;
    const correct = RIGHT_ITEMS.find((r) => r.correctLeftId === Number(leftId));
    return correct && correct.name === rightName ? LINE_CORRECT : LINE_WRONG;
  }, [showAns, showResults]);

  const isCorrect = (leftId, rightName) => {
    const correct = RIGHT_ITEMS.find((r) => r.correctLeftId === Number(leftId));
    return correct && correct.name === rightName;
  };

  const connectedRight = (rightName) =>
    Object.values(connections).includes(rightName);
  const connectedLeft = (leftId) =>
    Object.prototype.hasOwnProperty.call(connections, leftId);

  // ── Click handlers ────────────────────────────
  const handleLeftClick = (leftId) => {
    if (showAns) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;

    if (selectedLeft === leftId) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(leftId);
  };

  const handleRightClick = (rightName) => {
    if (showAns) return;

    if (selectedLeft === null) return; // nothing selected on left

    // Don't overwrite a correct answer in results mode
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null);
      return;
    }

    setConnections((prev) => {
      const next = { ...prev };
      // Remove any existing connection to this right name
      Object.keys(next).forEach((k) => { if (next[k] === rightName) delete next[k]; });
      // Remove existing connection from this left id (unless it was correct)
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) {
        delete next[selectedLeft];
      }
      next[selectedLeft] = rightName;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  // ── Button handlers ──────────────────────────
  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, rname]) => {
      if (isCorrect(lid, rname)) score++;
    });
    setShowResults(true);
    if (score === LEFT_ITEMS.length) ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans);
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
  };

  // ── Build SVG lines ───────────────────────────
  const renderLines = () =>
    Object.entries(connections).map(([leftId, rightName]) => {
      const lEl = leftRefs.current[leftId];
      const rEl = rightRefs.current[rightName];
      const p1  = getDotCenter(lEl);
      const p2  = getDotCenter(rEl);
      if (!p1 || !p2) return null;
      return (
        <line
          key={`${leftId}-${rightName}`}
          x1={p1.x} y1={p1.y}
          x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, rightName)}
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    });

  // ── Dot color helpers ─────────────────────────
  const leftDotColor = (leftId) => {
    if (selectedLeft === leftId) return DOT_SELECTED;
    if (connectedLeft(leftId)) {
      if (showAns) return LINE_SHOW_ANS;
      if (showResults) return isCorrect(leftId, connections[leftId]) ? LINE_CORRECT : LINE_WRONG;
      return DOT_DEFAULT;
    }
    return DOT_DEFAULT;
  };

  const rightDotColor = (rightName) => {
    if (!connectedRight(rightName)) return DOT_DEFAULT;
    const leftId = Object.keys(connections).find((k) => connections[k] === rightName);
    if (!leftId) return DOT_DEFAULT;
    if (showAns) return LINE_SHOW_ANS;
    if (showResults) return isCorrect(leftId, rightName) ? LINE_CORRECT : LINE_WRONG;
    return DOT_DEFAULT;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Layout ── */
        .rcm-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
        }

        /* ── Chart (left panel) ── */
        .rcm-chart {
          border: 2px solid ${CHART_BORDER};
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .rcm-chart-row {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          padding: clamp(8px, 1vw, 14px) clamp(12px, 1.6vw, 20px);
          border-bottom: 1px solid ${CHART_BORDER};
        }
        .rcm-chart-row:last-child { border-bottom: none; }
        .rcm-chart-imgs {
          display: flex;
          gap: clamp(4px, 0.6vw, 8px);
          align-items: center;
          flex-shrink: 0;
        }
        .rcm-chart-img {
          width:  clamp(36px, 4.4vw, 56px);
          height: clamp(36px, 4.4vw, 56px);
          object-fit: contain;
          display: block;
        }
        .rcm-chart-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }

        /* ── Matching area ── */
        .rcm-match-area {
          position: relative;
        }
        .rcm-match-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0;
          align-items: start;
        }

        /* Left column */
        .rcm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
        }
        .rcm-match-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.9vw, 10px);
        }
        .rcm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: 18px;
        }
        .rcm-sentence {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .rcm-dot-left {
          width:  clamp(12px, 1.4vw, 16px);
          height: clamp(12px, 1.4vw, 16px);
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
          margin-left: clamp(6px, 0.8vw, 12px);
          transition: background 0.15s, transform 0.15s;
        }
        .rcm-dot-left:hover { transform: scale(1.25); }

        /* Right column */
        .rcm-right-col {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          padding-left: clamp(28px, 4vw, 56px);
        }
        .rcm-right-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .rcm-dot-right {
          width:  clamp(12px, 1.4vw, 16px);
          height: clamp(12px, 1.4vw, 16px);
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
        }
        .rcm-dot-right:hover { transform: scale(1.25); }
        .rcm-name {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${NAME_COLOR};
          font-weight: 500;
          white-space: nowrap;
        }

        /* SVG overlay */
        .rcm-svg-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        /* Buttons */
        .rcm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .rcm-body { grid-template-columns: 1fr; }
          .rcm-chart-text { white-space: normal; }
          .rcm-sentence { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">E</span>
          Read the chart and match.
        </h1>

        {/* ── Body ── */}
        <div className="rcm-body">

          {/* ── Chart panel (left) — صورة واحدة كاملة ── */}
          <div className="rcm-chart">
            <img
              src={imgChartTable}
              alt="chart table"
              style={{
                display: "block",
                width: "clamp(200px, 28vw, 380px)",
                height: "auto",
              }}
            />
          </div>

          {/* ── Matching panel (right) ── */}
          <div className="rcm-match-area" ref={containerRef}>
            <div className="rcm-match-grid">

              {/* Left sentences + dots */}
              <div className="rcm-left-col">
                {LEFT_ITEMS.map((item) => (
                  <div key={item.id} className="rcm-match-row">
                    <span className="rcm-num">{item.id}</span>
                    <span className="rcm-sentence">{item.sentence}</span>
                    <div
                      className="rcm-dot-left"
                      ref={(el) => { leftRefs.current[item.id] = el; }}
                      style={{ background: leftDotColor(item.id) }}
                      onClick={() => handleLeftClick(item.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Right dots + names */}
              <div className="rcm-right-col">
                {RIGHT_ITEMS.map((item) => (
                  <div key={item.name} className="rcm-right-item">
                    <div
                      className="rcm-dot-right"
                      ref={(el) => { rightRefs.current[item.name] = el; }}
                      style={{ background: rightDotColor(item.name) }}
                      onClick={() => handleRightClick(item.name)}
                    />
                    <span className="rcm-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG lines overlay */}
            <svg className="rcm-svg-overlay">
              {renderLines()}
            </svg>
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="rcm-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}