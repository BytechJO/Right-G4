import React, { useState, useRef } from "react";
import { useAudio } from "../../../context/AudioContext";

// ======================================================
import pageImage from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 93.png";
import soundAll from "../../../assets/audio/ClassBook/Grade 4/cd5pg92-story-adult-lady_ZnWsUclb.mp3";
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

const PAGE_ID = "page-93";

const Reading_NewPage = () => {
  const { registerAudio, stopCurrent, activePageId } = useAudio();
  const audioRef = useRef(null);
  const sliceTimer=useRef(null),sliceGeneration=useRef({value:0});
  React.useEffect(()=>{const audio=audioRef.current,generation=sliceGeneration.current;return()=>{generation.value++;clearInterval(sliceTimer.current);if(audio){audio.onended=audio.onerror=null;audio.pause();}};},[]);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  React.useEffect(() => {
    if (activePageId !== PAGE_ID) {
      clearInterval(sliceTimer.current);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
      setIsPlaying(false);
    }
  }, [activePageId]);

  const clickableAreas = [
  {
    x1: 8.27,
    y1: 28.8,
    x2: 46.76,
    y2: 39.8,
    slice: { startFrom: 109.08, stopAt: 123.8 },
  },
  {
    x1: 51.35,
    y1: 31.5,
    x2: 89.7,
    y2: 39.85,
    slice: { startFrom: 123.8, stopAt: 132.18 },
  },
  {
    x1: 8.06,
    y1: 65.5,
    x2: 46.46,
    y2: 73.8,
    slice: { startFrom: 132.18, stopAt: 144.1 },
  },
  {
    x1: 51.06,
    y1: 52.5,
    x2: 89.46,
    y2: 63.8,
    slice: { startFrom: 144.1, stopAt: 162.0 },
  },
];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSlice=(slice,newIndex)=>{const audio=audioRef.current;if(!audio)return;const token=++sliceGeneration.current.value;clearInterval(sliceTimer.current);stopCurrent();audio.onended=audio.onerror=null;audio.src=soundAll;audio.currentTime=slice.startFrom;setIsPlaying(true);setActiveAreaIndex(newIndex);setHoveredAreaIndex(null);const finish=()=>{if(sliceGeneration.current.value!==token)return;clearInterval(sliceTimer.current);sliceTimer.current=null;audio.pause();setIsPlaying(false);setActiveAreaIndex(null);setHoveredAreaIndex(null);};const id=setInterval(()=>{if(sliceGeneration.current.value===token&&audio.currentTime>=slice.stopAt)finish();},100);sliceTimer.current=id;audio.onended=audio.onerror=finish;registerAudio(audio,id,PAGE_ID);audio.play().catch(finish);};

  return (
    <div data-reading-page="unit10-2"
      role="group" aria-label="Illustrated reading passages on page 93" className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${pageImage})` }}
    >
      <style>{`[data-reading-page="unit10-2"] :focus-visible {
        outline: 4px solid #2563eb;
        outline-offset: 3px;
        border-radius: 6px;
      }
[data-reading-page="unit10-2"] .clickable-area.highlight {background-color:rgba(255,0,0,.078);border:2px solid rgba(255,0,0,.8);border-radius:8px;}
[data-reading-page="unit10-2"] .clickable-area:focus-visible {outline-offset:-4px;z-index:11;}
`}</style>
      {clickableAreas.map((area, index) => (
        <div role="button" tabIndex={0} data-reading-control {...pageKeys}
          aria-label={`Read passage ${index + 1} on page 93`}
          aria-pressed={activeAreaIndex === index}
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            zIndex: hoveredAreaIndex === index || activeAreaIndex === index ? 10 : 1,
            pointerEvents: "auto",
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