import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 47.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/1-08.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import soundListen from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-pg47-reading.mp3";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/Asset 38.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 46-47/Asset 37.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_2.4_Adult Lady.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";

import letterSound from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-page47-listen.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
// import sound1 from "../../../assets/img_unit6/sounds-unit6/U2-06.mp3";
// import sound2 from "../../../assets/img_unit6/sounds-unit6/U2-07.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 6/P 47/Pg47_1.2_Lolo.mp3";
import repeat from "../../../assets/audio/ClassBook/Unit 6/P 47/unit6-page47-bebo&lolo.mp3";

import "./Unit6_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit6_Page2 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
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
  const captions3 = [
    {
      start: 0.399,
      end: 5.139,
      text: "Page 47. Listen, read, and repeat.",
    },
    {
      start: 5.139,
      end: 9.259,
      text: "We must water the plants. We must also give them sun",
    },
  ];
  const captionsExample = [
    {
      start: 0.179,
      end: 6.699,
      text: "Page 47 reading. Listen and read along. I Love My Garden",
    },
    {
      start: 6.699,
      end: 41.359,
      text: "Welcome to my garden. Do you like it? Gardening is one of my favorite hobbies. Seeing bright colors in my garden makes me feel happy. Today is Saturday, and I'm planting a young tree in my garden. I hope it will grow very tall. I usually begin planting a little before springtime. March and April are the perfect months for planting. I must water my garden regularly to keep my plants healthy. I recommend that everyone start a garden. It's so much fun",
    },
  ];

  const captions2 = [
    { start: 0, end: 3.18, text: "Page 47. Listen and read along." },
    { start: 3.2, end: 7.01, text: "FL, PL, SL. Fly, plum, slide" },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 35.24, y1: 54.6, x2: 39.0, y2: 58.0, sound: 1, isPrimary: true },

    // // // الصوت الأول – منطقة إضافية
    { x1: 31.3, y1: 45.4, x2: 40.12, y2: 53.4, sound: 1, isPrimary: false },

    // // // الصوت الثاني – الأساسية
    { x1: 43.6, y1: 54.1, x2: 47.7, y2: 57.1, sound: 2, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 41.6, y1: 47.31, x2: 48.3, y2: 53.7, sound: 2, isPrimary: false },
  ];
  const sounds = {
    // 1: sound1,
    // 2: sound2,
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
      style={{ backgroundImage: `url(${page_2})` }}
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
        className="headset-icon-CD-unit6-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={soundListen} captions={captionsExample} />,
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
        className="headset-icon-CD-unit6-page2-2 hover:scale-110 transition"
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
                audioSrc={repeat}
                checkpoints={[0, 5.14, 7]}
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
        className="click-icon-unit6-page2-1 hover:scale-110 transition"
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
                images={[
                  Rabbit,
                  img1_letter,
                  img2_letter,
                  img3_letter,
                  img4_letter,
                ]}
                audioSrc={letterSound}
                checkpoints={[0, 4.3, 7.82, 8.8, 9.52]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
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
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit6_Page2;
