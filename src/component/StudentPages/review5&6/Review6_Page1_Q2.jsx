import clipPage54B5 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - B/Item_005_Hansel_should_eat_ice_cream.mp3";
import clipPage54B4 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - B/Item_004_He_shouldn't_swim_in_the_sea.mp3";
import clipPage54B3 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - B/Item_003_He_should_swim_in_the_sea.mp3";
import clipPage54B2 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - B/Item_002_She_shouldn't_build_a_snowman.mp3";
import clipPage54B1 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - B/Item_001_She_should_build_a_snowman.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 46.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 47.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 48.svg";
import img4 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 54/SVG/Asset 45.svg";
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
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER       = "#2195a6";
const BOX_BG           = "#ffffff";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctRow: "top" | "bottom"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:         1,
    src:        img1,
    emoji:      "😊",
    topText:    "She should build a snowman.",
    bottomText: "She shouldn't build a snowman.",
    correctRow: "top",
  },
  {
    id:         2,
    src:        img2,
    emoji:      "😢",
    topText:    "He should swim in the sea.",
    bottomText: "He shouldn't swim in the sea.",
    correctRow: "top",
  },
  {
    id:         3,
    src:        img3,
    emoji:      "😢",
    topText:    "Hansel should eat ice cream now.",
    bottomText: "Hansel shouldn't eat ice cream now.",
    correctRow: "bottom",
  },
  {
    id:         4,
    src:        img4,
    emoji:      "😊",
    topText:    "She should take a picture.",
    bottomText: "She shouldn't take a picture.",
    correctRow: "bottom",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteCheck_QB() {
const listening=useExerciseListening("sb_review6_page1_q2");

  const [selected,    setSelected]    = useState({});   // { 1: "top" | "bottom", ... }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,row) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:prev[id] === row ? null : row}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correctRow ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctRow; });
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

  const getBoxState = (item, row) => {
    const sel = selected[item.id];
    if (sel !== row)  return "empty";
    if (showAns)      return "correct";
    if (results[item.id] !== undefined)  return row === item.correctRow ? "correct" : "wrong";
    return "checked";
  };

  const renderCheckbox = (item, row) => {
    const state   = getBoxState(item, row);
    const checked = state !== "empty";
    const wrong   = state === "wrong";

    return (
      <div style={{...({}),borderRadius:({}).borderRadius || "7px",borderColor:selected[item.id]===row?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"):undefined,background:selected[item.id] === row && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === row ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${row === "top" ? item.topText : item.bottomText}`} aria-pressed={selected[item.id] === row} aria-disabled={showAns || results[item.id] === "correct"}
        className={[
          "lrwc-box",
          checked  ? "lrwc-box--checked" : "",
          wrong    ? "lrwc-box--wrong"   : "",
          isLocked ? "lrwc-box--locked"  : "",
        ].filter(Boolean).join(" ")}
        onClick={() => handleSelect(item.id, row)}
      >
        {checked && <span className="lrwc-checkmark">✓</span>}
        {wrong   && <div className="lrwc-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="review5&6_Review6_Page1_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review6_Page1_Q2"] input:focus-visible, [data-adapt-scope="review5&6_Review6_Page1_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review6_Page1_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2-column grid for items ── */
        .lrwc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px);
          width: 100%;
        }

        /* Single card */
        .lrwc-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
          width: 80%;

        }

        /* Image + emoji badge */
        .lrwc-img-wrap {
          position: relative;
          width: 100%;
        }

        .lrwc-img {
          width: 100%;
          height:auto;
          object-fit: cover;
          display: block;
        }

        .lrwc-emoji {
          position: absolute;
          bottom: 6px;
          right: 10px;
          font-size: clamp(18px, 2.4vw, 30px);
          line-height: 1;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.25));
          pointer-events: none;
          user-select: none;
        }

        /* Number label above image */
        .lrwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          margin-bottom: 2px;
          margin-right: 2px;

        }

        /* Rows area */
        .lrwc-rows {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 14px);
        }

        /* Single text row: text + checkbox */
        .lrwc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .lrwc-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          flex: 1;
        }

        /* Checkbox */
        .lrwc-box {
          position: relative;
          width: clamp(24px, 2.8vw, 34px);
          height: clamp(24px, 2.8vw, 34px);
          border: 2px solid ${BOX_BORDER};
          border-radius: 7px;
          background: ${BOX_BG};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: border-color 0.15s;
          user-select: none;
        }
        .lrwc-box--locked  { cursor: default; }

        .lrwc-checkmark {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${CHECK_COLOR};
          line-height: 1;
        }

        /* ✕ badge */
        .lrwc-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 17px);
          height: clamp(14px, 1.6vw, 17px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwc-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read each statement and compare it with the picture or clue, then choose the correct two-way answer." isReview sectionLetter="B" title={<>Look, read, and write ✓.</>} />

        {/* ── 2×2 Grid ── */}
        <div className="lrwc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwc-card">

              {/* Number */}
              <div className="lrwc-img-wrap"  style={{ display: "flex", flexDirection : "row", marginLeft : "-0.8em" }}>
              <span  className="lrwc-num">{item.id}</span>

              {/* Image + emoji */}
                <img src={item.src} alt={["Children building a snowman and playing in the snow, with a happy-face symbol.","A boy swimming in the sea, with a sad-face symbol.","A boy eating ice cream beside a plate of food, with a sad-face symbol.","A boy drinking at a table with sweets, with a happy-face symbol."][item.id-1]} className="lrwc-img" />
              </div>

              {/* Two text rows with checkboxes */}
              <div className="lrwc-rows">
                <div className="lrwc-row">
                  <span className="lrwc-text">{renderExerciseAudioText({audio:listening,id:`top-${item.id}`,src:({1:clipPage54B1,2:clipPage54B3,3:clipPage54B5})[item.id],label:item.topText,children:item.topText})}</span>
                  {renderCheckbox(item, "top")}
                </div>
                <div className="lrwc-row">
                  <span className="lrwc-text">{renderExerciseAudioText({audio:listening,id:`bottom-${item.id}`,src:({1:clipPage54B2,2:clipPage54B4})[item.id],label:item.bottomText,children:item.bottomText})}</span>
                  {renderCheckbox(item, "bottom")}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwc-buttons">
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