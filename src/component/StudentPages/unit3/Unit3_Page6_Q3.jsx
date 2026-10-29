import clipF3 from "../../../assets/audio/ClassBook/Unit 3/Page 27 - F/Item_003_(skateboard).mp3";
import clipF2 from "../../../assets/audio/ClassBook/Unit 3/Page 27 - F/Item_002_What_did_he_have_(car).mp3";
import clipF1 from "../../../assets/audio/ClassBook/Unit 3/Page 27 - F/Item_001_What_did_she_have_(scarf).mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

function useExerciseListening(pageId) {
  const coordinator = useAudio();
  const audioRef = useListeningRef(null),
    generation = useListeningRef(0);
  const [activeId, setActiveId] = useListeningState(null),
    [error, setError] = useListeningState("");
  const clearOwned = () => {
    const current = audioRef.current;
    if (current) {
      current.onended = current.onplaying = current.onerror = current.onpause = null;
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
    const queue = (Array.isArray(sources) ? sources : [sources]).filter(Boolean);
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
      const current = () => token === generation.current && audioRef.current === media;
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
      document.querySelectorAll("audio,video").forEach(other => {
        if (other !== media) other.pause();
      });
      coordinator?.registerAudio(media, null, pageId);
      media.play().catch(fail);
    };
    next();
  };
  useListeningEffect(() => () => {
    generation.current++;
    const media = audioRef.current;
    if (media) {
      media.onended = media.onplaying = media.onerror = media.onpause = null;
      media.pause();
      media.remove();
      audioRef.current = null;
    }
  }, []);
  return {
    play,
    stop,
    activeId,
    error
  };
}
function renderExerciseSpeaker() {
  return <span aria-hidden="true" style={{
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
    zIndex: 3
  }}><ListeningSpeakerIcon size={12} /></span>;
}
function renderExerciseAudioText({
  audio,
  id,
  src,
  label,
  children
}) {
  if (!src || Array.isArray(src) && !src.some(Boolean)) return children;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <span role="button" tabIndex={0} data-listening={id} aria-label={label} onClick={event => {
    event.stopPropagation();
    audio.play(id, src);
  }} onKeyDown={keys} onKeyUp={keys} style={{
    position: "relative",
    cursor: "pointer",
    borderRadius: 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
    backgroundColor: playing ? "#dbeafe" : undefined
  }}>{children}{playing && renderExerciseSpeaker()}</span>;
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
  if (!src || Array.isArray(src) && !src.some(Boolean)) return <div key={renderKey} {...props} style={style}>{children}</div>;
  const playing = audio.activeId === id;
  const keys = event => {
    if (event.target !== event.currentTarget || event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "keydown" && !event.repeat) audio.play(id, src);
  };
  return <div key={renderKey} {...props} role="group" aria-roledescription="sentence audio" tabIndex={0} data-listening={id} aria-label={label} onKeyDown={keys} onKeyUp={keys} onClick={event => {
    if (event.target.closest('input,select,textarea,button,[role="button"]')) return;
    event.stopPropagation();
    audio.play(id, src);
  }} style={{
    ...style,
    position: style?.position || "relative",
    borderRadius: style?.borderRadius || 6,
    boxShadow: playing ? "0 0 0 3px #2563eb" : style?.boxShadow,
    backgroundColor: playing ? "#dbeafe" : style?.backgroundColor
  }}>{children}{playing && renderExerciseSpeaker()}</div>;
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
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const HINT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  Qtype: "fixed" | "input"
//  hint: shown after Q input (like "(skateboard)")
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    Qtype: "fixed",
    question: "What did she have? (scarf)",
    correctA: ["She had a scarf.", "she had a scarf"],
    answerA: "She had a scarf.",
  },
  {
    id: 2,
    Qtype: "fixed",
    question: "What did he have? (car)",
    correctA: ["He had a car.", "he had a car"],
    answerA: "He had a car.",
  },
  {
    id: 3,
    Qtype: "input",
    hint: "(skateboard)",
    correctQ: ["What did they have?", "what did they have"],
    answerQ: "What did they have?",
    correctA: ["They had a skateboard.", "they had a skateboard"],
    answerA: "They had a skateboard.",
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => {
  const arr = [];
  if (item.Qtype === "input")
    arr.push({
      key: `${item.id}q`,
      correct: item.correctQ,
      answer: item.answerQ,
    });
  arr.push({
    key: `${item.id}a`,
    correct: item.correctA,
    answer: item.answerA,
  });
  return arr;
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = normalizeAnswer;

const isCorrect = (value, alternatives) =>
  alternatives.some((answer) => normalize(value) === normalize(answer));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteQA_QF() {
  const listening=useExerciseListening("sb_unit3_page6_q3");

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const [showAns, setShowAns] = useState(false);
  const checkDisabled =
    showAns || ALL_INPUTS.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    if (
      showAns ||
      results[key] === "correct" ||
      !ALL_INPUTS.some((item) => item.key === key)
    )
      return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (!ALL_INPUTS.every((item) => answers[item.key]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      ALL_INPUTS.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        isCorrect(answers[item.key] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (result) => result === "correct",
    ).length;
    setResults(next);
    setAnnouncement(
      `Score: ${score} out of ${ALL_INPUTS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ALL_INPUTS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ALL_INPUTS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ALL_INPUTS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ALL_INPUTS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ALL_INPUTS.forEach((inp) => {
      filled[inp.key] = inp.answer;
    });
    setAnswers(filled);
    setResults({});
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const getWrong = (key) => !showAns && results[key] === "wrong";
  const getDisabled = (key) => showAns || results[key] === "correct";

  const renderInput = (key, correctArr, flex = 1) => {
    const wrong = getWrong(key, correctArr);
    const value = answers[key] || "";
    const tColor = INPUT_TEXT_COLOR;
    const uColor = wrong
      ? INPUT_UNDERLINE_WRONG
      : getDisabled(key)
        ? "#16a34a"
        : INPUT_UNDERLINE_DEFAULT;
    const disabled = getDisabled(key);
    return (
      <div className="rwqf-input-wrap" style={{ flex }}>
        <input
          {...fieldKeys}
          aria-label={`Question ${key[0]}. Write the ${key.endsWith("q") ? "question" : "answer"}${ITEMS.find((item) => String(item.id) === key[0])?.question ? ": " + ITEMS.find((item) => String(item.id) === key[0]).question : " using the picture or hint"}.`}
          title={`Question ${key[0]}. Write the ${key.endsWith("q") ? "question" : "answer"}${ITEMS.find((item) => String(item.id) === key[0])?.question ? ": " + ITEMS.find((item) => String(item.id) === key[0]).question : " using the picture or hint"}.`}
          placeholder="Sentence"
          type="text"
          className={[
            "rwqf-input",
            wrong ? "rwqf-input--wrong" : "",
            showAns ? "rwqf-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwqf-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-listening-scope={"sb_unit3_page6_q3"} data-unit3-scope="Unit3_Page6_Q3" className="main-container-component"><style>{`[data-listening-scope="sb_unit3_page6_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <style>{`[data-unit3-scope="Unit3_Page6_Q3"] input:focus-visible, [data-unit3-scope="Unit3_Page6_Q3"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
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
        .rwqf-list {
     display: flex;
    flex-direction: column;
    gap: clamp(44px, 1.2vw, 46px);
    width: 100%;
    margin-top: 6%;
        }

        /* Single item */
        .rwqf-item {
     display: flex;
    flex-direction: column;
    gap: clamp(20px, 0.7vw, 20px);
        }

        /* Q line */
        .rwqf-q-line {
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          min-width: 0;
        }

        .rwqf-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqf-qfixed {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqf-hint {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${HINT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        /* A line — indented */
        .rwqf-a-line {
          padding-left: clamp(22px, 2.8vw, 34px);
        }

        /* Input wrap */
        .rwqf-input-wrap {
          position: relative;
          min-width: clamp(100px, 14vw, 260px);
        }

        .rwqf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwqf-input:disabled   { opacity: 1; cursor: default; }
        .rwqf-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwqf-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rwqf-badge {
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

        /* Buttons */
        .rwqf-buttons {
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
          sectionLetter="F"
          title={<>Read and write the question or answer.</>}
          subTitle={
            "Use the picture or grammar clue, say the full question and answer first, then type both before checking."
          }
        />

        {/* ── Items ── */}
        <div className="rwqf-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwqf-item">
              {/* Q line */}
              {renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipF1,clipF2,null][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"className":"rwqf-q-line",children:<>
                <span className="rwqf-num">{item.id}</span>
                {item.Qtype === "fixed" ? (
                  <span className="rwqf-qfixed">{item.question}</span>
                ) : (
                  <>
                    {renderInput(`${item.id}q`, item.correctQ)}
                    {item.hint && (
                      <span className="rwqf-hint">{renderExerciseAudioText({"audio":listening,"id":`hint-${item.id}`,"src":clipF3,"label":`Hear ${item.hint}`,children:<>{item.hint}</>})}</span>
                    )}
                  </>
                )}
              </>})}

              {/* A line */}
              <div className="rwqf-a-line">
                {renderInput(`${item.id}a`, item.correctA)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rwqf-buttons">
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
