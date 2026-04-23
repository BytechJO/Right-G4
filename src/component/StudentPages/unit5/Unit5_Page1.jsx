import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40.png";
import "./Unit5_Page1.css";
import Unit5_Page1_Vocab from "./Unit5_Page1_Vocab";
import Unit5_Page1_find from "./Unit5_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allUnit2 from "../../../assets/audio/ClassBook/Unit 5/P 40/unit5-pg40-allunit.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound13.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-04.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.4_Adult Lady.mp3";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import listenAudio from "../../../assets/audio/ClassBook/Unit 5/P 40/unit5-pg40-listen.mp3";
const Unit2_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.359,
      end: 14.319,
      text: "Page 40, Unit 5. At Tom's house. Page 40, Unit 5, vocabulary. One, chimney. Two, bedroom. Three, bathroom.",
    },

    {
      start: 15.339,
      end: 27.139,
      text: "Four, office. Five, living room. Six, sofa. Seven, stairs. Eight, hall.",
    },

    {
      start: 28.159,
      end: 35.439,
      text: "Nine, dining room. Ten, kitchen. Eleven, basement.",
    },

    {
      start: 36.54,
      end: 41.639,
      text: "Twelve, washing machine. Thirteen, garage.",
    },

    {
      start: 43.18,
      end: 92.099,
      text: "Page 40, listen and read along. Y. July. Fly. Sky. Page 41, reading. Listen and read along. Tom lives in a house. Tom and his family live in a house near a big city. The house has many rooms. Tom and his sister like to play and study in their bedrooms. Tom's family sit together in the living room. When Tom is not riding his bike, he keeps it in the garage. There are many tall buildings behind the house. There is a yard next to Tom's house. There is a swing and slide in the yard. Tom's sister is on the slide, and his cat is beside the slide. Page 41. Listen, read, and repeat.",
    },

    { start: 92.099, end: 93.059, text: "I live in a city." },

    { start: 94.22, end: 95.239, text: "I live in a town." },

    { start: 96.379, end: 99.919, text: "Page 41. Listen and read along." },

    { start: 101.519, end: 104.339, text: "Y. Baby. Candy. Party." },
  ];
  const captions = [
    { start: 0, end: 3.5, text: "Page 40. Listen and read along." },
    { start: 3.8, end: 7.54, text: "Y. July. Fly. Sky" },
  ];
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1_letter),
    new Audio(sound2_letter),
    new Audio(sound3_letter),
    new Audio(sound4_letter),
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 80.9, y1: 19.7, sound: 1, isPrimary: true },
    { x1: 77.9, y1: 19.7, x2: 87.65, y2: 30.27, sound: 1, isPrimary: false },

    // الصوت الثاني – 27
    { x1: 52.1, y1: 29.4, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 41.83, y1: 26.95, x2: 67.9, y2: 39.8, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 77.2, y1: 31.4, sound: 3, isPrimary: true },

    // الصوت الثالث – الإضافية
    { x1: 69.84, y1: 31.69, x2: 92.03, y2: 40.49, sound: 3, isPrimary: false },

    // الصوت الرابع – الأساسية
    { x1: 47.4, y1: 45.1, sound: 4, isPrimary: true },
    { x1: 33.85, y1: 42.52, x2: 51.09, y2: 53.69, sound: 4, isPrimary: false },

    // الصوت الخامس – الأساسية
    { x1: 55.9, y1: 41.6, sound: 5, isPrimary: true },

    // الصوت السادس – الأساسية
    { x1: 60.9, y1: 45.8, sound: 6, isPrimary: true },
    { x1: 54.57, y1: 47.26, x2: 70.08, y2: 52.84, sound: 6, isPrimary: false },

    // الصوت السابع – الأساسية
    { x1: 70.2, y1: 42.5, sound: 7, isPrimary: true },

    // الصوت الثامن – الأساسية
    { x1: 37, y1: 60, sound: 8, isPrimary: true },

    // الصوت الثامن – الإضافية
    { x1: 30.01, y1: 56.57, x2: 49.18, y2: 68.24, sound: 8, isPrimary: false },

    // الصوت التاسع – الأساسية
    { x1: 55.7, y1: 59.1, sound: 9, isPrimary: true },

    // الصوت التاسع – الإضافية
    { x1: 51.09, y1: 56.23, x2: 68.54, y2: 68.24, sound: 9, isPrimary: false },

    // الصوت العاشر – الأساسية
    { x1: 76.2, y1: 61.95, sound: 10, isPrimary: true },

    // الصوت  العاشر – الإضافية
    { x1: 75.68, y1: 55.72, x2: 91.84, y2: 67.23, sound: 10, isPrimary: false },

    // الصوت الحادي عشر – الأساسية
    { x1: 26.2, y1: 72.45, sound: 11, isPrimary: true },

    // الصوت الثاني عشر – الأساسية
    { x1: 34.2, y1: 72.4, sound: 12, isPrimary: true },

    // الصوت الثالث عشر – الأساسية

    { x1: 87, y1: 73.5, sound: 13, isPrimary: true },

    // الصوت الثالث عشر – الإضافية
    { x1: 72.64, y1: 71.46, x2: 91.38, y2: 80.43, sound: 13, isPrimary: false },
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
        className="headset-icon-CD-unit2-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={allUnit2} captions={captionsExample} />
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
        className="click-icon-unit5-page1-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit5-page1-2 hover:scale-110 transition"
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
        className="click-icon-unit5-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <FourImagesWithAudio
                images={[Rabbit, img1, img2, img3, img4]}
                audioSrc={listenAudio}
                checkpoints={[0, 3, 4.446, 5.6,6.62]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions}
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
    </div>
  );
};

export default Unit2_Page1;
