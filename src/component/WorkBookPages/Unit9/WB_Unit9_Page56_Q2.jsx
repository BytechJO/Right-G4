import clipPage56J17 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_017_I_don't_like_mountains_because.mp3";
import clipPage56J16 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_016_foxes.mp3";
import clipPage56J15 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_015_bears.mp3";
import clipPage56J14 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_014_I_don't_like_my_uncle's_farm_because.mp3";
import clipPage56J13 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_013_them.mp3";
import clipPage56J12 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_012_hate.mp3";
import clipPage56J11 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_011_and.mp3";
import clipPage56J10 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_010_mice.mp3";
import clipPage56J9 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_009_there.mp3";
import clipPage56J8 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_008_are.mp3";
import clipPage56J7 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_007_I_don't_like_swimming_because.mp3";
import clipPage56J6 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_006_the.mp3";
import clipPage56J5 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_005_water.mp3";
import clipPage56J4 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_004_am.mp3";
import clipPage56J3 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_003_of.mp3";
import clipPage56J2 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_002_I.mp3";
import clipPage56J1 from "../../../assets/audio/WorkBook/Unit 9/Page 56 - J/Item_001_afraid.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 34.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 35.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 56/SVG/Asset 36.svg";
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
const SENTENCE_COLOR          = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const SCRAMBLE_BOX_BORDER     = "#2096a6";
const SCRAMBLE_BOX_BG         = "#ffffff";
const SCRAMBLE_WORD_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    src:      img1,
    words:    ["afraid", "I", "of", "am", "water", "the"],
    sentence: "I don't like swimming because",
    correct:  ["I am afraid of the water.", "i am afraid of the water"],
    answer:   "I am afraid of the water.",
  },
  {
    id:       2,
    src:      img2,
    words:    ["are", "there", "mice", "and", "hate", "I", "them"],
    sentence: "I don't like my uncle's farm because",
    correct:  ["there are mice and I hate them.", "there are mice and i hate them"],
    answer:   "there are mice and I hate them.",
  },
  {
    id:       3,
    src:      img3,
    words:    ["bears", "I", "afraid", "and", "am", "of", "foxes"],
    sentence: "I don't like mountains because",
    correct:  ["I am afraid of foxes and bears.", "i am afraid of foxes and bears" , "i am afraid of bears and foxes"],
    answer:   "I am afraid of foxes and bears.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadUnscrambleWrite_QJ() {
const listening=useExerciseListening("wb_unit9_page56_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:"Picture "+item.id+". Unscramble the words to complete: "+item.sentence}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

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
    <div data-adapt-scope="Unit9_WB_Unit9_Page56_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit9_WB_Unit9_Page56_Q2"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page56_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page56_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page56_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lruw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 34px);
          width: 100%;
                    margin: 3% 0;

        }

        /* ── Single row: num + img + right ── */
        .lruw-row {
          display: grid;
          grid-template-columns: auto clamp(130px, 18vw, 220px) 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        /* Number */
        .lruw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Image */
        .lruw-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 6px;
        }

        /* Right side */
        .lruw-right {
          display: flex;
          flex-direction: column;
    gap: clamp(5px, 1vw, 5px);
              min-width: 0;
        }

        /* Scramble box */
        .lruw-scramble-box {
          display: flex;
          flex-wrap: wrap;
              justify-content: space-around;

          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          border: 2px solid ${SCRAMBLE_BOX_BORDER};
          border-radius: 8px;
          background: ${SCRAMBLE_BOX_BG};
          padding: clamp(6px, 0.8vw, 6px) clamp(6px, 1.4vw, 6px);
        }

        .lruw-word {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${SCRAMBLE_WORD_COLOR};
          white-space: nowrap;
        }

        /* Fixed sentence */
        .lruw-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
        }

        /* Input wrap */
        .lruw-input-wrap {
          position: relative;
          width: 100%;
        }

        .lruw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lruw-input:disabled   { opacity: 1; cursor: default; }
        .lruw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lruw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lruw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lruw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lruw-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .lruw-right { grid-column: 1 / -1; }
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
        <ExerciseHeader subTitle="Say the correct word or sentence first, then reorder the parts and write the complete answer before checking." sectionLetter="J" title={<>Look, read, unscramble, and write.</>} />

        {/* ── Items ── */}
        <div className="lruw-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lruw-row">

                {/* Number */}
                <span className="lruw-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={["Children swimming while a boy watches from the shore.","A man working beside a farm building and a boy watching.","Hikers walking and resting in snowy mountains."][item.id-1]} className="lruw-img" />

                {/* Right: scramble box + sentence + input */}
                <div className="lruw-right">

                  {/* Scramble box */}
                  <div className="lruw-scramble-box">
                    {item.words.map((word, wi) => (
                      <span key={wi} className="lruw-word">{renderExerciseAudioText({audio:listening,id:`word-${item.id}-${wi}`,src:[clipPage56J1,clipPage56J2,clipPage56J3,clipPage56J4,clipPage56J5,clipPage56J6,clipPage56J7,clipPage56J8,clipPage56J9,clipPage56J10,clipPage56J11,clipPage56J12,clipPage56J13,clipPage56J14,clipPage56J15,clipPage56J16,clipPage56J17][({"afraid":0,"I":1,"of":2,"am":3,"water":4,"the":5,"are":7,"there":8,"mice":9,"and":10,"hate":11,"them":12,"bears":14,"foxes":15})[word]],label:word,children:word})}</span>
                    ))}
                  </div>

                  {/* Fixed sentence */}
                  <span className="lruw-sentence">{renderExerciseAudioText({audio:listening,id:`sentence-${item.id}`,src:[clipPage56J7,clipPage56J14,clipPage56J17][item.id-1],label:item.sentence,children:item.sentence})}</span>

                  {/* Input */}
                  <div className="lruw-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "lruw-input",
                        wrong   ? "lruw-input--wrong"  : "",
                        showAns ? "lruw-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lruw-badge">✕</div>}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lruw-buttons">
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