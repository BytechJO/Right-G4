import clipPage45D4 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - D/Item_004_Sarah_is_under_the_beach_umbrella.mp3";
import clipPage45D3 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - D/Item_003_Lolo_is_next_to_the_armchair.mp3";
import clipPage45D2 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - D/Item_002_Tom_is_in_front_of_the_tree.mp3";
import clipPage45D1 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - D/Item_001_Tilly_is_under_the_chair.mp3";
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
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 5 (2).svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 5 Under the Weather Folder/Page 45/SVG/Asset 8.svg";
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
  img1: "A boy standing in front of a tree.",
  img2: "A white cat beside an armchair.",
  img3: "A girl lying under a beach umbrella.",
  img4: "A white cat beneath a chair by a table.",
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const DOT_DEFAULT = "#e07b00";
const DOT_SELECTED = "#2096a6";
const LINE_DEFAULT = "#e07b00";
const LINE_CORRECT = "#e07b00";
const LINE_WRONG = "#2096a6";
const LINE_SHOW_ANS = "#c81e1e";
const SENTENCE_SEL_BG = "#e0f7fa";
const SENTENCE_SEL_BORDER = "#2096a6";
const IMG_BORDER_DEFAULT = "#e5e7eb";
const IMG_BORDER_SELECTED = "#2096a6";
const IMG_BORDER_CORRECT = "#16a34a";
const IMG_BORDER_WRONG = "#ef4444";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const LEFT_ITEMS = [
  { id: 1, sentence: "Tilly is under the chair." },
  { id: 2, sentence: "Tom is in front of the tree." },
  { id: 3, sentence: "Lolo is next to the armchair." },
  { id: 4, sentence: "Sarah is under the beach umbrella." },
];

const LEFT_IMGS = [
  { name: "img1", src: img1, correctLeftId: 2 },
  { name: "img3", src: img3, correctLeftId: 4 },
];

