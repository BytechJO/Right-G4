// unit 7
import { useState, useRef } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 58.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd36pg58-conversation-adult-lady_dViJPDTz.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd37pg58-instruction-adult-lady_vkT2GRbp.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import videoFile from "../../../assets/right grade 4/grade 4 unit 7 page 58.mp4";



const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
const captions = [
  {
    start: 0.28,
    end: 6.00,
    text: "Page 58, Conversation. Listen and read, then say.",
  },
  {
    start: 7.24,
    end: 12.38,
    text: "What's the matter, Hansel? You look like something is bothering you.",
  },
  {
    start: 12.58,
    end: 16.02,
    text: "I had an awful, strange dream yesterday.",
  },
  {
    start: 16.22,
    end: 19.22,
    text: "I have scary dreams, too. I don't like them.",
  },
  {
    start: 20.46,
    end: 22.30,
    text: "What happened in the dream?",
  },
  {
    start: 22.50,
    end: 26.10,
    text: "There was a big alligator chasing me in the middle of nowhere.",
  },
  {
    start: 27.40,
    end: 30.44,
    text: "Wow, that is scary. What happened next?",
  },
  {
    start: 31.66,
    end: 38.32,
    text: "I was running as fast as I could, but I stumbled over a rock and fell into a pond.",
  },
  {
    start: 38.52,
    end: 41.78,
    text: "Oh, my. I hope you were okay.",
  },
  {
    start: 41.98,
    end: 45.82,
    text: "I was mostly, but guess what happened next.",
  },
  {
    start: 46.02,
    end: 47.00,
    text: "What?",
  },
  {
    start: 47.14,
    end: 51.86,
    text: "There were two frogs sitting on a rock, singing a song.",
  },
  {
    start: 52.06,
    end: 54.10,
    text: "What a scary, funny dream.",
  },
];
const captionsV = [
  {
    start: 0.30,
    end: 3.46,
    text: "Page 58, Unit 7, Vocabulary.",
  },
  {
    start: 5.08,
    end: 10.46,
    text: "Listen and repeat. Find the words and expressions in the conversation above.",
  },
  {
    start: 12.36,
    end: 13.60,
    text: "Dream.",
  },
  {
    start: 13.60,
    end: 14.26,
    text: "Alligator.",
  },
  {
    start: 14.26,
    end: 15.36,
    text: "Rock.",
  },
  {
    start: 15.36,
    end: 16.72,
    text: "Pond.",
  },
  {
    start: 16.72,
    end: 18.26,
    text: "Frogs.",
  },
  {
    start: 18.26,
    end: 19.62,
    text: "Song.",
  },
  {
    start: 19.62,
    end: 21.20,
    text: "Strange.",
  },
  {
    start: 21.20,
    end: 23.68,
    text: "Scary.",
  },
  {
    start: 23.68,
    end: 25.16,
    text: "Chasing.",
  },
  {
    start: 25.16,
    end: 25.90,
    text: "Stumbled.",
  },
  {
    start: 25.90,
    end: 27.16,
    text: "Guess.",
  },
  {
    start: 28.22,
    end: 29.28,
    text: "I don't like them.",
  },
  {
    start: 29.28,
    end: 31.56,
    text: "In the middle of nowhere.",
  },
  {
    start: 32.92,
    end: 34.26,
    text: "What happened next?",
  },
  {
    start: 35.46,
    end: 36.72,
    text: "Oh my!",
  },
  {
    start: 38.02,
    end: 39.04,
    text: "I was mostly.",
  },
];

const wordTimingsVoc = [
  { start: 12.36, end: 13.60 }, // Dream
  { start: 13.60, end: 14.26 }, // Alligator
  { start: 14.26, end: 15.36 }, // Rock
  { start: 15.36, end: 16.72 }, // Pond
  { start: 16.72, end: 18.26 }, // Frogs
  { start: 18.26, end: 19.62 }, // Song
  { start: 19.62, end: 21.20 }, // Strange
  { start: 21.20, end: 23.68 }, // Scary
  { start: 23.68, end: 25.16 }, // Chasing
  { start: 25.16, end: 25.90 }, // Stumbled
  { start: 25.90, end: 27.16 }, // Guess
  { start: 28.22, end: 29.28 }, // I don't like them
  { start: 29.28, end: 31.56 }, // In the middle of nowhere
  { start: 32.92, end: 34.26 }, // What happened next?
  { start: 35.46, end: 36.72 }, // Oh my!
  { start: 38.02, end: 39.04 }, // I was mostly
];



  // UNIT 7
const clickableAreas = [
  // 1
  { x1: 14, y1: 22.1, x2: 46.3, y2: 26.7, slice: { startFrom: 7.24, stopAt: 12.58 } },

  // 2
  { x1: 6.1, y1: 40.6, x2: 21.1, y2: 46.8, slice: { startFrom: 12.58, stopAt: 16.22 } },

  // 3
  { x1: 21.1, y1: 38.9, x2: 33.6, y2: 45.5, slice: { startFrom: 16.22, stopAt: 19.42 } },

  // 4
  { x1: 34.1, y1: 42.3, x2: 49.1, y2: 46.6, slice: { startFrom: 20.46, stopAt: 22.50 } },

  // 5
  { x1: 50.1, y1: 40.8, x2: 72.3, y2: 47.1, slice: { startFrom: 22.50, stopAt: 26.30 } },

  // 6
  { x1: 73.1, y1: 43.4, x2: 94.2, y2: 47.7, slice: { startFrom: 27.40, stopAt: 30.64 } },

  // 7
  { x1: 9.4, y1: 47.4, x2: 47.4, y2: 51.7, slice: { startFrom: 31.66, stopAt: 38.52 } },

  // 8
  {
    x1: 55.5,
    y1: 48.7,
    x2: 78.9,
    y2: 53.1,
    slice: { startFrom: 38.52, stopAt: 41.98 },
  },

  // 9
  { x1: 78.5, y1: 52.4, x2: 87.4, y2: 55.1, slice: { startFrom: 41.98, stopAt: 46.02 } },

  // 10
  { x1: 78.5, y1: 52.4, x2: 87.4, y2: 55.1, slice: { startFrom: 46.02, stopAt: 47.14 } },

  // 11
  { x1: 51.5, y1: 66.8, x2: 70.7, y2: 73, slice: { startFrom: 47.14, stopAt: 52.06 } },

  // 12
  { x1: 78.1, y1: 68.6, x2: 91.5, y2: 72.8, slice: { startFrom: 52.06, stopAt: 54.30 } },
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
                    stopAtSecond={3.46}
                                        wordTimings={wordTimingsVoc}
words={[
  "Dream",
  "Alligator",
  "Rock",
  "Pond",
  "Frogs",
  "Song",
  "Strange",
  "Scary",
  "Chasing",
  "Stumbled",
  "Guess",
  "I don't like them",
  "In the middle of nowhere",
  "What happened next?",
  "Oh my!",
  "I was mostly",
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
                    "Why was Hansel's dream funny and scary at the same time?"
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
                className="pauseBtn-icon-CD-page4 hover:scale-110 transition"
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