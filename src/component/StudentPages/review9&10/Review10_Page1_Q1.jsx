import clipPage86A5 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_005_purchase.mp3";
import clipPage86A6 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_006_casual.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 90/SVG/Asset 1.svg";
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


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const LETTER_GIVEN_COLOR  = "#2b2b2b";   // الحروف الظاهرة
const LETTER_INPUT_COLOR  = "#2b2b2b";   // ما يكتبه الطالب
const LETTER_ANSWER_COLOR = "#c81e1e";   // لما Show Answer
const LETTER_UL_DEFAULT   = "#3f3f3f";
const LETTER_UL_WRONG     = "#ef4444";
const NUMBER_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  parts: مصفوفة من { t: "given"|"input", v, id? }
//  answer: الكلمة الكاملة الصحيحة
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    // com_f_o_r_t_a_b_l_e → "comfortable"
    parts: [
      { t:"given", v:"c" }, { t:"given", v:"o" }, { t:"given", v:"m" },
      { t:"input",  id:"1_1", correct:"f" },
      { t:"input",  id:"1_2", correct:"o" },
      { t:"input",  id:"1_3", correct:"r" },
      { t:"given", v:"t" },
      { t:"input",  id:"1_4", correct:"a" },
      { t:"input",  id:"1_5", correct:"b" },
      { t:"input",  id:"1_6", correct:"l" },
      { t:"input",  id:"1_7", correct:"e" },
    ],
    answer: "comfortable",
  },
  {
    id: 2,
    // _c_a_S_ual → "casual"
    parts: [
      { t:"input",  id:"2_1", correct:"c" },
      { t:"input",  id:"2_2", correct:"a" },
      { t:"input",  id:"2_3", correct:"s" },
      { t:"given", v:"u" }, { t:"given", v:"a" }, { t:"given", v:"l" },
    ],
    answer: "casual",
  },
  {
    id: 3,
    // _p_a_r_tic_u_l_a_r → "particular"
    parts: [
      { t:"input",  id:"3_1", correct:"p" },
      { t:"input",  id:"3_2", correct:"a" },
      { t:"input",  id:"3_3", correct:"r" },
      { t:"given", v:"t" }, { t:"given", v:"i" }, { t:"given", v:"c" },
      { t:"input",  id:"3_4", correct:"u" },
      { t:"input",  id:"3_5", correct:"l" },
      { t:"input",  id:"3_6", correct:"a" },
      { t:"input",  id:"3_7", correct:"r" },
    ],
    answer: "particular",
  },
  {
    id: 4,
    // _p_u_r_c_h_ase → "purchase"
    parts: [
      { t:"input",  id:"4_1", correct:"p" },
      { t:"input",  id:"4_2", correct:"u" },
      { t:"input",  id:"4_3", correct:"r" },
      { t:"input",  id:"4_4", correct:"c" },
      { t:"input",  id:"4_5", correct:"h" },
      { t:"given", v:"a" }, { t:"given", v:"s" }, { t:"given", v:"e" },
    ],
    answer: "purchase",
  },
];

