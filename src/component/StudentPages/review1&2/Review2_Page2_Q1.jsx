import clipD3 from "../../../assets/audio/ClassBook/Unit 2/Page 19 - D/Item_003_school,_he_isn't_going_to_watch_TV._He's_going_to_do_his_homework.mp3";
import clipD2 from "../../../assets/audio/ClassBook/Unit 2/Page 19 - D/Item_002_pants._He_isn't_going_to_wear_a_cap._He_isn't_going_to_ride_his_bike_to.mp3";
import clipD1 from "../../../assets/audio/ClassBook/Unit 2/Page 19 - D/Item_001_It's_Tuesday_morning._John_is_going_to_school_at_half_past_eight._He_is.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 39.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 40.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 41-a.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd13pg19-instruction-adult-lady_CJNDmPbC.mp3";
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



const CHECK_COLOR = "#e53935";
const CROSS_COLOR = "#e53935";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const PARA_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";

const captions = [
  {
    start: 0.16,
    end: 7.78,
    text: "Page 19, review two, exercise D. Read, listen, and write check and X.",
  },
  { start: 9.06, end: 10.18, text: "It's Tuesday morning." },
  {
    start: 10.18,
    end: 13.02,
    text: "John is going to school at half past eight.",
  },
  {
    start: 13.02,
    end: 16.26,
    text: "He is going to wear an orange shirt and black pants.",
  },
  { start: 16.34, end: 18.76, text: "He isn't going to wear a cap." },
  {
    start: 18.76,
    end: 21.9,
    text: "He isn't going to ride his bike to school.",
  },
  { start: 21.9, end: 23.64, text: "He is going to take a bus." },
  {
    start: 23.64,
    end: 27.36,
    text: "After school, he isn't going to watch TV.",
  },
  { start: 27.36, end: 28.84, text: "He's going to do his homework." },
];

const PARAGRAPH = `It's Tuesday morning. John is going to school at half past eight. He is going to wear an orange shirt and black pants. He isn't going to wear a cap. He isn't going to ride his bike to school. He is going to take a bus. After school, he isn't going to watch TV. He's going to do his homework.`;

// correctSide: "left" | "right"  →  الجانب اللي يكون فيه ✓
const ITEMS = [
  { id: 1, src: img1, correctSide: "right" },
  { id: 2, src: img2, correctSide: "left" },
  { id: 3, src: img3, correctSide: "right" },
  { id: 4, src: img4, correctSide: "right" },
];

// "A" = ✓ يسار  ✕ يمين
// "B" = ✓ يمين  ✕ يسار
const PICTURE_DESCRIPTIONS = [
  "A boy wearing a helmet and backpack riding a bicycle.",
  "A boy sitting in an armchair watching television with a bowl of snacks.",
  "A boy putting on an orange jacket.",
  "A boy in a white shirt and backpack leaving through a doorway.",
];

const correctState = (item) => (item.correctSide === "left" ? "A" : "B");

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

