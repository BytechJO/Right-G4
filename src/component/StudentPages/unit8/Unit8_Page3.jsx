import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 66.png";
import "./Unit8_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 8/P 66/unit8-pg66-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 66/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 66/Pg66_2.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 66/Pg66_3.1_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 8 page 66.mp4";
const Unit8_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.299,
      end: 9.96,
      text: "Page 66, exercise one. Write grammar. I, he, she, it was.",
    },
    { start: 11.239, end: 12.699, text: "It was sunny yesterday." },
    { start: 13.979, end: 17.879, text: "They, we, you were." },
    {
      start: 20.319,
      end: 34.819,
      text: "I, he, she, it, they, we, you had, plus noun. They, we, you were.",
    },
    {
      start: 36.139,
      end: 47.659,
      text: "We were at the beach. I, he, she, it, they, we, you had, plus noun.",
    },
    {
      start: 48.959,
      end: 58.259,
      text: "Did I, he, she, it, they, we, you have, plus noun?",
    },
    { start: 59.399, end: 60.619, text: "She had a kite." },
    {
      start: 61.799,
      end: 84.279,
      text: "Did she have a robot? She didn't have a robot. The farm was very old. The cottage on the farm was built a long time ago. It had several windows, a big door, and a chimney. Near the cottage was a mill. Tom's grandparents had a radio, but not a TV. There was a rug on the floor, but no carpet",
    },
  ];

  const clickableAreas = [
    { x1: 5.63, y1: 8.17, x2: 93.97, y2: 32.37, sound: sound1 },
    { x1: 7.14, y1:55.72, x2: 68.54, y2: 64.35, sound: sound2 },
    { x1: 7.14, y1: 66.55, x2: 45.27, y2: 75.0, sound: sound3 },
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
        className="headset-icon-CD-unit8-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit8-page3-1 hover:scale-110 transition"
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

export default Unit8_Page3;
