import clipPage53E2 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - E/Item_002_don't_like.mp3";
import clipPage53E1 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - E/Item_001_like.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/7.svg";
import img8 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 53/SVG/8.svg";
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
const TEXT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, src: img1,
    left:  [{ type: "input", key: "01r",correct: ["Because I", "because I"], answer: "Because I"  }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "1r", correct: ["reading", "reading."], answer: "reading" }],
  },
  {
    id: 2, src: img2,
    left:  [{ type: "input", key: "02r",correct: ["Because I", "because I"], answer: "Because I"  }, { type: "text", value: "don't  like" }],
    right: [{ type: "input", key: "2r", correct: ["steak", "steak."], answer: "steak" }],
  },
  {
    id: 3, src: img3,
    left:  [{ type: "input", key: "3l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "3r", correct: ["cake", "cake."], answer: "cake" }],
  },
  {
    id: 4, src: img4,
    left:  [{ type: "input", key: "4l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "4r", correct: ["chicken", "chicken."], answer: "chicken" }],
  },
  {
    id: 5, src: img5,
    left:  [{ type: "input", key: "5l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "5r", correct: ["grapes", "grapes."], answer: "grapes" }],
  },
  {
    id: 6, src: img6,
    left:  [{ type: "input", key: "6l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "6r", correct: ["trainers", "trainers."], answer: "trainers" }],
  },
  {
    id: 7, src: img7,
    left:  [{ type: "input", key: "7l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "like" }],
    right: [{ type: "input", key: "7r", correct: ["ice cream", "ice cream."], answer: "ice cream" }],
  },
  {
    id: 8, src: img8,
    left:  [{ type: "input", key: "8l", correct: ["Because I", "because I"], answer: "Because I" }, { type: "text", value: "don't like" }],
    right: [{ type: "input", key: "8r", correct: ["snakes", "snakes."], answer: "snakes" }],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.left.filter((p) => p.type === "input"),
  ...item.right.filter((p) => p.type === "input"),
]);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QE() {
const listening=useExerciseListening("wb_unit9_page53_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>[...item.left,...item.right].filter(part=>part.type==="input").map(part=>({...part,label:"Picture "+item.id+", "+(part.key.endsWith("r")&&!part.key.startsWith("0")?"complete the reason using the picture":"complete this sentence blank")})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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

  

  const renderPart = (part, i, itemId) => {
    if (part.type === "text") {
      return <span key={i} className="rlwe-text">{renderExerciseAudioText({audio:listening,id:`clue-${itemId}-${i}-${part.value}`,src:part.value==="like"?clipPage53E1:clipPage53E2,label:part.value,children:part.value})}</span>;
    }
    const wrong    = isWrong(part);
    const value    = answers[part.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    
    return (
      <div key={part.key} className="rlwe-input-wrap">
        <input aria-invalid={results[part.key]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={["rlwe-input", wrong ? "rlwe-input--wrong" : "", showAns ? "rlwe-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[part.key]==="correct"}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[part.key]==="correct"?"#16a34a":results[part.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rlwe-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit9_WB_Unit9_Page53_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit9_WB_Unit9_Page53_Q1"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlwe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        .rlwe-row {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 10px);
          min-width: 0;
        }

        .rlwe-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
7          line-height: 1.5;
        }

        .rlwe-parts {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rlwe-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
7          line-height: 1.5;
        }

        .rlwe-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 120px);
        }

        .rlwe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
7          transition: border-color 0.2s;
        }
        .rlwe-input:disabled   { opacity: 1; cursor: default; }
        .rlwe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rlwe-badge {
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

        .rlwe-img {
          height: clamp(32px, 4.5vw, 56px);
          width: auto;
          display: block;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        .rlwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwe-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rlwe-img { grid-column: 2; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="E" title={<>Read, look, and write.</>} />

        <div className="rlwe-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwe-row">
              <span className="rlwe-num">{item.id}</span>
              <div className="rlwe-parts">{item.left.map((part, i) => renderPart(part, i, item.id))}</div>
              <img src={item.src} alt={["A closed green book.","A steak on a plate.","A decorated cake.","A roast chicken on a plate.","A bunch of grapes.","A pair of trainers.","A tall glass of pink ice cream.","A cartoon snake."][item.id-1]} className="rlwe-img" />
              <div className="rlwe-parts">{item.right.map((part, i) => renderPart(part, i, item.id))}</div>
            </div>
          ))}
        </div>

        <div className="rlwe-buttons">
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