export default function WB_ReadListenWriteCheckCross_QD2() {
  const listening=useExerciseListening("sb_review2_page2_q1");

  const [selected, setSelected] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = (id) => showAns || results[id] === "correct";

  // كل ضغطة على الصورة تقلب الحالة: null → "A" → "B" → "A" ...
  const handleSelect = (itemId) => {
    if (isLocked(itemId)) return;
    const next = selected[itemId] === "A" ? "B" : "A";
    setSelected((previous) => ({ ...previous, [itemId]: next }));
    setResults((previous) => {
      const updated = { ...previous };
      delete updated[itemId];
      return updated;
    });
    setAnnouncement(
      `Question ${itemId}: tick on the ${next === "A" ? "left" : "right"}, cross on the ${next === "A" ? "right" : "left"}.`,
    );
  };

  const handleCheck = () => {
    if (checkDisabled) return;listening.stop();
    if (!ITEMS.every((item) => selected[item.id])) {
      setAnnouncement("Please choose a picture for each question.");
      ValidationAlert.info("Please choose a picture for each question.");
      return;
    }
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        selected[item.id] === correctState(item) ? "correct" : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
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
      filled[item.id] = correctState(item);
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
    setAnnouncement("Answers and feedback cleared.");
  };

  // إيش يظهر على كل جانب
  const getSymbol = (item, side) => {
    const sel = selected[item.id];
    if (!sel) return null;
    if (side === "left") return sel === "A" ? "✓" : "✕";
    if (side === "right") return sel === "B" ? "✓" : "✕";
    return null;
  };

  const getSymbolColor = (item, side) =>
    getSymbol(item, side) === "✓" ? CHECK_COLOR : CROSS_COLOR;

  const isWrongSide = (item, side) =>
    !showAns && results[item.id] === "wrong" && getSymbol(item, side) === "✓";

  return (
    <div data-listening-scope={"sb_review2_page2_q1"}
      className="main-container-component"
      data-review12-scope="Review2_Page2_Q1"
    ><style>{`[data-listening-scope="sb_review2_page2_q1"] [data-listening]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review2_Page2_Q1"] [data-keyboard-choice]:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        .rlcc2-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          margin: 0;
        }

        .rlcc2-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 1.8vw, 24px) clamp(16px, 2.4vw, 32px);
          width: 100%;
        }

        .rlcc2-card {
          display: flex;

    flex-direction: row;
          gap: clamp(4px, 0.5vw, 6px);
        }

        .rlcc2-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        .rlcc2-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
        }
        .rlcc2-img-wrap--locked { cursor: default; }

        .rlcc2-img {
          width: 100%;
          height: auto;
          display: block;
          pointer-events: none;
        }

        .rlcc2-symbol {
          position: absolute;
          bottom: 0;
          width: clamp(28px, 3.6vw, 46px);
          height: clamp(28px, 3.6vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 2.2vw, 28px);
          font-weight: 700;
          z-index: 2;
          pointer-events: none;
        }

        
        .rlcc2-symbol--left {


        border-radius: 0 8px 0 0;
        }

        .rlcc2-symbol--right {
          right: 0;
          border-radius: 8px 0 0 0;
        }

        .rlcc2-badge {
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
          z-index: 3;
        }

        .rlcc2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rlcc2-grid { grid-template-columns: 1fr; }
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
          isReview
          sectionLetter={"D"}
          title={"Read, listen, and write ✓ or X."}
          subTitle={
            "Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer."
          }
        />
        <div style={{ margin: "3em 0 2em" }}>
          <QuestionAudioPlayer
            pageId="sb_review2_page2_q1"
            src={sound}
            captions={captions}
            stopAtSecond={4}
          />
        </div>
        <p className="rlcc2-para">{renderExerciseAudioText({"audio":listening,"id":"paragraph-0","src":clipD1,"label":"Hear It's Tuesday morning. John is going to school at half past eight. He is going to wear an orange shirt and black ",children:<>{"It's Tuesday morning. John is going to school at half past eight. He is going to wear an orange shirt and black "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-1","src":clipD2,"label":"Hear pants. He isn't going to wear a cap. He isn't going to ride his bike to school. He is going to take a bus. After ",children:<>{"pants. He isn't going to wear a cap. He isn't going to ride his bike to school. He is going to take a bus. After "}</>})}{renderExerciseAudioText({"audio":listening,"id":"paragraph-2","src":clipD3,"label":"Hear school, he isn't going to watch TV. He's going to do his homework.",children:<>{"school, he isn't going to watch TV. He's going to do his homework."}</>})}</p>

        <div className="rlcc2-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc2-card">
              <span className="rlcc2-num">{item.id}</span>

              <div
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-label={`Question ${item.id}. ${PICTURE_DESCRIPTIONS[item.id - 1]} ${selected[item.id] ? "Tick on the " + (selected[item.id] === "A" ? "left" : "right") + ", cross on the other side." : "No selection."} ${isLocked(item.id) ? "Locked." : "Press to switch tick and cross."}`}
                aria-disabled={isLocked(item.id)}
                style={{
                  borderRadius: "6px",
                  boxShadow: selected[item.id]
                    ? ` 0 0 0 3px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                    : undefined,
                }}
                className={`rlcc2-img-wrap${isLocked(item.id) ? " rlcc2-img-wrap--locked" : ""}`}
                onClick={() => handleSelect(item.id)}
              >
                <img src={item.src} alt="" className="rlcc2-img" />

                {/* Left symbol */}
                {(() => {
                  const sym = getSymbol(item, "left");
                  const color = getSymbolColor(item, "left");
                  const wrong = isWrongSide(item, "left");
                  return sym ? (
                    <div
                      className="rlcc2-symbol rlcc2-symbol--left"
                      style={{ color }}
                    >
                      {sym}
                      {wrong && <div className="rlcc2-badge">✕</div>}
                    </div>
                  ) : null;
                })()}

                {/* Right symbol */}
                {(() => {
                  const sym = getSymbol(item, "right");
                  const color = getSymbolColor(item, "right");
                  const wrong = isWrongSide(item, "right");
                  return sym ? (
                    <div
                      className="rlcc2-symbol rlcc2-symbol--right"
                      style={{ color }}
                    >
                      {sym}
                      {wrong && <div className="rlcc2-badge">✕</div>}
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          ))}
        </div>

        <div className="rlcc2-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              {...activationKeys}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
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
