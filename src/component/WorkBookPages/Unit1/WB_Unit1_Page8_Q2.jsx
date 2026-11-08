import clipPage8L6 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_006_They_will_run_in_the_race.mp3";
import clipPage8L5 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_005_She_won't_ride_the_horse.mp3";
import clipPage8L4 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_004_She_will_feed_the_chickens.mp3";
import clipPage8L3 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_003_They_won't_fly_a_kite.mp3";
import clipPage8L2 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_002_She_will_eat_some_bread.mp3";
import clipPage8L1 from "../../../assets/audio/WorkBook/Unit 1/Page 8 - L/Item_001_He_won't_deliver_the_milk_tonight.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 31.svg"; // boy delivering milk
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 30.svg"; // girl feeding chickens
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 18.svg"; // boys running in race
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 19.svg"; // girl riding horse
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 15.svg"; // girl eating bread
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 8/Asset 29.svg";
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
 // boys flying kite

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const IMG_BORDER_COLOR        = "#2096a6";   // بوردر إطار الصور
const CHECK_ICON_COLOR        = "#c81e1e";   // لون علامة ✓ في الصورة
const CROSS_ICON_COLOR        = "#c81e1e";   // لون علامة ✗ في الصورة
const ICON_BG_COLOR           = "#ffffff";   // خلفية أيقونة ✓ / ✗
const ICON_BORDER_COLOR       = "#2096a6";   // بوردر أيقونة ✓ / ✗

const INPUT_BG_DEFAULT        = "#ffffff";   // خلفية مربع الرقم فارغ
const INPUT_BG_CORRECT        = "#ffffff";   // خلفية مربع الرقم صح
const INPUT_BG_WRONG          = "#ffffff";   // خلفية مربع الرقم غلط
const INPUT_BORDER_DEFAULT    = "#2096a6";   // بوردر مربع الرقم
const INPUT_TEXT_COLOR        = "#2b2b2b";   // لون رقم المستخدم
const INPUT_ANSWER_COLOR      = "#c81e1e";   // لون الرقم عند Show Answer

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ

const SENTENCE_NUM_COLOR      = "#2b2b2b";   // لون أرقام الجمل
const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجمل

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الجمل المرقمة في الأعلى
const SENTENCES = [
  { id: 1, text: "He won't deliver the milk tonight." },
  { id: 2, text: "She will eat some bread."           },
  { id: 3, text: "They won't fly a kite."             },
  { id: 4, text: "She will feed the chickens."        },
  { id: 5, text: "She won't ride the horse."          },
  { id: 6, text: "They will run in the race."         },
];

// الصور مع إجاباتها الصحيحة (الرقم الصح لكل صورة)
// mark: "check" = ✓  |  "cross" = ✗
const IMAGES = [
  { key: "img-a", src: img1, correct: 1, mark: "cross" }, // boy delivering milk   → جملة 1 (won't)
  { key: "img-b", src: img2, correct: 4, mark: "check" }, // girl feeding chickens → جملة 4 (will)
  { key: "img-c", src: img3, correct: 6, mark: "check" }, // boys running          → جملة 6 (will)
  { key: "img-d", src: img4, correct: 5, mark: "cross" }, // girl riding horse     → جملة 5 (won't)
  { key: "img-e", src: img5, correct: 2, mark: "check" }, // girl eating bread     → جملة 2 (will)
  { key: "img-f", src: img6, correct: 3, mark: "cross" }, // boys flying kite      → جملة 3 (won't)
];

