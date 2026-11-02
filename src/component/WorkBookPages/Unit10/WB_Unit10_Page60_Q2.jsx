import clipPage60H4 from "../../../assets/audio/WorkBook/Unit 10/Page 60 - H/Item_004_Has_she_cooked_dinner.mp3";
import clipPage60H3 from "../../../assets/audio/WorkBook/Unit 10/Page 60 - H/Item_003_Have_they_watched_a_movie.mp3";
import clipPage60H2 from "../../../assets/audio/WorkBook/Unit 10/Page 60 - H/Item_002_Has_he_read_a_book.mp3";
import clipPage60H1 from "../../../assets/audio/WorkBook/Unit 10/Page 60 - H/Item_001_Have_they_run_in_a_race.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 21.svg";
import img3 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 23.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 19.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 22.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 60/SVG/Asset 20.svg";
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
const QUESTION_COLOR          = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  icon: "check" ✓ | "cross" ✕
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    src:      img1,
    icon:     "check",
    question: "Have they run in a race?",
    correct:  ["Yes, they have.", "yes they have", "yes, they have"],
    answer:   "Yes, they have.",
  },
  {
    id:       2,
    src:      img2,
    icon:     "check",
    question: "Has he read a book?",
    correct:  ["Yes, he has.", "yes he has", "yes, he has"],
    answer:   "Yes, he has.",
  },
  {
    id:       3,
    src:      img3,
    icon:     "check",
    question: "Have they watched a movie?",
    correct:  ["Yes, they have.", "yes they have", "yes, they have"],
    answer:   "Yes, they have.",
  },
  {
    id:       4,
    src:      img4,
    icon:     "cross",
    question: "Has she cooked dinner?",
    correct:  ["No, she hasn't.", "no she hasnot", "no, she hasnt", "No, she has not."],
    answer:   "No, she hasn't.",
  },
  {
    id:       5,
    src:      img5,
    icon:     "cross",
    question: "Have they played on the swings?",
    correct:  ["No, they haven't.", "no they havenot", "no, they havent", "No, they have not."],
    answer:   "No, they haven't.",
  },
  {
    id:       6,
    src:      img6,
    icon:     "check",
    question: "Has she listened to music?",
    correct:  ["Yes, she has.", "yes she has", "yes, she has"],
    answer:   "Yes, she has.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_QH() {
const listening=useExerciseListening("wb_unit10_page60_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Picture "+item.id+". Use the tick or cross to answer: "+item.question}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit10_WB_Unit10_Page60_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page60_Q2"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page60_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page60_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page60_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2×3 grid ── */
        .rlw-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          width: 70%;

        }

        /* Question row: num + text */
        .rlw-question-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rlw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlw-question {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${QUESTION_COLOR};
          line-height: 1.5;
        }

        /* Image wrap */
        .rlw-img-wrap {
          position: relative;
          width: 100%;
        }

        .rlw-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* Icon badge على الصورة */


        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
          width: 100%;
        }

        .rlw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rlw-input:disabled   { opacity: 1; cursor: default; }
        .rlw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rlw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlw-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="H" title={<>Read, look, and write.</>} />

        {/* ── Grid ── */}
        <div className="rlw-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rlw-card">

                {/* Question */}
                <div className="rlw-question-row">
                  <span className="rlw-num">{item.id}</span>
                  <span className="rlw-question">{renderExerciseAudioText({audio:listening,id:`question-${item.id}`,src:[clipPage60H1,clipPage60H2,clipPage60H3,clipPage60H4][item.id-1],label:item.question,children:item.question})}</span>
                </div>

                {/* Image + icon */}
                <div className="rlw-img-wrap">
                  <img src={item.src} alt={["Children running in a race; a tick is shown.","A boy reading a book; a tick is shown.","Spectators watching a car race; a tick is shown.","A woman ironing clothes; a cross is shown.","Children having a picnic; a cross is shown.","A girl listening to music; a tick is shown."][item.id-1]} className="rlw-img" />
        
                </div>

                {/* Input */}
                <div className="rlw-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
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

              </div>
            );
          })}
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