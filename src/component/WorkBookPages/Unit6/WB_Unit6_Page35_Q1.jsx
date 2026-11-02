import clipPage35E1 from "../../../assets/audio/WorkBook/Unit 6/Page 35 - E/Item_001_Something's_wrong!_What_should_Jill_do.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 42.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 44.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 45.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 46.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/Asset 47.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 35/SVG/1.svg";
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


const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const QUESTION_COLOR = "#2b2b2b";
const IMG_BORDER_COLOR = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const ITEMS = [
  { id: 1, src: img1, correct: ["Jill should wash her hands.", "Jill should wash her hands"], answer: "Jill should wash her hands." },
  { id: 2, src: img2, correct: ["Jill should catch the bus.", "Jill should catch the bus"], answer: "Jill should catch the bus." },
  { id: 3, src: img3, correct: ["Jill should sharpen her pencil.", "Jill should sharpen her pencil"], answer: "Jill should sharpen her pencil." },
  { id: 4, src: img4, correct: ["Jill should be careful.", "Jill should be careful"], answer: "Jill should be careful." },
  { id: 5, src: img5, correct: ["Jill should put on the right shoes.", "Jill should put on the right shoes"], answer: "Jill should put on the right shoes." },
  { id: 6, src: img6, correct: ["Jill should put air in her bicycle tire.", "Jill should put air in her bicycle tire"], answer: "Jill should put air in her bicycle tire." },
];





export default function WB_ReadLookWrite_QE() {
const listening=useExerciseListening("wb_unit6_page35_q1");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. Write what Jill should do.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

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
    <div data-adapt-scope="Unit6_WB_Unit6_Page35_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit6_WB_Unit6_Page35_Q1"] input:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page35_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page35_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page35_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlwe-question { font-size:clamp(14px,1.7vw,20px); color:${QUESTION_COLOR}; margin:0; line-height:1.5; }
        .rlwe-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(14px,2.2vw,28px) clamp(18px,2.8vw,36px); width:100%; }
        .rlwe-card { display:flex; flex-direction:column; gap:clamp(8px,1.2vw,14px); min-width:0; }
        .rlwe-img-wrap { overflow:hidden; width:90%; }
        .rlwe-img { width:90%; height : auto;  display:block; }
        .rlwe-input-wrap { position:relative; width:100%; }
        .rlwe-input {
          width:80%; background:transparent; border:none;
          border-bottom:2px solid ${INPUT_UNDERLINE_DEFAULT}; outline:none;
          font-size:clamp(13px,1.5vw,18px); color:${INPUT_TEXT_COLOR};
          line-height:1.5; box-sizing:border-box;
          transition:border-color 0.2s;
        }
        .rlwe-input:disabled { opacity:1; cursor:default; }
        .rlwe-input--wrong   { border-bottom-color:${INPUT_UNDERLINE_WRONG}; }
        .rlwe-input--answer  { color:${INPUT_ANSWER_COLOR}; }
        .rlwe-badge {
          position:absolute; top:-8px; right:9;
          width:clamp(17px,1.9vw,22px); height:clamp(17px,1.9vw,22px);
          border-radius:50%; background:${WRONG_BADGE_BG}; color:${WRONG_BADGE_TEXT};
          display:flex; align-items:center; justify-content:center;
          font-size:clamp(9px,1vw,12px); font-weight:700;
          border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);
          pointer-events:none; z-index:2;
        }
        .rlwe-buttons { display:flex; justify-content:center; margin-top:clamp(8px,1.6vw,18px); }
        @media (max-width:520px) { .rlwe-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="div-forall" style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,22px)", maxWidth: "1100px", margin: "0 auto" }}>

        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="E" title={<>Read, look, and write.</>} />

        {renderExerciseAudioGroup({audio:listening,id:"question",src:clipPage35E1,label:"Somethingâ€™s wrong! What should Jill do?",className:"rlwe-question",style:undefined,key:"question",children:<>Something's wrong! What should Jill do?</>})}

        <div className="rlwe-grid">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            
            return (
              <div key={item.id} className="rlwe-card">
                <div className="rlwe-img-wrap">
                  <img src={item.src} alt={["A girl showing her dirty hands.","A girl running toward a school bus.","A girl writing with a pencil at a desk.","A girl sitting on the grass with a hurt knee.","A girl reacting to pain in her foot.","A girl riding a bicycle with a flat tire."][item.id-1]} className="rlwe-img" />
                </div>
                <div className="rlwe-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={["rlwe-input", wrong ? "rlwe-input--wrong" : "", showAns ? "rlwe-input--answer" : ""].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rlwe-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rlwe-buttons">
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