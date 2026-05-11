import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 5 images
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 30.svg"; // painting
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 25.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 26.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 29.svg";
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 24.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR          = "#2b2b2b";
const NUMBER_COLOR        = "#2b2b2b";
const DOT_DEFAULT         = "#e07b00";
const DOT_SELECTED        = "#2096a6";
const LINE_DEFAULT        = "#e07b00";
const LINE_CORRECT        = "#e07b00";
const LINE_WRONG          = "#2096a6";
const LINE_SHOW_ANS       = "#c81e1e";
const SENTENCE_SEL_BG     = "#e0f7fa";
const SENTENCE_SEL_BORDER = "#2096a6";
const IMG_BORDER_DEFAULT  = "#e5e7eb";
const IMG_BORDER_SELECTED = "#2096a6";
const IMG_BORDER_CORRECT  = "#16a34a";
const IMG_BORDER_WRONG    = "#ef4444";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, sentence: "She should paint a picture."                           },
  { id: 2, sentence: "He shouldn't listen to the radio so loudly."           },
  { id: 3, sentence: "He shouldn't talk on the phone because he has homework to do." },
  { id: 4, sentence: "She should plant some flowers."                        },
  { id: 5, sentence: "She should fly a kite."                                },
];

// Layout:
//   Left col (3 imgs):  img_L1 (top) → img_L2 (mid) → img_L3 (bottom)
//   Right col (2 imgs): img_R1 (top-offset) → img_R2 (bottom-offset)
//
// From the screenshot:
//   Left col:  img2 (radio)   correctLeftId=2
//              img4 (kite)    correctLeftId=4   ← mid
//              (none)
//   Right col: img1 (paint)   correctLeftId=1
//              img3 (flowers) correctLeftId=3
//              img5 (phone)   correctLeftId=5
//
// Adjust correctLeftId to match your actual images!
const LEFT_IMGS = [
  { name: "img2", src: img2, correctLeftId: 2 },  // radio — يسار فوق
  { name: "img4", src: img4, correctLeftId: 4 },  // kite  — يسار وسط
];

