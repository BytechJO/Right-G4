import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — كل صورة عليها badge الحرف
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 25.svg"; // library
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 26.svg"; // baseball
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 27.svg"; // soccer
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 31.svg"; // garden
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 32.svg"; // car race
import imgF from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 33.svg"; // volleyball

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const IMG_BADGE_BG     = "#ffffff";
const IMG_BADGE_TEXT   = "#2b2b2b";
const BADGE_DEFAULT_BG = "transparent";
const BADGE_DEFAULT_CL = "#2b2b2b";
const BADGE_CORRECT_BG =  "transparent";
const BADGE_CORRECT_CL = "#2b2b2b";
const BADGE_WRONG_BG   =  "transparent";;
const BADGE_WRONG_CL   = "#2b2b2b";
const WRONG_X_BG       = "#ef4444";
const WRONG_X_CL       = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  IMAGES: 6 صور مرتبة a→f
//  WORDS:  6 كلمات + الحرف الصحيح + id للـ auto-focus
// ─────────────────────────────────────────────
const IMAGES = [
  { letter: "a", src: imgA },
  { letter: "b", src: imgB },
  { letter: "c", src: imgC },
  { letter: "d", src: imgD },
  { letter: "e", src: imgE },
  { letter: "f", src: imgF },
];

// الترتيب: 3 في كل صف
const WORDS = [
  { id: 1, word: "volleyball", correct: "f" },
  { id: 2, word: "baseball",   correct: "b" },
  { id: 3, word: "garden",     correct: "d" },
  { id: 4, word: "library",    correct: "a" },
  { id: 5, word: "car race",   correct: "e" },
  { id: 6, word: "soccer",     correct: "c" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = WORDS.find((w) => w.id === id);
    if (showResults && item && answers[id]?.toLowerCase() === item.correct) return;

    const letter = value.replace(/[^a-zA-Z]/g, "").slice(-1).toLowerCase();
    setAnswers((prev) => ({ ...prev, [id]: letter }));

    // auto-focus next
    if (letter) {
      const idx  = WORDS.findIndex((w) => w.id === id);
      const next = WORDS[idx + 1];
      if (next && inputRefs.current[next.id]) {
        inputRefs.current[next.id].focus();
      }
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = WORDS.every((w) => answers[w.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    WORDS.forEach((w) => { if (answers[w.id]?.toLowerCase() === w.correct) score++; });
    setShowResults(true);
    if (score === WORDS.length)   ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    WORDS.forEach((w) => { filled[w.id] = w.correct; });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const getBadgeState = (w) => {
    const val = answers[w.id];
    if (!val) return "empty";
    if (showAns) return "correct";
    if (showResults) return val.toLowerCase() === w.correct ? "correct" : "wrong";
    return "filled";
  };

  const badgeBg  = (s) => s === "correct" ? BADGE_CORRECT_BG : s === "wrong" ? BADGE_WRONG_BG  : BADGE_DEFAULT_BG;
  const badgeClr = (s) => s === "correct" ? BADGE_CORRECT_CL : s === "wrong" ? BADGE_WRONG_CL  : BADGE_DEFAULT_CL;

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Images row: 6 صور ── */
        .lrwa-imgs {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(6px, 0.9vw, 12px);
          width: 100%;
          margin-top : 8%  ;
        }

        .lrwa-img-card {
          position: relative;
          overflow: visible;
        }

        .lrwa-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

      

        /* ── Words grid: 3 per row ── */
        .lrwa-words {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.8vw, 24px) clamp(16px, 2.4vw, 36px);
          width: 100%;
        }

        /* Single word item: num | word | badge */
        .lrwa-word-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .lrwa-word-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwa-word-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
        }

        /* Input badge */
        .lrwa-badge-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrwa-badge {
          position: relative;
          width: clamp(40px, 3.8vw, 40px);
          height: clamp(40px, 3.8vw, 40px);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2195a6
;

        }

        .lrwa-letter-display {
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          text-transform: lowercase;
        }

        /* Transparent input over badge */
        .lrwa-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          caret-color: #333w;
          z-index: 2;
          border-radius: 50%;
        }
        .lrwa-input:disabled { cursor: default; }

        /* ✕ mini badge */
        .lrwa-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(12px, 1.4vw, 15px);
          height: clamp(12px, 1.4vw, 15px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CL};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 8px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrwa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrwa-imgs  { grid-template-columns: repeat(3, 1fr); }
          .lrwa-words { grid-template-columns: repeat(2, 1fr); }
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
          <span className="WB-ex-A-1">A</span>
          Look, read, and write.
        </h1>

        {/* ── 6 Images ── */}
        <div className="lrwa-imgs">
          {IMAGES.map((img) => (
            <div key={img.letter} className="lrwa-img-card">
              <img src={img.src} alt={img.letter} className="lrwa-img" />
            </div>
          ))}
        </div>

        {/* ── Words 3×2 ── */}
        <div className="lrwa-words">
          {WORDS.map((w) => {
            const state    = getBadgeState(w);
            const val      = answers[w.id] || "";
            const bg       = badgeBg(state);
            const clr      = badgeClr(state);
            const isLocked = showAns || (showResults && state === "correct");
            const isWrong  = state === "wrong";

            return (
              <div key={w.id} className="lrwa-word-item">
                <span className="lrwa-word-num">{w.id}</span>
                <span className="lrwa-word-text">{w.word}</span>

                <div className="lrwa-badge-wrap">
                  <div className="lrwa-badge" style={{ background: bg, color: clr }}>
                    <span className="lrwa-letter-display">{val}</span>
                    <input
                      ref={(el) => { inputRefs.current[w.id] = el; }}
                      className="lrwa-input"
                      type="text"
                      maxLength={1}
                      value={val}
                      disabled={isLocked}
                      onChange={(e) => handleChange(w.id, e.target.value)}
                    />
                    {isWrong && <div className="lrwa-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwa-buttons">
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