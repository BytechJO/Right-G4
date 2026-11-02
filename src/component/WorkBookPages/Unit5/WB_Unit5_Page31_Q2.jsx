import clipPage31J6 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_006_into.mp3";
import clipPage31J5 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_005_under.mp3";
import clipPage31J4 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_004_above.mp3";
import clipPage31J3 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_003_through.mp3";
import clipPage31J2 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_002_down.mp3";
import clipPage31J1 from "../../../assets/audio/WorkBook/Unit 5/Page 31 - J/Item_001_up.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — a through f
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 37.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 38.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 39.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 40.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 41.svg";
import imgF from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 31/SVG/Asset 42.svg";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_COLOR              = "#2b2b2b";
const IMG_LABEL_BG            = "#ffffff";
const IMG_LABEL_BORDER        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORDS = [
  { id: 1, word: "up",      correct: ["b", "B"], answer: "b" },
  { id: 2, word: "down",    correct: ["c", "C"], answer: "c" },
  { id: 3, word: "through", correct: ["a", "A"], answer: "a" },
  { id: 4, word: "above",   correct: ["f", "F"], answer: "f" },
  { id: 5, word: "under",   correct: ["d", "D"], answer: "d" },
  { id: 6, word: "into",    correct: ["e", "E"], answer: "e" },
];

const IMAGES = [
  { label: "a", src: imgA },
  { label: "b", src: imgB },
  { label: "c", src: imgC },
  { label: "d", src: imgD },
  { label: "e", src: imgE },
  { label: "f", src: imgF },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QJ() {
const listening=useExerciseListening("wb_unit5_page31_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=WORDS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Word ${item.id}, ${item.word}. Write the matching picture letter a to f.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    WORDS.forEach((w) => { filled[w.id] = w.answer; });
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
    <div data-adapt-scope="Unit5_WB_Unit5_Page31_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page31_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page31_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page31_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page31_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlm-layout {
          display: grid;
          grid-template-columns: clamp(160px, 22vw, 280px) 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
        }

        .rlm-words {
          display: flex;
          flex-direction: column;
          gap: inherit;
        }

        .rlm-word-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 12px);

        }

        .rlm-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rlm-input {
          width: clamp(100px, 4.5vw, 100px);
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rlm-input:disabled  { opacity: 1; cursor: default; }
        .rlm-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlm-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        .rlm-badge {
          position: absolute;
          top: -8px; right: -6px;
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
          z-index: 2;
        }

        .rlm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rlm-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${WORD_COLOR};
          line-height: 1;
        }

        /* Images grid — aspect-ratio يضمن تساوي الارتفاعات */
        .rlm-images {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(8px, 1.2vw, 16px);
          align-items: start;
        }

        .rlm-img-card {
          position: relative;
          overflow: hidden;
        }

        .rlm-img {
          width: 100%;
              height: auto;

          display: block;
        }

        .rlm-img-label {
          position: absolute;
          top: 4px; right: 4px;
          width: clamp(20px, 2.4vw, 28px);
          height: clamp(20px, 2.4vw, 28px);
          border-radius: 5px;
          background: ${IMG_LABEL_BG};
          border: 1.5px solid ${IMG_LABEL_BORDER};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 700;
          color: ${IMG_LABEL_BORDER};
          line-height: 1;
          user-select: none;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlm-layout { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Start with one item, then connect it to the word, picture, or sentence that matches before moving on." sectionLetter="J" title={<>Read, look, and match.</>} />

        <div className="rlm-layout">

          {/* Words */}
          <div className="rlm-words">
            {WORDS.map((w) => {
              const wrong    = isWrong(w);
              const value    = answers[w.id] || "";
              const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              

              return (
                <div key={w.id} className="rlm-word-row">
                  <div className="rlm-input-wrap">
                    <input aria-invalid={results[w.id]==="wrong"} placeholder="Letter" title={answerTargets.find(t=>t.key===w.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===w.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      maxLength={1}
                      className={["rlm-input", wrong ? "rlm-input--wrong" : "", showAns ? "rlm-input--answer" : ""].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[w.id]==="correct"}
                      onChange={(e) => handleChange(w.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[w.id]==="correct"?"#16a34a":results[w.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rlm-badge">✕</div>}
                  </div>
                  <span className="rlm-num">{w.id}</span>
                  <span className="rlm-word">{renderExerciseAudioText({audio:listening,id:`word-${w.id}`,src:[clipPage31J1,clipPage31J2,clipPage31J3,clipPage31J4,clipPage31J5,clipPage31J6][w.id-1],label:w.word,children:w.word})}</span>
                </div>
              );
            })}
          </div>

          {/* Images 3×2 */}
          <div className="rlm-images">
            {IMAGES.map((img) => (
              <div key={img.label} className="rlm-img-card">
                <img src={img.src} alt={["A squirrel passing through a hole in a tree.","A squirrel climbing up a tree.","A squirrel climbing down a tree.","A frog swimming underwater.","A frog diving into water.","A frog jumping above water."][IMAGES.indexOf(img)]} className="rlm-img" />
              </div>
            ))}
          </div>

        </div>

        <div className="rlm-buttons">
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