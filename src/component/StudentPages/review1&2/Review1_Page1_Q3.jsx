import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 5.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd12pg16-instruction-adult-lady_gGpt9qB6.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_DEFAULT = "#2096a6";
const CIRCLE_WRONG   = "#ef4444";
const TEXT_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  paragraph broken into parts:
//  { type: "text", value } or { type: "choice", id, options: ["will","won't"], correct }
// ─────────────────────────────────────────────
const PARTS = [
  { type: "text", value: "Hansel " },
  { type: "choice", id: 1, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " go to the beach on Saturday. He " },
  { type: "choice", id: 2, options: ["won't", "will"], correct: "won't" },
  { type: "text", value: " lie in the sun. Harley " },
  { type: "choice", id: 3, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " go swimming in the sea. He " },
  { type: "choice", id: 4, options: ["won't", "will"], correct: "won't" },
  { type: "text", value: " stay near the shore when he swims. John will / " },
  { type: "choice", id: 5, options: ["will", "won't"], correct: "won't" },
  { type: "text", value: " fly a kite while at the beach. He " },
  { type: "choice", id: 6, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " sit in the sand while reading a book." },
];

const ALL_CHOICES = PARTS.filter((p) => p.type === "choice");

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadListenChoose_QC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleClick = (id, option) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [id]: prev[id] === option ? null : option }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ALL_CHOICES.every((c) => selected[c.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose an option for each blank."); return; }
    let score = 0;
    ALL_CHOICES.forEach((c) => { if (selected[c.id] === c.correct) score++; });
    setShowResults(true);
    if (score === ALL_CHOICES.length) ValidationAlert.success(`Score: ${score} / ${ALL_CHOICES.length}`);
    else if (score > 0)               ValidationAlert.warning(`Score: ${score} / ${ALL_CHOICES.length}`);
    else                              ValidationAlert.error(`Score: ${score} / ${ALL_CHOICES.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_CHOICES.forEach((c) => { filled[c.id] = c.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };
const captions = [
  {
    start: 0.20,
    end: 6.60,
    text: "Page 16, review one, exercise C. Read, listen, and choose.",
  },
  {
    start: 7.82,
    end: 10.10,
    text: "Hansel will go to the beach on Saturday.",
  },
  {
    start: 10.10,
    end: 13.22,
    text: "He won't lie in the sun.",
  },
  {
    start: 13.22,
    end: 15.30,
    text: "Harley will go swimming in the sea.",
  },
  {
    start: 15.30,
    end: 18.78,
    text: "He will stay near the shore when he swims.",
  },
  {
    start: 19.86,
    end: 22.74,
    text: "John won't fly a kite while at the beach.",
  },
  {
    start: 22.74,
    end: 25.92,
    text: "He will sit in the sand while reading a book.",
  },
];
  const getOptionState = (choice, option) => {
    const sel = selected[choice.id];
    if (sel !== option) return "idle";
    if (showAns)     return "correct";
    if (showResults) return option === choice.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return <span key={i} className="rlcq-text">{part.value}</span>;
    }

    // choice: render option1 / option2 inline
    return (
      <span key={part.id} className="rlcq-choice-group">
        {part.options.map((option, oi) => {
          const state = getOptionState(part, option);
          const isWrong = state === "wrong";

          return (
            <span key={option} className="rlcq-option-wrap">
              <span
                className={[
                  "rlcq-option",
                  state === "selected" ? "rlcq-option--selected" : "",
                  state === "correct"  ? "rlcq-option--correct"  : "",
                  state === "wrong"    ? "rlcq-option--wrong"    : "",
                  isLocked ? "rlcq-option--locked" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleClick(part.id, option)}
              >
                {option}
                {isWrong && <span className="rlcq-badge">✕</span>}
              </span>
              {oi < part.options.length - 1 && (
                <span className="rlcq-slash"> / </span>
              )}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: image + paragraph ── */
        .rlcq-top {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .rlcq-img {
          width: 100%;
    height: 100%;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* Paragraph */
        .rlcq-para {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.2;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-text {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.2;
          white-space: pre-wrap;
        }

        /* Choice group */
        .rlcq-choice-group {
          display: inline-flex;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-option-wrap {
          display: inline-flex;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-slash {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          font-weight: 700;
        }

        /* Clickable option */
        .rlcq-option {
          position: relative;
          display: inline-block;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${TEXT_COLOR};
          cursor: pointer;
          user-select: none;
          padding: 0 clamp(3px, 0.4vw, 5px);
          border-radius: 999px;
          border: 2px solid transparent;
          line-height: 1.6;
          transition: border-color 0.15s, color 0.15s;
        }
        .rlcq-option--locked { cursor: default; }

        /* States */
        .rlcq-option--selected { border-color: ${CIRCLE_DEFAULT};  }
        .rlcq-option--wrong    { border-color: ${CIRCLE_WRONG};     }

        /* ✕ badge */
        .rlcq-badge {
          position: absolute;
          top: -8px; right: -6px;
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
        .rlcq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlcq-top { grid-template-columns: 1fr; }
          .rlcq-img { width: 100%; }
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
          Read, listen, and choose.
        </h1>
     <div style={{margin:"3em 0 2em"}} >
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={7}
        />
      </div>
        {/* ── Image + Paragraph ── */}
        <div className="rlcq-top">
          <img src={imgScene} alt="beach" className="rlcq-img" />
          <div className="rlcq-para">
            {PARTS.map((part, i) => renderPart(part, i))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="rlcq-buttons">
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