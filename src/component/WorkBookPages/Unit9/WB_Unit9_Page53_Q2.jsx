import clipPage53F12 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_012_circus.mp3";
import clipPage53F11 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_011_park.mp3";
import clipPage53F10 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_010_mall.mp3";
import clipPage53F9 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_009_zoo.mp3";
import clipPage53F8 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_008_the.mp3";
import clipPage53F7 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_007_do.mp3";
import clipPage53F6 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_006_to.mp3";
import clipPage53F5 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_005_you.mp3";
import clipPage53F4 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_004_cave.mp3";
import clipPage53F3 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_003_Why.mp3";
import clipPage53F2 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_002_go.mp3";
import clipPage53F1 from "../../../assets/audio/WorkBook/Unit 9/Page 53 - F/Item_001_want.mp3";
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
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#ef4444";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const WORD_COLOR         = "#2b2b2b";
const NUMBER_COLOR       = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل sentence فيها words مرتبة بشكل مبعثر
//  كل word فيها: word + correctNum (الرقم الصحيح في الجملة)
// ─────────────────────────────────────────────
const SENTENCES = [
  {
    id: 1,
    words: [
      { word: "want", correct: "4" },
      { word: "go",   correct: "6" },
      { word: "Why",  correct: "1" },
      { word: "cave", correct: "9" },
      { word: "you",  correct: "3" },
      { word: "to",   correct: "5" },
      { word: "do",   correct: "2" },
      { word: "to",   correct: "7" },
      { word: "the",  correct: "8" },
    ],
  },
  {
    id: 2,
    words: [
      { word: "you",  correct: "3" },
      { word: "to",   correct: "7" },
      { word: "zoo",  correct: "9" },
      { word: "the",  correct: "8" },
      { word: "go",   correct: "6" },
      { word: "Why",  correct: "1" },
      { word: "do",   correct: "2" },
      { word: "want", correct: "4" },
      { word: "to",   correct: "5" },
    ],
  },
  {
    id: 3,
    words: [
      { word: "do",   correct: "2" },
      { word: "the",  correct: "8" },
      { word: "you",  correct: "3" },
      { word: "to",   correct: "7" },
      { word: "mall", correct: "9" },
      { word: "want", correct: "4" },
      { word: "go",   correct: "6" },
      { word: "to",   correct: "5" },
      { word: "Why",  correct: "1" },
    ],
  },
  {
    id: 4,
    words: [
      { word: "go",   correct: "6" },
      { word: "want", correct: "4" },
      { word: "park", correct: "9" },
      { word: "to",   correct: "5" },
      { word: "to",   correct: "7" },
      { word: "the",  correct: "8" },
      { word: "Why",  correct: "1" },
      { word: "do",   correct: "2" },
      { word: "you",  correct: "3" },
    ],
  },
  {
    id: 5,
    words: [
      { word: "circus", correct: "9" },
      { word: "go",     correct: "6" },
      { word: "the",    correct: "8" },
      { word: "you",    correct: "3" },
      { word: "Why",    correct: "1" },
      { word: "don't",  correct: "2" },
      { word: "to",     correct: "7" },
      { word: "want",   correct: "4" },
      { word: "to",     correct: "5" },
    ],
  },
];

