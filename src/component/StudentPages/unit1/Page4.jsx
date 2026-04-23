import React, { useState, useRef } from "react";
import page4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4.png";
import allUnitSound from "../../../assets/audio/ClassBook/Unit 1/unit1-page4-allunit.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/Asset 4.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-04.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-05.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-06.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.4_Adult Lady.mp3";
import sound5_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.5_Adult Lady.mp3";
import sound6_letter from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_1.6_Adult Lady.mp3";
import Page4_Interactive1 from "./Page4_Interactive1";
import Page4_vocabulary from "./Page4_vocabulary";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import longAudio from "../../../assets/audio/ClassBook/Unit 1/P 4/unit1-page4-listen.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound12.mp3";
import "./Page4.css";
const Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1_letter),
    new Audio(sound2_letter),
    new Audio(sound3_letter),
    new Audio(sound4_letter),
    new Audio(sound5_letter),
    new Audio(sound6_letter),
  ];
  const captionsExample = [
    {
      start: 0,
      end: 4,
      text: "Page four, unit one. At the basketball game.",
    },
    {
      start: 4.2,
      end: 16.5,
      text: "Page four, unit one, vocabulary. One, scoreboard. Two, young. Three, old. Four, small.",
    },
    {
      start: 17.5,
      end: 57.24,
      text: "Five, big. Six, referee. Seven, whistle. Eight, fast. Nine, slow. Ten, tall. Eleven, short. Twelve, basketball court. Page four, listen and read along. Short vowels. Cat, bed, fish, box, gum. Unit one, page five, reading. Listen and read along. Slow and steady wins the race. Page five, listen, read and repeat.",
    },
    { start: 57.239, end: 59.499, text: "Do you play basketball?" },
    { start: 59.5, end: 62.18, text: " No, I play volleyball." },
    {
      start: 62.5,
      end: 71.11,
      text: "Page five, listen and read along. Long vowels. Cake, bee, bike, home, cube.",
    },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 27.7, y1: 17.8, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 0.03, y1: 15, x2: 29.76, y2: 27.29, sound: 1, isPrimary: false },

    // الصوت الثاني – 27
    { x1: 54.6, y1: 32.2, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 51.98, y1: 32.2, x2: 54.35, y2: 34.57, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 13.2, y1: 27.5, sound: 3, isPrimary: true },

    // الصوت الثالث – الإضافية
    { x1: 17.94, y1: 28.47, x2: 21.39, y2: 34.4, sound: 3, isPrimary: false },

    // الصوت الرابع – الأساسية
    { x1: 38.7, y1: 23.5, sound: 4, isPrimary: true },

    // الصوت الرابع – الإضافية
    { x1: 43.15, y1: 23.9, x2: 49.4, y2: 27.63, sound: 4, isPrimary: false },

    // الصوت الخامس – الأساسية
    { x1: 47.2, y1: 16.2, sound: 5, isPrimary: true },

    // الصوت الخامس – الإضافية
    { x1: 52.2, y1: 19, x2: 62.45, y2: 23.4, sound: 5, isPrimary: false },

    // الصوت السادس – الأساسية
    { x1: 89, y1: 50, sound: 6, isPrimary: true },

    // الصوت السادس – الإضافية
    { x1: 83.87, y1: 50.64, x2: 91.41, y2: 70.61, sound: 6, isPrimary: false },

    // الصوت السابع – الأساسية
    { x1: 79, y1: 47.9, sound: 7, isPrimary: true },

    // الصوت الثامن – الأساسية
    { x1: 61.2, y1: 53.7, sound: 8, isPrimary: true },

    // الصوت الثامن – الإضافية
    { x1: 58.66, y1: 44.89, x2: 70.51, y2: 66.38, sound: 8, isPrimary: false },

    // الصوت التاسع – الأساسية
    { x1: 39.4, y1: 38.8, sound: 9, isPrimary: true },

    // الصوت التاسع – الإضافية
    { x1: 33.67, y1: 39.81, x2: 36.9, y2: 48.93, sound: 9, isPrimary: false },

    // الصوت العاشر – الأساسية
    { x1: 78.2, y1: 39.3, sound: 10, isPrimary: true },

    // الصوت  العاشر – الإضافية
    { x1: 73.53, y1: 35.07, x2: 80.42, y2: 46.41, sound: 10, isPrimary: false },

    // الصوت الحادي عشر – الأساسية
    { x1: 61, y1: 36.3, sound: 11, isPrimary: true },

    // الصوت الحادي عشر – الإضافية
    { x1: 65.34, y1: 38.97, x2: 70.94, y2: 46.07, sound: 11, isPrimary: false },

    // الصوت الثاني عشر – الأساسية
    { x1: 29.8, y1: 68.4, sound: 12, isPrimary: true },

    // الصوت الثاني عشر – الإضافية
    { x1: 27.64, y1: 67.56, x2: 67.28, y2: 79.07, sound: 12, isPrimary: false },
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
  };
  const captions = [
    { start: 0, end: 3.5, text: "Page 4. Listen and read along." },
    { start: 3.6, end: 8.9, text: " Short vowels. Cat, bed, fish, box, gum" },
  ];
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
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page4})` }}
        onClick={handleImageClick}
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
          className="headset-icon-CD-page4-1 hover:scale-110 transition"
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
                  <AudioWithCaption
                    src={allUnitSound}
                    captions={captionsExample}
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
        </div>

        <div
          className="click-icon-page4-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <Page4_Interactive1 />)}
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

        <div
          className="headset-icon-CD-page4-2 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <Page4_vocabulary />)}
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
        <div
          className="click-icon-page4 hover:scale-110 transition"
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
                  images={[Rabbit, img1, img2, img3, img4, img5, img6]}
                  audioSrc={longAudio}
                  checkpoints={[0, 3.8, 5.4, 6.52, 7.12, 7.82, 8.56]}
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
    </>
  );
};

export default Page4;
