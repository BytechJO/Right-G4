import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.3.svg";
const DOT_COLOR    = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR  = "#ef4444";
const PATH_COLOR   = "#f39b42";
const TEXT_COLOR   = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "The plums play on the plate."            },
  { id: 2, text: "The slug sleeps on the slide."           },
  { id: 3, text: "The fly and the flea float on the flag." },
];

const RIGHT_ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
];

const CORRECT_MATCHES = { 1: 2, 2: 3, 3: 1 };

// ── Wrong badge يسار أعلى فقط بدون أي تأثير تاني
const WrongBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             "-7px",
      left:            "-7px",
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

export default function WB_ReadAndMatch_PageC() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches,      setMatches]      = useState({});
  const [showResults,  setShowResults]  = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [paths,        setPaths]        = useState([]);

  const boardRef  = useRef(null);
  const pointRefs = useRef({});

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

        return {
          id:    `path-${leftId}-${rightId}`,
          d:     `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
          color: PATH_COLOR,
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
      ValidationAlert.info("Please connect all sentences first.");
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
    showResults && !showAns && !!matches[leftId] &&
    matches[leftId] !== CORRECT_MATCHES[leftId];

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
          <span className="WB-ex-A">C</span> Read and match.
        </h1>

        {/* Board */}
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>

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

          {/* Grid */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr auto auto auto",
              columnGap:           "clamp(10px,2vw,28px)",
              rowGap:              "clamp(18px,3vw,36px)",
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

                  {/* ── sentence ── */}
                  <div
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      position:     "relative",
                      display:      "flex",
                      alignItems:   "center",
                      gap:          "clamp(6px,0.9vw,12px)",
                      minWidth:     0,
                      zIndex:       2,
                      padding:      "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border:       lSelected
                        ? `2.5px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      background:   lSelected ? "rgba(243,155,66,0.08)" : "transparent",
                      cursor:       showAns ? "default" : "pointer",
                      transition:   "border-color 0.2s, background 0.2s",
                      userSelect:   "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize:   "clamp(16px,1.9vw,28px)",
                        fontWeight: 700,
                        color:      TEXT_COLOR,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {lItem.id}
                    </span>

                    <span
                      style={{
                        fontSize:   "clamp(13px,1.6vw,22px)",
                        fontWeight: 500,
                        color:      lSelected ? ACTIVE_COLOR : TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak:  "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                    </span>

                    {/* ── wrong badge يسار فقط ── */}
                    {wrong && <WrongBadge />}
                  </div>

                  {/* ── left dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width:        "clamp(10px,1.3vw,16px)",
                      height:       "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      flexShrink:   0,
                      background:   lSelected
                        ? ACTIVE_COLOR
                        : lConn
                        ? ACTIVE_COLOR
                        : DOT_COLOR,
                      cursor:       showAns ? "default" : "pointer",
                      transition:   "background 0.2s",
                      boxShadow:    lSelected ? `0 0 0 3px rgba(243,155,66,0.3)` : "none",
                      zIndex:       2,
                    }}
                  />

                  {/* ── right dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      width:        "clamp(10px,1.3vw,16px)",
                      height:       "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      flexShrink:   0,
                      background:   rConn ? ACTIVE_COLOR : DOT_COLOR,
                      cursor:       showAns || selectedLeft === null ? "default" : "pointer",
                      transition:   "background 0.2s",
                      zIndex:       2,
                    }}
                  />

                  {/* ── image — بدون أي تأثير للخطأ ── */}
                  <div
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      position:     "relative",
                      width:        "clamp(90px,13vw,160px)",
                      aspectRatio:  "1.2 / 1",
                      overflow:     "hidden",
                      borderRadius: "clamp(8px,1vw,14px)",
                      border:       `2px solid ${rConn ? ACTIVE_COLOR : BORDER_COLOR}`,
                      background:   "#f7f7f7",
                      flexShrink:   0,
                      cursor:       showAns || selectedLeft === null ? "default" : "pointer",
                      transition:   "border-color 0.2s",
                      boxSizing:    "border-box",
                      zIndex:       2,
                    }}
                  >
                    <img
                      src={rItem.img}
                      alt={`img-${rItem.id}`}
                      style={{
                        width:         "100%",
                        height:        "100%",
                        objectFit:     "contain",
                        display:       "block",
                        padding:       "clamp(4px,0.6vw,8px)",
                        boxSizing:     "border-box",
                        userSelect:    "none",
                        pointerEvents: "none",
                      }}
                    />
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