import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 40.svg"; // chess
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 41.svg"; // writing diary
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 42.svg"; // bike
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 43.svg"; // shopping
import imgE from"../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 44.svg"; // soccer

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const DOT_DEFAULT      = "#e07b00";
const DOT_SELECTED     = "#2096a6";
const LINE_DEFAULT     = "#e07b00";
const LINE_SHOW_ANS    = "#c81e1e";
const IMG_BORDER_DEF   = "#e5e7eb";
const IMG_BORDER_SEL   = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Left: 5 صور (a→e) — الطالب يضغط الصورة ثم الجملة
//  Right: 5 جمل مرقمة
//  correctLeftId: id الصورة الصحيحة لكل جملة
// ─────────────────────────────────────────────
const LEFT_IMGS = [
  { id: "a", src: imgA }, // chess       → 3
  { id: "b", src: imgB }, // diary       → 5
  { id: "c", src: imgC }, // bike        → 1
  { id: "d", src: imgD }, // shopping    → 2
  { id: "e", src: imgE }, // soccer      → 4
];

const RIGHT_ITEMS = [
  { id: 1, text: "Because he likes riding his bike.",          correctLeftId: "c" },
  { id: 2, text: "Because she likes shopping in the store.",  correctLeftId: "d" },
  { id: 3, text: "Because they like playing chess.",          correctLeftId: "a" },
  { id: 4, text: "Because he likes soccer.",                  correctLeftId: "e" },
  { id: 5, text: "Because she likes writing in her diary.",   correctLeftId: "b" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadMatch_QE() {
  // connections: { leftId: rightId }
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

  const isCorrect      = (lid, rid) => { const r = RIGHT_ITEMS.find((ri) => ri.id === rid); return r && r.correctLeftId === lid; };
  const connectedRight = (rid) => Object.values(connections).includes(rid);
  const connectedLeft  = (lid) => Object.prototype.hasOwnProperty.call(connections, lid);

  const lineColor = useCallback(() => showAns ? LINE_SHOW_ANS : LINE_DEFAULT, [showAns]);

  const handleLeftClick = (lid) => {
    if (showAns) return;
    if (showResults && connectedLeft(lid) && isCorrect(lid, connections[lid])) return;
    setSelectedLeft((prev) => (prev === lid ? null : lid));
  };

  const handleRightClick = (rid) => {
    if (showAns || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null); return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === rid) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = rid;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_IMGS.length) {
      ValidationAlert.info("Please connect all images first."); return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, rid]) => { if (isCorrect(lid, rid)) score++; });
    setShowResults(true);
    if (score === LEFT_IMGS.length) ValidationAlert.success(`Score: ${score} / ${LEFT_IMGS.length}`);
    else if (score > 0)             ValidationAlert.warning(`Score: ${score} / ${LEFT_IMGS.length}`);
    else                            ValidationAlert.error(`Score: ${score} / ${LEFT_IMGS.length}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.id; });
    setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rid]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rid]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${lid}-${rid}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor()} strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const leftDotColor = (lid) => {
    if (selectedLeft === lid)           return DOT_SELECTED;
    if (showAns && connectedLeft(lid))  return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const rightDotColor = (rid) => {
    if (showAns && connectedRight(rid)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const isLeftWrong  = (lid) => showResults && !showAns && connectedLeft(lid) && !isCorrect(lid, connections[lid]);
  const isRightWrong = (rid) => {
    if (!showResults || showAns || !connectedRight(rid)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === rid);
    return lid && !isCorrect(lid, rid);
  };

  const imgBorder = (lid) => {
    if (selectedLeft === lid) return IMG_BORDER_SEL;
    return IMG_BORDER_DEF;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Match area ── */
        .lrm-area { position: relative; width: 100%; }

        .lrm-grid {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: clamp(10px, 1.4vw, 18px) clamp(14px, 2vw, 28px);
          align-items: center;
          width: 100%;
        }

        /* Left images column */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 20px);
        }

        .lrm-img-wrap {
          position: relative;
          cursor: pointer;
          border-radius: 10px;
          border: 3px solid ${IMG_BORDER_DEF};
          overflow: visible;
          transition: border-color 0.15s;
          flex-shrink: 0;
        }
        .lrm-img-wrap--locked { cursor: default; }

        .lrm-img {
          width: clamp(100px, 14vw, 190px);
          height: clamp(70px, 9.5vw, 130px);
          object-fit: cover;
          border-radius: 8px;
          display: block;
          pointer-events: none;
        }

        /* Dot right of each image */
        .lrm-dot-left-wrap { position: relative; flex-shrink: 0; }
        .lrm-dot-left {
          width: clamp(12px,1.4vw,16px); height: clamp(12px,1.4vw,16px);
          border-radius: 50%; cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .lrm-img-wrap:not(.lrm-img-wrap--locked):hover .lrm-dot-left { transform: scale(1.3); }

        /* ✕ badge */
        .lrm-badge {
          position: absolute; top: -7px; right: -7px;
          width: clamp(13px,1.5vw,16px); height: clamp(13px,1.5vw,16px);
          border-radius: 50%; background: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px,0.7vw,9px); font-weight: 700;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none; z-index: 3;
        }

        /* Right sentences column */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: clamp(8px,1.2vw,18px);
          height: 100%;
        }

        .lrm-right-row {
          display: flex;
          align-items: center;
          gap: clamp(6px,0.8vw,10px);
          cursor: pointer;
          user-select: none;
        }
        .lrm-right-row--locked { cursor: default; }

        .lrm-dot-right-wrap { position: relative; flex-shrink: 0; }
        .lrm-dot-right {
          width: clamp(12px,1.4vw,16px); height: clamp(12px,1.4vw,16px);
          border-radius: 50%; cursor: pointer;
          transition: background 0.15s, transform 0.15s; flex-shrink: 0;
        }
        .lrm-right-row:not(.lrm-right-row--locked):hover .lrm-dot-right { transform: scale(1.3); }

        .lrm-right-num {
          font-size: clamp(13px,1.5vw,18px); font-weight: 700;
          color: ${NUMBER_COLOR}; flex-shrink: 0; line-height: 1.4;
        }

        .lrm-right-text {
          font-size: clamp(12px,1.45vw,17px);
          color: ${TEXT_COLOR}; line-height: 1.4;
        }

        .lrm-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; overflow: visible;
        }

        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px,1.6vw,18px);
        }

        @media (max-width: 520px) {
          .lrm-grid { grid-template-columns: auto 1fr; }
        }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <h1 className="WB-header-title-page8" style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
          <span className="WB-ex-A-1">E</span>
          Look, read, and match.
        </h1>

        {/* ── Match area ── */}
        <div className="lrm-area" ref={containerRef}>
          <div className="lrm-grid">

            {/* Left images */}
            <div className="lrm-left-col">
              {LEFT_IMGS.map((img) => {
                const isSel   = selectedLeft === img.id;
                const isLk    = showAns || (showResults && connectedLeft(img.id) && isCorrect(img.id, connections[img.id]));
                const isWrong = isLeftWrong(img.id);
                return (
                  <div key={img.id}
                    className={["lrm-img-wrap", isLk?"lrm-img-wrap--locked":""].filter(Boolean).join(" ")}
                    style={{ borderColor: imgBorder(img.id) }}
                    onClick={() => handleLeftClick(img.id)}
                  >
                    <img src={img.src} alt={`img-${img.id}`} className="lrm-img" />
                    {isWrong && <div className="lrm-badge">✕</div>}
                  </div>
                );
              })}
            </div>

            {/* Left dots column */}
            <div style={{ display:"flex", flexDirection:"column", gap:"clamp(10px,1.5vw,20px)", alignItems:"center" }}>
              {LEFT_IMGS.map((img) => {
                const isWrong = isLeftWrong(img.id);
                return (
                  <div key={img.id} className="lrm-dot-left-wrap"
                    style={{ display:"flex", alignItems:"center", height:"clamp(70px,9.5vw,130px)" }}
                  >
                    <div
                      className="lrm-dot-left"
                      ref={(el) => { leftRefs.current[img.id] = el; }}
                      style={{ background: leftDotColor(img.id) }}
                      onClick={() => handleLeftClick(img.id)}
                    />
                    {isWrong && <div className="lrm-badge">✕</div>}
                  </div>
                );
              })}
            </div>

            {/* Right sentences */}
            <div className="lrm-right-col">
              {RIGHT_ITEMS.map((item) => {
                const isWrong = isRightWrong(item.id);
                return (
                  <div key={item.id}
                    className={["lrm-right-row", showAns?"lrm-right-row--locked":""].filter(Boolean).join(" ")}
                    onClick={() => handleRightClick(item.id)}
                  >
                    <div className="lrm-dot-right-wrap">
                      <div
                        className="lrm-dot-right"
                        ref={(el) => { rightRefs.current[item.id] = el; }}
                        style={{ background: rightDotColor(item.id) }}
                      />
                      {isWrong && <div className="lrm-badge">✕</div>}
                    </div>
                    <span className="lrm-right-num">{item.id}</span>
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
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}