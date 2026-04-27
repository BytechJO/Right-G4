import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — غيّر المسارات حسب مشروعك
//  char = صورة الشخصية  |  scene = صورة النشاط
// ─────────────────────────────────────────────
import jakeChar    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 5.svg";
import jakeScene   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 6.svg";
import rosieChar   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 11.svg";
import rosieScene  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 12.svg";
import natalieChar  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 7.svg";
import natalieScene from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 8.svg";
import hanselChar  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 13.svg";
import hanselScene from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 14.svg";
import kevinChar   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 9.svg";
import kevinScene  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 10.svg";
import lillyChar   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 15.svg";
import lillyScene  from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U1 Folder/Page 7/SVG/Asset 16.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS — كلها قابلة للتعديل
// ─────────────────────────────────────────────
const TABLE_BORDER_COLOR  = "#2096a6";   // بوردر الجدول
const DOT_DEFAULT_COLOR   = "#2096a6";   // لون النقطة العادية
const DOT_SELECTED_COLOR  = "#2096a6";   // لون النقطة المحددة
const LINE_COLOR          = "#2096a6";   // لون خط الوصل
const WRONG_LINE_COLOR    = "#ef4444";   // لون خط الوصل الغلط
const SENTENCE_COLOR      = "#2b2b2b";   // لون نص الجمل
const NUMBER_COLOR        = "#2b2b2b";   // لون الأرقام
const WRONG_BADGE_BG      = "#ef4444";   // خلفية badge الخطأ
const WRONG_BADGE_TEXT    = "#ffffff";   // نص badge الخطأ

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// الجدول فوق — 3 rows × 2 cols
const TABLE_ROWS = [
  [
    { name: "Jake",    char: jakeChar,    scene: jakeScene    },
    { name: "Rosie",   char: rosieChar,   scene: rosieScene   },
  ],
  [
    { name: "Natalie", char: natalieChar,  scene: natalieScene },
    { name: "Hansel",  char: hanselChar,  scene: hanselScene  },
  ],
  [
    { name: "Kevin",   char: kevinChar,   scene: kevinScene   },
    { name: "Lilly",   char: lillyChar,   scene: lillyScene   },
  ],
];

// اليسار — الشخصيات
const LEFT_ITEMS = [
  { id: 1, label: "Natalie will" },
  { id: 2, label: "Hansel will"  },
  { id: 3, label: "Lilly will"   },
  { id: 4, label: "Jake will"    },
  { id: 5, label: "Kevin will"   },
  { id: 6, label: "Rosie will"   },
];

// اليمين — الأنشطة (مرتبة بشكل مختلف عن اليسار)
const RIGHT_ITEMS = [
  { id: 1, label: "go to the playground." },
  { id: 2, label: "watch a movie."        },
  { id: 3, label: "shop at the mall."     },
  { id: 4, label: "go to the lake."       },
  { id: 5, label: "ride a horse."         },
  { id: 6, label: "eat at a restaurant."  },
];

