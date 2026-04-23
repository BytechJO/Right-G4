import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 78.png";
import "./Unit9_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 9/P 78/unit9-pg78-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_4.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_5.1_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 9/P 78/Pg78_6.1_Adult Lady.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 9 page 78.mp4";
const Unit9_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.099,
      end: 9.519,
      text: "Page 78, exercise one. Write grammar. Now. He, she, it is.",
    },
    { start: 10.539, end: 14.279, text: "We, they, you are." },
    { start: 15.399, end: 17.819, text: "I am. Yesterday." },
    { start: 18.879, end: 22.279, text: "He, she, it was." },
    { start: 23.34, end: 27.219, text: "We, they, you were." },
    {
      start: 28.359,
      end: 51.639,
      text: "I was. Where is Stella right now? She is at the zoo. Where is she at the moment? She is shopping in the store. Where are the art students now? The students are in art class painting. Are they at the theater now? No, they aren't. They are running in a race",
    },
  ];

  const clickableAreas = [
    { x1: 12.52, y1: 8.5, x2: 44.41, y2:21.53, sound: sound1 },
    { x1: 58.63, y1: 8.5, x2: 90.09, y2: 21.7, sound: sound2 },
    { x1: 17.48, y1: 52.5, x2: 47.86, y2: 58.93, sound: sound3 },
    { x1: 5.20, y1: 63, x2:49.15, y2: 69.43, sound: sound5 },
    { x1: 50.88, y1: 49.12, x2: 67.68, y2: 60.29, sound: sound4 },
    { x1: 60.57, y1: 62.15, x2:94.61, y2: 69.6, sound: sound6 },
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
        className="headset-icon-CD-unit9-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit9-page3-1 hover:scale-110 transition"
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

export default Unit9_Page3;
