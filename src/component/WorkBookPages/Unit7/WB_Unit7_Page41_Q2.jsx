import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ✅ استبدل هذا المسار بمسار صورة الشجرة عندك
import imgTree from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 41/SVG/2.svg";

const INSTRUCTIONS = [
  "Draw a nest in the tree.",
  "Draw a box next to the tree.",
  "Draw a cat between the flowers.",
];

// أدوات الرسم
const TOOLS = [
  { id: "pencil", label: "✏️ Pencil" },
  { id: "eraser", label: "🧹 Eraser" },
];

const COLORS = ["#1e293b", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];
const SIZES = [2, 4, 7, 12];

export default function WB_Unit7_Page41_Draw() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1e293b");
  const [size, setSize] = useState(4);
  const lastPos = useRef(null);

  // ارسم الصورة على الـ canvas عند التحميل
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgTree;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

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

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    lastPos.current = getPos(e, canvas);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 4 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDrawing = (e) => {
    e?.preventDefault();
    setIsDrawing(false);
    lastPos.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // أعد رسم الصورة
    const img = new Image();
    img.src = imgTree;
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const handleCheck = () => {
    ValidationAlert.success("Great drawing! 🎨");
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>

        {/* العنوان */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span>Read and draw.
        </h1>

        {/* التعليمات */}
        <div className="flex flex-col gap-1 mb-2">
          {INSTRUCTIONS.map((inst, i) => (
            <p key={i} className="text-gray-700 text-sm font-medium">
              • {inst}
            </p>
          ))}
        </div>

        {/* شريط الأدوات */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3">

          {/* أدوات */}
          <div className="flex gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all
                  ${tool === t.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* فاصل */}
          <div className="w-px h-6 bg-gray-200" />

          {/* الألوان */}
          <div className="flex gap-1.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setTool("pencil"); }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  color === c && tool === "pencil" ? "border-gray-700 scale-110" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* فاصل */}
          <div className="w-px h-6 bg-gray-200" />

          {/* حجم الفرشاة */}
          <div className="flex items-center gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex items-center justify-center rounded-full border-2 transition-all bg-white
                  ${size === s ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                style={{ width: 28, height: 28 }}
              >
                <span
                  className="rounded-full bg-gray-700"
                  style={{ width: Math.min(s * 2, 20), height: Math.min(s * 2, 20) }}
                />
              </button>
            ))}
          </div>

          {/* فاصل */}
          <div className="w-px h-6 bg-gray-200" />

          {/* مسح الكل */}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl text-sm font-medium border-2 border-red-200 bg-red-50 text-red-500 hover:border-red-400 transition-all"
          >
            🗑️ Clear
          </button>
        </div>

        {/* الـ Canvas */}
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-gray-200 bg-white"
          style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-auto touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleClear}
          />
        </div>

      </div>
    </div>
  );
}