const RIGHT_IMGS = [
  { name: "img1", src: img1, correctLeftId: 1 },  // paint   — يمين فوق (offset)
  { name: "img3", src: img3, correctLeftId: 3 },  // flowers — يمين وسط
  { name: "img5", src: img5, correctLeftId: 5 },  // phone   — يمين تحت
];

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QE() {
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

  const isCorrect      = (leftId, imgName) => {
    const r = ALL_IMGS.find((ri) => ri.name === imgName);
    return r && r.correctLeftId === Number(leftId);
  };
  const connectedRight = (name) => Object.values(connections).includes(name);
  const connectedLeft  = (id)   => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor = useCallback((leftId, imgName) => {
    if (showAns)     return LINE_SHOW_ANS;
    if (showResults) return isCorrect(leftId, imgName) ? LINE_CORRECT : LINE_WRONG;
    return LINE_DEFAULT;
  }, [showAns, showResults]);

  // ── Click handlers ──
  const handleLeftClick = (leftId) => {
    if (showAns) return;
    if (showResults && connectedLeft(leftId) && isCorrect(leftId, connections[leftId])) return;
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleRightClick = (imgName) => {
    if (showAns || selectedLeft === null) return;
    if (showResults && connectedLeft(selectedLeft) && isCorrect(selectedLeft, connections[selectedLeft])) {
      setSelectedLeft(null); return;
    }
    setConnections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => { if (next[k] === imgName) delete next[k]; });
      if (next[selectedLeft] && !(showResults && isCorrect(selectedLeft, next[selectedLeft]))) delete next[selectedLeft];
      next[selectedLeft] = imgName;
      return next;
    });
    setSelectedLeft(null);
    if (showResults) setShowResults(false);
  };

  // ── Button handlers ──
  const handleCheck = () => {
    if (showAns) return;
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all sentences to images first."); return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, name]) => { if (isCorrect(lid, name)) score++; });
    setShowResults(true);
    if (score === LEFT_ITEMS.length) ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const ans = {};
    ALL_IMGS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {
    setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  // ── SVG lines ──
  const renderLines = () =>
    Object.entries(connections).map(([leftId, imgName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[imgName]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${leftId}-${imgName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, imgName)}
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

  const imgBorderColor = (name) => {
    if (!connectedRight(name)) return IMG_BORDER_DEFAULT;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    if (!lid) return IMG_BORDER_DEFAULT;
    if (showAns)     return LINE_SHOW_ANS;
    if (showResults) return isCorrect(lid, name) ? IMG_BORDER_CORRECT : IMG_BORDER_WRONG;
    return IMG_BORDER_SELECTED;
  };

  // ── Badge helpers ──
  const isLeftWrong  = (id)   => showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);
  const isRightWrong = (name) => {
    if (!showResults || showAns || !connectedRight(name)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    return lid && !isCorrect(lid, name);
  };

  // ── Render image card ──
  const renderImgCard = (item) => {
    const isLocked = showAns;
    return (
      <div key={item.name} className="rlm-img-wrap">
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            className="rlm-dot-img"
            ref={(el) => { rightRefs.current[item.name] = el; }}
            style={{ background: rightDotColor(item.name) }}
            onClick={() => handleRightClick(item.name)}
          />
          {isRightWrong(item.name) && <div className="rlm-badge">✕</div>}
        </div>
        <div
          className={["rlm-img-card", isLocked ? "rlm-img-card--locked" : ""].filter(Boolean).join(" ")}
          style={{ borderColor: imgBorderColor(item.name) }}
          onClick={() => handleRightClick(item.name)}
        >
          <img src={item.src} alt={item.name} className="rlm-img" />
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rlm-area { position: relative; width: 100%; }

        /* ── Main flex row ── */
        .rlm-grid {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
        }

        /* ── Left: 5 sentences ── */
        .rlm-left-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 38px);
          padding-top: clamp(16px, 2.4vw, 34px);
        }

        .rlm-row { display: flex; align-items: center; }

        .rlm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(16px, 2vw, 24px);
        }

        .rlm-sentence-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.9vw, 12px);
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 12px);
          border-radius: 10px;
          border: 2px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .rlm-sentence-wrap--selected {
          border-color: ${SENTENCE_SEL_BORDER};
          background: ${SENTENCE_SEL_BG};
        }
        .rlm-sentence-wrap--locked { cursor: default; }

        .rlm-sentence-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: normal;
        }

        /* نقطة الجملة */
        .rlm-dot-sentence-wrap { position: relative; flex-shrink: 0; }

        .rlm-dot-sentence {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          transition: background 0.15s, transform 0.15s;
        }
        .rlm-sentence-wrap:not(.rlm-sentence-wrap--locked):hover .rlm-dot-sentence {
          transform: scale(1.3);
        }

        /* ── Right: two staggered image columns ── */
        .rlm-images-area {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 14px);
    padding-left: 40px;
          flex-shrink: 0;
        }

        /* Left image col: 2 imgs, no offset */
        .rlm-img-col-left {
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 5.5vw, 70px);       margin-top: clamp(50px, 7vw, 87px);

        }

        /* Right image col: 3 imgs, offset down ~1 img height + half gap */
        .rlm-img-col-right {
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 5.5vw, 70px);
        }

        /* dot + image card wrapper */
        .rlm-img-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rlm-dot-img {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.15s;
        }

        .rlm-img-card {
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.15s, transform 0.1s;
          flex-shrink: 0;
        }
        .rlm-img-card:hover { transform: scale(1.02); }
        .rlm-img-card--locked { cursor: default; }
        .rlm-img-card--locked:hover { transform: none; }

        .rlm-img {
          width: 100%;
          height: clamp(70px, 8.5vw, 115px);
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ✕ badge */
        .rlm-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* SVG overlay */
        .rlm-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.4vw, 16px);
        }

        @media (max-width: 520px) {
          .rlm-grid          { flex-direction: column; }
          .rlm-left-col      { padding-top: 0; }
          .rlm-images-area   { padding-left: 0; }
          .rlm-img-col-right { margin-top: 0; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 1.8vw, 20px)",
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
          Read, look, and match.
        </h1>

        {/* ── Matching area ── */}
        <div className="rlm-area" ref={containerRef}>
          <div className="rlm-grid">

            {/* ── Sentences (left) ── */}
            <div className="rlm-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSelected = selectedLeft === item.id;
                const isLocked   = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                return (
                  <div key={item.id} className="rlm-row">
                    <span className="rlm-num">{item.id}</span>
                    <div
                      className={[
                        "rlm-sentence-wrap",
                        isSelected ? "rlm-sentence-wrap--selected" : "",
                        isLocked   ? "rlm-sentence-wrap--locked"   : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleLeftClick(item.id)}
                    >
                      <span className="rlm-sentence-text">{item.sentence}</span>
                      <div className="rlm-dot-sentence-wrap">
                        <div
                          className="rlm-dot-sentence"
                          ref={(el) => { leftRefs.current[item.id] = el; }}
                          style={{ background: leftDotColor(item.id) }}
                        />
                        {isLeftWrong(item.id) && <div className="rlm-badge">✕</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Images (right) — two staggered columns ── */}
            <div className="rlm-images-area">

              {/* Left img col: 2 images */}
              <div className="rlm-img-col-left">
                {LEFT_IMGS.map(renderImgCard)}
              </div>

              {/* Right img col: 3 images, offset down */}
              <div className="rlm-img-col-right">
                {RIGHT_IMGS.map(renderImgCard)}
              </div>

            </div>

          </div>

          {/* SVG lines */}
          <svg className="rlm-svg">{renderLines()}</svg>
        </div>

        {/* ── Buttons ── */}
        <div className="rlm-buttons">
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