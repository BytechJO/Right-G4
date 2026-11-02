import clipPage22D16 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_016_the_opposite_of_shorter.mp3";
import clipPage22D15 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_015_it's_green_and_found_in_a_garden.mp3";
import clipPage22D14 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_014_the_opposite_of_remembered.mp3";
import clipPage22D13 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_013_the_day_between_yesterday_and_tomorrow.mp3";
import clipPage22D12 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_012_the_child_of_your_uncle_aunt.mp3";
import clipPage22D11 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_011_to_go_away.mp3";
import clipPage22D10 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_010_happy,_joyful.mp3";
import clipPage22D9 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_009_a_very_young_child.mp3";
import clipPage22D8 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_008_today.mp3";
import clipPage22D7 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_007_grass.mp3";
import clipPage22D6 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_006_baby.mp3";
import clipPage22D5 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_005_leave.mp3";
import clipPage22D4 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_004_cousin.mp3";
import clipPage22D3 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_003_forgot.mp3";
import clipPage22D2 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_002_taller.mp3";
import clipPage22D1 from "../../../assets/audio/WorkBook/Unit 4/Page 22 - D/Item_001_glad.mp3";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const CLUE_TEXT_COLOR         = "#2b2b2b";
const BOX_BORDER_COLOR        = "#2096a6";
const BOX_TEXT_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الكلمات في الصندوق — 4 أعمدة × 2 صفوف
const WORD_BOX = [
  ["cousin", "glad",  "taller", "forgot"],
  ["leave",  "baby",  "grass",  "today" ],
];

// التعريفات + الإجابات
const ITEMS = [
  {
    id:      1,
    clue:    "a very young child",
    correct: ["baby"],
    answer:  "baby",
  },
  {
    id:      2,
    clue:    "happy, joyful",
    correct: ["glad"],
    answer:  "glad",
  },
  {
    id:      3,
    clue:    "to go away",
    correct: ["leave"],
    answer:  "leave",
  },
  {
    id:      4,
    clue:    "the child of your uncle/aunt",
    correct: ["cousin"],
    answer:  "cousin",
  },
  {
    id:      5,
    clue:    "the day between yesterday and tomorrow",
    correct: ["today"],
    answer:  "today",
  },
  {
    id:      6,
    clue:    "the opposite of remembered",
    correct: ["forgot"],
    answer:  "forgot",
  },
  {
    id:      7,
    clue:    "it's green and found in a garden",
    correct: ["grass"],
    answer:  "grass",
  },
  {
    id:      8,
    clue:    "the opposite of shorter",
    correct: ["taller"],
    answer:  "taller",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_SolveWrite_QD() {
const listening=useExerciseListening("wb_unit4_page22_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Definition ${item.id}. ${item.clue} Use a word from the bank.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit4_WB_Unit4_Page22_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page22_Q2"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page22_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word box ── */
.sw-box {
  border: 2px solid ${BOX_BORDER_COLOR};
  border-radius: 15px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(8px, 0.6vw, 16px) clamp(24px, 2vw, 56px);
  justify-items: center;  /* ← هاد */
}

.sw-box-word {
font-size: clamp(15px, 1.9vw, 20px);
  color: ${BOX_TEXT_COLOR};
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;  /* ← وهاد */
}

        /* ── Items list ── */
        .sw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(15px, 1.6vw, 15px);
          width: 100%;
        }

        /* ── Single row: num | clue | input ── */
        .sw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .sw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        .sw-clue {
    font-size: clamp(15px, 1.9vw, 18px);
              color: ${CLUE_TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .sw-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(80px, 10vw, 160px);
        }

        .sw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .sw-input:disabled    { opacity: 1; cursor: default; }
        .sw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .sw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .sw-badge {
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
        .sw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
          .div-forall {
  gap: 15px !important;
}

        @media (max-width: 560px) {
          .sw-box { grid-template-columns: repeat(2, 1fr); }
          .sw-clue { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="D" title={<>Solve and write.</>} />

        {/* ── Word box ── */}
        <div className="sw-box">
          {WORD_BOX.map((row, ri) =>
            row.map((word, ci) => (
              <span key={`${ri}-${ci}`} className="sw-box-word">{renderExerciseAudioText({audio:listening,id:`bank-${ri}-${ci}`,src:({glad:clipPage22D1,taller:clipPage22D2,forgot:clipPage22D3,cousin:clipPage22D4,leave:clipPage22D5,baby:clipPage22D6,grass:clipPage22D7,today:clipPage22D8})[word],label:word,children:word})}</span>
            ))
          )}
        </div>

        {/* ── Items ── */}
        <div className="sw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              renderExerciseAudioGroup({audio:listening,id:`definition-${item.id}`,src:[clipPage22D9,clipPage22D10,clipPage22D11,clipPage22D12,clipPage22D13,clipPage22D14,clipPage22D15,clipPage22D16][item.id-1],label:item.clue,className:"sw-row",style:undefined,key:item.id,children:<>

                <span className="sw-num">{item.id}</span>
                <span className="sw-clue">{item.clue}</span>

                <div className="sw-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Word" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "sw-input",
                      wrong   ? "sw-input--wrong"  : "",
                      showAns ? "sw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="sw-badge">✕</div>}
                </div>

              </>})
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="sw-buttons">
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