import React, { useState, useRef, useEffect } from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 5.png";

import allUnitSound from "../../../assets/audio/ClassBook/Unit 1/P 5/CD2.Pg5_Reading_Adult Lady.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-07.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-08.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-09.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-10.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-11.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/1-12.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.4_Adult Lady.mp3";
import sound5_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.5_Adult Lady.mp3";
import sound6_letter from "../../../assets/audio/ClassBook/Unit 1/P 5/Pg5_2.6_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import longAudio from "../../../assets/audio/ClassBook/Unit 1/P 5/unit1-pg5-listen.mp3";
import bebo from "../../../assets/audio/ClassBook/Unit 1/P 5/unit1-pg5-bebo&lolo.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/0000.svg";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 4-5/00000000.svg";
// import sound1 from "../../../assets/audio/placeholders/song.mp3";
// import sound4 from "../../../assets/audio/placeholders/song.mp3";
// import sound5 from "../../../assets/audio/placeholders/song.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_1.2_Lolo.mp3";
import "./Page5.css";
const Page5 = ({ openPopup }) => {
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
  const repeatSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Bebo),
    new Audio(Lolo),
  ];
  const captionsExample = [
    {
      start: 0,
      end: 7.25,
      text: "Unit one. Page five reading. Listen and read along. Slow and steady wins the race",
    },
  ];
  const captions3 = [
    { start: 0, end: 3.46, text: "Page five. Listen, read and repeat.  " },
    { start: 3.46, end: 5.92, text: "Do you play basketball? " },
    { start: 5.92, end: 7.54, text: "No, I play volleyball" },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 45, y1: 44.3, x2: 49, y2: 47.8, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 49.2, y1: 37.3, x2: 74.4, y2: 79.8, sound: 1, isPrimary: false },

    // الصوت الثاني – الأساسية
    { x1: 86.6, y1: 24.2, x2: 90.4, y2: 27.2, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 83.7, y1: 28.4, x2: 97.4, y2: 48.9, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 75, y1: 27.3, x2: 79.5, y2: 30.5, sound: 3, isPrimary: true },

    // الصوت الثالث – الإضافية
    { x1: 77.9, y1: 21.8, x2: 81.7, y2: 43.8, sound: 3, isPrimary: false },
  ];
  const sounds = {
    // 1: sound1,
    // 2: sound4,
    // 3: sound5,
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
          className="headset-icon-CD-page5-1 hover:scale-110 transition"
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
          className="headset-icon-CD-page5-2 hover:scale-110 transition"
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
                  checkpoints={[0, 3.3, 4.96, 5.84, 6.7, 7.56, 8.66]}
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

export default Page5;
