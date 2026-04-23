import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22.png";
import "./Unit3_Page1.css";
import Unit3_Page1_Read from "./Unit3_Pag1_Read";
import Unit3_Page1_Vocab from "./Unit3_Page1_Vocab";
import Unit3_Page1_find from "./Unit3_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import main from "../../../assets/audio/ClassBook/Unit 3/unit-3-main.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound14.mp3";

const Unit3_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.43,
      end: 5.01,
      text: "Page 22, Unit 3. Lala goes shopping.",
    },
    { start: 5.02, end: 6.04, text: " Vocabulary." },

    { start: 7.09, end: 9.57, text: "1. Grocery store." },
    { start: 9.57, end: 11.81, text: "2. Bag." },
    { start: 11.81, end: 14.37, text: "3. Grapes." },
    { start: 14.38, end: 17.07, text: "4. Carrots." },
    { start: 17.07, end: 19.53, text: "5. Apples." },
    { start: 19.53, end: 21.27, text: "6. Bananas." },
    { start: 22.3, end: 24.65, text: "7. Basket." },
    { start: 24.66, end: 27.47, text: "8. Eggplants." },
    { start: 27.48, end: 29.63, text: "9. Carton of milk." },
    { start: 30.7, end: 34.15, text: "10. Shelf, shelves." },
    { start: 34.16, end: 36.54, text: "11. Soap." },
    { start: 36.54, end: 39.2, text: "12. Toothpaste." },
    { start: 39.2, end: 42.03, text: "13. Shopping cart." },
    { start: 42.04, end: 44.95, text: "14. Can, cans." },
    { start: 46.23, end: 49.0, text: "Page 22. Listen and read along." },

    {
      start: 49.01,
      end: 59.52,
      text: "C-H, ch. T-C-H, ch. S-H, sh. Chicken, kitchen, fish.",
    },
    {
      start: 60,
      end: 76.78,
      text: "Unit 3, Page 23, Reading. Listen and read along. Picky shopper. It is a nice, sunny day. Lala decides to go shopping. He goes to the store next to his home. He is thinking about what he will buy.",
    },
    {
      start: 76.78,
      end: 79.84,
      text: "Good morning. How can I help you, Lala?",
    },
    {
      start: 79.84,
      end: 87.04,
      text: "Good morning to you. I'm looking for some boots. Do you have any orange boots, please?",
    },
    {
      start: 87.04,
      end: 92.66,
      text: "No, I'm sorry, I don't have any orange boots, but I have some pink ones.",
    },
    {
      start: 92.66,
      end: 98.96,
      text: "No, that won't work. I don't like pink. What else do you have? Do you have any purple gloves?",
    },
    {
      start: 100.04,
      end: 108.84,
      text: "Yes, I do have some purple gloves. Look, I also have some blue and green gloves, too. The blue gloves would match your shirt.",
    },
    {
      start: 108.84,
      end: 113.52,
      text: "Wow, that's great, but I'll take some red gloves, please.",
    },
    {
      start: 113.52,
      end: 117.58,
      text: "There are no red gloves. You are a picky shopper, aren't you?",
    },
    {
      start: 117.07,
      end: 122.8,
      text: "Page 23. Listen, read, and repeat.",
    },
    { start: 122.8, end: 125.52, text: "Can we go shopping on Saturday?" },
    { start: 125.52, end: 127.32, text: "Yes, we can." },
    {
      start: 127.32,
      end: 130.62,
      text: "Page 23. Listen and read along.",
    },
    { start: 130.98, end: 140.6, text: "C-H, ch. T-C-H, ch. S-H, sh. Peach, watch, shell." },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 65.5, y1: 12.15, sound: 1, isPrimary: true },
    // // الصوت الأول – منطقة إضافية
    { x1: 60, y1: 11.5, x2: 83, y2: 18, sound: 1, isPrimary: false },
    //

    // // الصوت الثاني – الأساسية
    { x1: 83.3, y1: 27, sound: 2, isPrimary: true },
    // // الصوت الثاني – الإضافية
    { x1: 79, y1: 26, x2: 88, y2: 35, sound: 2, isPrimary: false },
    //

    // // الصوت الثالث – الأساسية
    { x1: 43, y1: 28.7, sound: 3, isPrimary: true },
    // // الصوت الثالث – الإضافية
    { x1: 42, y1: 28, x2: 50, y2: 35, sound: 3, isPrimary: false },
    //

    // // الصوت الرابع – الأساسية
    { x1: 37.2, y1: 21.4, sound: 4, isPrimary: true },
    // // الصوت الرابع – الإضافية
    { x1: 30, y1: 20, x2: 41, y2: 27, sound: 4, isPrimary: false },
    //

    // // الصوت الخامس – الأساسية
    { x1: 28.5, y1: 33.5, sound: 5, isPrimary: true },
    // // الصوت الخامس – الإضافية
    { x1: 26, y1: 29, x2: 40, y2: 35.7, sound: 5, isPrimary: false },
    //

    // // الصوت السادس – الأساسية
    { x1: 43.3, y1: 19, sound: 6, isPrimary: true },
    // // الصوت السادس – الإضافية
    { x1: 42, y1: 19, x2: 52.5, y2: 27, sound: 6, isPrimary: false },

    // الصوت السابع – الأساسية
    { x1: 49, y1: 36.5, sound: 7, isPrimary: true },
    // الصوت السابع – الإضافية
    { x1: 47, y1: 34, x2: 55.5, y2: 40, sound: 7, isPrimary: false },
    //
    // الصوت الثامن – الأساسية
    { x1: 68, y1: 19.2, sound: 8, isPrimary: true },
    // الصوت الثامن – الإضافية
    { x1: 67, y1: 20, x2: 79, y2: 27, sound: 8, isPrimary: false },
    //

    // الصوت التاسع – الأساسية
    { x1: 64, y1: 38.9, sound: 9, isPrimary: true },
    // الصوت التاسع – الإضافية
    { x1: 59, y1: 34, x2: 92, y2: 42, sound: 9, isPrimary: false },
    //

    // الصوت العاشر – الأساسية
    { x1: 5, y1: 26.5, sound: 10, isPrimary: true },
    // الصوت العاشر – الإضافية
    { x1: 0, y1: 14, x2: 19, y2: 30, sound: 10, isPrimary: false },
    //

    // الصوت الحادي عشر – الأساسية
    { x1: 91.4, y1: 63, sound: 11, isPrimary: true },
    // الصوت الحادي عشر – الإضافية
    { x1: 80, y1: 59.5, x2: 99, y2: 67, sound: 11, isPrimary: false },
    //

    // الصوت الثاني عشر – الأساسية
    { x1: 62.5, y1: 44.8, sound: 12, isPrimary: true },
    // الصوت الثاني عشر – الإضافية
    { x1: 62.5, y1: 46, x2: 82, y2: 57, sound: 12, isPrimary: false },
    //

    // الصوت الثالث عشر – الأساسية
    { x1: 67.9, y1: 68.8, sound: 13, isPrimary: true },
    // الصوت الثالث عشر – الإضافية
    { x1: 60, y1: 66, x2: 88, y2: 81, sound: 13, isPrimary: false },
    //

    // الصوت الرابع عشر – الأساسية
    { x1: 83.9, y1: 44, sound: 14, isPrimary: true },
    // الصوت الرابع عشر – الإضافية
    { x1: 83, y1: 44, x2: 99, y2: 57, sound: 14, isPrimary: false },
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
        className="headset-icon-CD-unit3-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={main} captions={captionsExample} />
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
        className="click-icon-unit3-page1-1 hover:scale-110 transition"
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
                <Unit3_Page1_find />
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
        className="headset-icon-CD-unit3-page1-2 hover:scale-110 transition"
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
                <Unit3_Page1_Vocab />
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
        className="click-icon-unit3-page1-2 hover:scale-110 transition"
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
                <Unit3_Page1_Read />
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

export default Unit3_Page1;
