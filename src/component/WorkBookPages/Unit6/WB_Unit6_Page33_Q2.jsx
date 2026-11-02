import clipPage33B9 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_009_a_cat.mp3";
import clipPage33B8 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_008_trainers.mp3";
import clipPage33B7 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_007_books_and_pens.mp3";
import clipPage33B6 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_006_keys.mp3";
import clipPage33B5 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_005_a_robot.mp3";
import clipPage33B4 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_004_a_suitcase.mp3";
import clipPage33B3 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_003_a_backpack.mp3";
import clipPage33B2 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_002_a_lion.mp3";
import clipPage33B1 from "../../../assets/audio/WorkBook/Unit 6/Page 33 - B/Item_001_What_does_John_need_for_school.mp3";
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
import imgLion from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 10.svg";
import imgBackpack from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 11.svg";
import imgSuitcase from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 12.svg";
import imgRobot from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 13.svg";
import imgCat from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 14.svg";
import imgTrainers from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 15.svg";
import imgBooksP from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 16.svg";
import imgKeys from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U6 Folder/Page 33/SVG/SVG/Asset 17.svg";
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
const SELECTED_CIRCLE_COLOR = "#ef4444";
const CORRECT_CIRCLE_COLOR = "#2096a6";
const WRONG_CIRCLE_COLOR = "#ef4444";
const LABEL_COLOR = "#2b2b2b";
const QUESTION_COLOR = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, src: imgLion, label: "a lion", correct: false },
  { id: 2, src: imgBackpack, label: "a backpack", correct: true },
  { id: 3, src: imgSuitcase, label: "a suitcase", correct: false },
  { id: 4, src: imgRobot, label: "a robot", correct: false },
  { id: 5, src: imgKeys, label: "keys", correct: false },
  { id: 6, src: imgBooksP, label: "books and pens", correct: true },
  { id: 7, src: imgTrainers, label: "trainers", correct: false },
  { id: 8, src: imgCat, label: "a cat", correct: false },
];

