import clipPage4D6 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_006_He_will_buy_milk.mp3";
import clipPage4D5 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_005_He_will_make_a_vegetarian_spaghetti_dish.mp3";
import clipPage4D4 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_004_Henry_will_go_to_the_store_next_week.mp3";
import clipPage4D3 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_003_He_won't_buy_fruit_for_dessert.mp3";
import clipPage4D2 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_002_Henry_will_go_to_the_store_near_his_house.mp3";
import clipPage4D1 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - D/Item_001_He_will_buy_juice_to_make_cookies.mp3";
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

function renderExerciseAudioGroup({
  audio,
  id,
  src,
  label,
  children,
  style,
  key: renderKey,
  ...props
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return <div key={renderKey} {...props} style={style}>{children}</div>;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <div key={renderKey} {...props} role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={id} aria-label={label} onKeyDown={keys} onKeyUp={keys} onClick={event => {
    if (event.target.closest('input,select,textarea,button,[role="button"]')) return;
    event.stopPropagation();
    audio.play(id, src);
  }} style={{
    ...style,
    position: style?.position || "relative",
    borderRadius: style?.borderRadius || 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
    backgroundColor: playing ? "#dbeafe" : style?.backgroundColor
  }}>{children}{playing && renderExerciseSpeaker()}</div>;
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



// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const BOX_BORDER_COLOR        = "#2096a6";   // بوردر الـ checkbox
const BOX_BG_EMPTY            = "#ffffff";   // خلفية الـ checkbox الفارغ
const BOX_BG_FILLED           = "#ffffff";   // خلفية الـ checkbox بعد الاختيار

const CHECK_COLOR             = "#c81e1e";   // لون علامة ✓
const CROSS_COLOR             = "#c81e1e";   // لون علامة ✗

const WRONG_BADGE_BG          = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT        = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR     = "#2b2b2b";   // لون نص الجملة
const NUMBER_COLOR            = "#2b2b2b";   // لون الأرقام

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" = ✓  |  "cross" = ✗
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "He will buy juice to make cookies.",          correct: "check" },
  { id: 2, text: "Henry will go to the store near his house.",  correct: "check" },
  { id: 3, text: "He won't buy fruit for dessert.",             correct: "cross" },
  { id: 4, text: "Henry will go to the store next week.",       correct: "cross" },
  { id: 5, text: "He will make a vegetarian spaghetti dish.",   correct: "check" },
  { id: 6, text: "He will buy milk.",                           correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadExerciseC_WriteCheckX_QD() {
const listening=useExerciseListening("wb_unit1_page4_q2");

  const [answers,     setAnswers]     = useState({});   // { [id]: "check" | "cross" }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  // 🔒 بعد check أو show answer
  const isLocked = checkDisabled;

  // ── handlers ──────────────────────────────
  // الطالب يختار check أو cross مباشرة
  const handleSelect = (id,value) => {if(showAns || results[id] === "correct")return;setAnswers(prev=>({...prev,[id]:value}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>answers[item.id] !== undefined && answers[item.id] !== null && answers[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || answers[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(ITEMS.map(i=>[i.id,i.correct])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Selections cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  // ── render two boxes ─────────────────────
  const renderBoxes = (item) => {
    const val   = answers[item.id];
    const wrong = isWrong(item);

    const renderSingleBox = (type) => {
      const selected    = val === type;
      const isThisWrong = wrong && selected; // الغلط على المربع المختار فقط

      return (
        <div className="wdc-single-wrap">
          <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.text} Choose ${type}.`} aria-pressed={answers[item.id] === type} aria-disabled={showAns || results[item.id] === "correct"}
            className={`wdc-box
              ${selected    ? "wdc-box--selected" : ""}
              ${isThisWrong ? "wdc-box--wrong"    : ""}
            `}
            onClick={() => handleSelect(item.id, type)}
            style={(base=>({...base,borderColor:answers[item.id]===type?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderColor):base.borderColor}))((base=>({...base,borderRadius:8,background:answers[item.id]===type&&!showAns&&results[item.id]===undefined?"#dbeafe":base.background,boxShadow:answers[item.id]===type?`inset 0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"}`:undefined}))({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:({ cursor: isLocked ? "default" : "pointer" }).borderRadius || "6px",background:answers[item.id] === type && !showAns && results[item.id] === undefined ? "#dbeafe" : ({ cursor: isLocked ? "default" : "pointer" }).background,boxShadow:answers[item.id] === type ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}))}
          >
            {/* ✓ */}
            {type === "check" && selected && (
              <svg viewBox="0 0 24 24" className="wdc-icon" fill="none">
                <polyline
                  points="4,13 9,18 20,6"
                  stroke={isThisWrong ? "#ef4444" : CHECK_COLOR}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* ✗ */}
            {type === "cross" && selected && (
              <svg viewBox="0 0 24 24" className="wdc-icon" fill="none">
                <line x1="5" y1="5" x2="19" y2="19"
                  stroke={isThisWrong ? "#ef4444" : CROSS_COLOR}
                  strokeWidth="3.2" strokeLinecap="round"/>
                <line x1="19" y1="5" x2="5" y2="19"
                  stroke={isThisWrong ? "#ef4444" : CROSS_COLOR}
                  strokeWidth="3.2" strokeLinecap="round"/>
              </svg>
            )}
          </div>

          {/* badge على المربع المختار الغلط فقط */}
          {isThisWrong && <div className="wdc-badge">✕</div>}
        </div>
      );
    };

    return (
      <div className="wdc-boxes-wrap">
        {renderSingleBox("check")}
        {renderSingleBox("cross")}
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page4_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page4_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .wdc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
              margin: 5% 0;
        }

        /* ── Row: num | text | box ── */
        .wdc-row {
          display: grid;
          grid-template-columns:
            clamp(18px, 2.2vw, 28px)        /* number */
            minmax(0, 1fr)                   /* sentence */
            auto;                            /* two boxes */
          gap: clamp(10px, 1.6vw, 20px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .wdc-num {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${NUMBER_COLOR};
          line-height: 1.5;
        }

        /* Sentence */
        .wdc-text {
font-size: clamp(15px, 1.9vw, 20px);          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.4;
        }

        /* Two boxes wrapper */
        .wdc-boxes-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          justify-self: end;
        }

        /* Wrapper for each single box — needed for badge positioning */
        .wdc-single-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Single box */
        .wdc-box {
          width: clamp(40px, 5vw, 40px);
          height: clamp(40px, 5vw, 40px);
          border: 2px solid ${BOX_BORDER_COLOR};
          border-radius: clamp(6px, 0.8vw, 10px);
          background: ${BOX_BG_EMPTY};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s ease, background 0.15s ease;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .wdc-box--selected {
          border-color: ${BOX_BORDER_COLOR};
        }

        .wdc-box--wrong {
          border-color: #ef4444;
          background: rgba(239,68,68,0.06);
        }

        /* SVG icon inside box */
        .wdc-icon {
          width: 65%;
          height: 65%;
          display: block;
        }

        /* ✕ wrong badge */
        .wdc-badge {
          position: absolute;
          top: -8px;
          right: -10px;
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
        .wdc-buttons {
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
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="D" title={<>Read Exercise C. Write{" "}
          <span style={{ color: CHECK_COLOR }}>✓</span> or{" "}
          <span style={{ color: CROSS_COLOR }}>✗</span>.</>} />

        {/* ── Items ── */}
        <div className="wdc-list">
          {ITEMS.map((item) => (
            renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage4D1,clipPage4D2,clipPage4D3,clipPage4D4,clipPage4D5,clipPage4D6][item.id-1],label:item.text,className:"wdc-row",style:undefined,key:item.id,children:<>

              {/* Number */}
              <span className="wdc-num">{item.id}</span>

              {/* Sentence */}
              <span className="wdc-text">{item.text}</span>

              {/* Checkbox */}
              {renderBoxes(item)}

            </>})
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="wdc-buttons">
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