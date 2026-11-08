import clipPage72A6 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_006_soccer.mp3";
import clipPage72A5 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_005_car_race.mp3";
import clipPage72A4 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_004_library.mp3";
import clipPage72A3 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_003_garden.mp3";
import clipPage72A2 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_002_baseball.mp3";
import clipPage72A1 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - A/Item_001_volleyball.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — كل صورة عليها badge الحرف
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 25.svg"; // library
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 26.svg"; // baseball
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 27.svg"; // soccer
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 32.svg"; // garden
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 33.svg"; // car race
import imgF from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 72/SVG/Asset 31.svg";
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
 // volleyball

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const IMG_BADGE_BG     = "#ffffff";
const IMG_BADGE_TEXT   = "#2b2b2b";
const BADGE_DEFAULT_BG = "transparent";
const BADGE_DEFAULT_CL = "#2b2b2b";
const BADGE_CORRECT_BG =  "transparent";
const BADGE_CORRECT_CL = "#2b2b2b";
const BADGE_WRONG_BG   =  "transparent";;
const BADGE_WRONG_CL   = "#2b2b2b";
const WRONG_X_BG       = "#ef4444";
const WRONG_X_CL       = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  IMAGES: 6 صور مرتبة a→f
//  WORDS:  6 كلمات + الحرف الصحيح + id للـ auto-focus
// ─────────────────────────────────────────────
const IMAGES = [
  { letter: "a", src: imgA },
  { letter: "b", src: imgB },
  { letter: "c", src: imgC },
  { letter: "d", src: imgD },
  { letter: "e", src: imgE },
  { letter: "f", src: imgF },
];

// الترتيب: 3 في كل صف
const WORDS = [
  { id: 1, word: "volleyball", correct: "f" },
  { id: 2, word: "baseball",   correct: "b" },
  { id: 3, word: "garden",     correct: "d" },
  { id: 4, word: "library",    correct: "a" },
  { id: 5, word: "car race",   correct: "e" },
  { id: 6, word: "soccer",     correct: "c" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QA() {
const listening=useExerciseListening("sb_review8_page1_q1");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = WORDS.map(item=>({key:item.id,correct:[item.correct],answer:item.correct,label:`Word ${item.id}. ${item.word}. Enter the matching picture letter, a to f. Use each letter once.`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const inputRefs = useRef({});

  const handleChange=(id,value)=>{if(showAns||results[id]==="correct")return;const letter=value.replace(/[^a-zA-Z]/g,"").slice(-1).toLowerCase();if(letter&&Object.entries(answers).some(([key,v])=>Number(key)!==id&&v===letter)){setAnnouncement("That letter is already used. Clear its previous box first.");return;}setAnswers(prev=>({...prev,[id]:letter}));setResults(prev=>{const next={...prev};delete next[id];return next;});if(letter){const at=WORDS.findIndex(w=>w.id===id),next=WORDS.slice(at+1).find(w=>results[w.id]!=="correct");inputRefs.current[next?.id]?.focus();}};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const getBadgeState=w=>!answers[w.id]?"empty":showAns?"correct":results[w.id]||"filled";

  const badgeBg  = (s) => s === "correct" ? BADGE_CORRECT_BG : s === "wrong" ? BADGE_WRONG_BG  : BADGE_DEFAULT_BG;
  const badgeClr = (s) => s === "correct" ? BADGE_CORRECT_CL : s === "wrong" ? BADGE_WRONG_CL  : BADGE_DEFAULT_CL;

  return (
    <div data-adapt-scope="review7&8_Review8_Page1_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review7&8_Review8_Page1_Q1"] input:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review8_Page1_Q1"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}

[data-adapt-scope="review7&8_Review8_Page1_Q1"] .lrwa-input:focus-visible {border-radius:50%;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Images row: 6 صور ── */
        .lrwa-imgs {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(6px, 0.9vw, 12px);
          width: 100%;
          margin-top : 8%  ;
        }

        .lrwa-img-card {
          position: relative;
          overflow: visible;
        }

        .lrwa-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

      

        /* ── Words grid: 3 per row ── */
        .lrwa-words {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.8vw, 24px) clamp(16px, 2.4vw, 36px);
          width: 100%;
        }

        /* Single word item: num | word | badge */
        .lrwa-word-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .lrwa-word-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwa-word-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
        }

        /* Input badge */
        .lrwa-badge-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrwa-badge {
          position: relative;
          width: clamp(40px, 3.8vw, 40px);
          height: clamp(40px, 3.8vw, 40px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2195a6
;

        }

        .lrwa-letter-display {
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          text-transform: lowercase;
        }

        /* Transparent input over badge */
        .lrwa-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          caret-color: #333w;
          z-index: 2;
          border-radius: 50%;
        }
        .lrwa-input:disabled { cursor: default; }

        /* ✕ mini badge */
        .lrwa-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(12px, 1.4vw, 15px);
          height: clamp(12px, 1.4vw, 15px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CL};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 8px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrwa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrwa-imgs  { grid-template-columns: repeat(3, 1fr); }
          .lrwa-words { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." isReview sectionLetter="A" title={<>Look, read, and write.</>} />

        {/* ── 6 Images ── */}
        <div className="lrwa-imgs">
          {IMAGES.map((img) => (
            <div key={img.letter} className="lrwa-img-card">
              <img src={img.src} alt={({a:"An adult and a child with books in a library.",b:"A child holding a baseball bat.",c:"Two children playing soccer.",d:"A flower garden beside a house.",e:"Cars racing toward a finish line.",f:"Children playing volleyball across a net."})[img.letter]} className="lrwa-img" />
            </div>
          ))}
        </div>

        {/* ── Words 3×2 ── */}
        <div className="lrwa-words">
          {WORDS.map((w) => {
            const state    = getBadgeState(w);
            const val      = answers[w.id] || "";
            const bg       = badgeBg(state);
            const clr      = badgeClr(state);
            
            const isWrong = !showAns && results[w.id] === "wrong";

            return (
              <div key={w.id} className="lrwa-word-item">
                <span className="lrwa-word-num">{w.id}</span>
                <span className="lrwa-word-text">{renderExerciseAudioText({audio:listening,id:`word-${w.id}`,src:[clipPage72A1,clipPage72A2,clipPage72A3,clipPage72A4,clipPage72A5,clipPage72A6][w.id-1],label:w.word,children:w.word})}</span>

                <div className="lrwa-badge-wrap">
                  <div className="lrwa-badge" style={{ background: bg, color: clr }}>
                    <span className="lrwa-letter-display">{val}</span>
                    <input style={{...({}),boxShadow:showAns||results[w.id]==="correct"?"inset 0 0 0 2px #16a34a":results[w.id]==="wrong"?"inset 0 0 0 2px #ef4444":undefined}} placeholder="a–f" aria-invalid={results[w.id] === "wrong"} title={answerTargets.find(target=>target.key === w.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === w.id)?.label || "Write an answer"} {...fieldKeys}
                      ref={(el) => { inputRefs.current[w.id] = el; }}
                      className="lrwa-input"
                      type="text"
                      maxLength={1}
                      value={val}
                      disabled={showAns || results[w.id] === "correct"}
                      onChange={(e) => handleChange(w.id, e.target.value)}
                    />
                    {isWrong && <div className="lrwa-wrong-x">✕</div>}
                  </div>
                </div>
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