import React, { useState, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 41.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-08.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import soundListen from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-reading.mp3";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/Asset 35.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/Asset 36.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.4_Adult Lady.mp3";
import letterSound from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-listen.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import repeat from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-bebo&lolo.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import Bebo from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_1.2_Lolo.mp3";
// import sound1 from "../../../assets/img_unit5/sounds-unit5/U2-06.mp3";
// import sound2 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound3 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";
// import sound4 from "../../../assets/img_unit5/sounds-unit5/U2-07.mp3";

import "./Unit5_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit5_Page2 = ({ openPopup }) => {
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
  const captionsExample = [
    {
      start: 0.359,
      end: 36.439,
      text: "Page 41 reading. Listen and read along. Tom lives in a house. Tom and his family live in a house near a big city. The house has many rooms. Tom and his sister like to play and study in their bedrooms. Tom's family sit together in the living room. When Tom is not riding his bike, he keeps it in the garage. There are many tall buildings behind the house. There is a yard next to Tom's house. There is a swing and slide in the yard. Tom's sister is on the slide and his cat is beside the slide",
    },
  ];

  const captions2 = [
    { start: 0, end: 4.33, text: "Page 41. Listen and read along. " },
    { start: 5.5, end: 8.6, text: "Y. Baby. Candy. Party" },
  ];
  const captions3 = [
    {
      start: 0.239,
      end: 4.88,
      text: "Page 41. Listen, read, and repeat.",
    },
    {
      start: 4.88,
      end: 5.94,
      text: "I live in a city.",
    },
    {
      start: 7.159,
      end: 8.099,
      text: "I live in a town.",
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
        className="headset-icon-CD-unit5-page2-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit5-page2-2 hover:scale-110 transition"
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
                checkpoints={[0, 4.5, 6.1]}
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
        className="click-icon-unit5-page2-1 hover:scale-110 transition"
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
                checkpoints={[0, 4.5, 5.8, 6.9, 7.62]}
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

export default Unit5_Page2;
