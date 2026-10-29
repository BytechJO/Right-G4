import clipC6 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_006_We_had_a_nice_coffee_break.mp3";
import clipC4 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_004_She_had_a_white_cat.mp3";
import clipC2 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_002_They_had_a_large_swimming_pool.mp3";
import clipC5 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_005_We_had_a_nice_breakfast.mp3";
import clipC3 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_003_She_had_a_white_rabbit.mp3";
import clipC1 from "../../../assets/audio/ClassBook/Unit 4/Page 34 - C/Item_001_They_had_a_large_house.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34/SVG/Asset 4.svg";

// 🔊 AUDIO
import sound from "../../../assets/audio/ClassBook/Grade 4/cd25pg34-instruction1-adult-lady_E7S8IYrE.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

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
const CHECK_COLOR      = "#c81e1e";
const BOX_BORDER       = "#2195a6";
const BOX_BG           = "#ffffff";
const WRONG_BADGE_BG   = "#ff0000ff";
const WRONG_BADGE_TEXT = "#ffffff";
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.48,
    end: 8.70,
    text: "Page 34, review three, exercise C. Listen, read, and write check and X.",
  },
  {
    start: 8.70,
    end: 11.08,
    text: "They had a large house.",
  },
  {
    start: 12.22,
    end: 14.22,
    text: "She had a white rabbit.",
  },
  {
    start: 15.40,
    end: 17.38,
    text: "We had a nice breakfast.",
  },
  {
    start: 18.48,
    end: 20.38,
    text: "He had a colorful scooter.",
  },
];
const ITEMS = [
  {
    id:          1,
    src:         img1,
    leftText:    "They had a large house.",
    rightText:   "They had a large swimming pool.",
    correctSide: "left",
  },
  {
    id:          2,
    src:         img2,
    leftText:    "She had a white rabbit.",
    rightText:   "She had a white cat.",
    correctSide: "left",
  },
  {
    id:          3,
    src:         img3,
    leftText:    "We had a nice breakfast.",
    rightText:   "We had a nice coffee break.",
    correctSide: "left",
  },
  {
    id:          4,
    src:         img4,
    leftText:    "We had a nice party.",
    rightText:   "He had a colorful scooter.",
    correctSide: "right",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadWriteCheckCross_QC() {
  const listening=useExerciseListening("sb_review3_page1_q3");

  const [selected,    setSelected]    = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,side) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:prev[id] === side ? null : side}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

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

  const getBoxState = (item, side) => {
    const sel = selected[item.id];
    if (sel !== side) return "empty";
    if (showAns)      return "correct";
    if (results[item.id] !== undefined)  return side === item.correctSide ? "correct" : "wrong";
    return "checked";
  };

  const renderCheckbox = (item, side) => {
    const state   = getBoxState(item, side);
    const checked = state !== "empty";
    const wrong   = state === "wrong";

    return (
      <div style={{...({}),borderRadius:({}).borderRadius || "6px",background:selected[item.id] === side && !showAns && results[item.id] === undefined ? "#dbeafe" : ({}).background,boxShadow:selected[item.id] === side ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${side === "left" ? item.leftText : item.rightText}`} aria-pressed={selected[item.id] === side} aria-disabled={showAns || results[item.id] === "correct"}
        className={[
          "lrcc-box",
          checked  ? "lrcc-box--checked" : "",
          wrong    ? "lrcc-box--wrong"   : "",
          isLocked ? "lrcc-box--locked"  : "",
        ].filter(Boolean).join(" ")}
        onClick={() => handleSelect(item.id, side)}
      >
        {checked && <span className="lrcc-checkmark">✓</span>}
        {wrong   && <div className="lrcc-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-listening-scope={"sb_review3_page1_q3"} data-adapt-scope="review3&4_Review3_Page1_Q3" className="main-container-component"><style>{`[data-listening-scope="sb_review3_page1_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review3&4_Review3_Page1_Q3"] input:focus-visible, [data-adapt-scope="review3&4_Review3_Page1_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review3_Page1_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`

        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* 5-column grid: [num+text] [□] [img] [□] [text] */
        .lrcc-row {
          display: grid;
          grid-template-columns: 1fr clamp(26px,3vw,36px) clamp(90px,12vw,150px) clamp(26px,3vw,36px) 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Left cell */
        .lrcc-left {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .lrcc-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        .lrcc-left .lrcc-text { text-align: right; }

        /* Right cell */
        .lrcc-right {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .lrcc-right .lrcc-text { text-align: left; }

        /* Image */
        .lrcc-img {
          width: 100%;
          height: clamp(90px, 12vw, 150px);
          object-fit: cover;
          border-radius: 14px;
          display: block;
        }

        /* Checkbox */
        .lrcc-box {
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
          justify-self: center;
        }
        .lrcc-box--locked  { cursor: default; }

        .lrcc-checkmark {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${CHECK_COLOR};
          line-height: 1;
        }

        /* ✕ badge */
        .lrcc-badge {
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

        .lrcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrcc-row {
            grid-template-columns: 1fr clamp(22px,6vw,28px) clamp(70px,20vw,100px) clamp(22px,6vw,28px) 1fr;
            gap: 5px;
          }
          .lrcc-text { font-size: 11px; }
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
        <ExerciseHeader
          subTitle="Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer." isReview sectionLetter="C" title={<>Listen, read, and  <span style={{ color :"red"}} >✓</span>  and <span style={{ color :"red"}} >✕</span>.</>} />

        {/* ── Audio ── */}
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer pageId="sb_review3_page1_q3"
            src={sound}
            captions={captions}
            stopAtSecond={5}
          />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrcc-row">

              {/* Col 1: num + text */}
              {renderExerciseAudioGroup({"label":`Hear ${item.leftText}`,"src":[clipC1,clipC3,clipC5][item.id-1],"id":`left-${item.id}`,"audio":listening,"className":"lrcc-left",children:<>
                <span className="lrcc-num">{item.id}</span>
                <span className="lrcc-text">{item.leftText}</span>
              </>})}

              {/* Col 2: left checkbox */}
              {renderCheckbox(item, "left")}

              {/* Col 3: image */}
              <img src={item.src} alt={({[img1]:"A house with a red roof and a green door.",[img2]:"A girl holding a white rabbit.",[img3]:"A family sitting around a table eating together.",[img4]:"A boy riding a red scooter."})[item.src]} className="lrcc-img" />

              {/* Col 4: right checkbox */}
              {renderCheckbox(item, "right")}

              {/* Col 5: text */}
              {renderExerciseAudioGroup({"label":`Hear ${item.rightText}`,"src":[clipC2,clipC4,clipC6][item.id-1],"id":`right-${item.id}`,"audio":listening,"className":"lrcc-right",children:<>
                <span className="lrcc-text">{item.rightText}</span>
              </>})}

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcc-buttons">
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