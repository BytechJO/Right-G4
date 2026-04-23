import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 25.png";
import "./Unit3_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 3/P 25/fullAudio.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_2.4_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_3.1_Lala.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_3.2_Lala's Mom.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_4.1_Lala.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_4.2_Lala's Mom.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_5.1_Lala.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 3/P 25/Pg25_5.2_Lala's Mom.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 3 page 25.mp4";
const Unit3_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.0,
      end: 3.67,
      text: "Page 25, exercise one. Write grammar.",
    },
    {
      start: 4.3,
      end: 7.9,
      text: " Do you, we, they have any Jell-O?",
    },
    {
      start: 9.26,
      end: 13.88,
      text: "Do you, we, they have any muffins? ",
    },
    {
      start: 14.52,
      end: 17.54,
      text: "I, we, they have a little. ",
    },
    {
      start: 18.66,
      end: 23.16,
      text: "Does he, she, it have any Jell-O?",
    },
    {
      start: 24.24,
      end: 29.04,
      text: "Does he, she, it have any muffins?",
    },
    {
      start: 29.44,
      end: 33.06,
      text: "He, she, it has a few. ",
    },
    {
      start: 33.54,
      end: 35,
      text: "Mom, it's very hot.",
    },
    {
      start: 35.22,
      end: 37.88,
      text: "Do we have any Jell-O in the fridge?",
    },
    {
      start: 37.88,
      end: 40.14,
      text: "Yes, we have a little.",
    },
    {
      start: 40.14,
      end: 44.52,
      text: "I'm very hungry. Do we have any muffins to eat? ",
    },
    {
      start: 44.52,
      end: 47.54,
      text: "Yes, we have a few muffins over there. ",
    },
    {
      start: 47.54,
      end: 50.78,
      text: "Mom, do we have any balls in the fridge? ",
    },
    {
      start: 50.78,
      end: 55.8,
      text: "No, we don't have any balls in the fridge. The fridge is only for food",
    },
  ];

  const clickableAreas = [
    { x1: 5.5, y1: 8, x2: 55, y2:15, sound: sound1 },
    { x1: 58, y1: 8, x2: 94, y2: 15, sound: sound2 },
    { x1: 5.5, y1: 14.4, x2: 55, y2: 20, sound: sound3 },
    { x1: 58, y1: 14.4, x2: 94, y2: 20, sound: sound4 },
    { x1: 5, y1: 32, x2: 24, y2: 41, sound: sound5 },
    { x1: 24, y1: 57, x2: 48, y2: 60.5, sound: sound6 },
    { x1: 47.49 , y1: 32.53, x2: 72, y2: 39.98, sound: sound7 },
    { x1: 60.41, y1: 55.72, x2: 93.81, y2: 60.29, sound: sound8 },
    { x1: 13.66, y1: 68.75, x2: 39.08, y2: 73.32, sound: sound9 },
    { x1: 51.15, y1: 90.58, x2: 96.18, y2: 95.49, sound: sound10 },
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

export default Unit3_Page4;
