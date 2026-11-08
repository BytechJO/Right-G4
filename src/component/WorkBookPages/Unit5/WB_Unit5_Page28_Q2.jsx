import missingNew0 from "../../../assets/audio/G4-Missing/Stella's rabbit is.mp3";
import missingNew1 from "../../../assets/audio/G4-Missing/the swing..mp3";
import clipPage28D10 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_010_the_bed.mp3";
import clipPage28D9 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_009_Sarah_is.mp3";
import clipPage28D8 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_008_the_sink.mp3";
import clipPage28D7 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_007_The_telephone_is.mp3";
import clipPage28D6 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_006_the_chair_in_the_living_room.mp3";
import clipPage28D5 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_005_The_lamp_is.mp3";
import clipPage28D4 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_004_by_under.mp3";
import clipPage28D3 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_003_on_beside.mp3";
import clipPage28D2 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_002_near_in.mp3";
import clipPage28D1 from "../../../assets/audio/WorkBook/Unit 5/Page 28 - D/Item_001_between_next_to.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 28.svg"; // living room - lamp
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 27.svg"; // bathroom - telephone
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 32.svg";// playground - swing
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 28/svg/Asset 33.svg";
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
 // bedroom - rabbit

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_BG                 = "#ffffff";
const HINT_BORDER_COLOR       = "#2096a6";
const HINT_TEXT_COLOR         = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    hint:    "between / next to",
    before:  "The lamp is",
    after:   "the chair in the living room.",
    correct: ["next to"],
    answer:  "next to",
  },
  {
    id:      2,
    src:     img2,
    hint:    "near / in",
    before:  "The telephone is",
    after:   "the sink.",
    correct: ["near"],
    answer:  "near",
  },
  {
    id:      3,
    src:     img3,
    hint:    "on / beside",
    before:  "Sarah is",
    after:   "the swing.",
    correct: ["on"],
    answer:  "on",
  },
  {
    id:      4,
    src:     img4,
    hint:    "by / under",
    before:  "Stella's rabbit is",
    after:   "the bed.",
    correct: ["under"],
    answer:  "under",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QD() {
const listening=useExerciseListening("wb_unit5_page28_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. Choose from ${item.hint}. ${item.before} blank ${item.after}`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit5_WB_Unit5_Page28_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page28_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page28_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page28_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page28_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2×2 grid ── */
        .rlwd-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        /* Number */
        .rlwd-num {
          position: relative;
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 0;
          bottom : -10% ;
        }

        /* Image wrap — hint badge at bottom */
        .rlwd-img-wrap {
          position: relative;
          width: 100%;
        }
        .rlwd-img {
          width: 100%;
          height: clamp(110px, 14vw, 180px);
          display: block;
        }

        /* Hint badge — bottom center */
        .rlwd-hint {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: ${HINT_BG};
          border: 2px solid ${HINT_BORDER_COLOR};
          border-radius:15px ; 
          padding: clamp(4px, 0.5vw, 7px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 18px);
          color: ${HINT_TEXT_COLOR};
          white-space: nowrap;
          user-select: none;
                  bottom : -10%

        }

        /* Sentence */
        .rlwd-sentence {
          position: relative;

          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
font-size: clamp(16px, 1.9vw, 18px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
                            bottom : -5%;
                            padding : 0 13% ;

        }

        .rlwd-text {
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
        }

        /* Input wrap */
        .rlwd-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rlwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rlwd-input:disabled        { opacity: 1; cursor: default; }
        .rlwd-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwd-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwd-badge {
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
        .rlwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlwd-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="D" title={<>Read, look, and write.</>} />

        {/* ── Grid ── */}
        <div className="rlwd-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rlwd-card">

                {/* Number */}
                <span className="rlwd-num">{item.id}</span>

                {/* Image + hint */}
                <div className="rlwd-img-wrap">
                  <img src={item.src} alt={["A lamp beside an armchair in a living room.","A telephone on the wall near a sink.","Children sitting on swings.","A rabbit beneath a bed."][item.id-1]} className="rlwd-img" />
                  <div className="rlwd-hint">{renderExerciseAudioText({audio:listening,id:`choices-${item.id}`,src:[clipPage28D1,clipPage28D2,clipPage28D3,clipPage28D4][item.id-1],label:item.hint,children:item.hint})}</div>
                </div>

                {/* Sentence */}
                <div className="rlwd-sentence">
                  <span className="rlwd-text">{renderExerciseAudioText({audio:listening,id:`prefix-${item.id}`,src:({1:clipPage28D5,2:clipPage28D7,3:clipPage28D9,4:missingNew0})[item.id],label:item.before,children:item.before})}</span>
                  <div className="rlwd-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Word or phrase" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "rlwd-input",
                        wrong   ? "rlwd-input--wrong"  : "",
                        showAns ? "rlwd-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rlwd-badge">✕</div>}
                  </div>
                  <span className="rlwd-text">{renderExerciseAudioText({audio:listening,id:`suffix-${item.id}`,src:({1:clipPage28D6,2:clipPage28D8,4:clipPage28D10,3:missingNew1})[item.id],label:item.after,children:item.after})}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwd-buttons">
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