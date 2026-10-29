import clipPage50C10 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_010_study_for_my_test_tomorrow.mp3";
import clipPage50C9 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_009_I.mp3";
import clipPage50C8 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_008_slam_the_door_loudly.mp3";
import clipPage50C7 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_007_Sam.mp3";
import clipPage50C6 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_006_brush_his_teeth_after_a_meal.mp3";
import clipPage50C5 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_005_Henry.mp3";
import clipPage50C4 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_004_always_recycle_paper_and_plastic.mp3";
import clipPage50C3 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_003_We.mp3";
import clipPage50C2 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_002_put_trash_in_trash_cans.mp3";
import clipPage50C1 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - C/Item_001_You.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 50/SVG/Asset 2.svg";
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
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const KEYWORD_COLOR           = "#ff9900ff";  // should / shouldn't في الـ header

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  before: text before input | after: text after input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "You",
    after:   "put trash in trash cans.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      2,
    before:  "We",
    after:   "always recycle paper and plastic.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      3,
    before:  "Henry",
    after:   "brush his teeth after a meal.",
    correct: ["should"],
    answer:  "should",
  },
  {
    id:      4,
    before:  "Sam",
    after:   "slam the door loudly.",
    correct: ["shouldn't", "shouldnt", "should not"],
    answer:  "shouldn't",
  },
  {
    id:      5,
    before:  "I",
    after:   "study for my test tomorrow.",
    correct: ["should"],
    answer:  "should",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteShouldShouldnt_QC() {
const listening=useExerciseListening("sb_unit6_page5_q3");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.scrambled ? "Unscramble: "+item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.question || item.cue || item.hint || "Write an answer using the diagram."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="unit6_Unit6_Page5_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit6_Unit6_Page5_Q3"] input:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Body: items ysar | image yamin ── */
        .rwss-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
          margin : 2% 0 ;
        }

        /* ── Items list ── */
        .rwss-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 26px);
        }

        /* Single row: num | before | input | after */
        .rwss-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rwss-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwss-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwss-input-wrap {
          position: relative;
          flex: 0 1 clamp(90px, 11vw, 150px);
          min-width: clamp(80px, 10vw, 130px);
        }

        .rwss-input {
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
        .rwss-input:disabled  { opacity: 1; cursor: default; }
        .rwss-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwss-input--answer   { color: ${INPUT_ANSWER_COLOR} }

        /* ✕ badge */
        .rwss-badge {
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

        /* Scene image */
        .rwss-scene-img {
          width: 100% ; 
          height: 100%;
          flex-shrink: 0;
        }

        .rwss-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwss-body { grid-template-columns: 1fr; }
          .rwss-scene-img { width: 100%; max-width: 280px; margin: 0 auto; }
          .rwss-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Read the situation, decide whether it is good advice, then complete each sentence with should or shouldn't." sectionLetter="C" title={<>Read and write{" "}
          <em style={{ color: KEYWORD_COLOR, fontStyle: "normal", fontWeight: 700 }}>should</em>
          {" "}or{" "}
          <em style={{ color: KEYWORD_COLOR, fontStyle: "normal", fontWeight: 700 }}>shouldn't</em>.</>} />

        {/* ── Body ── */}
        <div className="rwss-body">

          {/* Items */}
          <div className="rwss-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              

              return (
                <div key={item.id} className="rwss-row">
                  <span className="rwss-num">{item.id}</span>
                  <span className="rwss-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:[clipPage50C1,clipPage50C3,clipPage50C5,clipPage50C7,clipPage50C9][item.id-1],label:item.before,children:item.before})}</span>

                  <div className="rwss-input-wrap">
                    <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "rwss-input",
                        wrong   ? "rwss-input--wrong"  : "",
                        showAns ? "rwss-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns || results[item.id] === "correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwss-badge">✕</div>}
                  </div>

                  <span className="rwss-text">{renderExerciseAudioText({audio:listening,id:`after-${item.id}`,src:[clipPage50C2,clipPage50C4,clipPage50C6,clipPage50C8,clipPage50C10][item.id-1],label:item.after,children:item.after})}</span>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt="Two people collecting litter in a wooded area." className="rwss-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rwss-buttons">
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