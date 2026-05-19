import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🔊 AUDIO
// ─────────────────────────────────────────────
import sound from "../../../assets/audio/ClassBook/Grade 4/cd56pg86-instruction-adult-lady_fqy2rjlY.mp3";
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
  { start: 0.48,  end: 3.06,  text: "Page 86, Write Activities." },
  { start: 3.06,  end: 7.62,  text: "Exercise C, Listen, read, and match." },
  { start: 7.62,  end: 10.54, text: "Alex enjoys traveling around the world." },
  { start: 10.54, end: 13.24, text: "He has done many things in different countries." },
  { start: 13.24, end: 18.72, text: "Alex has been rock climbing in Oregon and has gone skiing in Switzerland." },
  { start: 18.72, end: 21.86, text: "He has watched chefs make pizza in Italy." },
  { start: 21.86, end: 25.90, text: "He has flown in a small plane over the Mediterranean Sea." },
  { start: 25.90, end: 32.78, text: "He has visited the Blue Mosque in Turkey and toured London in a double-decker bus." },
  { start: 32.78, end: 37.04, text: "He has done all of these things and plans to do more in the future." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "Alex has been rock climbing" },
  { id: 2, text: "He has flown in a small plane" },
  { id: 3, text: "He has toured London" },
  { id: 4, text: "He has gone skiing" },
];

