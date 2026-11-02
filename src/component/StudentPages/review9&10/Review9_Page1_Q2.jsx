import clipPage88B6 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_006_What's_up.mp3";
import clipPage88B5 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_005_Oh,_well.mp3";
import clipPage88B4 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_004_Can_you_come_to_my_sorry.mp3";
import clipPage88B3 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_003_I'm_really_problem.mp3";
import clipPage88B2 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_002_Thanks_anyway.mp3";
import clipPage88B1 from "../../../assets/audio/ClassBook/Unit 10/Page 88 - B/Item_001_No_up.mp3";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const BOX_BORDER_DEF = "#2096a6";
const BOX_BORDER_SEL = "#2096a6";
const BOX_BG_SEL = "#f0f9ff";
const CHECK_COLOR = "#c81e1e";
const CROSS_COLOR = "#c81e1e";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "No up.", correct: "cross" },
  { id: 2, text: "Thanks anyway.", correct: "check" },
  { id: 3, text: "I'm really problem.", correct: "cross" },
  { id: 4, text: "Can you come to my sorry?", correct: "cross" },
  { id: 5, text: "Oh, well.", correct: "check" },
  { id: 6, text: "What's up?", correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteCheckCross_QB() {
  const listening = useExerciseListening("sb_review9_page1_q2");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id, value) => {
    if (showAns || results[id] === "correct") return;
    setSelected((prev) => ({
      ...prev,
      [id]: prev[id] === value ? null : value,
    }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnnouncement("Selection updated.");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    listening.stop();
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

  const handleShowAnswer = () => {
    listening.stop();
    setSelected(
      Object.fromEntries(ITEMS.map((item) => [item.id, item.correct])),
    );
    setResults({});
    setShowResults(false);
    setShowAns(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setResults({});
    setShowResults(false);
    setShowAns(false);
    setAnnouncement("Selections cleared.");
  };

  // ── Box state ──
  // isWrong = الطالب اختار هاي الخانة وهي غلط
  const isBoxWrong = (item, boxType) =>
    !showAns && results[item.id] === "wrong" && selected[item.id] === boxType;

  const isBoxSelected = (item, boxType) => selected[item.id] === boxType;

  const renderBox = (item, boxType) => {
    const symbol = boxType === "check" ? "✓" : "✕";
    const symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;
    const isSel = isBoxSelected(item, boxType);
    const isWrong = isBoxWrong(item, boxType);

    let bd = BOX_BORDER_DEF;
    let bg = "#ffffff";
    if (isSel) {
      bd =
        showAns || results[item.id] === "correct"
          ? "#16a34a"
          : isWrong
            ? "#ef4444"
            : BOX_BORDER_SEL;
      bg = results[item.id] === undefined && !showAns ? "#dbeafe" : "#ffffff";
    }
    // wrong: no border change — only badge

    return (
      <div
        role="button"
        tabIndex={0}
        data-keyboard-choice
        {...activationKeys}
        aria-label={`Question ${item.id}. ${boxType}`}
        aria-pressed={selected[item.id] === boxType}
        aria-disabled={showAns || results[item.id] === "correct"}
        style={{
          ...{
            position: "relative",
            width: "clamp(40px,3.8vw,40px)",
            height: "clamp(40px,3.8vw,40px)",
            borderRadius: "8px",
            border: `2px solid ${bd}`,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isLocked ? "default" : "pointer",
            flexShrink: 0,
            userSelect: "none",
            transition: "border-color 0.15s, background 0.15s",
          },
          borderRadius:
            {
              position: "relative",
              width: "clamp(40px,3.8vw,40px)",
              height: "clamp(40px,3.8vw,40px)",
              borderRadius: "8px",
              border: `2px solid ${bd}`,
              background: bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isLocked ? "default" : "pointer",
              flexShrink: 0,
              userSelect: "none",
              transition: "border-color 0.15s, background 0.15s",
            }.borderRadius || "6px",
          background:
            selected[item.id] === boxType &&
            !showAns &&
            results[item.id] === undefined
              ? "#dbeafe"
              : {
                  position: "relative",
                  width: "clamp(40px,3.8vw,40px)",
                  height: "clamp(40px,3.8vw,40px)",
                  borderRadius: "8px",
                  border: `2px solid ${bd}`,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isLocked ? "default" : "pointer",
                  flexShrink: 0,
                  userSelect: "none",
                  transition: "border-color 0.15s, background 0.15s",
                }.background,
          boxShadow:
            selected[item.id] === boxType
              ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
              : undefined,
        }}
        onClick={() => handleSelect(item.id, boxType)}
      >
        {isSel && (
          <span
            style={{
              fontSize: "clamp(16px,2.2vw,26px)",
              fontWeight: 900,
              color: symColor,
              lineHeight: 1,
            }}
          >
            {symbol}
          </span>
        )}
        {/* ✕ badge فقط لو غلط */}
        {isWrong && (
          <div
            style={{
              position: "absolute",
              top: -7,
              right: -7,
              width: "clamp(14px,1.6vw,18px)",
              height: "clamp(14px,1.6vw,18px)",
              borderRadius: "50%",
              background: WRONG_BADGE_BG,
              color: WRONG_BADGE_TEXT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(7px,0.8vw,10px)",
              fontWeight: 700,
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="review9&10_Review9_Page1_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="review9&10_Review9_Page1_Q2"] input:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="review9&10_Review9_Page1_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="review9&10_Review9_Page1_Q2"] [data-grid-cell]:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="review9&10_Review9_Page1_Q2"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── 3×2 grid ── */
        .rwcc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(14px, 4vw, 55px) clamp(16px, 2.4vw, 36px);
          width: 100%;
          margin : 14% 0 ;
        }

        /* Single item: num | text | ✓box | ✕box */
        .rwcc-item {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 12px);
        }

        .rwcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .rwcc-text {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
              white-space: nowrap;

        }

        .rwcc-boxes {
          display: flex;
          gap: clamp(4px, 0.5vw, 7px);
          flex-shrink: 0;
        }

        .rwcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .rwcc-grid { grid-template-columns: 1fr; }
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
          subTitle="Read each statement and compare it with the picture or clue, then choose the correct two-way answer."
          isReview
          sectionLetter="B"
          title={
            <>
              Read and write
              <span style={{ color: CHECK_COLOR, fontWeight: 900 }}> ✓ </span>
              and
              <span style={{ color: CROSS_COLOR, fontWeight: 900 }}> X </span>.
            </>
          }
        />

        {/* ── 3×2 Grid ── */}
        <div className="rwcc-grid">
          {ITEMS.map((item) =>
            renderExerciseAudioGroup({
              audio: listening,
              id: `sentence-${item.id}`,
              src: [
                clipPage88B1,
                clipPage88B2,
                clipPage88B3,
                clipPage88B4,
                clipPage88B5,
                clipPage88B6,
              ][item.id - 1],
              label: item.text,
              className: "rwcc-item",
              style: undefined,
              key: item.id,
              children: (
                <>
                  <span className="rwcc-num">{item.id}</span>
                  <span className="rwcc-text">{item.text}</span>
                  <div className="rwcc-boxes">
                    {renderBox(item, "check")}
                    {renderBox(item, "cross")}
                  </div>
                </>
              ),
            }),
          )}
        </div>

        {/* ── Buttons ── */}
        <div className="rwcc-buttons">
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
