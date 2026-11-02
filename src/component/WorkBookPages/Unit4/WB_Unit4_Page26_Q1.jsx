/* eslint-disable react-refresh/only-export-components */
import {useCallback} from "react";
import clipPage26I6 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_006_Hansel.mp3";
import clipPage26I5 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_005_Helen.mp3";
import clipPage26I4 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_004_Tom.mp3";
import clipPage26I3 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_003_Helen's_gift_was_bigger_than_Hansel's_but_not_as_big_as_Tom's.mp3";
import clipPage26I2 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_002_Tom_had_the_gift_that_was_the_biggest_and_the_tallest.mp3";
import clipPage26I1 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - I/Item_001_Stella's_mom_gave_each_of_the_children_a_gift!.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect } from "react";
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


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR      = "#2096a6";
const HEADER_TEXT_COLOR       = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const TOOL_ACTIVE_BG          = "#2096a6";
const TOOL_ACTIVE_TEXT        = "#ffffff";
const TOOL_BG                 = "#f0f0f0";
const TOOL_TEXT               = "#2b2b2b";
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = [
  "Stella's mom gave each of the children a gift!",
  "Tom had the gift that was the biggest and the tallest.",
  "Helen's gift was bigger than Hansel's but not as big as Tom's.",
];

const QUESTION = "What do you think might be in each of the gifts?";

const COLUMNS = ["Tom", "Helen", "Hansel"];

const DRAW_COLORS = [
  "#000000","#e53935","#43a047","#1e88e5",
  "#f4511e","#8e24aa","#ffb300","#00897b",
];
const SIZES = [2, 4, 8, 14];

