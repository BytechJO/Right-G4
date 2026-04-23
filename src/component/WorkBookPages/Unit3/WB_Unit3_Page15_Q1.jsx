import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import char1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 1.svg";
import char2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 2.svg";
import char3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 3.svg";
import char4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 4.svg";


const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, img: char1, text: "Does he have any ink?" },
  { id: 2, img: char2, text: "Does she have any paper?" },
  { id: 3, img: char3, text: "Does he have any eggplants?" },
  { id: 4, img: char4, text: "Does he have any grapes?" },
];

const RIGHT_ITEMS = [
  { id: 1, text: "Yes, he has some." },
  { id: 2, text: "No, he hasn't any." },
  { id: 3, text: "Yes, she has some." },
  { id: 4, text: "Yes, he has a little." },
];

const CORRECT_MATCHES = { 1: 2, 2: 3, 3: 1, 4: 4 };

export default function WB_ReadLookMatch_PageA() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);

  const boardRef = useRef(null);
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
        const x1 = sr.right - br.left;               // ← من يمين الـ dot اليسار
        const y1 = sr.top + sr.height / 2 - br.top;
        const x2 = er.left - br.left;                // ← من يسار الـ dot اليمين
        const y2 = er.top + er.height / 2 - br.top;
        const dx = Math.abs(x2 - x1);
        const isWrong =
          showResults && matches[leftId] !== CORRECT_MATCHES[Number(leftId)];

        return {
          id: `path-${leftId}-${rightId}`,
          d: `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
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
    return () => {
      window.removeEventListener("resize", update);
      obs?.disconnect();
    };
  }, [matches, showResults]);

  const handleLeftSelect = (id) => {
    if (showAns) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
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
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
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
    showResults &&
    !showAns &&
    !!matches[leftId] &&
    matches[leftId] !== CORRECT_MATCHES[leftId];

  const WrongBadge = () => (
    <div
      style={{
        position: "absolute",
        top: "-8px",
        right: "-8px",
        width: "clamp(16px,1.8vw,22px)",
        height: "clamp(16px,1.8vw,22px)",
        borderRadius: "50%",
        border: "1px solid #fff",
        backgroundColor: WRONG_COLOR,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(9px,0.9vw,12px)",
        fontWeight: 700,
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      ✕
    </div>
  );

  /* ─────────────────────────────────────────────
     Grid layout (6 cols):
     [num] [img] [left-sentence] [left-dot]   [right-dot] [right-sentence]
     ↑auto  ↑auto  ↑1fr           ↑dot-col      ↑dot-col    ↑1fr

     المشكلة الأصلية: الـ dot-cols كانوا "auto" بدون gap كافي بينهم
     الحل: نعطي المنطقة الوسطى عرض ثابت clamp يحكم المسافة بين النقطتين
  ───────────────────────────────────────────── */
  const GRID = {
    display: "grid",
    gridTemplateColumns:
      "auto auto 1fr clamp(14px,2vw,22px) clamp(40px,5vw,72px) clamp(14px,2vw,22px) 1fr",
    /*                                    ↑ left-dot             ↑ gap spacer          ↑ right-dot  */
    columnGap: "clamp(8px,1.2vw,16px)",
    rowGap: "clamp(14px,2vw,28px)",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">A</span> Read, look, and match.
        </h1>

        {/* Board */}
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>

          {/* SVG lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
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

          <div style={GRID}>
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem    = RIGHT_ITEMS[idx];
              const lConn    = getLeftConn(lItem.id);
              const rConn    = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
              const wrong    = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>

                  {/* col 1 – number */}
                  <span
                    style={{
                      fontSize: "clamp(16px,1.9vw,26px)",
                      fontWeight: 700,
                      color: TEXT_COLOR,
                      lineHeight: 1,
                      flexShrink: 0,
                      zIndex: 2,
                    }}
                  >
                    {lItem.id}
                  </span>

                  {/* col 2 – image */}
                  <div
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width: "clamp(52px,7vw,90px)",
                      aspectRatio: "1 / 1",
                      flexShrink: 0,
                      zIndex: 2,
                      cursor: showAns ? "default" : "pointer",
                      overflow: "hidden",
                      borderRadius: "clamp(6px,0.8vw,12px)",
                      border: `2px solid ${lSelected ? ACTIVE_COLOR : BORDER_COLOR}`,
                      background: "#f7f7f7",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={lItem.img}
                      alt={`img-${lItem.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* col 3 – left sentence */}
                  <div
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `2.5px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(13px,1.6vw,21px)",
                        fontWeight: 500,
                        color: wrong
                          ? WRONG_COLOR
                          : lSelected
                          ? ACTIVE_COLOR
                          : TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                    </span>
                    {wrong && <WrongBadge />}
                  </div>

                  {/* col 4 – left dot */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      justifySelf: "end",       // ← يلتصق بيمين الخلية
                      flexShrink: 0,
                      background: lSelected
                        ? ACTIVE_COLOR
                        : lConn
                        ? wrong
                          ? WRONG_COLOR
                          : ACTIVE_COLOR
                        : DOT_COLOR,
                      cursor: showAns ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? "0 0 0 3px rgba(243,155,66,0.3)"
                        : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* col 5 – spacer (المسافة الفعلية بين النقطتين) */}
                  <div style={{ height: "100%" }} />

                  {/* col 6 – right dot */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      justifySelf: "start",     // ← يلتصق بيسار الخلية
                      flexShrink: 0,
                      background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                      transition: "background 0.2s",
                      zIndex: 2,
                    }}
                  />

                  {/* col 7 – right sentence */}
                  <div
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      zIndex: 2,
                      padding:
                        "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                      userSelect: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(13px,1.6vw,21px)",
                        fontWeight: 500,
                        color: TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                      }}
                    >
                      {rItem.text}
                    </span>
                  </div>

                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(8px,1.5vw,16px)",
            zIndex: 100,
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