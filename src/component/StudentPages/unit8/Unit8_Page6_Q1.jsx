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
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const PARA_COLOR       = "#2b2b2b";
const DOT_DEFAULT      = "#e07b00";
const DOT_SELECTED     = "#2096a6";
const LINE_DEFAULT     = "#e07b00";
const LINE_SHOW_ANS    = "#c81e1e";
const LEFT_SEL_BG      = "#e0f7fa";
const LEFT_SEL_BD      = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and match." },
  { start: 5.0,  end: 14.0, text: "Steve had a busy weekend. He woke up early and brushed his teeth." },
  { start: 14.0, end: 24.0, text: "He cooked a breakfast of eggs and toast. He cleaned his room and helped his mom and dad." },
  { start: 24.0, end: 34.0, text: "In the afternoon, he went out with friends. They played soccer on a field." },
  { start: 34.0, end: 42.0, text: "He came home and ate dinner with his family. Then, he went to bed." },
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
  const leftRefs     = useRef({});  // dot refs left
  const rightRefs    = useRef({});  // dot refs right
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

  const isCorrect      = (lid, rn) => { const r = RIGHT_ITEMS.find((ri) => ri.name === rn); return r && r.correctLeftId === Number(lid); };
  const connectedRight = (n)  => Object.values(connections).includes(n);
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);
  const lineColor      = useCallback(() => showAns ? LINE_SHOW_ANS : LINE_DEFAULT, [showAns]);

  const handleLeftClick = (lid) => {
    if (showAns) return;
    if (showResults && connectedLeft(lid) && isCorrect(lid, connections[lid])) return;
    setSelectedLeft((prev) => (prev === lid ? null : lid));
  };

  const handleRightClick = (rn) => {
    if (showAns || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null); return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === rn) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = rn;
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
    const ans = {}; RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rn]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rn]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${lid}-${rn}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor()} strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const leftDotColor = (id) => {
    if (selectedLeft === id)           return DOT_SELECTED;
    if (showAns && connectedLeft(id))  return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const rightDotColor = (n) => {
    if (showAns && connectedRight(n)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const isLeftWrong = (id) =>
    showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrm-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(14px, 2vw, 28px);
          align-items: flex-start;
          width: 100%;
        }
        .lrm-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
        }
        .lrm-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }

        /* ── Matching table ── */
        .lrm-area { position: relative; width: 100%; }

        /* 3-column grid: left-sentences | center-dots | right-sentences */
        .lrm-table {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          width: 100%;
        }

        /* Left sentences column */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
        }

        /* Right sentences column */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
        }

        /* Center dots column */
        .lrm-dots-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding:0 clamp(100px, 3vw, 100px);
        }

        /* Each row — same height for alignment */
        .lrm-left-row {
          display: flex;
          align-items: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
          cursor: pointer;
          user-select: none;
          padding: clamp(4px, 0.6vw, 8px) 0;
        }
        .lrm-left-row--locked { cursor: default; }

        .lrm-right-row {
          display: flex;
          align-items: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
          cursor: pointer;
          user-select: none;
          padding: clamp(4px, 0.6vw, 8px) 0;
        }
        .lrm-right-row--locked { cursor: default; }

        .lrm-dot-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
        }

        /* Sentence wrap for left */
        .lrm-sent-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          border-radius: 10px;
          border: 2px solid transparent;
          padding: clamp(3px, 0.4vw, 6px) clamp(6px, 0.8vw, 10px);
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
        }
        .lrm-sent-wrap--selected { border-color: ${LEFT_SEL_BD}; background: ${LEFT_SEL_BG}; }

        .lrm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrm-sent-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.3;
        }

        .lrm-right-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.3;
        }

        /* Dots */
        .lrm-dot-wrap { position: relative; }

        .lrm-dot {
          width: clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .lrm-left-row:not(.lrm-left-row--locked):hover .lrm-dot { transform: scale(1.3); }
        .lrm-right-row:not(.lrm-right-row--locked):hover .lrm-dot { transform: scale(1.3); }

        /* ✕ badge — فقط على نقاط اليسار الغلط */
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

        /* SVG overlay */
        .lrm-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; overflow: visible;
        }

        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrm-top { grid-template-columns: 1fr; }
          .lrm-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
          .lrm-sent-text, .lrm-right-text { font-size: clamp(11px,3.2vw,15px); }
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
          Listen, read, and match.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={5} />
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
        <div className="lrm-area" ref={containerRef}>
          <div className="lrm-table">

            {/* Left sentences */}
            <div className="lrm-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSel   = selectedLeft === item.id;
                const isLk    = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                const isWrong = isLeftWrong(item.id);
                return (
                  <div
                    key={item.id}
                    className={["lrm-left-row", isLk ? "lrm-left-row--locked" : ""].filter(Boolean).join(" ")}
                    onClick={() => handleLeftClick(item.id)}
                  >
                    <div className={["lrm-sent-wrap", isSel ? "lrm-sent-wrap--selected" : ""].filter(Boolean).join(" ")}>
                      <span className="lrm-num">{item.id}</span>
                      <span className="lrm-sent-text">{item.text}</span>
                      {/* Left dot — inside sent-wrap at right end */}
                      <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                        <div className="lrm-dot-wrap">
                          <div
                            className="lrm-dot"
                            ref={(el) => { leftRefs.current[item.id] = el; }}
                            style={{ background: leftDotColor(item.id) }}
                          />
                          {isWrong && <div className="lrm-badge">✕</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center spacer — SVG lines drawn here */}
            <div className="lrm-dots-col" style={{ minWidth: "clamp(40px,6vw,80px)" }} />

            {/* Right sentences */}
            <div className="lrm-right-col">
              {RIGHT_ITEMS.map((item) => {
                const isLk = showAns;
                return (
                  <div
                    key={item.name}
                    className={["lrm-right-row", isLk ? "lrm-right-row--locked" : ""].filter(Boolean).join(" ")}
                    onClick={() => handleRightClick(item.name)}
                  >
                    {/* Right dot */}
                    <div className="lrm-dot-wrap" style={{ marginRight: "clamp(6px,0.8vw,10px)", flexShrink: 0 }}>
                      <div
                        className="lrm-dot"
                        ref={(el) => { rightRefs.current[item.name] = el; }}
                        style={{ background: rightDotColor(item.name) }}
                      />
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