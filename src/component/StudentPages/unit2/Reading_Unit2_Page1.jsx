import page24 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 20.png";
import React, { useState, useRef } from "react";
import "./Reading_Unit2_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 20/unit2-pg20-readingall.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 2/P 20/Pg20_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 2/P 20/Pg20_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 2/P 20/Pg20_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 2/P 20/Pg20_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/reading/grade 3 unit 2 page 20-21 reading.mp4";

const Reading_Unit2_Page1 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0.44,
      end: 21.94,
      text: 'Page 20, Reading. Helen and Her Questions. This is Helen. She always asks questions. "Which is bigger, Mom, the elephant or the cat?" asks Helen. Mom answers, "The elephant is bigger." "Which is longer, the bus or the train?" Helen asks her dad.',
    },
    {
      start: 22.98,
      end: 37.98,
      text: '"The train is longer. Trains can be quite long. Some are over three kilometers long," says Dad. "Wow," says Helen. She asks Stella, "Where do you travel on your vacations?"',
    },
    {
      start: 39.04,
      end: 51.74,
      text: '"We often travel to Italy. We never visit Russia because it\'s too cold. It\'s one of the coldest countries in the world," replies Stella. "What do you do on the weekend, Tom?" asks Helen.',
    },
    {
      start: 52.769,
      end: 62.05,
      text: '"I always go fishing with my dad and uncle. Dad is a good fisherman. He catches lots of fish. I catch fish sometimes, too," Tom says.',
    },
    {
      start: 63.1,
      end: 74.92,
      text: 'Helen sees John walking to school. She asks him, "How do you go to school?" John says, "I often walk to school. I rarely take the bus to school."',
    },
    {
      start: 76.02,
      end: 81.78,
      text: "Helen sees Tom riding in a taxi to school. Sarah and Jack take a bus to school.",
    },
    {
      start: 83.05,
      end: 124.62,
      text: '"What\'s your favorite TV show, Jack?" asks Helen. Jack explains, "I usually watch sports on TV. I never watch movies or the news. My dad likes watching news programs." Helen says, "I like nature programs. There is so much to learn. I learned that a deer runs faster than a polar bear, and that dolphins and monkeys are the most intelligent animals." "Which is more intelligent?" asks Jack. "They\'re the same," answers Helen. Helen hopes to be a news reporter one day so she can interview people and ask questions. That\'s Helen\'s biggest dream.',
    },
  ];
  const clickableAreas = [
    { x1: 15.9, y1: 39.4, x2: 51.14, y2: 50.0, sound: sound2 },
    { x1: 55.83, y1:37.95, x2:93.81, y2: 50.29, sound: sound3 },
    { x1: 16.0, y1: 84.0, x2: 52.9, y2: 95.5, sound: sound4 },
    { x1: 56.0, y1: 83.5, x2: 93.7, y2: 95.9, sound: sound5 },
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

export default Reading_Unit2_Page1;
