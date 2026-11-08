import clipA5 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - A/Item_005_mall.mp3";
import clipA4 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - A/Item_004_New_York_City.mp3";
import clipA3 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - A/Item_003_Australia.mp3";
import clipA2 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - A/Item_002_Statue_of_Liberty.mp3";
import clipA1 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - A/Item_001_summer.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 10.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 12.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 13.svg";
import img5 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 14.svg";
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
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "summer",
  "Statue of Liberty",
  "Australia",
  "New York City",
  "mall",
];

const ITEMS = [
  { id: 1, src: img1, correct: ["summer"], answer: "summer" },
  { id: 2, src: img2, correct: ["mall"], answer: "mall" },
  { id: 3, src: img3, correct: ["Australia"], answer: "Australia" },
  { id: 4, src: img4, correct: ["New York City"], answer: "New York City" },
  {
    id: 5,
    src: img5,
    correct: ["Statue of Liberty"],
    answer: "Statue of Liberty",
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

export default function WB_ReadLookWrite_QA_5() {
  const listening=useExerciseListening("sb_unit2_page5_q1");

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
    <div data-listening-scope={"sb_unit2_page5_q1"} className="main-container-component" data-unit2-scope="Unit2_Page5_Q1"><style>{`[data-listening-scope="sb_unit2_page5_q1"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        [data-unit2-scope="Unit2_Page5_Q1"] input:focus-visible {
          outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
        }
      `}</style>
      <style>{`
        /* ── Word bank ── */
        .rlwa5-bank {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(8px, 1.2vw, 14px);
          justify-content: space-around;
          width: 100%;
              margin-bottom: 4%;

        }

        .rlwa5-pill {
          border: 2px solid #e8eff1;
          border-radius: 10px;
          padding: clamp(5px, 0.6vw, 8px) clamp(16px, 2.2vw, 16px);
          font-size: clamp(16px, 1.7vw, 16px);
          color: #2b2b2b;
          background: #e8eff1;
          white-space: nowrap;
          user-select: none;
        }

        /* ── 5-col grid ── */
        .rlwa5-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(30px, 1.2vw, 30px);
          width: 100%;
        }

        /* Single card */
        .rlwa5-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        /* num + img row */
        .rlwa5-img-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(3px, 0.4vw, 5px);
          width: 100%;
        }

        .rlwa5-num {
          font-size: clamp(13px, 1.5vw, 18px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }

        .rlwa5-img {
          flex: 1;
          width: 100%;
          height : auto ;
          object-fit: cover;
          display: block;
        }

        /* Input wrap */
        .rlwa5-input-wrap {
          position: relative;
          width: 100%;
          left : 15px ;
        }

        .rlwa5-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(12px, 1.4vw, 17px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: center;
    margin-top: 7%;

        }
        .rlwa5-input:disabled   { opacity: 1; cursor: default; }
        .rlwa5-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rlwa5-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        /* ✕ badge */
        .rlwa5-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
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

        /* Buttons */
        .rlwa5-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rlwa5-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 380px) {
          .rlwa5-grid { grid-template-columns: repeat(2, 1fr); }
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
          sectionLetter={"A"}
          title={"Read, look, and write. Use the words below."}
          subTitle={
            "Check the picture or sentence clue first, then choose the matching word and complete each blank before checking."
          }
        />
        <div
          style={{
            margin: "8% 0",
          }}
        >
          <div className="rlwa5-bank">
            {WORD_BANK.map((w) => (
              <div key={w} className="rlwa5-pill">
                {renderExerciseAudioText({"audio":listening,"id":`bank-${w}`,"src":[clipA1,clipA2,clipA3,clipA4,clipA5][WORD_BANK.indexOf(w)],"label":`Hear ${w}`,children:<>{w}</>})}
              </div>
            ))}
          </div>

          {/* ── 5 images ── */}
          <div className="rlwa5-grid">
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
                <div key={item.id} className="rlwa5-card">
                  <div className="rlwa5-img-row">
                    <span className="rlwa5-num">{item.id}</span>
                    <img
                      src={item.src}
                      alt={`img-${item.id}`}
                      className="rlwa5-img"
                    />
                  </div>
                  <div className="rlwa5-input-wrap">
                    <input
                      {...fieldKeys}
                      aria-label={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      title={`Question ${item.id}. ${item.prefix || item.before || "Write the word for the picture."}`}
                      placeholder="Word"
                      aria-invalid={wrong}
                      type="text"
                      className={[
                        "rlwa5-input",
                        wrong ? "rlwa5-input--wrong" : "",
                        showAns ? "rlwa5-input--answer" : "",
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
                    {wrong && <div className="rlwa5-badge">✕</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Buttons ── */}
          <div className="rlwa5-buttons">
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
    </div>
  );
}
