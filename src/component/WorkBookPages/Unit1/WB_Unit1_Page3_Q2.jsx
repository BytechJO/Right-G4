import clipPage3B17 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_017_Sarah_The_robots_will_have_a_lot_of_work_to_do.mp3";
import clipPage3B16 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_016_fire_trucks.mp3";
import clipPage3B15 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_015_They_will.mp3";
import clipPage3B14 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_014_buildings.mp3";
import clipPage3B13 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_013_Hansel_Robots_will.mp3";
import clipPage3B12 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_012_clean.mp3";
import clipPage3B11 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_011_build.mp3";
import clipPage3B10 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_010_homework.mp3";
import clipPage3B9 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_009_drive.mp3";
import clipPage3B8 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_008_Sarah.mp3";
import clipPage3B7 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_007_Hansel.mp3";
import clipPage3B6 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_006_robot,_Hansel.mp3";
import clipPage3B5 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_005_Sarah_I.mp3";
import clipPage3B4 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_004_machines.mp3";
import clipPage3B3 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_003_the_what.mp3";
import clipPage3B2 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_002_like_your.mp3";
import clipPage3B1 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - B/Item_001_Thanks.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import bubble1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/4_1.svg";
import bubble2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/5.svg";
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


const SPEAKER_COLOR           = "#2b2b2b";
const SENTENCE_TEXT_COLOR     = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#000000";
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: مصفوفة — أول عنصر يُعرض في Show Answer
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    bubbleImg: bubble1,
    lines: [
      { key: "1-1", speaker: "Sarah",  before: "I",  after: "robot, Hansel.", correct: ["like your"] },
      { key: "1-2", speaker: "Hansel", before: "",   after: ", Sarah.",        correct: ["Thanks"]    },
    ],
  },
  {
    id: 2,
    bubbleImg: bubble2,
    lines: [
      { key: "2-1", speaker: "Hansel", before: "Robots will", after: "buildings.",                     correct: ["build"]  },
      { key: "2-2", speaker: null,     before: "They will",   after: "fire trucks.",                   correct: ["drive"]  },
      { key: "2-3", speaker: "Sarah",  before: "The robots will have a lot of work to do.", after: "", correct: null       },
    ],
  },
];

const ALL_BLANKS = ITEMS.flatMap((item) =>
  item.lines.filter((l) => l.correct !== null)
);





