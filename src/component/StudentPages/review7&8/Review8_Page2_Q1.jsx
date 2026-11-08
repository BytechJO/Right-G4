import clipPage73C2 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - C/Item_002_jump_rope.mp3";
import clipPage73C1 from "../../../assets/audio/ClassBook/Unit 8/Page 73 - C/Item_001_baseball.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — وهمية، عدّلها لاحقاً
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 3.svg";
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
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Q row: qBefore + qInput + qAfter (ثابت يمين)
//  A row: aInput (full width)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    // Q: "Did he clean his shoes?"
    qBefore: "",
    qAfter:  "",
    qInput:  { id: "1q", correct: ["Did he clean his shoes?", "did he clean his shoes"], answer: "Did he clean his shoes?" },
    // A: "Yes, he did."
    aInput:  { id: "1a", correct: ["Yes, he did.", "yes he did"], answer: "Yes, he did." },
  },
  {
    id:  2,
    src: img2,
    // Q: "Did they play _____ baseball?"
    qBefore: "Did they play",
    qAfter:  "baseball?",
    qInput:  { id: "2q", correct: [""], answer: "" }, // no input in Q middle — full sentence input
    // A: "No, they didn't."
    aInput:  { id: "2a", correct: ["No, they didn't.", "no they didn't", "no they didnt"], answer: "No, they didn't." },
    // Override: Q is: input(full) + fixed "baseball?"
    qFullInput: { id: "2qf", correct: ["Did they play", "did they play"], answer: "Did they play" },
  },
  {
    id:  3,
    src: img3,
    // Q: "Did they play _____ jump rope?"
    qBefore: "Did they play",
    qAfter:  "jump rope?",
    qInput:  { id: "3q", correct: [""], answer: "" },
    aInput:  { id: "3a", correct: ["No, they didn't.", "no they didn't", "no they didnt"], answer: "No, they didn't." },
    qFullInput: { id: "3qf", correct: ["Did they play", "did they play"], answer: "Did they play" },
  },
];

// All inputs flat
const ALL_INPUTS = [];
ITEMS.forEach((item) => {
  if (item.qFullInput) {
    ALL_INPUTS.push(item.qFullInput);
  } else if (item.qInput.correct[0] !== "") {
    ALL_INPUTS.push(item.qInput);
  } else {
    ALL_INPUTS.push(item.qInput); // item 1 full Q
  }
  ALL_INPUTS.push(item.aInput);
});

// rebuild
const INPUTS_FLAT = [];
ITEMS.forEach((item) => {
  if (item.id === 1) {
    INPUTS_FLAT.push(item.qInput);
  } else {
    INPUTS_FLAT.push(item.qFullInput);
  }
  INPUTS_FLAT.push(item.aInput);
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteQA_QC() {
const listening=useExerciseListening("sb_review8_page2_q1");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets=ALL_INPUTS.map(part=>{const row=ITEMS.find(item=>[item.qInput,item.qFullInput,item.aInput].some(p=>p?.id===part.id)),role=row?.aInput?.id===part.id?"answer":"question";return{key:part.id,correct:Array.isArray(part.correct)?part.correct:[part.correct],answer:part.answer??part.correct,label:`Question ${row?.id}, ${role}. Complete using the picture and the given words.`};});
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrongPart = (item) => !showAns && results[item.id] === "wrong";
  

  const renderInput = (p, flex = true) => {
    const wrong    = isWrongPart(p);
    
    const value    = answers[p.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={p.id} style={{ position: "relative", flex: flex ? 1 : "0 1 clamp(140px,18vw,260px)", minWidth: 0 }}>
        <input placeholder="Answer" aria-invalid={results[p.id] === "wrong"} title={answerTargets.find(target=>target.key === p.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === p.id)?.label || "Write an answer"} {...fieldKeys}
          type="text"
          value={value}
          disabled={showAns || results[p.id] === "correct"}
          onChange={(e) => handleChange(p.id, e.target.value, p.correct)}
          style={{...({
            width: "100%", background: "transparent", border: "none",
            borderBottom: `1px solid ${uColor}`, outline: "none",
            fontSize: "clamp(13px,1.6vw,19px)", color: tColor,
            lineHeight: 1.5, fontFamily: "inherit", boxSizing: "border-box",
            fontWeight: showAns ? 700 : 400, transition: "border-color 0.2s",
          }),borderBottomColor:showAns || results[p.id] === "correct" ? "#16a34a" : results[p.id] === "wrong" ? "#ef4444" : undefined}}
          spellCheck={false} autoComplete="off"
        />
        {wrong && (
          <div style={{
            position: "absolute", top: -8, right: 0,
            width: "clamp(16px,1.8vw,20px)", height: "clamp(16px,1.8vw,20px)",
            borderRadius: "50%", background: WRONG_BADGE_BG, color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(8px,0.9vw,11px)", fontWeight: 700,
            border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none", zIndex: 2,
          }}>✕</div>
        )}
      </span>
    );
  };

  return (
    <div data-adapt-scope="review7&8_Review8_Page2_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review7&8_Review8_Page2_Q1"] input:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review8_Page2_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review8_Page2_Q1"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lwqa-list {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 38px);
          width: 100%;
        }

        .lwqa-item {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: clamp(6px, 0.8vw, 12px);
          align-items: start;
        }

        .lwqa-num {
          font-size: clamp(14px,1.7vw,20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 2px;
          line-height: 1;
        }

        .lwqa-img {
          width: clamp(100px,14vw,190px);
          height: clamp(70px,10vw,135px);
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          display: block;
          flex-shrink: 0;
        }

        .lwqa-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        /* Q row */
        .lwqa-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.5vw, 7px);
          min-width: 0;
        }

        .lwqa-fixed {
          font-size: clamp(13px,1.6vw,19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lwqa-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px,1.6vw,18px);
        }

        @media (max-width: 520px) {
          .lwqa-item { grid-template-columns: auto 1fr; }
          .lwqa-img  { grid-column: 2; }
        }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        <ExerciseHeader subTitle="Use the picture or grammar clue, say the full question and answer first, then type both before checking." isReview sectionLetter="C" title={<>Look and write questions. Then answer.</>} />

        <div className="lwqa-list">
          {ITEMS.map((item) => {
            const qPart = item.id === 1 ? item.qInput : item.qFullInput;
            const aPart = item.aInput;

            return (
              <div key={item.id} className="lwqa-item">
                <span className="lwqa-num">{item.id}</span>
                <img src={item.src} alt={["A child brushing a shoe.","Children playing basketball.","Two children walking together."][item.id-1]} className="lwqa-img" />

                <div className="lwqa-lines">
                  {/* Q line */}
                  <div className="lwqa-row">
                    {renderInput(qPart, true)}
                    {item.qAfter && (
                      <span className="lwqa-fixed">{renderExerciseAudioText({audio:listening,id:`question-fragment-${item.id}`,src:item.id===2?clipPage73C1:item.id===3?clipPage73C2:null,label:item.qAfter,children:item.qAfter})}</span>
                    )}
                  </div>

                  {/* A line */}
                  <div className="lwqa-row">
                    {renderInput(aPart, true)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lwqa-buttons">
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