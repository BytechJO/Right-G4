import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgRoom from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/1.svg"
const INSTRUCTIONS = [
  { num: 1, text: "I can see the flowers in the vase." },
  { num: 2, text: "I can see the ball near the table." },
  { num: 3, text: "I can see the book under the table." },
  { num: 4, text: "I can see the cat on the sofa." },
  { num: 5, text: "I can see the picture next to the window." },
];

const COLORS = [
  "#1e293b", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#3b82f6", "#a855f7", "#ec4899",
  "#ffffff", "#92400e",
];

const SIZES = [2, 4, 8, 14];

export default function WB_Unit7_Page42_DrawColor() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil"); // pencil | eraser | fill
  const [color, setColor] = useState("#ef4444");
  const [size, setSize] = useState(4);
  const lastPos = useRef(null);
  const imgRef = useRef(null);

  // تحميل الصورة على الـ canvas
  const loadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgRoom;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      imgRef.current = img;
    };
  };

  useEffect(() => { loadImage(); }, []);

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
    const pos = getPos(e, canvas);
    lastPos.current = pos;
    setIsDrawing(true);

    // نقطة واحدة عند الكليك
    if (tool === "pencil" || tool === "eraser") {
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, (tool === "eraser" ? size * 3 : size) / 2, 0, Math.PI * 2);
      ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.fill();
    }
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    if (tool === "pencil" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = tool === "eraser" ? size * 3 : size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    lastPos.current = pos;
  };

  const stopDrawing = (e) => {
    e?.preventDefault();
    setIsDrawing(false);
    lastPos.current = null;
  };

  const handleClear = () => { loadImage(); };
  const handleCheck = () => { ValidationAlert.success("Great drawing and coloring! 🎨"); };

  const getCursor = () => {
    if (tool === "eraser") return "cell";
    return "crosshair";
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>

        {/* العنوان */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span>Read, draw, and color.
        </h1>

        {/* التعليمات */}
        <div className="flex flex-col gap-1.5 mb-1">
          {INSTRUCTIONS.map((inst) => (
            <p key={inst.num} className="text-gray-700 text-sm">
              <span className="font-bold text-gray-500 mr-2">{inst.num}</span>
              {inst.text}
            </p>
          ))}
        </div>

        {/* شريط الأدوات */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">

          {/* الأدوات */}
          <div className="flex gap-2">
            {[
              { id: "pencil", label: "✏️ Draw" },
              { id: "eraser", label: "🧹 Erase" },
            ].map((t) => (
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

          <div className="w-px h-6 bg-gray-200" />

          {/* الألوان */}
          <div className="flex gap-1.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setTool("pencil"); }}
                className={`w-7 h-7 rounded-full border-2 transition-all flex-shrink-0
                  ${color === c && tool === "pencil"
                    ? "border-gray-700 scale-110 shadow"
                    : "border-gray-300 hover:scale-105"
                  }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* حجم الفرشاة */}
          <div className="flex items-center gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex items-center justify-center rounded-full border-2 bg-white transition-all
                  ${size === s ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                style={{ width: 30, height: 30 }}
              >
                <span
                  className="rounded-full bg-gray-700"
                  style={{ width: Math.min(s * 2.2, 22), height: Math.min(s * 2.2, 22) }}
                />
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* مسح الكل */}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl text-sm font-medium border-2 border-red-200 bg-red-50 text-red-500 hover:border-red-400 transition-all"
          >
            🗑️ Clear all
          </button>
        </div>

        {/* الـ Canvas */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm"
          style={{ cursor: getCursor() }}
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={620}
            className="w-full h-auto touch-none block"
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