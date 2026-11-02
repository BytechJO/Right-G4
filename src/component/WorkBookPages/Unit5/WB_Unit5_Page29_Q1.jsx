import clipPage29E6 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_006_in_front_of.mp3";
import clipPage29E5 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_005_between.mp3";
import clipPage29E4 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_004_on.mp3";
import clipPage29E3 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_003_in.mp3";
import clipPage29E2 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_002_behind.mp3";
import clipPage29E1 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - E/Item_001_under.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 6 صور للقطة مع الصندوق
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/1.svg"; // cat on box
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/2.svg"; ; // cat behind box
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/3.svg"; ; // cat between boxes
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/4.svg";  // cat under box
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/Asset 20.svg"; ; // cat in box
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/Asset 21.svg";
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
 ; // cat in front of box

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_BORDER_DEFAULT    = "#2096a6";
const INPUT_BORDER_WRONG      = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_LABEL_COLOR   = "#2b2b2b";
const WORD_BANK_TEXT_COLOR    = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  { label: "a", word: "under"      },
  { label: "b", word: "behind"     },
  { label: "c", word: "in"         },
  { label: "d", word: "on"         },
  { label: "e", word: "between"    },
  { label: "f", word: "in front of"},
];

const ITEMS = [
  { id: 1, src: img1, correct: ["d", "D"], answer: "d" }, // on
  { id: 2, src: img2, correct: ["b", "B"], answer: "b" }, // behind
  { id: 3, src: img3, correct: ["e", "E"], answer: "e" }, // between
  { id: 4, src: img4, correct: ["a", "A"], answer: "a" }, // under
  { id: 5, src: img5, correct: ["c", "C"], answer: "c" }, // in
  { id: 6, src: img6, correct: ["f", "F"], answer: "f" }, // in front of
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QE() {
const listening=useExerciseListening("wb_unit5_page29_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. Write the letter of the matching position from the bank.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit5_WB_Unit5_Page29_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page29_Q1"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .lrwe-bank {
            display: flex;
    flex-wrap: nowrap;
    gap: clamp(6px, 1vw, 12px);
    justify-content: space-between;
        }

        .lrwe-pill {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.6vw, 8px);
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(4px, 0.6vw, 8px) clamp(10px, 1.4vw, 18px);
font-size: clamp(15px, 1.9vw, 18px);
          user-select: none;
          white-space: nowrap;
          background: #fff;
        }

        .lrwe-pill-label {
          font-weight: 700;
          color: ${WORD_BANK_LABEL_COLOR};
        }
        .lrwe-pill-word {
          font-weight: 400;
          color: ${WORD_BANK_TEXT_COLOR};
        }

        /* ── 3×2 image grid ── */
        .lrwe-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 24px);
          width: 100%;
        }

        /* ── Single card ── */
        .lrwe-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 10px);
          min-width: 0;
        }

        /* Number */
        .lrwe-num {
                  position: relative;

          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          top :15%
        }

        /* Image */
        .lrwe-img {
          width: 100%;
          height: clamp(100px, 13vw, 150px);
          display: block;
        }

        /* Input box — square letter input */
        .lrwe-input-wrap {
          position: relative;
          align-self: flex-end;
        }

        .lrwe-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${INPUT_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
font-size: clamp(15px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          cursor: text;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .lrwe-input:disabled        { opacity: 1; cursor: default; }
        .lrwe-input--wrong          { border-color: ${INPUT_BORDER_WRONG}; }
        .lrwe-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwe-badge {
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

        /* Buttons */
        .lrwe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwe-grid { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="E" title={<>Look, read, and write.</>} />

        {/* ── Word bank ── */}
        <div className="lrwe-bank">
          {WORD_BANK.map((w) => (
            renderExerciseAudioGroup({audio:listening,id:`word-${w.label}`,src:[clipPage29E1,clipPage29E2,clipPage29E3,clipPage29E4,clipPage29E5,clipPage29E6][WORD_BANK.indexOf(w)],label:w.label+". "+w.word,className:"lrwe-pill",style:undefined,key:w.label,children:<>
              <span className="lrwe-pill-label">{w.label}</span>
              <span className="lrwe-pill-word">{w.word}</span>
            </>})
          ))}
        </div>
        {/* ── Images grid ── */}
        <div className="lrwe-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const bColor   = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;
            

            return (
              <div key={item.id} className="lrwe-card">

                {/* Number */}
                <span className="lrwe-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={["A cat on a box.","A cat behind a box.","A cat between two boxes.","A cat beneath a box.","A cat inside an open box.","A cat in front of a box."][item.id-1]} className="lrwe-img" />

                {/* Letter input */}
                <div className="lrwe-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Letter" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    maxLength={1}
                    className={[
                      "lrwe-input",
                      wrong   ? "lrwe-input--wrong"  : "",
                      showAns ? "lrwe-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...((base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderColor: bColor, color: tColor })),borderColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":bColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwe-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwe-buttons">
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