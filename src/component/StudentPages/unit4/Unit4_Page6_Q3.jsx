import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd5pg8-instruction1-adult-lady_YJxh5Hg5.mp3";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR     = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const TEXT_DEFAULT     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  🔊  CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.26,  end: 5.84,  text: "Page eight, write activities, exercise C. Listen, read, and number." },
  { start: 7.36,  end: 10.48, text: "Tim will visit the new Museum of Inventions tomorrow." },
  { start: 10.48, end: 13.52, text: "He will take his little brother and friend with him." },
  { start: 13.52, end: 18.56, text: "They will take a bus at eight o'clock and arrive at the museum at nine o'clock." },
  { start: 18.56, end: 21.92, text: "Tim will pack a lunch in case they get hungry." },
  { start: 21.92, end: 28.00, text: "He will have to remember to take his camera with him so he can take pictures in the museum." },
  { start: 28.00, end: 32.68, text: "Tim is certain they will have a lot of fun at the museum tomorrow." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, words: ["smallest", "shortest", "heaviest"], correct: "smallest"  },
  { id: 2, words: ["taller",   "wider",    "healthier"], correct: "healthier" },
  { id: 3, words: ["tiniest",  "kindest",  "friendliest"], correct: "kindest" },
  { id: 4, words: ["younger",  "fatter",   "harder"],    correct: "fatter"    },
  { id: 5, words: ["tallest",  "thinnest", "widest"],    correct: "thinnest"  },
  { id: 6, words: ["braver",   "softer",   "lighter"],   correct: "braver"    },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ListenReadCircle_QG() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, word) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === word ? null : word }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please circle a word for each question."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const getWordState = (item, word) => {
    const isSel = selected[item.id] === word;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (showResults) return item.correct === word ? "correct" : "wrong";
    return "selected";
  };

  // عمودين: فردي يسار، زوجي يمين
  const leftItems  = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => (
    <div key={item.id} className="lrc-row">
      <span className="lrc-num">{item.id}</span>
      <div className="lrc-words">
        {item.words.map((word) => {
          const state = getWordState(item, word);
          return (
            <div
              key={word}
              className={[
                "lrc-word-wrap",
                isLocked ? "lrc-word-wrap--locked" : "",
                state === "selected" ? "lrc-word-wrap--selected" : "",
                state === "correct"  ? "lrc-word-wrap--correct"  : "",
                state === "wrong"    ? "lrc-word-wrap--wrong"    : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleSelect(item.id, word)}
            >
              <div className="lrc-oval" />
              <span className="lrc-word">{word}</span>
              {state === "wrong" && <div className="lrc-badge">✕</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Grid عمودين ── */
        .lrc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 24px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف واحد ── */
        .lrc-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 14px);
        }

        .lrc-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        /* الكلمات في صف أفقي */
        .lrc-words {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        /* كلمة واحدة */
        .lrc-word-wrap {
          position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 5px) clamp(8px, 1.2vw, 14px);
          cursor: pointer;
          user-select: none;
        }
        .lrc-word-wrap--locked { cursor: default; }

        /* الدائرة البيضاوية */
        .lrc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        .lrc-word-wrap--selected .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--correct  .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--wrong    .lrc-oval { border-color: ${CIRCLE_WRONG}; }

        .lrc-word {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          line-height: 1.4;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

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

        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
        }

        @media (max-width: 560px) {
          .lrc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">G</span>
          Listen, read, and circle.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "5em" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={6}
          />
        </div>

        {/* ── Grid ── */}
        <div className="lrc-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,24px)" }}>
            {leftItems.map(renderItem)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,24px)" }}>
            {rightItems.map(renderItem)}
          </div>
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