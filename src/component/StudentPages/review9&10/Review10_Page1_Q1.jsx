import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 1.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const LETTER_GIVEN_COLOR  = "#2b2b2b";   // الحروف الظاهرة
const LETTER_INPUT_COLOR  = "#2b2b2b";   // ما يكتبه الطالب
const LETTER_ANSWER_COLOR = "#c81e1e";   // لما Show Answer
const LETTER_UL_DEFAULT   = "#3f3f3f";
const LETTER_UL_WRONG     = "#ef4444";
const NUMBER_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  parts: مصفوفة من { t: "given"|"input", v, id? }
//  answer: الكلمة الكاملة الصحيحة
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    // com_f_o_r_t_a_b_l_e → "comfortable"
    parts: [
      { t:"given", v:"c" }, { t:"given", v:"o" }, { t:"given", v:"m" },
      { t:"input",  id:"1_1", correct:"f" },
      { t:"input",  id:"1_2", correct:"o" },
      { t:"input",  id:"1_3", correct:"r" },
      { t:"given", v:"t" },
      { t:"input",  id:"1_4", correct:"a" },
      { t:"input",  id:"1_5", correct:"b" },
      { t:"input",  id:"1_6", correct:"l" },
      { t:"input",  id:"1_7", correct:"e" },
    ],
    answer: "comfortable",
  },
  {
    id: 2,
    // _c_a_S_ual → "casual"
    parts: [
      { t:"input",  id:"2_1", correct:"c" },
      { t:"input",  id:"2_2", correct:"a" },
      { t:"input",  id:"2_3", correct:"s" },
      { t:"given", v:"u" }, { t:"given", v:"a" }, { t:"given", v:"l" },
    ],
    answer: "casual",
  },
  {
    id: 3,
    // _p_a_r_tic_u_l_a_r → "particular"
    parts: [
      { t:"input",  id:"3_1", correct:"p" },
      { t:"input",  id:"3_2", correct:"a" },
      { t:"input",  id:"3_3", correct:"r" },
      { t:"given", v:"t" }, { t:"given", v:"i" }, { t:"given", v:"c" },
      { t:"input",  id:"3_4", correct:"u" },
      { t:"input",  id:"3_5", correct:"l" },
      { t:"input",  id:"3_6", correct:"a" },
      { t:"input",  id:"3_7", correct:"r" },
    ],
    answer: "particular",
  },
  {
    id: 4,
    // _p_u_r_c_h_ase → "purchase"
    parts: [
      { t:"input",  id:"4_1", correct:"p" },
      { t:"input",  id:"4_2", correct:"u" },
      { t:"input",  id:"4_3", correct:"r" },
      { t:"input",  id:"4_4", correct:"c" },
      { t:"input",  id:"4_5", correct:"h" },
      { t:"given", v:"a" }, { t:"given", v:"s" }, { t:"given", v:"e" },
    ],
    answer: "purchase",
  },
];

