import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/9.svg";
import img3 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/10.svg";

const COLORS = [
  "#111827",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#ffffff",
];

const SIZES = [2, 4, 8, 12];

const ITEMS = [
  {
    id: 1,
    img: img1,
    width: 320,
    height: 250,
    text: [
      "My grandfather had a small, old house.",
      "It had a red roof and two tall chimneys.",
      "It had little windows and a big green door.",
    ],
  },
  {
    id: 2,
    img: img2,
    width: 320,
    height: 250,
    text: [
      "Grandpa had a pretty garden, too.",
      "There was a swing in the tree.",
      "There were lots of pink and yellow flowers.",
    ],
  },
  {
    id: 3,
    img: img3,
    width: 320,
    height: 220,
    text: [
      "Grandpa had a car. It was very old, slow, and noisy,",
      "but it was beautiful. It was red and black.",
    ],
  },
];

export default function WB_Unit8_Page48_QH() {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#ef4444");
  const [size, setSize] = useState(4);
  const [selectedCanvas, setSelectedCanvas] = useState(1);
  const [textValue, setTextValue] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRefs = useRef({});
  const ctxRefs = useRef({});
  const imageRefs = useRef({});
  const lastPos = useRef({});

  useEffect(() => {
    ITEMS.forEach((item) => {
      const canvas = canvasRefs.current[item.id];
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRefs.current[item.id] = ctx;

      loadImageToCanvas(item.id, item.img, item.width, item.height);
    });
  }, []);

  const loadImageToCanvas = (id, src, width, height) => {
    const canvas = canvasRefs.current[id];
    const ctx = ctxRefs.current[id];
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      imageRefs.current[id] = img;
    };
  };

  const clearCanvas = (id) => {
    const item = ITEMS.find((x) => x.id === id);
    if (!item) return;
    loadImageToCanvas(id, item.img, item.width, item.height);
  };

  const clearAllCanvases = () => {
    ITEMS.forEach((item) => {
      loadImageToCanvas(item.id, item.img, item.width, item.height);
    });
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e, id) => {
    e.preventDefault();
    setSelectedCanvas(id);

    const canvas = canvasRefs.current[id];
    const ctx = ctxRefs.current[id];
    if (!canvas || !ctx) return;

    if (tool === "fill") {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      return;
    }

    if (tool === "text") {
      if (!textValue.trim()) {
        ValidationAlert.info("Please type text first.");
        return;
      }

      const pos = getPos(e, canvas);
      ctx.fillStyle = color;
      ctx.font = "18px Arial";
      ctx.textBaseline = "top";
      ctx.fillText(textValue, pos.x, pos.y);
      return;
    }

    const pos = getPos(e, canvas);
    lastPos.current[id] = pos;
    setIsDrawing(true);

    ctx.beginPath();
    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 2.5 : size) / 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.fill();
  };

  const draw = (e, id) => {
    e.preventDefault();

    if (!isDrawing || selectedCanvas !== id) return;

    const canvas = canvasRefs.current[id];
    const ctx = ctxRefs.current[id];
    if (!canvas || !ctx) return;

    if (tool !== "pencil" && tool !== "eraser") return;

    const pos = getPos(e, canvas);
    const prev = lastPos.current[id];
    if (!prev) return;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 3 : size;
    ctx.stroke();

    lastPos.current[id] = pos;
  };

  const stopDrawing = (e, id) => {
    e?.preventDefault?.();
    setIsDrawing(false);
    lastPos.current[id] = null;
  };

  const handleCheck = () => {
    ValidationAlert.success("Great! Check your drawing and coloring.");
  };

  const getCursor = () => {
    if (tool === "eraser") return "cell";
    if (tool === "text") return "text";
    return "crosshair";
  };

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
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">H</span>
          Read, draw, and color.
        </h1>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "12px 14px",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            backgroundColor: "#f9fafb",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {[
            { id: "pencil", label: "✏️ Draw" },
            { id: "eraser", label: "🧽 Erase" },
            { id: "fill", label: "🪣 Fill" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTool(item.id)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border:
                  tool === item.id
                    ? "2px solid #3b82f6"
                    : "2px solid #d1d5db",
                backgroundColor: tool === item.id ? "#eff6ff" : "#fff",
                color: tool === item.id ? "#1d4ed8" : "#374151",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}

          <div
            style={{
              width: "1px",
              height: "28px",
              backgroundColor: "#d1d5db",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border:
                    color === c ? "3px solid #111827" : "2px solid #d1d5db",
                  backgroundColor: c,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              backgroundColor: "#d1d5db",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border:
                    size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    width: `${Math.min(s * 2, 16)}px`,
                    height: `${Math.min(s * 2, 16)}px`,
                    borderRadius: "50%",
                    backgroundColor: "#111827",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>



          <button
            onClick={() => clearCanvas(selectedCanvas)}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "2px solid #fca5a5",
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Clear Selected
          </button>

          <button
            onClick={clearAllCanvases}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "2px solid #fecaca",
              backgroundColor: "#fff",
              color: "#b91c1c",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Clear All
          </button>
        </div>

        {/* Sections */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "22px",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {/* image + canvas */}
              <div
                style={{
                  position: "relative",
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  flexShrink: 0,
                  border:
                    selectedCanvas === item.id
                      ? "3px solid #f59e0b"
                      : "2px solid #e5e7eb",
                  borderRadius: "14px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
                onClick={() => setSelectedCanvas(item.id)}
              >
                <canvas
                  ref={(el) => {
                    if (el) canvasRefs.current[item.id] = el;
                  }}
                  width={item.width}
                  height={item.height}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    cursor: getCursor(),
                    touchAction: "none",
                  }}
                  onMouseDown={(e) => startDrawing(e, item.id)}
                  onMouseMove={(e) => draw(e, item.id)}
                  onMouseUp={(e) => stopDrawing(e, item.id)}
                  onMouseLeave={(e) => stopDrawing(e, item.id)}
                  onTouchStart={(e) => startDrawing(e, item.id)}
                  onTouchMove={(e) => draw(e, item.id)}
                  onTouchEnd={(e) => stopDrawing(e, item.id)}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "6px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "1px solid #111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "700",
                    zIndex: 2,
                  }}
                >
                  {item.id}
                </div>
              </div>

              {/* text */}
              <div
                style={{
                  flex: "1 1 420px",
                  minWidth: "280px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                {item.text.map((line, index) => (
                  <p
                    key={index}
                    style={{
                      margin: 0,
                      fontSize: "19px",
                      lineHeight: "1.45",
                      color: "#222",
                      fontWeight: index === 0 ? "600" : "500",
                    }}
                  >
                    {index === 0 ? (
                      <>
                        <span style={{ fontWeight: "700", marginRight: "8px" }}>
                          {item.id}
                        </span>
                        {line}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={clearAllCanvases}
          />
        </div>
      </div>
    </div>
  );
}