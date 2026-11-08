import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 2.svg"; // phone
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 3.svg"; // dishes
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 4.svg"; // soccer
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 5.svg";
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
; // newspaper

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const GIVEN_COLOR      = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" | "input"
//  before: نص ثابت قبل input (لو موجود)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:    1,
    src:   img1,
    type:  "input",
    before:  "",
    correct: ["Have you talked on the phone today?", "Have you talked on the phone today"],
    answer: "Have you talked on the phone today?",
  },
  {
    id:      2,
    src:     img2,
    type:    "input",
    before:  "",
    correct: ["Have they washed the dishes?", "Have they washed the dishes"],
    answer:  "Have they washed the dishes?",
  },
  {
    id:      3,
    src:     img3,
    type:    "input",
    before:  "",
    correct: ["Has he played soccer?", "has he played soccer"],
    answer:  "Has he played soccer?",
  },
  {
    id:      4,
    src:     img4,
    type:    "input",
    before:  "",
    correct: ["Has he read the newspaper?", "has he read the newspaper"],
    answer:  "Has he read the newspaper?",
  },
];

const INPUT_ITEMS = ITEMS.filter((i) => i.type === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadComplete_QB() {
  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.filter(item=>item.type!=="given").map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.scrambled ? "Unscramble: "+item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.prefix ? item.prefix+" Explain using the picture or diagram." : item.question || item.cue || item.hint || "Write an answer using the diagram."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="review9&10_Review10_Page1_Q2" className="main-container-component">
<style>{`[data-adapt-scope="review9&10_Review10_Page1_Q2"] input:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review10_Page1_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review10_Page1_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lrbc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* num | img | content */
        .lrbc-row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrbc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrbc-img {
          width: 70%;
          height: auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        /* Given text */
        .lrbc-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        /* Input row with optional before text */
        .lrbc-content {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          width: 100%;
        }

        .lrbc-before {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrbc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 16vw, 240px);
        }

        .lrbc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrbc-input:disabled  { opacity: 1; cursor: default; }
        .lrbc-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lrbc-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        .lrbc-badge {
          position: absolute;
          top: -8px; right: 0;
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

        .lrbc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lrbc-row { grid-template-columns: auto 1fr; }
          .lrbc-img  { grid-column: 2; }
        }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <ExerciseHeader subTitle="Read the whole sentence for meaning, then complete each blank with the word or form that fits before checking." isReview sectionLetter="B" title={<>Look, read, and complete.</>} />

        {/* ── Items ── */}
        <div className="lrbc-list">
          {ITEMS.map((item) => {
            if (item.type === "given") {
              return (
                <div key={item.id} className="lrbc-row">
                  <span className="lrbc-num">{item.id}</span>
                  <img src={item.src} alt={["A girl thinking of a boy talking on the phone.","A man washing dishes with a girl beside him.","A boy playing soccer.","A boy reading a newspaper in an armchair."][item.id-1]} className="lrbc-img" />
                  <span className="lrbc-given">{item.given}</span>
                </div>
              );
            }

            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            

            return (
              <div key={item.id} className="lrbc-row">
                <span className="lrbc-num">{item.id}</span>
                <img src={item.src} alt={["A girl thinking of a boy talking on the phone.","A man washing dishes with a girl beside him.","A boy playing soccer.","A boy reading a newspaper in an armchair."][item.id-1]} className="lrbc-img" />
                <div className="lrbc-content">
                  {item.before && <span className="lrbc-before">{item.before}</span>}
                  <div className="lrbc-input-wrap">
                    <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                      type="text"
                      className={["lrbc-input", wrong?"lrbc-input--wrong":"", showAns?"lrbc-input--answer":""].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns || results[item.id] === "correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrbc-badge">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrbc-buttons">
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