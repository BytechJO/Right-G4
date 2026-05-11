import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 46.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 47.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 48.svg";
import img4 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 45.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER       = "#2195a6";
const BOX_BG           = "#ffffff";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctRow: "top" | "bottom"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:         1,
    src:        img1,
    emoji:      "😊",
    topText:    "She should build a snowman.",
    bottomText: "She shouldn't build a snowman.",
    correctRow: "top",
  },
  {
    id:         2,
    src:        img2,
    emoji:      "😢",
    topText:    "He should swim in the sea.",
    bottomText: "He shouldn't swim in the sea.",
    correctRow: "top",
  },
  {
    id:         3,
    src:        img3,
    emoji:      "😢",
    topText:    "Hansel should eat ice cream now.",
    bottomText: "Hansel shouldn't eat ice cream now.",
    correctRow: "bottom",
  },
  {
    id:         4,
    src:        img4,
    emoji:      "😊",
    topText:    "She should take a picture.",
    bottomText: "She shouldn't take a picture.",
    correctRow: "bottom",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteCheck_QB() {
  const [selected,    setSelected]    = useState({});   // { 1: "top" | "bottom", ... }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, row) => {
    if (isLocked) return;
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === row ? null : row,
    }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please choose an answer for each question.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (selected[item.id] === item.correctRow) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctRow; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const getBoxState = (item, row) => {
    const sel = selected[item.id];
    if (sel !== row)  return "empty";
    if (showAns)      return "correct";
    if (showResults)  return row === item.correctRow ? "correct" : "wrong";
    return "checked";
  };

  const renderCheckbox = (item, row) => {
    const state   = getBoxState(item, row);
    const checked = state !== "empty";
    const wrong   = state === "wrong";

    return (
      <div
        className={[
          "lrwc-box",
          checked  ? "lrwc-box--checked" : "",
          wrong    ? "lrwc-box--wrong"   : "",
          isLocked ? "lrwc-box--locked"  : "",
        ].filter(Boolean).join(" ")}
        onClick={() => handleSelect(item.id, row)}
      >
        {checked && <span className="lrwc-checkmark">✓</span>}
        {wrong   && <div className="lrwc-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2-column grid for items ── */
        .lrwc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px);
          width: 100%;
        }

        /* Single card */
        .lrwc-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
          width: 80%;

        }

        /* Image + emoji badge */
        .lrwc-img-wrap {
          position: relative;
          width: 100%;
        }

        .lrwc-img {
          width: 100%;
          height:auto;
          object-fit: cover;
          display: block;
        }

        .lrwc-emoji {
          position: absolute;
          bottom: 6px;
          right: 10px;
          font-size: clamp(18px, 2.4vw, 30px);
          line-height: 1;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.25));
          pointer-events: none;
          user-select: none;
        }

        /* Number label above image */
        .lrwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          margin-bottom: 2px;
          margin-right: 2px;

        }

        /* Rows area */
        .lrwc-rows {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 14px);
        }

        /* Single text row: text + checkbox */
        .lrwc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .lrwc-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          flex: 1;
        }

        /* Checkbox */
        .lrwc-box {
          position: relative;
          width: clamp(24px, 2.8vw, 34px);
          height: clamp(24px, 2.8vw, 34px);
          border: 2px solid ${BOX_BORDER};
          border-radius: 7px;
          background: ${BOX_BG};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: border-color 0.15s;
          user-select: none;
        }
        .lrwc-box--locked  { cursor: default; }

        .lrwc-checkmark {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${CHECK_COLOR};
          line-height: 1;
        }

        /* ✕ badge */
        .lrwc-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 17px);
          height: clamp(14px, 1.6vw, 17px);
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

        .lrwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A-1">B</span>
          Look, read, and write ✓.
        </h1>

        {/* ── 2×2 Grid ── */}
        <div className="lrwc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwc-card">

              {/* Number */}
              <div className="lrwc-img-wrap"  style={{ display: "flex", flexDirection : "row", marginLeft : "-0.8em" }}>
              <span  className="lrwc-num">{item.id}</span>

              {/* Image + emoji */}
                <img src={item.src} alt={`img-${item.id}`} className="lrwc-img" />
              </div>

              {/* Two text rows with checkboxes */}
              <div className="lrwc-rows">
                <div className="lrwc-row">
                  <span className="lrwc-text">{item.topText}</span>
                  {renderCheckbox(item, "top")}
                </div>
                <div className="lrwc-row">
                  <span className="lrwc-text">{item.bottomText}</span>
                  {renderCheckbox(item, "bottom")}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwc-buttons">
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