import clipPage53D8 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_008_The_pen_is_between_the_books.mp3";
import clipPage53D7 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_007_The_chair_is_behind_the_desk.mp3";
import clipPage53D6 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_006_The_monkeys_are_in_the_trees.mp3";
import clipPage53D5 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_005_The_skateboard_and_bike_are_by_the_tree.mp3";
import clipPage53D4 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_004_The_picture_is_beside_the_window.mp3";
import clipPage53D3 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_003_The_backpack_is_next_to_the_chair.mp3";
import clipPage53D2 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_002_Tilly_is_under_the_bed.mp3";
import clipPage53D1 from "../../../assets/audio/ClassBook/Unit 6/Page 53 - D/Item_001_The_book_is_on_the_table.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 8 صور بنفس ترتيب الكتاب
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 43.svg"; // chair+bag   → 3
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 41.svg"
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 39.svg"
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 37.svg"
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 44.svg"
import imgF from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 42.svg"
import imgG from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 40.svg"
import imgH from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 53/SVG/Asset 38.svg"
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
const NUMBER_CLR_DEFAULT  = "#2b2b2b";
const NUMBER_CLR_CORRECT  = "#ffffff";
const NUMBER_CLR_WRONG    = "#ffffff";
const BADGE_DEFAULT_BG    = "transparent"
const BADGE_CORRECT_BG    = "transparent"
const BADGE_WRONG_BG      = "transparent"
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";
const SENTENCE_COLOR      = "#2b2b2b";
const NUM_LABEL_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// الجمل — يسار + يمين بجانب بعض
const SENTENCES = [
  { num: 1, text: "The book is on the table."           },
  { num: 2, text: "Tilly is under the bed."              },
  { num: 3, text: "The backpack is next to the chair."   },
  { num: 4, text: "The picture is beside the window."    },
  { num: 5, text: "The skateboard and bike are by the tree." },
  { num: 6, text: "The monkeys are in the trees."        },
  { num: 7, text: "The chair is behind the desk."        },
  { num: 8, text: "The pen is between the books."        },
];

