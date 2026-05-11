import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 4 صور
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 8.svg"; // frogs  → 4
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 9.svg"; // alligator → 2
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 10.svg"; // pond   → 3
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 11.svg";; // rock   → 1

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BADGE_DEFAULT_BG   = "transparent";
const BADGE_DEFAULT_CLR  = "#2b2b2b";
const BADGE_CORRECT_BG   = "transparent"
const BADGE_CORRECT_CLR  = "transparent"
const BADGE_WRONG_BG     =  "transparent";
const BADGE_WRONG_CLR    = "#ffffff";
const WRONG_X_BG         = "#ef4444";
const WRONG_X_CLR        = "#ffffff";
const LABEL_NUM_CLR      = "#2b2b2b";
const LABEL_TEXT_CLR     = "#2b2b2b";
const LABEL_BG           = "#e8eff1";
const LABEL_RADIUS       = "10px";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// Word labels فوق — بترتيب من اليسار
const LABELS = [
  { num: 1, word: "rock"      },
  { num: 2, word: "alligator" },
  { num: 3, word: "pond"      },
  { num: 4, word: "frogs"     },
];

// الصور — بنفس الترتيب في الكتاب
// correct = الرقم الصحيح لكل صورة
const IMAGES = [
  { id: "A", src: imgA, correct: 4 }, // frogs
  { id: "B", src: imgB, correct: 2 }, // alligator
  { id: "C", src: imgC, correct: 3 }, // pond
  { id: "D", src: imgD, correct: 1 }, // rock
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadNumber_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const img = IMAGES.find((i) => i.id === id);
    if (showResults && img && String(answers[id]) === String(img.correct)) return;

    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setAnswers((prev) => ({ ...prev, [id]: digit }));

    // auto-focus next
    if (digit) {
      const idx  = IMAGES.findIndex((i) => i.id === id);
      const next = IMAGES[idx + 1];
      if (next && inputRefs.current[next.id]) {
        inputRefs.current[next.id].focus();
      }
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = IMAGES.every((img) => answers[img.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please number all pictures first."); return; }
    let score = 0;
    IMAGES.forEach((img) => { if (String(answers[img.id]) === String(img.correct)) score++; });
    setShowResults(true);
    if (score === IMAGES.length) ValidationAlert.success(`Score: ${score} / ${IMAGES.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${IMAGES.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${IMAGES.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    IMAGES.forEach((img) => { filled[img.id] = String(img.correct); });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── Badge state ──
  const getBadgeState = (img) => {
    const val = answers[img.id];
    if (!val) return "empty";
    if (showAns) return "correct";
    if (showResults) return String(val) === String(img.correct) ? "correct" : "wrong";
    return "filled";
  };

  const badgeBg  = (s) => s === "correct" ? BADGE_CORRECT_BG  : s === "wrong" ? BADGE_WRONG_BG  : BADGE_DEFAULT_BG;
  const badgeClr = (s) => s === "correct" ? BADGE_CORRECT_CLR : s === "wrong" ? BADGE_WRONG_CLR : BADGE_DEFAULT_CLR;

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Labels row ── */
        .lrn-labels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          margin :8% 0 0 ;
        }

        .lrn-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 0.5vw, 7px);
          background: ${LABEL_BG};
          border-radius: ${LABEL_RADIUS};
          padding: clamp(6px, 0.8vw, 10px) clamp(10px, 1.4vw, 18px);
          user-select: none;
        }

        .lrn-label-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_NUM_CLR};
          flex-shrink: 0;
        }

        .lrn-label-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${LABEL_TEXT_CLR};
          font-weight: 500;
        }

        /* ── 4-col image grid ── */
        .lrn-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        /* Image card */
        .lrn-card {
          position: relative;
          overflow: visible;
        }

        .lrn-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* Badge — bottom-right corner */
        .lrn-badge-wrap {
          position: absolute;
             bottom: 1px;
    right: 1px;
        }

        .lrn-badge {
          position: relative;
          width: clamp(30px, 3.8vw, 46px);
          height: clamp(30px, 3.8vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          cursor: pointer;
        }

        /* Transparent input over badge */
        .lrn-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: #333;
          caret-color: #333;
          z-index: 2;
          border-radius: 50%;
        }
        .lrn-input:disabled { cursor: default; }

        .lrn-num-display {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* ✕ mini badge */
        .lrn-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CLR};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrn-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(16px, 2.4vw, 28px);
        }

        @media (max-width: 500px) {
          .lrn-labels,
          .lrn-grid { grid-template-columns: repeat(2, 1fr); }
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
          Look, read, and number.
        </h1>

        {/* ── Word labels ── */}
        <div className="lrn-labels">
          {LABELS.map((l) => (
            <div key={l.num} className="lrn-label">
              <span className="lrn-label-num">{l.num}</span>
              <span className="lrn-label-word">{l.word}</span>
            </div>
          ))}
        </div>

        {/* ── Images grid ── */}
        <div className="lrn-grid">
          {IMAGES.map((img) => {
            const state    = getBadgeState(img);
            const val      = answers[img.id] || "";
            const bg       = badgeBg(state);
            const clr      = badgeClr(state);
            const isLocked = showAns || (showResults && state === "correct");
            const isWrong  = state === "wrong";

            return (
              <div key={img.id} className="lrn-card">
                <img src={img.src} alt={`img-${img.id}`} className="lrn-img" />

                <div className="lrn-badge-wrap">
                  <div className="lrn-badge" style={{ background: bg, color: clr }}>
                    <span className="lrn-num-display">{val}</span>
                    <input
                      ref={(el) => { inputRefs.current[img.id] = el; }}
                      className="lrn-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      disabled={isLocked}
                      onChange={(e) => handleChange(img.id, e.target.value)}
                    />
                    {isWrong && <div className="lrn-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrn-buttons">
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