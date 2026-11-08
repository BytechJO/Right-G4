import clipPage49I12 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_012_her_room.mp3";
import clipPage49I11 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_011_their_grandparents.mp3";
import clipPage49I10 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_010_the_violin.mp3";
import clipPage49I9 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_009_on_the_computer.mp3";
import clipPage49I8 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_008_to_the_radio.mp3";
import clipPage49I7 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_007_a_soccer_game.mp3";
import clipPage49I6 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_006_watched.mp3";
import clipPage49I5 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_005_practiced.mp3";
import clipPage49I4 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_004_listened.mp3";
import clipPage49I3 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_003_cleaned.mp3";
import clipPage49I2 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_002_worked.mp3";
import clipPage49I1 from "../../../assets/audio/WorkBook/Unit 8/Page 49 - I/Item_001_visited.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — 6 صور بترتيب مختلف
// ─────────────────────────────────────────────
import imgSoccer      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 37.svg";
import imgViolin      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 38.svg";
import imgComputer    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 46.svg";
import imgGrandparents from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 40.svg";
import imgRoom        from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 41.svg";
import imgRadio       from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 49/SVG/Asset 42.svg";
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
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const WORD_BANK_BORDER        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const IMG_BORDER              = "#d0d0d0";
const IMG_NUM_BG              = "#ef4444";
const IMG_NUM_WRONG_BG        = "#ef4444";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["visited", "worked", "cleaned", "listened", "practiced", "watched"];

// 6 جمل — verb input + rest text
const SENTENCES = [
  { id: 1, correct: ["watched"],   answer: "watched",   rest: "a soccer game"       },
  { id: 2, correct: ["listened"],  answer: "listened",  rest: "to the radio"        },
  { id: 3, correct: ["worked"],    answer: "worked",    rest: "on the computer"     },
  { id: 4, correct: ["practiced"], answer: "practiced", rest: "the violin"          },
  { id: 5, correct: ["visited"],   answer: "visited",   rest: "their grandparents"  },
  { id: 6, correct: ["cleaned"],   answer: "cleaned",   rest: "her room"            },
];

// 6 صور مرتبة بشكل مختلف — كل صورة فيها رقم الجملة الصحيح
// الطالب يكتب الرقم في البوكس فوق الصورة
const IMAGES = [
  { imgId: "soccer",       src: imgSoccer,       correctNum: "1" },
  { imgId: "violin",       src: imgViolin,       correctNum: "4" },
  { imgId: "computer",     src: imgComputer,     correctNum: "3" },
  { imgId: "grandparents", src: imgGrandparents, correctNum: "5" },
  { imgId: "room",         src: imgRoom,         correctNum: "6" },
  { imgId: "radio",        src: imgRadio,        correctNum: "2" },
];

const ALL_SENTENCE_INPUTS = SENTENCES.map((s) => ({ key: `s${s.id}`, correct: s.correct, answer: s.answer }));
const ALL_IMG_INPUTS      = IMAGES.map((img) => ({ key: `i${img.imgId}`, correct: [img.correctNum], answer: img.correctNum }));
const ALL_INPUTS          = [...ALL_SENTENCE_INPUTS, ...ALL_IMG_INPUTS];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────






// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteNumber_QI() {
const listening=useExerciseListening("wb_unit8_page49_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=[...SENTENCES.map(item=>({key:`s${item.id}`,correct:item.correct,label:`Sentence ${item.id}. Choose a past-tense verb from the bank to complete: blank ${item.rest}.`})),...IMAGES.map((img,i)=>({key:"i"+img.imgId,correct:[img.correctNum],label:`Picture ${i+1}. Write the matching sentence number 1 to 6.`}))];const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const imgRefs = useRef({});

  const handleSentenceChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleImgChange=(key,id,value)=>{if(showAns||results[key]==="correct"||value!==""&&!/^[1-6]$/.test(value))return;if(value&&ALL_IMG_INPUTS.some(item=>item.key!==key&&answers[item.key]===value)){setAnnouncement("This number is already used. Choose another number.");return;}setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});if(value){const next=IMAGES.slice(IMAGES.findIndex(img=>img.imgId===id)+1).find(img=>results["i"+img.imgId]!=="correct");if(next)imgRefs.current[next.imgId]?.focus({preventScroll:true});}};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers and picture boxes first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ALL_SENTENCE_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    ALL_IMG_INPUTS.forEach((inp) => { filled[inp.key] = inp.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  const isSentenceWrong=key=>!showAns&&results[key]==="wrong";

  const isImgWrong=key=>!showAns&&results[key]==="wrong";

  

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page49_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page49_Q1"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page49_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page49_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page49_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank ── */
        .rwni-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(6px, 0.9vw, 12px);
         justify-content: space-around;
             margin: 1% 0;
        }

        .rwni-pill {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(3px, 0.4vw, 6px) clamp(10px, 1.4vw, 18px);
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2-column sentences grid ── */
        .rwni-sent-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 1.4vw, 18px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        .rwni-sent-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
          min-width: 0;
        }

        .rwni-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Sentence input wrap */
        .rwni-sent-input-wrap {
          position: relative;
          flex: 0 1 clamp(70px, 9vw, 130px);
          min-width: clamp(60px, 8vw, 110px);
        }

        .rwni-sent-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rwni-sent-input:disabled   { opacity: 1; cursor: default; }
        .rwni-sent-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwni-sent-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rwni-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* ✕ badge */
        .rwni-badge {
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

        /* ── Images row ── */
        .rwni-images {
          display: flex;
          gap: clamp(6px, 1vw, 14px);
          flex-wrap: wrap;
          width: 100%;
              margin: 3% 0;
        }

        .rwni-img-card {
          position: relative;
          flex: 1;
          overflow: hidden;
        }

        .rwni-img {
          width: 100%;
          display: block;
          height : auto ; 
        }

        /* Number input — top right */
        .rwni-img-input {
          position: absolute;
          top: 0; right: 0;
          width: clamp(26px, 3.2vw, 38px);
          height: clamp(26px, 3.2vw, 38px);
          border-left: 2px solid #2096a6;
          border-bottom: 2px solid #2096a6;
          border-top: 2px solid #2096a6;
          border-right: 2px solid #2096a6;3
          border-radius: 0 8px 0 4px;
          background: #fff;
          text-align: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          padding: 0;
          line-height: 1;
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
          box-sizing: border-box;
          cursor: text;
        }
        .rwni-img-input:disabled        { opacity: 1; cursor: default; }
        .rwni-img-input--wrong          {  color: ${WRONG_BADGE_BG}; }
        .rwni-img-input--answer         { color: ${INPUT_ANSWER_COLOR}; border-color: ${INPUT_ANSWER_COLOR}; }

        .rwni-img-badge {
          position: absolute;
          top: 25px; right: 25px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* Buttons */
        .rwni-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwni-sent-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture." sectionLetter="I" title={<>Read, write, and number.</>} />

        {/* ── Word bank ── */}
        <div className="rwni-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwni-pill">{renderExerciseAudioText({audio:listening,id:`bank-${WORD_BANK.indexOf(w)}`,src:[clipPage49I1,clipPage49I2,clipPage49I3,clipPage49I4,clipPage49I5,clipPage49I6][WORD_BANK.indexOf(w)],label:w,children:w})}</div>
          ))}
        </div>

        {/* ── Sentences 2-col grid ── */}
        <div className="rwni-sent-grid">
          {SENTENCES.map((s) => {
            const key      = `s${s.id}`;
            const wrong    = isSentenceWrong(key, s.correct);
            const value    = answers[key] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            

            return (
              <div key={s.id} className="rwni-sent-row">
                <span className="rwni-num">{s.id}</span>
                <div className="rwni-sent-input-wrap">
                  <input {...fieldKeys} placeholder="Verb" aria-invalid={results[key]==="wrong"} title={answerTargets.find(target=>target.key===key)?.label} aria-label={answerTargets.find(target=>target.key===key)?.label}
                    type="text"
                    className={[
                      "rwni-sent-input",
                      wrong   ? "rwni-sent-input--wrong"  : "",
                      showAns ? "rwni-sent-input--answer" : "",
                    ].filter(Boolean).join(" ")}
                    value={value}
                    disabled={showAns||results[key]==="correct"}
                    onChange={(e) => handleSentenceChange(key, e.target.value)}
                    style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="rwni-badge">✕</div>}
                </div>
                <span className="rwni-text">{renderExerciseAudioText({audio:listening,id:`clue-${s.id}`,src:[clipPage49I7,clipPage49I8,clipPage49I9,clipPage49I10,clipPage49I11,clipPage49I12][s.id-1],label:s.rest,children:s.rest})}</span>
              </div>
            );
          })}
        </div>

        {/* ── Images ── */}
        <div className="rwni-images">
          {IMAGES.map((img) => {
            const key      = `i${img.imgId}`;
            const wrong    = isImgWrong(key, [img.correctNum]);
            const value    = answers[key] || "";

            return (
              <div key={img.imgId} className="rwni-img-card">
                <img src={img.src} alt={({soccer:"Children playing soccer with spectators in the stands.",violin:"A boy playing a violin on stage.",computer:"A boy using a desktop computer.",grandparents:"A family visiting an elderly couple.",room:"A girl in a bedroom with clothes and toys.",radio:"A boy listening to music from a radio."})[img.imgId]} className="rwni-img" />
                <input style={{...({}),borderColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":({}).borderColor}} {...fieldKeys} aria-invalid={results[key]==="wrong"} title={answerTargets.find(target=>target.key===key)?.label} aria-label={answerTargets.find(target=>target.key===key)?.label}
                  ref={(el) => (imgRefs.current[img.imgId] = el)}
                  type="text"
                  maxLength={1}
                  className={[
                    "rwni-img-input",
                    wrong   ? "rwni-img-input--wrong"  : "",
                    showAns ? "rwni-img-input--answer" : "",
                  ].filter(Boolean).join(" ")}
                  value={value}
                  disabled={showAns||results[key]==="correct"}
                  onChange={(e) => handleImgChange(key, img.imgId, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                />
                {wrong && <div className="rwni-img-badge">✕</div>}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rwni-buttons">
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