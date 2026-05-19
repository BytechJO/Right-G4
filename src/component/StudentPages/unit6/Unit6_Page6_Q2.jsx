import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 5 images
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 30.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 29.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 24.svg";
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 25.svg";

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

// All images in a single column — order determines vertical position (1→5)
const ALL_IMGS = [
  { name: "img1", src: img2, correctLeftId: 3 },
  { name: "img2", src: img5, correctLeftId: 1 },
  { name: "img3", src: img1, correctLeftId: 4 },
  { name: "img4", src: img3, correctLeftId: 5 },
  { name: "img5", src: img4, correctLeftId: 2 },
];

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

  const isLeftWrong  = (id)   => showResults && !showAns && connectedLeft(id) && !isCorrect(id, connections[id]);
  const isRightWrong = (name) => {
    if (!showResults || showAns || !connectedRight(name)) return false;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    return lid && !isCorrect(lid, name);
  };

  // ── Card height used to compute row heights for both columns ──
  // Each row is: image height + gap. We use CSS vars so both columns
  // share the exact same rhythm.
  const ROW_HEIGHT = "clamp(90px, 10.5vw, 130px)";
  const ROW_GAP    = "clamp(14px, 2vw, 26px)";

  return (
    <div className="main-container-component">
      <style>{`
        /* ─── layout shell ─── */
        .rlm-area {
          position: relative;
          width: 100%;
        }

        .rlm-grid {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
          /* Both columns share the same row-height + gap rhythm */
          --row-h: ${ROW_HEIGHT};
          --row-gap: ${ROW_GAP};
        }

        /* ─── LEFT side: number + sentence + dot ─── */
        .rlm-left-section {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--row-gap);
        }

        /* Each sentence row is exactly --row-h tall so it aligns with the image opposite */
        .rlm-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: var(--row-h);
          gap: 0;
        }

        .rlm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(16px, 2vw, 24px);
        }

        .rlm-sentence-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 12px);
          border-radius: 10px;
          border: 2px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
          height: 100%;
          box-sizing: border-box;
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

        /* dot beside sentence — right edge of left section */
        .rlm-dot-sentence-wrap {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(24px, 2.5vw, 32px);
          height: 100%;
        }

        .rlm-dot-sentence {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          flex-shrink: 0;
        }
        .rlm-dot-sentence:hover { transform: scale(1.3); }

        /* ─── RIGHT side: single image column ─── */
        .rlm-images-area {
          display: flex;
          flex-direction: column;
          gap: var(--row-gap);
     padding-left: clamp(200px, 3vw, 200px);

          flex-shrink: 0;
        }

        /* Each image row is exactly --row-h, matching the sentence row */
        .rlm-img-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(4px, 0.5vw, 7px);
          height: var(--row-h);
        }

        .rlm-dot-img {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .rlm-img-card {
          cursor: pointer;
          overflow: hidden;
          border: 2px solid;
          border-radius: 8px;
          transition: border-color 0.15s, transform 0.1s;
          flex-shrink: 0;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .rlm-img-card:hover { transform: scale(1.02); }
        .rlm-img-card--locked { cursor: default; }
        .rlm-img-card--locked:hover { transform: none; }

        .rlm-img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ✕ badge */
        .rlm-badge {
          position: absolute;
          top: -8px; right: -8px;
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
          .rlm-grid { flex-direction: column; }
          .rlm-images-area { padding-left: 0; }
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">E</span>
          Read, look, and match.
        </h1>

        <div className="rlm-area" ref={containerRef}>
          <div className="rlm-grid">

            {/* ── Left: sentences (each row = --row-h) ── */}
            <div className="rlm-left-section">
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
                    </div>

                    {/* dot on the RIGHT edge of the sentence, same row height */}
                    <div className="rlm-dot-sentence-wrap">
                      <div
                        className="rlm-dot-sentence"
                        ref={(el) => { leftRefs.current[item.id] = el; }}
                        style={{ background: leftDotColor(item.id) }}
                        onClick={() => handleLeftClick(item.id)}
                      />
                      {isLeftWrong(item.id) && <div className="rlm-badge">✕</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: single column of images (each row = --row-h) ── */}
            <div className="rlm-images-area">
              {ALL_IMGS.map((item) => {
                const isLocked = showAns;
                return (
                  <div key={item.name} className="rlm-img-wrap">
                    {/* dot on LEFT edge of image */}
                    <div
                      className="rlm-dot-img"
                      ref={(el) => { rightRefs.current[item.name] = el; }}
                      style={{ background: rightDotColor(item.name) }}
                      onClick={() => handleRightClick(item.name)}
                    />

                    <div
                      className={["rlm-img-card", isLocked ? "rlm-img-card--locked" : ""].filter(Boolean).join(" ")}
                      style={{ borderColor:"transparent" }}
                      onClick={() => handleRightClick(item.name)}
                    >
                      <img src={item.src} alt={item.name} className="rlm-img" />
                    </div>

                    {isRightWrong(item.name) && (
                      <div className="rlm-badge" style={{ position: "relative", top: "unset", right: "unset", marginLeft: "4px" }}>✕</div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
          <svg className="rlm-svg">{renderLines()}</svg>
        </div>

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