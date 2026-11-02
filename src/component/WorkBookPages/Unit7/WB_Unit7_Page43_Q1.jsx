import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 43/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 43/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 43/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 43/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 43/SVG/Asset 5.svg";
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
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    correct: ["Were there any watermelons?", "were there any watermelons?"],
    answer:  "Were there any watermelons?",
  },
  {
    id:      2,
    src:     img2,
    correct: ["Was there any tea?", "was there any tea?"],
    answer:  "Was there any tea?",
  },
  {
    id:      3,
    src:     img3,
    correct: ["Was there any meat?", "was there any meat?"],
    answer:  "Was there any meat?",
  },
  {
    id:      4,
    src:     img4,
    correct: ["Were there any carrots?", "were there any carrots?"],
    answer:  "Were there any carrots?",
  },
  {
    id:      5,
    src:     img5,
    correct: ["Was there any soup?", "was there any soup?"],
    answer:  "Was there any soup?",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QI() {
  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. Write the question, then say it aloud.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  const isWrong=key=>!showAns&&results[typeof key==="object"?(key.key??key.id):key]==="wrong";

  

  return (
    <div data-adapt-scope="Unit7_WB_Unit7_Page43_Q1" className="main-container-component">
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page43_Q1"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page43_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page43_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page43_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lrwi2-list {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.8vw, 6px);
          width: 100%;
        }

        /* ── Single item: num | img | input ── */
        .lrwi2-item {
          display: flex;
          flex-direction: column;
        }

        /* Top row: num + img */
        .lrwi2-top {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 14px);
        }

        .lrwi2-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
          line-height: 1;
        }

        .lrwi2-img {
          height: auto;
          width: 10%;
          display: block;
          flex-shrink: 0;
        }

        /* Input wrap — full width */
        .lrwi2-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrwi2-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};

          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwi2-input:disabled   { opacity: 1; cursor: default; }
        .lrwi2-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwi2-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwi2-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
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
        .lrwi2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
        <ExerciseHeader subTitle="Complete the written answer first, reread it, then say the finished sentence aloud." sectionLetter="I" title={<>Look, read, and write. Say.</>} />

        {/* ── Items ── */}
        <div className="lrwi2-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lrwi2-item">

                {/* Number + Image */}
                <div className="lrwi2-top">
                  <span className="lrwi2-num">{item.id}</span>
                  <img src={item.src} alt={["Two watermelons.","A cup of tea.","A steak on a plate.","Two carrots.","Two bread rolls on a plate."][item.id-1]} className="lrwi2-img" />
                </div>

                {/* Input — full width below */}
                <div className="lrwi2-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your question" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "lrwi2-input",
                      wrong   ? "lrwi2-input--wrong"  : "",
                      showAns ? "lrwi2-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwi2-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwi2-buttons">
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