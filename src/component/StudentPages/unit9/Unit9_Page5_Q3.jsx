import clipPage80C9 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_009_b_he_doesn't_like_bread.mp3";
import clipPage80C8 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_008_a_he_doesn't_like_meat.mp3";
import clipPage80C7 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_007_William_doesn't_eat_burgers_because.mp3";
import clipPage80C6 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_006_b_she_likes_music.mp3";
import clipPage80C5 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_005_a_she_likes_pianos.mp3";
import clipPage80C4 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_004_Sandra_plays_the_piano_because.mp3";
import clipPage80C3 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_003_b_he's_afraid_of_cobwebs.mp3";
import clipPage80C2 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_002_a_he's_afraid_of_ghosts.mp3";
import clipPage80C1 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - C/Item_001_My_brother_doesn't_like_haunted_houses_because.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🔊 AUDIO
// ─────────────────────────────────────────────
import sound from "../../../assets/audio/ClassBook/Grade 4/cd50pg80-instruction-adult-lady_AZOJpQPx.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const OPTION_LABEL_CLR = "#2b2b2b";
const CIRCLE_SELECTED  = "#2195a6";
const CIRCLE_CORRECT = "#16a34a";
const CIRCLE_WRONG     = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.38,
    end: 2.90,
    text: "Page 80. Write activities.",
  },
  {
    start: 2.90,
    end: 7.10,
    text: "Exercise C. Listen, read, and circle.",
  },
  {
    start: 7.10,
    end: 12.14,
    text: "My brother doesn't like haunted houses because he's afraid of ghosts.",
  },
  {
    start: 12.14,
    end: 15.54,
    text: "Sandra plays the piano because she likes music.",
  },
  {
    start: 15.54,
    end: 19.70,
    text: "William doesn't eat burgers because he doesn't like meat.",
  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    stem:    "My brother doesn't like haunted houses because ...",
    correct: "a",
    options: [
      { label: "a", text: "he's afraid of ghosts."  },
      { label: "b", text: "he's afraid of cobwebs." },
    ],
  },
  {
    id:      2,
    stem:    "Sandra plays the piano because ...",
    correct: "b",
    options: [
      { label: "a", text: "she likes pianos." },
      { label: "b", text: "she likes music."  },
    ],
  },
  {
    id:      3,
    stem:    "William doesn't eat burgers because ...",
    correct: "a",
    options: [
      { label: "a", text: "he doesn't like meat."  },
      { label: "b", text: "he doesn't like bread." },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCircle_QC() {
const listening=useExerciseListening("sb_unit9_page5_q3");

  const [selected,    setSelected]    = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,label) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:label}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();setSelected(Object.fromEntries(ITEMS.map(item=>[item.id,item.correct])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct choices shown and locked.");};

  const handleReset=()=>{listening.stop();setSelected({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Selections and feedback cleared.");};

  const getState=(item,label)=>selected[item.id]!==label?"idle":showAns?"correct":results[item.id]||"selected";

  const renderOption = (item, opt) => {
    const state   = getState(item, opt.label);
    const isWrong = state === "wrong";
    let bd = "transparent";
    if (state === "selected") bd = CIRCLE_SELECTED;
    if (state === "correct")  bd = CIRCLE_CORRECT;
    if (state === "wrong")    bd = CIRCLE_WRONG;

    return (
      <div data-listening={`choice-${item.id}-${opt.label}`} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.stem} ${opt.label}: ${opt.text}`} aria-pressed={selected[item.id] === opt.label} aria-disabled={showAns || results[item.id] === "correct"}
        key={opt.label}
        style={{...({
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "clamp(4px,0.5vw,7px)",
          border: `2px solid ${bd}`,
          borderRadius: "999px",
          padding: "clamp(3px,0.4vw,6px) clamp(12px,1.5vw,20px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          whiteSpace: "nowrap",
        }),position:"relative",background:listening.activeId===`choice-${item.id}-${opt.label}` || selected[item.id]===opt.label&&!showAns&&results[item.id]===undefined?"#dbeafe":undefined,boxShadow:selected[item.id]===opt.label?`inset 0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"}`:undefined}}
        onClick={(e)=>{listening.play(`choice-${item.id}-${opt.label}`,[[clipPage80C2,clipPage80C3],[clipPage80C5,clipPage80C6],[clipPage80C8,clipPage80C9]][item.id-1][opt.label==="a"?0:1]);(() => handleSelect(item.id, opt.label))(e);}}
      >
        <span style={{ fontSize: "clamp(13px,1.5vw,18px)", fontWeight: 700, color: OPTION_LABEL_CLR, lineHeight: 1 }}>
          {opt.label}
        </span>
        <span style={{ fontSize: "clamp(13px,1.5vw,18px)", color: TEXT_COLOR, lineHeight: 1 }}>
          {opt.text}
        </span>
        {isWrong && (
          <div style={{
            position: "absolute", top: -7, right: -7,
            width: "clamp(14px,1.6vw,18px)", height: "clamp(14px,1.6vw,18px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px,0.8vw,10px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 3,
          }}>✕</div>
        )}
      {listening.activeId===`choice-${item.id}-${opt.label}`&&renderExerciseSpeaker()}</div>
    );
  };

  return (
    <div data-adapt-scope="unit9_Unit9_Page5_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit9_Unit9_Page5_Q3"] input:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit9_Unit9_Page5_Q3"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 38px);
          width: 100%;
        }

        .lrcc-item {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Stem row */
        .lrcc-stem-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrcc-stem {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        /* Options row: a | b — grid for vertical alignment across all questions */
        .lrcc-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(16px, 2.4vw, 32px);
          padding-left: clamp(22px, 3vw, 36px);
        }

        .lrcc-buttons {
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
        <ExerciseHeader subTitle="Listen once, replay if needed, then select the option that matches what you hear and read." sectionLetter="C" title={<>Listen, read, and circle.</>} />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer pageId="sb_unit9_page5_q3" src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrcc-item">

              {/* Stem */}
              <div className="lrcc-stem-row">
                <span className="lrcc-num">{item.id}</span>
                <span className="lrcc-stem">{renderExerciseAudioText({audio:listening,id:`prompt-${item.id}`,src:[clipPage80C1,clipPage80C4,clipPage80C7][item.id-1],label:item.stem,children:item.stem})}</span>
              </div>

              {/* Options */}
              <div className="lrcc-options">
                {item.options.map((opt) => renderOption(item, opt))}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcc-buttons">
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