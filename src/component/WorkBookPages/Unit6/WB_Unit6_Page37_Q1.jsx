import clipPage37I12 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_012_go_to_sleep_early.mp3";
import clipPage37I11 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_011_Jack_shouldn't.mp3";
import clipPage37I10 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_010_help_her_mom.mp3";
import clipPage37I9 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_009_Tom_shouldn't.mp3";
import clipPage37I8 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_008_pick_up_her_toys.mp3";
import clipPage37I7 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_007_Harley_should.mp3";
import clipPage37I6 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_006_be_late.mp3";
import clipPage37I5 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_005_Stella_should.mp3";
import clipPage37I4 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_004_get_on_the_bus.mp3";
import clipPage37I3 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_003_Sarah_should.mp3";
import clipPage37I2 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_002_kick_rocks.mp3";
import clipPage37I1 from "../../../assets/audio/WorkBook/Unit 6/Page 37 - I/Item_001_Helen_should.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgHelen  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 27.svg";
import imgSarah  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 40.svg";
import imgStella from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 30.svg";
import imgHarley from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 28.svg";
import imgTom    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 31.svg";
import imgJack   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 37/SVG/Asset 29.svg";
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
const DOT_DEFAULT_COLOR    = "#2096a6";
const DOT_SELECTED_COLOR   = "#2096a6";
const LINE_DEFAULT_COLOR   = "#2096a6";
const LINE_WRONG_COLOR     = "#2096a6";
const LINE_CORRECT_COLOR   = "#2096a6";
const SENTENCE_COLOR       = "#2b2b2b";
const ANSWER_COLOR         = "#2b2b2b";
const NUMBER_COLOR         = "#2b2b2b";
const WRONG_BADGE_BG       = "#ef4444";
const WRONG_BADGE_TEXT     = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "Helen should"    },
  { id: 2, text: "Sarah should"    },
  { id: 3, text: "Stella should"   },
  { id: 4, text: "Harley should"   },
  { id: 5, text: "Tom shouldn't"   },
  { id: 6, text: "Jack shouldn't"  },
];

const RIGHT_ITEMS = [
  { id: "a", text: "kick rocks."        },
  { id: "b", text: "get on the bus."    },
  { id: "c", text: "be late."           },
  { id: "d", text: "pick up her toys."  },
  { id: "e", text: "help her mom."      },
  { id: "f", text: "go to sleep early." },
];

