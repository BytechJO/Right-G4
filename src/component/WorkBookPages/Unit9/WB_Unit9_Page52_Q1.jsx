import missingNew0 from "../../../assets/audio/G4-Missing/Why doesn't John want to wear hats.mp3";
import missingNew1 from "../../../assets/audio/G4-Missing/Why does Stella want to go to the baseball field.mp3";
import clipPage52C22 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_022_Why_does_Helen_want_to_buy_a_skirt.mp3";
import clipPage52C21 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_021_Why_doesn't_Jack_want_any_chicken.mp3";
import clipPage52C20 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_020_Why_doesn't_Sarah_want_to_eat_eggplant.mp3";
import clipPage52C19 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_019_Why_doesn't_Tom_want_to_hold_the_spider.mp3";
import clipPage52C18 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_018_likes_steak.mp3";
import clipPage52C17 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_017_doesn't_like_chicken.mp3";
import clipPage52C16 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_016_Jack.mp3";
import clipPage52C15 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_015_likes_skirts.mp3";
import clipPage52C14 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_014_doesn't_like_dresses.mp3";
import clipPage52C13 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_013_Helen.mp3";
import clipPage52C12 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_012_likes_baseball.mp3";
import clipPage52C11 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_011_doesn't_like_volleyball.mp3";
import clipPage52C10 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_010_Stella.mp3";
import clipPage52C9 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_009_likes_oranges.mp3";
import clipPage52C8 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_008_doesn't_like_eggplant.mp3";
import clipPage52C7 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_007_Sarah.mp3";
import clipPage52C6 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_006_likes_jackets.mp3";
import clipPage52C5 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_005_doesn't_like_hats.mp3";
import clipPage52C4 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_004_John.mp3";
import clipPage52C3 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_003_likes_soccer.mp3";
import clipPage52C2 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_002_doesn't_like_bugs.mp3";
import clipPage52C1 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - C/Item_001_Tom.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  TABLE IMAGE — صورة الجدول كاملة
// ─────────────────────────────────────────────
import imgTable from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 52/SVG/Asset 49.svg";
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
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    question: "Why doesn't Tom want to hold the spider?",
    correct:  ["Because he doesn't like bugs.", "because he doesnt like bugs", "Because he doesnt like bugs", "Because he doesnot like bugs", "Because he does not like bugs"],
    answer:   "Because he doesn't like bugs.",
  },
  {
    id:       2,
    question: "Why doesn't Sarah want to eat eggplant?",
    correct:  ["Because she likes oranges."],
    answer:   "Because she likes oranges.",
  },
  {
    id:       3,
    question: "Why doesn't Jack want any chicken?",
    correct:  ["Because he likes steak."],
    answer:   "Because he likes steak.",
  },
  {
    id:       4,
    question: "Why does Helen want to buy a skirt?",
    correct:  ["Because she likes skirts.", "because she likes skirts"],
    answer:   "Because she likes skirts.",
  },
  {
    id:       5,
    question: "Why doesn't John want to wear hats?",
    correct:  ["Because he doesn't like hats.", "because he doesnt like hats" , "because he doesnot like hats", "because he does not like hats"],
    answer:   "Because he doesn't like hats.",
  },
  {
    id:       6,
    question: "Why does Stella want to go to the baseball field?",
    correct:  ["Because she likes baseball.", "because she likes baseball"],
    answer:   "Because she likes baseball.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadComplete_QC() {
const listening=useExerciseListening("wb_unit9_page52_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Answer question "+item.id+": "+item.question}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit9_WB_Unit9_Page52_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit9_WB_Unit9_Page52_Q1"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Table image ── */
.rcc-table-wrap {
    width: 80%;
    border-radius: 10px;
    /* overflow: hidden; */
    align-self: center;
}

        .rcc-table-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Questions list ── */
        .rcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single row ── */
        .rcc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 9px);
          flex-wrap: wrap;
          min-width: 0;
        }

        .rcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcc-question {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${QUESTION_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rcc-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 220px);
        }

        .rcc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};

          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rcc-input:disabled   { opacity: 1; cursor: default; }
        .rcc-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcc-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rcc-badge {
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

        /* Buttons */
        .rcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rcc-row { flex-wrap: wrap; }
          .rcc-question { white-space: normal; }
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
        <ExerciseHeader subTitle="Read the whole sentence for meaning, then complete each blank with the word or form that fits best." sectionLetter="C" title={<>Read and complete.</>} />

        {/* ── Table image ── */}
        <div className="rcc-table-wrap">
          <div className="rcc-table-img" style={{position:"relative"}}><img src={imgTable} alt={"Table of preferences: Tom dislikes bugs and likes soccer; John dislikes hats and likes jackets; Sarah dislikes eggplant and likes oranges; Stella dislikes volleyball and likes baseball; Helen dislikes dresses and likes skirts; Jack dislikes chicken and likes steak."} style={{display:"block",width:"100%",height:"auto"}}/>{([{label:"Tom",src:clipPage52C1,x:0,y:0,w:33.3,h:16.666666666666668},{label:"doesn’t like bugs",src:clipPage52C2,x:33.3,y:0,w:33.3,h:16.666666666666668},{label:"likes soccer",src:clipPage52C3,x:66.6,y:0,w:33.3,h:16.666666666666668},{label:"John",src:clipPage52C4,x:0,y:16.666666666666668,w:33.3,h:16.666666666666668},{label:"doesn’t like hats",src:clipPage52C5,x:33.3,y:16.666666666666668,w:33.3,h:16.666666666666668},{label:"likes jackets",src:clipPage52C6,x:66.6,y:16.666666666666668,w:33.3,h:16.666666666666668},{label:"Sarah",src:clipPage52C7,x:0,y:33.333333333333336,w:33.3,h:16.666666666666668},{label:"doesn’t like eggplant",src:clipPage52C8,x:33.3,y:33.333333333333336,w:33.3,h:16.666666666666668},{label:"likes oranges",src:clipPage52C9,x:66.6,y:33.333333333333336,w:33.3,h:16.666666666666668},{label:"Stella",src:clipPage52C10,x:0,y:50,w:33.3,h:16.666666666666668},{label:"doesn’t like volleyball",src:clipPage52C11,x:33.3,y:50,w:33.3,h:16.666666666666668},{label:"likes baseball",src:clipPage52C12,x:66.6,y:50,w:33.3,h:16.666666666666668},{label:"Helen",src:clipPage52C13,x:0,y:66.66666666666667,w:33.3,h:16.666666666666668},{label:"doesn’t like dresses",src:clipPage52C14,x:33.3,y:66.66666666666667,w:33.3,h:16.666666666666668},{label:"likes skirts",src:clipPage52C15,x:66.6,y:66.66666666666667,w:33.3,h:16.666666666666668},{label:"Jack",src:clipPage52C16,x:0,y:83.33333333333333,w:33.3,h:16.666666666666668},{label:"doesn’t like chicken",src:clipPage52C17,x:33.3,y:83.33333333333333,w:33.3,h:16.666666666666668},{label:"likes steak",src:clipPage52C18,x:66.6,y:83.33333333333333,w:33.3,h:16.666666666666668}]).map(region=><button key={region.label} type="button" {...activationKeys} data-listening={"bank-"+region.label} aria-label={"Listen: "+region.label} onClick={()=>listening.play("bank-"+region.label,region.src)} style={{position:"absolute",left:region.x+"%",top:region.y+"%",width:region.w+"%",height:region.h+"%",padding:0,border:0,borderRadius:6,cursor:"pointer",background:listening.activeId==="bank-"+region.label?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="bank-"+region.label?"0 0 0 3px #2563eb":undefined}}>{listening.activeId==="bank-"+region.label&&renderExerciseSpeaker()}</button>)}</div>
        </div>

        {/* ── Questions ── */}
        <div className="rcc-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rcc-row">
                <span className="rcc-num">{item.id}</span>
                <span className="rcc-question">{renderExerciseAudioText({audio:listening,id:`question-${item.id}`,src:[clipPage52C19,clipPage52C20,clipPage52C21,clipPage52C22,missingNew0,missingNew1][item.id-1],label:item.question,children:item.question})}</span>
                <div className="rcc-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rcc-input",
                      wrong   ? "rcc-input--wrong"  : "",
                      showAns ? "rcc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rcc-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcc-buttons">
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