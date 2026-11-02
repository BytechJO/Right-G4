import clipPage23E17 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_017_(young)_than_his_dad.mp3";
import clipPage23E16 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_016_(fast)_of_all_three.mp3";
import clipPage23E15 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_015_The_motorcycle_is_the.mp3";
import clipPage23E14 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_014_(slow)_than_the_bike.mp3";
import clipPage23E13 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_013_The_skateboard_is.mp3";
import clipPage23E12 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_012_The_mouse_is_the.mp3";
import clipPage23E11 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_011_(small)_animal.mp3";
import clipPage23E9 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_009_(light)_than_a_backpack.mp3";
import clipPage23E8 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_008_Feathers_are.mp3";
import clipPage23E7 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_007_(slow)_than_an_airplane.mp3";
import clipPage23E6 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_006_Clown_E_is_the.mp3";
import clipPage23E5 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_005_(short)_clown_of_all.mp3";
import clipPage23E4 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_004_(tall)_than_clown_D.mp3";
import clipPage23E3 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_003_Clown_C_is.mp3";
import clipPage23E2 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_002_The_airplane_is_the.mp3";
import clipPage23E1 from "../../../assets/audio/WorkBook/Unit 4/Page 23 - E/Item_001_(fast).mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 9 صور
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 27.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 28.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 6.svg";
import img7 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 7.svg";
import img8 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 8.svg";
import img9 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 23/Asset 9.svg";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    prefix:  "The airplane is the",
    suffix:  "(fast).",
    correct: ["fastest", "the fastest"],
    answer:  "fastest",
  },
  {
    id:      2,
    prefix:  "Clown C is",
    suffix:  "(tall) than clown D.",
    correct: ["taller"],
    answer:  "taller",
  },
  {
    id:      3,
    prefix:  "Clown E is the",
    suffix:  "(short) clown of all.",
    correct: ["shortest"],
    answer:  "shortest",
  },
  {
    id:      4,
    prefix:  "A bike is",
    suffix:  "(slow) than an airplane.",
    correct: ["slower"],
    answer:  "slower",
  },
  {
    id:      5,
    prefix:  "Feathers are",
    suffix:  "(light) than a backpack.",
    correct: ["lighter"],
    answer:  "lighter",
  },
  {
    id:      6,
    prefix:  "The mouse is the",
    suffix:  "(small) animal.",
    correct: ["smallest"],
    answer:  "smallest",
  },
  {
    id:      7,
    prefix:  "The skateboard is",
    suffix:  "(slow) than the bike.",
    correct: ["slower"],
    answer:  "slower",
  },
  {
    id:      8,
    prefix:  "The motorcycle is the",
    suffix:  "(fast) of all three.",
    correct: ["fastest"],
    answer:  "fastest",
  },
  {
    id:      9,
    prefix:  "John is",
    suffix:  "(young) than his dad.",
    correct: ["younger"],
    answer:  "younger",
  },
];

const IMAGES = [
  { num: 1, src: img1 },
  { num: 2, src: img2 },
  { num: 3, src: img3 },
  { num: 4, src: img4 },
  { num: 5, src: img5 },
  { num: 6, src: img6 },
  { num: 7, src: img7 },
  { num: 8, src: img8 },
  { num: 9, src: img9 },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QE() {
const listening=useExerciseListening("wb_unit4_page23_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. ${item.prefix} blank ${item.suffix}`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit4_WB_Unit4_Page23_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page23_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page23_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page23_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page23_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Sentences list ── */
        .rlw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* ── Single sentence row ── */
        .rlw-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rlw-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rlw-text {
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlw-hint {
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${HINT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
          flex: 0 1 clamp(80px, 10vw, 140px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rlw-input {
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
        .rlw-input:disabled    { opacity: 1; cursor: default; }
        .rlw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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

        /* ── Images grid 3×3 ── */
        .rlw-img-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* ✅ التعديل: الرقم جنب الصورة */
        .rlw-img-cell {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: clamp(4px, 0.5vw, 8px);
        }

        .rlw-img-num {
          font-size: clamp(12px, 1.3vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .rlw-img-wrap {
          overflow: hidden;
          flex: 1;
          background: #fff;
        }

        .rlw-img {
          width: 90%;
          height: auto;
          display: block;
          box-sizing: border-box;
        }

        /* Buttons */
        .rlw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlw-row    { flex-wrap: wrap; }
          .rlw-text   { white-space: normal; }
          .rlw-img-grid { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="E" title={<>Read, look, and write.</>} />

        {/* ── Sentences ── */}
        <div className="rlw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

            const hintMatch = item.suffix.match(/^(\(.*?\))\s*(.*)$/);
            const hintPart  = hintMatch ? hintMatch[1] : "";
            const restPart  = hintMatch ? hintMatch[2] : item.suffix;

            return (
              renderExerciseAudioGroup({audio:listening,id:`clue-${item.id}`,src:({1:[clipPage23E2,clipPage23E1],2:[clipPage23E3,clipPage23E4],3:[clipPage23E6,clipPage23E5],4:[clipPage23E7],5:[clipPage23E8,clipPage23E9],6:[clipPage23E12,clipPage23E11],7:[clipPage23E13,clipPage23E14],8:[clipPage23E15,clipPage23E16],9:[clipPage23E17]})[item.id],label:item.prefix+" blank "+item.suffix,className:"rlw-row",style:undefined,key:item.id,children:<>

                <span className="rlw-num">{item.id}</span>
                <span className="rlw-text">{item.prefix}</span>

                <div className="rlw-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Word" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "rlw-input",
                      wrong   ? "rlw-input--wrong"  : "",
                      showAns ? "rlw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlw-badge">✕</div>}
                </div>

                {hintPart && <span className="rlw-hint">{hintPart}</span>}
                {restPart && <span className="rlw-text">{restPart}</span>}

              </>})
            );
          })}
        </div>

        {/* ── Images 3×3 grid ── */}
        <div className="rlw-img-grid">
          {IMAGES.map((img) => (
            <div key={img.num} className="rlw-img-cell">
              <span className="rlw-img-num">{img.num}</span>
              <div className="rlw-img-wrap">
                <img src={img.src} alt={["A bicycle, a car and an airplane.","Clown C standing taller than clown D.","Three clowns labelled E, F and G, with E shortest and G tallest.","A bicycle and an airplane.","Feathers and a backpack.","An elephant, a horse and a mouse.","A bicycle and a skateboard.","A truck, a motorbike and a skateboard.","A boy beside an adult man."][img.num-1]} className="rlw-img" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlw-buttons">
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