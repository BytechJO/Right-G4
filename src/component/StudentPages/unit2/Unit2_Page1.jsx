import { useState, useRef } from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page 10.png";
import "./Unit2_Page1.css";
// import unit2_page1_CD8 from "../../../assets/img_unit2/sounds-unit2/CD8.Pg10_U2.Intro_Adult Lady.mp3";
import longAudio from "../../../assets/audio/ClassBook/Unit 2/P 10/unit2-page10-listen.mp3";
import Unit2_Page1_find from "./Unit2_Page1_find";
import Unit2_Page1_Vocab from "./Unit2_Page1_Vocab";
import Unit2_Page1_Read from "./Unit2_Pag1_Read";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import allUnit2 from "../../../assets/audio/ClassBook/Unit 2/P 10/unit2-pg10-allunit.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound12.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-01.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-02.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-03.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Page10-11/1-04.svg";
import sound1_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_1.4_Adult Lady.mp3";
import FourImagesWithAudio from "../../FourImagesWithAudio";
const Unit2_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const captionsExample = [
    {
      start: 0.659,
      end: 6.559,
      text: "Page ten, unit two, summer vacation. Page ten, unit two, vocabulary.",
    },
    {
      start: 7.819,
      end: 55.179,
      text: "One, France. Two, bus. Three, clock tower. Four, world map. Five, Nile River. Six, Egypt. Seven, pyramids. Eight, Australia. Nine, South America. Ten, Statue of Liberty. Eleven, tourist, tourists. Twelve, globe. Page ten. Listen and read along. Short U. Bug, runner, cup. Unit two, page eleven, reading. Listen and read along. Vacation in France.",
    },
    {
      start: 56.299,
      end: 89.139,
      text: "Tom and his family love traveling. They always find exciting things when they travel. Often, they go to France during their summer vacation. They are never bored of France. They find that each part of France is different and interesting. Tom's family always spends two days in Paris. It is a beautiful city. They enjoy the food and places there. Sometimes they take a bus or train to other famous places in France too.",
    },
    {
      start: 90.239,
      end: 96.779,
      text: "It is always fun to travel. Page eleven. Listen, read and repeat.",
    },
    {
      start: 96.779,
      end: 99.639,
      text: "Where do you go on your summer vacation?",
    },
    {
      start: 99.639,
      end: 100.939,
      text: "I usually go to Italy.",
    },
    {
      start: 102.0,
      end: 105.439,
      text: "Page eleven. Listen and read along.",
    },
  ];
  const captions = [
    { start: 0, end: 3.5, text: "Page 4. Listen and read along." },
    { start: 3.8, end: 7.54, text: " Short U. Bug, runner, cup" },
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
    { x1: 68.6, y1: 32.7, sound: 1, isPrimary: true },

    // الصوت الثاني – 27
    { x1: 68.1, y1: 15.7, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 65.77, y1: 18.66, x2: 79.65, y2: 26.27, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 80.8, y1: 10.4, sound: 3, isPrimary: true },

    // الصوت الثالث – الإضافية
    { x1: 77.84, y1: 12.23, x2: 81.28, y2: 17.48, sound: 3, isPrimary: false },

    // الصوت الرابع – الأساسية
    { x1: 60, y1: 37.9, sound: 4, isPrimary: true },

    // الصوت الخامس – الأساسية
    { x1: 57.5, y1: 68.6, sound: 5, isPrimary: true },

    // الصوت الخامس – الإضافية
    { x1: 56.51, y1: 65.2, x2: 60.42, y2: 75.63, sound: 5, isPrimary: false },

    // الصوت السادس – الأساسية
    { x1: 51.8, y1: 56.9, sound: 6, isPrimary: true },

    // الصوت السابع – الأساسية
    { x1: 44.6, y1: 62.3, sound: 7, isPrimary: true },
    { x1: 38.41, y1: 61.47, x2: 53.71, y2: 66.04, sound: 7, isPrimary: false },

    // الصوت الثامن – الأساسية
    { x1: 84.2, y1: 47.9, sound: 8, isPrimary: true },

    // الصوت الثامن – الإضافية
    { x1: 79.56, y1: 47.09, x2: 89.9, y2: 53.69, sound: 8, isPrimary: false },

    // الصوت التاسع – الأساسية
    { x1: 28.4, y1: 43.5, sound: 9, isPrimary: true },

    // الصوت التاسع – الإضافية
    { x1: 22.68, y1: 40.15, x2: 33.24, y2: 53.35, sound: 9, isPrimary: false },

    // الصوت العاشر – الأساسية
    { x1: 32.2, y1: 22.5, sound: 10, isPrimary: true },

    // الصوت  العاشر – الإضافية
    { x1: 20.96, y1: 20.69, x2: 34.31, y2: 30.84, sound: 10, isPrimary: false },

    // الصوت الحادي عشر – الأساسية
    { x1: 33.7, y1: 74.5, sound: 11, isPrimary: true },

    // الصوت الحادي عشر – الإضافية
    { x1: 32.38, y1: 70.95, x2: 49.61, y2: 80.43, sound: 11, isPrimary: false },

    // الصوت الثاني عشر – الأساسية
    { x1: 83.4, y1: 64.4, sound: 12, isPrimary: true },

    // الصوت الثاني عشر – الإضافية
    { x1: 75.68, y1: 55.72, x2: 91.84, y2: 67.23, sound: 12, isPrimary: false },
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
        className="click-icon-unit2-page1-1 hover:scale-110 transition"
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
                <Unit2_Page1_find />
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
        className="headset-icon-CD-unit2-page1-2 hover:scale-110 transition"
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
                <Unit2_Page1_Vocab />
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
        className="click-icon-unit2-page1-2 hover:scale-110 transition"
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
                checkpoints={[0, 3.2, 5.4, 6.52, 7.12]}
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
