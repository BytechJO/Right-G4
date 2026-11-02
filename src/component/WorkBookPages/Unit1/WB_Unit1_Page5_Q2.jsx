import clipPage5F6 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_006_do_it_for_us.mp3";
import clipPage5F5 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_005_Of_course,.mp3";
import clipPage5F4 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_004_Yes,_but_they_won't_mind._Robots_don't_get_tired._They're_machines,_afte.mp3";
import clipPage5F3 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_003_How_will_we_learn_We_must_do_our_homework.mp3";
import clipPage5F2 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_002_Robots_will_build_buildings._They_will_drive_fire_trucks.mp3";
import clipPage5F1 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - F/Item_001_Look_at_my_new_robot,_Sarah.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — غيّر المسار حسب مشروعك
// ─────────────────────────────────────────────
import sceneImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/Asset 14.svg";
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
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const BOX_BORDER_COLOR        = "#2096a6";   // بوردر الـ number box
const BOX_BG_COLOR            = "#ffffff";   // خلفية الـ number box
const BOX_TEXT_COLOR          = "#000000";   // لون رقم المستخدم
const BOX_ANSWER_TEXT_COLOR   = "#c81e1e";   // لون الرقم عند Show Answer
const BOX_WRONG_BORDER        = "#ef4444";   // بوردر الـ box عند الخطأ
const BOX_WRONG_BG            = "rgba(239,68,68,0.06)"; // خلفية عند الخطأ

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR  = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجمل

const IMG_BORDER_RADIUS       = "12px";
const IMG_MAX_WIDTH           = "clamp(300px, 55vw, 640px)";
const IMG_HEIGHT              = "clamp(160px, 26vw, 300px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct = الرقم الصح (as string)
// ─────────────────────────────────────────────
const ITEMS = [
  { id: "a", text: "Look at my new robot, Sarah.",                                                       correct: "1" },
  { id: "b", text: "Robots will build buildings. They will drive fire trucks.",                          correct: "4" },
  { id: "c", text: "How will we learn? We must do our homework.",                                        correct: "8" },
  { id: "d", text: "Yes, but they won't mind. Robots don't get tired. They're machines, after all.",    correct: "6" },
  { id: "e", text: "Of course! We won't have to do homework anymore. The robots will do it for us.",    correct: "7" },
  { id: "f", text: "The robots will have a lot of work to do.",                                          correct: "5" },
  { id: "g", text: "Thanks, Sarah. Robots will do many things in the future.",                           correct: "3" },
  { id: "h", text: "Hello, Botboy! I like your robot, Hansel.",                                          correct: "2" },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE — أرقام فقط
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumberMatch_QF() {
const listening=useExerciseListening("wb_unit1_page5_q2");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:[item.correct],answer:item.correct,label:`Conversation sentence ${item.id}. ${item.text} Enter its number from 1 to 8. Use each number once.`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  // 🔒 بعد check أو show answer
  const isLocked=checkDisabled;

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;if(value&&!/^[1-8]$/.test(value))return;if(value&&Object.entries(answers).some(([id,v])=>String(id)!==String(key)&&v===value))return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page5_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page5_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Image centered ── */
        .rnm-img-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .rnm-img-box {
          width: ${IMG_MAX_WIDTH};
          height: ${IMG_HEIGHT};
          border-radius: ${IMG_BORDER_RADIUS};
          overflow: hidden;
        }
        .rnm-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Items list ── */
        .rnm-list {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.2vw, 14px);
          width: 100%;
        }

        /* ── Single row: box | text ── */
        .rnm-row {
          display: grid;
          grid-template-columns: clamp(36px, 4.5vw, 52px) minmax(0, 1fr);
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
          width: 100%;
        }

        /* Number input box */
        .rnm-box-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rnm-box {
          width: clamp(40px, 4.5vw, 40px);
          height: clamp(40px, 4.5vw, 40px);
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: clamp(6px, 0.8vw, 9px);
          background: ${BOX_BG_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          flex-shrink: 0;
        }

        .rnm-box--wrong {
          border-color: ${BOX_WRONG_BORDER};
          background: ${BOX_WRONG_BG};
        }

        .rnm-input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${BOX_TEXT_COLOR};
          text-align: center;
          line-height: 1;
          padding: 0;
          box-sizing: border-box;
          font-family: inherit;
          cursor: text;
        }
        .rnm-input:disabled {
          opacity: 1;
          cursor: default;
        }

        /* ✕ wrong badge */
        .rnm-badge {
          position: absolute;
          top: -8px;
          right: -8px;
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

        /* Sentence text */
        .rnm-text {
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          word-break: break-word;
        }

        /* Buttons */
        .rnm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rnm-row { gap: 8px; }
          .rnm-text { font-size: 14px; }
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
        <ExerciseHeader subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture." sectionLetter="F" title={<>Read and number to match the conversation in the Student's Book.</>} />

        {/* ── Image centered ── */}
        <div className="rnm-img-wrap">
          <div className="rnm-img-box">
            <img src={sceneImg} alt={"A boy holding a toy robot beside a girl."} className="rnm-img" />
          </div>
        </div>

        {/* ── Items ── */}
        <div className="rnm-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? BOX_ANSWER_TEXT_COLOR : BOX_TEXT_COLOR;

            return (
              <div key={item.id} className="rnm-row">

                {/* Number input box */}
                <div className="rnm-box-wrap">
                  <div style={{borderColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":undefined}} className={`rnm-box ${wrong ? "rnm-box--wrong" : ""}`}>
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="#" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      inputMode="numeric"
                      className="rnm-input"
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({
                        color: tColor,
                        cursor: isLocked ? "default" : "text",
                      })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                  {wrong && <div className="rnm-badge">✕</div>}
                </div>

                {/* Sentence */}
                <span className="rnm-text">{item.id!=="e"?renderExerciseAudioText({audio:listening,id:"sentence-"+item.id,src:[clipPage5F1,clipPage5F2,clipPage5F3,clipPage5F4][["a","b","c","d"].indexOf(item.id)],label:item.text,children:item.text}):<>{renderExerciseAudioText({audio:listening,id:"e-before",src:clipPage5F5,label:"Of course!",children:"Of course!"})}{item.text.slice("Of course!".length,item.text.indexOf("do it for us."))}{renderExerciseAudioText({audio:listening,id:"e-after",src:clipPage5F6,label:"do it for us.",children:"do it for us."})}</>}</span>

              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rnm-buttons">
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