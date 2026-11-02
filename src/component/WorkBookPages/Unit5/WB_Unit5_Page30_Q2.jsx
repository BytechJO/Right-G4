import clipPage30H12 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_012_Joey_would_read_a_story_from_a_book.mp3";
import clipPage30H11 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_011_Joey_and_Bow_would_run_under_bridges.mp3";
import clipPage30H10 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_010_They_would_watch_movies.mp3";
import clipPage30H9 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_009_They_walked_carefully_through_dark_tunnels.mp3";
import clipPage30H8 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_008_Joey_took_Bow_to_museums.mp3";
import clipPage30H7 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_007_Bow_liked_watching_Joey_fly_a_kite.mp3";
import clipPage30H6 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_006_Joey_and_Bow_would_sleep_under_trees.mp3";
import clipPage30H5 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_005_playing_together._At_night,_Joey_would_read_Bow_a_story_from_a_book._The.mp3";
import clipPage30H4 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_004_Joey_flew_a_kite_above_their_heads._Bow_and_Joey_would_sometimes_sleep_u.mp3";
import clipPage30H3 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_003_under_bridges_and_walk_carefully_through_dark_tunnels_while_Joey_carried.mp3";
import clipPage30H2 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_002_liked_to_sit_and_watch_movies_with_Joey._Bow_would_even_sit_on_a_seat_ju.mp3";
import clipPage30H1 from "../../../assets/audio/WorkBook/Unit 5/Page 30 - H/Item_001_Joey_had_a_brown_rabbit_called_Bow._Joey_and_Bow_did_everything_together.mp3";
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
const INPUT_BORDER_DEFAULT = "#2096a6";
const INPUT_BORDER_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const LABEL_COLOR = "#2b2b2b";
const SENTENCE_COLOR = "#2b2b2b";
const PARAGRAPH_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const PARAGRAPH = `Joey had a brown rabbit called Bow. Joey and Bow did everything together. He took Bow to museums. Bow liked to sit and watch movies with Joey. Bow would even sit on a seat just like Joey. Joey and Bow would run under bridges and walk carefully through dark tunnels while Joey carried a flashlight. Bow liked to watch as Joey flew a kite above their heads. Bow and Joey would sometimes sleep under trees when they got tired of playing together. At night, Joey would read Bow a story from a book. Then they would fall asleep together.`;

// Recording boundaries follow the starts named in Item_002 through Item_005.
const PARAGRAPH_PARTS = PARAGRAPH.split(/(?=liked to sit|under\s+bridges|Joey flew a|playing together)/);

