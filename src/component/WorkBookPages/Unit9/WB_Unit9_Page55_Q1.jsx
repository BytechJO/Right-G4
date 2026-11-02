import clipPage55H3 from "../../../assets/audio/WorkBook/Unit 9/Page 55 - H/Item_003_why_doesn't_to_the_mall.mp3";
import clipPage55H2 from "../../../assets/audio/WorkBook/Unit 9/Page 55 - H/Item_002_why_doesn't_to_the_playground.mp3";
import clipPage55H1 from "../../../assets/audio/WorkBook/Unit 9/Page 55 - H/Item_001_why_don't_to_the_museum.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 30.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 25.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 26.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 27.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 28.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 55/SVG/Asset 29.svg";
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
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    hint:    "why don't / to the museum",
    correct: ["Why don't you go to the museum?", "why don't you go to the museum"],
    answer:  "Why don't you go to the museum?",
  },
  {
    id:      2,
    src:     img2,
    hint:    "why doesn't / to the playground",
    correct: ["Why doesn't he want to go to the playground?","Why doesnt he want to go to the playground?", "Why does not he want to go to the playground?","Why doesn't she want to go to the playground?","Why doesnt she want to go to the playground?", "Why does not she want to go to the playground?",],
    answer:  "Why doesn't (he/she) want to go to the playground?",
  },
{
  id: 3,
  src: img3,
  hint: "why doesn't / to the mall",
  correct: [
    "Why doesn't he want to go to the mall?",
    "Why doesnt he want to go to the mall?",
    "Why does not he want to go to the mall?",
    "Why doesn't she want to go to the mall?",
    "Why doesnt she want to go to the mall?",
        "Why does not she want to go to the mall?",

  ],
  answer: "Why doesn't (he/she) want to go to the mall?",
},
{
  id: 4,
  src: img4,
  hint: "why don't / to the circus",
  correct: [
    "Why don't you want to go to the circus?",
    "Why dont you want to go to the circus?",
    "Why do not you want to go to the circus?",
    "Why don't they want to go to the circus?",
    "Why dont they want to go to the circus?",
    "Why do not they want to go to the circus?"
  ],
  answer: "Why don't (you/they) want to go to the circus?",
},
{
  id: 5,
  src: img5,
  hint: "why doesn't / to the cave",
  correct: [
    "Why doesn't he want to go to the cave?",
    "Why doesnt he want to go to the cave?",
    "Why does not he want to go to the cave?",
    "Why doesn't she want to go to the cave?",
    "Why doesnt she want to go to the cave?",
    "Why does not she want to go to the cave?"
  ],
  answer: "Why doesn't (he/she) want to go to the cave?",
},
{
  id: 6,
  src: img6,
  hint: "why don't / to the library",
  correct: [
    "Why don't you want to go to the library?",
    "Why dont you want to go to the library?",
    "Why do not you want to go to the library?",
    "Why don't they want to go to the library?",
    "Why dont they want to go to the library?",
    "Why do not they want to go to the library?"
  ],
  answer: "Why don't (you/they) want to go to the library?",
}
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteQ_QH() {
const listening=useExerciseListening("wb_unit9_page55_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Picture "+item.id+". Write a question using "+item.hint}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit9_WB_Unit9_Page55_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit9_WB_Unit9_Page55_Q1"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page55_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page55_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page55_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lrwq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* ── Single item: hint row on top, content row below ── */
        .lrwq-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 7px);
        }

        /* Hint row: num + hint text */
        .lrwq-hint-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwq-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwq-hint {
          font-size: clamp(15px, 1.5vw, 20px);
          color: ${HINT_COLOR};
          line-height: 1.5;
        }

        /* Content row: img on left + input stretches to right */
        .lrwq-content-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Image */
        .lrwq-img {
          width: clamp(80px, 11vw, 140px);
          height: clamp(60px, 8.5vw, 110px);
          flex-shrink: 0;
          display: block;
        }

        /* Input wrap */
        .lrwq-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .lrwq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.5vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwq-input:disabled   { opacity: 1; cursor: default; }
        .lrwq-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwq-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwq-badge {
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
        .lrwq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwq-content-row { flex-wrap: wrap; }
          .lrwq-img { width: 100px; height: auto; }
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
        <ExerciseHeader subTitle="Read the given answer or picture clue first, then write the matching complete question." sectionLetter="H" title={<>Look, read, and write questions.</>} />

        {/* ── Items ── */}
        <div className="lrwq-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lrwq-item">

                {/* Hint row */}
                <div className="lrwq-hint-row">
                  <span className="lrwq-num">{item.id}</span>
                  <span className="lrwq-hint">{renderExerciseAudioText({audio:listening,id:`hint-${item.id}`,src:[clipPage55H1,clipPage55H2,clipPage55H3][item.id-1],label:item.hint,children:item.hint})}</span>
                </div>

                {/* Content row: img + input */}
                <div className="lrwq-content-row">

                  {/* Image */}
                  <img src={item.src} alt={["Dinosaur models in a museum.","A playground with swings and slides.","Shops and an escalator inside a mall.","Performers and spectators at a circus.","The entrance to a cave.","Children and an adult in a library."][item.id-1]} className="lrwq-img" />

                  {/* Input */}
                  <div className="lrwq-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "lrwq-input",
                        wrong   ? "lrwq-input--wrong"  : "",
                        showAns ? "lrwq-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwq-badge">✕</div>}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwq-buttons">
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