// الأرقام الصحيحة المقبولة
const VALID_NUMBERS = ["1","2","3","4","5","6"];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookNumber_QL() {
const listening=useExerciseListening("wb_unit1_page8_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=IMAGES.map(img=>({key:img.key,correct:[String(img.correct)],answer:String(img.correct),label:`Picture ${img.key.slice(-1)}. Enter the matching sentence number from 1 to 6. Use each number once.`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;if(value&&!/^[1-6]$/.test(value))return;if(value&&Object.entries(answers).some(([id,v])=>String(id)!==String(key)&&v===value))return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=img=>!showAns&&results[img.key]==="wrong";

  // ── render icon (✓ or ✗) ─────────────────
  

  // ── render one image card ─────────────────
  const renderImageCard = (img) => {
    const wrong   = isWrong(img);
    const value   = answers[img.key] || "";
    const tColor  = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const bgColor = wrong ? INPUT_BG_WRONG : INPUT_BG_DEFAULT;

    return (
      <div key={img.key} className="rln-card">

        {/* Number input box — top-right corner */}
        <div className="rln-num-box-wrap">
          <input aria-invalid={results[img.key]==="wrong"} placeholder="#" title={answerTargets.find(t=>t.key===img.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===img.key)?.label||"Complete this answer"} {...fieldKeys}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`rln-num-box ${wrong ? "rln-num-box--wrong" : ""} ${showAns ? "rln-num-box--answer" : ""}`}
            value={value}
            disabled={showAns||results[img.key]==="correct"}
            onChange={(e) => handleChange(img.key, e.target.value)}
            style={(base=>({...base,borderColor:showAns||results[img.key]==="correct"?"#16a34a":results[img.key]==="wrong"?"#ef4444":base.borderColor}))((base=>({...base,borderBottomColor:showAns||results[img.key]==="correct"?"#16a34a":results[img.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ color: tColor, background: bgColor }))}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <div className="rln-badge">✕</div>}
        </div>

        {/* Image */}
        <img src={img.src} alt={({"img-a":"A boy delivering milk, marked with a cross.","img-b":"A girl feeding chickens, marked with a tick.","img-c":"Two boys running, marked with a tick.","img-d":"A girl riding a horse, marked with a cross.","img-e":"A child at a bakery counter, marked with a tick.","img-f":"Two boys with a kite, marked with a cross."})[img.key]} className="rln-img" />

        {/* ✓ / ✗ icon — bottom-right corner */}


      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page8_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page8_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Sentences ── */
        .rln-sentences {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.8vw, 10px) clamp(16px, 3vw, 48px);
          width: 100%;
        }

        .rln-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 1vw, 12px);
        }

        .rln-s-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${SENTENCE_NUM_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
        }

        .rln-s-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Images grid: 3 cols × 2 rows ── */
        .rln-img-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
     width: 100%;
        margin-top: -20px;

        }

        /* ── Single card — square ── */
        .rln-card {
          position: relative;
          overflow: hidden;
          display: block;
          background: #fff;
          width: 100%;
            aspect-ratio: 4 / 3; 
        }

        /* Image fills card completely */
        .rln-img {
          position: absolute;
          width: 70%;
          height: 100%;
          display: block;
        }

        /* ── Number input box — top-right inside image ── */
        .rln-num-box-wrap {
          position: absolute;
    top: 12.7%;
          right: 30.25%;
          z-index: 3;
        }

        .rln-num-box {
         width:35px;
    height: 35px;
          border-top: 1px solid ${INPUT_BORDER_DEFAULT};
                    border-bottom: 2px solid ${INPUT_BORDER_DEFAULT};
          border-left: 2px solid ${INPUT_BORDER_DEFAULT};
          border-right: 1px solid ${INPUT_BORDER_DEFAULT};

          border-radius:0px 10px 0px 4px;
          background: ${INPUT_BG_DEFAULT};
          text-align: center;
          font-size: clamp(14px, 1.8vw, 21px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          cursor: text;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s;
          -moz-appearance: textfield;
        }
        .rln-num-box::-webkit-inner-spin-button,
        .rln-num-box::-webkit-outer-spin-button { -webkit-appearance: none; }
        .rln-num-box:disabled { opacity: 1; cursor: default; }

        /* Wrong state — red border */
        .rln-num-box--wrong {
          border-color: #ef4444 !important;
        }

        /* Show answer — red number */
        .rln-num-box--answer {
          color: ${INPUT_ANSWER_COLOR} !important;
        }

        /* ✕ wrong badge */
        .rln-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 4;
        }

        /* ── ✓ / ✗ icon — bottom-right corner ── */

        /* Buttons */
        .rln-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 580px) {
          .rln-sentences  { grid-template-columns: 1fr; }
          .rln-img-grid   { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture." sectionLetter="L" title={<>Read, look, and number.</>} />

        {/* ── Sentences (2 columns) ── */}
        <div className="rln-sentences">
          {SENTENCES.map((s) => (
            <div key={s.id} className="rln-sentence-row">
              <span className="rln-s-num">{s.id}</span>
              <span className="rln-s-text">{renderExerciseAudioText({audio:listening,id:`sentence-${s.id}`,src:[clipPage8L1,clipPage8L2,clipPage8L3,clipPage8L4,clipPage8L5,clipPage8L6][s.id-1],label:s.text,children:s.text})}</span>
            </div>
          ))}
        </div>

        {/* ── Images grid ── */}
        <div className="rln-img-grid">
          {IMAGES.map(renderImageCard)}
        </div>

        {/* ── Buttons ── */}
        <div className="rln-buttons">
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