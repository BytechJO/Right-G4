import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd5pg8-instruction1-adult-lady_YJxh5Hg5.mp3";
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#ef4444";
const BOX_BORDER_CORRECT = "#2096a6";
const SENTENCE_COLOR     = "#2b2b2b";
const LABEL_COLOR        = "#2b2b2b";
const PARA_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  🔊  CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.26,  end: 5.84,  text: "Page eight, write activities, exercise C. Listen, read, and number." },
  { start: 7.36,  end: 10.48, text: "Tim will visit the new Museum of Inventions tomorrow." },
  { start: 10.48, end: 13.52, text: "He will take his little brother and friend with him." },
  { start: 13.52, end: 18.56, text: "They will take a bus at eight o'clock and arrive at the museum at nine o'clock." },
  { start: 18.56, end: 21.92, text: "Tim will pack a lunch in case they get hungry." },
  { start: 21.92, end: 28.00, text: "He will have to remember to take his camera with him so he can take pictures in the museum." },
  { start: 28.00, end: 32.68, text: "Tim is certain they will have a lot of fun at the museum tomorrow." },
];

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `My mom is taller than my dad. Dad is younger than my uncle George. George is shorter than his friend Eric. My sister is younger than me. I'm older than my brother Joe. My cousin Ed is stronger than me, but I'm taller than him. My cousin Davy is the tallest of us three.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// true = صح ✓ / false = غلط ✗
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "George is taller than Eric.",    correct: false },
  { id: 2, sentence: "Ed is stronger than me.",        correct: true  },
  { id: 3, sentence: "My sister is older than me.",    correct: false },
  { id: 4, sentence: "Joe is younger than me.",        correct: true  },
  { id: 5, sentence: "Davy is the tallest.",           correct: true  },
  { id: 6, sentence: "Dad is older than my uncle.",    correct: false },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ListenReadWriteTF_QE() {
  const [answers,     setAnswers]     = useState({});  // { id: true | false }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, value) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) score++; });
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

  // حالة كل مربع
  const getBoxState = (item, boxValue) => {
    const sel = answers[item.id];
    const isSelected = sel === boxValue;
    if (!isSelected) return "none";
    if (showAns) return "answer";
    if (showResults) return item.correct === boxValue ? "correct" : "wrong";
    return "selected";
  };

  // لون border المربع
  const getBoxBorder = (item, boxValue) => {
    const state = getBoxState(item, boxValue);
    if (state === "correct" || state === "answer") return BOX_BORDER_CORRECT;
    if (state === "wrong")   return BOX_BORDER_CORRECT;
    return BOX_BORDER_DEFAULT;
  };

  // محتوى المربع
 const getBoxContent = (item, boxValue) => {
    const state = getBoxState(item, boxValue);
    if (state === "none") return null;

    // يظهر الرمز دايماً لما يكون selected أو correct أو answer
    if (state === "selected" || state === "correct" || state === "answer") {
      return boxValue
        ? <span style={{ color: "#ff000f", fontSize: "clamp(16px,2vw,24px)", fontWeight: 700 }}>✓</span>
        : <span style={{  color: "#ff000f",   fontSize: "clamp(16px,2vw,24px)", fontWeight: 700 }}>✗</span>;
    }

    // wrong: اختار الغلط
    if (state === "wrong") {
      return boxValue
        ? <span style={{ color: "#ff000f", fontSize: "clamp(16px,2vw,24px)", fontWeight: 700 }}>✓</span>
        : <span style={{ color: "#ff000f", fontSize: "clamp(16px,2vw,24px)", fontWeight: 700 }}>✗</span>;
    }

    return null;
  };

  // الـ 6 items تتوزع في عمودين: فردي يسار، زوجي يمين
  const leftItems  = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => {
    const wrongSelected = showResults && answers[item.id] !== undefined && answers[item.id] !== item.correct;

    return (
      <div key={item.id} className="tf-row">
        {/* رقم */}
        <span className="tf-num">{item.id}</span>

        {/* جملة */}
        <span className="tf-sentence">{item.sentence}</span>

        {/* مربعي ✓ و ✗ */}
        <div className="tf-boxes">
          {/* مربع ✓ */}
          <div
            className={`tf-box ${!isLocked ? "tf-box--clickable" : ""}`}
            style={{ borderColor: getBoxBorder(item, true) }}
            onClick={() => handleSelect(item.id, true)}
          >
            {getBoxContent(item, true)}
            {/* إذا اختار ✓ وكانت غلط */}
            {showResults && answers[item.id] === true && item.correct !== true && (
              <div className="tf-badge">✕</div>
            )}
          </div>

          {/* مربع ✗ */}
          <div
            className={`tf-box ${!isLocked ? "tf-box--clickable" : ""}`}
            style={{ borderColor: getBoxBorder(item, false) }}
            onClick={() => handleSelect(item.id, false)}
          >
            {getBoxContent(item, false)}
            {/* إذا اختار ✗ وكانت غلط */}
            {showResults && answers[item.id] === false && item.correct !== false && (
              <div className="tf-badge">✕</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Paragraph + image ── */
        .tf-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .tf-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 2;
          margin: 0;
        }

        .tf-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Grid عمودين ── */
        .tf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 1.6vw, 20px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف واحد ── */
        .tf-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
        }

        .tf-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .tf-sentence {
          font-size: clamp(13px, 1.4vw, 17px);
          color: ${SENTENCE_COLOR};
          flex: 1;
          line-height: 1.4;
        }

        /* ── الصندوقين ── */
        .tf-boxes {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        .tf-box {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: border-color 0.2s;
          box-sizing: border-box;
          user-select: none;
        }
        .tf-box--clickable { cursor: pointer; }
        .tf-box--clickable:hover { background: #f0fbfc; }

        /* ✕ badge فوق المربع */
        .tf-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .tf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .tf-top  { grid-template-columns: 1fr; }
          .tf-img  { width: 100%; }
          .tf-grid { grid-template-columns: 1fr; }
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
          Listen, read, and write <span style={{ color : "#ff000f"}}> ✓ </span>or <span style={{ color : "#ff000f"}}> ✗</span>.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={6}
          />
        </div>

        {/* ── Paragraph + Image ── */}
        <div className="tf-top">
          <p className="tf-para">{PARAGRAPH}</p>
          <img src={imgScene} alt="scene" className="tf-img" />
        </div>

        {/* ── Items Grid ── */}
        <div className="tf-grid">
          {/* عمود يسار */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.6vw,20px)" }}>
            {leftItems.map(renderItem)}
          </div>
          {/* عمود يمين */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.6vw,20px)" }}>
            {rightItems.map(renderItem)}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="tf-buttons">
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