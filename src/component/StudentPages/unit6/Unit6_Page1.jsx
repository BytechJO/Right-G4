import { useState, useRef } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 46.png";
import mainSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import vocSound from "../../../assets/audio/ClassBook/Grade 4/cd1pg4-conversation-adult-lady-t_1cApuaJF.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Vocabulary from "../Vocabulary";
import CriticalThinking from "../CriticalThinking";

const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

const captions = [
  { start: 0, end: 6.60, text: "Page four conversation. Listen and read, then say." },
  { start: 6.60, end: 10.5, text: "Look at my new robot, Sarah. His name is Botboy." },
  { start: 10.5, end: 15.00, text: "Hello, Botboy. I like your robot, Hansel." },
  { start: 15.00, end: 19, text: "Thanks, Sarah. Robots will do many things in the future." },
  { start: 19, end: 19.74, text: "Like what?" },
  { start: 20.82, end: 28, text: "Robots will build buildings. They will drive firetrucks. They will do lots of things. " },
  { start: 28, end: 31.40, text: "The robots will have a lot of work to do." },
  { start: 31.80, end: 38.8, text: "Yes, but they won't mind. Robots don't get tired. They're machines after all." },
  { start: 39.02, end: 41.50, text: "Do you think robots will do our homework?" },
  { start: 42.50, end: 48.5, text: "Of course. We won't have to do homework anymore. The robots will do it for us." },
  { start: 48.98, end: 52.8, text: "How will we learn? We must do our homework." },
  { start:52.8, end: 58.74, text: "Oh, I didn't think about that. You're right. Well, at least they will clean our rooms." },
  { start:52.8, end: 58.74, text: "Oh, I didn't think about that. You're right. Well, at least they will clean our rooms." },
  { start:52.8, end: 58.74, text: "Oh, I didn't think about that. You're right. Well, at least they will clean our rooms." },

];
 const wordTimingsVoc = [
    { start: 8.8, end: 11.1 },
    { start: 11.2, end: 13.6 },
    { start: 13.94, end: 15.5 },
    { start: 16.4, end: 17.6 },

    { start: 19.04, end: 20.26 },
    { start: 21.6, end: 22.94 },
    { start: 24.2, end: 25.38 },
    { start: 26.8, end: 28.64 },

    { start: 29.719, end: 31.5 },
    { start: 32.32, end: 34.18 },
    { start: 35.06, end: 37.06 },
    { start: 37.719, end: 39.579 },
    { start: 40.36, end: 42.499 },
    { start: 43.279, end: 45.459 },

    { start: 46.259, end: 48.459 },
    { start: 49.52, end: 52.119 },
  ];

  
  const clickableAreas = [
  {
  x1: 9.37,
  y1: 21.6,
  x2: 39.07,
  y2: 26.4,
  slice: { startFrom: captions[1].start, stopAt: captions[1].end },
},
{
  x1: 23,
  y1: 27.6,
  x2: 48,
  y2: 33.8,
  slice: { startFrom: captions[2].start, stopAt: captions[2].end },
},
{
  x1: 14.6,
  y1: 43.7,
  x2: 48.6,
  y2: 46.9,
  slice: { startFrom: captions[3].start, stopAt: captions[3].end },
},
{
  x1: 55.1,
  y1: 23.5,
  x2: 72.1,
  y2: 26.3,
  slice: { startFrom: captions[4].start, stopAt: captions[4].end },
},
{
  x1: 66.5,
  y1: 27,
  x2: 92.1,
  y2: 34.8,
  slice: { startFrom: captions[5].start, stopAt: captions[5].end },
},
{
  x1: 9.5,
  y1: 48.3,
  x2: 42.9,
  y2: 51.4,
  slice: { startFrom: captions[6].start, stopAt: captions[6].end },
},
{
  x1: 32.5,
  y1: 52,
  x2: 45.6,
  y2: 54.8,
  slice: { startFrom: captions[7].start, stopAt: captions[7].end },
},
{
  x1: 6.1,
  y1: 67.9,
  x2: 28.4,
  y2: 73.8,
  slice: { startFrom: captions[8].start, stopAt: captions[8].end },
},
{
  x1: 28.6,
  y1: 70.8,
  x2: 48.6,
  y2: 73.6,
  slice: { startFrom: captions[9].start, stopAt: captions[9].end },
},
{
  x1: 55.5,
  y1: 48.5,
  x2: 94.9,
  y2: 52.7,
  slice: { startFrom: captions[10].start, stopAt: captions[10].end },
},
{
  x1: 61.5,
  y1: 53.4,
  x2: 95,
  y2: 59.4,
  slice: { startFrom: captions[11].start, stopAt: captions[11].end },
},
{
  x1: 55.9,
  y1: 70.99,
  x2: 81.7,
  y2: 73.79,
  slice: { startFrom: captions[12].start, stopAt: captions[12].end },
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
                    captions={captions}
                    stopAtSecond={8.5}
                                        wordTimings={wordTimingsVoc}

                    words={[
                      "alarm",
                      "notebook",
                      "pillow",
                      "counting",
                      "face",
                      "figure",
                      "reviewing",
                      "pancakes",
                      "starving",
                      "actually",
                      "mirror",
                      "Uh-oh!",
                      "fell asleep",
                      "How did you know?",
                      "right away",
                      "on one side",
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
                    "Why did Hansel’s mom say he could do an extra math problem?"
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
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page6;