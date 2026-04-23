import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 84.png";
import "./Unit10_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 10/P 84/unit10-pg84-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 84/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_2.1_Stella.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_4.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 84/Pg84_5.1_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 10 page 84.mp4";
const Unit10_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.379,
      end: 18.079,
      text: "Page 84, exercise one, write grammar. She/he will/won't plant a tree. I/you/we/they will/won't water the plants.",
    },
    {
      start: 18.079,
      end: 20.779,
      text: "I will plant flowers.",
    },
    {
      start: 20.779,
      end: 32.819,
      text: "He will build a sandcastle. He won't swim in the sea. She will go to the mall. She won't go to the grocery store. She won't go to the park. She will play at home with Stella",
    },
  ];

  const clickableAreas = [
    { x1: 5.41, y1: 7.83, x2: 81.69, y2: 20.69, sound: sound1 },
    { x1: 25.88, y1: 56.23, x2: 49.58, y2: 60.12, sound: sound2 },
    { x1: 53.03, y1: 55, x2: 83.19, y2: 60.6, sound: sound3 },
    { x1: 5.63, y1: 89.06, x2: 44.20, y2: 94.64, sound: sound4 },
    { x1: 53.03, y1: 89.90, x2:90.09, y2: 96.33, sound: sound5 },
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
        className="headset-icon-CD-unit10-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit10-page3-1 hover:scale-110 transition"
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

export default Unit10_Page3;
