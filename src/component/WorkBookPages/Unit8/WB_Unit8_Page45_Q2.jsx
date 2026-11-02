import clipPage45B11 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_011_with_his_friends.mp3";
import clipPage45B10 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_010_Ed_played.mp3";
import clipPage45B9 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_009_Spain_last_month.mp3";
import clipPage45B8 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_008_We.mp3";
import clipPage45B7 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_007_Those_cars_were_driving_so_fast_in_the.mp3";
import clipPage45B6 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_006_was_filled_with_books.mp3";
import clipPage45B5 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_005_The.mp3";
import clipPage45B4 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_004_soccer.mp3";
import clipPage45B3 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_003_car_race.mp3";
import clipPage45B2 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_002_library.mp3";
import clipPage45B1 from "../../../assets/audio/WorkBook/Unit 8/Page 45 - B/Item_001_visited.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
function renderExerciseAudioText({tabIndex=0,
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
  return <span role="button" tabIndex={tabIndex} data-listening={id} aria-label={label} onClick={event => {
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

const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#2b2b2b";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const SENTENCE_COLOR          = "#2b2b2b";
const DOT_COLOR               = "#2096a6";
const LINE_DEFAULT_COLOR      = "#2096a6";
const LINE_WRONG_COLOR        = "#2096a6";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, before: "The",                              after: "was filled with books.", correct: ["library"],  answer: "library"  },
  { id: 2, before: "Those cars were driving so fast in the", after: ".",               correct: ["car race"], answer: "car race" },
  { id: 3, before: "We",                               after: "Spain last month.",      correct: ["visited"],  answer: "visited"  },
  { id: 4, before: "Ed played",                        after: "with his friends.",      correct: ["soccer"],   answer: "soccer"   },
];

const RIGHT_ITEMS = [
  { id: "a", text: "visited"  },
  { id: "b", text: "library"  },
  { id: "c", text: "car race" },
  { id: "d", text: "soccer"   },
];

const CORRECT_MATCH = { 1: "b", 2: "c", 3: "a", 4: "d" };

// السكور الكلي = عدد الجمل × 2 (توصيل + كتابة)
const TOTAL_SCORE = LEFT_ITEMS.length * 2;

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────






// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadMatchWrite_QB() {
const listening=useExerciseListening("wb_unit8_page45_q2");

  const [answers,      setAnswers]      = useState({});
  const [matches,      setMatches]      = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  
  
  const containerRef = useRef(null);

  
  

  

  const [writeResults,setWriteResults]=useState({});const dotRefs=useRef({});const CORRECT_MATCHES=CORRECT_MATCH;
const [matchResults,setMatchResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");
const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);
const checkDisabled=showAns||LEFT_ITEMS.every(item=>matchResults[item.id]===true&&writeResults[item.id]==="correct");
const lockedLeft=id=>showAns||matchResults[id]===true,lockedRight=id=>showAns||Object.entries(matches).some(([lid,rid])=>rid===id&&matchResults[lid]===true);
useLayoutEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const cancel=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
const focusSide=(side,preferredId=null)=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const items=side==='left'?LEFT_ITEMS:RIGHT_ITEMS,isLocked=side==='left'?lockedLeft:lockedRight;const id=items.find(item=>item.id===preferredId&&!isLocked(item.id))?.id??items.find(item=>!isLocked(item.id))?.id;endpointRefs.current[side+'-'+id]?.focus({preventScroll:true});});};
const connect=(lid,rid,keyboard)=>{if(lockedLeft(lid)||lockedRight(rid))return;const next={...matches};Object.keys(next).forEach(k=>{if(Number(k)===lid||next[k]===rid)delete next[k];});next[lid]=rid;setMatches(next);setMatchResults(prev=>Object.fromEntries(Object.entries(prev).filter(([k,v])=>v===true||(Number(k)!==lid&&next[k]===matches[k]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left',lid);};
const endpointKeys=(e,side,id)=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cancel();return;}if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();e.stopPropagation();const values=(side==='left'?LEFT_ITEMS:RIGHT_ITEMS).filter(i=>!(side==='left'?lockedLeft:lockedRight)(i.id)).map(i=>i.id),at=values.indexOf(id),next=values[(at+(e.key==='ArrowDown'?1:-1)+values.length)%values.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();if(!e.repeat)(side==='left'?handleLeftClick:handleRightClick)(id,true);}};
const getDotCenter=key=>{const e=dotRefs.current[key],root=containerRef.current;if(!e||!root)return null;const cr=root.getBoundingClientRect(),r=e.getBoundingClientRect();return{x:(r.left-cr.left+r.width/2)/(cr.width/root.clientWidth||1),y:(r.top-cr.top+r.height/2)/(cr.height/root.clientHeight||1)};};
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
const handleLeftClick=(id,keyboard=false)=>{listening.play("left-"+id,(({1:[clipPage45B5,clipPage45B6],2:[clipPage45B7],3:[clipPage45B8,clipPage45B9],4:[clipPage45B10,clipPage45B11]}))[id]);if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence beginning selected. Choose its ending.");if(keyboard&&selectedLeft!==id)focusSide("right");};

  const handleRightClick=(id,keyboard=false)=>{listening.play("right-"+id,(({a:clipPage45B1,b:clipPage45B2,c:clipPage45B3,d:clipPage45B4}))[id]);if(lockedRight(id))return;if(selectedLeft!==null){connect(selectedLeft,id,keyboard);return;}setSelectedRight(prev=>prev===id?null:id);setPreview(null);setAnnouncement("Sentence ending selected. Choose its beginning.");if(keyboard&&selectedRight!==id)focusSide("left");};

  const handleInputChange=(id,value)=>{if(showAns||writeResults[id]==="correct")return;setAnswers(prev=>({...prev,[id]:value}));setWriteResults(prev=>{const next={...prev};delete next[id];return next;});};

  const handleCheck=()=>{if(checkDisabled)return;listening.stop();cancel();if(!LEFT_ITEMS.every(item=>matches[item.id]&&answers[item.id]?.trim())){ValidationAlert.info("Please match all items and complete all answers first.");return;}const nextMatch=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,matchResults[item.id]===true||matches[item.id]===CORRECT_MATCH[item.id]])),nextWrite=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,writeResults[item.id]==="correct"||item.correct.some(correct=>normalizeAnswer(answers[item.id]||"")===normalizeAnswer(correct))?"correct":"wrong"]));const score=Object.values(nextMatch).filter(Boolean).length+Object.values(nextWrite).filter(v=>v==="correct").length;setMatchResults(nextMatch);setWriteResults(nextWrite);setShowResults(true);setAnnouncement(`Score: ${score} out of ${TOTAL_SCORE}. Correct written answers and connections are locked independently.`);if(score===TOTAL_SCORE){resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${TOTAL_SCORE}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${TOTAL_SCORE}`);else ValidationAlert.error(`Score: 0 / ${TOTAL_SCORE}`);};

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    LEFT_ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled);
    setMatches({ ...CORRECT_MATCH });
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  cancel();setMatchResults({});setWriteResults({});setAnnouncement("Correct answers and connections shown and locked.");resetButtonRef.current?.focus({preventScroll:true});};

  const handleReset = () => {listening.stop();
    setAnswers({});
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
    setLines([]);
  cancel();setMatchResults({});setWriteResults({});setAnnouncement("Answers and connections cleared.");};

  const isWriteWrong=item=>!showAns&&writeResults[item.id]==="wrong";

  const isMatchWrong=item=>!showAns&&matchResults[item.id]===false;

  const isWriteDisabled=item=>showAns||writeResults[item.id]==="correct";

  return (
    <div data-adapt-scope="Unit8_WB_Unit8_Page45_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit8_WB_Unit8_Page45_Q2"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page45_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page45_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page45_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rmw-container {
          position: relative;
          width: 100%;
              margin: 4% 0;
        }

        .rmw-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rmw-layout {
          display: grid;
          grid-template-columns: 1fr auto clamp(100px, 15vw, 180px) auto auto;
          align-items: center;
          row-gap: clamp(30px, 2.2vw, 30px);
          column-gap: clamp(30px, 1.2vw, 30px);
          width: 100%;
        }

        .rmw-left {
          display: flex;
          flex-direction: column;
          gap: clamp(4px, 0.5vw, 6px);
          min-width: 0;
        }

        .rmw-sentence {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: wrap;
        }

        .rmw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rmw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          white-space: nowrap;
        }

        .rmw-input-wrap {
                  white-space: nowrap;

          position: relative;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rmw-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
                  line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rmw-input:disabled   { opacity: 1; cursor: default; }
        .rmw-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rmw-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rmw-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rmw-dot {
          width: clamp(9px, 1.2vw, 14px);
          height: clamp(9px, 1.2vw, 14px);
          border-radius: 50%;
          background: ${DOT_COLOR};
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.15s;
          display: block;
        }
        .rmw-dot:hover     { transform: scale(1.3); }

        /* Border على الجملة المحددة */
        .rmw-left--selected {
          border: 2px solid #2096a6;
          border-radius: 8px;
          padding: clamp(3px, 0.4vw, 5px) clamp(5px, 0.7vw, 8px);
          background: rgba(32, 150, 166, 0.05);
        }

        .rmw-right-dot {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
  .rmw-sentence {  margin : 2% 0 ; }
        .rmw-right-word {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .rmw-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          white-space: nowrap;
        }

        .rmw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rmw-sentence { flex-wrap: nowrap; }
          .rmw-text { white-space: normal; }
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
        <ExerciseHeader subTitle="Complete the written clue first, then connect each item to the matching word, picture, or answer." sectionLetter="B" title={<>Read, match, and write.</>} />

        <div className="rmw-container" ref={containerRef}>
          <svg aria-hidden="true" className="rmw-svg">{(()=>{let lid=selectedLeft,rid=selectedRight;if(lid!==null&&preview?.side==="right")rid=preview.id;else if(rid!==null&&preview?.side==="left")lid=preview.id;else return null;if(lockedLeft(lid)||lockedRight(rid))return null;const a=getDotCenter("left-"+lid),b=getDotCenter("right-"+rid);if(!a||!b)return null;return <line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>;})()}
            {lines.map((line, i) => (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke={showAns||matchResults[line.leftId]===true?"#16a34a":matchResults[line.leftId]===false?LINE_WRONG_COLOR:LINE_DEFAULT_COLOR} strokeWidth="2" />
            ))}
          </svg>

          <div className="rmw-layout">
            {LEFT_ITEMS.map((item, idx) => {
              const right       = RIGHT_ITEMS[idx];
              const writeWrong  = isWriteWrong(item);
              const matchWrong  = isMatchWrong(item);
              const value       = answers[item.id] || "";
              const tColor      = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor      = writeWrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;
              const disabled    = isWriteDisabled(item);
              const isSelected  = selectedLeft === item.id;

              return (
                <React.Fragment key={item.id}>

                  {/* Col 1: sentence + input */}
                  <div data-listening={"left-"+item.id} onClick={event=>{if(event.target.closest("input"))return;handleLeftClick(item.id);}} role="group" aria-roledescription="matching endpoint" data-keyboard-choice data-match-side="left" data-match-id={item.id} tabIndex={selectedLeft!==null?-1:selectedRight!==null&&lockedLeft(item.id)?-1:0} ref={el=>{endpointRefs.current['left-'+item.id]=el;}} aria-label={item.id+". "+item.before+" blank "+item.after} data-selected={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={event=>{if(event.target===event.currentTarget)endpointKeys(event,'left',item.id);}} onKeyUp={activationKeys.onKeyUp} onFocus={event=>{if(event.target===event.currentTarget)setPreview({side:'left',id:item.id});}} onMouseEnter={()=>setPreview({side:'left',id:item.id})} onMouseLeave={()=>setPreview(null)} style={{...({borderRadius:6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":undefined,cursor:lockedLeft(item.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="left-"+item.id?"#dbeafe":({borderRadius:6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":undefined,cursor:lockedLeft(item.id)?"default":"pointer"}).background,boxShadow:[({borderRadius:6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":undefined,cursor:lockedLeft(item.id)?"default":"pointer"}).boxShadow,listening.activeId==="left-"+item.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}} className={`rmw-left${isSelected ? " rmw-left--selected" : ""}`}>
                    <div className="rmw-sentence">
                      <span className="rmw-num">{item.id}</span>
                      <span className="rmw-text">{renderExerciseAudioText({tabIndex:selectedLeft!==null||selectedRight!==null?-1:0,audio:listening,id:`prefix-${item.id}`,src:[clipPage45B5,clipPage45B7,clipPage45B8,clipPage45B10][item.id-1],label:item.before,children:item.before})}</span>
                      <div className="rmw-input-wrap">
                        <input aria-label={`Sentence ${item.id}. Complete ${item.before} blank ${item.after} using a word on the right.`} title={`Sentence ${item.id}. Complete the blank using a word on the right.`} placeholder="Word" aria-invalid={writeResults[item.id]==="wrong"} tabIndex={selectedLeft!==null||selectedRight!==null?-1:0} onKeyDown={event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}} onKeyUp={event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}}
                          type="text"
                          className={[
                            "rmw-input",
                            writeWrong ? "rmw-input--wrong"  : "",
                            showAns    ? "rmw-input--answer" : "",
                          ].filter(Boolean).join(" ")}
                          value={value}
                          disabled={disabled}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                          style={{...({ borderBottomColor: uColor, color: tColor }),borderBottomColor:showAns||writeResults[item.id]==="correct"?"#16a34a":writeResults[item.id]==="wrong"?"#ef4444":({ borderBottomColor: uColor, color: tColor }).borderBottomColor}}
                          spellCheck={false}
                          autoComplete="off"
                        />
                        {writeWrong && <div className="rmw-badge">✕</div>}
                      </div>
                      {item.after && <span className="rmw-text">{renderExerciseAudioText({tabIndex:selectedLeft!==null||selectedRight!==null?-1:0,audio:listening,id:`suffix-${item.id}`,src:[clipPage45B6,null,clipPage45B9,clipPage45B11][item.id-1],label:item.after,children:item.after})}</span>}
                    </div>
                  {listening.activeId==="left-"+item.id&&renderExerciseSpeaker()}</div>

                  {/* Col 2: left dot */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <div
                      ref={(el) => (dotRefs.current[`left-${item.id}`] = el)}
                      className={`rmw-dot${isSelected ? " rmw-dot--selected" : ""}`}
                      onClick={() => handleLeftClick(item.id)}
                    />
                    {matchWrong && (
                      <div className="rmw-badge" style={{ top: "-8px", right: "-8px" }}>✕</div>
                    )}
                  </div>

                  {/* Col 3: gap */}
                  <div />

                  {/* Col 4: right dot */}
                  <div className="rmw-right-dot" onClick={() => handleRightClick(right.id)}>
                    <div
                      ref={(el) => (dotRefs.current[`right-${right.id}`] = el)}
                      className="rmw-dot"
                    />
                  </div>

                  {/* Col 5: right word */}
                  <div data-listening={"right-"+right.id} role="button" aria-roledescription="matching endpoint" data-keyboard-choice data-match-side="right" data-match-id={right.id} tabIndex={selectedRight!==null?-1:selectedLeft!==null&&lockedRight(right.id)?-1:0} ref={el=>{endpointRefs.current['right-'+right.id]=el;}} aria-label={right.text} aria-pressed={selectedRight===right.id} aria-disabled={lockedRight(right.id)} onKeyDown={event=>{if(event.target===event.currentTarget)endpointKeys(event,'right',right.id);}} onKeyUp={activationKeys.onKeyUp} onFocus={event=>{if(event.target===event.currentTarget)setPreview({side:'right',id:right.id});}} onMouseEnter={()=>setPreview({side:'right',id:right.id})} onMouseLeave={()=>setPreview(null)} style={{...({borderRadius:6,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}),position:"relative",background:listening.activeId==="right-"+right.id?"#dbeafe":({borderRadius:6,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}).background,boxShadow:[({borderRadius:6,boxShadow:lockedRight(right.id)?"inset 0 0 0 2px #16a34a":selectedRight===right.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===right.id?"#dbeafe":undefined,cursor:lockedRight(right.id)?"default":"pointer"}).boxShadow,listening.activeId==="right-"+right.id?"0 0 0 3px #2563eb":null].filter(Boolean).join(", ")||undefined}} className="rmw-right-word" onClick={() => handleRightClick(right.id)}>
                    <span className="rmw-word">{right.text}</span>
                  {listening.activeId==="right-"+right.id&&renderExerciseSpeaker()}</div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="rmw-buttons">
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