// All input parts flat
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.t === "input")
);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WriteVocab_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value, correct, allParts) => {
    if (showAns) return;
    const letter = value.replace(/[^a-zA-Z]/g,"").slice(-1).toLowerCase();
    setAnswers((prev) => ({ ...prev, [id]: letter }));

    // auto-focus next input in same item
    if (letter) {
      const inputs = allParts.filter((p) => p.t === "input");
      const idx = inputs.findIndex((p) => p.id === id);
      const next = inputs[idx + 1];
      if (next && inputRefs.current[next.id]) {
        inputRefs.current[next.id].focus();
      }
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please fill in all missing letters first."); return; }
    let score = 0;
    ITEMS.forEach((item) => {
      const allCorrect = item.parts
        .filter((p) => p.t === "input")
        .every((p) => answers[p.id]?.toLowerCase() === p.correct.toLowerCase());
      if (allCorrect) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((p) => { filled[p.id] = p.correct; });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isInputWrong = (p) =>
    showResults && !showAns && answers[p.id]?.toLowerCase() !== p.correct.toLowerCase();

  const isInputDisabled = (p) =>
    showAns || (showResults && answers[p.id]?.toLowerCase() === p.correct.toLowerCase());

  const renderParts = (item) =>
    item.parts.map((part, i) => {
      if (part.t === "given") {
        return (
          <span key={i} className="wva-letter-given">{part.v}</span>
        );
      }

      const wrong    = isInputWrong(part);
      const disabled = isInputDisabled(part);
      const value    = answers[part.id] || "";
      const color    = showAns ? LETTER_ANSWER_COLOR : wrong ? LETTER_UL_WRONG : LETTER_INPUT_COLOR;
      const ulColor  = wrong ? LETTER_UL_WRONG : LETTER_UL_DEFAULT;

      return (
        <span key={part.id} className="wva-letter-wrap">
          <input
            ref={(el) => { inputRefs.current[part.id] = el; }}
            className={["wva-letter-input", wrong?"wva-letter-input--wrong":"", showAns?"wva-letter-input--answer":""].filter(Boolean).join(" ")}
            type="text"
            maxLength={1}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(part.id, e.target.value, part.correct, item.parts)}
            style={{ borderBottomColor: ulColor, color }}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="wva-letter-badge">✕</span>}
        </span>
      );
    });

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Body: items + image ── */
        .wva-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
          margin : 8% 0 ;
        }

        /* ── Items list ── */
        .wva-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
        }

        /* Single item row: num + letters */
        .wva-item {
          display: flex;
          align-items: flex-end;
          gap: clamp(2px, 0.3vw, 4px);
          flex-wrap: nowrap;
        }

        .wva-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          margin-right: clamp(6px, 0.8vw, 10px);
          line-height: 1.5;
        }

        /* Given letter */
        .wva-letter-given {
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          width: clamp(18px, 2.4vw, 30px);
          font-size: clamp(16px, 2.1vw, 26px);
          font-weight: 600;
          color: ${LETTER_GIVEN_COLOR};
          border-bottom: 1px solid ${LETTER_UL_DEFAULT};
          line-height: 1.5;
          text-align: center;
          flex-shrink: 0;
        }

        /* Input letter wrap */
        .wva-letter-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .wva-letter-input {
          width: clamp(18px, 2.4vw, 30px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${LETTER_UL_DEFAULT};
          outline: none;
          font-size: clamp(16px, 2.1vw, 26px);
          font-weight: 600;
          color: ${LETTER_INPUT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
          padding: 0;
          transition: border-color 0.15s;
          caret-color: #2b2b2b;
        }
        .wva-letter-input:disabled       { opacity: 1; cursor: default; }
        .wva-letter-input--wrong         { border-bottom-color: ${LETTER_UL_WRONG}; }
        .wva-letter-input--answer        { color: ${LETTER_ANSWER_COLOR}; }

        /* ✕ mini badge */
        .wva-letter-badge {
          position: absolute;
          top: -7px; right: -5px;
          width: clamp(12px, 1.4vw, 15px);
          height: clamp(12px, 1.4vw, 15px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 8px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Scene image */
        .wva-scene-img {
          width: 120%;
          height: 100%;
          display: block;
          flex-shrink: 0;
        }

        .wva-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .wva-body { grid-template-columns: 1fr; }
          .wva-scene-img { width: 100%; max-width: 300px; margin: 0 auto; }
          .wva-item { flex-wrap: wrap; }
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
          Write the vocabulary word.
        </h1>

        {/* ── Body ── */}
        <div className="wva-body">

          {/* Items */}
          <div className="wva-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wva-item">
                <span className="wva-num">{item.id}</span>
                {renderParts(item)}
              </div>
            ))}
          </div>

          {/* Image */}
          <img src={imgScene} alt="scene" className="wva-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="wva-buttons">
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