import missingNew0 from "../../../assets/audio/G4-Missing/They watched a movie..mp3";
import missingNew1 from "../../../assets/audio/G4-Missing/I played the violin..mp3";
import clipPage50L4 from "../../../assets/audio/WorkBook/Unit 8/Page 50 - L/Item_004_He_cooked_food.mp3";
import clipPage50L3 from "../../../assets/audio/WorkBook/Unit 8/Page 50 - L/Item_003_He_listened_to_the_radio.mp3";
import clipPage50L2 from "../../../assets/audio/WorkBook/Unit 8/Page 50 - L/Item_002_They_played_in_the_snow.mp3";
import clipPage50L1 from "../../../assets/audio/WorkBook/Unit 8/Page 50 - L/Item_001_She_watered_the_flowers.mp3";
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
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 47.svg";
import img1b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 48.svg";
import img2a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 61.svg";
import img2b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 54.svg";
import img3a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 50.svg";
import img3b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 49.svg";
import img4a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 55.svg";
import img4b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 59.svg";
import img5a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 51.svg";
import img5b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 52.svg";
import img6a from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 60.svg";
import img6b from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U8 Folder/Page 50/SVG/Asset 58.svg";
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
const CHECK_COLOR = "#e53935";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const IMG_BORDER = "#d0d0d0";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentence: "She watered the flowers.",
    imgA: img1a,
    imgB: img1b,
    correctSide: "a",
  },
  {
    id: 2,
    sentence: "They played in the snow.",
    imgA: img2a,
    imgB: img2b,
    correctSide: "b",
  },
  {
    id: 3,
    sentence: "He listened to the radio.",
    imgA: img3a,
    imgB: img3b,
    correctSide: "b",
  },
  {
    id: 4,
    sentence: "He cooked food.",
    imgA: img4a,
    imgB: img4b,
    correctSide: "b",
  },
  {
    id: 5,
    sentence: "They watched a movie.",
    imgA: img5a,
    imgB: img5b,
    correctSide: "a",
  },
  {
    id: 6,
    sentence: "I played the violin.",
    imgA: img6a,
    imgB: img6b,
    correctSide: "b",
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadLookWriteCheck_QL() {
  const listening = useExerciseListening("wb_unit8_page50_q2");

  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (itemId, side) => {
    if (showAns || results[itemId] === "correct") return;
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === side ? null : side,
    }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
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
        results[item.id] === "correct" || selected[item.id] === item.correctSide
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correctSide;
    });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    listening.stop();
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  const getBoxState = (item, side) => {
    if (selected[item.id] !== side) return "none";
    if (showAns || results[item.id] === "correct") return "correct";
    return results[item.id] === "wrong" ? "wrong" : "selected";
  };

  const getCheckmark = (state) => {
    if (state === "none") return null;
    if (state === "wrong") return "✕";
    return "✓";
  };

  return (
    <div
      data-adapt-scope="Unit8_WB_Unit8_Page50_Q2"
      className="main-container-component"
    >
      <span className="sr-only" role="status" aria-live="polite">
        {listening.error}
      </span>
      <style>{`[data-adapt-scope="Unit8_WB_Unit8_Page50_Q2"] input:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page50_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page50_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit8_WB_Unit8_Page50_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
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
        .rlwc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.4vw, 30px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── Single card ── */
        .rlwc-card {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vw, 10px);
          min-width: 0;
        }

        /* Number + sentence */
        .rlwc-sentence-row {
          display: flex;
          align-items: center;
          gap: clamp(5px, 0.7vw, 8px);
        }

        .rlwc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
        }

        .rlwc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.4;
        }

        /* Two images side by side */
        .rlwc-imgs {
          display: flex;
          gap: clamp(4px, 0.6vw, 8px);
        }

        .rlwc-img-wrap {
          position: relative;
          flex: 1;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .rlwc-img-wrap--locked { cursor: default; }

        .rlwc-img {
        height : auto ; 
          width: 100%;
          display: block;
        }

        /* Checkbox top right */
        .rlwc-checkbox {
          position: absolute;
          top: 0; right: 0;
          width: clamp(22px, 2.8vw, 32px);
          height: clamp(22px, 2.8vw, 32px);
          border: 2px solid #2096a6;
          border-radius: 0 6px 0 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.6vw, 18px);
          font-weight: 700;
          color: #2b2b2b;
          line-height: 1;
        }

        .rlwc-checkbox--selected { color: ${CHECK_COLOR}; }
        .rlwc-checkbox--correct  { border-color: ${CHECK_COLOR}; color: ${CHECK_COLOR}; }
        .rlwc-checkbox--wrong    { border-color: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_BG}; }

        /* ✕ badge */
        .rlwc-badge {
          position: absolute;
          top: 25px; right: 25px;
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
          z-index: 3;
        }

        /* Buttons */
        .rlwc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rlwc-grid { grid-template-columns: 1fr; }
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
          subTitle="Check the picture or text clue carefully, then choose the correct two-way answer for each item."
          sectionLetter="L"
          title={
            <>
              Read, look, and write{" "}
              <span style={{ color: "#ff0000ff" }}>✓</span>.
            </>
          }
        />

        {/* ── Grid ── */}
        <div className="rlwc-grid">
          {ITEMS.map((item) => {
            const stateA = getBoxState(item, "a");
            const stateB = getBoxState(item, "b");

            return (
              <div key={item.id} className="rlwc-card">
                {/* Sentence */}
                {renderExerciseAudioGroup({
                  audio: listening,
                  id: `sentence-${item.id}`,
                  src: [
                    clipPage50L1,
                    clipPage50L2,
                    clipPage50L3,
                    clipPage50L4,
                    missingNew0,
                    missingNew1,
                  ][item.id - 1],
                  label: item.id + ". " + item.sentence,
                  className: "rlwc-sentence-row",
                  style: undefined,
                  key: item.id,
                  children: (
                    <>
                      <span className="rlwc-num">{item.id}</span>
                      <span className="rlwc-sentence">{item.sentence}</span>
                    </>
                  ),
                })}

                {/* Two images */}
                <div className="rlwc-imgs">
                  {/* Image A */}
                  <div
                    style={{
                      ...{
                        ...{},
                        borderRadius: {}.borderRadius || "6px",
                        background:
                          selected[item.id] === "a" &&
                          !showAns &&
                          results[item.id] === undefined
                            ? "#dbeafe"
                            : {}.background,
                        boxShadow:
                          selected[item.id] === "a"
                            ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                            : undefined,
                      },
                      boxShadow:
                        selected[item.id] === "a"
                          ? `0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                          : undefined,
                      cursor:
                        showAns || results[item.id] === "correct"
                          ? "default"
                          : "pointer",
                    }}
                    role="button"
                    tabIndex={0}
                    data-keyboard-choice
                    {...activationKeys}
                    aria-label={`Sentence ${item.id}. ${item.sentence} Choose picture A: ${["A girl watering flowers.", "Two boys playing soccer.", "A man reading a newspaper.", "Children playing a video game.", "People watching a car race.", "Children playing drums."][item.id - 1]}`}
                    aria-pressed={selected[item.id] === "a"}
                    aria-disabled={showAns || results[item.id] === "correct"}
                    className={`rlwc-img-wrap${isLocked ? " rlwc-img-wrap--locked" : ""}`}
                    onClick={() => handleSelect(item.id, "a")}
                  >
                    <img
                      src={item.imgA}
                      alt={
                        [
                          "A girl watering flowers.",
                          "Two boys playing soccer.",
                          "A man reading a newspaper.",
                          "Children playing a video game.",
                          "People watching a car race.",
                          "Children playing drums.",
                        ][item.id - 1]
                      }
                      className="rlwc-img"
                    />
                    <div
                      className={[
                        "rlwc-checkbox",
                        stateA === "selected" ? "rlwc-checkbox--selected" : "",
                        stateA === "correct" ? "rlwc-checkbox--correct" : "",
                        stateA === "wrong" ? "rlwc-checkbox--wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {getCheckmark(stateA)}
                      {stateA === "wrong" && (
                        <div className="rlwc-badge">✕</div>
                      )}
                    </div>
                  </div>

                  {/* Image B */}
                  <div
                    style={{
                      ...{
                        ...{},
                        borderRadius: {}.borderRadius || "6px",
                        background:
                          selected[item.id] === "b" &&
                          !showAns &&
                          results[item.id] === undefined
                            ? "#dbeafe"
                            : {}.background,
                        boxShadow:
                          selected[item.id] === "b"
                            ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                            : undefined,
                      },
                      boxShadow:
                        selected[item.id] === "b"
                          ? `0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                          : undefined,
                      cursor:
                        showAns || results[item.id] === "correct"
                          ? "default"
                          : "pointer",
                    }}
                    role="button"
                    tabIndex={0}
                    data-keyboard-choice
                    {...activationKeys}
                    aria-label={`Sentence ${item.id}. ${item.sentence} Choose picture B: ${["A woman ironing clothes.", "Children playing in the snow.", "A man listening to a radio.", "A chef stirring food in a pot.", "Boys in a clothes shop.", "A boy playing a violin."][item.id - 1]}`}
                    aria-pressed={selected[item.id] === "b"}
                    aria-disabled={showAns || results[item.id] === "correct"}
                    className={`rlwc-img-wrap${isLocked ? " rlwc-img-wrap--locked" : ""}`}
                    onClick={() => handleSelect(item.id, "b")}
                  >
                    <img
                      src={item.imgB}
                      alt={
                        [
                          "A woman ironing clothes.",
                          "Children playing in the snow.",
                          "A man listening to a radio.",
                          "A chef stirring food in a pot.",
                          "Boys in a clothes shop.",
                          "A boy playing a violin.",
                        ][item.id - 1]
                      }
                      className="rlwc-img"
                    />
                    <div
                      className={[
                        "rlwc-checkbox",
                        stateB === "selected" ? "rlwc-checkbox--selected" : "",
                        stateB === "correct" ? "rlwc-checkbox--correct" : "",
                        stateB === "wrong" ? "rlwc-checkbox--wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {getCheckmark(stateB)}
                      {stateB === "wrong" && (
                        <div className="rlwc-badge">✕</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rlwc-buttons">
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