const ITEMS = [
  {
    id: "a",
    sentence: "Joey and Bow would sleep under trees.",
    correct: ["7"],
    answer: "7",
  },
  {
    id: "b",
    sentence: "Bow liked watching Joey fly a kite.",
    correct: ["5"],
    answer: "5",
  },
  {
    id: "c",
    sentence: "Joey took Bow to museums.",
    correct: ["1"],
    answer: "1",
  },
  {
    id: "d",
    sentence: "They walked carefully through dark tunnels.",
    correct: ["4"],
    answer: "4",
  },
  {
    id: "e",
    sentence: "They would watch movies.",
    correct: ["2"],
    answer: "2",
  },
  {
    id: "f",
    sentence: "Joey and Bow would run under bridges.",
    correct: ["3"],
    answer: "3",
  },
  {
    id: "g",
    sentence: "Joey would read a story from a book.",
    correct: ["6"],
    answer: "6",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadNumber_QH() {
  const listening = useExerciseListening("wb_unit5_page30_q2");

  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({}),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const answerTargets = ITEMS.map((item) => ({
    key: item.id,
    correct: item.correct,
    answer: item.answer,
    label: `Event ${item.id}. Write its order number: ${item.sentence}`,
  }));
  const readAnswer = (key) => answers[key] || "";
  const checkDisabled =
    showAns || answerTargets.every((item) => results[item.key] === "correct");

  const handleChange = (key, value) => {
    const resultKey = "" + key;
    if (showAns || results[resultKey] === "correct") return;
    if (
      value !== "" &&
      Object.entries(answers).some(
        ([other, answer]) => other !== String(key) && answer === value,
      )
    ) {
      setAnnouncement("This number is already used. Choose another number.");
      return;
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[resultKey];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (!answerTargets.every((item) => readAnswer(item.key).trim())) {
      ValidationAlert.info("Please complete all answers first.");
      setAnnouncement("Please complete all answers first.");
      return;
    }
    const next = Object.fromEntries(
      answerTargets.map((item) => [
        item.key,
        results[item.key] === "correct" ||
        item.correct.some(
          (correct) =>
            normalizeAnswer(readAnswer(item.key)) === normalizeAnswer(correct),
        )
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter((v) => v === "correct").length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${answerTargets.length}. Correct answers are locked.`,
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    setAnnouncement("Correct answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
  };

  const handleReset = () => {
    listening.stop();
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (key) =>
    !showAns &&
    results[typeof key === "object" ? (key.key ?? key.id) : key] === "wrong";

  return (
    <div
      data-adapt-scope="Unit5_WB_Unit5_Page30_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit5_WB_Unit5_Page30_Q2"] input:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page30_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page30_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit5_WB_Unit5_Page30_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Paragraph ── */
        .ran-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARAGRAPH_COLOR};
          line-height: 1.7;
          text-indent: clamp(16px, 2vw, 26px);
          margin: 0;
        }

        /* ── Items list ── */
        .ran-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* ── Single row: input | label | sentence ── */
        .ran-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        /* Number input — square box */
        .ran-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .ran-input {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${INPUT_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${INPUT_TEXT_COLOR};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .ran-input:disabled        { opacity: 1; cursor: default; }
        .ran-input--wrong          { border-color: ${INPUT_BORDER_WRONG}; }
        .ran-input--answer         { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .ran-badge {
          position: absolute;
          top: -8px; right: -8px;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Label — a b c d... */
        .ran-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.6vw, 20px);
        }

        /* Sentence */
        .ran-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .ran-buttons {
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
          subTitle="Read one line at a time, then place the correct number beside the matching sentence or picture."
          sectionLetter="H"
          title={<>Read and number in the correct order.</>}
        />

        {/* ── Paragraph ── */}
        <p className="ran-para">{PARAGRAPH_PARTS.map((text,index)=>{const id=`paragraph-${index+1}`,playing=listening.activeId===id;return <span key={id} role="button" tabIndex={0} data-listening={id} {...activationKeys} aria-label={`Listen to paragraph part ${index+1}: ${text.trim().replace(/\s+/g," ")}`} onClick={()=>listening.play(id,[clipPage30H1,clipPage30H2,clipPage30H3,clipPage30H4,clipPage30H5][index])} style={{position:"relative",cursor:"pointer",borderRadius:6,backgroundColor:playing?"#dbeafe":undefined,boxShadow:playing?"0 0 0 3px #2563eb":undefined}}>{text}{playing&&renderExerciseSpeaker()}</span>;})}</p>

        {/* ── Items ── */}
        <div className="ran-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const bColor = wrong ? INPUT_BORDER_WRONG : INPUT_BORDER_DEFAULT;

            return (
              <div key={item.id} className="ran-row">
                {/* Number input */}
                <div className="ran-input-wrap">
                  <input
                    aria-invalid={results[item.id] === "wrong"}
                    // placeholder="Number"
                    title={
                      answerTargets.find((t) => t.key === item.id)?.label ||
                      "Complete this answer"
                    }
                    aria-label={
                      answerTargets.find((t) => t.key === item.id)?.label ||
                      "Complete this answer"
                    }
                    {...fieldKeys}
                    type="text"
                    maxLength={1}
                    className={[
                      "ran-input",
                      wrong ? "ran-input--wrong" : "",
                      showAns ? "ran-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={showAns || results[item.id] === "correct"}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{
                      ...((base) => ({
                        ...base,
                        borderBottomColor:
                          showAns || results[item.id] === "correct"
                            ? "#16a34a"
                            : results[item.id] === "wrong"
                              ? "#ef4444"
                              : base.borderBottomColor,
                      }))({ borderColor: bColor, color: tColor }),
                      borderColor:
                        showAns || results[item.id] === "correct"
                          ? "#16a34a"
                          : results[item.id] === "wrong"
                            ? "#ef4444"
                            : bColor,
                    }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="ran-badge">✕</div>}
                </div>

                {/* Label */}
                <span className="ran-label">{item.id}</span>

                {/* Sentence */}
                {renderExerciseAudioGroup({
                  audio: listening,
                  id: `sentence-${item.id}`,
                  src: [
                    clipPage30H6,
                    clipPage30H7,
                    clipPage30H8,
                    clipPage30H9,
                    clipPage30H10,
                    clipPage30H11,
                    clipPage30H12,
                  ][ITEMS.indexOf(item)],
                  label: item.sentence,
                  className: "ran-sentence",
                  style: undefined,
                  key: item.id,
                  children: <>{item.sentence}</>,
                })}
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="ran-buttons">
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
