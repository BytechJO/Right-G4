import clipC9 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_009_He_is_going_to_take_a_tour_of_London_in_a_double-decker_bus.mp3";
import clipC8 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_008_He_isn't_going_to_visit_Buckingham_Palace.mp3";
import clipC7 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_007_Darren_is_going_to_take_a_tour_of_the_English_countryside.mp3";
import clipC6 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_006_is_going_to_visit_the_Clock_Tower.mp3";
import clipC5 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_005_He_is_going_to_take_a_tour_of_London_in_a_double-decker_bus._Lastly,_he.mp3";
import clipC4 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_004_make_sure_to_take_his_camera_with_him,_so_he_can_take_lots_of_pictures.mp3";
import clipC3 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_003_countryside_first._Next,_he_is_going_to_see_Buckingham_Palace._He_will.mp3";
import clipC2 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_002_visit_many_places_while_he's_there._He_plans_to_take_a_tour_of_the_Engli.mp3";
import clipC1 from "../../../assets/audio/ClassBook/Unit 2/Page 14 - C/Item_001_Darren_is_going_to_the_United_Kingdom_for_the_summer._He_hopes_to.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd10pg14-instruction1-adult-lady_8RPyYe6a.mp3";
// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 14/SVG/Asset 77.svg";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────


// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CHECK_COLOR = "#e53935";
const CROSS_COLOR = "#e53935";
const BOX_BORDER = "#2195a6";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const PARA_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Darren is going to the United Kingdom for the summer. He hopes to visit many places while he's there. He plans to take a tour of the English countryside first. Next, he is going to see Buckingham Palace. He will make sure to take his camera with him, so he can take lots of pictures. He is going to take a tour of London in a double-decker bus. Lastly, he is going to visit the Clock Tower.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correctBox: "check" | "cross"
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentence: "Darren is going to take a tour of the English countryside.",
    correctBox: "check",
  },
  {
    id: 2,
    sentence: "He isn't going to visit Buckingham Palace.",
    correctBox: "cross",
  },
  {
    id: 3,
    sentence: "He is going to take a tour of London in a double-decker bus.",
    correctBox: "check",
  },
  {
    id: 4,
    sentence: "First, he will visit the Clock Tower.",
    correctBox: "cross",
  },
  {
    id: 5,
    sentence: "He is going to take his camera with him.",
    correctBox: "check",
  },
];
const captions = [
  {
    start: 0.28,
    end: 7.46,
    text: "Page 14, write activities, exercise C. Listen, read, and write check or X.",
  },
  {
    start: 8.72,
    end: 12.76,
    text: "Darren is going to the United Kingdom for the summer.",
  },
  {
    start: 12.76,
    end: 15.56,
    text: "He hopes to visit many places while he's there.",
  },
  {
    start: 15.56,
    end: 20.18,
    text: "He plans to take a tour of the English countryside first.",
  },
  {
    start: 21.2,
    end: 24.24,
    text: "Next, he is going to see Buckingham Palace.",
  },
  {
    start: 24.24,
    end: 29.34,
    text: "He will make sure to take his camera with him so he can take lots of pictures.",
  },
  {
    start: 29.34,
    end: 33.82,
    text: "He is going to take a tour of London in a double-decker bus.",
  },
  {
    start: 33.82,
    end: 37.52,
    text: "Lastly, he is going to visit the Clock Tower.",
  },
];
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

