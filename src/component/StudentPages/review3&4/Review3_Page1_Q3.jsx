import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 4.svg";

// 🔊 AUDIO
import sound from "../../../assets/audio/ClassBook/Grade 4/cd5pg8-instruction1-adult-lady_YJxh5Hg5.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER       = "#2195a6";
const BOX_BG           = "#ffffff";
const WRONG_BADGE_BG   = "#ff0000ff";
const WRONG_BADGE_TEXT = "#ffffff";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and write check and X." },
  { start: 5.0,  end: 9.0,  text: "They had a large house." },
  { start: 9.0,  end: 13.0, text: "She had a white rabbit." },
  { start: 13.0, end: 17.0, text: "We had a nice breakfast." },
  { start: 17.0, end: 21.0, text: "He had a colorful scooter." },
];

const ITEMS = [
  {
    id:          1,
    src:         img1,
    leftText:    "They had a large house.",
    rightText:   "They had a large swimming pool.",
    correctSide: "left",
  },
  {
    id:          2,
    src:         img2,
    leftText:    "She had a white rabbit.",
    rightText:   "She had a white cat.",
    correctSide: "left",
  },
  {
    id:          3,
    src:         img3,
    leftText:    "We had a nice breakfast.",
    rightText:   "We had a nice coffee break.",
    correctSide: "left",
  },
  {
    id:          4,
    src:         img4,
    leftText:    "We had a nice party.",
    rightText:   "He had a colorful scooter.",
    correctSide: "right",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadWriteCheckCross_QC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, side) => {
    if (isLocked) return;
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === side ? null : side,
    }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose an answer for each question."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correctSide) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
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

  const getBoxState = (item, side) => {
    const sel = selected[item.id];
    if (sel !== side) return "empty";
    if (showAns)      return "correct";
    if (showResults)  return side === item.correctSide ? "correct" : "wrong";
    return "checked";
  };

  const renderCheckbox = (item, side) => {
    const state   = getBoxState(item, side);
    const checked = state !== "empty";
    const wrong   = state === "wrong";

    return (
      <div
        className={[
          "lrcc-box",
          checked  ? "lrcc-box--checked" : "",
          wrong    ? "lrcc-box--wrong"   : "",
          isLocked ? "lrcc-box--locked"  : "",
        ].filter(Boolean).join(" ")}
        onClick={() => handleSelect(item.id, side)}
      >
        {checked && <span className="lrcc-checkmark">✓</span>}
        {wrong   && <div className="lrcc-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`

        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* 5-column grid: [num+text] [□] [img] [□] [text] */
        .lrcc-row {
          display: grid;
          grid-template-columns: 1fr clamp(26px,3vw,36px) clamp(90px,12vw,150px) clamp(26px,3vw,36px) 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Left cell */
        .lrcc-left {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .lrcc-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        .lrcc-left .lrcc-text { text-align: right; }

        /* Right cell */
        .lrcc-right {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .lrcc-right .lrcc-text { text-align: left; }

        /* Image */
        .lrcc-img {
          width: 100%;
          height: clamp(90px, 12vw, 150px);
          object-fit: cover;
          border-radius: 14px;
          display: block;
        }

        /* Checkbox */
        .lrcc-box {
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
          justify-self: center;
        }
        .lrcc-box--locked  { cursor: default; }

        .lrcc-checkmark {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${CHECK_COLOR};
          line-height: 1;
        }

        /* ✕ badge */
        .lrcc-badge {
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

        .lrcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrcc-row {
            grid-template-columns: 1fr clamp(22px,6vw,28px) clamp(70px,20vw,100px) clamp(22px,6vw,28px) 1fr;
            gap: 5px;
          }
          .lrcc-text { font-size: 11px; }
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
          <span className="WB-ex-A-1">C</span>
          Listen, read, and write ✓ and ✕.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={5}
          />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrcc-row">

              {/* Col 1: num + text */}
              <div className="lrcc-left">
                <span className="lrcc-num">{item.id}</span>
                <span className="lrcc-text">{item.leftText}</span>
              </div>

              {/* Col 2: left checkbox */}
              {renderCheckbox(item, "left")}

              {/* Col 3: image */}
              <img src={item.src} alt={`img-${item.id}`} className="lrcc-img" />

              {/* Col 4: right checkbox */}
              {renderCheckbox(item, "right")}

              {/* Col 5: text */}
              <div className="lrcc-right">
                <span className="lrcc-text">{item.rightText}</span>
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