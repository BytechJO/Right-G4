import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — صورة واحدة كاملة لكل item (شخص + مركبة)
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 10.svg";  // she + bus
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 7.svg"; // he + boat
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 8.svg";  // he + motorcycle
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 9.svg";
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
 // he + airplane

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
//  before: نص ثابت قبل الـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    type:    "input",
    before:  "",
    correct: ["She has been on a bus", "She has been on a bus."],

    answer:   "She has been on a bus.",
  },
  {
    id:      2,
    src:     img2,
    type:    "input",
    before:  "",
    correct: ["He has been on a boat.", " He has been on a boat"],
    answer:  "He has been on a boat.",
  },
  {
    id:      3,
    src:     img3,
    type:    "input",
    before:  "",
    correct: ["He has been on a motorcycle.", "he has been on a motorcycle"],
    answer:  "He has been on a motorcycle.",
  },
  {
    id:      4,
    src:     img4,
    type:    "input",
    before:  "",
    correct: ["He has been on an airplane.", "he has been on an airplane"],
    answer:  "He has been on an airplane.",
  },
];

const INPUT_ITEMS = ITEMS.filter((i) => i.type === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWrite_QD_R10() {
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
    <div data-adapt-scope="review9&10_Review10_Page2_Q2" className="main-container-component">
<style>{`[data-adapt-scope="review9&10_Review10_Page2_Q2"] input:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review10_Page2_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review10_Page2_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2×2 grid ── */
        .lwd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 50px);
          width: 100%;
        }

        /* Single card */
        .lwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Num */
        .lwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Single image */
        .lwd-img {
          width: 70%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          margin-bottom : 1em ;
        }

        /* Sentence area */
        .lwd-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lwd-given {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        .lwd-before {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${GIVEN_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwd-input:disabled  { opacity: 1; cursor: default; }
        .lwd-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwd-input--answer   { color: ${INPUT_ANS_COLOR};  }

        .lwd-badge {
          position: absolute;
          top: -8px; right: 0;
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

        .lwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lwd-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." isReview sectionLetter="D" title={<>Look and write.</>} />

        {/* ── 2×2 Grid ── */}
        <div className="lwd-grid">
          {ITEMS.map((item) => {
            const wrong    = item.type === "input" ? isWrong(item) : false;
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            

            return (
              <div key={item.id} className="lwd-card">

                {/* Number */}
                <span className="lwd-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={["A girl’s portrait beside a bus.","A boy’s portrait beside a ship.","A boy’s portrait beside a motorcycle.","A boy’s portrait beside an airplane."][item.id-1]} className="lwd-img" />

                {/* Sentence */}
                <div className="lwd-sentence">
                  {item.type === "given" ? (
                    <span className="lwd-given">{item.given}</span>
                  ) : (
                    <>
                      {item.before && <span className="lwd-before">{item.before}</span>}
                      <div className="lwd-input-wrap">
                        <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                          type="text"
                          className={["lwd-input", wrong?"lwd-input--wrong":"", showAns?"lwd-input--answer":""].filter(Boolean).join(" ")}
                          value={value}
                          disabled={showAns || results[item.id] === "correct"}
                          onChange={(e) => handleChange(item.id, e.target.value)}
                          style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {wrong && <div className="lwd-badge">✕</div>}
                      </div>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwd-buttons">
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