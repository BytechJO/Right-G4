import clipPage7I2 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - I/Item_002_She_won't.mp3";
import clipPage7I1 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - I/Item_001_She_will.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/1_1.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/2_1.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/3_1.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/4_3.svg";
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


const CHECK_ICON_COLOR        = "#555555";
const CROSS_ICON_COLOR        = "#555555";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#000000";
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";
const NUMBER_COLOR            = "#2b2b2b";

// ─────────────────────────────────────────────
//  📐  IMAGE SIZES - تحكم بحجم كل صورة هنا
// ─────────────────────────────────────────────
const IMAGE_SIZES = {
  "1-1": { width: "100%", height: "160px" },
  "1-2": { width: "100%", height: "160px" },
  "2-1": { width: "100%", height: "160px" },
  "2-2": { width: "100%", height: "160px" },
};

const ITEMS = [
  {
    id: 1,
    images: [
      { src: img1a, mark: "check", lineKey: "1-1", prefix: "She will",  correct: ["wash the dishes.", "wash the dishes"] },
      { src: img1b, mark: "cross", lineKey: "1-2", prefix: "She won't", correct: ["go to the store.", "go to the store"] },
    ],
  },
  {
    id: 2,
    images: [
      { src: img2a, mark: "cross", lineKey: "2-1", prefix: null, correct: ["She won't build a snowman.", "she will not bulid a snowman", "she wont bulid a snowman"] },
      { src: img2b, mark: "check", lineKey: "2-2", prefix: null, correct: ["She will draw a picture.", "She will draw a picture"] },
    ],
  },
];

const ALL_LINES = ITEMS.flatMap((item) => item.images);





export default function WB_LookWrite_QI() {
const listening=useExerciseListening("wb_unit1_page7_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_LINES.map(img=>({key:img.lineKey,correct:img.correct,answer:img.correct[0],label:`Picture ${img.lineKey}. ${img.mark==="check"?"Positive":"Negative"} sentence. ${img.prefix||"Describe the picture"}`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const isLocked=checkDisabled;

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong=img=>!showAns&&results[img.lineKey]==="wrong";

  

  const renderImageSlot = (img, index, itemId) => {
    const size = IMAGE_SIZES[img.lineKey] || { width: "100%", height: "160px" };
    return (
      <div key={img.lineKey} className="lwi-img-slot">
        <div className="lwi-img-outer">
          {index === 0 && (
            <span className="lwi-group-num">{itemId}</span>
          )}
          <div
            className="lwi-img-wrap"
            style={{ width: size.width, height: size.height }}
          >
            <img src={img.src} alt={({"1-1":"A man and a girl washing dishes, marked with a tick.","1-2":"People at a produce shop, marked with a cross.","2-1":"Children building a snowman, marked with a cross.","2-2":"A girl painting a landscape, marked with a tick."})[img.lineKey]} className="lwi-img" />
          </div>
        </div>
      </div>
    );
  };

  const renderInputLine = (img) => {
    const wrong  = isWrong(img);
    const value  = answers[img.lineKey] || "";
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;
    const uColor = !showResults || showAns
      ? INPUT_UNDERLINE_DEFAULT
      : wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <div key={img.lineKey} className="lwi-line-wrap">
        {img.prefix && (
          <span
            className="lwi-prefix"
            style={{ color: showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR }}
          >
            {renderExerciseAudioText({audio:listening,id:`prefix-${img.lineKey}`,src:img.prefix==="She will"?clipPage7I1:clipPage7I2,label:img.prefix,children:img.prefix})}
          </span>
        )}
        <input aria-invalid={results[img.lineKey]==="wrong"} placeholder="Answer" title={answerTargets.find(t=>t.key===img.lineKey)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===img.lineKey)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className="lwi-input"
          value={value}
          disabled={showAns||results[img.lineKey]==="correct"}
          onChange={(e) => handleChange(img.lineKey, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[img.lineKey]==="correct"?"#16a34a":results[img.lineKey]==="wrong"?"#ef4444":base.borderBottomColor}))({
            borderBottomColor: uColor,
            color: tColor,
            cursor: isLocked ? "default" : "text",
          })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lwi-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page7_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page7_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lwi-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.8vw, 36px);
          width: 100%;
    margin: 9% 0;
        }

        .lwi-card {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          min-width: 0;
              gap: 30px;
        }

        .lwi-img-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          gap: 8px;
        }

        .lwi-img-slot {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .lwi-img-outer {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .lwi-group-num {
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          flex-shrink: 0;
        }

        .lwi-img-wrap {
          position: relative;
          overflow: hidden;
        }

        .lwi-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        .lwi-icon {
          position: absolute;
          top: 6px;
          right: 6px;
          width: clamp(22px, 2.6vw, 32px);
          height: clamp(22px, 2.6vw, 32px);
          background: #f5f5f5;
          border: 1.5px solid #9e9e9e;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .lwi-icon-svg { width: 60%; height: 60%; }

        .lwi-line-wrap {
     display: flex;
    position: relative;
    align-items: flex-end;
    gap: 6px;
    width: 85%;
    margin-left: 7%;
        }

        .lwi-prefix {
          font-size: clamp(15px, 1.9vw, 20px);
          line-height: 1.5;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .lwi-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          width: 70px;
        }
        .lwi-input:disabled { opacity: 1; cursor: default; }

        .lwi-badge {
          position: absolute;
          top: -8px;
          right: 0px;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
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

        .lwi-inputs-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 20px);
          width: 100%;
          gap: 20px;
        }

        .lwi-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .lwi-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="I" title={<>Look and write.</>} />

        <div className="lwi-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwi-card">
              <div className="lwi-img-pair">
                {item.images.map((img, index) => renderImageSlot(img, index, item.id))}
              </div>
              <div className="lwi-inputs-stack">
                {item.images.map(renderInputLine)}
              </div>
            </div>
          ))}
        </div>

        <div className="lwi-buttons">
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