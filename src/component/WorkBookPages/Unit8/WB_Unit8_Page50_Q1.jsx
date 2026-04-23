import { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/6.svg";

const DOT_COLOR    = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const LINE_COLOR   = "#f39b42";
const CHUNK_COLOR  = "#ffca94";

const WORDS = [
  { id: 1, prefix: "",         suffix: "andmother", correctChunk: "gr", fullWord: "grandmother", correctImage: 2 },
  { id: 2, prefix: "bus",      suffix: "",          correctChunk: "es", fullWord: "buses",        correctImage: 1 },
  { id: 3, prefix: "",         suffix: "esent",     correctChunk: "pr", fullWord: "present",      correctImage: 6 },
  { id: 4, prefix: "box",      suffix: "",          correctChunk: "es", fullWord: "boxes",        correctImage: 3 },
  { id: 5, prefix: "",         suffix: "ize",       correctChunk: "pr", fullWord: "prize",        correctImage: 4 },
  { id: 6, prefix: "sandwich", suffix: "",          correctChunk: "es", fullWord: "sandwiches",   correctImage: 5 },
];

const IMAGES = [
  { id: 1, img: img1, alt: "buses"       },
  { id: 2, img: img2, alt: "grandmother" },
  { id: 3, img: img3, alt: "boxes"       },
  { id: 4, img: img4, alt: "prize"       },
  { id: 5, img: img5, alt: "sandwiches"  },
  { id: 6, img: img6, alt: "present"     },
];

const CHUNKS = [
  { id: "es-1", value: "es" },
  { id: "gr-1", value: "gr" },
  { id: "pr-2", value: "pr" },
  { id: "pr-1", value: "pr" },
  { id: "es-2", value: "es" },
  { id: "es-3", value: "es" },
];

const ROW_HEIGHT = 72;

const WB_Unit8_Page48_QA = () => {
  const [chunkAnswers, setChunkAnswers] = useState({});
  const [usedChunkIds, setUsedChunkIds] = useState({});
  const [draggedChunk, setDraggedChunk] = useState(null);

  const [touchChunk, setTouchChunk] = useState(null);
  const [touchPos,   setTouchPos]   = useState({ x: 0, y: 0 });

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const elementRefs  = useRef({});
  const dropZoneRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const le = elementRefs.current[`left-${leftId}`];
          const re = elementRefs.current[`right-${rightId}`];
          if (!le || !re) return null;
          const lr = le.getBoundingClientRect();
          const rr = re.getBoundingClientRect();
          return {
            id: `${leftId}-${rightId}`,
            x1: lr.right - cr.left,
            y1: lr.top   + lr.height / 2 - cr.top,
            x2: rr.left  - cr.left,
            y2: rr.top   + rr.height / 2 - cr.top,
          };
        })
        .filter(Boolean);
      setLines(newLines);
    };
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  // ── منطق مشترك drag و touch ──
  const applyChunkDrop = (wordId, chunk) => {
    const oldChunkId = chunkAnswers[wordId]?.chunkId;
    setChunkAnswers((prev) => ({
      ...prev,
      [wordId]: { chunk: chunk.value, chunkId: chunk.id },
    }));
    setUsedChunkIds((prev) => {
      const updated = { ...prev, [chunk.id]: true };
      if (oldChunkId) delete updated[oldChunkId];
      return updated;
    });
    setShowResults(false);
  };

  // ── Drag desktop ──
  const handleDragStart = (chunk) => {
    if (showAns || usedChunkIds[chunk.id]) return;
    setDraggedChunk(chunk);
  };
  const handleDropChunk = (wordId) => {
    if (showAns || !draggedChunk) return;
    applyChunkDrop(wordId, draggedChunk);
    setDraggedChunk(null);
  };

  // ── Touch mobile ──
  const handleTouchStart = (e, chunk) => {
    if (showAns || usedChunkIds[chunk.id]) return;
    const t = e.touches[0];
    setTouchChunk(chunk);
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchMove = (e) => {
    if (!touchChunk) return;
    const t = e.touches[0];
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchEnd = () => {
    if (!touchChunk) return;
    Object.entries(dropZoneRefs.current).forEach(([wordId, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (
        touchPos.x >= r.left && touchPos.x <= r.right &&
        touchPos.y >= r.top  && touchPos.y <= r.bottom
      ) {
        applyChunkDrop(Number(wordId), touchChunk);
      }
    });
    setTouchChunk(null);
  };

  // ── Matching ──
  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };
  const handleRightClick = (rightId) => {
    if (showAns || selectedLeft === null) return;
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((k) => { if (newMatches[k] === rightId) delete newMatches[k]; });
    newMatches[selectedLeft] = rightId;
    setMatches(newMatches);
    setSelectedLeft(null);
    setShowResults(false);
  };

  // ── Check / Show / Reset ──
  const getItemResult = (item) =>
    chunkAnswers[item.id]?.chunk === item.correctChunk &&
    matches[item.id] === item.correctImage;

  const checkAnswers = () => {
    if (showAns) return;
    if (!WORDS.every((i) => chunkAnswers[i.id]?.chunk) || !WORDS.every((i) => matches[i.id])) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    WORDS.forEach((i) => { if (getItemResult(i)) score++; });
    setShowResults(true);
    if (score === WORDS.length)  ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)          ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else                         ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const correctChunks  = {};
    const correctUsed    = {};
    const correctMatches = {};
    const usedIndexes    = new Set();
    WORDS.forEach((item) => {
      const idx = CHUNKS.findIndex((c, i) => c.value === item.correctChunk && !usedIndexes.has(i));
      if (idx !== -1) {
        correctChunks[item.id]      = { chunk: CHUNKS[idx].value, chunkId: CHUNKS[idx].id };
        correctUsed[CHUNKS[idx].id] = true;
        usedIndexes.add(idx);
      }
      correctMatches[item.id] = item.correctImage;
    });
    setChunkAnswers(correctChunks);
    setUsedChunkIds(correctUsed);
    setMatches(correctMatches);
    setShowAns(true);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setChunkAnswers({});
    setUsedChunkIds({});
    setDraggedChunk(null);
    setTouchChunk(null);
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  // ── Helpers ──
  const isWrongItem = (item) => showResults && !showAns && !getItemResult(item);

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return ACTIVE_COLOR;
    const connected = side === "left" ? !!matches[id] : Object.values(matches).includes(id);
    return connected ? ACTIVE_COLOR : DOT_COLOR;
  };

  const getLeftRowStyle = (itemId) => {
    const isActive = selectedLeft === itemId;
    return {
      position:        "relative",
      height:          `${ROW_HEIGHT}px`,
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "space-between",
      gap:             "12px",
      padding:         "0 10px 0 8px",
      borderRadius:    "14px",
      border:          isActive ? `2px solid ${ACTIVE_COLOR}` : "2px solid transparent",
      backgroundColor: isActive ? "rgba(243,155,66,0.08)" : "transparent",
      boxShadow:       isActive ? "0 0 0 3px rgba(243,155,66,0.12)" : "none",
      transition:      "all 0.2s ease",
    };
  };

  const dropZoneStyle = (item) => ({
    minWidth:       "88px",
    minHeight:      "34px",
    borderBottom:   "2px solid #333",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    color:          chunkAnswers[item.id]?.chunk
      ? (isWrongItem(item) ? WRONG_COLOR : "#000000ff")
      : "#9ca3af",
    fontSize:   "22px",
    lineHeight: "1",
    padding:    "0 4px",
    fontWeight: 700,
  });

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Look, write, and match.
        </h1>

        {/* ── Chunk bank ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {CHUNKS.map((chunk) => {
            const disabled = !!usedChunkIds[chunk.id];
            return (
              <div
                key={chunk.id}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(chunk)}
                onTouchStart={(e) => handleTouchStart(e, chunk)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding:         "8px 14px",
                  borderRadius:    "10px",
                  backgroundColor: disabled ? "#d1d5db" : CHUNK_COLOR,
                  color:           disabled ? "#fff" : "#222",
                  fontSize:        "18px",
                  fontWeight:      "700",
                  border:          `1px solid ${disabled ? "#d1d5db" : ACTIVE_COLOR}`,
                  cursor:          disabled ? "not-allowed" : "grab",
                  opacity:         disabled ? 0.5 : 1,
                  userSelect:      "none",
                  touchAction:     "none",
                  boxShadow:       "0 2px 6px rgba(0,0,0,0.12)",
                  minWidth:        "52px",
                  textAlign:       "center",
                  transition:      "opacity 0.2s",
                }}
              >
                {chunk.value}
              </div>
            );
          })}
        </div>

        {/* ── Matching area ── */}
        <div
          ref={containerRef}
          style={{
            position:       "relative",
            display:        "flex",
            justifyContent: "center",
            alignItems:     "flex-start",
            gap:            "90px",
            padding:        "10px 20px",
            minHeight:      "560px",
          }}
        >
          {/* Left side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0", width: "390px" }}>
            {WORDS.map((item) => (
              <div key={item.id} style={getLeftRowStyle(item.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minHeight: "38px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "700", color: "#222", minWidth: "18px" }}>
                    {item.id}
                  </span>

                  {item.prefix ? (
                    <>
                      <span style={{ fontSize: "22px", color: "#222", lineHeight: "1" }}>{item.prefix}</span>
                      <div
                        ref={(el) => (dropZoneRefs.current[item.id] = el)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDropChunk(item.id)}
                        style={dropZoneStyle(item)}
                      >
                        {chunkAnswers[item.id]?.chunk || ""}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        ref={(el) => (dropZoneRefs.current[item.id] = el)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDropChunk(item.id)}
                        style={dropZoneStyle(item)}
                      >
                        {chunkAnswers[item.id]?.chunk || ""}
                      </div>
                      <span style={{ fontSize: "22px", color: "#222", lineHeight: "1" }}>{item.suffix}</span>
                    </>
                  )}
                </div>

                {/* Left dot */}
                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  onClick={() => handleLeftClick(item.id)}
                  style={{
                    width:           "20px",
                    height:          "20px",
                    borderRadius:    "50%",
                    backgroundColor: getDotColor("left", item.id),
                    cursor:          showAns ? "default" : "pointer",
                    flexShrink:      0,
                    transition:      "all 0.2s ease",
                    boxShadow:       selectedLeft === item.id ? "0 0 0 4px rgba(243,155,66,0.25)" : "none",
                  }}
                />

                {isWrongItem(item) && (
                  <div style={{
                    position:        "absolute",
                    right:           "-34px",
                    top:             "50%",
                    transform:       "translateY(-50%)",
                    width:           "22px",
                    height:          "22px",
                    borderRadius:    "50%",
                    backgroundColor: WRONG_COLOR,
                    color:           "#fff",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    fontSize:        "12px",
                    fontWeight:      "700",
                    boxShadow:       "0 2px 6px rgba(0,0,0,0.2)",
                  }}>✕</div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0", width: "250px" }}>
            {IMAGES.map((item) => (
              <div key={item.id} style={{ height: `${ROW_HEIGHT}px`, display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    width:           "20px",
                    height:          "20px",
                    borderRadius:    "50%",
                    backgroundColor: getDotColor("right", item.id),
                    cursor:          showAns || selectedLeft === null ? "default" : "pointer",
                    flexShrink:      0,
                    transition:      "all 0.2s ease",
                  }}
                />
                <div style={{ width: "120px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{ maxWidth: "110px", maxHeight: "52px", objectFit: "contain", display: "block" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* SVG lines */}
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>

      {/* ── Ghost chunk للتاتش ── */}
      {touchChunk && (
        <div style={{
          position:        "fixed",
          left:            touchPos.x - 26,
          top:             touchPos.y - 26,
          backgroundColor: CHUNK_COLOR,
          color:           "#222",
          width:           "52px",
          height:          "52px",
          borderRadius:    "10px",
          border:          `1px solid ${ACTIVE_COLOR}`,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          fontSize:        "18px",
          fontWeight:      "700",
          pointerEvents:   "none",
          zIndex:          9999,
          boxShadow:       "0 4px 12px rgba(0,0,0,0.25)",
          userSelect:      "none",
        }}>
          {touchChunk.value}
        </div>
      )}
    </div>
  );
};

export default WB_Unit8_Page48_QA;