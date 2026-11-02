import clipPage71E4 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - E/Item_004_Were_there_any_watermelons.mp3";
import clipPage71E3 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - E/Item_003_Was_there_any_candy.mp3";
import clipPage71E2 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - E/Item_002_Were_there_any_nuts.mp3";
import clipPage71E1 from "../../../assets/audio/ClassBook/Unit 8/Page 71 - E/Item_001_Was_there_any_tea.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 6.svg";
import img3 from"../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 71/SVG/Asset 8.svg";
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




const imageDescriptions={img1:"Two watermelons.",img2:"A cup and saucer with a hot drink.",img3:"Three wrapped candies.",img4:"Two nuts in brown shells."};

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
const TEXT_COLOR          = "#2b2b2b";
const NUMBER_COLOR        = "#2b2b2b";
const DOT_DEFAULT         = "#e07b00";
const DOT_SELECTED        = "#2096a6";
const LINE_DEFAULT        = "#e07b00";
const LINE_CORRECT        = "#e07b00";
const LINE_WRONG          = "#2096a6";
const LINE_SHOW_ANS       = "#c81e1e";
const SENTENCE_SEL_BG     = "#e0f7fa";
const SENTENCE_SEL_BORDER = "#2096a6";
const IMG_BORDER_DEFAULT  = "#e5e7eb";
const IMG_BORDER_SELECTED = "#2096a6";
const IMG_BORDER_CORRECT  = "#16a34a";
const IMG_BORDER_WRONG    = "#ef4444";
const WRONG_BADGE_BG      = "#ef4444";
const WRONG_BADGE_TEXT    = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, sentence: "Was there any tea?"          },
  { id: 2, sentence: "Were there any nuts?"       },
  { id: 3, sentence: "Was there any candy?"      },
  { id: 4, sentence: "Were there any watermelons?" },
];

const LEFT_IMGS = [
  { name: "img1", src: img1, correctLeftId: 4 },
  { name: "img3", src: img3, correctLeftId: 3 },
];

const RIGHT_IMGS = [
  { name: "img2", src: img2, correctLeftId: 1 },
  { name: "img4", src: img4, correctLeftId: 2 },
];

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QD() {
const listening=useExerciseListening("sb_review7_page2_q2");

  const [connections,  setConnections]  = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);

