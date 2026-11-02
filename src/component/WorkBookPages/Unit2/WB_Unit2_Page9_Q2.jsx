import clipPage9B4 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - B/Item_004_Australia.mp3";
import clipPage9B3 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - B/Item_003_New_York_City.mp3";
import clipPage9B2 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - B/Item_002_kangaroos.mp3";
import clipPage9B1 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - B/Item_001_Statue_of_Liberty.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const TABLE_BORDER_COLOR      = "#2096a6";
const WORD_BANK_BORDER        = "#2096a6";
const WORD_BANK_TEXT          = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const PLACE_TEXT_COLOR        = "#2b2b2b";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["Statue of Liberty", "kangaroos"];

const ROWS = [
  {
    id: 1,
    place: "New York City",
    correctWord: "Statue of Liberty",
    correctSentence: [
      "I am going to see the Statue of Liberty when I visit New York City.",
      "I am going to see the Statue of Liberty when I visit New York City",
    ],
    answerWord:     "Statue of Liberty",
    answerSentence: "I am going to see the Statue of Liberty when I visit New York City.",
  },
  {
    id: 2,
    place: "Australia",
    correctWord: "kangaroos",
    correctSentence: [
      "I am going to see the kangaroos when I visit Australia next year.",
      "I am going to see the kangaroos when I visit Australia next year",
    ],
    answerWord:     "kangaroos",
    answerSentence: "I am going to see the kangaroos when I visit Australia next year.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────






// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_PutWord_QB() {
const listening=useExerciseListening("wb_unit2_page9_q2");

  const [wordInputs,  setWordInputs]  = useState({});
  const [sentences,   setSentences]   = useState({});
  const [, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
const [results,setResults]=useState({}),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);const answerTargets=ROWS.flatMap(row=>[{key:"word-"+row.id,correct:[row.correctWord],answer:row.answerWord,label:`Row ${row.id}, ${row.place}. Choose a word from the bank.`},{key:"sentence-"+row.id,correct:row.correctSentence,answer:row.answerSentence,label:`Row ${row.id}, ${row.place}. Write a complete sentence using going to.`}]);const readAnswer=key=>key.startsWith("word-")?wordInputs[key.slice(5)]||"":sentences[key.slice(9)]||"";const checkDisabled=showAns||answerTargets.every(item=>results[item.key]==="correct");

  

  // ── handlers ──────────────────────────────
  const handleWordChange=(key,value)=>{const resultKey="word-"+key;if(showAns||results[resultKey]==="correct")return;setWordInputs(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleSentenceChange=(key,value)=>{const resultKey="sentence-"+key;if(showAns||results[resultKey]==="correct")return;setSentences(prev=>({...prev,[key]:value}));setResults(prev=>{const next={...prev};delete next[resultKey];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!answerTargets.every(item=>readAnswer(item.key).trim())){ValidationAlert.info("Please complete all answers first.");setAnnouncement("Please complete all answers first.");return;}const next=Object.fromEntries(answerTargets.map(item=>[item.key,results[item.key]==="correct"||item.correct.some(correct=>normalizeAnswer(readAnswer(item.key))===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`);if(score===answerTargets.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const wi = {}, sc = {};
    ROWS.forEach((r) => { wi[r.id] = r.answerWord; sc[r.id] = r.answerSentence; });
    setWordInputs(wi);
    setSentences(sc);
    setShowResults(false);
    setShowAns(true);
  setResults({});setAnnouncement("Correct answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setWordInputs({});
    setSentences({});
    setShowResults(false);
    setShowAns(false);
  setResults({});setAnnouncement("Answers and feedback cleared.");};

  // ── helpers ───────────────────────────────
  const isWordWrong=id=>!showAns&&results["word-"+id]==="wrong";

  const isSentenceWrong=id=>!showAns&&results["sentence-"+id]==="wrong";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page9_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page9_Q2"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Word bank (display only) ── */
        .pwg-bank {
          display: flex;
          gap: clamp(12px, 2vw, 24px);
          flex-wrap: wrap;
          justify-content: center;
        }

        .pwg-bank-word {
          border: 2px solid ${WORD_BANK_BORDER};
          border-radius: 8px;
          padding: clamp(6px, 0.9vw, 10px) clamp(14px, 2vw, 22px);
font-size: clamp(15px, 1.9vw, 22px);
=          color: ${WORD_BANK_TEXT};
          background: #fff;
          user-select: none;
        }

        /* ── Table ── */
        .pwg-table {
          width: 100%;
          border: 2px solid ${TABLE_BORDER_COLOR};
          border-radius: 12px;
          overflow: hidden;
        }

        .pwg-row {
          display: grid;
          grid-template-columns: minmax(110px, 20%) 1fr;
          border-bottom: 1px solid ${TABLE_BORDER_COLOR};
        }
        .pwg-row:last-child { border-bottom: none; }

        /* Left — place name */
        .pwg-place-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(14px, 2vw, 22px) clamp(10px, 1.4vw, 16px);
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          background: #fff;
        }
        .pwg-place-name {
font-size: clamp(15px, 1.9vw, 22px);
          color: ${PLACE_TEXT_COLOR};
          text-align: center;
          line-height: 1.4;
        }

        /* Right — word input + sentence */
        .pwg-right-cell {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
          padding: clamp(14px, 2vw, 22px) clamp(14px, 2vw, 20px);
          background: #fff;
        }

        /* Input wrapper with badge */
        .pwg-input-wrap { position: relative; }

        /* Shared input style */
        .pwg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 22px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .pwg-input:disabled      { opacity: 1; cursor: default; }
        .pwg-input--wrong        { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .pwg-input--answer       { color: ${INPUT_ANSWER_COLOR}; }

        /* Word input slightly bold */

        /* ✕ wrong badge */
        .pwg-badge {
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
        .pwg-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* Field label */
        .pwg-label {
font-size: clamp(10px, 1.9vw, 17px);
          color: #888;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 2px;
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
        <ExerciseHeader subTitle="Use the picture or word clues to build one complete sentence at a time, then reread it before checking." sectionLetter="B" title={<>Put each word in the correct place. Then write a sentence using{" "}
          <span style={{ color: "#f89631", fontStyle: "italic", fontWeight: 400 }}>going to</span>.</>} />

        {/* ── Word bank (display only) ── */}
        <div className="pwg-bank">
          {WORD_BANK.map((word) => (
            <div key={word} className="pwg-bank-word">
              {renderExerciseAudioText({audio:listening,id:`bank-${word}`,src:[clipPage9B1,clipPage9B2][WORD_BANK.indexOf(word)],label:word,children:word})}
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="pwg-table">
          {ROWS.map((row) => {
            const wordWrong = isWordWrong(row.id);
            const sentWrong = isSentenceWrong(row.id);
            const wordVal   = wordInputs[row.id] || "";
            const sentVal   = sentences[row.id]  || "";

            return (
              <div key={row.id} className="pwg-row">

                {/* Place name */}
                <div className="pwg-place-cell">
                  <span className="pwg-place-name">{renderExerciseAudioText({audio:listening,id:`place-${row.id}`,src:[clipPage9B3,clipPage9B4][row.id-1],label:row.place,children:row.place})}</span>
                </div>

                {/* Right: word input + sentence input */}
                <div className="pwg-right-cell">

                  {/* Word input */}
                  <div className="pwg-input-wrap">
                    <div className="pwg-label">Word</div>
                    <input style={(base=>({...base,borderBottomColor:showAns||results["word-"+row.id]==="correct"?"#16a34a":results["word-"+row.id]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results["word-"+row.id]==="wrong"} title={answerTargets.find(t=>t.key==="word-"+row.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key==="word-"+row.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "pwg-input",
                        "pwg-input--word",
                        wordWrong ? "pwg-input--wrong"  : "",
                        showAns   ? "pwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={wordVal}
                      disabled={showAns||results["word-"+row.id]==="correct"}
                      onChange={(e) => handleWordChange(row.id, e.target.value)}
                      placeholder="Type the word…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wordWrong && <div className="pwg-badge">✕</div>}
                  </div>

                  {/* Sentence input */}
                  <div className="pwg-input-wrap">
                    <div className="pwg-label">Sentence</div>
                    <input style={(base=>({...base,borderBottomColor:showAns||results["sentence-"+row.id]==="correct"?"#16a34a":results["sentence-"+row.id]==="wrong"?"#ef4444":base.borderBottomColor}))({})} aria-invalid={results["sentence-"+row.id]==="wrong"} title={answerTargets.find(t=>t.key==="sentence-"+row.id)?.label||"Complete this answer"} aria-label={answerTargets.find(t=>t.key==="sentence-"+row.id)?.label||"Complete this answer"} {...fieldKeys}
                      type="text"
                      className={[
                        "pwg-input",
                        sentWrong ? "pwg-input--wrong"  : "",
                        showAns   ? "pwg-input--answer" : "",
                      ].filter(Boolean).join(" ")}
                      value={sentVal}
                      disabled={showAns||results["sentence-"+row.id]==="correct"}
                      onChange={(e) => handleSentenceChange(row.id, e.target.value)}
                      placeholder="Write a sentence using going to…"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {sentWrong && <div className="pwg-badge">✕</div>}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="pwg-buttons">
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