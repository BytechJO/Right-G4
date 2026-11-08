import clipPage19K3 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - K/Item_003_He.mp3";
import clipPage19K2 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - K/Item_002_She.mp3";
import clipPage19K1 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - K/Item_001_They.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 9.svg";  // goats
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 10.svg"; // cat
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 11.svg";
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
 // shirts

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const HINT_BORDER_COLOR       = "#2096a6";
const HINT_TEXT_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    hint:    "They",
    qKey:    "1-q",
    qCorrect: ["Did they have goats?", "Did they have goats"],
    qAnswer:  "Did they have goats?",
    aKey:    "1-a",
    aCorrect: ["Yes, they did.", "Yes, they did"],
    aAnswer:  "Yes, they did.",
  },
  {
    id:      2,
    src:     img2,
    hint:    "She",
    qKey:    "2-q",
    qCorrect: ["Did she have a cat?", "Did she have a cat"],
    qAnswer:  "Did she have a cat?",
    aKey:    "2-a",
    aCorrect: ["Yes, she did.", "Yes, she did"],
    aAnswer:  "Yes, she did.",
  },
  {
    id:      3,
    src:     img3,
    hint:    "He",
    qKey:    "3-q",
    qCorrect: ["Did he have shirts?", "Did he have shirts"],
    qAnswer:  "Did he have shirts?",
    aKey:    "3-a",
    aCorrect: ["Yes, he did.", "Yes, he did"],
    aAnswer:  "Yes, he did.",
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  { key: item.qKey, correct: item.qCorrect },
  { key: item.aKey, correct: item.aCorrect },
]);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteQA_QK() {
const listening=useExerciseListening("wb_unit3_page19_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>[{key:item.qKey,correct:item.qCorrect,answer:item.qAnswer,label:`Picture ${item.id}. Write a question using ${item.hint}.`},{key:item.aKey,correct:item.aCorrect,answer:item.aAnswer,label:`Picture ${item.id}. Write the answer to its question.`}]);const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.qKey] = item.qAnswer;
      filled[item.aKey] = item.aAnswer;
    });
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

  // ── render input ──────────────────────────
  const renderInput = (key, correctArr) => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    return (
      <div className="lrqa-input-wrap">
        <input aria-invalid={results[key]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={[
            "lrqa-input",
            wrong   ? "lrqa-input--wrong"  : "",
            showAns ? "lrqa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[key]==="correct"}
          onChange={(e) => handleChange(key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrqa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page19_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page19_Q2"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .lrqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* ── Single row: num | img | hint | lines ── */
        .lrqa-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(80px, 12vw, 150px)
            clamp(50px, 7vw, 90px)
            1fr;
          gap: clamp(10px, 1.4vw, 20px);
          align-items: center;
        }

        /* Number */
        .lrqa-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* Image */
        .lrqa-img {
          width: 100%;
          height: clamp(70px, 10vw, 130px);
          object-fit: contain;
          display: block;
        }

        /* Hint box */
        .lrqa-hint {
          border: 2px solid ${HINT_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 22px);
=          color: ${HINT_TEXT_COLOR};
          text-align: center;
          white-space: nowrap;
              margin-top: 35%;

        }

        /* Lines — question + answer stacked */
        .lrqa-lines {
            display: flex;
    flex-direction: column;
    gap: 5vh;
    min-width: 0;
        }

        /* Input wrap */
        .lrqa-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrqa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrqa-input:disabled    { opacity: 1; cursor: default; }
        .lrqa-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrqa-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrqa-badge {
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
        .lrqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrqa-row {
            grid-template-columns: clamp(16px,4vw,22px) 1fr clamp(50px,14vw,80px);
            grid-template-areas: "num img hint" ". lines lines";
          }
          .lrqa-lines { grid-area: lines; }
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
        <ExerciseHeader subTitle="Use the picture and grammar clue, say the full question and answer first, then write both before checking." sectionLetter="K" title={<>Look, read, and write questions and answers.</>} />

        {/* ── Items ── */}
        <div className="lrqa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrqa-row">

              {/* Number */}
              <span className="lrqa-num">{item.id}</span>

              {/* Image */}
              <img src={item.src} alt={["Two goats.","A cat.","Three shirts in different colors."][item.id-1]} className="lrqa-img" />

              {/* Hint */}
              <div className="lrqa-hint">{renderExerciseAudioText({audio:listening,id:`hint-${item.id}`,src:[clipPage19K1,clipPage19K2,clipPage19K3][item.id-1],label:item.hint,children:item.hint})}</div>

              {/* Question + Answer answers */}
              <div className="lrqa-lines">
                {renderInput(item.qKey, item.qCorrect)}
                {renderInput(item.aKey, item.aCorrect)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrqa-buttons">
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