import React, { useState, useRef } from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 61.png";
import "./Unit7_Page4.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 7/P 61/unit7-pg61-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 61/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 61/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_4.1_Boy.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_4.2_Boy.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_5.1_Adult Lady.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 61/Pg61_6.1_Adult Lady.mp3";
import video from "../../../assets/videos/grade 3 unit 7 page 61.mp4";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit7_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0.239, end: 4.859, text: "Page 61, exercise two. Write grammar." },

    { start: 4.859, end: 6.019, text: "Can you see them?" },
    { start: 6.019, end: 10.5, text: "Yes, I can see them next to the gym." },

    { start: 10.5, end: 12.5, text: "Can you see us?" },
    {
      start: 12.5,
      end: 14.619,
      text: "Yes, I can see you behind the bus station.",
    },

    { start: 14.619, end: 15.679, text: "Can you see me?" },
    {
      start: 15.679,
      end: 19.1,
      text: "No, I can't see you between the trees.",
    },

    { start: 19.1, end: 21.059, text: "Can you see me?" },
    {
      start: 21.059,
      end: 25.0,
      text: "Yes, I can see you. You are between the trees.",
    },

    { start: 25.0, end: 27.5, text: "Where are Harley and Tom?" },
    { start: 27.5, end: 30.0, text: "They are in the music room." },

    { start: 30.0, end: 32.0, text: "Can you see them?" },
    { start: 32.0, end: 33.5, text: "Yes, I can see them." },

    { start: 33.5, end: 36.0, text: "Where are the soccer players?" },
    { start: 36.0, end: 38.5, text: "They are playing on the soccer field." },

    { start: 38.5, end: 40.44, text: "Can you see them?" },
    { start: 40.44, end: 42.0, text: "Yes, I can see them." },
  ];

  const clickableAreas = [
    { x1: 5.69, y1: 9.35, x2: 33.91, y2: 22.04, sound: sound1 }, //1
    { x1: 38.22, y1: 9.52, x2: 93.60, y2: 21.53, sound: sound2 },
    { x1: 6.77, y1: 31.35, x2: 27.66, y2:35.07, sound: sound3 },
    { x1:15.38 , y1: 56.06, x2: 46.41 , y2: 62.15, sound: sound4 },
    { x1: 62.14, y1: 25.6, x2: 94.24, y2: 36.09, sound: sound5 },
    { x1: 8.70, y1: 63.5, x2: 50.07, y2: 72.8, sound: sound6 },
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
        className="headset-icon-CD-unit5-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit5-page4-1 hover:scale-110 transition"
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

export default Unit7_Page4;
