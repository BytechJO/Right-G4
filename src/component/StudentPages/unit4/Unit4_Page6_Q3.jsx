import clipG18 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_018_lighter.mp3";
import clipG17 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_017_softer.mp3";
import clipG16 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_016_braver.mp3";
import clipG15 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_015_widest.mp3";
import clipG14 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_014_thinnest.mp3";
import clipG13 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_013_tallest.mp3";
import clipG12 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_012_harder.mp3";
import clipG11 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_011_fatter.mp3";
import clipG10 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_010_younger.mp3";
import clipG9 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_009_friendliest.mp3";
import clipG8 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_008_kindest.mp3";
import clipG7 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_007_tiniest.mp3";
import clipG6 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_006_healthier.mp3";
import clipG5 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_005_wider.mp3";
import clipG4 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_004_taller.mp3";
import clipG3 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_003_heaviest.mp3";
import clipG2 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_002_shortest.mp3";
import clipG1 from "../../../assets/audio/ClassBook/Unit 4/Page 33 - G/Item_001_smallest.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd5pg8-instruction1-adult-lady_YJxh5Hg5.mp3";

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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CIRCLE_COLOR = "#2096a6";
const CIRCLE_WRONG = "#ef4444";
const TEXT_DEFAULT = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  🔊  CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.26,
    end: 5.84,
    text: "Page eight, write activities, exercise C. Listen, read, and number.",
  },
  {
    start: 7.36,
    end: 10.48,
    text: "Tim will visit the new Museum of Inventions tomorrow.",
  },
  {
    start: 10.48,
    end: 13.52,
    text: "He will take his little brother and friend with him.",
  },
  {
    start: 13.52,
    end: 18.56,
    text: "They will take a bus at eight o'clock and arrive at the museum at nine o'clock.",
  },
  {
    start: 18.56,
    end: 21.92,
    text: "Tim will pack a lunch in case they get hungry.",
  },
  {
    start: 21.92,
    end: 28.0,
    text: "He will have to remember to take his camera with him so he can take pictures in the museum.",
  },
  {
    start: 28.0,
    end: 32.68,
    text: "Tim is certain they will have a lot of fun at the museum tomorrow.",
  },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, words: ["smallest", "shortest", "heaviest"], correct: "smallest" },
  { id: 2, words: ["taller", "wider", "healthier"], correct: "healthier" },
  { id: 3, words: ["tiniest", "kindest", "friendliest"], correct: "kindest" },
  { id: 4, words: ["younger", "fatter", "harder"], correct: "fatter" },
  { id: 5, words: ["tallest", "thinnest", "widest"], correct: "thinnest" },
  { id: 6, words: ["braver", "softer", "lighter"], correct: "braver" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ListenReadCircle_QG() {
  const listening=useExerciseListening("sb_unit4_page6_q3");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId, word) => {
    if (showAns || results[itemId] === "correct") return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === word ? null : word,
    }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setAnnouncement("Selection updated.");
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (
      !ITEMS.every(
        (item) =>
          selected[item.id] !== undefined &&
          selected[item.id] !== null &&
          selected[item.id] !== "",
      )
    ) {
      ValidationAlert.info("Please choose an answer for each question.");
      setAnnouncement("Please choose an answer for each question.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || selected[item.id] === item.correct
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
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  const getWordState = (item, word) => {
    const isSel = selected[item.id] === word;
    if (!isSel) return "none";
    if (showAns) return "correct";
    if (results[item.id] !== undefined)
      return item.correct === word ? "correct" : "wrong";
    return "selected";
  };

  // عمودين: فردي يسار، زوجي يمين
  const leftItems = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => (
    <div key={item.id} className="lrc-row">
      <span className="lrc-num">{item.id}</span>
      <div className="lrc-words">
        {item.words.map((word) => {
          const state = getWordState(item, word);
          return (
            <div data-listening={`word-${item.id}-${word}`}
              style={{
                ...{},
                borderRadius: {}.borderRadius || "6px",
                background:
                  selected[item.id] === word &&
                  !showAns &&
                  results[item.id] === undefined
                    ? "#dbeafe"
                    : {}.background,
                position:"relative",boxShadow:listening.activeId===(`word-${item.id}-${word}`)?"0 0 0 3px #2563eb":selected[item.id] === word
                    ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                    : undefined,backgroundColor:listening.activeId===(`word-${item.id}-${word}`)?"#dbeafe":undefined}}
              role="button"
              tabIndex={0}
              data-keyboard-choice
              {...activationKeys}
              aria-label={`Question ${item.id}. ${word}`}
              aria-pressed={selected[item.id] === word}
              aria-disabled={showAns || results[item.id] === "correct"}
              key={word}
              className={[
                "lrc-word-wrap",
                isLocked ? "lrc-word-wrap--locked" : "",
                state === "selected" ? "lrc-word-wrap--selected" : "",
                state === "correct" ? "lrc-word-wrap--correct" : "",
                state === "wrong" ? "lrc-word-wrap--wrong" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={event=>{listening.play(`word-${item.id}-${word}`,[clipG1,clipG2,clipG3,clipG4,clipG5,clipG6,clipG7,clipG8,clipG9,clipG10,clipG11,clipG12,clipG13,clipG14,clipG15,clipG16,clipG17,clipG18][(item.id-1)*3+item.words.indexOf(word)]);return (() => handleSelect(item.id, word))(event);}}
            >
              <div className="lrc-oval" />
              <span className="lrc-word">{word}</span>
              {state === "wrong" && <div className="lrc-badge">✕</div>}
            {listening.activeId===(`word-${item.id}-${word}`)&&renderExerciseSpeaker()}</div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div data-listening-scope={"sb_unit4_page6_q3"}
      data-adapt-scope="unit4_Unit4_Page6_Q3"
      className="main-container-component"
    ><style>{`[data-listening-scope="sb_unit4_page6_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <style>{`[data-adapt-scope="unit4_Unit4_Page6_Q3"] input:focus-visible, [data-adapt-scope="unit4_Unit4_Page6_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_Unit4_Page6_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Grid عمودين ── */
        .lrc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 24px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف واحد ── */
        .lrc-row {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 14px);
        }

        .lrc-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        /* الكلمات في صف أفقي */
        .lrc-words {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(4px, 0.6vw, 8px);
          flex-wrap: nowrap;
        }

        /* كلمة واحدة */
        .lrc-word-wrap {
          position: relative;
          display: inline-block;
          padding: clamp(3px, 0.4vw, 5px) clamp(8px, 1.2vw, 14px);
          cursor: pointer;
          user-select: none;
        }
        .lrc-word-wrap--locked { cursor: default; }

        /* الدائرة البيضاوية */
        .lrc-oval {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.15s;
        }

        .lrc-word-wrap--selected .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--correct  .lrc-oval { border-color: ${CIRCLE_COLOR}; }
        .lrc-word-wrap--wrong    .lrc-oval { border-color: ${CIRCLE_WRONG}; }

        .lrc-word {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${TEXT_DEFAULT};
          line-height: 1.4;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        /* ✕ badge */
        .lrc-badge {
          position: absolute;
          top: -7px; right: -7px;
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

        .lrc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
        }

        @media (max-width: 560px) {
          .lrc-grid { grid-template-columns: 1fr; }
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
          sectionLetter="G"
          title={<>Listen, read, and circle.</>}
          subTitle={"Listen once, replay if needed, then select the option that matches what you hear and read."}
        />
        <div style={{ margin: "2% 0" }}>
          {/* ── Audio ── */}
          <div style={{ margin: "3em 0" }}>
            <QuestionAudioPlayer
              pageId="sb_unit4_page6_q3"
              src={sound}
              captions={captions}
              stopAtSecond={6}
            />
          </div>

          {/* ── Grid ── */}
          <div className="lrc-grid">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(35px, 2vw, 35px)",
              }}
            >
              {leftItems.map(renderItem)}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(35px, 2vw, 35px)",
              }}
            >
              {rightItems.map(renderItem)}
            </div>
          </div>
        </div>
        {/* ── Buttons ── */}
        <div className="lrc-buttons">
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
