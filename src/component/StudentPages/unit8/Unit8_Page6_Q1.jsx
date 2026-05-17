import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd45pg69-instructions-adult-lady_GbFFFTCs.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR           = "#2b2b2b";
const NUMBER_COLOR         = "#2b2b2b";
const DOT_DEFAULT          = "#e07b00";
const DOT_SELECTED         = "#2096a6";
const LINE_DEFAULT         = "#e07b00";
const LINE_SHOW_ANS        = "#c81e1e";
const LEFT_SEL_BG          = "#e0f7fa";
const LEFT_SEL_BD          = "#2096a6";
const WRONG_BADGE_BG       = "#ef4444";
const WRONG_BADGE_TEXT     = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.36,
    end: 7.24,
    text: "Page 69, Write Activities Exercise E. Listen, read, and match.",
  },
  {
    start: 7.24,
    end: 11.90,
    text: "Steve had a busy weekend. He woke up early and brushed his teeth.",
  },
  {
    start: 11.90,
    end: 14.72,
    text: "He cooked a breakfast of eggs and toast.",
  },
  {
    start: 14.72,
    end: 17.96,
    text: "He cleaned his room and helped his mom and dad.",
  },
  {
    start: 19.54,
    end: 24.40,
    text: "In the afternoon, he went out with friends. They played soccer on a field.",
  },
  {
    start: 24.40,
    end: 30.02,
    text: "He came home and ate dinner with his family. Then he went to bed.",
  },
];
// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "He cooked a breakfast" },
  { id: 2, text: "He cleaned his room"   },
  { id: 3, text: "They played soccer"    },
  { id: 4, text: "He came home"          },
];

