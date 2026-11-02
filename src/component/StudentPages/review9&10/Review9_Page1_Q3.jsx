import clipPage88C1 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - C/Item_001_He_is_playing_a_song_because_he_likes_to_play_the_guitar.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 30.svg"; // guitar
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 34.svg";// kite
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 35.svg";; // car
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 36.svg"; // photo
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 88/SVG/Asset 38.svg";
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
; // rabbit

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const GIVEN_COLOR      = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" → معطى | "input" → يكتبه الطالب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:    1,
    src:   img1,
    type:  "given",
    given: "He is playing a song because he likes to play the guitar.",
  },
  {
    id:      2,
    src:     img2,
    type:    "input",
    correct: ["She is flying a kite because she likes kites.", "she is flying a kite because she likes kites"],
    answer:  "She is flying a kite because she likes kites.",
  },
  {
    id:      3,
    src:     img3,
    type:    "input",
    correct: ["They are in the car because they are driving.", "they are in the car because they are driving"],
    answer:  "They are in the car because they are driving.",
  },
  {
    id:      4,
    src:     img4,
    type:    "input",
    correct: ["He is taking a photo because he likes pictures.", "he is taking a photo because he likes pictures"],
    answer:  "He is taking a photo because he likes pictures.",
  },
  {
    id:      5,
    src:     img5,
    type:    "input",
    correct: ["The rabbit doesn't like trees because it can't climb them.", "the rabbit doesn't like trees because it can't climb them", "the rabbit does not like trees because it cannot climb them"],
    answer:  "The rabbit doesn't like trees because it can't climb them.",
  },
];

const INPUT_ITEMS = ITEMS.filter((i) => i.type === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWrite_QC() {
const listening=useExerciseListening("sb_review9_page1_q3");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.filter(item=>item.type!=="given").map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.scrambled ? "Unscramble: "+item.scrambled : item.before ? item.before + " blank " + (item.after || "") : item.word ? "Write the opposite of " + item.word : item.prefix ? item.prefix+" Explain using the picture or diagram." : item.question || item.cue || item.hint || "Write an answer using the diagram."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="review9&10_Review9_Page1_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review9&10_Review9_Page1_Q3"] input:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review9_Page1_Q3"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review9_Page1_Q3"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lwc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        /* Single row: num | img | text/input */
        .lwc-row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lwc-img {
          width: 50%;
          height:auto;
          object-fit: cover;
          display: block;
          flex-shrink: 0;
        }

        /* Given text */
        .lwc-given {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${GIVEN_COLOR};
          line-height: 1.5;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          width: 100%;
          padding-bottom: 2px;
        }

        /* Input wrap */
        .lwc-input-wrap {
          position: relative;
          width: 100%;
        }

        .lwc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwc-input:disabled  { opacity: 1; cursor: default; }
        .lwc-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .lwc-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwc-badge {
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

        .lwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lwc-row { grid-template-columns: auto 1fr; }
          .lwc-img  { grid-column: 2; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word or sentence before checking." isReview sectionLetter="C" title={<>Look and write.</>} />

        {/* ── Items ── */}
        <div className="lwc-list">
          {ITEMS.map((item) => {
            if (item.type === "given") {
              return (
                renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:item.id===1?clipPage88C1:null,label:item.given||"",className:"lwc-row",style:undefined,key:item.id,children:<>
                  <span className="lwc-num">{item.id}</span>
                  <img src={item.src} alt={["A boy playing a guitar outdoors.","A person photographing a butterfly.","A rabbit beside a tree.","A family travelling in a car.","A girl flying a kite."][item.id-1]} className="lwc-img" />
                  <span className="lwc-given">{item.given}</span>
                </>})
              );
            }

            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            

            return (
              renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:item.id===1?clipPage88C1:null,label:item.given||"",className:"lwc-row",style:undefined,key:item.id,children:<>
                <span className="lwc-num">{item.id}</span>
                <img src={item.src} alt={["A boy playing a guitar outdoors.","A person photographing a butterfly.","A rabbit beside a tree.","A family travelling in a car.","A girl flying a kite."][item.id-1]} className="lwc-img" />
                <div className="lwc-input-wrap">
                  <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "lwc-input",
                      wrong   ? "lwc-input--wrong"  : "",
                      showAns ? "lwc-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lwc-badge">✕</div>}
                </div>
              </>})
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lwc-buttons">
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