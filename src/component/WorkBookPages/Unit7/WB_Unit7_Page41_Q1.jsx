import clipPage41E9 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_009_What_was_there_for_dessert.mp3";
import clipPage41E8 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_008_What_was_there_for_dinner.mp3";
import clipPage41E7 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_007_What_was_there_for_breakfast.mp3";
import clipPage41E6 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_006_especially_for_me._I_wish_I_could_stay_with_Grandma_and_Grandpa_forever.mp3";
import clipPage41E5 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_005_was_beef_and_potato_soup._For_dessert,_there_were_apples_and_grapes._The.mp3";
import clipPage41E4 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_004_lots_of_little_chicks_running_around._Then,_I_helped_Grandpa_stack_the_b.mp3";
import clipPage41E3 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_003_toast_with_butter,_and_spicy_beef_sausages._After_breakfast,_I_went_to_h.mp3";
import clipPage41E2 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_002_much_to_do_and_my_grandma_is_a_wonderful_cook._There_was_a_delicious_bre.mp3";
import clipPage41E1 from "../../../assets/audio/WorkBook/Unit 7/Page 41 - E/Item_001_Yesterday,_I_went_to_visit_my_grandpa_and_my_grandma_on_their_farm_in_th.mp3";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_COLOR          = "#2b2b2b";
const PARAGRAPH_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Yesterday, I went to visit my grandpa and my grandma on their farm in the country. I love visiting the farm because there is so much to do and my grandma is a wonderful cook. There was a delicious breakfast waiting for me in the kitchen. There were eggs, toast with butter, and spicy beef sausages. After breakfast, I went to help Grandpa milk the cows and feed the chickens. There were lots of little chicks running around. Then, I helped Grandpa stack the bales of hay. We went back inside the house for dinner. There was beef and potato soup. For dessert, there were apples and grapes. There was even banana bread that my grandma had made especially for me. I wish I could stay with Grandma and Grandpa forever on their farm!`;
const PARAGRAPH_PARTS=PARAGRAPH.split(/(?=much to do|toast with butter|lots of little chicks|was beef and potato soup|especially for me)/);


const ITEMS = [
  {
    id:       1,
    question: "What was there for breakfast?",
    correct:  [
      "There were eggs, toast with butter, and spicy beef sausages.",
      "There were eggs, toast with butter, and spicy beef sausages",
      "there were eggs toast with butter and spicy beef sausages",
    ],
    answer:   "There were eggs, toast with butter, and spicy beef sausages.",
  },
  {
    id:       2,
    question: "What was there for dinner?",
    correct:  [
      "There was beef and potato soup.",
      "There was beef and potato soup",

    ],
    answer:   "There was beef and potato soup.",
  },
  {
    id:       3,
    question: "What was there for dessert?",
    correct:  [
      "For dessert, there were apples and grapes. There was banana bread that grandma had especially made.",
    ],
    answer:   "For dessert, there were apples and grapes. There was banana bread that grandma had especially made.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QE() {
const listening=useExerciseListening("wb_unit7_page41_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Answer ${item.id}. ${item.question} Use the paragraph above.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

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
    <div data-adapt-scope="Unit7_WB_Unit7_Page41_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page41_Q1"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page41_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Paragraph ── */
        .rwe-para {
          font-size: clamp(13px, 1.5vw, 15px);
          color: ${PARAGRAPH_COLOR};
          line-height: 1.8;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .rwe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 28px);
          width: 100%;
        }

        /* ── Single item ── */
        .rwe-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Question row: num + question */
        .rwe-question-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rwe-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-bottom: 4px;
        }

        .rwe-question {
          font-size: clamp(14px, 1.7vw, 18px);
          font-weight: 400;
          color: ${QUESTION_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1;
        }

        /* Input wrap — full width below question */
        .rwe-input-wrap {
          position: relative;
          width: 100%;
        }

        .rwe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};

          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwe-input:disabled   { opacity: 1; cursor: default; }
        .rwe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwe-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwe-badge {
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
        .rwe-buttons {
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="E" title={<>Read and write.</>} />

        {/* ── Paragraph ── */}
        <p className="rwe-para">{PARAGRAPH_PARTS.map((part,index)=><React.Fragment key={index}>{renderExerciseAudioText({audio:listening,id:`paragraph-${index+1}`,src:[clipPage41E1,clipPage41E2,clipPage41E3,clipPage41E4,clipPage41E5,clipPage41E6][index],label:`Listen to paragraph part ${index+1}: ${part.trim()}`,children:part})}</React.Fragment>)}</p>

        {/* ── Items ── */}
        <div className="rwe-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            const inputClass = [
              "rwe-input",
              wrong   ? "rwe-input--wrong"  : "",
              showAns ? "rwe-input--answer" : "",
            ].filter(Boolean).join(" ");

            return (
              <div key={item.id} className="rwe-item">

                {/* Question row */}
                <div className="rwe-question-row">
                  <span className="rwe-num">{item.id}</span>
                  <span className="rwe-question">{renderExerciseAudioText({audio:listening,id:`question-${item.id}`,src:[clipPage41E7,clipPage41E8,clipPage41E9][item.id-1],label:item.question,children:item.question})}</span>
                </div>

                {/* Input below question */}
                <div className="rwe-input-wrap">
                  <input aria-invalid={results[item.id]==="wrong"} placeholder="Your sentence" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                    type="text"
                    className={inputClass}
                    value={value}
                    disabled={showAns||results[item.id]==="correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwe-badge">✕</div>}
                </div>


              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwe-buttons">
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