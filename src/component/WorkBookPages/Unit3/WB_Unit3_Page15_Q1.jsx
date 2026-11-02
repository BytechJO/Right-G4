import clipPage15A11 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_011_We_had_a_fun.mp3";
import clipPage15A10 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_010_We_went_to_the_museum.mp3";
import clipPage15A9 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_009_wonderful.mp3";
import clipPage15A8 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_008_birthday.mp3";
import clipPage15A7 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_007_gifts.mp3";
import clipPage15A6 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_006_party.mp3";
import clipPage15A5 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_005_ate.mp3";
import clipPage15A4 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_004_delicious.mp3";
import clipPage15A3 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_003_on_the_table.mp3";
import clipPage15A2 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_002_There_are_many.mp3";
import clipPage15A1 from "../../../assets/audio/WorkBook/Unit 3/Page 15 - A/Item_001_The_muffins_are.mp3";
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

import img1 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 10.svg";
import img5 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 34.svg";
import img6 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 15/SVG/Asset 12.svg";
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
const SELECTED_CIRCLE_COLOR = "#2096a6";
const WRONG_CIRCLE_COLOR = "#ef4444";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const INPUT_ANSWER_COLOR = "#c81e1e";
const INPUT_UNDERLINE = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentenceBefore: "The muffins are",
    sentenceAfter: ".",
    imageSrc: img1,
    options: ["delicious", "ate", "party"],
    correct: "delicious",
  },
  {
    id: 2,
    sentenceBefore: "There are many",
    sentenceAfter: " on the table.",
    imageSrc: img2,
    options: ["gifts", "birthday", "wonderful"],
    correct: "gifts",
  },
  {
    id: 3,
    sentenceBefore: "We went to the museum",
    sentenceAfter: ".",
    imageSrc: img3,
    options: ["wonderful", "yesterday", "friends"],
    correct: "yesterday",
  },
  {
    id: 4,
    sentenceBefore: "We had a fun",
    sentenceAfter: ".",
    imageSrc: img4,
    options: ["party", "ate", "gifts"],
    correct: "party",
  },
  {
    id: 5,
    sentenceBefore: "She had a large",
    sentenceAfter: ".",
    imageSrc: img5,
    options: ["wonderful", "made", "family"],
    correct: "family",
  },
  {
    id: 6,
    sentenceBefore: "I had a",
    sentenceAfter: " time.",
    imageSrc: img6,
    options: ["gifts", "yesterday", "wonderful"],
    correct: "wonderful",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookCircleWrite_A() {
  const listening = useExerciseListening("wb_unit3_page15_q1");

  const [selected, setSelected] = useState({}); // { id: "optionValue" }
  const [written, setWritten] = useState({}); // { id: "typed text" }
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [selectionResults, setSelectionResults] = useState({}),
    [writeResults, setWriteResults] = useState({}),
    [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns ||
    ITEMS.every(
      (item) =>
        selectionResults[item.id] === "correct" &&
        writeResults[item.id] === "correct",
    );

  // ── handlers ──────────────────────────────
  const handleSelect = (id, option) => {
    listening.play(
      `option-${id}-${option}`,
      {
        delicious: clipPage15A4,
        ate: clipPage15A5,
        party: clipPage15A6,
        gifts: clipPage15A7,
        birthday: clipPage15A8,
        wonderful: clipPage15A9,
      }[option],
    );
    if (showAns || selectionResults[id] === "correct") return;
    setSelected((prev) => ({ ...prev, [id]: option }));
    setSelectionResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleWrite = (id, value) => {
    if (showAns || writeResults[id] === "correct") return;
    setWritten((prev) => ({ ...prev, [id]: value }));
    setWriteResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
    if (!ITEMS.every((item) => selected[item.id] && written[item.id]?.trim())) {
      ValidationAlert.info(
        "Please circle an answer and write it for all items first.",
      );
      return;
    }
    const sr = {},
      wr = {};
    let score = 0;
    ITEMS.forEach((item) => {
      sr[item.id] = selected[item.id] === item.correct ? "correct" : "wrong";
      wr[item.id] =
        normalizeAnswer(written[item.id]) === normalizeAnswer(item.correct)
          ? "correct"
          : "wrong";
      if (sr[item.id] === "correct" && wr[item.id] === "correct") score++;
    });
    setSelectionResults(sr);
    setWriteResults(wr);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct selections and written answers are locked independently.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    listening.stop();
    const sel = {},
      wri = {};
    ITEMS.forEach((item) => {
      sel[item.id] = item.correct;
      wri[item.id] = item.correct;
    });
    setSelected(sel);
    setWritten(wri);
    setShowResults(false);
    setShowAns(true);
    setSelectionResults({});
    setWriteResults({});
    setAnnouncement("Correct answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setWritten({});
    setShowResults(false);
    setShowAns(false);
    setSelectionResults({});
    setWriteResults({});
    setAnnouncement("Selections and answers cleared.");
  };

  // ── helpers ───────────────────────────────

  // ── render one card ───────────────────────
  const renderCard = (item) => {
    const writeValue = showAns ? item.correct : written[item.id] || "";
    const writeWrong = !showAns && writeResults[item.id] === "wrong";

    return (
      <div key={item.id} className="rlcw-card">
        {/* ── Number + Sentence + Blank — all in one line ── */}
        <div className="rlcw-sentence-line">
          <span className="rlcw-num">{item.id}</span>
          <span className="rlcw-sentence-text">
            {renderExerciseAudioText({
              audio: listening,
              id: `before-${item.id}`,
              src: {
                1: clipPage15A1,
                2: clipPage15A2,
                3: clipPage15A10,
                4: clipPage15A11,
              }[item.id],
              label: item.sentenceBefore,
              children: item.sentenceBefore,
            })}{" "}
          </span>
          <span className="rlcw-blank-wrap">
            <input
              {...fieldKeys}
              aria-label={`Question ${item.id}. Complete: ${item.sentenceBefore} blank ${item.sentenceAfter}`}
              title={`Question ${item.id}. Write the missing word.`}
              placeholder="Word"
              aria-invalid={writeWrong}
              style={{
                borderBottomColor:
                  showAns || writeResults[item.id] === "correct"
                    ? "#16a34a"
                    : writeWrong
                      ? "#ef4444"
                      : undefined,
              }}
              type="text"
              className={[
                "rlcw-blank",
                writeWrong ? "rlcw-blank--wrong" : "",
                showAns ? "rlcw-blank--answer" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              value={writeValue}
              disabled={showAns || writeResults[item.id] === "correct"}
              onChange={(e) => handleWrite(item.id, e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {writeWrong && <span className="rlcw-badge">✕</span>}
          </span>
          <span className="rlcw-sentence-text">
            {renderExerciseAudioText({
              audio: listening,
              id: `after-${item.id}`,
              src: item.id === 2 ? clipPage15A3 : null,
              label: item.sentenceAfter,
              children: item.sentenceAfter,
            })}
          </span>
        </div>

        {/* ── Image ── */}
        <div className="rlcw-img-wrap">
          <img
            src={item.imageSrc}
            alt={
              [
                "Muffins with candles on a table.",
                "Wrapped gifts on a table.",
                "Dinosaur models in a museum.",
                "Children at an outdoor party with balloons and a clown.",
                "A large family posing together.",
                "Four children smiling together.",
              ][item.id - 1]
            }
            className="rlcw-img"
          />
        </div>

        {/* ── Options ── */}
        <div className="rlcw-options">
          {item.options.map((opt, i) => {
            const isSelected = selected[item.id] === opt;
            const isWrongOpt =
              !showAns && isSelected && selectionResults[item.id] === "wrong";
            // const isCorrectOpt = showAns && opt === item.correct;
            // const circled = isSelected || isCorrectOpt;

            return (
              <div
                data-listening={`option-${item.id}-${opt}`}
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-label={`Question ${item.id}. ${opt}`}
                aria-pressed={isSelected}
                aria-disabled={
                  showAns || selectionResults[item.id] === "correct"
                }
                key={opt}
                className="rlcw-option-wrap"
                onClick={() => handleSelect(item.id, opt)}
                style={((base) => ({
                  ...base,
                  position: "relative",
                  background:
                    listening.activeId === `option-${item.id}-${opt}`
                      ? "#dbeafe"
                      : base.background,
                  boxShadow:
                    [
                      base.boxShadow,
                      listening.activeId === `option-${item.id}-${opt}`
                        ? "0 0 0 3px #2563eb"
                        : null,
                    ]
                      .filter(Boolean)
                      .join(", ") || undefined,
                }))({
                  cursor:
                    showAns || selectionResults[item.id] === "correct"
                      ? "default"
                      : "pointer",
                  borderRadius: 8,
                  background:
                    isSelected &&
                    !showAns &&
                    selectionResults[item.id] === undefined
                      ? "#dbeafe"
                      : undefined,
                  boxShadow: isSelected
                    ? `inset 0 0 0 2px ${showAns || selectionResults[item.id] === "correct" ? "#16a34a" : selectionResults[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                    : undefined,
                })}
              >
                <span className="rlcw-opt-letter">
                  {String.fromCharCode(97 + i)}
                </span>
                <span
                  style={{
                    // borderColor:
                    //   isSelected && (showAns || selectionResults[item.id])
                    //     ? showAns || selectionResults[item.id] === "correct"
                    //       ? "#16a34a"
                    //       : "#ef4444"
                    //     : undefined,
                  }}
                  className={[
                    "rlcw-opt-text",
                    // circled    ? "rlcw-opt--circled" : "",
                    // isWrongOpt ? "rlcw-opt--wrong"   : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {opt}
                </span>
                {isWrongOpt && <span className="rlcw-opt-badge">✕</span>}
                {listening.activeId === `option-${item.id}-${opt}` &&
                  renderExerciseSpeaker()}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── render ────────────────────────────────
  return (
    <div
      data-adapt-scope="Unit3_WB_Unit3_Page15_Q1"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit3_WB_Unit3_Page15_Q1"] input:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page15_Q1"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page15_Q1"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit3_WB_Unit3_Page15_Q1"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`

        /* ── 2-column grid ── */
        .rlcw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px) clamp(24px, 4vw, 56px);
          align-items: start;
        }
        @media (max-width: 580px) {
          .rlcw-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .rlcw-card {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
        }

        /* ── Sentence line: num + text + blank + suffix ── */
        .rlcw-sentence-line {
          display: flex;
          align-items: baseline;
          flex-wrap: no-wrap;
          gap: 4px;
          line-height: 1.5;
        }

        /* Number — على نفس السطر */
        .rlcw-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          margin-right: 4px;
        }

        .rlcw-sentence-text {
          font-size: clamp(20px, 1.9vw, 15px);
          color: #2b2b2b;
          white-space: pre;
        }

        /* ── Blank — يكتب فيه المستخدم ── */
        .rlcw-blank-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
        }
        .rlcw-blank {
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE};
          background: transparent;
          outline: none;
          font-size: clamp(15px, 1.9vw, 22px);
          color: #2b2b2b;
          text-align: center;
              width: 100px;
          transition: border-color 0.2s;
        }
        .rlcw-blank:disabled   { opacity: 1; cursor: default; }
        .rlcw-blank--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlcw-blank--answer    { color: ${INPUT_ANSWER_COLOR};}

        /* ✕ badge on blank */
        .rlcw-badge {
          position: absolute;
          top: -6px; right: -10px;
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
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

        /* ── Image ── */
        .rlcw-img-wrap {
          width: 60%;
          overflow: hidden;
        }
        .rlcw-img {
          width: 100%;
          height: clamp(140px, 18vw, 220px);
          display: block;
        }

        /* ── Options ── */
        .rlcw-options {
       display: grid;
    flex-direction: row;
    gap: clamp(4px, 0.6vw, 8px);
}
        }
        .rlcw-option-wrap {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          position: relative;
        }
        .rlcw-opt-letter {
          font-size: clamp(18px, 1.9vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          min-width: 16px;
        }
        .rlcw-opt-text {
          font-size: clamp(18px, 1.9vw, 18px);
          color: #2b2b2b;
          padding: clamp(2px, 0.3vw, 4px) clamp(8px, 1vw, 14px);
          border-radius: 999px;
          border: 2.5px solid transparent;
          transition: border-color 0.15s;
          user-select: none;
        }
        // .rlcw-opt--circled { border-color: ${SELECTED_CIRCLE_COLOR}; }
        // .rlcw-opt--wrong   { border-color: ${WRONG_CIRCLE_COLOR};    }

        /* ✕ badge on option */
        .rlcw-opt-badge {
          width: clamp(15px, 1.7vw, 20px);
          height: clamp(15px, 1.7vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }

        /* ── Buttons ── */
        .rlcw-buttons {
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
          subTitle="Read the clue, select the correct option, then write the completed answer before checking."
          sectionLetter="A"
          title={<>Read, look, and circle. Write.</>}
        />

        {/* ── Grid ── */}
        <div className="rlcw-grid">{ITEMS.map((item) => renderCard(item))}</div>

        {/* ── Buttons ── */}
        <div className="rlcw-buttons">
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