// الإجابات الصحيحة: leftId → rightId
const CORRECT_MATCHES = {
  1: 4,   // Natalie will → go to the lake
  2: 6,   // Hansel will  → watch a movie
  3: 3,   // Lilly will   → shop at the mall
  4: 5,   // Jake will    → ride a horse
  5: 1,   // Kevin will   → go to the playground
  6: 2,   // Rosie will   → eat at a restaurant
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadMatch_QJ() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [lines,        setLines]        = useState([]);

  const containerRef = useRef(null);
  const dotRefs      = useRef({});

  const isLocked =  showAns;

  // ── SVG lines ─────────────────────────────
  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const newLines = Object.entries(matches).map(([lid, rid]) => {
        const lEl = dotRefs.current[`left-${lid}`];
        const rEl = dotRefs.current[`right-${rid}`];
        if (!lEl || !rEl) return null;
        const lr = lEl.getBoundingClientRect();
        const rr = rEl.getBoundingClientRect();
        return {
          id:     `${lid}-${rid}`,
          leftId: Number(lid),
          rightId: Number(rid),
          x1: lr.left + lr.width / 2 - cr.left,
          y1: lr.top  + lr.height / 2 - cr.top,
          x2: rr.left + rr.width / 2 - cr.left,
          y2: rr.top  + rr.height / 2 - cr.top,
        };
      }).filter(Boolean);
      setLines(newLines);
    };
    const raf = () => requestAnimationFrame(update);
    raf();
    window.addEventListener("resize", raf);
    return () => window.removeEventListener("resize", raf);
  }, [matches]);

  // ── handlers ──────────────────────────────
  const handleLeftClick = (id) => {
    if (isLocked) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (rid) => {
    if (isLocked || selectedLeft === null) return;
    const updated = { ...matches };
    // أزل أي وصل قديم لنفس اليمين
    Object.keys(updated).forEach((k) => { if (updated[k] === rid) delete updated[k]; });
    updated[selectedLeft] = rid;
    setMatches(updated);
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    if (isLocked) return;
    if (Object.keys(matches).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((l) => {
      if (matches[l.id] === CORRECT_MATCHES[l.id]) score++;
    });
    setShowResults(true);
    if (score === LEFT_ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else if (score > 0)                ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else                               ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  // ── helpers ───────────────────────────────
  const isWrongLine = (leftId) => {
    if (!showResults || showAns) return false;
    return matches[leftId] !== CORRECT_MATCHES[leftId];
  };

  const isDotConnectedLeft  = (id) => !!matches[id];
  const isDotConnectedRight = (id) => Object.values(matches).includes(id);
  const isSelectedLeft      = (id) => selectedLeft === id;

  const dotColor = (connected, selected) =>
    selected ? DOT_SELECTED_COLOR : connected ? DOT_SELECTED_COLOR : "#c0c0c0";

  // ── render ────────────────────────────────
  return (
    <div className="main-container-component">
      <style>{`
        /* ── Table ── */
        .lrm-table {
          width: 100%;
          border: 2px solid ${TABLE_BORDER_COLOR};
          border-radius: 12px;
          overflow: hidden;
          box-sizing: border-box;
        }
        .lrm-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 2px solid ${TABLE_BORDER_COLOR};
        }
        .lrm-table-row:last-child { border-bottom: none; }

        .lrm-table-cell {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          padding: clamp(6px, 1vw, 12px) clamp(8px, 1.4vw, 16px);
          box-sizing: border-box;
        }
        .lrm-table-cell:first-child {
          border-right: 2px solid ${TABLE_BORDER_COLOR};
        }

        .lrm-char-img {
          width: clamp(36px, 5.5vw, 60px);
          height: clamp(36px, 5.5vw, 60px);
          object-fit: contain;
          flex-shrink: 0;
        }
        .lrm-char-name {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: #2b2b2b;
          white-space: nowrap;
        }
        .lrm-scene-img {
          width: clamp(80px, 13vw, 160px);
          height: clamp(55px, 9vw, 110px);
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* ── Matching area ── */
        .lrm-match {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0,1fr) clamp(20px,2.5vw,28px) clamp(20px,2.5vw,28px) minmax(0,1fr);
          gap: 0 clamp(30px,5vw,80px);
          width: 100%;
        }

        /* Left column */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
        }

        /* Right column */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
        }

        /* ── Left row: num + label + dot ── */
        .lrm-left-item {
          display: flex;
          align-items: center;
          min-height: clamp(38px, 5vw, 52px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 4px 4px 0;
          position: relative;
        }
        .lrm-left-item--selected {
          background: rgba(32,150,166,0.08);
          outline: 2px solid #2096a6;
        }
        .lrm-left-item .lrm-num   { flex-shrink: 0; margin-right: clamp(6px,1vw,10px); }
        /* label يأخذ كل المساحة → النقطة تضطر تروح آخر اليمين */
        .lrm-left-item .lrm-label { flex: 1 1 auto; }
        /* النقطة في آخر الـ flex */
        .lrm-left-item .lrm-dot   { flex-shrink: 0; margin-left: clamp(6px,1vw,10px); }

        /* ── Right row: dot + label ── */
        .lrm-right-item {
          display: flex;
          align-items: center;
          min-height: clamp(38px, 5vw, 52px);
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          padding: 4px 0 4px 4px;
        }
        .lrm-right-item--connected {
          background: rgba(32,150,166,0.06);
        }
        .lrm-right-item .lrm-label { flex: 1 1 auto; }

        .lrm-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          min-width: clamp(14px, 1.8vw, 22px);
        }

        .lrm-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        /* ── Base dot ── */
        .lrm-dot {
          width: clamp(11px, 1.4vw, 15px);
          height: clamp(11px, 1.4vw, 15px);
          border-radius: 50%;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .lrm-dot--selected {
          box-shadow: 0 0 0 4px rgba(32,150,166,0.2);
        }
        /* ── Left dot — يمكن تتحكم فيه بشكل مستقل ── */
        .lrm-dot--left {margin-left : -400%
                }
        /* ── Right dot — يمكن تتحكم فيه بشكل مستقل ── */
        .lrm-dot--right {
        margin-left : 400%}

        /* ── Dot column — عمود مستقل للنقاط ── */
        .lrm-dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          z-index: 2;
        }
        /* كل نقطة بنفس ارتفاع الجملة */
        .lrm-dot-row {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(38px, 5vw, 52px);
          width: 100%;
          cursor: pointer;
        }

        /* ── Wrong badge — على الجملة مش النقطة ── */
        .lrm-badge {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: clamp(18px,2.5vw,28px); /* يكون فوق النقطة تقريباً */
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        /* buttons */
        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        /* hide lines on small screens */
        @media (max-width: 580px) {
          .lrm-svg { display: none; }
          .lrm-match {
            grid-template-columns: minmax(0,1fr) 24px 24px minmax(0,1fr);
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 24px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">J</span>
          Look, read, and match.
        </h1>

        {/* ── Table ── */}
        <div className="lrm-table">
          {TABLE_ROWS.map((row, ri) => (
            <div key={ri} className="lrm-table-row">
              {row.map((cell) => (
                <div key={cell.name} className="lrm-table-cell">
                  <img src={cell.char}  alt={cell.name} className="lrm-char-img" />
                  <span className="lrm-char-name">{cell.name}</span>
                  <img src={cell.scene} alt={`${cell.name}-scene`} className="lrm-scene-img" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Matching ── */}
        <div ref={containerRef} className="lrm-match">

          {/* SVG lines */}
          <svg
            className="lrm-svg"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              pointerEvents: "none", overflow: "visible", zIndex: 1,
            }}
          >
            {lines.map((line) => {
              const mx = (line.x1 + line.x2) / 2;
              const my = (line.y1 + line.y2) / 2 - Math.abs(line.y2 - line.y1) * 0.3;
              const d  = `M ${line.x1} ${line.y1} Q ${mx} ${my} ${line.x2} ${line.y2}`;
              return (
                <path
                  key={line.id}
                  d={d}
                  stroke={isWrongLine(line.leftId) ? WRONG_LINE_COLOR : LINE_COLOR}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* col 1: نص يسار */}
          <div className="lrm-left-col">
            {LEFT_ITEMS.map((item) => {
              const wrong    = isWrongLine(item.id);
              const selected = isSelectedLeft(item.id);
              return (
                <div
                  key={item.id}
                  className={`lrm-left-item ${selected ? "lrm-left-item--selected" : ""}`}
                  onClick={() => handleLeftClick(item.id)}
                  style={{ cursor: isLocked ? "default" : "pointer" }}
                >
                  <span className="lrm-num">{item.id}</span>
                  <span className="lrm-label">{item.label}</span>
                  {wrong && <div className="lrm-badge">✕</div>}
                </div>
              );
            })}
          </div>

          {/* col 2: نقطة يسار — مستقلة تماماً */}
          <div className="lrm-dot-col">
            {LEFT_ITEMS.map((item) => {
              const selected  = isSelectedLeft(item.id);
              const connected = isDotConnectedLeft(item.id);
              return (
                <div key={item.id} className="lrm-dot-row">
                  <div
                    ref={(el) => (dotRefs.current[`left-${item.id}`] = el)}
                    className={`lrm-dot lrm-dot--left ${selected ? "lrm-dot--selected" : ""}`}
                    style={{ backgroundColor: dotColor(connected, selected) }}
                    onClick={() => handleLeftClick(item.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* col 3: نقطة يمين — مستقلة تماماً */}
          <div className="lrm-dot-col">
            {RIGHT_ITEMS.map((item) => {
              const connected = isDotConnectedRight(item.id);
              return (
                <div key={item.id} className="lrm-dot-row">
                  <div
                    ref={(el) => (dotRefs.current[`right-${item.id}`] = el)}
                    className="lrm-dot lrm-dot--right"
                    style={{ backgroundColor: dotColor(connected, false) }}
                    onClick={() => handleRightClick(item.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* col 4: نص يمين */}
          <div className="lrm-right-col">
            {RIGHT_ITEMS.map((item) => {
              const connected = isDotConnectedRight(item.id);
              return (
                <div
                  key={item.id}
                  className={`lrm-right-item ${connected ? "lrm-right-item--connected" : ""}`}
                  onClick={() => handleRightClick(item.id)}
                  style={{ cursor: isLocked || selectedLeft === null ? "default" : "pointer" }}
                >
                  <span className="lrm-label">{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}