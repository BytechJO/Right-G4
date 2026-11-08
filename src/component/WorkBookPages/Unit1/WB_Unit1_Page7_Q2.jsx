import missingNew1 from "../../../assets/audio/G4-Missing/Kevin will.mp3";
import missingNew2 from "../../../assets/audio/G4-Missing/Rosie will.mp3";
import missingNew3 from "../../../assets/audio/G4-Missing/go to the lake..mp3";
import missingNew4 from "../../../assets/audio/G4-Missing/ride a horse..mp3";
import missingNew5 from "../../../assets/audio/G4-Missing/eat at a restaurant..mp3";
import clipPage7J13 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_013_Jake_will.mp3";
import clipPage7J12 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_012_shop_at_the_mall.mp3";
import clipPage7J11 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_011_Lilly_will.mp3";
import clipPage7J10 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_010_watch_a_movie.mp3";
import clipPage7J9 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_009_Hansel_will.mp3";
import clipPage7J8 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_008_go_to_the_playground.mp3";
import clipPage7J7 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_007_Natalie_will.mp3";
import clipPage7J6 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_006_Lilly.mp3";
import clipPage7J5 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_005_Kevin.mp3";
import clipPage7J4 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_004_Hansel.mp3";
import clipPage7J3 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_003_Natalie.mp3";
import clipPage7J2 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_002_Rosie.mp3";
import clipPage7J1 from "../../../assets/audio/WorkBook/Unit 1/Page 7 - J/Item_001_Jake.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import tableImage from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/Asset 9.svg";
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



const LINE_COLOR       = "#2096a6";
const WRONG_LINE_COLOR = "#ef4444";
const SENTENCE_COLOR   = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const LEFT_ITEMS = [
  { id: 1, label: "Natalie will" },
  { id: 2, label: "Hansel will"  },
  { id: 3, label: "Lilly will"   },
  { id: 4, label: "Jake will"    },
  { id: 5, label: "Kevin will"   },
  { id: 6, label: "Rosie will"   },
];

const RIGHT_ITEMS = [
  { id: 1, label: "go to the playground." },
  { id: 2, label: "watch a movie."        },
  { id: 3, label: "shop at the mall."     },
  { id: 4, label: "go to the lake."       },
  { id: 5, label: "ride a horse."         },
  { id: 6, label: "eat at a restaurant."  },
];

const CORRECT_MATCHES = {
  1: 4,
  2: 6,
  3: 3,
  4: 5,
  5: 1,
  6: 2,
};

