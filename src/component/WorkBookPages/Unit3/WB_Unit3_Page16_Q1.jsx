import clipPage16B4 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - B/Item_004_d_l_c_s.mp3";
import clipPage16B3 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - B/Item_003_b_th.mp3";
import clipPage16B2 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - B/Item_002_w_er.mp3";
import clipPage16B1 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - B/Item_001_ye_e_d.mp3";
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
      { type: "fixed", text: "ye" },
      { type: "blank", id: "1-1" },
      { type: "blank", id: "1-2" },
      { type: "fixed", text: "e" },
      { type: "blank", id: "1-3" },
      { type: "fixed", text: "d" },
      { type: "blank", id: "1-4" },
      { type: "blank", id: "1-5" },
    ],
    blanks: { "1-1": "s", "1-2": "t", "1-3": "r", "1-4": "a", "1-5": "y" },
    word: "yesterday",
  },
  {
    id: 2,
    parts: [
      { type: "fixed", text: "w" },
      { type: "blank", id: "2-1" },
      { type: "blank", id: "2-2" },
      { type: "blank", id: "2-3" },
      { type: "fixed", text: "er" },
      { type: "blank", id: "2-4" },
      { type: "blank", id: "2-5" },
      { type: "blank", id: "2-6" },
    ],
    blanks: { "2-1": "o", "2-2": "n", "2-3": "d", "2-4": "f", "2-5": "u", "2-6": "l" },
    word: "wonderful",
  },
  {
    id: 3,
    parts: [
      { type: "fixed", text: "b" },
      { type: "blank", id: "3-1" },
      { type: "blank", id: "3-2" },
      { type: "fixed", text: "th" },
      { type: "blank", id: "3-3" },
      { type: "blank", id: "3-4" },
      { type: "blank", id: "3-5" },
    ],
    blanks: { "3-1": "i", "3-2": "r", "3-3": "d", "3-4": "a", "3-5": "y" },
    word: "birthday",
  },
  {
    id: 4,
    parts: [
      { type: "fixed", text: "d" },
      { type: "blank", id: "4-1" },
      { type: "fixed", text: "l" },
      { type: "blank", id: "4-2" },
      { type: "fixed", text: "c" },
      { type: "blank", id: "4-3" },
      { type: "blank", id: "4-4" },
      { type: "blank", id: "4-5" },
      { type: "fixed", text: "s" },
    ],
    blanks: { "4-1": "e", "4-2": "i", "4-3": "i", "4-4": "o", "4-5": "u" },
    word: "delicious",
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
const listening=useExerciseListening("wb_unit3_page16_q1");

  const [inputs,      setInputs]      = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const checkDisabled=showAns||ITEMS.every(item=>results[item.id]==="correct");const itemFor=id=>ITEMS.find(item=>Object.hasOwn(item.blanks,id));const fieldLocked=id=>showAns||results[itemFor(id)?.id]==="correct";const moveField=(id,step)=>{let at=ALL_BLANK_IDS.indexOf(id)+step;while(at>=0&&at<ALL_BLANK_IDS.length){const next=ALL_BLANK_IDS[at];if(!fieldLocked(next)){inputRefs.current[next]?.focus();return;}at+=step;}};

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
      renderExerciseAudioGroup({audio:listening,id:`clue-${item.id}`,src:[clipPage16B1,clipPage16B2,clipPage16B3,clipPage16B4][item.id-1],label:`Item ${item.id}. Listen to the printed letters.`,className:"ml-item",style:undefined,key:item.id,children:<>
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
    <div data-adapt-scope="Unit3_WB_Unit3_Page16_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page16_Q1"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .ml-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.8vw, 22px) clamp(20px, 3vw, 48px);
          align-items: center;
        }
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
          font-size: clamp(25px, 1.6vw, 25px);
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
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
        }

        .ml-fixed {
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
          white-space: pre;
        }

        .ml-input {
          width: clamp(20px, 2.4vw, 30px);
          border: none;
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          background: transparent;
          outline: none;
          text-align: center;
          font-size: clamp(25px, 1.9vw, 25px);
          color: #2b2b2b;
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
        <ExerciseHeader subTitle="Say the word or expression aloud, use the visible letters as clues, then fill in only the missing letters." sectionLetter="B" title={<>Write the missing letters.</>} />

        <div className="ml-grid" style={{ marginTop: "20%" }}>
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