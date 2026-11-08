import clipPage89D14 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_014_Why_not.mp3";
import clipPage89D13 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_013_Why.mp3";
import clipPage89D12 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_012_cinema.mp3";
import clipPage89D11 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_011_Harley.mp3";
import clipPage89D10 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_010_mall.mp3";
import clipPage89D9 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_009_Helen.mp3";
import clipPage89D8 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_008_farm.mp3";
import clipPage89D7 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_007_Stella.mp3";
import clipPage89D6 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_006_zoo.mp3";
import clipPage89D5 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_005_Sarah.mp3";
import clipPage89D4 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_004_swimming_pool.mp3";
import clipPage89D3 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_003_Tom.mp3";
import clipPage89D2 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_002_library.mp3";
import clipPage89D1 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - D/Item_001_John.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — الصورة الكاملة مع الـ names و emojis و places
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 26 (1).svg";
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
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const PREFIX_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  prefix: "Why?" | "Why not?"  — ثابت قبل الـ input
//  before: نص ثابت قبل الـ input (مثل "Because John likes the")
//  after:  نص ثابت بعد الـ input (إذا موجود)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    prefix:  "Why?",
    after:   "",
    correct: ["Because John likes the library.", "Because John likes the Library"],
    answer:  "Because John likes the library.",
  },
  {
    id:      2,
    prefix:  "Why not?",
    before:  "",
    correct: ["Because he doesn't like the swimming pool.", "Because he doesn't like the Swimming pool"],
    answer:  "Because he doesn't like the swimming pool.",
  },
  {
    id:      3,
    prefix:  "Why?",
    after:   "",
    correct: ["Because she likes the zoo."],
    answer:  "Because she likes the zoo.",
  },
  {
    id:      4,
    prefix:  "Why?",
    correct: ["Because she likes the farm."],
    answer:  "Because she likes the farm.",
  },
  {
    id:      5,
    prefix:  "Why not?",
    after:   "",
    correct: ["Because she doesn't like the mall."],
    answer:  "Because she doesn't like the mall.",
  },
  {
    id:      6,
    prefix:  "Why?",
    correct: ["Because he likes the cinema."],
    answer:  "Because he likes the cinema.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWrite_QD() {
const listening=useExerciseListening("sb_review9_page2_q1");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.filter(item=>item.type!=="given").map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.scrambled ? "Unscramble: "+item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.prefix ? item.prefix+" Explain using the picture or diagram." : item.question || item.cue || item.hint || "Write an answer using the diagram."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="review9&10_Review9_Page2_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review9&10_Review9_Page2_Q1"] input:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review9_Page2_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review9_Page2_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Scene image ── */
        .lwd-scene-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Sentences list ── */
        .lwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
        }

        /* Single row: num | prefix | before | input | after */
        .lwd-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .lwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-prefix {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PREFIX_COLOR};
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwd-text {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PREFIX_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .lwd-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(90px, 12vw, 170px);
        }

        .lwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwd-input:disabled  { opacity: 1; cursor: default; }
        .lwd-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwd-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwd-badge {
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

        .lwd-buttons {
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." isReview sectionLetter="D" title={<>Look and write.</>} />

        {/* ── Scene image ── */}
        <div className="lwd-scene-img" style={{position:"relative"}}><img src={imgScene} alt="Diagram: John likes the library; Tom dislikes the swimming pool; Sarah likes the zoo; Stella likes the farm; Helen dislikes the mall; Harley likes the cinema." style={{display:"block",width:"100%",height:"auto"}}/><button type="button" {...activationKeys} data-listening="diagram-0" aria-label="Listen: John" onClick={()=>listening.play("diagram-0",clipPage89D1)} style={{position:"absolute",left:"4%",top:"6%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-0"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-0"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-0"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-1" aria-label="Listen: library" onClick={()=>listening.play("diagram-1",clipPage89D2)} style={{position:"absolute",left:"23.1%",top:"6%",width:"10%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-1"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-1"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-1"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-2" aria-label="Listen: Tom" onClick={()=>listening.play("diagram-2",clipPage89D3)} style={{position:"absolute",left:"37.7%",top:"6%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-2"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-2"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-2"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-3" aria-label="Listen: swimming pool" onClick={()=>listening.play("diagram-3",clipPage89D4)} style={{position:"absolute",left:"54.1%",top:"6%",width:"12.4%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-3"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-3"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-3"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-4" aria-label="Listen: Sarah" onClick={()=>listening.play("diagram-4",clipPage89D5)} style={{position:"absolute",left:"70.4%",top:"6%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-4"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-4"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-4"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-5" aria-label="Listen: zoo" onClick={()=>listening.play("diagram-5",clipPage89D6)} style={{position:"absolute",left:"88.4%",top:"6%",width:"11.3%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-5"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-5"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-5"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-6" aria-label="Listen: Stella" onClick={()=>listening.play("diagram-6",clipPage89D7)} style={{position:"absolute",left:"4%",top:"64%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-6"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-6"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-6"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-7" aria-label="Listen: farm" onClick={()=>listening.play("diagram-7",clipPage89D8)} style={{position:"absolute",left:"23.1%",top:"64%",width:"10%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-7"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-7"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-7"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-8" aria-label="Listen: Helen" onClick={()=>listening.play("diagram-8",clipPage89D9)} style={{position:"absolute",left:"37.7%",top:"64%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-8"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-8"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-8"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-9" aria-label="Listen: mall" onClick={()=>listening.play("diagram-9",clipPage89D10)} style={{position:"absolute",left:"54.1%",top:"64%",width:"12.4%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-9"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-9"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-9"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-10" aria-label="Listen: Harley" onClick={()=>listening.play("diagram-10",clipPage89D11)} style={{position:"absolute",left:"70.4%",top:"64%",width:"11%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-10"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-10"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-10"&&renderExerciseSpeaker()}</button><button type="button" {...activationKeys} data-listening="diagram-11" aria-label="Listen: cinema" onClick={()=>listening.play("diagram-11",clipPage89D12)} style={{position:"absolute",left:"88.4%",top:"64%",width:"11.3%",height:"35%",padding:0,border:0,borderRadius:6,background:listening.activeId==="diagram-11"?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="diagram-11"?"0 0 0 3px #2563eb":undefined,cursor:"pointer"}}>{listening.activeId==="diagram-11"&&renderExerciseSpeaker()}</button></div>

        {/* ── Sentences ── */}
        <div className="lwd-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            

            return (
              <div key={item.id} className="lwd-row">
                <span className="lwd-num">{item.id}</span>
                <span className="lwd-prefix">{renderExerciseAudioText({audio:listening,id:`prompt-${item.id}`,src:item.prefix==="Why?"?clipPage89D13:clipPage89D14,label:item.prefix,children:item.prefix})}</span>
                {item.before && <span className="lwd-text">{item.before}</span>}

                <div className="lwd-input-wrap">
                  <input placeholder="Because…" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "lwd-input",
                      wrong   ? "lwd-input--wrong"  : "",
                      showAns ? "lwd-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwd-badge">✕</div>}
                </div>

                {item.after && <span className="lwd-text">{item.after}</span>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwd-buttons">
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