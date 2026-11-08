import clipPage62L2 from "../../../assets/audio/WorkBook/Unit 10/Page 62 - L/Item_002_but_I_haven't.mp3";
import clipPage62L1 from "../../../assets/audio/WorkBook/Unit 10/Page 62 - L/Item_001_I_have.mp3";
import {useEffect as useListeningEffect,useRef as useListeningRef,useState as useListeningState} from "react";
import {useAudio} from "../../../context/AudioContext";
import {FaVolumeUp as ListeningSpeakerIcon} from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";

// ─────────────────────────────────────────────
//  🖼️  IMAGES
// ─────────────────────────────────────────────
import imgBeach    from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 15.svg";
import imgMountain from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 16.svg";
import imgUSA      from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 17.svg";
import imgForest   from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 18.svg";
import imgPyramids from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U10 Folder/Page 62/SVG/Asset 19.svg";
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
const PREFIX_COLOR            = "#2b2b2b";

const IMAGES = [
  { id: "beach",    src: imgBeach    },
  { id: "mountain", src: imgMountain },
  { id: "usa",      src: imgUSA      },
  { id: "forest",   src: imgForest   },
  { id: "pyramids", src: imgPyramids },
];

export default function WB_LookReadWrite_QL() {
const listening=useExerciseListening("wb_unit10_page62_q3");

  const [line1, setLine1] = useState(""); const [announcement,setAnnouncement]=useState("");
  const [line2, setLine2] = useState("");

  const handleReset=()=>{listening.stop();setLine1("");setLine2("");setAnnouncement("Answers cleared.");};

  return (
    <div data-adapt-scope="Unit10_WB_Unit10_Page62_Q3" className="main-container-component"><span className="sr-only" role="status" aria-live="polite">{listening.error}</span>
<style>{`[data-adapt-scope="Unit10_WB_Unit10_Page62_Q3"] input:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q3"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q3"] [data-grid-cell]:focus-visible, [data-adapt-scope="Unit10_WB_Unit10_Page62_Q3"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <style>{`
        /* ── Images row ── */
        .lrwl-bank {
          display: flex;
          gap: clamp(8px, 1.2vw, 16px);
          width: 100%;
          flex-wrap: nowrap;
        }

        .lrwl-img-wrap {
          flex: 1;
          min-width: clamp(70px, 11vw, 150px);
        }

        .lrwl-img {
          width: 100%;
          height : auto ; 
          display: block;
        }

        /* ── Write lines ── */
        .lrwl-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vw, 26px);
          width: 100%;
          margin-top : 20px
        }

        .lrwl-row {
          display: flex;
          align-items: flex-end;
          gap: clamp(5px, 0.7vw, 8px);
          min-width: 0;
        }

        .lrwl-prefix {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 400;
          color: ${PREFIX_COLOR};
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .lrwl-input {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
        }

        /* Buttons — only Start Again */
        .lrwl-buttons {
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
        <ExerciseHeader subTitle="Look at each place, then write where you have been and where you have not been using the model sentence." sectionLetter="L" title={<>Look, read, and write if you have ever been to these places.</>} />
<div style={{margin : "10% 0 "}}>

        {/* ── Images ── */}
        <div className="lrwl-bank">
          {IMAGES.map((img) => (
            <div key={img.id} className="lrwl-img-wrap">
              <img src={img.src} alt={({beach:"A sandy beach beside the sea.",mountain:"A mountain.",usa:"A map of the United States filled with its flag.",forest:"Pine trees in a snowy forest.",pyramids:"Pyramids in a desert."})[img.id]} className="lrwl-img" />
            </div>
          ))}
        </div>

        {/* ── Write lines ── */}
        <div className="lrwl-lines">
          <div className="lrwl-row">
            <span className="lrwl-prefix">{renderExerciseAudioText({audio:listening,id:"I have",src:clipPage62L1,label:"I have",children:"I have"})}</span>
            <input {...fieldKeys} aria-label="Places you have been to. Complete I have using the pictures." title="Places you have been to. Complete I have using the pictures." placeholder="Where you have been"
              type="text"
              className="lrwl-input"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div className="lrwl-row">
            <span className="lrwl-prefix">{renderExerciseAudioText({audio:listening,id:"but I haven't",src:clipPage62L2,label:"but I haven't",children:"but I haven't"})}</span>
            <input {...fieldKeys} aria-label="Places you have not been to. Complete but I haven’t using the pictures." title="Places you have not been to. Complete but I haven’t using the pictures." placeholder="Where you have not been"
              type="text"
              className="lrwl-input"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              />
          </div>
              </div>
        </div>

        {/* ── Start Again only ── */}
        <div className="lrwl-buttons">
          <div className="action-buttons-container"><button aria-label="Start Again" type="button" {...activationKeys} onClick={handleReset} className="try-again-button">Start Again ↻</button></div>
        </div>
      </div>
    </div>
  );
}