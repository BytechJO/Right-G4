import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const TABLE_BORDER = "#f39b42";
const FILLED_COLOR = "#000000ff";

const DRAG_ITEMS = [
  { id: 1,  value: "cake"  },
  { id: 2,  value: "Ted"   },
  { id: 3,  value: "night" },
  { id: 4,  value: "coat"  },
  { id: 5,  value: "blue"  },
  { id: 6,  value: "glue"  },
  { id: 7,  value: "ant"   },
  { id: 8,  value: "feet"  },
  { id: 9,  value: "cat"   },
  { id: 10, value: "sick"  },
  { id: 11, value: "box"   },
  { id: 12, value: "bee"   },
  { id: 13, value: "fish"  },
  { id: 14, value: "cup"   },
  { id: 15, value: "kite"  },
  { id: 16, value: "rain"  },
  { id: 17, value: "home"  },
  { id: 18, value: "bed"   },
  { id: 19, value: "run"   },
  { id: 20, value: "sock"  },
];

const GROUPS = [
  {
    id: "long",
    title: ["long a", "long e", "long i", "long o", "long u"],
    rows: [
      [
        { key: "long-a-1", correct: "cake"  },
        { key: "long-e-1", correct: "bee"   },
        { key: "long-i-1", correct: "night" },
        { key: "long-o-1", correct: "coat"  },
        { key: "long-u-1", correct: "blue"  },
      ],
      [
        { key: "long-a-2", correct: "rain"  },
        { key: "long-e-2", correct: "feet"  },
        { key: "long-i-2", correct: "kite"  },
        { key: "long-o-2", correct: "home"  },
        { key: "long-u-2", correct: "glue"  },
      ],
    ],
  },
  {
    id: "short",
    title: ["short a", "short e", "short i", "short o", "short u"],
    rows: [
      [
        { key: "short-a-1", correct: "ant"  },
        { key: "short-e-1", correct: "Ted"  },
        { key: "short-i-1", correct: "fish" },
        { key: "short-o-1", correct: "box"  },
        { key: "short-u-1", correct: "cup"  },
      ],
      [
        { key: "short-a-2", correct: "cat"  },
        { key: "short-e-2", correct: "bed"  },
        { key: "short-i-2", correct: "sick" },
        { key: "short-o-2", correct: "sock" },
        { key: "short-u-2", correct: "run"  },
      ],
    ],
  },
];

// جميع الخلايا في قائمة واحدة للاستخدام في الفحص
const ALL_CELLS = GROUPS.flatMap((g) => g.rows.flatMap((r) => r));

