import { useState, useRef, useLayoutEffect, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import { TbMessageCircle } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import sound from "../../../assets/audio/ClassBook/Grade 3/cd1pg8instruction-adult-lady_nlyjQBM0.mp3"; // ← غيّر المسار حسب ملف الأوديو

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 6.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a3a3a3";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  top: [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 5, img: img5 },
    { id: 6, img: img6 },
  ],

  bottom: [
    { id: 1, text: "long i" },
    { id: 2, text: "short a" },
    { id: 3, text: "long e" },
    { id: 4, text: "short u" },
    { id: 5, text: "long u" },
    { id: 6, text: "long o" },
  ],

  correctMatches: {
    1: 5,
    2: 6,
    3: 2,
    4: 3,
    5: 4,
    6: 1,
  },
};

const styles = {
  matchArea: {
    position: "relative",
    width: "100%",
    minHeight: "clamp(260px, 42vw, 430px)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 3vw, 34px)",
  },

  topRow: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "clamp(8px, 1.8vw, 22px)",
    alignItems: "start",
    zIndex: 2,
    width: "100%",
  },

  topItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(8px, 1.3vw, 10px)",
    position: "relative",
    minWidth: 0,
  },

  topNumber: {
    width: "100%",
    paddingLeft: "clamp(2px, 0.5vw, 6px)",
    boxSizing: "border-box",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
  },

  topImageBox: {
    width: "clamp(42px, 9vw, 120px)",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "clamp(8px, 1vw, 14px)",
    border: "2px solid transparent",
    transition: "0.2s ease",
    boxSizing: "border-box",
    padding: "4px",
    maxWidth: "100%",
  },

  topImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  dot: {
    width: "clamp(10px, 1.4vw, 16px)",
    height: "clamp(10px, 1.4vw, 16px)",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
  },

  bottomRow: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "clamp(8px, 1.8vw, 22px)",
    alignItems: "start",
    zIndex: 2,
    marginTop: "clamp(8px, 2vw, 26px)",
    width: "100%",
  },

  bottomItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(8px, 1.3vw, 10px)",
    position: "relative",
    minWidth: 0,
  },

  bottomLabel: {
    width: "100%",
    minHeight: "clamp(34px, 5vw, 54px)",
    padding: "0 clamp(4px, 1vw, 10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(12px, 2.1vw, 26px)",
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
    lineHeight: 1.1,
    borderRadius: "clamp(8px, 1vw, 14px)",
    border: "2px solid transparent",
    cursor: "pointer",
    boxSizing: "border-box",
    background: "transparent",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },

  wrongBadge: {
    position: "absolute",
    width: "clamp(16px, 2vw, 22px)",
    height: "clamp(16px, 2vw, 22px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(9px, 1vw, 12px)",
    fontWeight: "700",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    width: "100%",
  },
};

