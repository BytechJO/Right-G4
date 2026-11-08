import clipPage40D8 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_008_No,_there_weren't.mp3";
import clipPage40D7 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_007_Was_there_any_orange_juice.mp3";
import clipPage40D6 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_006_No,_there_wasn't.mp3";
import clipPage40D5 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_005_Was_there_any_steak.mp3";
import clipPage40D4 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_004_Yes,_there_were.mp3";
import clipPage40D3 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_003_Were_there_any_grapes.mp3";
import clipPage40D2 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_002_Yes,_there_was.mp3";
import clipPage40D1 from "../../../assets/audio/WorkBook/Unit 7/Page 40 - D/Item_001_Were_there_any_oranges.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 40/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 40/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 40/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U7 Folder/Page 40/SVG/Asset 8.svg";
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
const LINE_COLOR       = "#2096a6";
const WRONG_LINE_COLOR = "#2096a6";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "Were there any oranges?",     src: img1 },
  { id: 2, text: "Were there any grapes?",      src: img2 },
  { id: 3, text: "Was there any steak?",        src: img3 },
  { id: 4, text: "Was there any orange juice?", src: img4 },
];

const RIGHT_ITEMS = [
  { id: "a", text: "Yes, there was."   },
  { id: "b", text: "Yes, there were."  },
  { id: "c", text: "No, there wasn't." },
  { id: "d", text: "No, there weren't." },
];

