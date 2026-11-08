import clipPage63E11 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_011_There_was_spaghetti_and_meatballs.mp3";
import clipPage63E10 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_010_There_were_grapes_and_pears.mp3";
import clipPage63E9 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_009_There_was_fried_chicken.mp3";
import clipPage63E8 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_008_There_weren't_any_rolls.mp3";
import clipPage63E7 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_007_There_wasn't_any_rice.mp3";
import clipPage63E6 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_006_There_was_baked_chicken.mp3";
import clipPage63E5 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_005_apples,_oranges,_and_even_pistachio_ice_cream!.mp3";
import clipPage63E4 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_004_There_were_cookies_and_cupcakes_to_eat_for_dessert._There_were.mp3";
import clipPage63E3 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_003_and_spaghetti_and_meatballs._There_were_rolls_and_fried_chicken.mp3";
import clipPage63E2 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_002_much_food_to_choose_from._There_was_spicy_baked_chicken_with_rice.mp3";
import clipPage63E1 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - E/Item_001_My_family_and_I_went_to_a_restaurant_that_had_a_buffet._There_was_so.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 63/SVG/Asset 3.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd40pg63-instruction1-adult-lady_aZ46Zvr3.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const PARA_COLOR       = "#2b2b2b";
const BOX_BORDER       = "#2096a6";
const BOX_RADIUS       = "8px";
const CHECK_COLOR      = "#c81e1e";
const CROSS_COLOR      = "#c81e1e";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.32,
    end: 9.36,
    text: "Page 63, Write Activities, Exercise E. Read, listen, and write check or X.",
  },
  {
    start: 9.36,
    end: 13.62,
    text: "My family and I went to a restaurant that had a buffet.",
  },
  {
    start: 13.62,
    end: 16.74,
    text: "There was so much food to choose from.",
  },
  {
    start: 16.74,
    end: 21.60,
    text: "There was spicy baked chicken with rice and spaghetti and meatballs.",
  },
  {
    start: 21.60,
    end: 24.14,
    text: "There were rolls and fried chicken.",
  },
  {
    start: 24.14,
    end: 27.68,
    text: "There were cookies and cupcakes to eat for dessert.",
  },
  {
    start: 27.68,
    end: 32.34,
    text: "There were apples, oranges, and even pistachio ice cream.",
  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "There was baked chicken.",           correct: "check" },
  { id: 2, text: "There wasn't any rice.",             correct: "cross" },
  { id: 3, text: "There weren't any rolls.",           correct: "cross" },
  { id: 4, text: "There was fried chicken.",           correct: "check" },
  { id: 5, text: "There were grapes and pears.",       correct: "cross" },
  { id: 6, text: "There was spaghetti and meatballs.", correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadListenCheckCross_QE() {
const listening=useExerciseListening("sb_unit7_page6_q1");

  const [selected,    setSelected]    = useState({});   // { id: "check" | "cross" | null }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const checkDisabled = showAns || ITEMS.every(item=>results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id,boxType) => {if(showAns || results[id] === "correct")return;setSelected(prev=>({...prev,[id]:prev[id] === boxType ? null : boxType}));setResults(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Selection updated.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>selected[item.id] !== undefined && selected[item.id] !== null && selected[item.id] !== "")){ValidationAlert.info("Please choose an answer for each question.");setAnnouncement("Please choose an answer for each question.");return;}const next=Object.fromEntries(ITEMS.map(item=>[item.id,results[item.id] === "correct" || selected[item.id] === item.correct ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
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

  // ── هل هذا المربع غلط؟ ──
  // فقط المربع المحدد الغلط يأخذ badge — بدون أي تأثير آخر
  const isBoxWrong=(id,boxType)=>!showAns&&results[id]==="wrong"&&selected[id]===boxType;

  const renderBox = (id, boxType) => {const item=ITEMS.find(item=>item.id===id);
    const sel      = selected[id];
    const isChosen = sel === boxType;
    const wrong    = isBoxWrong(id, boxType);
    const symbol   = boxType === "check" ? "✓" : "✕";
    const symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;

    return (
      <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${boxType}`} aria-pressed={selected[item.id] === boxType} aria-disabled={showAns || results[item.id] === "correct"}
        style={{...({
          position: "relative",
          width:  "clamp(40px, 3.8vw, 40px)",
          height: "clamp(40px, 3.8vw, 40px)",
          border: `2px solid ${BOX_BORDER}`,
          borderRadius: BOX_RADIUS,
          background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          flexShrink: 0,
          userSelect: "none",
        }),borderRadius:({
          position: "relative",
          width:  "clamp(40px, 3.8vw, 40px)",
          height: "clamp(40px, 3.8vw, 40px)",
          border: `2px solid ${BOX_BORDER}`,
          borderRadius: BOX_RADIUS,
          background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          flexShrink: 0,
          userSelect: "none",
        }).borderRadius || "6px",background:selected[item.id] === boxType && !showAns && results[item.id] === undefined ? "#dbeafe" : ({
          position: "relative",
          width:  "clamp(40px, 3.8vw, 40px)",
          height: "clamp(40px, 3.8vw, 40px)",
          border: `2px solid ${BOX_BORDER}`,
          borderRadius: BOX_RADIUS,
          background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          flexShrink: 0,
          userSelect: "none",
        }).background,borderColor:selected[item.id]===boxType&&(showAns||results[item.id])?(showAns||results[item.id]==="correct"?"#16a34a":"#ef4444"):BOX_BORDER,boxShadow:selected[item.id] === boxType ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}` : undefined}}
        onClick={() => handleSelect(id, boxType)}
      >
        {/* رمز الصح أو الغلط — يظهر فقط لما يكون محدداً */}
        {isChosen && (
          <span style={{
            fontSize: "clamp(16px, 2.2vw, 28px)",
            fontWeight: 700,
            color: symColor,
            lineHeight: 1,
          }}>
            {symbol}
          </span>
        )}

        {/* ✕ badge — فقط لما يكون غلط */}
        {wrong && (
          <div style={{
            position: "absolute",
            top: -7, right: -7,
            width:  "clamp(14px, 1.6vw, 18px)",
            height: "clamp(14px, 1.6vw, 18px)",
            borderRadius: "50%",
            background: WRONG_BADGE_BG,
            color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px, 0.8vw, 10px)",
            fontWeight: 700,
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div data-adapt-scope="unit7_Unit7_Page6_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit7_Unit7_Page6_Q1"] input:focus-visible, [data-adapt-scope="unit7_Unit7_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_Unit7_Page6_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlcc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(14px, 2vw, 26px);
          align-items: flex-start;
          width: 100%;
        }
        .rlcc-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.8;
        }
        .rlcc-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }
        .rlcc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.8vw, 22px) clamp(20px, 3vw, 40px);
          width: 100%;
        }
        .rlcc-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .rlcc-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 20px);
        }
        .rlcc-sentence {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
        }
        /* مربعان جنب بعض */
        .rlcc-boxes {
          display: flex;
          gap: clamp(5px, 0.7vw, 8px);
          flex-shrink: 0;
        }
        .rlcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
        @media (max-width: 560px) {
          .rlcc-top  { grid-template-columns: 1fr; }
          .rlcc-grid { grid-template-columns: 1fr; }
          .rlcc-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
        <ExerciseHeader subTitle="Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer." sectionLetter="E" title={<>Read, listen, and write <span style={{color : "red"}} >✓  </span> or<span style={{color : "red"}} >X </span> .</>} />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer pageId="sb_unit7_page6_q1" src={sound} captions={captions} stopAtSecond={ 9.36} />
        </div>

        {/* ── Paragraph + image ── */}
        <div className="rlcc-top">
          <p className="rlcc-para">{renderExerciseAudioText({audio:listening,id:"paragraph-1",src:clipPage63E1,label:"My family and I went to a restaurant that had a buffet. There was so ",children:"My family and I went to a restaurant that had a buffet. There was so "})}{renderExerciseAudioText({audio:listening,id:"paragraph-2",src:clipPage63E2,label:"much food to choose from. There was spicy baked chicken with rice ",children:"much food to choose from. There was spicy baked chicken with rice "})}{renderExerciseAudioText({audio:listening,id:"paragraph-3",src:clipPage63E3,label:"and spaghetti and meatballs. There were rolls and fried chicken. ",children:"and spaghetti and meatballs. There were rolls and fried chicken. "})}{renderExerciseAudioText({audio:listening,id:"paragraph-4",src:clipPage63E4,label:"There were cookies and cupcakes to eat for dessert. There were ",children:"There were cookies and cupcakes to eat for dessert. There were "})}{renderExerciseAudioText({audio:listening,id:"paragraph-5",src:clipPage63E5,label:"apples, oranges, and even pistachio ice cream!",children:"apples, oranges, and even pistachio ice cream!"})}</p>
          <img src={imgScene} alt={"A buffet with food in serving dishes."} className="rlcc-scene-img" />
        </div>

        {/* ── 2-col sentences ── */}
        <div className="rlcc-grid">
          {ITEMS.map((item) => (
            renderExerciseAudioGroup({audio:listening,id:`question-${item.id}`,src:[clipPage63E6,clipPage63E7,clipPage63E8,clipPage63E9,clipPage63E10,clipPage63E11][item.id-1],label:`${item.id}. ${item.text}`,className:"rlcc-row",key:item.id,children:<>
              <span className="rlcc-num">{item.id}</span>
              <span className="rlcc-sentence">{item.text}</span>
              <div className="rlcc-boxes">
                {renderBox(item.id, "check")}
                {renderBox(item.id, "cross")}
              </div>
            </>})
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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