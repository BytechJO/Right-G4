import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";

import imgHat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G1.svg";
import imgCat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G2.svg";
import imgBall  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G3.svg";
import imgApple from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G4.svg";

import imgFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G5.svg";
import imgBed    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G6.svg";
import imgTable  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G7.svg";
import imgChair  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G8.svg";

const BORDER_COLOR = "#f39b42";

const SENTENCES = [
  { id: 1, before: "The hat",   img: imgHat,   after: "is under the table."      },
  { id: 2, before: "The cat",   img: imgCat,   after: "is next to the chair."    },
  { id: 3, before: "The ball",  img: imgBall,  after: "is on the bed."           },
  { id: 4, before: "The apple", img: imgApple, after: "is in the fridge."        },
];

const FURNITURE = [
  { id: 1, img: imgFridge, alt: "fridge" },
  { id: 2, img: imgBed,    alt: "bed"    },
  { id: 3, img: imgTable,  alt: "table"  },
  { id: 4, img: imgChair,  alt: "chair"  },
];

const COLORS = [
  "#111827", "#ef4444", "#22c55e",
  "#3b82f6", "#eab308", "#a855f7",
  "#ec4899", "#ffffff",
];
const SIZES = [2, 4, 8, 12];

// ── Single canvas drawing box ──
function DrawCanvas({ width, height, tool, color, size }) {
  const canvasRef = useRef(null);
  const drawing   = useRef(false);
  const lastPos   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    if (tool === "fill") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const pos = getPos(e);
    lastPos.current = pos;
    drawing.current = true;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, (tool === "eraser" ? size * 2 : size) / 2, 0, Math.PI * 2);
    ctx.fillStyle = tool === "eraser" ? "#fff" : color;
    ctx.fill();
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    if (tool !== "pencil" && tool !== "eraser") return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e);
    const prev   = lastPos.current;
    if (!prev) return;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#fff" : color;
    ctx.lineWidth   = tool === "eraser" ? size * 3 : size;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();

    lastPos.current = pos;
  };

  const endDraw = (e) => {
    e?.preventDefault();
    drawing.current = false;
    lastPos.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        style={{
          width:       "100%",
          height:      "100%",
          display:     "block",
          cursor:      tool === "eraser" ? "cell" : "crosshair",
          touchAction: "none",
        }}
      />
      <button
        onClick={clear}
        style={{
          position:     "absolute",
          bottom:       "4px",
          right:        "4px",
          padding:      "2px 8px",
          borderRadius: "6px",
          border:       "1.5px solid #fca5a5",
          background:   "#fef2f2",
          color:        "#dc2626",
          fontSize:     "11px",
          fontWeight:   700,
          cursor:       "pointer",
          zIndex:       3,
          lineHeight:   1.4,
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default function SB_ReadAndDraw_PageG() {
  const [tool,  setTool]  = useState("pencil");
  const [color, setColor] = useState("#111827");
  const [size,  setSize]  = useState(4);

  const handleStartAgain = () => {
    window.location.reload();
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">G</span> Read and draw.
        </h1>

        {/* ── Toolbar ── */}
        <div
          style={{
            display:      "flex",
            flexWrap:     "wrap",
            alignItems:   "center",
            gap:          "clamp(8px,1vw,12px)",
            padding:      "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
            border:       "1px solid #e5e7eb",
            borderRadius: "clamp(10px,1.2vw,16px)",
            background:   "#f9fafb",
          }}
        >
          {/* tools */}
          <div style={{ display: "flex", gap: "clamp(4px,0.6vw,8px)", flexWrap: "wrap" }}>
            {[
              { id: "pencil", label: "✏️" },
              { id: "eraser", label: "🧽" },
              { id: "fill",   label: "🪣" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTool(item.id)}
                title={item.id}
                style={{
                  padding:      "clamp(5px,0.7vw,9px) clamp(8px,1vw,12px)",
                  borderRadius: "10px",
                  border:       tool === item.id ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  background:   tool === item.id ? "#eff6ff" : "#fff",
                  color:        tool === item.id ? "#1d4ed8" : "#374151",
                  fontWeight:   700,
                  cursor:       "pointer",
                  fontSize:     "clamp(14px,1.6vw,20px)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ width: "1px", height: "28px", background: "#d1d5db", flexShrink: 0 }} />

          {/* colors */}
          <div style={{ display: "flex", gap: "clamp(4px,0.6vw,8px)", flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width:        "clamp(22px,2.8vw,32px)",
                  height:       "clamp(22px,2.8vw,32px)",
                  borderRadius: "50%",
                  border:       color === c
                    ? "3px solid #111827"
                    : c === "#ffffff"
                    ? "2px solid #d1d5db"
                    : "2px solid transparent",
                  background:   c,
                  cursor:       "pointer",
                  flexShrink:   0,
                }}
              />
            ))}
          </div>

          <div style={{ width: "1px", height: "28px", background: "#d1d5db", flexShrink: 0 }} />

          {/* sizes */}
          <div style={{ display: "flex", gap: "clamp(4px,0.6vw,8px)", alignItems: "center" }}>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width:          "clamp(26px,3.2vw,36px)",
                  height:         "clamp(26px,3.2vw,36px)",
                  borderRadius:   "50%",
                  border:         size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  background:     "#fff",
                  cursor:         "pointer",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}
              >
                <span
                  style={{
                    width:        `${Math.min(s * 2, 16)}px`,
                    height:       `${Math.min(s * 2, 16)}px`,
                    borderRadius: "50%",
                    background:   "#111827",
                    display:      "block",
                    flexShrink:   0,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Main layout ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr auto",
            gap:                 "clamp(16px,2.5vw,32px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {/* LEFT: sentences */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "clamp(14px,2vw,24px)",
              minWidth:      0,
            }}
          >
            {SENTENCES.map((s) => (
              <div
                key={s.id}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(8px,1vw,14px)",
                  flexWrap:   "wrap",
                  minWidth:   0,
                }}
              >
                <span
                  style={{
                    fontSize:   "clamp(16px,1.9vw,28px)",
                    fontWeight: 700,
                    color:      "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth:   "clamp(14px,1.8vw,24px)",
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize:   "clamp(14px,1.7vw,22px)",
                    fontWeight: 500,
                    color:      "#111",
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  {s.before}
                </span>
                <img
                  src={s.img}
                  alt={s.before}
                  style={{
                    height:        "clamp(28px,4vw,48px)",
                    width:         "auto",
                    objectFit:     "contain",
                    display:       "inline-block",
                    flexShrink:    0,
                    userSelect:    "none",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    fontSize:   "clamp(14px,1.7vw,22px)",
                    fontWeight: 500,
                    color:      "#111",
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  {s.after}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: furniture images 2×2 */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap:                 "clamp(8px,1.2vw,16px)",
              flexShrink:          0,
            }}
          >
            {FURNITURE.map((item) => (
              <div
                key={item.id}
                style={{
                  width:       "clamp(90px,13vw,160px)",
                  aspectRatio: "1 / 1",
                  flexShrink:  0,
                }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width:         "100%",
                    height:        "100%",
                    objectFit:     "contain",
                    display:       "block",
                    userSelect:    "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Drawing area — 4 canvas boxes ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(12px,1.8vw,22px)",
            width:               "100%",
          }}
        >
          {SENTENCES.map((s) => (
            <div
              key={s.id}
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "clamp(6px,0.8vw,10px)",
              }}
            >
              <div
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "clamp(6px,0.8vw,10px)",
                }}
              >
                <span
                  style={{
                    fontSize:       "clamp(12px,1.4vw,18px)",
                    fontWeight:     700,
                    color:          "#fff",
                    background:     BORDER_COLOR,
                    borderRadius:   "50%",
                    width:          "clamp(20px,2.4vw,30px)",
                    height:         "clamp(20px,2.4vw,30px)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize:   "clamp(12px,1.4vw,18px)",
                    fontWeight: 500,
                    color:      "#555",
                    lineHeight: 1.2,
                  }}
                >
                  {s.before} {s.after}
                </span>
              </div>

              <div
                style={{
                  width:        "100%",
                  aspectRatio:  "2 / 1",
                  border:       `2px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  overflow:     "hidden",
                  background:   "#fff",
                  position:     "relative",
                  boxSizing:    "border-box",
                }}
              >
                <DrawCanvas
                  width={600}
                  height={300}
                  tool={tool}
                  color={color}
                  size={size}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons — Start Again only */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}