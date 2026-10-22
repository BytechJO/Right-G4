import React, { useState, useRef } from "react";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 21.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd1pg20-story-adult-lady_Nf7yHD6t.mp3";
import "./Reading_Unit2_Page1.css";
// ======================================================

const pageKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};


const PAGE_ID = "page-21";

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
    { x1: 10,   y1: 32.5, x2: 49,   y2: 41,   slice: { startFrom: 56,   stopAt: 66   } },
    { x1: 51,   y1: 32.5, x2: 89.8, y2: 40.5, slice: { startFrom: 75,   stopAt: 76.5 } },
    { x1: 51,   y1: 56,   x2: 89.8, y2: 62,   slice: { startFrom: 76.5, stopAt: 85.5 } },
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
    <div data-reading-page="unit2-2"
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${pageImage})` }}
    >
      <style>{`[data-reading-page="unit2-2"] :focus-visible {
        outline: 4px solid #2563eb;
        outline-offset: 3px;
        border-radius: 6px;
      }`}</style>
      {clickableAreas.map((area, index) => (
        <div role="button" tabIndex={0} data-reading-control {...pageKeys}
          aria-label={`Read paragraph ${[5, 6, 8][index]} on page 21`}
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