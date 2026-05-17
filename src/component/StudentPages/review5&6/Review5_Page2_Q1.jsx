import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 8 صور بنفس ترتيب الكتاب
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 43.svg"; // chair+bag   → 3
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 41.svg"
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 39.svg"
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 37.svg"
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 44.svg"
import imgF from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 42.svg"
import imgG from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 40.svg"
import imgH from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 38.svg"

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const NUMBER_CLR_DEFAULT  = "#2b2b2b";
const NUMBER_CLR_CORRECT  = "#ffffff";
const NUMBER_CLR_WRONG    = "#ffffff";
const BADGE_DEFAULT_BG    = "transparent"
const BADGE_CORRECT_BG    = "transparent"
const BADGE_WRONG_BG      = "transparent"
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";
const SENTENCE_COLOR      = "#2b2b2b";
const NUM_LABEL_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// الجمل — يسار + يمين بجانب بعض
const SENTENCES = [
  { num: 1, text: "The book is on the table."           },
  { num: 2, text: "Tilly is under the bed."              },
  { num: 3, text: "The backpack is next to the chair."   },
  { num: 4, text: "The picture is beside the window."    },
  { num: 5, text: "The skateboard and bike are by the tree." },
  { num: 6, text: "The monkeys are in the trees."        },
  { num: 7, text: "The chair is behind the desk."        },
  { num: 8, text: "The pen is between the books."        },
];

// الصور بترتيب الكتاب (صف فوق: A B C D | صف تحت: E F G H)
// correct = الرقم الصحيح لكل صورة
const IMAGES = [
  { id: "A", src: imgA, correct: 3 },
  { id: "B", src: imgB, correct: 8 },
  { id: "C", src: imgC, correct: 1 },
  { id: "D", src: imgD, correct: 5 },
  { id: "E", src: imgE, correct: 7 },
  { id: "F", src: imgF, correct: 2 },
  { id: "G", src: imgG, correct: 6 },
  { id: "H", src: imgH, correct: 4 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookNumber_QD() {
  const [answers,     setAnswers]     = useState({});   // { "A": "3", ... }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // refs للـ auto-focus
  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const img = IMAGES.find((i) => i.id === id);
    if (showResults && img && String(answers[id]) === String(img.correct)) return;

    // اقبل رقم واحد فقط
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setAnswers((prev) => ({ ...prev, [id]: digit }));

    // auto-focus للصورة التالية لو كتب رقم
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

  // ── Badge state per image ──
  const getBadgeState = (img) => {
    const val = answers[img.id];
    if (!val) return "empty";
    if (showAns) return "correct";
    if (showResults) return String(val) === String(img.correct) ? "correct" : "wrong";
    return "filled";
  };

  const badgeBg = (state) => {
    if (state === "correct") return BADGE_CORRECT_BG;
    if (state === "wrong")   return BADGE_WRONG_BG;
    return BADGE_DEFAULT_BG;
  };

  const badgeTextColor = (state) => {
    if (state === "correct" || state === "wrong") return "#000000ff";
    return NUMBER_CLR_DEFAULT;
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Sentence list — 2 columns ── */
        .rln-sentences {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.6vw, 8px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        .rln-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rln-sent-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUM_LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rln-sent-text {
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        /* ── 4×2 image grid ── */
        .rln-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* Single image card */
        .rln-card {
          position: relative;
          overflow: visible;
          flex-shrink: 0;
        }

        .rln-img {
          width: 95%;
          height: auto ;
          object-fit: cover;
          display: block;
        }

        /* Badge (number circle) — bottom-right */
        .rln-badge-wrap {
          position: absolute;
          bottom: 5px;
          right: 18px;
        }

        .rln-badge {
          position: relative;
          width: clamp(26px, 3.2vw, 26px);
          height: clamp(26px, 3.2vw, 26px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }

        /* ✕ wrong indicator */
        .rln-wrong-x {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Input inside badge */
        .rln-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(12px, 1.5vw, 18px);
          caret-color: #333;
          z-index: 2;
        }
        .rln-input:disabled { cursor: default; }

        /* Display number */
        .rln-num-display {
          font-size: clamp(12px, 1.5vw, 18px);
          font-weight: 700;
          line-height: 1;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .rln-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rln-sentences { grid-template-columns: 1fr; }
          .rln-grid { grid-template-columns: repeat(2, 1fr); }
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
          Read, look, and number the pictures.
        </h1>

        {/* ── Sentences — 2 columns ── */}
        <div className="rln-sentences">
          {SENTENCES.map((s) => (
            <div key={s.num} className="rln-sentence-row">
              <span className="rln-sent-num">{s.num}</span>
              <span className="rln-sent-text">{s.text}</span>
            </div>
          ))}
        </div>

        {/* ── 4×2 image grid ── */}
        <div className="rln-grid">
          {IMAGES.map((img) => {
            const state    = getBadgeState(img);
            const val      = answers[img.id] || "";
            const bg       = badgeBg(state);
            const txtColor = badgeTextColor(state);
            const isLocked = showAns || (showResults && state === "correct");
            const isWrong  = state === "wrong";

            return (
              <div key={img.id} className="rln-card">
                <img src={img.src} alt={`img-${img.id}`} className="rln-img" />

                {/* Badge with number input */}
                <div className="rln-badge-wrap">
                  <div
                    className="rln-badge"
                    style={{ background: bg, color: txtColor }}
                  >
                    <span className="rln-num-display">{val}</span>

                    {/* Transparent input overlay */}
                    <input
                      ref={(el) => { inputRefs.current[img.id] = el; }}
                      className="rln-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      disabled={isLocked}
                      onChange={(e) => handleChange(img.id, e.target.value)}
                      style={{ color: "transparent", caretColor: "transparent" }}
                    />

                    {/* ✕ badge لو غلط */}
                    {isWrong && <div className="rln-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rln-buttons">
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