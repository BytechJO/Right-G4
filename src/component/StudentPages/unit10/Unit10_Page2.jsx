import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 83.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/1-08.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import soundListen from "../../../assets/audio/ClassBook/Unit 10/P 83/unit10-pg83-reading.mp3";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/Asset 46.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 82-83/Asset 45.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_2.4_Adult Lady.mp3";
import letterSound from "../../../assets/audio/ClassBook/Unit 10/P 83/unit10-pg83-listen.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
// import sound1 from "../../../assets/img_unit5/sounds-unit5/U2-06.mp3";
// import sound2 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound3 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound4 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import repeat from "../../../assets/audio/ClassBook/Unit 10/P 83/repeat.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 10/P 83/Pg83_1.2_Lolo.mp3";

import "./Unit10_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit10_Page2 = ({ openPopup }) => {
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
      start: 0.359,
      end: 4.719,
      text: "Page 83, listen, read, and repeat.",
    },
    {
      start: 4.719,
      end: 6.639,
      text: "I'm having a sale.",
    },
    {
      start: 6.639,
      end: 7.439,
      text: "That's great",
    },
  ];

  const captionsExample = [
    {
      start: 0.119,
      end: 6.799,
      text: "Page 83, reading. Listen and read along. Preparing for a garage sale.",
    },
    {
      start: 6.799,
      end: 8.979,
      text: "Dad, what are you doing?",
    },
    {
      start: 8.979,
      end: 11.34,
      text: "I'm going to clean out the basement.",
    },
    {
      start: 11.34,
      end: 13.519,
      text: "There's a lot of things here, Dad.",
    },
    {
      start: 13.519,
      end: 16.879,
      text: "Yes, there is. Why don't you help me, Tom?",
    },
    {
      start: 16.879,
      end: 18.059,
      text: "Sure, Dad.",
    },
    {
      start: 18.059,
      end: 23.079,
      text: "I will put these books in a box. You can dust some of those lamps over there.",
    },
    {
      start: 23.079,
      end: 26.139,
      text: "Will we throw all of these things away?",
    },
    {
      start: 26.139,
      end: 27.879,
      text: "No, we won't.",
    },
    {
      start: 27.879,
      end: 30.639,
      text: "But I thought you were cleaning out the basement.",
    },
    {
      start: 30.639,
      end: 33.88,
      text: "Yes, but we won't throw everything away.",
    },
    {
      start: 33.88,
      end: 35.899,
      text: "What will you do with all of it?",
    },
    {
      start: 35.899,
      end: 41.919,
      text: "I will keep some of things, and the rest I will sell in a garage sale next weekend.",
    },
    {
      start: 41.919,
      end: 45.259,
      text: "That sounds great. Can I sell some of my things, too?",
    },
    {
      start: 46.379,
      end: 54.759,
      text: "Sure, son. If there's anything you don't need anymore, we will sell it in the garage sale. You can make a little bit of money that way.",
    },
    {
      start: 54.759,
      end: 60.819,
      text: "Maybe if I sell my skateboard and video game set, I will have enough money to buy a new bike.",
    },
    {
      start: 60.819,
      end: 63.079,
      text: "Then let's get started.",
    },
    {
      start: 63.079,
      end: 63.619,
      text: "Sure, Dad",
    },
  ];

  const captions2 = [
    { start: 0, end: 3.04, text: "Page 83. Listen and read along." },
    { start: 4.02, end: 7.01, text: " CR, DR, TR. Cry, dress, truck" },
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
    // 3: sound3,
    // 4: sound4,
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
        className="headset-icon-CD-unit10-page2-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit10-page2-2 hover:scale-110 transition"
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
                images={[read, img2_conversation, img1_conversation]}
                audioSrc={repeat}
                checkpoints={[0, 4.3, 6.64]}
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
        className=" absolute bottom-[14.5%] right-[41%]  hover:scale-110 transition"
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
                checkpoints={[0, 3.8, 7.6, 8.4, 9.42]}
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

export default Unit10_Page2;
