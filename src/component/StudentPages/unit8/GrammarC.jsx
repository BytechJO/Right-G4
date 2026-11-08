import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 14.svg"; // He fixed the car
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 11.svg"; // She cooked soup
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // I painted a picture
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 9.svg";
const imageDescriptions={img1:"A person repairing a red car.",img2:"A man cooking at a stove with two children beside him.",img3:"A girl painting a landscape.",img4:"Two boys playing soccer."};

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

 // They played soccer


const TEXT_COLOR = "#2b2b2b";
const DOT_DEFAULT = "#f89631";
const DOT_SELECTED = "#2195a6";
const LINE_DEFAULT = "#2195a6";
const LINE_CORRECT = "#2195a6";
const LINE_WRONG = "#ef4444";

const ROW_HEIGHT = 70;
const ROW_GAP = 0;

const LEFT_ITEMS = [
  { id: 1, text: "They played soccer." },
  { id: 2, text: "He fixed the car." },
  { id: 3, text: "I painted a picture." },
  { id: 4, text: "She cooked soup." },
];

// row = نفس رقم الجملة اللي بتطابقها
const LEFT_IMGS = [
  { name: "img1", src: img1, correctLeftId: 2, row: 1 },
  { name: "img3", src: img3, correctLeftId: 3, row: 3 },
];

const RIGHT_IMGS = [
  { name: "img2", src: img2, correctLeftId: 4, row: 2 },
  { name: "img4", src: img4, correctLeftId: 1, row: 4 },
];

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS];

