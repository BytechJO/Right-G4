//unit 10
import { useState, useRef } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 10 Stella Goes Shopping Folder/Page 82.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd52pg82-conversation-adult-lady_1ZbTMbBN.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd53pg82-instruction-adult-lady_aDKW3OzV.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import videoFile from "../../../assets/right grade 4/grade 4 unit 10 page 82.mp4";
import "./Unit10_Page1.css"

const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
const captionsV = [
  { start: 0.26, end: 3.84, text: "Page 82, unit 10, vocabulary." },
  { start: 3.84, end: 10.52, text: "Listen and repeat. Find the words and expressions in the conversation above." },
  { start: 10.52, end: 11.76, text: "Shirts," },
  { start: 11.76, end: 12.96, text: "rack," },
  { start: 12.96, end: 14.80, text: "checkout counter," },
  { start: 14.80, end: 16.24, text: "dollars," },
  { start: 16.24, end: 17.72, text: "casual," },
  { start: 17.72, end: 19.28, text: "comfortable," },
  { start: 20.30, end: 21.12, text: "particular," },
  { start: 21.12, end: 22.64, text: "size," },
  { start: 23.74, end: 24.20, text: "pay," },
  { start: 25.30, end: 25.96, text: "purchase," },
  { start: 25.96, end: 27.40, text: "wonderful." },
  { start: 27.40, end: 29.42, text: "How can I help you?" },
  { start: 29.42, end: 31.38, text: "Have you any..." },
  { start: 32.80, end: 33.78, text: "I'd like some..." },
  { start: 35.20, end: 36.22, text: "I'm here to help." },
  { start: 37.34, end: 38.60, text: "You're very welcome." },
];
const captions = [
  {
    start: 0.50,
    end: 2.78,
    text: "Page 82, Conversation.",
  },
  {
    start: 2.78,
    end: 9.54,
    text: "Listen and read, then say. Good morning. How can I help you?",
  },
  {
    start: 9.54,
    end: 14.62,
    text: "Have you any shirts? I'd like some casual and comfortable shirts.",
  },
  {
    start: 14.62,
    end: 21.32,
    text: "Sure. I'm here to help. Let's look at this rack over here. What about these shirts?",
  },
  {
    start: 21.32,
    end: 25.18,
    text: "Yes. These shirts look casual.",
  },
  {
    start: 25.18,
    end: 32.70,
    text: "Are you looking for a particular color? This shirt comes in three colors. I have yellow, blue, and green.",
  },
  {
    start: 32.70,
    end: 34.58,
    text: "I'll take the blue shirt.",
  },
  {
    start: 34.58,
    end: 38.84,
    text: "Great. Have you got a particular size in mind?",
  },
  {
    start: 38.84,
    end: 40.80,
    text: "I'll go with a large size.",
  },
  {
    start: 41.82,
    end: 48.12,
    text: "Wonderful. Let's go to the checkout counter to pay for your purchase. It'll be $9.",
  },
  {
    start: 48.12,
    end: 51.56,
    text: "I really love this shirt. Thanks so much for your help.",
  },
  {
    start: 52.70,
    end: 55.36,
    text: "You're very welcome. Please come again.",
  },
];
 const wordTimingsVoc = [
  { word: "Shirts,", start: 10.52, end: 11.76 },
  { word: "rack,", start: 11.76, end: 12.96 },
  { word: "checkout counter,", start: 12.96, end: 14.80 },
  { word: "dollars,", start: 14.80, end: 16.24 },
  { word: "casual,", start: 16.24, end: 17.72 },
  { word: "comfortable,", start: 17.72, end: 19.28 },
  { word: "particular,", start: 20.30, end: 21.12 },
  { word: "size,", start: 21.12, end: 22.64 },
  { word: "pay,", start: 23.74, end: 24.20 },
  { word: "purchase,", start: 25.30, end: 25.96 },
  { word: "wonderful.", start: 25.96, end: 27.40 },
  { word: "How can I help you?", start: 27.40, end: 29.42 },
  { word: "Have you any...", start: 29.42, end: 31.38 },
  { word: "I'd like some...", start: 32.80, end: 33.78 },
  { word: "I'm here to help.", start: 35.20, end: 36.22 },
  { word: "You're very welcome.", start: 37.34, end: 38.60 },
  ];
