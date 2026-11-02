import clipPage71D5 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - D/Item_005_cupcakes_on_the_plate.mp3";
import clipPage71D4 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - D/Item_004_oranges_in_the_basket.mp3";
import clipPage71D3 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - D/Item_003_steak_on_the_plate.mp3";
import clipPage71D2 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - D/Item_002_mangoes_in_the_bowl.mp3";
import clipPage71D1 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - D/Item_001_There.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 1.svg";  // tomatoes
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 2.svg";  // bread
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 3.svg";     // milk
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 4.svg";
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
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const CHECK_COLOR             = "#ff0000ff";
const CROSS_COLOR             = "#2b2b2b";
const CIRCLE_BORDER           = "#9ca3af";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  sentence: الجملة مقسمة لـ before/after
//  symbol: "check" ✓ | "cross" ✕  — الرمز المعروض يمين الجملة
//  correct: الإجابة الصحيحة للـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    before:  "There",
    after:   "mangoes in the bowl.",
    symbol:  "cross",
    correct: ["weren't", "were not"],
    answer:  "weren't",
  },
  {
    id:      2,
    src:     img2,
    before:  "There",
    after:   "steak on the plate.",
    symbol:  "check",
    correct: ["was"],
    answer:  "was",
  },
  {
    id:      3,
    src:     img3,
    before:  "There",
    after:   "oranges in the basket.",
    symbol:  "cross",
    correct: ["weren't", "were not"],
    answer:  "weren't",
  },
  {
    id:      4,
    src:     img4,
    before:  "There",
    after:   "cupcakes on the plate.",
    symbol:  "check",
    correct: ["were"],
    answer:  "were",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
;



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadComplete_QD() {
const listening=useExerciseListening("sb_review7_page2_q1");

  const [answers,     setAnswers]     = useState({});
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = ITEMS.map(item=>({key:item.id,correct:Array.isArray(item.correct)?item.correct:[item.correct],answer:item.answer ?? item.correct,label:`Question ${item.id}. ${item.before} blank ${item.after} ${item.symbol==="cross"?"Use a negative sentence.":"Use a positive sentence."}`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  const handleChange = (key, value) => {  if(showAns || results[key] === "correct")return; if(!answerTargets.some(item=>item.key === key))return; setAnswers(prev=>({...prev,[key]:value})); setResults(prev=>{const next={...prev};delete next[key];return next;}); };

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  

  return (
    <div data-adapt-scope="review7&8_Review7_Page2_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review7&8_Review7_Page2_Q1"] input:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review7_Page2_Q1"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 2×2 grid ── */
        .rcd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(28px, 4vw, 56px);
          width: 100%;
          margin : 2% 0 ;
        }

        /* Single card */
        .rcd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        /* num + img row */
        .rcd-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }

        .rcd-img {
          width: clamp(100px, 16vw, 210px);
          height:  clamp(50px, 16vw, 110px);
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }

        /* Sentence + input + symbol row */
        .rcd-sentence-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
              flex-wrap: nowrap;

        }

        .rcd-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .rcd-input-wrap {
          position: relative;
          flex: 0 1 clamp(70px, 9vw, 130px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rcd-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rcd-input:disabled  { opacity: 1; cursor: default; }
        .rcd-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rcd-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        .rcd-input-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(14px, 1.6vw, 17px);
          height: clamp(14px, 1.6vw, 17px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Symbol circle — ✓ or ✕ — fixed يمين */
        .rcd-symbol {
          width: clamp(28px, 3.4vw, 42px);
          height: clamp(28px, 3.4vw, 42px);
          border-radius: 30%;
          border: 2px solid #2195a6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: auto;
          font-size: clamp(14px, 1.9vw, 22px);
          font-weight: 900;
          color: ${CHECK_COLOR};
          user-select: none;
        }

        .rcd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rcd-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read the whole sentence for meaning, then complete each blank with the word or form that fits before checking." isReview sectionLetter="D" title={<>Read and complete.</>} />

        {/* ── 2×2 Grid ── */}
        <div className="rcd-grid">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="rcd-card">

                {/* Num + Image */}
                <div className="rcd-img-row">
                  <span className="rcd-num">{item.id}</span>
                  <img src={item.src} alt={["A bowl of red and yellow fruit.","A steak on a plate.","A basket of bananas.","Three iced cupcakes on a plate."][item.id-1]} className="rcd-img" />
                </div>

                {/* Sentence row */}
                <div className="rcd-sentence-row">
                  {item.before && <span className="rcd-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:clipPage71D1,label:item.before,children:item.before})}</span>}

                  <div className="rcd-input-wrap">
                    <input placeholder="Answer" aria-invalid={results[item.id] === "wrong"} title={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === item.id)?.label || "Write an answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "rcd-input",
                        wrong   ? "rcd-input--wrong"  : "",
                        showAns ? "rcd-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns || results[item.id] === "correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : undefined}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rcd-input-badge">✕</div>}
                  </div>

                  {item.after && <span className="rcd-text">{renderExerciseAudioText({audio:listening,id:`after-${item.id}`,src:[clipPage71D2,clipPage71D3,clipPage71D4,clipPage71D5][item.id-1],label:item.after,children:item.after})}</span>}

                  {/* Symbol circle */}
                  <div className="rcd-symbol">
                    {item.symbol === "check" ? "✓" : "✕"}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rcd-buttons">
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