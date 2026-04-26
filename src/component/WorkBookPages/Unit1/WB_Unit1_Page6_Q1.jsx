import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const WORD_BANK_BORDER_COLOR  = "#2096a6";   // بوردر الـ word bank box
const WORD_BANK_BG_COLOR      = "#ffffff";   // خلفية الـ word bank box
const WORD_BANK_TEXT_COLOR    = "#2b2b2b";   // نص الـ word bank
const WORD_BANK_DIVIDER_COLOR = "#3a3a3a";   // لون الـ | بين الكلمات

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";   // خط الـ input الفارغ / صح
const INPUT_UNDERLINE_WRONG   = "#ef4444";   // خط الـ input عند الخطأ

const INPUT_TEXT_COLOR        = "#2b2b2b";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ

const NUMBER_COLOR            = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS       = "10px";
const IMG_HEIGHT              = "clamp(140px, 20vw, 220px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "play with the cats",
  "draw a picture",
  "watch the horses",
  "look at the ducks",
];

const ITEMS = [
  { id: 1, img: img1, correct: "She will watch the horses."    },
  { id: 2, img: img2, correct: "She will draw a picture."      },
  { id: 3, img: img3, correct: "He will look at the ducks."    },
  { id: 4, img: img4, correct: "They will play with the cats." },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();

// correctAnswers array لكل سؤال — يقبل بوجود نقطة أو بدونها
const getCorrectAnswers = (correct) => [
  correct,
  correct.replace(/\.$/, ""),   // بدون نقطة
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteSentences_QG() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  // ── handlers ──────────────────────────────
  const handleChange = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every(
      (item) => answers[item.id] && answers[item.id].trim() !== ""
    );
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      const accepted = getCorrectAnswers(item.correct);
      if (accepted.some((ans) => normalize(answers[item.id] || "") === normalize(ans))) score++;
    });
    setShowResults(true); // 🔒
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true); // 🔒
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false); // 🔓
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    const accepted = getCorrectAnswers(item.correct);
    return !accepted.some((ans) => normalize(answers[item.id] || "") === normalize(ans));
  };

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Word Bank ── */
        .lws-bank {
          width: 100%;
          border: 2px solid ${WORD_BANK_BORDER_COLOR};
          border-radius: 10px;
          background: ${WORD_BANK_BG_COLOR};
          padding: clamp(8px, 1.2vw, 14px) clamp(12px, 2vw, 24px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 12px);
          box-sizing: border-box;
        }

        .lws-word {
font-size: clamp(15px, 1.9vw, 22px);       
          color: ${WORD_BANK_TEXT_COLOR};
          white-space: nowrap;
        }

        .lws-divider {
          color: ${WORD_BANK_DIVIDER_COLOR};
font-size: clamp(15px, 1.9vw, 22px);          u
ser-select: none;
        }

        /* ── 2-column grid ── */
        .lws-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.6vw, 32px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card: num + img + input ── */
        .lws-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Number row */
        .lws-num-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lws-num {
font-size: clamp(15px, 1.9vw, 22px);          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Image */
        .lws-img-box {
          width: 100%;
          height: ${IMG_HEIGHT};
          border-radius: ${IMG_BORDER_RADIUS};
          border:2px solid #2096a6;
          overflow: hidden;
        }
        .lws-img {
          width: 100%;
          height: 100%;
          
          object-fit: cover;
          display: block;
        }

        /* Input row — full width underline */
        .lws-input-wrap {
          position: relative;
          width: 100%;
        }

        .lws-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);         
          color: ${INPUT_TEXT_COLOR};
                       line-height: 1.5;
          box-sizing: border-box;
        }
        .lws-input:disabled {
          cursor: default;
        }

        /* ✕ wrong badge */
        .lws-badge {
          position: absolute;
          top: -9px;
          right: -2px;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lws-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 560px) {
          .lws-grid {
            grid-template-columns: 1fr;
          }
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
          <span className="WB-ex-A">G</span>
          Look, read, and write sentences.
        </h1>

        {/* ── Word Bank ── */}
        <div className="lws-bank">
          {WORD_BANK.map((word, i) => (
            <React.Fragment key={word}>
              <span className="lws-word">{word}</span>
              {i < WORD_BANK.length - 1 && (
                <span className="lws-divider">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── 2-column grid ── */}
        <div className="lws-grid">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const uColor = getUnderlineColor(item);
            const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

            return (
              <div key={item.id} className="lws-card">

                {/* Number */}
                <div className="lws-num-row">
                  <span className="lws-num">{item.id}</span>
                </div>

                {/* Image */}
                <div className="lws-img-box">
                  <img src={item.img} alt={`q${item.id}`} className="lws-img" />
                </div>

                {/* Input */}
                <div className="lws-input-wrap">
                  <input
                    type="text"
                    className="lws-input"
                    value={value}
                    disabled={isLocked}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{
                      borderBottomColor: uColor,
                      color: tColor,
                      cursor: isLocked ? "default" : "text",
                    }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lws-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lws-buttons">
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