import clipPage4C14 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_014_also_get_milk_and_flour.mp3";
import clipPage4C13 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_013_buy_green_peppers.mp3";
import clipPage4C12 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_012_buy_bottled_water_and_juice.mp3";
import clipPage4C11 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_011_go_to_the_store_far_away.mp3";
import clipPage4C10 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_010_Henry.mp3";
import clipPage4C9 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_009_buy_some_carrots_and_zucchini.mp3";
import clipPage4C8 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_008_buy_fruit_to_make_fruit_salad.mp3";
import clipPage4C7 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_007_He.mp3";
import clipPage4C6 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_006_won't_buy_soda_because_he_doesn't_think_it_is_very_healthy.mp3";
import clipPage4C5 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_005_chips,_so_he_will_be_able_to_make_some_chocolate_chip_cookies._Finally,.mp3";
import clipPage4C4 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_004_too._For_dessert,_he_will_buy_some_fruit_to_make_a_fruit_salad._He_will.mp3";
import clipPage4C3 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_003_spaghetti_dish._He_won't_buy_green_peppers._He_will_need_to_pick_up_some.mp3";
import clipPage4C2 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_002_friends_over_to_his_house_for_dinner._He_will_buy_some_eggplants,_zucchi.mp3";
import clipPage4C1 from "../../../assets/audio/WorkBook/Unit 1/Page 4 - C/Item_001_Henry_will_go_to_the_grocery_store_near_his_house_tomorrow._He_won't_go.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — غيّر المسار حسب مشروعك
// ─────────────────────────────────────────────
import chefImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 4/SVG/Asset 8.svg";
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
const PARAGRAPH_TEXT_COLOR     = "#2b2b2b";   // لون نص الفقرة
const PARAGRAPH_BG_COLOR       = "transparent"; // خلفية منطقة الفقرة

const INPUT_UNDERLINE_DEFAULT  = "#3f3f3f";   // خط input الفارغ
const INPUT_UNDERLINE_WRONG    = "#ef4444";   // خط input عند الخطأ
const INPUT_UNDERLINE_CORRECT  = "#3f3f3f";   // خط input عند الصواب

const INPUT_TEXT_COLOR         = "#2b2b2b";   // لون نص المستخدم
const INPUT_ANSWER_TEXT_COLOR  = "#c81e1e";   // لون الإجابة عند Show Answer

const WRONG_BADGE_BG           = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT_COLOR   = "#ffffff";   // نص badge الخطأ

const SENTENCE_TEXT_COLOR      = "#2b2b2b";   // لون نص الجمل
const NUMBER_COLOR             = "#2b2b2b";   // لون الأرقام

const IMG_BORDER_RADIUS        = "12px";
const IMG_WIDTH                = "clamp(160px, 24vw, 280px)";
const IMG_HEIGHT               = "clamp(160px, 24vw, 280px)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Henry will go to the grocery store near his house tomorrow. He won't go to one that is far away. He is inviting friends over to his house for dinner. He will buy some eggplants, zucchini, and carrots to make a vegetarian spaghetti dish. He won't buy green peppers. He will need to pick up some garlic bread to go with his spaghetti, too. For dessert, he will buy some fruit to make a fruit salad. He will also get some milk, flour, and chocolate chips, so he will be able to make some chocolate chip cookies. Finally, he will buy bottled water and juice. He won't buy soda because he doesn't think it is very healthy.`;

// الخيارين المتاحين فقط
const OPTIONS = ["will", "won't"];

// correctAnswers: array بكل الصياغات المقبولة لكل إجابة
const WILL_ANSWERS  = ["will"];
const WONT_ANSWERS  = ["won't", "wont", "will not", "willnot"];

