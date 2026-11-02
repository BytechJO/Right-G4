import clipPage18I9 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_009_Molly_had_a.mp3";
import clipPage18I8 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_008_Jason_had_a.mp3";
import clipPage18I7 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_007_but_he_didn't_have.mp3";
import clipPage18I6 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_006_Fred_had_a.mp3";
import clipPage18I5 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_005_Karen_had_a.mp3";
import clipPage18I4 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_004_Molly.mp3";
import clipPage18I3 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_003_Jason.mp3";
import clipPage18I2 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_002_Fred.mp3";
import clipPage18I1 from "../../../assets/audio/WorkBook/Unit 3/Page 18 - I/Item_001_Karen.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import chartImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 18/Asset 29.svg";
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
 // الجدول كله كصورة واحدة

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_TEXT_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل سطر: prefix ثابت + input1 + middle (اختياري) + input2 (اختياري)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    parts: [
      { type: "text",  value: "Karen had a" },
      {
        type:    "input", key: "1-1",
        correct: ["book, but she didn't have a bike.", "book but she did not have a bike"],
        answer:  "book, but she didn't have a bike.",
      },
    ],
  },
  {
    id:      2,
    parts: [
      { type: "text",  value: "Fred had a" },
      {
        type:    "input", key: "2-1",
        correct: ["ball,", "ball", "a ball,"],
        answer:  "ball,",
        width:   "clamp(80px,10vw,130px)",
      },
      { type: "text",  value: "but he didn't have" },
      {
        type:    "input", key: "2-2",
        correct: ["a bike.", "a bike", "bike.", "bike"],
        answer:  "a bike.",
      },
    ],
  },
  {
    id:      3,
    parts: [
      { type: "text",  value: "Jason had a" },
      {
        type:    "input", key: "3-1",
        correct: ["bike but he didn't have a robot.", "bike but he did not have a robot"],
        answer:  "bike, but he didn't have a robot.",
      },
    ],
  },
  {
    id:      4,
    parts: [
      { type: "text",  value: "Molly had a" },
      {
        type:    "input", key: "4-1",
        correct: ["cat, but she didn't have a book.", "cat, but she did not have a book."],
        answer:  "cat, but she didn't have a book.",
      },
    ],
  },
];

// جمع كل الـ input keys
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "input")
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteChart_QI() {
const listening=useExerciseListening("wb_unit3_page18_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>item.parts.filter(p=>p.type==="input").map(p=>({key:p.key,correct:p.correct,answer:p.answer,label:`Chart row ${item.id}, blank ${p.key.split("-")[1]}. Use the chart and visible sentence.`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ALL_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
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

  // ── render one sentence row ───────────────
  const renderRow = (item) => (
    <div key={item.id} className="lrc-row">
      <span className="lrc-num">{item.id}</span>
      <div className="lrc-sentence">
        {item.parts.map((part, i) => {
          if (part.type === "text") {
            return (
              <span key={i} className="lrc-text">{renderExerciseAudioText({audio:listening,id:`sentence-${item.id}-${i}`,src:({"Karen had a":clipPage18I5,"Fred had a":clipPage18I6,"but he didn't have":clipPage18I7,"Jason had a":clipPage18I8,"Molly had a":clipPage18I9})[part.value],label:part.value,children:part.value})}</span>
            );
          }
          // input
          const wrong  = isWrong(part);
          const value  = answers[part.key] || "";
          const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
          const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
          return (
            <span key={i} className="lrc-input-wrap" style={{ width: part.width || "auto", flex: part.width ? "0 0 auto" : "1" }}>
              <input aria-invalid={results[part.key]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.key)?.label||"Complete this answer"} {...fieldKeys}
                type="text"
                className={[
                  "lrc-input",
                  wrong   ? "lrc-input--wrong"  : "",
                  showAns ? "lrc-input--answer" : "",
                ].filter(Boolean).join(" ")}
                value={value}
                disabled={showAns||results[part.key]==="correct"}
                onChange={(e) => handleChange(part.key, e.target.value)}
                style={(base=>({...base,borderBottomColor:showAns||results[part.key]==="correct"?"#16a34a":results[part.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                spellCheck={false}
                autoComplete="off"
              />
              {wrong && <div className="lrc-badge">✕</div>}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page18_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page18_Q2"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page18_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page18_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page18_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Chart image ── */
        .lrc-chart {
        display: flex;
    width: 80%;
    height: auto;
    align-self: center;
}

        }

        /* ── Sentences list ── */
        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* ── Single row ── */
        .lrc-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.9vw, 12px);
          width: 100%;
          flex-wrap: nowrap;
        }

        .lrc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1.5;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        /* Sentence — flex row with texts and answers */
        .lrc-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          flex-wrap: wrap;
          min-width: 0;
        }

        .lrc-text {
          font-size: clamp(15px, 1.8vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Input wrap */
        .lrc-input-wrap {
          position: relative;
          min-width: clamp(80px, 12vw, 160px);
          display: inline-flex;
          flex-direction: column;
        }

        .lrc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
7          transition: border-color 0.2s;
        }
        .lrc-input:disabled        { opacity: 1; cursor: default; }
        .lrc-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrc-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrc-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrc-buttons {
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
        <ExerciseHeader subTitle="Read one row of the chart at a time, compare the two picture clues, then complete the matching sentence." sectionLetter="I" title={<>Look, read, and write about the chart.</>} />

        {/* ── Chart image ── */}
        <div className="lrc-chart" style={{position:"relative"}}><img src={chartImg} alt={"Chart: Karen beside a book and a pink dress; Fred beside a ball and a cat; Jason beside a robot and a bicycle; Molly beside boots and a cat."} style={{display:"block",width:"100%",height:"auto"}}/>{([{label:"Karen",src:clipPage18I1,x:9,y:12,w:13,h:23},{label:"Fred",src:clipPage18I2,x:60,y:12,w:13,h:23},{label:"Jason",src:clipPage18I3,x:9,y:61,w:13,h:23},{label:"Molly",src:clipPage18I4,x:60,y:61,w:13,h:23}]).map(region=><button key={region.label} type="button" {...activationKeys} data-listening={"bank-"+region.label} aria-label={"Listen: "+region.label} onClick={()=>listening.play("bank-"+region.label,region.src)} style={{position:"absolute",left:region.x+"%",top:region.y+"%",width:region.w+"%",height:region.h+"%",padding:0,border:0,borderRadius:6,cursor:"pointer",background:listening.activeId==="bank-"+region.label?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="bank-"+region.label?"0 0 0 3px #2563eb":undefined}}>{listening.activeId==="bank-"+region.label&&renderExerciseSpeaker()}</button>)}</div>

        {/* ── Sentences ── */}
        <div className="lrc-list">
          {ITEMS.map(renderRow)}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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