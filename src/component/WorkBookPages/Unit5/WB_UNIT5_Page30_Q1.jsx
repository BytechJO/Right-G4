import clipPage30G2 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - G/Item_002_The_kite_is_flying_under_their_heads.mp3";
import clipPage30G1 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - G/Item_001_The_dress_was_outside_the_closet.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 30/SVG/Asset 28.svg"; // closet with dress inside
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U5 Folder/Page 30/SVG/Asset 29.svg";
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
 // kite flying over heads

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const WRONG_WORD_BG           = "#fff0f0";
const WRONG_WORD_BORDER       = "#ef4444";
const IMG_BORDER_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  sentence: الجملة مقسمة لأجزاء
//  wrongWord: الكلمة الغلط (تظهر بدائرة)
//  الطالب يكتب الجملة الصحيحة في الـ input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:          1,
    src:         img1,
    parts:       ["The dress was", "outside", "the closet."],
    wrongWord:   "outside",
    correct:     ["The dress was inside the closet.", "The dress was inside the closet"],
    answer:      "The dress was inside the closet.",
  },
  {
    id:          2,
    src:         img2,
    parts:       ["The kite is flying", "under", "their heads."],
    wrongWord:   "under",
    correct:     ["The kite is flying over their heads.", "The kite is flying over their heads over"],
    answer:      "The kite is flying over their heads.",
  },

];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircleMistake_QG() {
const listening=useExerciseListening("wb_unit5_page30_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [circles,setCircles]=useState({});
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correct,answer:item.answer,label:`Sentence ${item.id}. Rewrite ${item.parts.join(" ")} with the mistake corrected.`}));const readAnswer=key=>answers[key]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  const handleChange=(key,value)=>{const resultKey=""+key;if(showAns||results[resultKey]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim()&&circles[item.key]!==undefined)){ValidationAlert.info("Please circle a word and rewrite each sentence first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||(circles[item.key]===ITEMS.find(row=>row.id===item.key).parts.join(" ").split(/\s+/).indexOf(ITEMS.find(row=>row.id===item.key).wrongWord)&&item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct)))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);setCircles(Object.fromEntries(ITEMS.map(item=>[item.id,item.parts.join(" ").split(/\s+/).indexOf(item.wrongWord)])));
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setAnswers({});setCircles({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  const isWrong=key=>!showAns&&results[typeof key==="object"?(key.key??key.id):key]==="wrong";

  const isDisabled = (item) => {
    if (showAns) return true;
    if (showResults && isCorrect(answers[item.id] || "", item.correct)) return true;
    return false;
  };

  return (
    <div data-adapt-scope="Unit5_WB_UNIT5_Page30_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_UNIT5_Page30_Q1"] input:focus-visible, [data-adapt-scope="Unit5_WB_UNIT5_Page30_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_UNIT5_Page30_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_UNIT5_Page30_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── List ── */
        .lrcm-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 34px);
          width: 100%;
              margin: 4% 0;

        }

        /* ── Single row: img | num + right ── */
        .lrcm-row {
          display: grid;
          grid-template-columns:
            clamp(130px, 17vw, 210px)
            1fr;
          gap: clamp(14px, 2vw, 28px);
          align-items: center;
        }

        /* Image */
        .lrcm-img-wrap {
          overflow: hidden;
          width: 100%;
        }
        .lrcm-img {
          width: 100%;
          height: clamp(100px, 13vw, 170px);
          display: block;
        }

        /* Right side */
        .lrcm-right {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          min-width: 0;
        }

        /* Sentence row: num + sentence parts */
        .lrcm-sentence-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 10px);
          flex-wrap: wrap;
        }

        .lrcm-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrcm-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Wrong word — circled */
        .lrcm-wrong-word {
      font-size: clamp(14px, 1.7vw, 20px);
    font-weight: 400;
    color: #2b2b2b;
    line-height: 1.5;
        }

        /* Input wrap */
        .lrcm-input-wrap {
          position: relative;
        }

        .lrcm-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lrcm-input:disabled        { opacity: 1; cursor: default; }
        .lrcm-input--wrong          { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrcm-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrcm-badge {
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
        .lrcm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrcm-row { grid-template-columns: 1fr; }
          .lrcm-img-wrap { max-width: 200px; }
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
        <ExerciseHeader subTitle="Find the incorrect word or phrase first, circle it, then rewrite the full corrected sentence." sectionLetter="G" title={<>Look, read, and circle the mistake. Rewrite.</>} />

        {/* ── Items ── */}
        <div className="lrcm-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            // render sentence parts with wrongWord circled
            const sentenceParts=item.parts.join(" ").split(/\s+/).map((word,index)=><span key={index} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Sentence ${item.id}, circle ${word}`} aria-pressed={circles[item.id]===index} aria-disabled={disabled} onClick={event=>{event.stopPropagation();if(disabled)return;setCircles(prev=>{const next={...prev};if(next[item.id]===index)delete next[item.id];else next[item.id]=index;return next;});setResults(prev=>{const next={...prev};delete next[item.id];return next;});}} className="lrcm-text" style={{position:"relative",cursor:disabled?"default":"pointer",borderRadius:20,boxShadow:circles[item.id]===index?`0 0 0 2px ${showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":"#2096a6"}`:undefined}}>{word}</span>);

            return (
              <div key={item.id} className="lrcm-row">

                {/* Image */}
                <div className="lrcm-img-wrap">
                  <img src={item.src} alt={["A dress hanging inside a closet.","Children flying a kite above their heads."][item.id-1]} className="lrcm-img" />
                </div>

                {/* Right: sentence + input */}
                <div className="lrcm-right">

                  {/* Sentence with circled wrong word */}
                  <div role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={`sentence-${item.id}`} aria-label={`Listen to sentence ${item.id}: ${item.parts.join(" ")}`} onClick={()=>listening.play(`sentence-${item.id}`,[clipPage30G1,clipPage30G2][item.id-1])} onKeyDown={event=>{if(event.target!==event.currentTarget||(event.key!=="Enter"&&event.key!==" "))return;event.preventDefault();event.stopPropagation();if(!event.repeat)listening.play(`sentence-${item.id}`,[clipPage30G1,clipPage30G2][item.id-1]);}} onKeyUp={event=>{if(event.target===event.currentTarget&&(event.key==="Enter"||event.key===" ")){event.preventDefault();event.stopPropagation();}}} style={{position:"relative",borderRadius:6,cursor:"pointer",backgroundColor:listening.activeId===`sentence-${item.id}`?"#dbeafe":undefined,boxShadow:listening.activeId===`sentence-${item.id}`?"0 0 0 3px #2563eb":undefined}} className="lrcm-sentence-row">
                    <span className="lrcm-num">{item.id}</span>
                    {sentenceParts}
                  {listening.activeId===`sentence-${item.id}`&&renderExerciseSpeaker()}</div>

                  {/* Rewrite input */}
                  <div className="lrcm-input-wrap">
                    <input aria-invalid={results[item.id]==="wrong"} placeholder="Your answer" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "lrcm-input",
                        wrong   ? "lrcm-input--wrong"  : "",
                        showAns ? "lrcm-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={value}
                      disabled={showAns||results[item.id]==="correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({ borderBottomColor: uColor, color: tColor })}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="lrcm-badge">✕</div>}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcm-buttons">
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