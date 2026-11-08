import clipPage62A4 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - A/Item_004_frogs.mp3";
import clipPage62A3 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - A/Item_003_pond.mp3";
import clipPage62A2 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - A/Item_002_alligator.mp3";
import clipPage62A1 from "../../../assets/audio/ClassBook/Unit 7/Page 62 - A/Item_001_rock.mp3";
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
//  🖼️  IMAGES — 4 صور
// ─────────────────────────────────────────────
import imgA from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 8.svg"; // frogs  → 4
import imgB from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 9.svg"; // alligator → 2
import imgC from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 10.svg"; // pond   → 3
import imgD from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 62/SVG/Asset 11.svg";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim(); // rock   → 1
// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BADGE_DEFAULT_BG = "transparent";
const BADGE_DEFAULT_CLR = "#2b2b2b";
const BADGE_CORRECT_BG = "transparent";
const BADGE_CORRECT_CLR = "transparent";
const BADGE_WRONG_BG = "transparent";
const BADGE_WRONG_CLR = "#ffffff";
const WRONG_X_BG = "#ef4444";
const WRONG_X_CLR = "#ffffff";
const LABEL_NUM_CLR = "#2b2b2b";
const LABEL_TEXT_CLR = "#2b2b2b";
const LABEL_BG = "#e8eff1";
const LABEL_RADIUS = "10px";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
// Word labels فوق — بترتيب من اليسار
const LABELS = [
  { num: 1, word: "rock" },
  { num: 2, word: "alligator" },
  { num: 3, word: "pond" },
  { num: 4, word: "frogs" },
];