const clickableAreas = [
  // 1
  { x1: 9.7, y1: 21.4, x2: 25.4, y2: 26.8, slice: { startFrom: 6.70, stopAt: 9.54 } },

  // 2
  { x1: 25.5, y1: 25.4, x2: 47.5, y2: 31.4, slice: { startFrom: 9.54, stopAt: 14.62 } },

  // 3
  { x1: 55.9, y1: 21.5, x2: 93.2, y2: 25.5, slice: { startFrom: 14.62, stopAt: 21.32 } },

  // 4
  { x1: 78.5, y1: 26.6, x2: 93.5, y2: 30.8, slice: { startFrom: 21.32, stopAt: 25.18 } },

  // 5
  { x1: 49.5, y1: 39.1, x2: 75.1, y2: 46.8, slice: { startFrom: 25.18, stopAt: 32.70 } },

  // 6
  { x1: 76, y1: 43.8, x2: 95.6, y2: 47, slice: { startFrom: 32.70, stopAt: 34.58 } },

  // 7
  { x1: 10.5, y1: 47.3, x2: 31.9, y2: 51.8, slice: { startFrom: 34.58, stopAt: 38.84 } },

  // 8
  { x1: 33.5, y1: 51, x2: 47.2, y2: 55.5, slice: { startFrom: 38.84, stopAt: 40.80 } },

  // 9
  { x1: 56.1, y1: 47.3, x2: 88.5, y2: 53.5, slice: { startFrom: 41.82, stopAt: 48.12 } },

  // 10
  { x1: 68.5, y1: 54.4, x2: 94, y2: 58.9, slice: { startFrom: 48.12, stopAt: 51.56 } },

  // 11
  { x1: 51.9, y1: 69.5, x2: 72.5, y2: 74, slice: { startFrom: 52.70, stopAt: 55.36 } },
];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  // تشغيل slice من الصوت الرئيسي
  const playSlice = (slice) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);

    const checkStop = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(checkStop);
        setIsPlaying(false);
        setActiveAreaIndex(null);
        setHoveredAreaIndex(null);
      }
    }, 100);

    audio.onended = () => {
      clearInterval(checkStop);
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    };
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_6})` }}
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
          onClick={(e) => {
            e.stopPropagation();
            setActiveAreaIndex(index);
            playSlice(area.slice);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        />
      ))}

      {/* زر الصوت الرئيسي - بيشغل الصوت كامل مع popup */}
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
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
                  src={mainSound}
                  captions={captions}
                />
              </div>
            );
          }}
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
          className="aaaa hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() =>
              openPopup(
                "html",
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Vocabulary
                    title="VOCABULARY"
                    subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                    sound={vocSound}
                    captions={captionsV}
                    stopAtSecond={3.84}
                                        wordTimings={wordTimingsVoc}

                    words={[
                       "Shirts,",
  "rack,",
  "checkout counter,",
  "dollars,",
  "casual,",
  "comfortable,",
  "particular,",
  "size,",
  "pay,",
  "purchase,",
  "wonderful.",
  "How can I help you?",
  "Have you any...",
  "I'd like some...",
  "I'm here to help.",
  "You're very welcome.",
                    ]}
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
        </div> <div
          className="headset-icon-CD-page4-3 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() =>
              openPopup(
                "html",
                <CriticalThinking
                  title={
                    "What size shirt did Stella choose?"
                  }
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
          <div
                                className="headset-icon-CD-unit10-page1-2 hover:scale-110 transition"
                                style={{ overflow: "visible" }}
                              >
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 90 90"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openPopup(
                                      "video",
                                      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                                        <video autoPlay controls style={{ width: "auto", height: "80%", objectFit: "fill", borderRadius: "20px" }}>
                                          <source src={videoFile} type="video/mp4" />
                                        </video>
                                      </div>
                                    );
                                  }}
                                  style={{ overflow: "visible" }}
                                >
                                  <image className="svg-img" href={pauseBtn} x="0" y="0" width="90" height="90" />
                                </svg>
                              </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page6;