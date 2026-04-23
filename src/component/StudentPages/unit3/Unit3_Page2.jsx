import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 23.png";
import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/1-08.svg";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import main from "../../../assets/audio/ClassBook/Unit 3/P 23/main.mp3";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 3/P 23/sound1.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 3/P 23/sound2.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 3/P 23/sound3.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 3/P 23/sound4.mp3";
import reapeatSound from "../../../assets/audio/ClassBook/Unit 3/P 23/repeat.mp3";
import Bebo from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.2_Lolo.mp3";
import along from "../../../assets/audio/ClassBook/Unit 3/P 23/along.mp3";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/Asset 30.svg";

import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 22-23/Asset 30.svg";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";
import shopkeeper1 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.2_Shopkeeper.mp3";
import Lala1 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.3_Lala.mp3";
import shopkeeper2 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.4_Shopkeeper.mp3";
import Lala2 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.5_Lala.mp3";
import shopkeeper3 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.6_Shopkeeper.mp3";
import Lala3 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.7_Lala.mp3";
import shopkeeper4 from "../../../assets/audio/ClassBook/Unit 3/P 23/Pg23_1.8_Shopkeeper.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
// import sound1 from "../../../assets/img_unit3/sounds-unit3/U2-06.mp3";
// import sound2 from "../../../assets/img_unit3/sounds-unit3/U2-07.mp3";
// import sound3 from "../../../assets/img_unit3/sounds-unit3/U2-07.mp3";
// import sound4 from "../../../assets/img_unit3/sounds-unit3/U2-07.mp3";

import "./Unit3_Page2.css";
import ReadChoose from "../../ReadChoose";
const Unit3_Page2 = ({ openPopup }) => {
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
  const captions = [
    { start: 0, end: 5.48, text: "Page 23. Listen, read, and repeat." },
    { start: 5.48, end: 8.22, text: "Can we go shopping on Saturday?" },
    { start: 8.22, end: 9.18, text: "Yes, we can." },
  ];

  const captionsExample = [
    {
      start: 0,
      end: 5,
      text: "Unit three, page 23 reading. Listen and read along.",
    },
    {
      start: 5,
      end: 6.54,
      text: " Picky shopper.",
    },
    {
      start: 7,
      end: 17,
      text: "It is a nice sunny day. Lala decides to go shopping. He goes to the store next to his home. He is thinking about what he will buy. ",
    },
    {
      start: 17.12,
      end: 20.18,
      text: "Good morning. How can I help you, Lala?",
    },
    {
      start: 20.18,
      end: 27.38,
      text: "Good morning to you. I'm looking for some boots. Do you have any orange boots, please?",
    },
    {
      start: 27.38,
      end: 33.02,
      text: "No, I'm sorry, I don't have any orange boots, but I have some pink ones.",
    },
    {
      start: 33.02,
      end: 39.3,
      text: "No, that won't work. I don't like pink. What else do you have? Do you have any purple gloves?",
    },
    {
      start: 40.38,
      end: 49.18,
      text: "Yes, I do have some purple gloves. Look, I also have some blue and green gloves too. The blue gloves would match your shirt.",
    },
    {
      start: 49.18,
      end: 53.86,
      text: "Wow, that's great, but I'll take some red gloves, please.",
    },
    {
      start: 53.86,
      end: 57.48,
      text: "There are no red gloves. You are a picky shopper, aren't you?",
    },
  ];

  const captions2 = [
    { start: 0, end: 3.9, text: "Page 22. Listen and read along." },
    { start: 4, end: 10.38, text: "C-H, ch. T-C-H, ch. S-H, sh." },
    { start: 11.44, end: 13.66, text: "peach, watch, shell" },
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
    { x1: 5, y1: 22, x2: 56, y2: 26.5, sound: shopkeeper1 },
    { x1: 5, y1: 26, x2: 63, y2: 31.5, sound: Lala1 },
    { x1: 5, y1: 31, x2: 56, y2: 36.5, sound: shopkeeper2 },
    { x1: 5, y1: 36, x2: 66.5, y2: 41.5, sound: Lala2 },
    { x1: 5, y1: 42, x2: 63, y2: 46.5, sound: shopkeeper3 },
    { x1: 5, y1: 46, x2: 58, y2: 54, sound: Lala3 },
    { x1: 5, y1: 53.5, x2: 56, y2: 59, sound: shopkeeper4 },
  ];
  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_2})` }}
    >
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
      <audio ref={audioRef} style={{ display: "none" }} />
      <div
        className="headset-icon-CD-unit3-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={main} captions={captionsExample} />,
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
        className="headset-icon-CD-unit3-page2-2 hover:scale-110 transition"
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
                images={[read, img1, img2]}
                audioSrc={reapeatSound}
                checkpoints={[0, 5.48, 8.22]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={repeatSounds}
                captions={captions}
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
        className="click-icon-unit3-page2-1 hover:scale-110 transition"
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
                audioSrc={along}
                checkpoints={[0, 3.94, 10.66, 11.88, 13.1]}
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

export default Unit3_Page2;
