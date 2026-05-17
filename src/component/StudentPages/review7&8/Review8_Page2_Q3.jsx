import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const TEXT_COLOR              = "#2b2b2b";
const VERB_COLOR              = "#e07b00";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  STORY PARTS
//
//  المصفوفة تمثل القصة كلها جزء جزء:
//  { t: "text",  v: "..." }              → نص عادي
//  { t: "verb",  v: "(celebrate)" }      → الفعل بالأقواس باللون البرتقالي
//  { t: "given", v: "celebrated" }       → إجابة معطاة (أول فعل — مثال)
//  { t: "input", id, correct, answer }   → input يكتبه الطالب
//  { t: "br" }                           → سطر جديد
// ─────────────────────────────────────────────
const PARTS = [
  { t: "text",  v: "Cynthia" },
  { t: "verb",  v: "(celebrate)" },
  { t: "given", v: "celebrated" },
  { t: "text",  v: "her birthday in August. Her mom" },
  { t: "verb",  v: "(bake)" },
  { t: "input", id: "bake", correct: ["baked"], answer: "baked" },
  { t: "text",  v: "a delicious chocolate and vanilla cake. Her family and friends" },
  { t: "verb",  v: "(clap)" },
  { t: "input", id: "clap", correct: ["clapped"], answer: "clapped" },
  { t: "text",  v: "as she blew out the candles on her cake. Cynthia was extremely" },
  { t: "verb",  v: "(excite)" },
  { t: "input", id: "excite", correct: ["excited"], answer: "excited" },
  { t: "text",  v: "as she" },
  { t: "verb",  v: "(open)" },
  { t: "input", id: "open", correct: ["opened"], answer: "opened" },
  { t: "text",  v: "her many gifts and presents. After opening the gifts, Cynthia" },
  { t: "verb",  v: "(play)" },
  { t: "input", id: "play", correct: ["played"], answer: "played" },
  { t: "text",  v: "many games with her friends. The birthday party came to an end, and Cynthia" },
  { t: "verb",  v: "(wave)" },
  { t: "input", id: "wave", correct: ["waved"], answer: "waved" },
  { t: "text",  v: "goodbye to her friends." },
];

const ALL_INPUTS = PARTS.filter((p) => p.t === "input");

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
export default function WB_ReadCompleteStory_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value, correctArr) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[id] || "", correctArr)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
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
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrongPart    = (p) => showResults && !showAns && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) => showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  const renderPart = (part, i) => {
    if (part.t === "text") {
      return <span key={i} className="rcs-text">{part.v}</span>;
    }

    if (part.t === "verb") {
      return <span key={i} className="rcs-verb">{part.v}</span>;
    }

    if (part.t === "given") {
      return <span key={i} className="rcs-given">{part.v}</span>;
    }

    // input
    const wrong    = isWrongPart(part);
    const disabled = isDisabledPart(part);
    const value    = answers[part.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="rcs-input-wrap">
        <input
          type="text"
          className={[
            "rcs-input",
            wrong   ? "rcs-input--wrong"  : "",
            showAns ? "rcs-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="rcs-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Story paragraph ── */
        .rcs-story {
          font-size: clamp(14px, 1.7vw, 20px);
          line-height: 2.4;
          color: ${TEXT_COLOR};
          width: 100%;
          word-break: break-word;
        }

        .rcs-text {
          color: ${TEXT_COLOR};
        }

        .rcs-verb {
          color: ${VERB_COLOR};
          font-style: normal;
        }

        /* معطى — أول فعل مثال */
        .rcs-given {
          color: ${TEXT_COLOR};
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          padding: 0 clamp(10px, 1.5vw, 20px);
          display: inline-block;
          min-width: clamp(60px, 8vw, 110px);
          text-align: center;
        }

        /* Input wrap */
        .rcs-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          min-width: clamp(70px, 9vw, 130px);
          margin: 0 2px;
        }

        .rcs-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
          min-width: clamp(70px, 9vw, 130px);
        }
        .rcs-input:disabled  { opacity: 1; cursor: default; }
        .rcs-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcs-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rcs-badge {
          position: absolute;
          top: -8px; right: -4px;
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

        .rcs-buttons {
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
          <span className="WB-ex-A-1">E</span>
          Read and complete the story. Write the past tense of each verb in parenthesis.
        </h1>

        {/* ── Story ── */}
        <div className="rcs-story">
          {PARTS.map((part, i) => renderPart(part, i))}
        </div>

        {/* ── Buttons ── */}
        <div className="rcs-buttons">
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