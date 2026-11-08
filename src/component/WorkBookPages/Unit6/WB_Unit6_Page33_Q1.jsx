import clipPage33A8 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_008_t_s_=_shoes_that_are_used_for_sports.mp3";
import clipPage33A7 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_007_s_e_=_a_school_subject_that_studies_the_world_around_us.mp3";
import clipPage33A6 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_006_l_e_=_the_opposite_of_early.mp3";
import clipPage33A5 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_005_w_r_=_put_on_clothes.mp3";
import clipPage33A4 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_004_p_k_=_to_put_things_in_something,_like_a_bag_or_suitcase.mp3";
import clipPage33A3 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_003_t_t_=_what_teachers_will_give_to_see_what_students_know.mp3";
import clipPage33A2 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_002_k_s_=_things_that_open_doors_and_locks.mp3";
import clipPage33A1 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - A/Item_001_g_m_=_a_place_where_people_play_sports.mp3";
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
const INPUT_BORDER_DEFAULT    = "#3f3f3f";
const INPUT_BORDER_WRONG      = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const LETTER_COLOR            = "#2b2b2b";
const DEFINITION_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:         1,
    definition: "a place where people play sports",
    parts: [
      { type: "letter", value: "g" },
      { type: "input",  key: "1-1", correct: ["y"], answer: "y" },
      { type: "letter", value: "m" },
    ],
  },
  {
    id:         2,
    definition: "things that open doors and locks",
    parts: [
      { type: "letter", value: "k" },
      { type: "input",  key: "2-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "2-2", correct: ["y"], answer: "y" },
      { type: "letter", value: "s" },
    ],
  },
  {
    id:         3,
    definition: "what teachers will give to see what students know",
    parts: [
      { type: "letter", value: "t" },
      { type: "input",  key: "3-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "3-2", correct: ["s"], answer: "s" },
      { type: "letter", value: "t" },
    ],
  },
  {
    id:         4,
    definition: "to put things in something, like a bag or suitcase",
    parts: [
      { type: "letter", value: "p" },
      { type: "input",  key: "4-1", correct: ["a"], answer: "a" },
      { type: "input",  key: "4-2", correct: ["c"], answer: "c" },
      { type: "letter", value: "k" },
    ],
  },
  {
    id:         5,
    definition: "put on clothes",
    parts: [
      { type: "letter", value: "w" },
      { type: "input",  key: "5-1", correct: ["e"], answer: "e" },
      { type: "input",  key: "5-2", correct: ["a"], answer: "a" },
      { type: "letter", value: "r" },
    ],
  },
  {
    id:         6,
    definition: "the opposite of early",
    parts: [
      { type: "letter", value: "l" },
      { type: "input",  key: "6-1", correct: ["a"], answer: "a" },
      { type: "input",  key: "6-2", correct: ["t"], answer: "t" },
      { type: "letter", value: "e" },
    ],
  },
  {
    id:         7,
    definition: "a school subject that studies the world around us",
    parts: [
      { type: "letter", value: "s" },
      { type: "input",  key: "7-1", correct: ["c"], answer: "c" },
      { type: "input",  key: "7-2", correct: ["i"], answer: "i" },
      { type: "input",  key: "7-3", correct: ["e"], answer: "e" },
      { type: "input",  key: "7-4", correct: ["n"], answer: "n" },
      { type: "input",  key: "7-5", correct: ["c"], answer: "c" },
      { type: "letter", value: "e" },
    ],
  },
  {
    id:         8,
    definition: "shoes that are used for sports",
    parts: [
      { type: "letter", value: "t" },
      { type: "input",  key: "8-1", correct: ["r"], answer: "r" },
      { type: "input",  key: "8-2", correct: ["a"], answer: "a" },
      { type: "input",  key: "8-3", correct: ["i"], answer: "i" },
      { type: "input",  key: "8-4", correct: ["n"], answer: "n" },
      { type: "input",  key: "8-5", correct: ["e"], answer: "e" },
      { type: "input",  key: "8-6", correct: ["r"], answer: "r" },
      { type: "letter", value: "s" },
    ],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteMissingLetters_QA() {
const listening=useExerciseListening("wb_unit6_page33_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>item.parts.filter(part=>part.type==="input").map((part,i)=>({...part,label:`Word ${item.id}, missing letter ${i+1}. Clue: ${item.definition}`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct"||value.length>1)return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value.length===1){const index=ALL_INPUTS.findIndex(item=>item.key===key),next=ALL_INPUTS.slice(index+1).find(item=>results[item.key]!=="correct");if(next)inputRefs.current[next.key]?.focus({preventScroll:true});}};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
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
    <div data-adapt-scope="Unit6_WB_Unit6_Page33_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit6_WB_Unit6_Page33_Q1"] input:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .rwml-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row ── */
        .rwml-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
        }

        .rwml-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
          line-height: 1;
        }

        /* Word parts container */
        .rwml-word {
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        /* Fixed letter */
        .rwml-letter {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${LETTER_COLOR};
          line-height: 1.5;
          min-width: clamp(14px, 1.8vw, 22px);
          text-align: center;
        }

        /* Input wrap — single letter box */
        .rwml-input-wrap {
          position: relative;
        }

        .rwml-input {
          width: clamp(20px, 2.6vw, 32px);
          background: transparent;
          border: none;
          border-bottom: 2px solid ${INPUT_BORDER_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          transition: border-color 0.2s;
          line-height: 1.5;
        }
        .rwml-input:disabled        { opacity: 1; cursor: default; }
        .rwml-input--wrong          { border-bottom-color: ${INPUT_BORDER_WRONG}; }
        .rwml-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwml-badge {
          position: absolute;
          top: -8px; right: -6px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Equals + definition */
        .rwml-eq {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${LETTER_COLOR};
          flex-shrink: 0;
        }

        .rwml-def {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${DEFINITION_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .rwml-buttons {
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
        <ExerciseHeader subTitle="Say the word or expression aloud, use the visible letters as clues, then fill in only the missing letters." sectionLetter="A" title={<>Read and write the missing letters.</>} />

        {/* ── Items ── */}
        <div className="rwml-list">
          {ITEMS.map((item) => (
            renderExerciseAudioGroup({audio:listening,id:`definition-${item.id}`,src:[clipPage33A1,clipPage33A2,clipPage33A3,clipPage33A4,clipPage33A5,clipPage33A6,clipPage33A7,clipPage33A8][item.id-1],label:item.id+". "+item.parts.map(part=>part.type==="letter"?part.value:"blank").join(" ")+". "+item.definition,className:"rwml-row",style:undefined,key:item.id,children:<>

              {/* Number */}
              <span className="rwml-num">{item.id}</span>

              {/* Word parts */}
              <div className="rwml-word">
                {item.parts.map((part, i) => {
                  if (part.type === "letter") {
                    return (
                      <span key={i} className="rwml-letter">{part.value}</span>
                    );
                  }
                  const wrong    = isWrong(part);
                  const value    = answers[part.key] || "";
                  const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                  const uColor   = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;
                  

                  return (
                    <div key={part.key} className="rwml-input-wrap">
                      <input onKeyDown={event=>{fieldKeys.onKeyDown(event);const fieldKey=part.key,index=ALL_INPUTS.findIndex(item=>item.key===fieldKey);if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)){event.preventDefault();event.stopPropagation();const backwards=event.key==="ArrowLeft"||event.key==="ArrowUp",list=backwards?ALL_INPUTS.slice(0,index).reverse():ALL_INPUTS.slice(index+1),next=list.find(item=>!showAns&&results[item.key]!=="correct");if(next)inputRefs.current[next.key]?.focus({preventScroll:true});}else if(event.key==="Backspace"&&!answers[fieldKey]&&!showAns&&results[fieldKey]!=="correct"){event.stopPropagation();const previous=ALL_INPUTS.slice(0,index).reverse().find(item=>results[item.key]!=="correct");if(previous){event.preventDefault();inputRefs.current[previous.key]?.focus({preventScroll:true});}}}} aria-invalid={results[part.key]==="wrong"}  title={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} onKeyUp={fieldKeys.onKeyUp}
                        ref={(el) => (inputRefs.current[part.key] = el)}
                        type="text"
                        maxLength={1}
                        className={[
                          "rwml-input",
                          wrong   ? "rwml-input--wrong"  : "",
                          showAns ? "rwml-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={value}
                        disabled={showAns||results[part.key]==="correct"}
                        onChange={(e) => handleChange(part.key, e.target.value)}
                        style={(base=>({...base,borderBottomColor:showAns||results[part.key]==="correct"?"#16a34a":results[part.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="rwml-badge">✕</div>}
                    </div>
                  );
                })}
              </div>

              {/* = definition */}
              <span className="rwml-eq">=</span>
              <span className="rwml-def">{item.definition}</span>

            </>})
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwml-buttons">
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