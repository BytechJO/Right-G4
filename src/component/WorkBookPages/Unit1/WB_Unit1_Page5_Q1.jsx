import clipPage5E4 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - E/Item_004_watch_a.mp3";
import clipPage5E3 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - E/Item_003_the_park.mp3";
import clipPage5E2 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - E/Item_002_go_to_the.mp3";
import clipPage5E1 from "../../../assets/audio/WorkBook/Unit 1/Page 5 - E/Item_001_She_will_go_to_school._Then_she.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/1_1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 5/SVG/2.svg";
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
const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ / صح
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ

const INPUT_TEXT_COLOR         = "#000000";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#c81e1e";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجمل
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "12px";
const IMG_WIDTH                = "clamp(180px, 26vw, 340px)";
const IMG_HEIGHT               = "clamp(100px, 18vw, 200px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  كل item فيه صورة + array من الجمل
//  كل جملة فيها: segments = مقاطع نص وblanks بالتناوب
//  نوع كل segment: "text" | "blank"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    img: img1,
    lines: [
      {
        id: "1a",
        segments: [
          { type: "text",  value: "She will go to school. Then she" },
          { type: "blank", key: "1a-1", correct: "will"             },
        ],
      },
      {
        id: "1b",
        segments: [
          { type: "text",  value: "go to the"    },
          { type: "blank", key: "1b-1", correct: "mall" },
          { type: "text",  value: "."             },
        ],
      },
    ],
  },
  {
    id:  2,
    img: img2,
    lines: [
      {
        id: "2a",
        segments: [
          { type: "blank", key: "2a-1", correct: "He will go to" },
          { type: "text",  value: "the park."                     },
        ],
      },
      {
        id: "2b",
        segments: [
          { type: "blank", key: "2b-1", correct: "Then he will"  },
          { type: "text",  value: "watch a"                       },
          { type: "blank", key: "2b-2", correct: "soccer game"   },
          { type: "text",  value: "."                             },
        ],
      },
    ],
  },
];

// collect all blank keys for validation
const ALL_BLANKS = ITEMS.flatMap((item) =>
  item.lines.flatMap((line) =>
    line.segments.filter((s) => s.type === "blank")
  )
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadComplete_QE() {
const listening=useExerciseListening("wb_unit1_page5_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ALL_BLANKS.map(blank=>({key:blank.key,correct:[blank.correct],answer:blank.correct,label:`Picture ${blank.key.split("-")[0]}. Complete blank ${blank.key.split("-")[1]} using the picture.`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const isLocked=checkDisabled;

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=blank=>!showAns&&results[blank.key]==="wrong";

  const getUnderlineColor = (blank) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(blank) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
  };

  // ── render one blank input ─────────────────
  const renderBlank = (blank) => {
    const wrong  = isWrong(blank);
    const value  = answers[blank.key] || "";
    const uColor = getUnderlineColor(blank);
    const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

    // عرض الـ input بناءً على طول الإجابة الصحيحة
    const charLen   = blank.correct.length;
    const minW      = Math.max(80, charLen * 11);
    const inputWidth = `clamp(${minW}px, ${charLen * 1.4}vw, ${minW * 1.8}px)`;

    return (
      <div className="lrc-input-wrap" key={blank.key}>
        <input aria-invalid={results[blank.key]==="wrong"} placeholder="Answer" title={answerTargets.find(t=>t.key===blank.key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===blank.key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className="lrc-input"
          value={value}
          disabled={showAns||results[blank.key]==="correct"}
          onChange={(e) => handleChange(blank.key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[blank.key]==="correct"?"#16a34a":results[blank.key]==="wrong"?"#ef4444":base.borderBottomColor}))({
            borderBottomColor: uColor,
            color: tColor,
            width: inputWidth,
            cursor: isLocked ? "default" : "text",
          })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrc-badge">✕</div>}
      </div>
    );
  };

  // ── render one sentence line ───────────────
  const renderLine = (line) => (
    <div key={line.id} className="lrc-line">
      {line.segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i} className="lrc-text">{renderExerciseAudioText({audio:listening,id:`text-${line.id}-${i}`,src:({"She will go to school. Then she":clipPage5E1,"go to the":clipPage5E2,"the park.":clipPage5E3,"watch a":clipPage5E4})[seg.value],label:seg.value,children:seg.value})}</span>
        ) : (
          renderBlank(seg)
        )
      )}
    </div>
  );

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page5_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page5_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 40px);
          width: 100%;
        }

        /* ── Single item: num | img | lines ── */
        .lrc-item {
          display: grid;
          grid-template-columns:
            clamp(18px, 2.2vw, 28px)
            ${IMG_WIDTH}
            minmax(0, 1fr);
          gap: clamp(12px, 1.8vw, 24px);
          align-items: center;
          width: 100%;
        }

        /* Number */
        .lrc-num {
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1.5;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Image */
        .lrc-img-box {
          width: ${IMG_WIDTH};
          height: ${IMG_HEIGHT};
          overflow: hidden;
          flex-shrink: 0;
        }
        .lrc-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Lines block */
        .lrc-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          min-width: 0;
          justify-content: center;
        }

        /* Single sentence line */
        .lrc-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.6vw, 8px);
          min-width: 0;
        }

        /* Text parts */
        .lrc-text {
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Input wrapper */
        .lrc-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only */
        .lrc-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .lrc-input:disabled {
          cursor: default;
        }

        /* ✕ wrong badge */
        .lrc-badge {
          position: absolute;
          top: -9px;
          right: -11px;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT_COLOR};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .lrc-item {
            grid-template-columns:
              clamp(16px, 3.5vw, 22px)
              clamp(130px, 35vw, 220px)
              minmax(0, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 520px) {
          .lrc-item {
            grid-template-columns: 1fr;
          }
          .lrc-num { padding-top: 0; }
          .lrc-img-box {
            width: 100%;
            max-width: 280px;
            height: 180px;
          }
          .lrc-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Read the whole sentence for meaning, then complete each blank with the word or form that fits best." sectionLetter="E" title={<>Look, read, and complete.</>} />

        {/* ── Items ── */}
        <div className="lrc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrc-item">

              {/* Number */}
              <span className="lrc-num">{item.id}</span>

              {/* Image */}
              <div className="lrc-img-box">
                <img src={item.img} alt={item.id===1?"A girl with a backpack and a clothing shop.":"A boy with a backpack in a park and a boy playing soccer."} className="lrc-img" />
              </div>

              {/* Sentence lines */}
              <div className="lrc-lines">
                {item.lines.map((line) => renderLine(line))}
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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