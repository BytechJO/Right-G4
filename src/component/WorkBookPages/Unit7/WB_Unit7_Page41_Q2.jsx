import clipPage41F6 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_006_false.mp3";
import clipPage41F5 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_005_true.mp3";
import clipPage41F4 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_004_There_was_banana_bread.mp3";
import clipPage41F3 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_003_There_was_chicken_and_potato_soup.mp3";
import clipPage41F2 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_002_There_was_toast_with_butter.mp3";
import clipPage41F1 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - F/Item_001_There_were_apples_and_peaches.mp3";
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

function renderExerciseAudioGroup({
  audio,
  id,
  src,
  label,
  children,
  style,
  key: renderKey,
  ...props
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return <div key={renderKey} {...props} style={style}>{children}</div>;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <div key={renderKey} {...props} role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={id} aria-label={label} onKeyDown={keys} onKeyUp={keys} onClick={event => {
    if (event.target.closest('input,select,textarea,button,[role="button"]')) return;
    event.stopPropagation();
    audio.play(id, src);
  }} style={{
    ...style,
    position: style?.position || "relative",
    borderRadius: style?.borderRadius || 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
    backgroundColor: playing ? "#dbeafe" : style?.backgroundColor
  }}>{children}{playing && renderExerciseSpeaker()}</div>;
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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR       = "#2096a6";
const CIRCLE_WRONG_COLOR = "#ef4444";
const TEXT_DEFAULT       = "#2b2b2b";
const TEXT_CIRCLED       = "#2b2b2b";
const TEXT_WRONG         = "#2b2b2b";
const NUMBER_COLOR       = "#2b2b2b";
const SENTENCE_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "There were apples and peaches.",   correct: "true"  },
  { id: 2, sentence: "There was toast with butter.",     correct: "true"  },
  { id: 3, sentence: "There was chicken and potato soup.", correct: "false" },
  { id: 4, sentence: "There was banana bread.",          correct: "true"  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_CircleTrueFalse_QF() {
const listening=useExerciseListening("wb_unit7_page41_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,value) => {if(showAns || results[id] === "correct")return;setAnswers(prev=>({...prev,[id]:prev[id] === value ? null : value}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>answers[item.id] !== undefined && answers[item.id] !== null && answers[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || answers[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
 setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
 setResults({});setAnnouncement("Selections and feedback cleared.");
  };

  // حالة الكلمة: none | selected | correct | wrong
  const getWordState=(item,value)=>{if(answers[item.id]!==value)return "none";if(showAns||results[item.id]==="correct")return "correct";return results[item.id]==="wrong"?"wrong":"selected";};

  return (
    <div data-adapt-scope="Unit7_WB_Unit7_Page41_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page41_Q2"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .ctf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 10% ; 
        }

        /* ── Single row ── */
        .ctf-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .ctf-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(16px, 2vw, 24px);
        }

        .ctf-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          flex: 1;
        }

        /* True / False buttons group */
        .ctf-options {
          display: flex;
          gap: clamp(20px, 3vw, 40px);
          flex-shrink: 0;
        }

        /* Each option word */
        .ctf-option {
          position: relative;
          padding: clamp(2px, 0.3vw, 4px) clamp(8px, 1.2vw, 14px);
          cursor: pointer;
          user-select: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_DEFAULT};
          line-height: 1.5;
          transition: color 0.15s;
        }
        .ctf-option--locked { cursor: default; }

        /* Oval circle */
        .ctf-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        /* States */
        .ctf-option--selected .ctf-oval  { border-color: ${CIRCLE_COLOR}; }
        .ctf-option--selected            { color: ${TEXT_CIRCLED}; }

        .ctf-option--correct .ctf-oval   { border-color: ${CIRCLE_COLOR}; }
        .ctf-option--correct             { color: ${TEXT_CIRCLED}; }

        .ctf-option--wrong .ctf-oval     { border-color: ${CIRCLE_WRONG_COLOR}; }
        .ctf-option--wrong               { color: ${TEXT_WRONG}; }

        /* ✕ badge */
        .ctf-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .ctf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .ctf-row { flex-wrap: wrap; }
          .ctf-options { margin-left: clamp(18px, 2.4vw, 28px); }
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="F" title={<>Read Exercise E. Circle <span style={{color : "#f89631"}}>true</span>  or<span style={{color : "#f89631"}}> false.</span></>} />

        {/* ── Items ── */}
        <div className="ctf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="ctf-row">

              {/* Number */}
              <span className="ctf-num">{item.id}</span>

              {/* Sentence */}
              {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage41F1,clipPage41F2,clipPage41F3,clipPage41F4][item.id-1],label:item.sentence,className:"ctf-sentence",style:undefined,key:item.id,children:<>{item.sentence}</>})}

              {/* True / False */}
              <div className="ctf-options">
                {["true", "false"].map((val) => {
                  const state = getWordState(item, val);
                  return (
                    <div data-listening={`option-${item.id}-${val}`} style={{...({...({...({}),borderRadius:({}).borderRadius || "6px",background:answers[item.id] === val && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:answers[item.id] === val ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),borderRadius:999,cursor:showAns||results[item.id]==="correct"?"default":"pointer"}),background:listening.activeId===`option-${item.id}-${val}`?"#dbeafe":({...({...({}),borderRadius:({}).borderRadius || "6px",background:answers[item.id] === val && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:answers[item.id] === val ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),borderRadius:999,cursor:showAns||results[item.id]==="correct"?"default":"pointer"}).background,boxShadow:[({...({...({}),borderRadius:({}).borderRadius || "6px",background:answers[item.id] === val && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:answers[item.id] === val ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),borderRadius:999,cursor:showAns||results[item.id]==="correct"?"default":"pointer"}).boxShadow,listening.activeId===`option-${item.id}-${val}`?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Sentence ${item.id}. ${item.sentence} Choose ${val}.`} aria-pressed={answers[item.id] === val} aria-disabled={showAns || results[item.id] === "correct"}
                      key={val}
                      className={[
                        "ctf-option",
                        isLocked ? "ctf-option--locked" : "",
                        state === "selected" ? "ctf-option--selected" : "",
                        state === "correct"  ? "ctf-option--correct"  : "",
                        state === "wrong"    ? "ctf-option--wrong"    : "",
                      ].filter(Boolean).join(" ")}
                      onClick={()=>{listening.play(`option-${item.id}-${val}`,val==="true"?clipPage41F5:clipPage41F6);handleSelect(item.id,val);}}
                    >
                      <div style={{borderColor:answers[item.id]===val?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":undefined):undefined}} className="ctf-oval" />
                      {val}
                      {state === "wrong" && <div className="ctf-badge">✕</div>}
                    {listening.activeId===`option-${item.id}-${val}`&&renderExerciseSpeaker()}</div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="ctf-buttons">
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