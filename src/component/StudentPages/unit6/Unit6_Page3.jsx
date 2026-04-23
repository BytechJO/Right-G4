import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 48.png";
import "./Unit6_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 6/P 48/unit6-pg48-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 48/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 48/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 48/Pg48_2.1_Hansel.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 48/Pg48_2.2_Tom.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 6/P 48/Pg48_3.1_Stella.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 6/P 48/Pg48_3.2_Jack.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 6 page 48.mp4";
const Unit6_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.079,
      end: 14.199,
      text: "Page 48, exercise one, write grammar. What month is it? It's February. Is it the first month of the year? Yes, it is. No, it isn't.",
    },
    {
      start: 14.199,
      end: 16.039,
      text: "What month is it?",
    },
    {
      start: 16.039,
      end: 18.219,
      text: "It's February.",
    },
    {
      start: 18.219,
      end: 20.18,
      text: "Is it the fourth month of the year?",
    },
    {
      start: 21.279,
      end: 24.44,
      text: "No, it isn't. It's the 11th month of the year",
    },
  ];

  const clickableAreas = [
    { x1: 6.28, y1: 8.67, x2:45.92, y2: 19.17, sound: sound1 },
    { x1:58.20, y1: 8.67, x2:94.18, y2: 18.49, sound: sound2 },
    { x1: 15.11, y1: 38.12, x2: 35.6, y2: 20.0, sound: sound3 },
    { x1: 66.82, y1: 51.83, x2: 82.76, y2: 55.38, sound: sound4 },
    { x1: 7.35 , y1: 62.83, x2:45.06, y2: 67.56, sound: sound5 },
    { x1: 43.77, y1: 68.58, x2: 74.58, y2:74.33, sound: sound6 },
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
        className="headset-icon-CD-unit6-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit6-page3-1 hover:scale-110 transition"
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

export default Unit6_Page3;
