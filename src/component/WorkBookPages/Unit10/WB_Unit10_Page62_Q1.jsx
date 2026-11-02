import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgWhale    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 1.svg";
import imgTiger    from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 2.svg";
import imgCamel    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 3.svg";
import imgHorse    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 4.svg";
import imgSnake    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 5.svg";
import imgShark    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 6.svg";
import imgElephant from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 7.svg";
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
//  📝  IMAGE BANK — صور مع إشارة ✓/✕
// ─────────────────────────────────────────────
const IMAGE_BANK = [
  { id: "whale",    src: imgWhale,    icon: "check" },
  { id: "tiger",    src: imgTiger,    icon: "cross" },
  { id: "camel",    src: imgCamel,    icon: "check" },
  { id: "horse",    src: imgHorse,    icon: "cross" },
  { id: "snake",    src: imgSnake,    icon: "check" },
  { id: "shark",    src: imgShark,    icon: "cross" },
  { id: "elephant", src: imgElephant, icon: "check" },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    correct: ["I have seen a whale, but I haven't seen a tiger.", "i have seen a whale but i havent seen a tiger", "i have seen a whale but i havenot seen a tiger", "i have seen a whale but i have not seen a tiger"],
    answer:  "I have seen a whale, but I haven't seen a tiger.",
  },
  {
    id:      2,
    correct: ["I have seen a camel, but I haven't seen a horse.", "i have seen a camel but i havent seen a horse", "i have seen a camel but i havenot seen a horse", "i have seen a camel but i have not seen a horse"],
    answer:  "I have seen a camel, but I haven't seen a horse.",
  },
  {
    id:      3,
    correct: ["I have seen an elephant, but I haven't seen a shark.", "i have seen an elephant but i havent seen a shark", "i have seen an elephant but i havenot seen a shark", "i have seen an elephant but i have not seen a shark"],
    answer:  "I have seen an elephant, but I haven't seen a shark.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QJ() {
  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Sentence "+item.id+". Use the animal pictures and their tick or cross to write what you have and have not seen."}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit10_WB_Unit10_Page62_Q1" className="main-container-component">
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page62_Q1"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Image bank row ── */
        .lrwj-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(6px, 0.9vw, 12px);
              justify-content: center;
          width: 100%;
        }

        /* Single image card */
        .lrwj-img-card {
          position: relative;
          border: 2px solid #2096a6;
          border-radius: 8px;
          flex: 1;
          min-width: clamp(70px, 9vw, 120px);
          max-width: clamp(100px, 14vw, 170px);
          background: #fff;
        }

        .lrwj-img {
          width: 100%;
          display: block;
          padding: clamp(4px, 0.5vw, 8px);
          box-sizing: border-box;
        }

        /* ✓ / ✕ icon — top right */
        .lrwj-icon {
          position: absolute;
          top: 0; right: 0;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border-radius: 0 6px 0 4px;
          background: #fff;
          border-left: 2px solid #2096a6;
          border-bottom:2px solid #2096a6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.6vw, 18px);
          font-weight: 700;
          color: #ff0000ff;
          z-index: 2;
        }

        /* ── Sentences list ── */
        .lrwj-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 3%;
        }

        /* Single sentence row */
        .lrwj-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);
          min-width: 0;
        }

        .lrwj-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1.5;

        }

        /* Input wrap */
        .lrwj-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 18vw, 300px);
        }

        .lrwj-input {
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
        .lrwj-input:disabled   { opacity: 1; cursor: default; }
        .lrwj-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwj-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwj-badge {
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

        /* Buttons */
        .lrwj-buttons {
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="J" title={<>Look, read, and write. You can use pictures more than once.</>} />
        {/* ── Image bank ── */}
<div style={{margin:"5% 0"}}>

        <div className="lrwj-bank">
          {IMAGE_BANK.map((img) => (
            <div key={img.id} className="lrwj-img-card">
              <img src={img.src} alt={({whale:"A whale.",tiger:"A tiger.",camel:"A camel.",horse:"A horse.",snake:"A snake.",shark:"A shark.",elephant:"An elephant."})[img.id]+(img.icon==="check"?" A tick is shown.":" A cross is shown.")} className="lrwj-img"style={{height: "auto"}} />
              <div className="lrwj-icon">
                {img.icon === "check" ? "✓" : "✕"}
              </div>
            </div>
          ))}
        </div>

        {/* ── Sentences ── */}
        <div className="lrwj-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lrwj-row">
                <span className="lrwj-num">{item.id}</span>
                <div className="lrwj-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "lrwj-input",
                      wrong   ? "lrwj-input--wrong"  : "",
                      showAns ? "lrwj-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwj-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwj-buttons">
          <div className="action-buttons-container">
<button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} onClick={handleReset} className="try-again-button">Start Again ↻</button>
<button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShowAnswer} className="show-answer-btn swal-continue">Show Answer</button>
<button type="button" aria-label="Check Answer" {...activationKeys} onClick={handleCheck} disabled={checkDisabled} style={{cursor:checkDisabled ? "not-allowed":"pointer"}} className="check-button2">Check Answer ✓</button>
</div>
        </div>
            </div>
      </div>
    </div>
  );
}