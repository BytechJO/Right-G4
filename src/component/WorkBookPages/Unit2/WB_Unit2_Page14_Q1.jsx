import missingNew0 from "../../../assets/audio/G4-Missing/But no matter where I roam,.mp3";
import missingNew1 from "../../../assets/audio/G4-Missing/There's always one place I want to be. I'm sure to miss it..mp3";
import missingNew2 from "../../../assets/audio/G4-Missing/There's just no place like home!.mp3";
import clipPage14J20 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_020_There_are_so_many_places_in_the_world_to.mp3";
import clipPage14J19 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_019_And_Europe's_known.mp3";
import clipPage14J18 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_018_In_Alaska_you_can_take_a_cruise.mp3";
import clipPage14J17 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_017_And_India_has_its_tigers.mp3";
import clipPage14J16 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_016_Australia_has_its.mp3";
import clipPage14J15 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_015_But_I'll_be_sad_when_she_has_to_go.mp3";
import clipPage14J14 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_014_We'll_have_a_great_time.mp3";
import clipPage14J13 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_013_She's_my_favorite_cousin._Her_name_is_Pam.mp3";
import clipPage14J12 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_012_am.mp3";
import clipPage14J11 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_011_You_ask_me,_Are_you_excited_I_say,_I.mp3";
import clipPage14J10 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_010_She_traveled_here_from_Mozambique.mp3";
import clipPage14J9 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_009_She's_going_to_be_staying_here_for_a.mp3";
import clipPage14J8 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_008_But_I'm_waiting_for_my_cousin_to_call.mp3";
import clipPage14J7 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_007_I'm_going_to_go_to_the.mp3";
import clipPage14J6 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_006_I_know.mp3";
import clipPage14J5 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_005_kangaroos.mp3";
import clipPage14J4 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_004_week.mp3";
import clipPage14J3 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_003_sure.mp3";
import clipPage14J2 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_002_mall.mp3";
import clipPage14J1 from "../../../assets/audio/WorkBook/Unit 2/Page 14 - J/Item_001_visit.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import swingImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U2 Folder/Page 13/SVG/Asset 7.svg";
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
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  WORD BANK
// ─────────────────────────────────────────────
const WORD_BANK = ["visit", "mall", "sure", "week", "kangaroos", "I know"];

// ─────────────────────────────────────────────
//  📝  POEM DATA
//  Each line: array of strings and blank objects
// ─────────────────────────────────────────────
const POEM_1 = [
  {
    parts: [
      "I'm going to go to the ",
      { id: 1, answer: "mall", width: 300 },
      ",",
    ],
  },
  { parts: ["But I'm waiting for my cousin to call."] },
  {
    parts: [
      "She's going to be staying here for a ",
      { id: 2, answer: "week", width: 300 },
      ".",
    ],
  },
  { parts: ["She traveled here from Mozambique."] },
  {
    parts: [
      'You ask me, "Are you excited?" I say, "I ',
      { id: 3, answer: "sure", width: 300 },
      ' am."',
    ],
  },
  { parts: ['She\'s my favorite cousin. Her name is Pam."'] },
  {
    parts: [
      "We'll have a great time, ",
      { id: 4, answer: "I know", width: 300 },
      ".",
    ],
  },
  { parts: ["But I'll be sad when she has to go."] },
];

