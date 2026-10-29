import clipPage52C3 from "../../../assets/audio/ClassBook/Unit 6/Page 52 - C/Item_003_ship_The_under_the_is_bridge.mp3";
import clipPage52C2 from "../../../assets/audio/ClassBook/Unit 6/Page 52 - C/Item_002_car_garage_The_in_is_the.mp3";
import clipPage52C1 from "../../../assets/audio/ClassBook/Unit 6/Page 52 - C/Item_001_the_Helen_tree_hiding_is_behind.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 34.svg"; // tree
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 36.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 52/SVG/Asset 32.svg";
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
const SCRAMBLED_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctS: statement | correctQ: question
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    src:       img1,
    scrambled: "the Helen tree hiding is behind",
    correctS:  ["Helen is hiding behind the tree.", "helen is hiding behind the tree"],
    answerS:   "Helen is hiding behind the tree.",
    correctQ:  ["Is Helen hiding behind the tree?", "is helen hiding behind the tree"],
    answerQ:   "Is Helen hiding behind the tree?",
  },
  {
    id:        2,
    src:       img2,
    scrambled: "car garage The in is the",
    correctS:  ["The car is in the garage.", "the car is in the garage"],
    answerS:   "The car is in the garage.",
    correctQ:  ["Is the car in the garage?", "is the car in the garage"],
    answerQ:   "Is the car in the garage?",
  },
  {
    id:        3,
    src:       img3,
    scrambled: "ship The under the is bridge",
    correctS:  ["The ship is under the bridge.", "the ship is under the bridge"],
    answerS:   "The ship is under the bridge.",
    correctQ:  ["Is the ship under the bridge?", "is the ship under the bridge"],
    answerQ:   "Is the ship under the bridge?",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_UnscrambleWriteQ_QC() {
const listening=useExerciseListening("sb_review5_page1_q3");

  // answers: { "1s": "...", "1q": "...", "2s": "...", ... }
  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.flatMap(item=>[{key:`${item.id}s`,correct:item.correctS,answer:item.answerS,label:`Question ${item.id}. Unscramble the statement: ${item.scrambled}`},{key:`${item.id}q`,correct:item.correctQ,answer:item.answerQ,label:`Question ${item.id}. Write the matching question.`}]);
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const keyS = (id) => `${id}s`;
  const keyQ = (id) => `${id}q`;

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongKey = (key) => !showAns && results[key] === "wrong";
  

  const renderInput = (key, correctArr) => {
    const wrong    = isWrongKey(key, correctArr);
    
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div className="uswq-input-wrap">
        <input placeholder="Answer" aria-invalid={results[key] === "wrong"} title={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} {...fieldKeys}
          type="text"
          className={[
            "uswq-input",
            wrong   ? "uswq-input--wrong"  : "",
            showAns ? "uswq-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns || results[key] === "correct"}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[key] === "correct" ? "#16a34a" : results[key] === "wrong" ? "#ef4444" : undefined}}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="uswq-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="review5&6_Review5_Page1_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review5_Page1_Q3"] input:focus-visible, [data-adapt-scope="review5&6_Review5_Page1_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review5_Page1_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .uswq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
        }

        /* Single item */
        .uswq-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
        }

        /* Left: num + scrambled + 2 inputs */
        .uswq-left {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        /* Scrambled row */
        .uswq-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .uswq-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .uswq-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.4;
        }

        /* Input wrap */
        .uswq-input-wrap {
          position: relative;
          width: 100%;
        }

        .uswq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .uswq-input:disabled  { opacity: 1; cursor: default; }
        .uswq-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .uswq-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .uswq-badge {
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

        /* Image */
        .uswq-img {
          width: 70%;
          height: auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        .uswq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .uswq-item { grid-template-columns: 1fr; }
          .uswq-img  { width: 100%; max-width: 200px; }
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
        <ExerciseHeader subTitle="Build each statement in the correct order first, then use it to form the matching question before checking." isReview sectionLetter="C" title={<>Unscramble and write the statements. Then write questions.</>} />

        {/* ── Items ── */}
        <div className="uswq-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="uswq-item">

              {/* Left */}
              <div className="uswq-left">
                {/* Scrambled */}
                <div className="uswq-scrambled-row">
                  <span className="uswq-num">{item.id}</span>
                  <span className="uswq-scrambled">{renderExerciseAudioText({audio:listening,id:`scramble-${item.id}`,src:[clipPage52C1,clipPage52C2,clipPage52C3][item.id-1],label:item.scrambled,children:item.scrambled})}</span>
                </div>

                {/* Statement input */}
                {renderInput(keyS(item.id), item.correctS)}

                {/* Question input */}
                {renderInput(keyQ(item.id), item.correctQ)}
              </div>

              {/* Image */}
              <img src={item.src} alt={["A girl peeking out from behind a tree.","A red car inside a garage.","A ship passing beneath a bridge."][item.id-1]} className="uswq-img" />

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="uswq-buttons">
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