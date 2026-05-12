import React, { useState, useRef, useCallback } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 44/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd1pg20-story-adult-lady_Nf7yHD6t.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const CIRCLE_IDLE      = "#ef4444";          // لون الدائرة لما الطالب يحدد
const CIRCLE_CORRECT   = "#ef4444";          // صح
const CIRCLE_WRONG     = "#ef4444";          // غلط — نفس اللون، بس badge يظهر
const DRAG_HIGHLIGHT   = "rgba(239,68,68,0.13)";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const BULLET_COLOR     = "#2b2b2b";
const LIST_TEXT_COLOR  = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and circle the prepositional phrases." },
  { start: 5.0,  end: 10.0, text: "On Tuesday, I cleaned the house." },
  { start: 10.0, end: 16.0, text: "I packed my old clothes and books into a box." },
  { start: 16.0, end: 22.0, text: "I washed the floors until they shined." },
  { start: 22.0, end: 28.0, text: "I dusted everything in the house." },
  { start: 28.0, end: 34.0, text: "I organized the books in the bookcase." },
  { start: 34.0, end: 42.0, text: "The windows were easy and only needed a little soap and water from a bucket." },
  { start: 42.0, end: 46.0, text: "The house looks great now." },
];

// ─────────────────────────────────────────────
//  📝  WORDS — كل كلمة لها id فريد
//  correctGroup: لو الكلمة جزء من عبارة صحيحة → اسم المجموعة
//                null → عادية
// ─────────────────────────────────────────────
// العبارات الصحيحة:
//  "into a box" | "until they shined" | "in the house" | "in the bookcase" | "from a bucket"

const WORDS = [
  { id: 1,  w: "On",          g: null           },
  { id: 2,  w: "Tuesday,",    g: null           },
  { id: 3,  w: "I",           g: null           },
  { id: 4,  w: "cleaned",     g: null           },
  { id: 5,  w: "the",         g: null           },
  { id: 6,  w: "house.",      g: null           },
  { id: 7,  w: "I",           g: null           },
  { id: 8,  w: "packed",      g: null           },
  { id: 9,  w: "my",          g: null           },
  { id: 10, w: "old",         g: null           },
  { id: 11, w: "clothes",     g: null           },
  { id: 12, w: "and",         g: null           },
  { id: 13, w: "books",       g: null           },
  { id: 14, w: "into",        g: "into_a_box"   },
  { id: 15, w: "a",           g: "into_a_box"   },
  { id: 16, w: "box.",        g: "into_a_box"   },
  { id: 17, w: "I",           g: null           },
  { id: 18, w: "washed",      g: null           },
  { id: 19, w: "the",         g: null           },
  { id: 20, w: "floors",      g: null           },
  { id: 21, w: "until",       g: "until_shined" },
  { id: 22, w: "they",        g: "until_shined" },
  { id: 23, w: "shined.",     g: "until_shined" },
  { id: 24, w: "I",           g: null           },
  { id: 25, w: "dusted",      g: null           },
  { id: 26, w: "everything",  g: null           },
  { id: 27, w: "in",          g: "in_the_house" },
  { id: 28, w: "the",         g: "in_the_house" },
  { id: 29, w: "house.",      g: "in_the_house" },
  { id: 30, w: "I",           g: null           },
  { id: 31, w: "organized",   g: null           },
  { id: 32, w: "the",         g: null           },
  { id: 33, w: "books",       g: null           },
  { id: 34, w: "in",          g: "in_bookcase"  },
  { id: 35, w: "the",         g: "in_bookcase"  },
  { id: 36, w: "bookcase.",   g: "in_bookcase"  },
  { id: 37, w: "The",         g: null           },
  { id: 38, w: "windows",     g: null           },
  { id: 39, w: "were",        g: null           },
  { id: 40, w: "easy",        g: null           },
  { id: 41, w: "and",         g: null           },
  { id: 42, w: "only",        g: null           },
  { id: 43, w: "needed",      g: null           },
  { id: 44, w: "a",           g: null           },
  { id: 45, w: "little",      g: null           },
  { id: 46, w: "soap",        g: null           },
  { id: 47, w: "and",         g: null           },
  { id: 48, w: "water",       g: null           },
  { id: 49, w: "from",        g: "from_bucket"  },
  { id: 50, w: "a",           g: "from_bucket"  },
  { id: 51, w: "bucket.",     g: "from_bucket"  },
  { id: 52, w: "The",         g: null           },
  { id: 53, w: "house",       g: null           },
  { id: 54, w: "looks",       g: null           },
  { id: 55, w: "great",       g: null           },
  { id: 56, w: "now.",        g: null           },
];

// الـ groups الصحيحة
const CORRECT_GROUPS = new Set(["into_a_box","until_shined","in_the_house","in_bookcase","from_bucket"]);

