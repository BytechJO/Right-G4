import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 65.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-06.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-07.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-08.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-09.svg";
import img5_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-10.svg";
import img6_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/1-11.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import soundListen from "../../../assets/audio/ClassBook/Unit 8/P 65/unit8-pg65-reading.mp3";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/Asset 41.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 64-65/Asset 42.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.4_Adult Lady.mp3";
import sound5_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.5_Adult Lady.mp3";
import sound6_letter from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_2.6_Adult Lady.mp3";
import letterSound from "../../../assets/audio/ClassBook/Unit 8/P 65/unit8-pg65-listen.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import repeat from "../../../assets/audio/ClassBook/Unit 8/P 65/unit8-pg65-bebo&lolo.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 8/P 65/Pg65_1.1_Lolo.mp3";

// import sound1 from "../../../assets/img_unit5/sounds-unit5/U2-06.mp3";
// import sound2 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound3 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound4 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";

import "./Unit8_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit8_Page2 = ({ openPopup }) => {
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
    new Audio(sound5_letter),
    new Audio(sound6_letter),
  ];
  const captionsExample = [
    {
      start: 0.319,
      end: 6.5,
      text: "Page 65, reading. Listen and read along. Helping out on the farm.",
    },

    {
      start: 7.859,
      end: 27.559,
      text: "Tom and his sister were visiting their grandparents for one week. They live on a farm. Tom and his sister like it because it reminds them of the past. The weather was sunny. It didn't rain the whole week. There are many animals on the farm. Tom and his sister helped their grandparents on the farm.",
    },

    {
      start: 28.619,
      end: 40.639,
      text: "Tom's sister fed the horses. Tom milked the cows and fed corn to the chickens. They watched their grandpa ride the tractor. Tom would like to ride on the tractor one day.",
    },
  ];

  const captions2 = [
    { start: 0, end: 3.74, text: "Page 65. Listen and read along. " },
    {
      start: 4.48,
      end: 13.68,
      text: "GR, PR, BR. Grandmother. Green. Present. Prize. Brown",
    },
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
  const repeatSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Bebo),
    new Audio(Lolo),
  ];
  const captions3 = [
    {
      start: 0.199,
      end: 4.619,
      text: "Page 65. Listen, read, and repeat.",
    },

    {
      start: 4.619,
      end: 6.519,
      text: "Where were you last week?",
    },

    {
      start: 6.519,
      end: 7.499,
      text: "I was on the farm",
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
        className="headset-icon-CD-unit8-page2-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit8-page2-2 hover:scale-110 transition"
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
                checkpoints={[0, 4.4, 6.04]}
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
        className="click-icon-unit8-page2-1 hover:scale-110 transition"
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
                  img5_letter,
                  img6_letter,
                ]}
                audioSrc={letterSound}
                checkpoints={[0, 4.38, 8.46, 9.62, 10.66, 12, 13.06]}
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

export default Unit8_Page2;
