import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 30.png";
import "./Unit4_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 4/P 30/greammerp30.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 30/Pg30_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 30/Pg30_1.4_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 30/Pg30_2.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 30/Pg30_3.1_Older Boy.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 4 page 30.mp4";
const Unit4_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0.219, end: 3.38, text: "Page 30, exercise 1.Write grammar." },
    { start: 4.32, end: 5.78, text: " What's the weather like today?" },

    {
      start: 6.92,
      end: 8.679,
      text: "What's the weather like in your country?",
    },

    {
      start: 9.96,
      end: 13.739,
      text: "What's the weather like in May? It's rainy.",
    },

    { start: 13.739, end: 15.939, text: "In my country, it's often warm." },
    { start: 16.719, end: 19.159, text: "We can see flowers and baby birds." },
    {
      start: 20.039,
      end: 23.079,
      text: "We usually go to the park. It's spring.",
    },

    { start: 24.1, end: 26.099, text: "In his country, it's often cool." },
    { start: 26.42, end: 28.999, text: "He wears a jacket and warm clothing." },
    {
      start: 29.059,
      end: 32.459,
      text: "The wind often blows his cap away. It's autumn",
    },
  ];

  const clickableAreas = [
    { x1: 6.49, y1: 9.69, x2: 65.1, y2: 20.69, sound: sound1 },
    { x1: 65.31, y1: 10.2, x2: 92.46, y2: 20.01, sound: sound2 },
    { x1: 32.56, y1: 35.24, x2: 83.19, y2: 42.84, sound: sound3 },
    {  x1: 45.70 , y1: 65.53, x2: 93.75, y2: 72.81, sound: sound4 },
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
        className="headset-icon-CD-unit4-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit4-page3-1 hover:scale-110 transition"
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

export default Unit4_Page3;
