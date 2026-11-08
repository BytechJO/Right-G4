import clipPage86B8 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_008_I.mp3";
import clipPage86B7 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_007_You.mp3";
import clipPage86B6 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_006_We.mp3";
import clipPage86B5 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_005_They.mp3";
import clipPage86B4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_004_He.mp3";
import clipPage86B3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_003_has.mp3";
import clipPage86B2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_002_have.mp3";
import clipPage86B1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - B/Item_001_She.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 24.svg"; // She
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 25.svg"; // He
import img3 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 26.svg"; // They
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 27.svg"; // We
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 28.svg"; // You
import img6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 29.svg";
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

 // I

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR      = "#2b2b2b";
const NUMBER_COLOR    = "#2b2b2b";
const PRONOUN_COLOR   = "#2b2b2b";
const CIRCLE_SELECTED = "#2195a6";
const CIRCLE_CORRECT = "#16a34a";
const CIRCLE_WRONG    = "#ef4444";
const WRONG_BADGE_BG  = "#ef4444";
const WRONG_BADGE_TX  = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: img1, pronoun: "She",  correct: "has"  },
  { id: 2, src: img2, pronoun: "He",   correct: "has"  },
  { id: 3, src: img3, pronoun: "They", correct: "have" },
  { id: 4, src: img4, pronoun: "We",   correct: "have" },
  { id: 5, src: img5, pronoun: "You",  correct: "have" },
  { id: 6, src: img6, pronoun: "I",    correct: "have" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircle_QB() {
const listening=useExerciseListening("sb_unit10_page5_q2");

  const [selected,    setSelected]    = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,value) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:value}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();setSelected(Object.fromEntries(ITEMS.map(item=>[item.id,item.correct])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setSelected({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Selections and feedback cleared.");};

  const getState=(item,value)=>selected[item.id]!==value?"idle":showAns?"correct":results[item.id]||"selected";

  const borderColor = (state) => {
    if (state === "selected") return CIRCLE_SELECTED;
    if (state === "correct")  return CIRCLE_CORRECT;
    if (state === "wrong")    return CIRCLE_WRONG;
    return "transparent";
  };

  const renderOption = (item, value) => {
    const state   = getState(item, value);
    const isWrong = state === "wrong";

    return (
      <div data-listening={`choice-${item.id}-${value}`} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.pronoun}: choose ${value}.`} aria-pressed={selected[item.id] === value} aria-disabled={showAns || results[item.id] === "correct"}
        key={value}
        style={(base=>({...base,position:"relative",background:listening.activeId===`choice-${item.id}-${value}`?"#dbeafe":base.background,boxShadow:listening.activeId===`choice-${item.id}-${value}`?"0 0 0 2px #2563eb":base.boxShadow}))({...({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2.5px solid ${borderColor(state)}`,
          borderRadius: "999px",
          padding: "clamp(4px,0.5vw,8px) clamp(14px,1.8vw,24px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          minWidth: "clamp(56px,7vw,90px)",
        }),borderRadius:({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2.5px solid ${borderColor(state)}`,
          borderRadius: "999px",
          padding: "clamp(4px,0.5vw,8px) clamp(14px,1.8vw,24px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          minWidth: "clamp(56px,7vw,90px)",
        }).borderRadius || "6px",background:selected[item.id] === value && !showAns && results[item.id] === undefined ? "#dbeafe" : ({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2.5px solid ${borderColor(state)}`,
          borderRadius: "999px",
          padding: "clamp(4px,0.5vw,8px) clamp(14px,1.8vw,24px)",
          cursor: isLocked ? "default" : "pointer",
          userSelect: "none",
          transition: "border-color 0.15s",
          minWidth: "clamp(56px,7vw,90px)",
        }).background,boxShadow:selected[item.id] === value ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined})}
        onClick={(e)=>{listening.play(`choice-${item.id}-${value}`,value==="has"?clipPage86B3:clipPage86B2);(() => handleSelect(item.id, value))(e);}}
      >
        <span style={{
          fontSize: "clamp(14px,1.7vw,20px)",
          color: TEXT_COLOR,
          fontWeight: state !== "idle" ? 600 : 400,
          lineHeight: 1.4,
        }}>
          {value}
        </span>
        {isWrong && (
          <div style={{
            position: "absolute", top: -7, right: -7,
            width: "clamp(14px,1.6vw,17px)", height: "clamp(14px,1.6vw,17px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TX,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 3,
          }}>✕</div>
        )}
      {listening.activeId===`choice-${item.id}-${value}`&&renderExerciseSpeaker()}</div>
    );
  };

  return (
    <div data-adapt-scope="unit10_Unit10_Page5_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit10_Unit10_Page5_Q2"] input:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_Unit10_Page5_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 3×2 grid ── */
        .rcb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.4vw, 32px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single item */
        .rcb-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* num row */
        .rcb-num-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rcb-img {
          width:50%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* Options + pronoun */
        .rcb-options-col {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 12px);
          align-items: flex-start;
        }

        .rcb-pronoun {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PRONOUN_COLOR};
          font-weight: 500;
          line-height: 1.4;
        }

        /* img + options side by side */
        .rcb-body {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        .rcb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rcb-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 360px) {
          .rcb-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read the clue carefully, then select the option that best matches the word, picture, or sentence." sectionLetter="B" title={<>Read and circle.</>} />

        {/* ── 3×2 Grid ── */}
        <div className="rcb-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcb-item">

              {/* Num */}
              <span className="rcb-num">{item.id}</span>

              {/* Image + options */}
              <div className="rcb-body">
                <img src={item.src} alt={["A girl with pigtails.","A boy with short brown hair.","A girl and a boy together.","Two children pointing to themselves.","A boy pointing toward a girl.","A girl pointing to herself."][item.id-1]} className="rcb-img" />

                <div className="rcb-options-col">
                  {renderOption(item, "have")}
                  <span className="rcb-pronoun">{renderExerciseAudioText({audio:listening,id:`pronoun-${item.id}`,src:[clipPage86B1,clipPage86B4,clipPage86B5,clipPage86B6,clipPage86B7,clipPage86B8][item.id-1],label:item.pronoun,children:item.pronoun})}</span>
                  {renderOption(item, "has")}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rcb-buttons">
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