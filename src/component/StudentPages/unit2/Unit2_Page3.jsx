import React, { useState, useRef } from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 12.png";
import "./Unit2_Page3.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 2/P 12/unit2-pg12-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_2.1_Helen.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_2.2_Tom.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_3.1_Helen.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_3.2_Helen's Mom.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_4.1_Helen.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 2/P 12/Pg12_4.2 _Tom.mp3";

import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 2 page 12.mp4";
const Unit2_Page3 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.399,
      end: 9.0,
      text: "Page 12, exercise 1. Write grammar. How do you/they/we go to school?",
    },
    {
      start: 10.179,
      end: 14.899,
      text: "How do you/they/we go to the mall?",
    },
    {
      start: 16.02,
      end: 20.659,
      text: "How does he/she/it go to school?",
    },
    {
      start: 21.979,
      end: 31.519,
      text: "How does he/she/it go to the mall? I/they/we go to school by bus.",
    },
    {
      start: 32.86,
      end: 37.0,
      text: "I/they/we go to school by car.",
    },
    {
      start: 38.459,
      end: 42.84,
      text: "I/they/we go to the mall by taxi.",
    },
    {
      start: 44.139,
      end: 47.799,
      text: "I/they/we go to the mall by bike.",
    },
    {
      start: 48.919,
      end: 52.899,
      text: "He/she/it goes to school by bus.",
    },
    {
      start: 53.959,
      end: 58.279,
      text: "He/she/it goes to school by car.",
    },
    {
      start: 59.299,
      end: 64.119,
      text: "He/she/it goes to the mall by taxi.",
    },
    {
      start: 65.199,
      end: 69.799,
      text: "He/she/it goes to the mall by bike.",
    },
    {
      start: 71.059,
      end: 72.159,
      text: "How do they go to school?",
    },
    {
      start: 73.26,
      end: 75.919,
      text: "They go to school by bus.",
    },
    {
      start: 75.919,
      end: 77.439,
      text: "How do you go to the mall, mom?",
    },
    {
      start: 78.659,
      end: 80.459,
      text: "I go to the mall by taxi.",
    },
    {
      start: 81.559,
      end: 82.939,
      text: "How does she go to school?",
    },
    {
      start: 84.04,
      end: 85.639,
      text: "She goes to school by car.",
    },
  ];

  const clickableAreas = [
    { x1: 14.25, y1: 8, x2: 86.86, y2: 16.27, sound: sound1 },
    { x1: 14.26, y1: 17.08, x2: 87.26, y2: 27.94, sound: sound2 },
    { x1: 5.48, y1: 38.22, x2: 25.25, y2: 43.38, sound: sound3 },
    { x1: 33.1, y1: 59.82, x2: 50.89, y2: 65.37, sound: sound4 },
    { x1: 50.37, y1: 39.07, x2: 88.56, y2: 43.38, sound: sound5 },
    { x1: 73.65, y1: 63.93, x2: 92.49, y2: 68.86, sound: sound6 },
    { x1: 5.63, y1: 68.25, x2: 38.07, y2: 71.74, sound: sound7 },
    { x1: 50.63, y1: 81.4, x2: 68.42, y2: 86.54, sound: sound8 },
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
        className="headset-icon-CD-unit2-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit2-page3-1 hover:scale-110 transition"
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

export default Unit2_Page3;
