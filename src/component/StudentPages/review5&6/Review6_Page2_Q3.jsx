import clipPage55E2 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - E/Item_002_I_don't_eat_much.mp3";
import clipPage55E1 from "../../../assets/audio/ClassBook/Unit 6/Page 55 - E/Item_001_I_eat_many.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, {useState} from "react";
import Button from "../../Button";
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



// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const NUMBER_COLOR            = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, before: "I eat many",     after: "." },
  { id: 2, before: "I don't eat much", after: "." },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WhatDoYouEat_QE() {
const listening=useExerciseListening("sb_review6_page2_q3");

  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

 const [announcement,setAnnouncement]=useState("");
  const handleReset = () => {listening.stop();
    setAnswers({});setAnnouncement("Your answers cleared.");
  };

  return (
    <div data-adapt-scope="review5&6_Review6_Page2_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="review5&6_Review6_Page2_Q3"] input:focus-visible, [data-adapt-scope="review5&6_Review6_Page2_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="review5&6_Review6_Page2_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        .wdye-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
          margin: 15% 0;
        }

        .wdye-row {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
        }

        .wdye-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .wdye-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .wdye-input-wrap {
          position: relative;
          flex: 1;
          min-width: clamp(120px, 20vw, 300px);
        }

        .wdye-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
        }

        /* ── Reset button ── */
        .wdye-reset-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(12px, 2vw, 24px);
        }

        .wdye-reset-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: clamp(8px, 1vw, 12px) clamp(22px, 3vw, 36px);
          background: transparent;
          border: 2px solid #9ca3af;
          border-radius: 999px;
          font-size: clamp(13px, 1.5vw, 17px);
          color: #6b7280;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.18s, color 0.18s;
        }
        .wdye-reset-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .wdye-reset-icon {
          font-size: clamp(14px, 1.6vw, 18px);
          line-height: 1;
        }
            .lrw-buttons {
          display: flex;
          justify-content: center;
             margin-top: 8.6% ;

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
        <ExerciseHeader subTitle="Think about what you really eat, then write a complete personal answer for each prompt before moving on." isReview sectionLetter="E" title={<>What do you eat? Read and write.</>} />

        {/* ── Items ── */}
        <div className="wdye-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wdye-row">
              <span className="wdye-num">{item.id}</span>
              <span className="wdye-text">{renderExerciseAudioText({audio:listening,id:`before-${item.id}`,src:[clipPage55E1,clipPage55E2][item.id-1],label:item.before,children:item.before})}</span>
              <div className="wdye-input-wrap">
                <input {...fieldKeys} aria-label={`Question ${item.id}. Complete: ${item.before} blank ${item.after}`} title={`Complete: ${item.before}`} placeholder="Your answer"
                  type="text"
                  className="wdye-input"
                  value={answers[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <span className="wdye-text">{item.after}</span>
            </div>
          ))}
        </div>

        {/* ── Reset only ── */}
      
      </div> 
      <div className="action-buttons-container">
       <div className="lrw-buttons">
    <button type="button" {...activationKeys} onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        </div>
        </div>
    </div>
  );
}