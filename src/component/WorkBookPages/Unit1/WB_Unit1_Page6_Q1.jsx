import clipPage6G4 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - G/Item_004_look_at_the_ducks.mp3";
import clipPage6G3 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - G/Item_003_watch_the_horses.mp3";
import clipPage6G2 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - G/Item_002_draw_a_picture.mp3";
import clipPage6G1 from "../../../assets/audio/WorkBook/Unit 1/Page 6 - G/Item_001_play_with_the_cats.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 21.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 24.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 27.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 6/SVG/Asset 26.svg";
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
const WORD_BANK_BORDER_COLOR  = "#2096a6";
const WORD_BANK_BG_COLOR      = "#ffffff";
const WORD_BANK_TEXT_COLOR    = "#2b2b2b";
const WORD_BANK_DIVIDER_COLOR = "#3a3a3a";

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_TEXT_COLOR = "#c81e1e";

const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";

const NUMBER_COLOR            = "#2b2b2b";

const IMG_BORDER_RADIUS       = "10px";
const IMG_HEIGHT              = "clamp(140px, 20vw, 220px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "play with the cats",
  "draw a picture",
  "watch the horses",
  "look at the ducks",
];

const ITEMS = [
  { id: 1, img: img1, correct: "She will watch the horses."    },
  { id: 2, img: img2, correct: "She will draw a picture."      },
  { id: 3, img: img3, correct: "He will look at the ducks."    },
  { id: 4, img: img4, correct: "They will play with the cats." },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteSentences_QG() {
const listening=useExerciseListening("wb_unit1_page6_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:[item.correct],answer:item.correct,label:`Picture ${item.id}. Write a sentence using the word bank.`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const isLocked=checkDisabled;

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page6_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page6_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word Bank ── */
        .lws-bank {
          width: 100%;
          border: 2px solid ${WORD_BANK_BORDER_COLOR};
          border-radius: 10px;
          background: ${WORD_BANK_BG_COLOR};
          padding: clamp(8px, 1.2vw, 14px) clamp(12px, 2vw, 24px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 12px);
          box-sizing: border-box;
        }

        .lws-word {
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${WORD_BANK_TEXT_COLOR};
          white-space: nowrap;
        }

        .lws-divider {
          color: ${WORD_BANK_DIVIDER_COLOR};
          font-size: clamp(15px, 1.9vw, 22px);
          user-select: none;
        }

        /* ── 2-column grid ── */
        .lws-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.6vw, 32px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .lws-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* Number LEFT of image — flex row */
        .lws-img-row {
          display: flex;
       
        }

        .lws-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          flex-shrink: 0;
              align-self: center;

        }

        /* Image — takes remaining width */
        .lws-img-box {
          flex: 1;
          height: ${IMG_HEIGHT};
=          overflow: hidden;
        }
        .lws-img {
      width: 60%;
    height: 100%;
    display: block;
    justify-self: center;
        }

        /* Input wrap */
        .lws-input-wrap {
          position: relative;
          width: 100%;
        }

        .lws-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          padding: 4px 6px 5px;
          transition: border-color 0.2s;
        }
        .lws-input:disabled { cursor: default; opacity: 1; }

        /* ✕ wrong badge */
        .lws-badge {
          position: absolute;
          top: -9px;
          right: -2px;
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

        /* Buttons */
        .lws-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* Responsive */
        @media (max-width: 560px) {
          .lws-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Use the picture or word clues to build one complete sentence at a time, then reread it before checking." sectionLetter="G" title={<>Look, read, and write sentences.</>} />

        {/* ── Word Bank ── */}
        <div className="lws-bank">
          {WORD_BANK.map((word, i) => (
            <React.Fragment key={word}>
              <span className="lws-word">{renderExerciseAudioText({audio:listening,id:`bank-${word}`,src:[clipPage6G1,clipPage6G2,clipPage6G3,clipPage6G4][WORD_BANK.indexOf(word)],label:word,children:word})}</span>
              {i < WORD_BANK.length - 1 && (
                <span className="lws-divider">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── 2-column grid ── */}
        <div className="lws-grid">
          {ITEMS.map((item) => {
            const wrong  = isWrong(item);
            const value  = answers[item.id] || "";
            const uColor = getUnderlineColor(item);
            const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

            return (
              <div key={item.id} className="lws-card">

                {/* Number LEFT + Image RIGHT */}
                <div className="lws-img-row">
                  <span className="lws-num">{item.id}</span>
                  <div className="lws-img-box">
                    <img src={item.img} alt={["A girl watching horses run.","A girl drawing a picture.","A boy watching ducks on a pond.","Two children with cats and a bowl of milk."][item.id-1]} className="lws-img" />
                  </div>
                </div>

                {/* Input */}
                <div className="lws-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className="lws-input"
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
                  {wrong && <div className="lws-badge">✕</div>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lws-buttons">
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