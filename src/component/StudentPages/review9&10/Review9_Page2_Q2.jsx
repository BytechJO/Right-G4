import missingNew0 from "../../../assets/audio/G4-Missing/Because she likes writing in her diary..mp3";
import clipPage89E4 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - E/Item_004_Because_he_likes_soccer.mp3";
import clipPage89E3 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - E/Item_003_Because_they_like_playing_chess.mp3";
import clipPage89E2 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - E/Item_002_Because_she_likes_shopping_in_the_store.mp3";
import clipPage89E1 from "../../../assets/audio/ClassBook/Unit 10/Page 89 - E/Item_001_Because_he_likes_riding_his_bike.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 40.svg"; // chess
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 41.svg"; // writing diary
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 42.svg"; // bike
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 43.svg"; // shopping
import imgE from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 89/SVG/Asset 44.svg";
function useExerciseListening(pageId) {
  const coordinator = useAudio();
  const audioRef = useListeningRef(null),
    generation = useListeningRef(0);
  const [activeId, setActiveId] = useListeningState(null),
    [error, setError] = useListeningState("");
  const clearOwned = () => {
    const current = audioRef.current;
    if (current) {
      current.onended =
        current.onplaying =
        current.onerror =
        current.onpause =
          null;
      current.pause();
      current.remove();
      audioRef.current = null;
    }
  };
  const stop = () => {
    generation.current++;
    clearOwned();
    setActiveId(null);
    setError("");
  };
  const play = (id, sources) => {
    const queue = (Array.isArray(sources) ? sources : [sources]).filter(
      Boolean,
    );
    if (!queue.length) return;
    stop();
    const token = generation.current;
    let index = 0;
    const next = () => {
      if (token !== generation.current) return;
      clearOwned();
      if (index >= queue.length) {
        setActiveId(null);
        return;
      }
      const media = new Audio(queue[index++]);
      media.hidden = true;
      media.dataset.exerciseListening = pageId;
      document.body.appendChild(media);
      audioRef.current = media;
      const current = () =>
        token === generation.current && audioRef.current === media;
      const fail = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
        setError("Audio could not be played. Please try again.");
      };
      media.onplaying = () => {
        if (current()) setActiveId(id);
      };
      media.onended = () => {
        if (current()) next();
      };
      media.onerror = fail;
      media.onpause = () => {
        if (!current()) return;
        generation.current++;
        clearOwned();
        setActiveId(null);
      };
      document.querySelectorAll("audio,video").forEach((other) => {
        if (other !== media) other.pause();
      });
      coordinator?.registerAudio(media, null, pageId);
      media.play().catch(fail);
    };
    next();
  };
  useListeningEffect(
    () => () => {
      generation.current++;
      const media = audioRef.current;
      if (media) {
        media.onended = media.onplaying = media.onerror = media.onpause = null;
        media.pause();
        media.remove();
        audioRef.current = null;
      }
    },
    [],
  );
  return {
    play,
    stop,
    activeId,
    error,
  };
}
function renderExerciseSpeaker() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        width: 22,
        height: 22,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        color: "black",
        boxShadow: "0 1px 3px rgba(0,0,0,.25)",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      <ListeningSpeakerIcon size={12} />
    </span>
  );
}

const imageDescriptions = {
  a: "A boy playing soccer.",
  b: "A girl and boy playing chess.",
  c: "A girl writing in a notebook.",
  d: "A helmeted boy riding a bicycle.",
  e: "A girl in a grocery shop.",
};

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

// soccer

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const DOT_DEFAULT = "#e07b00";
const DOT_SELECTED = "#2096a6";
const LINE_DEFAULT = "#e07b00";
const LINE_SHOW_ANS = "#c81e1e";
const IMG_BORDER_DEF = "#e5e7eb";
const IMG_BORDER_SEL = "#2096a6";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Left: 5 صور (a→e) — الطالب يضغط الصورة ثم الجملة
//  Right: 5 جمل مرقمة
//  correctLeftId: id الصورة الصحيحة لكل جملة
// ─────────────────────────────────────────────
const LEFT_IMGS = [
  { id: "a", src: imgA }, // chess       → 3
  { id: "b", src: imgB }, // diary       → 5
  { id: "c", src: imgC }, // bike        → 1
  { id: "d", src: imgD }, // shopping    → 2
  { id: "e", src: imgE }, // soccer      → 4
];

