import clipPage42G3 from "../../../assets/audio/WorkBook/Unit 7/Page 42 - G/Item_003_soup.mp3";
import clipPage42G2 from "../../../assets/audio/WorkBook/Unit 7/Page 42 - G/Item_002_cupcakes.mp3";
import clipPage42G1 from "../../../assets/audio/WorkBook/Unit 7/Page 42 - G/Item_001_fruits.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 42/SVG/Asset 4.svg";
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
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    src:     img1,
    before:  "",
    after:   "",
    // السؤال الأول كامل — الطالب يكتب الجملة كاملة
    correct: ["Were there any apples?", "were there any apples"],
    answer:  "Were there any apples?",
  },
  {
    id:      2,
    src:     img2,
    before:  "",
    after:   "fruits?",
    correct: ["Were there any", "were there any"],
    answer:  "Were there any",
  },
  {
    id:      3,
    src:     img3,
    before:  "",
    after:   "cupcakes?",
    correct: ["Were there any", "were there any"],
    answer:  "Were there any",
  },
  {
    id:      4,
    src:     img4,
    before:  "",
    after:   "soup?",
    correct: ["Was there any", "was there any"],
    answer:  "Was there any",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QG() {
const listening=useExerciseListening("wb_unit7_page42_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Picture ${item.id}. ${item.id===1?"Write the whole question.":"Complete the question ending "+item.after}`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit7_WB_Unit7_Page42_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page42_Q1"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page42_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page42_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page42_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lrwg-list {
          display: flex;
          flex-direction: column;
          width: 100%;
    margin: 8% 0;
    gap : 20px ;
        }

        /* ── Single row: num | img | before + input + after ── */
        .lrwg-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrwg-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 22px);
        }

        .lrwg-img {
              height: auto;
    width: 10%;
    display: block;
    flex-shrink: 0;

        }

        /* Sentence part: before + input + after */
        .lrwg-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          min-width: 0;
        }

        .lrwg-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
        }

        /* Input wrap */
        .lrwg-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(100px, 14vw, 200px);
        }

        .lrwg-input {
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
        .lrwg-input:disabled   { opacity: 1; cursor: default; }
        .lrwg-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrwg-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwg-badge {
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
        .lrwg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrwg-sentence { flex-wrap: wrap; }
          .lrwg-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="G" title={<>Look, read, and write.</>} />

        {/* ── Items ── */}
        <div className="lrwg-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={item.id} className="lrwg-row">

                {/* Number */}
                <span className="lrwg-num">{item.id}</span>

                {/* Image */}
                <img src={item.src} alt={["A bowl of apples.","Assorted fruit including a banana, apples and plums.","Four cupcakes.","A bowl of soup with a spoon."][item.id-1]} className="lrwg-img" />

                {/* Sentence */}
                <div className="lrwg-sentence">
                  {item.before && <span className="lrwg-text">{item.before}</span>}

                  <div className="lrwg-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "lrwg-input",
                        wrong   ? "lrwg-input--wrong"  : "",
                        showAns ? "lrwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrwg-badge">✕</div>}
                  </div>

                  {item.after && <span className="lrwg-text">{renderExerciseAudioText({audio:listening,id:`clue-${item.id}`,src:[clipPage42G1,clipPage42G2,clipPage42G3][item.id-2],label:item.after,children:item.after})}</span>}
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwg-buttons">
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