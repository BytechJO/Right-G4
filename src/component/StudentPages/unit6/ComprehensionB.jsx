import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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



const ComprehensionB = () => {
  const CELL_SIZE = 36;

  const words = {
    down1: { answer: "rake", cells: [[0,3],[1,3],[2,3],[3,3]] },
    down2: { answer: "soil", cells: [[0,7],[1,7],[2,7],[3,7]] },
    down3: { answer: "seeds", cells: [[1,1],[2,1],[3,1],[4,1],[5,1]] },
    across4: { answer: "vegetables", cells: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9]] },
  };

  const gridMap = {};
  Object.entries(words).forEach(([wordId, { cells }]) => {
    cells.forEach(([r, c], idx) => {
      const key = `${r},${c}`;
      if (!gridMap[key]) gridMap[key] = [];
      gridMap[key].push({ wordId, letterIndex: idx });
    });
  });

  const [cellValues, setCellValues] = useState({});
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const inputRefs = useRef({});
  const resetButtonRef = useRef(null);
  const [announcement,setAnnouncement]=useState("");
  const cellLocked=key=>locked||errors[key]===false;
  const moveCell=(key,dr,dc)=>{let [row,col]=key.split(',').map(Number);for(let step=0;step<10;step++){row+=dr;col+=dc;if(row<0||row>=6||col<0||col>=10)return;const next=row+','+col;if(gridMap[next]&&!cellLocked(next)){inputRefs.current[next]?.focus();return;}}};
  const cellKeys=(event,key)=>{if(event.key==='Tab')return;event.stopPropagation();const directions={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]};if(directions[event.key]){event.preventDefault();moveCell(key,...directions[event.key]);return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();if(!event.repeat)handleCellClick(key);return;}if(event.key==='Backspace'||event.key==='Delete'){event.preventDefault();if(cellLocked(key))return;handleChange(key,'');if(event.key==='Backspace'){const word=activeWord?.wordId||gridMap[key][0].wordId;const direction=getWordDirection(word);moveCell(key,direction==='down'?-1:0,direction==='across'?-1:0);}}};

  const allCells = Object.keys(gridMap);

  const getWordDirection = (wordId) =>
    wordId.startsWith("down") ? "down" : "across";

  const getNextCell = (key, wordId) => {
    const word = words[wordId];
    const idx = word.cells.findIndex(([r, c]) => `${r},${c}` === key);
    if (idx === -1 || idx >= word.cells.length - 1) return null;
    const [nr, nc] = word.cells[idx + 1];
    return `${nr},${nc}`;
  };

  const handleChange = (key, value) => {
    if (cellLocked(key)) return;
    const letter = value.slice(-1).toLowerCase();
    if (letter && !/^[a-z]$/.test(letter)) return;

    setCellValues((prev) => ({ ...prev, [key]: letter }));setErrors(prev=>{const next={...prev};delete next[key];return next;});

    if (letter && activeWord) {
      let nextKey = getNextCell(key, activeWord.wordId);while(nextKey&&cellLocked(nextKey))nextKey=getNextCell(nextKey,activeWord.wordId);
      if (nextKey && inputRefs.current[nextKey]) {
        inputRefs.current[nextKey].focus();
      }
    }
  };

  const handleCellClick = (key) => {
    if (locked) return;
    const entries = gridMap[key];
    if (!entries) return;

    if (entries.length > 1 && activeWord) {
      const other = entries.find((e) => e.wordId !== activeWord.wordId);
      if (other) {
        setActiveWord({ wordId: other.wordId, direction: getWordDirection(other.wordId) });
        return;
      }
    }
    setActiveWord({ wordId: entries[0].wordId, direction: getWordDirection(entries[0].wordId) });
  };

  const getCorrectLetter = (key) => {
    const entries = gridMap[key];
    if (!entries) return null;
    const { wordId, letterIndex } = entries[0];
    return words[wordId].answer[letterIndex];
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = allCells.some((key) => !cellValues[key]);
    if (isEmpty) {
      ValidationAlert.info("Please fill in all cells.");
      return;
    }

    let correct = 0;
    let total = 0;
    const newErrors = {};

    allCells.forEach((key) => {
      total++;
      const correctLetter = getCorrectLetter(key);
      if (cellValues[key] === correctLetter) {
        correct++;
        newErrors[key] = false;
      } else {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correct} out of ${total}. Correct letter cells are locked.`);
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color}; font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) { setLocked(true); resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const vals = {};
    allCells.forEach((key) => { vals[key] = getCorrectLetter(key); });
    setCellValues(vals);
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct crossword letters shown and locked.");
  };

  const handleReset = () => {
    setCellValues({});
    setErrors({});
    setLocked(false);
    setShowed(false);
    setActiveWord(null);setAnnouncement("Crossword cleared.");
  };

  const maxRow = 6;
  const maxCol = 10;

const wordNumbers = {
  "0,3": "1",   // down1: row 0, col 3
  "0,7": "2",   // down2: row 0, col 7
  "1,1": "3",   // down3: row 1, col 1
  "3,0": "4",   // across4: row 3, col 0
};

  const renderGrid = () => {
    const rows = [];
    for (let r = 0; r < maxRow; r++) {
      const cols = [];
      for (let c = 0; c < maxCol; c++) {
        const key = `${r},${c}`;
        const isActive = !!gridMap[key];
        const isError = errors[key] === true;
        const isCorrect = errors[key] === false;
        const isHighlighted =
          activeWord &&
          words[activeWord.wordId].cells.some(([wr, wc]) => `${wr},${wc}` === key);
        const num = wordNumbers[key];

        cols.push(
          <td
            key={c}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              padding: 0,
              border: isActive ? "2px solid #333" : "none",
              background: isActive
                ? isError
                  ? "transparent"
                  : isCorrect
                  ? "transparent"
                  : isHighlighted
                  ? "#e0f2fe"
                  : "#fff"
                : "transparent",
              position: "relative",
            }}
          >
            {isActive && (
              <>
                {num && (
                  <span style={{
                    position: "absolute", top: 1, left: 2,
                    fontSize: "9px", fontWeight: "bold", color: "#333", zIndex: 2,
                  }}>{num}</span>
                )}
                <input data-keyboard-choice aria-label={`Row ${r+1}, column ${c+1}. ${gridMap[key].map(entry=>`${entry.wordId.startsWith("down")?"Down":"Across"} ${entry.wordId.replace(/\D/g,"")}, letter ${entry.letterIndex+1}`).join("; ")}.`} title="Enter or Space changes direction. Arrow keys move between letter cells." onFocus={()=>{if(!activeWord||!words[activeWord.wordId].cells.some(([row,col])=>`${row},${col}`===key))setActiveWord({wordId:gridMap[key][0].wordId,direction:getWordDirection(gridMap[key][0].wordId)});}} onKeyDown={event=>cellKeys(event,key)} onKeyUp={event=>{if(event.key!=="Tab")event.stopPropagation();}} aria-invalid={isError}
                  ref={(el) => (inputRefs.current[key] = el)}
                  type="text"
                  value={cellValues[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onClick={() => handleCellClick(key)}
                  disabled={locked || isCorrect}
                  maxLength={1}
                  autoComplete="off"
                  style={{...({
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    background: "transparent",
                    color: isError ? "#ef4444" : showed ? "#ef4444" : "#1a1a1a",
                    cursor: locked || isCorrect ? "default" : "text",
                    textTransform: "lowercase",
                  }),color:showed||isCorrect?"#16a34a":isError?"#ef4444":"#1a1a1a"}}
                />
                {isError && (
                  <div style={{
                    position: "absolute", top: "-7px", right: "-7px",
                    width: "14px", height: "14px", background: "#ef4444",
                    color: "white", borderRadius: "50%", fontSize: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold", border: "1.5px solid white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)", zIndex: 3,
                  }}>✕</div>
                )}
              </>
            )}
          </td>
        );
      }
      rows.push(<tr key={r}>{cols}</tr>);
    }
    return rows;
  };

  return (
    <div data-adapt-scope="unit6_ComprehensionB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit6_ComprehensionB"] input:focus-visible, [data-adapt-scope="unit6_ComprehensionB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_ComprehensionB"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read and complete the puzzle.
      </h5>

      <div className="flex gap-8 flex-wrap">
        <div className="flex flex-col gap-4" style={{ minWidth: "260px" }}>
          <div>
            <div style={{
              background: "#e8eff1", borderRadius: "6px", padding: "3px 12px",
              fontWeight: "bold", fontSize: "15px", display: "inline-block", marginBottom: "8px"
            }}>Down</div>
            <div className="flex flex-col gap-2">
              {[
                { num: 1, clue: "a tool that can be used to make the soil smooth" },
                { num: 2, clue: "dirt" },
                { num: 3, clue: "plants grow from these" },
              ].map((item) => (
                <div key={item.num} className="flex gap-2" style={{ fontSize: "14px" }}>
                  <span style={{ fontWeight: "bold", minWidth: "16px" }}>{item.num}</span>
                  <span>{item.clue}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              background: "#e8eff1", borderRadius: "6px", padding: "3px 12px",
              fontWeight: "bold", fontSize: "15px", display: "inline-block", marginBottom: "8px"
            }}>Across</div>
            <div className="flex gap-2" style={{ fontSize: "14px" }}>
              <span style={{ fontWeight: "bold", minWidth: "16px" }}>4</span>
              <span>food that grows in a garden</span>
            </div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
            <tbody>{renderGrid()}</tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShow} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} onClick={handleCheck} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB;