import missingNew0 from "../../../assets/audio/G4-Missing/a tractor on the farm..mp3";
import clipPage3A8 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_008_The_city_will_build_more.mp3";
import clipPage3A7 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_007_Will_he_play_with_his.mp3";
import clipPage3A6 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_006_his_room.mp3";
import clipPage3A5 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_005_He_will.mp3";
import clipPage3A4 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_004_buildings.mp3";
import clipPage3A3 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_003_clean.mp3";
import clipPage3A2 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_002_drive.mp3";
import clipPage3A1 from "../../../assets/audio/WorkBook/Unit 1/Page 3 - A/Item_001_robot.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/1.svg"
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 3/SVG/4.svg";
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


const WORD_BANK_BORDER_COLOR   = "#2096a6";   // بوردر حبوب word bank
const WORD_BANK_BG_COLOR       = "#ffffff";   // خلفية حبوب word bank
const WORD_BANK_TEXT_COLOR     = "#2b2b2b";   // نص حبوب word bank

const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ / عند الصواب
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ

const INPUT_TEXT_COLOR         = "#2b2b2b";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#ef4444";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجملة
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "10px";                        // حواف الصورة
const IMG_WIDTH                = "clamp(90px, 12vw, 148px)";   // عرض الصورة
const IMG_HEIGHT               = "clamp(80px, 10vw, 130px)";   // ارتفاع الصورة

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["robot", "drive", "clean", "buildings"];

const ITEMS = [
  { id: 1, img: img1, before: "He will",                 after: "his room.",              correct: "clean"     },
  { id: 2, img: img2, before: "Will he play with his",   after: "?",                      correct: "robot"     },
  { id: 3, img: img3, before: "The city will build more",after: ".",                      correct: "buildings" },
  { id: 4, img: img4, before: "He will",                 after: "a tractor on the farm.", correct: "drive"     },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE — lowercase + strip ALL punctuation/spaces
//      used for comparison only (not displayed)
// ─────────────────────────────────────────────


// تنظيف الـ input لما الطالب يكتب — يحذف الـ punctuation فوراً


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unit1_Page3_Q1() {
const listening=useExerciseListening("wb_unit1_page3_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:[item.correct],answer:item.correct,label:`Picture ${item.id}. ${item.before} blank ${item.after}`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  // 🔒 بعد check أو show answer الـ inputs تنلوك
  const isLocked=checkDisabled;

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page3_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page3_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word Bank ── */
        .wlrw-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.4vw, 14px);
          justify-content: center;
          margin-bottom: clamp(10px, 1.8vw, 20px);
        }
        .wlrw-pill {
          padding: clamp(5px, 0.7vw, 8px) clamp(18px, 2.4vw, 32px);
          border: 2px solid ${WORD_BANK_BORDER_COLOR};
          border-radius: 15px;
          background: ${WORD_BANK_BG_COLOR};
          color: ${WORD_BANK_TEXT_COLOR};
          font-size: clamp(20px, 1.8vw, 20px);
          user-select: none;
          white-space: nowrap;
        }

        /* ── Items List ── */
        .wlrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.6vw, 28px);
          width: 100%;
        }

        /* ── Row: [ num ] [ img ] [ sentence ] ── */
        .wlrw-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2vw, 26px)
            ${IMG_WIDTH}
            minmax(0, 1fr);
          column-gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .wlrw-num {
          font-size: clamp(18px, 2.2vw, 24px);
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        /* Image */
        .wlrw-img-box {
          width: ${IMG_WIDTH};
          height: ${IMG_HEIGHT};
          border-radius: ${IMG_BORDER_RADIUS};
          overflow: hidden;
        }
        .wlrw-img {
          width: 100%;
          height: 100%;

        }

        /* Sentence wrapper */
        .wlrw-sentence {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.7vw, 8px);
          min-width: 0;
        }

        /* Sentence text */
        .wlrw-text {
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${SENTENCE_TEXT_COLOR};
          white-space: nowrap;
        }

        /* Input wrapper — for badge positioning */
        .wlrw-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only, no box */
        .wlrw-input {
              border: 0px solid rgba(255, 255, 255, 0);

          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(20px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(100px, 14vw, 195px);
          text-align: center;
          box-sizing: border-box;
          font-family: inherit;
        }

        
        /* ✕ Wrong badge */
        .wlrw-badge {
          position: absolute;
          top: -9px;
          right: -11px;
          width: clamp(18px, 2vw, 23px);
          height: clamp(18px, 2vw, 23px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .wlrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 680px) {
          .wlrw-row {
            grid-template-columns:
              clamp(16px, 3.5vw, 20px)
              clamp(70px, 18vw, 110px)
              minmax(0, 1fr);
            column-gap: 8px;
          }
          .wlrw-text { white-space: normal; }
          .wlrw-input { width: clamp(80px, 32vw, 145px); }
        }

        @media (max-width: 440px) {
          .wlrw-sentence { gap: 4px; }
          .wlrw-pill { padding: 5px 14px; font-size: 14px; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="A" title={<>Look, read, and write.</>} />

        {/* ── Word Bank ── */}
        <div className="wlrw-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="wlrw-pill">{renderExerciseAudioText({audio:listening,id:`bank-${word}`,src:[clipPage3A1,clipPage3A2,clipPage3A3,clipPage3A4][WORD_BANK.indexOf(word)],label:word,children:word})}</div>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="wlrw-list">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const uColor = getUnderlineColor(item);
            const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

            return (
              <div key={item.id} className="wlrw-row">

                {/* 1 ── Number */}
                <span className="wlrw-num">{item.id}</span>

                {/* 2 ── Image */}
                <div className="wlrw-img-box">
                  <img
                    src={item.img}
                    alt={["A boy in a room with clothes and toys scattered around.","A boy holding a toy robot.","City buildings beside a road.","A person driving a tractor."][item.id-1]}
                    className="wlrw-img"
                  />
                </div>

                {/* 3 ── Sentence + blank */}
                <div className="wlrw-sentence">

                  {item.before && (
                    <span className="wlrw-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:item.id===2?clipPage3A7:item.id===3?clipPage3A8:clipPage3A5,label:item.before,children:item.before})}</span>
                  )}

                  {/* Input + badge */}
                  <div className="wlrw-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className="wlrw-input"
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({
                        borderBottomColor: uColor,
                        color: tColor,
                        cursor: isLocked ? "default" : "text",
                      })}
                      spellCheck={false}
                      autoComplete="off"
                    />

                    {/* ✕ only when wrong after Check */}
                    {wrong && <div className="wlrw-badge">✕</div>}
                  </div>

                  {item.after && (
                    <span className="wlrw-text">{renderExerciseAudioText({audio:listening,id:`after-${item.id}`,src:item.id===1?clipPage3A6:item.id===4?missingNew0:null,label:item.after,children:item.after})}</span>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="wlrw-buttons">
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