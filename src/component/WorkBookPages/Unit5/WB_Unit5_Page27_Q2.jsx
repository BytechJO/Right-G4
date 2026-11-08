import clipPage27B11 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_011_stomach.mp3";
import clipPage27B10 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_010_drink.mp3";
import clipPage27B9 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_009_back.mp3";
import clipPage27B8 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_008_flu.mp3";
import clipPage27B7 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_007_stay.mp3";
import clipPage27B6 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_006_bed.mp3";
import clipPage27B5 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_005_awful.mp3";
import clipPage27B4 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_004_hurts.mp3";
import clipPage27B3 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_003_head.mp3";
import clipPage27B2 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_002_spoiled.mp3";
import clipPage27B1 from "../../../assets/audio/WorkBook/Unit 5/Page 27 - B/Item_001_water.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect } from "react";
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
const CELL_BORDER_COLOR   = "#2096a6";   // بوردر خلايا الجدول
const CELL_BG_DEFAULT     = "#ffffff";   // خلفية الخلية العادية
const CELL_BG_SELECTING   = "#b2dfdb";   // خلفية الخلية أثناء التحديد
const CELL_TEXT_SELECTING = "#004d40";   // لون نص الخلية أثناء التحديد
const CELL_BG_WRONG       = "#ffcdd2";   // خلفية الخلية عند تحديد غلط
const CELL_TEXT_WRONG     = "#b71c1c";   // لون نص الخلية عند تحديد غلط
const CELL_TEXT_DEFAULT   = "#263238";   // لون نص الخلية العادية
const CELL_TEXT_FOUND     = "#ffffff";   // لون نص الخلية المكتشفة
const WORD_LIST_BORDER    = "#2096a6";   // بوردر قائمة الكلمات
const WORD_TEXT_COLOR     = "#37474f";   // لون نص الكلمات في القائمة

// ألوان الكلمات المكتشفة — كل كلمة بلون مختلف
const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e","#039be5",
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// الجدول 10×10 — مطابق للكتاب بالضبط
const GRID = [
  ["h","a","s","r","f","s","t","l","s","p"],
  ["e","d","r","u","t","p","a","a","t","w"],
  ["a","e","w","r","y","o","w","k","o","a"],
  ["d","b","u","a","o","i","f","n","m","t"],
  ["a","h","t","h","t","l","u","i","a","o"],
  ["c","s","f","l","u","e","l","r","c","f"],
  ["b","a","c","k","h","d","r","d","h","b"],
];

// كل كلمة + مسار خلاياها [row, col] — مطابق للكتاب
// التقاطعات: machines ∩ homework عند (3,0) | robot ∩ homework عند (3,1)
const WORD_DEFS = [
  { word: "water",     cells: [[2,2],[3,3],[4,4],[5,5],[6,6]] },
  { word: "spoiled",     cells: [[0,5],[1,5],[2,5],[3,5],[4,5] , [5,5], [6,5]] },
  { word: "head",  cells: [[0,0],[1,0],[2,0],[3,0]] },
  { word: "hurts",  cells: [[4,1],[3,2],[2,3],[1,4],[0,5]] },
    { word: "awful",   cells: [[1,6],[2,6],[3,6],[4,6] , [5,6]] }, // ← stomach مش awful، راجع
  { word: "bed",     cells: [[1,1],[2,1],[3,1],] }, // ← محتاج تأكيد
  { word: "stay",    cells: [[5,1],[4,2],[3,3],[2,4]] },
  { word: "flu",     cells: [[5,2],[5,3],[5,4]] },
  { word: "back",    cells: [[6,0],[6,1],[6,2],[6,3]] },
  { word: "drink",   cells: [[2,7],[3,7],[4,7] , [5,7], [6,7]] }, // ← محتاج تأكيد
  { word: "stomach", cells: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8]] },


];