// leftId → rightId  (حروف مطابقة لـ RIGHT_ITEMS)
const CORRECT_MATCHES = {
  1: "d",  // Were there any oranges?     → Yes, there were.
  2: "b",  // Were there any grapes?      → No, there weren't.
  3: "a",  // Was there any steak?        → Yes, there was.
  4: "c",  // Was there any orange juice? → No, there wasn't.
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_D() {
const listening=useExerciseListening("wb_unit7_page40_q2");

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const dotRefs      = useRef({});

const [results,setResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);const checkDisabled=showAns||LEFT_ITEMS.every(i=>results[i.id]===true);const lockedLeft=id=>showAns||results[id]===true,lockedRight=id=>showAns||Object.entries(matches).some(([lid,rid])=>rid===id&&results[lid]===true);
const cancel=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
useLayoutEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const focusSide=side=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const id=(side==='left'?LEFT_ITEMS:RIGHT_ITEMS).find(i=>!(side==='left'?lockedLeft:lockedRight)(i.id))?.id;endpointRefs.current[side+'-'+id]?.focus({preventScroll:true});});};
const connect=(lid,rid,keyboard)=>{if(lockedLeft(lid)||lockedRight(rid))return;const next={...matches};Object.keys(next).forEach(k=>{if(Number(k)===lid||next[k]===rid)delete next[k];});next[lid]=rid;setMatches(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([k,v])=>v===true||(Number(k)!==lid&&next[k]===matches[k]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left');};
const endpointKeys=(e,side,id)=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cancel();return;}if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();e.stopPropagation();const values=(side==='left'?LEFT_ITEMS:RIGHT_ITEMS).filter(i=>!(side==='left'?lockedLeft:lockedRight)(i.id)).map(i=>i.id),at=values.indexOf(id),next=values[(at+(e.key==='ArrowDown'?1:-1)+values.length)%values.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();if(!e.repeat)(side==='left'?handleLeftClick:handleRightClick)(id,true);}};
const getDotCenter=key=>{const e=dotRefs.current[key],root=containerRef.current;if(!e||!root)return null;const cr=root.getBoundingClientRect(),r=e.getBoundingClientRect();return{x:(r.left-cr.left+r.width/2)/(cr.width/root.clientWidth||1),y:(r.top-cr.top+r.height/2)/(cr.height/root.clientHeight||1)};};
  const isLocked=checkDisabled;

  // ── SVG lines ─────────────────────────────
  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const newLines = Object.entries(matches).map(([lid, rid]) => {
        const lEl = dotRefs.current[`left-${lid}`];
        const rEl = dotRefs.current[`right-${rid}`];
        if (!lEl || !rEl) return null;
        const lr = lEl.getBoundingClientRect();
        const rr = rEl.getBoundingClientRect();
        return {
          id:      `${lid}-${rid}`,
          leftId:  Number(lid),
          rightId: rid,
          x1: (lr.left+lr.width/2-cr.left)/(cr.width/containerRef.current.clientWidth||1),
          y1: (lr.top+lr.height/2-cr.top)/(cr.height/containerRef.current.clientHeight||1),
          x2: (rr.left+rr.width/2-cr.left)/(cr.width/containerRef.current.clientWidth||1),
          y2: (rr.top+rr.height/2-cr.top)/(cr.height/containerRef.current.clientHeight||1),
        };
      }).filter(Boolean);
      setLines(newLines);
    };
    let frame;const raf=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);};const observer=new ResizeObserver(raf);if(containerRef.current)observer.observe(containerRef.current);
    raf();
    window.addEventListener("resize", raf);
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("resize",raf);};
  }, [matches]);

  // ── handlers ──────────────────────────────
  const handleLeftClick=(id,keyboard=false)=>{listening.play("left-"+id,(({1:clipPage40D1,2:clipPage40D3,3:clipPage40D5,4:clipPage40D7}))[id]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence beginning selected. Choose its ending.");if(keyboard&&selectedLeft!==id)focusSide("right");};

  const handleRightClick=(id,keyboard=false)=>{listening.play("right-"+id,(({"a":clipPage40D2,"b":clipPage40D4,"c":clipPage40D6,"d":clipPage40D8}))[id]);if(lockedRight(id))return;if(selectedLeft!==null){connect(selectedLeft,id,keyboard);return;}setSelectedRight(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence ending selected. Choose its beginning.");if(keyboard&&selectedRight!==id)focusSide("left");};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(matches).length<LEFT_ITEMS.length){ValidationAlert.info("Please connect all items first.");return;}const next=Object.fromEntries(LEFT_ITEMS.map(i=>[i.id,matches[i.id]===CORRECT_MATCHES[i.id]])),score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();cancel();setResults({});setMatches({...CORRECT_MATCHES});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");};

  const handleReset=()=>{listening.stop();cancel();setMatches({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Connections cleared.");};

  // ── helpers ───────────────────────────────
  const isWrongLine=id=>!showAns&&results[id]===false;
  const isDotConnLeft  = (id)     => !!matches[id];
  const isDotConnRight = (id)     => Object.values(matches).includes(id);
  const isSelectedLeft = (id)     => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected || connected ? "#2096a6" : "#c0c0c0";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit7_WB_Unit7_Page40_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit7_WB_Unit7_Page40_Q2"] input:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page40_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page40_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit7_WB_Unit7_Page40_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlm-match {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            clamp(100px, 16vw, 200px)
            clamp(60px, 8vw, 120px)
            minmax(0, 1fr);
          align-items: stretch;
          width: 100%;
          row-gap: clamp(12px, 2vw, 24px);
          margin : 4% 0 ; 
        }

        .rlm-left {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          padding: 4px 8px 4px 0;
          cursor: pointer;
          border-radius: 8px;
          user-select: none;
          border: 2px solid transparent;
        }
        .rlm-left--selected {
          background: rgba(32,150,166,0.08);
          border: 2px solid #2096a6;
          border-radius: 8px;
        }
        .rlm-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
        }
        .rlm-question {
    font-size: clamp(14px, 1.7vw, 18px);
          color: #2b2b2b;
          line-height: 1.5;
              white-space: nowrap;
        }

        .rlm-img-dot {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          cursor: pointer;
        }
        .rlm-img {
          width: 40%;
          height: auto;
          flex-shrink: 0;
        }

        .rlm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.2s;
          cursor: pointer;
        }
        .rlm-dot--selected {
          box-shadow: 0 0 0 4px rgba(32,150,166,0.25);
        }

        .rlm-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          cursor: pointer;
          border-radius: 8px;
          user-select: none;
        }
        .rlm-answer {
   
          font-size: clamp(14px, 1.7vw, 18px);

          color: #2b2b2b;
          line-height: 1.5;
        }

        .rlm-badge {
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
          margin-left: 4px;
        }

        .rlm-buttons {
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
          gap: "clamp(14px, 2vw, 24px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader subTitle="Start with one item, then connect it to the word, picture, or sentence that matches before moving on." sectionLetter="D" title={<>Read, look, and match.</>} />

        {/* ── Matching area ── */}
        <div ref={containerRef} className="rlm-match">

          {/* SVG lines */}
          <svg aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none", overflow: "visible", zIndex: 1,
            }}
          >
            {(()=>{let lid=selectedLeft,rid=selectedRight;if(lid!==null&&preview?.side==="right")rid=preview.id;else if(rid!==null&&preview?.side==="left")lid=preview.id;else return null;if(lockedLeft(lid)||lockedRight(rid))return null;const a=getDotCenter("left-"+lid),b=getDotCenter("right-"+rid);if(!a||!b)return null;return <line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>;})()}{lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={showAns||results[line.leftId]===true?"#16a34a":isWrongLine(line.leftId)?WRONG_LINE_COLOR:LINE_COLOR}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* ── 4 rows ── */}
          {LEFT_ITEMS.map((lItem, idx) => {
            const rItem     = RIGHT_ITEMS[idx];
            const wrong     = isWrongLine(lItem.id);
            const selLeft   = isSelectedLeft(lItem.id);
            const connLeft  = isDotConnLeft(lItem.id);
            const connRight = isDotConnRight(rItem.id);

            return (
              // ✅ إصلاح: React.Fragment مع key بدل <> المجهولة
              <React.Fragment key={lItem.id}>

                {/* col 1: num + question */}
                <div data-listening={"left-"+lItem.id} role="button" data-keyboard-choice data-match-side="left" data-match-id={lItem.id} tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(lItem.id)?-1:0} ref={el=>{endpointRefs.current['left-'+lItem.id]=el;}} aria-label={lItem.text} aria-pressed={selectedLeft===lItem.id} aria-disabled={lockedLeft(lItem.id)} onKeyDown={e=>endpointKeys(e,'left',lItem.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:lItem.id})} onMouseEnter={()=>setPreview({side:'left',id:lItem.id})} onMouseLeave={()=>setPreview(null)}
                  className={`rlm-left ${selLeft ? "rlm-left--selected" : ""}`}
                  onClick={() => handleLeftClick(lItem.id)}
                  style={{...({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedLeft(lItem.id)?"inset 0 0 0 2px #16a34a":selectedLeft===lItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===lItem.id?"#dbeafe":undefined,cursor:lockedLeft(lItem.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="left-"+lItem.id?"#dbeafe":({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedLeft(lItem.id)?"inset 0 0 0 2px #16a34a":selectedLeft===lItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===lItem.id?"#dbeafe":undefined,cursor:lockedLeft(lItem.id)?"default":"pointer"}).background,boxShadow:[({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedLeft(lItem.id)?"inset 0 0 0 2px #16a34a":selectedLeft===lItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===lItem.id?"#dbeafe":undefined,cursor:lockedLeft(lItem.id)?"default":"pointer"}).boxShadow,listening.activeId==="left-"+lItem.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}}
                >
                  <span className="rlm-num">{lItem.id}</span>
                  {/* ✅ إصلاح: lItem.text بدل lItem.question */}
                  <span className="rlm-question">{lItem.text}</span>
                  {wrong && <span className="rlm-badge">✕</span>}
                {listening.activeId==="left-"+lItem.id&&renderExerciseSpeaker()}</div>

                {/* col 2: image + left dot */}
                <div
                  className="rlm-img-dot"
                  onClick={() => handleLeftClick(lItem.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  {/* ✅ إصلاح: lItem.src بدل lItem.imageSrc */}
                  <img src={lItem.src} alt={["A bowl of apples.","A bunch of grapes.","A steak on a plate.","A carton labelled milk."][lItem.id-1]} className="rlm-img" />
                  <div
                    ref={(el) => (dotRefs.current[`left-${lItem.id}`] = el)}
                    className={`rlm-dot ${selLeft ? "rlm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connLeft, selLeft) }}
                  />
                </div>

                {/* col 3: right dot */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "4px",
                    cursor: isLocked || selectedLeft === null ? "default" : "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => handleRightClick(rItem.id)}
                >
                  <div
                    ref={(el) => (dotRefs.current[`right-${rItem.id}`] = el)}
                    className="rlm-dot"
                    style={{ backgroundColor: dotColor(connRight, false) }}
                  />
                </div>

                {/* col 4: answer */}
                <div data-listening={"right-"+rItem.id} role="button" data-keyboard-choice data-match-side="right" data-match-id={rItem.id} tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(rItem.id)?-1:0} ref={el=>{endpointRefs.current['right-'+rItem.id]=el;}} aria-label={rItem.text} aria-pressed={selectedRight===rItem.id} aria-disabled={lockedRight(rItem.id)} onKeyDown={e=>endpointKeys(e,'right',rItem.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:rItem.id})} onMouseEnter={()=>setPreview({side:'right',id:rItem.id})} onMouseLeave={()=>setPreview(null)}
                  className="rlm-right"
                  onClick={() => handleRightClick(rItem.id)}
                  style={{...({...({ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedRight(rItem.id)?"inset 0 0 0 2px #16a34a":selectedRight===rItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===rItem.id?"#dbeafe":undefined,cursor:lockedRight(rItem.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="right-"+rItem.id?"#dbeafe":({...({ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedRight(rItem.id)?"inset 0 0 0 2px #16a34a":selectedRight===rItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===rItem.id?"#dbeafe":undefined,cursor:lockedRight(rItem.id)?"default":"pointer"}).background,boxShadow:[({...({ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedRight(rItem.id)?"inset 0 0 0 2px #16a34a":selectedRight===rItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===rItem.id?"#dbeafe":undefined,cursor:lockedRight(rItem.id)?"default":"pointer"}).boxShadow,listening.activeId==="right-"+rItem.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}}
                >
                  {/* ✅ إصلاح: rItem.text بدل rItem.label */}
                  <span className="rlm-answer">{rItem.text}</span>
                {listening.activeId==="right-"+rItem.id&&renderExerciseSpeaker()}</div>

              </React.Fragment>
            );
          })}

        </div>

        {/* ── Buttons ── */}
        <div className="rlm-buttons">
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