import missingNew0 from "../../../assets/audio/G4-Missing/tall.mp3";
import missingNew1 from "../../../assets/audio/G4-Missing/high.mp3";
import missingNew2 from "../../../assets/audio/G4-Missing/big.mp3";
import missingNew3 from "../../../assets/audio/G4-Missing/heavy.mp3";
import missingNew4 from "../../../assets/audio/G4-Missing/fast.mp3";
import missingNew5 from "../../../assets/audio/G4-Missing/young.mp3";
// import clipPage24F2 from "../../../assets/audio/WorkBook/Unit 4/Page 24 - F/Item_002_big_small.mp3";
// import clipPage24F1 from "../../../assets/audio/WorkBook/Unit 4/Page 24 - F/Item_001_tall_short.mp3";
import {
  useEffect as useListeningEffect,
  useRef as useListeningRef,
  useState as useListeningState,
} from "react";
import { useAudio } from "../../../context/AudioContext";
import { FaVolumeUp as ListeningSpeakerIcon } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — صورة المزرعة
// ─────────────────────────────────────────────
import farmImg from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U4 Folder/Page 24/SVG/Asset 3.svg";
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
const PAIR_BORDER_COLOR = "#2096a6";
const PAIR_TEXT_COLOR = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────

// أزواج الكلمات — 3 أعمدة × 2 صفوف
const WORD_PAIRS = [
  { left: "tall", right: "short" },
  { left: "high", right: "low" },
  { left: "big", right: "small" },
  { left: "heavy", right: "light" },
  { left: "fast", right: "slow" },
  { left: "young", right: "old" },
];

// 4 أسطر حرة للكتابة
const LINE_IDS = [1, 2, 3, 4];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteSentences_QF() {
  const listening = useExerciseListening("wb_unit4_page24_q1");

  const [answers, setAnswers] = useState({});
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    listening.stop();
    setAnswers({});
    setAnnouncement("Responses cleared.");
  };

  return (
    <div
      data-adapt-scope="Unit4_WB_Unit4_Page24_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit4_WB_Unit4_Page24_Q1"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page24_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page24_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page24_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Farm image ── */
        .lwsf-img {
          width: 65%;
          display: block;
          height : auto ;
        }

        /* ── Word pairs grid ── */
        .lwsf-pairs {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: clamp(6px, 1vw, 12px) clamp(10px, 1.8vw, 24px);
          justify-content: center;
        }

        .lwsf-pair {
          border: 2px solid ${PAIR_BORDER_COLOR};
          border-radius: 15px;
          padding: clamp(4px, 0.5vw, 7px) clamp(10px, 1.2vw, 16px);
font-size: clamp(15px, 1.9vw, 20px);

          color: ${PAIR_TEXT_COLOR};
          white-space: nowrap;
          display: flex;
          gap: clamp(8px, 1vw, 14px);
        }

        /* ── Lines ── */
        .lwsf-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        .lwsf-line-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(6px, 0.8vw, 10px);
        }

        .lwsf-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          min-width: clamp(12px, 1.4vw, 18px);
        }

        .lwsf-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);

color: ${INPUT_TEXT_COLOR};

line-height: 1.5;
          box-sizing: border-box;

          }
        .lwsf-input:disabled { opacity: 1; cursor: default; }

        /* Buttons */
        .lwsf-buttons {
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
          subTitle="Use the picture clue, decide whether you need a comparative or superlative, then write a different correct word each time."
          sectionLetter="F"
          title={
            <>
              Look and write sentences. Use a different{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#f89631",
                }}
              >
                -er
              </span>{" "}
              or{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#f89631",
                }}
              >
                -est
              </span>{" "}
              word for each sentence.
            </>
          }
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* ── Farm image ── */}
          <img
            src={farmImg}
            alt={
              "A farm with a house, barn, windmill, tractor, cows, horses, sheep, chickens and dogs."
            }
            className="lwsf-img"
          />
        </div>
        {/* ── Word pairs ── */}
        <div className="lwsf-pairs">
          {WORD_PAIRS.map((p, i) =>
            renderExerciseAudioGroup({
              audio: listening,
              id: `pair-${i}`,
              src: [
                missingNew0,
                missingNew1,
                missingNew2,
                missingNew3,
                missingNew4,
                missingNew5,
              ][i],
              label: p.left + " / " + p.right,
              className: "lwsf-pair",
              style: undefined,
              key: i,
              children: (
                <>
                  <span>{p.left}</span>
                  <span>{p.right}</span>
                </>
              ),
            }),
          )}
        </div>

        {/* ── Writing lines ── */}
        <div className="lwsf-lines">
          {LINE_IDS.map((id) => (
            <div key={id} className="lwsf-line-row">
              <span className="lwsf-num">{id}</span>
              <input
                {...fieldKeys}
                aria-label={`Sentence ${id}. Describe the farm using a different comparative or superlative word.`}
                title={`Sentence ${id}. Use a different -er or -est word.`}
                placeholder="Your sentence"
                type="text"
                className="lwsf-input"
                value={answers[id] || ""}
                onChange={(e) => handleChange(id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {/* ── Start Again only ── */}
        <div className="lwsf-buttons">
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
