import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const CUE_COLOR               = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    cue:     "Daniel / smarter / Sam",
    correct: ["Daniel is smarter than Sam.", "daniel is smarter than sam"],
    answer:  "Daniel is smarter than Sam.",
  },
  {
    id:      2,
    cue:     "snake / longest",
    correct: ["The snake is the longest of all the snakes.", "the snake is the longest of all the snakes"],
    answer:  "The snake is the longest of all the snakes.",
  },
  {
    id:      3,
    cue:     "Meg / youngest",
    correct: ["Meg is the youngest of the sisters.", "meg is the youngest of the sisters"],
    answer:  "Meg is the youngest of the sisters.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteSentences_QC() {
  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.scrambled ? "Unscramble: "+item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.question || item.cue || item.hint || "Write an answer using the diagram."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="review3&4_Review4_Page1_Q3" className="main-container-component">
<style>{`[data-adapt-scope="review3&4_Review4_Page1_Q3"] input:focus-visible, [data-adapt-scope="review3&4_Review4_Page1_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review4_Page1_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rwsc-list {
      display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    margin: 10% 0;
        }

        /* Single row: num + cue + input */
        .rwsc-row {
          display: grid;
          grid-template-columns: auto clamp(120px, 16vw, 200px) 1fr;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 20px);
          min-width: 0;
        }

        .rwsc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwsc-cue {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${CUE_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        .rwsc-input-wrap {
          position: relative;
        }

        .rwsc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwsc-input:disabled  { opacity: 1; cursor: default; }
        .rwsc-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwsc-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rwsc-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rwsc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwsc-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .rwsc-input-wrap { grid-column: 1 / -1; }
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
          subTitle="Use the given words as a sentence frame, then add the missing grammar words and punctuation before checking." isReview sectionLetter="C" title={<>Read and write sentences. You will need to add words.</>} />

        {/* ── Items ── */}
        <div className="rwsc-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rwsc-row">
                <span className="rwsc-num">{item.id}</span>
                <span className="rwsc-cue">{item.cue}</span>
                <div className="rwsc-input-wrap">
                  <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rwsc-input",
                      wrong   ? "rwsc-input--wrong"  : "",
                      showAns ? "rwsc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : ({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwsc-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwsc-buttons">
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