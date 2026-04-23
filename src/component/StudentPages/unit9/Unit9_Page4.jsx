import React, { useState, useRef } from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 79.png";
import "./Unit9_Page4.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 9/P 79/unit9-pg79-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 79/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 79/Pg79_3.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 79/Pg79_4.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 79/Pg79_5.1_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 9/P 79/Pg79_6.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 9 page 79.mp4";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit9_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.299,
      end: 9.059,
      text: "Page seventy-nine, exercise two. Write grammar. Now, where is he, she, it?",
    },
    { start: 10.199, end: 13.559, text: "Where are we, they, you?" },
    { start: 14.819, end: 15.5, text: "Yesterday." },
    { start: 16.819, end: 20.419, text: "Where was he, she, it?" },
    {
      start: 21.459,
      end: 35.619,
      text: "Where were we, they, you? Is he, she, it in the pool now? Are we, they, you in the pool now?",
    },
    {
      start: 36.779,
      end: 68.68,
      text: "Was he, she, it in the pool yesterday? Were we, they, you in the pool yesterday? Where was Hansel last week? He was at the circus. Where was Hansel yesterday? He was at the beach. Was Sarah at home last night? Yes, she was. Was Sarah at the library a week ago? No, she wasn't. She was at the playground",
    },
  ];

  const clickableAreas = [
    { x1: 5.90, y1: 7.83, x2:94.46, y2: 27.46, sound: sound1 },
    { x1: 5.47, y1: 34.73, x2: 38.22, y2: 40.49, sound: sound2 },
    { x1: 47.70, y1: 34.4, x2: 82.61, y2: 41.17, sound: sound3 },
    { x1: 8.92, y1: 65.2, x2: 43.61, y2: 71.63, sound: sound4 },
    { x1: 47.06, y1: 65.03, x2: 94.67, y2: 71.29, sound: sound5 },
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
        className="headset-icon-CD-unit9-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit9-page4-1 hover:scale-110 transition"
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

export default Unit9_Page4;
