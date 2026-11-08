import clipPage63F3 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - F/Item_003_There_was_apples_in_the_bowl.mp3";
import clipPage63F2 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - F/Item_002_There_wasn't_any_cookies.mp3";
import clipPage63F1 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - F/Item_001_There_were_bread_on_the_table.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 63/SVG/Asset 4.svg";
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
const WORD_DEFAULT_CLR        = "#2b2b2b";
const UNDERLINE_SELECTED      = "#2b2b2b";
const UNDERLINE_WRONG         = "#ef4444";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:    1,
    words: [
      { w: "There",  mistake: false },
      { w: "were",   mistake: true  },
      { w: "bread",  mistake: false },
      { w: "on",     mistake: false },
      { w: "the",    mistake: false },
      { w: "table.", mistake: false },
    ],
    rewrite: {
      correct: ["There was bread on the table.", "there was bread on the table"],
      answer:  "There was bread on the table.",
    },
  },
  {
    id:    2,
    words: [
      { w: "There",    mistake: false },
      { w: "wasn't",   mistake: true  },
      { w: "any",      mistake: false },
      { w: "cookies.", mistake: false },
    ],
    rewrite: {
      correct: ["There weren't any cookies.", "there weren't any cookies"],
      answer:  "There weren't any cookies.",
    },
  },
  {
    id:    3,
    words: [
      { w: "There",  mistake: false },
      { w: "was",    mistake: true  },
      { w: "apples", mistake: false },
      { w: "in",     mistake: false },
      { w: "the",    mistake: false },
      { w: "bowl.",  mistake: false },
    ],
    rewrite: {
      correct: ["There were apples in the bowl.", "there were apples in the bowl"],
      answer:  "There were apples in the bowl.",
    },
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize=normalizeAnswer;;

const isCorrectRewrite = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadUnderlineRewrite_QF() {
const listening=useExerciseListening("sb_unit7_page6_q2");

  const [underlined,  setUnderlined]  = useState({});  // { itemId: wordIdx }
  const [rewrites,    setRewrites]    = useState({});  // { itemId: string }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [partResults,setPartResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const checkDisabled=showAns||ITEMS.every(item=>partResults[item.id+"u"]==="correct"&&partResults[item.id+"w"]==="correct");

  const isLocked=checkDisabled;

  const handleWordClick=(id,index)=>{if(showAns||partResults[id+"u"]==="correct")return;setUnderlined(prev=>({...prev,[id]:prev[id]===index?null:index}));setPartResults(prev=>{const next={...prev};delete next[id+"u"];return next;});setAnnouncement("Mistake selection changed.");};

  const handleRewrite=(id,value)=>{if(showAns||partResults[id+"w"]==="correct")return;setRewrites(prev=>({...prev,[id]:value}));setPartResults(prev=>{const next={...prev};delete next[id+"w"];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!ITEMS.every(item=>underlined[item.id]!=null&&rewrites[item.id]?.trim())){ValidationAlert.info("Please underline the mistake and rewrite each sentence.");return;}const next={};ITEMS.forEach(item=>{next[item.id+"u"]=partResults[item.id+"u"]==="correct"||underlined[item.id]===item.words.findIndex(word=>word.mistake)?"correct":"wrong";next[item.id+"w"]=partResults[item.id+"w"]==="correct"||isCorrectRewrite(rewrites[item.id]||"",item.rewrite.correct)?"correct":"wrong";});const score=Object.values(next).filter(v=>v==="correct").length,total=ITEMS.length*2;setPartResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${total}. Correct parts are locked.`);if(score===total){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${total}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${total}`);else ValidationAlert.error(`Score: ${score} / ${total}`);};

  const handleShowAnswer = () => {listening.stop();
    const ul = {};
    const rw = {};
    ITEMS.forEach((item) => {
      ul[item.id] = item.words.findIndex((w) => w.mistake);
      rw[item.id] = item.rewrite.answer;
    });
    setUnderlined(ul);
    setRewrites(rw);
    setShowResults(false);
    setShowAns(true);setPartResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct underlines and sentences shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setUnderlined({});
    setRewrites({});
    setShowResults(false);
    setShowAns(false);setPartResults({});setAnnouncement("Selections and sentences cleared.");
  };

  const getWordState=(item,index)=>underlined[item.id]!==index?"idle":showAns?"correct":partResults[item.id+"u"]||"selected";

  const isRewriteWrong=item=>!showAns&&partResults[item.id+"w"]==="wrong";
  const isRewriteDisabled=item=>showAns||partResults[item.id+"w"]==="correct";

  return (
    <div data-adapt-scope="unit7_Unit7_Page6_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit7_Unit7_Page6_Q2"] input:focus-visible, [data-adapt-scope="unit7_Unit7_Page6_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_Unit7_Page6_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rur-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
          margin : 7% 0 ;
        }

        .rur-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
        }

        .rur-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.6vw, 8px);
        }

        /* Original sentence row */
        .rur-sentence-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.4vw, 6px);
        }

        .rur-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          margin-right: clamp(3px, 0.4vw, 6px);
          line-height: 1.5;
        }

        /* Clickable word */
        .rur-word {
          position: relative;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${WORD_DEFAULT_CLR};
          cursor: pointer;
          user-select: none;
          line-height: 1.5;
          padding-bottom: 2px;
          border-bottom: 2.5px solid transparent;
          transition: border-color 0.12s;
          white-space: nowrap;
        }
        .rur-word--locked   { cursor: default; }
        .rur-word--selected { border-bottom-color: ${UNDERLINE_SELECTED}; }
        .rur-word--correct  { border-bottom-color: ${UNDERLINE_SELECTED}; }
        .rur-word--wrong    { border-bottom-color: ${UNDERLINE_WRONG}; }

        /* ✕ badge on wrong word */
        .rur-word-badge {
          position: absolute;
          top: -8px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          pointer-events: none;
          z-index: 2;
        }

        /* Rewrite input */
        .rur-rewrite-wrap {
          position: relative;
          padding-left: clamp(22px, 3vw, 36px);
        }

        .rur-rewrite-input {
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
        }
        .rur-rewrite-input:disabled { opacity: 1; cursor: default; }
        .rur-rewrite-input--wrong   { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rur-rewrite-input--answer  { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge on wrong rewrite */
        .rur-rewrite-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rur-scene-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 15px;
          flex-shrink: 0;
                            border: 2px solid #2195a6;

        }

        .rur-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rur-body { grid-template-columns: 1fr; }
          .rur-scene-img { width: 100%; max-width: 240px; margin: 0 auto; }
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
        <ExerciseHeader subTitle="Find one mistake at a time, underline it, then rewrite the corrected sentence before checking." sectionLetter="F" title={<>Read and underline each mistake. Rewrite the sentence.</>} />

        {/* ── Body ── */}
        <div className="rur-body">

          {/* Items */}
          <div className="rur-list">
            {ITEMS.map((item) => {
              const rwWrong    = isRewriteWrong(item);
              const rwDisabled = isRewriteDisabled(item);
              const rwValue    = rewrites[item.id] || "";
              const rwTColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const rwUColor   = rwWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

              return (
                <div key={item.id} className="rur-item">

                  {/* Original sentence */}
                  {renderExerciseAudioGroup({audio:listening,id:`sentence-${item.id}`,src:[clipPage63F1,clipPage63F2,clipPage63F3][item.id-1],label:`${item.id}. ${item.words.map(word=>word.w).join(" ")}`,className:"rur-sentence-row",key:item.id,children:<>
                    <span className="rur-num">{item.id}</span>
                    {item.words.map((word, wi) => {
                      const state   = getWordState(item, wi);
                      const isWrong = state === "wrong";
                      return (
                        <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${item.id}. ${word.w}. Select the mistake.`} aria-pressed={underlined[item.id]===wi} aria-disabled={showAns||partResults[item.id+"u"]==="correct"} style={{borderRadius:4,textDecorationColor:showAns||partResults[item.id+"u"]==="correct"?"#16a34a":undefined,boxShadow:underlined[item.id]===wi?`inset 0 -2px 0 ${showAns||partResults[item.id+"u"]==="correct"?"#16a34a":partResults[item.id+"u"]==="wrong"?"#ef4444":"#2563eb"}`:undefined}}
                          key={wi}
                          className={[
                            "rur-word",
                            state === "selected" ? "rur-word--selected" : "",
                            state === "correct"  ? "rur-word--correct"  : "",
                            state === "wrong"    ? "rur-word--wrong"    : "",
                            isLocked             ? "rur-word--locked"   : "",
                          ].filter(Boolean).join(" ")}
                          onClick={() => handleWordClick(item.id, wi)}
                        >
                          {word.w}
                          {isWrong && <span className="rur-word-badge">✕</span>}
                        </span>
                      );
                    })}
                  </>})}

                  {/* Rewrite input */}
                  <div className="rur-rewrite-wrap">
                    <input {...fieldKeys} aria-label={`Question ${item.id}. Rewrite the sentence correctly: ${item.words.map(word=>word.w).join(" ")}`} title={`Question ${item.id}. Rewrite the sentence correctly.`} placeholder="Correct sentence" aria-invalid={isRewriteWrong(item)}
                      type="text"
                      className={[
                        "rur-rewrite-input",
                        rwWrong ? "rur-rewrite-input--wrong"  : "",
                        showAns ? "rur-rewrite-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={rwValue}
                      disabled={rwDisabled}
                      onChange={(e) => handleRewrite(item.id, e.target.value)}
                      style={{...({ borderBottomColor: rwUColor, color: rwTColor }),borderBottomColor:isRewriteDisabled(item)?"#16a34a":isRewriteWrong(item)?"#ef4444":"#3f3f3f"}}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {rwWrong && <div className="rur-rewrite-badge">✕</div>}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Image */}
          <img src={imgScene} alt={"A green table with bread, fruit, and burgers."} className="rur-scene-img" />

        </div>

        {/* ── Buttons ── */}
        <div className="rur-buttons">
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