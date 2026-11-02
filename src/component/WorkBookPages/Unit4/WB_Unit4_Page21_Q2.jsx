import clipPage21B6 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_006_Hi,_Tom_and_Harley.mp3";
import clipPage21B5 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_005_Why_didn't_you_clean_your_room.mp3";
import clipPage21B4 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_004_Wow,_that_roller_coaster_goes_fast.mp3";
import clipPage21B3 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_003_It_sure_does!.mp3";
import clipPage21B2 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_002_Hey!_What_are_you_doing.mp3";
import clipPage21B1 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - B/Item_001_I_forgot.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import rollerCoasterImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 21/SVG/Asset 2.svg";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "I forgot.",
  "Hey! What are you doing?",
  "It sure does!",
];

const ITEMS = [
  {
    id:      1,
    sentence: "Wow, that roller coaster goes fast.",
    correct:  ["It sure does!", "It sure does"],
    answer:   "It sure does!",
  },
  {
    id:      2,
    sentence: "Why didn't you clean your room?",
    correct:  ["I forgot.", "I forgot"],
    answer:   "I forgot.",
  },
  {
    id:      3,
    sentence: "Hi, Tom and Harley.",
    correct:  ["Hey! What are you doing?", "Hey What are you doing" ],
    answer:   "Hey! What are you doing?",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QB() {
const listening=useExerciseListening("wb_unit4_page21_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Sentence ${item.id}. Reply to: ${item.sentence} Use the expressions above.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit4_WB_Unit4_Page21_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page21_Q2"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .rw-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .rw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(6px, 0.8vw, 10px) clamp(14px, 1.8vw, 22px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
          white-space: nowrap;
        }

        /* ── Items list ── */
        .rw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single row: num | sentence | input ── */
        .rw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rw-sentence {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rw-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 16vw, 240px);
        }

        .rw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
color: ${INPUT_TEXT_COLOR};
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rw-input:disabled    { opacity: 1; cursor: default; }
        .rw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rw-badge {
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

        /* Image */
        .rw-img-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.2vw, 16px);
        }
        .rw-img {
          width: clamp(260px, 50vw, 520px);
          height: auto;
          display: block;
          border-radius: 10px;
          border: 2px solid #2096a6;
        }

        /* Buttons */
        .rw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rw-row { flex-wrap: wrap; }
          .rw-sentence { white-space: normal; }
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="B" title={<>Read and write.</>} />

        {/* ── Word bank ── */}
        <div className="rw-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rw-bank-word">{renderExerciseAudioText({audio:listening,id:`bank-${w}`,src:({"I forgot.":clipPage21B1,"Hey! What are you doing?":clipPage21B2,"It sure does!":clipPage21B3})[w],label:w,children:w})}</div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage21B4,clipPage21B5,clipPage21B6][item.id-1],label:item.sentence,className:"rw-row",style:undefined,key:item.id,children:<>

                <span className="rw-num">{item.id}</span>
                <span className="rw-sentence">{item.sentence}</span>

                <div className="rw-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your response" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rw-input",
                      wrong   ? "rw-input--wrong"  : "",
                      showAns ? "rw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rw-badge">✕</div>}
                </div>

              </>})
            );
          })}
        </div>

        {/* ── Image ── */}
        <div className="rw-img-wrap">
          <img src={rollerCoasterImg} alt={"People riding a roller coaster on a track with hills and a loop."} className="rw-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="rw-buttons">
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