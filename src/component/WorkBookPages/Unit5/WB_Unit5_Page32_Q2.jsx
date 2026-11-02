import clipPage32L7 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_007_the_pond.mp3";
import clipPage32L6 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_006_a_tree.mp3";
import clipPage32L5 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_005_the_car.mp3";
import clipPage32L4 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_004_the_barn.mp3";
import clipPage32L3 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_003_It_went.mp3";
import clipPage32L2 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_002_go.mp3";
import clipPage32L1 from "../../../assets/audio/WorkBook/Unit 5/Page 32 - L/Item_001_Where_did.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — farm scene (صورة واحدة للكل)
// ─────────────────────────────────────────────
import farmImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 32/SVG/Asset 43.svg";
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
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: سطران
//  سطر 1: "Where did ___ go?"  — input للاسم
//  سطر 2: "It went ___ the ___" — input للحرف الجر
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    q: { before: "Where did", after: "go?",      key: "1-q", correct: ["the bird"],  answer: "the bird"  },
    a: { before: "It went",   after: "the barn.", key: "1-a", correct: ["into"],      answer: "into"      },
  },
  {
    id:  2,
    q: { before: "Where did", after: "go?",      key: "2-q", correct: ["the dog"],   answer: "the dog"   },
    a: { before: "It went",   after: "the car.",  key: "2-a", correct: ["under"],     answer: "under"     },
  },
  {
    id:  3,
    q: { before: "Where did", after: "go?",      key: "3-q", correct: ["the cat"],   answer: "the cat"   },
    a: { before: "It went",   after: "a tree.",   key: "3-a", correct: ["up"],        answer: "up"        },
  },
  {
    id:  4,
    q: { before: "Where did", after: "go?",      key: "4-q", correct: ["the horse"], answer: "the horse" },
    a: { before: "It went",   after: "the pond.", key: "4-a", correct: ["into"],      answer: "into"      },
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [item.q, item.a]);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QL() {
const listening=useExerciseListening("wb_unit5_page32_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>[item.q,item.a].map((cell,i)=>({...cell,label:`Picture question ${item.id}, ${i===0?"question":"answer"}. ${cell.before} blank ${cell.after}`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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

  

  // ── render one sentence line ──────────────
  const renderLine = (inp, showNum = false, num = null) => {
    const wrong    = isWrong(inp);
    const value    = answers[inp.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    

    return (
      <div className="lrwl-line">
        {showNum && <span className="lrwl-num">{num}</span>}
        <span className="lrwl-text">{renderExerciseAudioText({audio:listening,id:`prefix-${inp.key}`,src:inp.before==="Where did"?clipPage32L1:clipPage32L3,label:inp.before,children:inp.before})}</span>
        <div className="lrwl-input-wrap">
          <input aria-invalid={results[inp.key]==="wrong"} placeholder="Word or phrase" title={answerTargets.find(t=>t.key===inp.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===inp.key)?.label||"Complete this answer"} {...fieldKeys}
            type="text"
            className={[
              "lrwl-input",
              wrong   ? "lrwl-input--wrong"  : "",
              showAns ? "lrwl-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={showAns||results[inp.key]==="correct"}
            onChange={(e) => handleChange(inp.key, e.target.value)}
            style={(base=>({...base,borderBottomColor:showAns||results[inp.key]==="correct"?"#16a34a":results[inp.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="lrwl-badge">✕</div>}
        </div>
        <span className="lrwl-text">{renderExerciseAudioText({audio:listening,id:`suffix-${inp.key}`,src:inp.after==="go?"?clipPage32L2:[clipPage32L4,clipPage32L5,clipPage32L6,clipPage32L7][Number(inp.key[0])-1],label:inp.after,children:inp.after})}</span>
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit5_WB_Unit5_Page32_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page32_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page32_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page32_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page32_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Farm image ── */
        .lrwl-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* ── 2-column grid ── */
        .lrwl-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(14px, 2.2vw, 28px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwl-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Line: num? + before + input + after */
        .lrwl-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        .lrwl-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwl-text {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .lrwl-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(50px, 7vw, 100px);
        }

        .lrwl-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrwl-input:disabled        { opacity: 1; cursor: default; }
        .lrwl-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwl-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwl-badge {
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
        .lrwl-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 540px) {
          .lrwl-grid { grid-template-columns: 1fr; }
          .lrwl-line { flex-wrap: wrap; }
          .lrwl-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="L" title={<>Look, read, and write.</>} />

        {/* ── Farm image ── */}
        <img src={farmImg} alt={["A farm scene with a bird by a barn, a dog beneath a red car, a cat climbing a tree, and a horse entering a pond."][0]} className="lrwl-img" />

        {/* ── 2-column grid ── */}
        <div className="lrwl-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwl-card">
              {renderLine(item.q, true, item.id)}
              {renderLine(item.a, false)}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwl-buttons">
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