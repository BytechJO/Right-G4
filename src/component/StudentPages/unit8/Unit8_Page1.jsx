// unit 8 
import { useState, useRef } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 64.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd41pg64-conversation-adult-lady_OcAs2iwe.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd42pg64-instruction-adult-lady_sKr2jrST.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import videoFile from "../../../assets/right grade 4/grade 4 unit 8 page 64.mp4";



const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

const captionsV = [
  { start: 0.24, end: 3.18, text: "Page 64, Unit 8 vocabulary." },
  { start: 4.30, end: 9.54, text: "Listen and repeat. Find the words and expressions in the conversation above." },
  { start: 9.54, end: 10.60, text: "Library," },
  { start: 10.60, end: 11.90, text: "museum," },
  { start: 11.90, end: 13.64, text: "volleyball," },
  { start: 13.64, end: 15.22, text: "baseball," },
  { start: 15.22, end: 16.58, text: "soccer," },
  { start: 16.58, end: 18.10, text: "grandma," },
  { start: 19.20, end: 19.80, text: "garden," },
  { start: 20.98, end: 21.92, text: "car race," },
  { start: 21.92, end: 24.18, text: "race car driver," },
  { start: 24.18, end: 25.72, text: "remember," },
  { start: 25.72, end: 27.30, text: "visited." },
  { start: 29.14, end: 30.52, text: "I know what you mean." },
  { start: 30.52, end: 32.50, text: "I sure do." },
  { start: 33.74, end: 34.82, text: "Was awesome." },
  { start: 34.82, end: 36.92, text: "What did you do?" },
  { start: 38.16, end: 39.72, text: "It was unbelievable." },
  { start: 40.84, end: 41.90, text: "When I grow up" },
];
const captions = [
  {
    start: 0.26,
    end: 7.10,
    text: "Page 64, Conversation. Listen and read, then say.",
  },
  {
    start: 7.10,
    end: 13.28,
    text: "It has been raining all day. It's boring being inside. I can't wait till it's summer.",
  },
  {
    start: 14.42,
    end: 18.50,
    text: "I know what you mean. Do you remember last summer, John?",
  },
  {
    start: 18.50,
    end: 23.72,
    text: "I sure do. Last summer was awesome. I lived in the library and the museum.",
  },
  {
    start: 24.74,
    end: 30.98,
    text: "My summer was great, too. I played volleyball and baseball with my friends.",
  },
  {
    start: 30.98,
    end: 36.84,
    text: "I didn't know you played baseball. I like soccer. I played soccer last summer.",
  },
  {
    start: 36.84,
    end: 39.52,
    text: "How about you, Helen? What did you do last summer?",
  },
  {
    start: 40.58,
    end: 45.30,
    text: "I visited my grandma. My grandma has a beautiful garden.",
  },
  {
    start: 45.30,
    end: 54.12,
    text: "I went to a car race. It was unbelievable how fast those cars were driving. I think I'm going to be a race car driver when I grow up.",
  },
];


const wordTimingsVoc = [
  { word: "Library,", start: 9.54, end: 10.60 },
  { word: "museum,", start: 10.60, end: 11.90 },
  { word: "volleyball,", start: 11.90, end: 13.64 },
  { word: "baseball,", start: 13.64, end: 15.22 },
  { word: "soccer,", start: 15.22, end: 16.58 },
  { word: "grandma,", start: 16.58, end: 18.10 },
  { word: "garden,", start: 19.20, end: 19.80 },
  { word: "car race,", start: 20.98, end: 21.92 },
  { word: "race car driver,", start: 21.92, end: 24.18 },
  { word: "remember,", start: 24.18, end: 25.72 },
  { word: "visited.", start: 25.72, end: 27.30 },
  { word: "I know what you mean.", start: 29.14, end: 30.52 },
  { word: "I sure do.", start: 30.52, end: 32.50 },
  { word: "Was awesome.", start: 33.74, end: 34.82 },
  { word: "What did you do?", start: 34.82, end: 36.92 },
  { word: "It was unbelievable.", start: 38.16, end: 39.72 },
  { word: "When I grow up", start: 40.84, end: 41.90 },
];
  
const clickableAreas = [
  {
    x1: 9.47,
    y1: 21.6,
    x2: 31.17,
    y2: 29.4,
    slice: { startFrom: 7.10, stopAt: 13.28 },
  },
  {
    x1: 33,
    y1: 23.6,
    x2: 48,
    y2: 30.9,
    slice: { startFrom: 14.42, stopAt: 18.50 },
  },
  {
    x1: 5,
    y1: 43,
    x2: 39,
    y2: 47,
    slice: { startFrom: 18.50, stopAt: 23.72 },
  },
  {
    x1: 68.1,
    y1: 22,
    x2: 92.1,
    y2: 28.3,
    slice: { startFrom: 24.74, stopAt: 30.98 },
  },
  {
    x1: 67.7,
    y1: 22.1,
    x2: 92.3,
    y2: 28.4,
    slice: { startFrom: 24.74, stopAt: 30.98 },
  },
  {
    x1: 59.7,
    y1: 42.5,
    x2: 94.2,
    y2: 47.2,
    slice: { startFrom: 30.98, stopAt: 36.84 },
  },
  {
    x1: 9.7,
    y1: 49.2,
    x2: 35.7,
    y2: 53.2,
    slice: { startFrom: 36.84, stopAt: 39.52 },
  },
  {
    x1: 15.7,
    y1: 69.5,
    x2: 46.3,
    y2: 73.8,
    slice: { startFrom: 40.58, stopAt: 45.30 },
  },
  {
    x1: 53.9,
    y1: 67.6,
    x2: 93.7,
    y2: 73.8,
    slice: { startFrom: 45.30, stopAt: 54.12 },
  },
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
                    stopAtSecond={3.18}
                                        wordTimings={wordTimingsVoc}

                    words={[
                       "Library,",
  "museum,",
  "volleyball,",
  "baseball,",
  "soccer,",
  "grandma,",
  "garden,",
  "car race,",
  "race car driver,",
  "remember,",
  "visited.",
  "I know what you mean.",
  "I sure do.",
  "Was awesome.",
  "What did you do?",
  "It was unbelievable.",
  "When I grow up",
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
                    "Why did John say that he lived in the library?"
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