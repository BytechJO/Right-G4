import clipPage26J3 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - J/Item_003_What_is_the_most_special_gift_you_have_ever_received.mp3";
import clipPage26J2 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - J/Item_002_What_is_the_smallest_gift_you've_ever_received.mp3";
import clipPage26J1 from "../../../assets/audio/WorkBook/Unit 4/Page 26 - J/Item_001_What_is_the_biggest_gift_you've_ever_received.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";
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
const NUMBER_COLOR            = "#2b2b2b";
const QUESTION_TEXT_COLOR     = "#2b2b2b";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA — أسئلة حرة بدون إجابات
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, question: "What is the biggest gift you've ever received?"    },
  { id: 2, question: "What is the smallest gift you've ever received?"   },
  { id: 3, question: "What is the most special gift you have ever received?" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QJ() {
const listening=useExerciseListening("wb_unit4_page26_q2");

  const [answers, setAnswers] = useState({});
const [announcement,setAnnouncement]=useState("");

  const handleChange = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleReset=()=>{listening.stop();setAnswers({});setAnnouncement("Responses cleared.");};

  return (
    <div data-adapt-scope="Unit4_WB_Unit4_Page26_Q2" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit4_WB_Unit4_Page26_Q2"] input:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q2"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q2"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit4_WB_Unit4_Page26_Q2"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Items list ── */
        .rw2-list {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.8vw, 36px);
          width: 100%;
              margin:5% 0 ;
        }

        /* ── Single item ── */
        .rw2-item {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Question row */
        .rw2-question-row {
          display: flex;
          align-items: baseline;
          gap: clamp(8px, 1vw, 14px);
        }

        .rw2-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
        }

        .rw2-question {
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${QUESTION_TEXT_COLOR};
          line-height: 1.5;
        }

        /* Answer input — indented */
        .rw2-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
font-size: clamp(15px, 1.9vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          margin-left: clamp(20px, 2.4vw, 32px);
        }

        /* Buttons */
        .rw2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
        <ExerciseHeader subTitle="Think of a real gift you received, then answer each question with your own complete response." sectionLetter="J" title={<>Read and write.</>} />

        {/* ── Items ── */}
        <div className="rw2-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="rw2-item">

              {/* Question */}
              {renderExerciseAudioGroup({audio:listening,id:`question-${item.id}`,src:[clipPage26J1,clipPage26J2,clipPage26J3][item.id-1],label:item.question,className:"rw2-question-row",style:undefined,key:item.id,children:<>
                <span className="rw2-num">{item.id}</span>
                <span className="rw2-question">{item.question}</span>
              </>})}

              {/* Answer line */}
              <input {...fieldKeys} aria-label={`Question ${item.id}. ${item.question}`} title={item.question} placeholder="Your own answer"
                type="text"
                className="rw2-input"
                value={answers[item.id] || ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />

            </div>
          ))}
        </div>

        {/* ── Start Again only ── */}
        <div className="rw2-buttons">
          <div className="action-buttons-container"><button type="button" aria-label="Start Again" {...activationKeys} onClick={handleReset} className="try-again-button">Start Again ↻</button></div>
        </div>
      </div>
    </div>
  );
}