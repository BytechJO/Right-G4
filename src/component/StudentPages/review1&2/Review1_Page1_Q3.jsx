import clipC6 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_006_will_won't_sit_in_the_sand_while_reading_a_book.mp3";
import clipC5 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_005_will_won't_fly_a_kite_while_at_the_beach._He.mp3";
import clipC4 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_004_stay_near_the_shore_when_he_swims._John_will.mp3";
import clipC3 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_003_go_swimming_in_the_sea._He_won't_will.mp3";
import clipC2 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_002_won't_will_lie_in_the_sun._Harley_will_won't.mp3";
import clipC1 from "../../../assets/audio/ClassBook/Unit 2/Page 16 - C/Item_001_Hansel_will_won't_go_to_the_beach_on_Saturday._He.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 16/SVG/Asset 5.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd12pg16-instruction-adult-lady_gGpt9qB6.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";

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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_DEFAULT = "#2096a6";
const CIRCLE_WRONG = "#ef4444";
const TEXT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARTS = [
  { type: "text", value: "Hansel " },
  { type: "choice", id: 1, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " go to the beach on Saturday. He " },
  { type: "choice", id: 2, options: ["won't", "will"], correct: "won't" },
  { type: "text", value: " lie in the sun. Harley " },
  { type: "choice", id: 3, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " go swimming in the sea. He " },
  { type: "choice", id: 4, options: ["won't", "will"], correct: "won't" },
  { type: "text", value: " stay near the shore when he swims. John will / " },
  { type: "choice", id: 5, options: ["will", "won't"], correct: "won't" },
  { type: "text", value: " fly a kite while at the beach. He " },
  { type: "choice", id: 6, options: ["will", "won't"], correct: "will" },
  { type: "text", value: " sit in the sand while reading a book." },
];


// Printed PARTS ranges match the six recordings; these are not time offsets.
const PASSAGE_AUDIO = [
  { start: 0, end: 3, src: clipC1 },
  { start: 3, end: 6, src: clipC2 },
  { start: 6, end: 8, src: clipC3 },
  { start: 8, end: 9, src: clipC4 },
  { start: 9, end: 11, src: clipC5 },
  { start: 11, end: 13, src: clipC6 },
];
const ALL_CHOICES = PARTS.filter((p) => p.type === "choice");

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
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

