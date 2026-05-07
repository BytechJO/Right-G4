import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  TABLE IMAGE (ثابتة — كاملة مع محتوياتها)
// ─────────────────────────────────────────────
import imgTable from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 22.svg";;

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SCRAMBLED_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Each item: scrambled words → unscrambled question + short answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    scrambled: "have did motorcycle he ?",
    correctQ:  ["Did he have a motorcycle?", "did he have a motorcycle"],
    answerQ:   "Did he have a motorcycle?",
    correctA:  ["Yes, he did.", "yes he did"],
    answerA:   "Yes, he did.",
  },
  {
    id:        2,
    scrambled: "ball he a did have ?",
    correctQ:  ["Did he have a ball?", "did he have a ball"],
    answerQ:   "Did he have a ball?",
    correctA:  ["No, he didn't.", "no he didnt", "no he did not"],
    answerA:   "No, he didn't.",
  },
  {
    id:        3,
    scrambled: "a did he hat have ?",
    correctQ:  ["Did he have a hat?", "did he have a hat"],
    answerQ:   "Did he have a hat?",
    correctA:  ["No, he didn't.", "no he didnt", "no he did not"],
    answerA:   "No, he didn't.",
  },
  {
    id:        4,
    scrambled: "swimming pool a did have he ?",
    correctQ:  ["Did he have a swimming pool?", "did he have a swimming pool"],
    answerQ:   "Did he have a swimming pool?",
    correctA:  ["Yes, he did.", "yes he did"],
    answerA:   "Yes, he did.",
  },
];

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
export default function WB_LookUnscrambleWriteAnswer_QE() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const keyQ = (id) => `${id}q`;
  const keyA = (id) => `${id}a`;

  const handleChange = (key, value, correctArr) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[key] || "", correctArr)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (item) => answers[keyQ(item.id)]?.trim() && answers[keyA(item.id)]?.trim()
    );
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    const total = ITEMS.length * 2;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[keyQ(item.id)] || "", item.correctQ)) score++;
      if (isCorrect(answers[keyA(item.id)] || "", item.correctA)) score++;
    });
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[keyQ(item.id)] = item.answerQ;
      filled[keyA(item.id)] = item.answerA;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongKey = (key, correctArr) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[key] || "", correctArr);
  };

  const isDisabledKey = (key, correctArr) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[key] || "", correctArr)) return true;
    return false;
  };

  const renderInput = (key, correctArr, flex = "1") => {
    const wrong    = isWrongKey(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabledKey(key, correctArr);

    return (
      <div className="luwa-input-wrap" style={{ flex }}>
        <input
          type="text"
          className={[
            "luwa-input",
            wrong   ? "luwa-input--wrong"  : "",
            showAns ? "luwa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="luwa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Table image ── */
        .luwa-table-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* ── Items list ── */
        .luwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single item */
        .luwa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Scrambled row: num + scrambled */
        .luwa-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .luwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .luwa-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.4;
        }

        /* Answer row: question input + separator + short answer input */
        .luwa-answer-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 16px);
          padding-left: clamp(18px, 2.2vw, 28px);
        }

        .luwa-separator {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #9ca3af;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Input wrap */
        .luwa-input-wrap {
          position: relative;
          min-width: clamp(80px, 10vw, 160px);
        }

        .luwa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .luwa-input:disabled  { opacity: 1; cursor: default; }
        .luwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .luwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .luwa-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .luwa-buttons {
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
          Look, unscramble, write, and answer.
        </h1>

        {/* ── Table image (ثابتة) ── */}
        <img src={imgTable} alt="table" className="luwa-table-img" />

        {/* ── Items ── */}
        <div className="luwa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="luwa-item">

              {/* Scrambled words row */}
              <div className="luwa-scrambled-row">
                <span className="luwa-num">{item.id}</span>
                <span className="luwa-scrambled">{item.scrambled}</span>
              </div>

              {/* Question input + short answer input */}
              <div className="luwa-answer-row">
                {renderInput(keyQ(item.id), item.correctQ, "2")}
                <span className="luwa-separator">→</span>
                {renderInput(keyA(item.id), item.correctA, "1")}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="luwa-buttons">
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