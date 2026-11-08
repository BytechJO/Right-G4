import clipPage72B9 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_009_pull.mp3";
import clipPage72B8 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_008_help.mp3";
import clipPage72B7 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_007_play.mp3";
import clipPage72B6 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_006_wash.mp3";
import clipPage72B5 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_005_jump.mp3";
import clipPage72B4 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_004_paint.mp3";
import clipPage72B3 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_003_cook.mp3";
import clipPage72B2 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_002_She_talked_to_her_friend.mp3";
import clipPage72B1 from "../../../assets/audio/ClassBook/Unit 8/Page 72 - B/Item_001_talk.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";
import Button from "../../Button";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WORD_COLOR = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "talk", example: "She talked to her friend." },
  { id: 2, word: "cook", example: "" },
  { id: 3, word: "paint", example: "" },
  { id: 4, word: "jump", example: "" },
  { id: 5, word: "wash", example: "" },
  { id: 6, word: "play", example: "" },
  { id: 7, word: "help", example: "" },
  { id: 8, word: "pull", example: "" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWritePastTense_QB() {
  const listening = useExerciseListening("sb_review8_page1_q2");

  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const [announcement, setAnnouncement] = useState("");
  const handleReset = () => {
    listening.stop();
    setAnnouncement("Your sentences cleared.");
    setAnswers({});
  };

  return (
    <div
      data-adapt-scope="review7&8_Review8_Page1_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review7&8_Review8_Page1_Q2"] input:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review8_Page1_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review8_Page1_Q2"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rwpt-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
        }

        .rwpt-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.9vw, 12px);
        }

        .rwpt-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(16px, 2vw, 24px);
        }

        .rwpt-word {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${WORD_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(50px, 7vw, 90px);
        }

        .rwpt-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
        }

        .rwpt-buttons {
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
          subTitle="Change each base verb to the correct past-tense form, then read the complete sentence before checking."
          isReview
          sectionLetter="B"
          title={<>Read and write sentences in the past tense.</>}
        />

        {/* ── Items ── */}
        <div className="rwpt-list">
          {ITEMS.map((item) =>
            renderExerciseAudioGroup({
              audio: listening,
              id: `example-${item.id}`,
              src: item.id === 1 ? clipPage72B2 : null,
              label: "Example: She talked to her friend.",
              className: "rwpt-row",
              style: undefined,
              key: item.id,
              children: (
                <>
                  <span className="rwpt-num">{item.id}</span>
                  <span className="rwpt-word">
                    {renderExerciseAudioText({
                      audio: listening,
                      id: `word-${item.id}`,
                      src: [
                        clipPage72B1,
                        clipPage72B3,
                        clipPage72B4,
                        clipPage72B5,
                        clipPage72B6,
                        clipPage72B7,
                        clipPage72B8,
                        clipPage72B9,
                      ][item.id - 1],
                      label: item.word,
                      children: item.word,
                    })}
                  </span>
                  <input
                    {...fieldKeys}
                    aria-label={`Sentence ${item.id}. Write a past-tense sentence using ${item.word}.`}
                    title={`Sentence ${item.id}. Use ${item.word} in the past tense.`}
                    type="text"
                    className="rwpt-input"
                    value={
                      answers[item.id] ||
                      (item.example && item.id === 1 ? item.example : "")
                    }
                    readOnly={item.id === 1}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    placeholder={item.id === 1 ? item.example : "Your sentence"}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </>
              ),
            }),
          )}
        </div>

        {/* ── Reset only ── */}
        <div className="rwpt-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
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
