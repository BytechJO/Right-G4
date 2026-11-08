import clipPage45F3 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - F/Item_003_between.mp3";
import clipPage45F2 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - F/Item_002_through.mp3";
import clipPage45F1 from "../../../assets/audio/ClassBook/Unit 5/Page 45 - F/Item_001_inside.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, {useState} from "react";
import Button from "../../Button";
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
const INPUT_TEXT_COLOR = "#2b2b2b";
const NUMBER_COLOR = "#2b2b2b";
const WORD_COLOR = "#2b2b2b";
const VARY_COLOR = "#c81e1e";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  open-ended — no correct answer check
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, word: "inside" },
  { id: 2, word: "through" },
  { id: 3, word: "between" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWriteOwn_QF() {
const listening=useExerciseListening("sb_unit5_page6_q3");

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

 const [announcement,setAnnouncement]=useState("");
  const handleChange = (id, value) => {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  

  const handleReset = () => {listening.stop();
    setAnswers({});
    setChecked(false);setAnnouncement("Answers cleared.");
  };

  // no show answer for open-ended
  

  return (
    <div data-adapt-scope="unit5_Unit5_Page6_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="unit5_Unit5_Page6_Q3"] input:focus-visible, [data-adapt-scope="unit5_Unit5_Page6_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_Unit5_Page6_Q3"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Header note ── */
        .rwof-vary {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${VARY_COLOR};
          font-style: italic;
          font-weight: 600;
          margin-left: clamp(8px, 1vw, 14px);
        }

        /* ── Items list ── */
        .rwof-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 40px);
          width: 100%;
          margin: 12% 0;
        }

        /* Single row: num | word | input */
        .rwof-row {
          display: grid;
          grid-template-columns: auto clamp(80px, 10vw, 130px) 1fr;
          align-items: flex-end;
          gap: clamp(10px, 1.4vw, 20px);
          min-width: 0;
        }

        .rwof-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwof-word {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${WORD_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        .rwof-input-wrap {
          position: relative;
        }

        .rwof-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwof-input:disabled { opacity: 1; cursor: default; }

        .rwof-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rwof-row {
            grid-template-columns: auto clamp(70px, 20vw, 100px) 1fr;
            gap: 8px;
          }
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
        <ExerciseHeader subTitle="Use the target word in a complete sentence, reread it for meaning and punctuation, then move to the next line." sectionLetter="F" title={<>Read and write your own sentences.</>} />

        {/* ── Items ── */}
        <div className="rwof-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rwof-row">
              <span className="rwof-num">{item.id}</span>
              <span className="rwof-word">{renderExerciseAudioText({audio:listening,id:`word-${item.id}`,src:[clipPage45F1,clipPage45F2,clipPage45F3][item.id-1],label:item.word,children:item.word})}</span>
              <div className="rwof-input-wrap">
                <input {...fieldKeys} aria-label={`Question ${item.id}. Write your own sentence using ${item.word}.`} title={`Write a sentence using ${item.word}.`} placeholder="Your sentence"
                  type="text"
                  className="rwof-input"
                  value={answers[item.id] || ""}
                  disabled={checked}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  style={{ borderBottomColor: INPUT_UNDERLINE_DEFAULT }}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ── Buttons ── */}
      <div className="action-buttons-container">
        <div className="rwof-buttons">
          <button type="button" {...activationKeys} onClick={handleReset} className="try-again-button">
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
}
