import clipPage69E13 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_013_and_helped_his_mom_and_dad.mp3";
import clipPage69E12 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_012_He_came_home.mp3";
import clipPage69E11 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_011_and_then_went_to_bed.mp3";
import clipPage69E10 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_010_They_played_soccer.mp3";
import clipPage69E9 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_009_of_eggs_and_toast.mp3";
import clipPage69E8 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_008_He_cleaned_his_room.mp3";
import clipPage69E7 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_007_on_a_field.mp3";
import clipPage69E6 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_006_He_cooked_a_breakfast.mp3";
import clipPage69E5 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_005_dinner_with_his_family._Then,_he_went_to_bed.mp3";
import clipPage69E4 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_004_with_friends._They_played_soccer_on_a_field._He_came_home_and_ate.mp3";
import clipPage69E3 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_003_room_and_helped_his_mom_and_dad._In_the_afternoon,_he_went_out.mp3";
import clipPage69E2 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_002_teeth._He_cooked_a_breakfast_of_eggs_and_toast._He_cleaned_his.mp3";
import clipPage69E1 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - E/Item_001_Steve_had_a_busy_weekend._He_woke_up_early_and_brushed_his.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 69/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd45pg69-instructions-adult-lady_GbFFFTCs.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const PARA_COLOR       = "#2b2b2b";
const DOT_DEFAULT      = "#e07b00";
const DOT_SELECTED     = "#2096a6";
const LINE_DEFAULT     = "#e07b00";
const LINE_SHOW_ANS    = "#c81e1e";
const LEFT_SEL_BG      = "#e0f7fa";
const LEFT_SEL_BD      = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and match." },
  { start: 5.0,  end: 14.0, text: "Steve had a busy weekend. He woke up early and brushed his teeth." },
  { start: 14.0, end: 24.0, text: "He cooked a breakfast of eggs and toast. He cleaned his room and helped his mom and dad." },
  { start: 24.0, end: 34.0, text: "In the afternoon, he went out with friends. They played soccer on a field." },
  { start: 34.0, end: 42.0, text: "He came home and ate dinner with his family. Then, he went to bed." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "He cooked a breakfast" },
  { id: 2, text: "He cleaned his room"   },
  { id: 3, text: "They played soccer"    },
  { id: 4, text: "He came home"          },
];

