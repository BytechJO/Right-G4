import React, { useRef, useState } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 22.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd14pg22-conversation-adult-lady-t_zVHgP3JT.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import "./Unit3_Page1.css";
import CriticalThinking from "../CriticalThinking";

const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

const captions = [
  {
    start: 0.26,
    end: 3.14,
    text: "Page 22, Conversation.",
  },
  {
    start: 3.14,
    end: 6.34,
    text: "Listen and read, then say.",
  },
  {
    start: 6.34,
    end: 9.90,
    text: "Good morning, class. How are you doing today?",
  },
  {
    start: 9.90,
    end: 13.80,
    text: "Good morning, Miss Rose. We are doing well, thanks.",
  },
  {
    start: 13.80,
    end: 18.82,
    text: "How was your birthday yesterday, Helen and Harley? Was it nice?",
  },
  {
    start: 18.82,
    end: 28.18,
    text: "It was great. I got many gifts for my birthday. I had all my friends with me. It's wonderful to spend a birthday with family and friends.",
  },
  {
    start: 28.18,
    end: 35.00,
    text: "Yeah, it was a great party. Mom made a delicious cake. I ate so many sweets. That was the best part.",
  },
  {
    start: 36.60,
    end: 40.90,
    text: "I bet you had a stomach ache after eating so many sweets.",
  },
  {
    start: 40.90,
    end: 44.84,
    text: "Not at all. I wanted to eat more, but my mom stopped me.",
  },
  {
    start: 46.24,
    end: 50.98,
    text: "And rightly so. I'm glad you had a good birthday party, Helen and Harley.",
  },
];
  const wordTimingsVoc = [
    { start: 8.8, end: 11.1 },
    { start: 11.2, end: 13.6 },
    { start: 13.94, end: 15.5 },
    { start: 16.4, end: 17.6 },

    { start: 19.04, end: 20.26 },
    { start: 21.6, end: 22.94 },
    { start: 24.2, end: 25.38 },
    { start: 26.8, end: 28.64 },

    { start: 29.719, end: 31.5 },
    { start: 32.32, end: 34.18 },
    { start: 35.06, end: 37.06 },
    { start: 37.719, end: 39.579 },
    { start: 40.36, end: 42.499 },
    { start: 43.279, end: 45.459 },

    { start: 46.259, end: 48.459 },
    { start: 49.52, end: 52.119 },
  ];

  const clickableAreas = [
    {
      x1: 9.37,
      y1: 21,
      x2: 36.37,
      y2: 25.5,
      slice: { startFrom: 6.34, stopAt: 9.8 },
    },
    {
      x1: 19.37,
      y1: 26.8,
      x2: 48.17,
      y2: 30.8,
      slice: { startFrom: 
9.90, stopAt: 13.70},
    },

    {
      x1: 66.1,
      y1: 20.5,
      x2: 92.1,
      y2: 25.9,
      slice: { startFrom:13.80
, stopAt: 18.72 },
    },
    {
      x1: 51.5,
      y1: 40.6,
      x2: 93.9,
      y2: 47.1,
      slice: { startFrom: 
18.82, stopAt: 28.08

},
    },
    {
      x1: 11.5,
      y1: 48,
      x2: 47.9,
      y2: 53.87,
      slice: { startFrom: 28.18, stopAt:34.90 },
    },
    {
      x1: 6.37,
      y1: 68.8,
      x2: 32.77,
      y2: 73.17,
      slice: { startFrom: 36.60, stopAt: 40.80 },
    },
    {
      x1: 65.6,
      y1: 49.7,
      x2: 94.1,
      y2: 54.07,
      slice: { startFrom: 40.90, stopAt: 44.74 },
    },
    {
      x1: 55.3,
      y1: 68.6,
      x2: 90.5,
      y2: 73.1,
      slice: { startFrom: 
46.24, stopAt: 50.98
 },
    },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  // تشغيل slice من الصوت الرئيسي
  const playSlice = (slice) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);

    const checkStop = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(checkStop);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    audio.onended = () => {
      clearInterval(checkStop);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_6})` }}
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
          onClick={(e) => {
            e.stopPropagation();
            setActiveAreaIndex(index);
            playSlice(area.slice);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        />
      ))}
      {/* زر الصوت الرئيسي - بيشغل الصوت كامل مع popup */}
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption src={mainSound} captions={captions} />
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      <div
        className="aaaa hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Vocabulary
                  title="VOCABULARY"
                  subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                  sound={vocSound}
                  captions={captions}
                  stopAtSecond={8.5}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "alarm",
                    "notebook",
                    "pillow",
                    "counting",
                    "face",
                    "figure",
                    "reviewing",
                    "pancakes",
                    "starving",
                    "actually",
                    "mirror",
                    "Uh-oh!",
                    "fell asleep",
                    "How did you know?",
                    "right away",
                    "on one side",
                  ]}
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>{" "}
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <CriticalThinking
                title={
                  "Why did Hansel’s mom say he could do an extra math problem?"
                }
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page6;
