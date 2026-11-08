import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 21.svg";
import img2 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 18.svg"
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 19.svg"
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 20.svg"
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
//  Each item has TWO inputs: question + negative answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:             1,
    src:            img1,
    correctQ:       ["Did she have a swimming pool?", "did she have a swimming pool"],
    answerQ:        "Did she have a swimming pool?",
    correctA:       ["She didn't have a swimming pool.", "she didn't have a swimming pool", "she did not have a swimming pool"],
    answerA:        "She didn't have a swimming pool.",
  },
  {
    id:             2,
    src:            img2,
    correctQ:       ["Did she have a tree house?", "did she have a tree house"],
    answerQ:        "Did she have a tree house?",
    correctA:       ["She didn't have a tree house.", "she didn't have a tree house", "she did not have a tree house"],
    answerA:        "She didn't have a tree house.",
  },
  {
    id:             3,
    src:            img3,
    correctQ:       ["Did she have a turtle?", "did she have a turtle"],
    answerQ:        "Did she have a turtle?",
    correctA:       ["She didn't have a turtle.", "she didn't have a turtle", "she did not have a turtle"],
    answerA:        "She didn't have a turtle.",
  },
  {
    id:             4,
    src:            img4,
    correctQ:       ["Did she have a camera?", "did she have a camera"],
    answerQ:        "Did she have a camera?",
    correctA:       ["She didn't have a camera.", "she didn't have a camera", "she did not have a camera"],
    answerA:        "She didn't have a camera.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteQA_QD() {
  // answers: { "1q": "...", "1a": "...", "2q": "...", ... }
  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.flatMap(item=>[{key:`${item.id}q`, correct:item.correctQ, answer:item.answerQ, label:`Question ${item.id}. Write the question${item.scrambled ? ": unscramble " + item.scrambled : " for the picture"}.`},{key:`${item.id}a`,correct:item.correctA,answer:item.answerA,label:`Question ${item.id}. Write the answer for the picture or diagram.`}]);
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const keyQ = (id) => `${id}q`;
  const keyA = (id) => `${id}a`;

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongKey = (key) => !showAns && results[key] === "wrong";

  

  const renderInput = (key, correctArr, placeholder = "") => {
    const wrong    = isWrongKey(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    

    return (
      <div className="lwqa-input-wrap">
        <input aria-invalid={results[key] === "wrong"} title={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} {...fieldKeys}
          type="text"
          className={[
            "lwqa-input",
            wrong   ? "lwqa-input--wrong"  : "",
            showAns ? "lwqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns || results[key] === "correct"}
          placeholder={placeholder}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[key] === "correct" ? "#16a34a" : results[key] === "wrong" ? "#ef4444" : ({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lwqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="review3&4_Review3_Page2_Q1" className="main-container-component">
<style>{`[data-adapt-scope="review3&4_Review3_Page2_Q1"] input:focus-visible, [data-adapt-scope="review3&4_Review3_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review3_Page2_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
        }

        /* Single row: num | img | lines */
        .lwqa-row {
          display: grid;
          grid-template-columns: auto clamp(70px, 9vw, 120px) 1fr;
          gap: clamp(8px, 1.2vw, 16px);
          align-items: center;
        }

        .lwqa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: center;
        }

        .lwqa-img {
          width: 100%;
          height: auto ;
          object-fit: cover;
          display: block;
        }

        /* Two lines stacked */
        .lwqa-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        /* Input wrap */
        .lwqa-input-wrap {
          position: relative;
          width: 100%;
        }

        .lwqa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwqa-input:disabled  { opacity: 1; cursor: default; }
        .lwqa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwqa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lwqa-badge {
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

        .lwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lwqa-row { grid-template-columns: auto clamp(55px,14vw,80px) 1fr; }
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
          subTitle="Use the picture or grammar clue, say the full question and answer first, then type both before checking." isReview sectionLetter="D" title={<>Look and write a question and a negative answer.</>} />

        {/* ── Items ── */}
        <div className="lwqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwqa-row">

              {/* Number */}
              <span className="lwqa-num">{item.id}</span>

              {/* Image */}
              <img src={item.src} alt={({[img1]:"An indoor swimming pool.",[img2]:"A wooden tree house among leafy branches.",[img3]:"A tortoise.",[img4]:"A camera."})[item.src]} className="lwqa-img" />

              {/* Two input lines */}
              <div className="lwqa-lines">
                {renderInput(keyQ(item.id), item.correctQ)}
                {renderInput(keyA(item.id), item.correctA)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lwqa-buttons">
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