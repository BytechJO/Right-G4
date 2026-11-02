import clipPage19J5 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - J/Item_005_No,.mp3";
import clipPage19J4 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - J/Item_004_a_ball.mp3";
import clipPage19J3 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - J/Item_003_Did_he_have_sunglasses.mp3";
import clipPage19J2 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - J/Item_002_Yes,.mp3";
import clipPage19J1 from "../../../assets/audio/WorkBook/Unit 3/Page 19 - J/Item_001_Did_she_have_boots.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import char1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 1.svg"; // girl
import obj1  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 2.svg"; // boots
import char2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 3.svg"; // boy
import obj2  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 4.svg"; // sunglasses
import char3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 5.svg"; // boy 2
import obj3  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 6.svg"; // backpack
import char4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 7.svg"; // girl 2
import obj4  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19/Asset 8.svg";
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
 // bike

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const QUESTION_TEXT_COLOR     = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//
//  نوع كل سطر:
//  question: سؤال جاهز + input للجواب
//             مع prefix اختياري قبل الـ input
//  full:     input للسؤال كله + suffix + input للجواب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:       1,
    charSrc:  char1,
    objSrc:   obj1,
    // السؤال جاهز، الجواب: "Yes, ___"
    type:     "given-q",
    question: "Did she have boots?",
    answerPrefix: "Yes,",
    answerKey:    "1-ans",
    answerCorrect: ["she did.", "she did"],
    answerText:    "she did.",
  },
  {
    id:       2,
    charSrc:  char2,
    objSrc:   obj2,
    type:     "given-q",
    question: "Did he have sunglasses?",
    answerPrefix: "Yes,",
    answerKey:    "2-ans",
    answerCorrect: ["he did.", "he did"],
    answerText:    "he did.",
  },
  {
    id:       3,
    charSrc:  char3,
    objSrc:   obj3,
    // السؤال ناقص + suffix ثابت، الجواب: "No, ___"
    type:     "missing-q",
    questionKey:    "3-q",
    questionSuffix: "a ball?",
    questionCorrect: ["Did he have", "Did he have a ball"],
    questionText:    "Did he have",
    answerPrefix: "No,",
    answerKey:    "3-ans",
    answerCorrect: ["he didn't.", "he did not"],
    answerText:    "he didn't.",
  },
  {
    id:       4,
    charSrc:  char4,
    objSrc:   obj4,
    // السؤال ناقص كله + "?" ثابت، الجواب كله ناقص
    type:     "full-missing",
    questionKey:    "4-q",
    questionSuffix: "?",
    questionCorrect: ["Did she have a bike", "Did she have a bike?"],
    questionText:    "Did she have a bike?",
    answerKey:    "4-ans",
    answerCorrect: ["Yes, she did.", "Yes, she did"],
    answerText:    "Yes, she did.",
  },
];

