import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 14.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR    = "#e53935";
const CROSS_COLOR    = "#e53935";
const BOX_BORDER     = "#2195a6";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR   = "#2b2b2b";
const PARA_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Darren is going to the United Kingdom for the summer. He hopes to visit many places while he's there. He plans to take a tour of the English countryside first. Next, he is going to see Buckingham Palace. He will make sure to take his camera with him, so he can take lots of pictures. He is going to take a tour of London in a double-decker bus. Lastly, he is going to visit the Clock Tower.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctBox: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "Darren is going to take a tour of the English countryside.", correctBox: "check" },
  { id: 2, sentence: "He isn't going to visit Buckingham Palace.",                  correctBox: "cross" },
  { id: 3, sentence: "He is going to take a tour of London in a double-decker bus.", correctBox: "check" },
  { id: 4, sentence: "First, he will visit the Clock Tower.",                       correctBox: "cross" },
  { id: 5, sentence: "He is going to take his camera with him.",                    correctBox: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadWriteCheckCross_QC() {
  // selected: { itemId: "check" | "cross" | null }
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, box) => {
    if (isLocked) return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === box ? null : box,
    }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose ✓ or ✕ for each sentence."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correctBox) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctBox; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // Get box state for a specific box type ("check"/"cross") for an item
  const getBoxState = (item, box) => {
    const sel = selected[item.id];
    const isActive = sel === box;
    if (!isActive) return "idle";
    if (showAns) return "correct";
    if (showResults) return item.correctBox === box ? "correct" : "wrong";
    return "selected";
  };

  const getBoxSymbol = (box) => box === "check" ? "✓" : "✕";

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrcc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .lrcc-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          text-indent: clamp(14px, 1.8vw, 22px);
          margin: 0;
        }

        .lrcc-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* Single row: num | sentence | boxes */
        .lrcc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Two boxes */
        .lrcc-boxes {
          display: flex;
          gap: clamp(5px, 0.7vw, 9px);
          flex-shrink: 0;
        }

        /* Single box */
        .lrcc-box {
          width: clamp(40px, 4.6vw, 40px);
          height: clamp(40px, 4.6vw, 40px);
          border: 2px solid ${BOX_BORDER};
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 2.2vw, 28px);
          font-weight: 700;
          cursor: pointer;
          user-select: none;
          color: transparent;
          position: relative;
          transition: border-color 0.15s;
        }
        .lrcc-box--locked { cursor: default; }

        /* States */
        .lrcc-box--selected-check { color: ${CHECK_COLOR}; }
        .lrcc-box--selected-cross { color: ${CROSS_COLOR}; }
        .lrcc-box--correct        { color: ${CHECK_COLOR};  }
        .lrcc-box--wrong          { color: ${WRONG_BADGE_BG};  }

        /* ✕ wrong badge */
        .lrcc-wrong-badge {
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
          z-index: 2;
        }

        /* Buttons */
        .lrcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrcc-top { grid-template-columns: 1fr; }
          .lrcc-img { width: 100%; }
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
          <span className="WB-ex-A">C</span>
          Listen, read, and write <span style={{ color: "#ff0000ff" }}> ✓</span> or<span style={{ color: "#ff0000ff" }}> ✕</span>.
        </h1>

        {/* ── Paragraph + Image ── */}
        <div className="lrcc-top">
          <p className="lrcc-para">{PARAGRAPH}</p>
          <img src={imgScene} alt="london" className="lrcc-img" />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrcc-row">

              {/* Number */}
              <span className="lrcc-num">{item.id}</span>

              {/* Sentence */}
              <span className="lrcc-sentence">{item.sentence}</span>

              {/* Two boxes: ✓ and ✕ */}
              <div className="lrcc-boxes">
                {["check", "cross"].map((box) => {
                  const state = getBoxState(item, box);
                  const sym   = getBoxSymbol(box);

                  const cls = [
                    "lrcc-box",
                    isLocked ? "lrcc-box--locked" : "",
                    state === "selected" && box === "check" ? "lrcc-box--selected-check" : "",
                    state === "selected" && box === "cross" ? "lrcc-box--selected-cross" : "",
                    state === "correct"  ? "lrcc-box--correct" : "",
                    state === "wrong"    ? "lrcc-box--wrong"   : "",
                  ].filter(Boolean).join(" ");

                  return (
                    <div
                      key={box}
                      className={cls}
                      onClick={() => handleSelect(item.id, box)}
                    >
                      {state !== "idle" ? sym : ""}
                      {state === "wrong" && <div className="lrcc-wrong-badge">✕</div>}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcc-buttons">
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