import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 60.png";
import "./Unit7_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 7/P 60/unit7-pg60-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 60/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 60/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_3.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_4.1_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_5.1_Boy.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 60/Pg60_5.2_Girl.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 7 page 60.mp4";
const Unit7_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0.379, end: 3.5, text: "Page 60, exercise one. Write grammar." },

    { start: 3.5, end: 6.5, text: "Can you see him?" },
    {
      start: 6.5,
      end: 10.659,
      text: "Yes, I can see him in the computer lab.",
    },

    { start: 11.859, end: 13.5, text: "Can you see her?" },
    {
      start: 13.5,
      end: 16.659,
      text: "Yes, I can see her sitting in the lunchroom.",
    },

    { start: 17.859, end: 19.5, text: "Can you see it?" },
    {
      start: 19.5,
      end: 23.5,
      text: "No, I can't see it in front of the library.",
    },

    { start: 23.5, end: 26.0, text: "Can you see Stella?" },
    { start: 26.0, end: 27.8, text: "Yes, I can see her." },
    { start: 27.8, end: 29.5, text: "Where is she?" },
    { start: 29.5, end: 31.319, text: "She's in the school cafeteria." },

    { start: 32.5, end: 34.5, text: "Can you see Hansel?" },
    { start: 34.5, end: 36.5, text: "No, I can't see him." },
    { start: 36.5, end: 38.52, text: "Where is he?" },
    { start: 38.52, end: 40.5, text: "He is in the computer lab." },

    { start: 40.5, end: 42.239, text: "Can you see the library?" },
    { start: 42.239, end: 43.0, text: "I can't see it." },
    { start: 43.0, end: 43.459, text: "It's on the first floor." },
  ];

  const clickableAreas = [
    { x1: 5.63, y1: 9.35, x2: 34.07, y2: 22.38, sound: sound1 },
    { x1: 38.16, y1: 9.52, x2: 94.4, y2: 22.38, sound: sound2 },
    { x1: 58.5, y1: 26.8, x2: 87.6, y2: 36.0, sound: sound3 },
    { x1: 5.84, y1: 25.6, x2: 37.73, y2: 35.92, sound: sound4 },
    { x1: 59.49, y1: 25.6, x2: 89.66, y2: 36.26, sound: sound5 },
    { x1: 5.63, y1: 66.04, x2: 47.86, y2: 69.93, sound: sound6 },
    { x1: 31.48, y1: 92.27, x2: 54.32, y2: 95.83, sound: sound7 },
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
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_3})` }}
    >
      {/* <img
        src={page_3}
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

      <div
        className="headset-icon-CD-unit5-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption
                  src={grammarSound}
                  captions={captionsExample}
                />
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="pauseBtn-icon-CD-unit5-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "video",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <video
                  autoPlay
                  controls
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                  }}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Unit7_Page3;