const [results,setResults]=useState({}),[selectedImage,setSelectedImage]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");
 const resetButtonRef=useRef(null),sentenceRefs=useRef({}),imageRefs=useRef({}),focusFrame=useRef(null);
 const checkDisabled=showAns || LEFT_ITEMS.every(item=>results[item.id]===true);
 const lockedLeft=id=>showAns || results[id]===true;
 const lockedImage=name=>showAns || Object.keys(connections).some(id=>connections[id]===name && results[id]===true);
 const cancelFocus=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;};
 const focusTarget=(side)=>{cancelFocus();focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const item=side==='image'?LEFT_IMGS.flatMap((item,i)=>[item,RIGHT_IMGS[i]]).filter(Boolean).find(x=>!lockedImage(x.name)):LEFT_ITEMS.find(x=>!lockedLeft(x.id));(side==='image'?imageRefs.current[item?.name]:sentenceRefs.current[item?.id])?.focus({preventScroll:true});});};
 useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
 const cancel=()=>{cancelFocus();setSelectedLeft(null);setSelectedImage(null);setPreview(null);};
 const connect=(id,name,keyboard)=>{if(lockedLeft(id)||lockedImage(name))return;const next={...connections};Object.keys(next).forEach(k=>{if(Number(k)===id||next[k]===name)delete next[k];});next[id]=name;setConnections(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([k,v])=>v===true||next[k]===connections[k]&&Number(k)!==id)));cancel();setAnnouncement('Connection made.');if(keyboard)focusTarget('text');};
 const endpointKeys=(event,side,value)=>{if(event.key==='Tab'&&side==='image'){const items=LEFT_IMGS.flatMap((item,i)=>[item,RIGHT_IMGS[i]]).filter(Boolean),at=items.findIndex(item=>item.name===value),next=items[at+(event.shiftKey?-1:1)];if(next){event.preventDefault();event.stopPropagation();imageRefs.current[next.name]?.focus();}return;}if(event.key==='Escape'){event.preventDefault();event.stopPropagation();cancel();return;}if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();const items=side==='text'?LEFT_ITEMS.filter(x=>!lockedLeft(x.id)).map(x=>x.id):LEFT_IMGS.flatMap((item,i)=>[item,RIGHT_IMGS[i]]).filter(Boolean).filter(x=>!lockedImage(x.name)).map(x=>x.name);const index=items.indexOf(value),next=items[(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length];(side==='text'?sentenceRefs.current[next]:imageRefs.current[next])?.focus();return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(!event.repeat)(side==='text'?handleLeftClick:handleRightClick)(value,true);}};
  const containerRef = useRef(null);
  const leftRefs     = useRef({});
  const rightRefs    = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter=useCallback(el=>{if(!el||!containerRef.current)return null;const root=containerRef.current,c=root.getBoundingClientRect(),e=el.getBoundingClientRect(),sx=c.width/root.clientWidth||1,sy=c.height/root.clientHeight||1;return{x:(e.left-c.left+e.width/2)/sx,y:(e.top-c.top+e.height/2)/sy};},[]);

  const isCorrect      = (leftId, imgName) => {
    const r = ALL_IMGS.find((ri) => ri.name === imgName);
    return r && r.correctLeftId === Number(leftId);
  };
  const connectedRight = (name) => Object.values(connections).includes(name);
  const connectedLeft  = (id)   => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor=(id)=>showAns||results[id]===true?"#16a34a":results[id]===false?"#ef4444":LINE_DEFAULT;

  const handleLeftClick=(id,keyboard=false)=>{listening.play(`sentence-${id}`,[clipPage71E1,clipPage71E2,clipPage71E3,clipPage71E4][id-1]);if(lockedLeft(id))return;if(selectedImage!==null){connect(id,selectedImage,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement('Sentence selected. Choose a picture.');if(keyboard&&selectedLeft!==id)focusTarget('image');};

  const handleRightClick=(name,keyboard=false)=>{if(lockedImage(name))return;if(selectedLeft!==null){connect(selectedLeft,name,keyboard);return;}setSelectedImage(prev=>prev===name?null:name);setPreview(null);setAnnouncement('Picture selected. Choose a sentence.');if(keyboard&&selectedImage!==name)focusTarget('text');};

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all sentences to images first."); return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, name]) => { if (isCorrect(lid, name)) score++; });
    setShowResults(true);setResults(Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,isCorrect(item.id,connections[item.id])])));cancel();setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}.`);
    if (score === LEFT_ITEMS.length) {resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    const ans = {};
    ALL_IMGS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    cancel();setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");cancel();setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");setConnections(ans); setShowResults(false); setShowAns(true); setSelectedLeft(null);
  };

  const handleReset = () => {listening.stop();
    cancel();setResults({});setAnnouncement("Connections cleared.");cancel();setResults({});setAnnouncement("Connections cleared.");setConnections({}); setShowResults(false); setShowAns(false); setSelectedLeft(null);
  };

  const renderLines = () =>
    Object.entries(connections).map(([leftId, imgName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[imgName]);
      if (!p1 || !p2) return null;
      return (
        <line key={`${leftId}-${imgName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, imgName)}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  // ── Dot colors ──
  const leftDotColor=id=>lockedLeft(id)?"#16a34a":isLeftWrong(id)?"#ef4444":selectedLeft===id||connectedLeft(id)?DOT_SELECTED:DOT_DEFAULT;

  const rightDotColor=name=>lockedImage(name)?"#16a34a":isRightWrong(name)?"#ef4444":selectedImage===name||connectedRight(name)?DOT_SELECTED:DOT_DEFAULT;

  const imgBorderColor=name=>lockedImage(name)?"#16a34a":isRightWrong(name)?IMG_BORDER_WRONG:selectedImage===name?IMG_BORDER_SELECTED:connectedRight(name)?IMG_BORDER_SELECTED:IMG_BORDER_DEFAULT;

  // ── Badge helpers ──
  const isLeftWrong=id=>!showAns&&results[id]===false;
  const isRightWrong=name=>!showAns&&Object.keys(connections).some(id=>connections[id]===name&&results[id]===false);

  const renderImgCard = (item) => {
    const isLocked = lockedImage(item.name);
    return (
      <div key={item.name} className="rlm-img-wrap">

        {/* نقطة يسار الصورة — مع badge لو غلط */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            className="rlm-dot-img"
            ref={(el) => { rightRefs.current[item.name] = el; }}
            style={{ background: rightDotColor(item.name) }}
            onClick={() => handleRightClick(item.name)}
          />
        </div>

        <div role="button" tabIndex={0} data-keyboard-choice ref={el=>{imageRefs.current[item.name]=el;}} aria-label={imageDescriptions[item.name]} aria-pressed={selectedImage===item.name} aria-disabled={lockedImage(item.name)} onKeyDown={event=>endpointKeys(event,"image",item.name)} onKeyUp={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();}}} onFocus={()=>setPreview({side:"image",id:item.name})} onMouseEnter={()=>setPreview({side:"image",id:item.name})} onMouseLeave={()=>setPreview(null)}
          className={["rlm-img-card", isLocked ? "rlm-img-card--locked" : ""].filter(Boolean).join(" ")}
          style={{ borderColor: imgBorderColor(item.name) }}
          onClick={() => handleRightClick(item.name)}
        >
          <img src={item.src} alt={imageDescriptions[item.name]} className="rlm-img" />
        </div>
      </div>
    );
  };

  return (
    <div onKeyDown={event=>{if(event.key==="Escape"&&(selectedLeft!==null||selectedImage!==null)){event.preventDefault();event.stopPropagation();cancel();setAnnouncement("Selection cancelled.");}}} data-adapt-scope="review7&8_Review7_Page2_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review7&8_Review7_Page2_Q2"] input:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review7_Page2_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review7_Page2_Q2"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .rlm-area { position: relative; width: 100%; }

        .rlm-grid {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
        }

        .rlm-left-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(30px, 6vw, 60px);
          padding-top: clamp(20px, 3.5vw, 50px);
        }

        .rlm-row { display: flex; align-items: center; }

        .rlm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
        }

        .rlm-sentence-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.9vw, 12px);
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 12px);
          border-radius: 10px;
          border: 2px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .rlm-sentence-wrap--selected {
          border-color: ${SENTENCE_SEL_BORDER};
          background: ${SENTENCE_SEL_BG};
        }
        .rlm-sentence-wrap--locked { cursor: default; }

        .rlm-sentence-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }

        /* نقطة الجملة مع wrapper للـ badge */
        .rlm-dot-sentence-wrap { position: relative; flex-shrink: 0; }

        .rlm-dot-sentence {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          transition: background 0.15s, transform 0.15s;
        }
        .rlm-sentence-wrap:not(.rlm-sentence-wrap--locked):hover .rlm-dot-sentence {
          transform: scale(1.3);
        }

        .rlm-images-area {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 14px);
          padding-left: clamp(10px, 1.6vw, 22px);
          flex-shrink: 0;
        }

        .rlm-img-col-left {
          display: flex;
          flex-direction: column;
          gap: clamp(53.5px, 1vw, 30px);
                    margin-top: 30%;

        }

        .rlm-img-col-right {
          display: flex;
          flex-direction: column;
          gap: clamp(53.5px, 1vw, 30px);
          margin-top: 5%;
        }

        .rlm-img-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .rlm-dot-img {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.15s;
        }

        .rlm-img-card {
          cursor: pointer;
          border-radius: 12px;
          transition: border-color 0.15s, transform 0.1s;
          flex-shrink: 0;
        }
        .rlm-img-card:hover { transform: scale(1.02); }
        .rlm-img-card--locked { cursor: default; }
        .rlm-img-card--locked:hover { transform: none; }

        .rlm-img {
          width: 80%;
          height: clamp(75px, 9.5vw, 120px);
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ── ✕ Badge ── */
        .rlm-badge {
          position: absolute;
          top: -20px; right: -1px;
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

        .rlm-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.4vw, 16px);
        }

        @media (max-width: 520px) {
          .rlm-grid          { flex-direction: column; }
          .rlm-left-col      { padding-top: 0; gap: 14px; }
          .rlm-images-area   { padding-left: 0; }
          .rlm-img-col-right { margin-top: 0; }
          .rlm-sentence-text { white-space: normal; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 1.8vw, 20px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <ExerciseHeader subTitle="Start with one item, then connect it to the picture, word, or sentence that matches before moving to the next pair." isReview sectionLetter="E" title={<>Read, look, and match.</>} />

        <div className="rlm-area" ref={containerRef}>
          <div className="rlm-grid">

            {/* Sentences */}
            <div className="rlm-left-col">
              {LEFT_ITEMS.map((item) => {
                const isSelected = selectedLeft === item.id;
                const isLocked = lockedLeft(item.id);
                return (
                  <div key={item.id} className="rlm-row">
                    <span className="rlm-num">{item.id}</span>
                    <div style={{...({}),position:"relative",backgroundColor:listening.activeId===`sentence-${item.id}`?"#dbeafe":({}).backgroundColor,boxShadow:listening.activeId===`sentence-${item.id}`?"0 0 0 3px #2563eb":({}).boxShadow}} data-listening={`sentence-${item.id}`} role="button" tabIndex={0} data-keyboard-choice ref={el=>{sentenceRefs.current[item.id]=el;}} aria-label={item.sentence} aria-pressed={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={event=>endpointKeys(event,"text",item.id)} onKeyUp={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();}}} onFocus={()=>setPreview({side:"text",id:item.id})} onMouseEnter={()=>setPreview({side:"text",id:item.id})} onMouseLeave={()=>setPreview(null)}
                      className={[
                        "rlm-sentence-wrap",
                        isSelected ? "rlm-sentence-wrap--selected" : "",
                        isLocked   ? "rlm-sentence-wrap--locked"   : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleLeftClick(item.id)}
                    >
                      <span className="rlm-sentence-text">{item.sentence}</span>

                      {/* نقطة + badge */}
                      <div className="rlm-dot-sentence-wrap">
                        <div
                          className="rlm-dot-sentence"
                          ref={(el) => { leftRefs.current[item.id] = el; }}
                          style={{ background: leftDotColor(item.id) }}
                        />
                        {isLeftWrong(item.id) && <div className="rlm-badge">✕</div>}
                      </div>
                    {listening.activeId===`sentence-${item.id}`&&renderExerciseSpeaker()}</div>
                  </div>
                );
              })}
            </div>

            {/* Images */}
            <div className="rlm-images-area">
              <div className="rlm-img-col-left">
                {LEFT_IMGS.map(renderImgCard)}
              </div>
              <div className="rlm-img-col-right">
                {RIGHT_IMGS.map(renderImgCard)}
              </div>
            </div>

          </div>
          <svg className="rlm-svg" aria-hidden="true" style={{pointerEvents:'none'}}>{renderLines()}{(()=>{let id=selectedLeft,name=selectedImage;if(id!==null&&preview?.side==='image')name=preview.id;else if(name!==null&&preview?.side==='text')id=preview.id;else return null;if(lockedLeft(id)||lockedImage(name))return null;const a=getDotCenter(leftRefs.current[id]),b=getDotCenter(rightRefs.current[name]);return a&&b?<line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>:null;})()}</svg>
        </div>

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