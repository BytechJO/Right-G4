import clipPage22C8 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_008_It_sure_does.mp3";
import clipPage22C7 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_007_I_forgot.mp3";
import clipPage22C6 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_006_Hey!_What_are_you_doing.mp3";
import clipPage22C5 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_005_Yes,_I_can.mp3";
import clipPage22C4 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_004_Can_you_hear_me.mp3";
import clipPage22C3 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_003_That_ice_cream_looks_good.mp3";
import clipPage22C2 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_002_Why_didn't_you_bring_your_kite.mp3";
import clipPage22C1 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - C/Item_001_Hi,_Mike_and_Tom.mp3";
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
const RESPONSE_TEXT_COLOR     = "#2b2b2b";
const BOX_BORDER_COLOR        = "#2096a6";
const BOX_TEXT_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// محتوى الصندوق — عمودان
const BOX_PHRASES = [
  { left: "Hi, Mike and Tom.",       right: "Why didn't you bring your kite?" },
  { left: "That ice cream looks good.", right: "Can you hear me?" },
];

// الجمل — input قبل + response بعد
const ITEMS = [
  {
    id:       1,
    response: "Yes, I can.",
    correct:  ["Can you hear me?", "Can you hear me"],
    answer:   "Can you hear me?",
  },
  {
    id:       2,
    response: "Hey! What are you doing?",
    correct:  ["Hi, Mike and Tom.", "Hi Mike and Tom"],
    answer:   "Hi, Mike and Tom.",
  },
  {
    id:       3,
    response: "I forgot.",
    correct:  ["Why didn't you bring your kite?", "Why didn't you bring your kite", "Why did not you bring your kite"],
    answer:   "Why didn't you bring your kite?",
  },
  {
    id:       4,
    response: "It sure does.",
    correct:  ["That ice cream looks good.", "That ice cream looks good"],
    answer:   "That ice cream looks good.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QC() {
const listening=useExerciseListening("wb_unit4_page22_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Item ${item.id}. Write the question or statement matching: ${item.response}`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit4_WB_Unit4_Page22_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page22_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Phrase box ── */
        .rwc-box {
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(12px, 1.6vw, 20px) clamp(16px, 2.2vw, 28px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.6vw, 8px) clamp(16px, 3vw, 40px);
          margin : 4% 0 ; 
        }

        .rwc-box-phrase {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${BOX_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Items list ── */
        .rwc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row: num | input | response ── */
        .rwc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rwc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Input wrap — takes most space */
        .rwc-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .rwc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          transition: border-color 0.2s;
        }
        .rwc-input:disabled    { opacity: 1; cursor: default; }
        .rwc-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwc-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwc-badge {
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

        /* Response text — after input */
        .rwc-response {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${RESPONSE_TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Buttons */
        .rwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwc-box { grid-template-columns: 1fr; }
          .rwc-row { flex-wrap: wrap; }
          .rwc-response { white-space: normal; }
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="C" title={<>Read and write.</>} />

        {/* ── Phrase box ── */}
        <div className="rwc-box">
          {BOX_PHRASES.map((p, i) => (
            <React.Fragment key={i}>
              <span className="rwc-box-phrase">{renderExerciseAudioText({audio:listening,id:`bank-${i}-left`,src:({"Hi, Mike and Tom.":clipPage22C1,"Why didn't you bring your kite?":clipPage22C2,"That ice cream looks good.":clipPage22C3,"Can you hear me?":clipPage22C4})[p.left],label:p.left,children:p.left})}</span>
              <span className="rwc-box-phrase">{renderExerciseAudioText({audio:listening,id:`bank-${i}-right`,src:({"Hi, Mike and Tom.":clipPage22C1,"Why didn't you bring your kite?":clipPage22C2,"That ice cream looks good.":clipPage22C3,"Can you hear me?":clipPage22C4})[p.right],label:p.right,children:p.right})}</span>
            </React.Fragment>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rwc-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              renderExerciseAudioGroup({audio:listening,id:`response-${item.id}`,src:[clipPage22C5,clipPage22C6,clipPage22C7,clipPage22C8][item.id-1],label:item.response,className:"rwc-row",style:undefined,key:item.id,children:<>

                {/* Number */}
                <span className="rwc-num">{item.id}</span>

                {/* Input */}
                <div className="rwc-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rwc-input",
                      wrong   ? "rwc-input--wrong"  : "",
                      showAns ? "rwc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwc-badge">✕</div>}
                </div>

                {/* Response */}
                <span className="rwc-response">{item.response}</span>

              </>})
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwc-buttons">
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