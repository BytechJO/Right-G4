import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd35pg51-instruction1-adult-lady_kVi5vPgK.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.08,
    end: 6.88,
    text: "Page 51, Write Activities, Exercise D. Listen, read, and complete the story.",
  },
  {
    start: 6.88,
    end: 9.78,
    text: "Thomas is going on a camping trip tomorrow.",
  },
  {
    start: 9.78,
    end: 15.20,
    text: "He will take his sleeping bag and tent, so he'll be comfortable when he sleeps.",
  },
  {
    start: 16.30,
    end: 19.20,
    text: "He will also take his boots for hiking in the woods.",
  },
  {
    start: 19.20,
    end: 24.88,
    text: "Thomas will be careful when starting a campfire, and he won't leave a fire unattended.",
  },
  {
    start: 25.94,
    end: 34.60,
    text: "He won't leave food out, as bears sometimes walk around in the woods looking for food. He won't leave any trash or litter on the ground.",
  },
  {
    start: 34.60,
    end: 39.38,
    text: "It can get very dark at night, so he will be sure to bring a flashlight.",
  },
];
// ─────────────────────────────────────────────
//  📝  LINES DATA
//  كل سطر: مصفوفة من parts
//  { t: "text", v: "..." } | { t: "input", id, correct, answer }
// ─────────────────────────────────────────────
const LINES = [
  // سطر 1 — نص عادي بدون input
  [{ t: "text", v: "Thomas is going on a camping trip tomorrow." }],

  // سطر 2
  [
    { t: "text", v: "He " },
    { t: "input", id: 1, correct: ["should"], answer: "should" },
    { t: "text", v: " take his sleeping bag and" },
  ],

  // سطر 3
  [{ t: "text", v: "tent, so he'll be comfortable when he sleeps. He" }],

  // سطر 4
  [
    { t: "input", id: 2, correct: ["should"], answer: "should" },
    { t: "text", v: " also take his boots for hiking in" },
  ],

  // سطر 5
  [
    { t: "text", v: "the woods. Thomas " },
    { t: "input", id: 3, correct: ["should"], answer: "should" },
    { t: "text", v: " be careful" },
  ],

  // سطر 6
  [
    { t: "text", v: "when starting a campfire, and he " },
    { t: "input", id: 4, correct: ["shouldn't","shouldnt","should not"], answer: "shouldn't" },
  ],

  // سطر 7
  [{ t: "text", v: "leave a fire unattended." }],

  // سطر 8 (فراغ / مسافة)
  [{ t: "text", v: "" }],

  // سطر 9
  [
    { t: "text", v: "He" },
    { t: "input", id: 5, correct: ["shouldn't","shouldnt","should not"], answer: "shouldn't" },
    { t: "text", v: "leave food out as bears sometimes walk around in the woods looking for" },
  ],

  // سطر 10
  [
    { t: "text", v: "food. He" },
    { t: "input", id: 6, correct: ["shouldn't","shouldnt","should not"], answer: "shouldn't" },
    { t: "text", v: "leave any trash or litter on the ground. It can get very dark at night," },
  ],

  // سطر 11
  [
    { t: "text", v: "so he " },
    { t: "input", id: 7, correct: ["should"], answer: "should" },
    { t: "text", v: " be sure to bring a flashlight." },
  ],
];

const ALL_INPUTS = LINES.flat().filter((p) => p.t === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCompleteStory_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const part = ALL_INPUTS.find((p) => p.id === id);
    if (showResults && part && isCorrect(answers[id] || "", part.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all blanks first."); return; }
    let score = 0;
    ALL_INPUTS.forEach((p) => { if (isCorrect(answers[p.id] || "", p.correct)) score++; });
    const total = ALL_INPUTS.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((p) => { filled[p.id] = p.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongPart    = (p) => showResults && !showAns && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) => showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  const renderPart = (part, i) => {
    if (part.t === "text") {
      return <span key={i} className="lrcs-text">{part.v}</span>;
    }

    const wrong    = isWrongPart(part);
    const disabled = isDisabledPart(part);
    const value    = answers[part.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="lrcs-input-wrap">
        <input
          type="text"
          className={[
            "lrcs-input",
            wrong   ? "lrcs-input--wrong"  : "",
            showAns ? "lrcs-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.id, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="lrcs-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: text lines col | image col ── */
        .lrcs-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          width: 100%;
        }

        /* ── Lines container ── */
        .lrcs-lines {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Single line */
        .lrcs-line {
          display: flex;
          align-items: baseline;
          flex-wrap: nowrap;
          min-height: clamp(28px, 3.6vw, 44px);
        }

        .lrcs-text {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 1.9;
          white-space: pre-wrap;
        }

        /* Inline input wrap */
        .lrcs-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          flex: 0 0 clamp(80px, 9vw, 130px);
          min-width: clamp(70px, 8vw, 115px);
          margin: 0 2px;
        }

        .lrcs-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrcs-input:disabled  { opacity: 1; cursor: default; }
        .lrcs-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrcs-input--answer   {
          color: ${INPUT_ANSWER_COLOR};
        }

        /* ✕ badge */
        .lrcs-badge {
          position: absolute;
          top: -6px; right: -4px;
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

        /* Scene image */
        .lrcs-scene-img {
          position: absolute;
    width: 20%;
    height: 100%;
    display: block;
    border-radius: 10px;
    flex-shrink: 0;
    right: 25em;
top : 5em ; 
        }

        .lrcs-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrcs-top { grid-template-columns: 1fr; }
          .lrcs-scene-img { width: 100%; max-width: 280px; margin: 0 auto; }
          .lrcs-line { flex-wrap: wrap; }
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
          Listen, read, and complete the story.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={6.88} />
        </div>

        {/* ── Top: lines + image ── */}
        <div className="lrcs-top">

          {/* Text lines with inline inputs */}
          <div className="lrcs-lines">
            {LINES.map((line, li) => (
              <div key={li} className="lrcs-line">
                {line.map((part, pi) => renderPart(part, `${li}-${pi}`))}
              </div>
            ))}
          </div>

          {/* Image */}
          <img src={imgScene} alt="camping scene" className="lrcs-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="lrcs-buttons">
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