const PHRASE_LIST = [
  "until they shined",
  "from a bucket",
  "into a box",
  "in the bookcase",
  "in the house",
];

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
// لما الطالب يحدد كلمات، احسب أي groups محددة بالكامل
// group محددة = كل كلماتها محددة
const getFullySelectedGroups = (selectedIds) => {
  const groups = {};
  WORDS.forEach((w) => {
    if (!w.g) return;
    if (!groups[w.g]) groups[w.g] = { total: 0, selected: 0 };
    groups[w.g].total++;
    if (selectedIds.has(w.id)) groups[w.g].selected++;
  });
  const full = new Set();
  Object.entries(groups).forEach(([g, { total, selected }]) => {
    if (selected === total) full.add(g);
  });
  return full;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCircle_QC() {
  // selectedIds: كلمات يحددها الطالب بالسحب
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const dragging = useRef(false);

  const isLocked = showResults || showAns;

  // ── Drag ──
  const addWord = useCallback((id) => {
    if (!id || isLocked) return;
    setSelectedIds((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  }, [isLocked]);

  const getIdFromEl = (el) => {
    if (!el) return null;
    const wid = el.dataset?.wordId;
    return wid ? parseInt(wid) : null;
  };

  const handleMouseDown = useCallback((e) => {
    if (isLocked) return;
    e.preventDefault();
    dragging.current = true;
    addWord(getIdFromEl(e.target));
  }, [isLocked, addWord]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current || isLocked) return;
    addWord(getIdFromEl(e.target));
  }, [isLocked, addWord]);

  const handleMouseUp = useCallback(() => { dragging.current = false; }, []);

  const handleTouchStart = useCallback((e) => {
    if (isLocked) return;
    dragging.current = true;
    const t = e.touches[0];
    addWord(getIdFromEl(document.elementFromPoint(t.clientX, t.clientY)));
  }, [isLocked, addWord]);

  const handleTouchMove = useCallback((e) => {
    if (!dragging.current || isLocked) return;
    const t = e.touches[0];
    addWord(getIdFromEl(document.elementFromPoint(t.clientX, t.clientY)));
  }, [isLocked, addWord]);

  const handleTouchEnd = useCallback(() => { dragging.current = false; }, []);

  // ── Click toggle single word ──
  const handleWordClick = useCallback((id) => {
    if (isLocked || !id) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, [isLocked]);

  // ── Buttons ──
  const handleCheck = () => {
    if (isLocked) return;
    if (selectedIds.size === 0) { ValidationAlert.info("Please circle the prepositional phrases."); return; }
    const fullySelected = getFullySelectedGroups(selectedIds);
    const score = [...fullySelected].filter((g) => CORRECT_GROUPS.has(g)).length;
    const total = CORRECT_GROUPS.size;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    // تحديد كل كلمات الـ groups الصحيحة
    const ids = new Set();
    WORDS.forEach((w) => { if (w.g && CORRECT_GROUPS.has(w.g)) ids.add(w.id); });
    setSelectedIds(ids);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelectedIds(new Set());
    setShowResults(false);
    setShowAns(false);
    dragging.current = false;
  };

  // ── Word display state ──
  // كل كلمة: selected / correct / wrong / idle
  const getWordState = (word) => {
    const isSel = selectedIds.has(word.id);
    if (!isSel) return "idle";
    if (showAns) return "correct";
    if (showResults) {
      // صح لو كلمتها في group صحيحة وكل مجموعتها محددة
      if (word.g && CORRECT_GROUPS.has(word.g)) {
        const fullySelected = getFullySelectedGroups(selectedIds);
        return fullySelected.has(word.g) ? "correct" : "partial";
      }
      return "wrong"; // كلمة عادية محددة = غلط
    }
    return "selected";
  };

  // ── Render ──
  // نجمع كلمات نفس الـ group المتجاورة في span واحد (للدائرة)
  const renderWords = () => {
    const elements = [];
    let i = 0;
    while (i < WORDS.length) {
      const w = WORDS[i];

      // لو الكلمة جزء من group → اجمع كل كلمات المجموعة في span
      if (w.g) {
        const g = w.g;
        const groupWords = [];
        while (i < WORDS.length && WORDS[i].g === g) {
          groupWords.push(WORDS[i]);
          i++;
        }

        // state المجموعة = state أول كلمة فيها
        const st = getWordState(groupWords[0]);
        const isWrong = st === "wrong";
        const isPartial = st === "partial";

        // هل كل المجموعة محددة؟
        const allSel = groupWords.every((gw) => selectedIds.has(gw.id));

        elements.push(
          <span
            key={`group-${g}`}
            className={[
              "lrc-group",
              allSel && (st === "selected" || st === "correct" || st === "partial" || st === "wrong")
                ? "lrc-group--circled" : "",
              st === "correct"  ? "lrc-group--correct"  : "",
              st === "wrong"    ? "lrc-group--wrong"     : "",
              st === "partial"  ? "lrc-group--wrong"     : "",
              isLocked          ? "lrc-group--locked"    : "",
            ].filter(Boolean).join(" ")}
          >
            {groupWords.map((gw, gi) => (
              <span
                key={gw.id}
                data-word-id={gw.id}
                className="lrc-word-span"
                onClick={() => handleWordClick(gw.id)}
              >
                {gw.w}{gi < groupWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
            {(isWrong || isPartial) && allSel && showResults && !showAns && (
              <span className="lrc-badge">✕</span>
            )}
          </span>
        );
        // مسافة بعد المجموعة
        elements.push(<span key={`sp-g-${g}`} className="lrc-space"> </span>);
      } else {
        // كلمة عادية
        const st = getWordState(w);
        elements.push(
          <span
            key={w.id}
            data-word-id={w.id}
            className={[
              "lrc-word-span",
              st === "selected" || st === "wrong" ? "lrc-word-span--selected" : "",
              st === "wrong" ? "lrc-word-span--wrong" : "",
              isLocked ? "lrc-word-span--locked" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => handleWordClick(w.id)}
          >
            {w.w}{" "}
            {st === "wrong" && showResults && !showAns && (
              <span className="lrc-badge-inline">✕</span>
            )}
          </span>
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <div
      className="main-container-component"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        /* ── Paragraph ── */
        .lrc-para {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.6;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          cursor: crosshair;
          user-select: none;
          -webkit-user-select: none;
        }

        .lrc-space {
          font-size: clamp(14px, 1.7vw, 20px);
          white-space: pre;
          pointer-events: none;
        }

        /* Plain word */
        .lrc-word-span {
          position: relative;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.6;
          cursor: crosshair;
          white-space: nowrap;
          padding: 1px 2px;
          border-radius: 3px;
          transition: background 0.1s;
        }
        .lrc-word-span--locked  { cursor: default; }
        .lrc-word-span--selected { background: ${DRAG_HIGHLIGHT}; }
        .lrc-word-span--wrong    { background: rgba(239,68,68,0.08); }

        /* Group span — oval دائرة */
        .lrc-group {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          border: 2.5px solid transparent;
          padding: 1px clamp(5px, 0.7vw, 9px);
          transition: border-color 0.12s, background 0.12s;
          cursor: crosshair;
          white-space: nowrap;
        }
        .lrc-group--locked  { cursor: default; }
        .lrc-group--circled { background: ${DRAG_HIGHLIGHT}; }
        .lrc-group--correct { ; background: ${DRAG_HIGHLIGHT}; }
        .lrc-group--wrong   { border-color: ${CIRCLE_WRONG}; }

        /* ✕ badge على المجموعة */
        .lrc-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ✕ badge inline على الكلمة العادية */
        .lrc-badge-inline {
          position: absolute;
          top: -7px; right: -4px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Hint ── */
        .lrc-hint {
          font-size: clamp(11px, 1.3vw, 14px);
          color: #6b7280;
          font-style: italic;
          margin-top: -6px;
        }

        /* ── Bottom: list + image ── */
        .lrc-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        .lrc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.1vw, 14px);
        }

        .lrc-list-item {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
        }

        .lrc-bullet {
          width: clamp(8px, 1vw, 11px);
          height: clamp(8px, 1vw, 11px);
          border-radius: 50%;
          background: ${BULLET_COLOR};
          flex-shrink: 0;
        }

        .lrc-list-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${LIST_TEXT_COLOR};
          line-height: 1.4;
        }

        .lrc-scene-img {
          width: clamp(120px, 18vw, 240px);
          height: auto;
          display: block;
          flex-shrink: 0;
          pointer-events: none;
        }

        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrc-bottom { grid-template-columns: 1fr; }
          .lrc-scene-img { width: clamp(100px, 40vw, 160px); margin: 0 auto; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">C</span>
          Listen, read, and circle the prepositional phrases.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Hint ── */}
        <p className="lrc-hint">Drag over the words to circle the phrases.</p>

        {/* ── Paragraph ── */}
        <div className="lrc-para">
          {renderWords()}
        </div>

        {/* ── Bottom: list + image ── */}
        <div className="lrc-bottom">
          <div className="lrc-list">
            {PHRASE_LIST.map((phrase) => (
              <div key={phrase} className="lrc-list-item">
                <div className="lrc-bullet" />
                <span className="lrc-list-text">{phrase}</span>
              </div>
            ))}
          </div>
          <img src={imgScene} alt="scene" className="lrc-scene-img" />
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
            <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        </div>
      </div>
    </div>
  );
}