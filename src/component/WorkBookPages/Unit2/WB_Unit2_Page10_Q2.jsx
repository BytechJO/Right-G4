import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 10.svg";

const DOT_COLOR    = "#9ca3af";
const TEXT_COLOR   = "#111";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";
const BORDER_COLOR = "#d9d9d9";
const WRONG_COLOR  = "#ef4444";
const ANSWER_COLOR = "#000000";
const PATH_COLOR   = "#f39b42";

const LEFT_ITEMS = [
  { id: 1, img: img1, label: "go to school" },
  { id: 2, img: img2, label: "go to the library" },
  { id: 3, img: img3, label: "go to the gym" },
  { id: 4, img: img4, label: "go to summer camp" },
];

const RIGHT_ITEMS = [
  { id: 1, bars: 4, prefixTop: "She",       correctAnswer: "usually rides a bike to the gym." },
  { id: 2, bars: 0, prefixTop: "He",        correctAnswer: "never walks to summer camp." },
  { id: 3, bars: 5, prefixTop: "He always", correctAnswer: "takes a bus to school." },
  { id: 4, bars: 2, prefixTop: "He",        correctAnswer: "sometimes takes the train to the library." },
];

const DRAG_ITEMS = [
  { id: 1, value: "usually rides a bike to the gym." },
  { id: 2, value: "never walks to summer camp." },
  { id: 3, value: "takes a bus to school." },
  { id: 4, value: "sometimes takes the train to the library." },
];

const CORRECT_MATCHES = { 1: 3, 2: 4, 3: 1, 4: 2 };

