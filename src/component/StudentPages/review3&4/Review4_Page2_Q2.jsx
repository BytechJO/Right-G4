import clipE12 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_012_Andy.mp3";
import clipE11 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_011_Susan_is_slower_than.mp3";
import clipE10 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_010_Trevor.mp3";
import clipE9 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_009_Alex_is_taller_than.mp3";
import clipE8 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_008_Rachel.mp3";
import clipE7 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_007_Ned_is_stronger_than.mp3";
import clipE6 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_006_Tanya.mp3";
import clipE5 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_005_Naomi_is_shorter_than.mp3";
import clipE4 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_004_Tanya_is_faster_than_Susan.mp3";
import clipE3 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_003_Trevor_is_weaker_than_Ned.mp3";
import clipE2 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_002_Rachel_is_taller_than_Naomi.mp3";
import clipE1 from "../../../assets/audio/ClassBook/Unit 4/Page 37 - E/Item_001_Andy_is_shorter_than_Alex.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  CHART IMAGE
// ─────────────────────────────────────────────
import imgChartTable from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 23.svg";

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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR               = "#2b2b2b";
const NUMBER_COLOR             = "#2b2b2b";
const NAME_COLOR               = "#2b2b2b";
const DOT_DEFAULT              = "#e07b00";   // أورنج
const DOT_SELECTED             = "#2096a6";
const LINE_DEFAULT             = "#e07b00";   // أورنج دايماً
const LINE_SHOW_ANS            = "#c81e1e";
const SENTENCE_SELECTED_BG     = "#e0f7fa";
const SENTENCE_SELECTED_BORDER = "#2096a6";
const WRONG_BADGE_BG           = "#ef4444";
const WRONG_BADGE_TEXT         = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, sentence: "Naomi is shorter than" },
  { id: 2, sentence: "Ned is stronger than"  },
  { id: 3, sentence: "Alex is taller than"   },
  { id: 4, sentence: "Susan is slower than"  },
];