export default function WB_ListenReadWriteCheckCross_QC() {
  const listening=useExerciseListening("sb_unit2_page5_q3");

  // selected: { itemId: "check" | "cross" | null }
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");
  const isLocked = (id) => showAns || results[id] === "correct";

  const handleSelect = (itemId, box) => {
    if (isLocked(itemId)) return;
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setAnnouncement(
      selected[itemId] === box
        ? `Sentence ${itemId}: selection cleared.`
        : `Sentence ${itemId}: ${box === "check" ? "true" : "false"} selected.`,
    );
    setSelected((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === box ? null : box,
    }));
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please choose ✓ or ✕ for each sentence.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (selected[item.id] === item.correctBox) score++;
    });
    setResults(
      Object.fromEntries(
        ITEMS.map((item) => [
          item.id,
          selected[item.id] === item.correctBox ? "correct" : "wrong",
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
      filled[item.id] = item.correctBox;
    });
    setSelected(filled);
    setResults({});
    setShowAns(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {listening.stop();
    setSelected({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Selections and feedback cleared.");
  };

  // Get box state for a specific box type ("check"/"cross") for an item
  const getBoxState = (item, box) => {
    const sel = selected[item.id];
    const isActive = sel === box;
    if (!isActive) return "idle";
    if (showAns) return "correct";
    if (results[item.id]) return results[item.id];
    return "selected";
  };

  const getBoxSymbol = (box) => (box === "check" ? "✓" : "✕");

  return (
    <div data-listening-scope={"sb_unit2_page5_q3"} className="main-container-component" data-unit2-scope="Unit2_Page5_Q3"><style>{`[data-listening-scope="sb_unit2_page5_q3"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        [data-unit2-scope="Unit2_Page5_Q3"] [data-keyboard-choice]:focus-visible {
          outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 8px;
        }
      `}</style>
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrcc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .lrcc-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          text-indent: clamp(14px, 1.8vw, 22px);
          margin: 0;
        }

        .lrcc-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .lrcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 20px);
          width: 100%;
        }

        /* Single row: num | sentence | boxes */
        .lrcc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrcc-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .lrcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Two boxes */
        .lrcc-boxes {
          display: flex;
          gap: clamp(5px, 0.7vw, 9px);
          flex-shrink: 0;
        }

        /* Single box */
        .lrcc-box {
          width: clamp(40px, 4.6vw, 40px);
          height: clamp(40px, 4.6vw, 40px);
          border: 2px solid ${BOX_BORDER};
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 2.2vw, 28px);
          font-weight: 700;
          cursor: pointer;
          user-select: none;
          color: transparent;
          position: relative;
          transition: border-color 0.15s;
        }
        .lrcc-box--locked { cursor: default; }

        /* States */
        .lrcc-box--selected-check { color: ${CHECK_COLOR}; }
        .lrcc-box--selected-cross { color: ${CROSS_COLOR}; }
        .lrcc-box--correct        { color: ${CHECK_COLOR};  }
        .lrcc-box--wrong          { color: ${WRONG_BADGE_BG};  }

        /* ✕ wrong badge */
        .lrcc-wrong-badge {
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

        /* Buttons */
        .lrcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrcc-top { grid-template-columns: 1fr; }
          .lrcc-img { width: 100%; }
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
          sectionLetter={"C"}
          title={"Listen, read, and write ✓ or X."}
          subTitle={
            "Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer."
          }
        />
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit2_page14_q3"
            src={sound}
            captions={captions}
            stopAtSecond={7.5}
          />
        </div>

        {/* ── Paragraph + Image ── */}
        <div className="lrcc-top">
          <p className="lrcc-para">{renderExerciseAudioText({"audio":listening,"id":"paragraph-0","src":clipC1,"label":"Hear Darren is going to the United Kingdom for the summer. He hopes to ",children:<>{"Darren is going to the United Kingdom for the summer. He hopes to "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-1","src":clipC2,"label":"Hear visit many places while he's there. He plans to take a tour of the English ",children:<>{"visit many places while he's there. He plans to take a tour of the English "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-2","src":clipC3,"label":"Hear countryside first. Next, he is going to see Buckingham Palace. He will ",children:<>{"countryside first. Next, he is going to see Buckingham Palace. He will "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-3","src":clipC4,"label":"Hear make sure to take his camera with him, so he can take lots of pictures. ",children:<>{"make sure to take his camera with him, so he can take lots of pictures. "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-4","src":clipC5,"label":"Hear He is going to take a tour of London in a double-decker bus. Lastly, he ",children:<>{"He is going to take a tour of London in a double-decker bus. Lastly, he "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-5","src":clipC6,"label":"Hear is going to visit the Clock Tower.",children:<>{"is going to visit the Clock Tower."}</>})}</p>
          <img src={imgScene} alt="london" className="lrcc-img" />
        </div>

        {/* ── Items ── */}
        <div className="lrcc-list">
          {ITEMS.map((item) => (
            renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipC7,clipC8,clipC9,null,null][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"key":item.id,"className":"lrcc-row",children:<>
              {/* Number */}
              <span className="lrcc-num">{item.id}</span>

              {/* Sentence */}
              <span className="lrcc-sentence">{item.sentence}</span>

              {/* Two boxes: ✓ and ✕ */}
              <div className="lrcc-boxes">
                {["check", "cross"].map((box) => {
                  const state = getBoxState(item, box);
                  const sym = getBoxSymbol(box);

                  const cls = [
                    "lrcc-box",
                    isLocked(item.id) ? "lrcc-box--locked" : "",
                    state === "selected" && box === "check"
                      ? "lrcc-box--selected-check"
                      : "",
                    state === "selected" && box === "cross"
                      ? "lrcc-box--selected-cross"
                      : "",
                    state === "correct" ? "lrcc-box--correct" : "",
                    state === "wrong" ? "lrcc-box--wrong" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      data-keyboard-choice
                      {...activationKeys}
                      aria-label={`Sentence ${item.id}. ${item.sentence} ${box === "check" ? "True" : "False"}${isLocked(item.id) ? ". Locked" : ""}`}
                      aria-pressed={selected[item.id] === box}
                      aria-disabled={isLocked(item.id)}
                      style={{
                        background:
                          selected[item.id] === box ? "#dbeafe" : undefined,
                        borderColor:
                          state === "correct"
                            ? "#16a34a"
                            : state === "wrong"
                              ? "#ef4444"
                              : undefined,
                      }}
                      key={box}
                      className={cls}
                      onClick={() => handleSelect(item.id, box)}
                    >
                      {state !== "idle" ? sym : ""}
                      {state === "wrong" && (
                        <div className="lrcc-wrong-badge">✕</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>})
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lrcc-buttons">
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
