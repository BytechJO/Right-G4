import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 38.png";
import React, { useState, useRef } from "react";
import "./Reading_Unit4_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 38/full.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 38/Pg38_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 38/Pg38_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 38/Pg38_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 4/P 38/Pg38_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/reading/grade 3 unit 4 page 38-39 reading.mp4";

const Reading_Unit4_Page1 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.259,
      end: 30.139,
      text: "Page thirty-eight, Reading: Our African Safari. Stella's mom and dad are planning a summer trip. The weather is warm. They are going on an African safari in June. The family is excited. Stella exclaims, Look, Mom, there is a lion. The lion growls. Does it want cookies? asks Sarah. No way! shouts John. Lions eat meat. Look, it's eating some meat now.",
    },
    {
      start: 31.319,
      end: 52.939,
      text: "Wow, look at that peacock, says John. It has wonderful colors, adds Stella. Does it want some grapes? Sarah asks. Yes, give it some, answers Mom. Look at the monkeys in the trees, shouts John. Do they want some bananas? Sarah asks.",
    },
    {
      start: 54.099,
      end: 63.119,
      text: "No, they have bananas in the trees, says Dad. They have plenty to eat. I want to feed them some apples, says Sarah.",
    },
    {
      start: 65.379,
      end: 75.519,
      text: "They don't want any apples, Sarah. They only want bananas, replies Stella. Hey, here come some elephants. They're awesome, says John.",
    },
    {
      start: 77.379,
      end: 101.699,
      text: "Give them some peanuts, says Mom. Yes, Mom. Look, they're eating from the bucket, shouts Sarah and Stella. I'm hungry, Mom, Sarah says. I'm hungry too, adds John. Oh, no, cries Dad. We don't have any food. Well, it's fun. We don't have food, but we have friends, laughs Mom.",
    },
  ];
  const clickableAreas = [
    { x1: 15.26, y1: 35.78, x2: 51.62, y2: 48.0, sound: sound2 },
    { x1: 56.0, y1: 35.98, x2: 92.44, y2: 48.0, sound: sound3 },
    { x1: 16.0, y1: 84.0, x2: 51.9, y2: 95.5, sound: sound4 },
    { x1: 56.0, y1: 84.5, x2: 93.7, y2: 94.9, sound: sound5 },
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

export default Reading_Unit4_Page1;
