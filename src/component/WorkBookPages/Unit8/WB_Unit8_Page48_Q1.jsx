import clipPage48G16 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_016_after_Alice_in_Wonderland.mp3";
import clipPage48G15 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_015_and.mp3";
import clipPage48G14 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_014_The_crowd.mp3";
import clipPage48G13 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_013_on_the_couch_with_a_book.mp3";
import clipPage48G12 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_012_On_Thursday,_she.mp3";
import clipPage48G11 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_011_the_piano.mp3";
import clipPage48G10 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_010_She.mp3";
import clipPage48G9 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_009_for_a_math_test_on_Monday.mp3";
import clipPage48G8 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_008_Louisa.mp3";
import clipPage48G7 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_007_grandpa_and_tell_him_about_the_play.mp3";
import clipPage48G6 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_006_Wonderland._The_crowd_cheered_and_clapped_at_the_end_of_the_play._Louisa.mp3";
import clipPage48G5 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_005_the_couch_with_a_book_and_watched_a_movie_with_her_sister._The_next_day.mp3";
import clipPage48G4 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_004_Wednesday_was_a_busy_day_as_Louisa_helped_her_mom._They_cleaned_the_hous.mp3";
import clipPage48G3 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_003_math_test._She_got_a_perfect_score_on_the_test,_and_she_was_very_happy.mp3";
import clipPage48G2 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_002_she_told_her_grandpa_about_all_of_the_things_that_had_happened_that_week.mp3";
import clipPage48G1 from "../../../assets/audio/WorkBook/Unit 8/Page 48 - G/Item_001_Louisa_wrote_a_letter_to_her_grandpa_yesterday._She_writes_a_letter_to_h.mp3";
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
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const PARA_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Louisa wrote a letter to her grandpa yesterday. She writes a letter to her grandpa every week. In the letter, she told her grandpa about all of the things that had happened that week. On Monday, she studied for her math test. She got a perfect score on the test, and she was very happy. The next day she practiced the piano. Wednesday was a busy day as Louisa helped her mom. They cleaned the house. On Thursday, she relaxed on the couch with a book and watched a movie with her sister. The next day she played Alice in the play Alice in Wonderland. The crowd cheered and clapped at the end of the play. Louisa will write another letter to her grandpa and tell him about the play.`;
const PARAGRAPH_PARTS=PARAGRAPH.split(/(?=she told her grandpa|math test\.|Wednesday was|the couch with a book|Wonderland\.|grandpa and tell him)/);


// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: أجزاء — text + input + text...
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { type: "text",  value: "Louisa" },
      { type: "input", key: "1", correct: ["studied"], answer: "studied" },
      { type: "text",  value: "for a math test on Monday." },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text",  value: "She" },
      { type: "input", key: "2", correct: ["practiced"], answer: "practiced" },
      { type: "text",  value: "the piano." },
    ],
  },
  {
    id: 3,
    parts: [
      { type: "text",  value: "On Thursday, she" },
      { type: "input", key: "3", correct: ["relaxed"], answer: "relaxed" },
      { type: "text",  value: "on the couch with a book." },
    ],
  },
  {
    id: 4,
    parts: [
      { type: "text",  value: "The crowd" },
      { type: "input", key: "4a", correct: ["cheered"], answer: "cheered" },
      { type: "text",  value: "and" },
      { type: "input", key: "4b", correct: ["clapped"], answer: "clapped" },
      { type: "text",  value: "after" },
      { type: "text",  value: "Alice in Wonderland.", italic: true },
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
export default function WB_ReadWriteVerbs_QG() {
const listening=useExerciseListening("wb_unit8_page48_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>item.parts.filter(part=>part.type==="input").map((part,i)=>({...part,label:`Sentence ${item.id}, blank ${i+1}. Write the past-tense verb using the paragraph above.`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

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

  

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return (
        <span key={i} className="rwvg-text" style={part.italic ? { fontStyle: "italic" } : {}}>
          {renderExerciseAudioText({audio:listening,id:`clue-${i}-${part.value}`,src:({Louisa:clipPage48G8,"for a math test on Monday.":clipPage48G9,She:clipPage48G10,"the piano.":clipPage48G11,"On Thursday, she":clipPage48G12,"on the couch with a book.":clipPage48G13,"The crowd":clipPage48G14,and:clipPage48G15,"Alice in Wonderland.":clipPage48G16})[part.value],label:part.value,children:part.value})}
        </span>
      );
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    
    return (
      <div key={part.key} className="rwvg-input-wrap">
        <input aria-invalid={results[part.key]==="wrong"} placeholder="Verb" title={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={[
            "rwvg-input",
            wrong   ? "rwvg-input--wrong"  : "",
            showAns ? "rwvg-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[part.key]==="correct"}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[part.key]==="correct"?"#16a34a":results[part.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwvg-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page48_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page48_Q1"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page48_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page48_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page48_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Paragraph ── */
        .rwvg-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.5;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .rwvg-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* ── Single row ── */
        .rwvg-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rwvg-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rwvg-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwvg-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(70px, 9vw, 120px);
        }

        .rwvg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwvg-input:disabled   { opacity: 1; cursor: default; }
        .rwvg-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwvg-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwvg-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
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
        .rwvg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwvg-row { flex-wrap: wrap; }
          .rwvg-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Find the time clue first, change the verb to the correct past-tense form, then reread the full sentence." sectionLetter="G" title={<>Read and write the verbs.</>} />
<div style={{margin : "0.5% 0 "}}>

        {/* ── Paragraph ── */}
        <p className="rwvg-para" style={{marginBottom : "5%"}}>{PARAGRAPH_PARTS.map((fragment,index)=><React.Fragment key={index}>{renderExerciseAudioText({audio:listening,id:`paragraph-${index+1}`,src:[clipPage48G1,clipPage48G2,clipPage48G3,clipPage48G4,clipPage48G5,clipPage48G6,clipPage48G7][index],label:`Listen to paragraph part ${index+1}: ${fragment.trim()}`,children:fragment})}</React.Fragment>)}</p>

        {/* ── Items ── */}
        <div className="rwvg-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwvg-row">
              <span className="rwvg-num">{item.id}</span>
              {item.parts.map((part, i) => renderPart(part, i))}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwvg-buttons">
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