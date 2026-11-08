import clipPage25G9 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_009_most_intelligent.mp3";
import clipPage25G8 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_008_cutest.mp3";
import clipPage25G7 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_007_The_dolphin_is_the_smartest_animal_of_all.mp3";
import clipPage25G6 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_006_most_nervous.mp3";
import clipPage25G5 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_005_happiest.mp3";
import clipPage25G4 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_004_He_is_the_most_excited_of_all_about_the_holiday.mp3";
import clipPage25G3 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_003_most_beautiful.mp3";
import clipPage25G2 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_002_biggest.mp3";
import clipPage25G1 from "../../../assets/audio/WorkBook/Unit 4/Page 25 - G/Item_001_That_horse_is_the_smallest_of_all.mp3";
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
const LABEL_COLOR             = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    sentence: "That horse is the smallest of all.",
    words:    { a: "biggest", b: "most beautiful" },
    answers: {
      a: {
        correct: ["That horse is the biggest of all.", "That horse is the biggest of all"],
        answer:  "That horse is the biggest of all.",
      },
      b: {
        correct: ["That horse is the most beautiful of all.", "That horse is the most beautiful of all"],
        answer:  "That horse is the most beautiful of all.",
      },
    },
  },
  {
    id:       2,
    sentence: "He is the most excited of all about the holiday.",
    words:    { a: "happiest", b: "most nervous" },
    answers: {
      a: {
        correct: ["He is the happiest of all about the holiday.", "He is the happiest of all about the holiday"],
        answer:  "He is the happiest of all about the holiday.",
      },
      b: {
        correct: ["He is the most nervous of all about the holiday.", "He is the most nervous of all about the holiday"],
        answer:  "He is the most nervous of all about the holiday.",
      },
    },
  },
  {
    id:       3,
    sentence: "The dolphin is the smartest animal of all.",
    words:    { a: "cutest", b: "most intelligent" },
    answers: {
      a: {
        correct: ["The dolphin is the cutest animal of all.", "The dolphin is the cutest animal of all"],
        answer:  "The dolphin is the cutest animal of all.",
      },
      b: {
        correct: ["The dolphin is the most intelligent animal of all.", "The dolphin is the most intelligent animal of all"],
        answer:  "The dolphin is the most intelligent animal of all.",
      },
    },
  },
];

// جمع كل inputs
const ALL_INPUTS = ITEMS.flatMap((item) =>
  ["a", "b"].map((sub) => ({ key: `${item.id}-${sub}`, correct: item.answers[sub].correct }))
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteSay_QG() {
const listening=useExerciseListening("wb_unit4_page25_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>["a","b"].map(part=>({key:`${item.id}-${part}`,correct:item.answers[part].correct,answer:item.answers[part].answer,label:`Sentence ${item.id}, answer ${part}. Rewrite ${item.sentence} using ${item.words[part]}.`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      filled[`${item.id}-a`] = item.answers.a.answer;
      filled[`${item.id}-b`] = item.answers.b.answer;
    });
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

  // ── render one input line ─────────────────
  const renderInput = (key, correctArr) => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div className="rws-input-wrap">
        <input aria-invalid={results[key]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={[
            "rws-input",
            wrong   ? "rws-input--wrong"  : "",
            showAns ? "rws-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[key]==="correct"}
          onChange={(e) => handleChange(key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rws-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit4_WB_Unit4_Page25_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page25_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page25_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .rws-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 34px);
          width: 100%;
        }

        /* ── Single item ── */
        .rws-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* Original sentence row */
        .rws-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 14px);
        }

        .rws-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rws-sentence {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Word pair row: a word   b word */
        .rws-words-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          padding-left: clamp(20px, 2.4vw, 30px);
        }

        .rws-label {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
              font-weight: 700;

        }

        .rws-word {

font-size: clamp(15px, 1.9vw, 20px);

color: ${WORD_COLOR};
          flex: 1;
        }

        /* Sub-lines: a line + b line */
        .rws-sub-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          padding-left: clamp(20px, 2.4vw, 30px);
        }

        .rws-sub-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rws-sub-label {
font-size: clamp(15px, 1.9vw, 20px);

color: ${LABEL_COLOR};
          flex-shrink: 0;

          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
              font-weight: 700;

        }

        /* Input wrap */
        .rws-input-wrap {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .rws-input {
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
        .rws-input:disabled    { opacity: 1; cursor: default; }
        .rws-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rws-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rws-badge {
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
        .rws-buttons {
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
        <ExerciseHeader subTitle="Complete the written answer first, reread it, then say the finished sentence aloud." sectionLetter="G" title={<>Read and write. Say.</>} />

        {/* ── Items ── */}
        <div className="rws-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rws-item">

              {/* Original sentence */}
              {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage25G1,clipPage25G4,clipPage25G7][item.id-1],label:item.sentence,className:"rws-sentence-row",style:undefined,key:item.id,children:<>
                <span className="rws-num">{item.id}</span>
                <span className="rws-sentence">{item.sentence}</span>
              </>})}

              {/* Word pair: a ... b ... */}
              <div className="rws-words-row">
                <span className="rws-label">a</span>
                <span className="rws-word">{renderExerciseAudioText({audio:listening,id:`word-${item.id}-a`,src:[clipPage25G2,clipPage25G5,clipPage25G8][item.id-1],label:item.words.a,children:item.words.a})}</span>
                <span className="rws-label">b</span>
                <span className="rws-word">{renderExerciseAudioText({audio:listening,id:`word-${item.id}-b`,src:[clipPage25G3,clipPage25G6,clipPage25G9][item.id-1],label:item.words.b,children:item.words.b})}</span>
              </div>

              {/* Input lines: a + b */}
              <div className="rws-sub-lines">
                {["a", "b"].map((sub) => (
                  <div key={sub} className="rws-sub-line">
                    <span className="rws-sub-label">{sub}</span>
                    {renderInput(`${item.id}-${sub}`, item.answers[sub].correct)}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rws-buttons">
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