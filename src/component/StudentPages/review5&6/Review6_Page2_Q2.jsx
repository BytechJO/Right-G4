import clipPage55D4 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - D/Item_004_Jack_doesn't_eat_much.mp3";
import clipPage55D3 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - D/Item_003_He_eats_lots_of.mp3";
import clipPage55D2 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - D/Item_002_He_doesn't_eat_many.mp3";
import clipPage55D1 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - D/Item_001_Harley_doesn't_eat_much.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — جدولين كل واحد صورة واحدة
// ─────────────────────────────────────────────
import tableHarley from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 55/SVG/Asset 49.svg";
import tableJack   from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 55/SVG/Asset 50.svg"
function useExerciseListening(pageId) {
  const coordinator = useAudio();
  const audioRef = useListeningRef(null),
    generation = useListeningRef(0);
  const [activeId, setActiveId] = useListeningState(null),
    [error, setError] = useListeningState("");
  const clearOwned = () => {
    const current = audioRef.current;
    if (current) {
      current.onended = current.onplaying = current.onerror = current.onpause = null;
      current.pause();
      current.remove();
      audioRef.current = null;
    }
  };
  const stop = () => {
    generation.current++;
    clearOwned();
    setActiveId(null);
    setError("");
  };
  const play = (id, sources) => {
    const queue = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
    if (!queue.length) return;
    stop();
    const token = generation.current;
    let index = 0;
    const next = () => {
      if (token !== generation.current) return;
      clearOwned();
      if (index >= queue.length) {
        setActiveId(null);
        return;
      }
      const media = new Audio(queue[index++]);
      media.hidden = true;
      media.dataset.exerciseListening = pageId;
      document.body.appendChild(media);
      audioRef.current = media;
      const current = () => token === generation.current && audioRef.current === media;
      const fail = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
        setError("Audio could not be played. Please try again.");
      };
      media.onplaying = () => {
        if (current()) setActiveId(id);
      };
      media.onended = () => {
        if (current()) next();
      };
      media.onerror = fail;
      media.onpause = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
      };
      document.querySelectorAll("audio,video").forEach(other => {
        if (other !== media) other.pause();
      });
      coordinator?.registerAudio(media, null, pageId);
      media.play().catch(fail);
    };
    next();
  };
  useListeningEffect(() => () => {
    generation.current++;
    const media = audioRef.current;
    if (media) {
      media.onended = media.onplaying = media.onerror = media.onpause = null;
      media.pause();
      media.remove();
      audioRef.current = null;
    }
  }, []);
  return {
    play,
    stop,
    activeId,
    error
  };
}
function renderExerciseSpeaker() {
  return <span aria-hidden="true" style={{
    position: "absolute",
    top: -10,
    right: -10,
    width: 22,
    height: 22,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    color: "black",
    boxShadow: "0 1px 3px rgba(0,0,0,.25)",
    pointerEvents: "none",
    zIndex: 3
  }}><ListeningSpeakerIcon size={12} /></span>;
}
function renderExerciseAudioText({
  audio,
  id,
  src,
  label,
  children
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return children;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <span role="button" tabIndex={0} data-listening={id} aria-label={label} onClick={event => {
    event.stopPropagation();
    audio.play(id, src);
  }} onKeyDown={keys} onKeyUp={keys} style={{
    position: "relative",
    cursor: "pointer",
    borderRadius: 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
    backgroundColor: playing ? "#dbeafe" : undefined
  }}>{children}{playing && renderExerciseSpeaker()}</span>;
}



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
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
 
// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل section: صورة الجدول + 3 جمل
// ─────────────────────────────────────────────
const SECTIONS = [
  {
    id:    "harley",
    table: tableHarley,
    items: [
      {
        id:      "h1",
        before:  "Harley doesn't eat much",
        after:   ".",
        correct: ["bread"],
        answer:  "bread",
      },
      {
        id:      "h2",
        before:  "He doesn't eat many",
        after:   ".",
        correct: ["carrots"],
        answer:  "carrots",
      },
      {
        id:      "h3",
        before:  "He eats lots of",
        after:   ".",
        correct: ["grapes"],
        answer:  "grapes",
      },
    ],
  },
  {
    id:    "jack",
    table: tableJack,
    items: [
      {
        id:      "j1",
        before:  "Jack doesn't eat much",
        after:   ".",
        correct: ["meat"],
        answer:  "meat",
      },
      {
        id:      "j2",
        before:  "He doesn't eat many",
        after:   ".",
        correct: ["fruit"],
        answer:  "fruit",
      },
      {
        id:      "j3",
        before:  "He eats lots of",
        after:   ".",
        correct: ["tomatoes"],
        answer:  "tomatoes",
      },
    ],
  },
];
 
// flat list of all items for validation
const ALL_ITEMS = SECTIONS.flatMap((s) => s.items);
 
// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

 

 
// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QD() {
const listening=useExerciseListening("sb_review6_page2_q2");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ALL_ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`${item.id.startsWith("h")?"Harley":"Jack"}. Complete: ${item.before} blank ${item.after}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");
 
  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };
 
  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};
 
  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};
 
  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};
 
  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  
 
  const renderItem = (item, index) => {
    const wrong    = isWrong(item);
    const value    = answers[item.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    
 
    return (
      <div key={item.id} className="lrw-row">
        <span className="lrw-num">{index + 1}</span>
        <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:({h1:clipPage55D1,h2:clipPage55D2,h3:clipPage55D3,j1:clipPage55D4,j2:clipPage55D2,j3:clipPage55D3})[item.id],label:item.before,children:item.before})}</span>
 
        <div className="lrw-input-wrap">
          <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
            type="text"
            className={[
              "lrw-input",
              wrong   ? "lrw-input--wrong"  : "",
              showAns ? "lrw-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={showAns || results[item.id] === "correct"}
            onChange={(e) => handleChange(item.id, e.target.value, item.correct)}
            style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="lrw-badge">✕</div>}
        </div>
 
        {item.after && <span className="lrw-text">{item.after}</span>}
      </div>
    );
  };
 
  return (
    <div data-adapt-scope="review5&6_Review6_Page2_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review6_Page2_Q2"] input:focus-visible, [data-adapt-scope="review5&6_Review6_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review6_Page2_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Sections stacked ── */
        .lrw-sections {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.6vw, 48px);
          width: 80%;
        }
 
        /* Single section */
        .lrw-section {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }
 
        /* Table image */
        .lrw-table-img {
          width: 100%;
          height: auto;
          display: block;
        }
 
        /* Items list */
        .lrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }
 
        /* Single row: num | before-text | input stretches to end */
        .lrw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          width: 100%;
        }
 
        .lrw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }
 
        .lrw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }
 
        /* Input wrap — يمتد لملء باقي المساحة */
        .lrw-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }
 
        .lrw-input {
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
          text-align: center;
        }
        .lrw-input:disabled  { opacity: 1; cursor: default; }
        .lrw-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer   { color: ${INPUT_ANSWER_COLOR};}
 
        /* ✕ badge */
        .lrw-badge {
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
 
        .lrw-buttons {
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
        <ExerciseHeader subTitle="Use the food information and picture clues first, then complete each sentence with the quantity expression that fits." isReview sectionLetter="D" title={<>Look, read, and write.</>} />
 
        {/* ── Sections ── */}
        <div className="lrw-sections">
          {SECTIONS.map((section) => (
            <div key={section.id} className="lrw-section">
 
              {/* Table image */}
              <img
                src={section.table}
                alt={section.id==="harley"?"Harley’s food chart: ticks under grapes, sweets and chicken; crosses under bread and carrots.":"Jack’s food chart: ticks under tomatoes, juice and chocolate; crosses under meat and fruit."}
                className="lrw-table-img"
              />
 
              {/* Sentences */}
              <div className="lrw-list">
                {section.items.map((item, index) => renderItem(item, index))}
              </div>
 
            </div>
          ))}
        </div>
 
        {/* ── Buttons ── */}
        <div className="lrw-buttons">
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