import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46.png";
import "./Unit6_Page1.css";
import Unit6_Page1_find from "./Unit6_Page1_find";
import Unit6_Page1_Vocab from "./Unit6_Page1_Vocab";
import Unit6_Page1_Read from "./Unit6_Page1_Read";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allunit4 from "../../../assets/audio/ClassBook/Unit 6/P 46/unit6-pg46-allunit.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound13.mp3";

const Unit6_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.26,
      end: 17.3,
      text: "Page 46, Unit 6. Let's run. Page 46, Unit 6, Vocabulary. One, rainbow. Two, cloud. Three, bird. Four, winner.",
    },
    {
      start: 18.36,
      end: 27.6,
      text: "Five, cheer. Six, tired. Seven, stumble. Eight, run.",
    },
    {
      start: 28.66,
      end: 33.16,
      text: "Nine, race. 10, last.",
    },
    {
      start: 34.22,
      end: 41.6,
      text: "11, swing. 12, finish line. 13, first.",
    },
    {
      start: 42.72,
      end: 45.86,
      text: "Page 46, Listen and Read Along.",
    },
    {
      start: 47.02,
      end: 61.18,
      text: "FL, PL, SL. Flag, play, sleep. Page 47, Reading. Listen and Read Along. I love my garden.",
    },
    {
      start: 61.18,
      end: 96.7,
      text: "Welcome to my garden. Do you like it? Gardening is one of my favorite hobbies. Seeing bright colors in my garden makes me feel happy. Today is Saturday, and I'm planting a young tree in my garden. I hope it will grow very tall. I usually begin planting a little before springtime. March and April are the perfect months for planting. I must water my garden regularly to keep my plants healthy. I recommend that everyone start a garden. It's so much fun.",
    },
    {
      start: 96.7,
      end: 101.46,
      text: "Page 47, Listen, Read, and Repeat.",
    },
    {
      start: 101.46,
      end: 106.44,
      text: "We must water the plants. We must also give them sun.",
    },
    {
      start: 106.44,
      end: 116.6,
      text: "Page 47, Listen and Read Along. FL, PL, SL. Fly, plum, slide.",
    },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 43.7, y1: 13.1, sound: 1, isPrimary: true },
    { x1: 15.76, y1: 11.41, x2: 59.06, y2: 21.2, sound: 1, isPrimary: false },

    // الصوت الثاني – 27
    { x1: 65.2, y1: 23, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 62.51, y1: 20.86, x2: 74.14, y2: 28.3, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 31.25, y1: 23.6, sound: 3, isPrimary: true },

    // الصوت الرابع – الأساسية
    { x1: 35.1, y1: 52.3, sound: 4, isPrimary: true },
    { x1: 26.53, y1: 46.07, x2: 39.67, y2: 54.87, sound: 4, isPrimary: false },

    // الصوت الخامس – الأساسية
    { x1: 87.2, y1: 50.45, sound: 5, isPrimary: true },
    { x1: 82.33, y1: 44.21, x2: 90.74, y2: 55.21, sound: 5, isPrimary: false },

    // الصوت السادس – الأساسية
    { x1: 54.2, y1: 51.9, sound: 6, isPrimary: true },
    { x1: 49.58, y1: 47.6, x2: 60.57, y2: 54.7, sound: 6, isPrimary: false },

    // الصوت السابع – الأساسية
    { x1: 53.2, y1: 58.7, sound: 7, isPrimary: true },

    // الصوت الثامن – الأساسية
    { x1: 67.2, y1: 53.5, sound: 8, isPrimary: true },

    // الصوت الثامن – الإضافية
    { x1: 62.08, y1: 50.3, x2: 75.65, y2: 55.21, sound: 8, isPrimary: false },

    // الصوت التاسع – الأساسية
    { x1: 43.8, y1: 34.05, sound: 9, isPrimary: true },

    // الصوت العاشر – الأساسية
    { x1: 76.6, y1: 42.34, sound: 10, isPrimary: true },

    // الصوت الحادي عشر – الأساسية
    { x1: 69.4, y1: 36.5, sound: 11, isPrimary: true },
    { x1:  68.33, y1: 37.95, x2: 75.44, y2: 45.4, sound: 11, isPrimary: false },

    // الصوت الثاني عشر – الأساسية
    { x1: 73.3, y1: 64.6, sound: 12, isPrimary: true },

    // الصوت الثاني عشر – الإضافية
    { x1: 63.70, y1: 63.8, x2: 78.67, y2: 68.24, sound: 12, isPrimary: false },
    // الصوت الثالث عشر – الأساسية

    { x1: 33.2, y1: 56.45, sound: 13, isPrimary: true },

  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7: sound7,
    8: sound8,
    9: sound9,
    10: sound10,
    11: sound11,
    12: sound12,
    13: sound13,
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (path) => {
    if (audioRef.current) {
      audioRef.current.src = path;
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
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      <img
        src={page_1}
        onClick={handleImageClick}
        style={{ display: "block" }}
      />
      {areas.map((area, index) => {
        const isActive = activeAreaIndex === area.sound;

        // ============================
        // 1️⃣ المنطقة الأساسية → دائرة تظهر فقط عندما تكون Active
        // ============================
        if (area.isPrimary) {
          return (
            <div
              key={index}
              className={`circle-area ${isActive ? "active" : ""}`}
              style={{
                left: `${area.x1}%`,
                top: `${area.y1}%`,
              }}
              onClick={() => {
                setActiveAreaIndex(area.sound);
                playSound(sounds[area.sound]);
              }}
            ></div>
          );
        }

        // ============================
        // 2️⃣ المناطق الفرعية → مربعات داكنة مخفية ولازم
        //    عند الضغط عليها → تفعّل الدائرة الأساسية
        // ============================
        return (
          <div
            key={index}
            className="clickable-area"
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={() => {
              setActiveAreaIndex(area.sound); // 👈 يفعل الدائرة فوق الرقم
              playSound(sounds[area.sound]);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit6-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={allunit4} captions={captionsExample} />
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
        className="click-icon-unit6-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit6_Page1_find />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="headset-icon-CD-unit6-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit6_Page1_Vocab />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit6-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit6_Page1_Read />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit6_Page1;