const RIGHT_ITEMS = [
  { name: "r1", text: "in a double-decker bus.",      correctLeftId: 3 },
  { name: "r2", text: "in Switzerland.",               correctLeftId: 4 },
  { name: "r3", text: "over the Mediterranean Sea.",   correctLeftId: 2 },
  { name: "r4", text: "in Oregon.",                    correctLeftId: 1 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadMatch_QC() {
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
    return { x: eRect.left - cRect.left + eRect.width/2, y: eRect.top - cRect.top + eRect.height/2 };
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
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) { setSelectedLeft(null); return; }
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
    if (Object.keys(connections).length < LEFT_ITEMS.length) { ValidationAlert.info("Please connect all sentences first."); return; }
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

  const handleReset = () => { setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null); };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rn]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rn]);
      if (!p1 || !p2) return null;
      return <line key={`${lid}-${rn}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={lineColor()} strokeWidth="2.5" strokeLinecap="round" />;
    });

  const leftDotColor  = (id) => { if (selectedLeft === id) return DOT_SELECTED; if (showAns && connectedLeft(id)) return LINE_SHOW_ANS; return DOT_DEFAULT; };
  const rightDotColor = (n)  => { if (showAns && connectedRight(n)) return LINE_SHOW_ANS; return DOT_DEFAULT; };
  const isLeftWrong   = (id) => showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);

  return (
    <div className="main-container-component">
      <style>{`
        .lrmc-para {
          font-size: clamp(13px,1.6vw,19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
          width: 100%;
        }
        .lrmc-area  { position: relative; width: 100%; }

        /* 3 cols: left | spacer | right */
        .lrmc-table {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          width: 100%;
        }

        .lrmc-left-col  { display: flex; flex-direction: column; }
        .lrmc-right-col { display: flex; flex-direction: column; }

        /* Each row same min-height so dots align horizontally */
        .lrmc-left-row {
          display: flex; align-items: center;
          flex: 1; min-height: clamp(40px,5vw,60px);
          cursor: pointer; user-select: none;
          padding: clamp(4px,0.6vw,8px) 0;
        }
        .lrmc-left-row--locked { cursor: default; }

        .lrmc-right-row {
          display: flex; align-items: center;
          flex: 1; min-height: clamp(40px,5vw,60px);
          cursor: pointer; user-select: none;
          padding: clamp(4px,0.6vw,8px) 0;
        }
        .lrmc-right-row--locked { cursor: default; }

        /* Sentence wrap */
        .lrmc-sent-wrap {
          display: flex; align-items: center;
          gap: clamp(6px,0.8vw,10px);
          border-radius: 10px; border: 2px solid transparent;
          padding: clamp(3px,0.4vw,6px) clamp(6px,0.8vw,10px);
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
        }
        .lrmc-sent-wrap--selected { border-color: ${LEFT_SEL_BD}; background: ${LEFT_SEL_BG}; }

        .lrmc-num {
          font-size: clamp(13px,1.6vw,19px); font-weight:700;
          color:${NUMBER_COLOR}; flex-shrink:0; line-height:1;
        }
        .lrmc-sent-text  { font-size:clamp(12px,1.45vw,17px); color:${TEXT_COLOR}; line-height:1.3; }
        .lrmc-right-text { font-size:clamp(12px,1.45vw,17px); color:${TEXT_COLOR}; line-height:1.3; }

        /* Dots */
        .lrmc-dot-wrap { position: relative; flex-shrink:0; }
        .lrmc-dot {
          width:clamp(11px,1.3vw,15px); height:clamp(11px,1.3vw,15px);
          border-radius:50%; transition:background 0.15s, transform 0.15s; cursor:pointer;
        }
        .lrmc-left-row:not(.lrmc-left-row--locked):hover  .lrmc-dot { transform:scale(1.3); }
        .lrmc-right-row:not(.lrmc-right-row--locked):hover .lrmc-dot { transform:scale(1.3); }

        /* Badge — يسار فقط */
        .lrmc-badge {
          position:absolute; top:-7px; right:-7px;
          width:clamp(13px,1.5vw,16px); height:clamp(13px,1.5vw,16px);
          border-radius:50%; background:${WRONG_BADGE_BG}; color:${WRONG_BADGE_TEXT};
          display:flex; align-items:center; justify-content:center;
          font-size:clamp(6px,0.7vw,9px); font-weight:700;
          border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);
          pointer-events:none; z-index:3;
        }

        .lrmc-svg { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:visible; }
        .lrmc-buttons { display:flex; justify-content:center; margin-top:clamp(8px,1.6vw,18px); }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <h1 className="WB-header-title-page8" style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
          <span className="WB-ex-A-1">C</span>
          Listen, read, and match.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop:"4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={3.1} />
        </div>

        {/* ── Paragraph ── */}
        <p className="lrmc-para">
          Alex enjoys traveling around the world. He has done many things in different countries.
          Alex has been rock climbing in Oregon and has gone skiing in Switzerland. He has watched
          chefs make pizza in Italy. He has flown in a small plane over the Mediterranean Sea. He has
          visited the Blue Mosque in Turkey and toured London in a double-decker bus. He has done
          all of these things and plans to do more in the future.
        </p>

        {/* ── Matching ── */}
        <div className="lrmc-area" ref={containerRef}>
          <div className="lrmc-table">

            {/* Left */}
            <div className="lrmc-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSel   = selectedLeft === item.id;
                const isLk    = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                const isWrong = isLeftWrong(item.id);
                return (
                  <div key={item.id}
                    className={["lrmc-left-row", isLk?"lrmc-left-row--locked":""].filter(Boolean).join(" ")}
                    onClick={() => handleLeftClick(item.id)}
                  >
                    <div className={["lrmc-sent-wrap", isSel?"lrmc-sent-wrap--selected":""].filter(Boolean).join(" ")}>
                      <span className="lrmc-num">{item.id}</span>
                      <span className="lrmc-sent-text">{item.text}</span>
                      {/* dot at right edge of sentence */}
                      <div style={{ marginLeft:"auto", flexShrink:0 }}>
                        <div className="lrmc-dot-wrap">
                          <div className="lrmc-dot"
                            ref={(el) => { leftRefs.current[item.id] = el; }}
                            style={{ background: leftDotColor(item.id) }}
                          />
                          {isWrong && <div className="lrmc-badge">✕</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spacer */}
            <div style={{ minWidth:"clamp(200px, 6vw, 200px);" }} />

            {/* Right */}
            <div className="lrmc-right-col">
              {RIGHT_ITEMS.map((item) => (
                <div key={item.name}
                  className={["lrmc-right-row", showAns?"lrmc-right-row--locked":""].filter(Boolean).join(" ")}
                  onClick={() => handleRightClick(item.name)}
                >
                  {/* dot at left edge */}
                  <div className="lrmc-dot-wrap" style={{ marginRight:"clamp(6px,0.8vw,10px)", flexShrink:0 }}>
                    <div className="lrmc-dot"
                      ref={(el) => { rightRefs.current[item.name] = el; }}
                      style={{ background: rightDotColor(item.name) }}
                    />
                  </div>
                  <span className="lrmc-right-text">{item.text}</span>
                </div>
              ))}
            </div>

          </div>
          <svg className="lrmc-svg">{renderLines()}</svg>
        </div>

        {/* ── Buttons ── */}
        <div className="lrmc-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}