const RIGHT_IMGS = [
  { name: "img2", src: img2, correctLeftId: 3 },
  { name: "img4", src: img4, correctLeftId: 1 },
];

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookMatch_QD() {
  const listening = useExerciseListening("sb_unit5_page6_q1");

  const [connections, setConnections] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const [results, setResults] = useState({}),
    [selectedImage, setSelectedImage] = useState(null),
    [preview, setPreview] = useState(null),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null),
    sentenceRefs = useRef({}),
    imageRefs = useRef({}),
    focusFrame = useRef(null);
  const checkDisabled =
    showAns || LEFT_ITEMS.every((item) => results[item.id] === true);
  const lockedLeft = (id) => showAns || results[id] === true;
  const lockedImage = (name) =>
    showAns ||
    Object.keys(connections).some(
      (id) => connections[id] === name && results[id] === true,
    );
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const focusTarget = (side) => {
    cancelFocus();
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      const item =
        side === "image"
          ? [...LEFT_IMGS, ...RIGHT_IMGS].find((x) => !lockedImage(x.name))
          : LEFT_ITEMS.find((x) => !lockedLeft(x.id));
      (side === "image"
        ? imageRefs.current[item?.name]
        : sentenceRefs.current[item?.id]
      )?.focus({ preventScroll: true });
    });
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  const cancel = () => {
    cancelFocus();
    setSelectedLeft(null);
    setSelectedImage(null);
    setPreview(null);
  };
  const connect = (id, name, keyboard) => {
    if (lockedLeft(id) || lockedImage(name)) return;
    const next = { ...connections };
    Object.keys(next).forEach((k) => {
      if (Number(k) === id || next[k] === name) delete next[k];
    });
    next[id] = name;
    setConnections(next);
    setResults((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([k, v]) =>
            v === true || (next[k] === connections[k] && Number(k) !== id),
        ),
      ),
    );
    cancel();
    setAnnouncement("Connection made.");
    if (keyboard) focusTarget("text");
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
      const items =
        side === "text"
          ? LEFT_ITEMS.filter((x) => !lockedLeft(x.id)).map((x) => x.id)
          : [...LEFT_IMGS, ...RIGHT_IMGS]
              .filter((x) => !lockedImage(x.name))
              .map((x) => x.name);
      const index = items.indexOf(value),
        next =
          items[
            (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) %
              items.length
          ];
      (side === "text"
        ? sentenceRefs.current[next]
        : imageRefs.current[next]
      )?.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat)
        (side === "text" ? handleLeftClick : handleRightClick)(value, true);
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
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    return {
      x:
        ((eRect.left - cRect.left + eRect.width / 2) *
          containerRef.current.offsetWidth) /
        cRect.width,
      y:
        ((eRect.top - cRect.top + eRect.height / 2) *
          containerRef.current.offsetHeight) /
        cRect.height,
    };
  }, []);

  const isCorrect = (leftId, imgName) => {
    const r = ALL_IMGS.find((ri) => ri.name === imgName);
    return r && r.correctLeftId === Number(leftId);
  };
  const connectedRight = (name) => Object.values(connections).includes(name);
  const connectedLeft = (id) =>
    Object.prototype.hasOwnProperty.call(connections, id);

  const lineColor = (id) =>
    showAns || results[id] === true
      ? "#16a34a"
      : results[id] === false
        ? "#ef4444"
        : LINE_DEFAULT;

  const handleLeftClick = (id, keyboard = false) => {
    listening.play(
      `sentence-${id}`,
      [clipPage45D1, clipPage45D2, clipPage45D3, clipPage45D4][id - 1],
    );
    if (lockedLeft(id)) return;
    if (selectedImage !== null) {
      connect(id, selectedImage, keyboard);
      return;
    }
    setSelectedLeft((prev) => (prev === id ? null : id));
    setPreview(null);
    setAnnouncement("Sentence selected. Choose a picture.");
    if (keyboard && selectedLeft !== id) focusTarget("image");
  };

  const handleRightClick = (name, keyboard = false) => {
    if (lockedImage(name)) return;
    if (selectedLeft !== null) {
      connect(selectedLeft, name, keyboard);
      return;
    }
    setSelectedImage((prev) => (prev === name ? null : name));
    setPreview(null);
    setAnnouncement("Picture selected. Choose a sentence.");
    if (keyboard && selectedImage !== name) focusTarget("text");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (Object.keys(connections).length < LEFT_ITEMS.length) {
      ValidationAlert.info("Please connect all sentences to images first.");
      return;
    }
    let score = 0;
    Object.entries(connections).forEach(([lid, name]) => {
      if (isCorrect(lid, name)) score++;
    });
    setShowResults(true);
    setResults(
      Object.fromEntries(
        LEFT_ITEMS.map((item) => [
          item.id,
          isCorrect(item.id, connections[item.id]),
        ]),
      ),
    );
    cancel();
    setAnnouncement(`Score: ${score} out of ${LEFT_ITEMS.length}.`);
    if (score === LEFT_ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${LEFT_ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${LEFT_ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${LEFT_ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    const ans = {};
    ALL_IMGS.forEach((r) => {
      ans[r.correctLeftId] = r.name;
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
    Object.entries(connections).map(([leftId, imgName]) => {
      const p1 = getDotCenter(leftRefs.current[leftId]);
      const p2 = getDotCenter(rightRefs.current[imgName]);
      if (!p1 || !p2) return null;
      return (
        <line
          key={`${leftId}-${imgName}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={lineColor(leftId, imgName)}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    });

  // ── Dot colors ──
  const leftDotColor = (id) => {
    if (selectedLeft === id) return DOT_SELECTED;
    if (connectedLeft(id)) {
      if (showAns) return LINE_SHOW_ANS;
      if (showResults)
        return isCorrect(id, connections[id]) ? LINE_CORRECT : LINE_WRONG;
    }
    return DOT_DEFAULT;
  };

  const rightDotColor = (name) => {
    if (!connectedRight(name)) return DOT_DEFAULT;
    const lid = Object.keys(connections).find((k) => connections[k] === name);
    if (!lid) return DOT_DEFAULT;
    if (showAns) return LINE_SHOW_ANS;
    if (showResults) return isCorrect(lid, name) ? LINE_CORRECT : LINE_WRONG;
    return DOT_DEFAULT;
  };

  const imgBorderColor = (name) =>
    lockedImage(name)
      ? "#16a34a"
      : isRightWrong(name)
        ? IMG_BORDER_WRONG
        : selectedImage === name
          ? IMG_BORDER_SELECTED
          : connectedRight(name)
            ? IMG_BORDER_SELECTED
            : "transparent";

  // ── Badge helpers ──
  const isLeftWrong = (id) => !showAns && results[id] === false;
  const isRightWrong = (name) =>
    !showAns &&
    Object.keys(connections).some(
      (id) => connections[id] === name && results[id] === false,
    );

  const renderImgCard = (item) => {
    const isLocked = lockedImage(item.name);
    return (
      <div
        style={{
          "--matching-row":
            ALL_IMGS.findIndex((image) => image.name === item.name) + 1,
        }}
        key={item.name}
        className="rlm-img-wrap"
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            className="rlm-dot-img"
            ref={(el) => {
              rightRefs.current[item.name] = el;
            }}
            style={{ background: rightDotColor(item.name) }}
            onClick={() => handleRightClick(item.name)}
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          data-keyboard-choice
          ref={(el) => {
            imageRefs.current[item.name] = el;
          }}
          aria-label={imageDescriptions[item.name]}
          aria-pressed={selectedImage === item.name}
          aria-disabled={lockedImage(item.name)}
          onKeyDown={(event) => endpointKeys(event, "image", item.name)}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onFocus={() => setPreview({ side: "image", id: item.name })}
          onMouseEnter={() => setPreview({ side: "image", id: item.name })}
          onMouseLeave={() => setPreview(null)}
          className={["rlm-img-card", isLocked ? "rlm-img-card--locked" : ""]
            .filter(Boolean)
            .join(" ")}
          style={{ borderColor: imgBorderColor(item.name) }}
          onClick={() => handleRightClick(item.name)}
        >
          <img
            src={item.src}
            alt={imageDescriptions[item.name]}
            className="rlm-img"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit5_Unit5_Page6_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit5_Unit5_Page6_Q1"] input:focus-visible, [data-adapt-scope="unit5_Unit5_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_Unit5_Page6_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rlm-area { position: relative; width: 100%; }

        .rlm-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 220px);
          row-gap: clamp(18px, 2.5vw, 30px);
          align-items: center;
          width: 100%;
          min-width: 0;
        }

        /* ── Left section: sentences + dots column ── */
        .rlm-left-section {
          display: contents;
        }

        /* عمود الجمل */
        .rlm-sentences-col {
          display: contents;
        }

        /* عمود النقاط — عرض ثابت، محاذاة مع بعض */
        .rlm-dots-col {
          display: contents;
        }

        /* كل صف: رقم + جملة */
        .rlm-row {
          grid-column: 1;
          grid-row: var(--matching-row);
          display: flex;
          align-items: center;
          min-width: 0;
        }

        .rlm-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          margin-right: clamp(4px, 0.5vw, 8px);
        }

        .rlm-sentence-wrap {
          display: flex;
          align-items: center;
          padding: clamp(4px, 0.5vw, 7px) clamp(8px, 1vw, 12px);
          border-radius: 10px;
          border: 2px solid transparent;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
          user-select: none;
        }
        .rlm-sentence-wrap--selected {
          border-color: ${SENTENCE_SEL_BORDER};
          background: ${SENTENCE_SEL_BG};
        }
        .rlm-sentence-wrap--locked { cursor: default; }

        .rlm-sentence-text {
          font-size: clamp(12px, 1.45vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: normal;
          overflow-wrap: anywhere;
        };
          line-height: 1.4;
          white-space: nowrap;
        }

        /* نقطة الجملة في العمود المنفصل */
        .rlm-dot-sentence-wrap {
          grid-column: 2;
          grid-row: var(--matching-row);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 6px;
        }

        .rlm-dot-sentence {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          flex-shrink: 0;
        }
        .rlm-dot-sentence:hover {
          transform: scale(1.3);
        }

        .rlm-images-area {
          display: contents;
        }

        .rlm-img-col-left {
          display: contents;
        }

        .rlm-img-col-right {
          display: contents;
        }

        .rlm-img-wrap {
          grid-column: 3;
          grid-row: var(--matching-row);
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
          min-width: 0;
        }

        .rlm-dot-img {
          width:  clamp(11px, 1.3vw, 15px);
          height: clamp(11px, 1.3vw, 15px);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.15s;
        }

        .rlm-img-card {
          cursor: pointer;
          border-radius: 12px;
          border: 2px solid transparent;
          transition: border-color 0.15s, transform 0.1s;
          // flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        .rlm-img-card:hover { transform: scale(1.02); }
        .rlm-img-card--locked { cursor: default; }
        .rlm-img-card--locked:hover { transform: none; }

        .rlm-img {
          width: 130px;
          height: auto;
          // aspect-ratio: 4 / 3;
          object-fit: contain;
          display: block;
          pointer-events: none;
        }

        /* ── ✕ Badge ── */
        .rlm-badge {
          position: absolute;
          top: -8px; right: -8px;
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

        .rlm-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .rlm-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.4vw, 16px);
        }

        @media (max-width: 768px) {
          [data-adapt-scope="unit5_Unit5_Page6_Q1"] { padding: 16px; }
        }

        @media (max-width: 520px) {
          .rlm-grid {
            grid-template-columns: minmax(0, 1fr) 28px minmax(0, .9fr);
            row-gap: 18px;
          }
          .rlm-sentence-wrap { padding: 4px; }
          .rlm-num { margin-right: 3px; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 1.8vw, 20px)",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <ExerciseHeader
          subTitle="Start with one item, then connect it to the picture, word, or sentence that matches before moving to the next pair."
          sectionLetter="D"
          title={<>Read, look, and match.</>}
        />

        <div className="rlm-area" ref={containerRef}>
          <div className="rlm-grid">
            {/* ── Left section: جمل + عمود نقاط منفصل ── */}
            <div className="rlm-left-section">
              {/* عمود الجمل */}
              <div className="rlm-sentences-col">
                {LEFT_ITEMS.map((item, index) => {
                  const isSelected = selectedLeft === item.id;
                  const isLocked = lockedLeft(item.id);
                  return (
                    <div
                      style={{ "--matching-row": index + 1 }}
                      key={item.id}
                      className="rlm-row"
                    >
                      <span className="rlm-num">{item.id}</span>
                      <div
                        style={{
                          position: "relative",
                          boxShadow:
                            listening.activeId === `sentence-${item.id}`
                              ? "0 0 0 3px #2563eb"
                              : undefined,
                          backgroundColor:
                            listening.activeId === `sentence-${item.id}`
                              ? "#dbeafe"
                              : undefined,
                        }}
                        role="button"
                        tabIndex={0}
                        data-keyboard-choice
                        ref={(el) => {
                          sentenceRefs.current[item.id] = el;
                        }}
                        aria-label={item.sentence}
                        aria-pressed={selectedLeft === item.id}
                        aria-disabled={lockedLeft(item.id)}
                        onKeyDown={(event) =>
                          endpointKeys(event, "text", item.id)
                        }
                        onKeyUp={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            event.stopPropagation();
                          }
                        }}
                        onFocus={() =>
                          setPreview({ side: "text", id: item.id })
                        }
                        onMouseEnter={() =>
                          setPreview({ side: "text", id: item.id })
                        }
                        onMouseLeave={() => setPreview(null)}
                        className={[
                          "rlm-sentence-wrap",
                          isSelected ? "rlm-sentence-wrap--selected" : "",
                          isLocked ? "rlm-sentence-wrap--locked" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handleLeftClick(item.id)}
                      >
                        <span className="rlm-sentence-text">
                          {item.sentence}
                        </span>
                        {listening.activeId === `sentence-${item.id}` &&
                          renderExerciseSpeaker()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* عمود النقاط — منفصل ومحاذي */}
              <div className="rlm-dots-col">
                {LEFT_ITEMS.map((item, index) => (
                  <div
                    style={{ "--matching-row": index + 1 }}
                    key={item.id}
                    className="rlm-dot-sentence-wrap"
                  >
                    <div
                      className="rlm-dot-sentence"
                      ref={(el) => {
                        leftRefs.current[item.id] = el;
                      }}
                      style={{ background: leftDotColor(item.id) }}
                      onClick={() => handleLeftClick(item.id)}
                    />
                    {isLeftWrong(item.id) && <div className="rlm-badge">✕</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="rlm-images-area">
              <div className="rlm-img-col-left">
                {LEFT_IMGS.map(renderImgCard)}
              </div>
              <div className="rlm-img-col-right">
                {RIGHT_IMGS.map(renderImgCard)}
              </div>
            </div>
          </div>
          <svg
            className="rlm-svg"
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
          >
            {renderLines()}
            {(() => {
              let id = selectedLeft,
                name = selectedImage;
              if (id !== null && preview?.side === "image") name = preview.id;
              else if (name !== null && preview?.side === "text")
                id = preview.id;
              else return null;
              if (lockedLeft(id) || lockedImage(name)) return null;
              const a = getDotCenter(leftRefs.current[id]),
                b = getDotCenter(rightRefs.current[name]);
              return a && b ? (
                <line
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

        <div className="rlm-buttons">
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
