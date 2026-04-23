import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82.png";
import "./Unit10_Page1.css";
import Unit5_Page1_Read from "./Unit10_Pag1_Read";
import Unit5_Page1_Vocab from "./Unit10_Page1_Vocab";
import Unit5_Page1_find from "./Unit10_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allunit3 from "../../../assets/audio/ClassBook/Unit 10/P 82/unit10-pg82-unitall.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound15.mp3";

const Unit10_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    { start: 0, end: 4.0, text: " Page 58, Unit 7, It’s Boarding Time. " },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 28.3, y1: 39.2, sound: 1, isPrimary: true },

    { x1: 22.4, y1: 22.4, sound: 2, isPrimary: true },

    { x1: 32.4, y1: 24.8, sound: 3, isPrimary: true },
    { x1: 37.09, y1: 25.26, x2: 46.14, y2: 28.66, sound: 3, isPrimary: false },

    { x1: 56.9, y1: 20, sound: 4, isPrimary: true },
    { x1: 49.37, y1: 14.77, x2: 77.59, y2: 25.43, sound: 4, isPrimary: false },

    { x1: 32, y1: 31.3, sound: 5, isPrimary: true },
    { x1: 22.0, y1: 29.49, x2: 32.56, y2: 35.07, sound: 5, isPrimary: false },

    { x1: 72.2, y1: 28.9, sound: 6, isPrimary: true },
    { x1: 67.25, y1: 32.37, x2: 73.5, y2: 32.7, sound: 6, isPrimary: false },

    { x1: 58.7, y1: 34, sound: 7, isPrimary: true },
    { x1: 63.37, y1: 35.07, x2: 66.82, y2: 41.84, sound: 7, isPrimary: false },

    { x1: 38.5, y1: 47.5, sound: 8, isPrimary: true },

    { x1: 46, y1: 42.7, sound: 9, isPrimary: true },

    { x1: 48, y1: 58.2, sound: 10, isPrimary: true },
    { x1: 47.86, y1: 53.69, x2: 62.08, y2: 62.49, sound: 10, isPrimary: false },

    { x1: 28.9, y1: 78.1, sound: 11, isPrimary: true },

    { x1: 38.5, y1: 61.6, sound: 12, isPrimary: true },
    { x1: 30.41, y1: 61.3, x2: 40.1, y2: 67.9, sound: 12, isPrimary: false },

    { x1: 71.6, y1: 68.7, sound: 13, isPrimary: true },
    { x1: 65.96, y1: 63.84, x2: 82.98, y2: 75.2, sound: 13, isPrimary: false },

    { x1: 53.9, y1: 66.1, sound: 14, isPrimary: true },

    { x1: 34.3, y1: 56.45, sound: 15, isPrimary: true },
    { x1: 26.31, y1: 55.21, x2: 33.21, y2: 59.44, sound: 15, isPrimary: false },
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
    15: sound15,
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
        className="headset-icon-CD-unit10-page1-1 hover:scale-110 transition"
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
        className="click-icon-unit10-page1-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit10-page1-2 hover:scale-110 transition"
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
        className="click-icon-unit10-page1-2 hover:scale-110 transition"
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

export default Unit10_Page1;
