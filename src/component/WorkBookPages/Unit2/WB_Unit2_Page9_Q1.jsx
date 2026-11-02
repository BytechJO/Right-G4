import clipPage9A7 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_007_said_when_taking_a_picture_to_get_people_to_smile_a_little.mp3";
import clipPage9A6 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_006_said_when_you_have_the_same_information.mp3";
import clipPage9A5 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_005_Across.mp3";
import clipPage9A4 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_004_definitely;_when_you_will_certainly_do_something.mp3";
import clipPage9A3 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_003_asking_another_person_what_they_are_doing.mp3";
import clipPage9A2 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_002_that's_amazing;_it's_hard_to_believe.mp3";
import clipPage9A1 from "../../../assets/audio/WorkBook/Unit 2/Page 9 - A/Item_001_Down.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, {useState,useRef} from "react";
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



// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const CELL_BG             = "#ffffff";   // خلفية الخلية العادية
const CELL_BORDER         = "#2096a6";   // بوردر الخلية
const CELL_HIGHLIGHT_BG   = "#d4f1f4";   // خلفية الكلمة المحددة
const CELL_ACTIVE_BG      = "#2096a6";   // خلفية الخلية النشطة (للكتابة)
const CELL_ACTIVE_TEXT    = "#ffffff";   // لون حرف الخلية النشطة
const CELL_TEXT           = "#2b2b2b";   // لون حرف عادي
const CELL_WRONG_TEXT     = "#ef4444";   // لون حرف غلط
const CELL_ANSWER_TEXT    = "#c81e1e";   // لون حرف Show Answer
const NUMBER_COLOR        = "#000000ff";   // لون رقم الخلية
const CLUE_NUM_COLOR      = "#2b2b2b";   // لون رقم التلميح
const CLUE_TEXT_COLOR     = "#2b2b2b";   // لون نص التلميح
const CLUE_ACTIVE_BG      = "#d4f1f4";   // خلفية التلميح المحدد
const CELL_SIZE           = 36;          // حجم الخلية بالـ px

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
//
// Layout (verified, no conflicts):
// word1 DOWN  "icantbelieveit" : col=5, rows 0-13
// word2 DOWN  "howaboutyou"    : col=9, rows 1-11
// word3 DOWN  "sure"           : col=0, rows 6-9
// word3 ACROSS "samehere"      : row=6, cols 0-7
// word4 ACROSS "saycheese"     : row=11, cols 0-8
//
// Intersections (no conflicts):
//  (6,5)  'e' → icantbelieveit ∩ samehere
//  (6,0)  's' → sure           ∩ samehere
//  (11,5) 'e' → icantbelieveit ∩ saycheese
//
const WORDS = [
  {
    id: 1,   numberId: 1, dir: "down",
    answer:  "icantbelieveit",
    display: "I can't believe it!",
    row: 0,  col: 5,
    clueDir: "Down",
    clue:    "that's amazing; it's hard to believe",
  },
  {
    id: 2,   numberId: 2, dir: "down",
    answer:  "howaboutyou",
    display: "How about you?",
    row: 1,  col: 7,
    clueDir: "Down",
    clue:    "asking another person what they are doing",
  },
  {
    id: "3d", numberId: 3, dir: "down",
    answer:  "isuream",
    display: "Sure!",
    row: 3,  col: 3,
    clueDir: "Down",
    clue:    "definitely; when you will certainly do something",
  },
  {
    id: "3a", numberId: 3, dir: "across",
    answer:  "iknow",
    display: "i know",
    row: 3,  col: 3,
    clueDir: "Across",
    clue:    "said when you have the same information",
  },
  {
    id: 4,   numberId: 4, dir: "across",
    answer:  "saycheese",
    display: "Say cheese!",
    row:7, col: -5,
    clueDir: "Across",
    clue:    "said when taking a picture to get people to smile a little",
  },
];

// ── Build cell map ────────────────────────────
const buildCellMap = () => {
  const map   = {};
  const nums  = {};   // cellKey → number label
  WORDS.forEach((w) => {
    const startKey = `${w.row}-${w.col}`;
    if (!nums[startKey]) nums[startKey] = w.numberId;

    for (let i = 0; i < w.answer.length; i++) {
      const r = w.dir === "down"   ? w.row + i : w.row;
      const c = w.dir === "across" ? w.col + i : w.col;
      const k = `${r}-${c}`;
      if (!map[k]) map[k] = { letter: w.answer[i], r, c, wordIds: [] };
      if (!map[k].wordIds.includes(w.id)) map[k].wordIds.push(w.id);
    }
  });
  Object.entries(nums).forEach(([k, n]) => {
    if (map[k]) map[k].number = n;
  });
  return map;
};

