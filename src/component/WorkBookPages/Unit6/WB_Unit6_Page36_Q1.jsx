import clipPage36G5 from "../../../assets/audio/WorkBook/Unit 6/Page 36 - G/Item_005_You_should_play_a_computer_game.mp3";
import clipPage36G4 from "../../../assets/audio/WorkBook/Unit 6/Page 36 - G/Item_004_You_should_study_hard.mp3";
import clipPage36G3 from "../../../assets/audio/WorkBook/Unit 6/Page 36 - G/Item_003_You_should_ask_questions_if_you_don't_understand.mp3";
import clipPage36G2 from "../../../assets/audio/WorkBook/Unit 6/Page 36 - G/Item_002_You_should_go_swimming.mp3";
import clipPage36G1 from "../../../assets/audio/WorkBook/Unit 6/Page 36 - G/Item_001_I_have_a_test_tomorrow._What_should_I_do.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 34.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 35.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 36.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 36/SVG/Asset 37.svg";
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
const BORDER_COLOR   = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const CONTEXT = "I have a test tomorrow. What should I do?";

const ITEMS = [
  { id: 1, imageSrc: img1, sentence: "You should go swimming.",                          correct: "✗" },
  { id: 2, imageSrc: img2, sentence: "You should ask questions if you don't understand.", correct: "✓" },
  { id: 3, imageSrc: img3, sentence: "You should study hard.",                           correct: "✓" },
  { id: 4, imageSrc: img4, sentence: "You should play a computer game.",                 correct: "✗" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckX_QG() {
const listening=useExerciseListening("wb_unit6_page36_q1");

  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  
  // ── handlers ──────────────────────────────
  const handleSelect = (id,value) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:value}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ITEMS.forEach((item) => { ans[item.id] = item.correct; });
    setSelected(ans);
    setShowResults(false);
    setShowAns(true);
 setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setSelected({});
    setShowResults(false);
    setShowAns(false);
 setResults({});setAnnouncement("Selections and feedback cleared.");
  };

  // ── helpers ───────────────────────────────
  const isWrong = (item) => {
    if (!showResults || showAns) return false;
    return selected[item.id] !== item.correct;
  };

  // ── render one sentence row ───────────────
  const renderRow = (item) => {
    const wrong      = isWrong(item);
    const selCheck   = selected[item.id] === "✓";
    const selCross   = selected[item.id] === "✗";
    const ansCheck   = showAns && item.correct === "✓";
    const ansCross   = showAns && item.correct === "✗";

    const checkActive = selCheck || ansCheck;
    const crossActive = selCross || ansCross;
    const checkWrong  = wrong && selCheck;
    const crossWrong  = wrong && selCross;

    return (
      renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage36G2,clipPage36G3,clipPage36G4,clipPage36G5][item.id-1],label:item.id+". "+item.sentence,className:"lrwx-row",style:undefined,key:item.id,children:<>

        {/* Two boxes */}
        <div className="lrwx-boxes">

          {/* ✓ box */}
          <div className="lrwx-box-wrap">
            <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.sentence} Choose tick.`} aria-pressed={selected[item.id] === "✓"} aria-disabled={showAns || results[item.id] === "correct"}
              className={[
                "lrwx-box",
                checkActive ? "lrwx-box--check-active" : "lrwx-box--idle",
                checkWrong  ? "lrwx-box--wrong"        : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleSelect(item.id, "✓")}
              style={{borderRadius:8,background:"#fff",color:"#000",cursor:showAns||results[item.id]==="correct"?"default":"pointer",borderColor:selected[item.id]==="✓"?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"):BORDER_COLOR}}
            >
              {checkActive && <span className="lrwx-symbol">✓</span>}
            </div>
            {checkWrong && <div className="lrwx-badge">✕</div>}
          </div>

          {/* ✗ box */}
          <div className="lrwx-box-wrap">
            <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.sentence} Choose cross.`} aria-pressed={selected[item.id] === "✗"} aria-disabled={showAns || results[item.id] === "correct"}
              className={[
                "lrwx-box",
                crossActive ? "lrwx-box--cross-active" : "lrwx-box--idle",
                crossWrong  ? "lrwx-box--wrong"        : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleSelect(item.id, "✗")}
              style={{borderRadius:8,background:"#fff",color:"#000",cursor:showAns||results[item.id]==="correct"?"default":"pointer",borderColor:selected[item.id]==="✗"?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"):BORDER_COLOR}}
            >
              {crossActive && <span className="lrwx-symbol">✗</span>}
            </div>
            {crossWrong && <div className="lrwx-badge">✕</div>}
          </div>

        </div>

        {/* Number + Sentence */}
        <span className="lrwx-num">{item.id}</span>
        <span className="lrwx-sentence">{item.sentence}</span>

      </>})
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit6_WB_Unit6_Page36_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit6_WB_Unit6_Page36_Q1"] input:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page36_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page36_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page36_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`

        /* ── Sentence rows list ── */
        .lrwx-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* ── Single sentence row ── */
        .lrwx-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        /* Two boxes side by side */
        .lrwx-boxes {
          display: flex;
          gap: clamp(6px, 0.8vw, 10px);
          flex-shrink: 0;
        }

        /* Box wrap for badge */
        .lrwx-box-wrap {
          position: relative;
        }

        /* Box base */
        .lrwx-box {
          width: clamp(40px, 3.8vw, 40px);
          height: clamp(40px, 3.8vw, 40px);
          border-radius: 8px;
          border: 2px solid ${BORDER_COLOR};
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          user-select: none;
        }

        .lrwx-box--idle          { background: #fff; }
        .lrwx-box--check-active  { background: #fff; }
        .lrwx-box--cross-active  { background: #fff; }
        .lrwx-box--wrong         { border-color: ${WRONG_BADGE_BG} !important; }

        /* Symbol inside box */
        .lrwx-symbol {
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 700;
          color: #000;
          line-height: 1;
        }

        /* ✕ wrong badge */
        .lrwx-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Number */
        .lrwx-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }

        /* Sentence */
        .lrwx-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          line-height: 1.5;
          flex: 1;
        }

        /* Context question */
        .lrwx-context {
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          margin: 0;
          line-height: 1.5;
        }

        /* ── Images row (4 columns) ── */
        .lrwx-imgs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
        }
        @media (max-width: 600px) {
          .lrwx-imgs { grid-template-columns: repeat(2, 1fr); }
        }

        .lrwx-img-wrap {
          overflow: hidden;
        }
        .lrwx-img {
        height : auto ; 
          width: 100%;
          aspect-ratio: 4 / 3;
          display: block;
        }

        /* Buttons */
        .lrwx-buttons {
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="G" title={<>Read and write{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✓</span>
          {" "}and{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✗</span>.</>} />

        {/* ── Context question ── */}
        {renderExerciseAudioGroup({audio:listening,id:"context",src:clipPage36G1,label:CONTEXT,className:"lrwx-context",style:undefined,key:"context",children:<>{CONTEXT}</>})}

        {/* ── Sentence rows ── */}
        <div className="lrwx-list">
          {ITEMS.map((item) => renderRow(item))}
        </div>

        {/* ── Images ── */}
        <div className="lrwx-imgs">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrwx-img-wrap">
              <img src={item.imageSrc} alt={["Children swimming in a pool.","A teacher explaining a lesson to students.","A child reading a book.","A boy using a laptop."][item.id-1]} className="lrwx-img" />
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwx-buttons">
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