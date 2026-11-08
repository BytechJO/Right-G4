import clipPage21A12 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_012_When_I_went_fishing_with_my_grandpa_and_my_dad,_I_was_the_oldest.mp3";
import clipPage21A11 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_011_I_was_angry_when_I_caught_my_first_fish.mp3";
import clipPage21A10 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_010_We_made_sandwiches_for_the_baby.mp3";
import clipPage21A9 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_009_Hansel_is_taller_than_Tom.mp3";
import clipPage21A8 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_008_The_time_was_very_late,_so_I_wanted_to_picnic.mp3";
import clipPage21A7 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_007_He's_my_aunt's_son._He's_my_shorter.mp3";
import clipPage21A6 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_006_cousin.mp3";
import clipPage21A5 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_005_picnic.mp3";
import clipPage21A4 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_004_leave.mp3";
import clipPage21A3 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_003_shorter.mp3";
import clipPage21A2 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_002_glad.mp3";
import clipPage21A1 from "../../../assets/audio/WorkBook/Unit 4/Page 21 - A/Item_001_youngest.mp3";
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
const SENTENCE_COLOR          = "#2b2b2b";
const UNDERLINE_WORD_COLOR    = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// كلمات البنك — cousin مشطوبة (مثال)
const WORD_BANK = [
  { word: "picnic",   strikethrough: false },
  { word: "glad",     strikethrough: false },
  { word: "cousin",   strikethrough: false  }, // المثال
  { word: "shorter",  strikethrough: false },
  { word: "youngest", strikethrough: false },
  { word: "leave",    strikethrough: false },
];

// الجمل — كل جملة فيها:
// sentence: النص الأصلي
// underlinedWord: الكلمة المسطرة بالجملة
// correct: مصفوفة إجابات مقبولة
// answer: الإجابة الرسمية
const ITEMS = [
  {
    id:      1,
    sentence:      "He's my aunt's son. He's my",
    underlinedWord: "shorter",
    sentenceEnd:   ".",
    correct: [
      "He's my aunt's son. He's my cousin.",
      "Hes my aunts son Hes my cousin",
    ],
    answer: "He's my aunt's son. He's my cousin.",
  },
  {
    id:      2,
    sentence:      "The time was very late, so I wanted to",
    underlinedWord: "picnic",
    sentenceEnd:   ".",
    correct: [
      "The time was very late, so I wanted to leave.",
      "The time was very late so I wanted to leave",
    ],
    answer: "The time was very late, so I wanted to leave.",
  },
  {
    id:      3,
    sentence:      "Hansel is",
    underlinedWord: "taller",
    sentenceEnd:   "than Tom.",
    correct: [
      "Hansel is shorter than Tom.",
      "Hansel is shorter than Tom",
    ],
    answer: "Hansel is shorter than Tom.",
  },
  {
    id:      4,
    sentence:      "We made sandwiches for the",
    underlinedWord: "baby",
    sentenceEnd:   ".",
    correct: [
      "We made sandwiches for the picnic.",
      "We made sandwiches for the picnic",
    ],
    answer: "We made sandwiches for the picnic.",
  },
  {
    id:      5,
    sentence:      "I was",
    underlinedWord: "angry",
    sentenceEnd:   "when I caught my first fish.",
    correct: [
      "I was glad when I caught my first fish.",
      "I was glad when I caught my first fish",
    ],
    answer: "I was glad when I caught my first fish.",
  },
  {
    id:      6,
    sentence:      "When I went fishing with my grandpa and my dad, I was the",
    underlinedWord: "oldest",
    sentenceEnd:   ".",
    correct: [
      "When I went fishing with my grandpa and my dad, I was the youngest.",
      "When I went fishing with my grandpa and my dad I was the youngest",
    ],
    answer: "When I went fishing with my grandpa and my dad, I was the youngest.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChangeRewrite_QA() {
const listening=useExerciseListening("wb_unit4_page21_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Sentence ${item.id}. Rewrite ${item.sentence} ${item.underlinedWord} ${item.sentenceEnd} with the correct word from the bank.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit4_WB_Unit4_Page21_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page21_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page21_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .rcr-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
    justify-content: space-around;        }

        .rcr-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* مشطوبة — cousin مثال */
        .rcr-bank-word--strike {
          text-decoration: line-through;
          color: #9e9e9e;
          border-color: #9e9e9e;
        }

        /* ── Items list ── */
        .rcr-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single item ── */
        .rcr-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 12px);
        }

        /* Original sentence row */
        .rcr-orig-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
        }

        .rcr-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rcr-sentence-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Underlined word in original sentence */
        .rcr-underlined {
          text-decoration: underline;
          color: ${UNDERLINE_WORD_COLOR};
        }

        /* Answer input wrap */
        .rcr-input-wrap {
          position: relative;
          padding-left: clamp(20px, 2.4vw, 30px); /* indent لمحاذاة الجملة */
        }

        .rcr-input {
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
        .rcr-input:disabled    { opacity: 1; cursor: default; }
        .rcr-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcr-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rcr-badge {
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
        .rcr-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="A" title={<>Read, change, and rewrite.</>} />

        {/* ── Word bank ── */}
        <div className="rcr-bank">
          {WORD_BANK.map((w) => (
            <div
              key={w.word}
              className={`rcr-bank-word ${w.strikethrough ? "rcr-bank-word--strike" : ""}`}
            >
              {renderExerciseAudioText({audio:listening,id:`bank-${w.word}`,src:({youngest:clipPage21A1,glad:clipPage21A2,shorter:clipPage21A3,leave:clipPage21A4,picnic:clipPage21A5,cousin:clipPage21A6})[w.word],label:w.word,children:w.word})}
            </div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rcr-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            return (
              <div key={item.id} className="rcr-item">

                {/* Original sentence */}
                {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage21A7,clipPage21A8,clipPage21A9,clipPage21A10,clipPage21A11,clipPage21A12][item.id-1],label:item.sentence+" "+item.underlinedWord+" "+item.sentenceEnd,className:"rcr-orig-row",style:undefined,key:item.id,children:<>
                  <span className="rcr-num">{item.id}</span>
                  <span className="rcr-sentence-text">
                    {item.sentence}{" "}
                    <span className="rcr-underlined">{item.underlinedWord}</span>
                    {item.sentenceEnd && <span>{" "}{item.sentenceEnd}</span>}
                  </span>
                </>})}

                {/* Rewrite input */}
                <div className="rcr-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rcr-input",
                      wrong   ? "rcr-input--wrong"  : "",
                      showAns ? "rcr-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rcr-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcr-buttons">
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