import clipPage51D10 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_010_leave_any_trash_or_litter_on_the_ground._It_can_get_very_dark_at_night,.mp3";
import clipPage51D9 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_009_food._He.mp3";
import clipPage51D8 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_008_leave_food_out_as_bears_sometimes_walk_around_in_the_woods_looking_for.mp3";
import clipPage51D7 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_007_leave_a_fire_unattended.mp3";
import clipPage51D6 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_006_when_starting_a_campfire,_and_he.mp3";
import clipPage51D5 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_005_be_careful.mp3";
import clipPage51D4 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_004_the_woods._Thomas.mp3";
import clipPage51D3 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_003_also_take_his_boots_for_hiking_in.mp3";
import clipPage51D2 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_002_tent,_so_he'll_be_comfortable_when_he_sleeps._He.mp3";
import clipPage51D1 from "../../../assets/audio/ClassBook/Unit 6/Page 51 - D/Item_001_Thomas_is_going_on_a_camping_trip_tomorrow.mp3";
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
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 51/SVG/Asset 1.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd35pg51-instruction1-adult-lady_kVi5vPgK.mp3";
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
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.08,
    end: 6.88,
    text: "Page 51, Write Activities, Exercise D. Listen, read, and complete the story.",
  },
  {
    start: 6.88,
    end: 9.78,
    text: "Thomas is going on a camping trip tomorrow.",
  },
  {
    start: 9.78,
    end: 15.2,
    text: "He will take his sleeping bag and tent, so he'll be comfortable when he sleeps.",
  },
  {
    start: 16.3,
    end: 19.2,
    text: "He will also take his boots for hiking in the woods.",
  },
  {
    start: 19.2,
    end: 24.88,
    text: "Thomas will be careful when starting a campfire, and he won't leave a fire unattended.",
  },
  {
    start: 25.94,
    end: 34.6,
    text: "He won't leave food out, as bears sometimes walk around in the woods looking for food. He won't leave any trash or litter on the ground.",
  },
  {
    start: 34.6,
    end: 39.38,
    text: "It can get very dark at night, so he will be sure to bring a flashlight.",
  },
];
// ─────────────────────────────────────────────
//  📝  LINES DATA
//  كل سطر: مصفوفة من parts
//  { t: "text", v: "..." } | { t: "input", id, correct, answer }
// ─────────────────────────────────────────────
const LINES = [
  // سطر 1 — نص عادي بدون input
  [{ t: "text", v: "Thomas is going on a camping trip tomorrow." }],

  // سطر 2
  [
    { t: "text", v: "He " },
    { t: "input", id: 1, correct: ["should"], answer: "should" },
    { t: "text", v: " take his sleeping bag and" },
  ],

  // سطر 3
  [{ t: "text", v: "tent, so he'll be comfortable when he sleeps. He" }],

  // سطر 4
  [
    { t: "input", id: 2, correct: ["should"], answer: "should" },
    { t: "text", v: " also take his boots for hiking in" },
  ],

  // سطر 5
  [
    { t: "text", v: "the woods. Thomas " },
    { t: "input", id: 3, correct: ["should"], answer: "should" },
    { t: "text", v: " be careful" },
  ],

  // سطر 6
  [
    { t: "text", v: "when starting a campfire, and he " },
    {
      t: "input",
      id: 4,
      correct: ["shouldn't", "shouldnt", "should not"],
      answer: "shouldn't",
    },
  ],

  // سطر 7
  [{ t: "text", v: "leave a fire unattended." }],

  // سطر 8 (فراغ / مسافة)
  [{ t: "text", v: "" }],

  // سطر 9
  [
    { t: "text", v: "He" },
    {
      t: "input",
      id: 5,
      correct: ["shouldn't", "shouldnt", "should not"],
      answer: "shouldn't",
    },
    {
      t: "text",
      v: "leave food out as bears sometimes walk around in the woods looking for",
    },
  ],

  // سطر 10
  [
    { t: "text", v: "food. He" },
    {
      t: "input",
      id: 6,
      correct: ["shouldn't", "shouldnt", "should not"],
      answer: "shouldn't",
    },
    {
      t: "text",
      v: "leave any trash or litter on the ground. It can get very dark at night,",
    },
  ],

  // سطر 11
  [
    { t: "text", v: "so he " },
    { t: "input", id: 7, correct: ["should"], answer: "should" },
    { t: "text", v: " be sure to bring a flashlight." },
  ],
];

