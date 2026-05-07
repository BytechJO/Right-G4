import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 27.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 28.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 29.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 30.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const ANSWER_COLOR   = "#c0392b";
const TEXT_DEFAULT   = "#2b2b2b";
const LINE_COLOR     = "#2b2b2b";
const WRONG_COLOR    = "#ef4444";
const RIGHT_COLOR    = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";

// ─────────────────────────────────────────────
//  📝  IMAGE CARDS DATA
// ─────────────────────────────────────────────
const CARDS = [
  { id: 1, src: img1, label1: "heavy",  label2: "heavier"  },
  { id: 2, src: img2, label1: "young",  label2: "younger"  },
  { id: 3, src: img3, label1: "light",  label2: "lighter"  },
  { id: 4, src: img4, label1: "old",    label2: "older"    },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "young",   correct: "old"     },
  { id: 2, word: "heavier", correct: "lighter" },
  { id: 3, word: "light",   correct: "heavy"   },
  { id: 4, word: "older",   correct: "younger" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_LookWriteOpposite_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleChange = (id, val) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = ITEMS.every((item) => (answers[item.id] || "").trim() !== "");
    if (!allFilled) { ValidationAlert.info("Please fill in all the blanks."); return; }
    let score = 0;
    ITEMS.forEach((item) => {
      if ((answers[item.id] || "").trim().toLowerCase() === item.correct.toLowerCase()) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)  ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const getState = (item) => {
    if (showAns) return "answer";
    if (showResults) {
      const val = (answers[item.id] || "").trim().toLowerCase();
      return val === item.correct.toLowerCase() ? "correct" : "wrong";
    }
    return "editing";
  };

  const getColor = (item) => {
    const state = getState(item);
    if (state === "answer")  return ANSWER_COLOR;
    if (state === "correct") return RIGHT_COLOR;
    if (state === "wrong")   return WRONG_COLOR;
    return TEXT_DEFAULT;
  };

  // عمودين: فردي يسار، زوجي يمين
  const leftItems  = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => {
    const state = getState(item);
    const color = getColor(item);
    const val   = answers[item.id] || "";

    return (
      <div key={item.id} className="owo-row">
        <span className="owo-num">{item.id}</span>
        <span className="owo-word">{item.word}</span>

        <span className="owo-input-wrap">
          <input
            className="owo-input"
            type="text"
            value={state === "answer" ? item.correct : val}
            disabled={isLocked}
            onChange={(e) => handleChange(item.id, e.target.value)}
            style={{
              color : state === "answer" ? color : "AccentColor",
              borderBottomColor: state !== "editing" ? color : LINE_COLOR,
            }}
          />
          {state === "wrong" && <div className="owo-badge">✕</div>}
  
        </span>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── صف الصور ── */
        .owo-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
          margin-top :  8% ;
        }

        .owo-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .owo-card img {
          width: 100%;
          object-fit: cover;
          display: block;
          height : auto ;
        }

        .owo-card-label {
          background: #e8e8e8;
          text-align: center;
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${TEXT_DEFAULT};
          padding: clamp(5px, 0.6vw, 8px) 0;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* ── Grid الأسئلة ── */
        .owo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 2vw, 26px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف سؤال ── */
        .owo-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1vw, 12px);
        }

        .owo-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .owo-word {
          font-size: clamp(14px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .owo-input-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
          min-width: clamp(80px, 10vw, 130px);
        }

        .owo-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${LINE_COLOR};
          outline: none;
          background: transparent;
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 600;
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          color: ${TEXT_DEFAULT};
        }
        .owo-input:disabled { opacity: 1; cursor: default; }

        .owo-hint {
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          margin-top: 2px;
          padding: 0 4px;
        }

        /* ✕ badge */
        .owo-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .owo-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
        }

        @media (max-width: 560px) {
          .owo-cards { grid-template-columns: repeat(2, 1fr); }
          .owo-grid  { grid-template-columns: 1fr; }
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
          Look and write the opposite.
        </h1>

        {/* ── صف الصور ── */}
        <div className="owo-cards">
          {CARDS.map((card) => (
            <div key={card.id} className="owo-card">
              <img src={card.src} alt={card.label1} />
            </div>
          ))}
        </div>

        {/* ── Grid الأسئلة ── */}
        <div className="owo-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,24px)" }}>
            {leftItems.map(renderItem)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,24px)" }}>
            {rightItems.map(renderItem)}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="owo-buttons">
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