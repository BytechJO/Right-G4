import clipE4 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - E/Item_004_swimming_pool_a_did_have_he.mp3";
import clipE3 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - E/Item_003_adid_he_hat_have.mp3";
import clipE2 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - E/Item_002_ball_he_a_did_have.mp3";
import clipE1 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - E/Item_001_have_did_motorcycle_he.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  TABLE IMAGE (ثابتة — كاملة مع محتوياتها)
// ─────────────────────────────────────────────
import imgTable from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 35/SVG/Asset 22.svg";

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
;

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
//  Each item: scrambled words → unscrambled question + short answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:        1,
    scrambled: "have did motorcycle he ?",
    correctQ:  ["Did he have a motorcycle?", "did he have a motorcycle"],
    answerQ:   "Did he have a motorcycle?",
    correctA:  ["Yes, he did.", "yes he did"],
    answerA:   "Yes, he did.",
  },
  {
    id:        2,
    scrambled: "ball he a did have ?",
    correctQ:  ["Did he have a ball?", "did he have a ball"],
    answerQ:   "Did he have a ball?",
    correctA:  ["No, he didn't.", "no he didnt", "no he did not"],
    answerA:   "No, he didn't.",
  },
  {
    id:        3,
    scrambled: "a did he hat have ?",
    correctQ:  ["Did he have a hat?", "did he have a hat"],
    answerQ:   "Did he have a hat?",
    correctA:  ["No, he didn't.", "no he didnt", "no he did not"],
    answerA:   "No, he didn't.",
  },
  {
    id:        4,
    scrambled: "swimming pool a did have he ?",
    correctQ:  ["Did he have a swimming pool?", "did he have a swimming pool"],
    answerQ:   "Did he have a swimming pool?",
    correctA:  ["Yes, he did.", "yes he did"],
    answerA:   "Yes, he did.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookUnscrambleWriteAnswer_QE() {
  const listening=useExerciseListening("sb_review3_page2_q2");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.flatMap(item=>[{key:`${item.id}q`, correct:item.correctQ, answer:item.answerQ, label:`Question ${item.id}. Write the question${item.scrambled ? ": unscramble " + item.scrambled : " for the picture"}.`},{key:`${item.id}a`,correct:item.correctA,answer:item.answerA,label:`Question ${item.id}. Write the answer for the picture or diagram.`}]);
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const keyQ = (id) => `${id}q`;
  const keyA = (id) => `${id}a`;

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongKey = (key) => !showAns && results[key] === "wrong";

  

  const renderInput = (key, correctArr, flex = "1") => {
    const wrong    = isWrongKey(key, correctArr);
    const value    = answers[key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    

    return (
      <div className="luwa-input-wrap" style={{ flex }}>
        <input placeholder="Answer" aria-invalid={results[key] === "wrong"} title={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === key)?.label || "Write an answer"} {...fieldKeys}
          type="text"
          className={[
            "luwa-input",
            wrong   ? "luwa-input--wrong"  : "",
            showAns ? "luwa-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns || results[key] === "correct"}
          onChange={(e) => handleChange(key, e.target.value, correctArr)}
          style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[key] === "correct" ? "#16a34a" : results[key] === "wrong" ? "#ef4444" : ({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="luwa-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-listening-scope={"sb_review3_page2_q2"} data-adapt-scope="review3&4_Review3_Page2_Q2" className="main-container-component"><style>{`[data-listening-scope="sb_review3_page2_q2"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review3&4_Review3_Page2_Q2"] input:focus-visible, [data-adapt-scope="review3&4_Review3_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review3_Page2_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Table image ── */
        .luwa-table-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* ── Items list ── */
        .luwa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single item */
        .luwa-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Scrambled row: num + scrambled */
        .luwa-scrambled-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .luwa-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .luwa-scrambled {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SCRAMBLED_COLOR};
          line-height: 1.4;
        }

        /* Answer row: question input + separator + short answer input */
        .luwa-answer-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 16px);
          padding-left: clamp(18px, 2.2vw, 28px);
        }

        .luwa-separator {
          font-size: clamp(13px, 1.5vw, 18px);
          color: #9ca3af;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* Input wrap */
        .luwa-input-wrap {
          position: relative;
          min-width: clamp(80px, 10vw, 160px);
        }

        .luwa-input {
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
        .luwa-input:disabled  { opacity: 1; cursor: default; }
        .luwa-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .luwa-input--answer   { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .luwa-badge {
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

        .luwa-buttons {
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
        <ExerciseHeader
          subTitle="Use the picture clue, reorder the words into the correct sentence, then write the answer before checking." isReview sectionLetter="E" title={<>Look, unscramble, write, and answer.</>} />

        {/* ── Table image (ثابتة) ── */}
        <img src={imgTable} alt="Picture clues grouped under a tick and a cross: a motorcycle, a swimming pool and boots under the tick; a ball and a hat under the cross." className="luwa-table-img" />

        {/* ── Items ── */}
        <div className="luwa-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="luwa-item">

              {/* Scrambled words row */}
              {renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipE1,clipE2,clipE3,clipE4][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"className":"luwa-scrambled-row",children:<>
                <span className="luwa-num">{item.id}</span>
                <span className="luwa-scrambled">{item.scrambled}</span>
              </>})}

              {/* Question input + short answer input */}
              <div className="luwa-answer-row">
                {renderInput(keyQ(item.id), item.correctQ, "2")}
                <span className="luwa-separator">→</span>
                {renderInput(keyA(item.id), item.correctA, "1")}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="luwa-buttons">
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