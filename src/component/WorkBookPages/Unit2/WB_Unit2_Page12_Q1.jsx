import clipPage12H4 from "../../../assets/audio/WorkBook/Unit 2/Page 12 - H/Item_004_going_Jack_I_and_to_are_park_the.mp3";
import clipPage12H3 from "../../../assets/audio/WorkBook/Unit 2/Page 12 - H/Item_003_Australia_next_going_My_week_mom_is_to.mp3";
import clipPage12H2 from "../../../assets/audio/WorkBook/Unit 2/Page 12 - H/Item_002_you_about_How.mp3";
import clipPage12H1 from "../../../assets/audio/WorkBook/Unit 2/Page 12 - H/Item_001_sure_I_am.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const ROWS = [
  {
    id: 1,
    scrambled: "sure I am.",
    correctSentences: [
      "I sure am.",
      "I sure am",
    ],
    answerSentence: "I sure am.",
  },
  {
    id: 2,
    scrambled: "you about How ?",
    correctSentences: [
      "How about you?",
      "How about you ?",
      "How about you",
    ],
    answerSentence: "How about you ?",
  },
  {
    id: 3,
    scrambled: "Australia next going My week mom is to.",
    correctSentences: [
      "My mom is going to Australia next week.",
      "My mom is going to Australia next week",
    ],
    answerSentence: "My mom is going to Australia next week.",
  },
  {
    id: 4,
    scrambled: "going Jack I and to are park the.",
    correctSentences: [
      "Jack and I are going to the park.",
      "Jack and I are going to the park",
    ],
    answerSentence: "Jack and I are going to the park.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unscramble_H() {
const listening=useExerciseListening("wb_unit2_page12_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ROWS.map(row=>({key:row.id,correct:row.correctSentences,answer:row.answerSentence,label:`Sentence ${row.id}. Unscramble: ${row.scrambled}`}));const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit2_WB_Unit2_Page12_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page12_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page12_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page12_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page12_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .us-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
        }

        /* ── Row ── */
        .us-row {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* scrambled words line */
        .us-scrambled-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 12px);
        }
        .us-num {
          font-size: clamp(15px, 1.8vw, 21px);
          font-weight: 700;
          color: #2b2b2b;
          min-width: 22px;
          flex-shrink: 0;
        }
        .us-scrambled {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* input wrap */
        .us-input-wrap {
          position: relative;
          padding-left: clamp(30px, 3.8vw, 46px);
        }
        .us-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.6;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .us-input:focus         { border-bottom-color: ${TABLE_BORDER_COLOR}; }
        .us-input:disabled      { opacity: 1; cursor: default; }
        .us-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .us-input--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .us-badge {
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
        .us-buttons {
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
        <ExerciseHeader subTitle="Say the correct word or sentence first, then reorder the parts and write the complete answer before checking." sectionLetter="H" title={<>Unscramble and write.</>} />

        {/* ── Rows ── */}
        <div className="us-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="us-row">
                {/* scrambled */}
                {renderExerciseAudioGroup({audio:listening,id:`scrambled-${row.id}`,src:[clipPage12H1,clipPage12H2,clipPage12H3,clipPage12H4][row.id-1],label:row.scrambled,className:"us-scrambled-row",style:undefined,key:row.id,children:<>
                  <span className="us-num">{row.id}</span>
                  <span className="us-scrambled">{row.scrambled}</span>
                </>})}

                {/* answer input */}
                <div className="us-input-wrap">
                  <input style={(base=>({...base,borderBottomColor:showAns||results[row.id]==="correct"?"#16a34a":results[row.id]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results[row.id]==="wrong"} title={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={[
                      "us-input",
                      wrong   ? "us-input--wrong"  : "",
                      showAns ? "us-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={inputs[row.id] || ""}
                    disabled={showAns||results[row.id]==="correct"}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    placeholder="Write the correct sentence…"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="us-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="us-buttons">
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