const GrammarC = () => {
  const [connections, setConnections] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [, setShowResults] = useState(false);
  const [showed, setShowed] = useState(false);
  const [locked, setLocked] = useState(false);

const [results,setResults]=useState({}),[selectedRight,setSelectedRight]=useState(null),[preview,setPreview]=useState(null),[announcement,setAnnouncement]=useState("");
const resetButtonRef=useRef(null),endpointRefs=useRef({}),focusFrame=useRef(null);const checkDisabled=showed||LEFT_ITEMS.every(item=>results[item.id]===true);const orderedRight=()=>[...ALL_IMGS].sort((a,b)=>a.row-b.row);
const lockedLeft=id=>showed||results[id]===true;const lockedRight=name=>showed||Object.keys(connections).some(id=>connections[id]===name&&results[id]===true);
const cancelFocus=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;};const cancel=()=>{cancelFocus();setSelectedLeft(null);setSelectedRight(null);setPreview(null);};
useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
const focusSide=side=>{cancelFocus();focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const item=side==='left'?LEFT_ITEMS.find(x=>!lockedLeft(x.id)):orderedRight().find(x=>!lockedRight(x.name));endpointRefs.current[side+'-'+(side==='left'?item?.id:item?.name)]?.focus({preventScroll:true});});};
const connect=(id,name,keyboard)=>{if(lockedLeft(id)||lockedRight(name))return;const next={...connections};Object.keys(next).forEach(k=>{if(Number(k)===id||next[k]===name)delete next[k];});next[id]=name;setConnections(next);setResults(prev=>Object.fromEntries(Object.entries(prev).filter(([key,value])=>value===true||(Number(key)!==id&&next[key]===connections[key]))));cancel();setAnnouncement('Connection made.');if(keyboard)focusSide('left');};
const endpointKeys=(event,side,value)=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();cancel();return;}const items=side==='left'?LEFT_ITEMS.map(x=>x.id):orderedRight().map(x=>x.name);let index=items.indexOf(value);if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();const available=items.filter(x=>side==='left'?!lockedLeft(x):!lockedRight(x));index=available.indexOf(value);const next=available[(index+(event.key==='ArrowDown'?1:-1)+available.length)%available.length];endpointRefs.current[side+'-'+next]?.focus();return;}if(event.key==='Tab'&&side==='right'){const next=items[index+(event.shiftKey?-1:1)];if(next!==undefined){event.preventDefault();event.stopPropagation();endpointRefs.current['right-'+next]?.focus();}return;}if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(!event.repeat)(side==='left'?handleLeftClick:handleRightClick)(value,true);}};

  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
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
      x: (eRect.left - cRect.left + eRect.width / 2)/(cRect.width/containerRef.current.clientWidth || 1),
      y: (eRect.top - cRect.top + eRect.height / 2)/(cRect.height/containerRef.current.clientHeight || 1),
    };
  }, []);

  const isCorrect = (leftId, imgName) => {
    const r = ALL_IMGS.find((ri) => ri.name === imgName);
    return r && r.correctLeftId === Number(leftId);
  };

  const connectedRight = (name) => Object.values(connections).includes(name);
  const connectedLeft = (id) => Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor=id=>showed||results[id]===true?"#16a34a":results[id]===false?"#ef4444":LINE_DEFAULT;

  const handleLeftClick=(id,keyboard=false)=>{if(lockedLeft(id))return;if(selectedRight!==null){connect(id,selectedRight,keyboard);return;}setSelectedLeft(prev=>prev===id?null:id);setPreview(null);setAnnouncement('Sentence selected. Choose its match.');if(keyboard&&selectedLeft!==id)focusSide('right');};

  const handleRightClick=(name,keyboard=false)=>{if(lockedRight(name))return;if(selectedLeft!==null){connect(selectedLeft,name,keyboard);return;}setSelectedRight(prev=>prev===name?null:name);setPreview(null);setAnnouncement('Match selected. Choose a sentence.');if(keyboard&&selectedRight!==name)focusSide('left');};

  const handleCheck=()=>{if(checkDisabled)return;cancel();if(Object.keys(connections).length<LEFT_ITEMS.length){ValidationAlert.info('Please connect all sentences first.');return;}const next=Object.fromEntries(LEFT_ITEMS.map(item=>[item.id,isCorrect(item.id,connections[item.id])]));const score=Object.values(next).filter(Boolean).length;setResults(next);setShowResults(true);setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`);if(score===LEFT_ITEMS.length){setLocked(true);resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);}else if(score)ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);};

  const handleShow = () => {
    const ans = {};
    ALL_IMGS.forEach((r) => { ans[r.correctLeftId] = r.name; });
    cancel();setResults({});resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct connections shown and locked.");setConnections(ans);
    setShowResults(false);
    setShowed(true);
    setLocked(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    cancel();setResults({});setAnnouncement("Connections cleared.");setConnections({});
    setShowResults(false);
    setShowed(false);
    setLocked(false);
    setSelectedLeft(null);
  };

  const leftDotColor=id=>lockedLeft(id)?"#16a34a":results[id]===false?"#ef4444":selectedLeft===id||connectedLeft(id)?"#2195a6":DOT_DEFAULT;

  const rightDotColor=name=>lockedRight(name)?"#16a34a":Object.keys(connections).some(id=>connections[id]===name&&results[id]===false)?"#ef4444":selectedRight===name||connectedRight(name)?"#2195a6":DOT_DEFAULT;

  

  const isLeftWrong=id=>!showed&&results[id]===false;
  

  const renderLines = () =>
    Object.entries(connections).map(([leftId, imgName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[imgName]);
      if (!p1 || !p2) return null;
      return (
        <line
          key={`${leftId}-${imgName}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={lineColor(leftId, imgName)}
          strokeWidth="2.5" strokeLinecap="round"
        />
      );
    });

  const renderImgCell = (imgList,rowId) => {
    const item = imgList.find((i) => i.row === rowId);
    if (!item) return <div style={{ width: "120px" }} />;
    
    return (
      <div role="button" tabIndex={0} data-keyboard-choice data-match-side="right" data-match-id={item.name} ref={el=>{endpointRefs.current['right-'+item.name]=el;}} aria-label={imageDescriptions[item.name]} aria-pressed={selectedRight===item.name} aria-disabled={lockedRight(item.name)} onKeyDown={event=>endpointKeys(event,'right',item.name)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'right',id:item.name})} onMouseEnter={()=>setPreview({side:'right',id:item.name})} onMouseLeave={()=>setPreview(null)}
        style={{...({ display: "flex", alignItems: "center", gap: "6px", cursor: locked ? "default" : "pointer" }),borderRadius:({ display: "flex", alignItems: "center", gap: "6px", cursor: locked ? "default" : "pointer" }).borderRadius||6,boxShadow:lockedRight(item.name)?"inset 0 0 0 2px #16a34a":selectedRight===item.name?"inset 0 0 0 2px #2563eb":undefined,background:selectedRight===item.name?"#dbeafe":({ display: "flex", alignItems: "center", gap: "6px", cursor: locked ? "default" : "pointer" }).background}}
        onClick={() => handleRightClick(item.name)}
      >
        <div
          ref={(el) => { rightRefs.current[item.name] = el; }}
          style={{
            width: "13px", height: "13px", borderRadius: "50%",
            background: rightDotColor(item.name),
            flexShrink: 0, zIndex: 20, position: "relative",
          }}
        />
        <div style={{ position: "relative" }}>
          <img
            src={item.src} alt={imageDescriptions[item.name]}
            style={{
              width: "120px",
              height: `auto`,
              objectFit: "cover",
              display: "block",
            }}
          />
        
        </div>
      </div>
    );
  };

  return (
    <div onKeyDown={event=>{if(event.key==="Escape"&&(selectedLeft!==null||selectedRight!==null)){event.preventDefault();event.stopPropagation();cancel();setAnnouncement("Selection cancelled.");}}} data-adapt-scope="unit8_GrammarC" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit8_GrammarC"] input:focus-visible, [data-adapt-scope="unit8_GrammarC"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_GrammarC"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_GrammarC"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Look and match.
      </h5>

      <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>

          {/* ── Numbers ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, paddingTop: "0px", flexShrink: 0 }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "700", fontSize: "16px", color: TEXT_COLOR, minWidth: "20px" }}>
                  {item.id}
                </span>
              </div>
            ))}
          </div>

          {/* ── Sentences ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: `${ROW_GAP}px` }}>
            {LEFT_ITEMS.map((item) => {
              const isSelected = selectedLeft === item.id;
              const isLock = lockedLeft(item.id);
              
              return (
                <div
                  key={item.id}
                  style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}
                >
                  <div role="button" tabIndex={0} data-keyboard-choice data-match-side="left" data-match-id={item.id} ref={el=>{endpointRefs.current['left-'+item.id]=el;}} aria-label={item.text} aria-pressed={selectedLeft===item.id} aria-disabled={lockedLeft(item.id)} onKeyDown={event=>endpointKeys(event,'left',item.id)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>setPreview({side:'left',id:item.id})} onMouseEnter={()=>setPreview({side:'left',id:item.id})} onMouseLeave={()=>setPreview(null)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{...({
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "4px 10px", borderRadius: "10px",
                      border: `2px solid ${isSelected ? "#2195a6" : "transparent"}`,
                      background: isSelected ? "#e0f7fa" : "transparent",
                      cursor: isLock ? "default" : "pointer",
                      userSelect: "none",
                    }),borderRadius:({
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "4px 10px", borderRadius: "10px",
                      border: `2px solid ${isSelected ? "#2195a6" : "transparent"}`,
                      background: isSelected ? "#e0f7fa" : "transparent",
                      cursor: isLock ? "default" : "pointer",
                      userSelect: "none",
                    }).borderRadius||6,boxShadow:lockedLeft(item.id)?"inset 0 0 0 2px #16a34a":selectedLeft===item.id?"inset 0 0 0 2px #2563eb":undefined,background:selectedLeft===item.id?"#dbeafe":({
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "4px 10px", borderRadius: "10px",
                      border: `2px solid ${isSelected ? "#2195a6" : "transparent"}`,
                      background: isSelected ? "#e0f7fa" : "transparent",
                      cursor: isLock ? "default" : "pointer",
                      userSelect: "none",
                    }).background}}
                  >
                    <span style={{ fontSize: "15px", color: TEXT_COLOR }}>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Left dots (sentence dots) ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0, paddingRight: "16px" }}>
            {LEFT_ITEMS.map((item) => {
              const wrong = isLeftWrong(item.id);
              return (
                <div
                  key={item.id}
                  style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}
                  onClick={() => handleLeftClick(item.id)}
                >
                  <div style={{ position: "relative", cursor: locked ? "default" : "pointer" }}>
                    <div
                      ref={(el) => { leftRefs.current[item.id] = el; }}
                      style={{
                        width: "13px", height: "13px", borderRadius: "50%", marginRight : "20em",
                        background: leftDotColor(item.id),
                      }}
                    />
                    {wrong && (
                      <div style={{
                        position: "absolute", top: "-1px", right: "70px",
                        width: "16px", height: "16px", background: "#ef4444",
                        color: "white", borderRadius: "50%", fontSize: "9px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "bold", border: "2px solid white", zIndex: 3,
                      }}>✕</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Left images col ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0, marginRight: "10px" }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                {renderImgCell(LEFT_IMGS,item.id)}
              </div>
            ))}
          </div>

          {/* ── Right images col ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: `${ROW_GAP}px`, flexShrink: 0 }}>
            {LEFT_ITEMS.map((item) => (
              <div key={item.id} style={{ height: ROW_HEIGHT, display: "flex", alignItems: "center" }}>
                {renderImgCell(RIGHT_IMGS,item.id)}
              </div>
            ))}
          </div>

        </div>

        {/* SVG Lines */}
        <svg aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", overflow: "visible", zIndex: 10,
        }}>
          {renderLines()}{(()=>{let id=selectedLeft,name=selectedRight;if(id!==null&&preview?.side==='right')name=preview.id;else if(name!==null&&preview?.side==='left')id=preview.id;else return null;if(lockedLeft(id)||lockedRight(name))return null;const a=getDotCenter(leftRefs.current[id]),b=getDotCenter(rightRefs.current[name]);return a&&b?<line data-match-preview x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 4"/>:null;})()}
        </svg>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShow} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={checkDisabled} style={{cursor:checkDisabled ? "not-allowed":"pointer"}} onClick={handleCheck} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;