import clipPage47E17 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_017_the_dishes.mp3";
import clipPage47E16 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_016_dinner.mp3";
import clipPage47E15 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_015_TV.mp3";
import clipPage47E14 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_014_with_his_friends.mp3";
import clipPage47E13 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_013_the_clothes.mp3";
import clipPage47E12 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_012_worked.mp3";
import clipPage47E11 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_011_washed.mp3";
import clipPage47E10 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_010_cooked.mp3";
import clipPage47E9 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_009_ironed.mp3";
import clipPage47E8 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_008_watched.mp3";
import clipPage47E7 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_007_played.mp3";
import clipPage47E6 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_006_visited.mp3";
import clipPage47E5 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_005_I.mp3";
import clipPage47E4 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_004_they.mp3";
import clipPage47E3 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_003_me.mp3";
import clipPage47E2 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_002_she.mp3";
import clipPage47E1 from "../../../assets/audio/WorkBook/Unit 8/Page 47 - E/Item_001_he.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 5 صور للمطابقة
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 27.svg";
import imgB from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 28.svg";
import imgC from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 29.svg";
import imgD from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 30.svg";
import imgE from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 47/SVG/Asset 31.svg";
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
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const CODE_TABLE_COLOR        = "#2b2b2b";
const LABEL_COLOR             = "#2b2b2b";
const CODED_COLOR             = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const IMG_BOX_BORDER          = "#2096a6";

// ─────────────────────────────────────────────
//  📝  CODE TABLE
// ─────────────────────────────────────────────
const CODE_TABLE = [
  { num: 1,  word: "he"      },
  { num: 2,  word: "she"     },
  { num: 3,  word: "we"      },
  { num: 4,  word: "they"    },
  { num: 5,  word: "I"       },
  { num: 6,  word: "visited" },
  { num: 7,  word: "played"  },
  { num: 8,  word: "watched" },
  { num: 9,  word: "ironed"  },
  { num: 10, word: "cooked"  },
  { num: 11, word: "washed"  },
  { num: 12, word: "worked"  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      "a",
    coded:   "2  9  the clothes.",
    correct: ["She ironed the clothes.", "she ironed the clothes."],
    answer:  "She ironed the clothes.",
  },
  {
    id:      "b",
    coded:   "1  7  with his friends.",
    correct: ["He played with his friends.", "he played with his friends."],
    answer:  "He played with his friends.",
  },
  {
    id:      "c",
    coded:   "4  8  TV.",
    correct: ["They watched TV.", "they watched TV."],
    answer:  "They watched TV.",
  },
  {
    id:      "d",
    coded:   "2  10  dinner.",
    correct: ["She cooked dinner.", "she cooked dinner."],
    answer:  "She cooked dinner.",
  },
  {
    id:      "e",
    coded:   "3  11  the dishes.",
    correct: ["We washed the dishes.", "we washed the dishes."],
    answer:  "We washed the dishes.",
  },
];

// الصور — مرتبة بشكل مختلف عن الجمل
const IMAGES = [
  { id: "a", src: imgA },
  { id: "d", src: imgB },
  { id: "e", src: imgC },
  { id: "c", src: imgD },
  { id: "b", src: imgE },
];

// الإجابة الصحيحة للمطابقة: sentenceId → imageId
const CORRECT_MATCH = { a: "a", d: "d", e: "e", c: "c", b: "b" };

// ترتيب التنقل بين صناديق الصور
const IMG_IDS = ["a", "d", "e", "c", "b"];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// هل الحرف المكتوب في هذه الصورة صحيح؟
// imgAnswers[imgId] يجب أن يساوي sentenceId الصحيح لهذه الصورة
const getCorrectLetterForImg = (imgId) =>
  Object.keys(CORRECT_MATCH).find((k) => CORRECT_MATCH[k] === imgId) || "";



// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadReplaceWrite_QE() {
const listening=useExerciseListening("wb_unit8_page47_q1");

  const [answers,     setAnswers]     = useState({});  // { sentenceId: text }
  const [imgAnswers,  setImgAnswers]  = useState({});  // { imageId: letter }
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=[...ITEMS.map(item=>({key:"write-"+item.id,correct:item.correct,label:`Sentence ${item.id}. Decode ${item.coded} using the visible code table.`})),...IMAGES.map((img,i)=>({key:"image-"+img.id,correct:[getCorrectLetterForImg(img.id)],label:`Picture ${i+1}. Write the matching decoded sentence letter a to e.`}))];const readAnswer=key=>key.startsWith("write-")?answers[key.slice(6)]||"":imgAnswers[key.slice(6)]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const TOTAL = ITEMS.length * 2; // كتابة + مطابقة

  const writeRefs = useRef({});
  const imgRefs   = useRef({});

  // ── Write handlers ──
  const handleWriteChange=(id,value)=>{if(showAns||results["write-"+id]==="correct")return;setAnswers(prev=>({...prev,[id]:value}));setResults(prev=>{const next={...prev};delete next["write-"+id];return next;});};

  // ── Image letter input handlers ──
  const handleImgChange=(id,value)=>{const key="image-"+id;if(showAns||results[key]==="correct"||value!==""&&!/^[a-eA-E]$/.test(value))return;setImgAnswers(prev=>({...prev,[id]:value.toLowerCase()}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value){const next=IMG_IDS.slice(IMG_IDS.indexOf(id)+1).find(id=>results["image-"+id]!=="correct");if(next)imgRefs.current[next]?.focus({preventScroll:true});}};

  // ── Check ──
  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers and picture boxes first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  // ── Show Answer ──
  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);

    // كل صورة تأخذ الحرف الصحيح (sentenceId الخاص بها)
    const imgFilled = {};
    IMAGES.forEach((img) => {
      imgFilled[img.id] = getCorrectLetterForImg(img.id);
    });
    setImgAnswers(imgFilled);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  // ── Reset ──
  const handleReset = () => {listening.stop();
    setAnswers({});
    setImgAnswers({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  // ── Helpers for write inputs ──
  const isWriteWrong=item=>!showAns&&results["write-"+item.id]==="wrong";

  

  // ── Helpers for image boxes ──
  const getImgBoxState=id=>{if(!imgAnswers[id])return "none";if(showAns||results["image-"+id]==="correct")return "correct";return results["image-"+id]==="wrong"?"wrong":"selected";};

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page47_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page47_Q1"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page47_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page47_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page47_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Code table ── */
        .rrw-code-table {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 24px);
          width: 100%;
        }

        .rrw-code-entry {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${CODE_TABLE_COLOR};
          white-space: nowrap;
        }

        .rrw-code-entry b { font-weight: 700; }

        /* ── Items list ── */
        .rrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* ── Single item ── */
        .rrw-item {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
        }

        /* Coded row */
        .rrw-coded-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rrw-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .rrw-coded {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${CODED_COLOR};
          line-height: 1.5;
        }

        /* Input wrap — write */
        .rrw-input-wrap {
          position: relative;
          width: 100%;
        }

        .rrw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rrw-input:disabled   { opacity: 1; cursor: default; }
        .rrw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rrw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rrw-badge {
          position: absolute;
          top: -8px; right: 0;
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

        /* ── Images row ── */
        .rrw-images {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          flex-wrap: wrap;
          margin-top: clamp(8px, 1.2vw, 16px);
        }

        .rrw-img-card {
          position: relative;
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          overflow: visible;
          flex: 1;
          width: clamp(80px, 12vw, 150px);
        }

        .rrw-img {
          width: 100%;
          display: block;
          height: auto;
          border-radius: 8px;
        }

        /* Letter input box — top right corner */
        .rrw-img-input {
          position: absolute;
          top: 0; right: 0;
          width: clamp(28px, 3.4vw, 40px);
          height: clamp(28px, 3.4vw, 40px);
          border: 2px solid ${IMG_BOX_BORDER};
          border-radius: 0 8px 0 4px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          cursor: text;
          padding: 0;
          line-height: clamp(28px, 3.4vw, 40px);
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
          box-sizing: border-box;
        }
        .rrw-img-input:disabled    { opacity: 1; cursor: default; }
        .rrw-img-input--answer     { color: ${INPUT_ANSWER_COLOR}; }
        .rrw-img-input--selected   { color: ${INPUT_TEXT_COLOR}; }

        /* ✕ badge on img */
        .rrw-img-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
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
          z-index: 3;
        }

        /* Buttons */
        .rrw-buttons {
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
        <ExerciseHeader subTitle="Replace the numbers with the correct words first, complete each sentence, then match it to the right picture." sectionLetter="E" title={<>Read and replace the numbers with words. Write the complete sentences. Match.</>} />

        {/* ── Code table ── */}
        <div className="rrw-code-table">
          {CODE_TABLE.map(({ num, word }) => (
            <span key={num} className="rrw-code-entry">
              <b>{num}</b> = {renderExerciseAudioText({audio:listening,id:`code-${num}`,src:[clipPage47E1,clipPage47E2,clipPage47E3,clipPage47E4,clipPage47E5,clipPage47E6,clipPage47E7,clipPage47E8,clipPage47E9,clipPage47E10,clipPage47E11,clipPage47E12][num-1],label:word,children:word})}
            </span>
          ))}
        </div>

        {/* ── Items ── */}
        <div className="rrw-list">
          {ITEMS.map((item) => {
            const wrong    = isWriteWrong(item);
            // ✅ الإصلاح الرئيسي: استخدام answers[item.id] بدل ""
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            
            
            return (
              <div key={item.id} className="rrw-item">
                <div className="rrw-coded-row">
                  <span className="rrw-label">{item.id}</span>
                  <span className="rrw-coded">{(()=>{const parts=/^(\d+\s+\d+\s+)([\s\S]+)$/.exec(item.coded);return parts?<>{parts[1]}{renderExerciseAudioText({audio:listening,id:`clue-${item.id}`,src:[clipPage47E13,clipPage47E14,clipPage47E15,clipPage47E16,clipPage47E17][ITEMS.indexOf(item)],label:parts[2],children:parts[2]})}</>:item.coded;})()}</span>
                </div>
                <div className="rrw-input-wrap">
                  <input {...fieldKeys} placeholder="Your sentence" aria-invalid={results["write-"+item.id]==="wrong"} title={answerTargets.find(target=>target.key==="write-"+item.id)?.label} aria-label={answerTargets.find(target=>target.key==="write-"+item.id)?.label}
                    ref={(el) => (writeRefs.current[item.id] = el)}
                    type="text"
                    className={[
                      "rrw-input",
                      wrong   ? "rrw-input--wrong"  : "",
                      showAns ? "rrw-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results["write-"+item.id]==="correct"}
                    onChange={(e) => handleWriteChange(item.id, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns||results["write-"+item.id]==="correct"?"#16a34a":results["write-"+item.id]==="wrong"?"#ef4444":({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rrw-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Images ── */}
        <div className="rrw-images">
          {IMAGES.map((img) => {
            const state    = getImgBoxState(img.id);
            const val      = imgAnswers[img.id] || "";
            
            
            const inputClass = [
              "rrw-img-input",
              state === "correct"  ? "rrw-img-input--correct"  : "",
              state === "wrong"    ? "rrw-img-input--wrong"    : "",
              showAns              ? "rrw-img-input--answer"   : "",
              state === "selected" ? "rrw-img-input--selected" : "",
            ].filter(Boolean).join(" ");
            
            return (
              <div key={img.id} className="rrw-img-card">
                <img src={img.src} alt={({a:"A woman ironing clothes.",d:"A man cooking at a stove.",e:"A girl helping an adult wash dishes.",c:"A family watching television.",b:"Boys playing soccer."})[img.id]} className="rrw-img" />
                <input style={{...({}),borderColor:showAns||results["image-"+img.id]==="correct"?"#16a34a":results["image-"+img.id]==="wrong"?"#ef4444":({}).borderColor}} {...fieldKeys} aria-invalid={results["image-"+img.id]==="wrong"} title={answerTargets.find(target=>target.key==="image-"+img.id)?.label} aria-label={answerTargets.find(target=>target.key==="image-"+img.id)?.label}
                  ref={(el) => (imgRefs.current[img.id] = el)}
                  type="text"
                  maxLength={1}
                  className={inputClass}
                  value={val}
                  disabled={showAns||results["image-"+img.id]==="correct"}
                  onChange={(e) => handleImgChange(img.id, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  />
                {state === "wrong" && <div className="rrw-img-badge">✕</div>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rrw-buttons">
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