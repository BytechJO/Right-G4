import React, { useState, useRef, useEffect } from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 11.png";

import allUnitSound from "../../../assets/audio/ClassBook/Unit 2/P 11/unit2-pg11-reading.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-05.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-06.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-07.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-08.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import longAudio from "../../../assets/audio/ClassBook/Unit 1/P 5/unit1-pg5-listen.mp3";
import bebo from "../../../assets/audio/ClassBook/Unit 2/P 11/unit2-pg11-bebo&lolo.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/Asset 26.svg";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/Asset 27.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 11/Pg_11.1_Adult Lady.mp3";

import Bebo from "../../../assets/audio/ClassBook/Unit 2/P 11/Pg11_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 2/P 11/Pg11_1.2_Lolo.mp3";
import "./Unit2_Page2.css";
const Unit2_Page2 = ({ openPopup }) => {
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
  ];
  const repeatSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Bebo),
    new Audio(Lolo),
  ];
  const captionsExample = [
    {
      start: 0.459,
      end: 7.699,
      text: "Unit two. Page 11. Reading. Listen and read along. Vacation in France.",
    },
    {
      start: 8.859,
      end: 41.699,
      text: "Tom and his family love traveling. They always find exciting things when they travel. Often, they go to France during their summer vacation. They are never bored of France. They find that each part of France is different and interesting. Tom's family always spends two days in Paris. It is a beautiful city. They enjoy the food and places there. Sometimes, they take a bus or train to other famous places in France too.",
    },
    {
      start: 42.799,
      end: 44.759,
      text: "It is always fun to travel",
    },
  ];
  const captions3 = [
    { start: 0, end: 3.46, text: "Page five. Listen, read and repeat.  " },
    { start: 3.46, end: 5.92, text: "Do you play basketball? " },
    { start: 5.92, end: 7.54, text: "No, I play volleyball" },
  ];
  const areas = [
  
    // الصوت الأول – منطقة إضافية
   { x1: 5.04, y1: 14.09, x2: 44.9, y2: 43.7, sound: 1, isPrimary: false },

  ];
  const sounds = {
    1: sound1,
  };
  const captions = [
    { start: 0, end: 3.02, text: "Page five Listen and read along." },
    {
      start: 3.48,
      end: 9.32,
      text: "Long vowels. Cake, bee, bike, home, cube",
    },
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
        style={{ backgroundImage: `url(${page_5})` }}
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
          className="headset-icon-CD-unit2-page2-1 hover:scale-110 transition"
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
          className="headset-icon-CD-unit2-page2-2 hover:scale-110 transition"
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
                  images={[read, img1_conversation, img2_conversation]}
                  audioSrc={bebo}
                  checkpoints={[0, 3.46, 5.92]}
                  popupOpen={true}
                  titleQ={`Listen, read, and repeat.`}
                  audioArr={repeatSounds}
                  captions={captions3}
                />,
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
          className="click-icon-unit2-page2-1 hover:scale-110 transition"
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
                  audioSrc={longAudio}
                  checkpoints={[0, 3.3, 4.96, 5.84, 6.7]}
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

export default Unit2_Page2;
