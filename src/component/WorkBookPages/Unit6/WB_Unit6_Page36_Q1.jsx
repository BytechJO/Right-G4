import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const INSTRUCTIONS = [
  "1. Draw a face in the first square and an umbrella in the fifth square.",
  "2. Color the second square green and the eighth square red.",
  "3. Write your name in the third square and your friend's name in the tenth square.",
  "4. Draw the sun in the ninth square and the moon in the fourth square.",
  "5. Draw a triangle in the seventh square and a star in the twelfth square.",
  "6. Write your birthday in the sixth square and your friend's birthday in the eleventh square.",
];

const COLORS = [
  "#111827",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#ec4899",
  "#ffffff",
];

const SIZES = [2, 4, 8, 12];

const BOX_SIZE = 110;

const BOX_LAYOUT = [
  { num: 4, row: 1, col: 1 },
  { num: 5, row: 1, col: 2 },
  { num: 6, row: 1, col: 3 },
  { num: 7, row: 1, col: 4 },
  { num: 8, row: 1, col: 5 },
  { num: 9, row: 1, col: 6 },

  { num: 3, row: 2, col: 1 },
  { num: 10, row: 2, col: 6 },

  { num: 2, row: 3, col: 1 },
  { num: 11, row: 3, col: 6 },

  { num: 1, row: 4, col: 1 },
  { num: 12, row: 4, col: 6 },
];

export default function WB_Unit6_Page36_QG() {
  const [tool, setTool] = useState("pencil"); // pencil | eraser | fill | text
  const [color, setColor] = useState("#ef4444");
  const [size, setSize] = useState(4);
  const [selectedBox, setSelectedBox] = useState(1);
  const [textValue, setTextValue] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRefs = useRef({});
  const ctxRefs = useRef({});
  const lastPos = useRef({});

  useEffect(() => {
    BOX_LAYOUT.forEach(({ num }) => {
      const canvas = canvasRefs.current[num];
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctxRefs.current[num] = ctx;

      clearCanvas(num);
    });
  }, []);

  const clearCanvas = (num) => {
    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const clearAllCanvases = () => {
    BOX_LAYOUT.forEach(({ num }) => clearCanvas(num));
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
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

  const startDrawing = (e, num) => {
    e.preventDefault();
    setSelectedBox(num);

    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];
    if (!canvas || !ctx) return;

    if (tool === "fill") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (tool === "text") {
      if (!textValue.trim()) {
        ValidationAlert.info("Please type text first.");
        return;
      }

      const pos = getPos(e, canvas);
      ctx.fillStyle = color;
      ctx.font = "16px Arial";
      ctx.textBaseline = "top";
      ctx.fillText(textValue, pos.x, pos.y);
      return;
    }

    const pos = getPos(e, canvas);
    lastPos.current[num] = pos;
    setIsDrawing(true);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, (tool === "eraser" ? size * 2 : size) / 2, 0, Math.PI * 2);
    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.fill();
  };

  const draw = (e, num) => {
    e.preventDefault();
    if (!isDrawing || selectedBox !== num) return;

    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];
    if (!canvas || !ctx) return;

    if (tool !== "pencil" && tool !== "eraser") return;

    const pos = getPos(e, canvas);
    const prev = lastPos.current[num];
    if (!prev) return;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 3 : size;
    ctx.stroke();

    lastPos.current[num] = pos;
  };

  const stopDrawing = (e, num) => {
    e?.preventDefault();
    setIsDrawing(false);
    lastPos.current[num] = null;
  };

  const handleCheck = () => {
    ValidationAlert.success("Done! Please review the drawings and writing.");
  };

  const getCursor = () => {
    if (tool === "eraser") return "cell";
    if (tool === "text") return "text";
    return "crosshair";
  };

  const renderBox = (num) => (
    <div
      key={num}
      onClick={() => setSelectedBox(num)}
      style={{
        position: "relative",
        width: `${BOX_SIZE}px`,
        height: `${BOX_SIZE}px`,
        border: selectedBox === num ? "3px solid #f59e0b" : "2px solid #f59e0b",
        borderRadius: "10px",
        backgroundColor: "#fff",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: selectedBox === num ? "0 0 0 3px rgba(245, 158, 11, 0.15)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: "1px solid #111",
          backgroundColor: "#fff",
          fontSize: "11px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {num}
      </div>

      <canvas
        ref={(el) => {
          if (el) canvasRefs.current[num] = el;
        }}
        width={BOX_SIZE}
        height={BOX_SIZE}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: getCursor(),
          touchAction: "none",
        }}
        onMouseDown={(e) => startDrawing(e, num)}
        onMouseMove={(e) => draw(e, num)}
        onMouseUp={(e) => stopDrawing(e, num)}
        onMouseLeave={(e) => stopDrawing(e, num)}
        onTouchStart={(e) => startDrawing(e, num)}
        onTouchMove={(e) => draw(e, num)}
        onTouchEnd={(e) => stopDrawing(e, num)}
      />
    </div>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "16px" , marginBottom:"70px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span>
          Read and complete.
        </h1>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            background: "#f9fafb",
            
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                  border: tool === item.id ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  background: tool === item.id ? "#eff6ff" : "#fff",
                  color: tool === item.id ? "#1d4ed8" : "#374151",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ width: "1px", height: "28px", background: "#d1d5db" }} />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: color === c ? "3px solid #111827" : "2px solid #d1d5db",
                  background: c,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div style={{ width: "1px", height: "28px", background: "#d1d5db" }} />

          <div style={{ display: "flex", gap: "8px" }}>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  background: "#fff",
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
                    background: "#111827",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>

       

          <button
            onClick={() => clearCanvas(selectedBox)}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "2px solid #fca5a5",
              background: "#fef2f2",
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
              background: "#fff",
              color: "#b91c1c",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Clear All
          </button>
        </div>

        {/* Main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px`,
            gridTemplateRows: `${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px`,
            gap: "0",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {BOX_LAYOUT.map((box) => (
            <div
              key={box.num}
              style={{
                gridColumn: box.col,
                gridRow: box.row,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderBox(box.num)}
            </div>
          ))}

          <div
            style={{
              gridColumn: "2 / 6",
              gridRow: "2 / 5",
              padding: "12px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              fontSize: "18px",
              lineHeight: "1.45",
              color: "#222",
              marginTop:"50px"
            }}
          >
            {INSTRUCTIONS.map((item, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontWeight: "700" }}>{index + 1}</span>
                <p style={{ margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
          <Button checkAnswers={handleCheck} handleStartAgain={clearAllCanvases} />
        </div>
      </div>
    </div>
  );
}