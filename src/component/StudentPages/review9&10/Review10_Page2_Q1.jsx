import clipPage91C6 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_006_She_has_watered_the_flowers.mp3";
import clipPage91C5 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_005_She_has_broken_her_yo-yo.mp3";
import clipPage91C4 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_004_He_has_played_the_violin.mp3";
import clipPage91C3 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_003_He_has_taken_a_picture.mp3";
import clipPage91C2 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_002_She_has_ridden_a_horse.mp3";
import clipPage91C1 from "../../../assets/audio/ClassBook/Unit 10/Page 91 - C/Item_001_He_has_listened_to_the_radio.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 45.svg"; // radio
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 46.svg"; // horse
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 27 (2).svg"; // picture
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 47.svg"; // violin
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 49.svg"; // yo-yo
import img6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 91/SVG/Asset 48.svg";
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

function renderExerciseAudioGroup({
  audio,
  id,
  src,
  label,
  children,
  style,
  key: renderKey,
  ...props
}) {
  if (!src || (Array.isArray(src) && !src.some(Boolean)))
    return (
      <div key={renderKey} {...props} style={style}>
        {children}
      </div>
    );
  const playing = audio.activeId === id;
  const keys = (event) => {
    if (
      event.target !== event.currentTarget ||
      (event.key !== "Enter" && event.key !== " ")
    )
      return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return (
    <div
      key={renderKey}
      {...props}
      role="group"
      aria-roledescription="sentence audio"
      tabIndex={0}
      data-listening={id}
      aria-label={label}
      onKeyDown={keys}
      onKeyUp={keys}
      onClick={(event) => {
        if (
          event.target.closest('input,select,textarea,button,[role="button"]')
        )
          return;
        event.stopPropagation();
        audio.play(id, src);
      }}
      style={{
        ...style,
        position: style?.position || "relative",
        borderRadius: style?.borderRadius || 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
        backgroundColor: playing ? "#dbeafe" : style?.backgroundColor,
      }}
    >
      {children}
      {playing && renderExerciseSpeaker()}
    </div>
  );
}

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

// flowers

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const CHECK_COLOR = "#c81e1e";
const CROSS_COLOR = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TX = "#ffffff";
const IMG_BORDER_DEF = "#e5e7eb";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" ✓ | "cross" ✕
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: img1, text: "He has listened to the radio.", correct: "check" },
  { id: 2, src: img2, text: "She has ridden a horse.", correct: "cross" },
  { id: 3, src: img3, text: "He has taken a picture.", correct: "check" },
  { id: 4, src: img4, text: "He has played the violin.", correct: "check" },
  { id: 5, src: img5, text: "She has broken her yo-yo.", correct: "cross" },
  { id: 6, src: img6, text: "She has watered the flowers.", correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheckX_QC() {
  const listening = useExerciseListening("sb_review10_page2_q1");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({}),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id, value) => {
    if (showAns || results[id] === "correct") return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnnouncement(
      value
        ? `Answer ${id}: ${value === "check" ? "true" : "false"}.`
        : `Answer ${id} cleared.`,
    );
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (
      !ITEMS.every(
        (item) =>
          selected[item.id] !== undefined &&
          selected[item.id] !== null &&
          selected[item.id] !== "",
      )
    ) {
      ValidationAlert.info("Please choose an answer for each question.");
      setAnnouncement("Please choose an answer for each question.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || selected[item.id] === item.correct
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (value) => value === "correct",
    ).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    setSelected(
      Object.fromEntries(ITEMS.map((item) => [item.id, item.correct])),
    );
    setResults({});
    setShowResults(false);
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Selections cleared.");
  };

  const getState = (item) =>
    showAns ? "correct" : results[item.id] || "editing";

  return (
    <div
      data-adapt-scope="review9&10_Review10_Page2_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review9&10_Review10_Page2_Q1"] input:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review10_Page2_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review10_Page2_Q1"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review10_Page2_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── 2×3 grid (2 cols) ── */
        .rlwx-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(18px, 2.6vw, 36px) clamp(22px, 3.2vw, 48px);
          width: 100%;
        }

        /* Single item */
        .rlwx-item {
          display: flex;
          flex-direction: column;
          gap: clamp(5px, 0.7vw, 9px);
        }

        /* Sentence row */
        .rlwx-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwx-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rlwx-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image + badge container */
        .rlwx-img-wrap {
          position: relative;
          width: 60%;
          overflow: visible;
          cursor: pointer;
          transition: border-color 0.12s;
        }
        .rlwx-img-wrap--locked { cursor: default; }

        .rlwx-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ✓ / ✕ badge — bottom right */
        .rlwx-symbol-badge {
          position: absolute;
          bottom: clamp(4px, 0vw, 8px);
          right: clamp(4px, 0vw, 8px);
          width: clamp(28px, 3.6vw, 44px);
          height: clamp(28px, 3.6vw, 44px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(16px, 2.2vw, 26px);
          font-weight: 900;
          pointer-events: none;
          z-index: 2;
          transition: border-color 0.12s;
        }

        /* ✕ wrong badge top-right */
        .rlwx-wrong-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TX};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .rlwx-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlwx-grid { grid-template-columns: 1fr; }
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
        <ExerciseHeader
          subTitle="Read each statement and compare it with the picture or clue, then choose the correct two-way answer."
          isReview
          sectionLetter="C"
          title={
            <>
              Read, look, and write
              <span style={{ color: CHECK_COLOR, fontWeight: 900 }}> ✓ </span>
              or
              <span style={{ color: CROSS_COLOR, fontWeight: 900 }}> X</span>.
            </>
          }
        />

        {/* ── 2×3 Grid ── */}
        <div className="rlwx-grid">
          {ITEMS.map((item) => {
            const state = getState(item);
            const sel = selected[item.id];
            const symbol = sel === "check" ? "✓" : sel === "cross" ? "✕" : null;
            const symClr = sel === "check" ? CHECK_COLOR : CROSS_COLOR;
            const isWrong = state === "wrong";
            const locked = isLocked;

            return (
              <div key={item.id} className="rlwx-item">
                {/* Sentence */}
                {renderExerciseAudioGroup({
                  audio: listening,
                  id: `sentence-${item.id}`,
                  src: [
                    clipPage91C1,
                    clipPage91C2,
                    clipPage91C3,
                    clipPage91C4,
                    clipPage91C5,
                    clipPage91C6,
                  ][item.id - 1],
                  label: item.text,
                  className: "rlwx-sentence-row",
                  style: undefined,
                  key: item.id,
                  children: (
                    <>
                      <span className="rlwx-num">{item.id}</span>
                      <span className="rlwx-text">{item.text}</span>
                    </>
                  ),
                })}

                {/* Image — click toggles check↔cross */}
                <div
                  role="button"
                  tabIndex={0}
                  data-keyboard-choice
                  {...activationKeys}
                  aria-label={`Question ${item.id}. ${item.text} ${sel === "check" ? "True" : sel === "cross" ? "False" : "No answer"}. Activate to cycle true, false, and empty.`}
                  aria-pressed={!!sel}
                  aria-disabled={showAns || results[item.id] === "correct"}
                  style={{
                    borderRadius: 8,
                    outline: sel
                      ? `2px solid ${showAns || results[item.id] === "correct" ? "#16a34a" : isWrong ? "#ef4444" : "#2563eb"}`
                      : undefined,
                    outlineOffset: 0,
                    background:
                      sel && !showAns && results[item.id] === undefined
                        ? "#dbeafe"
                        : undefined,
                  }}
                  className={[
                    "rlwx-img-wrap",
                    locked ? "rlwx-img-wrap--locked" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    handleSelect(
                      item.id,
                      !sel ? "check" : sel === "check" ? "cross" : null,
                    )
                  }
                >
                  <img
                    src={item.src}
                    alt={
                      [
                        "An older man listening to a radio.",
                        "A girl beside a goat in a pen.",
                        "A person taking a photograph of a butterfly.",
                        "A boy playing a violin.",
                        "Two girls on swings.",
                        "A girl watering flowers.",
                      ][item.id - 1]
                    }
                    className="rlwx-img"
                  />

                  {/* Symbol badge */}
                  {symbol && (
                    <div
                      className="rlwx-symbol-badge"
                      style={{
                        color: symClr,
                        borderColor: isWrong ? WRONG_BADGE_BG : "#e5e7eb",
                      }}
                    >
                      {symbol}
                    </div>
                  )}

                  {/* ✕ wrong badge */}
                  {isWrong && <div className="rlwx-wrong-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwx-buttons">
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
