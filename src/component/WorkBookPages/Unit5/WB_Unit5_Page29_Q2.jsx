import clipPage29F7 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_007_(bridge).mp3";
import clipPage29F6 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_006_(tunnel).mp3";
import clipPage29F5 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_005_She_went.mp3";
import clipPage29F4 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_004_(hill).mp3";
import clipPage29F3 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_003_They_went.mp3";
import clipPage29F2 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_002_(woods).mp3";
import clipPage29F1 from "../../../assets/audio/WorkBook/Unit 5/Page 29 - F/Item_001_He_went.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 22.svg";  // boy running into woods
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 23.svg";  // people going up hill
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 24.svg";  // girl through tunnel
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 29/SVG/Asset 25.svg";
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
 // boy under bridge

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const HINT_COLOR              = "#2b2b2b";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item: صورة + سطران
//  سطر 1: subject + input1
//  سطر 2: input2 + hint (woods / hill / tunnel / bridge)
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    subject: "He went",
    hint:    "(woods)",
    line1:   { key: "1-1", correct: ["into"],    answer: "into"    },
    line2:   { key: "1-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      2,
    src:     img2,
    subject: "They went",
    hint:    "(hill)",
    line1:   { key: "2-1", correct: ["up"],      answer: "up"      },
    line2:   { key: "2-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      3,
    src:     img3,
    subject: "She went",
    hint:    "(tunnel)",
    line1:   { key: "3-1", correct: ["through"], answer: "through" },
    line2:   { key: "3-2", correct: ["the"],     answer: "the"     },
  },
  {
    id:      4,
    src:     img4,
    subject: "He went",
    hint:    "(bridge)",
    line1:   { key: "4-1", correct: ["under"],   answer: "under"   },
    line2:   { key: "4-2", correct: ["the"],     answer: "the"     },
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [item.line1, item.line2]);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unit5_Page28_Q2() {
const listening=useExerciseListening("wb_unit5_page29_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>[item.line1,item.line2].map((cell,i)=>({...cell,label:`Picture ${item.id}, blank ${i+1}. Complete ${item.subject} using ${item.hint}.`})));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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

  

  const renderInput = (inp) => {
    const wrong    = isWrong(inp);
    const value    = answers[inp.key] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    

    return (
      <div className="lrwp-input-wrap">
        <input aria-invalid={results[inp.key]==="wrong"} placeholder="Word or phrase" title={answerTargets.find(t=>t.key===inp.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===inp.key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={[
            "lrwp-input",
            wrong   ? "lrwp-input--wrong"  : "",
            showAns ? "lrwp-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[inp.key]==="correct"}
          onChange={(e) => handleChange(inp.key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[inp.key]==="correct"?"#16a34a":results[inp.key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrwp-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit5_WB_Unit5_Page29_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page29_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page29_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .lrwp-list {
          display: flex;
          flex-direction: column;
          width: 100%;
                              margin : -2% 0 ; 

        }

        /* ── Single row: num | img | right ── */
        .lrwp-row {
          display: grid;
          grid-template-columns:
            clamp(16px, 1.8vw, 24px)
            clamp(140px, 18vw, 220px)
            1fr;
          gap: clamp(10px, 1.6vw, 24px);
          align-items: center;
                                        margin : -2% 0 ; 

        }

        /* Number */
        .lrwp-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* Image */
        .lrwp-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lrwp-img {
          width: 100%;
          height: clamp(90px, 12vw, 160px);
          display: block;
        }

        /* Right side */
        .lrwp-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Line row */
        .lrwp-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        .lrwp-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }

        .lrwp-hint {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${HINT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Input wrap */
        .lrwp-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(60px, 8vw, 120px);
        }

        .lrwp-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 4px 5px;
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrwp-input:disabled        { opacity: 1; cursor: default; }
        .lrwp-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwp-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwp-badge {
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
        .lrwp-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwp-row { grid-template-columns: clamp(16px,4vw,20px) 1fr; }
          .lrwp-img-wrap { display: none; }
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
        <ExerciseHeader subTitle="Use the picture to locate the person or object, then write the preposition that describes the position or movement." sectionLetter="F" title={<>Look, read, and write the correct preposition.</>} />

        {/* ── Items ── */}
        <div className="lrwp-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwp-row">

              {/* Number */}
              <span className="lrwp-num">{item.id}</span>

              {/* Image */}
              <div className="lrwp-img-wrap">
                <img src={item.src} alt={["A boy running toward some woods.","Two children walking up a hill.","A girl walking through a tunnel.","A boy beneath a bridge."][item.id-1]} className="lrwp-img" />
              </div>

              {/* Right: two lines */}
              <div className="lrwp-right">

                {/* Line 1: subject + input1 */}
                <div className="lrwp-line">
                  <span className="lrwp-text">{renderExerciseAudioText({audio:listening,id:`subject-${item.id}`,src:[clipPage29F1,clipPage29F3,clipPage29F5,clipPage29F1][item.id-1],label:item.subject,children:item.subject})}</span>
                  {renderInput(item.line1)}
                </div>

                {/* Line 2: input2 + hint */}
                <div className="lrwp-line">
                  {renderInput(item.line2)}
                  <span className="lrwp-hint">{renderExerciseAudioText({audio:listening,id:`hint-${item.id}`,src:[clipPage29F2,clipPage29F4,clipPage29F6,clipPage29F7][item.id-1],label:item.hint,children:item.hint})}</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwp-buttons">
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