export default function WB_Vocabulary_Page_A() {
  const [answers,     setAnswers]     = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [touchItem,   setTouchItem]   = useState(null);
  const [touchPos,    setTouchPos]    = useState({ x: 0, y: 0 });
  const [showResults, setShowResults] = useState(false);
  // ✅ FIX: نفصل showAns عن showResults تماماً
  const [showAns,     setShowAns]     = useState(false);

  const dropRefs = useRef({});

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const newAnswers = { ...answers };
    // أزل نفس العنصر من أي خانة أخرى
    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) delete newAnswers[key];
    });
    newAnswers[boxKey] = { dragId: item.id, value: item.value };
    setAnswers(newAnswers);
    setShowResults(false);
  };

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;
    applyDrop(boxKey, draggedItem);
    setDraggedItem(null);
  };

  const handleTouchStart = (e, item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    const touch = e.touches[0];
    setTouchItem(item);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchItem) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchItem) return;
    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      if (
        touchPos.x >= rect.left && touchPos.x <= rect.right &&
        touchPos.y >= rect.top  && touchPos.y <= rect.bottom
      ) applyDrop(key, touchItem);
    });
    setTouchItem(null);
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_CELLS.every((cell) => answers[cell.key]?.value);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ALL_CELLS.forEach((cell) => {
      if (answers[cell.key]?.value === cell.correct) score++;
    });
    setShowResults(true);
    const total = ALL_CELLS.length;
    if (score === total)    ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)     ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                    ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  // ✅ FIX: نبني الإجابات الصحيحة مباشرة من ALL_CELLS بدون البحث في DRAG_ITEMS
  // هذا يضمن أن كل خانة تحصل على القيمة الصحيحة بالضبط
  const handleShowAnswer = () => {
    const correct = {};
    ALL_CELLS.forEach((cell) => {
      const matched = DRAG_ITEMS.find((d) => d.value === cell.correct);
      correct[cell.key] = {
        // ✅ إذا ما وُجد العنصر في DRAG_ITEMS نستخدم الـ key كـ dragId مؤقت
        dragId: matched ? matched.id : `auto-${cell.key}`,
        value:  cell.correct,
      };
    });
    setAnswers(correct);
    // ✅ FIX: نضع showAns=true أولاً ثم showResults=false
    // لأن isWrong تتحقق من showResults فقط، وعند showAns=true لا نريد أي علامة خطأ
    setShowAns(true);
    setShowResults(false); // ← لا نشغّل منطق الأخطاء أبداً عند Show Answer
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setTouchItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  // ✅ FIX: isWrong لا تُشغَّل أبداً عند showAns=true
  const isWrong = (cell) => {
    if (!showResults || showAns) return false;
    return answers[cell.key]?.value !== cell.correct;
  };

  const renderDropBox = (cell) => {
    const wrong = isWrong(cell);
    const value = answers[cell.key]?.value || "";

    return (
      <div
        ref={(el) => (dropRefs.current[cell.key] = el)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(cell.key)}
        onClick={() => handleRemoveAnswer(cell.key)}
        className={`wb-a-drop-box ${value ? "filled" : ""} ${wrong ? "wrong" : ""}`}
      >
        <span className="wb-a-drop-text">{value}</span>
        {wrong && (
          <div className="wb-a-wrong-mark">✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-a-wrap {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-a-word-bank {
          width: 100%;
          border: 2px solid ${BORDER_COLOR};
          border-radius: 16px;
          background: #fff;
          padding: clamp(10px, 1.7vw, 18px);
          box-sizing: border-box;
        }

        .wb-a-word-grid {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          gap: clamp(10px, 1.4vw, 16px) clamp(12px, 1.8vw, 20px);
          align-items: center;
          justify-items: center;
        }

        .wb-a-drag-item {
          min-width: 0;
          width: 100%;
          text-align: center;
          padding: 6px 4px;
          border-radius: 12px;
          border: 1.5px solid transparent;
          color: #222;
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 500;
          line-height: 1.1;
          user-select: none;
          cursor: grab;
          transition: 0.2s ease;
          box-sizing: border-box;
          touch-action: none;
        }

        .wb-a-drag-item.available { background: transparent; }

        .wb-a-drag-item.used {
          opacity: 0.35;
          color: #999;
          cursor: not-allowed;
        }

        .wb-a-drag-item.touching {
          border-color: ${ACTIVE_COLOR};
          background: ${SOFT_COLOR};
        }

        .wb-a-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wb-a-head-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0;
          padding: 0 0 2px 0;
        }

        .wb-a-head-cell {
          text-align: center;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          color: #111;
          line-height: 1.2;
          padding-bottom: 4px;
        }

        .wb-a-table {
          width: 100%;
          border: 2px solid ${TABLE_BORDER};
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }

        .wb-a-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .wb-a-row + .wb-a-row { border-top: 2px solid ${TABLE_BORDER}; }

        .wb-a-cell {
          min-height: clamp(52px, 7vw, 78px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          box-sizing: border-box;
          position: relative;
          background: #fff;
        }

        .wb-a-cell + .wb-a-cell { border-left: 2px solid ${TABLE_BORDER}; }

        .wb-a-drop-box {
          width: 100%;
          min-height: clamp(40px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 10px;
          padding: 4px 8px;
          box-sizing: border-box;
          cursor: default;
          transition: 0.2s ease;
        }

        .wb-a-drop-box.filled  { cursor: pointer; }
        .wb-a-drop-box.wrong   { background: rgba(239, 68, 68, 0.06); }

        .wb-a-drop-text {
          font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 500;
          line-height: 1.1;
          text-align: center;
          color: ${FILLED_COLOR};
          word-break: break-word;
        }

        .wb-a-wrong-mark {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        .wb-a-buttons {
          margin-top: 6px;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 980px) {
          .wb-a-word-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        }
        @media (max-width: 700px) {
          .wb-a-word-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .wb-a-word-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .wb-a-head-cell { font-size: 16px; }
          .wb-a-cell      { min-height: 48px; padding: 4px; }
          .wb-a-drop-text { font-size: 16px; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display:"flex", flexDirection:"column", gap:"18px", maxWidth:"1100px", margin:"0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}
        >
          <span className="WB-ex-A">A</span>
          Read and fill in the charts.
        </h1>

        {/* Word Bank */}
        <div className="wb-a-word-bank">
          <div className="wb-a-word-grid">
            {DRAG_ITEMS.map((item) => {
              const isUsed    = usedDragIds.includes(item.id);
              const isTouching = touchItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  draggable={!isUsed && !showAns}
                  onDragStart={() => handleDragStart(item)}
                  onTouchStart={(e) => handleTouchStart(e, item)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`wb-a-drag-item ${isUsed || showAns ? "used" : "available"} ${isTouching ? "touching" : ""}`}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>

        {/* Groups */}
        {GROUPS.map((group) => (
          <div key={group.id} className="wb-a-section">
            <div className="wb-a-head-row">
              {group.title.map((title) => (
                <div key={title} className="wb-a-head-cell">{title}</div>
              ))}
            </div>
            <div className="wb-a-table">
              {group.rows.map((row, rowIndex) => (
                <div key={`${group.id}-${rowIndex}`} className="wb-a-row">
                  {row.map((cell) => (
                    <div key={cell.key} className="wb-a-cell">
                      {renderDropBox(cell)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="wb-a-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>

      {/* Touch ghost */}
      {touchItem && (
        <div style={{
          position:     "fixed",
          left:         touchPos.x - 40,
          top:          touchPos.y - 20,
          background:   "#fff",
          padding:      "8px 12px",
          borderRadius: "10px",
          boxShadow:    "0 4px 10px rgba(0,0,0,0.2)",
          pointerEvents:"none",
          zIndex:       9999,
          fontSize:     "18px",
          fontWeight:   600,
          color:        "#222",
          border:       `1.5px solid ${ACTIVE_COLOR}`,
        }}>
          {touchItem.value}
        </div>
      )}
    </div>
  );
}