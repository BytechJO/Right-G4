import clipPage10C18 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_018_They_can_hop_very_fast!.mp3";
import clipPage10C17 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_017_Harley_No,_because_they_don't_have_tigers_there._But_we_saw_some.mp3";
import clipPage10C16 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_016_Stella_Did_you_see_any_tigers.mp3";
import clipPage10C15 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_015_how_many_animals_we_saw!.mp3";
import clipPage10C14 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_014_Harley_We_wanted_to_see_the_country_and_the_animals,_so_we_went_to_many.mp3";
import clipPage10C13 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_013_Stella_I_know._It_must_have_been_so_exciting!_What_did_you_do.mp3";
import clipPage10C12 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_012_We_just_got_back.mp3";
import clipPage10C11 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_011_Australia_last.mp3";
import clipPage10C10 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_010_of_me_at_the_airport._I_got_to.mp3";
import clipPage10C9 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_009_Harley_Stella,_look_at_this.mp3";
import clipPage10C8 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_008_visit.mp3";
import clipPage10C7 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_007_week.mp3";
import clipPage10C6 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_006_How_about_you.mp3";
import clipPage10C5 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_005_I_know.mp3";
import clipPage10C4 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_004_believe.mp3";
import clipPage10C3 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_003_picture.mp3";
import clipPage10C2 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_002_summer.mp3";
import clipPage10C1 from "../../../assets/audio/WorkBook/Unit 2/Page 10 - C/Item_001_kangaroos.mp3";
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
const TABLE_BORDER_COLOR      = "#2096a6";
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
const WORD_BANK = ["kangaroos", "summer", "picture", "believe", "I know", "How about you?", "week", "visit"];

// ─────────────────────────────────────────────
//  ✅  ANSWERS
// ─────────────────────────────────────────────
const ANSWERS = {
  1: "picture",
  2: "visit",
  3: "week",
  4: "believe",
  5: "kangaroos",
  6: "I know",
  7: "How about you?",
  8: "summer",
};

