import clipPage80B7 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_007_wrong.mp3";
import clipPage80B6 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_006_right.mp3";
import clipPage80B5 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_005_Can_you_come_to_my_sorry.mp3";
import clipPage80B4 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_004_Thanks_anyway.mp3";
import clipPage80B3 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_003_What's_really.mp3";
import clipPage80B2 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_002_Oh,_well.mp3";
import clipPage80B1 from "../../../assets/audio/ClassBook/Unit 9/Page 80 - B/Item_001_No_up.mp3";
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
};

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const CIRCLE_SELECTED = "#2195a6";
const CIRCLE_WRONG = "#ef4444";
const CIRCLE_CORRECT = "#16a34a";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "right" | "wrong"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "No up.", correct: "wrong" },
  { id: 2, text: "Oh, well.", correct: "right" },
  { id: 3, text: "What's really?", correct: "wrong" },
  { id: 4, text: "Thanks anyway.", correct: "right" },
  { id: 5, text: "Can you come to my sorry?", correct: "wrong" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadCircleRightWrong_QB() {
  const listening = useExerciseListening("sb_unit9_page5_q2");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
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
    setAnnouncement("Correct choices shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Selections and feedback cleared.");
  };

  // ── Option state ──
  const getState = (item, label) =>
    selected[item.id] !== label
      ? "idle"
      : showAns
        ? "correct"
        : results[item.id] || "selected";

  const renderOption = (item, value) => {
    const state = getState(item, value);
    const isWrong = state === "wrong";

    let bd = "transparent";
    if (state === "selected") bd = CIRCLE_SELECTED;
    if (state === "correct") bd = CIRCLE_CORRECT;
    if (state === "wrong") bd = CIRCLE_WRONG;

    return (
      <div
        data-listening={`choice-${item.id}-${value}`}
        role="button"
        tabIndex={0}
        data-keyboard-choice
        {...activationKeys}
        aria-label={`Question ${item.id}. ${item.text} Choose ${value}.`}
        aria-pressed={selected[item.id] === value}
        aria-disabled={showAns || results[item.id] === "correct"}
        key={value}
        style={{
          ...{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${bd}`,
            borderRadius: "999px",
            padding: "clamp(2px,0.3vw,5px) clamp(14px,1.8vw,24px)",
            cursor: isLocked ? "default" : "pointer",
            userSelect: "none",
            transition: "border-color 0.15s",
            minWidth: "clamp(50px,7vw,90px)",
          },
          position: "relative",
          background:
            listening.activeId === `choice-${item.id}-${value}` ||
            (selected[item.id] === value &&
              !showAns &&
              results[item.id] === undefined)
              ? "#dbeafe"
              : undefined,
          boxShadow:
            selected[item.id] === value
              ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
              : undefined,
        }}
        onClick={(e) => {
          listening.play(
            `choice-${item.id}-${value}`,
            value === "right" ? clipPage80B6 : clipPage80B7,
          );
          (() => handleSelect(item.id, value))(e);
        }}
      >
        <span
          style={{
            fontSize: "clamp(13px,1.6vw,19px)",
            color: TEXT_COLOR,
            fontWeight: state !== "idle" ? 600 : 400,
            lineHeight: 1.5,
          }}
        >
          {value}
        </span>
        {isWrong && (
          <div
            style={{
              position: "absolute",
              top: -7,
              right: -7,
              width: "clamp(14px,1.6vw,18px)",
              height: "clamp(14px,1.6vw,18px)",
              borderRadius: "50%",
              background: WRONG_BADGE_BG,
              color: WRONG_BADGE_TEXT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(7px,0.8vw,10px)",
              fontWeight: 700,
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            ✕
          </div>
        )}
        {listening.activeId === `choice-${item.id}-${value}` &&
          renderExerciseSpeaker()}
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit9_Unit9_Page5_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit9_Unit9_Page5_Q2"] input:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_Unit9_Page5_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit9_Unit9_Page5_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rcrw-list {
          display: flex;
          flex-direction: column;
   gap: clamp(12px, 2.8vw, 40px);
          width: 100%;
          margin : 7% 0 ;
        }

        /* num | sentence | right | wrong */
        .rcrw-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 18px);
        }

        .rcrw-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rcrw-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
        }

        .rcrw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rcrw-row { grid-template-columns: auto 1fr; }
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
          sectionLetter="B"
          title={
            <>
              Read and circle{" "}
              <span style={{ color: "#ff8c00ff", fontWeight: 700 }}>right</span>{" "}
              or{" "}
              <span style={{ color: "#ff8c00ff", fontWeight: 700 }}>wrong</span>
              .
            </>
          }
        />

        {/* ── Items ── */}
        <div className="rcrw-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rcrw-row">
              <span className="rcrw-num">{item.id}</span>
              <span className="rcrw-text">
                {renderExerciseAudioText({
                  audio: listening,
                  id: `prompt-${item.id}`,
                  src: [
                    clipPage80B1,
                    clipPage80B2,
                    clipPage80B3,
                    clipPage80B4,
                    clipPage80B5,
                  ][item.id - 1],
                  label: item.text,
                  children: item.text,
                })}
              </span>
              {renderOption(item, "right")}
              {renderOption(item, "wrong")}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rcrw-buttons">
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
