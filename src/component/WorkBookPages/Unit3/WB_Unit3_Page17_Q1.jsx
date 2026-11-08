import clipPage17E11 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_011_What_did_Stacy_have_at_the_foot_of_her_bed.mp3";
import clipPage17E10 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_010_She_had.mp3";
import clipPage17E9 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_009_Stacy_had_a_scooter._What_did_her_sister_have.mp3";
import clipPage17E8 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_008_What_did_Stacy_have_on_her_window_sill.mp3";
import clipPage17E7 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_007_Stacy_had_her_backpack_at_the_foot_of_her_bed.mp3";
import clipPage17E6 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_006_some_of_the_pictures_that_she_drew_up_on_the_walls_in_their_bedroom.mp3";
import clipPage17E5 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_005_bookcase_filled_with_books_that_they_liked_to_read._Stacy's_sister_had.mp3";
import clipPage17E4 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_004_Her_sister_had_lots_of_small_dolls_on_her_bed._They_had_a_large.mp3";
import clipPage17E3 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_003_three_wheels._Stacy_won_a_large_stuffed_rabbit._It_is_on_her_window_sill.mp3";
import clipPage17E2 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_002_scooter_while_her_sister_had_a_tricycle._The_tricycle_was_red_and_had.mp3";
import clipPage17E1 from "../../../assets/audio/WorkBook/Unit 3/Page 17 - E/Item_001_Stacy_and_her_sister_had_many_things_in_their_bedroom._Stacy_had_a.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import bedroomImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 17/SVG/Asset 23.svg";
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
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PASSAGE = "Stacy and her sister had many things in their bedroom. Stacy had a scooter while her sister had a tricycle. The tricycle was red and had three wheels. Stacy won a large stuffed rabbit. It is on her window sill. Her sister had lots of small dolls on her bed. They had a large bookcase filled with books that they liked to read. Stacy's sister had some of the pictures that she drew up on the walls in their bedroom. Stacy had her backpack at the foot of her bed.";

