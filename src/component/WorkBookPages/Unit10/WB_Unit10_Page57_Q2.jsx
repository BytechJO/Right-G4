import clipPage57B8 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_008_What_about_these_shirts.mp3";
import clipPage57B7 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_007_Have_you_any_shirts_I'd_like_some_casual_and_comfortable_shirts.mp3";
import clipPage57B6 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_006_I_really_love_this_shirt._Thanks_so_much_for_your_help.mp3";
import clipPage57B5 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_005_You're_very_welcome!_Please_come_again.mp3";
import clipPage57B4 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_004_Great!_Have_you_got_a_particular_size_in_mind.mp3";
import clipPage57B3 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_003_Good_morning._How_can_I_help_you.mp3";
import clipPage57B2 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_002_Yes,_these_shirts_look_casual.mp3";
import clipPage57B1 from "../../../assets/audio/WorkBook/Unit 10/Page 57 - B/Item_001_I'll_go_with_the_large_size.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 57/SVG/Asset 4.svg";
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
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#2096a6";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const SENTENCE_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: "a", sentence: "I'll go with the large size.",                              correct: ["6"], answer: "6" },
  { id: "b", sentence: "Yes, these shirts look casual.",                             correct: ["3"], answer: "3" },
  { id: "c", sentence: "Good morning. How can I help you?",                          correct: ["1"], answer: "1" },
  { id: "d", sentence: "Great! Have you got a particular size in mind?",             correct: ["4"], answer: "4" },
  { id: "e", sentence: "You're very welcome! Please come again.",                    correct: ["8"], answer: "8" },
  { id: "f", sentence: "I really love this shirt. Thanks so much for your help.",    correct: ["7"], answer: "7" },
  { id: "g", sentence: "Have you any shirts? I'd like some casual and comfortable shirts.", correct: ["2"], answer: "2" },
  { id: "h", sentence: "What about these shirts?",                                   correct: ["5"], answer: "5" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QB() {
const listening=useExerciseListening("wb_unit10_page57_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Conversation order. "+item.sentence}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;if(value!==""&&!/^[1-9]$/.test(value))return;if(value&&answerTargets.some(target=>target.key!==key&&answers[target.key]===value)){setAnnouncement("That number is already used. Clear or change it first.");return;}setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value){const index=answerTargets.findIndex(target=>target.key===key),next=answerTargets.slice(index+1).find(target=>results[target.key]!=="correct");if(next)inputRefs.current[next.key]?.focus({preventScroll:true});}};

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
    <div data-adapt-scope="Unit10_WB_Unit10_Page57_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page57_Q2"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page57_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page57_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page57_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Layout: sentences list + image ── */
        .rnb-wrapper {
          display: grid;
          grid-template-columns: 1fr clamp(140px, 18vw, 220px);
          gap: clamp(16px, 2.4vw, 30px);
          align-items: start;
          width: 100%;
          margin: 4% 0;
        }

        /* ── Sentences list ── */
        .rnb-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
        }

        /* ── Single row ── */
        .rnb-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Input wrap */
        .rnb-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rnb-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 20px);
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
          line-height: 1.5;
          font-weight: 700;
        }
        .rnb-input:disabled   { opacity: 1; cursor: default; }
        .rnb-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .rnb-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rnb-badge {
          position: absolute;
          top: -8px; right: -8px;
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

        /* Sentence text */
        .rnb-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          padding-top: clamp(4px, 0.5vw, 6px);
        }

        /* Scene image */
        .rnb-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* Buttons */
        .rnb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rnb-wrapper { grid-template-columns: 1fr; }
          .rnb-img { max-width: 200px; margin: 0 auto; }
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
        <ExerciseHeader subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture." sectionLetter="B" title={<>Read and number to match the conversation in the Student's Book.</>} />

        {/* ── Wrapper: list + image ── */}
        <div className="rnb-wrapper">

          {/* Sentences */}
          <div className="rnb-list">
            {ITEMS.map((item) => {
              const wrong    = isWrong(item);
              const value    = answers[item.id] || "";
              const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
              

              return (
                <div key={item.id} className="rnb-row">

                  <div className="rnb-input-wrap">
                    <input inputMode="numeric" aria-invalid={results[item.id]==="wrong"}  title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      ref={(el) => (inputRefs.current[item.id] = el)}
                      type="text"
                      maxLength={1}
                      className={[
                        "rnb-input",
                        wrong   ? "rnb-input--wrong"  : "",
                        showAns ? "rnb-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{...((base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ color: tColor })),borderColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":undefined}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rnb-badge">✕</div>}
                  </div>

                  <span className="rnb-sentence">{renderExerciseAudioText({audio:listening,id:`sentence-${item.id}`,src:[clipPage57B1,clipPage57B2,clipPage57B3,clipPage57B4,clipPage57B5,clipPage57B6,clipPage57B7,clipPage57B8][ITEMS.indexOf(item)],label:item.sentence,children:item.sentence})}</span>

                </div>
              );
            })}
          </div>

          {/* Scene image */}
          <img src={imgScene} alt={"A shop assistant showing shirts to a girl in a clothes shop."} className="rnb-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rnb-buttons">
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