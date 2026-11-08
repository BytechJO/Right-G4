import clipPage39A8 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_008_stumbled.mp3";
import clipPage39A7 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_007_rock.mp3";
import clipPage39A6 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_006_pond.mp3";
import clipPage39A5 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_005_chasing.mp3";
import clipPage39A4 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_004_frogs.mp3";
import clipPage39A3 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_003_song.mp3";
import clipPage39A2 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_002_dream.mp3";
import clipPage39A1 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - A/Item_001_alligator.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 11.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 12.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 13.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 14.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 18.svg";
import imgF from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 17.svg";
import imgG from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 16.svg";
import imgH from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 15.svg";
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
const BOX_BORDER_DEFAULT  = "#2096a6";
const BOX_BORDER_WRONG    = "#ef4444";
const BOX_TEXT_DEFAULT    = "#2b2b2b";
const BOX_TEXT_ANSWER     = "#c81e1e";
const IMG_LABEL_BG        = "#2096a6";
const IMG_LABEL_TEXT      = "#ffffff";
const WORD_COLOR          = "#2b2b2b";
const NUMBER_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// 8 صور بترتيب a-h
const IMAGES = [
  { label: "a", src: imgA },
  { label: "b", src: imgB },
  { label: "c", src: imgC },
  { label: "d", src: imgD },
  { label: "e", src: imgE },
  { label: "f", src: imgF },
  { label: "g", src: imgG },
  { label: "h", src: imgH },
];

// 8 كلمات مع الإجابة الصحيحة (حرف الصورة)
const WORDS = [
  { id: 1, word: "alligator", correct: ["c", "C"], answer: "c" },
  { id: 2, word: "dream",     correct: ["h", "H"], answer: "h" },
  { id: 3, word: "song",      correct: ["e", "E"], answer: "e" },
  { id: 4, word: "frogs",     correct: ["b", "B"], answer: "b" },
  { id: 5, word: "chasing",   correct: ["f", "F"], answer: "f" },
  { id: 6, word: "pond",      correct: ["a", "A"], answer: "a" },
  { id: 7, word: "rock",      correct: ["d", "D"], answer: "d" },
  { id: 8, word: "stumbled",  correct: ["g", "G"], answer: "g" },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QA() {
const listening=useExerciseListening("wb_unit7_page39_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=WORDS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Word ${item.id}, ${item.word}. Write its matching picture letter.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  // ref لكل input بالترتيب
  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct"||value.length>1)return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value.length===1){const at=WORDS.findIndex(item=>item.id===key),next=WORDS.slice(at+1).find(item=>results[item.id]!=="correct");if(next)inputRefs.current[next.id]?.focus({preventScroll:true});}};

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
    <div data-adapt-scope="Unit7_WB_Unit7_Page39_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page39_Q1"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Images grid 4×2 ── */
        .lrwa-img-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single image card ── */
        .lrwa-img-card {
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lrwa-img {
          width: 100%;
          height: auto;
          display: block;
          position: relative;

        }
  
        /* Label badge — bottom center */
        .lrwa-img-label {
            position: absolute;

          margin-top: 85%;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid ${IMG_LABEL_BG};
          color: #2b2b2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(12px, 1.4vw, 20px);
          font-weight: bold;
          user-select: none;
          flex-shrink: 0;
        }

        /* ── Words grid 4×2 ── */
        .lrwa-word-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 18px) clamp(12px, 2vw, 24px);
          width: 100%;
        }

        /* ── Single word row: input + num + word ── */
        .lrwa-word-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 10px);
        }

        /* Input wrap */
        .lrwa-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrwa-input {
          width: clamp(40px, 3.4vw, 40px);
          height: clamp(40px, 3.4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 6px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .lrwa-input:disabled      { opacity: 1; cursor: default; }
        .lrwa-input--wrong        { border-color: ${BOX_BORDER_WRONG}; }
        .lrwa-input--answer       { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .lrwa-badge {
          position: absolute;
          top: -8px; right: -8px;
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

        .lrwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
        }

        .lrwa-word {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${WORD_COLOR};
        }

        /* Buttons */
        .lrwa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .lrwa-img-grid  { grid-template-columns: repeat(2, 1fr); }
          .lrwa-word-grid { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="A" title={<>Look, read, and write.</>} />

        {/* ── Images 4×2 ── */}
        <div className="lrwa-img-grid">
          {IMAGES.map((img) => (
            <div key={img.label} className="lrwa-img-card">
              <img src={img.src} alt={({a:"A pond with water lilies.",b:"Frogs singing and dancing beside a pond.",c:"An alligator swimming in a pond.",d:"A rock on grass.",e:"A girl singing.",f:"A cat chasing a squirrel.",g:"A boy stumbling forward.",h:"A sleeping boy with a dream bubble."})[img.label]} className="lrwa-img" />
              <div className="lrwa-img-label">{img.label}</div>
            </div>
          ))}
        </div>

        {/* ── Words 4×2 ── */}
        <div className="lrwa-word-grid">
          {WORDS.map((w) => {
            const wrong    = isWrong(w);
            const value    = answers[w.id] || "";
            const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
            const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
            

            return (
              <div key={w.id} className="lrwa-word-row">

                {/* Input */}
                <div className="lrwa-input-wrap">
                  <input aria-invalid={results[w.id]==="wrong"}  title={answerTargets.find(t=>t.key===w.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===w.id)?.label||"Complete this answer"} {...fieldKeys}
                    ref={(el) => (inputRefs.current[w.id] = el)}
                    type="text"
                    maxLength={1}
                    className={[
                      "lrwa-input",
                      wrong   ? "lrwa-input--wrong"  : "",
                      showAns ? "lrwa-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[w.id]==="correct"}
                    onChange={(e) => handleChange(w.id, e.target.value)}
                    style={{...((base=>({...base,borderBottomColor:showAns||results[w.id]==="correct"?"#16a34a":results[w.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderColor: bColor, color: tColor })),borderColor:showAns||results[w.id]==="correct"?"#16a34a":results[w.id]==="wrong"?"#ef4444":bColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwa-badge">✕</div>}
                </div>

                {/* Number */}
                <span className="lrwa-num">{w.id}</span>

                {/* Word */}
                <span className="lrwa-word">{renderExerciseAudioText({audio:listening,id:`word-${w.id}`,src:[clipPage39A1,clipPage39A2,clipPage39A3,clipPage39A4,clipPage39A5,clipPage39A6,clipPage39A7,clipPage39A8][w.id-1],label:w.word,children:w.word})}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwa-buttons">
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