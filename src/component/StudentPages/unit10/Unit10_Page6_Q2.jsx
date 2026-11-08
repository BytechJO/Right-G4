import ExerciseHeader from "../../ExerciseHeader";
import clipPage87E10 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_010_koala.mp3";
import clipPage87E9 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_009_desert.mp3";
import clipPage87E8 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_008_camel.mp3";
import clipPage87E7 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_007_pyramids.mp3";
import clipPage87E6 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_006_tiger.mp3";
import clipPage87E5 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_005_Morocco.mp3";
import clipPage87E4 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_004_Australia.mp3";
import clipPage87E3 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_003_Saudi_Arabia.mp3";
import clipPage87E2 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_002_Egypt.mp3";
import clipPage87E1 from "../../../assets/audio/ClassBook/Unit 10/Page 87 - E/Item_001_India.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgIndia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 2.svg";
import imgEgypt from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 3.svg";
import imgSaudiArabia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 4.svg";
import imgAustralia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 5.svg";
import imgMorocco from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 87/SVG/Asset 6.svg";
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


const CELL_BORDER = "#2096a6";
const CELL_BG = "#e8eff1";
const CELL_SEL_BG = "#b2dfdb";
const CELL_SEL_TEXT = "#004d40";
const CELL_WRONG_BG = "#ffcdd2";
const CELL_WRONG_TX = "#b71c1c";
const CELL_DEF_TEXT = "#263238";
const CELL_FND_TEXT = "#ffffff";
const WORD_TEXT = "#37474f";
const CHECK_COLOR = "#c81e1e";
const INPUT_UL = "#3f3f3f";
const INPUT_UL_ERR = "#ef4444";
const ANSWER_COLOR = "#c81e1e";
const BADGE_BG = "#ef4444";
const BADGE_TEXT = "#ffffff";

const FOUND_COLORS = ["#e53935", "#e67e22", "#43a047", "#1e88e5", "#8e24aa"];

const GRID = [
  ["i", "p", "b", "t", "i", "g", "e", "r", "s", "t"],
  ["q", "v", "y", "e", "z", "a", "s", "t", "l", "e"],
  ["n", "p", "y", "r", "a", "m", "i", "d", "s", "y"],
  ["s", "k", "o", "d", "e", "s", "e", "r", "t", "g"],
  ["t", "l", "k", "o", "a", "l", "a", "v", "x", "f"],
];
const COLS = GRID[0].length;

const WORD_DEFS = [
  {
    word: "tiger",
    cells: [
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
  },
  {
    word: "pyramids",
    cells: [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ],
  },
  {
    word: "desert",
    cells: [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
    ],
  },
  {
    word: "koala",
    cells: [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
    ],
  },
];
const WORD_LIST = ["tiger", "pyramids", "camel", "desert", "koala"];

const COUNTRIES = [
  { name: "India", src: imgIndia },
  { name: "Egypt", src: imgEgypt },
  { name: "Saudi Arabia", src: imgSaudiArabia },
  { name: "Australia", src: imgAustralia },
  { name: "Morocco", src: imgMorocco },
];

const CORRECT_COUNTRIES = new Set([
  "India",
  "Egypt",
  "Saudi Arabia",
  "Australia",
]);

const SENTENCE_PREFIX =
  "Use the puzzle and countries above to help you. Louis is a pilot. Louis hasn't been to";
const SENTENCE_CORRECT = ["washed the dishes.", "washed the dishes"];
const SENTENCE_ANSWER = "washed the dishes.";

const cellKey = (r, c) => `${r}-${c}`;

const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr = b[0] - a[0],
    dc = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc))
    return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr),
    sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

const checkMatch = (cells, foundNames) => {
  if (!cells.length) return null;
  const sel = new Set(cells.map(([r, c]) => `${r}-${c}`));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const ds = new Set(def.cells.map(([r, c]) => `${r}-${c}`));
    if ([...sel].every((k) => ds.has(k))) return def;
  }
  return null;
};

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const isSentOk = (v) =>
  SENTENCE_CORRECT.some((c) => normalize(v) === normalize(c));

