import React, { useState, useRef } from "react";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 75.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd4pg74-story-adult-lady_gTfYuwuf.mp3";
import "./Reading_Unit8_Page1.css";
// ======================================================

const pageKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat)
      event.currentTarget.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const PAGE_ID = "page-75";

const Reading_NewPage = () => {
  const { registerAudio, stopCurrent, activePageId } = useAudio();
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  React.useEffect(() => {
    if (activePageId !== PAGE_ID) {
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      setIsPlaying(false);
    }
  }, [activePageId]);


  const clickableAreas = [
    { x1: 10.06, y1: 27.9,  x2: 48.76, y2: 45.7,  slice: { startFrom: 95.79,  stopAt: 125.26 } },
    { x1: 51.0,  y1: 27.8,  x2: 89.7,  y2: 45.4,  slice: { startFrom: 125.26, stopAt: 141.20 } },
    { x1: 51.27, y1: 54.07, x2: 89.51, y2: 67.0,  slice: { startFrom: 142.58, stopAt: 156.31 } },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSlice = (slice, newIndex) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopCurrent();
    setActiveAreaIndex(null);
    setHoveredAreaIndex(null);

    audio.src = soundAll;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);
    setActiveAreaIndex(newIndex);

    const id = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(id);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    registerAudio(audio, id, PAGE_ID);

    audio.onended = () => {
      clearInterval(id);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div data-reading-page="unit8-2"
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${pageImage})` }}
    >
      <style>{`[data-reading-page="unit8-2"] :focus-visible {
        outline: 4px solid #2563eb;
        outline-offset: 3px;
        border-radius: 6px;
      }`}</style>
      {clickableAreas.map((area, index) => (
        <div role="button" tabIndex={0} data-reading-control {...pageKeys}
          aria-label={`Read passage ${index + 1} on page 75`}
          aria-pressed={activeAreaIndex === index}
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            playSlice(area.slice, index);
          }}
          onMouseEnter={() => { if (!isPlaying) setHoveredAreaIndex(index); }}
          onMouseLeave={() => { if (!isPlaying) setHoveredAreaIndex(null); }}
        />
      ))}

      

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_NewPage;