import clipPage16C6 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_006_He_had_a_motorcycle.mp3";
import clipPage16C5 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_005_She_had_a_doll.mp3";
import clipPage16C4 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_004_She_had_a_pen.mp3";
import clipPage16C3 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_003_He_had_a_violin.mp3";
import clipPage16C2 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_002_He_had_a_bike.mp3";
import clipPage16C1 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - C/Item_001_He_had_a_radio.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 13.svg";
import img2 from"../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 15.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 16.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 17.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 18.svg";
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
const BORDER_COLOR     = "#2096a6";
const CHECK_BG         = "#ef4444";
const CROSS_BG         = "#ef4444";
const SELECTED_CHECK   = "#22c55e";
const SELECTED_CROSS   = "#ef4444";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, imageSrc: img1, sentence: "He had a radio.",      correct: "✓" },
  { id: 2, imageSrc: img2, sentence: "He had a bike.",       correct: "✗" },
  { id: 3, imageSrc: img3, sentence: "He had a violin.",     correct: "✓" },
  { id: 4, imageSrc: img4, sentence: "She had a pen.",       correct: "✗" },
  { id: 5, imageSrc: img5, sentence: "She had a doll.",      correct: "✓" },
  { id: 6, imageSrc: img6, sentence: "He had a motorcycle.", correct: "✗" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWriteCheckX_C() {
const listening=useExerciseListening("wb_unit3_page16_q2");

  const [selected,    setSelected]    = useState({});  // { id: "✓" | "✗" }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

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
  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  // ── render one card ───────────────────────
  const renderCard = (item) => {
    const wrong       = isWrong(item);
    const selCheck    = selected[item.id] === "✓";
    const selCross    = selected[item.id] === "✗";
    const ansCheck    = showAns && item.correct === "✓";
    const ansCross    = showAns && item.correct === "✗";

    const checkActive = selCheck || ansCheck;
    const crossActive = selCross || ansCross;
    const checkWrong  = wrong && selCheck;
    const crossWrong  = wrong && selCross;

    return (
      <div key={item.id} className="lrwx-card">

        {/* Image row: number + image side by side */}
        <div className="lrwx-img-row">
          <span className="lrwx-num">{item.id}</span>
          <div className="lrwx-img-wrap">
            <img src={item.imageSrc} alt={["A seated man beside a radio.","A man fishing from a boat.","A boy playing a violin.","A girl standing beside bookcases.","A girl holding a doll.","A man reading a newspaper on a sofa."][item.id-1]} className="lrwx-img" />
          </div>
        </div>

        {/* Sentence + two boxes */}
        {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage16C1,clipPage16C2,clipPage16C3,clipPage16C4,clipPage16C5,clipPage16C6][item.id-1],label:item.sentence,className:"lrwx-bottom",style:undefined,key:item.id,children:<>
          <span className="lrwx-sentence">{item.sentence}</span>

          <div className="lrwx-boxes">

            {/* ✓ box */}
            <div className="lrwx-box-wrap">
              <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.sentence} Choose true.`} aria-pressed={selected[item.id] === "✓"} aria-disabled={showAns || results[item.id] === "correct"}
                className={[
                  "lrwx-box",
                  checkActive ? "lrwx-box--check-active" : "lrwx-box--idle",
                  checkWrong  ? "lrwx-box--wrong"        : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleSelect(item.id, "✓")}
                style={{cursor:isLocked||results[item.id]==="correct"?"default":"pointer",borderRadius:8,background:"#fff",color:"#000",borderColor:selected[item.id]==="✓"?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"):BORDER_COLOR}}
              >
                {checkActive && <span className="lrwx-symbol">✓</span>}
              </div>
              {checkWrong && <div className="lrwx-badge">✕</div>}
            </div>

            {/* ✗ box */}
            <div className="lrwx-box-wrap">
              <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${item.sentence} Choose false.`} aria-pressed={selected[item.id] === "✗"} aria-disabled={showAns || results[item.id] === "correct"}
                className={[
                  "lrwx-box",
                  crossActive ? "lrwx-box--cross-active" : "lrwx-box--idle",
                  crossWrong  ? "lrwx-box--wrong"        : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleSelect(item.id, "✗")}
                style={{cursor:isLocked||results[item.id]==="correct"?"default":"pointer",borderRadius:8,background:"#fff",color:"#000",borderColor:selected[item.id]==="✗"?(showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2563eb"):BORDER_COLOR}}
              >
                {crossActive && <span className="lrwx-symbol">✗</span>}
              </div>
              {crossWrong && <div className="lrwx-badge">✕</div>}
            </div>

          </div>
        </>})}

      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page16_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page16_Q2"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── 3-column grid ── */
        .lrwx-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(16px, 2.4vw, 32px);
        }
        @media (max-width: 640px) {
          .lrwx-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 400px) {
          .lrwx-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .lrwx-card {
          display: flex;
          flex-direction: column;
gap: 6%;        }

        /* Image row: number beside image */
        .lrwx-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Number */
        .lrwx-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          padding-top: 2px;
        }

        /* Image */
        .lrwx-img-wrap {
          flex: 1;
          border-radius: 10px;
        }
        .lrwx-img {
          width: 100%;
          height: clamp(130px, 16vw, 200px);
          display: block;
        }

        /* Bottom row */
        .lrwx-bottom {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 14px);
          flex-wrap: nowrap;
        }
.lrwx-sentence {
    position: relative;
    font-size: clamp(16px, 1.6vw, 16px);
    color: #2b2b2b;
    flex: 2;
    line-height: 1.5;
    left: 3vh;
              flex-wrap: nowrap;

}
        /* Two boxes side by side */
   .lrwx-boxes {
    position: relative;
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
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border-radius: 8px;
          border: 2px solid ${BORDER_COLOR};
          background: #fff;
          color : black ;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          user-select: none;
        }

        /* Idle — empty box */
        // .lrwx-box--idle { background: #fff; }

        /* ✓ selected */
        .lrwx-box--check-active {
          // background: ${CHECK_BG};
          border-color: ${CHECK_BG};
        }

        /* ✗ selected */
        .lrwx-box--cross-active {
          // background: ${CROSS_BG};
          border-color: ${CROSS_BG};
        }

        /* Wrong border override */
        .lrwx-box--wrong {
          border-color: ${WRONG_BADGE_BG} !important;
        }

        /* Symbol inside box */
        .lrwx-symbol {
          font-size: clamp(16px, 2.2vw, 26px);
          font-weight: 700;
          color: #000;
          line-height: 1;
        }

        /* ✕ badge */
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
        <ExerciseHeader subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item." sectionLetter="C" title={<>Look, read, and write{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✓</span>
          {" "}or{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>✗</span>.</>} />

        {/* ── Grid ── */}
        <div className="lrwx-grid">
          {ITEMS.map((item) => renderCard(item))}
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