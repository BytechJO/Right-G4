import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  CHART IMAGE
// ─────────────────────────────────────────────
import imgChartTable from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 23.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHART_BORDER             = "#d1d5db";
const TEXT_COLOR               = "#2b2b2b";
const NUMBER_COLOR             = "#2b2b2b";
const NAME_COLOR               = "#2b2b2b";
const DOT_DEFAULT              = "#9ca3af";
const DOT_SELECTED             = "#2096a6";
const LINE_DEFAULT             = "#9ca3af";
const LINE_CORRECT             = "#16a34a";
const LINE_WRONG               = "#ef4444";
const LINE_SHOW_ANS            = "#c81e1e";
const SENTENCE_SELECTED_BG     = "#e0f7fa";
const SENTENCE_SELECTED_BORDER = "#2096a6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, sentence: "Naomi is shorter than" },
  { id: 2, sentence: "Ned is stronger than"  },
  { id: 3, sentence: "Alex is taller than"   },
  { id: 4, sentence: "Susan is slower than"  },
];

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
  const [connections,  setConnections]  = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const containerRef = useRef(null);
  const leftRefs     = useRef({});
  const rightRefs    = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter = useCallback((el) => {
    if (!el || !containerRef.current) return null;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: eRect.left - cRect.left + eRect.width  / 2,
      y: eRect.top  - cRect.top  + eRect.height / 2,
    };
  }, []);

  const isCorrect = (leftId, rightName) => {
    const correct = RIGHT_ITEMS.find((r) => r.correctLeftId === Number(leftId));
    return correct && correct.name === rightName;
  };

  const connectedRight = (n) => Object.values(connections).includes(n);
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor = useCallback((leftId, rightName) => {
    if (showAns)     return LINE_SHOW_ANS;
    if (showResults) return isCorrect(leftId, rightName) ? LINE_CORRECT : LINE_WRONG;
    return LINE_DEFAULT;
  }, [showAns, showResults]);

  // ── Handlers ──
  const handleLeftClick = (leftId) => {
    if (showAns) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightClick = (rightName) => {
    if (showAns || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null); return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === rightName) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = rightName;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) { ValidationAlert.info("Please connect all items first."); return; }
    let score = 0;
    Object.entries(connections).forEach(([lid, rn]) => { if (isCorrect(lid, rn)) score++; });
    setShowResults(true);
    if (score === LEFT_ITEMS.length) ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  // ── SVG lines ──
  const renderLines = () =>
    Object.entries(connections).map(([leftId, rightName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[rightName]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${leftId}-${rightName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, rightName)}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  // ── Dot colors ──
  const leftDotColor = (id) => {
    if (selectedLeft === id) return DOT_SELECTED;
    if (connectedLeft(id)) {
      if (showAns)     return LINE_SHOW_ANS;
      if (showResults) return isCorrect(id, connections[id]) ? LINE_CORRECT : LINE_WRONG;
    }
    return DOT_DEFAULT;
  };

  const rightDotColor = (name) => {
    if (!connectedRight(name)) return DOT_DEFAULT;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    if (!lid) return DOT_DEFAULT;
    if (showAns)     return LINE_SHOW_ANS;
    if (showResults) return isCorrect(lid, name) ? LINE_CORRECT : LINE_WRONG;
    return DOT_DEFAULT;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rcm-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
          margin : 8% 0 
        }

        .rcm-match-area { position: relative; }

        .rcm-match-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
        }

        /* ── Left col — مسافة كبيرة بين الجمل ── */
        .rcm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 42px);

        }

.rcm-match-row {
  display: flex;
  align-items: center;  /* النقطة والنص بنفس المستوى */
  gap: clamp(6px, 0.8vw, 10px);
}
        .rcm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(18px, 2.2vw, 26px);
        }

        /* ── الجملة + النقطة ملفوفين ببوردر لما تكون محددة ── */
        .rcm-sentence-wrap {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 14px);
          border-radius: 10px;
          border: 0px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .rcm-sentence-wrap--selected {
          border-color: ${SENTENCE_SELECTED_BORDER};
          background: ${SENTENCE_SELECTED_BG};
        }
        .rcm-sentence-wrap--locked { cursor: default; }

        .rcm-sentence-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }

     .rcm-dot-left {
    width: clamp(13px, 1.5vw, 17px);
    height: clamp(13px, 1.5vw, 17px);
    border-radius: 50%;
    flex-shrink: 0;
    transition: background 0.15s, transform 0.15s;
    margin-inline-start: auto;
    position: relative;
    left: -5%;
}
        .rcm-sentence-wrap:not(.rcm-sentence-wrap--locked):hover .rcm-dot-left {
          transform: scale(1.3);
        }

        /* ── Right col ── */
        .rcm-right-col {
          display: flex;
          flex-direction: column;
          gap:clamp(19px, 20.2vw, 45px);

          padding-left: clamp(36px, 5.5vw, 80px);
        }

        .rcm-right-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
                        }

        .rcm-dot-right {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .rcm-dot-right:hover { transform: scale(1.3); }

        .rcm-name {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${NAME_COLOR};
          font-weight: 500;
          white-space: nowrap;
        }

        .rcm-svg-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rcm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .rcm-body { grid-template-columns: 1fr; }
          .rcm-sentence-text { white-space: normal; }
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

          {/* Chart */}
          <div style={{  overflow: "hidden", flexShrink: 0 , width : "100%", height: "100%" }}>
            <img src={imgChartTable} alt="chart"
              style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Matching */}
          <div className="rcm-match-area" ref={containerRef} style={{ width: "100%"}}>
            <div className="rcm-match-grid">

            {/* Left */}
<div className="rcm-left-col">
  {LEFT_ITEMS.map((item) => {
    const isSelected = selectedLeft === item.id;
    const isLocked   = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
    return (
      <div key={item.id} className="rcm-match-row"
        onClick={() => handleLeftClick(item.id)}>
        <span className="rcm-num">{item.id}</span>
        <div className={[
          "rcm-sentence-wrap",
          isSelected ? "rcm-sentence-wrap--selected" : "",
          isLocked   ? "rcm-sentence-wrap--locked"   : "",
        ].filter(Boolean).join(" ")}>
          <span className="rcm-sentence-text">{item.sentence}</span>
        </div>
  <div
    className="rcm-dot-left"
    ref={(el) => { leftRefs.current[item.id] = el; }}
    style={{ background: leftDotColor(item.id) }}
  />
</div>
    );
  })}
</div>
              {/* Right */}
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

            <svg className="rcm-svg-overlay">{renderLines()}</svg>
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