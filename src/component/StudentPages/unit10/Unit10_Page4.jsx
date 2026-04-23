import React, { useState, useRef } from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 85.png";
import "./Unit10_Page4.css";
import grammarSound from "../../../assets/audio/ClassBook/Unit 10/P 85/unit10-pg84-grammar2.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 85/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 85/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 85/Pg85_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 85/Pg85_3.2_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 85/Pg85_4.1_Adult Lady.mp3";

import video from "../../../assets/videos/grade 3 unit 10 page 85.mp4";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit10_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captions = [
    {
      start: 0.14,
      end: 16.619,
      text: "Page 85, exercise two, write grammar. What will they do on the weekend? What will we do on the weekend? What will you do on the weekend? What will she do on the weekend? What will he do on the weekend?",
    },
    {
      start: 19.02,
      end: 41.079,
      text: "What will they do this weekend? What will we do this weekend? What will you do this weekend? What will she do this weekend? What will he do this weekend? They will go to the beach. We will go to the beach. You will go to the beach. She will go to the beach. He will go to the beach.",
    },
    {
      start: 42.139,
      end: 48.179,
      text: "They won't swim in the sea. We won't swim in the sea. You won't swim in the sea.",
    },
    {
      start: 49.219,
      end: 67.5,
      text: "She won't swim in the sea. He won't swim in the sea. What will they do this weekend? They will go to the beach. They will play soccer in the sand. They won't swim in the sea. What will she do this weekend? She'll watch a movie. She won't go to the mall.",
    },
  ];

  const clickableAreas = [
    { x1: 5.9, y1: 8.0, x2: 53.09, y2: 21.53, sound: sound1 },
    { x1: 54.38, y1: 8.0, x2: 94.67, y2: 22.04, sound: sound2 },
    { x1: 6.98, y1: 30.84, x2: 43.61, y2: 34.23, sound: sound3 },
    { x1: 56.54, y1: 56.23, x2: 93.81, y2: 64.32, sound: sound4 },
    { x1: 6.12, y1: 65.7, x2: 45.12, y2: 74.16, sound: sound5 },
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
        className="headset-icon-CD-unit10-page4-1 hover:scale-110 transition"
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
                <AudioWithCaption src={grammarSound} captions={captions} />
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
        className="pauseBtn-icon-CD-unit10-page4-1 hover:scale-110 transition"
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

export default Unit10_Page4;