const RIGHT_ITEMS = [
  { name: "r1", text: "on a field.",             correctLeftId: 3 },
  { name: "r2", text: "of eggs and toast.",      correctLeftId: 1 },
  { name: "r3", text: "and then went to bed.",   correctLeftId: 4 },
  { name: "r4", text: "and helped his mom and dad.", correctLeftId: 2 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadMatch_QE() {
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

  const isCorrect      = (leftId, rName) => {
    const r = RIGHT_ITEMS.find((ri) => ri.name === rName);
    return r && r.correctLeftId === Number(leftId);
  };
  const connectedRight = (n)  => Object.values(connections).includes(n);
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor = useCallback(() => {
    if (showAns) return LINE_SHOW_ANS;
    return LINE_DEFAULT;
  }, [showAns]);

  const handleLeftClick = (leftId) => {
    if (showAns) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightClick = (rName) => {
    if (showAns || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null); return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === rName) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = rName;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all sentences first."); return;
    }
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

  const renderLines = () =>
    Object.entries(connections).map(([leftId, rName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[rName]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${leftId}-${rName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor()}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const leftDotColor = (id) => {
    if (selectedLeft === id)           return DOT_SELECTED;
    if (showAns && connectedLeft(id))  return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const rightDotColor = (name) => {
    if (showAns && connectedRight(name)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const isLeftWrong  = (id)   =>
    showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);
  const isRightWrong = (name) => {
    if (!showResults || showAns || !connectedRight(name)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    return lid && !isCorrect(lid, name);
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrm-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          width: 100%;
        }

        .lrm-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.8;
        }

        .lrm-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }

        /* ── Matching area ── */
        .lrm-match-area { position: relative; width: 100%; }

        .lrm-match-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 0;
          width: 100%;
        }

        /* Left col */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 38px);
        }

        .lrm-left-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .lrm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(16px, 2vw, 22px);
        }

        .lrm-sentence-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 12px);
          border-radius: 10px;
          border: 2px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .lrm-sentence-wrap--selected { border-color: ${LEFT_SEL_BD}; background: ${LEFT_SEL_BG}; }
        .lrm-sentence-wrap--locked   { cursor: default; }

        .lrm-sentence-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          line-height: 1.4;
        }

        /* dot wrap for badge */
        .lrm-dot-wrap { position: relative; flex-shrink: 0; }

        .lrm-dot {
          width:  clamp(12px, 1.4vw, 16px);
          height: clamp(12px, 1.4vw, 16px);
          border-radius: 50%;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .lrm-sentence-wrap:not(.lrm-sentence-wrap--locked):hover .lrm-dot {
          transform: scale(1.3);
        }

        /* Right col */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 38px);
          padding-left: clamp(20px, 3vw, 40px);
        }

        .lrm-right-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          cursor: pointer;
          user-select: none;
        }
        .lrm-right-row--locked { cursor: default; }

        .lrm-right-dot-wrap { position: relative; flex-shrink: 0; }

        .lrm-right-dot {
          width:  clamp(12px, 1.4vw, 16px);
          height: clamp(12px, 1.4vw, 16px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .lrm-right-row:not(.lrm-right-row--locked):hover .lrm-right-dot {
          transform: scale(1.3);
        }

        .lrm-right-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          line-height: 1.4;
        }

        /* ✕ Badge */
        .lrm-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* SVG */
        .lrm-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrm-top { grid-template-columns: 1fr; }
          .lrm-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
          .lrm-sentence-text, .lrm-right-text { white-space: normal; }
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
          <span className="WB-ex-A">E</span>
          Listen, read, and match.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={7.4} />
        </div>

        {/* ── Top: paragraph + image ── */}
        <div className="lrm-top">
          <p className="lrm-para">
            Steve had a busy weekend. He woke up early and brushed his teeth.
            He cooked a breakfast of eggs and toast. He cleaned his room and
            helped his mom and dad. In the afternoon, he went out with friends.
            They played soccer on a field. He came home and ate dinner with his
            family. Then, he went to bed.
          </p>
          <img src={imgScene} alt="scene" className="lrm-scene-img" />
        </div>

        {/* ── Matching ── */}
        <div className="lrm-match-area" ref={containerRef}>
          <div className="lrm-match-grid">

            {/* Left sentences */}
            <div className="lrm-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSelected = selectedLeft === item.id;
                const isLocked   = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                const dotWrong   = isLeftWrong(item.id);
                return (
                  <div key={item.id} className="lrm-left-row">
                    <span className="lrm-num">{item.id}</span>
                    <div
                      className={[
                        "lrm-sentence-wrap",
                        isSelected ? "lrm-sentence-wrap--selected" : "",
                        isLocked   ? "lrm-sentence-wrap--locked"   : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleLeftClick(item.id)}
                    >
                      <span className="lrm-sentence-text">{item.text}</span>
                      <div className="lrm-dot-wrap">
                        <div
                          className="lrm-dot"
                          ref={(el) => { leftRefs.current[item.id] = el; }}
                          style={{ background: leftDotColor(item.id) }}
                        />
                        {dotWrong && <div className="lrm-badge">✕</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spacer for SVG lines */}
            <div style={{ width: "clamp(30px,4vw,60px)" }} />

            {/* Right endings */}
            <div className="lrm-right-col">
              {RIGHT_ITEMS.map((item) => {
                const isLocked = showAns;
                const dotWrong = isRightWrong(item.name);
                return (
                  <div
                    key={item.name}
                    className={["lrm-right-row", isLocked ? "lrm-right-row--locked" : ""].filter(Boolean).join(" ")}
                    onClick={() => handleRightClick(item.name)}
                  >
                    <div className="lrm-right-dot-wrap">
                      <div
                        className="lrm-right-dot"
                        ref={(el) => { rightRefs.current[item.name] = el; }}
                        style={{ background: rightDotColor(item.name) }}
                      />
                      {dotWrong && <div className="lrm-badge">✕</div>}
                    </div>
                    <span className="lrm-right-text">{item.text}</span>
                  </div>
                );
              })}
            </div>

          </div>
          <svg className="lrm-svg">{renderLines()}</svg>
        </div>

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
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