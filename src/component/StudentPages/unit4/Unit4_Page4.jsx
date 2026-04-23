import React, { useState, useRef } from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 31.png";
import "./Unit4_Page4.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 4/P 31/gram2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_2.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 31/Pg31_3.1_Boy.mp3";

import video from "../../../assets/videos/grade 3 unit 4 page 31.mp4";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit4_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0.239, end: 5.0, text: "Page 31, exercise two, write grammar." },

    { start: 5.0, end: 6.139, text: "What season is it?" },
    { start: 6.139, end: 7.859, text: "It's spring." },
    { start: 7.859, end: 9.579, text: "It's summer." },
    { start: 9.579, end: 11.479, text: "It's autumn." },
    { start: 11.479, end: 13.979, text: "It's winter." },

    { start: 13.979, end: 15.659, text: "In their country, it's hot." },
    { start: 15.659, end: 18.6, text: "They wear shorts and T-shirts." },
    { start: 18.6, end: 21.84, text: "They go to the beach and swim daily." },
    { start: 21.84, end: 23.519, text: "It's summer." },

    { start: 24.539, end: 26.539, text: "In her country, it's cold." },
    { start: 26.539, end: 29.659, text: "She wears boots and gloves." },
    { start: 29.659, end: 32.079, text: "She builds a snowman." },

    { start: 33.319, end: 34.88, text: "She plays with her friends." },

    { start: 36.139, end: 36.979, text: "It's winter." },
  ];

  const clickableAreas = [
    { x1: 6.33, y1: 9.69, x2: 51.15, y2: 20.35, sound: sound1 },
    { x1: 51.8, y1: 10.03, x2: 93.38, y2: 20.69, sound: sound2 },
    { x1: 6.12, y1: 34.4, x2: 52.01, y2: 41.5, sound: sound3 },
    { x1: 6.12, y1: 65.53, x2: 56.11, y2: 72.13, sound: sound4 },
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
      style={{ backgroundImage: `url(${page_4})` }}
    >
      {/* <img
        src={page_4}
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
        className="headset-icon-CD-unit4-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit4-page4-1 hover:scale-110 transition"
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

export default Unit4_Page4;