// ─────────────────────────────────────────────
//  SINGLE CANVAS — receives shared tool state
// ─────────────────────────────────────────────
function DrawCanvas({ tool, color, lineWidth, resetKey, label, onAnnounce }) {
  const canvasRef  = useRef(null);
  const isDrawing  = useRef(false);
  const lastPos    = useRef(null);
  const historyRef = useRef([]), pointerId=useRef(null),generation=useRef(0);
  const [cursor,setCursor]=useState({x:50,y:50}),[keyboardDrawing,setKeyboardDrawing]=useState(false),[showCursor,setShowCursor]=useState(false);
  const releasePointer=useCallback(()=>{const id=pointerId.current;pointerId.current=null;if(id!==null&&canvasRef.current?.hasPointerCapture(id))canvasRef.current.releasePointerCapture(id);},[]);
  const invalidateDrawing=useCallback(()=>{generation.current++;},[]);

  // Init / reset canvas to white
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    invalidateDrawing();isDrawing.current=false;lastPos.current=null;releasePointer();setKeyboardDrawing(false);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1,Math.round(rect.width || 300));
    canvas.height = Math.max(1,Math.round(rect.height || 300));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
  },[releasePointer,invalidateDrawing]);

  useEffect(()=>{initCanvas();const canvas=canvasRef.current;const observer=new ResizeObserver(()=>{if(!canvas)return;const rect=canvas.getBoundingClientRect();const width=Math.max(1,Math.round(rect.width)),height=Math.max(1,Math.round(rect.height));if(canvas.width===width&&canvas.height===height)return;const saved=document.createElement("canvas");saved.width=canvas.width;saved.height=canvas.height;saved.getContext("2d").drawImage(canvas,0,0);invalidateDrawing();isDrawing.current=false;lastPos.current=null;setKeyboardDrawing(false);releasePointer();canvas.width=width;canvas.height=height;const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,width,height);ctx.drawImage(saved,0,0,width,height);});observer.observe(canvas);return()=>{observer.disconnect();invalidateDrawing();isDrawing.current=false;releasePointer();};},[initCanvas,releasePointer,invalidateDrawing]);
  // Reset when resetKey changes
  useEffect(() => { initCanvas(); }, [resetKey,initCanvas]);

  const getPos = (e, canvas) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL());
    if (historyRef.current.length > 30) historyRef.current.shift();
  };

  const startDraw = (e) => {
    e.preventDefault();
    invalidateDrawing();
    saveHistory();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvasRef.current);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    if (tool === "eraser") {
      // ✅ الحل الصح: رسم بلون أبيض مباشرةً بدل clip
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth   = lineWidth * 6;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDraw = () => { isDrawing.current = false; lastPos.current = null; };


  const handleUndo=()=>{stopDraw();releasePointer();setKeyboardDrawing(false);if(!historyRef.current.length)return;const canvas=canvasRef.current,token=++generation.current,img=new Image();img.onload=()=>{if(generation.current===token&&canvasRef.current===canvas){const ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);}};img.src=historyRef.current.pop();onAnnounce(label+" last stroke undone.");};
  const pointerStart=event=>{if(pointerId.current!==null||event.button!==0)return;stopDraw();setKeyboardDrawing(false);setShowCursor(false);pointerId.current=event.pointerId;event.currentTarget.setPointerCapture(event.pointerId);startDraw(event);};
  const pointerMove=event=>{if(pointerId.current===event.pointerId)draw(event);};
  const pointerEnd=event=>{if(pointerId.current!==event.pointerId)return;stopDraw();releasePointer();};
  const cursorEvent=position=>{const rect=canvasRef.current.getBoundingClientRect();return {preventDefault(){},clientX:rect.left+rect.width*position.x/100,clientY:rect.top+rect.height*position.y/100};};
  const canvasKeys=event=>{if(event.key==="Tab")return;const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(directions[event.key]){event.preventDefault();event.stopPropagation();const [dx,dy]=directions[event.key],step=event.shiftKey?5:1,next={x:Math.max(0,Math.min(100,cursor.x+dx*step)),y:Math.max(0,Math.min(100,cursor.y+dy*step))};setCursor(next);setShowCursor(true);if(keyboardDrawing)draw(cursorEvent(next));return;}if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(event.repeat||pointerId.current!==null)return;if(keyboardDrawing){stopDraw();setKeyboardDrawing(false);onAnnounce(label+" stroke finished.");}else{startDraw(cursorEvent(cursor));setKeyboardDrawing(true);setShowCursor(true);onAnnounce(label+" drawing. Move with arrows; Enter or Space finishes the stroke.");}}else if(event.key==="Escape"){event.preventDefault();event.stopPropagation();stopDraw();setKeyboardDrawing(false);}else if(event.key==="Backspace"){event.preventDefault();event.stopPropagation();if(!event.repeat)handleUndo();}};
  return (
    <><canvas tabIndex={0} data-keyboard-choice role="application" aria-label={`${label} gift drawing canvas. Arrows move; Enter or Space starts or finishes a stroke; Escape finishes; Backspace undoes the last stroke. Drawing is not graded.`} onKeyDown={canvasKeys} onKeyUp={activationKeys.onKeyUp} onFocus={event=>setShowCursor(event.currentTarget.matches(":focus-visible"))} onBlur={()=>{if(keyboardDrawing){stopDraw();setKeyboardDrawing(false);}setShowCursor(false);}} onPointerDown={pointerStart} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}
      ref={canvasRef}
      className={`rad-canvas ${tool === "eraser" ? "rad-canvas--eraser" : ""}`}
      
      
      
      
      
      
      
    />{showCursor&&<span aria-hidden="true" style={{position:"absolute",left:cursor.x+"%",top:cursor.y+"%",transform:"translate(-50%,-50%)",width:12,height:12,border:"2px solid #2563eb",background:keyboardDrawing?"#dbeafe":"transparent",borderRadius:"50%",pointerEvents:"none"}}/>}</>
  );
}

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadDraw_QI() {
const listening=useExerciseListening("wb_unit4_page26_q1");

  const [announcement,setAnnouncement]=useState("");
  const [tool,      setTool]      = useState("pen");
  const [color,     setColor]     = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [resetKey,  setResetKey]  = useState(0);
  const [answer,    setAnswer]    = useState("");

  const handleReset=()=>{listening.stop();setResetKey(k=>k+1);setAnswer("");setAnnouncement("All drawings and the response cleared.");};

  return (
    <div data-adapt-scope="Unit4_WB_Unit4_Page26_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page26_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Paragraph ── */
        .rad-paragraph {
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.4vw, 6px);
        }
        .rad-para-line {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 1.6;
          margin: 0;
        }

        /* ── Shared toolbar ── */
        .rad-toolbar {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.8vw, 10px);
          flex-wrap: wrap;
          padding: clamp(8px, 1.2vw, 14px) clamp(10px, 1.4vw, 18px);
          background: #f8f8f8;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
        }

        .rad-toolbar-label {
          font-size: clamp(12px, 1.3vw, 15px);
          font-weight: 600;
          color: ${TOOL_TEXT};
          flex-shrink: 0;
        }

        .rad-tool-btn {
          border: 1.5px solid ${TOOL_ACTIVE_BG};
          border-radius: 7px;
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 14px);
          font-size: clamp(12px, 1.4vw, 15px);
          cursor: pointer;
          background: ${TOOL_BG};
          color: ${TOOL_TEXT};
          transition: all 0.12s;
          font-family: inherit;
          font-weight: 600;
          user-select: none;
        }
        .rad-tool-btn--active {
          background: ${TOOL_ACTIVE_BG};
          color: ${TOOL_ACTIVE_TEXT};
        }
        .rad-tool-btn:hover:not(.rad-tool-btn--active) {
          background: rgba(32,150,166,0.1);
        }

        .rad-divider {
          width: 1px;
          height: 24px;
          background: #ccc;
          flex-shrink: 0;
        }

        /* Color swatches */
        .rad-color {
          width: clamp(18px, 2.2vw, 26px);
          height: clamp(18px, 2.2vw, 26px);
          border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.1s, border-color 0.1s;
        }
        .rad-color--active {
          border-color: #2b2b2b;
          transform: scale(1.25);
        }

        /* Size dots */
        .rad-size {
          border-radius: 50%;
          background: #2b2b2b;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.1s;
        }
        .rad-size--active { border-color: ${TOOL_ACTIVE_BG}; }

        /* ── Table ── */
        .rad-table {
 
         width: 100%;
    border: 2px solid #2096a6;
        border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
        }
        .rad-th {
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          border-bottom: 2px solid ${TABLE_BORDER_COLOR};
          padding: clamp(8px, 1.2vw, 16px);
font-size: clamp(15px, 1.9vw, 20px);
          color: ${HEADER_TEXT_COLOR};
          text-align: center;
          background: #fff;
                  font-weight: 500;

        }
        .rad-th:last-child { border-right: none; }

        .rad-td {
          border-right: 2px solid ${TABLE_BORDER_COLOR};
          padding: clamp(6px, 1vw, 10px);
          vertical-align: top;
          width: 33.33%;
        }
        .rad-td:last-child { border-right: none; }

        /* ── Drawing canvas ── */
        .rad-canvas {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: block;
          cursor: crosshair;
          touch-action: none;
        }
        .rad-canvas--eraser { cursor: cell; }

        /* ── Question input row ── */
        .rad-question-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          flex-wrap: nowrap;
        }
        .rad-question-text {
font-size: clamp(15px, 1.9vw, 20px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          padding-bottom: 5px;
          flex-shrink: 0;
          line-height: 1;
        }
        .rad-q-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
        }

        /* Buttons */
        .rad-buttons {
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
        <ExerciseHeader subTitle="Compare the three clues carefully, then draw a different gift in each correct column." sectionLetter="I" title={<>Read and draw.</>} />

        {/* ── Paragraph ── */}
        <div className="rad-paragraph">
          {PARAGRAPH.map((line, i) => (
            <p key={i} className="rad-para-line">{renderExerciseAudioText({audio:listening,id:`paragraph-${i}`,src:[clipPage26I1,clipPage26I2,clipPage26I3][i],label:line,children:line})}</p>
          ))}
        </div>

        {/* ── Shared toolbar ── */}
        <div className="rad-toolbar">

          {/* Pen / Eraser */}
          <span className="rad-toolbar-label">Tool:</span>
          <button type="button" data-keyboard-choice {...activationKeys}
            className={`rad-tool-btn ${tool === "pen" ? "rad-tool-btn--active" : ""}`}
            aria-pressed={tool==="pen"} onClick={() => setTool("pen")}
          >✏️ Pen</button>
          <button type="button" data-keyboard-choice {...activationKeys}
            className={`rad-tool-btn ${tool === "eraser" ? "rad-tool-btn--active" : ""}`}
            aria-pressed={tool==="eraser"} onClick={() => setTool("eraser")}
          >🧹 Eraser</button>

          <div className="rad-divider" />

          {/* Colors */}
          <span className="rad-toolbar-label">Color:</span>
          {DRAW_COLORS.map((c) => (
            <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Pen color ${["black","red","green","blue","orange","purple","yellow","teal"][DRAW_COLORS.indexOf(c)]}`} aria-pressed={color===c&&tool==="pen"}
              key={c}
              className={`rad-color ${color === c && tool === "pen" ? "rad-color--active" : ""}`}
              style={{ background: c }}
              onClick={() => { setColor(c); setTool("pen"); }}
            />
          ))}

          <div className="rad-divider" />

          {/* Sizes */}
          <span className="rad-toolbar-label">Size:</span>
          {SIZES.map((s) => (
            <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Stroke width ${s}`} aria-pressed={lineWidth===s}
              key={s}
              className={`rad-size ${lineWidth === s ? "rad-size--active" : ""}`}
              style={{ width: s * 2.5, height: s * 2.5 }}
              onClick={() => setLineWidth(s)}
            />
          ))}

        </div>

        {/* ── Table with 3 drawing canvases ── */}
        <table className="rad-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col} className="rad-th">{renderExerciseAudioText({audio:listening,id:`heading-${col}`,src:[clipPage26I4,clipPage26I5,clipPage26I6][COLUMNS.indexOf(col)],label:col,children:col})}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {COLUMNS.map((col) => (
                <td style={{position:"relative"}} key={col} className="rad-td">
                  <DrawCanvas label={col} onAnnounce={setAnnouncement}
                    tool={tool}
                    color={color}
                    lineWidth={lineWidth}
                    resetKey={resetKey}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* ── Question + input ── */}
        <div className="rad-question-row">
          <span className="rad-question-text">{QUESTION}</span>
          <input {...fieldKeys} aria-label={QUESTION} title={QUESTION} placeholder="Your own idea"
            type="text"
            className="rad-q-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* ── Start Again only ── */}
        <div className="rad-buttons">
          <div className="action-buttons-container"><button type="button" aria-label="Start Again" {...activationKeys} onClick={handleReset} className="try-again-button">Start Again ↻</button></div>
        </div>
      </div>
    </div>
  );
}