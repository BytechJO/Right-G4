import React, { useRef,useState } from "react";
import page25 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 75.png";;
import "./Reading_Unit8_Page1.css";
import { FaHeadphones } from "react-icons/fa";
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 75/Pg75_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 75/Pg75_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 75/Pg75_1.7_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 75/Pg75_1.8_Adult Lady.mp3";
const Reading_Unit8_Page2 = () => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
const clickableAreas2 = [
  // 1
  {
    x1: 10.06,
    y1: 27.9,
    x2: 48.76,
    y2: 45.7,
    slice: { startFrom: 0, stopAt: 0 },
  },

  // 2
  {
    x1: 51,
    y1: 27.8,
    x2: 89.7,
    y2: 45.4,
    slice: { startFrom: 0, stopAt: 0 },
  },

  // 3
  {
    x1: 51.27,
    y1: 54.07,
    x2: 89.51,
    y2: 67,
    slice: { startFrom: 0, stopAt: 0 },
  },
];

const clickableAreas = [
  // 1
  {
    x1: 10.06,
    y1: 27.9,
    x2: 48.76,
    y2: 45.7,
    slice: { startFrom: 0, stopAt: 0 },
  },

  // 2
  {
    x1: 51,
    y1: 27.8,
    x2: 89.7,
    y2: 45.4,
    slice: { startFrom: 0, stopAt: 0 },
  },

  // 3
  {
    x1: 51.27,
    y1: 54.07,
    x2: 89.51,
    y2: 67,
    slice: { startFrom: 0, stopAt: 0 },
  },
];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();
      setIsPlaying(true);
      setHoveredAreaIndex(null); // إزالة الهايلايت عند بدء الصوت

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAreaIndex(null); // مسح الهايلايت بعد انتهاء الصوت
      };
    }
  };

  return (
    <div className="page1-img-wrapper"
          onClick={handleImageClick}
          style={{ backgroundImage: `url(${page25})` }}>
      {/* <img
        src={page25}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index
              ? "highlight"
              : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            setActiveAreaIndex(index); // لتثبيت الهايلايت أثناء الصوت
            playSound(area.sound);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit8_Page2;
