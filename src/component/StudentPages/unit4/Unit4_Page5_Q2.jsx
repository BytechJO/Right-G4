import clipC2 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - C/Item_002_slow.mp3";
import clipC1 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - C/Item_001_big.mp3";
import clipC3 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - A/Item_002_taller.mp3";
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
import familyImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 32/SVG/Asset 4.svg";

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
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR = "#2b2b2b";
const WRONG_COLOR = "#ef4444";
const RIGHT_COLOR = "#2096a6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    base: "big",
    baseBlank: false,
    comp: "bigger",
    compBlank: true,
    super: "biggest",
    superBlank: true,
  },
  {
    id: 2,
    base: "tall",
    baseBlank: true,
    comp: "taller",
    compBlank: false,
    super: "tallest",
    superBlank: true,
  },
  {
    id: 3,
    base: "slow",
    baseBlank: false,
    comp: "slower",
    compBlank: true,
    super: "slowest",
    superBlank: true,
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadAndWrite_QA() {
  const listening = useExerciseListening("sb_unit4_page5_q2");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ITEMS.flatMap((item) =>
    ["base", "comp", "super"]
      .filter((field) => item[field + "Blank"])
      .map((field) => ({
        key: `${item.id}-${field}`,
        correct: [item[field]],
        answer: item[field],
        label: `Row ${item.id}. Write the ${field === "base" ? "base adjective" : field === "comp" ? "comparative" : "superlative"} form.`,
      })),
  );
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const getKey = (id, field) => `${id}-${field}`;

  const getCorrect = (item, field) => {
    if (field === "base") return item.base ?? "";
    if (field === "comp") return item.comp ?? "";
    if (field === "super") return item.super ?? "";
    return "";
  };

  const isBlank = (item, field) => {
    if (field === "base") return item.baseBlank;
    if (field === "comp") return item.compBlank;
    if (field === "super") return item.superBlank;
    return false;
  };

  const handleChange = (id, field, value) => {
    const key = getKey(id, field);
    if (showAns || results[key] === "correct") return;
    if (!answerTargets.some((item) => item.key === key)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // جمع كل الخانات الفارغة
  const allBlanks = [];
  ITEMS.forEach((item) => {
    ["base", "comp", "super"].forEach((field) => {
      if (isBlank(item, field)) allBlanks.push({ item, field });
    });
  });

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

  const getFieldState = (item, field) =>
    !isBlank(item, field)
      ? "static"
      : showAns
        ? "answer"
        : results[getKey(item.id, field)] || "editing";

  const renderCell = (item, field) => {
    const blank = isBlank(item, field);
    const state = getFieldState(item, field);
    const val = answers[getKey(item.id, field)] || "";
    const corr = getCorrect(item, field);

    if (!blank) {
      return (
        <span className="raw-cell">
          {renderExerciseAudioText({
            audio: listening,
            id: `word-${item.id}-${field}`,
            src: { big: clipC1, slow: clipC2, taller: clipC3 }[corr],
            label: `Hear ${corr}`,
            children: <>{corr}</>,
          })}
        </span>
      );
    }

    let color = TEXT_DEFAULT;
    if (state === "answer") color = ANSWER_COLOR;
    if (state === "correct") color = RIGHT_COLOR;
    if (state === "wrong") color = WRONG_COLOR;

    return (
      <span className="input-cell">
        <input
          placeholder="Answer"
          aria-invalid={results[getKey(item.id, field)] === "wrong"}
          title={
            answerTargets.find(
              (target) => target.key === getKey(item.id, field),
            )?.label || "Write an answer"
          }
          aria-label={
            answerTargets.find(
              (target) => target.key === getKey(item.id, field),
            )?.label || "Write an answer"
          }
          {...fieldKeys}
          className="rw-input"
          type="text"
          value={state === "answer" ? corr : val}
          disabled={showAns || results[getKey(item.id, field)] === "correct"}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{
            ...{ color, borderBottomColor: color },
            borderBottomColor:
              showAns || results[getKey(item.id, field)] === "correct"
                ? "#16a34a"
                : results[getKey(item.id, field)] === "wrong"
                  ? "#ef4444"
                  : { color, borderBottomColor: color }.borderBottomColor,
          }}
        />
        {state === "wrong" && (
          <span className="wrong-hint" style={{ color: ANSWER_COLOR }}>
            {renderExerciseAudioText({
              audio: listening,
              id: `word-${item.id}-${field}`,
              src: { big: clipC1, slow: clipC2, taller: clipC3 }[corr],
              label: `Hear ${corr}`,
              children: <>{corr}</>,
            })}
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      data-listening-scope={"sb_unit4_page5_q2"}
      data-adapt-scope="unit4_Unit4_Page5_Q2"
      className="main-container-component"
    >
      <style>{`[data-listening-scope="sb_unit4_page5_q2"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="unit4_Unit4_Page5_Q2"] input:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_Unit4_Page5_Q2"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .rw-layout {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 40px);
          width: 100%;
          margin : 10% 0 ;
        }

        .rw-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
          min-width: 0;
        }

        .rw-right img {
          width: clamp(180px, 28vw, 340px);
          height: auto;
          display: block;
        }

        .rw-row {
          display: flex;
          align-items: baseline;
          gap: clamp(10px, 1.6vw, 22px);
          flex-wrap: nowrap;
        }

        .rw-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .raw-cell {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
        }

        .input-cell {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          min-width: clamp(80px, 10vw, 130px);
        }

        .rw-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${LINE_COLOR};
          outline: none;
          background: transparent;
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 500;
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          color: ${TEXT_DEFAULT};
        }
        .rw-input:disabled { opacity: 1; cursor: default; }

        .wrong-hint {
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          padding: 0 4px;
        }

        .rw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
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
        {/* Header */}
        <ExerciseHeader
          sectionLetter="B"
          title={<>Read and write.</>}
          subTitle={
            "Read the full prompt first, then complete each answer carefully before checking your work."
          }
        />

        {/* Layout */}
        <div className="rw-layout">
          {/* الصفوف */}
          <div className="rw-left">
            {ITEMS.map((item) => (
              <div key={item.id} className="rw-row">
                <span className="rw-num">{item.id}</span>
                {renderCell(item, "base")}
                {renderCell(item, "comp")}
                {renderCell(item, "super")}
              </div>
            ))}
          </div>

          {/* الصورة */}
          <div className="rw-right">
            <img
              src={familyImg}
              alt="Seven people of different ages and heights standing in a row."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="rw-buttons">
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
