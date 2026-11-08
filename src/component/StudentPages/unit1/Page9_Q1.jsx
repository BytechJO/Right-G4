import clipD4 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - D/Item_004_They_will_watch_a_movie_at_the_cinema.mp3";
import clipD3 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - D/Item_003_They_will_eat_at_a_restaurant.mp3";
import clipD2 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - D/Item_002_Stella_will_study_for_her_test.mp3";
import clipD1 from "../../../assets/audio/ClassBook/Unit 1/Page 9 - D/Item_001_Sarah_will_go_to_the_beach_tomorrow.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import img1a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 24.svg";
import img1b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 23.svg";
import img2a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 22.svg";
import img2b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 21.svg";
import img3a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 20.svg";
import img3b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 19.svg";
import img4a from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 18.svg";
import img4b from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page9/SVG/Asset 17.svg";

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
const IMG_BORDER = "#d0d0d0";
const SENTENCE_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    sentence: "Sarah will go to the beach tomorrow.",
    imgA: img1a,
    imgB: img1b,
    correctSide: "a",
  },
  {
    id: 2,
    sentence: "Stella will study for her test.",
    imgA: img2a,
    imgB: img2b,
    correctSide: "b",
  },
  {
    id: 3,
    sentence: "They will eat at a restaurant.",
    imgA: img3a,
    imgB: img3b,
    correctSide: "a",
  },
  {
    id: 4,
    sentence: "They will watch a movie at the cinema.",
    imgA: img4a,
    imgB: img4b,
    correctSide: "a",
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

const PICTURE_DESCRIPTIONS = {
  1: {
    a: "A girl relaxing on a beach under a sun umbrella.",
    b: "A girl playing with dolls on a rug.",
  },
  2: {
    a: "A girl planting flowers in a garden.",
    b: "A girl writing in an open book at a desk.",
  },
  3: {
    a: "Four people sitting at a restaurant table with a menu.",
    b: "A boy building a sandcastle on a beach.",
  },
  4: {
    a: "Four children seated in front of a large screen showing racing cars.",
    b: "A girl reading an open book at a desk.",
  },
};

const EXERCISE_TITLE = (
  <>
    Read, look, and write<span className="text-[#ff0000ff] font-bold"> ✓ </span>
    and<span className="text-[#ff0000ff] font-bold"> ✕</span>.
  </>
);

export default function WB_ReadLookWriteCheckCross_QD() {
  const listening=useExerciseListening("sb_unit1_page9_q1");

  const [selected, setSelected] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");
  const isLocked = (id) => showAns || results[id] === "correct";

  const handleSelect = (itemId, side) => {
    if (isLocked(itemId)) {
      setAnnouncement(`Question ${itemId} is correct and locked.`);
      return;
    }
    const nextSide = selected[itemId] === side ? null : side;
    setSelected((prev) => ({ ...prev, [itemId]: nextSide }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setAnnouncement(
      `Question ${itemId}: ${nextSide ? PICTURE_DESCRIPTIONS[itemId][nextSide] + " selected." : "Selection cleared."}`,
    );
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (!ITEMS.every((item) => selected[item.id])) {
      setAnnouncement("Please choose a picture for each sentence.");
      ValidationAlert.info("Please choose a picture for each sentence.");
      return;
    }
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || selected[item.id] === item.correctSide
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. ${ITEMS.map((item) => `Question ${item.id}: ${checked[item.id]}`).join(". ")}`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {listening.stop();
    setSelected(
      Object.fromEntries(ITEMS.map((item) => [item.id, item.correctSide])),
    );
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

  // ── التعديل 2: السيمبول يضل زي ما اختار الطالب دايماً ما يتغير ──
  // الاستثناء الوحيد: showAns يعرض الإجابة الصحيحة
  const getSymbol = (item, side) => {
    const sel = selected[item.id];
    if (!sel) return null;

    if (showAns) {
      return side === item.correctSide ? "✓" : "✕";
    }

    // قبل check أو بعده: يضل ✓ على اللي اختاره الطالب و✕ على الثاني بدون تغيير
    return side === sel ? "✓" : "✕";
  };

  const getSymbolColor = (item, side) => {
    const sym = getSymbol(item, side);
    if (!sym) return CHECK_COLOR;
    if (showAns) {
      return side === item.correctSide ? CHECK_COLOR : CROSS_COLOR;
    }
    return sym === "✓" ? CHECK_COLOR : CROSS_COLOR;
  };

  // ── التعديل 1: البادج يظهر جنب الجملة مش على الصورة ──
  const isWrongSelected = (item) => {
    return !showAns && results[item.id] === "wrong";
  };

  return (
    <div data-listening-scope={"sb_unit1_page9_q1"} className="main-container-component sb-unit1-page9-q1"><style>{`[data-listening-scope="sb_unit1_page9_q1"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .sb-unit1-page9-q1 .rlcc-img-wrap {
          border: 0;
          padding: 0;
          background: transparent;
          text-align: inherit;
          border-radius: 6px;
        }
        .sb-unit1-page9-q1 .rlcc-img-wrap[aria-pressed="true"] { box-shadow: 0 0 0 3px #2563eb; }
        .sb-unit1-page9-q1 .rlcc-img-wrap[data-result="correct"] { box-shadow: 0 0 0 3px #16a34a; }
        .sb-unit1-page9-q1 .rlcc-img-wrap[data-result="wrong"] { box-shadow: 0 0 0 3px #ef4444; }
        .sb-unit1-page9-q1 .rlcc-img-wrap:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 5px;
        }
        /* ── Items list ── */
        .rlcc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.8vw, 22px);
          width: 100%;
        }

        /* Single row: images-pair | num + sentence */
        .rlcc-row {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: center;
        }

        /* Left: two images side by side */
        .rlcc-imgs {
          display: flex;
          gap: clamp(4px, 0.6vw, 8px);
          flex-shrink: 0;
        }

        .rlcc-img-wrap {
          position: relative;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
          width: clamp(100px, 14vw, 180px);
        }
        .rlcc-img-wrap--locked { cursor: default; }

        .rlcc-img {
          width: 100%;
          object-fit: cover;
          display: block;
          height: auto;
        }

        /* Symbol box — bottom right corner */
        .rlcc-symbol {
          position: absolute;
          bottom: 0;
          right: 0;
          width: clamp(24px, 3.2vw, 38px);
          height: clamp(24px, 3.2vw, 38px);
          border-radius: 8px 0 8px 0;
          background: #fff;
          border-top: 2px solid #2195a6;
          border-left: 2px solid #2195a6;
          border-right: 2px solid #2195a6;
          border-bottom: 2px solid #2195a6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(13px, 1.8vw, 22px);
          font-weight: 700;
          line-height: 1;
          z-index: 2;
        }

        /* ── التعديل 1: البادج جنب الجملة ── */
        .rlcc-wrong-badge {
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }

        /* Right: number + sentence */
        .rlcc-right {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
          min-width: 0;
        }

        .rlcc-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
          margin-right: 5px;
        }

        .rlcc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Buttons */
        .rlcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 520px) {
          .rlcc-row { grid-template-columns: 1fr; }
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
          sectionLetter="D"
          title={EXERCISE_TITLE}
          subTitle={
            "Read each statement and compare it with the picture or clue, then choose the correct two-way answer."
          }
        />

        {/* ── Items ── */}
        <div className="rlcc-list" style={{ margin: "1% 0" }}>
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc-row">
              {/* Two images — السيمبول ما يتغير */}
              <div className="rlcc-imgs">
                {["a", "b"].map((side) => {
                  const sym = getSymbol(item, side);
                  const color = getSymbolColor(item, side);
                  const src = side === "a" ? item.imgA : item.imgB;

                  return (
                    <button
                      type="button"
                      {...activationKeys}
                      aria-pressed={selected[item.id] === side}
                      aria-disabled={isLocked(item.id)}
                      aria-label={`Question ${item.id}. ${item.sentence} Picture ${side.toUpperCase()}: ${PICTURE_DESCRIPTIONS[item.id][side]}${isLocked(item.id) ? " Locked." : ""}`}
                      data-result={
                        selected[item.id] === side
                          ? showAns
                            ? "correct"
                            : results[item.id]
                          : undefined
                      }
                      key={side}
                      className={`rlcc-img-wrap${isLocked(item.id) ? " rlcc-img-wrap--locked" : ""}`}
                      onClick={() => handleSelect(item.id, side)}
                    >
                      <img src={src} alt="" className="rlcc-img" />
                      <span
                        aria-hidden="true"
                        className="rlcc-symbol"
                        style={{ color: sym ? color : "transparent" }}
                      >
                        {sym || ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Number + Sentence + البادج جنب الجملة */}
              {renderExerciseAudioGroup({"label":`Hear sentence ${item.id}`,"src":[clipD1,clipD2,clipD3,clipD4][item.id-1],"id":`sentence-${item.id}`,"audio":listening,"className":"rlcc-right",children:<>
                <span className="rlcc-num">{item.id}</span>
                <span className="rlcc-sentence">{item.sentence}</span>
                {isWrongSelected(item) && (
                  <div className="rlcc-wrong-badge">✕</div>
                )}
              </>})}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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
