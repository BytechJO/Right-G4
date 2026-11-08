import clipPage11F12 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_012_ap.mp3";
import clipPage11F11 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_011_S_h_s_!.mp3";
import clipPage11F10 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_010_v_s_t.mp3";
import clipPage11F9 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_009_w_ab_yo.mp3";
import clipPage11F8 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_008_ee.mp3";
import clipPage11F7 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_007_c_n'_be_y_i_!.mp3";
import clipPage11F6 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_006_I_k.mp3";
import clipPage11F5 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_005_I_am.mp3";
import clipPage11F4 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_004_e_ve.mp3";
import clipPage11F3 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_003_mm.mp3";
import clipPage11F2 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_002_k_g_r_s.mp3";
import clipPage11F1 from "../../../assets/audio/WorkBook/Unit 2/Page 11 - F/Item_001_p_c_u.mp3";
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
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { type: "fixed", text: "p" },
      { type: "blank", id: "1-1" },
      { type: "fixed", text: "c" },
      { type: "blank", id: "1-2" },
      { type: "fixed", text: "u" },
      { type: "blank", id: "1-3" },
      { type: "blank", id: "1-4" },
    ],
    blanks: { "1-1": "i", "1-2": "t", "1-3": "r", "1-4": "e" },
    word: "picture",
  },
  {
    id: 2,
    parts: [
      { type: "fixed", text: "k" },
      { type: "blank", id: "2-1" },
      { type: "blank", id: "2-2" },
      { type: "fixed", text: "g" },
      { type: "blank", id: "2-3" },
      { type: "fixed", text: "r" },
      { type: "blank", id: "2-4" },
      { type: "blank", id: "2-5" },
      { type: "fixed", text: "s" },
    ],
    blanks: { "2-1": "a", "2-2": "n", "2-3": "a", "2-4": "o", "2-5": "o" },
    word: "kangaroos",
  },
  {
    id: 3,
    parts: [
      { type: "blank", id: "3-1" },
      { type: "blank", id: "3-2" },
      { type: "fixed", text: "mm" },
      { type: "blank", id: "3-3" },
      { type: "blank", id: "3-4" },
    ],
    blanks: { "3-1": "s", "3-2": "u", "3-3": "e", "3-4": "r" },
    word: "summer",
  },
  {
    id: 4,
    parts: [
      { type: "blank", id: "4-1" },
      { type: "fixed", text: "e" },
      { type: "blank", id: "4-2" },
      { type: "blank", id: "4-3" },
      { type: "blank", id: "4-4" },
      { type: "fixed", text: "ve" },
    ],
    blanks: { "4-1": "b", "4-2": "l", "4-3": "i", "4-4": "e" },
    word: "believe",
  },
  {
    id: 5,
    prefix: "I ",
    suffix: " am.",
    parts: [
      { type: "blank", id: "5-1" },
      { type: "blank", id: "5-2" },
      { type: "blank", id: "5-3" },
      { type: "blank", id: "5-4" },
    ],
    blanks: { "5-1": "s", "5-2": "u", "5-3": "r", "5-4": "e" },
    word: "sure",
  },
  {
    id: 6,
    prefix: "I k",
    suffix: ".",
    parts: [
      { type: "blank", id: "6-1" },
      { type: "blank", id: "6-2" },
      { type: "blank", id: "6-3" },
    ],
    blanks: { "6-1": "n", "6-2": "o", "6-3": "w" },
    word: "know",
  },
  {
    id: 7,
    parts: [
      { type: "blank", id: "7-1" },
      { type: "fixed", text: " c" },
      { type: "blank", id: "7-2" },
      { type: "fixed", text: "n'" },
      { type: "blank", id: "7-3" },
      { type: "fixed", text: " be" },
      { type: "blank", id: "7-4" },
      { type: "blank", id: "7-5" },
      { type: "blank", id: "7-6" },
      { type: "fixed", text: "v" },
      { type: "blank", id: "7-7" },
      { type: "fixed", text: " i" },
      { type: "blank", id: "7-8" },
      { type: "fixed", text: "!" },
    ],
    blanks: { "7-1": "I", "7-2": "a", "7-3": "t", "7-4": "l", "7-5": "i", "7-6": "e", "7-7": "e", "7-8": "t" },
    word: "I can't believe it",
  },
  {
    id: 8,
    parts: [
      { type: "blank", id: "8-1" },
      { type: "fixed", text: "ee" },
      { type: "blank", id: "8-2" },
    ],
    blanks: { "8-1": "w", "8-2": "k" },
    word: "week",
  },
  {
    id: 9,
    parts: [
      { type: "blank", id: "9-1" },
      { type: "blank", id: "9-2" },
      { type: "fixed", text: "w ab" },
      { type: "blank", id: "9-3" },
      { type: "blank", id: "9-4" },
      { type: "blank", id: "9-5" },
      { type: "fixed", text: " yo" },
      { type: "blank", id: "9-6" },
      { type: "fixed", text: "?" },
    ],
    blanks: { "9-1": "H", "9-2": "o", "9-3": "o", "9-4": "u", "9-5": "t", "9-6": "u" },
    word: "How about you?",
  },
  {
    id: 10,
    parts: [
      { type: "fixed", text: "v" },
      { type: "blank", id: "10-1" },
      { type: "fixed", text: "s" },
      { type: "blank", id: "10-2" },
      { type: "fixed", text: "t" },
    ],
    blanks: { "10-1": "i", "10-2": "i" },
    word: "visit",
  },
  {
    id: 11,
    parts: [
      { type: "fixed", text: "S" },
      { type: "blank", id: "11-1" },
      { type: "blank", id: "11-2" },
      { type: "fixed", text: " " },
      { type: "blank", id: "11-3" },
      { type: "fixed", text: "h" },
      { type: "blank", id: "11-4" },
      { type: "blank", id: "11-5" },
      { type: "fixed", text: "s" },
      { type: "blank", id: "11-6" },
      { type: "fixed", text: "!" },
    ],
    blanks: { "11-1": "a", "11-2": "y", "11-3": "c", "11-4": "e", "11-5": "e", "11-6": "e" },
    word: "Say cheese",
  },
  {
    id: 12,
    parts: [
      { type: "blank", id: "12-1" },
      { type: "fixed", text: "ap" },
      { type: "blank", id: "12-2" },
      { type: "blank", id: "12-3" },
    ],
    blanks: { "12-1": "J", "12-2": "a", "12-3": "n" },
    word: "Japan",
  },
];

