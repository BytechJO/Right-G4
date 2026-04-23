import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 92.png";
import React, { useState, useRef } from "react";
import "./Reading_Unit10_Page2.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 92/unit10-pg92-reading.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 92/Pg92_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 92/Pg92_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 92/Pg92_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 92/Pg92_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/reading/grade 3 unit 10 page 94-95 reading.mp4";

const Reading_Unit10_Page1 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.2,
      end: 82.98,
      text: "Page 92 reading. Helen learns a lesson. It was winter. Everyone was outside. Stella and the boys had a snowball fight. Helen and her friend made a snowman. While Helen and her friend were making a snowman, Helen's cat, Mimi, walked into the woods. Helen couldn't find her cat anywhere. Helen was feeling sad. There was a man walking near the bridge. He called to Helen. Are you looking for something? Yes, I'm looking for my brown cat. Have you seen it? No, I haven't, the man answered. Helen saw her classmate, Lana. Hi, Helen. How are you? asked Lana. I'm okay, but I've lost my cat, Mimi. I've been looking everywhere for her. I'm sorry. I haven't seen your cat, but I'll help you look for her, said Lana. Helen and Lana saw cat tracks. They went up the hill. The snow was deep. They walked on and on. Hey, that's my grandma's house, shouted Helen excitedly. That's great, replied Lana. I can't wait to see my grandma, said Helen happily. Grandma said, Hello, Helen and Lana. It's good to see you both. Come inside. It's very cold outside.",
    },
    {
      start: 84.1,
      end: 101.7,
      text: "Grandma, it's good to see you, too. I've lost Mimi. What should I do? I have some good news. Mimi is right here with me. Come and see her, said Grandma. Helen said, Thanks so much, Grandma. I'm so happy to see Mimi.",
    },
    {
      start: 102.77,
      end: 112.399,
      text: "How was your day? Grandma asked. It was fun, Grandma. We played in the snow and made a snowman. Then we lost Mimi, said Helen.",
    },
    {
      start: 113.94,
      end: 125.22,
      text: "It's good that you had your friend to help you, said Grandma. We learned to help each other, said Lana. I learned to take better care of my cat, added Helen.",
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 38.8, x2: 53.03, y2: 49.46, sound: sound2 },
    { x1: 55.62, y1: 39.13, x2: 92.46, y2: 49.29, sound: sound3 },
    { x1: 15.32, y1: 79.24, x2: 52.17, y2: 96, sound: sound4 },
    { x1: 55.62, y1: 84.32, x2: 93.11, y2: 96.9, sound: sound5 },
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

export default Reading_Unit10_Page1;
