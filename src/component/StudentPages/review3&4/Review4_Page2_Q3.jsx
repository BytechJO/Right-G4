import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — الفيل والماوس صورة واحدة
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 9.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER        = "#2195a6";
const TEXT_GIVEN          = "#2b2b2b";
const INPUT_ANSWER_COLOR  = "#c81e1e";
const INPUT_TEXT_COLOR    = "#2b2b2b";
const INPUT_UL_DEFAULT    = "transparent";
const INPUT_UL_WRONG      = "#ef4444";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";
const HEADER_BG           = "#f3f4f6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" → خلية معطاة
//        "input" → خلية فيها input
// ─────────────────────────────────────────────
const ROWS = [
  {
    id: 1,
    cells: [
      { type: "given", text: "important"       },
      { type: "input", correct: ["more important"],  answer: "more important"  },
      { type: "given", text: "most important"  },
    ],
  },
  {
    id: 2,
    cells: [
      { type: "given", text: "careful"         },
      { type: "input", correct: ["more careful"],    answer: "more careful"    },
      { type: "input", correct: ["most careful"],    answer: "most careful"    },
    ],
  },
  {
    id: 3,
    cells: [
      { type: "input", correct: ["dangerous"],       answer: "dangerous"       },
      { type: "given", text: "more dangerous"  },
      { type: "input", correct: ["most dangerous"],  answer: "most dangerous"  },
    ],
  },
  {
    id: 4,
    cells: [
      { type: "given", text: "valuable"        },
      { type: "input", correct: ["more valuable"],   answer: "more valuable"   },
      { type: "input", correct: ["most valuable"],   answer: "most valuable"   },
    ],
  },
];

// collect all input keys: "rowId-colIdx"
const ALL_INPUTS = [];
ROWS.forEach((row) => {
  row.cells.forEach((cell, ci) => {
    if (cell.type === "input") ALL_INPUTS.push({ key: `${row.id}-${ci}`, cell });
  });
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QF() {
  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ALL_INPUTS.map(({key,cell})=>({key,correct:cell.correct,answer:cell.answer,label:`Row ${key.split("-")[0]}. Complete adjective form in column ${Number(key.split("-")[1])+1}.`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongCell = (key) => !showAns && results[key] === "wrong";
  

  return (
    <div data-adapt-scope="review3&4_Review4_Page2_Q3" className="main-container-component">
<style>{`[data-adapt-scope="review3&4_Review4_Page2_Q3"] input:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Layout: image left | table right ── */
        .rwf-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
          margin : 10% 0 ;
        }

        .rwf-scene-img {
          width: clamp(130px, 18vw, 240px);
          height: auto;
          display: block;
          flex-shrink: 0;
        }

        /* ── Table ── */
        .rwf-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .rwf-table th,
        .rwf-table td {
          border: 2px solid ${TABLE_BORDER};
          padding: clamp(8px, 1.1vw, 14px) clamp(10px, 1.4vw, 18px);
          text-align: center;
          vertical-align: middle;
        }

        .rwf-table th {
          background: ${HEADER_BG};
          font-size: clamp(12px, 1.4vw, 17px);
          font-weight: 700;
          color: #6b7280;
        }

        /* given cell */
        .rwf-given {
          font-size: clamp(13px, 1.55vw, 19px);
          font-weight: 500;
          color: ${TEXT_GIVEN};
          line-height: 1.4;
        }

        /* input cell */
        .rwf-input-wrap {
          position: relative;
          width: 100%;
        }

        .rwf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.55vw, 19px);
          font-weight: 500;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
        }
        .rwf-input:focus    { border-bottom-color: #9ca3af; }
        .rwf-input:disabled { opacity: 1; cursor: default; border-bottom-color: transparent; }
        .rwf-input--wrong   { border-bottom-color: ${INPUT_UL_WRONG}; }

        /* ✕ badge */
        .rwf-badge {
          position: absolute;
          top: -8px; right: -4px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwf-body { grid-template-columns: 1fr; }
          .rwf-scene-img { width: clamp(100px, 40vw, 160px); margin: 0 auto; }
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
        <ExerciseHeader
          subTitle="Read the full prompt first, then complete each answer carefully before checking your work." isReview sectionLetter="F" title={<>Read and write.</>} />

        {/* ── Body ── */}
        <div className="rwf-body">

          {/* صورة الفيل والماوس */}
          <img src={imgScene} alt="A large elephant and a small mouse." className="rwf-scene-img" />

          {/* الجدول */}
          <table className="rwf-table">

            <tbody>
              {ROWS.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, ci) => {
                    const key = `${row.id}-${ci}`;

                    if (cell.type === "given") {
                      return (
                        <td key={ci}>
                          <span className="rwf-given">{cell.text}</span>
                        </td>
                      );
                    }

                    const wrong    = isWrongCell(key, cell.correct);
                    
                    const value    = answers[key] || "";
                    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                    const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;

                    return (
                      <td key={ci}>
                        <div className="rwf-input-wrap">
                          <input placeholder="Answer" aria-invalid={results[key] === "wrong"} title={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} {...fieldKeys}
                            type="text"
                            className={[
                              "rwf-input",
                              wrong   ? "rwf-input--wrong"  : "",
                              showAns ? "rwf-input--answer" : "",
                            ].filter(Boolean).join(" ")}
                            value={value}
                            disabled={showAns || results[key] === "correct"}
                            onChange={(e) => handleChange(key, e.target.value, cell.correct)}
                            style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[key] === "correct" ? "#16a34a" : results[key] === "wrong" ? "#ef4444" : ({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                            spellCheck={false}
                            autoComplete="off"
                          />
                          {wrong && <div className="rwf-badge">✕</div>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* ── Buttons ── */}
        <div className="rwf-buttons">
          <div className="action-buttons-container">
<button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} onClick={handleReset} className="try-again-button">Start Again ↻</button>
<button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShowAnswer} className="show-answer-btn swal-continue">Show Answer</button>
<button type="button" aria-label="Check Answer" {...activationKeys} onClick={handleCheck} disabled={checkDisabled} style={{cursor:checkDisabled ? "not-allowed":"pointer"}} className="check-button2">Check Answer ✓</button>
</div>
        </div>
      </div>
    </div>
  );
}