const RIGHT_ITEMS = [
  { name: "r1", text: "on a field.",             correctLeftId: 3 },
  { name: "r2", text: "of eggs and toast.",      correctLeftId: 1 },
  { name: "r3", text: "and then went to bed.",   correctLeftId: 4 },
  { name: "r4", text: "and helped his mom and dad.", correctLeftId: 2 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadMatch_QE() {
const listening=useExerciseListening("sb_unit8_page6_q1");

  const [connections,  setConnections]  = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

const [results,setResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");
const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);const checkDisabled=showAns||LEFT_ITEMS.every(item=>results[item.id]===true);const orderedRight=()=>[...RIGHT_ITEMS];
const lockedLeft=id=>showAns||results[id]===true;const lockedRight=name=>showAns||Object.keys(connections).some(id=>connections[id]===name&&results[id]===true);
const cancelFocus=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;};const cancel=()=>{cancelFocus();setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const focusSide=side=>{cancelFocus();focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const item=side==='left'?LEFT_ITEMS.find(x=>!lockedLeft(x.id)):orderedRight().find(x=>!lockedRight(x.name));endpointRefs.current[side+'-'+(side==='left'?item?.id:item?.name)]?.focus({preventScroll:true});});};
const connect=(id,name,keyboard)=>{if(lockedLeft(id)||lockedRight(name))return;const next={...connections};Object.keys(next).forEach(k=>{if(Number(k)===id||next[k]===name)delete next[k];});next[id]=name;setConnections(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([key,value])=>value===true||(Number(key)!==id&&next[key]===connections[key]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left');};
const endpointKeys=(event,side,value)=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();cancel();return;}const items=side==='left'?LEFT_ITEMS.map(x=>x.id):orderedRight().map(x=>x.name);let index=items.indexOf(value);if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();const available=items.filter(x=>side==='left'?!lockedLeft(x):!lockedRight(x));index=available.indexOf(value);const next=available[(index+(event.key==='ArrowDown'?1:-1)+available.length)%available.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(event.key==='Tab'&&side==='right'){const next=items[index+(event.shiftKey?-1:1)];if(next!==undefined){event.preventDefault();event.stopPropagation();endpointRefs.current['right-'+next]?.focus();}return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(!event.repeat)(side==='left'?handleLeftClick:handleRightClick)(value,true);}};

  const containerRef = useRef(null);
  const leftRefs     = useRef({});  // dot refs left
  const rightRefs    = useRef({});  // dot refs right
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter=useCallback(el=>{if(!el||!containerRef.current)return null;const root=containerRef.current,c=root.getBoundingClientRect(),e=el.getBoundingClientRect(),sx=c.width/root.clientWidth||1,sy=c.height/root.clientHeight||1;return{x:(e.left-c.left+e.width/2)/sx,y:(e.top-c.top+e.height/2)/sy};},[]);

  const isCorrect      = (lid, rn) => { const r = RIGHT_ITEMS.find((ri) => ri.name === rn); return r && r.correctLeftId === Number(lid); };
  const connectedRight = (n)  => Object.values(connections).includes(n);
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);
  const lineColor=id=>showAns||results[id]===true?"#16a34a":results[id]===false?"#ef4444":LINE_DEFAULT;

  const handleLeftClick=(id,keyboard=false)=>{listening.play(`left-${id}`,[clipPage69E6,clipPage69E8,clipPage69E10,clipPage69E12][id-1]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement('Sentence selected. Choose its match.');if(keyboard&&selectedLeft!==id)focusSide('right');};

  const handleRightClick=(name,keyboard=false)=>{listening.play(`right-${name}`,[clipPage69E7,clipPage69E9,clipPage69E11,clipPage69E13][Number(name.slice(1))-1]);if(lockedRight(name))return;if(selectedLeft!==null){connect(selectedLeft,name,keyboard);return;}setSelectedRight(prev=>prev===name?null:name);setPreview(null);setAnnouncement('Match selected. Choose a sentence.');if(keyboard&&selectedRight!==name)focusSide('left');};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(connections).length<LEFT_ITEMS.length){ValidationAlert.info('Please connect all sentences first.');return;}const next=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,isCorrect(item.id,connections[item.id])]));const score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {}; RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    cancel();setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {listening.stop();
    cancel();setResults({});setAnnouncement("Connections cleared.");setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rn]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rn]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${lid}-${rn}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(lid)} strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const leftDotColor=id=>lockedLeft(id)?"#16a34a":results[id]===false?"#ef4444":selectedLeft===id||connectedLeft(id)?"#2195a6":LINE_DEFAULT;

  const rightDotColor=name=>lockedRight(name)?"#16a34a":Object.keys(connections).some(id=>connections[id]===name&&results[id]===false)?"#ef4444":selectedRight===name||connectedRight(name)?"#2195a6":LINE_DEFAULT;

  const isLeftWrong=id=>!showAns&&results[id]===false;

  return (
    <div onKeyDown={event=>{if(event.key==="Escape"&&(selectedLeft!==null||selectedRight!==null)){event.preventDefault();event.stopPropagation();cancel();setAnnouncement("Selection cancelled.");}}} data-adapt-scope="unit8_Unit8_Page6_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit8_Unit8_Page6_Q1"] input:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_Unit8_Page6_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrm-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(14px, 2vw, 28px);
          align-items: flex-start;
          width: 100%;
        }
        .lrm-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
        }
        .lrm-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }

        /* ── Matching table ── */
        .lrm-area { position: relative; width: 100%; }

        /* 3-column grid: left-sentences | center-dots | right-sentences */
        .lrm-table {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          width: 100%;
        }

        /* Left sentences column */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
        }

        /* Right sentences column */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
        }

        /* Center dots column */
        .lrm-dots-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding:0 clamp(100px, 3vw, 100px);
        }

        /* Each row — same height for alignment */
        .lrm-left-row {
          display: flex;
          align-items: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
          cursor: pointer;
          user-select: none;
          padding: clamp(4px, 0.6vw, 8px) 0;
        }
        .lrm-left-row--locked { cursor: default; }

        .lrm-right-row {
          display: flex;
          align-items: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
          cursor: pointer;
          user-select: none;
          padding: clamp(4px, 0.6vw, 8px) 0;
        }
        .lrm-right-row--locked { cursor: default; }

        .lrm-dot-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-height: clamp(40px, 5vw, 60px);
        }

        /* Sentence wrap for left */
        .lrm-sent-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          border-radius: 10px;
          border: 2px solid transparent;
          padding: clamp(3px, 0.4vw, 6px) clamp(6px, 0.8vw, 10px);
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
        }
        .lrm-sent-wrap--selected { border-color: ${LEFT_SEL_BD}; background: ${LEFT_SEL_BG}; }

        .lrm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrm-sent-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.3;
        }

        .lrm-right-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.3;
        }

        /* Dots */
        .lrm-dot-wrap { position: relative; }

        .lrm-dot {
          width: clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .lrm-left-row:not(.lrm-left-row--locked):hover .lrm-dot { transform: scale(1.3); }
        .lrm-right-row:not(.lrm-right-row--locked):hover .lrm-dot { transform: scale(1.3); }

        /* ✕ badge — فقط على نقاط اليسار الغلط */
        .lrm-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* SVG overlay */
        .lrm-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; overflow: visible;
        }

        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrm-top { grid-template-columns: 1fr; }
          .lrm-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
          .lrm-sent-text, .lrm-right-text { font-size: clamp(11px,3.2vw,15px); }
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
        <ExerciseHeader subTitle="Listen to one item at a time, replay if needed, then connect it to the picture, word, or sentence that matches." sectionLetter="E" title={<>Listen, read, and match.</>} />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer pageId="sb_unit8_page6_q1" src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Top: paragraph + image ── */}
        <div className="lrm-top">
          <p className="lrm-para">{renderExerciseAudioText({audio:listening,id:"paragraph-1",src:clipPage69E1,label:"Steve had a busy weekend. He woke up early and brushed his ",children:"Steve had a busy weekend. He woke up early and brushed his "})}{renderExerciseAudioText({audio:listening,id:"paragraph-2",src:clipPage69E2,label:"teeth. He cooked a breakfast of eggs and toast. He cleaned his ",children:"teeth. He cooked a breakfast of eggs and toast. He cleaned his "})}{renderExerciseAudioText({audio:listening,id:"paragraph-3",src:clipPage69E3,label:"room and helped his mom and dad. In the afternoon, he went out ",children:"room and helped his mom and dad. In the afternoon, he went out "})}{renderExerciseAudioText({audio:listening,id:"paragraph-4",src:clipPage69E4,label:"with friends. They played soccer on a field. He came home and ate ",children:"with friends. They played soccer on a field. He came home and ate "})}{renderExerciseAudioText({audio:listening,id:"paragraph-5",src:clipPage69E5,label:"dinner with his family. Then, he went to bed.",children:"dinner with his family. Then, he went to bed."})}</p>
          <img src={imgScene} alt={"A woman holding a baby beside a child at a sink."} className="lrm-scene-img" />
        </div>

        {/* ── Matching ── */}
        <div className="lrm-area" ref={containerRef}>
          <div className="lrm-table">

            {/* Left sentences */}
            <div className="lrm-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSel   = selectedLeft === item.id;
                const isLk    = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                const isWrong = isLeftWrong(item.id);
                return (
                  <div data-listening={`left-${item.id}`} style={{...({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":({}).background}),position:"relative",background:listening.activeId===`left-${item.id}`?"#dbeafe":({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":({}).background}).background,boxShadow:[({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":({}).background}).boxShadow,listening.activeId===`left-${item.id}`?"0 0 0 2px #2563eb":null].filter(Boolean).join(", ")||undefined}} role="button" tabIndex={0} data-keyboard-choice data-match-side="left" data-match-id={item.id} ref={el=>{endpointRefs.current['left-'+item.id]=el;}} aria-label={item.text} aria-pressed={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={event=>endpointKeys(event,'left',item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:item.id})} onMouseEnter={()=>setPreview({side:'left',id:item.id})} onMouseLeave={()=>setPreview(null)}
                    key={item.id}
                    className={["lrm-left-row", isLk ? "lrm-left-row--locked" : ""].filter(Boolean).join(" ")}
                    onClick={() => handleLeftClick(item.id)}
                  >
                    <div className={["lrm-sent-wrap", isSel ? "lrm-sent-wrap--selected" : ""].filter(Boolean).join(" ")}>
                      <span className="lrm-num">{item.id}</span>
                      <span className="lrm-sent-text">{item.text}</span>
                      {/* Left dot — inside sent-wrap at right end */}
                      <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                        <div className="lrm-dot-wrap">
                          <div
                            className="lrm-dot"
                            ref={(el) => { leftRefs.current[item.id] = el; }}
                            style={{ background: leftDotColor(item.id) }}
                          />
                          {isWrong && <div className="lrm-badge">✕</div>}
                        </div>
                      </div>
                    </div>
                  {listening.activeId===`left-${item.id}`&&renderExerciseSpeaker()}</div>
                );
              })}
            </div>

            {/* Center spacer — SVG lines drawn here */}
            <div className="lrm-dots-col" style={{ minWidth: "clamp(40px,6vw,80px)" }} />

            {/* Right sentences */}
            <div className="lrm-right-col">
              {RIGHT_ITEMS.map((item) => {
                const isLk = showAns;
                return (
                  <div data-listening={`right-${item.name}`} style={{...({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedRight(item.name)?"inset 0 0 0 2px #16a34a":selectedRight===item.name?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.name?"#dbeafe":({}).background}),position:"relative",background:listening.activeId===`right-${item.name}`?"#dbeafe":({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedRight(item.name)?"inset 0 0 0 2px #16a34a":selectedRight===item.name?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.name?"#dbeafe":({}).background}).background,boxShadow:[({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedRight(item.name)?"inset 0 0 0 2px #16a34a":selectedRight===item.name?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.name?"#dbeafe":({}).background}).boxShadow,listening.activeId===`right-${item.name}`?"0 0 0 2px #2563eb":null].filter(Boolean).join(", ")||undefined}} role="button" tabIndex={0} data-keyboard-choice data-match-side="right" data-match-id={item.name} ref={el=>{endpointRefs.current['right-'+item.name]=el;}} aria-label={item.text} aria-pressed={selectedRight===item.name} aria-disabled={lockedRight(item.name)} onKeyDown={event=>endpointKeys(event,'right',item.name)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:item.name})} onMouseEnter={()=>setPreview({side:'right',id:item.name})} onMouseLeave={()=>setPreview(null)}
                    key={item.name}
                    className={["lrm-right-row", isLk ? "lrm-right-row--locked" : ""].filter(Boolean).join(" ")}
                    onClick={() => handleRightClick(item.name)}
                  >
                    {/* Right dot */}
                    <div className="lrm-dot-wrap" style={{ marginRight: "clamp(6px,0.8vw,10px)", flexShrink: 0 }}>
                      <div
                        className="lrm-dot"
                        ref={(el) => { rightRefs.current[item.name] = el; }}
                        style={{ background: rightDotColor(item.name) }}
                      />
                    </div>
                    <span className="lrm-right-text">{item.text}</span>
                  {listening.activeId===`right-${item.name}`&&renderExerciseSpeaker()}</div>
                );
              })}
            </div>

          </div>

          <svg aria-hidden="true" className="lrm-svg">{renderLines()}{(()=>{let id=selectedLeft,name=selectedRight;if(id!==null&&preview?.side==='right')name=preview.id;else if(name!==null&&preview?.side==='left')id=preview.id;else return null;if(lockedLeft(id)||lockedRight(name))return null;const a=getDotCenter(leftRefs.current[id]),b=getDotCenter(rightRefs.current[name]);return a&&b?<line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>:null;})()}</svg>
        </div>

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
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