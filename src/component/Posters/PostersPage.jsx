import React, { useEffect, useRef, useState } from "react";
import AudioWithCaption from "../AudioWithCaption";
import Vocabulary from "../StudentPages/Vocabulary";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../assets/Page 01/Right Video Button.svg";
import "./PostersPage.css";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const PostersPage = ({ config, openPopup, pageId }) => {
  const audioRef = useRef(null);
  const sliceTimerRef = useRef(null);
  const sliceGenerationRef = useRef(0);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  const {
    image,
    mainSound,
    vocSound,
    videoFile,
    captions,
    captionsC,
    wordTimings,
    words,
    clickableAreas,
  } = config;

  const stopSlice = () => {
    sliceGenerationRef.current += 1;
    clearInterval(sliceTimerRef.current);
    sliceTimerRef.current = null;
    const audio = audioRef.current;
    if (audio) {
      audio.onended = audio.onerror = null;
      audio.pause();
    }
    setIsPlaying(false);
    setActiveAreaIndex(null);
    setHoveredAreaIndex(null);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      sliceGenerationRef.current += 1;
      clearInterval(sliceTimerRef.current);
      if (audio) {
        audio.onended = audio.onerror = null;
        audio.pause();
      }
    };
  }, [config]);

  const playSlice = (slice) => {
    const audio = audioRef.current;
    if (!audio || !mainSound || !slice) return;
    clearInterval(sliceTimerRef.current);
    const generation = ++sliceGenerationRef.current;
    const finish = () => {
      if (generation !== sliceGenerationRef.current) return;
      stopSlice();
    };
    audio.pause();
    audio.src = mainSound;
    audio.currentTime = slice.startFrom;
    audio.onended = audio.onerror = finish;
    setIsPlaying(true);
    sliceTimerRef.current = setInterval(() => {
      if (generation === sliceGenerationRef.current && audio.currentTime >= slice.stopAt) finish();
    }, 100);
    audio.play().catch(finish);
  };

  return (
    <div
      className="poster-wrapper"
      data-poster-page={pageId}
      role="group"
      aria-label={`Poster ${pageId?.replace("poster_page", "") || "page"}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <style>{`[data-poster-page] :focus-visible { outline: 3px solid #2563eb !important; outline-offset: 3px; border-radius: 6px; }`}</style>
      {/* Clickable Areas — optional */}
    
      {/* Main Audio Button — optional */}
      {mainSound && captions?.length > 0 && (
        <div className="audio-btn-poster-con-1 hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            data-poster-control role="button" tabIndex={0} {...activationKeys} aria-label="Open poster audio"
            onClick={(e) => {
              e.stopPropagation();
              stopSlice();
              openPopup("audio",
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AudioWithCaption src={mainSound} captions={captions} pageId={`${pageId}_audio`} />
                </div>
              );
            }}
            style={{ overflow: "visible" }}
          >
            <image href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
          </svg>
        </div>
      )}

      {/* Vocabulary Button — optional */}
      {vocSound && words?.length > 0 && (
        <div className="audio-btn-poster-voc hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            data-poster-control role="button" tabIndex={0} {...activationKeys} aria-label="Open poster vocabulary"
            onClick={(event) => {
              event.stopPropagation();
              stopSlice();
              openPopup("html",
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Vocabulary
                    pageId={`${pageId}_vocabulary`}
                    title="VOCABULARY"
                    subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                    sound={vocSound}
                    captions={captionsC}
                    stopAtSecond={3.14}
                    wordTimings={wordTimings}
                    words={words}
                  />
                </div>
              );
            }}
            style={{ overflow: "visible" }}
          >
            <image href={audioBtn} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
          </svg>
        </div>
      )}

      {/* Video Button — optional */}
      {videoFile && (
        <div className="audio-btn-poster-con-2 hover:scale-110 transition" style={{ overflow: "visible" }}>
          <svg width="22" height="22" viewBox="0 0 90 90"
            data-poster-control role="button" tabIndex={0} {...activationKeys} aria-label="Open poster video"
            onClick={(e) => {
              e.stopPropagation();
              stopSlice();
              openPopup("video",
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
                  <video autoPlay controls style={{ width: "auto", height: "80%", objectFit: "fill", borderRadius: "20px" }}>
                    <source src={videoFile} type="video/mp4" />
                  </video>
                </div>
              );
            }}
            style={{ overflow: "visible" }}
          >
            <image href={pauseBtn} x="0" y="0" width="90" height="90" />
          </svg>
        </div>
      )}

  {clickableAreas?.map((area, index) => (
        <div
          key={index}
          data-poster-control
          role="button"
          tabIndex={0}
          {...activationKeys}
          aria-label={`Listen to passage ${index + 1}: ${captions?.find(caption => area.slice?.startFrom >= caption.start && area.slice?.startFrom < caption.end)?.text || "poster audio"}`}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAreaIndex === index
              ? "highlight" : ""
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
          onMouseEnter={() => { if (!isPlaying) setHoveredAreaIndex(index); }}
          onMouseLeave={() => { if (!isPlaying) setHoveredAreaIndex(null); }}
        />
      ))}


      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default PostersPage;