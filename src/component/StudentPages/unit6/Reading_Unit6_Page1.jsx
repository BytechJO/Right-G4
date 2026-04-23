import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 56.png";
import React, { useState, useRef } from "react";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 56/unit6-pg56-readingall.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 56/Pg56_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 56/Pg56_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 56/Pg56_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 6/P 56/Pg56_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/reading/grade 3 unit 6 page 56-57. reading.mp4";

const Reading_Unit6_Page1 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.079,
      end: 3.379,
      text: "Page 56, reading. Let's go to the beach.",
    },
    {
      start: 4.42,
      end: 24.359,
      text: "It's a hot day. Harley is thinking about swimming to cool off. He asks his mom if they can go to the beach. That's a great idea. I'd like to go, too, adds Helen. Mom agrees. Mom, where are my swimming trunks? I can't find them, Harley asks, confused.",
    },
    {
      start: 25.479,
      end: 30.079,
      text: "Where are my shoes? Mom, can you help me find them? Helen shouts.",
    },
    {
      start: 31.719,
      end: 45.36,
      text: "I want to take my ball to the beach. Mom, do you know where it is? asks Hansel. Have you seen my sunglasses? Harley asks Hansel. They're next to the lamp in your bedroom, Hansel replies.",
    },
    {
      start: 46.979,
      end: 50.599,
      text: "Have you seen my swimming trunks and goggles? Hansel asks.",
    },
    {
      start: 52.02,
      end: 72.339,
      text: "Yeah, they're in the basement on the shelf above the washing machine, says Harley. Are you ready? Mom asks. We're ready, Mom! shout the three of them. Then let's go. Let's get the bags in the car, says Mom. Mom, let's take a picture of the boat, suggests Hansel.",
    },
    {
      start: 73.579,
      end: 89.86,
      text: "Mom, can we take a ride on the boat? asks Harley. Sure, boys, answers Mom. Hansel looks scared. Mom is concerned. What's wrong, Hansel? she asks. Hansel replies, I'm afraid of the sea, Mom.",
    },
    {
      start: 90.939,
      end: 107.399,
      text: "Don't worry, comforts Harley. The sea is wonderful. It just takes time to get to know it. Hansel is no longer afraid of the sea. Dad drives the boat through the water. It's a beautiful day to be out on the water in a boat. Everyone is very happy.",
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 34.57, x2: 51.31, y2: 48.61, sound: sound2 },
    { x1: 55.62, y1: 35.07, x2: 92.03, y2: 48.61, sound: sound3 },
    { x1: 15.11, y1: 84.49, x2: 51.52, y2: 95.15, sound: sound4 },
    { x1: 55.62, y1: 80.09, x2: 92.67, y2: 95.66, sound: sound5 },
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

export default Reading_Unit6_Page1;
