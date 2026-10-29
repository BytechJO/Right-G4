import clipPage69F4 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - F/Item_004_She_cooked_dinner.mp3";
import clipPage69F3 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - F/Item_003_He_rowed_the_boat.mp3";
import clipPage69F2 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - F/Item_002_She_washed_the_car.mp3";
import clipPage69F1 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - F/Item_001_He_fixed_the_fence.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 20.svg"; // rowing boat
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 21.svg"; // rowing boat
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 22.svg"; // rowing boat
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 24.svg";
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

 // rowing boat

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER_DEF   = "#2096a6";
const BOX_BORDER_SEL   = "#2096a6";
const BOX_BORDER_CORR  = "#16a34a";
const BOX_BORDER_WRONG = "#ef4444";
const BOX_BG_SEL       = "transparent";
const BOX_BG_WRONG     = "transparent";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "a" | "b"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    textA:   "He fixed the fence.",
    textB:   "He rowed the boat.",
    correct: "b",
  },
  {
    id:      2,
    src:     img2,
    textA:   "She washed the car.",
    textB:   "She cooked dinner.",
    correct: "b",
  },
  {
    id:      3,
    src:     img3,
    textA:   "She cleaned the floor.",
    textB:   "She painted a picture.",
    correct: "b",
  },
  {
    id:      4,
    src:     img4,
    textA:   "She played with her doll.",
    textB:   "She fixed her toy.",
    correct: "a",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QF() {
const listening=useExerciseListening("sb_unit8_page6_q2");

  const [selected,    setSelected]    = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,side) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:side}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();setSelected(Object.fromEntries(ITEMS.map(item=>[item.id,item.correct])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setSelected({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Selections and feedback cleared.");};

  // ── Box state ──
  const getBoxState = (item, side) => {
    const sel = selected[item.id];
    if (sel !== side) return "idle";
    if (showAns)      return "correct";
    if (results[item.id] !== undefined)  return side === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderSentenceRow = (item, side) => {
    const text  = side === "a" ? item.textA : item.textB;
    const state = getBoxState(item, side);
    const showChk = state === "selected" || state === "correct";
    const isWrong = state === "wrong";

    let boxBg  = "#ffffff";
    let boxBd  = BOX_BORDER_DEF;
    if (state === "selected") { boxBg = BOX_BG_SEL;   boxBd = BOX_BORDER_SEL;   }
    if (state === "correct")  { boxBg = "#ffffff";     boxBd = BOX_BORDER_CORR;  }
    if (state === "wrong")    { boxBg = BOX_BG_WRONG;  boxBd = BOX_BORDER_WRONG; }

    return (
      <div data-listening={`choice-${item.id}-${side}`} style={{...({...({}),borderRadius:({}).borderRadius || "6px",background:selected[item.id] === side && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === side ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),position:"relative",background:listening.activeId===`choice-${item.id}-${side}`?"#dbeafe":({...({}),borderRadius:({}).borderRadius || "6px",background:selected[item.id] === side && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === side ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}).background}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${side === "a" ? item.textA:item.textB}`} aria-pressed={selected[item.id] === side} aria-disabled={showAns || results[item.id] === "correct"}
        key={side}
        className={["rlwf-sent-row", isLocked ? "rlwf-sent-row--locked" : ""].filter(Boolean).join(" ")}
        onClick={()=>{listening.play(`choice-${item.id}-${side}`,item.id===1?(side==="a"?clipPage69F1:clipPage69F3):item.id===2?(side==="a"?clipPage69F2:clipPage69F4):null);handleSelect(item.id,side);}}
      >
        <span className="rlwf-sent-text">{text}</span>

        {/* Circular checkbox */}
        <div style={{
          position: "relative",
          width:  "clamp(40px,3.4vw,40px)",
          height: "clamp(40px,3.4vw,40px)",
          borderRadius: "30%",
          border: `2px solid ${boxBd}`,
          background: boxBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.15s, background 0.15s",
        }}>
          {showChk && (
            <span style={{ color: CHECK_COLOR, fontSize: "clamp(14px,2vw,24px)", fontWeight: 900, lineHeight: 1 }}>✓</span>
          )}
          {isWrong && (
            <div style={{
              position: "absolute", top: -7, right: -7,
              width: "clamp(13px,1.5vw,16px)", height: "clamp(13px,1.5vw,16px)",
              borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700,
              border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none", zIndex: 3,
            }}>✕</div>
          )}
        </div>
      {listening.activeId===`choice-${item.id}-${side}`&&renderExerciseSpeaker()}</div>
    );
  };

  return (
    <div data-adapt-scope="unit8_Unit8_Page6_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit8_Unit8_Page6_Q2"] input:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2×2 grid ── */
        .rlwf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 70%;
        }

        /* Single item */
        .rlwf-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Num + image */
        .rlwf-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        .rlwf-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Sentence row: text + checkbox */
        .rlwf-sent-row {
            position: relative;
    right: -1.35em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 1vw, 14px);
          cursor: pointer;
          user-select: none;
          padding: clamp(3px, 0.4vw, 6px) 0;
        }
        .rlwf-sent-row--locked { cursor: default; }

        .rlwf-sent-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          flex: 1;
        }

        .rlwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwf-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read each statement and compare it with the picture or clue, then choose the correct two-way answer." sectionLetter="F" title={<>Read, look, and write <span style={{color : "RED"}}>✓</span> .</>} />

        {/* ── 2×2 Grid ── */}
        <div className="rlwf-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlwf-item">

              {/* Num + Image */}
              <div className="rlwf-img-row">
                <span className="rlwf-num">{item.id}</span>
                <img src={item.src} alt={["A girl rowing a boat.","A man cooking with two children.","A girl painting a landscape.","A girl playing with a doll."][item.id-1]} className="rlwf-img" />
              </div>

              {/* Two sentences */}
              {renderSentenceRow(item, "a")}
              {renderSentenceRow(item, "b")}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwf-buttons">
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