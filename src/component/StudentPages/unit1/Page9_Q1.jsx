import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 24.svg";
import img1b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 23.svg";
import img2a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 22.svg";
import img2b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 21.svg";
import img3a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 20.svg";
import img3b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 19.svg";
import img4a from"../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 18.svg";
import img4b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 17.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR    = "#e53935";
const CROSS_COLOR    = "#e53935";
const IMG_BORDER     = "#d0d0d0";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR   = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctSide: "a"=left image gets ✓, "b"=right image gets ✓
//  The other image gets ✕
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "Sarah will go to the beach tomorrow.", imgA: img1a, imgB: img1b, correctSide: "a" },
  { id: 2, sentence: "Stella will study for her test.",       imgA: img2a, imgB: img2b, correctSide: "b" },
  { id: 3, sentence: "They will eat at a restaurant.",        imgA: img3a, imgB: img3b, correctSide: "a" },
  { id: 4, sentence: "They will watch a movie at the cinema.", imgA: img4a, imgB: img4b, correctSide: "a" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheckCross_QD() {
  // selected: { itemId: "a" | "b" | null }
  // The student clicks one image to assign ✓ — the other automatically gets ✕
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, side) => {
    if (isLocked) return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === side ? null : side,
    }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose a picture for each sentence."); return; }
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

  // Get what symbol to show on each image
  const getSymbol = (item, side) => {
    const sel = selected[item.id];
    if (!sel) return null; // nothing selected yet

    if (showAns) {
      return side === item.correctSide ? "✓" : "✕";
    }
    if (showResults) {
      if (side === sel) {
        return sel === item.correctSide ? "✓" : "✕";
      }
      // the unselected side — show ✓ if it's the correct one after wrong selection
      if (sel !== item.correctSide && side === item.correctSide) return null;
      return null;
    }
    // before check: selected side gets ✓, other gets ✕
    return side === sel ? "✓" : "✕";
  };

  const getSymbolColor = (item, side) => {
    const sym = getSymbol(item, side);
    if (!sym) return CHECK_COLOR;
    if (showResults || showAns) {
      return side === item.correctSide ? CHECK_COLOR : CROSS_COLOR;
    }
    return sym === "✓" ? CHECK_COLOR : CROSS_COLOR;
  };

  const isWrongSelected = (item, side) => {
    if (!showResults || showAns) return false;
    return selected[item.id] === side && side !== item.correctSide;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Items list ── */
        .rlcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* Single row: images-pair | num + sentence */
        .rlcc-row {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
        }

        /* Left: two images side by side */
        .rlcc-imgs {
          display: flex;
          gap: clamp(4px, 0.6vw, 8px);
          flex-shrink: 0;
        }

        .rlcc-img-wrap {
          position: relative;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
          width: clamp(100px, 14vw, 180px);
        }
        .rlcc-img-wrap--locked { cursor: default; }

        .rlcc-img {
          width: 100%;
          object-fit: cover;
          display: block;
                    height : auto

        }

        /* Symbol box — bottom right corner, square */
        .rlcc-symbol {
          position: absolute;
          bottom: 0;
          right: 0;
          width: clamp(24px, 3.2vw, 38px);
          height: clamp(24px, 3.2vw, 38px);
          border-radius: 8px 0 8px 0;
          background: #fff;
          border-top: 2px solid #2195a6;
          border-left: 2px solid #2195a6;
          border-right: 2px solid #2195a6;
          border-bottom: 2px solid #2195a6;

          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.8vw, 22px);
          font-weight: 700;
          line-height: 1;
          z-index: 2;
        }

        /* ✕ wrong badge */
        .rlcc-wrong-badge {
          position: absolute;
          top: -10px; right: 25px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
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

        /* Right: number + sentence */
        .rlcc-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px;
          min-width: 0;
        }

        .rlcc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .rlcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlcc-row { grid-template-columns: 1fr; }
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
          Read, look, and write<span className="text-[#ff0000ff] font-bold"> ✓ </span>and<span className="text-[#ff0000ff] font-bold"> ✕</span>.
        </h1>

        {/* ── Items ── */}
        <div className="rlcc-list" style={{margin : "1% 0"}} >
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc-row">

              {/* Two images */}
              <div className="rlcc-imgs">
                {["a", "b"].map((side) => {
                  const sym   = getSymbol(item, side);
                  const color = getSymbolColor(item, side);
                  const wrong = isWrongSelected(item, side);
                  const src   = side === "a" ? item.imgA : item.imgB;

                  return (
                    <div
                      key={side}
                      className={`rlcc-img-wrap${isLocked ? " rlcc-img-wrap--locked" : ""}`}
                      onClick={() => handleSelect(item.id, side)}
                    >
                      <img src={src} alt={`${item.id}${side}`} className="rlcc-img" />
                      <div className="rlcc-symbol" style={{ color: sym ? color : "transparent" }}>
                        {sym || ""}
                        {wrong && <div className="rlcc-wrong-badge">✕</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Number + Sentence */}
              <div className="rlcc-right">
                <span className="rlcc-num" style={{  fontSize: "clamp(15px, 1.8vw, 22px);",
          fontWeight: "700",
          color:` ${NUMBER_COLOR}`,
          lineHeight:" 1.5", 
          marginRight : "5px"}}>{item.id}</span>
                <span className="rlcc-sentence">{item.sentence}</span>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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