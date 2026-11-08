import clipPage16D7 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_007_Did_he_have_a_net.mp3";
import clipPage16D6 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_006_Yes,_she_did.mp3";
import clipPage16D5 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_005_Did_she_have_a_laptop.mp3";
import clipPage16D4 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_004_No,_he_didn't.mp3";
import clipPage16D3 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_003_Did_he_have_a_skateboard.mp3";
import clipPage16D2 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_002_Yes,_he_did.mp3";
import clipPage16D1 from "../../../assets/audio/WorkBook/Unit 3/Page 16 - D/Item_001_Did_she_have_a_cat.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 19.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 39.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 16/SVG/Asset 22.svg";
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
  { id: 1, question: "Did she have a cat?",        imageSrc: img1 },
  { id: 2, question: "Did he have a skateboard?",  imageSrc: img2 },
  { id: 3, question: "Did she have a laptop?",     imageSrc: img3 },
  { id: 4, question: "Did he have a net?",         imageSrc: img4 },
];

const RIGHT_ITEMS = [
  { id: 1, label: "Yes, he did."    },
  { id: 2, label: "No, he didn't."  },
  { id: 3, label: "Yes, she did."   },
  { id: 4, label: "No, she didn't." },
];

// leftId → rightId
const CORRECT_MATCHES = {
  1: 3,
  2: 1,
  3: 4,
  4: 2,
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_D() {
const listening=useExerciseListening("wb_unit3_page16_q3");

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

  // ── handlers ──────────────────────────────
  const handleLeftClick=(id,keyboard=false)=>{listening.play("left-"+id,({1:clipPage16D1,2:clipPage16D3,3:clipPage16D5,4:clipPage16D7})[id]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence beginning selected. Choose its ending.");if(keyboard&&selectedLeft!==id)focusSide("right");};

  const handleRightClick=(id,keyboard=false)=>{listening.play("right-"+id,({1:clipPage16D2,2:clipPage16D4,3:clipPage16D6})[id]);if(lockedRight(id))return;if(selectedLeft!==null){connect(selectedLeft,id,keyboard);return;}setSelectedRight(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence ending selected. Choose its beginning.");if(keyboard&&selectedRight!==id)focusSide("left");};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(Object.keys(matches).length<LEFT_ITEMS.length){ValidationAlert.info("Please connect all items first.");return;}const next=Object.fromEntries(LEFT_ITEMS.map(i=>[i.id,matches[i.id]===CORRECT_MATCHES[i.id]])),score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShowAnswer=()=>{listening.stop();cancel();setResults({});setMatches({...CORRECT_MATCHES});setShowResults(false);setShowAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");};

  const handleReset=()=>{listening.stop();cancel();setMatches({});setResults({});setShowResults(false);setShowAns(false);setAnnouncement("Connections cleared.");};

  // ── helpers ───────────────────────────────
  const isWrongLine=id=>!showAns&&results[id]===false;
  const isDotConnLeft   = (id)     => !!matches[id];
  const isDotConnRight  = (id)     => Object.values(matches).includes(id);
  const isSelectedLeft  = (id)     => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected || connected ? "#2096a6" : "#c0c0c0";

  // ── render ────────────────────────────────
  return (
    <div data-adapt-scope="Unit3_WB_Unit3_Page16_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit3_WB_Unit3_Page16_Q3"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page16_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlm-match {
          position: relative;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            clamp(100px, 10vw, 200px)
            clamp(120px, 10vw, 220px)
            minmax(0, 1fr);
          align-items: stretch;
          width: 100%;
          row-gap: clamp(12px, 2vw, 24px);
        }

        .rlm-left {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 6px);
          cursor: pointer;
          border-radius: 8px;
          user-select: none;
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
          font-size: clamp(18px, 1.7vw, 18px);
          color: #2b2b2b;
              white-space: nowrap;
        }

        .rlm-img-dot {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          cursor: pointer;
          margin-left : 10%;
        }
        .rlm-img {
          width: clamp(80px, 12vw, 160px);
          height: clamp(60px, 9vw, 120px);
          border-radius: 10px;
          flex-shrink: 0;
                    margin-right : 5%;

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
          padding: 4px 0 4px 8px;
          user-select: none;
        }
        .rlm-answer {
          font-size: clamp(18px, 1.7vw, 18px);
          color: #2b2b2b;
          line-height: 1.4;
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
              <>
                {/* col 1: num + question */}
                <div data-listening={"left-"+lItem.id} role="button" data-keyboard-choice data-match-side="left" data-match-id={lItem.id} tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(lItem.id)?-1:0} ref={el=>{endpointRefs.current['left-'+lItem.id]=el;}} aria-label={lItem.question} aria-pressed={selectedLeft===lItem.id} aria-disabled={lockedLeft(lItem.id)} onKeyDown={e=>endpointKeys(e,'left',lItem.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:lItem.id})} onMouseEnter={()=>setPreview({side:'left',id:lItem.id})} onMouseLeave={()=>setPreview(null)}
                  key={`left-${lItem.id}`}
                  className={`rlm-left ${selLeft ? "rlm-left--selected" : ""}`}
                  onClick={() => handleLeftClick(lItem.id)}
                  style={(base=>({...base,position:"relative",background:listening.activeId==="left-"+lItem.id?"#dbeafe":base.background,boxShadow:[base.boxShadow,listening.activeId==="left-"+lItem.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}))({...({ cursor: isLocked ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedLeft(lItem.id)?"inset 0 0 0 2px #16a34a":selectedLeft===lItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===lItem.id?"#dbeafe":undefined})}
                >
                  <span className="rlm-num">{lItem.id}</span>
                  <span className="rlm-question">{lItem.question}</span>
                  {wrong && <span className="rlm-badge">✕</span>}
                {listening.activeId==="left-"+lItem.id&&renderExerciseSpeaker()}</div>

                {/* col 2: image + left dot */}
                <div
                  key={`img-${lItem.id}`}
                  className="rlm-img-dot"
                  onClick={() => handleLeftClick(lItem.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <img src={lItem.imageSrc} alt={["A girl holding a cat.","A boy riding a skateboard.","A girl painting a picture.","A boy holding a toy robot."][lItem.id-1]} className="rlm-img" />
                  <div
                    ref={(el) => (dotRefs.current[`left-${lItem.id}`] = el)}
                    className={`rlm-dot ${selLeft ? "rlm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connLeft, selLeft) }}
                  />
                </div>

                {/* col 3: right dot */}
                <div
                  key={`rdot-${rItem.id}`}
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
                <div data-listening={"right-"+rItem.id} role="button" data-keyboard-choice data-match-side="right" data-match-id={rItem.id} tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(rItem.id)?-1:0} ref={el=>{endpointRefs.current['right-'+rItem.id]=el;}} aria-label={rItem.label} aria-pressed={selectedRight===rItem.id} aria-disabled={lockedRight(rItem.id)} onKeyDown={e=>endpointKeys(e,'right',rItem.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:rItem.id})} onMouseEnter={()=>setPreview({side:'right',id:rItem.id})} onMouseLeave={()=>setPreview(null)}
                  key={`right-${rItem.id}`}
                  className="rlm-right"
                  onClick={() => handleRightClick(rItem.id)}
                  style={(base=>({...base,position:"relative",background:listening.activeId==="right-"+rItem.id?"#dbeafe":base.background,boxShadow:[base.boxShadow,listening.activeId==="right-"+rItem.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}))({...({ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }),borderRadius:8,boxShadow:lockedRight(rItem.id)?"inset 0 0 0 2px #16a34a":selectedRight===rItem.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===rItem.id?"#dbeafe":undefined})}
                >
                  <span className="rlm-answer">{rItem.label}</span>
                {listening.activeId==="right-"+rItem.id&&renderExerciseSpeaker()}</div>
              </>
            );
          })}

        </div>

        {/* ── Buttons ── */}
        <div className="rlm-buttons" style={{zIndex : "1000"}}>
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