const RIGHT_ITEMS = [
  { name: "Tanya",  correctLeftId: 4 },
  { name: "Rachel", correctLeftId: 1 },
  { name: "Trevor", correctLeftId: 2 },
  { name: "Andy",   correctLeftId: 3 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadChartMatch_QE() {
  const listening=useExerciseListening("sb_review4_page2_q2");

  const [connections,  setConnections]  = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
 const [results,setResults] = useState({});
 const [selectedRight,setSelectedRight] = useState(null);
 const [previewEndpoint,setPreviewEndpoint] = useState(null);
 const [announcement,setAnnouncement] = useState("");
 const resetButtonRef = useRef(null), leftControlRefs = useRef({}), rightControlRefs = useRef({});
 const checkDisabled = showAns || LEFT_ITEMS.every(item=>results[item.id] === "correct");
 const leftLocked = id => showAns || results[id] === "correct";
 const rightLocked = name => showAns || Object.entries(connections).some(([id,value])=>value===name && results[id] === "correct");
 const cancelSelection = () => {setSelectedLeft(null);setSelectedRight(null);setPreviewEndpoint(null);};
 const focusCandidate = side => {const ids=side==="left"?LEFT_ITEMS.map(item=>item.id):RIGHT_ITEMS.map(item=>item.name);const id=ids.find(value=>!(side==="left"?leftLocked(value):rightLocked(value)));if(id!==undefined){setPreviewEndpoint({side,id});(side==="left"?leftControlRefs:rightControlRefs).current[id]?.focus({preventScroll:true});}};
 const connect = (id,name,keyboard=false) => {if(leftLocked(id)||rightLocked(name))return;const affected=[String(id),...Object.keys(connections).filter(key=>connections[key]===name && !leftLocked(key))];setConnections(prev=>{const next={...prev};for(const key of affected)delete next[key];next[id]=name;return next;});setResults(prev=>{const next={...prev};for(const key of affected)delete next[key];return next;});cancelSelection();setAnnouncement(`${LEFT_ITEMS.find(item=>item.id===Number(id))?.sentence} ${name}.`);if(keyboard){const next=LEFT_ITEMS.find(item=>item.id!==Number(id)&&!leftLocked(item.id));(leftControlRefs.current[next?.id]||resetButtonRef.current)?.focus({preventScroll:true});}};
 const endpointKey = (event,side,id) => {if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)(side==="left"?handleLeftClick:handleRightClick)(id,true);return;}if(event.key==="Escape"){event.preventDefault();event.stopPropagation();const source=selectedLeft!==null?leftControlRefs.current[selectedLeft]:rightControlRefs.current[selectedRight];cancelSelection();source?.focus({preventScroll:true});setAnnouncement("Match cancelled.");return;}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)){event.preventDefault();event.stopPropagation();const ids=(side==="left"?LEFT_ITEMS.map(item=>item.id):RIGHT_ITEMS.map(item=>item.name)).filter(value=>!(side==="left"?leftLocked(value):rightLocked(value)));const step=event.key==="ArrowLeft"||event.key==="ArrowUp"?-1:1;const next=ids[(ids.indexOf(id)+step+ids.length)%ids.length];(side==="left"?leftControlRefs:rightControlRefs).current[next]?.focus({preventScroll:true});}};
 const preview = (side,id) => {if((selectedLeft!==null&&side==="right"&&!rightLocked(id))||(selectedRight!==null&&side==="left"&&!leftLocked(id)))setPreviewEndpoint({side,id});};
 const renderPreview = () => {if(!previewEndpoint)return null;const from=selectedLeft!==null?getDotCenter(leftRefs.current[selectedLeft]):selectedRight!==null?getDotCenter(rightRefs.current[selectedRight]):null;const to=getDotCenter((previewEndpoint.side==="left"?leftRefs:rightRefs).current[previewEndpoint.id]);return from&&to?<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6,3" />:null;};

  const containerRef = useRef(null);
  const leftRefs     = useRef({});
  const rightRefs    = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter = useCallback((el) => {
    if (!el || !containerRef.current) return null;
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x: (eRect.left - cRect.left + eRect.width / 2) * (containerRef.current.clientWidth / cRect.width),
      y: (eRect.top - cRect.top + eRect.height / 2) * (containerRef.current.clientHeight / cRect.height),
    };
  }, []);

  const isCorrect      = (leftId, rightName) => {
    const correct = RIGHT_ITEMS.find((r) => r.correctLeftId === Number(leftId));
    return correct && correct.name === rightName;
  };
  const connectedRight = (n)  => Object.values(connections).includes(n);
  const connectedLeft  = (id) => Object.prototype.hasOwnProperty.call(connections, id);

  // خط أورنج دايماً — يتغير فقط لـ Show Answer
  const lineColor = leftId => showAns || results[leftId] === "correct" ? "#16a34a" : results[leftId] === "wrong" ? "#ef4444" : LINE_DEFAULT;

  // ── Handlers ──
  const handleLeftClick = (id,keyboard=false) => {listening.play(`left-${id}`,[clipE5,clipE7,clipE9,clipE11][id-1]);if(leftLocked(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}if(selectedLeft===id){cancelSelection();setAnnouncement("Match cancelled.");return;}setSelectedLeft(id);setSelectedRight(null);setPreviewEndpoint(null);setAnnouncement("Sentence selected. Choose a name.");if(keyboard)focusCandidate("right");};

  const handleRightClick = (name,keyboard=false) => {listening.play(`right-${name}`,({Tanya:clipE6,Rachel:clipE8,Trevor:clipE10,Andy:clipE12})[name]);if(rightLocked(name))return;if(selectedLeft!==null){connect(selectedLeft,name,keyboard);return;}if(selectedRight===name){cancelSelection();setAnnouncement("Match cancelled.");return;}setSelectedRight(name);setSelectedLeft(null);setPreviewEndpoint(null);setAnnouncement(`${name} selected. Choose a sentence.`);if(keyboard)focusCandidate("left");};

  const handleCheck = () => {if(checkDisabled)return;listening.stop();cancelSelection();if(!LEFT_ITEMS.every(item=>connections[item.id])){ValidationAlert.info("Please connect all items first.");return;}const next=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,results[item.id] === "correct" || isCorrect(item.id,connections[item.id]) ? "correct":"wrong"]));const score=Object.values(next).filter(value=>value === "correct").length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct matches are locked; incorrect matches can be changed.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    RIGHT_ITEMS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    setConnections(ans); setShowResults(false); setShowAns(true); setResults({});cancelSelection();resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct matches shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setConnections({}); setShowResults(false); setShowAns(false);setResults({});cancelSelection();setAnnouncement("Matches and feedback cleared.");
  };

  // ── SVG lines ──
  const renderLines = () =>
    Object.entries(connections).map(([leftId, rightName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[rightName]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${leftId}-${rightName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId)}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  // ── Dot colors — أورنج دايماً ──
  const leftDotColor = (id) => {
    if (leftLocked(id))return "#16a34a";
    if (selectedLeft === id)          return DOT_SELECTED;
    if (showAns && connectedLeft(id)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  const rightDotColor = (name) => {
    if (rightLocked(name))return "#16a34a";
    if (showAns && connectedRight(name)) return LINE_SHOW_ANS;
    return DOT_DEFAULT;
  };

  // ── Badge helpers — فقط على الغلط ──
  const isLeftWrong = id => !showAns && results[id] === "wrong";

  const isRightWrong = name => !showAns && Object.entries(connections).some(([id,value])=>value===name && results[id] === "wrong");

  return (
    <div data-listening-scope={"sb_review4_page2_q2"} data-adapt-scope="review3&4_Review4_Page2_Q2" className="main-container-component"><style>{`[data-listening-scope="sb_review4_page2_q2"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review3&4_Review4_Page2_Q2"] input:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review3&4_Review4_Page2_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rcm-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
          width: 100%;
          margin: 8% 0;
        }

        .rcm-match-area { position: relative; }

        .rcm-match-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
        }

        .rcm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 42px);
        }

        .rcm-match-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(18px, 2.2vw, 26px);
        }

        .rcm-sentence-wrap {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 14px);
          border-radius: 10px;
          border: 1px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .rcm-sentence-wrap--selected {
          border-color: ${SENTENCE_SELECTED_BORDER};
          background: ${SENTENCE_SELECTED_BG};
        }
        .rcm-sentence-wrap--locked { cursor: default; }

        .rcm-sentence-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }

        /* نقطة يمين + wrapper للـ badge */
        .rcm-dot-left-wrap {
          position: relative;
          flex-shrink: 0;
          margin-inline-start: auto;
          left: -25%;
        }

        .rcm-dot-left {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .rcm-sentence-wrap:not(.rcm-sentence-wrap--locked):hover .rcm-dot-left {
          transform: scale(1.3);
        }

        .rcm-right-col {
          display: flex;
          flex-direction: column;
          gap: clamp(19px, 20.2vw, 45px);
          padding-left: clamp(36px, 5.5vw, 80px);
        }

        .rcm-right-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rcm-dot-right {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .rcm-dot-right:hover { transform: scale(1.3); }

        .rcm-name {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${NAME_COLOR};
          font-weight: 500;
          white-space: nowrap;
        }

        /* ✕ Badge */
        .rcm-badge {
          position: absolute;
          top: -1px; right: 30px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .rcm-svg-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rcm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .rcm-body { grid-template-columns: 1fr; }
          .rcm-sentence-text { white-space: normal; }
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
        <ExerciseHeader
          subTitle="Start with one item, then connect it to the picture, word, or sentence that matches before moving to the next pair." isReview sectionLetter="E" title={<>Read the chart and match.</>} />

        {/* ── Body ── */}
        <div className="rcm-body">

          {/* Chart */}
          <div style={{ overflow: "hidden", flexShrink: 0, width: "100%", height: "100%" ,position:"relative"}}>
            <img src={imgChartTable} alt="A comparison chart showing pairs of people and statements about height, strength and speed." style={{ width: "100%", height: "100%" }} />
          <span role="button" tabIndex={0} data-listening="chart-0" aria-label="Hear Andy is shorter than Alex." onClick={event=>{event.stopPropagation();listening.play("chart-0",clipE1);}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)listening.play("chart-0",clipE1);}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} style={{position:"absolute",left:"1%",top:"0.6%",width:"98%",height:"23.8%",cursor:"pointer",borderRadius:6,boxShadow:listening.activeId==="chart-0"?"0 0 0 3px #2563eb":undefined,backgroundColor:listening.activeId==="chart-0"?"rgba(219,234,254,.5)":undefined}}>{listening.activeId==="chart-0"&&renderExerciseSpeaker()}</span><span role="button" tabIndex={0} data-listening="chart-1" aria-label="Hear Rachel is taller than Naomi." onClick={event=>{event.stopPropagation();listening.play("chart-1",clipE2);}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)listening.play("chart-1",clipE2);}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} style={{position:"absolute",left:"1%",top:"25.6%",width:"98%",height:"23.8%",cursor:"pointer",borderRadius:6,boxShadow:listening.activeId==="chart-1"?"0 0 0 3px #2563eb":undefined,backgroundColor:listening.activeId==="chart-1"?"rgba(219,234,254,.5)":undefined}}>{listening.activeId==="chart-1"&&renderExerciseSpeaker()}</span><span role="button" tabIndex={0} data-listening="chart-2" aria-label="Hear Trevor is weaker than Ned." onClick={event=>{event.stopPropagation();listening.play("chart-2",clipE3);}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)listening.play("chart-2",clipE3);}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} style={{position:"absolute",left:"1%",top:"50.6%",width:"98%",height:"23.8%",cursor:"pointer",borderRadius:6,boxShadow:listening.activeId==="chart-2"?"0 0 0 3px #2563eb":undefined,backgroundColor:listening.activeId==="chart-2"?"rgba(219,234,254,.5)":undefined}}>{listening.activeId==="chart-2"&&renderExerciseSpeaker()}</span><span role="button" tabIndex={0} data-listening="chart-3" aria-label="Hear Tanya is faster than Susan." onClick={event=>{event.stopPropagation();listening.play("chart-3",clipE4);}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)listening.play("chart-3",clipE4);}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} style={{position:"absolute",left:"1%",top:"75.6%",width:"98%",height:"23.8%",cursor:"pointer",borderRadius:6,boxShadow:listening.activeId==="chart-3"?"0 0 0 3px #2563eb":undefined,backgroundColor:listening.activeId==="chart-3"?"rgba(219,234,254,.5)":undefined}}>{listening.activeId==="chart-3"&&renderExerciseSpeaker()}</span></div>

          {/* Matching */}
          <div className="rcm-match-area" ref={containerRef} style={{ width: "100%" }}>
            <div className="rcm-match-grid">

              {/* Left */}
              <div className="rcm-left-col">
                {LEFT_ITEMS.map((item) => {
                  const isSelected = selectedLeft === item.id;
                  const isLocked = leftLocked(item.id);
                  const dotWrong   = isLeftWrong(item.id);
                  return (
                    <div aria-invalid={dotWrong} data-listening={`left-${item.id}`} key={item.id} className="rcm-match-row" role="button" tabIndex={0} data-keyboard-choice ref={el=>{leftControlRefs.current[item.id]=el;}} aria-label={`${item.sentence}${connections[item.id]?" "+connections[item.id]:". Unmatched."}`} aria-pressed={isSelected} aria-disabled={isLocked} onClick={event=>handleLeftClick(item.id,event.detail===0)} onKeyDown={event=>endpointKey(event,"left",item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>preview("left",item.id)} onMouseEnter={()=>preview("left",item.id)} style={{borderRadius:"6px",background:isSelected?"#dbeafe":undefined,position:"relative",boxShadow:listening.activeId===(`left-${item.id}`)?"0 0 0 3px #2563eb":isSelected?"0 0 0 3px #2563eb":isLocked?"0 0 0 2px #16a34a":undefined,backgroundColor:listening.activeId===(`left-${item.id}`)?"#dbeafe":undefined}}>
                      <span className="rcm-num">{item.id}</span>
                      <div>
                        <div className={[
                          "rcm-sentence-wrap",
                          isSelected ? "rcm-sentence-wrap--selected" : "",
                          isLocked   ? "rcm-sentence-wrap--locked"   : "",
                        ].filter(Boolean).join(" ")}>
                          <span className="rcm-sentence-text">{item.sentence}</span>
                        </div>
                      </div>

                      {/* نقطة + badge */}
                      <div className="rcm-dot-left-wrap">
                        <div
                          className="rcm-dot-left"
                          ref={(el) => { leftRefs.current[item.id] = el; }}
                          style={{ background: leftDotColor(item.id) }}
                        />
                        {dotWrong && <div className="rcm-badge">✕</div>}
                      </div>
                    {listening.activeId===(`left-${item.id}`)&&renderExerciseSpeaker()}</div>
                  );
                })}
              </div>

              {/* Right */}
              <div className="rcm-right-col">
                {RIGHT_ITEMS.map((item) => {
                  const dotWrong = isRightWrong(item.name);
                  return (
                    <div aria-invalid={dotWrong} data-listening={`right-${item.name}`} key={item.name} className="rcm-right-item" role="button" tabIndex={0} data-keyboard-choice ref={el=>{rightControlRefs.current[item.name]=el;}} aria-label={item.name} aria-pressed={selectedRight===item.name} aria-disabled={rightLocked(item.name)} onClick={event=>handleRightClick(item.name,event.detail===0)} onKeyDown={event=>endpointKey(event,"right",item.name)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>preview("right",item.name)} onMouseEnter={()=>preview("right",item.name)} style={{borderRadius:"6px",background:selectedRight===item.name?"#dbeafe":undefined,position:"relative",boxShadow:listening.activeId===(`right-${item.name}`)?"0 0 0 3px #2563eb":selectedRight===item.name?"0 0 0 3px #2563eb":rightLocked(item.name)?"0 0 0 2px #16a34a":undefined,backgroundColor:listening.activeId===(`right-${item.name}`)?"#dbeafe":undefined}}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <div
                          className="rcm-dot-right"
                          ref={(el) => { rightRefs.current[item.name] = el; }}
                          style={{ background: rightDotColor(item.name) }}

                        />
                      </div>
                      <span className="rcm-name">{item.name}</span>
                    {listening.activeId===(`right-${item.name}`)&&renderExerciseSpeaker()}</div>
                  );
                })}
              </div>

            </div>

            <svg className="rcm-svg-overlay" aria-hidden="true">{renderLines()}{renderPreview()}</svg>
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="rcm-buttons">
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