const ITEMS = [
  { id: 1, before: "He",     after: "buy fruit to make fruit salad.",  correctAnswers: WILL_ANSWERS },
  { id: 2, before: "He",     after: "buy some carrots and zucchini.",  correctAnswers: WILL_ANSWERS },
  { id: 3, before: "Henry",  after: "go to the store far away.",       correctAnswers: WONT_ANSWERS },
  { id: 4, before: "He",     after: "buy bottled water and juice.",    correctAnswers: WILL_ANSWERS },
  { id: 5, before: "He",     after: "buy green peppers.",              correctAnswers: WONT_ANSWERS },
  { id: 6, before: "He",     after: "also get milk and flour.",        correctAnswers: WILL_ANSWERS },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE + CHECK
// ─────────────────────────────────────────────


// يرجع true إذا الإجابة مقبولة (أي قيمة من الـ array)


// الإجابة الأولى في الـ array هي اللي تتعرض في Show Answer


// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Unit1_Page4_Q1() {
const listening=useExerciseListening("wb_unit1_page4_q1");

  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ITEMS.map(item=>({key:item.id,correct:item.correctAnswers,answer:item.correctAnswers[0],label:`Sentence ${item.id}. ${item.before} blank ${item.after}`}));const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  // 🔒 بعد check أو show answer — inputs مقفولة
  const isLocked=checkDisabled;

  // ── handlers ──────────────────────────────
  const handleChange=(key,value)=>{if(showAns||results[key]==="correct")return;setAnswers(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[key];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>answers[item.key]?.trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.key])===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer=()=>{listening.stop();setAnswers(Object.fromEntries(answerTargets.map(item=>[item.key,item.answer])));setResults({});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");};

  const handleReset=()=>{listening.stop();setAnswers({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWrong=item=>!showAns&&results[item.id]==="wrong";

  const getUnderlineColor = (item) => {
    if (!showResults || showAns) return INPUT_UNDERLINE_DEFAULT;
    return isWrong(item) ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_CORRECT;
  };

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page4_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page4_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Paragraph — full width ── */
        .www-paragraph {
font-size: clamp(18px, 1.9vw, 18px);
          line-height: 1.5;
          color: ${PARAGRAPH_TEXT_COLOR};
          background: ${PARAGRAPH_BG_COLOR};
          text-align: justify;
          margin: 0;
          width: 100%;
        }

        /* ── Questions area: list LEFT | image RIGHT ── */
        .www-questions {
          display: grid;
          grid-template-columns: minmax(0, 1fr) ${IMG_WIDTH};
          gap: clamp(16px, 2.4vw, 28px);
          align-items: start;
          width: 100%;
        }

        .www-list {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.2vw, 12px);
        }

        /* ── Single question row: num | sentence-line ── */
        .www-row {
          display: grid;
          grid-template-columns: clamp(18px, 2vw, 26px) minmax(0, 1fr);
          gap: clamp(6px, 1vw, 12px);
          align-items: center;
        }

        .www-num {
font-size: clamp(15px, 1.9vw, 22px);       
          color: ${NUMBER_COLOR};
          line-height: 1;
          align-self: center;
        }

        /* sentence = before + input + after — همسطر ومع بعض */
        .www-sentence-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.6vw, 8px);
          min-width: 0;
        }

        .www-text {
font-size: clamp(20px, 1.9vw, 20px);          
          color: ${SENTENCE_TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
          padding-bottom: 4px;
          flex-shrink: 0;
        }

        .www-img-box {
          width: 100%;

          height: ${IMG_HEIGHT};
          overflow: hidden;
        }
        .www-img {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Input wrapper */
        .www-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          flex-shrink: 0;
        }

        /* Input — underline only */
        .www-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(80px, 10vw, 130px);
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .www-input:disabled {
          cursor: default;
        }

        /* ✕ Wrong badge */
        .www-badge {
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
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Spacer column (right side under questions — empty) */
        .www-spacer { width: 100%; }

        /* Buttons */
        .www-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .www-questions {
            grid-template-columns: 1fr;
          }
          .www-img-box {
            width: 100%;
            max-width: 340px;
            margin: 0 auto;
          }

          .www-text { white-space: normal; }
        }

        @media (max-width: 480px) {
          .www-input { width: clamp(70px, 28vw, 110px); }
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
        <ExerciseHeader subTitle="Read the full task first, complete one item at a time, and check each answer before moving on." sectionLetter="C" title={<>Read and write{" "}
          <span style={{ color: "#f89631", fontStyle: "italic" }}>will</span>
          {" "}or{" "}
          <span style={{ color: "#f89631", fontStyle: "italic" }}>won't</span>.</>} />

        {/* ── Paragraph — full width ── */}
        <p className="www-paragraph">{(()=>{const t=PARAGRAPH,starts=[0,...["friends over","spaghetti dish.","too.","chips,","won't buy soda"].map(x=>t.indexOf(x))];return starts.map((at,i)=>renderExerciseAudioText({audio:listening,id:"paragraph-"+i,src:[clipPage4C1,clipPage4C2,clipPage4C3,clipPage4C4,clipPage4C5,clipPage4C6][i],label:t.slice(at,starts[i+1]??t.length),children:t.slice(at,starts[i+1]??t.length)}));})()}</p>

        {/* ── Bottom: questions LEFT | image RIGHT ── */}
        <div className="www-questions">
          <div className="www-list">
            {ITEMS.map((item) => {
              const wrong  = isWrong(item);
              const value  = answers[item.id] || "";
              const uColor = getUnderlineColor(item);
              const tColor = showAns ? INPUT_ANSWER_TEXT_COLOR : INPUT_TEXT_COLOR;

              return (
                <div key={item.id} className="www-row">

                  {/* Number */}
                  <span className="www-num">{item.id}</span>

                  {/* Sentence: before + input + after — all on one line */}
                  <div className="www-sentence-line">

                    {item.before && (
                      <span className="www-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:item.id===3?clipPage4C10:clipPage4C7,label:item.before,children:item.before})}</span>
                    )}

                    {/* Input + badge */}
                    <div className="www-input-wrap">
                      <input aria-invalid={results[item.id]==="wrong"} placeholder="will / won’t" title={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key===item.id)?.label||"Complete this answer"} {...fieldKeys}
                        type="text"
                        className="www-input"
                        value={value}
                        disabled={showAns||results[item.id]==="correct"}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        style={(base=>({...base,borderBottomColor:showAns||results[item.id]==="correct"?"#16a34a":results[item.id]==="wrong"?"#ef4444":base.borderBottomColor}))({
                          borderBottomColor: uColor,
                          color: tColor,
                          cursor: isLocked ? "default" : "text",
                        })}
                        spellCheck={false}
                        autoComplete="off"
                      />
                      {wrong && <div className="www-badge">✕</div>}
                    </div>

                    {item.after && (
                      <span className="www-text">{renderExerciseAudioText({audio:listening,id:`after-${item.id}`,src:[clipPage4C8,clipPage4C9,clipPage4C11,clipPage4C12,clipPage4C13,clipPage4C14][item.id-1],label:item.after,children:item.after})}</span>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Image — bottom right */}
          <div className="www-img-box">
            <img src={chefImg} alt={"A chef stirring food in a pot in a kitchen."} className="www-img" />
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="www-buttons">
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