// ─────────────────────────────────────────────
//  📝  DIALOGUE DATA
// ─────────────────────────────────────────────
const DIALOGUE = [
  {
    speaker: "Harley",
    parts: [
      "Stella, look at this ",
      { id: 1, answer: ANSWERS[1], width: 90 },
      " of me at the airport. I got to ",
      { id: 2, answer: ANSWERS[2], width: 80 },
      " Australia last ",
      { id: 3, answer: ANSWERS[3], width: 80 },
      "! We just got back.",
    ],
  },
  {
    speaker: "Stella",
    parts: ["I know. It must have been so exciting! What did you do?"],
  },
  {
    speaker: "Harley",
    parts: [
      "We wanted to see the country and the animals, so we went to many places. I can't ",
      { id: 4, answer: ANSWERS[4], width: 90 },
      " how many animals we saw!",
    ],
  },
  {
    speaker: "Stella",
    parts: ["Did you see any tigers?"],
  },
  {
    speaker: "Harley",
    parts: [
      "No, because they don't have tigers there. But we saw some ",
      { id: 5, answer: ANSWERS[5], width: 110 },
      ". They can hop very fast!",
    ],
  },
  {
    speaker: "Stella",
    parts: [
      { id: 6, answer: ANSWERS[6], width: 90 },
      ". I have seen them on nature programs.",
    ],
  },
  {
    speaker: "Harley",
    parts: [
      "Let me show you more pictures. I think Australia is so beautiful! ",
      { id: 7, answer: ANSWERS[7], width: 140 },
      " Would you like to visit Australia?",
    ],
  },
  {
    speaker: "Stella",
    parts: [
      "Yes. I hope my family can go there next ",
      { id: 8, answer: ANSWERS[8], width: 90 },
      "!",
    ],
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// Collect all blank ids
const ALL_BLANKS = DIALOGUE.flatMap((line) =>
  line.parts.filter((p) => typeof p === "object")
);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadAndWrite_C() {
const listening=useExerciseListening("wb_unit2_page10_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_BLANKS.map(blank=>({key:blank.id,correct:[blank.answer],answer:blank.answer,label:`Dialogue blank ${blank.id}. Use the word bank and surrounding conversation.`}));const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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

  // ── render one dialogue line ──────────────
  const renderLine = (line, idx) => (
    <div key={idx} className="raw-line">
      <span className="raw-speaker">{line.speaker}:</span>
      <span className="raw-text">
        {line.parts.map((part, i) => {
          if(typeof part==="string"){const sound=({"0-0":clipPage10C9,"0-2":clipPage10C10,"0-4":clipPage10C11,"0-6":clipPage10C12,"1-0":clipPage10C13,"2-0":clipPage10C14,"2-2":clipPage10C15,"3-0":clipPage10C16,"4-0":clipPage10C17,"4-2":clipPage10C18})[idx+"-"+i];return <span key={i}>{renderExerciseAudioText({audio:listening,id:`dialogue-${idx}-${i}`,src:sound,label:(i===0?line.speaker+": ":"")+part,children:part})}</span>;}
          const wrong = isWrong(part.id, part.answer);
          return (
            <span key={i} className="raw-blank-wrap">
              <input aria-invalid={results[part.id]==="wrong"} placeholder="Word or phrase" title={answerTargets.find(t=>t.key===part.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===part.id)?.label||"Complete this answer"} {...fieldKeys}
                type="text"
                className={[
                  "raw-blank",
                  wrong   ? "raw-blank--wrong"  : "",
                  showAns ? "raw-blank--answer" : "",
                ].filter(Boolean).join(" ")}
                style={(base=>({...base,borderBottomColor:showAns||results[part.id]==="correct"?"#16a34a":results[part.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ width: part.width })}
                value={inputs[part.id] || ""}
                disabled={showAns||results[part.id]==="correct"}
                onChange={(e) => handleChange(part.id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              {wrong && <span className="raw-badge">✕</span>}
            </span>
          );
        })}
      </span>
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page10_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page10_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page10_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page10_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page10_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .raw-bank {
          display: flex;
          gap: clamp(10px, 1.6vw, 18px);
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: clamp(10px, 1.6vw, 18px);
        }
        .raw-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 15px;
          padding: clamp(5px, 0.7vw, 9px) clamp(12px, 1.6vw, 20px);
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Dialogue ── */
        .raw-dialogue {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
        }

        .raw-line {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: wrap;
          font-size: clamp(14px, 1.6vw, 19px);
          line-height: 1.9;
          color: #2b2b2b;
        }

        .raw-speaker {
          font-weight: 700;
          white-space: nowrap;
          min-width: clamp(60px, 7vw, 80px);
          color: #2b2b2b;
        }

        .raw-text {
          flex: 1;
          line-height: 2;
        }

        /* ── Blank input ── */
        .raw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }

        .raw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          font-size: clamp(14px, 1.6vw, 19px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;

          line-height: 1.5;
          transition: border-color 0.2s;
          min-width: 60px;
        }
        .raw-blank:disabled      { opacity: 1; cursor: default; }
        .raw-blank--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .raw-blank--answer       { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .raw-badge {
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
        .raw-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="C" title={<>Read and write.</>} />

        {/* ── Word bank ── */}
        <div className="raw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="raw-bank-word">{renderExerciseAudioText({audio:listening,id:`bank-${word}`,src:[clipPage10C1,clipPage10C2,clipPage10C3,clipPage10C4,clipPage10C5,clipPage10C6,clipPage10C7,clipPage10C8][WORD_BANK.indexOf(word)],label:word,children:word})}</div>
          ))}
        </div>

        {/* ── Dialogue ── */}
        <div className="raw-dialogue">
          {DIALOGUE.map((line, idx) => renderLine(line, idx))}
        </div>

        {/* ── Buttons ── */}
        <div className="raw-buttons">
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