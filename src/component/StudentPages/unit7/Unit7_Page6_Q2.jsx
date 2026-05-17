import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 63/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_DEFAULT_CLR        = "#2b2b2b";
const UNDERLINE_SELECTED      = "#2b2b2b";
const UNDERLINE_WRONG         = "#ef4444";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:    1,
    words: [
      { w: "There",  mistake: false },
      { w: "were",   mistake: true  },
      { w: "bread",  mistake: false },
      { w: "on",     mistake: false },
      { w: "the",    mistake: false },
      { w: "table.", mistake: false },
    ],
    rewrite: {
      correct: ["There was bread on the table.", "there was bread on the table"],
      answer:  "There was bread on the table.",
    },
  },
  {
    id:    2,
    words: [
      { w: "There",    mistake: false },
      { w: "wasn't",   mistake: true  },
      { w: "any",      mistake: false },
      { w: "cookies.", mistake: false },
    ],
    rewrite: {
      correct: ["There weren't any cookies.", "there weren't any cookies"],
      answer:  "There weren't any cookies.",
    },
  },
  {
    id:    3,
    words: [
      { w: "There",  mistake: false },
      { w: "was",    mistake: true  },
      { w: "apples", mistake: false },
      { w: "in",     mistake: false },
      { w: "the",    mistake: false },
      { w: "bowl.",  mistake: false },
    ],
    rewrite: {
      correct: ["There were apples in the bowl.", "there were apples in the bowl"],
      answer:  "There were apples in the bowl.",
    },
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrectRewrite = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadUnderlineRewrite_QF() {
  const [underlined,  setUnderlined]  = useState({});  // { itemId: wordIdx }
  const [rewrites,    setRewrites]    = useState({});  // { itemId: string }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleWordClick = (itemId, wordIdx) => {
    if (isLocked) return;
    setUnderlined((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === wordIdx ? null : wordIdx,
    }));
  };

  const handleRewrite = (itemId, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === itemId);
    if (showResults && item && isCorrectRewrite(rewrites[itemId] || "", item.rewrite.correct)) return;
    setRewrites((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allUnderlined = ITEMS.every((item) => underlined[item.id] != null);
    const allRewritten  = ITEMS.every((item) => rewrites[item.id]?.trim());
    if (!allUnderlined || !allRewritten) {
      ValidationAlert.info("Please underline the mistake and rewrite each sentence.");
      return;
    }
    let score = 0;
    const total = ITEMS.length * 2;
    ITEMS.forEach((item) => {
      const correctIdx = item.words.findIndex((w) => w.mistake);
      if (underlined[item.id] === correctIdx) score++;
      if (isCorrectRewrite(rewrites[item.id] || "", item.rewrite.correct)) score++;
    });
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ul = {};
    const rw = {};
    ITEMS.forEach((item) => {
      ul[item.id] = item.words.findIndex((w) => w.mistake);
      rw[item.id] = item.rewrite.answer;
    });
    setUnderlined(ul);
    setRewrites(rw);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setUnderlined({});
    setRewrites({});
    setShowResults(false);
    setShowAns(false);
  };

  const getWordState = (item, wordIdx) => {
    const correctIdx = item.words.findIndex((w) => w.mistake);
    const sel = underlined[item.id];
    if (sel !== wordIdx) return "idle";
    if (showAns)         return "correct";
    if (showResults)     return wordIdx === correctIdx ? "correct" : "wrong";
    return "selected";
  };

  const isRewriteWrong    = (item) =>
    showResults && !showAns && !isCorrectRewrite(rewrites[item.id] || "", item.rewrite.correct);
  const isRewriteDisabled = (item) =>
    showAns || (showResults && isCorrectRewrite(rewrites[item.id] || "", item.rewrite.correct));

  return (
    <div className="main-container-component">
      <style>{`
        .rur-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
          margin : 7% 0 ;
        }

        .rur-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
        }

        .rur-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Original sentence row */
        .rur-sentence-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.4vw, 6px);
        }

        .rur-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          margin-right: clamp(3px, 0.4vw, 6px);
          line-height: 1.5;
        }

        /* Clickable word */
        .rur-word {
          position: relative;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${WORD_DEFAULT_CLR};
          cursor: pointer;
          user-select: none;
          line-height: 1.5;
          padding-bottom: 2px;
          border-bottom: 2.5px solid transparent;
          transition: border-color 0.12s;
          white-space: nowrap;
        }
        .rur-word--locked   { cursor: default; }
        .rur-word--selected { border-bottom-color: ${UNDERLINE_SELECTED}; }
        .rur-word--correct  { border-bottom-color: ${UNDERLINE_SELECTED}; }
        .rur-word--wrong    { border-bottom-color: ${UNDERLINE_WRONG}; }

        /* ✕ badge on wrong word */
        .rur-word-badge {
          position: absolute;
          top: -8px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          pointer-events: none;
          z-index: 2;
        }

        /* Rewrite input */
        .rur-rewrite-wrap {
          position: relative;
          padding-left: clamp(22px, 3vw, 36px);
        }

        .rur-rewrite-input {
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
        .rur-rewrite-input:disabled { opacity: 1; cursor: default; }
        .rur-rewrite-input--wrong   { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rur-rewrite-input--answer  { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge on wrong rewrite */
        .rur-rewrite-badge {
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

        .rur-scene-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 15px;
          flex-shrink: 0;
                            border: 2px solid #2195a6;

        }

        .rur-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rur-body { grid-template-columns: 1fr; }
          .rur-scene-img { width: 100%; max-width: 240px; margin: 0 auto; }
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
          <span className="WB-ex-A">F</span>
          Read and underline each mistake. Rewrite the sentence.
        </h1>

        {/* ── Body ── */}
        <div className="rur-body">

          {/* Items */}
          <div className="rur-list">
            {ITEMS.map((item) => {
              const rwWrong    = isRewriteWrong(item);
              const rwDisabled = isRewriteDisabled(item);
              const rwValue    = rewrites[item.id] || "";
              const rwTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const rwUColor   = rwWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

              return (
                <div key={item.id} className="rur-item">

                  {/* Original sentence */}
                  <div className="rur-sentence-row">
                    <span className="rur-num">{item.id}</span>
                    {item.words.map((word, wi) => {
                      const state   = getWordState(item, wi);
                      const isWrong = state === "wrong";
                      return (
                        <span
                          key={wi}
                          className={[
                            "rur-word",
                            state === "selected" ? "rur-word--selected" : "",
                            state === "correct"  ? "rur-word--correct"  : "",
                            state === "wrong"    ? "rur-word--wrong"    : "",
                            isLocked             ? "rur-word--locked"   : "",
                          ].filter(Boolean).join(" ")}
                          onClick={() => handleWordClick(item.id, wi)}
                        >
                          {word.w}
                          {isWrong && <span className="rur-word-badge">✕</span>}
                        </span>
                      );
                    })}
                  </div>

                  {/* Rewrite input */}
                  <div className="rur-rewrite-wrap">
                    <input
                      type="text"
                      className={[
                        "rur-rewrite-input",
                        rwWrong ? "rur-rewrite-input--wrong"  : "",
                        showAns ? "rur-rewrite-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={rwValue}
                      disabled={rwDisabled}
                      onChange={(e) => handleRewrite(item.id, e.target.value)}
                      style={{ borderBottomColor: rwUColor, color: rwTColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {rwWrong && <div className="rur-rewrite-badge">✕</div>}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="table" className="rur-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rur-buttons">
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