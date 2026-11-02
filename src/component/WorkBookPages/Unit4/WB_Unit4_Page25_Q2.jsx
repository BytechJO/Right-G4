import clipPage25H8 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_008_lighter.mp3";
import clipPage25H7 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_007_light.mp3";
import clipPage25H6 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_006_smaller.mp3";
import clipPage25H5 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_005_biggest.mp3";
import clipPage25H4 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_004_big.mp3";
import clipPage25H3 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_003_Superlative_(3_or_more).mp3";
import clipPage25H2 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_002_Comparative_(2).mp3";
import clipPage25H1 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - H/Item_001_Adjective.mp3";
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
const TABLE_BORDER_COLOR      = "#2096a6";
const HEADER_BG               = "#ffffff";
const HEADER_TEXT_COLOR       = "#2b2b2b";
const CELL_TEXT_COLOR         = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const TABLE_ROWS = [
  [
    { type: "text",  value: "big" },
    { type: "input", key: "1-comp", correct: ["bigger"],   answer: "bigger"   },
    { type: "text",  value: "biggest" },
  ],
  [
    { type: "input", key: "2-adj",  correct: ["small"],    answer: "small"    },
    { type: "text",  value: "smaller" },
    { type: "input", key: "2-sup",  correct: ["smallest"], answer: "smallest" },
  ],
  [
    { type: "text",  value: "light" },
    { type: "text",  value: "lighter" },
    { type: "input", key: "3-sup",  correct: ["lightest"], answer: "lightest" },
  ],
];

const ALL_INPUTS = TABLE_ROWS.flatMap((row) =>
  row.filter((cell) => cell.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteTable_QH() {
const listening=useExerciseListening("wb_unit4_page25_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_INPUTS.map(cell=>({key:cell.key,correct:cell.correct,answer:cell.answer,label:`Table row ${cell.key.split("-")[0]}, ${cell.key.endsWith("comp")?"comparative":cell.key.endsWith("sup")?"superlative":"adjective"}. Complete the word using its row clues.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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

  // ── render cell content (no <td> wrapper) ──
  const renderCellContent = (cell, isLast) => {
    const borderBottom = isLast ? "none" : `1.5px solid ${TABLE_BORDER_COLOR}`;

    if (cell.type === "text") {
      return (
        <div
          key={cell.value}
          className="rwt-cell-item"
          style={{ borderBottom }}
        >
          <span className="rwt-cell-text">{renderExerciseAudioText({audio:listening,id:`cell-${cell.value}`,src:({big:clipPage25H4,biggest:clipPage25H5,smaller:clipPage25H6,light:clipPage25H7,lighter:clipPage25H8})[cell.value],label:cell.value,children:cell.value})}</span>
        </div>
      );
    }

    const wrong  = isWrong(cell.key, cell.correct);
    const value  = answers[cell.key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div
        key={cell.key}
        className="rwt-cell-item"
        style={{ borderBottom }}
      >
        <div className="rwt-input-wrap">
          <input aria-invalid={results[cell.key]==="wrong"} placeholder="Word" title={answerTargets.find(t=>t.key===cell.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===cell.key)?.label||"Complete this answer"} {...fieldKeys}
            type="text"
            className={[
              "rwt-input",
              wrong   ? "rwt-input--wrong"  : "",
              showAns ? "rwt-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={showAns||results[cell.key]==="correct"}
            onChange={(e) => handleChange(cell.key, e.target.value)}
            style={(base=>({...base,borderBottomColor:showAns||results[cell.key]==="correct"?"#16a34a":results[cell.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="rwt-badge">✕</div>}
        </div>
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit4_WB_Unit4_Page25_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page25_Q2"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Table ── */
        .rwt-table {
           width: 100%;
    border: 2px solid #2096a6;
        border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
        }

        /* Header row */
  .rwt-th {
    background: #ffffff;
    border: 1px solid #2096a6;
    /* border-bottom: 2px solid #2096a6; */
    padding: clamp(10px, 1.4vw, 18px) clamp(12px, 1.8vw, 24px);
    font-size: clamp(15px, 1.9vw, 20px);
    color: #2b2b2b;
    text-align: center;
        font-weight: 500;

}
        .rwt-th:last-child { border-right: none !important;
         }

        /* Single tall data cell per column */
        .rwt-tall-cell {
       padding: 0;
    /* width: 33.33%; */
    border: 1px solid #2096a6;
    overflow: hidden;
        }

        /* Each sub-row inside tall cell */
        .rwt-cell-item {
        
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(65px, 9vw, 110px);
          padding: clamp(8px, 1.2vw, 16px) clamp(14px, 2vw, 26px);
          border-bottom :  1.5px solid rgba(0, 226, 94, 0) !important ;

        }

        .rwt-cell-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${CELL_TEXT_COLOR};
        }

        /* Input wrap */
        .rwt-input-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .rwt-input {
          width: clamp(80px, 12vw, 160px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwt-input:disabled    { opacity: 1; cursor: default; }
        .rwt-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwt-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwt-badge {
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
        .rwt-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="H" title={<>Read and write.</>} />

        {/* ── Table ── */}
        <table className="rwt-table">
          <thead>
            <tr>
              <th className="rwt-th">{renderExerciseAudioText({audio:listening,id:"heading-0",src:clipPage25H1,label:"Adjective",children:"Adjective"})}</th>
              <th className="rwt-th">{renderExerciseAudioText({audio:listening,id:"heading-1",src:clipPage25H2,label:"Comparative (2)",children:"Comparative (2)"})}</th>
              <th className="rwt-th">{renderExerciseAudioText({audio:listening,id:"heading-2",src:clipPage25H3,label:"Superlative (3 or more)",children:"Superlative (3 or more)"})}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {[0, 1, 2].map((colIdx) => (
                <td key={colIdx} className="rwt-tall-cell">
                  {TABLE_ROWS.map((row, rowIdx) =>
                    renderCellContent(row[colIdx], rowIdx === TABLE_ROWS.length - 1)
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* ── Buttons ── */}
        <div className="rwt-buttons">
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