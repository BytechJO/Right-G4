import clipPage81D7 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_007_He_washes_his_motorcycle_because_he_likes_it_to_stay_clean.mp3";
import clipPage81D6 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_006_He's_never_afraid_because_he_doesn't_wear_a_helmet.mp3";
import clipPage81D5 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_005_Troy_rides_a_motorcycle_because_it's_fun.mp3";
import clipPage81D4 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_004_because_he_likes_it_to_stay_nice_and_clean.mp3";
import clipPage81D3 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_003_cars_because_they're_boring._He_always_washes_his_motorcycle.mp3";
import clipPage81D2 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_002_because_he_wears_a_helmet_and_rides_safely._He_doesn't_like_driving.mp3";
import clipPage81D1 from "../../../assets/audio/ClassBook/Unit 9/Page 81 - D/Item_001_Troy_likes_to_ride_on_a_motorcycle_because_it's_fun._He's_never_afraid.mp3";
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
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 1.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd51pg81-instruction-adult-lady_bHLjAFzB.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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
const TEXT_COLOR = "#2b2b2b";
const LABEL_COLOR = "#2b2b2b";
const PARA_COLOR = "#2b2b2b";
const BADGE_DEFAULT_BG = "transparent";
const BADGE_DEFAULT_CL = "#2b2b2b";
const BADGE_CORRECT_BG = "transparent";
const BADGE_CORRECT_CL = "#2b2b2b";
const BADGE_WRONG_BG = "transparent";
const BADGE_WRONG_CL = "#2b2b2b";
const WRONG_X_BG = "#ef4444";
const WRONG_X_CL = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0, end: 5.0, text: "Listen, read, and number." },
  {
    start: 5.0,
    end: 13.0,
    text: "Troy likes to ride on a motorcycle because it's fun.",
  },
  {
    start: 13.0,
    end: 22.0,
    text: "He's never afraid because he wears a helmet and rides safely.",
  },
  {
    start: 22.0,
    end: 30.0,
    text: "He doesn't like driving cars because they're boring.",
  },
  {
    start: 30.0,
    end: 40.0,
    text: "He always washes his motorcycle because he likes it to stay nice and clean.",
  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: الترتيب الصحيح لكل جملة في الفقرة
// ─────────────────────────────────────────────
const SENTENCES = [
  {
    id: "a",
    label: "a",
    text: "Troy rides a motorcycle because it's fun.",
    correct: 2,
  },
  {
    id: "b",
    label: "b",
    text: "He's never afraid because he doesn't wear a helmet.",
    correct: 1,
  },
  {
    id: "c",
    label: "c",
    text: "He washes his motorcycle because he likes it to stay clean.",
    correct: 3,
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadNumber_QD() {
  const listening = useExerciseListening("sb_unit9_page6_q1");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = SENTENCES.map((item) => ({
    key: item.id,
    correct: [String(item.correct)],
    answer: String(item.correct),
    label: `Sentence ${item.label}. ${item.text} Enter its number, from 1 to 3. Use each number once.`,
  }));
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns || results[id] === "correct") return;
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    if (digit && !/^[1-3]$/.test(digit)) return;
    if (
      digit &&
      Object.entries(answers).some(([key, v]) => key !== id && v === digit)
    ) {
      setAnnouncement(
        "That number is already used. Clear its previous box first.",
      );
      return;
    }
    setAnswers((prev) => ({ ...prev, [id]: digit }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (digit) {
      const at = SENTENCES.findIndex((s) => s.id === id),
        next = SENTENCES.slice(at + 1).find((s) => results[s.id] !== "correct");
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

  // badge state
  const getBadgeState = (s) =>
    !answers[s.id] ? "empty" : showAns ? "correct" : results[s.id] || "filled";

  const badgeBg = (st) =>
    st === "correct"
      ? BADGE_CORRECT_BG
      : st === "wrong"
        ? BADGE_WRONG_BG
        : BADGE_DEFAULT_BG;
  const badgeClr = (st) =>
    st === "correct"
      ? BADGE_CORRECT_CL
      : st === "wrong"
        ? BADGE_WRONG_CL
        : BADGE_DEFAULT_CL;

  return (
    <div
      data-adapt-scope="unit9_Unit9_Page6_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit9_Unit9_Page6_Q1"] input:focus-visible, [data-adapt-scope="unit9_Unit9_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_Unit9_Page6_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_Unit9_Page6_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit9_Unit9_Page6_Q1"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrn-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          width: 100%;
        }

        .lrn-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
        }

        .lrn-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }

        /* ── Sentences list ── */
        .lrn-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        /* Single sentence row: label | text | badge */
        .lrn-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrn-label {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .lrn-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Badge wrap */
        .lrn-badge-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrn-badge {
          position: relative;
          width:  clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2195a6;
          cursor: pointer;
        }

        .lrn-num-display {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
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
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: transparent;
          caret-color: #333;
          cursor: pointer;
          z-index: 2;
          border-radius:13px;
        }
        .lrn-input:disabled { cursor: default; }

        /* ✕ mini badge */
        .lrn-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CL};
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
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrn-top { grid-template-columns: 1fr; }
          .lrn-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
          subTitle="Listen to the whole passage first, then number each statement or picture in the order you hear it."
          sectionLetter="D"
          title={<>Listen, read, and number.</>}
        />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit9_page6_q1"
            src={sound}
            captions={captions}
            stopAtSecond={2.7}
          />
        </div>

        {/* ── Paragraph + image ── */}
        <div className="lrn-top">
          <p className="lrn-para">
            {renderExerciseAudioText({
              audio: listening,
              id: "paragraph-0",
              src: clipPage81D1,
              label:
                "Troy likes to ride on a motorcycle because it's fun. He's never afraid ",
              children:
                "Troy likes to ride on a motorcycle because it's fun. He's never afraid ",
            })}
            {renderExerciseAudioText({
              audio: listening,
              id: "paragraph-1",
              src: clipPage81D2,
              label:
                "because he wears a helmet and rides safely. He doesn't like driving ",
              children:
                "because he wears a helmet and rides safely. He doesn't like driving ",
            })}
            {renderExerciseAudioText({
              audio: listening,
              id: "paragraph-2",
              src: clipPage81D3,
              label:
                "cars because they're boring. He always washes his motorcycle ",
              children:
                "cars because they're boring. He always washes his motorcycle ",
            })}
            {renderExerciseAudioText({
              audio: listening,
              id: "paragraph-3",
              src: clipPage81D4,
              label: "because he likes it to stay nice and clean.",
              children: "because he likes it to stay nice and clean.",
            })}
          </p>
          <img
            src={imgScene}
            alt={"A helmeted rider on a motorcycle on a road."}
            className="lrn-scene-img"
          />
        </div>

        {/* ── Sentences ── */}
        <div className="lrn-list">
          {SENTENCES.map((s) => {
            const st = getBadgeState(s);
            const val = answers[s.id] || "";
            const bg = badgeBg(st);
            const clr = badgeClr(st);

            const isWrong = !showAns && results[s.id] === "wrong";

            return renderExerciseAudioGroup({
              audio: listening,
              id: `sentence-${s.id}`,
              src: [clipPage81D5, clipPage81D6, clipPage81D7][
                SENTENCES.indexOf(s)
              ],
              label: s.text,
              className: "lrn-row",
              key: s.id,
              children: (
                <>
                  <span className="lrn-label">{s.label}</span>
                  <span className="lrn-text">{s.text}</span>

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
                            showAns || results[s.id] === "correct"
                              ? "inset 0 0 0 2px #16a34a"
                              : results[s.id] === "wrong"
                                ? "inset 0 0 0 2px #ef4444"
                                : undefined,
                        }}
                        placeholder="#"
                        aria-invalid={results[s.id] === "wrong"}
                        title={
                          answerTargets.find((target) => target.key === s.id)
                            ?.label || "Write an answer"
                        }
                        aria-label={
                          answerTargets.find((target) => target.key === s.id)
                            ?.label || "Write an answer"
                        }
                        {...fieldKeys}
                        ref={(el) => {
                          inputRefs.current[s.id] = el;
                        }}
                        className="lrn-input"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        disabled={showAns || results[s.id] === "correct"}
                        onChange={(e) => handleChange(s.id, e.target.value)}
                      />
                      {isWrong && <div className="lrn-wrong-x">✕</div>}
                    </div>
                  </div>
                </>
              ),
            });
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
