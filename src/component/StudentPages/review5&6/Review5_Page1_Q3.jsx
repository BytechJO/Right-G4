import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 34.svg"; // tree
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 36.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 32.svg";

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
//  correctS: statement | correctQ: question
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    src:       img1,
    scrambled: "the Helen tree hiding is behind",
    correctS:  ["Helen is hiding behind the tree.", "helen is hiding behind the tree"],
    answerS:   "Helen is hiding behind the tree.",
    correctQ:  ["Is Helen hiding behind the tree?", "is helen hiding behind the tree"],
    answerQ:   "Is Helen hiding behind the tree?",
  },
  {
    id:        2,
    src:       img2,
    scrambled: "car garage The in is the",
    correctS:  ["The car is in the garage.", "the car is in the garage"],
    answerS:   "The car is in the garage.",
    correctQ:  ["Is the car in the garage?", "is the car in the garage"],
    answerQ:   "Is the car in the garage?",
  },
  {
    id:        3,
    src:       img3,
    scrambled: "ship The under the is bridge",
    correctS:  ["The ship is under the bridge.", "the ship is under the bridge"],
    answerS:   "The ship is under the bridge.",
    correctQ:  ["Is the ship under the bridge?", "is the ship under the bridge"],
    answerQ:   "Is the ship under the bridge?",
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
export default function WB_UnscrambleWriteQ_QC() {
  // answers: { "1s": "...", "1q": "...", "2s": "...", ... }
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const keyS = (id) => `${id}s`;
  const keyQ = (id) => `${id}q`;

  const handleChange = (key, value, correctArr) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[key] || "", correctArr)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every(
      (item) => answers[keyS(item.id)]?.trim() && answers[keyQ(item.id)]?.trim()
    );
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    const total = ITEMS.length * 2;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[keyS(item.id)] || "", item.correctS)) score++;
      if (isCorrect(answers[keyQ(item.id)] || "", item.correctQ)) score++;
    });
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[keyS(item.id)] = item.answerS;
      filled[keyQ(item.id)] = item.answerQ;
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

  const isWrongKey    = (key, correctArr) => showResults && !showAns && !isCorrect(answers[key] || "", correctArr);
  const isDisabledKey = (key, correctArr) => showAns || (showResults && isCorrect(answers[key] || "", correctArr));

  const renderInput = (key, correctArr) => {
    const wrong    = isWrongKey(key, correctArr);
    const disabled = isDisabledKey(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div className="uswq-input-wrap">
        <input
          type="text"
          className={[
            "uswq-input",
            wrong   ? "uswq-input--wrong"  : "",
            showAns ? "uswq-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="uswq-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .uswq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
        }

        /* Single item */
        .uswq-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
        }

        /* Left: num + scrambled + 2 inputs */
        .uswq-left {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        /* Scrambled row */
        .uswq-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .uswq-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .uswq-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.4;
        }

        /* Input wrap */
        .uswq-input-wrap {
          position: relative;
          width: 100%;
        }

        .uswq-input {
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
        .uswq-input:disabled  { opacity: 1; cursor: default; }
        .uswq-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .uswq-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .uswq-badge {
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

        /* Image */
        .uswq-img {
          width: 70%;
          height: auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        .uswq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .uswq-item { grid-template-columns: 1fr; }
          .uswq-img  { width: 100%; max-width: 200px; }
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
          Unscramble and write the statements. Then write questions.
        </h1>

        {/* ── Items ── */}
        <div className="uswq-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="uswq-item">

              {/* Left */}
              <div className="uswq-left">
                {/* Scrambled */}
                <div className="uswq-scrambled-row">
                  <span className="uswq-num">{item.id}</span>
                  <span className="uswq-scrambled">{item.scrambled}</span>
                </div>

                {/* Statement input */}
                {renderInput(keyS(item.id), item.correctS)}

                {/* Question input */}
                {renderInput(keyQ(item.id), item.correctQ)}
              </div>

              {/* Image */}
              <img src={item.src} alt={`img-${item.id}`} className="uswq-img" />

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="uswq-buttons">
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