const RIGHT_ITEMS = [
  { id: 1, text: "Because he likes riding his bike.", correctLeftId: "c" },
  {
    id: 2,
    text: "Because she likes shopping in the store.",
    correctLeftId: "d",
  },
  { id: 3, text: "Because they like playing chess.", correctLeftId: "a" },
  { id: 4, text: "Because he likes soccer.", correctLeftId: "e" },
  {
    id: 5,
    text: "Because she likes writing in her diary.",
    correctLeftId: "b",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadMatch_QE() {
  const listening = useExerciseListening("sb_review9_page2_q2");

  // connections: { leftId: rightId }
  const [connections, setConnections] = useState({});
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
    showAns || LEFT_IMGS.every((item) => results[item.id] === true);
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
          ? LEFT_IMGS.find((x) => !lockedLeft(x.id))?.id
          : RIGHT_ITEMS.find((x) => !lockedRight(x.id))?.id;
      endpointRefs.current[side + "-" + value]?.focus({ preventScroll: true });
    });
  };
  const connect = (id, value, keyboard) => {
    if (lockedLeft(id) || lockedRight(value)) return;
    const next = { ...connections };
    Object.keys(next).forEach((k) => {
      if (k === String(id) || next[k] === value) delete next[k];
    });
    next[id] = value;
    setConnections(next);
    setResults((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([key, result]) =>
            result === true ||
            (key !== String(id) && next[key] === connections[key]),
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
          ? LEFT_IMGS.filter((x) => !lockedLeft(x.id)).map((x) => x.id)
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

  const isCorrect = (lid, rid) => {
    const r = RIGHT_ITEMS.find((ri) => ri.id === rid);
    return r && r.correctLeftId === lid;
  };

  const connectedLeft = (lid) =>
    Object.prototype.hasOwnProperty.call(connections, lid);

  const lineColor = (id) =>
    showAns || results[id] === true
      ? "#16a34a"
      : results[id] === false
        ? "#ef4444"
        : LINE_DEFAULT;

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
    listening.play(
      `sentence-${value}`,
      [clipPage89E1, clipPage89E2, clipPage89E3, clipPage89E4, missingNew0][value - 1],
    );
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
    listening.stop();
    cancel();
    if (Object.keys(connections).length < LEFT_IMGS.length) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    const next = Object.fromEntries(
      LEFT_IMGS.map((item) => [
        item.id,
        isCorrect(item.id, connections[item.id]),
      ]),
    );
    const score = Object.values(next).filter(Boolean).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${LEFT_IMGS.length}. Correct connections are locked.`,
    );
    if (score === LEFT_IMGS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${LEFT_IMGS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${LEFT_IMGS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${LEFT_IMGS.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
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
    listening.stop();
    cancel();
    setResults({});
    setAnnouncement("Connections cleared.");
    setConnections({});
    setShowResults(false);
    setShowAns(false);
    setSelectedLeft(null);
  };

  const renderLines = () =>
    Object.entries(connections).map(([lid, rid]) => {
      const p1 = getDotCenter(leftRefs.current[lid]);
      const p2 = getDotCenter(rightRefs.current[rid]);
      if (!p1 || !p2) return null;
      return (
        <line
          key={`${lid}-${rid}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={lineColor(lid)}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    });

  const leftDotColor = (id) =>
    lockedLeft(id) ? "#16a34a" : selectedLeft === id ? "#2563eb" : DOT_DEFAULT;

  const rightDotColor = (value) =>
    lockedRight(value)
      ? "#16a34a"
      : selectedRight === value
        ? "#2563eb"
        : DOT_DEFAULT;

  const isLeftWrong = (id) => !showAns && results[id] === false;

  const imgBorder = (id) =>
    lockedLeft(id)
      ? "#16a34a"
      : isLeftWrong(id)
        ? "#ef4444"
        : selectedLeft === id
          ? "#2563eb"
          : IMG_BORDER_DEF;

  return (
    <div
      data-adapt-scope="review9&10_Review9_Page2_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review9&10_Review9_Page2_Q2"] input:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review9_Page2_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review9_Page2_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review9_Page2_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Match area ── */
        .lrm-area { position: relative; width: 100%; }

        .lrm-grid {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: clamp(10px, 1.4vw, 18px) clamp(14px, 2vw, 28px);
          align-items: center;
          width: 100%;
        }

        /* Left images column */
        .lrm-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 20px);
        }

        .lrm-img-wrap {
          position: relative;
          cursor: pointer;
          overflow: visible;
          transition: border-color 0.15s;
          flex-shrink: 0;
        }
        .lrm-img-wrap--locked { cursor: default; }

        .lrm-img {
          width: clamp(100px, 14vw, 190px);
          height: clamp(70px, 9.5vw, 130px);
          object-fit: contain;
          display: block;
          pointer-events: none;
        }

        /* Dot right of each image */
        .lrm-dot-left-wrap { position: relative; flex-shrink: 0; }
        .lrm-dot-left {
          width: clamp(12px,1.4vw,16px); height: clamp(12px,1.4vw,16px);
          border-radius: 50%; cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .lrm-img-wrap:not(.lrm-img-wrap--locked):hover .lrm-dot-left { transform: scale(1.3); }

        /* ✕ badge */
        .lrm-badge {
          position: absolute; top: 35px; right: -1px;
          width: clamp(13px,1.5vw,16px); height: clamp(13px,1.5vw,16px);
          border-radius: 50%; background: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px,0.7vw,9px); font-weight: 700;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none; z-index: 3;
        }

        /* Right sentences column */
        .lrm-right-col {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: clamp(8px,1.2vw,18px);
          height: 100%;
              padding-left: 30vh;

        }

        .lrm-right-row {
          display: flex;
          align-items: center;
          gap: clamp(6px,0.8vw,10px);
          cursor: pointer;
          user-select: none;
        }
        .lrm-right-row--locked { cursor: default; }

        .lrm-dot-right-wrap { position: relative; flex-shrink: 0; }
        .lrm-dot-right {
          width: clamp(12px,1.4vw,16px); height: clamp(12px,1.4vw,16px);
          border-radius: 50%; cursor: pointer;
          transition: background 0.15s, transform 0.15s; flex-shrink: 0;
        }
        .lrm-right-row:not(.lrm-right-row--locked):hover .lrm-dot-right { transform: scale(1.3); }

        .lrm-right-num {
          font-size: clamp(13px,1.5vw,18px); font-weight: 700;
          color: ${NUMBER_COLOR}; flex-shrink: 0; line-height: 1.4;
        }

        .lrm-right-text {
          font-size: clamp(12px,1.45vw,17px);
          color: ${TEXT_COLOR}; line-height: 1.4;
        }

        .lrm-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; overflow: visible;
        }

        .lrm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px,1.6vw,18px);
        }

        @media (max-width: 520px) {
          .lrm-grid { grid-template-columns: auto 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader
          subTitle="Start with one item, then connect it to the picture, word, or sentence that matches before moving to the next pair."
          isReview
          sectionLetter="E"
          title={<>Look, read, and match.</>}
        />

        {/* ── Match area ── */}
        <div className="lrm-area" ref={containerRef}>
          <div className="lrm-grid">
            {/* Left images */}
            <div className="lrm-left-col">
              {LEFT_IMGS.map((img) => {
                const isLk =
                  showAns ||
                  (showResults &&
                    connectedLeft(img.id) &&
                    isCorrect(img.id, connections[img.id]));

                return (
                  <div
                    role="button"
                    tabIndex={
                      selectedLeft !== null
                        ? -1
                        : selectedRight !== null && lockedLeft(img.id)
                          ? -1
                          : 0
                    }
                    data-keyboard-choice
                    data-match-side="left"
                    data-match-id={img.id}
                    ref={(el) => {
                      endpointRefs.current["left-" + img.id] = el;
                    }}
                    aria-label={imageDescriptions[img.id]}
                    aria-pressed={selectedLeft === img.id}
                    aria-disabled={lockedLeft(img.id)}
                    onKeyDown={(event) => endpointKeys(event, "left", img.id)}
                    onKeyUp={activationKeys.onKeyUp}
                    onFocus={() => setPreview({ side: "left", id: img.id })}
                    onMouseEnter={() =>
                      setPreview({ side: "left", id: img.id })
                    }
                    onMouseLeave={() => setPreview(null)}
                    key={img.id}
                    className={[
                      "lrm-img-wrap",
                      isLk ? "lrm-img-wrap--locked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      ...{ borderColor: imgBorder(img.id) },
                      borderRadius:
                        { borderColor: imgBorder(img.id) }.borderRadius || 6,
                      boxShadow: lockedLeft(img.id)
                        ? "inset 0 0 0 2px #16a34a"
                        : selectedLeft === img.id
                          ? "inset 0 0 0 2px #2563eb"
                          : undefined,
                      background:
                        selectedLeft === img.id
                          ? "#dbeafe"
                          : { borderColor: imgBorder(img.id) }.background,
                    }}
                    onClick={() => handleLeftClick(img.id)}
                  >
                    <img
                      src={img.src}
                      alt={imageDescriptions[img.id]}
                      className="lrm-img"
                    />
                  </div>
                );
              })}
            </div>

            {/* Left dots column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px,1.5vw,20px)",
                alignItems: "center",
              }}
            >
              {LEFT_IMGS.map((img) => {
                const isWrong = isLeftWrong(img.id);
                return (
                  <div
                    key={img.id}
                    className="lrm-dot-left-wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "clamp(70px,9.5vw,130px)",
                    }}
                  >
                    <div
                      className="lrm-dot-left"
                      ref={(el) => {
                        leftRefs.current[img.id] = el;
                      }}
                      style={{ background: leftDotColor(img.id) }}
                      onClick={() => handleLeftClick(img.id)}
                    />
                    {isWrong && <div className="lrm-badge">✕</div>}
                  </div>
                );
              })}
            </div>

            {/* Right sentences */}
            <div className="lrm-right-col">
              {RIGHT_ITEMS.map((item) => {
                return (
                  <div
                    data-listening={`sentence-${item.id}`}
                    style={((base) => ({
                      ...base,
                      position: "relative",
                      background:
                        listening.activeId === `sentence-${item.id}`
                          ? "#dbeafe"
                          : base.background,
                      boxShadow:
                        listening.activeId === `sentence-${item.id}`
                          ? "0 0 0 3px #2563eb"
                          : base.boxShadow,
                    }))({
                      ...{},
                      borderRadius: {}.borderRadius || 6,
                      boxShadow: lockedRight(item.id)
                        ? "inset 0 0 0 2px #16a34a"
                        : selectedRight === item.id
                          ? "inset 0 0 0 2px #2563eb"
                          : undefined,
                      background:
                        selectedRight === item.id ? "#dbeafe" : {}.background,
                    })}
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
                    className={[
                      "lrm-right-row",
                      showAns ? "lrm-right-row--locked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleRightClick(item.id)}
                  >
                    <div className="lrm-dot-right-wrap">
                      <div
                        className="lrm-dot-right"
                        ref={(el) => {
                          rightRefs.current[item.id] = el;
                        }}
                        style={{ background: rightDotColor(item.id) }}
                      />
                    </div>
                    <span className="lrm-right-num">{item.id}</span>
                    <span className="lrm-right-text">{item.text}</span>
                    {listening.activeId === `sentence-${item.id}` &&
                      renderExerciseSpeaker()}
                  </div>
                );
              })}
            </div>
          </div>
          <svg aria-hidden="true" className="lrm-svg">
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

        {/* ── Buttons ── */}
        <div className="lrm-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              aria-label="Check Answer"
              {...activationKeys}
              onClick={handleCheck}
              disabled={checkDisabled}
              style={{ cursor: checkDisabled ? "not-allowed" : "pointer" }}
              className="check-button2"
            >
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