export default function WB_LookReadMatch_QJ() {
const listening=useExerciseListening("wb_unit1_page7_q2");

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
          id: `${lid}-${rid}`,
          leftId: Number(lid),
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

  const handleLeftClick=(id,keyboard=false)=>{listening.play("left-"+id,({1:clipPage7J7,2:clipPage7J9,3:clipPage7J11,4:clipPage7J13,5:missingNew1,6:missingNew2})[id]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence beginning selected. Choose its ending.");if(keyboard&&selectedLeft!==id)focusSide("right");};

  const handleRightClick=(id,keyboard=false)=>{listening.play("right-"+id,({1:clipPage7J8,2:clipPage7J10,3:clipPage7J12,4:missingNew3,5:missingNew4,6:missingNew5})[id]);if(lockedRight(id))return;if(selectedLeft!==null){connect(selectedLeft,id,keyboard);return;}setSelectedRight(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence ending selected. Choose its beginning.");if(keyboard&&selectedRight!==id)focusSide("left");};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(matches).length<LEFT_ITEMS.length){ValidationAlert.info("Please connect all items first.");return;}const next=Object.fromEntries(LEFT_ITEMS.map(i=>[i.id,matches[i.id]===CORRECT_MATCHES[i.id]])),score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();cancel();setResults({});setMatches({...CORRECT_MATCHES});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");};

  const handleReset=()=>{listening.stop();cancel();setMatches({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Connections cleared.");};

  const isWrongLine=id=>!showAns&&results[id]===false;

  const isDotConnectedLeft  = (id) => !!matches[id];
  const isDotConnectedRight = (id) => Object.values(matches).includes(id);
  const isSelectedLeft      = (id) => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected ? "#2096a6" : connected ? "#2096a6" : "#c0c0c0";

  return (
    <div data-adapt-scope="Unit1_WB_Unit1_Page7_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] input:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="Unit1_WB_Unit1_Page7_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .lrm-table-img-wrapper {
          width: 100%;
          overflow: hidden;
          margin-top: -2%;
          margin-bottom: -2%;
          line-height: 0;
        }
        .lrm-table-img {
          width: 82%;
          display: block;
         height: auto ;
        }

        .lrm-match {
          position: relative;
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        /* ── اليسار: يأخذ بقدر محتواه فقط ── */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
        }

        /* ── اليمين: يُدفع لأقصى اليمين ── */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
          margin-left: auto;
          min-width: 45%;
        }

        .lrm-left-item {
          display: flex;
          align-items: center;
          min-height: clamp(52px, 7vw, 76px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0;
          position: relative;
          gap: clamp(6px, 1vw, 10px);
          justify-content: space-between;
        }
        .lrm-left-item--selected {
          background: rgba(32,150,166,0.08);
          outline: 2px solid #2096a6;
          border-radius: 8px;
        }

        .lrm-right-item {
          display: flex;
          align-items: center;
          min-height: clamp(52px, 7vw, 76px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0;
          gap: clamp(6px, 1vw, 10px);
        }
        .lrm-right-item--connected {
          background: rgba(32,150,166,0.06);
        }

        .lrm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(14px, 1.8vw, 22px);
          flex-shrink: 0;
        }

        .lrm-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        .lrm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .lrm-dot--selected {
          box-shadow: 0 0 0 4px rgba(32,150,166,0.2);
        }

        .lrm-badge {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: clamp(18px, 2.5vw, 28px);
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrm-buttons {
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
        <ExerciseHeader subTitle="Start with one item, then connect it to the word, picture, or sentence that matches before moving on." sectionLetter="J" title={<>Look, read, and match.</>} />

        {/* ── صورة الجدول ── */}
        <div className="lrm-table-img-wrapper">
          <div className="lrm-table-img" style={{position:"relative"}}><img src={tableImage} alt={"Jake with a horse; Rosie watching a film; Natalie at a lake; Hansel at a restaurant; Kevin at a playground; Lilly at a mall."} style={{display:"block",width:"100%",height:"auto"}}/>{([{label:"Jake",src:clipPage7J1,x:6,y:8,w:17,h:19},{label:"Rosie",src:clipPage7J2,x:55,y:8,w:17,h:19},{label:"Natalie",src:clipPage7J3,x:6,y:42,w:17,h:19},{label:"Hansel",src:clipPage7J4,x:55,y:42,w:17,h:19},{label:"Kevin",src:clipPage7J5,x:6,y:76,w:17,h:19},{label:"Lilly",src:clipPage7J6,x:55,y:76,w:17,h:19}]).map(region=><button key={region.label} type="button" {...activationKeys} data-listening={"bank-"+region.label} aria-label={"Listen: "+region.label} onClick={()=>listening.play("bank-"+region.label,region.src)} style={{position:"absolute",left:region.x+"%",top:region.y+"%",width:region.w+"%",height:region.h+"%",padding:0,border:0,borderRadius:6,cursor:"pointer",background:listening.activeId==="bank-"+region.label?"rgba(219,234,254,.35)":"transparent",boxShadow:listening.activeId==="bank-"+region.label?"0 0 0 3px #2563eb":undefined}}>{listening.activeId==="bank-"+region.label&&renderExerciseSpeaker()}</button>)}</div>
        </div>

        {/* ── Matching ── */}
        <div ref={containerRef} className="lrm-match">

          {/* SVG lines */}
          <svg aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none", overflow: "visible", zIndex: 1,
            }}
          >
            {(()=>{let lid=selectedLeft,rid=selectedRight;if(lid!==null&&preview?.side==="right")rid=preview.id;else if(rid!==null&&preview?.side==="left")lid=preview.id;else return null;if(lockedLeft(lid)||lockedRight(rid))return null;const a=getDotCenter("left-"+lid),b=getDotCenter("right-"+rid);if(!a||!b)return null;return <path data-match-preview d={`M ${a.x} ${a.y} Q ${(a.x+b.x)/2} ${(a.y+b.y)/2-Math.abs(a.y-b.y)*.3} ${b.x} ${b.y}`} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4" fill="none"/>;})()}{lines.map((line) => {
              const mx = (line.x1 + line.x2) / 2;
              const my = (line.y1 + line.y2) / 2 - Math.abs(line.y2 - line.y1) * 0.3;
              const d  = `M ${line.x1} ${line.y1} Q ${mx} ${my} ${line.x2} ${line.y2}`;
              return (
                <path
                  key={line.id}
                  d={d}
                  stroke={showAns||results[line.leftId]===true?"#16a34a":isWrongLine(line.leftId)?WRONG_LINE_COLOR:LINE_COLOR}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* col 1: Left */}
          <div className="lrm-left-col">
            {LEFT_ITEMS.map((item) => {
              const wrong     = isWrongLine(item.id);
              const selected  = isSelectedLeft(item.id);
              const connected = isDotConnectedLeft(item.id);
              return (
                <div data-listening={"left-"+item.id} role="button" data-keyboard-choice data-match-side="left" data-match-id={item.id} tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(item.id)?-1:0} ref={el=>{endpointRefs.current['left-'+item.id]=el;}} aria-label={item.label} aria-pressed={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={e=>endpointKeys(e,'left',item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:item.id})} onMouseEnter={()=>setPreview({side:'left',id:item.id})} onMouseLeave={()=>setPreview(null)}
                  key={item.id}
                  className={`lrm-left-item ${selected ? "lrm-left-item--selected" : ""}`}
                  onClick={() => handleLeftClick(item.id)}
                  style={(base=>({...base,position:"relative",boxShadow:listening.activeId===("left-"+item.id)?"0 0 0 3px #2563eb":base.boxShadow}))({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":undefined})}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px,1vw,10px)" }}>
                    <span className="lrm-num">{item.id}</span>
                    <span className="lrm-label">{item.label}</span>
                  </div>
                  {wrong && <div className="lrm-badge">✕</div>}
                  <div
                    ref={(el) => (dotRefs.current[`left-${item.id}`] = el)}
                    className={`lrm-dot ${selected ? "lrm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connected, selected) }}
                  />
                {listening.activeId===("left-"+item.id)&&renderExerciseSpeaker()}</div>
              );
            })}
          </div>

          {/* col 2: Right — مدفوع لأقصى اليمين */}
          <div className="lrm-right-col">
            {RIGHT_ITEMS.map((item) => {
              const connected = isDotConnectedRight(item.id);
              return (
                <div data-listening={"right-"+item.id} role="button" data-keyboard-choice data-match-side="right" data-match-id={item.id} tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(item.id)?-1:0} ref={el=>{endpointRefs.current['right-'+item.id]=el;}} aria-label={item.label} aria-pressed={selectedRight===item.id} aria-disabled={lockedRight(item.id)} onKeyDown={e=>endpointKeys(e,'right',item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:item.id})} onMouseEnter={()=>setPreview({side:'right',id:item.id})} onMouseLeave={()=>setPreview(null)}
                  key={item.id}
                  className={`lrm-right-item ${connected ? "lrm-right-item--connected" : ""}`}
                  onClick={() => handleRightClick(item.id)}
                  style={(base=>({...base,position:"relative",boxShadow:listening.activeId===("right-"+item.id)?"0 0 0 3px #2563eb":base.boxShadow}))({...({ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedRight(item.id)?"inset 0 0 0 2px #16a34a":selectedRight===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.id?"#dbeafe":undefined})}
                >
                  <div
                    ref={(el) => (dotRefs.current[`right-${item.id}`] = el)}
                    className="lrm-dot"
                    style={{ backgroundColor: dotColor(connected, false) }}
                  />
                  <span className="lrm-label">{item.label}</span>
                {listening.activeId===("right-"+item.id)&&renderExerciseSpeaker()}</div>
              );
            })}
          </div>

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