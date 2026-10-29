import clipPage62D2 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - D/Item_002_cake.mp3";
import clipPage62D1 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - D/Item_001_Yes,_there_were_some.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 7.svg";
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
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const GIVEN_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Q row: parts[] — { t:"text"|"input", v, id, correct, answer }
//  A row: same pattern
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    Q: [
      { t: "input", id: "1q", correct: ["Were there any watermelons"], answer: "Were there any watermelons"    },
      { t: "text",  v: " ?"                                                      },
    ],
    A: [
      { t: "given", v: "Yes, there were some." },
    ],
  },
  {
    id:  2,
    src: img2,
    Q: [
      { t: "input", id: "2q", correct: ["Was there any"], answer: "Was there any"         }, // no input here — see below
      { t: "text",  v: " cake?"                                 },
    ],
    A: [
      { t: "text",  v: "No, "                                                                     },
      { t: "input", id: "2a", correct: ["there wasn't any","there wasnt any"], answer: "there wasn't any" },
      { t: "text",  v: "."                                                                         },
    ],
  },
];

// ─────────────────────────────────────────────
//  ALL INPUT IDs for scoring (exclude empty ones)
// ─────────────────────────────────────────────
const ALL_INPUTS = [];
ITEMS.forEach((item) => {
  [...item.Q, ...item.A].forEach((p) => {
    if (p.t === "input" && p.correct[0] !== "") ALL_INPUTS.push(p);
  });
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QD() {
const listening=useExerciseListening("sb_unit7_page5_q4");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ALL_INPUTS.map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Part ${item.id}. Complete the question or answer using the picture and the given words.`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongPart = (item) => !showAns && results[item.id] === "wrong";
  

  // ── Render a row of parts ──
  const renderParts = (parts) =>
    parts.map((part, i) => {
      if (part.t === "given") {
        return (
          <span key={i} className="lrwd-given">{renderExerciseAudioText({audio:listening,id:`fragment-${part.v}`,src:part.v.trim()==="Yes, there were some."?clipPage62D1:part.v.trim()==="cake?"?clipPage62D2:null,label:part.v,children:part.v})}</span>
        );
      }
      if (part.t === "text") {
        return <span key={i} className="lrwd-text">{renderExerciseAudioText({audio:listening,id:`fragment-${part.v}`,src:part.v.trim()==="Yes, there were some."?clipPage62D1:part.v.trim()==="cake?"?clipPage62D2:null,label:part.v,children:part.v})}</span>;
      }
      // input
      if (part.correct[0] === "") return null; // skip empty input slots
      const wrong    = isWrongPart(part);
      
      const value    = answers[part.id] || "";
      const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
      const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

      return (
        <span key={part.id} className="lrwd-input-wrap">
          <input placeholder="Answer" aria-invalid={results[part.id] === "wrong"} title={answerTargets.find(target=>target.key === part.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === part.id)?.label || "Write an answer"} {...fieldKeys}
            type="text"
            className={[
              "lrwd-input",
              wrong   ? "lrwd-input--wrong"  : "",
              showAns ? "lrwd-input--answer" : "",
            ].filter(Boolean).join(" ")}
            value={value}
            disabled={showAns || results[part.id] === "correct"}
            onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
            style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[part.id] === "correct" ? "#16a34a" : results[part.id] === "wrong" ? "#ef4444" : undefined}}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="lrwd-badge">✕</span>}
        </span>
      );
    });

  return (
    <div data-adapt-scope="unit7_Unit7_Page5_Q4" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit7_Unit7_Page5_Q4"] input:focus-visible, [data-adapt-scope="unit7_Unit7_Page5_Q4"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_Unit7_Page5_Q4"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lrwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
          margin : 8% 0 ; 
        }

        /* Single item */
        .lrwd-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        /* Q row: num + img + parts */
        .lrwd-q-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lrwd-num {
          font-size: clamp(14px, 1.7vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwd-img {
          width: 12%;
          height: auto;
          object-fit: contain;
          flex-shrink: 0;
        }

        /* A row: indented under Q */
        .lrwd-a-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          padding-left: clamp(30px, 4.5vw, 60px); /* indent = num + img width */
        }

        /* Text spans */
        .lrwd-text,
        .lrwd-given {
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.6;
        }

        /* Input wrap */
        .lrwd-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lrwd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.6;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrwd-input:disabled  { opacity: 1; cursor: default; }
        .lrwd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwd-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge */
        .lrwd-badge {
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

        .lrwd-buttons {
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." sectionLetter="D" title={<>Look, read, and write.</>} />

        {/* ── Items ── */}
        <div className="lrwd-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwd-item">

              {/* Q row: num + img + Q parts */}
              <div className="lrwd-q-row">
                <span className="lrwd-num">{item.id}</span>
                <img src={item.src} alt={item.id===1?"Two watermelons.":"Bread on a plate."} className="lrwd-img" />
                {renderParts(item.Q)}
              </div>

              {/* A row */}
              <div className="lrwd-a-row">
                {renderParts(item.A)}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwd-buttons">
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