// ترتيب الكلمات في القائمة — كما في الكتاب
const WORD_LIST = [
  "water","spoiled","head","hurts",
  "awful","bed","stay","flu","back", "drink" , "stomach"
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const cellKey = (r, c) => `${r}-${c}`;

// يرجع خلايا الخط المستقيم بين نقطتين (أفقي، عمودي، قطري 45°)
const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr  = b[0] - a[0];
  const dc  = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  // يقبل فقط أفقي أو عمودي أو قطري 45°
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

// يتحقق إذا التحديد يطابق كلمة — بأي اتجاه (set-based مش position-based)
const checkSelection = (cells, foundNames) => {
  if (cells.length === 0) return null;
  const selectedSet = new Set(cells.map(([r, c]) => `${r}-${c}`));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const defSet = new Set(def.cells.map(([r, c]) => `${r}-${c}`));
    // يطابق إذا كانت نفس مجموعة الخلايا بغض النظر عن الاتجاه
    const isMatch = [...selectedSet].every((k) => defSet.has(k));
    if (isMatch) return def;
  }
  return null;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WordSearch_QK() {
const listening=useExerciseListening("wb_unit5_page27_q2");

  const [,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]); // [{ word, cells, color }]
  const [wrongFlash,  setWrongFlash]  = useState(false);
const [answerShown, setAnswerShown] = useState(false);
  const [completed,setCompleted] = useState(false);
  const [checked,setChecked] = useState(false);
  const [activeCell,setActiveCell] = useState([0,0]);
  const [announcement,setAnnouncement] = useState("");
  const resetButtonRef = useRef(null), gridRef = useRef(null), cellRefs = useRef({}), gestureRef = useRef(null);
  const checkDisabled = answerShown || completed;
  const release = () => {const g=gestureRef.current;gestureRef.current=null;if(g && gridRef.current?.hasPointerCapture?.(g.id))gridRef.current.releasePointerCapture(g.id);};
  const cancelSelection = () => {release();setStartCell(null);setHoveredCell(null);setSelecting(false);};
  useEffect(()=>()=>{const g=gestureRef.current;gestureRef.current=null;if(g && gridRef.current?.hasPointerCapture?.(g.id))gridRef.current.releasePointerCapture(g.id);},[]);
  const accept = (a,b) => {
    if(checkDisabled)return;
    const cells=getCellsBetween(a,b), match=checkSelection(cells,foundNames);
    cancelSelection();setChecked(false);
    if(match){setFoundWords(prev=>[...prev,{word:match.word,cells:match.cells,color:FOUND_COLORS[prev.length % FOUND_COLORS.length]}]);setWrongFlash(false);setAnnouncement(`Found ${match.word}.`);}
    else {setWrongFlash(true);setAnnouncement("That path is not a new target word. Try again.");}
  };
  const activateCell = (r,col) => {if(checkDisabled)return;setWrongFlash(false);if(!startCell){setStartCell([r,col]);setHoveredCell([r,col]);setSelecting(true);setAnnouncement(`Selection starts at row ${r+1}, column ${col+1}. Choose the final letter.`);}else accept(startCell,[r,col]);};
  const gridKey = (event,r,col) => {
    if(event.key === "Tab")return;
    if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)){
      event.preventDefault();event.stopPropagation();let nr=r,nc=col;if(event.key === "ArrowLeft")nc=Math.max(0,col-1);if(event.key === "ArrowRight")nc=Math.min(GRID[r].length-1,col+1);if(event.key === "ArrowUp")nr=Math.max(0,r-1);if(event.key === "ArrowDown")nr=Math.min(GRID.length-1,r+1);nc=Math.min(nc,GRID[nr].length-1);setActiveCell([nr,nc]);if(startCell&&!checkDisabled)setHoveredCell([nr,nc]);cellRefs.current[cellKey(nr,nc)]?.focus({preventScroll:true});return;
    }
    if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();if(!event.repeat)activateCell(r,col);return;}
    if(event.key === "Escape"){event.preventDefault();event.stopPropagation();cancelSelection();setAnnouncement("Selection cancelled.");return;}
    if(event.key === "Backspace"){event.preventDefault();event.stopPropagation();if(checkDisabled||event.repeat)return;if(startCell)cancelSelection();else setFoundWords(prev=>prev.slice(0,-1));setChecked(false);setWrongFlash(false);setAnnouncement("Last selection undone.");}
  };
  const cellAt = event => {const node=document.elementFromPoint(event.clientX,event.clientY)?.closest("[data-grid-cell]");if(!node||!gridRef.current?.contains(node))return null;return [Number(node.dataset.row),Number(node.dataset.col)];};
  const pointerStart = (event,r,col) => {if(checkDisabled||event.button!==0||event.isPrimary===false||gestureRef.current)return;event.preventDefault();event.stopPropagation();const anchor=startCell||[r,col];gestureRef.current={id:event.pointerId,anchor,hadAnchor:!!startCell,moved:false,end:[r,col]};setStartCell(anchor);setHoveredCell([r,col]);setSelecting(true);setActiveCell([r,col]);setWrongFlash(false);gridRef.current?.setPointerCapture?.(event.pointerId);};
  const pointerMove = event => {const g=gestureRef.current;if(!g||g.id!==event.pointerId)return;const cell=cellAt(event);if(!cell)return;g.end=cell;g.moved ||= cell[0]!==g.anchor[0]||cell[1]!==g.anchor[1];setHoveredCell(cell);};
  const pointerEnd = event => {const g=gestureRef.current;if(!g||g.id!==event.pointerId)return;const cell=cellAt(event);release();if(!cell){cancelSelection();return;}if(g.hadAnchor||g.moved||cell[0]!==g.anchor[0]||cell[1]!==g.anchor[1])accept(g.anchor,cell);};

  const foundNames = new Set(foundWords.map((f) => f.word));

  // خريطة: cellKey → [color1, color2, ...] — تدعم التقاطعات بين كلمتين
  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selectionCells = getCellsBetween(startCell, hoveredCell);
  const selectionKeys  = new Set(selectionCells.map(([r, c]) => cellKey(r, c)));

  // ── handlers ──────────────────────────────
  

  

  

  const handleReset = () => {listening.stop();cancelSelection();setAnswerShown(false);setCompleted(false);setChecked(false);setFoundWords([]);setWrongFlash(false);setActiveCell([0,0]);setAnnouncement("All discoveries and feedback cleared.");cellRefs.current["0-0"]?.focus({preventScroll:true});};

  const handleShowAnswer = () => {listening.stop();cancelSelection();setWrongFlash(false);setAnswerShown(true);setChecked(false);setFoundWords(WORD_DEFS.map((def,i)=>({...def,color:FOUND_COLORS[i % FOUND_COLORS.length]})));resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("All target words shown and locked.");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();cancelSelection();if(!foundWords.length){ValidationAlert.info("Please find a word first.");setAnnouncement("Please find a word first.");return;}setChecked(true);setAnnouncement(`Score: ${foundWords.length} out of ${WORD_DEFS.length}.`);if(foundWords.length === WORD_DEFS.length){setCompleted(true);resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${foundWords.length} / ${WORD_DEFS.length}`);}else ValidationAlert.warning(`Score: ${foundWords.length} / ${WORD_DEFS.length}`);};

  

  // ── render cell background ────────────────
const getCellStyle = (key, isSelecting, isWrong) => {if((answerShown||completed)&&foundCellMap[key])return {background:"#15803d"};
  if (isWrong)     return { background: CELL_BG_WRONG };
  if (isSelecting) return { background: CELL_BG_SELECTING };
  const colors = foundCellMap[key];
  if (!colors || colors.length === 0) return { background: CELL_BG_DEFAULT };
  if (colors.length === 1) return { background: colors[0] };

  // ✅ أي عدد من الألوان — كل لون بيأخذ شريحة متساوية
  const step = 100 / colors.length;
  const stops = colors.flatMap((c, i) => [
    `${c} ${(i * step).toFixed(1)}%`,
    `${c} ${((i + 1) * step).toFixed(1)}%`,
  ]);
  return {
    background: `linear-gradient(135deg, ${stops.join(", ")})`,
  };
};

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"
      className="main-container-component"
      
      
    ><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit5_WB_Unit5_Page27_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Body: قائمة + جدول ── */
        .wsk-body {
          display: flex;
          gap: clamp(20px, 3vw, 48px);
          align-items: flex-start;
          flex-wrap: wrap;
        }

        /* ── قائمة الكلمات ── */
        .wsk-word-list {
          border: 2px solid ${WORD_LIST_BORDER};
          border-radius: 14px;
          padding: clamp(12px, 1.6vw, 20px) clamp(16px, 2vw, 26px);
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: clamp(110px, 15vw, 160px);
          flex-shrink: 0;
        }

        .wsk-word-item {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 700;
          color: ${WORD_TEXT_COLOR};
          line-height: 1.3;
          transition: opacity 0.25s;
          user-select: none;
        }

        .wsk-word-item--found {
          text-decoration: line-through;
          opacity: 0.38;
        }

        /* ── الجدول ── */
        .wsk-grid {
            top: 45px;
    position: relative;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 0;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
          border: 2px solid ${CELL_BORDER_COLOR};
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* ── خلية واحدة ── */
        .wsk-cell {
          width:  clamp(30px, 3.8vw, 46px);
          height: clamp(30px, 3.8vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${CELL_TEXT_DEFAULT};
          border-right: 1px solid ${CELL_BORDER_COLOR};
          border-bottom: 1px solid ${CELL_BORDER_COLOR};
          background: ${CELL_BG_DEFAULT};
          transition: background 0.1s, color 0.1s;
          position: relative;
        }

        /* آخر عمود — بدون بوردر يمين */
        .wsk-cell:nth-child(10n) { border-right: none; }
        /* آخر صف — بدون بوردر تحت */
        .wsk-cell:nth-child(n+91) { border-bottom: none; }

        /* أثناء التحديد */
        .wsk-cell--selecting {
          color: ${CELL_TEXT_SELECTING};
        }

        /* تحديد غلط */
        .wsk-cell--wrong {
          color: ${CELL_TEXT_WRONG} !important;
        }

        /* كلمة مكتشفة */
        .wsk-cell--found {
          color: ${CELL_TEXT_FOUND};
        }

        /* Buttons */
        .wsk-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* تهنئة */
        .wsk-congrats {
          text-align: center;
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 800;
          color: #27ae60;
          animation: wsk-pop 0.4s ease both;
        }
        @keyframes wsk-pop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        @media (max-width: 600px) {
          .wsk-body { flex-direction: column; }
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
        <ExerciseHeader subTitle="Find one target word at a time, then select all of its letters before moving to the next word." sectionLetter="B" title={<>Find and circle the words.</>} />

        {/* ── Body ── */}
        <div className="wsk-body">

          {/* قائمة الكلمات */}
          <div className="wsk-word-list">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={`wsk-word-item ${foundNames.has(w) ? "wsk-word-item--found" : ""}`} style={{color:checked&&!foundNames.has(w)?"#ef4444":undefined}}
              >
                {renderExerciseAudioText({audio:listening,id:`word-${w}`,src:[clipPage27B1,clipPage27B2,clipPage27B3,clipPage27B4,clipPage27B5,clipPage27B6,clipPage27B7,clipPage27B8,clipPage27B9,clipPage27B10,clipPage27B11][WORD_LIST.indexOf(w)],label:w,children:w})}
              </span>
            ))}
          </div>

          {/* الجدول */}
          <div ref={gridRef} role="group" aria-label="Word search. Arrows move; Enter or Space selects endpoints; Escape cancels; Backspace undoes." style={{touchAction:"none"}} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={event=>{if(gestureRef.current?.id===event.pointerId)cancelSelection();}} onLostPointerCapture={event=>{if(gestureRef.current?.id===event.pointerId)cancelSelection();}} className="wsk-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key         = cellKey(r, c);
                const foundColors = foundCellMap[key];
                const isFound     = foundColors && foundColors.length > 0;
                const isSel       = selectionKeys.has(key) && !isFound;
                const isWrong     = isSel && wrongFlash;
                const isSelecting = isSel && !wrongFlash;

                return (
                  <div role="button" data-grid-cell data-row={r} data-col={c} tabIndex={activeCell[0]===r&&activeCell[1]===c?0:-1} ref={el=>{cellRefs.current[key]=el;}} aria-label={`Row ${r+1}, column ${c+1}: ${letter}${isFound?", found":""}`} aria-pressed={isSel||!!isFound} aria-disabled={checkDisabled} onKeyDown={event=>gridKey(event,r,c)} onKeyUp={activationKeys.onKeyUp} onPointerDown={event=>pointerStart(event,r,c)}
                    key={key}
                    className={[
                      "wsk-cell",
                      isFound     ? "wsk-cell--found"     : "",
                      isSelecting ? "wsk-cell--selecting" : "",
                      isWrong     ? "wsk-cell--wrong"     : "",
                    ].filter(Boolean).join(" ")}
                    style={getCellStyle(key, isSelecting, isWrong)}
                    
                    
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="wsk-buttons">
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