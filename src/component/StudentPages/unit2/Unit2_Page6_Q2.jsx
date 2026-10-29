import clipE6 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_006_go_to_the.mp3";
import clipE5 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_005_He's.mp3";
import clipE4 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_004_What_is_he.mp3";
import clipE3 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_003_go_to_the_playground.mp3";
import clipE2 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_002_They're.mp3";
import clipE1 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - E/Item_001_on_the_weekend.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 7.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 15/SVG/Asset 8.svg";
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
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    src: img1,
    Qparts: [
      {
        type: "input",
        key: "1q",
        correct: ["What are they going to do", "what are they going to do"],
        answer: "What are they going to do",
      },
      { type: "text", value: "on the weekend?" },
    ],
    Aparts: [
      { type: "text", value: "They're" },
      { type: "input", key: "1a", correct: ["going to"], answer: "going to" },
      { type: "text", value: "go to the playground." },
    ],
  },
  {
    id: 2,
    src: img2,
    Qparts: [
      { type: "text", value: "What is he" },
      {
        type: "input",
        key: "2q",
        correct: ["going to do on the weekend", "going to do on the weekend?"],
        answer: "going to do on the weekend",
      },
      { type: "text", value: "?" },
    ],
    Aparts: [
      { type: "text", value: "He's" },
      { type: "input", key: "2a1", correct: ["going to"], answer: "going to" },
      { type: "text", value: "go to the" },
      { type: "input", key: "2a2", correct: ["library"], answer: "library" },
      { type: "text", value: "." },
    ],
  },
  {
    id: 3,
    src: img3,
    Qparts: [
      {
        type: "input",
        key: "3q",
        correct: [
          "What are they going to do on the weekend",
          "What are they going to do on the weekend?",
        ],
        answer: "What are they going to do on the weekend",
      },
      { type: "text", value: "?" },
    ],
    Aparts: [
      {
        type: "input",
        key: "3a",
        correct: [
          "They're going to go to a farm",
          "Theyre going to go to a farm.",
          "They are going to go to a farm.",
        ],
        answer: "They're going to go to a farm",
      },
      { type: "text", value: "." },
    ],
  },
];

const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.Qparts.filter((p) => p.type === "input"),
  ...item.Aparts.filter((p) => p.type === "input"),
]);

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

export default function WB_ReadWrite_QE() {
  const listening=useExerciseListening("sb_unit2_page6_q2");

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ALL_INPUTS.every((inp) => results[inp.key] === "correct");

  const handleChange = (key, value) => {
    if (showAns) return;
    const inp = ALL_INPUTS.find((i) => i.key === key);
    if (!inp || results[key] === "correct") return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    const allAnswered = ALL_INPUTS.every((inp) => answers[inp.key]?.trim());
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ALL_INPUTS.forEach((inp) => {
      if (isCorrect(answers[inp.key] || "", inp.correct)) score++;
    });
    setResults(
      Object.fromEntries(
        ALL_INPUTS.map((inp) => [
          inp.key,
          results[inp.key] === "correct" ||
          isCorrect(answers[inp.key] || "", inp.correct)
            ? "correct"
            : "wrong",
        ]),
      ),
    );
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
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (inp) => !showAns && results[inp.key] === "wrong";
  const isDisabled = (inp) => showAns || results[inp.key] === "correct";

  const renderPart = (part, i) => {
    if (part.type === "text") {
      return (
        <span key={i} className="rwqe-text">
          {renderExerciseAudioText({"audio":listening,"id":`part-${part.value}`,"src":({"on the weekend?":clipE1,"They're":clipE2,"go to the playground.":clipE3,"What is he":clipE4,"He's":clipE5,"go to the":clipE6})[part.value],"label":`Hear ${part.value}`,children:<>{part.value}</>})}
        </span>
      );
    }
    const wrong = isWrong(part);
    const value = answers[part.key] || "";
    const tColor = INPUT_TEXT_COLOR;
    const uColor = wrong
      ? INPUT_UNDERLINE_WRONG
      : isDisabled(part)
        ? "#16a34a"
        : INPUT_UNDERLINE_DEFAULT;
    const disabled = isDisabled(part);
    return (
      <div key={part.key} className="rwqe-input-wrap">
        <input
          {...fieldKeys}
          aria-label={`Question ${part.key[0]}. ${part.key.includes("q") ? "Complete the question" : "Complete the answer"}, blank ${part.key.slice(2) || "1"}, beside the picture.`}
                      title={`Question ${part.key[0]}. ${part.key.includes("q") ? "Complete the question" : "Complete the answer"}, blank ${part.key.slice(2) || "1"}, beside the picture.`}
                      placeholder="Word(s)"
          aria-invalid={wrong}
          type="text"
          className={[
            "rwqe-input",
            wrong ? "rwqe-input--wrong" : "",
            showAns ? "rwqe-input--answer" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.key, e.target.value)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <div className="rwqe-badge">✕</div>}
      </div>
    );
  };

  return (
    <div data-listening-scope={"sb_unit2_page6_q2"} className="main-container-component" data-unit2-scope="Unit2_Page6_Q2"><style>{`[data-listening-scope="sb_unit2_page6_q2"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        [data-unit2-scope="Unit2_Page6_Q2"] input:focus-visible {
          outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
        }
      `}</style>
      <style>{`
        .rwqe-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.4vw, 30px);
          width: 100%;
        }

        .rwqe-row {
          display: grid;
          grid-template-columns: auto clamp(120px, 16vw, 200px) 1fr;
          gap: clamp(10px, 1.4vw, 18px);
          align-items: center;
        }

        .rwqe-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          align-self: flex-start;
          padding-top: 4px;
        }

        .rwqe-img {
          width: 100%;
          height: clamp(90px, 12vw, 150px);
          object-fit: cover;
          display: block;
          border-radius: 8px;
        }

        .rwqe-qa {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          min-width: 0;
        }

        .rwqe-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(3px, 0.4vw, 6px);
          min-width: 0;
        }

        .rwqe-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwqe-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(70px, 9vw, 150px);
        }

        .rwqe-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rwqe-input:disabled   { opacity: 1; cursor: default; }
        .rwqe-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }

        .rwqe-badge {
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

        .rwqe-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwqe-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rwqe-qa  { grid-column: 1 / -1; }
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
          sectionLetter={"E"}
          title={"Read and write. Use going to and verbs to be."}
          subTitle={
            "Use the picture and subject clue first, then complete each sentence with the correct going to form."
          }
        />
        <div className="rwqe-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwqe-row">
              <span className="rwqe-num">{item.id}</span>
              <img src={item.src} alt={`img-${item.id}`} className="rwqe-img" />
              <div className="rwqe-qa">
                <div className="rwqe-line">
                  {item.Qparts.map((p, i) => renderPart(p, i))}
                </div>
                <div className="rwqe-line">
                  {item.Aparts.map((p, i) => renderPart(p, i))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rwqe-buttons">
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
