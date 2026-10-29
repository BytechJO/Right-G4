import clipPage68D4 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - D/Item_004_She_cleaned_her_room.mp3";
import clipPage68D3 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - D/Item_003_He_listened_to_the_radio.mp3";
import clipPage68D2 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - D/Item_002_He_played_the_violin.mp3";
import clipPage68D1 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - D/Item_001_She_cooked_dinner.mp3";
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
//  🖼️  IMAGES — صورة واحدة لكل item تحتوي الاثنتين
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 16.svg"; // She cooked dinner
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 17.svg"; // He played the violin
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 18.svg"; // He listened to the radio
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 68/SVG/Asset 19.svg";
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
function renderExerciseAudioText({ audio, id, src, label, children }) {
  if (!src || (Array.isArray(src) && !src.some(Boolean))) return children;
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
    <span
      role="button"
      tabIndex={0}
      data-listening={id}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        audio.play(id, src);
      }}
      onKeyDown={keys}
      onKeyUp={keys}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
        backgroundColor: playing ? "#dbeafe" : undefined,
      }}
    >
      {children}
      {playing && renderExerciseSpeaker()}
    </span>
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
}; // She cleaned her room

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const CHECK_COLOR = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TX = "#ffffff";
const HALF_HOVER = "rgba(33,149,166,0.08)";
const HALF_SEL = "rgba(33,149,166,0.12)";
const HALF_WRONG = "rgba(239,68,68,0.08)";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "left" | "right"  — النصف الصحيح في الصورة
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "She cooked dinner.", src: img1, correct: "right" },
  { id: 2, text: "He played the violin.", src: img2, correct: "left" },
  { id: 3, text: "He listened to the radio.", src: img3, correct: "right" },
  { id: 4, text: "She cleaned her room.", src: img4, correct: "right" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QD() {
  const listening = useExerciseListening("sb_unit8_page5_q4");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id, side) => {
    if (showAns || results[id] === "correct") return;
    setSelected((prev) => ({ ...prev, [id]: side }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnnouncement("Selection updated.");
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
    setAnnouncement("Selections and feedback cleared.");
  };

  // ── Half state ──
  const getHalfState = (item, side) =>
    selected[item.id] !== side
      ? "idle"
      : showAns
        ? "correct"
        : results[item.id] || "selected";

  const renderItem = (item) => {
    const leftState = getHalfState(item, "left");
    const rightState = getHalfState(item, "right");

    const showLeftChk = leftState === "selected" || leftState === "correct";
    const showRightChk = rightState === "selected" || rightState === "correct";
    const leftWrong = leftState === "wrong";
    const rightWrong = rightState === "wrong";

    return (
      <div key={item.id} className="rlwd-item">
        {/* Sentence */}
        <div className="rlwd-sentence-row">
          <span className="rlwd-num">{item.id}</span>
          <span className="rlwd-text">
            {renderExerciseAudioText({
              audio: listening,
              id: `sentence-${item.id}`,
              src: [clipPage68D1, clipPage68D2, clipPage68D3, clipPage68D4][
                item.id - 1
              ],
              label: item.text,
              children: item.text,
            })}
          </span>
        </div>

        {/* Single image split into left/right halves */}
        <div className="rlwd-img-wrap">
          <img
            src={item.src}
            alt={
              [
                "A man eating a meal, and a man cooking with two children.",
                "A child playing the violin, and two children playing soccer.",
                "A boy listening with headphones, and a man listening to a radio.",
                "A child flying a kite, and a child standing in a room with toys.",
              ][item.id - 1]
            }
            className="rlwd-img"
          />

          {/* Left half overlay */}
          <div
            style={{
              ...{},
              borderRadius: {}.borderRadius || "6px",
              background:
                selected[item.id] === "left" &&
                !showAns &&
                results[item.id] === undefined
                  ? ""
                  : {}.background,
              boxShadow:
                selected[item.id] === "left"
                  ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                  : undefined,
            }}
            role="button"
            tabIndex={0}
            data-keyboard-choice
            {...activationKeys}
            aria-label={`Question ${item.id}. Left picture. ${item.text}`}
            aria-pressed={selected[item.id] === "left"}
            aria-disabled={showAns || results[item.id] === "correct"}
            className={[
              "rlwd-half rlwd-half--left",
              isLocked ? "rlwd-half--locked" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => handleSelect(item.id, "left")}
          >
            {showLeftChk && (
              <div className="rlwd-check-badge">
                <span
                  style={{
                    color: CHECK_COLOR,
                    fontSize: "clamp(14px,2vw,24px)",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
              </div>
            )}
            {leftWrong && <div className="rlwd-wrong-badge">✕</div>}
          </div>

          {/* Right half overlay */}
          <div
            style={{
              ...{},
              borderRadius: {}.borderRadius || "6px",
              background:
                selected[item.id] === "right" &&
                !showAns &&
                results[item.id] === undefined
                  ? ""
                  : {}.background,
              boxShadow:
                selected[item.id] === "right"
                  ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                  : undefined,
            }}
            role="button"
            tabIndex={0}
            data-keyboard-choice
            {...activationKeys}
            aria-label={`Question ${item.id}. Right picture. ${item.text}`}
            aria-pressed={selected[item.id] === "right"}
            aria-disabled={showAns || results[item.id] === "correct"}
            className={[
              "rlwd-half rlwd-half--right",
              isLocked ? "rlwd-half--locked" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => handleSelect(item.id, "right")}
          >
            {showRightChk && (
              <div className="rlwd-check-badge">
                <span
                  style={{
                    color: CHECK_COLOR,
                    fontSize: "clamp(14px,2vw,24px)",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
              </div>
            )}
            {rightWrong && <div className="rlwd-wrong-badge">✕</div>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit8_Unit8_Page5_Q4"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit8_Unit8_Page5_Q4"] input:focus-visible, [data-adapt-scope="unit8_Unit8_Page5_Q4"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_Unit8_Page5_Q4"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_Unit8_Page5_Q4"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="unit8_Unit8_Page5_Q4"] .rlwd-half:focus-visible {outline-offset:-4px;z-index:2;}
`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── 2×2 grid ── */
        .rlwd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px);
          width: 100%;
        }

        .rlwd-item {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .rlwd-sentence-row {
          display: flex;
          align-items: baseline;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rlwd-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image container */
        .rlwd-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .rlwd-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* Half overlays */
        .rlwd-half {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          cursor: pointer;
          transition: background 0.12s;
        }
        .rlwd-half--right { right: 0; }
        .rlwd-half--locked { cursor: default; }

        /* ✓ badge bottom-right of each half */
        .rlwd-check-badge {
          position: absolute;
          bottom: clamp(4px, 0.6vw, 8px);
          right: clamp(4px, 0.6vw, 8px);
          width: clamp(24px, 3vw, 36px);
          height: clamp(24px, 3vw, 36px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          z-index: 2;
        }

        /* ✕ badge top-right */
        .rlwd-wrong-badge {
          position: absolute;
          top: 6px; right: 6px;
          width: clamp(16px, 1.9vw, 22px);
          height: clamp(16px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TX};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .rlwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlwd-grid { grid-template-columns: 1fr; }
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
          sectionLetter="D"
          title={
            <>
              Read, look, and write <span style={{ color: "red" }}>✓</span> .
            </>
          }
        />

        {/* ── 2×2 Grid ── */}
        <div className="rlwd-grid">{ITEMS.map((item) => renderItem(item))}</div>

        {/* ── Buttons ── */}
        <div className="rlwd-buttons">
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