// ── قائمة مرتبة بكل الـ blank IDs ──
const ALL_BLANK_IDS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.type === "blank").map((p) => p.id)
);

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const isItemCorrect = (item, inputs) =>
  Object.entries(item.blanks).every(
    ([id, answer]) =>
      (inputs[id] || "").toLowerCase().trim() === answer.toLowerCase()
  );

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_MissingLetters_F() {
const listening=useExerciseListening("wb_unit2_page11_q2");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const checkDisabled=showAns||ITEMS.every(item=>results[item.id]==="correct");const itemFor=id=>ITEMS.find(item=>Object.hasOwn(item.blanks,id));const fieldLocked=id=>showAns||results[itemFor(id)?.id]==="correct";const moveField=(id,step)=>{let at=ALL_BLANK_IDS.indexOf(id)+step;while(at>=0&&at<ALL_BLANK_IDS.length){const next=ALL_BLANK_IDS[at];if(!fieldLocked(next)){inputRefs.current[next]?.focus();return;}at+=step;}};

  // ref لكل input باستخدام الـ id
  const inputRefs = useRef({});

  

  // ── handlers ──────────────────────────────
  const handleChange=(id,value)=>{if(fieldLocked(id))return;const val=value.slice(-1);if(val&&!/^[a-z]$/i.test(val))return;setInputs(prev=>({...prev,[id]:val}));setResults(prev=>{const next={...prev};delete next[itemFor(id).id];return next;});if(val)moveField(id,1);};

  const handleKeyDown=(id,event)=>{if(event.key==="Tab")return;event.stopPropagation();if(["ArrowLeft","ArrowRight","Enter"," "].includes(event.key)){event.preventDefault();if(!event.repeat)moveField(id,event.key==="ArrowLeft"?-1:1);}else if(event.key==="Backspace"&&!inputs[id]&&!fieldLocked(id)){event.preventDefault();moveField(id,-1);}};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!ALL_BLANK_IDS.every(id=>inputs[id]?.trim())){ValidationAlert.info("Please fill in all the blanks first.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id]==="correct"||isItemCorrect(item,inputs)?"correct":"wrong"])),score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct words are locked.`);if(score===ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ITEMS.forEach((item) => {
      Object.entries(item.blanks).forEach(([id, letter]) => { ans[id] = letter; });
    });
    setInputs(ans);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct words shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setInputs({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Letters and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isItemWrong=item=>!showAns&&results[item.id]==="wrong";

  // ── render one item ───────────────────────
  const renderItem = (item) => {
    const wrong = isItemWrong(item);
    return (
      renderExerciseAudioGroup({audio:listening,id:`clue-${item.id}`,src:[clipPage11F1,clipPage11F2,clipPage11F3,clipPage11F4,clipPage11F5,clipPage11F6,clipPage11F7,clipPage11F8,clipPage11F9,clipPage11F10,clipPage11F11,clipPage11F12][item.id-1],label:`Item ${item.id}. Listen to the printed letter clue.`,className:"ml-item",style:undefined,key:item.id,children:<>
        <span className="ml-num">{item.id}</span>

        <span className="ml-word-wrap">
          {item.prefix && <span className="ml-fixed">{item.prefix}</span>}
          {item.parts.map((part, i) => {
            if (part.type === "fixed") {
              return <span key={i} className="ml-fixed">{part.text}</span>;
            }
            const val   = inputs[part.id] || "";
            const isAns = showAns;
            return (
              <input aria-label={`Item ${item.id}, missing letter ${part.id.split("-")[1]}. Use the printed letters as clues.`} title={`Item ${item.id}, missing letter ${part.id.split("-")[1]}`} aria-invalid={wrong} onKeyUp={event=>{if(event.key!=="Tab")event.stopPropagation();}} style={{borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":wrong?"#ef4444":undefined}}
                key={i}
                ref={(el) => { inputRefs.current[part.id] = el; }}
                type="text"
                maxLength={1}
                className={[
                  "ml-input",
                  wrong ? "ml-input--wrong"  : "",
                  isAns ? "ml-input--answer" : "",
                ].filter(Boolean).join(" ")}
                value={val}
                disabled={fieldLocked(part.id)}
                onChange={(e) => handleChange(part.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(part.id, e)}
                spellCheck={false}
                autoComplete="off"
              />
            );
          })}
          {item.suffix && <span className="ml-fixed">{item.suffix}</span>}
        </span>

        {wrong && <span className="ml-badge">✕</span>}
      </>})
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page11_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page11_Q2"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page11_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .ml-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.8vw, 30px) clamp(60px, 3vw, 60px);
          align-items: center;
 margin: 5% 0%;         }
        @media (max-width: 600px) {
          .ml-grid { grid-template-columns: 1fr; }
        }

        .ml-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          position: relative;
        }

        .ml-num {
          font-size: clamp(14px, 1.6vw, 19px);
          font-weight: 700;
          color: #2b2b2b;
          min-width: 20px;
          flex-shrink: 0;
        }

        .ml-word-wrap {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 0;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.8;
        }

        .ml-fixed {
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
          white-space: pre;
        }

        .ml-input {
          width: clamp(20px, 2.4vw, 30px);
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          text-align: center;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          line-height: 1.5;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ml-input:disabled      { opacity: 1; cursor: default; }
        .ml-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .ml-input--answer       { color: ${INPUT_ANSWER_COLOR}; }

        .ml-badge {
          width: clamp(16px, 1.8vw, 21px);
          height: clamp(16px, 1.8vw, 21px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
          margin-left: 4px;
        }

        .ml-buttons {
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
        <ExerciseHeader subTitle="Say the word or expression aloud, use the visible letters as clues, then fill in only the missing letters." sectionLetter="F" title={<>Write the missing letters.</>} />

        <div className="ml-grid">
          {ITEMS.filter((_, i) => i % 2 === 0).map((item, rowIdx) => {
            const rightItem = ITEMS[rowIdx * 2 + 1];
            return (
              <React.Fragment key={item.id}>
                {renderItem(item)}
                {rightItem ? renderItem(rightItem) : <div />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="ml-buttons">
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