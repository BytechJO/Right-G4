import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🔊 AUDIO
// ─────────────────────────────────────────────
import sound from "../../../assets/audio/ClassBook/Grade 4/cd50pg80-instruction-adult-lady_AZOJpQPx.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const OPTION_LABEL_CLR = "#2b2b2b";
const CIRCLE_SELECTED  = "#2195a6";
const CIRCLE_CORRECT   = "#2195a6";
const CIRCLE_WRONG     = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.38,
    end: 2.90,
    text: "Page 80. Write activities.",
  },
  {
    start: 2.90,
    end: 7.10,
    text: "Exercise C. Listen, read, and circle.",
  },
  {
    start: 7.10,
    end: 12.14,
    text: "My brother doesn't like haunted houses because he's afraid of ghosts.",
  },
  {
    start: 12.14,
    end: 15.54,
    text: "Sandra plays the piano because she likes music.",
  },
  {
    start: 15.54,
    end: 19.70,
    text: "William doesn't eat burgers because he doesn't like meat.",
  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    stem:    "My brother doesn't like haunted houses because ...",
    correct: "a",
    options: [
      { label: "a", text: "he's afraid of ghosts."  },
      { label: "b", text: "he's afraid of cobwebs." },
    ],
  },
  {
    id:      2,
    stem:    "Sandra plays the piano because ...",
    correct: "b",
    options: [
      { label: "a", text: "she likes pianos." },
      { label: "b", text: "she likes music."  },
    ],
  },
  {
    id:      3,
    stem:    "William doesn't eat burgers because ...",
    correct: "a",
    options: [
      { label: "a", text: "he doesn't like meat."  },
      { label: "b", text: "he doesn't like bread." },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCircle_QC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, label) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: label }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setSelected({}); setShowResults(false); setShowAns(false);
  };

  const getState = (item, label) => {
    const sel = selected[item.id];
    if (sel !== label) return "idle";
    if (showAns)       return "correct";
    if (showResults)   return label === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderOption = (item, opt) => {
    const state   = getState(item, opt.label);
    const isWrong = state === "wrong";
    let bd = "transparent";
    if (state === "selected") bd = CIRCLE_SELECTED;
    if (state === "correct")  bd = CIRCLE_CORRECT;
    if (state === "wrong")    bd = CIRCLE_WRONG;

    return (
      <div
        key={opt.label}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "clamp(4px,0.5vw,7px)",
          border: `2px solid ${bd}`,
          borderRadius: "999px",
          padding: "clamp(3px,0.4vw,6px) clamp(12px,1.5vw,20px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          whiteSpace: "nowrap",
        }}
        onClick={() => handleSelect(item.id, opt.label)}
      >
        <span style={{ fontSize: "clamp(13px,1.5vw,18px)", fontWeight: 700, color: OPTION_LABEL_CLR, lineHeight: 1 }}>
          {opt.label}
        </span>
        <span style={{ fontSize: "clamp(13px,1.5vw,18px)", color: TEXT_COLOR, lineHeight: 1 }}>
          {opt.text}
        </span>
        {isWrong && (
          <div style={{
            position: "absolute", top: -7, right: -7,
            width: "clamp(14px,1.6vw,18px)", height: "clamp(14px,1.6vw,18px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px,0.8vw,10px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 38px);
          width: 100%;
        }

        .lrcc-item {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Stem row */
        .lrcc-stem-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrcc-stem {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        /* Options row: a | b — grid for vertical alignment across all questions */
        .lrcc-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(16px, 2.4vw, 32px);
          padding-left: clamp(22px, 3vw, 36px);
        }

        .lrcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
          Listen, read, and circle.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrcc-item">

              {/* Stem */}
              <div className="lrcc-stem-row">
                <span className="lrcc-num">{item.id}</span>
                <span className="lrcc-stem">{item.stem}</span>
              </div>

              {/* Options */}
              <div className="lrcc-options">
                {item.options.map((opt) => renderOption(item, opt))}
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