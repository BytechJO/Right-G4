import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 24.png";
import "./Unit3_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 3/P 24/fullAudio.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_1.4_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_5.1_Lala.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_5.2_Lala's Mom.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_6.1_Lala.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_6.2_Lala's Mom.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_7.1_Lala.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 3/P 24/Pg24_7.2_Lala's Mom.mp3";


import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 3 page 24.mp4";
const Unit3_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.0,
      end: 3.67,
      text: "Page 24, exercise one. Write grammar.",
    },
    {
      start: 4.1,
      end: 7.42,
      text: " Do you, we, they, have any caps?",
    },
    {
      start: 8.2,
      end: 13.2,
      text: "Yes, I, we, they, do have some. ",
    },
    {
      start: 14.32,
      end: 18.12,
      text: "No, I, we, they, don't have any.",
    },
    {
      start: 19.06,
      end: 22.86,
      text: "Does he, she, have any fruit?",
    },
    {
      start: 22.86,
      end: 26.0,
      text: "Does he, she, have a ball?",
    },
    {
      start: 27.04,
      end: 29.98,
      text: "Does it have any fruit? ",
    },
    {
      start: 30.1,
      end: 32,
      text: " Does it have a ball?",
    },
    {
      start: 32.78,
      end: 35.58,
      text: "Yes, he, she, has some.",
    },
    {
      start: 36.2,
      end: 40.14,
      text: "Yes, he, she, has one.",
    },
    {
      start: 41.2,
      end: 43.66,
      text: "No, it hasn't any.",
    },
    {
      start: 44.86,
      end: 48.08,
      text: "No, it hasn't one.",
    },
    {
      start: 48.08,
      end: 51.24,
      text: "Do we have any fruit in the fridge, Mom?",
    },
    {
      start: 51.24,
      end: 53.1,
      text: "Yes, we do have some.",
    },
    {
      start: 53.1,
      end: 56.12,
      text: "Do we have any orange juice, Mom?",
    },
    {
      start: 56.12,
      end: 58.4,
      text: "Yes, we do have some.",
    },
    {
      start: 58.4,
      end: 60.78,
      text: "Do we have any carrots?",
    },
    {
      start: 60.78,
      end: 62.14,
      text: "No, we don't have any.",
    },
  ];

  const clickableAreas = [
    { x1: 6.5, y1: 10, x2: 49, y2: 15.0, sound: sound1 },
    { x1: 53, y1: 9, x2: 92, y2: 15, sound: sound2 },
    { x1: 6.5, y1: 15.8, x2: 49, y2: 29, sound: sound3 },
    { x1: 53.5, y1: 16.7, x2: 92, y2: 27.8, sound: sound4 },
    { x1: 5.5, y1: 29, x2: 37, y2: 34, sound: sound5 },
    { x1: 25.5, y1: 35, x2:51.5, y2: 38.5, sound: sound6 },
    { x1: 53.5, y1: 30, x2:94, y2: 34, sound: sound7 },
    { x1: 67, y1: 57.9, x2:93.5, y2: 61.5, sound: sound8 },
    { x1: 6.5, y1: 73.5, x2: 27, y2: 79, sound: sound9},
    { x1: 44.5, y1: 63.5, x2:70.7, y2: 67, sound: sound10 },
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
        className="headset-icon-CD-unit3-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit3-page3-1 hover:scale-110 transition"
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

export default Unit3_Page3;
