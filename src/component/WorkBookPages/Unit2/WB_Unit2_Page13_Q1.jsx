import clipPage13I2 from "../../../assets/audio/WorkBook/Unit 2/Page 13 - I/Item_002_Yes,_John_is_going_to_drink_some_water.mp3";
import clipPage13I1 from "../../../assets/audio/WorkBook/Unit 2/Page 13 - I/Item_001_Is_Jack_going_to_ride_a_horse.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 12/SVG/Asset 6.svg";
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
//
//  fixedQuestion → shown as text (not editable)
//  fixedAnswer   → shown as text (not editable)
//  questionBlanks → array of accepted answers for the question input
//  answerBlanks   → array of accepted answers for the answer input
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  🖼️  IMAGE STYLES — تحكم بحجم وموقع كل صورة
//  يمكنك تغيير: height, marginTop, marginBottom, objectPosition ...
// ─────────────────────────────────────────────
const IMAGE_STYLES = {
  1: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  2: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  3: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  4: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  5: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
  6: { height: "150px", marginTop: "0px",  marginBottom: "0px"  },
};

const ROWS = [
  {
    id: 1,
    imageSrc: img1,
    fixedQuestion: "Is Jack going to ride a horse?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, Jack is going to ride a bike.",
        "No, Jack is going to ride a bike",
      ],
      answer: "No, Jack is going to ride a bike.",
    },
  },
  {
    id: 2,
    imageSrc: img2,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Is John going to drink some water?",
        "Is John going to drink some water",
      ],
      answer: "Is John going to drink some water?",
    },
    fixedAnswer: "Yes, John is going to drink some water.",
    answerBlanks: null,
  },
  {
    id: 3,
    imageSrc: img3,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Are they going to play?",
        "Are they going to play",
      ],
      answer: "Are they going to play?",
    },
    fixedAnswer: "Yes, they are going to play a game.",
    answerBlanks: null,
  },
  {
    id: 4,
    imageSrc:img4,
    fixedQuestion: "Is the man going to study?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, the man is not going to study.",
        "No, the man is not going to study",
        "No, the man isn't going to study.",
        "No, the man isn't going to study",
      ],
      answer: "No, the man is not going to study.",
    },
  },
  {
    id: 5,
    imageSrc: img5,
    fixedQuestion: "Is Lolo going to sleep?",
    questionBlanks: null,
    fixedAnswer: null,
    answerBlanks: {
      correct: [
        "No, Lolo is going to play.",
        "No, Lolo is going to play",
      ],
      answer: "No, Lolo is going to play.",
    },
  },
  {
    id: 6,
    imageSrc: img6,
    fixedQuestion: null,
    questionBlanks: {
      correct: [
        "Is Hansel going to eat an apple?",
        "Is Hansel going to eat an apple",
      ],
      answer: "Is Hansel going to eat an apple?",
    },
    fixedAnswer: "Yes, Hansel is going to eat an apple.",
    answerBlanks: null,
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_1() {
const listening=useExerciseListening("wb_unit2_page13_q1");

  // inputs keyed by  "q-{id}" or "a-{id}"
  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ROWS.flatMap(row=>[...(row.questionBlanks?[{key:"q-"+row.id,correct:row.questionBlanks.correct,answer:row.questionBlanks.answer,label:`Picture ${row.id}. Write the question matching the given answer: ${row.fixedAnswer}`}]:[]),...(row.answerBlanks?[{key:"a-"+row.id,correct:row.answerBlanks.correct,answer:row.answerBlanks.answer,label:`Picture ${row.id}. Answer: ${row.fixedQuestion}`}]:[])]);const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setInputs(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ROWS.forEach((r) => {
      if (r.questionBlanks) ans[`q-${r.id}`] = r.questionBlanks.answer;
      if (r.answerBlanks)   ans[`a-${r.id}`] = r.answerBlanks.answer;
    });
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

  // ── render one input line ─────────────────
  const renderInput = (key, correctArr, placeholder) => {
    const wrong = isWrong(key, correctArr);
    return (
      <div className="lrw-input-wrap">
        <input style={(base=>({...base,borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results[key]==="wrong"} title={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={[
            "lrw-input",
            wrong   ? "lrw-input--wrong"  : "",
            showAns ? "lrw-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={inputs[key] || ""}
          disabled={showAns||results[key]==="correct"}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrw-badge">✕</div>}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page13_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page13_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page13_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page13_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page13_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Grid: 2 columns ── */
        .lrw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(20px, 3vw, 40px);
        }
        @media (max-width: 580px) {
          .lrw-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .lrw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 1.2vw, 20px);
        }

        /* number */
        .lrw-num {
                  position: relative;
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 700;
          color: #2b2b2b;
          bottom : -20%
        }

        /* image */
        .lrw-img {
          width: 50%;
          border-radius: 10px;
          display: block;
        }

        /* fixed text (question or answer) */
        .lrw-fixed {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
          text-decoration: underline;
        }

        /* plain text (no underline) */
        .lrw-plain {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* input wrap */
        .lrw-input-wrap {
          position: relative;
        }
        .lrw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.5vw, 18px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          padding: 3px 6px 4px;
          line-height: 1.6;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrw-input:focus         { border-bottom-color: ${TABLE_BORDER_COLOR}; }
        .lrw-input:disabled      { opacity: 1; cursor: default; }
        .lrw-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .lrw-badge {
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
        .lrw-buttons {
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="1" title={<>Look, read, and write.</>} />

        {/* ── Grid ── */}
        <div className="lrw-grid">
          {ROWS.map((row) => (
            <div key={row.id} className="lrw-card">
              {/* number */}
              <span className="lrw-num">{row.id}</span>

              {/* image */}
              <img
                src={row.imageSrc}
                alt={["A boy thinking about a bicycle.","A boy thinking about a bottle of water.","Two boys thinking about a chessboard.","A man thinking about a book.","A cat thinking about a ball.","A boy thinking about a plate of fruit."][row.id-1]}
                className="lrw-img"
                style={IMAGE_STYLES[row.id] || {}}
              />

              {/* question line */}
              {row.fixedQuestion
                ? <span className="lrw-plain">{renderExerciseAudioText({audio:listening,id:`question-${row.id}`,src:row.id===1?clipPage13I1:null,label:row.fixedQuestion,children:row.fixedQuestion})}</span>
                : renderInput(`q-${row.id}`, row.questionBlanks.correct, "Write the question…")
              }

              {/* answer line */}
              {row.fixedAnswer
                ? <span className="lrw-plain">{renderExerciseAudioText({audio:listening,id:`answer-${row.id}`,src:row.id===2?clipPage13I2:null,label:row.fixedAnswer,children:row.fixedAnswer})}</span>
                : renderInput(`a-${row.id}`, row.answerBlanks.correct, "Write the answer…")
              }
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrw-buttons">
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