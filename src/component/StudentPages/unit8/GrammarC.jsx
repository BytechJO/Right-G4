import { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // He fixed the car
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // She cooked soup
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // I painted a picture
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 10.svg"; // They played soccer

/**
 * Layout matches the book page exactly:
 *
 *   Sentences (left)          Images (right, 2×2 grid)
 *   ─────────────────         ──────────────────────────
 *   1  They played soccer. ●  ● [img1: car]   ● [img2: soup]
 *   2  He fixed the car.   ●  ● [img3: paint] ● [img4: soccer]
 *   3  I painted a picture.●
 *   4  She cooked soup.    ●
 *
 * Correct answers:
 *   1 → img4  (soccer)
 *   2 → img1  (car)
 *   3 → img3  (painting)
 *   4 → img2  (soup)
 *
 * Error feedback: ONLY the sentence dot turns red. No badge, no animation.
 */

const GrammarC = () => {
  const sentences = [
    { id: 1, text: "They played soccer.",   correctImg: "img4" },
    { id: 2, text: "He fixed the car.",     correctImg: "img1" },
    { id: 3, text: "I painted a picture.",  correctImg: "img3" },
    { id: 4, text: "She cooked soup.",      correctImg: "img2" },
  ];

  // Images in the order they appear in the 2×2 grid (row-major, left-to-right, top-to-bottom)
  // Row 1: img1 (car)  | img2 (soup)
  // Row 2: img3 (paint)| img4 (soccer)
  const images = [
    { id: "img1", src: img1 },
    { id: "img2", src: img2 },
    { id: "img3", src: img3 },
    { id: "img4", src: img4 },
  ];

  const [connections, setConnections]   = useState({});
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging]     = useState(false);
  const [errors, setErrors]             = useState({});   // { sentId: true|false }
  const [locked, setLocked]             = useState(false);
  const [showed, setShowed]             = useState(false);
  const [dotPositions, setDotPositions] = useState({});

  const containerRef  = useRef(null);
  const sentDotRefs   = useRef({});
  const imgDotRefs    = useRef({});

  // ─── Position helpers ────────────────────────────────────────────────────────

  const updatePositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect      = container.getBoundingClientRect();
    const positions = {};

    Object.entries(sentDotRefs.current).forEach(([id, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`sent_${id}`] = {
          x: r.left - rect.left + r.width  / 2,
          y: r.top  - rect.top  + r.height / 2,
        };
      }
    });

    Object.entries(imgDotRefs.current).forEach(([id, el]) => {
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`img_${id}`] = {
          x: r.left - rect.left + r.width  / 2,
          y: r.top  - rect.top  + r.height / 2,
        };
      }
    });

    setDotPositions(positions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // ─── Drag handlers ───────────────────────────────────────────────────────────

  const handleSentDotMouseDown = (e, sentId) => {
    if (locked) return;
    e.preventDefault();
    updatePositions();
    setDraggingFrom({ type: "sent", id: sentId });
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleImgDotMouseUp = (imgId) => {
    if (!isDragging || !draggingFrom) return;
    if (draggingFrom.type === "sent") {
      setConnections((prev) => ({ ...prev, [draggingFrom.id]: imgId }));
    }
    setIsDragging(false);
    setDraggingFrom(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingFrom(null);
  };

  // ─── Button handlers ─────────────────────────────────────────────────────────

  const handleCheck = () => {
    if (locked) return;
    if (Object.keys(connections).length < sentences.length) {
      ValidationAlert.info("Please match all sentences.");
      return;
    }

    let correctCount = 0;
    const newErrors  = {};

    sentences.forEach((s) => {
      if (connections[s.id] === s.correctImg) {
        correctCount++;
        newErrors[s.id] = false;
      } else {
        newErrors[s.id] = true;
      }
    });

    setErrors(newErrors);

    const total = sentences.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const correct = {};
    sentences.forEach((s) => { correct[s.id] = s.correctImg; });
    setConnections(correct);
    setErrors({});
    setLocked(true);
    setShowed(true);
    setTimeout(updatePositions, 50);
  };

  const handleReset = () => {
    setConnections({});
    setErrors({});
    setLocked(false);
    setShowed(false);
    setIsDragging(false);
    setDraggingFrom(null);
  };

  // ─── Line color ──────────────────────────────────────────────────────────────

  const getLineColor = (sentId) => {
    if (showed)                     return "#2195a6";
    if (errors[sentId] === false)   return "#2195a6";
    if (errors[sentId] === true)    return "#ef4444";
    return "#2195a6";
  };

  // ─── Dot color for sentence dots ─────────────────────────────────────────────
  // Only change: red when wrong, orange otherwise (no animation, no badge)

  const getSentDotColor = (sentId) => {
    if (errors[sentId] === true) return "#ef4444";
    return "#f89631";
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="mb-6 mx-auto">
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Look and match.
      </h5>

      <div
        ref={containerRef}
        style={{ position: "relative", userSelect: "none" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* ── SVG Lines ─────────────────────────────────────────────────────── */}
        <svg
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 10,
          }}
        >
          {/* Connected lines */}
          {sentences.map((s) => {
            const from = dotPositions[`sent_${s.id}`];
            const to   = connections[s.id]
              ? dotPositions[`img_${connections[s.id]}`]
              : null;
            if (!from || !to) return null;
            return (
              <line
                key={s.id}
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                stroke={getLineColor(s.id)}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Live drag line */}
          {isDragging && draggingFrom && (
            <line
              x1={dotPositions[`sent_${draggingFrom.id}`]?.x || 0}
              y1={dotPositions[`sent_${draggingFrom.id}`]?.y || 0}
              x2={mousePos.x} y2={mousePos.y}
              stroke="#2195a6"
              strokeWidth="2.5"
              strokeDasharray="6,3"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* ── Main layout ───────────────────────────────────────────────────── */}
        <div className="flex gap-8 items-center">

          {/* Sentences column */}
          <div
            className="flex flex-col gap-6"
            style={{ minWidth: "220px" }}
          >
            {sentences.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span
                  style={{
                    fontWeight: "400",
                    WebkitTextStroke: "1px black",
                    color: "#1a1a1a",
                    fontSize: "16px",
                    minWidth: "16px",
                  }}
                >
                  {s.id}
                </span>

                <span style={{ fontSize: "16px", color: "#1a1a1a" }}>
                  {s.text}
                </span>

                {/* Sentence dot — only turns red on wrong, no other effect */}
                <div
                  ref={(el) => (sentDotRefs.current[s.id] = el)}
                  onMouseDown={(e) => handleSentDotMouseDown(e, s.id)}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: getSentDotColor(s.id),
                    cursor: locked ? "default" : "crosshair",
                    flexShrink: 0,
                    zIndex: 20,
                    position: "relative",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Images — 2×2 grid, row-major order matching the book page */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {images.map((img) => (
              <div key={img.id} className="flex items-center gap-2">

                {/* Left dot on each image */}
                <div
                  ref={(el) => (imgDotRefs.current[img.id] = el)}
                  onMouseUp={() => handleImgDotMouseUp(img.id)}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "#f89631",
                    cursor: "pointer",
                    flexShrink: 0,
                    zIndex: 20,
                    position: "relative",
                  }}
                />

                <img
                  src={img.src}
                  alt=""
                  style={{
                    width: "130px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Buttons ───────────────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-6 mt-8">

        {/* Reset */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show Answer */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check Answer */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;