const WB_Unit3_Page215_QB = () => {
  // ─── Matching state ───────────────────────────────────────────────
  const [selectedTop, setSelectedTop] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  // ─── Audio state ──────────────────────────────────────────────────
  const audioRef = useRef(null);
  const settingsRef = useRef(null);
  const stopAtSecond = 6.35; // ← غيّر هذه القيمة حسب الأوديو الجديد

  const [isPlaying, setIsPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [forceRender, setForceRender] = useState(0);

  // ─── Captions ─────────────────────────────────────────────────────
  // ← عدّل النصوص والتوقيتات حسب أوديو هذا التمرين
const captions = [
  { start: 0.60, end: 3.44, text: "Page eight. Phonics exercise B." },
  { start: 4.48, end: 5.68, text: "Listen and match." },
  { start: 6.74, end: 9.10, text: "1- tube." },
  { start: 9.10, end: 11.62, text: "2- coat." },
  { start: 11.62, end: 13.34, text: "3- jam." },
  { start: 13.34, end: 15.98, text: "4- bee." },
  { start: 15.98, end: 18.78, text: "5- nuts." },
  { start: 19.80, end: 21.56, text: "6- kite." },
];
  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end
    );
    setActiveIndex(index);
  };

  // ─── Auto-play on mount + stop at intro ───────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    const handleEnded = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
      setPaused(false);
      setActiveIndex(null);
      setShowContinue(true);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // ─── Caption scroll + force re-render ────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000);

    if (activeIndex !== -1 && activeIndex !== null) {
      const el = document.getElementById(`caption-${activeIndex}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return () => clearInterval(timer);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(false);
      setIsPlaying(true);
    } else {
      audio.pause();
      setPaused(true);
      setIsPlaying(false);
    }
  };

  // ─── Lines layout ─────────────────────────────────────────────────
  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([topId, bottomId]) => {
          const topEl = elementRefs.current[`top-dot-${topId}`];
          const bottomEl = elementRefs.current[`bottom-dot-${bottomId}`];
          if (!topEl || !bottomEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `line-${topId}-${bottomId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.top + topRect.height / 2 - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top + bottomRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const rafUpdate = () => requestAnimationFrame(updateLines);
    rafUpdate();
    window.addEventListener("resize", rafUpdate);

    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(rafUpdate);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafUpdate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [matches, showAns, showResults]);

  // ─── Matching handlers ────────────────────────────────────────────
  const handleTopClick = (id) => {
    if (showAns) return;
    setSelectedTop(id);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || selectedTop === null) return;

    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) delete newMatches[key];
    });
    newMatches[selectedTop] = bottomId;

    setMatches(newMatches);
    setSelectedTop(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;
    const allConnected = EXERCISE_DATA.top.every((item) => matches[item.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);
    let score = 0;
    const total = EXERCISE_DATA.top.length;
    Object.keys(EXERCISE_DATA.correctMatches).forEach((topId) => {
      if (matches[topId] === EXERCISE_DATA.correctMatches[topId]) score++;
    });

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches(EXERCISE_DATA.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setSelectedTop(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  // ─── Color helpers ────────────────────────────────────────────────
  const getTopDotColor = (topId) =>
    selectedTop === topId || matches[topId] ? ACTIVE_COLOR : INACTIVE_COLOR;

  const getBottomDotColor = (bottomId) => {
    const isConnected = Object.values(matches).includes(bottomId);
    const isSelected = selectedTop !== null && matches[selectedTop] === bottomId;
    return isSelected || isConnected ? ACTIVE_COLOR : INACTIVE_COLOR;
  };

  const isWrongMatch = (topId) =>
    showResults &&
    !!matches[topId] &&
    matches[topId] !== EXERCISE_DATA.correctMatches[topId];

  // ─── Render ───────────────────────────────────────────────────────
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
          <span className="WB-ex-A">B</span> Listen and match.
        </h1>

        {/* ── Audio Player ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0px",
            width: "100%",
          }}
        >
          <div className="audio-popup-read" style={{ width: "50%" }}>
            <div className="audio-inner player-ui">
              <audio
                ref={audioRef}
                src={sound}
                onTimeUpdate={(e) => {
                  const time = e.target.currentTime;
                  setCurrent(time);
                  updateCaption(time);
                }}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
              />

              {/* Slider row */}
              <div className="top-row">
                <span className="audio-time">
                  {new Date(current * 1000).toISOString().substring(14, 19)}
                </span>

                <input
                  type="range"
                  className="audio-slider"
                  min="0"
                  max={duration}
                  value={current}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    updateCaption(Number(e.target.value));
                  }}
                  style={{
                    background: `linear-gradient(to right, #430f68 ${
                      (current / duration) * 100
                    }%, #d9d9d9ff ${(current / duration) * 100}%)`,
                  }}
                />

                <span className="audio-time">
                  {new Date(duration * 1000).toISOString().substring(14, 19)}
                </span>
              </div>

              {/* Buttons row */}
              <div className="bottom-row">
                {/* Caption bubble */}
                <div
                  className={`round-btn ${showCaption ? "active" : ""}`}
                  style={{ position: "relative" }}
                  onClick={() => setShowCaption(!showCaption)}
                >
                  <TbMessageCircle size={36} />
                  <div
                    className={`caption-inPopup ${showCaption ? "show" : ""}`}
                    style={{ top: "100%", left: "10%" }}
                  >
                    {captions.map((cap, i) => (
                      <p
                        key={i}
                        id={`caption-${i}`}
                        className={`caption-inPopup-line2 ${
                          activeIndex === i ? "active" : ""
                        }`}
                      >
                        {cap.text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Play / Pause */}
                <button className="play-btn2" onClick={togglePlay}>
                  {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
                </button>

                {/* Settings */}
                <div className="settings-wrapper" ref={settingsRef}>
                  <button
                    className={`round-btn ${showSettings ? "active" : ""}`}
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <IoMdSettings size={36} />
                  </button>

                  {showSettings && (
                    <div className="settings-popup">
                      <label>Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={(e) => {
                          setVolume(e.target.value);
                          audioRef.current.volume = e.target.value;
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Matching Exercise ── */}
        <div ref={containerRef} style={styles.matchArea}>
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
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Top row (images) */}
          <div style={styles.topRow}>
            {EXERCISE_DATA.top.map((item) => {
              const wrong = isWrongMatch(item.id);
              const isSelected = selectedTop === item.id;
              const isConnected = !!matches[item.id];

              return (
                <div key={item.id} style={styles.topItem}>
                  <div style={styles.topNumber}>{item.id}</div>

                  <div
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      ...styles.topImageBox,
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #f5d0a8"
                        : "2px solid transparent",
                      background: isSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`top-${item.id}`}
                      style={styles.topImage}
                    />
                  </div>

                  <div
                    ref={(el) =>
                      (elementRefs.current[`top-dot-${item.id}`] = el)
                    }
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getTopDotColor(item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        ...styles.wrongBadge,
                        right: "clamp(0px, 0.8vw, 10px)",
                        top: "clamp(20px, 3vw, 34px)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom row (text labels) */}
          <div style={styles.bottomRow}>
            {EXERCISE_DATA.bottom.map((item) => {
              const isConnected = Object.values(matches).includes(item.id);
              const isSelected =
                selectedTop !== null && matches[selectedTop] === item.id;

              return (
                <div key={item.id} style={styles.bottomItem}>
                  <div
                    ref={(el) =>
                      (elementRefs.current[`bottom-dot-${item.id}`] = el)
                    }
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getBottomDotColor(item.id),
                      cursor:
                        showAns || selectedTop === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      ...styles.bottomLabel,
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #f5d0a8"
                        : "2px solid transparent",
                      cursor:
                        showAns || selectedTop === null ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit3_Page215_QB;