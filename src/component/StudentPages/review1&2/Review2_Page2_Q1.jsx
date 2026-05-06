import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img1b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img2a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img2b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img3a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img3b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img4a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img4b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR      = "#e53935";
const CROSS_COLOR      = "#e53935";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const PARA_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `It's Tuesday morning. John is going to school at half past eight. He is going to wear an orange shirt and black pants. He isn't going to wear a cap. He isn't going to ride his bike to school. He is going to take a bus. After school, he isn't going to watch TV. He's going to do his homework.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctSide: "a" = left image gets ✓
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, imgA: img1a, imgB: img1b, correctSide: "b" },
  { id: 2, imgA: img2a, imgB: img2b, correctSide: "a" },
  { id: 3, imgA: img3a, imgB: img3b, correctSide: "b" },
  { id: 4, imgA: img4a, imgB: img4b, correctSide: "b" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadListenWriteCheckCross_QD() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, side) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === side ? null : side }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose a picture for each question."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correctSide) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctSide; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // Get symbol for a side
  const getSymbol = (item, side) => {
    const sel = selected[item.id];
    if (!sel) return null;
    if (showAns)     return side === item.correctSide ? "✓" : "✕";
    if (showResults) return side === sel ? (sel === item.correctSide ? "✓" : "✕") : null;
    // before check: selected = ✓, other = ✕
    return side === sel ? "✓" : "✕";
  };

  const isSymbolWrong = (item, side) => {
    if (!showResults || showAns) return false;
    return selected[item.id] === side && side !== item.correctSide;
  };

  const getSymbolColor = (item, side) => {
    const sym = getSymbol(item, side);
    if (!sym) return "#2b2b2b";
    if (showAns || showResults) return side === item.correctSide ? CHECK_COLOR : CROSS_COLOR;
    return sym === "✓" ? CHECK_COLOR : CROSS_COLOR;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph ── */
        .rlwcd-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          margin: 0;
        }

        /* ── 2×2 grid ── */
        .rlwcd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 1.8vw, 24px) clamp(16px, 2.4vw, 32px);
          width: 100%;
        }

        /* Single card */
        .rlwcd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px;
        }

        .rlwcd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Two images side by side */
        .rlwcd-imgs {
          display: flex;
          gap: clamp(3px, 0.4vw, 6px);
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid #e0e0e0;
        }

        /* Single image half */
        .rlwcd-img-wrap {
          position: relative;
          flex: 1;
          cursor: pointer;
          user-select: none;
          height : 100% ;      

        }
        .rlwcd-img-wrap--locked { cursor: default; }

        .rlwcd-img {
          width: 100%;
          height: 100% ;
         object-fit: cover;
          display: block;
        }

        /* Symbol box — bottom corner */
        .rlwcd-symbol {
          position: absolute;
          bottom: 0;
          width: clamp(28px, 3.6vw, 44px);
          height: clamp(28px, 3.6vw, 44px);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(15px, 2vw, 26px);
          font-weight: 700;
          z-index: 2;
        }

        /* Left image: symbol on bottom-right */
        .rlwcd-img-wrap:first-child .rlwcd-symbol {
          right: 0;
          border-radius: 8px 0 0 0;
          border-top: 2px solid #ccc;
          border-left: 2px solid #ccc;
        }

        /* Right image: symbol on bottom-left */
        .rlwcd-img-wrap:last-child .rlwcd-symbol {
          left: 0;
          border-radius: 0 8px 0 0;
          border-top: 2px solid #ccc;
          border-right: 2px solid #ccc;
        }

        /* ✕ wrong badge */
        .rlwcd-badge {
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

        /* Buttons */
        .rlwcd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rlwcd-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">D</span>
          Read, listen, and write ✓ and ✕.
        </h1>

        {/* ── Paragraph ── */}
        <p className="rlwcd-para">{PARAGRAPH}</p>

        {/* ── 2×2 grid ── */}
        <div className="rlwcd-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwcd-card">
              <span className="rlwcd-num">{item.id}</span>
              <div className="rlwcd-imgs">
                {(["a", "b"]).map((side) => {
                  const src    = side === "a" ? item.imgA : item.imgB;
                  const sym    = getSymbol(item, side);
                  const color  = getSymbolColor(item, side);
                  const wrong  = isSymbolWrong(item, side);

                  return (
                    <div
                      key={side}
                      className={`rlwcd-img-wrap${isLocked ? " rlwcd-img-wrap--locked" : ""}`}
                      onClick={() => handleSelect(item.id, side)}
                    >
                      <img src={src} alt={`${item.id}${side}`} className="rlwcd-img" />
                      <div className="rlwcd-symbol" style={{ color , height : "100%" }}>
                        {sym || ""}
                        {wrong && <div className="rlwcd-badge">✕</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwcd-buttons">
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