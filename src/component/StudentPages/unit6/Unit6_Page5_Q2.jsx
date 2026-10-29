import clipPage50B7 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_007_for_school.mp3";
import clipPage50B6 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_006_these.mp3";
import clipPage50B5 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_005_,_dear.mp3";
import clipPage50B4 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_004_almost_ready.mp3";
import clipPage50B3 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_003_Okay.mp3";
import clipPage50B2 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_002_What_about.mp3";
import clipPage50B1 from "../../../assets/audio/ClassBook/Unit 6/Page 50 - B/Item_001_All_set.mp3";
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
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 50/SVG/Asset 1.svg";
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
    .trim();

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const TEXT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["All set", "What about", "I'm", "Okay"];

const ITEMS = [
  {
    id: 1,
    after: "almost ready.",
    correct: ["I'm", "im"],
    answer: "I'm",
  },
  {
    id: 2,
    after: ", dear.",
    correct: ["Okay", "okay"],
    answer: "Okay",
  },
  {
    id: 3,
    after: "these?",
    correct: ["What about", "what about"],
    answer: "What about",
  },
  {
    id: 4,
    after: "for school?",
    correct: ["All set", "all set"],
    answer: "All set",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QB() {
  const listening = useExerciseListening("sb_unit6_page5_q2");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ITEMS.map((item) => ({
    key: item.id,
    correct: item.correct,
    answer: item.answer,
    label: `Question ${item.id}. Complete the dialogue before: ${item.after}`,
  }));
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    if (showAns || results[key] === "correct") return;
    if (!answerTargets.some((item) => item.key === key)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
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

  const isWrong = (item) => !showAns && results[item.id] === "wrong";

  return (
    <div
      data-adapt-scope="unit6_Unit6_Page5_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit6_Unit6_Page5_Q2"] input:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_Unit6_Page5_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Word bank ── */
        .rwb-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: space-evenly;
          width: 100%; 
          margin : 5% 0 %
        }

        .rwb-pill {
          background: #e8eff1;
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(5px, 0.6vw, 8px) clamp(14px, 1.8vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          white-space: nowrap;
          user-select: none;
        }

        /* ── Body: items ysar | image yamin ── */
        .rwb-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: start;
          width: 100%;
        }

        /* ── Items list ── */
        .rwb-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
        }

        /* Single row: num | input | after */
        .rwb-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        .rwb-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Input wrap */
        .rwb-input-wrap {
          position: relative;
          flex: 0 1 clamp(120px, 16vw, 220px);
          min-width: clamp(100px, 14vw, 190px);
        }

        .rwb-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwb-input:disabled  { opacity: 1; cursor: default; }
        .rwb-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwb-input--answer   { color: ${INPUT_ANSWER_COLOR};  }

        /* ✕ badge */
        .rwb-badge {
          position: absolute;
          top: -8px; right: 0;
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

        .rwb-after {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        /* Scene image */
        .rwb-scene-img {
          width: 100%;
          height: 105%;
          display: block;
          flex-shrink: 0;
        }

        .rwb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rwb-body { grid-template-columns: 1fr; }
          .rwb-scene-img { width: 100%; max-width: 320px; margin: 0 auto; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 8vw, 60px)",
          // maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* ── Header ── */}
        <ExerciseHeader
          subTitle="Check the picture or sentence clue first, then choose the matching word and complete each blank before checking."
          sectionLetter="B"
          title={<>Read and write. Use the words below.</>}
        />

        {/* ── Word bank ── */}
        <div className="rwb-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="rwb-pill">
              {renderExerciseAudioText({
                audio: listening,
                id: `bank-${w}`,
                src: {
                  "All set": clipPage50B1,
                  "What about": clipPage50B2,
                  Okay: clipPage50B3,
                }[w],
                label: w,
                children: w,
              })}
            </div>
          ))}
        </div>

        {/* ── Body: items + image ── */}
        <div className="rwb-body">
          {/* Items */}
          <div className="rwb-list">
            {ITEMS.map((item) => {
              const wrong = isWrong(item);
              const value = answers[item.id] || "";
              const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
              const uColor = wrong
                ? INPUT_UNDERLINE_WRONG
                : INPUT_UNDERLINE_DEFAULT;

              return (
                <div key={item.id} className="rwb-row">
                  <span className="rwb-num">{item.id}</span>

                  <div className="rwb-input-wrap">
                    <input
                      placeholder="Answer"
                      aria-invalid={results[item.id] === "wrong"}
                      title={
                        answerTargets.find((target) => target.key === item.id)
                          ?.label || "Write an answer"
                      }
                      aria-label={
                        answerTargets.find((target) => target.key === item.id)
                          ?.label || "Write an answer"
                      }
                      {...fieldKeys}
                      type="text"
                      className={[
                        "rwb-input",
                        wrong ? "rwb-input--wrong" : "",
                        showAns ? "rwb-input--answer" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      value={value}
                      disabled={showAns || results[item.id] === "correct"}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        ...{ borderBottomColor: uColor, color: tColor },
                        borderBottomColor:
                          showAns || results[item.id] === "correct"
                            ? "#16a34a"
                            : results[item.id] === "wrong"
                              ? "#ef4444"
                              : undefined,
                      }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="rwb-badge">✕</div>}
                  </div>

                  <span className="rwb-after">
                    {renderExerciseAudioText({
                      audio: listening,
                      id: `after-${item.id}`,
                      src: [
                        clipPage50B4,
                        clipPage50B5,
                        clipPage50B6,
                        clipPage50B7,
                      ][item.id - 1],
                      label: item.after,
                      children: item.after,
                    })}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <img
            src={imgScene}
            alt="A schoolgirl waving goodbye to her parents outside the house."
            className="rwb-scene-img"
          />
        </div>

        {/* ── Buttons ── */}
        <div className="rwb-buttons">
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