const POEM_2 = [
  {
    parts: [
      "Australia has its ",
      { id: 5, answer: "kangaroos", width: 300 },
      ",",
    ],
  },
  { parts: ["And India has its tigers."] },
  { parts: ["In Alaska you can take a cruise,"] },
  { parts: ["And Europe's known for its hikers."] },
  {
    parts: [
      "There are so many places in the world to ",
      { id: 6, answer: "visit", width: 300 },
      ".",
    ],
  },
  { parts: ["But no matter where I roam,"] },
  { parts: ["There's always one place I want to be. I'm sure to miss it."] },
  { parts: ["There's just no place like home!"] },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// collect all blanks
const ALL_BLANKS = [...POEM_1, ...POEM_2]
  .flatMap((line) => line.parts.filter((p) => typeof p === "object"));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadAndWrite_J() {
const listening=useExerciseListening("wb_unit2_page14_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_BLANKS.map(blank=>({key:blank.id,correct:[blank.answer],answer:blank.answer,label:`Poem blank ${blank.id}. Use the word bank and surrounding line.`}));const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setInputs(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ALL_BLANKS.forEach((b) => { ans[b.id] = b.answer; });
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

  // ── render one poem line ──────────────────
  const renderLine = (line, idx, poem) => (
    <div key={idx} className="rw-line">
      {line.parts.map((part, i) => {
        if(typeof part==="string"){const sound=({"1-0-0":clipPage14J7,"1-1-0":clipPage14J8,"1-2-0":clipPage14J9,"1-3-0":clipPage14J10,"1-4-0":clipPage14J11,"1-4-2":clipPage14J12,"1-5-0":clipPage14J13,"1-6-0":clipPage14J14,"1-7-0":clipPage14J15,"2-0-0":clipPage14J16,"2-1-0":clipPage14J17,"2-2-0":clipPage14J18,"2-3-0":clipPage14J19,"2-4-0":clipPage14J20,"2-5-0":missingNew0,"2-6-0":missingNew1,"2-7-0":missingNew2})[poem+"-"+idx+"-"+i];return <span key={i}>{renderExerciseAudioText({audio:listening,id:`poem-${poem}-${idx}-${i}`,src:sound,label:part,children:part})}</span>;}
        const wrong = isWrong(part.id, part.answer);
        return (
          <span key={i} className="rw-blank-wrap">
            <input aria-invalid={results[part.id]==="wrong"} placeholder="Word or phrase" title={answerTargets.find(t=>t.key===part.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.id)?.label||"Complete this answer"} {...fieldKeys}
              type="text"
              className={[
                "rw-blank",
                wrong   ? "rw-blank--wrong"  : "",
                showAns ? "rw-blank--answer" : "",
              ].filter(Boolean).join(" ")}
              style={(base=>({...base,borderBottomColor:showAns||results[part.id]==="correct"?"#16a34a":results[part.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ width: part.width })}
              value={inputs[part.id] || ""}
              disabled={showAns||results[part.id]==="correct"}
              onChange={(e) => handleChange(part.id, e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {wrong && <span className="rw-badge">✕</span>}
          </span>
        );
      })}
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page14_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page14_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page14_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page14_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page14_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .rw-bank {
          display: flex;
          gap: clamp(10px, 1.6vw, 18px);
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: clamp(10px, 1.6vw, 18px);
        }
        .rw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
          font-size: clamp(18px, 1.9vw, 18px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Poem block ── */
        .rw-poem {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 12px);
        }

        /* ── Line ── */
        .rw-line {
font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          line-height:1.5;
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
        }

        /* ── Blank ── */
        .rw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }
        .rw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
font-size: clamp(18px, 1.9vw, 18px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.6;
          transition: border-color 0.2s;
          min-width: 60px;
        }
        .rw-blank:disabled   { opacity: 1; cursor: default; }
        .rw-blank--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rw-blank--answer    { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rw-badge {
          position: absolute;
          top: -6px; right: -10px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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

        /* ── Buttons ── */
        .rw-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="J" title={<>Read and write.</>} />

        {/* ── Word bank ── */}
        <div className="rw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="rw-bank-word">{renderExerciseAudioText({audio:listening,id:`bank-${word}`,src:[clipPage14J1,clipPage14J2,clipPage14J3,clipPage14J4,clipPage14J5,clipPage14J6][WORD_BANK.indexOf(word)],label:word,children:word})}</div>
          ))}
        </div>

        {/* ── Poem 1 ── */}
        <div className="rw-poem">
          {POEM_1.map((line, idx) => renderLine(line, idx, 1))}
        </div>

        {/* ── Poem 2 ── */}
        <div className="rw-poem">
          {POEM_2.map((line, idx) => renderLine(line, idx, 2))}
        </div>
{/* ── Image ── */}
{/* ── Image ── */}
<div style={{ display: "flex", justifyContent: "center" }}>
  <img
    src={swingImg}
    alt={"Two children riding swings in a park."}
    style={{
      width: "70%",
      height : "70%",
      borderRadius: "12px",
      display: "block",
    }}
  />
</div>
        {/* ── Buttons ── */}
        <div className="rw-buttons">
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