const CELL_MAP = buildCellMap();

// grid bounding box
const ALL_R = Object.values(CELL_MAP).map((c) => c.r);
const ALL_C = Object.values(CELL_MAP).map((c) => c.c);
const MIN_R = Math.min(...ALL_R);
const MAX_R = Math.max(...ALL_R);
const MIN_C = Math.min(...ALL_C);
const MAX_C = Math.max(...ALL_C);
const GRID_W = (MAX_C - MIN_C + 1) * CELL_SIZE;
const GRID_H = (MAX_R - MIN_R + 1) * CELL_SIZE;

// get all cell keys for a word
const getWordCells = (word) => {
  const cells = [];
  for (let i = 0; i < word.answer.length; i++) {
    const r = word.dir === "down"   ? word.row + i : word.row;
    const c = word.dir === "across" ? word.col + i : word.col;
    cells.push(`${r}-${c}`);
  }
  return cells;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_Crossword_QA() {
const listening=useExerciseListening("wb_unit2_page9_q1");

  const [userInput,    setUserInput]    = useState({});
  const [activeWordId, setActiveWordId] = useState(null);
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
const [results,setResults]=useState({}),[cellResults,setCellResults]=useState({}),[announcement,setAnnouncement]=useState("");const inputRefs=useRef({}),resetButtonRef=useRef(null);const [activeCell,setActiveCell]=useState(null);const checkDisabled=showAns||WORDS.every(w=>results[w.id]==="correct");const cellLocked=key=>showAns||CELL_MAP[key].wordIds.some(id=>results[id]==="correct");const focusWord=id=>{const w=WORDS.find(w=>w.id===id);const key=getWordCells(w).find(key=>!cellLocked(key))||getWordCells(w)[0];setActiveWordId(id);setActiveCell(key);inputRefs.current[key]?.focus({preventScroll:true});};const moveCell=(key,dr,dc)=>{const cell=CELL_MAP[key];const next=Object.entries(CELL_MAP).filter(([k,c])=>!cellLocked(k)&&(dr?c.c===cell.c&&(c.r-cell.r)*dr>0:c.r===cell.r&&(c.c-cell.c)*dc>0)).sort(([,a],[,b])=>dr?Math.abs(a.r-cell.r)-Math.abs(b.r-cell.r):Math.abs(a.c-cell.c)-Math.abs(b.c-cell.c))[0];if(next)inputRefs.current[next[0]]?.focus({preventScroll:true});};const changeCell=(key,value)=>{if(cellLocked(key))return;const letter=value.slice(-1).toLowerCase();if(letter&&!/^[a-z]$/.test(letter))return;setUserInput(prev=>({...prev,[key]:letter}));setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([id,result])=>result==="correct"||!CELL_MAP[key].wordIds.some(w=>String(w)===id))));setCellResults(prev=>{const next={...prev};delete next[key];return next;});if(letter){const w=WORDS.find(w=>w.id===activeWordId)||WORDS.find(w=>w.id===CELL_MAP[key].wordIds[0]),cells=getWordCells(w);const next=cells.slice(cells.indexOf(key)+1).find(k=>!cellLocked(k));if(next)inputRefs.current[next]?.focus({preventScroll:true});}};

  

  const activeWord      = WORDS.find((w) => w.id === activeWordId) || null;
  const activeWordCells = activeWord ? new Set(getWordCells(activeWord)) : new Set();

  // ── click on cell ─────────────────────────
  const handleCellClick=key=>{if(checkDisabled)return;const cell=CELL_MAP[key];if(!cell)return;const at=cell.wordIds.indexOf(activeWordId);setActiveWordId(cell.wordIds[(at+1)%cell.wordIds.length]);setActiveCell(key);inputRefs.current[key]?.focus({preventScroll:true});};

  // ── click on clue ─────────────────────────
  const clueSounds = {
    "clue-1": clipPage9A2,
    "clue-2": clipPage9A3,
    "clue-3d": clipPage9A4,
    "clue-3a": clipPage9A6,
    "clue-4": clipPage9A7,
    "direction-Down": clipPage9A1,
    "direction-Across": clipPage9A5,
  };
  const handleClueClick = (id, enterGrid = false) => {
    listening.play("clue-" + id, clueSounds["clue-" + id]);
    if (checkDisabled) return;
    setActiveWordId(id);
    if (enterGrid) focusWord(id);
  };
  const handleClueKeyDown = (event, id) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) handleClueClick(id, true);
  };
  const handleTabAudio = (event) => {
    if (event.key !== "Tab" || event.target !== document.activeElement) return;
    const id = event.target.getAttribute("data-listening");
    if (clueSounds[id]) listening.play(id, clueSounds[id]);
  };

  // ── keyboard input ────────────────────────
  const handleKeyDown=(event,key)=>{if(event.key==="Tab")return;event.stopPropagation();const d={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]};if(d[event.key]){event.preventDefault();moveCell(key,...d[event.key]);}else if(event.key==="Enter"||event.key===" "){event.preventDefault();if(!event.repeat)handleCellClick(key);}else if(event.key==="Backspace"&&!userInput[key]&&!cellLocked(key)){event.preventDefault();const w=WORDS.find(w=>w.id===activeWordId);moveCell(key,w?.dir==="down"?-1:0,w?.dir==="down"?0:-1);}};

  // ── check / answer / reset ────────────────
  const handleCheck=()=>{if(checkDisabled)return;listening.stop();if(!Object.keys(CELL_MAP).every(k=>userInput[k])){ValidationAlert.info("Please fill in all words first.");return;}const next=Object.fromEntries(WORDS.map(w=>[w.id,results[w.id]==="correct"||getWordCells(w).map(k=>userInput[k]||"").join("")===w.answer?"correct":"wrong"])),score=Object.values(next).filter(v=>v==="correct").length;setResults(next);setCellResults(Object.fromEntries(Object.entries(CELL_MAP).map(([k,cell])=>[k,userInput[k]===cell.letter?"correct":"wrong"])));setShowResults(true);setAnnouncement(`Score: ${score} out of ${WORDS.length}. Correct words are locked.`);if(score===WORDS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);else ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    Object.entries(CELL_MAP).forEach(([k, cell]) => { filled[k] = cell.letter; });
    setUserInput(filled);
    setShowResults(false);
    setShowAns(true);
    setActiveWordId(null);
  setResults({});setCellResults({});setActiveCell(null);setAnnouncement("Correct crossword shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setUserInput({});
    setShowResults(false);
    setShowAns(false);
    setActiveWordId(null);
  setResults({});setCellResults({});setActiveCell(null);setAnnouncement("Crossword cleared.");};

  // ── cell status (after check) ─────────────
  const getCellStatus=key=>showAns||cellLocked(key)?"correct":cellResults[key]||null;

  // ── current typing position ───────────────
  const getTypingCell=()=>activeCell;
  const typingCell = getTypingCell();

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit2_WB_Unit2_Page9_Q1"
      className="main-container-component"
      onKeyUpCapture={handleTabAudio}
      
      style={{ outline: "none" }}
    ><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit2_WB_Unit2_Page9_Q1"] input:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit2_WB_Unit2_Page9_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .cw-body {
          display: flex;
          gap: clamp(20px, 3vw, 48px);
          align-items: flex-start;
          flex-wrap: wrap;
        }

        /* ── Clues ── */
        .cw-clues {
          flex: 1 1 200px;
          display: flex;
          flex-direction: column;
          gap:50px;
          min-width: 180px;
        }
        .cw-clue-dir {
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 700;
          color: ${CLUE_NUM_COLOR};
          margin-bottom: 4px;
        }
        .cw-clue-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }
        .cw-clue-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          padding: 6px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .cw-clue-item:hover        { background: rgba(32,150,166,0.08); }
        .cw-clue-item--active      { background: ${CLUE_ACTIVE_BG}; }
        .cw-clue-num {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 700;
          color: ${CLUE_NUM_COLOR};
          flex-shrink: 0;
          min-width: 18px;
        }
        .cw-clue-text {
          font-size: clamp(13px, 1.5vw, 17px);
          color: ${CLUE_TEXT_COLOR};
          line-height: 1.5;
        }

        /* ── Grid ── */
        .cw-grid-wrap { flex-shrink: 0; }
        .cw-grid      { position: relative; 
         }

        /* ── Grid background — black with cells on top ── */
        .cw-grid {
  background: transparent;        
  
          border-radius: 3px;
        }

        /* ── Cell ── */
        .cw-cell {
          position: absolute;
          box-sizing: border-box;
          border: 1.5px solid ${CELL_BORDER};
          background: ${CELL_BG};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.1s;
        }
        .cw-cell--highlight { background: ${CELL_HIGHLIGHT_BG}; }
        .cw-cell--typing    { background: ${CELL_ACTIVE_BG}; }
        .cw-cell--typing .cw-letter { color: ${CELL_ACTIVE_TEXT}; }
        .cw-cell--wrong  .cw-letter { color: ${CELL_WRONG_TEXT}; }
        .cw-cell--answer .cw-letter { color: ${CELL_ANSWER_TEXT}; }

        .cw-num {
          position: absolute;
          top: 1px; left: 2px;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }
        .cw-letter {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${CELL_TEXT};
          text-transform: uppercase;
          line-height: 1;
        }

        /* ── Buttons ── */
        .cw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 640px) {
          .cw-body { flex-direction: column-reverse; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 24px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader subTitle="Read one definition at a time, solve the expression, then use the crossing letters to check the spelling." sectionLetter="A" title={<>Write the expression for each definition.</>} />

        <div className="cw-body">

          {/* ── Clues ── */}
          <div className="cw-clues">
            {["Down", "Across"].map((dir) => (
              <div key={dir}>
                <div className="cw-clue-dir">{renderExerciseAudioText({audio:listening,id:`direction-${dir}`,src:dir==="Down"?clipPage9A1:clipPage9A5,label:dir,children:dir})}</div>
                <div className="cw-clue-list">
                  {WORDS.filter((w) => w.clueDir === dir).map((w) => (
                    <div
                      key={w.id} data-listening={"clue-"+w.id} style={{position:"relative",background:listening.activeId==="clue-"+w.id?"#dbeafe":undefined,boxShadow:listening.activeId==="clue-"+w.id?"0 0 0 3px #2563eb":undefined}} role="button" tabIndex={0} data-keyboard-choice onKeyDown={event=>handleClueKeyDown(event,w.id)} onKeyUp={activationKeys.onKeyUp} aria-label={`${w.clueDir} ${w.numberId}. ${w.clue}`}
                      className={`cw-clue-item ${activeWordId === w.id ? "cw-clue-item--active" : ""}`}
                      onClick={() => handleClueClick(w.id)}
                    >
                      <span className="cw-clue-num">{w.numberId}</span>
                      <span className="cw-clue-text">{w.clue}</span>{listening.activeId==="clue-"+w.id&&renderExerciseSpeaker()}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Grid ── */}
          <div className="cw-grid-wrap">
            <div className="cw-grid" style={{ width: `${GRID_W}px`, height: `${GRID_H}px` }}>
              {Object.entries(CELL_MAP).sort(([,a],[,b])=>a.r-b.r||a.c-b.c).map(([k, cell]) => {
                const { r, c, number } = cell;
                const status    = getCellStatus(k);
                const isInWord  = activeWordCells.has(k);
                const isTyping  = isInWord && k === typingCell;
                const letter    = userInput[k] || "";

                let cls = "cw-cell";
                if (isTyping)               cls += " cw-cell--typing";
                else if (isInWord)          cls += " cw-cell--highlight";
                if (status === "wrong")     cls += " cw-cell--wrong";
                if (showAns)                cls += " cw-cell--answer";

                return (
                  <div
                    key={k}
                    className={cls}
                    style={{
                      borderColor:status==="correct"?"#16a34a":status==="wrong"?"#ef4444":undefined,
                      left:   `${(c - MIN_C) * CELL_SIZE}px`,
                      top:    `${(r - MIN_R) * CELL_SIZE}px`,
                      width:  `${CELL_SIZE}px`,
                      height: `${CELL_SIZE}px`,
                    }}
                    onClick={() => handleCellClick(k)}
                  >
                    {number && <span className="cw-num">{number}</span>}
                    <input data-grid-cell aria-label={`Row ${r-MIN_R+1}, column ${c-MIN_C+1}. ${cell.wordIds.map(id=>{const w=WORDS.find(w=>w.id===id);return `${w.clueDir} ${w.numberId}, letter ${getWordCells(w).indexOf(k)+1}`;}).join("; ")}`} title="Enter or Space changes direction. Arrow keys move between cells." ref={el=>{inputRefs.current[k]=el;}} onFocus={()=>{setActiveCell(k);if(!cell.wordIds.includes(activeWordId))setActiveWordId(cell.wordIds[0]);}} onClick={event=>event.stopPropagation()} onKeyDown={event=>handleKeyDown(event,k)} onKeyUp={event=>{if(event.key!=="Tab")event.stopPropagation();}} onChange={event=>changeCell(k,event.target.value)} value={letter} readOnly={cellLocked(k)} aria-invalid={status==="wrong"} aria-readonly={cellLocked(k)} type="text" maxLength={1} autoComplete="off" spellCheck={false} className="cw-letter" style={{width:"100%",height:"100%",padding:0,border:0,outline:0,textAlign:"center",background:"transparent",fontFamily:"inherit",borderRadius:6}}/>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="cw-buttons">
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