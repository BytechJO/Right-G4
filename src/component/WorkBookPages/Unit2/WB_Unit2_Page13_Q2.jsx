import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 8.svg";

const RED    = "#000000ff";
const ORANGE = "#f29a1f";
const BORDER = "#b6b6b6";
const WRONG  = "#ef4444";
const TEXT   = "#111";

// الكلمات المتاحة في الـ dropdown
const WORD_OPTIONS = ["usually", "sometimes"];

const SENTENCES = [
  { id: 1, before: "She",          correctWord: "usually",   after: "takes a bus to school." },
  { id: 2, before: "Stella's dad", correctWord: "usually",   after: "takes a taxi." },
  { id: 3, before: "He",           correctWord: "sometimes", after: "rides a scooter." },
  { id: 4, before: "Helen's mom",  correctWord: "sometimes", after: "takes the subway to the supermarket." },
];

const PICTURES = [
  { id: 1, img: img1, alt: "bus",     correctNumber: 1 },
  { id: 2, img: img2, alt: "scooter", correctNumber: 3 },
  { id: 3, img: img3, alt: "taxi",    correctNumber: 2 },
  { id: 4, img: img4, alt: "subway",  correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4];

const styles = {
  pageWrap:    { width: "100%" },
  contentWrap: { display:"flex", flexDirection:"column", gap:"clamp(18px,2vw,28px)", width:"100%" },

  sentencesWrap: { display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", width:"100%" },

  sentenceRow: {
    display:"flex", alignItems:"baseline",
    gap:"clamp(8px,1vw,14px)", width:"100%", flexWrap:"wrap",
  },

  sentenceNumber: {
    fontSize:"clamp(18px,2vw,28px)", fontWeight:700, color:TEXT, lineHeight:1,
    minWidth:"clamp(18px,2vw,28px)", flexShrink:0,
  },

  sentenceText: {
    fontSize:"clamp(16px,2vw,24px)", color:TEXT, lineHeight:1.2, fontWeight:500,
  },

  // ── Dropdown ──
  selectWrap: { position:"relative", display:"inline-flex", alignItems:"flex-end" },

  select: {
    minWidth:"clamp(120px,18vw,200px)",
    borderTop:"none", borderLeft:"none", borderRight:"none",
    borderBottom:"3px solid #333",
    borderRadius:0, outline:"none",
    fontSize:"clamp(16px,2vw,24px)", fontWeight:500, color:RED,
    padding:"0 clamp(4px,0.6vw,8px) 4px 2px",
    background:"transparent", cursor:"pointer",
    appearance:"auto", boxSizing:"border-box",
  },

  wrongBadge: {
    position:"absolute", top:"clamp(-8px,-1vw,-4px)", right:"clamp(-8px,-1vw,-4px)",
    width:"clamp(18px,2vw,24px)", height:"clamp(18px,2vw,24px)",
    borderRadius:"50%", backgroundColor:WRONG, color:"#fff",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:"clamp(10px,1vw,12px)", fontWeight:700,
    border:"2px solid #fff", boxShadow:"0 2px 6px rgba(0,0,0,0.18)", zIndex:4,
  },

  // ── Image cards ──
  imageCard: {
    position:"relative", width:"100%",
    borderRadius:"18px", overflow:"hidden",
    boxSizing:"border-box", cursor:"pointer",
    transition:"0.2s ease",
  },

  image: {
    width:"100%", height:"auto", display:"block",
    objectFit:"contain", userSelect:"none", pointerEvents:"none",
  },

  dragNumbersWrap: {
    display:"flex", justifyContent:"center",
    flexWrap:"wrap", gap:"clamp(10px,1.4vw,16px)",
  },

  dragCircle: {
    width:"clamp(42px,5vw,54px)", height:"clamp(42px,5vw,54px)",
    borderRadius:"50%", background:ORANGE, color:"#fff",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:"clamp(20px,2.4vw,28px)", fontWeight:700,
    cursor:"grab", userSelect:"none", transition:"0.2s ease",
    touchAction:"none", boxShadow:"0 3px 10px rgba(0,0,0,0.12)",
  },

  buttonsWrap: { display:"flex", justifyContent:"center", marginTop:"4px" },
};

export default function WB_Unit3_Page22_QJ() {
  const [wordAnswers,   setWordAnswers]   = useState({ 1:"", 2:"", 3:"", 4:"" });
  const [imageAnswers,  setImageAnswers]  = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem,     setTouchItem]     = useState(null);
  const [touchPos,      setTouchPos]      = useState({ x:0, y:0 });
  const [checked,       setChecked]       = useState(false);
  const [showAns,       setShowAns]       = useState(false);

  const numberDropRefs = useRef({});
  const usedNumbers    = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  // ── Word select ──
  const handleWordChange = (sentenceId, value) => {
    if (showAns) return;
    setWordAnswers((prev) => ({ ...prev, [sentenceId]: value }));
    setChecked(false);
  };

  // ── Number drag ──
  const applyNumberDrop = (cardId, num) => {
    const updated = { ...imageAnswers };
    Object.keys(updated).forEach((k) => { if (updated[k] === num) delete updated[k]; });
    updated[cardId] = num;
    setImageAnswers(updated); setDraggedNumber(null); setChecked(false);
  };

  const handleNumberDragStart = (num) => { if (showAns || usedNumbers.includes(num)) return; setDraggedNumber(num); };
  const handleNumberDrop      = (cardId) => { if (showAns || draggedNumber === null) return; applyNumberDrop(cardId, draggedNumber); };

  const handleTouchStartNumber = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;
    const t = e.touches[0];
    setTouchItem(num); setDraggedNumber(num); setTouchPos({ x:t.clientX, y:t.clientY });
  };
  const handleTouchMove = (e) => { if (touchItem === null) return; const t = e.touches[0]; setTouchPos({ x:t.clientX, y:t.clientY }); };
  const handleTouchEnd  = () => {
    if (touchItem === null) return;
    Object.entries(numberDropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (touchPos.x >= r.left && touchPos.x <= r.right && touchPos.y >= r.top && touchPos.y <= r.bottom)
        applyNumberDrop(Number(key), touchItem);
    });
    setTouchItem(null); setDraggedNumber(null);
  };

  const handleRemoveNumber = (cardId) => {
    if (showAns) return;
    setImageAnswers((prev) => { const u = { ...prev }; delete u[cardId]; return u; });
    setChecked(false);
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns) return;
    const allWords   = SENTENCES.every((s) => wordAnswers[s.id]);
    const allNumbers = PICTURES.every((p) => imageAnswers[p.id]);
    if (!allWords || !allNumbers) { ValidationAlert.info("Please complete all answers first."); return; }

    let score = 0;
    const total = SENTENCES.length + PICTURES.length;
    SENTENCES.forEach((s) => { if (wordAnswers[s.id] === s.correctWord) score++; });
    PICTURES.forEach((p)  => { if (imageAnswers[p.id] === p.correctNumber) score++; });
    setChecked(true);

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)  ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                 ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filledWords   = {};
    const filledNumbers = {};
    SENTENCES.forEach((s) => { filledWords[s.id]   = s.correctWord; });
    PICTURES.forEach((p)  => { filledNumbers[p.id] = p.correctNumber; });
    setWordAnswers(filledWords); setImageAnswers(filledNumbers);
    setChecked(true); setShowAns(true);
    setDraggedNumber(null); setTouchItem(null);
  };

  const handleReset = () => {
    setWordAnswers({ 1:"", 2:"", 3:"", 4:"" }); setImageAnswers({});
    setDraggedNumber(null); setTouchItem(null);
    setChecked(false); setShowAns(false);
  };

  const isWordWrong   = (id) => checked && wordAnswers[id] !== SENTENCES.find((s) => s.id === id)?.correctWord;
  const isNumberWrong = (id) => checked && imageAnswers[id] !== PICTURES.find((p) => p.id === id)?.correctNumber;

  // لون الرقم فوق الصورة بعد الفحص
  const getNumberColor = (cardId) => {
    if (!checked) return "#000";
    return imageAnswers[cardId] === PICTURES.find((p) => p.id === cardId)?.correctNumber ? "#000000ff" : WRONG;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.5vw, 20px);
          width: 100%;
          align-items: start;
        }
        .wb-j-drag-selected  { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(141,141,147,0.2); }
        .wb-j-drag-disabled  { background: #cfcfd4 !important; cursor: not-allowed !important; opacity: 0.6; }
        .wb-j-touch-preview  {
          position:fixed; padding:0 14px; min-width:48px; height:48px;
          border-radius:999px; background:#8d8d93; color:#fff;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; font-weight:700; pointer-events:none; z-index:9999;
          box-shadow:0 4px 10px rgba(0,0,0,0.2); white-space:nowrap;
        }
        @media (max-width:900px) { .wb-j-cards-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
        @media (max-width:560px) { .wb-j-cards-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"18px", maxWidth:"1100px", margin:"0 auto" }}>

        <h1 className="WB-header-title-page8" style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
          <span className="WB-ex-A">J</span> Look and complete the sentences. Number the pictures.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.contentWrap}>

            {/* ── Sentences with dropdown ── */}
            <div style={styles.sentencesWrap}>
              {SENTENCES.map((item) => {
                const wrong = isWordWrong(item.id);
                return (
                  <div key={item.id} style={styles.sentenceRow}>
                    <div style={styles.sentenceNumber}>{item.id}</div>
                    <span style={styles.sentenceText}>{item.before}</span>

                    {/* Dropdown */}
                    <div style={styles.selectWrap}>
                      <select
                        disabled={showAns}
                        value={wordAnswers[item.id]}
                        onChange={(e) => handleWordChange(item.id, e.target.value)}
                        style={{
                          ...styles.select,
                          color: wordAnswers[item.id] ? (wrong ? WRONG : RED) : "#aaa",
                          borderBottomColor: wrong ? WRONG : "#333",
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        <option value="" disabled hidden></option>
                        {WORD_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>

                      {wrong && <div style={styles.wrongBadge}>✕</div>}
                    </div>

                    <span style={styles.sentenceText}>{item.after}</span>
                  </div>
                );
              })}
            </div>

            {/* ── Image cards — الصورة فقط بدون overlay ── */}
            <div className="wb-j-cards-grid">
              {PICTURES.map((item) => {
                const wrong = isNumberWrong(item.id);
                return (
                  <div
                    key={item.id}
                    ref={(el) => (numberDropRefs.current[item.id] = el)}
                    style={{ position:"relative" }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleNumberDrop(item.id)}
                    onClick={() => handleRemoveNumber(item.id)}
                  >
                    <div style={styles.imageCard}>
                      <img src={item.img} alt={item.alt} style={styles.image} draggable={false} />
                    </div>

                    {/* الرقم فوق الصورة — يمين أعلى */}
                    {imageAnswers[item.id] && (
                      <div style={{
                        position:"absolute", top:"2%", right:"7%",
                        fontSize:"clamp(18px,2.2vw,30px)", fontWeight:500,
                        color: getNumberColor(item.id),
                        lineHeight:1, zIndex:3, pointerEvents:"none",
                        textShadow:"0 1px 3px rgba(255,255,255,0.8)",
                      }}>
                        {imageAnswers[item.id]}
                      </div>
                    )}

                    {wrong && (
                      <div style={{
                        ...styles.wrongBadge,
                        position:"absolute", top:"4px", right:"4px", zIndex:4,
                      }}>✕</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Drag numbers ── */}
            <div style={styles.dragNumbersWrap}>
              {DRAG_NUMBERS.map((num) => {
                const disabled = usedNumbers.includes(num);
                const selected = draggedNumber === num || touchItem === num;
                return (
                  <div
                    key={num}
                    draggable={!disabled && !showAns}
                    onDragStart={() => handleNumberDragStart(num)}
                    onTouchStart={(e) => handleTouchStartNumber(e, num)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={styles.dragCircle}
                    className={`${disabled || showAns ? "wb-j-drag-disabled" : ""} ${selected ? "wb-j-drag-selected" : ""}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} checkAnswers={handleCheck} />
        </div>
      </div>

      {touchItem !== null && (
        <div className="wb-j-touch-preview" style={{ left:touchPos.x - 40, top:touchPos.y - 24 }}>
          {touchItem}
        </div>
      )}
    </div>
  );
}