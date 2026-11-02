import clipPage51A5 from "../../../assets/audio/WorkBook/Unit 9/Page 51 - A/Item_005_room.mp3";
import clipPage51A4 from "../../../assets/audio/WorkBook/Unit 9/Page 51 - A/Item_004_call.mp3";
import clipPage51A3 from "../../../assets/audio/WorkBook/Unit 9/Page 51 - A/Item_003_bored.mp3";
import clipPage51A2 from "../../../assets/audio/WorkBook/Unit 9/Page 51 - A/Item_002_chores.mp3";
import clipPage51A1 from "../../../assets/audio/WorkBook/Unit 9/Page 51 - A/Item_001_video_games.mp3";
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
import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 51/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 51/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 51/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U9 Folder/Page 51/SVG/Asset 4.svg";
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
const CIRCLE_COLOR = "#2096a6";
const CIRCLE_WRONG = "#ef4444";
const TEXT_DEFAULT = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    words: ["video games", "chores"],
    correct: "video games",
  },
  {
    id: 2,
    src: img2,
    words: ["bored", "call"],
    correct: "bored",
  },
  {
    id: 3,
    src: img3,
    words: ["call", "room"],
    correct: "room",
  },
  {
    id: 4,
    src: img4,
    words: ["chores", "video games"],
    correct: "chores",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircle_QA() {
  const listening = useExerciseListening("wb_unit9_page51_q1");

  const [selected, setSelected] = useState({}); // { itemId: word }
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId, word) => {
    listening.play(
      "choice-" + itemId + "-" + word,
      {
        "video games": clipPage51A1,
        chores: clipPage51A2,
        bored: clipPage51A3,
        call: clipPage51A4,
        room: clipPage51A5,
      }[word],
    );
    if (showAns || results[itemId] === "correct") return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === word ? null : word,
    }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
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

  // حالة الكلمة
  const getWordState = (item, word) => {
    const isSel = selected[item.id] === word;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (results[item.id] !== undefined)
      return item.correct === word ? "correct" : "wrong";
    return "selected";
  };

  return (
    <div
      data-adapt-scope="Unit9_WB_Unit9_Page51_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit9_WB_Unit9_Page51_Q1"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page51_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page51_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page51_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
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
        .lrc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
          margin : 8% 0 ;
        }

        /* ── Single card: num + img + words ── */
        .lrc-card {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.4vw, 18px);
          min-width: 0;
        }

        /* num */
        .lrc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* img */
        .lrc-img {
          width: clamp(90px, 13vw, 170px);
          height: clamp(70px, 10vw, 130px);
          display: block;
          flex-shrink: 0;
        }

        /* words column */
        .lrc-words {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* single word */
        .lrc-word-wrap {
          position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 5px) clamp(10px, 1.4vw, 16px);
          cursor: pointer;
          user-select: none;
        }
        .lrc-word-wrap--locked { cursor: default; }

        /* oval */
        .lrc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        /* States */
        // .lrc-word-wrap--selected .lrc-oval  { border-color: ${CIRCLE_COLOR}; }
        // .lrc-word-wrap--correct  .lrc-oval  { border-color: ${CIRCLE_COLOR}; }
        // .lrc-word-wrap--wrong    .lrc-oval  { border-color: ${CIRCLE_WRONG}; }

        .lrc-word {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 400;
          color: ${TEXT_DEFAULT};
          line-height: 1.4;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ✕ badge */
        .lrc-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .lrc-grid { grid-template-columns: 1fr; }
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
          sectionLetter="A"
          title={<>Look, read, and circle.</>}
        />

        {/* ── Grid ── */}
        <div className="lrc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="lrc-card">
              {/* Number */}
              <span className="lrc-num">{item.id}</span>

              {/* Image */}
              <img
                src={item.src}
                alt={
                  [
                    "Children playing video games in front of a television.",
                    "A girl looking unhappy.",
                    "A bedroom with a bed, desk and computer.",
                    "A girl helping a woman wash dishes.",
                  ][item.id - 1]
                }
                className="lrc-img"
              />

              {/* Words */}
              <div className="lrc-words">
                {item.words.map((word) => {
                  const state = getWordState(item, word);
                  return (
                    <div
                      data-listening={"choice-" + item.id + "-" + word}
                      style={{
                        position: "relative",
                        borderRadius: 6,
                        background:
                          selected[item.id] === word ||
                          listening.activeId ===
                            "choice-" + item.id + "-" + word
                            ? "#dbeafe"
                            : undefined,
                        boxShadow:
                          selected[item.id] === word
                            ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                            : undefined,
                        outline:
                          listening.activeId ===
                          "choice-" + item.id + "-" + word
                            ? "2px solid #2563eb"
                            : undefined,
                      }}
                      role="button"
                      tabIndex={0}
                      data-keyboard-choice
                      {...activationKeys}
                      aria-label={`Question ${item.id}. ${word}`}
                      aria-pressed={selected[item.id] === word}
                      aria-disabled={showAns || results[item.id] === "correct"}
                      key={word}
                      className={[
                        "lrc-word-wrap",
                        isLocked ? "lrc-word-wrap--locked" : "",
                        state === "selected" ? "lrc-word-wrap--selected" : "",
                        state === "correct" ? "lrc-word-wrap--correct" : "",
                        state === "wrong" ? "lrc-word-wrap--wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleSelect(item.id, word)}
                    >
                      <div
                        // style={{
                        //   borderColor:
                        //     state === "correct" ? "#16a34a" : undefined,
                        // }}
                        className="lrc-oval"
                      />
                      <span className="lrc-word">{word}</span>
                      {state === "wrong" && <div className="lrc-badge">✕</div>}
                      {listening.activeId ===
                        "choice-" + item.id + "-" + word &&
                        renderExerciseSpeaker()}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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
