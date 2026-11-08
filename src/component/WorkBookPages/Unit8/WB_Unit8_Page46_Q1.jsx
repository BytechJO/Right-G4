import clipPage46C3 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - C/Item_003_They_played_volleyball.mp3";
import clipPage46C2 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - C/Item_002_We_went_to_the_science_museum.mp3";
import clipPage46C1 from "../../../assets/audio/WorkBook/Unit 8/Page 46 - C/Item_001_I_looked_at_the_books_in_the_library.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 19.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 25.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/Asset 66.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/Asset 67.svg";
import img3a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 26.svg";
import img3b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 46/SVG/Asset 24.svg";
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

function renderExerciseAudioGroup({
  audio,
  id,
  src,
  label,
  children,
  style,
  key: renderKey,
  ...props
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return <div key={renderKey} {...props} style={style}>{children}</div>;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <div key={renderKey} {...props} role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={id} aria-label={label} onKeyDown={keys} onKeyUp={keys} onClick={event => {
    if (event.target.closest('input,select,textarea,button,[role="button"]')) return;
    event.stopPropagation();
    audio.play(id, src);
  }} style={{
    ...style,
    position: style?.position || "relative",
    borderRadius: style?.borderRadius || 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
    backgroundColor: playing ? "#dbeafe" : style?.backgroundColor
  }}>{children}{playing && renderExerciseSpeaker()}</div>;
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
const CHECK_COLOR      = "#e53935";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:          1,
    sentence:    "I looked at the books in the library.",
    imgA:        img1a,
    imgB:        img1b,
    correctSide: "a",
  },
  {
    id:          2,
    sentence:    "We went to the science museum.",
    imgA:        img2a,
    imgB:        img2b,
    correctSide: "a",
  },
  {
    id:          3,
    sentence:    "They played volleyball.",
    imgA:        img3a,
    imgB:        img3b,
    correctSide: "b",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChoosePicture_QC() {
const listening=useExerciseListening("wb_unit8_page46_q1");

  const [selected,    setSelected]    = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId,side) => {if(showAns || results[itemId] === "correct")return;setSelected(prev=>({...prev,[itemId]:prev[itemId] === side ? null : side}));setResults(prev=>{const next={...prev};delete next[itemId];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correctSide ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correctSide; });
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

  const getBoxState=(item,side)=>{if(selected[item.id]!==side)return "none";if(showAns||results[item.id]==="correct")return "correct";return results[item.id]==="wrong"?"wrong":"selected";};

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page46_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page46_Q1"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page46_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rcp-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        .rcp-row {
          display: grid;
          grid-template-columns: auto clamp(110px, 16vw, 200px) 1fr clamp(110px, 16vw, 200px);
          gap: clamp(10px, 1.6vw, 20px);
          align-items: center;
        }

        .rcp-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        .rcp-img-wrap {
          position: relative;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .rcp-img-wrap--locked { cursor: default; }

        .rcp-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        .rcp-checkbox {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          border-top: 2px solid #2096a6;
          border-bottom: 2px solid #2096a6;
          border-left: 2px solid #2096a6;
          border-right: 2px solid #2096a6;
          border-radius: 0px 10px 0px 4px;
          background: #ffffff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          outline: none;
          cursor: text;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .rcp-checkbox--selected { color: ${CHECK_COLOR}; }
        .rcp-checkbox--correct  { ; color: ${CHECK_COLOR}; }
        .rcp-checkbox--wrong    {  color: ${WRONG_BADGE_BG}; }

        /* ✕ badge — top right of checkbox */
        .rcp-wrong-badge {
          position: absolute;
          top: 25px;
          right: 25px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 1000;
        }

        .rcp-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
          text-align: center;
        }

        .rcp-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 540px) {
          .rcp-row {
            grid-template-columns: auto 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .rcp-sentence { grid-column: 1 / -1; }
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
        <ExerciseHeader subTitle="Read the clue carefully, then select the option that best matches the word, picture, or sentence." sectionLetter="C" title={<>Read and choose ✓ the correct picture.</>} />

        {/* ── Items ── */}
        <div className="rcp-list">
          {ITEMS.map((item) => {
            const stateA = getBoxState(item, "a");
            const stateB = getBoxState(item, "b");

            const getCheckmark = (state) => {
              if (state === "none")  return null;
              if (state === "wrong") return "✕";
              return "✓";
            };

            return (
              <div key={item.id} className="rcp-row">

                {/* Number */}
                <span className="rcp-num">{item.id}</span>

                {/* Image A */}
                <div style={{...({...({}),borderRadius:({}).borderRadius || "6px",background:selected[item.id] === "a" && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === "a" ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),boxShadow:selected[item.id]==="a"?`0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"}`:undefined,cursor:showAns||results[item.id]==="correct"?"default":"pointer"}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Sentence ${item.id}. ${item.sentence} Choose picture A: ${["A boy looking at library bookshelves.","Children outside a museum.","Children playing baseball."][item.id-1]}`}  aria-pressed={selected[item.id] === "a"} aria-disabled={showAns || results[item.id] === "correct"}
                  className={`rcp-img-wrap${isLocked ? " rcp-img-wrap--locked" : ""}`}
                  onClick={() => handleSelect(item.id, "a")}
                >
                  <img src={item.imgA} alt={["A boy looking at library bookshelves.","Children outside a museum.","Children playing baseball."][item.id-1]} className="rcp-img" />
                  <div className={[
                    "rcp-checkbox",
                    stateA === "selected" ? "rcp-checkbox--selected" : "",
                    stateA === "correct"  ? "rcp-checkbox--correct"  : "",
                    stateA === "wrong"    ? "rcp-checkbox--wrong"    : "",
                  ].filter(Boolean).join(" ")}>
                    {getCheckmark(stateA)}
                    {stateA === "wrong" && <div className="rcp-wrong-badge">✕</div>}
                  </div>
                </div>

                {/* Sentence */}
                {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage46C1,clipPage46C2,clipPage46C3][item.id-1],label:item.sentence,className:"rcp-sentence",style:undefined,key:item.id,children:<>{item.sentence}</>})}

                {/* Image B */}
                <div style={{...({...({}),borderRadius:({}).borderRadius || "6px",background:selected[item.id] === "b" && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === "b" ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}),boxShadow:selected[item.id]==="b"?`0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"}`:undefined,cursor:showAns||results[item.id]==="correct"?"default":"pointer"}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Sentence ${item.id}. ${item.sentence} Choose picture B: ${["A boy in a grocery store.","Children outside a cinema.","Children playing volleyball."][item.id-1]}`}  aria-pressed={selected[item.id] === "b"} aria-disabled={showAns || results[item.id] === "correct"}
                  className={`rcp-img-wrap${isLocked ? " rcp-img-wrap--locked" : ""}`}
                  onClick={() => handleSelect(item.id, "b")}
                >
                  <img src={item.imgB} alt={["A boy in a grocery store.","Children outside a cinema.","Children playing volleyball."][item.id-1]} className="rcp-img" />
                  <div className={[
                    "rcp-checkbox",
                    stateB === "selected" ? "rcp-checkbox--selected" : "",
                    stateB === "correct"  ? "rcp-checkbox--correct"  : "",
                    stateB === "wrong"    ? "rcp-checkbox--wrong"    : "",
                  ].filter(Boolean).join(" ")}>
                    {getCheckmark(stateB)}
                    {stateB === "wrong" && <div className="rcp-wrong-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcp-buttons">
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