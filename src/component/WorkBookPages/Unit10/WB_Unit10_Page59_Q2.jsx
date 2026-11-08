import clipPage59F7 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_007_false.mp3";
import clipPage59F6 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_006_true.mp3";
import clipPage59F5 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_005_Oregon_has_many_different_types_of_landscapes.mp3";
import clipPage59F4 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_004_Oregon_has_lots_of_pine_trees.mp3";
import clipPage59F3 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_003_Mt._Hood_has_snow_all_year_round.mp3";
import clipPage59F2 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_002_Oregon_has_oceans,_rivers,_and_deserts.mp3";
import clipPage59F1 from "../../../assets/audio/WorkBook/Unit 10/Page 59 - F/Item_001_Have_you_ever_been_to_Oregon_Michael_has_been_to_Oregon_many_times._He_t.mp3";
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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR     = "#2096a6";
const CIRCLE_WRONG     = "#ef4444";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const PASSAGE_COLOR    = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PASSAGE = `Have you ever been to Oregon? Michael has been to Oregon many times. He thinks Oregon is one of the prettiest and friendliest states in America. Oregon has many different types of landscapes. Oregon has oceans, rivers, and waterfalls. It also has farmlands, mountains, and forests. He has also noticed that Oregon has lots of green pine trees. Mt. Hood, which surrounds the city of Portland, is covered with snow all year round.`;

const ITEMS = [
  {
    id:      1,
    sentence: "Oregon has oceans, rivers, and deserts.",
    correct:  "false",
  },
  {
    id:      2,
    sentence: "Mt. Hood has snow all year round.",
    correct:  "true",
  },
  {
    id:      3,
    sentence: "Oregon has lots of pine trees.",
    correct:  "true",
  },
  {
    id:      4,
    sentence: "Oregon has many different types of landscapes.",
    correct:  "true",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircleTrueFalse_QF() {
const listening=useExerciseListening("wb_unit10_page59_q2");

  const [selected,    setSelected]    = useState({});  // { itemId: "true" | "false" }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId,value) => {listening.play("choice-"+itemId+"-"+value,value==="true"?clipPage59F6:clipPage59F7);if(showAns || results[itemId] === "correct")return;setSelected(prev=>({...prev,[itemId]:prev[itemId] === value ? null : value}));setResults(prev=>{const next={...prev};delete next[itemId];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
 setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setSelected({});
    setShowResults(false);
    setShowAns(false);
 setResults({});setAnnouncement("Selections and feedback cleared.");
  };

  // حالة الكلمة
  const getWordState = (item, value) => {
    const isSel = selected[item.id] === value;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (results[item.id] !== undefined) return item.correct === value ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div data-adapt-scope="Unit10_WB_Unit10_Page59_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page59_Q2"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page59_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page59_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page59_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Passage ── */
        .rtf-passage {
          font-size: clamp(13px, 1.6vw, 18px);
          color: ${PASSAGE_COLOR};
          line-height: 1.8;
          margin-bottom: clamp(16px, 2.4vw, 30px);
        }

        /* ── Items list ── */
        .rtf-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        /* ── Single row: num | sentence | true | false ── */
        .rtf-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: clamp(10px, 1.4vw, 20px);
        }

        /* Number */
        .rtf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Sentence */
        .rtf-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        /* Word wrap (true / false) */
        .rtf-word-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(3px, 0.4vw, 5px) clamp(12px, 1.6vw, 20px);
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }
        .rtf-word-wrap--locked { cursor: default; }

        /* Oval */
        .rtf-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        /* States */
        .rtf-word-wrap--selected .rtf-oval { border-color: ${CIRCLE_COLOR}; }
        .rtf-word-wrap--correct  .rtf-oval { border-color: ${CIRCLE_COLOR}; }
        .rtf-word-wrap--wrong    .rtf-oval { border-color: ${CIRCLE_WRONG}; }

        /* Word text */
        .rtf-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ✕ badge */
        .rtf-badge {
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

        /* Buttons */
        .rtf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rtf-row {
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
          }
          .rtf-word-wrap:first-of-type { margin-left: 0; }
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="F" title={<>Read and circle{" "}
          <span style={{ color: CIRCLE_COLOR }}>true</span>{" "}
          or{" "}
          <span style={{ color: CIRCLE_COLOR }}>false</span>.</>} />

        {/* ── Passage ── */}
        <p className="rtf-passage">{renderExerciseAudioText({audio:listening,id:"passage",src:clipPage59F1,label:PASSAGE,children:PASSAGE})}</p>

        {/* ── Items ── */}
        <div className="rtf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rtf-row">

              {/* Number */}
              <span className="rtf-num">{item.id}</span>

              {/* Sentence */}
              <span className="rtf-sentence">{renderExerciseAudioText({audio:listening,id:`sentence-${item.id}`,src:[clipPage59F2,clipPage59F3,clipPage59F4,clipPage59F5][item.id-1],label:item.sentence,children:item.sentence})}</span>

              {/* True */}
              {["true", "false"].map((value) => {
                const state = getWordState(item, value);
                return (
                  <div data-listening={"choice-"+item.id+"-"+value} style={{position:"relative",borderRadius:999,background:selected[item.id]===value||listening.activeId==="choice-"+item.id+"-"+value?"#dbeafe":undefined,boxShadow:selected[item.id]===value?`inset 0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"}`:undefined,outline:listening.activeId==="choice-"+item.id+"-"+value?"2px solid #2563eb":undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${value}`} aria-pressed={selected[item.id] === value} aria-disabled={showAns || results[item.id] === "correct"}
                    key={value}
                    className={[
                      "rtf-word-wrap",
                      isLocked ? "rtf-word-wrap--locked" : "",
                      state === "selected" ? "rtf-word-wrap--selected" : "",
                      state === "correct"  ? "rtf-word-wrap--correct"  : "",
                      state === "wrong"    ? "rtf-word-wrap--wrong"    : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleSelect(item.id, value)}
                  >
                    <div style={{borderColor:state==="correct"?"#16a34a":undefined}} className="rtf-oval" />
                    <span className="rtf-word">{value}</span>
                    {state === "wrong" && <div className="rtf-badge">✕</div>}
                  {listening.activeId==="choice-"+item.id+"-"+value&&renderExerciseSpeaker()}</div>
                );
              })}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rtf-buttons">
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