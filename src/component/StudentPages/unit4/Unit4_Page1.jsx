import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28.png";
import "./Unit4_Page1.css";
import Unit4_Page1_find from "./Unit4_Page1_find";
import Unit4_Page1_Vocab from "./Unit4_Page1_Vocab";
import Unit4_Page1_Read from "./Unit4_Pag1_Read";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allunit4 from "../../../assets/audio/ClassBook/Unit 4/unit4-main.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound14.mp3";

const Unit4_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.08,
      end: 4.16,
      text: "Page 28, unit 4. My e-friend.",
    },
    {
      start: 4.28,
      end: 5.06,
      text: "Vocabulary.",
    },
    {
      start: 6.16,
      end: 15.48,
      text: "1. email address. 2. minimize. 3. enlarge. 4. exit.",
    },
    {
      start: 16.5,
      end: 25.38,
      text: "5.call. 6. chat box. 7.chat. 8. camera.",
    },
    { start: 26.96, end: 29.2, text: "9. emoticons." },
    { start: 30.28, end: 31.78, text: "10. picture." },
    { start: 32.82, end: 37.04, text: "11. send. 12. search." },
    { start: 38.18, end: 42.66, text: "13. laptop. 14. type." },
    {
      start: 44.26,
      end: 54.14,
      text: "Page 28, listen and read along. Voiceless T-H: bath, thirsty, Thursday.",
    },
    {
      start: 54.84,
      end: 58.52,
      text: "Page 29, Reading. Listen and read along.",
    },
    {
      start: 59.72,
      end: 62.22,
      text: "Helen and Stella get an email.",
    },
    {
      start: 62.92,
      end: 82.04,
      text: "Hey friends! How are you doing, Helen and Stella? This is Julia, your friend from London Court School. Our school is big. Look at the pictures of London. The weather is very rainy. London gets very cold in winter. However, in the spring, London is very pretty.",
    },
    {
      start: 83.14,
      end: 92.1,
      text: "What's the weather like where you live? Please send me an email when you can. I'm waiting to hear from you. Your friend, Julia.",
    },
    {
      start: 92.8,
      end: 97.04,
      text: "Page 29, listen, read and repeat.",
    },
    { start: 97.04, end: 98.2, text: "Please send me an email." },
    { start: 99.34, end: 101.26, text: "I will tomorrow." },
    {
      start: 101.26,
      end: 109.92,
      text: "Page 29, listen and read along. Voiced T-H: mother, that, this",
    },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 40.8, y1: 13.3, sound: 1, isPrimary: true },
    // // الصوت الأول – منطقة إضافية
    { x1: 26.13, y1: 14.93, x2: 41.21, y2: 16.46, sound: 1, isPrimary: false },
    //

    // // الصوت الثاني – الأساسية
    { x1: 71, y1: 18.3, sound: 2, isPrimary: true },
    // // الصوت الثاني – الإضافية
    { x1: 75.25, y1: 15.44, x2: 76.54, y2: 16.29, sound: 2, isPrimary: false },
    //

    // // الصوت الثالث – الأساسية
    { x1: 75.6, y1: 18.3, sound: 3, isPrimary: true },
    // // الصوت الثالث – الإضافية
    { x1: 76.98, y1: 15.44, x2: 77.84, y2: 16.12, sound: 3, isPrimary: false },
    //

    // // الصوت الرابع – الأساسية
    { x1: 80.4, y1: 18.4, sound: 4, isPrimary: true },
    // // الصوت الرابع – الإضافية
    { x1: 78.48, y1: 15.44, x2: 79.56, y2: 16.29, sound: 4, isPrimary: false },
    //

    // // الصوت الخامس – الأساسية
    { x1: 40.5, y1: 20.8, sound: 5, isPrimary: true },
    // // الصوت الخامس – الإضافية
    { x1: 40.56, y1: 18.49, x2: 44.22, y2: 21.25, sound: 5, isPrimary: false },
    //

    // // الصوت السادس – الأساسية
    { x1: 38.5, y1: 38.6, sound: 6, isPrimary: true },
    // // الصوت السادس – الإضافية
    { x1: 27.42, y1: 42.35, x2: 56.08, y2: 43.03, sound: 6, isPrimary: false },

    // الصوت السابع – الأساسية
    { x1: 34.8, y1: 27.4, sound: 7, isPrimary: true },
    // الصوت السابع – الإضافية
    { x1: 27.64, y1: 25.09, x2: 34.75, y2: 32.03, sound: 7, isPrimary: false },
    //
    // الصوت الثامن – الأساسية
    { x1: 67.555, y1: 33.4, sound: 8, isPrimary: true },
    // الصوت الثامن – الإضافية
    { x1: 65.34, y1: 33.21, x2: 67.5, y2: 36, sound: 8, isPrimary: false },
    //

    // الصوت التاسع – الأساسية
    { x1: 31.5, y1: 47.9, sound: 9, isPrimary: true },
    // الصوت التاسع – الإضافية
    { x1: 26.99, y1: 44.55, x2: 39.05, y2: 46.58, sound: 9, isPrimary: false },
    //

    // الصوت العاشر – الأساسية
    { x1: 75, y1: 48.2, sound: 10, isPrimary: true },
    // الصوت العاشر – الإضافية
    { x1: 65.77, y1: 44.38, x2: 78.48, y2: 55.38, sound: 10, isPrimary: false },
    //

    // الصوت الحادي عشر – الأساسية
    { x1: 52.6, y1: 46.8, sound: 11, isPrimary: true },
    // الصوت الحادي عشر – الإضافية
    { x1: 56.94 , y1: 47.60, x2:  64.05, y2: 49.29, sound: 11, isPrimary: false },
    //

    // الصوت الثاني عشر – الأساسية
    { x1: 52.6, y1: 50.4, sound: 12, isPrimary: true },
    // الصوت الثاني عشر – الإضافية
    { x1: 56.51, y1: 49.97, x2: 64.26, y2: 52.00, sound: 12, isPrimary: false },
    //

    // الصوت الثالث عشر – الأساسية
    { x1: 73.2, y1: 61.5, sound: 13, isPrimary: true },
    // الصوت الثالث عشر – الإضافية
    { x1: 65.13, y1: 62.15, x2: 82.15, y2: 69.09, sound: 13, isPrimary: false },
    //

    // الصوت الرابع عشر – الأساسية
    { x1: 74.2, y1: 73, sound: 14, isPrimary: true },
    // الصوت الرابع عشر – الإضافية
    { x1: 70.94, y1: 70.13, x2:84.73, y2: 72.95, sound: 14, isPrimary: false },
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
      {/* <img
        src={page_1}
        onClick={handleImageClick}
        style={{ display: "block" }}
      /> */}
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
        className="headset-icon-CD-unit4-page1-1 hover:scale-110 transition"
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
        className="click-icon-unit4-page1-1 hover:scale-110 transition"
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
                <Unit4_Page1_find />
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
        className="headset-icon-CD-unit4-page1-2 hover:scale-110 transition"
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
                <Unit4_Page1_Vocab />
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
        className="click-icon-unit4-page1-2 hover:scale-110 transition"
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
                <Unit4_Page1_Read />
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

export default Unit4_Page1;
