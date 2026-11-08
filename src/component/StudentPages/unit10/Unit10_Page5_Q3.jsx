import clipPage86C13 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_013_in_Oregon.mp3";
import clipPage86C12 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_012_He_has_gone_skiing.mp3";
import clipPage86C11 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_011_over_the_Mediterranean_Sea.mp3";
import clipPage86C10 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_010_He_has_toured_London.mp3";
import clipPage86C9 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_009_in_Switzerland.mp3";
import clipPage86C8 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_008_He_has_flown_in_a_small_plane.mp3";
import clipPage86C7 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_007_in_a_double-decker_bus.mp3";
import clipPage86C6 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_006_Alex_has_been_rock_climbing.mp3";
import clipPage86C5 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_005_future.mp3";
import clipPage86C4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_004_toured_London_in_a_double-decker_bus._He_has_done_all_of_these_things_an.mp3";
import clipPage86C3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_003_He_has_flown_in_a_small_plane_over_the_Mediterranean_Sea._He_has_visited.mp3";
import clipPage86C2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_002_rock_climbing_in_Oregon_and_has_gone_skiing_in_Switzerland._He_has_watch.mp3";
import clipPage86C1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - C/Item_001_Alex_enjoys_traveling_around_the_world._He_has_done_many_things_in_diffe.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🔊 AUDIO
// ─────────────────────────────────────────────
import sound from "../../../assets/audio/ClassBook/Grade 4/cd56pg86-instruction-adult-lady_fqy2rjlY.mp3";
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
  { start: 0.48,  end: 3.06,  text: "Page 86, Write Activities." },
  { start: 3.06,  end: 7.62,  text: "Exercise C, Listen, read, and match." },
  { start: 7.62,  end: 10.54, text: "Alex enjoys traveling around the world." },
  { start: 10.54, end: 13.24, text: "He has done many things in different countries." },
  { start: 13.24, end: 18.72, text: "Alex has been rock climbing in Oregon and has gone skiing in Switzerland." },
  { start: 18.72, end: 21.86, text: "He has watched chefs make pizza in Italy." },
  { start: 21.86, end: 25.90, text: "He has flown in a small plane over the Mediterranean Sea." },
  { start: 25.90, end: 32.78, text: "He has visited the Blue Mosque in Turkey and toured London in a double-decker bus." },
  { start: 32.78, end: 37.04, text: "He has done all of these things and plans to do more in the future." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "Alex has been rock climbing" },
  { id: 2, text: "He has flown in a small plane" },
  { id: 3, text: "He has toured London" },
  { id: 4, text: "He has gone skiing" },
];

