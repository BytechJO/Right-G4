import clipPage58D3 from "../../../assets/audio/WorkBook/Unit 10/Page 58 - D/Item_003_we_have_cook_breakfast.mp3";
import clipPage58D2 from "../../../assets/audio/WorkBook/Unit 10/Page 58 - D/Item_002_I_have_fix_the_computer.mp3";
import clipPage58D1 from "../../../assets/audio/WorkBook/Unit 10/Page 58 - D/Item_001_they_have_clean_the_room.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const HINT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    hint:    "they / have / clean the room",
    correct: ["They have cleaned the room.", "they have cleaned the room"],
    answer:  "They have cleaned the room.",
  },
  {
    id:      2,
    hint:    "I / have / fix the computer",
    correct: ["I have fixed the computer.", "i have fixed the computer"],
    answer:  "I have fixed the computer.",
  },
  {
    id:      3,
    hint:    "we / have / cook breakfast",
    correct: ["We have cooked breakfast.", "we have cooked breakfast"],
    answer:  "We have cooked breakfast.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteSentences_QD() {
const listening=useExerciseListening("wb_unit10_page58_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Sentence "+item.id+". Write a sentence using "+item.hint}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  const isWrong=key=>!showAns&&results[typeof key==="object"?(key.key??key.id):key]==="wrong";

  

  return (
    <div data-adapt-scope="Unit10_WB_Unit10_Page58_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page58_Q2"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page58_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page58_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page58_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .rws-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 40px);
          width: 100%;
          margin: 7% 0;
        }

        /* ── Single item ── */
        .rws-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* Hint row: num + hint */
        .rws-hint-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 14px);
        }

        .rws-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rws-hint {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${HINT_COLOR};
          line-height: 1.5;
        }

        /* Input wrap */
        .rws-input-wrap {
          position: relative;
          width: 100%;
          padding-left: clamp(20px, 2.6vw, 32px);
        }

        .rws-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rws-input:disabled   { opacity: 1; cursor: default; }
        .rws-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rws-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rws-badge {
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

        /* Buttons */
        .rws-buttons {
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
        <ExerciseHeader subTitle="Use the picture or word clues to build one complete sentence at a time, then reread it before checking." sectionLetter="D" title={<>Read and write sentences.</>} />

        {/* ── Items ── */}
        <div className="rws-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rws-item">

                {/* Hint row */}
                <div className="rws-hint-row">
                  <span className="rws-num">{item.id}</span>
                  <span className="rws-hint">{renderExerciseAudioText({audio:listening,id:`hint-${item.id}`,src:[clipPage58D1,clipPage58D2,clipPage58D3][item.id-1],label:item.hint,children:item.hint})}</span>
                </div>

                {/* Input */}
                <div className="rws-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rws-input",
                      wrong   ? "rws-input--wrong"  : "",
                      showAns ? "rws-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rws-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rws-buttons">
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