const TOTAL = ITEMS.length; // 8

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookCircle_QB() {
  const listening = useExerciseListening("wb_unit6_page33_q2");

  const [selected, setSelected] = useState(new Set());
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({}),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const toggleItem = (id) => {
    if (showAns || results[id] === "correct") return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
    if (!selected.size) {
      ValidationAlert.info("Please circle at least one item first.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        selected.has(item.id) === item.correct ? "correct" : "wrong",
      ]),
    );
    const score = Object.values(next).filter((v) => v === "correct").length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${TOTAL}. Correct choices, including correctly unselected items, are locked.`,
    );
    if (score === TOTAL) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${TOTAL}`);
    } else if (score) ValidationAlert.warning(`Score: ${score} / ${TOTAL}`);
    else ValidationAlert.error(`Score: 0 / ${TOTAL}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    const correct = new Set(ITEMS.filter((i) => i.correct).map((i) => i.id));
    setSelected(correct);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct choices shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected(new Set());
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  const getCardState = (item) => {
    if (!selected.has(item.id)) return "none";
    if (showAns || results[item.id] === "correct") return "correct";
    return results[item.id] === "wrong" ? "wrong" : "selected";
  };

  return (
    <div
      data-adapt-scope="Unit6_WB_Unit6_Page33_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit6_WB_Unit6_Page33_Q2"] input:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit6_WB_Unit6_Page33_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rlc-question {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 400;
          color: ${QUESTION_COLOR};
          line-height: 1.5;
          margin: 0;
        }

        /* ── 4×2 grid ── */
        .rlc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 3vw, 40px) clamp(16px, 2.4vw, 32px);
        }

        /* ── Card ── */
        .rlc-card {
          position: relative;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }
        .rlc-card--locked { cursor: default; }

        /* ── Image ── */
        .rlc-img {
          width: 100%;
          height: auto !important;
          display: block;
        }

        /* ── Label area ── */
        .rlc-label-area {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(5px, 0.7vw, 9px) 6px;
          background: #ffffff;
          box-sizing: border-box;
          min-height: clamp(30px, 3.5vw, 42px);
          cursor: pointer;
        }

        /* ── Label wrapper — oval border ── */
        .rlc-label-wrap {
          position: relative;
          display: inline-block;
          padding: 2px 12px;
        }

        .rlc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        .rlc-label-wrap--selected .rlc-oval  { border-color: ${SELECTED_CIRCLE_COLOR}; }

        .rlc-label-wrap--correct .rlc-oval   { border-color: ${CORRECT_CIRCLE_COLOR}; }

        .rlc-label-wrap--wrong .rlc-oval     { border-color: ${WRONG_CIRCLE_COLOR}; }

        .rlc-label {
          font-size: clamp(12px, 1.4vw, 17px);
          font-weight: 400;
          color: ${LABEL_COLOR};
          text-align: center;
          line-height: 1.3;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ── ✕ wrong badge ── */
        .rlc-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: clamp(18px, 2vw, 24px);
          height: clamp(18px, 2vw, 24px);
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          pointer-events: none;
          z-index: 3;
        }

        /* Buttons */
        .rlc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlc-grid { grid-template-columns: repeat(2, 1fr); }
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
          subTitle="Read the clue carefully, then select the option that best matches the word, picture, or sentence."
          sectionLetter="B"
          title={<>Read, look, and circle.</>}
        />

        {/* ── Question ── */}
        {renderExerciseAudioGroup({
          audio: listening,
          id: "question",
          src: clipPage33B1,
          label: "What does John need for school?",
          className: "rlc-question",
          style: undefined,
          key: "question",
          children: <>What does John need for school?</>,
        })}

        {/* ── Grid ── */}
        <div className="rlc-grid">
          {ITEMS.map((item) => {
            const state = getCardState(item);

            const labelWrapClass = [
              "rlc-label-wrap",
              state === "selected" ? "rlc-label-wrap--selected" : "",
              state === "correct" ? "rlc-label-wrap--correct" : "",
              state === "wrong" ? "rlc-label-wrap--wrong" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                data-listening={`choice-${item.id}`}
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-label={`Circle ${item.label} if John needs it for school.`}
                aria-pressed={selected.has(item.id)}
                aria-disabled={showAns || results[item.id] === "correct"}
                style={{
                  ...{
                    position: "relative",
                    borderRadius: 8,
                    background:
                      selected.has(item.id) &&
                      results[item.id] === undefined &&
                      !showAns
                        ? "#dbeafe"
                        : undefined,
                    boxShadow:
                      showAns || results[item.id] === "correct"
                        ? "inset 0 0 0 2px #16a34a"
                        : results[item.id] === "wrong"
                          ? "inset 0 0 0 2px #ef4444"
                          : undefined,
                    cursor:
                      showAns || results[item.id] === "correct"
                        ? "default"
                        : "pointer",
                  },
                  background:
                    listening.activeId === `choice-${item.id}`
                      ? "#dbeafe"
                      : {
                          position: "relative",
                          borderRadius: 8,
                          background:
                            selected.has(item.id) &&
                            results[item.id] === undefined &&
                            !showAns
                              ? "#dbeafe"
                              : undefined,
                          boxShadow:
                            showAns || results[item.id] === "correct"
                              ? "inset 0 0 0 2px #16a34a"
                              : results[item.id] === "wrong"
                                ? "inset 0 0 0 2px #ef4444"
                                : undefined,
                          cursor:
                            showAns || results[item.id] === "correct"
                              ? "default"
                              : "pointer",
                        }.background,
                  boxShadow:
                    [
                      {
                        position: "relative",
                        borderRadius: 8,
                        background:
                          selected.has(item.id) &&
                          results[item.id] === undefined &&
                          !showAns
                            ? "#dbeafe"
                            : undefined,
                        // boxShadow:
                        //   showAns || results[item.id] === "correct"
                        //     ? "inset 0 0 0 2px #16a34a"
                        //     : results[item.id] === "wrong"
                        //       ? "inset 0 0 0 2px #ef4444"
                        //       : undefined,
                        cursor:
                          showAns || results[item.id] === "correct"
                            ? "default"
                            : "pointer",
                      }.boxShadow,
                      listening.activeId === `choice-${item.id}`
                        ? "0 0 0 3px #2563eb"
                        : null,
                    ]
                      .filter(Boolean)
                      .join(", ") || undefined,
                }}
                key={item.id}
                className={`rlc-card${isLocked ? " rlc-card--locked" : ""}`}
                onClick={() => {
                  listening.play(
                    `choice-${item.id}`,
                    [
                      clipPage33B2,
                      clipPage33B3,
                      clipPage33B4,
                      clipPage33B5,
                      clipPage33B6,
                      clipPage33B7,
                      clipPage33B8,
                      clipPage33B9,
                    ][item.id - 1],
                  );
                  toggleItem(item.id);
                }}
              >
                {/* ✕ wrong badge */}
                {state === "wrong" && <div className="rlc-badge">✕</div>}

                {/* Image */}
                <img
                  src={item.src}
                  alt={
                    {
                      1: "A lion.",
                      2: "A backpack.",
                      3: "A wheeled suitcase.",
                      4: "A robot.",
                      5: "Two keys.",
                      6: "Books and pens.",
                      7: "A selection of shoes, including trainers, boots and dress shoes.",
                      8: "A cat.",
                    }[item.id]
                  }
                  className="rlc-img"
                />

                {/* Label with oval */}
                <div className="rlc-label-area">
                  <div className={labelWrapClass}>
                    <div className="rlc-oval" />
                    <span className="rlc-label">{item.label}</span>
                  </div>
                </div>
                {listening.activeId === `choice-${item.id}` &&
                  renderExerciseSpeaker()}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlc-buttons">
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