export default function WB_ReadChooseWrite_QB() {
const listening=useExerciseListening("wb_unit1_page3_q2");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_BLANKS.map(line=>({key:line.key,correct:line.correct,answer:line.correct[0],label:`Dialogue ${line.key}. ${line.speaker||""}: ${line.before} blank ${line.after}`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const isLocked=checkDisabled;

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong=blank=>!showAns&&results[blank.key]==="wrong";

  const renderLine = (line) => {
    // سطر بدون blank
    if (line.correct === null) {
      return (
        <div key={line.key} className="rcw-line">
          {renderExerciseAudioText({audio:listening,id:line.key+"-before",src:({"1-1":clipPage3B5,"1-2":clipPage3B7,"2-1":clipPage3B13,"2-2":clipPage3B15,"2-3":clipPage3B17})[line.key],label:(line.speaker||"")+" "+line.before,children:<>{line.speaker && <span className="rcw-speaker">{line.speaker}:</span>}
          <span className="rcw-text">{line.before}</span></>})}
        </div>
      );
    }

    const wrong  = isWrong(line);
    const value  = answers[line.key] || "";
    const uColor = (!showResults || showAns) ? INPUT_UNDERLINE_DEFAULT : wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;
    const minW   = Math.max(80, (line.correct[0]?.length || 5) * 11);

    return (
      <div key={line.key} className="rcw-line">
        {renderExerciseAudioText({audio:listening,id:line.key+"-before",src:({"1-1":clipPage3B5,"1-2":clipPage3B7,"2-1":clipPage3B13,"2-2":clipPage3B15,"2-3":clipPage3B17})[line.key],label:(line.speaker||"")+" "+line.before,children:<>{line.speaker && <span className="rcw-speaker">{line.speaker}:</span>}
        {line.before  && <span className="rcw-text">{line.before}</span>}</>})}

        <span className="rcw-blank-wrap">
          <input aria-invalid={results[line.key]==="wrong"} placeholder="Answer" title={answerTargets.find(t=>t.key===line.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===line.key)?.label||"Complete this answer"} {...fieldKeys}
            type="text"
            className="rcw-input"
            value={value}
            disabled={showAns||results[line.key]==="correct"}
            onChange={(e) => handleChange(line.key, e.target.value)}
            style={(base=>({...base,borderBottomColor:showAns||results[line.key]==="correct"?"#16a34a":results[line.key]==="wrong"?"#ef4444":base.borderBottomColor}))({
              borderBottomColor: uColor,
              color: tColor,
              minWidth: `${minW}px`,
              cursor: isLocked ? "default" : "text",
            })}
            spellCheck={false}
            autoComplete="off"
          />
          {wrong && <span className="rcw-badge">✕</span>}
        </span>

        {line.after && <span className="rcw-text">{renderExerciseAudioText({audio:listening,id:line.key+"-after",src:({"1-1":clipPage3B6,"1-2":clipPage3B8,"2-1":clipPage3B14,"2-2":clipPage3B16})[line.key],label:line.after,children:line.after})}</span>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page3_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page3_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rcw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 4vw, 48px);
          width: 100%;
              margin: 5% 0;
        }

        .rcw-item {
          display: grid;
          grid-template-columns: 28px 1fr 1.4fr;
          gap: clamp(10px, 1.5vw, 20px);
          align-items: center;
          width: 100%;
        }

        .rcw-number {
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 700;
          color: #2b2b2b;
          align-self: center;
        }

        .rcw-bubble-img {
          width: 100%;
          max-width: clamp(220px, 30vw, 380px);
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .rcw-sentences {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 20px);
          min-width: 0;
          align-self: center;
        }

        .rcw-line {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          line-height: 1.6;
        }

        .rcw-speaker {
font-size: clamp(20px, 1.9vw, 20px);
          font-weight: 700;
          color: ${SPEAKER_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
        }

        .rcw-text {
font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
        }

        .rcw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: baseline;
        }

        /* ── input كتابة بدلاً من click ── */
        .rcw-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(20px, 1.9vw, 20px);
          text-align: center;
          color: ${INPUT_TEXT_COLOR};
          padding: 0 6px 2px;
          min-height: 24px;
          line-height: 1.5;
          vertical-align: baseline;
          transition: border-color 0.15s;
        }
        .rcw-input:disabled { opacity: 1; cursor: default; }

        .rcw-badge {
          position: absolute;
          top: -8px; right: -10px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          pointer-events: none;
          z-index: 2;
        }

        .rcw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 2vw, 22px);
        }

        @media (max-width: 650px) {
          .rcw-item {
            grid-template-columns: 24px 1fr;
            grid-template-rows: auto auto;
          }
          .rcw-bubble-img { grid-column: 1 / -1; }
          .rcw-sentences  { grid-column: 1 / -1; }
          .rcw-text { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <ExerciseHeader subTitle="Read the clue, select the correct option, then write the completed answer before checking." sectionLetter="B" title={<>Read, choose, and write.</>} />

        <div className="rcw-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcw-item">

              <div className="rcw-number">{item.id}</div>

              <div className="rcw-bubble-img" style={{position:"relative"}}><img src={item.bubbleImg} alt={item.id===1?"Two children beside the words Thanks, like your, like what, and machines.":"Two children beside the words drive, homework, build, and clean."} style={{display:"block",width:"100%",height:"auto"}}/>{(item.id===1?[{label:"Thanks",src:clipPage3B1,x:36,y:12,w:22,h:18},{label:"like your",src:clipPage3B2,x:43,y:32,w:26,h:17},{label:"like what",src:clipPage3B3,x:27,y:50,w:26,h:17},{label:"machines",src:clipPage3B4,x:38,y:70,w:26,h:18}]:[{label:"drive",src:clipPage3B9,x:36,y:12,w:22,h:18},{label:"homework",src:clipPage3B10,x:43,y:32,w:34,h:17},{label:"build",src:clipPage3B11,x:26,y:50,w:26,h:17},{label:"clean",src:clipPage3B12,x:37,y:70,w:26,h:18}]).map(region=><button key={region.label} type="button" {...activationKeys} data-listening={"bank-"+region.label} aria-label={"Listen: "+region.label} onClick={()=>listening.play("bank-"+region.label,region.src)} style={{position:"absolute",left:region.x+"%",top:region.y+"%",width:region.w+"%",height:region.h+"%",padding:0,border:0,borderRadius:6,cursor:"pointer",background:listening.activeId==="bank-"+region.label?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="bank-"+region.label?"0 0 0 3px #2563eb":undefined}}>{listening.activeId==="bank-"+region.label&&renderExerciseSpeaker()}</button>)}</div>

              <div className="rcw-sentences">
                {item.lines.map((line) => renderLine(line))}
              </div>

            </div>
          ))}
        </div>

        <div className="rcw-buttons">
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