// الإجابات الصحيحة: left id → right id
const CORRECT_ANSWERS = {
  1: "b", 
  2: "d",
  3: "e", 
  4: "f", 
  5: "c", 
  6: "a", 
};
// الصور مع أسمائها
const IMAGES = [
  { name: "Helen",  src: imgHelen  },
  { name: "Sarah",  src: imgSarah  },
  { name: "Stella", src: imgStella },
  { name: "Harley", src: imgHarley },
  { name: "Tom",    src: imgTom    },
  { name: "Jack",   src: imgJack   },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QI() {
const listening=useExerciseListening("wb_unit6_page37_q1");

  const [matches,     setMatches]     = useState({}); // { leftId: rightId }
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  
  
  const svgRef    = useRef(null);
  const containerRef = useRef(null);

  const [lines, setLines] = useState([]);

  // إعادة رسم الخطوط عند تغيير matches
  

  

  

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
          rightId: Number(rid),
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
const dotRefs=useRef({});const CORRECT_MATCHES=CORRECT_ANSWERS;
const [results,setResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);const checkDisabled=showAns||LEFT_ITEMS.every(i=>results[i.id]===true);const lockedLeft=id=>showAns||results[id]===true,lockedRight=id=>showAns||Object.entries(matches).some(([lid,rid])=>rid===id&&results[lid]===true);
const cancel=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
useLayoutEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const focusSide=side=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const id=(side==='left'?LEFT_ITEMS:RIGHT_ITEMS).find(i=>!(side==='left'?lockedLeft:lockedRight)(i.id))?.id;endpointRefs.current[side+'-'+id]?.focus({preventScroll:true});});};
const connect=(lid,rid,keyboard)=>{if(lockedLeft(lid)||lockedRight(rid))return;const next={...matches};Object.keys(next).forEach(k=>{if(Number(k)===lid||next[k]===rid)delete next[k];});next[lid]=rid;setMatches(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([k,v])=>v===true||(Number(k)!==lid&&next[k]===matches[k]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left');};
const endpointKeys=(e,side,id)=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cancel();return;}if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();e.stopPropagation();const values=(side==='left'?LEFT_ITEMS:RIGHT_ITEMS).filter(i=>!(side==='left'?lockedLeft:lockedRight)(i.id)).map(i=>i.id),at=values.indexOf(id),next=values[(at+(e.key==='ArrowDown'?1:-1)+values.length)%values.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();if(!e.repeat)(side==='left'?handleLeftClick:handleRightClick)(id,true);}};
const getDotCenter=key=>{const e=dotRefs.current[key],root=containerRef.current;if(!e||!root)return null;const cr=root.getBoundingClientRect(),r=e.getBoundingClientRect();return{x:(r.left-cr.left+r.width/2)/(cr.width/root.clientWidth||1),y:(r.top-cr.top+r.height/2)/(cr.height/root.clientHeight||1)};};
  

  const handleLeftClick=(id,keyboard=false)=>{listening.play("left-"+id,(({1:clipPage37I1,2:clipPage37I3,3:clipPage37I5,4:clipPage37I7,5:clipPage37I9,6:clipPage37I11}))[id]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence beginning selected. Choose its ending.");if(keyboard&&selectedLeft!==id)focusSide("right");};

  const handleRightClick=(id,keyboard=false)=>{listening.play("right-"+id,(({"a":clipPage37I2,"b":clipPage37I4,"c":clipPage37I6,"d":clipPage37I8,"e":clipPage37I10,"f":clipPage37I12}))[id]);if(lockedRight(id))return;if(selectedLeft!==null){connect(selectedLeft,id,keyboard);return;}setSelectedRight(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence ending selected. Choose its beginning.");if(keyboard&&selectedRight!==id)focusSide("left");};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(matches).length<LEFT_ITEMS.length){ValidationAlert.info("Please connect all items first.");return;}const next=Object.fromEntries(LEFT_ITEMS.map(i=>[i.id,matches[i.id]===CORRECT_MATCHES[i.id]])),score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();cancel();setResults({});setMatches({...CORRECT_MATCHES});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");};

  const handleReset=()=>{listening.stop();cancel();setMatches({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Connections cleared.");};

  const getDotColor=(side,id)=>{const lid=side==="left"?id:Number(Object.keys(matches).find(lid=>matches[lid]===id));if(showAns||results[lid]===true)return "#16a34a";if(results[lid]===false)return LINE_WRONG_COLOR;if((side==="left"?selectedLeft:selectedRight)===id)return DOT_SELECTED_COLOR;return DOT_DEFAULT_COLOR;};

  return (
    <div data-adapt-scope="Unit6_WB_Unit6_Page37_Q1" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit6_WB_Unit6_Page37_Q1"] input:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page37_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page37_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page37_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Matching area ── */
        .rlm2-container {
          position: relative;
          width: 100%;
        }

        .rlm2-rows {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          row-gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
        }

        /* Left sentence */
        .rlm2-left {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          cursor: pointer;
          user-select: none;
        }

        .rlm2-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(16px, 1.8vw, 22px);
          flex-shrink: 0;
        }

        .rlm2-text {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        .rlm2-dot {
          width: clamp(9px, 1.1vw, 13px);
          height: clamp(9px, 1.1vw, 13px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .rlm2-dot:hover { transform: scale(1.3); }

        /* Spacer for SVG */
        .rlm2-spacer {
          width: clamp(60px, 8vw, 120px);
        }

        /* Right answer */
        .rlm2-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          cursor: pointer;
          user-select: none;
          justify-content: flex-start;
        }

        /* SVG overlay */
        .rlm2-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        /* Images grid */
        .rlm2-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(10px, 1.6vw, 20px);
          margin-top: clamp(16px, 2.4vw, 28px);
        }

        .rlm2-img-card {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .rlm2-img {
          width: clamp(100px, 14vw, 180px);
          height: clamp(75px, 10vw, 130px);
          display: block;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #2096a6;
        }

        .rlm2-img-name {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
        }


        /* ✕ badge on dot */
        .rlm2-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rlm2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlm2-spacer { width: 40px; }
          .rlm2-images { grid-template-columns: 1fr; }
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
        <ExerciseHeader subTitle="Start with one item, then connect it to the word, picture, or sentence that matches before moving on." sectionLetter="I" title={<>Read, look, and match.</>} />

        {/* ── Matching rows ── */}
        <div className="rlm2-container" ref={containerRef}>
          <svg aria-hidden="true" ref={svgRef} className="rlm2-svg">
            {(()=>{let lid=selectedLeft,rid=selectedRight;if(lid!==null&&preview?.side==="right")rid=preview.id;else if(rid!==null&&preview?.side==="left")lid=preview.id;else return null;if(lockedLeft(lid)||lockedRight(rid))return null;const a=getDotCenter("left-"+lid),b=getDotCenter("right-"+rid);if(!a||!b)return null;return <line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>;})()}{lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={showAns||results[line.leftId]===true?"#16a34a":results[line.leftId]===false?LINE_WRONG_COLOR:LINE_DEFAULT_COLOR}
                strokeWidth="2"
                strokeDasharray="5,4"
              />
            ))}
          </svg>

          <div className="rlm2-rows">
            {LEFT_ITEMS.map((left, idx) => {
              const right = RIGHT_ITEMS[idx];
              const dotColorL = getDotColor("left", left.id);
              const dotColorR = DOT_DEFAULT_COLOR;
              const isSelected = selectedLeft === left.id;
              const isWrongMatch = !showAns && results[left.id]===false;

              return (
                <React.Fragment key={left.id}>
{/* Left */}
<div data-listening={"left-"+left.id} style={{...({...({}),borderRadius:8,boxShadow:lockedLeft(left.id)?"inset 0 0 0 2px #16a34a":selectedLeft===left.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===left.id?"#dbeafe":undefined,cursor:lockedLeft(left.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="left-"+left.id?"#dbeafe":({...({}),borderRadius:8,boxShadow:lockedLeft(left.id)?"inset 0 0 0 2px #16a34a":selectedLeft===left.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===left.id?"#dbeafe":undefined,cursor:lockedLeft(left.id)?"default":"pointer"}).background,boxShadow:[({...({}),borderRadius:8,boxShadow:lockedLeft(left.id)?"inset 0 0 0 2px #16a34a":selectedLeft===left.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===left.id?"#dbeafe":undefined,cursor:lockedLeft(left.id)?"default":"pointer"}).boxShadow,listening.activeId==="left-"+left.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}} role="button" data-keyboard-choice data-match-side="left" data-match-id={left.id} tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(left.id)?-1:0} ref={el=>{endpointRefs.current['left-'+left.id]=el;}} aria-label={left.text} aria-pressed={selectedLeft===left.id} aria-disabled={lockedLeft(left.id)} onKeyDown={e=>endpointKeys(e,'left',left.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:left.id})} onMouseEnter={()=>setPreview({side:'left',id:left.id})} onMouseLeave={()=>setPreview(null)}
  className={`rlm2-left${isSelected ? " rlm2-left--selected" : ""}`}
  onClick={() => handleLeftClick(left.id)}
>
  <span className="rlm2-num">{left.id}</span>
  <span className="rlm2-text">{left.text}</span>
  <div style={{ position: "relative", flexShrink: 0, marginLeft: "auto" , marginRight: "40%" }}>
    <div
      ref={(el) => (dotRefs.current[`left-${left.id}`] = el)}
      className="rlm2-dot"
      style={{ background: dotColorL }}
    />
    {isWrongMatch && <div className="rlm2-badge">✕</div>}
  </div>
{listening.activeId==="left-"+left.id&&renderExerciseSpeaker()}</div>

                  {/* Spacer */}
                  <div className="rlm2-spacer" />

                  {/* Right */}
                  <div data-listening={"right-"+right.id} style={{...({...({}),borderRadius:8,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="right-"+right.id?"#dbeafe":({...({}),borderRadius:8,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}).background,boxShadow:[({...({}),borderRadius:8,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}).boxShadow,listening.activeId==="right-"+right.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}} role="button" data-keyboard-choice data-match-side="right" data-match-id={right.id} tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(right.id)?-1:0} ref={el=>{endpointRefs.current['right-'+right.id]=el;}} aria-label={right.text} aria-pressed={selectedRight===right.id} aria-disabled={lockedRight(right.id)} onKeyDown={e=>endpointKeys(e,'right',right.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:right.id})} onMouseEnter={()=>setPreview({side:'right',id:right.id})} onMouseLeave={()=>setPreview(null)} className="rlm2-right" onClick={() => handleRightClick(right.id)}>
                    <div
                      ref={(el) => (dotRefs.current[`right-${right.id}`] = el)}
                      className="rlm2-dot"
                      style={{ background: dotColorR }}
                    />
                    <span className="rlm2-text">{right.text}</span>
                  {listening.activeId==="right-"+right.id&&renderExerciseSpeaker()}</div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Images ── */}
        <div className="rlm2-images">
          {IMAGES.map((img) => (
            <div key={img.name} className="rlm2-img-card">
              <img src={img.src} alt={({Helen:"Children boarding a school bus.",Sarah:"A child asleep in bed.",Stella:"A boy kicking a stone.",Harley:"A girl helping an adult wash dishes.",Tom:"A boy falling on the steps outside a house.",Jack:"A girl playing with toys on the floor."})[img.name]} className="rlm2-img" />
              <span className="rlm2-img-name">{img.name}</span>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlm2-buttons">
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