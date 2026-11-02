import { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#1a1a1a";
const DOT_DEFAULT = "#f89631";
const DOT_SELECTED = "#2195a6";
const LINE_DEFAULT = "#f89631";
const LINE_SHOW_ANS = "#c81e1e";
const SENTENCE_SEL_BG = "#e0f7fa";
const SENTENCE_SEL_BD = "#2195a6";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, text: "desert" },
  { id: 2, text: "rainforest" },
  { id: 3, text: "Arctic" },
];

const RIGHT_ITEMS = [
  { id: "A", text: "icy and cold", correctLeftId: 3 },
  { id: "B", text: "hot and dry", correctLeftId: 1 },
  { id: "C", text: "hot and wet", correctLeftId: 2 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
const ComprehensionB_Match = () => {
  const [connections, setConnections] = useState({}); // { leftId: rightId }
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [results, setResults] = useState({}),
    [selectedRight, setSelectedRight] = useState(null),
    [preview, setPreview] = useState(null),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null),
    endpointRefs = useRef({}),
    focusFrame = useRef(null);
  const checkDisabled =
    showAns || LEFT_ITEMS.every((item) => results[item.id] === true);
  const lockedLeft = (id) => showAns || results[id] === true;
  const lockedRight = (value) =>
    showAns ||
    Object.keys(connections).some(
      (id) => connections[id] === value && results[id] === true,
    );
  const cancel = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
    setSelectedLeft(null);
    setSelectedRight(null);
    setPreview(null);
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  const focusSide = (side) => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      const value =
        side === "left"
          ? LEFT_ITEMS.find((x) => !lockedLeft(x.id))?.id
          : RIGHT_ITEMS.find((x) => !lockedRight(x.id))?.id;
      endpointRefs.current[side + "-" + value]?.focus({ preventScroll: true });
    });
  };
  const connect = (id, value, keyboard) => {
    if (lockedLeft(id) || lockedRight(value)) return;
    const next = { ...connections };
    Object.keys(next).forEach((k) => {
      if (Number(k) === id || next[k] === value) delete next[k];
    });
    next[id] = value;
    setConnections(next);
    setResults((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([key, result]) =>
            result === true ||
            (Number(key) !== id && next[key] === connections[key]),
        ),
      ),
    );
    cancel();
    setAnnouncement("Connection made.");
    if (keyboard) focusSide("left");
  };
  const endpointKeys = (event, side, value) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      cancel();
      return;
    }
    if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      const values =
        side === "left"
          ? LEFT_ITEMS.filter((x) => !lockedLeft(x.id)).map((x) => x.id)
          : RIGHT_ITEMS.filter((x) => !lockedRight(x.id)).map((x) => x.id);
      const i = values.indexOf(value),
        next =
          values[
            (i + (event.key === "ArrowDown" ? 1 : -1) + values.length) %
              values.length
          ];
      endpointRefs.current[side + "-" + next]?.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat)
        (side === "left" ? handleLeftClick : handleRightClick)(value, true);
    }
  };

  const containerRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => forceUpdate((n) => n + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getDotCenter = useCallback((el) => {
    if (!el || !containerRef.current) return null;
    const cRect = containerRef.current.getBoundingClientRect(),
      eRect = el.getBoundingClientRect();
    return {
      x:
        (eRect.left - cRect.left + eRect.width / 2) /
        (cRect.width / containerRef.current.clientWidth || 1),
      y:
        (eRect.top - cRect.top + eRect.height / 2) /
        (cRect.height / containerRef.current.clientHeight || 1),
    };
  }, []);

  const isCorrect = (leftId, rightId) =>
    RIGHT_ITEMS.find((r) => r.id === rightId)?.correctLeftId === Number(leftId);
  const connectedLeft = (id) =>
    Object.prototype.hasOwnProperty.call(connections, id);

  // ── Handlers ──
  const handleLeftClick = (id, keyboard = false) => {
    if (lockedLeft(id)) return;
    if (selectedRight !== null) {
      connect(id, selectedRight, keyboard);
      return;
    }
    setSelectedLeft((prev) => (prev === id ? null : id));
    setPreview(null);
    setAnnouncement("Item selected. Choose a matching description.");
    if (keyboard && selectedLeft !== id) focusSide("right");
  };

  const handleRightClick = (value, keyboard = false) => {
    if (lockedRight(value)) return;
    if (selectedLeft !== null) {
      connect(selectedLeft, value, keyboard);
      return;
    }
    setSelectedRight((prev) => (prev === value ? null : value));
    setPreview(null);
    setAnnouncement("Description selected. Choose its match.");
    if (keyboard && selectedRight !== value) focusSide("left");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    cancel();
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    const next = Object.fromEntries(
      LEFT_ITEMS.map((item) => [
        item.id,
        isCorrect(item.id, connections[item.id]),
      ]),
    );
    const score = Object.values(next).filter(Boolean).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${LEFT_ITEMS.length}. Correct connections are locked.`,
    );
    if (score === LEFT_ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShow = () => {
    const ans = {};
    RIGHT_ITEMS.forEach((r) => {
      ans[r.correctLeftId] = r.id;
    });
    cancel();
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct connections shown and locked.");
    setConnections(ans);
    setShowResults(false);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleReset = () => {
    cancel();
    setResults({});
    setAnnouncement("Connections cleared.");
    setConnections({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
  };

  // ── SVG lines ──
  const renderLines = () =>
    Object.entries(connections).map(([leftId, rightId]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[rightId]);
      if (!p1 || !p2) return null;
      const color =
        showAns || results[leftId] === true
          ? "#16a34a"
          : results[leftId] === false
            ? "#ef4444"
            : LINE_DEFAULT;
      return (
        <line
          key={`${leftId}-${rightId}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    });

  // ── Dot colors ──
  const leftDotColor = (id) =>
    lockedLeft(id) ? "#16a34a" : selectedLeft === id ? "#2563eb" : DOT_DEFAULT;

  const rightDotColor = (value) =>
    lockedRight(value)
      ? "#16a34a"
      : selectedRight === value
        ? "#2563eb"
        : DOT_DEFAULT;

  // ── Badge helpers ──
  const isLeftWrong = (id) => !showAns && results[id] === false;

  return (
    <div data-adapt-scope="unit10_ComprehensionB" className="mb-6 mx-auto">
      <style>{`[data-adapt-scope="unit10_ComprehensionB"] input:focus-visible, [data-adapt-scope="unit10_ComprehensionB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_ComprehensionB"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_ComprehensionB"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_ComprehensionB"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .cmb-match-area { position: relative; }
        .cmb-match-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
        }
        .cmb-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 42px);
        }
        .cmb-match-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .cmb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${TEXT_COLOR};
          flex-shrink: 0;
          min-width: clamp(18px, 2.2vw, 26px);
        }
        .cmb-sentence-wrap {
          display: flex;
          align-items: center;
          border-radius: 10px;
          border: 1px solid transparent;
          padding: 4px 10px;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .cmb-sentence-wrap--selected {
          border-color: ${SENTENCE_SEL_BD};
          background: ${SENTENCE_SEL_BG};
        }
        .cmb-sentence-wrap--locked { cursor: default; }
        .cmb-sentence-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
          white-space: nowrap;
        }
        .cmb-dot-left-wrap {
          position: relative;
          flex-shrink: 0;
          margin-inline-start: auto;
        }
        .cmb-dot-left {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
          cursor: pointer;
              margin-right: 25em;

        }
        .cmb-sentence-wrap:not(.cmb-sentence-wrap--locked):hover .cmb-dot-left {
          transform: scale(1.3);
        }
        .cmb-right-col {
    display: flex;
    flex-direction: column;
    gap: clamp(22px, 3.2vw, 42px);
    /* padding-left: clamp(36px, 5.5vw, 80px); */
    margin-top: 5%;        }
        .cmb-right-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .cmb-dot-right {
          width:  clamp(13px, 1.5vw, 17px);
          height: clamp(13px, 1.5vw, 17px);
          border-radius: 50%;
          flex-shrink: 0;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .cmb-dot-right:hover { transform: scale(1.3); }
        .cmb-right-text {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          font-weight: 500;
          white-space: nowrap;
        }
        .cmb-badge {
          position: absolute;
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
          z-index: 3;
        }
        .cmb-svg-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }
      `}</style>

      {/* ── Header ── */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Match each place to the word that describes it.
      </h5>

      {/* ── Matching Area ── */}
      <div className="cmb-match-area" ref={containerRef}>
        <div className="cmb-match-grid">
          {/* Left column */}
          <div className="cmb-left-col">
            {LEFT_ITEMS.map((item) => {
              const isSelected = selectedLeft === item.id;
              const isLocked =
                showAns ||
                (showResults &&
                  connectedLeft(item.id) &&
                  isCorrect(item.id, connections[item.id]));
              const dotWrong = isLeftWrong(item.id);

              return (
                <div
                  style={{
                    ...{},
                    borderRadius: {}.borderRadius || 6,
                    boxShadow: lockedLeft(item.id)
                      ? "inset 0 0 0 2px #16a34a"
                      : selectedLeft === item.id
                        ? "inset 0 0 0 2px #2563eb"
                        : undefined,
                    background:
                      selectedLeft === item.id ? "#dbeafe" : {}.background,
                  }}
                  role="button"
                  tabIndex={
                    selectedLeft !== null
                      ? -1
                      : selectedRight !== null && lockedLeft(item.id)
                        ? -1
                        : 0
                  }
                  data-keyboard-choice
                  data-match-side="left"
                  data-match-id={item.id}
                  ref={(el) => {
                    endpointRefs.current["left-" + item.id] = el;
                  }}
                  aria-label={item.text}
                  aria-pressed={selectedLeft === item.id}
                  aria-disabled={lockedLeft(item.id)}
                  onKeyDown={(event) => endpointKeys(event, "left", item.id)}
                  onKeyUp={activationKeys.onKeyUp}
                  onFocus={() => setPreview({ side: "left", id: item.id })}
                  onMouseEnter={() => setPreview({ side: "left", id: item.id })}
                  onMouseLeave={() => setPreview(null)}
                  key={item.id}
                  className="cmb-match-row"
                  onClick={() => handleLeftClick(item.id)}
                >
                  <span className="cmb-num">{item.id}</span>
                  <div
                    className={[
                      "cmb-sentence-wrap",
                      isSelected ? "cmb-sentence-wrap--selected" : "",
                      isLocked ? "cmb-sentence-wrap--locked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="cmb-sentence-text">{item.text}</span>
                  </div>
                  <div className="cmb-dot-left-wrap">
                    <div
                      className="cmb-dot-left"
                      ref={(el) => {
                        leftRefs.current[item.id] = el;
                      }}
                      style={{ background: leftDotColor(item.id) }}
                    />
                    {dotWrong && (
                      <div className="cmb-badge cmb-badge--left">✕</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="cmb-right-col">
            {RIGHT_ITEMS.map((item) => {
              return (
                <div
                  style={{
                    ...{},
                    borderRadius: {}.borderRadius || 6,
                    boxShadow: lockedRight(item.id)
                      ? "inset 0 0 0 2px #16a34a"
                      : selectedRight === item.id
                        ? "inset 0 0 0 2px #2563eb"
                        : undefined,
                    background:
                      selectedRight === item.id ? "#dbeafe" : {}.background,
                  }}
                  role="button"
                  tabIndex={
                    selectedRight !== null
                      ? -1
                      : selectedLeft !== null && lockedRight(item.id)
                        ? -1
                        : 0
                  }
                  data-keyboard-choice
                  data-match-side="right"
                  data-match-id={item.id}
                  ref={(el) => {
                    endpointRefs.current["right-" + item.id] = el;
                  }}
                  aria-label={item.text}
                  aria-pressed={selectedRight === item.id}
                  aria-disabled={lockedRight(item.id)}
                  onKeyDown={(event) => endpointKeys(event, "right", item.id)}
                  onKeyUp={activationKeys.onKeyUp}
                  onFocus={() => setPreview({ side: "right", id: item.id })}
                  onMouseEnter={() =>
                    setPreview({ side: "right", id: item.id })
                  }
                  onMouseLeave={() => setPreview(null)}
                  key={item.id}
                  className="cmb-right-item"
                  onClick={() => handleRightClick(item.id)}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      className="cmb-dot-right"
                      ref={(el) => {
                        rightRefs.current[item.id] = el;
                      }}
                      style={{ background: rightDotColor(item.id) }}
                    />
                  </div>
                  <span className="cmb-right-text">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SVG Lines */}
        <svg aria-hidden="true" className="cmb-svg-overlay">
          {renderLines()}
          {(() => {
            let id = selectedLeft,
              value = selectedRight;
            if (id !== null && preview?.side === "right") value = preview.id;
            else if (value !== null && preview?.side === "left")
              id = preview.id;
            else return null;
            if (lockedLeft(id) || lockedRight(value)) return null;
            const a = getDotCenter(leftRefs.current[id]),
              b = getDotCenter(rightRefs.current[value]);
            return a && b ? (
              <line
                data-match-preview
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            ) : null;
          })()}
        </svg>
      </div>

      {/* ── Hint ── */}
      {selectedLeft !== null && (
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "14px",
            color: DOT_SELECTED,
            fontStyle: "italic",
          }}
        >
          Now click the matching description on the right →
        </p>
      )}

      {/* ── Buttons ── */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={checkDisabled}
            style={{ cursor: checkDisabled ? "not-allowed" : "pointer" }}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionB_Match;
