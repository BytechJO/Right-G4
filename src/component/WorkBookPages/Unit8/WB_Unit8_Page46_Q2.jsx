import clipPage46D13 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_013_It's_one_of_my_favorites,_too.mp3";
import clipPage46D12 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_012_Steve.mp3";
import clipPage46D11 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_011_I_always_look_forward_to_science_class_at_school.mp3";
import clipPage46D10 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_010_Rick.mp3";
import clipPage46D9 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_009_Do_you_like_science.mp3";
import clipPage46D8 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_008_about_their_jobs._That_day.mp3";
import clipPage46D7 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_007_Steve_I'd_like_to_be_a_scientist._Do_you_remember_Career_Day_So_many_par.mp3";
import clipPage46D6 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_006_Rick_I'd_like_to_be_a_doctor._What_about_you.mp3";
import clipPage46D5 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_005_Steve_What_do_you_want_to_do_for_work.mp3";
import clipPage46D4 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_004_was_awesome.mp3";
import clipPage46D3 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_003_I_know_what_you_mean.mp3";
import clipPage46D2 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_002_when_you_grow_up.mp3";
import clipPage46D1 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - D/Item_001_I_sure_do.mp3";
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
const SPEAKER_COLOR           = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["I sure do", "when you grow up", "I know what you mean", "was awesome"];

// كل line فيها: speaker (اختياري) + parts
// كل part إما { type: "text", value } أو { type: "input", key, correct, answer }
const LINES = [
  {
    speaker: "Steve",
    parts: [
      { type: "text",  value: "What do you want to do for work" },
      { type: "input", key: "1", correct: ["when you grow up"], answer: "when you grow up" },
      { type: "text",  value: "?" },
    ],
  },
  {
    speaker: "Rick",
    parts: [
      { type: "text", value: "I'd like to be a doctor. What about you?" },
    ],
  },
  {
    speaker: "Steve",
    parts: [
      { type: "text", value: "I'd like to be a scientist. Do you remember Career Day? So many parents came in and talked about their jobs. That day" },
      { type: "input", key: "2", correct: ["was awesome"], answer: "was awesome" },
      { type: "text",  value: ". Do you like science?" },
    ],
  },
  {
    speaker: "Rick",
    parts: [
      { type: "input", key: "3", correct: ["I sure do"], answer: "I sure do" },
      { type: "text",  value: ". I always look forward to science class at school." },
    ],
  },
  {
    speaker: "Steve",
    parts: [
      { type: "input", key: "4", correct: ["I know what you mean"], answer: "I know what you mean" },
      { type: "text",  value: ". It's one of my favorites, too." },
    ],
  },
];

const ALL_INPUTS = LINES.flatMap((line) =>
  line.parts.filter((p) => p.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QD() {
const listening=useExerciseListening("wb_unit8_page46_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=LINES.flatMap((line,i)=>line.parts.filter(part=>part.type==="input").map(part=>({...part,label:`Dialogue line ${i+1}, ${line.speaker}. Complete this blank using the word bank.`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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

  

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page46_Q2" className="main-container-component" ><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page46_Q2"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .rwd-bank {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 12px;
          padding: clamp(8px, 1.2vw, 14px) clamp(14px, 2vw, 24px);
          display: flex;
          flex-wrap: wrap;
          gap: clamp(10px, 1.6vw, 20px);
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
        }

        .rwd-bank-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_COLOR};
          white-space: nowrap;
        }

        /* ── Dialogue list ── */
        .rwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* ── Single line ── */
        .rwd-line {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rwd-speaker {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          flex-shrink: 0;
          white-space: nowrap;
        }

        .rwd-colon {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          flex-shrink: 0;
        }

        /* Parts container */
        .rwd-parts {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          flex: 1;
          min-width: 0;
        }

        .rwd-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${TEXT_COLOR};
          line-height: 1.5;
          padding-bottom: 3px;
        }

        /* Input wrap */
        .rwd-input-wrap {
          position: relative;
          flex: 0 1 clamp(100px, 14vw, 220px);
          min-width: clamp(90px, 12vw, 180px);
        }

        .rwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwd-input:disabled   { opacity: 1; cursor: default; }
        .rwd-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwd-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rwd-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="D" title={<>Read and write.</>} />
<div style={{margin : "5% 0"}}>

        {/* ── Word bank ── */}
        <div className="rwd-bank" style={{marginBottom : "20px"}}>
          {WORD_BANK.map((w) => (
            <span key={w} className="rwd-bank-word">{renderExerciseAudioText({audio:listening,id:`bank-${WORD_BANK.indexOf(w)}`,src:[clipPage46D1,clipPage46D2,clipPage46D3,clipPage46D4][WORD_BANK.indexOf(w)],label:w,children:w})}</span>
          ))}
        </div>

        {/* ── Dialogue ── */}
        <div className="rwd-list">
          {LINES.map((line, li) => (
            <div key={li} className="rwd-line">
              {line.speaker && (
                <>
                  <span className="rwd-speaker">{renderExerciseAudioText({audio:listening,id:`speaker-${li}`,src:line.speaker==="Steve"?clipPage46D12:line.speaker==="Rick"?clipPage46D10:null,label:line.speaker,children:line.speaker})}</span>
                  <span className="rwd-colon">:</span>
                </>
              )}
              <div className="rwd-parts">
                {line.parts.map((part, pi) => {
                  if (part.type === "text") {
                    return <span key={pi} className="rwd-text">{li===2&&pi===0?part.value.split(/(?=about their jobs)/).map((fragment,fi)=><React.Fragment key={fi}>{renderExerciseAudioText({audio:listening,id:`dialog-${li}-${pi}-${fi}`,src:[clipPage46D7,clipPage46D8][fi],label:fragment,children:fragment})}</React.Fragment>):renderExerciseAudioText({audio:listening,id:`dialog-${li}-${pi}`,src:li===0&&pi===0?clipPage46D5:li===1?clipPage46D6:li===2&&pi===2?clipPage46D9:li===3&&pi===1?clipPage46D11:li===4&&pi===1?clipPage46D13:null,label:part.value,children:part.value})}</span>;
                  }
                  // input
                  const wrong    = isWrong(part);
                  const value    = answers[part.key] || "";
                  const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                  const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
                  

                  return (
                    <div key={part.key} className="rwd-input-wrap">
                      <input aria-invalid={results[part.key]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} {...fieldKeys}
                        type="text"
                        className={[
                          "rwd-input",
                          wrong   ? "rwd-input--wrong"  : "",
                          showAns ? "rwd-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={value}
                        disabled={showAns||results[part.key]==="correct"}
                        onChange={(e) => handleChange(part.key, e.target.value)}
                        style={(base=>({...base,borderBottomColor:showAns||results[part.key]==="correct"?"#16a34a":results[part.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="rwd-badge">✕</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwd-buttons">
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