import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 29.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/1-08.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import soundListen from "../../../assets/audio/ClassBook/Unit 4/P 29/pg29-read1.mp3";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/Asset 32.svg";
import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 28-29/Asset 33.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_2.4_Adult Lady.mp3";
import repeat from "../../../assets/audio/ClassBook/Unit 4/P 29/repeat_p29.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import Bebo from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_1.2_Lolo.mp3";
import letterSound from "../../../assets/audio/ClassBook/Unit 4/P 29/read2_p29.mp3";
import long from "../../../assets/audio/ClassBook/Unit 4/P 29/Pg29_1.1_Adult Lady.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
// import sound1 from "../../../assets/img_unit4/sounds-unit4/U2-06.mp3";
// import sound2 from "../../../assets/img_unit4/sounds-unit4/U2-07.mp3";

import "./Unit4_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit4_Page2 = ({ openPopup }) => {
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
      start: 0.519,
      end: 4.179,
      text: "Page 29 reading. Listen and read along.",
    },
    {
      start: 5.339,
      end: 7.48,
      text: "Helen and Stella get an email.",
    },
    {
      start: 8.53,
      end: 27.739,
      text: " Hey friends. How are you doing, Helen and Stella? This is Julia, your friend from London Court School. Our school is big. Look at the pictures of London. The weather is very rainy. London gets very cold in winter. However, in the spring, London is very pretty.",
    },
    {
      start: 28.819,
      end: 37.599,
      text: "What's the weather like where you live? Please send me an email when you can. I'm waiting to hear from you. Your friend, Julia",
    },
  ];

  const captions2 = [
    { start: 0, end: 3.8, text: "Page 29. Listen and read along. " },
    { start: 4.3, end: 9.4, text: "Voiced TH ,Mother, That, This " },
  ];
  const captions3 = [
    { start: 0, end: 4.4, text: "Page 29. Listen, read, and repeat. " },
    { start: 4.6, end: 6, text: "Please send me an email." },
    { start: 6.8, end: 7.48, text: "I will tomorrow." },
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
  const clickableAreas = [
    { x1: 5.69, y1: 14.43, x2: 50.93, y2: 43.87, sound: long },
  ];
  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_2})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index
              ? "highlight"
              : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            setActiveAreaIndex(index); // لتثبيت الهايلايت أثناء الصوت
            playSound(area.sound);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}

      <div
        className="headset-icon-CD-unit4-page2-1 hover:scale-110 transition"
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
        className="headset-icon-CD-unit4-page2-2 hover:scale-110 transition"
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
                checkpoints={[0, 4.6, 6.8]}
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
        className="click-icon-unit4-page2-1 hover:scale-110 transition"
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
                checkpoints={[0, 3.8, 6.4, 7.56, 8.68]}
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

export default Unit4_Page2;
