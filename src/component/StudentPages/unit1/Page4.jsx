import React, { useRef, useState } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page4.png";
import grammarSound from "../../../assets/audio/ClassBook/Unit 1/P 6/unit1-pg6-grammar1.mp3";
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_2.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_3.1_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 6/Pg6_4.1_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 3 unit 1 page 6.mp4";
import "./Page6.css";
const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0,
      end: 29.1,
      text: "Page six, exercise one. Write grammar. The bear is shorter than the giraffe. The giraffe is taller than the bear. The elephant is the biggest animal in the zoo. The bear is shorter than the giraffe. The giraffe is taller than the bear. The bush is younger than the tree. The tree is older than the bush. Is the bicycle faster than the skateboard? Yes, it is",
    },
  ];

  // 🟩 مناطق مستطيلة (x1,y1,x2,y2)
  const clickableAreas = [
    { x1: 10.37, y1: 21.49, x2: 37.13, y2: 25.86, sound: sound1 },
    { x1: 25.81, y1: 26.7, x2: 48.32, y2: 30.45, sound: sound2 },
    { x1: 36, y1: 42.1, x2: 48, y2: 44.85, sound: sound3 },
    { x1: 5.5, y1: 42.1, x2: 32, y2: 46.3, sound: sound4 },
    { x1: 10.5, y1: 49.1, x2: 33, y2: 53.3, sound: sound4 },
    { x1: 9.5, y1: 69.1, x2: 49, y2: 74.1, sound: sound4 },
    { x1: 55.37, y1: 21.49, x2: 94.77, y2: 25.86, sound: sound1 },
    { x1: 54.37, y1: 27.49, x2: 74.77, y2: 31.86, sound: sound1 },
    { x1: 55.37, y1: 42.2, x2: 93.37, y2: 46.57, sound: sound1 },
    { x1: 51.37, y1: 54.6, x2: 74.37, y2: 59.1, sound: sound1 },
    {   x1: 59.37,
  y1: 70.1,
  x2: 94.37,
  y2: 74.3,sound: sound1 },

  ];
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
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
      style={{ backgroundImage: `url(${page_6})` }}
    >
      {/* رسم المستطيلات التفاعلية */}
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


    </div>
  );
};

export default Page6;