// All input parts flat
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.t === "input")
);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WriteVocab_QA() {
const listening=useExerciseListening("sb_review10_page1_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const checkDisabled=showAns||ALL_INPUTS.every(p=>results[p.id]==="correct");

  const inputRefs = useRef({});

  const handleChange=(id,value,correct,allParts)=>{if(showAns||results[id]==="correct")return;const letter=value.replace(/[^a-zA-Z]/g,"").slice(-1).toLowerCase();setAnswers(prev=>({...prev,[id]:letter}));setResults(prev=>{const next={...prev};delete next[id];return next;});if(letter){const inputs=allParts.filter(p=>p.t==="input"),idx=inputs.findIndex(p=>p.id===id),next=inputs.slice(idx+1).find(p=>results[p.id]!=="correct");if(next)inputRefs.current[next.id]?.focus();}};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!ALL_INPUTS.every(p=>answers[p.id]?.trim())){ValidationAlert.info("Please fill in all missing letters first.");return;}const next=Object.fromEntries(ALL_INPUTS.map(p=>[p.id,answers[p.id]?.toLowerCase()===p.correct.toLowerCase()?"correct":"wrong"]));const score=ITEMS.filter(item=>item.parts.filter(p=>p.t==="input").every(p=>next[p.id]==="correct")).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct letters are locked.`);if(score===ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(ALL_INPUTS.map(p=>[p.id,p.correct])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct words shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Letters and feedback cleared.");};

  const isInputWrong=p=>!showAns&&results[p.id]==="wrong";

  const isInputDisabled=p=>showAns||results[p.id]==="correct";

  const renderParts = (item) =>
    item.parts.map((part, i) => {
      if (part.t === "given") {
        return (
          <span key={i} className="wva-letter-given">{part.v}</span>
        );
      }

      const wrong    = isInputWrong(part);
      const disabled = isInputDisabled(part);
      const value    = answers[part.id] || "";
      const color    = showAns ? LETTER_ANSWER_COLOR : wrong ? LETTER_UL_WRONG : LETTER_INPUT_COLOR;
      const ulColor  = wrong ? LETTER_UL_WRONG : LETTER_UL_DEFAULT;

      return (
        <span key={part.id} className="wva-letter-wrap">
          <input {...fieldKeys} aria-label={`Word ${item.id}. Missing letter at position ${i+1}.`} title={`Word ${item.id}, letter ${i+1}`} aria-invalid={wrong} onKeyDown={event=>{fieldKeys.onKeyDown(event);if(["ArrowLeft","ArrowRight","Enter"," "].includes(event.key)){event.preventDefault();event.stopPropagation();if(event.repeat)return;const inputs=item.parts.filter(p=>p.t==="input"&&!isInputDisabled(p)),at=inputs.findIndex(p=>p.id===part.id),next=inputs[at+(event.key==="ArrowLeft"||event.shiftKey?-1:1)];if(next)inputRefs.current[next.id]?.focus();}else if(event.key==="Backspace"&&!value){const inputs=item.parts.filter(p=>p.t==="input"&&!isInputDisabled(p)),at=inputs.findIndex(p=>p.id===part.id);if(inputs[at-1])inputRefs.current[inputs[at-1].id]?.focus();}}}
            ref={(el) => { inputRefs.current[part.id] = el; }}
            className={["wva-letter-input", wrong?"wva-letter-input--wrong":"", showAns?"wva-letter-input--answer":""].filter(Boolean).join(" ")}
            type="text"
            maxLength={1}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(part.id, e.target.value, part.correct, item.parts)}
            style={{borderBottomColor:showAns||results[part.id]==="correct"?"#16a34a":ulColor,color:showAns||results[part.id]==="correct"?"#15803d":color}}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="wva-letter-badge">✕</span>}
        </span>
      );
    });

  return (
    <div data-adapt-scope="review9&10_Review10_Page1_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review9&10_Review10_Page1_Q1"] input:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review10_Page1_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review10_Page1_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review10_Page1_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Body: items + image ── */
        .wva-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
          margin : 8% 0 ;
        }

        /* ── Items list ── */
        .wva-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
        }

        /* Single item row: num + letters */
        .wva-item {
          display: flex;
          align-items: flex-end;
          gap: clamp(2px, 0.3vw, 4px);
          flex-wrap: nowrap;
        }

        .wva-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          margin-right: clamp(6px, 0.8vw, 10px);
          line-height: 1.5;
        }

        /* Given letter */
        .wva-letter-given {
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
          width: clamp(18px, 2.4vw, 30px);
          font-size: clamp(16px, 2.1vw, 26px);
          font-weight: 600;
          color: ${LETTER_GIVEN_COLOR};
          border-bottom: 1px solid ${LETTER_UL_DEFAULT};
          line-height: 1.5;
          text-align: center;
          flex-shrink: 0;
        }

        /* Input letter wrap */
        .wva-letter-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .wva-letter-input {
          width: clamp(18px, 2.4vw, 30px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${LETTER_UL_DEFAULT};
          outline: none;
          font-size: clamp(16px, 2.1vw, 26px);
          font-weight: 600;
          color: ${LETTER_INPUT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
          padding: 0;
          transition: border-color 0.15s;
          caret-color: #2b2b2b;
        }
        .wva-letter-input:disabled       { opacity: 1; cursor: default; }
        .wva-letter-input--wrong         { border-bottom-color: ${LETTER_UL_WRONG}; }
        .wva-letter-input--answer        { color: ${LETTER_ANSWER_COLOR}; }

        /* ✕ mini badge */
        .wva-letter-badge {
          position: absolute;
          top: -7px; right: -5px;
          width: clamp(12px, 1.4vw, 15px);
          height: clamp(12px, 1.4vw, 15px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 8px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Scene image */
        .wva-scene-img {
          width: 120%;
          height: 100%;
          display: block;
          flex-shrink: 0;
        }

        .wva-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .wva-body { grid-template-columns: 1fr; }
          .wva-scene-img { width: 100%; max-width: 300px; margin: 0 auto; }
          .wva-item { flex-wrap: wrap; }
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
        <ExerciseHeader subTitle="Use the picture and given letters as clues, then type the full vocabulary word before checking." isReview sectionLetter="A" title={<>Write the vocabulary word.</>} />

        {/* ── Body ── */}
        <div className="wva-body">

          {/* Items */}
          <div className="wva-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wva-item">
                <span className="wva-num">{renderExerciseAudioText({audio:listening,id:`word-${item.id}`,src:item.id===2?clipPage86A6:item.id===4?clipPage86A5:null,label:"Listen to vocabulary word "+item.id,children:item.id})}</span>
                {renderParts(item)}
              </div>
            ))}
          </div>

          {/* Image */}
          <img src={imgScene} alt={"People shopping in a mall with an escalator and clothing and shoe shops."} className="wva-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="wva-buttons">
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