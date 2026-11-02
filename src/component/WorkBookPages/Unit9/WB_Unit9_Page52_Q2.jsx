import clipPage52D6 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - D/Item_006_you_want_to_go_to_the_park.mp3";
import clipPage52D5 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - D/Item_005_you_want_to_go_to_the_jungle.mp3";
import clipPage52D4 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - D/Item_004_you_want_to_go_to_the_cave.mp3";
import clipPage52D3 from "../../../assets/audio/WorkBook/Unit 9/Page 52 - D/Item_003_you_want_to_go_to_the_mall.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR = "#2b2b2b";
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const FILL_ANSWER_COLOR = "#c81e1e";
const FILL_UNDERLINE_DEFAULT = "#3f3f3f";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  item 1: fill = "Why do" (fixed answer)
//  items 2,3,4: fill = open (Why do / Why don't) — students' answers vary
//  response = سطر أو سطرين للإجابة الحرة
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    fill: { key: "1f", answer: "Why do", fixed: true },
    rest: "you want to go to the mall?",
    lines: [
      { key: "1a", answer: "I want to go to the mall" },
      { key: "1b", answer: "because I need shoes." },
    ],
  },
  {
    id: 2,
    fill: { key: "2f", answer: "Why do", fixed: false },
    rest: "you want to go to the cave?",
    lines: [
      { key: "2a", answer: "" },
      { key: "2b", answer: "" },
    ],
  },
  {
    id: 3,
    fill: { key: "3f", answer: "Why do", fixed: false },
    rest: "you want to go to the jungle?",
    lines: [
      { key: "3a", answer: "" },
      { key: "3b", answer: "" },
    ],
  },
  {
    id: 4,
    fill: { key: "4f", answer: "Why don't", fixed: false },
    rest: "you want to go to the park?",
    lines: [
      { key: "4a", answer: "" },
      { key: "4b", answer: "" },
    ],
  },
];

// flat list of all input keys
const ALL_KEYS = ITEMS.flatMap((item) => [
  item.fill.key,
  ...item.lines.map((l) => l.key),
]);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteWhyDo_QD() {
  const listening = useExerciseListening("wb_unit9_page52_q2");

  const [answers, setAnswers] = useState({});
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    listening.stop();
    setAnswers({});
    setAnnouncement("Answers cleared.");
  };

  return (
    <div
      data-adapt-scope="Unit9_WB_Unit9_Page52_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit9_WB_Unit9_Page52_Q2"] input:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit9_WB_Unit9_Page52_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Items list ── */
        .rwwd-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 28px);
          width: 100%;
          margin: 5% 0;
        }

        /* ── Single item ── */
        .rwwd-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(6px, 0.8vw, 12px);
          align-items: start;
        }

        /* Number */
        .rwwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-top: 5px;
          line-height: 1;
        }

        /* Left side: fill input + rest text */
        .rwwd-left {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          padding-top: 4px;
        }

        /* Fill input (Why do / Why don't) */
        .rwwd-fill-wrap {
          position: relative;
          display: inline-block;
        }

        .rwwd-fill-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid ${FILL_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          width: clamp(70px, 9vw, 120px);
          box-sizing: border-box;
          text-align: center;
          transition: border-color 0.2s;
        }
        .rwwd-fill-input:disabled { opacity: 1; cursor: default; }
        .rwwd-fill-input--answer  { color: ${FILL_ANSWER_COLOR}; font-weight: 600; }

        /* Rest text */
        .rwwd-rest {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.5;
          white-space: nowrap;
        }

        /* Right side: answer lines */
        .rwwd-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: clamp(160px, 26vw, 340px);
        }

        /* Answer input wrap */
        .rwwd-ans-wrap {
          position: relative;
          width: 100%;
        }

        .rwwd-ans-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwwd-ans-input:disabled { opacity: 1; cursor: default; }

        /* Buttons */
        .rwwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rwwd-item { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rwwd-right { grid-column: 1 / -1; min-width: 0; }
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
          subTitle="Read each place, choose Why do or Why don't, then give a complete personal reason."
          sectionLetter="D"
          title={
            <>
              Read and write <span style={{ color: "#f89631" }}>Why do</span> or
              <span style={{ color: "#f89631" }}> Why don't </span>
              Answer .
            </>
          }
        />

        {/* ── Items ── */}
        <div className="rwwd-list">
          {ITEMS.map((item) => {
            const fillValue = item.fill.fixed
              ? item.fill.answer
              : answers[item.fill.key] || "";

            return (
              <div key={item.id} className="rwwd-item">
                {/* Number */}
                <span className="rwwd-num">{item.id}</span>

                {/* Left: fill + rest */}
                <div className="rwwd-left">
                  <div className="rwwd-fill-wrap">
                    <input
                      {...fieldKeys}
                      aria-label={`Question ${item.id}. Choose Why do or Why don’t before: ${item.rest}`}
                      title={`Question ${item.id}. Choose Why do or Why don’t before: ${item.rest}`}
                      placeholder="Why do / Why don’t"
                      type="text"
                      className={[
                        "rwwd-fill-input",
                        item.fill.fixed ? "rwwd-fill-input--answer" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      value={fillValue}
                      disabled={item.fill.fixed}
                      onChange={(e) =>
                        handleChange(item.fill.key, e.target.value)
                      }
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                  <span className="rwwd-rest">
                    {renderExerciseAudioText({
                      audio: listening,
                      id: `place-${item.id}`,
                      src: [
                        clipPage52D3,
                        clipPage52D4,
                        clipPage52D5,
                        clipPage52D6,
                      ][item.id - 1],
                      label: item.rest,
                      children: item.rest,
                    })}
                  </span>
                </div>

                {/* Right: answer lines */}
                <div className="rwwd-right">
                  {item.lines.map((line) => (
                    <div key={line.key} className="rwwd-ans-wrap">
                      <input
                        {...fieldKeys}
                        aria-label={`Question ${item.id}, answer line ${item.lines.indexOf(line) + 1}. Give your own reason for: ${item.rest}`}
                        title={`Question ${item.id}, answer line ${item.lines.indexOf(line) + 1}. Give your own reason for: ${item.rest}`}
                        placeholder="Your reason"
                        type="text"
                        className="rwwd-ans-input"
                        value={answers[line.key] || ""}
                        onChange={(e) => handleChange(line.key, e.target.value)}
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Button: reset only ── */}
        <div className="rwwd-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              {...activationKeys}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
