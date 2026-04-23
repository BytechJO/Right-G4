import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64.png";
import "./Unit8_Page1.css";
import Unit5_Page1_Read from "./Unit8_Pag1_Read";
import Unit5_Page1_Vocab from "./Unit8_Page1_Vocab";
import Unit5_Page1_find from "./Unit8_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allunit3 from "../../../assets/audio/ClassBook/Unit 8/P 64/unit8-pg64-allunit.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound14.mp3";

const Unit8_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.08,
      end: 8.68,
      text: "Page 64, unit 8. At our grandparents' farm. Page 64, unit 8, vocabulary.",
    },

    {
      start: 9.98,
      end: 13.7,
      text: "One, cottage. Two, tractor.",
    },

    {
      start: 14.72,
      end: 16.219,
      text: "Three, mill.",
    },

    {
      start: 17.44,
      end: 26.46,
      text: "Four, barn. Five, horse. Six, dog. Seven, chick.",
    },

    {
      start: 27.56,
      end: 29.0,
      text: "Eight, chicken.",
    },

    {
      start: 30.04,
      end: 42.12,
      text: "Nine, sheep. 10, fence. 11, wheat. 12, farmer. 13, cow.",
    },

    {
      start: 43.3,
      end: 62.52,
      text: "14, dog kennel. Page 64, listen and read along. E-S. Boxes, buses, brushes, sandwiches. Page 65, reading. Listen and read along. Helping out on the farm.",
    },

    {
      start: 63.92,
      end: 102.02,
      text: "Tom and his sister were visiting their grandparents for one week. They live on a farm. Tom and his sister like it because it reminds them of the past. The weather was sunny. It didn't rain the whole week. There are many animals on the farm. Tom and his sister helped their grandparents on the farm. Tom's sister fed the horses. Tom milked the cows and fed corn to the chickens. They watched their grandpa ride the tractor. Tom would like to ride on the tractor one day. Page 65, listen, read and repeat.",
    },

    {
      start: 102.02,
      end: 104.04,
      text: "Where were you last week?",
    },

    {
      start: 104.04,
      end: 104.9,
      text: "I was on the farm.",
    },

    {
      start: 106.1,
      end: 119.04,
      text: "Page 65, listen and read along. G-R, P-R, B-R. Grandmother, green, present, prize, brown.",
    },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 45.4, y1: 16.5, sound: 1, isPrimary: true },
    { x1: 28.47, y1: 15.59, x2: 52.17, y2: 27, sound: 1, isPrimary: false },

    { x1: 35.9, y1: 50.8, sound: 2, isPrimary: true },
    { x1: 34.07, y1: 50.5, x2: 59.26, y2: 60, sound: 2, isPrimary: false },

    { x1: 54.26, y1: 13, sound: 3, isPrimary: true },

    { x1: 74.87, y1: 35, sound: 4, isPrimary: true },
    { x1: 67.25, y1: 28.98, x2: 92.67, y2: 39.98, sound: 4, isPrimary: false },

    { x1: 71.13, y1: 47.8, sound: 5, isPrimary: true },

    { x1: 86.4, y1: 53.3, sound: 6, isPrimary: true },

    { x1: 82.5, y1: 75.8, sound: 7, isPrimary: true },
    { x1: 86.89, y1: 76.53, x2: 94.86, y2: 80.6, sound: 7, isPrimary: false },

    { x1: 65.4, y1: 54, sound: 8, isPrimary: true },

    { x1: 84.6, y1: 57.4, sound: 9, isPrimary: true },

    { x1: 50.5, y1: 62.3, sound: 10, isPrimary: true },

    { x1: 27, y1: 35.76, sound: 11, isPrimary: true },
    { x1: 22.9, y1: 35.24, x2: 33.45, y2: 43.37, sound: 11, isPrimary: false },

    { x1: 34.4, y1: 33, sound: 12, isPrimary: true },
    { x1: 30.44, y1: 27.12, x2: 33.24, y2: 33.89, sound: 12, isPrimary: false },

    { x1: 78.8, y1: 59.1, sound: 13, isPrimary: true },
    { x1: 68.57, y1: 62.83, x2: 90.33, y2: 72, sound: 13, isPrimary: false },

    { x1: 88.8, y1: 44.2, sound: 14, isPrimary: true },
    { x1: 87.1, y1: 45.57, x2: 97.66, y2: 50.3, sound: 14, isPrimary: false },
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
    14: sound14,
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
        className="headset-icon-CD-unit8-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={allunit3} captions={captionsExample} />
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
        className="click-icon-unit8-page1-1 hover:scale-110 transition"
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
                <Unit5_Page1_find />
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
        className="headset-icon-CD-unit8-page1-2 hover:scale-110 transition"
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
                <Unit5_Page1_Vocab />
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
        className="click-icon-unit8-page1-2 hover:scale-110 transition"
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
                <Unit5_Page1_Read />
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

export default Unit8_Page1;
