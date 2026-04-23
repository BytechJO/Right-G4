import React, { useState, useRef, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import AudioWithCaption from "../../AudioWithCaption";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd9pg44instruction2-adult-lady_Xwljrg04.mp3"; // ← غيّر المسار حسب ملف الأوديو

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const LINE_COLOR   = "#ef4444";

const TOP_ITEMS    = [1, 2, 3, 4, 5, 6, 7, 8];
const BOTTOM_ITEMS = ["i", "y", "z", "q", "c", "p", "t", "r"];

// الإجابات الصحيحة: رقم → حرف
const CORRECT = {
  1: "z",
  2: "y",
  3: "q",
  4: "i",
  5: "c",
  6: "t",
  7: "p",
  8: "r",
};

export default function WB_ListenAndMatch_PageB() {
  const [lines,       setLines]       = useState([]);   // [{from, to}]
  const [selecting,   setSelecting]   = useState(null); // رقم أو حرف مختار
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
  const [mousePos,    setMousePos]    = useState({ x: 0, y: 0 });

  const topRefs    = useRef({});
  const bottomRefs = useRef({});
  const svgRef     = useRef(null);
  const containerRef = useRef(null);
const captions = [
  { start: 0.52, end: 3.22, text: "Page 44, phonics exercise B." },
  { start: 3.22, end: 5.18, text: "Listen and match." },
  { start: 5.18, end: 7.96, text: "1- math." },
  { start: 7.96, end: 10.66, text: "2- thick." },
  { start: 10.66, end: 13.82, text: "3- this." },
  { start: 13.82, end: 16.56, text: "4- father." },
  { start: 16.56, end: 19.36, text: "5- bank." },
];
  // تتبع الماوس لرسم الخط المؤقت
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getCenter = (el) => {
    if (!el || !containerRef.current) return { x: 0, y: 0 };
    const elRect   = el.getBoundingClientRect();
    const conRect  = containerRef.current.getBoundingClientRect();
    return {
      x: elRect.left + elRect.width  / 2 - conRect.left,
      y: elRect.top  + elRect.height / 2 - conRect.top,
    };
  };

  const getContainerPos = (clientX, clientY) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const r = containerRef.current.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const isConnected = (key, type) =>
    lines.some((l) => type === "top" ? l.from === key : l.to === key);

  const handleTopClick = (num) => {
    if (showAns) return;
    if (selecting === null) {
      setSelecting({ type: "top", key: num });
    } else if (selecting.type === "top") {
      setSelecting({ type: "top", key: num });
    } else {
      // كان محدد حرف، نوصل
      connectLine(selecting.key, num);
    }
  };

  const handleBottomClick = (letter) => {
    if (showAns) return;
    if (selecting === null) {
      setSelecting({ type: "bottom", key: letter });
    } else if (selecting.type === "bottom") {
      setSelecting({ type: "bottom", key: letter });
    } else {
      // كان محدد رقم، نوصل
      connectLine(selecting.key, letter);
    }
  };

  const connectLine = (from, to) => {
    // امسح أي خط قديم للرقم أو الحرف
    setLines((prev) => {
      const filtered = prev.filter((l) => l.from !== from && l.to !== to);
      return [...filtered, { from, to }];
    });
    setSelecting(null);
    setShowResults(false);
  };

  const handleRemoveLine = (from) => {
    if (showAns) return;
    setLines((prev) => prev.filter((l) => l.from !== from));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (lines.length < TOP_ITEMS.length) {
      ValidationAlert.info("Please complete all matches first.");
      return;
    }
    let score = 0;
    lines.forEach((l) => { if (CORRECT[l.from] === l.to) score++; });
    setShowResults(true);
    const total = TOP_ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const ans = TOP_ITEMS.map((num) => ({ from: num, to: CORRECT[num] }));
    setLines(ans);
    setShowResults(true);
    setShowAns(true);
    setSelecting(null);
  };

  const handleStartAgain = () => {
    setLines([]);
    setSelecting(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isLineWrong = (line) =>
    showResults && !showAns && CORRECT[line.from] !== line.to;

  const getLineColor = (line) =>
    showResults
      ? isLineWrong(line) ? WRONG_COLOR : "#16a34a"
      : LINE_COLOR;

  // حساب إحداثيات الخطوط
  const computedLines = lines.map((line) => ({
    ...line,
    from_pos: getCenter(topRefs.current[line.from]),
    to_pos:   getCenter(bottomRefs.current[line.to]),
  }));

  // الخط المؤقت
  const tempFrom = selecting?.type === "top"
    ? getCenter(topRefs.current[selecting.key])
    : selecting?.type === "bottom"
    ? getCenter(bottomRefs.current[selecting.key])
    : null;

  const tempTo = tempFrom
    ? getContainerPos(mousePos.x, mousePos.y)
    : null;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(18px,2.5vw,28px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">B</span> Listen and match.
        </h1>
<div style={{ display: "flex", justifyContent: "center" }}>
  <AudioWithCaption src={sound1} captions={captions} />
</div>

        {/* ── منطقة الـ match ── */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width:    "100%",
            padding:  "clamp(16px,2vw,28px) 0",
          }}
        >
          {/* SVG للخطوط */}
          <svg
            ref={svgRef}
            style={{
              position:      "absolute",
              top:           0,
              left:          0,
              width:         "100%",
              height:        "100%",
              pointerEvents: "none",
              zIndex:        1,
            }}
          >
            {/* الخطوط المرسومة */}
            {computedLines.map((line) => (
              <line
                key={`${line.from}-${line.to}`}
                x1={line.from_pos.x} y1={line.from_pos.y}
                x2={line.to_pos.x}   y2={line.to_pos.y}
                stroke={getLineColor(line)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}

            {/* الخط المؤقت */}
            {tempFrom && tempTo && (
              <line
                x1={tempFrom.x} y1={tempFrom.y}
                x2={tempTo.x}   y2={tempTo.y}
                stroke={BORDER_COLOR}
                strokeWidth="2"
                strokeDasharray="6,4"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* الأرقام فوق */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: `repeat(${TOP_ITEMS.length}, minmax(0,1fr))`,
              gap:                 "clamp(6px,1vw,14px)",
              width:               "100%",
              position:            "relative",
              zIndex:              2,
            }}
          >
            {TOP_ITEMS.map((num) => {
              const connected = isConnected(num, "top");
              const isSelecting = selecting?.type === "top" && selecting.key === num;
              const line = lines.find((l) => l.from === num);
              const wrong = showResults && line && CORRECT[line.from] !== line.to;

              return (
                <div
                  key={num}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                >
                  <div
                    ref={(el) => (topRefs.current[num] = el)}
                    onClick={() => handleTopClick(num)}
                    style={{
                      width:           "clamp(36px,5vw,56px)",
                      height:          "clamp(36px,5vw,56px)",
                      borderRadius:    "50%",
                      border:          `2.5px solid ${wrong ? WRONG_COLOR : isSelecting ? BORDER_COLOR : connected ? BORDER_COLOR : "#ccc"}`,
                      background:      isSelecting ? "rgba(243,155,66,0.15)" : "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(14px,1.7vw,22px)",
                      fontWeight:      700,
                      color:           wrong ? WRONG_COLOR : "#111",
                      cursor:          showAns ? "default" : "pointer",
                      userSelect:      "none",
                      transition:      "all 0.15s",
                      position:        "relative",
                      boxShadow:       isSelecting ? `0 0 0 3px rgba(243,155,66,0.3)` : "none",
                    }}
                  >
                    {num}

                    {wrong && (
                      <div style={{
                        position:        "absolute",
                        top:             "-6px",
                        right:           "-6px",
                        width:           "16px",
                        height:          "16px",
                        borderRadius:    "50%",
                        border:          "1px solid #fff",
                        backgroundColor: WRONG_COLOR,
                        color:           "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "9px",
                        fontWeight:      700,
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                        pointerEvents:   "none",
                        cursor:          "pointer",
                      }}
                        onClick={(e) => { e.stopPropagation(); handleRemoveLine(num); }}
                      >✕</div>
                    )}
                  </div>

                  {/* نقطة وصل */}
                  <div style={{
                    width:        "10px",
                    height:       "10px",
                    borderRadius: "50%",
                    background:   connected ? (wrong ? WRONG_COLOR : BORDER_COLOR) : "#ccc",
                    transition:   "background 0.15s",
                  }} />
                </div>
              );
            })}
          </div>

          {/* مسافة بين الصفين */}
          <div style={{ height: "clamp(40px,7vw,80px)" }} />

          {/* الحروف تحت */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: `repeat(${BOTTOM_ITEMS.length}, minmax(0,1fr))`,
              gap:                 "clamp(6px,1vw,14px)",
              width:               "100%",
              position:            "relative",
              zIndex:              2,
            }}
          >
            {BOTTOM_ITEMS.map((letter) => {
              const connected   = isConnected(letter, "bottom");
              const isSelecting = selecting?.type === "bottom" && selecting.key === letter;
              const line        = lines.find((l) => l.to === letter);
              const wrong       = showResults && line && CORRECT[line.from] !== line.to;

              return (
                <div
                  key={letter}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                >
                  {/* نقطة وصل */}
                  <div style={{
                    width:        "10px",
                    height:       "10px",
                    borderRadius: "50%",
                    background:   connected ? (wrong ? WRONG_COLOR : BORDER_COLOR) : "#ccc",
                    transition:   "background 0.15s",
                  }} />

                  <div
                    ref={(el) => (bottomRefs.current[letter] = el)}
                    onClick={() => handleBottomClick(letter)}
                    style={{
                      width:           "clamp(36px,5vw,56px)",
                      height:          "clamp(36px,5vw,56px)",
                      borderRadius:    "50%",
                      border:          `2.5px solid ${wrong ? WRONG_COLOR : isSelecting ? BORDER_COLOR : connected ? BORDER_COLOR : "#ccc"}`,
                      background:      isSelecting ? "rgba(243,155,66,0.15)" : "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(14px,1.7vw,22px)",
                      fontWeight:      700,
                      color:           wrong ? WRONG_COLOR : "#111",
                      cursor:          showAns ? "default" : "pointer",
                      userSelect:      "none",
                      transition:      "all 0.15s",
                      boxShadow:       isSelecting ? `0 0 0 3px rgba(243,155,66,0.3)` : "none",
                    }}
                  >
                    {letter}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,1vw,12px)" }}>
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleStartAgain} />
        </div>
      </div>
    </div>
  );
}