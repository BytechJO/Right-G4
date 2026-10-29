import clipPage50A7 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_007_Roy_plays_soccer_in_gym_class.mp3";
import clipPage50A6 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_006_We_have_a_math_test_today.mp3";
import clipPage50A5 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_005_The_keys_are_in_the_car.mp3";
import clipPage50A4 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_004_Megan_is_studying_for_her_gym.mp3";
import clipPage50A3 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_003_Lewis_doesn't_like_to_keys_coats_in_the_winter.mp3";
import clipPage50A2 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_002_Tom_wears_science_every_day.mp3";
import clipPage50A1 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - A/Item_001_I_pack_many_books_in_my_backpack.mp3";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const UNDERLINE_COLOR = "#2b2b2b";
const BOX_BORDER = "#2096a6";
const BOX_RADIUS = "8px";
const BOX_SIZE_MIN = "32px";

// Check box colors
const CHECK_COLOR = "#c81e1e"; // أحمر — نفس الكتاب
const CROSS_COLOR = "#c81e1e";

// Selected (before check)
const BOX_SELECTED_BG = "transparent";
const BOX_SELECTED_BD = "#2096a6";

// After check
const BOX_CORRECT_BG = "transparent";
const BOX_CORRECT_BD = "#2096a6";
const BOX_WRONG_BG = "transparent";
const BOX_WRONG_BD = "#2096a6";

const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    text: "I",
    underlined: "pack",
    rest: "many books in my backpack.",
    correct: "check",
  },
  {
    id: 2,
    text: "Tom wears",
    underlined: "science",
    rest: "every day.",
    correct: "cross",
  },
  {
    id: 3,
    text: "Lewis doesn't like to",
    underlined: "keys",
    rest: "coats in the winter.",
    correct: "cross",
  },
  {
    id: 4,
    text: "Megan is studying for her",
    underlined: "gym",
    rest: ".",
    correct: "cross",
  },
  {
    id: 5,
    text: "The",
    underlined: "keys",
    rest: "are in the car.",
    correct: "check",
  },
  {
    id: 6,
    text: "We have a math",
    underlined: "test",
    rest: "today.",
    correct: "check",
  },
  {
    id: 7,
    text: "Roy plays soccer in",
    underlined: "gym",
    rest: "class.",
    correct: "check",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckCross_QA() {
  const listening = useExerciseListening("sb_unit6_page5_q1");

  const [selected, setSelected] = useState({}); // { id: "check" | "cross" | null }
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
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === value ? null : value,
    }));
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  // ── Box state ──
  // returns: "idle" | "selected" | "correct" | "wrong"
  const getBoxState = (item, boxType) => {
    const sel = selected[item.id];
    if (sel !== boxType) return "idle";
    if (showAns) return "correct";
    if (results[item.id] !== undefined)
      return boxType === item.correct ? "correct" : "wrong";
    return "selected";
  };

  const renderBox = (item, boxType) => {
    const state = getBoxState(item, boxType);
    const symbol = boxType === "check" ? "✓" : "✕";
    const isWrong = state === "wrong";
    const show = state !== "idle";

    let bg = "#ffffff";
    let bd = BOX_BORDER;
    let symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;

    if (state === "selected") {
      bg = BOX_SELECTED_BG;
      bd = BOX_SELECTED_BD;
    }
    if (state === "correct") {
      bg = BOX_CORRECT_BG;
      bd = BOX_CORRECT_BD;
    }
    if (state === "wrong") {
      bg = BOX_WRONG_BG;
      bd = BOX_WRONG_BD;
    }

    return (
      <div
        role="button"
        tabIndex={0}
        data-keyboard-choice
        {...activationKeys}
        aria-label={`Question ${item.id}. ${boxType}`}
        aria-pressed={selected[item.id] === boxType}
        aria-disabled={showAns || results[item.id] === "correct"}
        key={boxType}
        style={{
          ...{
            position: "relative",
            width: `clamp(40px, 3.8vw, 40px)`,
            height: `clamp(40px, 3.8vw, 40px)`,
            border: `2px solid ${bd}`,
            borderRadius: BOX_RADIUS,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isLocked ? "default" : "pointer",
            transition: "border-color 0.15s, background 0.15s",
            flexShrink: 0,
            userSelect: "none",
          },
          borderRadius:
            {
              position: "relative",
              width: `clamp(40px, 3.8vw, 40px)`,
              height: `clamp(40px, 3.8vw, 40px)`,
              border: `2px solid ${bd}`,
              borderRadius: BOX_RADIUS,
              background: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isLocked ? "default" : "pointer",
              transition: "border-color 0.15s, background 0.15s",
              flexShrink: 0,
              userSelect: "none",
            }.borderRadius || "6px",
          background:
            selected[item.id] === boxType &&
            !showAns &&
            results[item.id] === undefined
              ? "#dbeafe"
              : {
                  position: "relative",
                  width: `clamp(40px, 3.8vw, 40px)`,
                  height: `clamp(40px, 3.8vw, 40px)`,
                  border: `2px solid ${bd}`,
                  borderRadius: BOX_RADIUS,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isLocked ? "default" : "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                  flexShrink: 0,
                  userSelect: "none",
                }.background,
          boxShadow:
            selected[item.id] === boxType
              ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
              : undefined,
        }}
        onClick={() => handleSelect(item.id, boxType)}
      >
        {show && (
          <span
            style={{
              fontSize: `clamp(16px, 2.2vw, 28px)`,
              fontWeight: 700,
              color: symColor,
              lineHeight: 1,
            }}
          >
            {symbol}
          </span>
        )}
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
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit6_Unit6_Page5_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit6_Unit6_Page5_Q1"] input:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rwcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* Single row: num | sentence | boxes */
        .rwcc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        .rwcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        /* Sentence: normal + underlined + normal */
        .rwcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          flex-wrap: wrap;
          display: flex;
          align-items: baseline;
          gap: 0;
        }

        .rwcc-word {
          white-space: pre-wrap;
        }

        .rwcc-underlined {
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
        }

        /* Two boxes: ✓ then ✕ */
        .rwcc-boxes {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          flex-shrink: 0;
        }

        .rwcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
          sectionLetter="A"
          title={
            <>
              Read and write <span style={{ color: "red" }}>✓ </span> or{" "}
              <span style={{ color: "red" }}>✕</span> .
            </>
          }
        />

        {/* ── Items ── */}
        <div className="rwcc-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwcc-row">
              {/* Number */}
              <span className="rwcc-num">{item.id}</span>

              {/* Sentence */}
              {renderExerciseAudioGroup({
                audio: listening,
                id: `sentence-${item.id}`,
                src: [
                  clipPage50A1,
                  clipPage50A2,
                  clipPage50A3,
                  clipPage50A4,
                  clipPage50A5,
                  clipPage50A6,
                  clipPage50A7,
                ][item.id - 1],
                label: [item.text, item.underlined, item.rest].join(" "),
                className: "rwcc-sentence",
                children: (
                  <>
                    {item.text && (
                      <span className="rwcc-word">{item.text}&nbsp;</span>
                    )}
                    <span className="rwcc-underlined">{item.underlined}</span>
                    {item.rest && (
                      <span className="rwcc-word">&nbsp;{item.rest}</span>
                    )}
                  </>
                ),
              })}

              {/* Two boxes: ✓ | ✕ */}
              <div className="rwcc-boxes">
                {renderBox(item, "check")}
                {renderBox(item, "cross")}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwcc-buttons">
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