export default function WB_WordSearch_QE() {
const listening=useExerciseListening("sb_unit10_page6_q2");

  const [selecting, setSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [checked, setChecked] = useState(new Set());
  const [sentVal, setSentVal] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [announcement,setAnnouncement]=useState("");const [focusCell,setFocusCell]=useState([0,0]);const cellRefs=useRef({});
const gridKeys=(event,r,col)=>{if(event.key==='Tab')return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();const nr=Math.max(0,Math.min(GRID.length-1,r+(event.key==='ArrowDown'?1:event.key==='ArrowUp'?-1:0))),nc=Math.max(0,Math.min(GRID[nr].length-1,col+(event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0)));setFocusCell([nr,nc]);cellRefs.current[cellKey(nr,nc)]?.focus();if(selecting)setHovered([nr,nc]);return;}if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setSelecting(false);setStartCell(null);setHovered(null);setAnnouncement('Selection cancelled.');return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(event.repeat||showAns)return;if(selecting){const match=checkMatch(selCells,foundNames);onMouseUp();setAnnouncement(match?'Found '+match.word+'.':'That selection does not find a new word.');}else{onMouseDown(r,col);setAnnouncement('First letter selected. Move to the final letter and press Enter or Space.');}}};
  const foundNames = new Set(foundWords.map((f) => f.word));

  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selCells = getCellsBetween(startCell, hovered);
  const selKeys = new Set(selCells.map(([r, c]) => cellKey(r, c)));

  const onMouseDown = (r, c) => {
    if (showAns) return;
    setSelecting(true);
    setStartCell([r, c]);
    setHovered([r, c]);
  };
  const onMouseEnter = (r, c) => {
    if (selecting) setHovered([r, c]);
  };
  const onMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);
    if (selCells.length > 1) {
      const m = checkMatch(selCells, foundNames);
      if (m) {
        const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
        setFoundWords((p) => [...p, { word: m.word, cells: m.cells, color }]);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
      }
    }
    setStartCell(null);
    setHovered(null);
  };

  const toggleCountry = (name) => {
    if (showAns) return;
    setAnnouncement(name+(checked.has(name)?" deselected.":" selected."));setChecked((p) => {
      const n = new Set(p);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const handleCheck = () => {
    if (showAns) return;listening.stop();
    if (!sentVal.trim()) {
      ValidationAlert.info("Please complete the sentence.");
      return;
    }
    setShowRes(true);
    isSentOk(sentVal)
      ? ValidationAlert.success("Correct!")
      : ValidationAlert.error("Check your answer.");
  };

  const handleShowAnswer = () => {listening.stop();
    setShowAns(true);
    setShowRes(false);
    setSentVal(SENTENCE_ANSWER);
    setFoundWords(
      WORD_DEFS.map((def, i) => ({
        word: def.word,
        cells: def.cells,
        color: FOUND_COLORS[i % FOUND_COLORS.length],
      })),
    );
    setChecked(new Set(CORRECT_COUNTRIES));
  };

  const handleReset = () => {listening.stop();
    setFocusCell([0,0]);setAnnouncement("Selections and answer cleared.");setFoundWords([]);
    setChecked(new Set());
    setSentVal("");
    setShowRes(false);
    setShowAns(false);
    setWrongFlash(false);
    setStartCell(null);
    setHovered(null);
    setSelecting(false);
  };

  const getCellStyle = (key, isSel, isWrong) => {
    if (isWrong) return { background: CELL_WRONG_BG };
    if (isSel) return { background: CELL_SEL_BG };
    const colors = foundCellMap[key];
    if (!colors || !colors.length) return { background: CELL_BG };
    if (colors.length === 1) return { background: colors[0] };
    const step = 100 / colors.length;
    const stops = colors.flatMap((c, i) => [
      `${c} ${(i * step).toFixed(1)}%`,
      `${c} ${((i + 1) * step).toFixed(1)}%`,
    ]);
    return { background: `linear-gradient(135deg,${stops.join(",")})` };
  };

  const sentWrong = showRes && !showAns && !isSentOk(sentVal);
  const sentDisabled = showAns || (showRes && isSentOk(sentVal));

  return (
    <div data-adapt-scope="unit10_Unit10_Page6_Q2"
      className="main-container-component"
      onMouseUp={onMouseUp}
      onMouseLeave={() => {
        if (selecting) onMouseUp();
      }}
    ><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit10_Unit10_Page6_Q2"] input:focus-visible, [data-adapt-scope="unit10_Unit10_Page6_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_Unit10_Page6_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_Unit10_Page6_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_Unit10_Page6_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="unit10_Unit10_Page6_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .wse-countries{display:flex;gap:clamp(10px,1.4vw,20px);align-items:flex-start;flex-wrap:wrap;width:100%;}
        .wse-country{display:flex;flex-direction:column;align-items:center;gap:clamp(4px,0.6vw,8px);flex:1;min-width:clamp(65px,9vw,120px);}
        .wse-cimg{width:100%;height:clamp(50px,7.5vw,105px);object-fit:cover;border-radius:8px;border:2px solid #e5e7eb;display:block;}
        .wse-cname{font-size:clamp(10px,1.1vw,13px);color:#2b2b2b;font-weight:500;text-align:center;line-height:1.3;}
        .wse-ccheck{width:clamp(24px,3vw,36px);height:clamp(24px,3vw,36px);border-radius:50%;border:2px solid #2195a6
;background:#fff;display:flex;align-items:center;justify-content:center;font-size:clamp(13px,1.8vw,21px);font-weight:900;color:${CHECK_COLOR};cursor:pointer;transition:border-color 0.15s;user-select:none;}
        .wse-ccheck--locked{cursor:default;}
        .wse-body{display:flex;gap:clamp(16px,2.4vw,40px);align-items:flex-start;flex-wrap:wrap;}
        .wse-wlist{border:2px solid ${CELL_BORDER};border-radius:12px;padding:clamp(10px,1.3vw,16px) clamp(12px,1.6vw,20px);display:flex;flex-direction:column;gap:13px;min-width:clamp(75px,9vw,120px);flex-shrink:0;background:${CELL_BG};}
        .wse-witem{font-size:clamp(12px,1.4vw,16px);font-weight:700;color:${WORD_TEXT};line-height:1.3;user-select:none;align-self:center;transition:opacity .25s;}
        .wse-witem--found{text-decoration:line-through;opacity:.38;}
        .wse-grid{position:relative;display:grid;grid-template-columns:repeat(${COLS},1fr);gap:0;cursor:crosshair;user-select:none;-webkit-user-select:none;border:2px solid ${CELL_BORDER};border-radius:8px;overflow:hidden;flex-shrink:0;}
        .wse-cell{width:clamp(26px,3.3vw,42px);height:clamp(26px,3.3vw,42px);display:flex;align-items:center;justify-content:center;font-size:clamp(11px,1.3vw,16px);font-weight:700;color:${CELL_DEF_TEXT};border-right:1px solid ${CELL_BORDER};border-bottom:1px solid ${CELL_BORDER};background:${CELL_BG};transition:background .1s,color .1s;}
         .wse-cell:nth-child(n+${COLS * (GRID.length - 1) + 1}){border-bottom:none;}
        .wse-cell--sel{color:${CELL_SEL_TEXT};}
        .wse-cell--err{color:${CELL_WRONG_TX}!important;}
        .wse-cell--fnd{color:${CELL_FND_TEXT};}
        .wse-sent-area{width:100%;display:flex;flex-direction:column;gap:clamp(5px,0.7vw,9px);}
        .wse-sent-prefix{font-size:clamp(13px,1.6vw,19px);color:#2b2b2b;line-height:1.6;}
        .wse-iwrap{position:relative;width:100%;}
        .wse-input{width:100%;background:transparent;border:none;border-bottom:1px solid ${INPUT_UL};outline:none;font-size:clamp(14px,1.8vw,22px);color:#2b2b2b;line-height:1.5;box-sizing:border-box;font-family:inherit;transition:border-color .2s;}
        .wse-input:disabled{opacity:1;cursor:default;}
        .wse-input--err{border-bottom-color:${INPUT_UL_ERR};}
        .wse-input--ans{color:${ANSWER_COLOR};font-weight:700;}
        .wse-ibadge{position:absolute;top:-8px;right:0;width:clamp(15px,1.7vw,19px);height:clamp(15px,1.7vw,19px);border-radius:50%;background:${BADGE_BG};color:${BADGE_TEXT};display:flex;align-items:center;justify-content:center;font-size:clamp(7px,0.8vw,10px);font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.2);pointer-events:none;z-index:2;}
        .wse-buttons{display:flex;justify-content:center;margin-top:clamp(8px,1.6vw,18px);}
        @media(max-width:600px){.wse-body{flex-direction:column;}.wse-countries{justify-content:center;}}
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

<ExerciseHeader sectionLetter="I" title={<>
            Find and circle the words.  Then <span className="text-[#D1252B]"> ✓</span>  the countries for each word you find. 
            <div style={{ marginTop: "0" }}>
             One word is not in the puzzle, so one country won’t be checked.
            </div>
          </>} subTitle="Find each target word in the puzzle first, then check its matching country; remember that one country should stay unchecked." />
 
        <p
          style={{
            fontSize: "clamp(12px,1.4vw,16px)",
            color: "#6b7280",
            marginTop: "-8px",
          }}
        >
          One word is not in the puzzle, so one country won't be checked.
        </p>

        {/* Countries */}
        <div className="wse-countries">
          {COUNTRIES.map((country) => {
            const on = checked.has(country.name);
            return (
              <div key={country.name} className="wse-country">
                <img
                  src={country.src}
                  alt={({India:"A tiger.",Egypt:"Pyramids in a desert.","Saudi Arabia":"Footprints across sand dunes.",Australia:"A koala in a tree.",Morocco:"A camel and its calf."})[country.name]}
                  className="wse-cimg"
                />
                <span className="wse-cname">{renderExerciseAudioText({audio:listening,id:`country-${country.name}`,src:[clipPage87E1,clipPage87E2,clipPage87E3,clipPage87E4,clipPage87E5][COUNTRIES.indexOf(country)],label:country.name,children:country.name})}</span>
                <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Select ${country.name}`} aria-pressed={on} aria-disabled={showAns}
                  className={[
                    "wse-ccheck",
                    on ? "wse-ccheck--on" : "",
                    showAns ? "wse-ccheck--locked" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => toggleCountry(country.name)}
                >
                  {on && "✓"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Word search */}
        <div className="wse-body">
          <div className="wse-wlist">
            {WORD_LIST.map((w) => (
              <span
                key={w}
                className={[
                  "wse-witem",
                  foundNames.has(w) ? "wse-witem--found" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {renderExerciseAudioText({audio:listening,id:`word-${w}`,src:[clipPage87E6,clipPage87E7,clipPage87E8,clipPage87E9,clipPage87E10][WORD_LIST.indexOf(w)],label:w,children:w})}
              </span>
            ))}
          </div>
          <div className="wse-grid">
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key = cellKey(r, c);
                const fColors = foundCellMap[key];
                const isFound = fColors && fColors.length > 0;
                const isSel = selKeys.has(key) && !isFound;
                const isWrong = isSel && wrongFlash;
                const isSeling = isSel && !wrongFlash;
                return (
                  <div role="button" tabIndex={focusCell[0]===r&&focusCell[1]===c?0:-1} data-grid-cell ref={el=>{cellRefs.current[key]=el;}} aria-label={`Row ${r+1}, column ${c+1}: ${letter}`} aria-pressed={isFound||isSel} onFocus={()=>setFocusCell([r,c])} onKeyDown={event=>gridKeys(event,r,c)} onKeyUp={activationKeys.onKeyUp}
                    key={key}
                    className={[
                      "wse-cell",
                      isFound ? "wse-cell--fnd" : "",
                      isSeling ? "wse-cell--sel" : "",
                      isWrong ? "wse-cell--err" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={getCellStyle(key, isSeling, isWrong)}
                    onMouseDown={() => onMouseDown(r, c)}
                    onMouseEnter={() => onMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Sentence */}
        <div className="wse-sent-area">
          <span className="wse-sent-prefix">{SENTENCE_PREFIX}</span>
          <div className="wse-iwrap">
            <input {...fieldKeys} aria-label="Complete the sentence about where Louis has not been, using the puzzle and pictures." title="Complete the sentence about Louis" placeholder="Your answer"
              type="text"
              className={[
                "wse-input",
                sentWrong ? "wse-input--err" : "",
                showAns ? "wse-input--ans" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              value={sentVal}
              disabled={sentDisabled}
              onChange={(e) => handleSentenceChange(e.target.value)}
              style={{ borderBottomColor: sentWrong ? INPUT_UL_ERR : INPUT_UL }}
              spellCheck={false}
              autoComplete="off"
            />
            {sentWrong && <div className="wse-ibadge">✕</div>}
          </div>
        </div>

        <div className="wse-buttons">
          <div className="action-buttons-container">
<button type="button" aria-label="Start Again" {...activationKeys} onClick={handleReset} className="try-again-button">Start Again ↻</button>
<button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShowAnswer} className="show-answer-btn swal-continue">Show Answer</button>
<button type="button" aria-label="Check Answer" {...activationKeys} onClick={handleCheck} className="check-button2">Check Answer ✓</button>
</div>
        </div>
      </div>
    </div>
  );

  function handleSentenceChange(val) {
    if (showAns) return;
    if (showRes && isSentOk(sentVal)) return;
    setSentVal(val);
  }
}
