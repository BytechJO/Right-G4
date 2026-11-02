import clipPage39B4 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - B/Item_004_I_had_an_awful,_strange_dream_yesterday.mp3";
import clipPage39B3 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - B/Item_003_There_were_two_frogs_sitting_on_a_rock_singing_a_song.mp3";
import clipPage39B2 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - B/Item_002_I_was_running_as_fast_as_I_could,_but_I_stumbled_over_a_rock_and_fell_in.mp3";
import clipPage39B1 from "../../../assets/audio/WorkBook/Unit 7/Page 39 - B/Item_001_There_was_a_big_alligator_chasing_me_in_the_middle_of_nowhere.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 19.svg";
import img2 from  "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 39/SVG/Asset 20.svg";
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
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG   = "#ef4444";
const BOX_TEXT_DEFAULT   = "#2b2b2b";
const BOX_TEXT_ANSWER    = "#c81e1e";
const SENTENCE_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG     = "#ef4444";
const WRONG_BADGE_TEXT   = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: "a",
    sentence: "There was a big alligator chasing me in the middle of nowhere.",
    correct:  ["2"],
    answer:   "2",
  },
  {
    id: "b",
    sentence: "I was running as fast as I could, but I stumbled over a rock and fell into a pond.",
    correct:  ["3"],
    answer:   "3",
  },
  {
    id: "c",
    sentence: "There were two frogs sitting on a rock singing a song.",
    correct:  ["4"],
    answer:   "4",
  },
  {
    id: "d",
    sentence: "I had an awful, strange dream yesterday.",
    correct:  ["1"],
    answer:   "1",
  },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QB() {
const listening=useExerciseListening("wb_unit7_page39_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Event ${item.id}. Write its order number: ${item.sentence}`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct"||value.length>1)return;if(value!==""&&!/^[1-9]$/.test(value))return;if(value!==""&&Object.entries(answers).some(([other,answer])=>other!==String(key)&&answer===value)){setAnnouncement("This number is already used. Choose another number.");return;}setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value.length===1){const at=ITEMS.findIndex(item=>item.id===key),next=ITEMS.slice(at+1).find(item=>results[item.id]!=="correct");if(next)inputRefs.current[next.id]?.focus({preventScroll:true});}};

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
    <div data-adapt-scope="Unit7_WB_Unit7_Page39_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page39_Q2"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page39_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Images row ── */
        .rnb-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        .rnb-img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ── Items list ── */
        .rnb-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* ── Single row ── */
        .rnb-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Input wrap */
        .rnb-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rnb-input {
          width: clamp(40px, 3.6vw, 40px);
          height: clamp(40px, 3.6vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          cursor: text;
        }
        .rnb-input:disabled   { opacity: 1; cursor: default; }
        .rnb-input--wrong     { border-color: ${BOX_BORDER_WRONG}; }
        .rnb-input--answer    { color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rnb-badge {
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

        /* Sentence */
        .rnb-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .rnb-buttons {
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
        <ExerciseHeader subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture." sectionLetter="B" title={<>Read and number to match the conversation in the Student's Book.</>} />

        {/* ── Images ── */}
        <div className="rnb-images">
          <img src={img1} alt={"Three boys talking outdoors."} className="rnb-img" />
          <img src={img2} alt={"Three boys talking with a thought bubble showing a boy and an alligator."} className="rnb-img" />
        </div>

        {/* ── Items ── */}
        <div className="rnb-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? BOX_TEXT_ANSWER : BOX_TEXT_DEFAULT;
            const bColor   = wrong ? BOX_BORDER_WRONG : BOX_BORDER_DEFAULT;
            

            return (
              <div key={item.id} className="rnb-row">

                {/* Number input */}
                <div className="rnb-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"}  title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    ref={(el) => (inputRefs.current[item.id] = el)}
                    type="text"
                    maxLength={1}
                    className={[
                      "rnb-input",
                      wrong   ? "rnb-input--wrong"  : "",
                      showAns ? "rnb-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{...((base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderColor: bColor, color: tColor })),borderColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":bColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rnb-badge">✕</div>}
                </div>

                {/* Sentence */}
                {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage39B1,clipPage39B2,clipPage39B3,clipPage39B4][ITEMS.indexOf(item)],label:item.sentence,className:"rnb-sentence",style:undefined,key:item.id,children:<>{item.sentence}</>})}

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rnb-buttons">
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