// الصور بترتيب الكتاب (صف فوق: A B C D | صف تحت: E F G H)
// correct = الرقم الصحيح لكل صورة
const IMAGES = [
  { id: "A", src: imgA, correct: 3 },
  { id: "B", src: imgB, correct: 8 },
  { id: "C", src: imgC, correct: 1 },
  { id: "D", src: imgD, correct: 5 },
  { id: "E", src: imgE, correct: 7 },
  { id: "F", src: imgF, correct: 2 },
  { id: "G", src: imgG, correct: 6 },
  { id: "H", src: imgH, correct: 4 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookNumber_QD() {
const listening=useExerciseListening("sb_review5_page2_q1");

  const [answers,     setAnswers]     = useState({});   // { "A": "3", ... }
  const [,setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
 const [results,setResults] = useState({});
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null);
 const answerTargets = IMAGES.map(item=>({key:item.id,correct:[String(item.correct)],answer:String(item.correct),label:`Picture ${item.id}. Enter the matching sentence number, 1 to 8. Use each number once.`}));
 const checkDisabled = showAns || answerTargets.every(item=>results[item.key] === "correct");

  // refs للـ auto-focus
  const inputRefs = useRef({});

  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;const digit=value.replace(/[^1-8]/g,"").slice(-1);if(digit&&Object.entries(answers).some(([id,v])=>id!==key&&v===digit)){setAnnouncement("That number is already used. Clear the previous box before moving it.");return;}setAnswers(prev=>({...prev,[key]:digit}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(digit){const at=IMAGES.findIndex(item=>item.id===key),next=IMAGES.slice(at+1).find(item=>!showAns&&results[item.id]!=="correct");inputRefs.current[next?.id]?.focus();}};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){setAnnouncement("Please complete all answers first.");ValidationAlert.info("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key] === "correct" || item.correct.some(answer=>normalizeAnswer(answers[item.key] || "") === normalizeAnswer(answer)) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`);if(score === answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset = () => {listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── Badge state per image ──
  const getBadgeState=img=>!answers[img.id]?"empty":showAns?"correct":results[img.id]||"filled";

  const badgeBg = (state) => {
    if (state === "correct") return BADGE_CORRECT_BG;
    if (state === "wrong")   return BADGE_WRONG_BG;
    return BADGE_DEFAULT_BG;
  };

  const badgeTextColor = (state) => {
    if (state === "correct" || state === "wrong") return "#000000ff";
    return NUMBER_CLR_DEFAULT;
  };

  return (
    <div data-adapt-scope="review5&6_Review5_Page2_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review5_Page2_Q1"] input:focus-visible, [data-adapt-scope="review5&6_Review5_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review5_Page2_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Sentence list — 2 columns ── */
        .rln-sentences {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(4px, 0.6vw, 8px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        .rln-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rln-sent-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUM_LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rln-sent-text {
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        /* ── 4×2 image grid ── */
        .rln-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
        }

        /* Single image card */
        .rln-card {
          position: relative;
          overflow: visible;
          flex-shrink: 0;
        }

        .rln-img {
          width: 95%;
          height: auto ;
          object-fit: cover;
          display: block;
        }

        /* Badge (number circle) — bottom-right */
        .rln-badge-wrap {
          position: absolute;
          bottom: 1px;
          right: 11px;
        }

        .rln-badge {
          position: relative;
          width: clamp(26px, 3.2vw, 30px);
          height: clamp(26px, 3.2vw, 30px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }

        /* ✕ wrong indicator */
        .rln-wrong-x {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Input inside badge */
        .rln-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(12px, 1.5vw, 18px);
          caret-color: #333;
          z-index: 2;
        }
        .rln-input:disabled { cursor: default; }

        /* Display number */
        .rln-num-display {
          font-size: clamp(12px, 1.5vw, 18px);
          font-weight: 700;
          line-height: 1;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .rln-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rln-sentences { grid-template-columns: 1fr; }
          .rln-grid { grid-template-columns: repeat(2, 1fr); }
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
        <ExerciseHeader subTitle="Read one clue at a time, then place its number on the picture or item that matches it." isReview sectionLetter="D" title={<>Read, look, and number the pictures.</>} />

        {/* ── Sentences — 2 columns ── */}
        <div className="rln-sentences">
          {SENTENCES.map((s) => (
            renderExerciseAudioGroup({audio:listening,id:`sentence-${s.num}`,src:[clipPage53D1,clipPage53D2,clipPage53D3,clipPage53D4,clipPage53D5,clipPage53D6,clipPage53D7,clipPage53D8][s.num-1],label:`${s.num}. ${s.text}`,className:"rln-sentence-row",key:s.num,children:<>
              <span className="rln-sent-num">{s.num}</span>
              <span className="rln-sent-text">{s.text}</span>
            </>})
          ))}
        </div>

        {/* ── 4×2 image grid ── */}
        <div className="rln-grid">
          {IMAGES.map((img) => {
            const state    = getBadgeState(img);
            const val      = answers[img.id] || "";
            const bg       = badgeBg(state);
            const txtColor = badgeTextColor(state);
            
            const isWrong = !showAns && results[img.id] === "wrong";

            return (
              <div key={img.id} className="rln-card">
                <img src={img.src} alt={["A backpack beside an armchair.","A pen between two books.","A book on a low table in a living room.","A bicycle and skateboard beside a tree.","Wooden chairs arranged by desks.","A white cat peeking out beneath a bed.","Monkeys in trees.","A family picture beside a window."][IMAGES.findIndex(image=>image.id===img.id)]} className="rln-img" />

                {/* Badge with number input */}
                <div className="rln-badge-wrap">
                  <div
                    className="rln-badge"
                    style={{ background: bg, color: txtColor }}
                  >
                    <span className="rln-num-display">{val}</span>

                    {/* Transparent input overlay */}
                    <input   placeholder="#" aria-invalid={results[img.id] === "wrong"} title={answerTargets.find(target=>target.key === img.id)?.label || "Write an answer"} aria-label={answerTargets.find(target=>target.key === img.id)?.label || "Write an answer"} {...fieldKeys}
                      ref={(el) => { inputRefs.current[img.id] = el; }}
                      className="rln-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      disabled={showAns || results[img.id] === "correct"}
                      onChange={(e) => handleChange(img.id, e.target.value)}
                      style={{...({ color: "transparent", caretColor: "transparent" }),borderBottomColor:showAns || results[img.id] === "correct" ? "#16a34a" : results[img.id] === "wrong" ? "#ef4444" : undefined,borderRadius:"inherit",boxShadow:showAns||results[img.id]==="correct"?"inset 0 0 0 2px #16a34a":results[img.id]==="wrong"?"inset 0 0 0 2px #ef4444":undefined}}
                    />

                    {/* ✕ badge لو غلط */}
                    {isWrong && <div className="rln-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rln-buttons">
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