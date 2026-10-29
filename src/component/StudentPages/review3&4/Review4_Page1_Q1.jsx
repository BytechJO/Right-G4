import clipA16 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_016_c_taller.mp3";
import clipA15 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_015_b_over.mp3";
import clipA14 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_014_a_leave.mp3";
import clipA12 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_012_cleave.mp3";
import clipA11 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_011_b_picnic.mp3";
import clipA10 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_010_a_today.mp3";
import clipA8 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_008_grass.mp3";
import clipA7 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_007_b_baby.mp3";
import clipA6 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_006_a_cousin.mp3";
import clipA4 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_004_c_baby.mp3";
import clipA3 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_003_b_cousin.mp3";
import clipA2 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_002_a_picnic.mp3";
import clipA13 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_013_Jake_will_for_Australia_next_month.mp3";
import clipA9 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_009_We_are_going_ona_the_park.mp3";
import clipA5 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_005_The_is_very_green_and_lush.mp3";
import clipA1 from "../../../assets/audio/ClassBook/Unit 4/Page 36 - A/Item_001_Tim_was_very_happy_to_have_a_new_sister.mp3";
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
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const OPTION_LABEL_CLR        = "#2b2b2b";
const CIRCLE_DEFAULT          = "transparent";
const CIRCLE_SELECTED         = "#2096a6";
const CIRCLE_WRONG            = "#ef4444";
const CIRCLE_CORRECT          = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "Tim was very happy to have a new",
    after:   "sister.",
    correct: "c",
    answer:  "baby",
    options: [
      { label: "a", text: "picnic" },
      { label: "b", text: "cousin" },
      { label: "c", text: "baby" },
    ],
  },
  {
    id:      2,
    before:  "The",
    after:   "is very green and lush.",
    correct: "c",
    answer:  "grass",
    options: [
      { label: "a", text: "cousin" },
      { label: "b", text: "baby" },
      { label: "c", text: "grass" },
    ],
  },
  {
    id:      3,
    before:  "We are going on a",
    after:   "the park.",
    correct: "b",
    answer:  "picnic",
    options: [
      { label: "a", text: "today" },
      { label: "b", text: "picnic" },
      { label: "c", text: "leave" },
    ],
  },
  {
    id:      4,
    before:  "Jake will",
    after:   "for Australia next month.",
    correct: "a",
    answer:  "leave",
    options: [
      { label: "a", text: "leave" },
      { label: "b", text: "over" },
      { label: "c", text: "taller" },
    ],
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = normalizeAnswer;

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChooseWrite_QA() {
  const listening=useExerciseListening("sb_review4_page1_q1");

  const [selected,    setSelected]    = useState({});
  const [written,     setWritten]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [partResults,setPartResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>partResults[item.id+"c"] === "correct" && partResults[item.id+"w"] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,label) => {if(showAns || partResults[id+"c"] === "correct")return;setSelected(prev=>({...prev,[id]:label}));setPartResults(prev=>{const next={...prev};delete next[id+"c"];return next;});};

  const handleWrite = (id,value) => {if(showAns || partResults[id+"w"] === "correct")return;setWritten(prev=>({...prev,[id]:value}));setPartResults(prev=>{const next={...prev};delete next[id+"w"];return next;});};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] && written[item.id]?.trim())){ValidationAlert.info("Please choose and write an answer for each question.");return;}const next={};ITEMS.forEach(item=>{next[item.id+"c"]=partResults[item.id+"c"] === "correct" || selected[item.id] === item.correct ? "correct":"wrong";next[item.id+"w"]=partResults[item.id+"w"] === "correct" || normalize(written[item.id]) === normalize(item.answer) ? "correct":"wrong";});const score=Object.values(next).filter(value=>value === "correct").length;const total=ITEMS.length*2;setPartResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${total}. Correct parts are locked; incorrect parts can be changed.`);if(score === total){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${total}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${total}`);else ValidationAlert.error(`Score: ${score} / ${total}`);};

  const handleShowAnswer = () => {listening.stop();
    const filledSel = {};
    const filledWr  = {};
    ITEMS.forEach((item) => {
      filledSel[item.id] = item.correct;
      filledWr[item.id]  = item.answer;
    });
    setSelected(filledSel);
    setWritten(filledWr);
    setShowResults(false);
    setShowAns(true);setPartResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setSelected({});
    setWritten({});
    setShowResults(false);
    setShowAns(false);setPartResults({});setAnnouncement("Selections, answers and feedback cleared.");
  };

  const getOptionState = (item,label) => selected[item.id] !== label ? "idle" : showAns ? "correct" : partResults[item.id+"c"] || "selected";

  const isWriteWrong = item => !showAns && partResults[item.id+"w"] === "wrong";
  const isWriteDisabled = item => showAns || partResults[item.id+"w"] === "correct";

  return (
    <div data-listening-scope={"sb_review4_page1_q1"} data-adapt-scope="review3&4_Review4_Page1_Q1" className="main-container-component"><style>{`[data-listening-scope="sb_review4_page1_q1"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review3&4_Review4_Page1_Q1"] input:focus-visible, [data-adapt-scope="review3&4_Review4_Page1_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review4_Page1_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`

        .rcwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 34px);
          width: 100%;
        }

        .rcwa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
        }

        /* ── Sentence row ── */
        .rcwa-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rcwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcwa-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Input inline */
        .rcwa-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rcwa-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rcwa-input:disabled  { opacity: 1; cursor: default; }
        .rcwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rcwa-input-badge {
          position: absolute;
          top: -8px; right: 0;
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

        /* ── Options row ── */
        .rcwa-options {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.4vw, 18px);
          padding-left: clamp(18px, 2.2vw, 28px);
        }

        /* ── Single option: الدائرة تلف label + text معاً ── */
        .rcwa-option {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(3px, 0.4vw, 5px);
          cursor: pointer;
          user-select: none;
          /* الـ oval border */
          border: 2px solid transparent;
          border-radius: 999px;
          padding: clamp(3px, 0.4vw, 6px) clamp(10px, 1.2vw, 16px);
          transition: border-color 0.15s;
        }
        .rcwa-option--locked   { cursor: default; }

        /* States — border حول الكلمة كاملة */
        .rcwa-option--selected { border-color: ${CIRCLE_SELECTED}; }
        .rcwa-option--correct  { border-color: ${CIRCLE_CORRECT}; }
        .rcwa-option--wrong    { border-color: ${CIRCLE_WRONG}; }

        /* ✕ badge على الـ option */
        .rcwa-option-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rcwa-option-label {
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${OPTION_LABEL_CLR};
          font-weight: 600;
          line-height: 1;
        }

        .rcwa-option-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1;
        }

        .rcwa-buttons {
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
        <ExerciseHeader
          subTitle="Read the clue carefully, select the correct option first, then complete the blank before checking." isReview sectionLetter="A" title={<>Read, choose, and write.</>} />

        {/* ── Items ── */}
        <div className="rcwa-list">
          {ITEMS.map((item) => {
            const writeWrong    = isWriteWrong(item);
            const writeDisabled = isWriteDisabled(item);
            const writeValue    = written[item.id] || "";
            const writeTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const writeUColor   = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rcwa-item">

                {/* ── Sentence + inline input ── */}
                {renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipA1,clipA5,clipA9,clipA13][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"className":"rcwa-sentence",children:<>
                  <span className="rcwa-num">{item.id}</span>
                  <span className="rcwa-text">{item.before}</span>

                  <div className="rcwa-input-wrap">
                    <input {...fieldKeys} aria-label={`Question ${item.id}. ${item.before} blank ${item.after}`} title={`Question ${item.id}. ${item.before} blank ${item.after}`} placeholder="Word" aria-invalid={isWriteWrong(item)}
                      type="text"
                      className={[
                        "rcwa-input",
                        writeWrong ? "rcwa-input--wrong"  : "",
                        showAns    ? "rcwa-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={writeValue}
                      disabled={writeDisabled}
                      onChange={(e) => handleWrite(item.id, e.target.value)}
                      style={{...({ borderBottomColor: writeUColor, color: writeTColor }),borderBottomColor:isWriteDisabled(item) ? "#16a34a" : isWriteWrong(item) ? "#ef4444" : "#3f3f3f"}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {writeWrong && <div className="rcwa-input-badge">✕</div>}
                  </div>

                  <span className="rcwa-text">{item.after}</span>
                </>})}

                {/* ── Options — oval border around each option ── */}
                <div className="rcwa-options">
                  {item.options.map((opt) => {
                    const state   = getOptionState(item, opt.label);
                    const isWrong = state === "wrong";

                    return (
                      <div data-listening={`option-${item.id}-${opt.label}`} style={{...({}),borderRadius:({}).borderRadius || "6px",position:"relative",boxShadow:listening.activeId===(`option-${item.id}-${opt.label}`)?"0 0 0 3px #2563eb":selected[item.id] === opt.label ? `inset 0 0 0 2px ${showAns || partResults[item.id+"c"] === "correct" ? "#16a34a" : partResults[item.id+"c"] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined,backgroundColor:listening.activeId===(`option-${item.id}-${opt.label}`)?"#dbeafe":undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${opt.text}`} aria-pressed={selected[item.id] === opt.label} aria-disabled={showAns || partResults[item.id+"c"] === "correct"}
                        key={opt.label}
                        className={[
                          "rcwa-option",
                          state === "selected" ? "rcwa-option--selected" : "",
                          state === "correct"  ? "rcwa-option--correct"  : "",
                          state === "wrong"    ? "rcwa-option--wrong"    : "",
                          isLocked             ? "rcwa-option--locked"   : "",
                        ].filter(Boolean).join(" ")}
                        onClick={event=>{listening.play(`option-${item.id}-${opt.label}`,[clipA2,clipA3,clipA4,clipA6,clipA7,clipA8,clipA10,clipA11,clipA12,clipA14,clipA15,clipA16][(item.id-1)*3+item.options.findIndex(candidate=>candidate.label===opt.label)]);return (() => handleSelect(item.id, opt.label))(event);}}
                      >
                        <span className="rcwa-option-label">{opt.label}</span>
                        <span className="rcwa-option-text">{opt.text}</span>
                        {isWrong && <div className="rcwa-option-badge">✕</div>}
                      {listening.activeId===(`option-${item.id}-${opt.label}`)&&renderExerciseSpeaker()}</div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcwa-buttons">
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