const ALL_INPUTS = LINES.flat().filter((p) => p.t === "input");

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadCompleteStory_QD() {
  const listening = useExerciseListening("sb_unit6_page6_q1");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ALL_INPUTS.map((item) => ({
    key: item.id,
    correct: item.correct,
    answer: item.answer,
    label: `Blank ${item.id}. Complete advice with should or should not. Read the surrounding camping story.`,
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

  const isWrongPart = (item) => !showAns && results[item.id] === "wrong";

  const renderPart = (part, i) => {
    if (part.t === "text") {
      return (
        <span key={i} className="lrcs-text">
          {renderExerciseAudioText({
            audio: listening,
            id: `fragment-${i}`,
            src: {
              "0-0": clipPage51D1,
              "2-0": clipPage51D2,
              "3-1": clipPage51D3,
              "4-0": clipPage51D4,
              "4-2": clipPage51D5,
              "5-0": clipPage51D6,
              "6-0": clipPage51D7,
              "8-2": clipPage51D8,
              "9-0": clipPage51D9,
              "9-2": clipPage51D10,
            }[i],
            label: part.v,
            children: part.v,
          })}
        </span>
      );
    }

    const wrong = isWrongPart(part);

    const value = answers[part.id] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="lrcs-input-wrap">
        <input
          placeholder="Answer"
          aria-invalid={results[part.id] === "wrong"}
          title={
            answerTargets.find((target) => target.key === part.id)?.label ||
            "Write an answer"
          }
          aria-label={
            answerTargets.find((target) => target.key === part.id)?.label ||
            "Write an answer"
          }
          {...fieldKeys}
          type="text"
          className={[
            "lrcs-input",
            wrong ? "lrcs-input--wrong" : "",
            showAns ? "lrcs-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={showAns || results[part.id] === "correct"}
          onChange={(e) => handleChange(part.id, e.target.value)}
          style={{
            ...{ borderBottomColor: uColor, color: tColor },
            borderBottomColor:
              showAns || results[part.id] === "correct"
                ? "#16a34a"
                : results[part.id] === "wrong"
                  ? "#ef4444"
                  : undefined,
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="lrcs-badge">✕</span>}
      </span>
    );
  };

  return (
    <div
      data-adapt-scope="unit6_Unit6_Page6_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit6_Unit6_Page6_Q1"] input:focus-visible, [data-adapt-scope="unit6_Unit6_Page6_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_Unit6_Page6_Q1"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Top: text lines col | image col ── */
        .lrcs-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          width: 100%;
        }

        /* ── Lines container ── */
        .lrcs-lines {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Single line */
        .lrcs-line {
          display: flex;
          align-items: baseline;
          flex-wrap: nowrap;
          min-height: clamp(28px, 3.6vw, 44px);
        }

        .lrcs-text {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 1.9;
          white-space: pre-wrap;
        }

        /* Inline input wrap */
        .lrcs-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          flex: 0 0 clamp(80px, 9vw, 130px);
          min-width: clamp(70px, 8vw, 115px);
          margin: 0 2px;
        }

        .lrcs-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .lrcs-input:disabled  { opacity: 1; cursor: default; }
        .lrcs-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lrcs-input--answer   {
          color: ${INPUT_ANSWER_COLOR};
        }

        /* ✕ badge */
        .lrcs-badge {
          position: absolute;
          top: -6px; right: -4px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Scene image */
        .lrcs-scene-img {
          position: absolute;
    width: 20%;
    height: auto;
    display: block;
    border-radius: 10px;
    flex-shrink: 0;
    right: 8em;
top : 20em ; 
        }

        .lrcs-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrcs-top { grid-template-columns: 1fr; }
          .lrcs-scene-img { width: 100%; max-width: 280px; margin: 0 auto; }
          .lrcs-line { flex-wrap: wrap; }
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
          subTitle="Listen to the full item first, replay any part you need, then write or complete the answer using the text and picture clues."
          sectionLetter="D"
          title={<>Listen, read, and complete the story.</>}
        />

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit6_page6_q1"
            src={sound}
            captions={captions}
            stopAtSecond={6.88}
          />
        </div>

        {/* ── Top: lines + image ── */}
        <div className="lrcs-top">
          {/* Text lines with inline inputs */}
          <div className="lrcs-lines">
            {LINES.map((line, li) => (
              <div key={li} className="lrcs-line">
                {line.map((part, pi) => renderPart(part, `${li}-${pi}`))}
              </div>
            ))}
          </div>

          {/* Image */}
          <img
            src={imgScene}
            alt="Children sitting at the entrance of a camping tent."
            className="lrcs-scene-img"
          />
        </div>

        {/* ── Buttons ── */}
        <div className="lrcs-buttons">
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