const ALL_INPUTS = [
  { key: "1-ans", correct: ITEMS[0].answerCorrect },
  { key: "2-ans", correct: ITEMS[1].answerCorrect },
  { key: "3-q",   correct: ITEMS[2].questionCorrect },
  { key: "3-ans", correct: ITEMS[2].answerCorrect },
  { key: "4-q",   correct: ITEMS[3].questionCorrect },
  { key: "4-ans", correct: ITEMS[3].answerCorrect },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────




// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadWrite_QJ() {
const listening=useExerciseListening("wb_unit3_page19_q1");

  const [answers,     setAnswers]     = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.flatMap(item=>[...(item.questionKey?[{key:item.questionKey,correct:item.questionCorrect,answer:item.questionText,label:`Picture ${item.id}. Complete the question, keeping the printed ending visible.`}]:[]),{key:item.answerKey,correct:item.answerCorrect,answer:item.answerText,label:`Picture ${item.id}. Complete the answer ${item.answerPrefix||""} to ${item.question||"the question above"}.`}]);const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      if (item.questionKey) filled[item.questionKey] = item.questionText;
      filled[item.answerKey] = item.answerText;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  const isWrong=key=>!showAns&&results[typeof key==="object"?(key.key??key.id):key]==="wrong";

  // ── render input ──────────────────────────
  const renderInput = (key, correctArr, flex = true, minW = "clamp(80px,12vw,200px)") => {
    const wrong  = isWrong(key, correctArr);
    const value  = answers[key] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
    return (
      <span className="lrw-input-wrap" style={{ flex: flex ? "1" : "0 1 auto", minWidth: minW }}>
        <input aria-invalid={results[key]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===key)?.label||"Complete this answer"} {...fieldKeys}
          type="text"
          className={["lrw-input", wrong ? "lrw-input--wrong" : "", showAns ? "lrw-input--answer" : ""].filter(Boolean).join(" ")}
          value={value}
          disabled={showAns||results[key]==="correct"}
          onChange={(e) => handleChange(key, e.target.value)}
          style={(base=>({...base,borderBottomColor:showAns||results[key]==="correct"?"#16a34a":results[key]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="lrw-badge">✕</div>}
      </span>
    );
  };

  // ── render one item row ───────────────────
  const renderItem = (item) => {
    let questionLine, answerLine;

    if (item.type === "given-q") {
      // سؤال جاهز، جواب: "Yes/No, ___"
      questionLine = (
        <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`question-${item.id}`,src:({1:clipPage19J1,2:clipPage19J3})[item.id],label:item.question,children:item.question})}</span>
      );
      answerLine = (
        <>
          <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`prefix-${item.id}`,src:item.answerPrefix==="Yes,"?clipPage19J2:item.answerPrefix==="No,"?clipPage19J5:null,label:item.answerPrefix,children:item.answerPrefix})}</span>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    } else if (item.type === "missing-q") {
      // سؤال ناقص أوله + suffix ثابت، جواب: "No, ___"
      questionLine = (
        <>
          {renderInput(item.questionKey, item.questionCorrect, true, "clamp(100px,14vw,220px)")}
          <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`suffix-${item.id}`,src:item.id===3?clipPage19J4:null,label:item.questionSuffix,children:item.questionSuffix})}</span>
        </>
      );
      answerLine = (
        <>
          <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`prefix-${item.id}`,src:item.answerPrefix==="Yes,"?clipPage19J2:item.answerPrefix==="No,"?clipPage19J5:null,label:item.answerPrefix,children:item.answerPrefix})}</span>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    } else {
      // full-missing: سؤال كامل ناقص + "?" ثابت، جواب كامل ناقص
      questionLine = (
        <>
          {renderInput(item.questionKey, item.questionCorrect)}
          <span className="lrw-text">{renderExerciseAudioText({audio:listening,id:`suffix-${item.id}`,src:item.id===3?clipPage19J4:null,label:item.questionSuffix,children:item.questionSuffix})}</span>
        </>
      );
      answerLine = (
        <>
          {renderInput(item.answerKey, item.answerCorrect)}
        </>
      );
    }

    return (
      <div key={item.id} className="lrw-row">

        {/* Images */}
        <div className="lrw-imgs">
          <img src={item.charSrc} alt={["A dark-haired girl wearing a headband.","A dark-haired boy.","A brown-haired boy wearing a blue jacket.","A red-haired girl wearing glasses."][item.id-1]} className="lrw-img" />
          <img src={item.objSrc}  alt={["Purple boots.","Sunglasses.","A backpack.","A bicycle."][item.id-1]}  className="lrw-img" />
        </div>

        {/* Question + Answer */}
        <div className="lrw-right">
          <div className="lrw-line-wrap">
            <span className="lrw-num">{item.id}</span>
            <div className="lrw-line">{questionLine}</div>
          </div>
          <div className="lrw-line-wrap lrw-line-wrap--answer">
            <div className="lrw-line">{answerLine}</div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page19_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page19_Q1"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page19_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .lrw-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
        }

        /* ── Single row: images | right ── */
        .lrw-row {
          display: grid;
          grid-template-columns: clamp(100px, 14vw, 180px) 1fr;
          gap: clamp(14px, 2vw, 28px);
          align-items: center;
        }

        /* Images side by side */
        .lrw-imgs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 14px);
        }
        .lrw-img {
          width: clamp(44px, 5.5vw, 72px);
          height: clamp(44px, 5.5vw, 72px);
          object-fit: contain;
          display: block;
        }

        /* Right side */
        .lrw-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Line wrapper: num + content */
        .lrw-line-wrap {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .lrw-line-wrap--answer {
          padding-left: clamp(20px, 2.4vw, 30px); /* indent للجواب */
        }

        .lrw-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 5px;
          line-height: 1;
        }

        /* Line content */
        .lrw-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex: 1;
          min-width: 0;
          flex-wrap: nowrap;
        }

        .lrw-text {
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${QUESTION_TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input */
        .lrw-input-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
        }

        .lrw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(15px, 1.8vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrw-input:disabled    { opacity: 1; cursor: default; }
        .lrw-input--wrong      { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrw-input--answer     { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrw-badge {
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

        /* Buttons */
        .lrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrw-row { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Use the picture as the main clue, then write the complete word, question, or sentence before checking." sectionLetter="J" title={<>Look, read, and write.</>} />

        {/* ── Items ── */}
        <div className="lrw-list">
          {ITEMS.map(renderItem)}
        </div>

        {/* ── Buttons ── */}
        <div className="lrw-buttons">
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