import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 13.svg"; // big yard
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 14.svg"; // games and toys
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 15.svg"; // teacher / class
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 16.svg"; // naughty monkeys / zoo

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const PILL_BG                 = "#e8eff1";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  prefix: الجزء الثابت من الجملة
//  correct/answer: الجزء اللي يكتبه الطالب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    src:       img1,
    scrambled: "has  it  yard  a  big",
    prefix:    "I like my house because",
    correct:   ["it has a big yard.", "it has a big yard"],
    answer:    "it has a big yard.",
  },
  {
    id:        2,
    src:       img2,
    scrambled: "like  I  and  toys  my  games",
    prefix:    "I like my room because",
    correct:   ["I like my games and toys.", "i like my games and toys"],
    answer:    "I like my games and toys.",
  },
  {
    id:        3,
    src:       img3,
    scrambled: "very  is  nice  my  teacher",
    prefix:    "I like my class because",
    correct:   ["my teacher is very nice.", "my teacher is very nice"],
    answer:    "my teacher is very nice.",
  },
  {
    id:        4,
    src:       img4,
    scrambled: "like  I  the  monkeys  naughty",
    prefix:    "I like the zoo because",
    correct:   ["I like the naughty monkeys.", "i like the naughty monkeys"],
    answer:    "I like the naughty monkeys.",
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
export default function WB_LookUnscrambleWrite_QE() {
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
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── 2×2 grid ── */
        .luw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        /* Single card */
        .luw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Number + scrambled pill row */
        .luw-top-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .luw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        /* Scrambled pill */
        .luw-pill {
          background: ${PILL_BG};
          border-radius: 15px;
          padding: clamp(4px, 0.5vw, 7px) clamp(10px, 1.3vw, 16px);
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          user-select: none;
          flex-shrink: 0;
                    border: 2px solid #2195a6;

        }

        /* Image */
        .luw-img {
          width: 80%;
          height:auto;
          object-fit: cover;
          display: block;
          }

        /* Prefix text */
        .luw-prefix {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Input wrap */
        .luw-input-wrap {
          position: relative;
          width: 100%;
        }

        .luw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.55vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .luw-input:disabled  { opacity: 1; cursor: default; }
        .luw-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .luw-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .luw-badge {
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

        .luw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .luw-grid { grid-template-columns: 1fr; }
          .luw-pill { white-space: normal; }
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
          <span className="WB-ex-A">E</span>
          Look, unscramble, and write.
        </h1>

        {/* ── 2×2 Grid ── */}
        <div className="luw-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="luw-card">

                {/* Number + scrambled pill */}
                <div className="luw-top-row">
                  <span className="luw-num">{item.id}</span>
                  <div className="luw-pill">{item.scrambled}</div>
                </div>

                {/* Image */}
                <img src={item.src} alt={`img-${item.id}`} className="luw-img" />

                {/* Prefix text */}
                <span className="luw-prefix">{item.prefix}</span>

                {/* Input */}
                <div className="luw-input-wrap">
                  <input
                    type="text"
                    className={[
                      "luw-input",
                      wrong   ? "luw-input--wrong"  : "",
                      showAns ? "luw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="luw-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="luw-buttons">
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