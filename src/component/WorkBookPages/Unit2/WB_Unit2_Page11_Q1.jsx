import clipPage11E3 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - E/Item_003_What_are_Stella's_aunt_and_uncle_going_to_do.mp3";
import clipPage11E2 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - E/Item_002_What_is_Stella's_mom_going_to_do.mp3";
import clipPage11E1 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - E/Item_001_What_is_Helen_going_to_do.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 11/z/3.svg"
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
const TABLE_BORDER_COLOR      = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// imageSrc  → path to the image (adjust to your project's image folder)
// sign      → "check" ✓ or "cross" ✕  (shown on the image corner)
const ROWS = [
  {
    id: 1,
    imageSrc:img1,       // ← غيّر المسار حسب مشروعك
    sign: "cross",
    question: "What is Helen going to do?",
    correctSentences: [
      "She isn't going to go to the mall.",
      "She isn't going to go to the mall",
      "She is not going to go to the mall.",
      "She is not going to go to the mall",
    ],
    answerSentence: "She isn't going to go to the mall.",
  },
  {
    id: 2,
    imageSrc: img2,
    sign: "check",
    question: "What is Stella's mom going to do?",
    correctSentences: [
      "She is going to clap her hands.",
      "She is going to clap her hands",
    ],
    answerSentence: "She is going to clap her hands.",
  },
  {
    id: 3,
    imageSrc: img3,
    sign: "cross",
    question: "What are Stella's aunt and uncle going to do?",
    correctSentences: [
      "They are not going to drive.",
      "They are not going to drive",
      "They aren't going to drive.",
      "They aren't going to drive",
    ],
    answerSentence: "They are not going to drive.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWrite_E() {
const listening=useExerciseListening("wb_unit2_page11_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ROWS.map(row=>({key:row.id,correct:row.correctSentences,answer:row.answerSentence,label:`Picture ${row.id}. ${row.question} Use its ${row.sign==="check"?"positive":"negative"} clue.`}));const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setInputs(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ROWS.forEach((r) => { ans[r.id] = r.answerSentence; });
    setInputs(ans);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setInputs({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=key=>!showAns&&results[key]==="wrong";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page11_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page11_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .rlw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 36px);
        }

        /* ── Single row ── */
        .rlw-row {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.4vw, 32px);
          flex-wrap: wrap;
        }

        /* Image container */
        .rlw-img-wrap {
          position: relative;
          flex-shrink: 0;
          width: clamp(160px, 22vw, 260px);
          border-radius: 12px;
          background: #f5f5f5;
        }
        .rlw-img-wrap img {
          width: 110%;
          height: 110%;
          object-fit: cover;
          display: block;
        }

        /* ✓ / ✕ badge on image */
        .rlw-sign {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: clamp(28px, 3.5vw, 42px);
          height: clamp(28px, 3.5vw, 42px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
font-size: clamp(15px, 1.9vw, 22px);
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .rlw-sign--check { background: #22c55e; color: #fff; }
        .rlw-sign--cross { background: #ef4444; color: #fff; }

        /* Right side */
        .rlw-right {
          flex: 1;
          min-width: 220px;
          display: flex;
          flex-direction: column;
    gap: 5vh;        }

        /* Number + question */
        .rlw-question-row {
              display: flex;
    align-items: flex-start;
    gap: clamp(6px, 0.8vw, 10px);
    white-space: nowrap;

        }
        .rlw-num {
          font-size: clamp(15px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }
        .rlw-question {
font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* Input wrap */
        .rlw-input-wrap {
          position: relative;
        }
        .rlw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rlw-input:disabled      { opacity: 1; cursor: default; }
        .rlw-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlw-input--answer       { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge on input */
        .rlw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
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
        .rlw-buttons {
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="E" title={<>Read, look, and write.</>} />

        {/* ── Rows ── */}
        <div className="rlw-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="rlw-row">

                {/* Image + sign */}
                <div className="rlw-img-wrap">
                  <img src={row.imageSrc} alt={["A girl at a shopping mall, marked with a cross.","A family celebrating around a birthday cake, marked with a tick.","A man and a woman in a red car, marked with a cross."][row.id-1]} />
          
                </div>

                {/* Right: question + input */}
                <div className="rlw-right">
                  <div className="rlw-question-row">
                    <span className="rlw-num">{row.id}</span>
                    <span className="rlw-question">{renderExerciseAudioText({audio:listening,id:`question-${row.id}`,src:[clipPage11E1,clipPage11E2,clipPage11E3][row.id-1],label:row.question,children:row.question})}</span>
                  </div>

                  <div className="rlw-input-wrap">
                    <input style={(base=>({...base,borderBottomColor:showAns||results[row.id]==="correct"?"#16a34a":results[row.id]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results[row.id]==="wrong"} title={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "rlw-input",
                        wrong   ? "rlw-input--wrong"  : "",
                        showAns ? "rlw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={inputs[row.id] || ""}
                      disabled={showAns||results[row.id]==="correct"}
                      onChange={(e) => handleChange(row.id, e.target.value)}
                      placeholder="Write your answer here…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
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