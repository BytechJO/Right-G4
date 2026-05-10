import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgJapan  from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 15.svg";
import imgRussia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 16.svg";
import imgUK     from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 17.svg";
import imgAus    from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 18.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd11pg15-instruction1-adult-lady_e6nQ5x9d.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["Australia", "Japan", "United Kingdom", "Russia"];

const ITEMS = [
  { id: 1, prefix: "Stella is going to...", src: imgJapan,  correct: ["Japan"],          answer: "Japan"          },
  { id: 2, prefix: "He's going to...",      src: imgRussia, correct: ["Russia"],         answer: "Russia"         },
  { id: 3, prefix: "They're going to...",   src: imgUK,     correct: ["United Kingdom"], answer: "United Kingdom" },
  { id: 4, prefix: "I'm going to...",       src: imgAus,    correct: ["Australia"],      answer: "Australia"      },
];

const captions = [
  {
    start: 0.62,
    end: 3.28,
    text: "Page 15, write activities.",
  },
  {
    start: 3.28,
    end: 7.58,
    text: "Exercise D, listen, read, and write.",
  },
  {
    start: 8.88,
    end: 10.78,
    text: "Stella is going to Japan.",
  },
  {
    start: 10.78,
    end: 12.82,
    text: "He's going to Russia.",
  },
  {
    start: 13.86,
    end: 16.06,
    text: "They're going to England.",
  },
  {
    start: 16.06,
    end: 18.38,
    text: "Four. I'm going to France.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadWrite_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return !isCorrect(answers[item.id] || "", item.correct);
  };

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word bank ── */
        .lrwd-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: space-between;
          width: 80%;
        }

        .lrwd-pill {
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(4px, 0.5vw, 6px) clamp(14px, 2vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2×2 grid ── */
        .lrwd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single card: num+prefix | image | input */
        .lrwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* Prefix row */
        .lrwd-prefix-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        .lrwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwd-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image */
        .lrwd-img {
          width: 60%;
          height : auto ;
          object-fit: cover;
          display: block;
        }

        /* Input wrap */
        .lrwd-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrwd-input {
    width: 60%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwd-input:disabled   { opacity: 1; cursor: default; }
        .lrwd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwd-badge {
          position: absolute;
          top: -8px;     right: 5em;

          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lrwd-grid { grid-template-columns: 1fr; }
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
          Listen, read, and write.
        </h1>
         <div style={{marginTop:"10px"}}>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={7.7}
        />
      </div>
        {/* ── Word bank ── */}
        <div className="lrwd-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="lrwd-pill">{w}</div>
          ))}
        </div>

        {/* ── 2×2 grid ── */}
        <div className="lrwd-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwd-card">

                {/* Prefix */}
                <div className="lrwd-prefix-row">
                  <span className="lrwd-num">{item.id}</span>
                  <span className="lrwd-prefix">{item.prefix}</span>
                </div>

                {/* Image */}
                <img src={item.src} alt={`img-${item.id}`} className="lrwd-img" />

                {/* Input */}
                <div className="lrwd-input-wrap">
                  <input
                    type="text"
                    className={[
                      "lrwd-input",
                      wrong   ? "lrwd-input--wrong"  : "",
                      showAns ? "lrwd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwd-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwd-buttons">
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