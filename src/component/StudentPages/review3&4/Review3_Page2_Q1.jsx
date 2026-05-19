import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 21.svg";
import img2 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 18.svg"
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 19.svg"
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 20.svg"

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Each item has TWO inputs: question + negative answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:             1,
    src:            img1,
    correctQ:       ["Did she have a swimming pool?", "did she have a swimming pool"],
    answerQ:        "Did she have a swimming pool?",
    correctA:       ["She didn't have a swimming pool.", "she didn't have a swimming pool", "she did not have a swimming pool"],
    answerA:        "She didn't have a swimming pool.",
  },
  {
    id:             2,
    src:            img2,
    correctQ:       ["Did she have a tree house?", "did she have a tree house"],
    answerQ:        "Did she have a tree house?",
    correctA:       ["She didn't have a tree house.", "she didn't have a tree house", "she did not have a tree house"],
    answerA:        "She didn't have a tree house.",
  },
  {
    id:             3,
    src:            img3,
    correctQ:       ["Did she have a turtle?", "did she have a turtle"],
    answerQ:        "Did she have a turtle?",
    correctA:       ["She didn't have a turtle.", "she didn't have a turtle", "she did not have a turtle"],
    answerA:        "She didn't have a turtle.",
  },
  {
    id:             4,
    src:            img4,
    correctQ:       ["Did she have a camera?", "did she have a camera"],
    answerQ:        "Did she have a camera?",
    correctA:       ["She didn't have a camera.", "she didn't have a camera", "she did not have a camera"],
    answerA:        "She didn't have a camera.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim().replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "’");;

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteQA_QD() {
  // answers: { "1q": "...", "1a": "...", "2q": "...", ... }
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

  const renderInput = (key, correctArr, placeholder = "") => {
    const wrong    = isWrongKey(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabledKey(key, correctArr);

    return (
      <div className="lwqa-input-wrap">
        <input
          type="text"
          className={[
            "lwqa-input",
            wrong   ? "lwqa-input--wrong"  : "",
            showAns ? "lwqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lwqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        /* Single row: num | img | lines */
        .lwqa-row {
          display: grid;
          grid-template-columns: auto clamp(70px, 9vw, 120px) 1fr;
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
        }

        .lwqa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: center;
        }

        .lwqa-img {
          width: 100%;
          height: auto ;
          object-fit: cover;
          display: block;
        }

        /* Two lines stacked */
        .lwqa-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        /* Input wrap */
        .lwqa-input-wrap {
          position: relative;
          width: 100%;
        }

        .lwqa-input {
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
        .lwqa-input:disabled  { opacity: 1; cursor: default; }
        .lwqa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwqa-badge {
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

        .lwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lwqa-row { grid-template-columns: auto clamp(55px,14vw,80px) 1fr; }
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
          <span className="WB-ex-A-1">D</span>
          Look and write a question and a negative answer.
        </h1>

        {/* ── Items ── */}
        <div className="lwqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwqa-row">

              {/* Number */}
              <span className="lwqa-num">{item.id}</span>

              {/* Image */}
              <img src={item.src} alt={`img-${item.id}`} className="lwqa-img" />

              {/* Two input lines */}
              <div className="lwqa-lines">
                {renderInput(keyQ(item.id), item.correctQ)}
                {renderInput(keyA(item.id), item.correctA)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqa-buttons">
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