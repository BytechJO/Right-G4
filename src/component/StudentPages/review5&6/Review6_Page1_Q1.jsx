import clipPage54A6 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_006_If_we_don't_hurry,_we_are_going_to_be_a_trainers_b_late.mp3";
import clipPage54A5 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_005_They_ran_today_in_class._atest.mp3";
import clipPage54A4 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_004_Remember_to_your_backpack._a_pack_b_wear.mp3";
import clipPage54A3 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_003_I_lost_my_a_school_b_keys.mp3";
import clipPage54A2 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_002_The_science_is_on_Thursday._atest_bgym.mp3";
import clipPage54A1 from "../../../assets/audio/ClassBook/Unit 6/Page 54 - A/Item_001_I_wear_to_gym_class._a_keys_b_trainers.mp3";
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
const CIRCLE_SELECTED         = "#2195a6";
const CIRCLE_WRONG            = "#ef4444";
const CIRCLE_CORRECT          = "#2195a6";
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
    before:  "I wear",
    after:   "to gym class.",
    correct: "b",
    answer:  "trainers",
    options: [
      { label: "a", text: "keys"     },
      { label: "b", text: "trainers" },
    ],
  },
  {
    id:      2,
    before:  "The science",
    after:   "is on Thursday.",
    correct: "a",
    answer:  "test",
    options: [
      { label: "a", text: "test" },
      { label: "b", text: "gym"  },
    ],
  },
  {
    id:      3,
    before:  "I lost my",
    after:   "!",
    correct: "b",
    answer:  "keys",
    options: [
      { label: "a", text: "school" },
      { label: "b", text: "keys"   },
    ],
  },
  {
    id:      4,
    before:  "Remember to",
    after:   "your backpack.",
    correct: "a",
    answer:  "pack",
    options: [
      { label: "a", text: "pack" },
      { label: "b", text: "wear" },
    ],
  },
  {
    id:      5,
    before:  "They ran today in",
    after:   "class.",
    correct: "b",
    answer:  "gym",
    options: [
      { label: "a", text: "test" },
      { label: "b", text: "gym"  },
    ],
  },
  {
    id:      6,
    before:  "If we don't hurry, we are going to be",
    after:   ".",
    correct: "b",
    answer:  "late",
    options: [
      { label: "a", text: "trainers" },
      { label: "b", text: "late"     },
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
export default function WB_ReadChooseComplete_QA() {
const listening=useExerciseListening("sb_review6_page1_q1");

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
    <div data-adapt-scope="review5&6_Review6_Page1_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review6_Page1_Q1"] input:focus-visible, [data-adapt-scope="review5&6_Review6_Page1_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review6_Page1_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Main layout: sentences left | options right ── */
        .rcca-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
          margin: 5% 0;
        }

        /* ── Left: sentences list ── */
        .rcca-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 26px);
        }

        .rcca-item {
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.3vw, 4px);
        }

        .rcca-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rcca-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcca-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        .rcca-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rcca-input {
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
        .rcca-input:disabled  { opacity: 1; cursor: default; }
        .rcca-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcca-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rcca-input-badge {
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

        /*
         * ── Right: ONE CSS grid with 2 fixed columns ──
         * All "a" options go into col 1, all "b" options go into col 2.
         * Because it's a single grid (not per-row flex), the columns share
         * the same width across every row → perfect vertical alignment.
         * Row gap matches the sentence-list gap so rows stay in sync.
         */
        .rcca-options-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: clamp(8px, 1.2vw, 16px);
          row-gap: clamp(14px, 2vw, 26px);
          flex-shrink: 0;
          align-self: start;
        }

        /* Each option pill */
        .rcca-option {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(3px, 0.4vw, 5px);
          cursor: pointer;
          user-select: none;
          border: 2px solid ${CIRCLE_DEFAULT};
          border-radius: 999px;
          padding: clamp(2px, 0.3vw, 5px) clamp(8px, 1vw, 14px);
          transition: border-color 0.15s;
          white-space: nowrap;
        }
        .rcca-option--locked   { cursor: default; }
        .rcca-option--selected { border-color: ${CIRCLE_SELECTED}; }
        .rcca-option--correct  { border-color: ${CIRCLE_CORRECT};  }
        .rcca-option--wrong    { border-color: ${CIRCLE_WRONG};    }

        .rcca-option-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rcca-option-label {
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${OPTION_LABEL_CLR};
          font-weight: 700;
          line-height: 1;
        }

        .rcca-option-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1;
        }

        .rcca-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 580px) {
          .rcca-body { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read the clue carefully, select the correct option first, then complete the blank before checking." isReview sectionLetter="A" title={<>Read, choose, and complete the sentences.</>} />

        {/* ── Body ── */}
        <div className="rcca-body">

          {/* Left: sentences */}
          <div className="rcca-list">
            {ITEMS.map((item) => {
              const writeWrong    = isWriteWrong(item);
              const writeDisabled = isWriteDisabled(item);
              const writeValue    = written[item.id] || "";
              const writeTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const writeUColor   = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

              return (
                <div key={item.id} className="rcca-item">
                  {renderExerciseAudioGroup({audio:listening,id:`question-${item.id}`,src:[clipPage54A1,clipPage54A2,clipPage54A3,clipPage54A4,clipPage54A5,clipPage54A6][item.id-1],label:`${item.id}. ${item.before} blank ${item.after}. ${item.options.map(option=>`${option.label}. ${option.text}`).join(". ")}`,className:"rcca-sentence",children:<>
                    <span className="rcca-num">{item.id}</span>
                    {item.before && <span className="rcca-text">{item.before}</span>}

                    <div className="rcca-input-wrap">
                      <input {...fieldKeys} aria-label={`Question ${item.id}. ${item.before} blank ${item.after}`} title={`Question ${item.id}. ${item.before} blank ${item.after}`} placeholder="Word" aria-invalid={isWriteWrong(item)}
                        type="text"
                        className={[
                          "rcca-input",
                          writeWrong ? "rcca-input--wrong"  : "",
                          showAns    ? "rcca-input--answer" : "",
                        ].filter(Boolean).join(" ")}
                        value={writeValue}
                        disabled={writeDisabled}
                        onChange={(e) => handleWrite(item.id, e.target.value, item.answer)}
                        style={{...({ borderBottomColor: writeUColor, color: writeTColor }),borderBottomColor:isWriteDisabled(item) ? "#16a34a" : isWriteWrong(item) ? "#ef4444" : "#3f3f3f"}}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {writeWrong && <div className="rcca-input-badge">✕</div>}
                    </div>

                    {item.after && <span className="rcca-text">{item.after}</span>}
                  </>})}
                </div>
              );
            })}
          </div>

          {/*
           * Right: single CSS grid — flattened list of ALL options.
           * Grid auto-places them: a→col1, b→col2, a→col1, b→col2 …
           * so every "b" is perfectly aligned vertically above the next "b".
           */}
          <div className="rcca-options-col">
            {ITEMS.flatMap((item) =>
              item.options.map((opt) => {
                const state   = getOptionState(item, opt.label);
                const isWrong = state === "wrong";
                return (
                  <div style={{...({}),borderRadius:({}).borderRadius || "999px",borderColor:selected[item.id]===opt.label?(showAns||partResults[item.id+"c"]==="correct"?"#16a34a":partResults[item.id+"c"]==="wrong"?"#ef4444":"#2563eb"):undefined,boxShadow:selected[item.id] === opt.label ? `inset 0 0 0 2px ${showAns || partResults[item.id+"c"] === "correct" ? "#16a34a" : partResults[item.id+"c"] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${opt.text}`} aria-pressed={selected[item.id] === opt.label} aria-disabled={showAns || partResults[item.id+"c"] === "correct"}
                    key={`${item.id}-${opt.label}`}
                    className={[
                      "rcca-option",
                      state === "selected" ? "rcca-option--selected" : "",
                      state === "correct"  ? "rcca-option--correct"  : "",
                      state === "wrong"    ? "rcca-option--wrong"    : "",
                      isLocked             ? "rcca-option--locked"   : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleSelect(item.id, opt.label)}
                  >
                    <span className="rcca-option-label">{opt.label}</span>
                    <span className="rcca-option-text">{opt.text}</span>
                    {isWrong && <div className="rcca-option-badge">✕</div>}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="rcca-buttons">
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