const RIGHT_ITEMS = [
  { name: "r1", text: "in a double-decker bus.",      correctLeftId: 3 },
  { name: "r2", text: "in Switzerland.",               correctLeftId: 4 },
  { name: "r3", text: "over the Mediterranean Sea.",   correctLeftId: 2 },
  { name: "r4", text: "in Oregon.",                    correctLeftId: 1 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadMatch_QC() {
const listening=useExerciseListening("sb_unit10_page5_q3");

  const [connections,  setConnections]  = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);


const [results,setResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");
const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);const checkDisabled=showAns||LEFT_ITEMS.every(item=>results[item.id]===true);
const lockedLeft=id=>showAns||results[id]===true;const lockedRight=value=>showAns||Object.keys(connections).some(id=>connections[id]===value&&results[id]===true);
const cancel=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const focusSide=side=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const value=side==='left'?LEFT_ITEMS.find(x=>!lockedLeft(x.id))?.id:RIGHT_ITEMS.find(x=>!lockedRight(x.name))?.name;endpointRefs.current[side+'-'+value]?.focus({preventScroll:true});});};
const connect=(id,value,keyboard)=>{if(lockedLeft(id)||lockedRight(value))return;const next={...connections};Object.keys(next).forEach(k=>{if(Number(k)===id||next[k]===value)delete next[k];});next[id]=value;setConnections(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([key,result])=>result===true||(Number(key)!==id&&next[key]===connections[key]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left');};
const endpointKeys=(event,side,value)=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();cancel();return;}if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();const values=side==='left'?LEFT_ITEMS.filter(x=>!lockedLeft(x.id)).map(x=>x.id):RIGHT_ITEMS.filter(x=>!lockedRight(x.name)).map(x=>x.name);const i=values.indexOf(value),next=values[(i+(event.key==='ArrowDown'?1:-1)+values.length)%values.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(!event.repeat)(side==='left'?handleLeftClick:handleRightClick)(value,true);}};

  const containerRef = useRef(null);
  const leftRefs     = useRef({});
  const rightRefs    = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter=useCallback(el=>{if(!el||!containerRef.current)return null;const cRect=containerRef.current.getBoundingClientRect(),eRect=el.getBoundingClientRect();return{x:(eRect.left-cRect.left+eRect.width/2)/(cRect.width/containerRef.current.clientWidth||1),y:(eRect.top-cRect.top+eRect.height/2)/(cRect.height/containerRef.current.clientHeight||1)};},[]);

  const isCorrect      = (lid, rn) => { const r = RIGHT_ITEMS.find((ri) => ri.name === rn); return r && r.correctLeftId === Number(lid); };
  
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);
  const lineColor=id=>showAns||results[id]===true?"#16a34a":results[id]===false?"#ef4444":LINE_DEFAULT;

  const handleLeftClick=(id,keyboard=false)=>{listening.play(`left-${id}`,[clipPage86C6,clipPage86C8,clipPage86C10,clipPage86C12][id-1]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement('Item selected. Choose a matching description.');if(keyboard&&selectedLeft!==id)focusSide('right');};

  const handleRightClick=(value,keyboard=false)=>{listening.play(`right-${value}`,[clipPage86C7,clipPage86C9,clipPage86C11,clipPage86C13][Number(value.slice(1))-1]);if(lockedRight(value))return;if(selectedLeft!==null){connect(selectedLeft,value,keyboard);return;}setSelectedRight(prev=>prev===value?null:value);setPreview(null);setAnnouncement('Description selected. Choose its match.');if(keyboard&&selectedRight!==value)focusSide('left');};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(connections).length<LEFT_ITEMS.length){ValidationAlert.info('Please connect all items first.');return;}const next=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,isCorrect(item.id,connections[item.id])]));const score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {}; RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    cancel();setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {listening.stop(); cancel();setResults({});setAnnouncement("Connections cleared.");setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null); };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rn]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rn]);
      if (!p1 || !p2) return null;
      return <line key={`${lid}-${rn}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={lineColor(lid)} strokeWidth="2.5" strokeLinecap="round" />;
    });

  const leftDotColor=id=>lockedLeft(id)?"#16a34a":selectedLeft===id?"#2563eb":DOT_DEFAULT;
  const rightDotColor=value=>lockedRight(value)?"#16a34a":selectedRight===value?"#2563eb":DOT_DEFAULT;
  const isLeftWrong=id=>!showAns&&results[id]===false;

  return (
    <div data-adapt-scope="unit10_Unit10_Page5_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit10_Unit10_Page5_Q3"] input:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_Unit10_Page5_Q3"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lrmc-para {
          font-size: clamp(13px,1.6vw,19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
          width: 100%;
        }
        .lrmc-area  { position: relative; width: 100%; }

        /* 3 cols: left | spacer | right */
        .lrmc-table {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          width: 100%;
        }

        .lrmc-left-col  { display: flex; flex-direction: column; }
        .lrmc-right-col { display: flex; flex-direction: column;     padding-left: 10em;
 }

        /* Each row same min-height so dots align horizontally */
        .lrmc-left-row {
          display: flex; align-items: center;
          flex: 1; min-height: clamp(40px,5vw,60px);
          cursor: pointer; user-select: none;
          padding: clamp(4px,0.6vw,8px) 0;
        }
        .lrmc-left-row--locked { cursor: default; }

        .lrmc-right-row {
          display: flex; align-items: center;
          flex: 1; min-height: clamp(40px,5vw,60px);
          cursor: pointer; user-select: none;
          padding: clamp(4px,0.6vw,8px) 0;
        }
        .lrmc-right-row--locked { cursor: default; }

        /* Sentence wrap */
        .lrmc-sent-wrap {
          display: flex; align-items: center;
          gap: clamp(6px,0.8vw,10px);
          border-radius: 10px; border: 2px solid transparent;
          padding: clamp(3px,0.4vw,6px) clamp(6px,0.8vw,10px);
          transition: border-color 0.15s, background 0.15s;
          width: 100%;
        }
        .lrmc-sent-wrap--selected { border-color: ${LEFT_SEL_BD}; background: ${LEFT_SEL_BG}; }

        .lrmc-num {
          font-size: clamp(13px,1.6vw,19px); font-weight:700;
          color:${NUMBER_COLOR}; flex-shrink:0; line-height:1;
        }
        .lrmc-sent-text  { font-size:clamp(12px,1.45vw,17px); color:${TEXT_COLOR}; line-height:1.3; }
        .lrmc-right-text { font-size:clamp(12px,1.45vw,17px); color:${TEXT_COLOR}; line-height:1.3; }

        /* Dots */
        .lrmc-dot-wrap { position: relative; flex-shrink:0; }
        .lrmc-dot {
          width:clamp(11px,1.3vw,15px); height:clamp(11px,1.3vw,15px);
          border-radius:50%; transition:background 0.15s, transform 0.15s; cursor:pointer;
        }
            .lrmc-dot-1 {
          width:clamp(11px,1.3vw,15px); height:clamp(11px,1.3vw,15px); position : relative; left : -5em ;
          border-radius:50%; transition:background 0.15s, transform 0.15s; cursor:pointer;
        }
        .lrmc-left-row:not(.lrmc-left-row--locked):hover  .lrmc-dot { transform:scale(1.3); }
        .lrmc-right-row:not(.lrmc-right-row--locked):hover .lrmc-dot { transform:scale(1.3); }

        /* Badge — يسار فقط */
        .lrmc-badge {
          position:absolute; top:-7px; right:-7px;
          width:clamp(13px,1.5vw,16px); height:clamp(13px,1.5vw,16px);
          border-radius:50%; background:${WRONG_BADGE_BG}; color:${WRONG_BADGE_TEXT};
          display:flex; align-items:center; justify-content:center;
          font-size:clamp(6px,0.7vw,9px); font-weight:700;
          border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2);
          pointer-events:none; z-index:3;
        }

        .lrmc-svg { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:visible; }
        .lrmc-buttons { display:flex; justify-content:center; margin-top:clamp(8px,1.6vw,18px); }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <ExerciseHeader subTitle="Listen to one item at a time, replay if needed, then connect it to the picture, word, or sentence that matches." sectionLetter="C" title={<>Listen, read, and match.</>} />

        {/* ── Audio ── */}
        <div style={{ marginTop:"4px" }}>
          <QuestionAudioPlayer pageId="sb_unit10_page5_q3" src={sound} captions={captions} stopAtSecond={3.1} />
        </div>

        {/* ── Paragraph ── */}
        <p className="lrmc-para">{renderExerciseAudioText({audio:listening,id:"paragraph-0",src:clipPage86C1,label:"Alex enjoys traveling around the world. He has done many things in different countries. Alex has been ",children:"Alex enjoys traveling around the world. He has done many things in different countries. Alex has been "})}{renderExerciseAudioText({audio:listening,id:"paragraph-1",src:clipPage86C2,label:"rock climbing in Oregon and has gone skiing in Switzerland. He has watched chefs make pizza in Italy. ",children:"rock climbing in Oregon and has gone skiing in Switzerland. He has watched chefs make pizza in Italy. "})}{renderExerciseAudioText({audio:listening,id:"paragraph-2",src:clipPage86C3,label:"He has flown in a small plane over the Mediterranean Sea. He has visited the Blue Mosque in Turkey and ",children:"He has flown in a small plane over the Mediterranean Sea. He has visited the Blue Mosque in Turkey and "})}{renderExerciseAudioText({audio:listening,id:"paragraph-3",src:clipPage86C4,label:"toured London in a double-decker bus. He has done all of these things and plans to do more in the ",children:"toured London in a double-decker bus. He has done all of these things and plans to do more in the "})}{renderExerciseAudioText({audio:listening,id:"paragraph-4",src:clipPage86C5,label:"future.",children:"future."})}</p>

        {/* ── Matching ── */}
        <div className="lrmc-area" ref={containerRef}>
          <div className="lrmc-table">

            {/* Left */}
            <div className="lrmc-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSel   = selectedLeft === item.id;
                const isLk    = showAns || (showResults && connectedLeft(item.id) && isCorrect(item.id, connections[item.id]));
                const isWrong = isLeftWrong(item.id);
                return (
                  <div data-listening={`left-${item.id}`} style={(base=>({...base,position:"relative",background:listening.activeId===`left-${item.id}`?"#dbeafe":base.background,boxShadow:listening.activeId===`left-${item.id}`?"0 0 0 2px #2563eb":base.boxShadow}))({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":({}).background})} role="button" tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(item.id)?-1:0} data-keyboard-choice data-match-side="left" data-match-id={item.id} ref={el=>{endpointRefs.current['left-'+item.id]=el;}} aria-label={item.text} aria-pressed={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={event=>endpointKeys(event,'left',item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:item.id})} onMouseEnter={()=>setPreview({side:'left',id:item.id})} onMouseLeave={()=>setPreview(null)} key={item.id}
                    className={["lrmc-left-row", isLk?"lrmc-left-row--locked":""].filter(Boolean).join(" ")}
                    onClick={() => handleLeftClick(item.id)}
                  >
                    <div className={["lrmc-sent-wrap", isSel?"lrmc-sent-wrap--selected":""].filter(Boolean).join(" ")}>
                      <span className="lrmc-num">{item.id}</span>
                      <span className="lrmc-sent-text">{item.text}</span>
                      {/* dot at right edge of sentence */}
                      <div style={{ marginLeft:"auto", flexShrink:0 }}>
                        <div className="lrmc-dot-wrap">
                          <div className="lrmc-dot-1"
                            ref={(el) => { leftRefs.current[item.id] = el; }}
                            style={{ background: leftDotColor(item.id) }}
                          />
                          {isWrong && <div className="lrmc-badge">✕</div>}
                        </div>
                      </div>
                    </div>
                  {listening.activeId===`left-${item.id}`&&renderExerciseSpeaker()}</div>
                );
              })}
            </div>

            {/* Spacer */}
            <div style={{ minWidth:"clamp(200px, 6vw, 200px);" }} />

            {/* Right */}
            <div className="lrmc-right-col">
              {RIGHT_ITEMS.map((item) => (
                <div data-listening={`right-${item.name}`} style={(base=>({...base,position:"relative",background:listening.activeId===`right-${item.name}`?"#dbeafe":base.background,boxShadow:listening.activeId===`right-${item.name}`?"0 0 0 2px #2563eb":base.boxShadow}))({...({}),borderRadius:({}).borderRadius||6,boxShadow:lockedRight(item.name)?"inset 0 0 0 2px #16a34a":selectedRight===item.name?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.name?"#dbeafe":({}).background})} role="button" tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(item.name)?-1:0} data-keyboard-choice data-match-side="right" data-match-id={item.name} ref={el=>{endpointRefs.current['right-'+item.name]=el;}} aria-label={item.text} aria-pressed={selectedRight===item.name} aria-disabled={lockedRight(item.name)} onKeyDown={event=>endpointKeys(event,'right',item.name)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:item.name})} onMouseEnter={()=>setPreview({side:'right',id:item.name})} onMouseLeave={()=>setPreview(null)} key={item.name}
                  className={["lrmc-right-row", showAns?"lrmc-right-row--locked":""].filter(Boolean).join(" ")}
                  onClick={() => handleRightClick(item.name)}
                >
                  {/* dot at left edge */}
                  <div className="lrmc-dot-wrap" style={{ marginRight:"clamp(6px,0.8vw,10px)", flexShrink:0 }}>
                    <div className="lrmc-dot"
                      ref={(el) => { rightRefs.current[item.name] = el; }}
                      style={{ background: rightDotColor(item.name) }}
                    />
                  </div>
                  <span className="lrmc-right-text">{item.text}</span>
                {listening.activeId===`right-${item.name}`&&renderExerciseSpeaker()}</div>
              ))}
            </div>

          </div>
          <svg aria-hidden="true" className="lrmc-svg">{renderLines()}{(()=>{let id=selectedLeft,value=selectedRight;if(id!==null&&preview?.side==='right')value=preview.id;else if(value!==null&&preview?.side==='left')id=preview.id;else return null;if(lockedLeft(id)||lockedRight(value))return null;const a=getDotCenter(leftRefs.current[id]),b=getDotCenter(rightRefs.current[value]);return a&&b?<line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>:null;})()}</svg>
        </div>

        {/* ── Buttons ── */}
        <div className="lrmc-buttons">
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