export default function WB_Unit2_Page10_QB() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [answers,      setAnswers]      = useState({});
  const [draggedItem,  setDraggedItem]  = useState(null);
  const [touchItem,    setTouchItem]    = useState(null);
  const [touchPos,     setTouchPos]     = useState({ x: 0, y: 0 });
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [paths,        setPaths]        = useState([]);

  const boardRef  = useRef(null);
  const pointRefs = useRef({});
  const dropRefs  = useRef({});

  const usedDragIds = Object.values(answers).filter(Boolean).map((e) => e.dragId);

  /* ── SVG paths ── */
  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches).map(([leftId, rightId]) => {
        const s = pointRefs.current[`left-${leftId}`];
        const e = pointRefs.current[`right-${rightId}`];
        if (!s || !e) return null;

        const sr = s.getBoundingClientRect();
        const er = e.getBoundingClientRect();
        const x1 = sr.left + sr.width / 2 - br.left;
        const y1 = sr.top  + sr.height / 2 - br.top;
        const x2 = er.left + er.width / 2 - br.left;
        const y2 = er.top  + er.height / 2 - br.top;
        const dx = Math.abs(x2 - x1);

        return {
          id: `path-${leftId}-${rightId}`,
          d: `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
        };
      }).filter(Boolean);

      setPaths(newPaths);
    };

    update();
    window.addEventListener("resize", update);
    let obs;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(update);
      obs.observe(boardRef.current);
    }
    return () => { window.removeEventListener("resize", update); obs?.disconnect(); };
  }, [matches]);

  /* ── Handlers ── */
  const handleLeftSelect  = (id) => { if (showAns) return; setSelectedLeft(id); setShowResults(false); };
  const handleRightSelect = (rightId) => {
    if (showAns || selectedLeft === null) return;
    const upd = { ...matches };
    Object.keys(upd).forEach((k) => { if (upd[k] === rightId) delete upd[k]; });
    upd[selectedLeft] = rightId;
    setMatches(upd); setSelectedLeft(null); setShowResults(false);
  };

  const applyDrop = (key, item) => {
    const upd = { ...answers };
    Object.keys(upd).forEach((k) => { if (upd[k]?.dragId === item.id) delete upd[k]; });
    upd[key] = { dragId: item.id, value: item.value };
    setAnswers(upd); setShowResults(false);
  };

  const handleDragStart = (item) => { if (showAns || usedDragIds.includes(item.id)) return; setDraggedItem(item); };
  const handleDrop      = (key)  => { if (showAns || !draggedItem) return; applyDrop(key, draggedItem); setDraggedItem(null); };

  const handleTouchStart = (e, item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    const t = e.touches[0];
    setTouchItem(item); setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchMove = (e) => { if (!touchItem) return; const t = e.touches[0]; setTouchPos({ x: t.clientX, y: t.clientY }); };
  const handleTouchEnd  = () => {
    if (!touchItem) return;
    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (touchPos.x >= r.left && touchPos.x <= r.right && touchPos.y >= r.top && touchPos.y <= r.bottom)
        applyDrop(key, touchItem);
    });
    setTouchItem(null);
  };

  const handleRemoveAnswer = (key) => {
    if (showAns) return;
    setAnswers((p) => { const u = { ...p }; delete u[key]; return u; });
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allConn  = LEFT_ITEMS.every((i) => matches[i.id]);
    const allDropp = RIGHT_ITEMS.every((i) => answers[`r-${i.id}`]?.value);
    if (!allConn || !allDropp) { ValidationAlert.info("Please complete all answers first."); return; }

    let score = 0;
    const total = LEFT_ITEMS.length + RIGHT_ITEMS.length;
    LEFT_ITEMS.forEach((i)  => { if (matches[i.id] === CORRECT_MATCHES[i.id]) score++; });
    RIGHT_ITEMS.forEach((i) => { if (answers[`r-${i.id}`]?.value === i.correctAnswer) score++; });
    setShowResults(true);

    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    RIGHT_ITEMS.forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correctAnswer);
      filledAnswers[`r-${i.id}`] = { dragId: d?.id ?? i.id, value: i.correctAnswer };
    });
    setMatches({ ...CORRECT_MATCHES });
    setAnswers(filledAnswers);
    setShowResults(true); setShowAns(true); setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setSelectedLeft(null); setMatches({}); setAnswers({});
    setDraggedItem(null); setTouchItem(null);
    setShowResults(false); setShowAns(false); setPaths([]);
  };

  const isWrongMatch = (leftId)    => showResults && !!matches[leftId] && matches[leftId] !== CORRECT_MATCHES[leftId];
  const isWrongDrop  = (rightItem) => showResults && answers[`r-${rightItem.id}`]?.value !== rightItem.correctAnswer;
  const getLeftConn  = (id)        => !!matches[id];
  const getRightConn = (id)        => Object.values(matches).includes(id);

  const renderBars = (count) => (
    <span style={{ display:"inline-flex", alignItems:"center", gap:0, marginRight:"6px", verticalAlign:"middle" }}>
      {[1,2,3,4,5].map((n) => (
        <span key={n} style={{
          width:"clamp(10px,1.6vw,18px)", height:"clamp(8px,1.3vw,14px)",
          border:"1.5px solid #9e9e9e", boxSizing:"border-box",
          background: n <= count ? WRONG_COLOR : "#fff",
        }} />
      ))}
    </span>
  );

  const renderDropBox = (item) => {
    const key   = `r-${item.id}`;
    const value = answers[key]?.value || "";
    const wrong = isWrongDrop(item);
    return (
      <div
        ref={(el) => (dropRefs.current[key] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(key)}
        onClick={() => handleRemoveAnswer(key)}
        style={{
          marginTop:"clamp(5px,0.7vw,9px)",
          minHeight:"clamp(22px,3vw,38px)",
          borderBottom:"2px solid #444",
          display:"flex", alignItems:"flex-end",
          position:"relative", paddingBottom:"2px",
          boxSizing:"border-box",
          cursor: value && !showAns ? "pointer" : showAns ? "default" : "pointer",
          width:"100%",
        }}
      >
        {value && (
          <span style={{ fontSize:"22px", lineHeight:1.3, wordBreak:"break-word", color:ANSWER_COLOR }}>
            {value}
          </span>
        )}
        {wrong && (
          <div style={{
            position:"absolute", top:"-8px", right:"-8px",
            width:"20px", height:"20px",
            borderRadius:"50%", backgroundColor:WRONG_COLOR, border:"1px solid #fff",
            color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"11px", fontWeight:700, zIndex:3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"18px", maxWidth:"1100px", margin:"0 auto" }}>

        {/* Title */}
        <h1 className="WB-header-title-page8" style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
          <span className="WB-ex-A">D</span> Connect and write.
        </h1>

        {/* Word bank */}
        <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
          <div style={{
            width:"100%", display:"flex", flexWrap:"wrap", justifyContent:"center",
            gap:"clamp(8px,1vw,12px)", padding:"clamp(10px,1.2vw,14px)",
            border:`2px solid ${BORDER_COLOR}`, borderRadius:"clamp(12px,1.4vw,18px)",
            background:"#fff", boxSizing:"border-box",
          }}>
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedDragIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  draggable={!isUsed && !showAns}
                  onDragStart={() => handleDragStart(item)}
                  onTouchStart={(e) => handleTouchStart(e, item)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    padding:"10px 16px", borderRadius:"14px",
                    border:`1.5px solid ${ACTIVE_COLOR}`,
                    backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                    color: isUsed ? "#999" : "#222",
                    cursor: isUsed || showAns ? "not-allowed" : "grab",
                    opacity: isUsed ? 0.6 : 1,
                    userSelect:"none",
                    /* ✅ font size ثابت 22px */
                    fontSize:"22px",
                    fontWeight:500,
                    boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                    transition:"0.2s ease", touchAction:"none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    textAlign:"center", lineHeight:1.2,
                  }}
                >{item.value}</div>
              );
            })}
          </div>
        </div>

        {/* ── Main board ── */}
        <div ref={boardRef} style={{ position:"relative", width:"100%" }}>

          {/* SVG connector lines */}
          <svg style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            pointerEvents:"none", overflow:"visible", zIndex:1,
          }}>
            {paths.map((p) => (
              <path key={p.id} d={p.d} fill="none"
                stroke={PATH_COLOR} strokeWidth="2.4" strokeLinecap="round" />
            ))}
          </svg>

          {/*
            ✅ FIX: 4 columns بدل عمودين
            left-content | left-dot | right-dot | right-content
            مع spacer واسع في المنتصف بين النقطتين
          */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr clamp(20px,3vw,36px) clamp(80px,10vw,140px) clamp(20px,3vw,36px) 1fr",
            rowGap:"clamp(16px,2.4vw,30px)",
            alignItems:"center",
            width:"100%",
          }}>
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem     = RIGHT_ITEMS[idx];
              const lConn     = getLeftConn(lItem.id);
              const rConn     = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
              const wrong     = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>

                  {/* col 1: رقم + صورة + label */}
                  <div style={{ display:"flex", alignItems:"center", gap:"clamp(6px,0.9vw,12px)", minWidth:0, zIndex:2 }}>

                    {/* Number */}
                    <span style={{
                      fontSize:"22px", fontWeight:700,
                      color:TEXT_COLOR, lineHeight:1, flexShrink:0,
                      minWidth:"24px",
                    }}>{lItem.id}</span>

                    {/* Card */}
                    <div style={{ display:"flex", flexDirection:"column", gap:"clamp(5px,0.8vw,9px)", minWidth:0, flex:1 }}>

                      {/* Image */}
                      <div
                        onClick={() => handleLeftSelect(lItem.id)}
                        style={{
                          width:"100%", aspectRatio:"1.95/1",
                          borderRadius:"clamp(10px,1vw,16px)", overflow:"hidden",
                          background:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
                          padding:"clamp(2px,0.4vw,5px)", boxSizing:"border-box",
                          cursor: showAns ? "default" : "pointer",
                          boxShadow: wrong ? "0 0 0 2px rgba(239,68,68,0.2) inset" : "none",
                          transition:"0.2s ease",
                        }}
                      >
                        <img src={lItem.img} alt={lItem.label}
                          style={{ width:"80%", height:"100%", objectFit:"contain", display:"block" }} />
                      </div>

                      {/* Label */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
                        <span style={{
                          fontSize:"22px", color:TEXT_COLOR,
                          lineHeight:1.3, textAlign:"center",
                        }}>
                          {lItem.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* col 2: نقطة اليسار */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
                    <div
                      ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                      onClick={() => handleLeftSelect(lItem.id)}
                      style={{
                        width:"clamp(10px,1.4vw,16px)", height:"clamp(10px,1.4vw,16px)",
                        borderRadius:"50%", flexShrink:0,
                        background: lSelected || lConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor: showAns ? "default" : "pointer",
                        boxShadow: lSelected ? "0 0 0 4px rgba(243,155,66,0.25)" : "none",
                        transition:"0.2s ease",
                      }}
                    />
                  </div>

                  {/* col 3: spacer — مساحة الخطوط المتقاطعة */}
                  <div />

                  {/* col 4: نقطة اليمين */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
                    <div
                      ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                      onClick={() => handleRightSelect(rItem.id)}
                      style={{
                        width:"clamp(10px,1.4vw,16px)", height:"clamp(10px,1.4vw,16px)",
                        borderRadius:"50%", flexShrink:0,
                        background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor: showAns || selectedLeft === null ? "default" : "pointer",
                        boxShadow: rConn ? "0 0 0 4px rgba(243,155,66,0.18)" : "none",
                        transition:"0.2s ease",
                      }}
                    />
                  </div>

                  {/* col 5: جملة + drop zone */}
                  <div
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      display:"flex", flexDirection:"column",
                      justifyContent:"center", minWidth:0, zIndex:2,
                      cursor: showAns || selectedLeft === null ? "default" : "pointer",
                    }}
                  >
                    {/* prefix line */}
                    <div style={{
                      fontSize:"22px", color:TEXT_COLOR,
                      lineHeight:1.3, borderBottom:"2px solid #444",
                      display:"inline", paddingBottom:"2px", wordBreak:"break-word",
                    }}>
                      {renderBars(rItem.bars)}{rItem.prefixTop}
                    </div>

                    {/* drop zone */}
                    {renderDropBox(rItem)}
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:"clamp(14px,2vw,24px)", zIndex:"100" }}>
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleStartAgain} />
        </div>
      </div>

      {/* Touch ghost */}
      {touchItem && (
        <div style={{
          position:"fixed", left:touchPos.x - 40, top:touchPos.y - 20,
          background:"#fff", padding:"8px 12px", borderRadius:"10px",
          boxShadow:"0 4px 10px rgba(0,0,0,0.2)", pointerEvents:"none",
          zIndex:9999, fontSize:"18px", fontWeight:600, color:"#222",
          maxWidth:"220px", textAlign:"center",
        }}>{touchItem.value}</div>
      )}
    </div>
  );
}