const ROWS = [
  {
    id: 1,
    question: "What did Stacy have on her window sill?",
    prefix: "She had",
    correctSentences: [
      "a large stuffed rabbit on her window sill.",
      "a large stuffed rabbit on her window sill",
    ],
    answerSentence: "a large stuffed rabbit on her window sill.",
  },
  {
    id: 2,
    question: "Stacy had a scooter. What did her sister have?",
    prefix: "She had",
    correctSentences: [
      "a scooter while her sister had a tricycle.",
      "a scooter while her sister had a tricycle",
    ],
    answerSentence: "a scooter while her sister had a tricycle.",
  },
  {
    id: 3,
    question: "What did Stacy have at the foot of her bed?",
    prefix: null,
    correctSentences: [
      "Stacy had her backpack at the foot of her bed.",
      "Stacy had her backpack at the foot of her bed",
    ],
    answerSentence: "Stacy had her backpack at the foot of her bed.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadAndWrite_E() {
const listening=useExerciseListening("wb_unit3_page17_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ROWS.map(row=>({key:row.id,correct:row.correctSentences,answer:row.answerSentence,label:`Question ${row.id}. ${row.question} ${row.prefix||""}`}));const readAnswer=key=>inputs[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
  const isWrong=key=>!showAns&&results[typeof key==="object"?(key.key??key.id):key]==="wrong";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page17_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page17_Q1"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page17_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page17_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page17_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Top section: passage + image ── */
        .raw-top {
          display: flex;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .raw-passage {
          flex: 1 1 280px;
font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
          text-indent: clamp(16px, 2vw, 28px);
        }
        .raw-img-wrap {
          flex-shrink: 0;
          width: clamp(160px, 24vw, 280px);
          overflow: hidden;
j        }
        .raw-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Questions list ── */
        .raw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
        }

        /* ── Single question block ── */
        .raw-q-block {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* Question line */
        .raw-q-line {
          display: flex;
          align-items: baseline;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .raw-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }
        .raw-question {
font-size: clamp(20px, 1.9vw, 20px);
          color: #2b2b2b;
          line-height: 1.5;
        }

        /* Answer line: prefix + input */
        .raw-answer-line {
          display: flex;
          align-items: baseline;
          gap: clamp(4px, 0.6vw, 8px);
          padding-left: clamp(22px, 3vw, 36px);
        }
        .raw-prefix {
font-size: clamp(20px, 1.9vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Input wrap */
        .raw-input-wrap {
          position: relative;
          flex: 1;
        }
        .raw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(20px, 1.9vw, 20px);
          font-family: inherit;
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .raw-input:disabled   { opacity: 1; cursor: default; }
        .raw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .raw-input--answer    { color: ${INPUT_ANSWER_COLOR}; font-weight: 600; }

        /* ✕ badge */
        .raw-badge {
          position: absolute;
          top: -6px; right: 0;
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

        /* Buttons */
        .raw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .raw-top { flex-direction: column; }
          .raw-img-wrap { width: 100%; }
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="E" title={<>Read and write.</>} />

        {/* ── Passage + Image ── */}
        <div className="raw-top">
          <p className="raw-passage">{renderExerciseAudioText({audio:listening,id:"passage-0",src:clipPage17E1,label:"Stacy and her sister had many things in their bedroom. Stacy had a ",children:"Stacy and her sister had many things in their bedroom. Stacy had a "})}{renderExerciseAudioText({audio:listening,id:"passage-1",src:clipPage17E2,label:"scooter while her sister had a tricycle. The tricycle was red and had ",children:"scooter while her sister had a tricycle. The tricycle was red and had "})}{renderExerciseAudioText({audio:listening,id:"passage-2",src:clipPage17E3,label:"three wheels. Stacy won a large stuffed rabbit. It is on her window sill. ",children:"three wheels. Stacy won a large stuffed rabbit. It is on her window sill. "})}{renderExerciseAudioText({audio:listening,id:"passage-3",src:clipPage17E4,label:"Her sister had lots of small dolls on her bed. They had a large ",children:"Her sister had lots of small dolls on her bed. They had a large "})}{renderExerciseAudioText({audio:listening,id:"passage-4",src:clipPage17E5,label:"bookcase filled with books that they liked to read. Stacy's sister had ",children:"bookcase filled with books that they liked to read. Stacy's sister had "})}{renderExerciseAudioText({audio:listening,id:"passage-5",src:clipPage17E6,label:"some of the pictures that she drew up on the walls in their bedroom. ",children:"some of the pictures that she drew up on the walls in their bedroom. "})}{renderExerciseAudioText({audio:listening,id:"passage-6",src:clipPage17E7,label:"Stacy had her backpack at the foot of her bed.",children:"Stacy had her backpack at the foot of her bed."})}</p>
          <div className="raw-img-wrap">
            <img src={bedroomImg} alt={"A bedroom with two beds, pillows, a window, a lamp on a bedside table, and backpacks at the foot of the beds."} className="raw-img" />
          </div>
        </div>

        {/* ── Questions ── */}
        <div className="raw-list">
          {ROWS.map((row) => {
            const wrong = isWrong(row.id, row.correctSentences);
            return (
              <div key={row.id} className="raw-q-block">

                {/* Question */}
                <div className="raw-q-line">
                  <span className="raw-num">{row.id}</span>
                  <span className="raw-question">{renderExerciseAudioText({audio:listening,id:`question-${row.id}`,src:({1:clipPage17E8,2:clipPage17E9,3:clipPage17E11})[row.id],label:row.question,children:row.question})}</span>
                </div>

                {/* Answer line */}
                <div className="raw-answer-line">
                  {row.prefix && (
                    <span className="raw-prefix">{renderExerciseAudioText({audio:listening,id:`prefix-${row.id}`,src:clipPage17E10,label:row.prefix,children:row.prefix})}</span>
                  )}
                  <div className="raw-input-wrap">
                    <input style={(base=>({...base,borderBottomColor:showAns||results[row.id]==="correct"?"#16a34a":results[row.id]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results[row.id]==="wrong"} title={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===row.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "raw-input",
                        wrong   ? "raw-input--wrong"  : "",
                        showAns ? "raw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={inputs[row.id] || ""}
                      disabled={showAns||results[row.id]==="correct"}
                      onChange={(e) => handleChange(row.id, e.target.value)}
                      placeholder="Write your answer here…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="raw-badge">✕</div>}
                  </div>
                </div>

              </div>
            );
          })}
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