import clipPage86A6 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_006_casual.mp3";
import clipPage86A5 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_005_purchase.mp3";
import clipPage86A4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_004_dollars.mp3";
import clipPage86A3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_003_rack.mp3";
import clipPage86A2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_002_wonderful.mp3";
import clipPage86A1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - A/Item_001_size.mp3";
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
// ────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 20.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 21.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 22.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 86/SVG/Asset 23.svg";
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
  { id: 1, src: img1, words: ["rack", "casual"], correct: "casual" },
  { id: 2, src: img2, words: ["size", "rack"], correct: "size" },
  { id: 3, src: img3, words: ["pay", "dollars"], correct: "dollars" },
  { id: 4, src: img4, words: ["wonderful", "purchase"], correct: "purchase" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadCircle_QA() {
  const listening = useExerciseListening("sb_unit10_page5_q1");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId, word) => {
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
      data-adapt-scope="unit10_Unit10_Page5_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit10_Unit10_Page5_Q1"] input:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_Unit10_Page5_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_Unit10_Page5_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`

        /* ── Grid: 3 عناصر في صف ── */
        .lrc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(28px, 2vw, 28px);
          width: 100%;
          margin : 10%  0;
        }

        /* ── الكارد الكامل: رقم+صورة في الأعلى، كلمات في الأسفل ── */
        .lrc-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }

        /* ── الجزء العلوي: رقم جنب الصورة ── */
        .lrc-top {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          width: 100%;
        }

        /* الرقم: يسار الصورة ومرتفع قليلاً */
        .lrc-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          /* مرتفع قليلاً عن الصورة */
          line-height: 1;
        }

        /* الصورة تملأ باقي العرض */
        .lrc-img-wrapper {
          flex: 1;
          min-width: 0;
        }

        .lrc-img {
          width: 70%;
          height: auto;
          display: block;
        }

        /* ── الكلمات تحت الصورة بنفس محاذاة الصورة ── */
        .lrc-words {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(6px, 1vw, 10px);
          /* تبدأ من نفس موضع الصورة (بعد عرض الرقم + الـ gap) */
          margin-top: 8px;
          width: 100%;
          box-sizing: border-box;
          margin-left: -25px;

        }

        /* كلمة واحدة */
        .lrc-word-wrap {
          position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 5px) clamp(14px, 1.8vw, 22px);
          cursor: pointer;
          user-select: none;
        }
        .lrc-word-wrap--locked { cursor: default; }

        /* الدائرة البيضاوية */
        .lrc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        // .lrc-word-wrap--selected .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        // .lrc-word-wrap--correct  .lrc-oval { border-color: #16a34a; }
        // .lrc-word-wrap--wrong    .lrc-oval { border-color: ${CIRCLE_WRONG}; }

        .lrc-word {
          font-size: clamp(13px, 1.4vw, 18px);
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
          margin-top: clamp(10px, 1.8vw, 20px);
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
              {/* الرقم يسار الصورة ومرتفع */}
              <div className="lrc-top">
                <span className="lrc-num">{item.id}</span>
                <div className="lrc-img-wrapper">
                  <img
                    src={item.src}
                    alt={
                      [
                        "Three collared shirts.",
                        "Jeans with a size label.",
                        "Stacks of dollar banknotes.",
                        "A customer paying at a shop counter.",
                      ][item.id - 1]
                    }
                    className="lrc-img"
                  />
                </div>
              </div>

              {/* الكلمات تحت الصورة بنفس محاذاتها */}
              <div className="lrc-words">
                {item.words.map((word) => {
                  const state = getWordState(item, word);
                  return (
                    <div
                      data-listening={`word-${item.id}-${word}`}
                      style={((base) => ({
                        ...base,
                        position: "relative",
                        background:
                          listening.activeId === `word-${item.id}-${word}`
                            ? "#dbeafe"
                            : base.background,
                        boxShadow:
                          listening.activeId === `word-${item.id}-${word}`
                            ? "0 0 0 2px #2563eb"
                            : base.boxShadow,
                      }))({
                        ...{},
                        borderRadius: {}.borderRadius || "6px",
                        background:
                          selected[item.id] === word &&
                          !showAns &&
                          results[item.id] === undefined
                            ? "#dbeafe"
                            : {}.background,
                        boxShadow:
                          selected[item.id] === word
                            ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                            : undefined,
                      })}
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
                      onClick={(e) => {
                        listening.play(
                          `word-${item.id}-${word}`,
                          {
                            size: clipPage86A1,
                            wonderful: clipPage86A2,
                            rack: clipPage86A3,
                            dollars: clipPage86A4,
                            purchase: clipPage86A5,
                            casual: clipPage86A6,
                          }[word],
                        );
                        (() => handleSelect(item.id, word))(e);
                      }}
                    >
                      <div className="lrc-oval" />
                      <span className="lrc-word">{word}</span>
                      {state === "wrong" && <div className="lrc-badge">✕</div>}
                      {listening.activeId === `word-${item.id}-${word}` &&
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
