import clipD8 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_008_I'm_going_to.mp3";
import clipD7 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_007_They're_going_to.mp3";
import clipD6 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_006_He's_going_to.mp3";
import clipD5 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_005_Stella_is_going_to.mp3";
import clipD4 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_004_Russia.mp3";
import clipD3 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_003_United_Kingdom.mp3";
import clipD2 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_002_Japan.mp3";
import clipD1 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - D/Item_001_Australia.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgJapan from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 15.svg";
import imgRussia from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 16.svg";
import imgUK from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 17.svg";
import imgAus from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 18.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd11pg15-instruction1-adult-lady_e6nQ5x9d.mp3";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const TEXT_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = ["Australia", "Japan", "United Kingdom", "Russia"];

const ITEMS = [
  {
    id: 1,
    prefix: "Stella is going to...",
    src: imgJapan,
    correct: ["Japan"],
    answer: "Japan",
  },
  {
    id: 2,
    prefix: "He's going to...",
    src: imgRussia,
    correct: ["Russia"],
    answer: "Russia",
  },
  {
    id: 3,
    prefix: "They're going to...",
    src: imgUK,
    correct: ["United Kingdom"],
    answer: "United Kingdom",
  },
  {
    id: 4,
    prefix: "I'm going to...",
    src: imgAus,
    correct: ["Australia"],
    answer: "Australia",
  },
];

const captions = [
  {
    start: 0.62,
    end: 3.28,
    text: "Page 15, write activities.",
  },
  {
    start: 3.28,
    end: 7.58,
    text: "Exercise D, listen, read, and write.",
  },
  {
    start: 8.88,
    end: 10.78,
    text: "Stella is going to Japan.",
  },
  {
    start: 10.78,
    end: 12.82,
    text: "He's going to Russia.",
  },
  {
    start: 13.86,
    end: 16.06,
    text: "They're going to England.",
  },
  {
    start: 16.06,
    end: 18.38,
    text: "Four. I'm going to France.",
  },
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

export default function WB_ListenReadWrite_QD() {
  const listening=useExerciseListening("sb_unit2_page6_q1");

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (!item || results[id] === "correct") return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    setResults(
      Object.fromEntries(
        ITEMS.map((item) => [
          item.id,
          results[item.id] === "correct" ||
          isCorrect(answers[item.id] || "", item.correct)
            ? "correct"
            : "wrong",
        ]),
      ),
    );
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setResults({});
    setShowAns(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  const isDisabled = (item) => showAns || results[item.id] === "correct";

  return (
    <div data-listening-scope={"sb_unit2_page6_q1"} className="main-container-component" data-unit2-scope="Unit2_Page6_Q1"><style>{`[data-listening-scope="sb_unit2_page6_q1"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        [data-unit2-scope="Unit2_Page6_Q1"] input:focus-visible {
          outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
        }
      `}</style>
      <style>{`
        /* ── Word bank ── */
        .lrwd-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: space-between;
          width: 80%;
        }

        .lrwd-pill {
          border: 2px solid #e8eff1;
          border-radius: 8px;
          padding: clamp(4px, 0.5vw, 6px) clamp(14px, 2vw, 22px);
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 2×2 grid ── */
        .lrwd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* Single card: num+prefix | image | input */
        .lrwd-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
        }

        /* Prefix row */
        .lrwd-prefix-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        .lrwd-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwd-prefix {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Image */
        .lrwd-img {
          width: 60%;
          height : auto ;
          object-fit: cover;
          display: block;
        }

        /* Input wrap */
        .lrwd-input-wrap {
          position: relative;
          width: 100%;
        }

        .lrwd-input {
    width: 60%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lrwd-input:disabled   { opacity: 1; cursor: default; }
        .lrwd-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .lrwd-badge {
          position: absolute;
          top: -8px;     right: 5em;

          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .lrwd-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .lrwd-grid { grid-template-columns: 1fr; }
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
          sectionLetter={"D"}
          title={"Listen, read, and write."}
          subTitle={
            "Listen to the full item first, replay any part you need, then write or complete the answer using the text and picture clues."
          }
        />
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit2_page15_q1"
            src={sound}
            captions={captions}
            stopAtSecond={7.7}
          />
        </div>
        {/* ── Word bank ── */}
        <div className="lrwd-bank">
          {WORD_BANK.map((w) => (
            <div key={w} className="lrwd-pill">
              {renderExerciseAudioText({"audio":listening,"id":`bank-${w}`,"src":[clipD1,clipD2,clipD3,clipD4][WORD_BANK.indexOf(w)],"label":`Hear ${w}`,children:<>{w}</>})}
            </div>
          ))}
        </div>

        {/* ── 2×2 grid ── */}
        <div className="lrwd-grid">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = INPUT_TEXT_COLOR;
            const uColor = wrong
              ? INPUT_UNDERLINE_WRONG
              : isDisabled(item)
                ? "#16a34a"
                : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="lrwd-card">
                {/* Prefix */}
                <div className="lrwd-prefix-row">
                  <span className="lrwd-num">{item.id}</span>
                  <span className="lrwd-prefix">{renderExerciseAudioText({"audio":listening,"id":`prefix-${item.id}`,"src":[clipD5,clipD6,clipD7,clipD8][item.id-1],"label":`Hear ${item.prefix}`,children:<>{item.prefix}</>})}</span>
                </div>

                {/* Image */}
                <img
                  src={item.src}
                  alt={`img-${item.id}`}
                  className="lrwd-img"
                />

                {/* Input */}
                <div className="lrwd-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      title={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      placeholder="Answer"
                    aria-invalid={wrong}
                    type="text"
                    className={[
                      "lrwd-input",
                      wrong ? "lrwd-input--wrong" : "",
                      showAns ? "lrwd-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="lrwd-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrwd-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              onClick={handleReset}
              {...activationKeys}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              onClick={handleShowAnswer}
              {...activationKeys}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              onClick={handleCheck}
              {...activationKeys}
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
