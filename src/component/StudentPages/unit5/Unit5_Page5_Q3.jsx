import React, { useState, useRef, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 44/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd1pg20-story-adult-lady_Nf7yHD6t.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const CIRCLE_COLOR     = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const BULLET_COLOR     = "#2b2b2b";
const LIST_TEXT_COLOR  = "#2b2b2b";
const DRAG_HIGHLIGHT   = "rgba(239,68,68,0.12)";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and circle the prepositional phrases." },
  { start: 5.0,  end: 10.0, text: "On Tuesday, I cleaned the house." },
  { start: 10.0, end: 16.0, text: "I packed my old clothes and books into a box." },
  { start: 16.0, end: 22.0, text: "I washed the floors until they shined." },
  { start: 22.0, end: 28.0, text: "I dusted everything in the house." },
  { start: 28.0, end: 34.0, text: "I organized the books in the bookcase." },
  { start: 34.0, end: 42.0, text: "The windows were easy and only needed a little soap and water from a bucket." },
  { start: 42.0, end: 46.0, text: "The house looks great now." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARTS = [
  { type: "text",   value: "On Tuesday, I cleaned the house. I packed my old clothes and books " },
  { type: "phrase", id: 1, value: "into a box" },
  { type: "text",   value: ". I washed the floors " },
  { type: "phrase", id: 2, value: "until they shined" },
  { type: "text",   value: ". I dusted everything " },
  { type: "phrase", id: 3, value: "in the house" },
  { type: "text",   value: ". I organized the books " },
  { type: "phrase", id: 4, value: "in the bookcase" },
  { type: "text",   value: ". The windows were easy and only needed a little soap and water " },
  { type: "phrase", id: 5, value: "from a bucket" },
  { type: "text",   value: ". The house looks great now." },
];

const CORRECT_IDS = new Set([1, 2, 3, 4, 5]);

const PHRASE_LIST = [
  "until they shined",
  "from a bucket",
  "into a box",
  "in the bookcase",
  "in the house",
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCircle_QC() {
  const [circled,     setCircled]     = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
  const [dragging,    setDragging]    = useState(false);
  const [hovered,     setHovered]     = useState(null);

  const isLocked = showResults || showAns;

  // ── Mouse drag ──
  const handleMouseDown = useCallback((e) => {
    if (isLocked) return;
    e.preventDefault();
    setDragging(true);
  }, [isLocked]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setHovered(null);
  }, []);

  const handlePhraseEnter = useCallback((id) => {
    if (!dragging || isLocked) return;
    setHovered(id);
    setCircled((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  }, [dragging, isLocked]);

  // ── Touch drag ──
  const handleTouchMove = useCallback((e) => {
    if (!dragging || isLocked) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;
    const id = parseInt(el.dataset.phraseId);
    if (!id || isNaN(id)) return;
    setHovered(id);
    setCircled((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  }, [dragging, isLocked]);

  // ── Click toggle (tap without drag) ──
  const handlePhraseClick = useCallback((id) => {
    if (isLocked || dragging) return;
    setCircled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [isLocked, dragging]);

  // ── Button handlers ──
  const handleCheck = () => {
    if (isLocked) return;
    if (circled.size === 0) { ValidationAlert.info("Please circle at least one phrase."); return; }
    let score = 0;
    CORRECT_IDS.forEach((id) => { if (circled.has(id)) score++; });
    const total = CORRECT_IDS.size;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setCircled(new Set(CORRECT_IDS));
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setCircled(new Set());
    setShowResults(false);
    setShowAns(false);
    setDragging(false);
    setHovered(null);
  };

  // ── Phrase state ──
  const getPhraseState = (id) => {
    if (!circled.has(id)) return "idle";
    if (showAns)           return "correct";
    if (showResults)       return CORRECT_IDS.has(id) ? "correct" : "wrong";
    return "selected";
  };

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return <span key={i} className="lrc-text">{part.value}</span>;
    }

    const state      = getPhraseState(part.id);
    const isWrong    = state === "wrong";
    const isDragOver = dragging && hovered === part.id && !circled.has(part.id);

    return (
      <span
        key={part.id}
        data-phrase-id={part.id}
        className={[
          "lrc-phrase",
          state === "selected" ? "lrc-phrase--selected" : "",
          state === "correct"  ? "lrc-phrase--correct"  : "",
          state === "wrong"    ? "lrc-phrase--wrong"     : "",
          isDragOver           ? "lrc-phrase--dragover"  : "",
          isLocked             ? "lrc-phrase--locked"    : "",
        ].filter(Boolean).join(" ")}
        onMouseEnter={() => handlePhraseEnter(part.id)}
        onClick={() => handlePhraseClick(part.id)}
      >
        {part.value}
        {isWrong && <span className="lrc-badge">✕</span>}
      </span>
    );
  };

  return (
    <div
      className="main-container-component"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <style>{`
        .lrc-para {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.6;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
        }

        .lrc-text {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.6;
          white-space: pre-wrap;
          pointer-events: none;
        }

        /* ── Phrase oval ── */
        .lrc-phrase {
          position: relative;
          display: inline-block;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          cursor: crosshair;
          user-select: none;
          border: 2.5px solid transparent;
          border-radius: 999px;
          padding: 2px clamp(6px, 0.8vw, 10px);
          line-height: 2.0;
          transition: border-color 0.12s, background 0.12s;
          white-space: nowrap;
        }
        .lrc-phrase--locked    { cursor: default; }
        .lrc-phrase--dragover  { border-color: ${CIRCLE_COLOR}; background: ${DRAG_HIGHLIGHT}; }
        .lrc-phrase--selected,
        .lrc-phrase--correct   { border-color: ${CIRCLE_COLOR}; }
        .lrc-phrase--wrong     { border-color: ${WRONG_BADGE_BG}; }

        /* ✕ badge */
        .lrc-badge {
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

        /* ── Hint ── */
        .lrc-hint {
          font-size: clamp(11px, 1.3vw, 14px);
          color: #6b7280;
          font-style: italic;
          margin-top: -6px;
        }

        /* ── Bottom ── */
        .lrc-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        .lrc-list-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
        }

        .lrc-bullet {
          width: clamp(8px, 1vw, 11px);
          height: clamp(8px, 1vw, 11px);
          border-radius: 50%;
          background: ${BULLET_COLOR};
          flex-shrink: 0;
        }

        .lrc-list-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${LIST_TEXT_COLOR};
          line-height: 1.4;
        }

        .lrc-scene-img {
          width: clamp(120px, 18vw, 240px);
          height: auto;
          display: block;
          flex-shrink: 0;
          pointer-events: none;
        }

        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrc-bottom { grid-template-columns: 1fr; }
          .lrc-scene-img { width: clamp(100px, 40vw, 160px); margin: 0 auto; }
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
          Listen, read, and circle the prepositional phrases.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Hint ── */}
        <p className="lrc-hint">Drag or click on the phrases to circle them.</p>

        {/* ── Paragraph ── */}
        <div className="lrc-para">
          {PARTS.map((part, i) => renderPart(part, i))}
        </div>

        {/* ── Bottom ── */}
        <div className="lrc-bottom">
          <div className="lrc-list">
            {PHRASE_LIST.map((phrase) => (
              <div key={phrase} className="lrc-list-item">
                <div className="lrc-bullet" />
                <span className="lrc-list-text">{phrase}</span>
              </div>
            ))}
          </div>
          <img src={imgScene} alt="scene" className="lrc-scene-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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