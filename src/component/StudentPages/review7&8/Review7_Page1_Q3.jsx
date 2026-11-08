import missingNew0 from "../../../assets/audio/G4-Missing/There were.mp3";
// import missingNew1 from "../../../assets/audio/G4-Missing/There.mp3";
import clipPage70C4 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - C/Item_004_There_in_the_jar.mp3";
import clipPage70C3 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - C/Item_003_There_in_the_carton.mp3";
import clipPage70C2 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - C/Item_002_There_in_the_basket.mp3";
import clipPage70C1 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - C/Item_001_on_the_plate.mp3";
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
//  🖼️  IMAGES — صورة لكل سؤال
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 2.svg"; // tomatoes
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 3.svg"; // bread
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 4.svg"; // milk
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 70/SVG/Asset 5.svg";
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
// honey

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  parts: مصفوفة من عناصر لكل سطر
//  { t: "text", v }   → نص عادي
//  { t: "img",  src } → صورة
//  { t: "input", id, correct, answer } → input
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { t: "text", v: "There were" },
      { t: "img", src: img1 },
      { t: "input", id: "1a", correct: ["tomatoes"], answer: "tomatoes" },
      { t: "text", v: "on the plate." },
    ],
  },
  {
    id: 2,
    parts: [
      { t: "text", v: "There" },
      { t: "input", id: "2a", correct: ["was", "were"], answer: "was" },
      { t: "img", src: img2 },
      { t: "input", id: "2b", correct: ["bread"], answer: "bread" },
      { t: "text", v: "in the basket." },
    ],
  },
  {
    id: 3,
    parts: [
      { t: "text", v: "There" },
      { t: "input", id: "3a", correct: ["was", "were"], answer: "was" },
      { t: "img", src: img3 },
      { t: "input", id: "3b", correct: ["milk"], answer: "milk" },
      { t: "text", v: "in the carton." },
    ],
  },
  {
    id: 4,
    parts: [
      { t: "text", v: "There" },
      { t: "input", id: "4a", correct: ["was", "were"], answer: "was" },
      { t: "img", src: img4 },
      { t: "input", id: "4b", correct: ["honey"], answer: "honey" },
      { t: "text", v: "in the jar." },
    ],
  },
];

// collect all input parts
const ALL_INPUTS = ITEMS.flatMap((item) =>
  item.parts.filter((p) => p.t === "input"),
);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookComplete_QC() {
  const listening = useExerciseListening("sb_review7_page1_q3");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ALL_INPUTS.map((part) => {
    const row = ITEMS.find((item) => item.parts.some((p) => p.id === part.id)),
      role = "sentence";
    return {
      key: part.id,
      correct: Array.isArray(part.correct) ? part.correct : [part.correct],
      answer: part.answer ?? part.correct,
      label: `Question ${row?.id}, ${role} blank ${row?.parts.filter((p) => p.t === "input").findIndex((p) => p.id === part.id) + 1}. Complete using the picture and the given words.`,
    };
  });
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
        <span key={i} className="rlcc-text">
          {renderExerciseAudioText({
            audio: listening,
            id: `text-${part.v}`,
            src:
              part.v.trim() === "on the plate."
                ? clipPage70C1
                : part.v.trim() === "There were"
                  ? missingNew0
                  : null,
            label: part.v,
            children: part.v,
          })}
        </span>
      );
    }

    if (part.t === "img") {
      return (
        <img
          key={i}
          src={part.src}
          alt={
            {
              [img1]: "Tomatoes on a plate.",
              [img2]: "Bread in a bowl.",
              [img3]: "A carton of milk.",
              [img4]: "A jar filled with nuts.",
            }[part.src]
          }
          className="rlcc-food-img"
        />
      );
    }

    // input
    const wrong = isWrongPart(part);

    const value = answers[part.id] || "";
    const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="rlcc-input-wrap">
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
            "rlcc-input",
            wrong ? "rlcc-input--wrong" : "",
            showAns ? "rlcc-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={showAns || results[part.id] === "correct"}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
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
        {wrong && <span className="rlcc-badge">✕</span>}
      </span>
    );
  };

  return (
    <div
      data-adapt-scope="review7&8_Review7_Page1_Q3"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review7&8_Review7_Page1_Q3"] input:focus-visible, [data-adapt-scope="review7&8_Review7_Page1_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review7&8_Review7_Page1_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="review7&8_Review7_Page1_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="review7&8_Review7_Page1_Q3"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
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
        /* ── List ── */
        .rlcc-list {
          display: flex;
          flex-direction: column;
          gap:clamp(45px, 2.8vw, 45px);
          width: 100%;
        }

        /* Single row */
        .rlcc-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(5px, 0.6vw, 8px);
        }

        .rlcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rlcc-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          line-height: 1.5;
          flex-shrink: 0;
        }

        /* Inline food image */
        .rlcc-food-img {
          height: clamp(36px, 5.5vw, 70px);
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
          vertical-align: middle;
        }

        /* Input wrap */
        .rlcc-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 0 1 clamp(80px, 10vw, 150px);
          min-width: clamp(70px, 9vw, 130px);
        }

        .rlcc-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .rlcc-input:disabled  { opacity: 1; cursor: default; }
        .rlcc-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlcc-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .rlcc-badge {
          position: absolute;
          top: -8px; right: -4px;
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

        .rlcc-buttons {
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
          subTitle="Read the whole sentence for meaning, then complete each blank with the word or form that fits before checking."
          isReview
          sectionLetter="C"
          title={<>Read, look, and complete the sentences.</>}
        />

        {/* ── Items ── */}
        <div className="rlcc-list">
          {ITEMS.map((item) =>
            renderExerciseAudioGroup({
              audio: listening,
              id: `sentence-${item.id}`,
              src: [null, clipPage70C2, clipPage70C3, clipPage70C4][
                item.id - 1
              ],
              label: `Sentence ${item.id}. There ... ${item.parts.filter((part) => part.t === "text").at(-1)?.v}`,
              className: "rlcc-row",
              style: undefined,
              key: item.id,
              children: (
                <>
                  <span className="rlcc-num">{item.id}</span>
                  {item.parts.map((part, i) => renderPart(part, i))}
                </>
              ),
            }),
          )}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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
