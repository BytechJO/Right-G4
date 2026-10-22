import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 4 characters A B C D
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 1.svg";
import imgB from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 2.svg";
import imgC from  "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 3.svg";
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 4.svg";
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
const QUESTION_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const LABEL_BG                = "#9e9e9e";
const LABEL_TEXT              = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const CHARS = [
  { label: "A", src: imgA },
  { label: "B", src: imgB },
  { label: "C", src: imgC },
  { label: "D", src: imgD },
];

const ITEMS = [
  {
    id:      1,
    question: "Who is the shortest?",
    correct: ["D is the shortest.", "d is the shortest"],
    answer:  "D is the shortest.",
  },
  {
    id:      2,
    question: "Who is younger, A or B?",
    correct: ["A is younger.", "a is younger"],
    answer:  "A is younger.",
  },
  {
    id:      3,
    question: "Who is lighter, A or C?",
    correct: ["C is lighter.", "c is lighter"],
    answer:  "C is lighter.",
  },
  {
    id:      4,
    question: "Who is the oldest?",
    correct: ["B is the oldest.", "b is the oldest"],
    answer:  "B is the oldest.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWrite_QD() {
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
    <div data-adapt-scope="review3&4_Review4_Page2_Q1" className="main-container-component">
<style>{`[data-adapt-scope="review3&4_Review4_Page2_Q1"] input:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Characters row ── */
        .lwqd-chars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          align-items: flex-end;
        }

        .lwqd-char-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lwqd-char-img {
          width: clamp(70px, 10vw, 140px);
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Label circle (A / B / C / D) */
        .lwqd-char-label {
          width: clamp(28px, 3.2vw, 40px);
          height: clamp(28px, 3.2vw, 40px);
          border-radius: 50%;
          background: ${LABEL_BG};
          color: ${LABEL_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ── Questions list ── */
        .lwqd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          margin-top: clamp(8px, 1.2vw, 16px);
        }

        /* Single row: num | question | input */
        .lwqd-row {
          display: grid;
          grid-template-columns: auto clamp(180px, 24vw, 300px) 1fr;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        .lwqd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .lwqd-question {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${QUESTION_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        /* Input wrap */
        .lwqd-input-wrap {
          position: relative;
        }

        .lwqd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwqd-input:disabled  { opacity: 1; cursor: default; }
        .lwqd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqd-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwqd-badge {
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

        .lwqd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwqd-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .lwqd-input-wrap { grid-column: 1 / -1; }
          .lwqd-question   { white-space: normal; }
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
          subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." isReview sectionLetter="D" title={<>Look and write.</>} />

        {/* ── Characters row ── */}
        <div className="lwqd-chars">
          {CHARS.map((ch) => (
            <div key={ch.label} className="lwqd-char-card">
              <img src={ch.src} alt={({[imgA]:"Person A, wearing a red shirt and blue shorts.",[imgB]:"Person B, an elderly man with glasses, a green jacket and a walking stick.",[imgC]:"Person C, a man wearing a yellow shirt and blue trousers.",[imgD]:"Person D, with curly red hair, a green top and purple trousers."})[ch.src]} className="lwqd-char-img" />
              <div className="lwqd-char-label">{ch.label}</div>
            </div>
          ))}
        </div>

        {/* ── Questions ── */}
        <div className="lwqd-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lwqd-row">
                <span className="lwqd-num">{item.id}</span>
                <span className="lwqd-question">{item.question}</span>
                <div className="lwqd-input-wrap">
                  <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "lwqd-input",
                      wrong   ? "lwqd-input--wrong"  : "",
                      showAns ? "lwqd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : ({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwqd-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqd-buttons">
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