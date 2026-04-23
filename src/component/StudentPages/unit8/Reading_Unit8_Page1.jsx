import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 74.png";
import React, { useState, useRef } from "react";
import "./Reading_Unit8_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 74/unit8-pg74-readingall.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 74/Pg74_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/reading/grade 3 unit 8 page 74-75 reading.mp4";

const Reading_Unit8_Page1 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.26,
      end: 63.66,
      text: "Page 74, Reading. Where's Hansel's camera? Last week, Hansel was at his friend's birthday party. There were many children at the party for Philip's birthday. Hansel wanted to take a picture with his camera. Oh, no! cried Hansel. What's wrong? asked Philip. I want to take some pictures, but I can't find my camera anywhere. I forgot where I put it, complained Hansel. Philip said, I'll help you look for your camera. What does it look like? It's white, and it has a long band, replied Hansel. Can you help us, Mom? asked Philip. We are looking for Hansel's camera. Philip's mom said, Sure, boys. I saw Stella taking a picture of her friends with a camera. That might be Hansel's camera. Thanks, Mom, said Philip. Stella was looking at some pictures she had taken with her camera. She said happily, Look, Hansel, I took some nice pictures. Do you want to look at them?",
    },

    {
      start: 64.67,
      end: 78.12,
      text: "No, Stella, not right now. I'm looking for my camera. Have you seen it? asked Hansel. Did you find your camera yet, Hansel? Philip asked. No, I didn't, answered Hansel. I guess it's lost.",
    },

    {
      start: 79.37,
      end: 93.98,
      text: "Have you found your camera, Hansel? asked Philip's mom. No, Mrs. Dewey. I believe I saw Harley taking a picture of Sarah with a camera, said Mrs. Dewey. I'll go find them. Thanks, Mrs. Dewey, replied Hansel.",
    },

    {
      start: 95.1,
      end: 99.74,
      text: "Sarah, that's my camera. How did you get it? asked Hansel, relieved.",
    },

    {
      start: 100.8,
      end: 122.74,
      text: "Harley found it in the grass. He took some pictures, then he gave it to me to hold. Here you are. We didn't know this was your camera, Sarah replied happily. Thank you. I'm so happy my camera is not lost, said Hansel.",
    },
  ];
  const clickableAreas = [
    { x1: 15.32, y1: 36.26, x2: 53.03, y2: 49.97, sound: sound2 },
    { x1: 55.4, y1: 31.86, x2: 93.32, y2: 49.97, sound: sound3 },
    { x1: 15.11, y1: 81.1, x2: 52.6, y2: 94.98, sound: sound4 },
    { x1: 55.62, y1: 81.1, x2: 93.54, y2: 95.32, sound: sound5 },
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
      style={{ backgroundImage: `url(${page24})` }}
    >
      {/* <img
        src={page24}
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
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
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
                <AudioWithCaption src={sound1} captions={captionsExample} />
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
        className="pauseBtn-icon-CD-page21 hover:scale-110 transition"
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
                  <source src={video3} type="video/mp4" />
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

export default Reading_Unit8_Page1;
