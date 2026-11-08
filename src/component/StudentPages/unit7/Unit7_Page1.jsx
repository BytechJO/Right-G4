import React, { useRef, useState, useEffect } from "react";
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
import { useAudio } from "../../../context/AudioContext";
const pageKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat)
      event.currentTarget.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const PAGE_ID = "unit7-page58";

const Page6 = ({ openPopup }) => {
  const audioRef = useRef(null);
  const { registerAudio, stopCurrent, activePageId } = useAudio();

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  useEffect(() => {
    if (activePageId !== PAGE_ID && activePageId !== null) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setActiveAreaIndex(null);
      setHoveredAreaIndex(null);
    }
  }, [activePageId]);

  const captions = [
    {
      start: 0.28,
      end: 6.0,
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
    { start: 20.46, end: 22.3, text: "What happened in the dream?" },
    {
      start: 22.5,
      end: 26.1,
      text: "There was a big alligator chasing me in the middle of nowhere.",
    },
    {
      start: 27.4,
      end: 30.44,
      text: "Wow, that is scary. What happened next?",
    },
    {
      start: 31.66,
      end: 38.32,
      text: "I was running as fast as I could, but I stumbled over a rock and fell into a pond.",
    },
    { start: 38.52, end: 41.78, text: "Oh, my. I hope you were okay." },
    {
      start: 41.98,
      end: 45.82,
      text: "I was mostly, but guess what happened next.",
    },
    { start: 46.02, end: 47.0, text: "What?" },
    {
      start: 47.14,
      end: 51.86,
      text: "There were two frogs sitting on a rock, singing a song.",
    },
    { start: 52.06, end: 54.1, text: "What a scary, funny dream." },
  ];

  const captionsV = [
    { start: 0.3, end: 3.46, text: "Page 58, Unit 7, Vocabulary." },
    {
      start: 5.08,
      end: 10.46,
      text: "Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 12.36, end: 13.6, text: "Dream." },
    { start: 13.6, end: 14.26, text: "Alligator." },
    { start: 14.26, end: 15.36, text: "Rock." },
    { start: 15.36, end: 16.72, text: "Pond." },
    { start: 16.72, end: 18.26, text: "Frogs." },
    { start: 18.26, end: 19.62, text: "Song." },
    { start: 19.62, end: 21.2, text: "Strange." },
    { start: 21.2, end: 23.68, text: "Scary." },
    { start: 23.68, end: 25.16, text: "Chasing." },
    { start: 25.16, end: 25.9, text: "Stumbled." },
    { start: 25.9, end: 27.16, text: "Guess." },
    { start: 28.22, end: 29.28, text: "I don't like them." },
    { start: 29.28, end: 31.56, text: "In the middle of nowhere." },
    { start: 32.92, end: 34.26, text: "What happened next?" },
    { start: 35.46, end: 36.72, text: "Oh my!" },
    { start: 38.02, end: 39.04, text: "I was mostly." },
  ];

  const wordTimingsVoc = [
    { start: 12.36, end: 13.6 },
    { start: 13.6, end: 14.26 },
    { start: 14.26, end: 15.36 },
    { start: 15.36, end: 16.72 },
    { start: 16.72, end: 18.26 },
    { start: 18.26, end: 19.62 },
    { start: 19.62, end: 21.2 },
    { start: 21.2, end: 23.68 },
    { start: 23.68, end: 25.16 },
    { start: 25.16, end: 25.9 },
    { start: 25.9, end: 27.16 },
    { start: 28.22, end: 29.28 },
    { start: 29.28, end: 31.56 },
    { start: 32.92, end: 34.26 },
    { start: 35.46, end: 36.72 },
    { start: 38.02, end: 39.04 },
  ];

  const clickableAreas = [
    {
      x1: 14,
      y1: 22.1,
      x2: 46.3,
      y2: 26.7,
      slice: { startFrom: captions[1].start, stopAt: captions[1].end },
    },
    {
      x1: 6.1,
      y1: 40.6,
      x2: 21.1,
      y2: 46.8,
      slice: { startFrom: captions[2].start, stopAt: captions[2].end },
    },
    {
      x1: 21.1,
      y1: 38.9,
      x2: 33.6,
      y2: 45.5,
      slice: { startFrom: captions[3].start, stopAt: captions[3].end },
    },
    {
      x1: 34.1,
      y1: 42.3,
      x2: 49.1,
      y2: 46.6,
      slice: { startFrom: captions[4].start, stopAt: captions[4].end },
    },
    {
      x1: 50.1,
      y1: 40.8,
      x2: 72.3,
      y2: 47.1,
      slice: { startFrom: captions[5].start, stopAt: captions[5].end },
    },
    {
      x1: 73.1,
      y1: 43.4,
      x2: 94.2,
      y2: 47.7,
      slice: { startFrom: captions[6].start, stopAt: captions[6].end },
    },
    {
      x1: 9.4,
      y1: 47.4,
      x2: 47.4,
      y2: 51.7,
      slice: { startFrom: captions[7].start, stopAt: captions[7].end },
    },
    {
      x1: 55.5,
      y1: 48.7,
      x2: 78.9,
      y2: 53.1,
      slice: { startFrom: captions[9].start, stopAt: captions[9].end },
    },
    {
      x1: 26.7,
      y1: 57.7,
      x2: 43.7,
      y2: 62.2,
      slice: { startFrom: captions[8].start, stopAt: captions[8].end },
    },
    {
      x1: 78.5,
      y1: 52.4,
      x2: 87.4,
      y2: 55.1,
      slice: { startFrom: captions[10].start, stopAt: captions[10].end },
    },
    {
      x1: 51.5,
      y1: 66.8,
      x2: 70.7,
      y2: 73,
      slice: { startFrom: captions[11].start, stopAt: captions[11].end },
    },
    {
      x1: 78.1,
      y1: 68.6,
      x2: 91.5,
      y2: 72.8,
      slice: { startFrom: captions[12].start, stopAt: captions[12].end },
    },
  ];

  const playSlice = (slice, index) => {
    const audio = audioRef.current;
    if (!audio) return;

    stopCurrent();

    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.play();
    setIsPlaying(true);
    setActiveAreaIndex(index);
    setHoveredAreaIndex(null);

    const intervalId = setInterval(() => {
      if (audio.currentTime >= slice.stopAt) {
        audio.pause();
        clearInterval(intervalId);
        setIsPlaying(false);
        setActiveAreaIndex(null);
      }
    }, 100);

    registerAudio(audio, intervalId, PAGE_ID);

    audio.onended = () => {
      clearInterval(intervalId);
      setIsPlaying(false);
      setActiveAreaIndex(null);
    };
  };

  const handleMouseEnter = (e, index) => {
    e.stopPropagation();
    if (!isPlaying) setHoveredAreaIndex(index);
  };

  const handleMouseLeave = (e, index) => {
    e.stopPropagation();
    setHoveredAreaIndex((prev) => (prev === index ? null : prev));
  };

  const dragStart = useRef(null);

  const getPct = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100,
    };
  };

  const handleDragStart = (e) => {
    dragStart.current = getPct(e);
  };

  const handleDragEnd = (e) => {
    if (!dragStart.current) return;
    const s = dragStart.current;
    const p = getPct(e);
    dragStart.current = null;
    const r = (n) => Math.round(n * 10) / 10;
    console.log(
      `{ x1: ${r(Math.min(s.x, p.x))}, y1: ${r(Math.min(s.y, p.y))}, x2: ${r(Math.max(s.x, p.x))}, y2: ${r(Math.max(s.y, p.y))} },`,
    );
  };

  return (
    <div
      data-page-scope="unit7_Unit7_Page1"
      role="group"
      aria-label="Unit 7 page with activity launchers"
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      <style>{`[data-page-scope="unit7_Unit7_Page1"] :focus-visible {outline:3px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>

      {/* Main Audio Button */}
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label="Open conversation audio"
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            stopCurrent();
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
                  pageId="sb_unit7_page1_conversation_audio"
                  src={mainSound}
                  captions={captions}
                />
              </div>,
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

      {/* Video Button */}
      <div
        className="pauseBtn-icon-CD-page4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label="Open video"
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={(e) => {
            e.stopPropagation();
            stopCurrent();
            openPopup(
              "video",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <video
                  autoPlay
                  controls
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                  }}
                >
                  <source src={videoFile} type="video/mp4" />
                </video>
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      {/* Vocabulary Button */}
      <div
        className="aaaa hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label="Open vocabulary"
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
            stopCurrent();
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
                  pageId="sb_unit7_page1_vocabulary"
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

      {/* Critical Thinking Button */}
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label="Open critical thinking"
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <CriticalThinking title="Why was Hansel's dream funny and scary at the same time?" />,
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

      {clickableAreas.map((area, index) => (
        <div
          role="button"
          tabIndex={0}
          data-keyboard-choice
          {...pageKeys}
          aria-label={`Play conversation fragment ${index + 1}`}
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
            pointerEvents: "auto",
            zIndex:
              hoveredAreaIndex === index || activeAreaIndex === index ? 10 : 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            playSlice(area.slice, index);
          }}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={(e) => handleMouseLeave(e, index)}
        />
      ))}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page6;