// بناء ALL_INPUTS من كل جملة
const ALL_INPUTS = SENTENCES.flatMap((s) =>
  s.words.map((w, wi) => ({ key: `${s.id}-${wi}`, correct: [w.correct], answer: w.correct }))
);

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumberOrder_QF() {
const listening=useExerciseListening("wb_unit9_page53_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=SENTENCES.flatMap(sentence=>sentence.words.map((word,index)=>({key:sentence.id+"-"+index,correct:[word.correct],answer:word.correct,label:"Sentence "+sentence.id+", position of word "+(index+1)+": "+word.word})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;if(value!==""&&!/^[1-9]$/.test(value))return;const group=ALL_INPUTS.filter(target=>target.key.split("-")[0]===key.split("-")[0]);if(value&&group.some(target=>target.key!==key&&answers[target.key]===value)){setAnnouncement("That number is already used in this sentence. Clear or change it first.");return;}setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value){const targets=ALL_INPUTS,index=targets.findIndex(target=>target.key===key),next=targets.slice(index+1).find(target=>results[target.key]!=="correct");if(next)inputRefs.current[next.key]?.focus({preventScroll:true});}};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
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
    <div data-adapt-scope="Unit9_WB_Unit9_Page53_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit9_WB_Unit9_Page53_Q2"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page53_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Sentences list ── */
        .rno-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
          width: 100%;
        }

        /* ── Single sentence ── */
        .rno-sentence {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Sentence number */
        .rno-sentence-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Words row */
        .rno-words-row {
          display: flex;
    justify-content: space-around;

          flex-wrap: wrap;
          gap: clamp(6px, 0.9vw, 12px);
        }

        /* Single word cell: word text + box below */
        .rno-word-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(3px, 0.4vw, 5px);
        }

        .rno-word {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${WORD_COLOR};
          line-height: 1.3;
          white-space: nowrap;
        }

        /* Input box wrap */
        .rno-input-wrap {
          position: relative;
        }

        .rno-input {
          width: clamp(30px, 3.8vw, 44px);
          height: clamp(30px, 3.8vw, 44px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 6px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .rno-input:disabled   { opacity: 1; cursor: default; }
        .rno-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .rno-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rno-badge {
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

        /* Question mark at end */
        .rno-qmark {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${WORD_COLOR};
          align-self: flex-end;
          padding-bottom: clamp(4px, 0.5vw, 7px);
        }

        /* Buttons */
        .rno-buttons {
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
        <ExerciseHeader subTitle="Read the whole question first, then number the words from 1 onward to build the correct sentence." sectionLetter="F" title={<>Read and number in sentence order.</>} />

        {/* ── Sentences ── */}
        <div className="rno-list">
          {SENTENCES.map((s) => (
            <div key={s.id} className="rno-sentence">

              {/* Sentence number */}
              <span className="rno-sentence-num">{s.id}</span>

              {/* Words + boxes */}
              <div className="rno-words-row">
                {s.words.map((w, wi) => {
                  const key      = `${s.id}-${wi}`;
                  const wrong    = isWrong(key, [w.correct]);
                  const value    = answers[key] || "";
                  const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
                  const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
                  

                  return (
                    <div key={key} className="rno-word-cell">
                      <span className="rno-word">{renderExerciseAudioText({audio:listening,id:`word-${s.id}-${wi}`,src:(["want","go","Why","cave","you","to","do","the","zoo","mall","park","circus"].indexOf(w.word)>=0?[clipPage53F1,clipPage53F2,clipPage53F3,clipPage53F4,clipPage53F5,clipPage53F6,clipPage53F7,clipPage53F8,clipPage53F9,clipPage53F10,clipPage53F11,clipPage53F12][["want","go","Why","cave","you","to","do","the","zoo","mall","park","circus"].indexOf(w.word)]:null),label:w.word,children:w.word})}</span>
                      <div className="rno-input-wrap">
                        <input inputMode="numeric" aria-invalid={results[key]==="wrong"}  title={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} {...fieldKeys}
                          ref={(el) => (inputRefs.current[key] = el)}
                          type="text"
                          maxLength={1}
                          className={[
                            "rno-input",
                            wrong   ? "rno-input--wrong"  : "",
                            showAns ? "rno-input--answer" : "",
                          ].filter(Boolean).join(" ")}
                          value={value}
                          disabled={showAns||results[key]==="correct"}
                          onChange={(e) => handleChange(key, e.target.value)}
                          style={{...((base=>({...base,borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderColor: bColor, color: tColor })),borderColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":undefined}}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {wrong && <div className="rno-badge">✕</div>}
                      </div>
                    </div>
                  );
                })}
                <span className="rno-qmark">?</span>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rno-buttons">
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