// الصور — بنفس الترتيب في الكتاب
// correct = الرقم الصحيح لكل صورة
const IMAGES = [
  { id: "A", src: imgA, correct: 4 }, // frogs
  { id: "B", src: imgB, correct: 2 }, // alligator
  { id: "C", src: imgC, correct: 3 }, // pond
  { id: "D", src: imgD, correct: 1 }, // rock
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookReadNumber_QA() {
  const listening = useExerciseListening("sb_unit7_page5_q1");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = IMAGES.map((item) => ({
    key: item.id,
    correct: [String(item.correct)],
    answer: String(item.correct),
    label: `Picture ${item.id}. Enter the matching word number, 1 to 4. Use each number once.`,
  }));
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const inputRefs = useRef({});

  const handleChange = (key, value) => {
    if (showAns || results[key] === "correct") return;
    if (value !== "" && !/^[1-4]$/.test(value)) return;
    if (
      value &&
      Object.entries(answers).some(([id, v]) => id !== key && v === value)
    ) {
      setAnnouncement(
        "That number is already used. Clear the previous box to move it.",
      );
      return;
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (value) {
      const at = IMAGES.findIndex((item) => item.id === key),
        next = IMAGES.slice(at + 1).find(
          (item) => results[item.id] !== "correct",
        );
      inputRefs.current[next?.id]?.focus();
    }
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (!answerTargets.every((item) => answers[item.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      answerTargets.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        item.correct.some(
          (answer) =>
            normalizeAnswer(answers[item.key] || "") ===
            normalizeAnswer(answer),
        )
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
      `Score: ${score} out of ${answerTargets.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === answerTargets.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${answerTargets.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${answerTargets.length}`);
    else ValidationAlert.error(`Score: ${score} / ${answerTargets.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    setAnswers(
      Object.fromEntries(answerTargets.map((item) => [item.key, item.answer])),
    );
    setResults({});
    setShowResults(false);
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setAnswers({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  // ── Badge state ──
  const getBadgeState = (img) =>
    !answers[img.id]
      ? "empty"
      : showAns
        ? "correct"
        : results[img.id] || "filled";

  const badgeBg = (s) =>
    s === "correct"
      ? BADGE_CORRECT_BG
      : s === "wrong"
        ? BADGE_WRONG_BG
        : BADGE_DEFAULT_BG;
  const badgeClr = (s) =>
    s === "correct"
      ? BADGE_CORRECT_CLR
      : s === "wrong"
        ? BADGE_WRONG_CLR
        : BADGE_DEFAULT_CLR;

  return (
    <div
      data-adapt-scope="unit7_Unit7_Page5_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit7_Unit7_Page5_Q1"] input:focus-visible, [data-adapt-scope="unit7_Unit7_Page5_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_Unit7_Page5_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Labels row ── */
        .lrn-labels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          margin :8% 0 0 ;
        }

        .lrn-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 0.5vw, 7px);
          background: ${LABEL_BG};
          border-radius: ${LABEL_RADIUS};
          padding: clamp(6px, 0.8vw, 10px) clamp(10px, 1.4vw, 18px);
          user-select: none;
        }

        .lrn-label-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_NUM_CLR};
          flex-shrink: 0;
        }

        .lrn-label-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${LABEL_TEXT_CLR};
          font-weight: 500;
        }

        /* ── 4-col image grid ── */
        .lrn-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.4vw, 18px);
          width: 100%;
        }

        /* Image card */
        .lrn-card {
          position: relative;
          overflow: visible;
        }

        .lrn-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }

        /* Badge — bottom-right corner */
        .lrn-badge-wrap {
          position: absolute;
             bottom: 1px;
    right: 1px;
        }

        .lrn-badge {
          position: relative;
          width: clamp(30px, 3.8vw, 46px);
          height: clamp(30px, 3.8vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          cursor: pointer;
        }

        /* Transparent input over badge */
        .lrn-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: #333;
          caret-color: #333;
          z-index: 2;
          border-radius: 50%;
        }
        .lrn-input:disabled { cursor: default; }

        .lrn-num-display {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* ✕ mini badge */
        .lrn-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CLR};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrn-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(16px, 2.4vw, 28px);
        }

        @media (max-width: 500px) {
          .lrn-labels,
          .lrn-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 8vw, 40px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader
          subTitle="Read one clue at a time, then place its number on the picture or item that matches it."
          sectionLetter="A"
          title={<>Look, read, and number.wevcwefwefwef</>}
        />

        {/* ── Word labels ── */}
        <div className="lrn-labels">
          {LABELS.map((l) => (
            <div key={l.num} className="lrn-label">
              <span className="lrn-label-num">{l.num}</span>
              <span className="lrn-label-word">
                {renderExerciseAudioText({
                  audio: listening,
                  id: `label-${l.num}`,
                  src: [clipPage62A1, clipPage62A2, clipPage62A3, clipPage62A4][
                    l.num - 1
                  ],
                  label: `${l.num}. ${l.word}`,
                  children: l.word,
                })}
              </span>
            </div>
          ))}
        </div>

        {/* ── Images grid ── */}
        <div className="lrn-grid">
          {IMAGES.map((img) => {
            const state = getBadgeState(img);
            const val = answers[img.id] || "";
            const bg = badgeBg(state);
            const clr = badgeClr(state);

            const isWrong = !showAns && results[img.id] === "wrong";

            return (
              <div key={img.id} className="lrn-card">
                <img
                  src={img.src}
                  alt={
                    [
                      "Two green frogs.",
                      "A large reptile resting with its mouth open.",
                      "A small pond surrounded by grass.",
                      "A speckled rock.",
                    ]["ABCD".indexOf(img.id)]
                  }
                  className="lrn-img"
                />

                <div className="lrn-badge-wrap">
                  <div
                    className="lrn-badge"
                    style={{ background: bg, color: clr }}
                  >
                    <span className="lrn-num-display">{val}</span>
                    <input
                      style={{
                        ...{},
                        boxShadow:
                          showAns || results[img.id] === "correct"
                            ? "inset 0 0 0 2px #16a34a"
                            : results[img.id] === "wrong"
                              ? "inset 0 0 0 2px #ef4444"
                              : undefined,
                      }}
                      placeholder="#"
                      aria-invalid={results[img.id] === "wrong"}
                      title={
                        answerTargets.find((target) => target.key === img.id)
                          ?.label || "Write an answer"
                      }
                      aria-label={
                        answerTargets.find((target) => target.key === img.id)
                          ?.label || "Write an answer"
                      }
                      {...fieldKeys}
                      ref={(el) => {
                        inputRefs.current[img.id] = el;
                      }}
                      className="lrn-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      disabled={showAns || results[img.id] === "correct"}
                      onChange={(e) => handleChange(img.id, e.target.value)}
                    />
                    {isWrong && <div className="lrn-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrn-buttons">
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
