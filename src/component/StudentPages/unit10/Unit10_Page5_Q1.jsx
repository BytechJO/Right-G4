import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 20.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 21.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 22.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 23.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR     = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const TEXT_DEFAULT     = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: img1, words: ["rack", "casual"],  correct: "casual" },
  { id: 2, src: img2, words: ["size", "rack"],          correct: "size"       },
  { id: 3, src: img3, words: ["pay", "dollars"],           correct: "dollars"        },
  { id: 4, src: img4, words: ["wonderful", "purchase"],           correct: "purchase"        },

];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircle_QA() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (itemId, word) => {
    if (isLocked) return;
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === word ? null : word }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please circle a word for each picture."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const getWordState = (item, word) => {
    const isSel = selected[item.id] === word;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (showResults) return item.correct === word ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div className="main-container-component">
      <style>{`

        /* ── Grid: 3 عناصر في صف ── */
        .lrc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(28px, 2vw, 28px);
          width: 100%;
          margin : 10%  0;
        }

        /* ── الكارد الكامل: رقم+صورة في الأعلى، كلمات في الأسفل ── */
        .lrc-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }

        /* ── الجزء العلوي: رقم جنب الصورة ── */
        .lrc-top {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          width: 100%;
        }

        /* الرقم: يسار الصورة ومرتفع قليلاً */
        .lrc-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          /* مرتفع قليلاً عن الصورة */
          line-height: 1;
        }

        /* الصورة تملأ باقي العرض */
        .lrc-img-wrapper {
          flex: 1;
          min-width: 0;
        }

        .lrc-img {
          width: 70%;
          height: auto;
          display: block;
        }

        /* ── الكلمات تحت الصورة بنفس محاذاة الصورة ── */
        .lrc-words {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(6px, 1vw, 10px);
          /* تبدأ من نفس موضع الصورة (بعد عرض الرقم + الـ gap) */
          margin-top: 8px;
          width: 100%;
          box-sizing: border-box;
          margin-left: -25px;

        }

        /* كلمة واحدة */
        .lrc-word-wrap {
          position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 5px) clamp(14px, 1.8vw, 22px);
          cursor: pointer;
          user-select: none;
        }
        .lrc-word-wrap--locked { cursor: default; }

        /* الدائرة البيضاوية */
        .lrc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        .lrc-word-wrap--selected .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--correct  .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--wrong    .lrc-oval { border-color: ${CIRCLE_WRONG}; }

        .lrc-word {
          font-size: clamp(13px, 1.4vw, 18px);
          font-weight: 400;
          color: ${TEXT_DEFAULT};
          line-height: 1.4;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ✕ badge */
        .lrc-badge {
          position: absolute;
          top: -8px; right: -8px;
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

        /* Buttons */
        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
        }

        @media (max-width: 500px) {
          .lrc-grid { grid-template-columns: 1fr; }
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
          <span className="WB-ex-A">A</span>
          Look, read, and circle.
        </h1>

        {/* ── Grid ── */}
        <div className="lrc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrc-card">

              {/* الرقم يسار الصورة ومرتفع */}
              <div className="lrc-top">
                <span className="lrc-num">{item.id}</span>
                <div className="lrc-img-wrapper">
                  <img src={item.src} alt={`scene-${item.id}`} className="lrc-img" />
                </div>
              </div>

              {/* الكلمات تحت الصورة بنفس محاذاتها */}
              <div className="lrc-words">
                {item.words.map((word) => {
                  const state = getWordState(item, word);
                  return (
                    <div
                      key={word}
                      className={[
                        "lrc-word-wrap",
                        isLocked ? "lrc-word-wrap--locked" : "",
                        state === "selected" ? "lrc-word-wrap--selected" : "",
                        state === "correct"  ? "lrc-word-wrap--correct"  : "",
                        state === "wrong"    ? "lrc-word-wrap--wrong"    : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleSelect(item.id, word)}
                    >
                      <div className="lrc-oval" />
                      <span className="lrc-word">{word}</span>
                      {state === "wrong" && <div className="lrc-badge">✕</div>}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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