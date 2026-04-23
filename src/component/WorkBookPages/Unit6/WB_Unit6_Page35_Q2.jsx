import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const DOT_COLOR    = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const PATH_COLOR   = "#f39b42";
const TEXT_COLOR   = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "7th"  },
  { id: 2, text: "8th"  },
  { id: 3, text: "9th"  },
  { id: 4, text: "10th" },
  { id: 5, text: "1st"  },
  { id: 6, text: "2nd"  },
];

const RIGHT_ITEMS = [
  { id: 1, text: "tenth"   },
  { id: 2, text: "second"  },
  { id: 3, text: "seventh" },
  { id: 4, text: "first"   },
  { id: 5, text: "ninth"   },
  { id: 6, text: "eighth"  },
];

// 7th→seventh, 8th→eighth, 9th→ninth, 10th→tenth, 1st→first, 2nd→second
const CORRECT_MATCHES = { 1: 3, 2: 6, 3: 5, 4: 1, 5: 4, 6: 2 };

export default function WB_ReadAndMatch_PageF() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [paths,        setPaths]        = useState([]);

  const boardRef  = useRef(null);
  const pointRefs = useRef({});

  // ── SVG paths ──
  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches).map(([leftId, rightId]) => {
        const s = pointRefs.current[`left-${leftId}`];
        const e = pointRefs.current[`right-${rightId}`];
        if (!s || !e) return null;

        const sr = s.getBoundingClientRect();
        const er = e.getBoundingClientRect();
        const x1 = sr.left + sr.width  / 2 - br.left;
        const y1 = sr.top  + sr.height / 2 - br.top;
        const x2 = er.left + er.width  / 2 - br.left;
        const y2 = er.top  + er.height / 2 - br.top;
        const dx = Math.abs(x2 - x1);

        const isWrong = showResults && matches[Number(leftId)] !== CORRECT_MATCHES[Number(leftId)];

        return {
          id:    `path-${leftId}-${rightId}`,
          d:     `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`,
          color: isWrong ? WRONG_COLOR : PATH_COLOR,
        };
      }).filter(Boolean);

      setPaths(newPaths);
    };

    update();
    window.addEventListener("resize", update);
    let obs;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(update);
      obs.observe(boardRef.current);
    }
    return () => { window.removeEventListener("resize", update); obs?.disconnect(); };
  }, [matches, showResults]);

  const handleLeftSelect = (id) => {
    if (showAns) return;
    setSelectedLeft((prev) => prev === id ? null : id);
    setShowResults(false);
  };

  const handleRightSelect = (rightId) => {
    if (showAns || selectedLeft === null) return;
    const upd = { ...matches };
    Object.keys(upd).forEach((k) => { if (upd[k] === rightId) delete upd[k]; });
    upd[selectedLeft] = rightId;
    setMatches(upd);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => { if (matches[i.id] === CORRECT_MATCHES[i.id]) score++; });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
  };

  const getLeftConn  = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) =>
    showResults && !!matches[leftId] && matches[leftId] !== CORRECT_MATCHES[leftId];

  const WrongBadge = () => (
    <div
      style={{
        position:        "absolute",
        top:             "-7px",
        right:           "-7px",
        width:           "clamp(15px,1.7vw,20px)",
        height:          "clamp(15px,1.7vw,20px)",
        borderRadius:    "50%",
        backgroundColor: WRONG_COLOR,
        color:           "#fff",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontSize:        "clamp(8px,0.9vw,11px)",
        fontWeight:      700,
        boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
        zIndex:          5,
        pointerEvents:   "none",
      }}
    >
      ✕
    </div>
  );

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
          <span className="WB-ex-A">F</span> Read and match.
        </h1>

        {/* Board */}
        <div
          ref={boardRef}
          style={{ position: "relative", width: "100%" }}
        >
          {/* SVG lines */}
          <svg
            style={{
              position:      "absolute",
              inset:         0,
              width:         "100%",
              height:        "100%",
              pointerEvents: "none",
              overflow:      "visible",
              zIndex:        1,
            }}
          >
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Grid: left text | left dot | right dot | right text */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "auto auto 1fr auto",
              columnGap:           "clamp(8px,2vw,24px)",
              rowGap:              "clamp(14px,2.2vw,28px)",
              alignItems:          "center",
              width:               "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem     = RIGHT_ITEMS[idx];
              const lConn     = getLeftConn(lItem.id);
              const rConn     = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
              const wrong     = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>

                  {/* ── Left text ── */}
                  <div
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      position:     "relative",
                      fontSize:     "clamp(16px,2.2vw,30px)",
                      fontWeight:   700,
                      color:        wrong
                        ? WRONG_COLOR
                        : lSelected
                        ? ACTIVE_COLOR
                        : TEXT_COLOR,
                      lineHeight:   1,
                      cursor:       showAns ? "default" : "pointer",
                      userSelect:   "none",
                      padding:      "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border:       lSelected
                        ? `2.5px solid ${ACTIVE_COLOR}`
                        : lConn
                        ? `2px solid ${wrong ? WRONG_COLOR : "#d1d5db"}`
                        : "2px solid transparent",
                      background:   lSelected ? "rgba(243,155,66,0.08)" : "transparent",
                      transition:   "border-color 0.2s, color 0.2s, background 0.2s",
                      whiteSpace:   "nowrap",
                      zIndex:       2,
                    }}
                  >
                    {lItem.text}
                    {wrong && <WrongBadge />}
                  </div>

                  {/* ── Left dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width:        "clamp(10px,1.4vw,16px)",
                      height:       "clamp(10px,1.4vw,16px)",
                      borderRadius: "50%",
                      flexShrink:   0,
                      background:   lSelected
                        ? ACTIVE_COLOR
                        : lConn
                        ? (wrong ? WRONG_COLOR : ACTIVE_COLOR)
                        : DOT_COLOR,
                      cursor:       showAns ? "default" : "pointer",
                      transition:   "background 0.2s",
                      boxShadow:    lSelected ? `0 0 0 3px rgba(243,155,66,0.3)` : "none",
                      zIndex:       2,
                    }}
                  />

                  {/* ── Right dot ── */}
                  <div
                    style={{
                      display:        "flex",
                      justifyContent: "flex-end",
                      zIndex:         2,
                    }}
                  >
                    <div
                      ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                      onClick={() => handleRightSelect(rItem.id)}
                      style={{
                        width:        "clamp(10px,1.4vw,16px)",
                        height:       "clamp(10px,1.4vw,16px)",
                        borderRadius: "50%",
                        background:   rConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor:       showAns || selectedLeft === null ? "default" : "pointer",
                        transition:   "background 0.2s",
                        zIndex:       2,
                      }}
                    />
                  </div>

                  {/* ── Right text ── */}
                  <div
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      position:   "relative",
                      fontSize:   "clamp(16px,2.2vw,30px)",
                      fontWeight: 500,
                      color:      TEXT_COLOR,
                      lineHeight: 1,
                      cursor:     showAns || selectedLeft === null ? "default" : "pointer",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      zIndex:     2,
                      padding:    "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border:     rConn
                        ? `2px solid ${
                            isWrongMatch(
                              Number(Object.keys(matches).find((k) => matches[k] === rItem.id))
                            )
                              ? WRONG_COLOR
                              : "#d1d5db"
                          }`
                        : "2px solid transparent",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {rItem.text}
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(8px,1.5vw,16px)",
            zIndex:         100,
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}