export default function WB_ReadListenChoose_QC() {
  const listening = useExerciseListening("sb_review1_page1_q3");

  const [selected, setSelected] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ALL_CHOICES.every((choice) => results[choice.id] === "correct");

  const isLocked = (id) => showAns || results[id] === "correct";

  const handleClick = (id, option) => {
    if (isLocked(id)) return;
    setSelected((previous) => ({
      ...previous,
      [id]: previous[id] === option ? null : option,
    }));
    setResults((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    setAnnouncement(
      selected[id] === option
        ? `Blank ${id}: selection cleared.`
        : `Blank ${id}: ${option} selected.`,
    );
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (!ALL_CHOICES.every((choice) => selected[choice.id])) {
      setAnnouncement("Please choose an option for each blank.");
      ValidationAlert.info("Please choose an option for each blank.");
      return;
    }
    const checked = Object.fromEntries(
      ALL_CHOICES.map((choice) => [
        choice.id,
        selected[choice.id] === choice.correct ? "correct" : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ALL_CHOICES.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ALL_CHOICES.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ALL_CHOICES.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ALL_CHOICES.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ALL_CHOICES.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    const filled = {};
    ALL_CHOICES.forEach((c) => {
      filled[c.id] = c.correct;
    });
    setSelected(filled);
    setResults({});
    setShowAns(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const captions = [
    {
      start: 0.2,
      end: 6.6,
      text: "Page 16, review one, exercise C. Read, listen, and choose.",
    },
    {
      start: 7.82,
      end: 10.1,
      text: "Hansel will go to the beach on Saturday.",
    },
    { start: 10.1, end: 13.22, text: "He won't lie in the sun." },
    { start: 13.22, end: 15.3, text: "Harley will go swimming in the sea." },
    {
      start: 15.3,
      end: 18.78,
      text: "He will stay near the shore when he swims.",
    },
    {
      start: 19.86,
      end: 22.74,
      text: "John won't fly a kite while at the beach.",
    },
    {
      start: 22.74,
      end: 25.92,
      text: "He will sit in the sand while reading a book.",
    },
  ];

  const getOptionState = (choice, option) =>
    selected[choice.id] !== option
      ? "idle"
      : showAns
        ? "correct"
        : results[choice.id] || "selected";

  const renderPart = (part, i) => {
    const segmentIndex = PASSAGE_AUDIO.findIndex(segment => i >= segment.start && i < segment.end);
    const segment = PASSAGE_AUDIO[segmentIndex];
    const id = "passage-part-" + (segmentIndex + 1);
    const first = i === segment.start;
    const playing = listening.activeId === id;
    const fragmentKeys = event => {
      if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.type === "keydown" && !event.repeat) listening.play(id, segment.src);
    };
    const fragmentProps = {
      role: part.type === "choice" ? "group" : first ? "button" : undefined,
      tabIndex: first ? 0 : undefined,
      "data-listening": first ? id : undefined,
      "data-passage-fragment": id,
      "aria-label": first ? "Hear passage part " + (segmentIndex + 1) + ": " + PARTS.slice(segment.start, segment.end).map(piece => piece.type === "choice" ? piece.options.join(" / ") : piece.value).join("").trim() : undefined,
      onClick: event => {
        if (event.target.closest("[data-keyboard-choice]")) return;
        event.stopPropagation();
        listening.play(id, segment.src);
      },
      onKeyDown: first ? fragmentKeys : undefined,
      onKeyUp: first ? fragmentKeys : undefined,
      style: {
        position: "relative",
        cursor: "pointer",
        borderRadius: 6,
        boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
        backgroundColor: playing ? "#dbeafe" : undefined,
      },
    };

    if (part.type === "text") {
      return (
        <span {...fragmentProps} key={i} className="rlcq-text">
          {part.value}
        {first && playing && renderExerciseSpeaker()}</span>
      );
    }

    return (
      <span {...fragmentProps} key={part.id} className="rlcq-choice-group">
        {part.options.map((option, oi) => {
          const state = getOptionState(part, option);
          const isWrong = state === "wrong";

          return (
            <span key={option} className="rlcq-option-wrap">
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-label={`Blank ${part.id}. ${option}${isLocked(part.id) ? ". Locked" : ""}`}
                aria-pressed={selected[part.id] === option}
                aria-disabled={isLocked(part.id)}
                style={{
                  backgroundColor:
                    selected[part.id] === option ? "#dbeafe" : undefined,
                  borderColor:
                    state === "correct"
                      ? "#16a34a"
                      : state === "wrong"
                        ? "#ef4444"
                        : undefined,
                }}
                className={[
                  "rlcq-option",
                  state === "selected" ? "rlcq-option--selected" : "",
                  state === "correct" ? "rlcq-option--correct" : "",
                  state === "wrong" ? "rlcq-option--wrong" : "",
                  isLocked(part.id) ? "rlcq-option--locked" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleClick(part.id, option)}
              >
                {option}
                {isWrong && <span className="rlcq-badge">✕</span>}
              </span>
              {oi < part.options.length - 1 && (
                <span className="rlcq-slash"> / </span>
              )}
            </span>
          );
        })}
      {first && playing && renderExerciseSpeaker()}</span>
    );
  };

  return (
    <div
      data-listening-scope={"sb_review1_page1_q3"}
      className="main-container-component"
      data-review12-scope="Review1_Page1_Q3"
    >
      <style>{`[data-listening-scope="sb_review1_page1_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review1_Page1_Q3"] [data-keyboard-choice]:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 999px;
      }`}</style>
      <style>{`
        /* ── Top: image + paragraph ── */
        .rlcq-top {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .rlcq-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* Paragraph */
        .rlcq-para {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          line-height: 2.2;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-text {
          font-size: clamp(14px, 1.7vw, 19px);
          color: ${TEXT_COLOR};
          // line-height: 2.2;
          // white-space: pre-wrap;
        }

        /* Choice group */
        .rlcq-choice-group {
          display: inline-flex;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-option-wrap {
          display: inline-flex;
          align-items: baseline;
          gap: 0;
        }

        .rlcq-slash {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${TEXT_COLOR};
          font-weight: 700;
        }

        /* Clickable option */
        .rlcq-option {
          position: relative;
          display: inline-block;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${TEXT_COLOR};
          cursor: pointer;
          user-select: none;
          padding: 0 clamp(3px, 0.4vw, 5px);
          border-radius: 999px;
          border: 2px solid transparent;
          line-height: 1.6;
          transition: border-color 0.15s, color 0.15s, background-color 0.15s;
        }
        .rlcq-option--locked { cursor: default; }

        /* States */
        .rlcq-option--selected { border-color: ${CIRCLE_DEFAULT}; }
        .rlcq-option--wrong    { border-color: ${CIRCLE_WRONG}; }
        .rlcq-option--correct  { border-color:${CIRCLE_WRONG};  }

        /* ✕ badge */
        .rlcq-badge {
          position: absolute;
          top: -8px; right: -6px;
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

        /* Buttons */
        .rlcq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlcq-top { grid-template-columns: 1fr; }
          .rlcq-img { width: 100%; }
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
        <ExerciseHeader
          isReview
          sectionLetter={"C"}
          title={" Read, listen, and choose."}
          subTitle={
            "Listen once, replay if needed, then select the option that matches what you hear and read."
          }
        />
        <div style={{ margin: "3em 0 2em" }}>
          <QuestionAudioPlayer
            pageId="sb_review1_page1_q3"
            src={sound}
            captions={captions}
            stopAtSecond={7}
          />
        </div>

        {/* ── Image + Paragraph ── */}
        <div className="rlcq-top">
          <img src={imgScene} alt="beach" className="rlcq-img" />
          {<div className="rlcq-para">{PARTS.map((part, i) => renderPart(part, i))}</div>}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcq-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              {...activationKeys}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
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
