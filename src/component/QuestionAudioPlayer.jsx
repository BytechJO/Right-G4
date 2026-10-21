import { useState, useEffect, useRef, forwardRef } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useAudio } from "../context/AudioContext";

const PLAYER_ID = "question-audio-player";

const QuestionAudioPlayer = forwardRef(function QuestionAudioPlayer(
  {
    src,
    pageId,
    captions = [],
    stopAtSecond = null,
    stops = [],
    onTimeUpdate,
    onPlay,
  },
  ref,
) {
  const clickAudioRef = useRef(null);
  const internalRef = useRef(null);
  const audioRef = ref || internalRef;
  const audioTimeKey = pageId ? `audio-position-${pageId}` : null;
  const playbackOptions = useRef(null);
  const restartPlaybackRef = useRef(null);

  const { registerAudio, stopCurrent } = useAudio();

  const [, setPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const settingsRef = useRef(null);
  const [, setForceRender] = useState(0);
  const [, setShowContinue] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // ← false بالبداية لحد ما يشتغل فعلاً
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const triggeredStops = useRef(new Set());
  playbackOptions.current = { registerAudio, stops, stopAtSecond, captions };

  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );
    setActiveIndex(index);
  };

  // مزامنة isPlaying مع الـ audio element مباشرة
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => {
      setIsPlaying(false);
      setPaused(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setPaused(false);
    };

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [audioRef]);

  // تشغيل أول مرة + intervals
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let stopsInterval;
    let stopAtInterval;
    let initialized = false;
    let finished = false;
    let disposed = false;
    let lastTime = 0;
    let singleStopReached = false;
    let savedTime = 0;
    if (audioTimeKey) {
      try {
        const stored = Number(localStorage.getItem(audioTimeKey));
        if (Number.isFinite(stored) && stored > 0) savedTime = stored;
      } catch {
        /* Storage may be unavailable; playback still works. */
      }
    }

    const savePosition = (time = audio.currentTime) => {
      if (
        !initialized ||
        finished ||
        !audioTimeKey ||
        !Number.isFinite(time) ||
        time < 0
      )
        return;
      lastTime = time;
      try {
        localStorage.setItem(audioTimeKey, String(time));
      } catch {
        /* Optional persistence. */
      }
    };
    const trackPosition = () => {
      if (!initialized || finished) return;
      lastTime = audio.currentTime;
      savePosition(lastTime);
    };
    const updatePosition = (time) => {
      setCurrent(time);
      setActiveIndex(
        playbackOptions.current.captions.findIndex(
          (cap) => time >= cap.start && time <= cap.end,
        ),
      );
    };
    const startPlayback = () => {
      if (initialized || disposed) return;
      const initialTime =
        savedTime > 0 && savedTime < audio.duration ? savedTime : 0;
      audio.currentTime = initialTime;
      lastTime = initialTime;
      initialized = true;
      finished = false;
      triggeredStops.current = new Set();
      setShowContinue(false);
      updatePosition(initialTime);
      const { stops: checkpoints, stopAtSecond: stopSecond } =
        playbackOptions.current;
      for (const stop of checkpoints) {
        if (initialTime > 0 && stop.stopAt <= initialTime)
          triggeredStops.current.add(stop.stopAt);
      }

      if (checkpoints.length > 0) {
        stopsInterval = setInterval(() => {
          if (disposed || audio.paused) return;
          for (const stop of checkpoints) {
            if (
              audio.currentTime >= stop.stopAt &&
              !triggeredStops.current.has(stop.stopAt)
            ) {
              triggeredStops.current.add(stop.stopAt);
              audio.pause();
              setShowContinue(true);
              if (stop.resumeFrom !== undefined) {
                audio.currentTime = stop.resumeFrom;
                updatePosition(stop.resumeFrom);
              }
              trackPosition();
              break;
            }
          }
        }, 100);
      }
      // A stop already passed in the saved recording must not stop it again.
      singleStopReached = initialTime > 0 && initialTime >= stopSecond;
      if (stopSecond) {
        stopAtInterval = setInterval(() => {
          if (!disposed && !audio.paused && !singleStopReached && audio.currentTime >= stopSecond) {
            singleStopReached = true;
            audio.pause();
            trackPosition();
            setShowContinue(true);
            // Keep monitoring so explicit Restart can re-arm this stop.
          }
        }, 100);
      }

      // Own the stop timers locally so another sound cannot permanently clear them.
      playbackOptions.current.registerAudio(audio, null, PLAYER_ID);
      if (initialTime > 0) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
      } else {
        audio.play().catch(() => {
          if (!disposed) {
            setPaused(true);
            setIsPlaying(false);
          }
        });
      }
    };

    const restartPlayback = () => {
      if (disposed) return;
      savedTime = 0;
      if (audioTimeKey) {
        try { localStorage.removeItem(audioTimeKey); } catch { /* Optional persistence. */ }
      }
      if (!initialized) {
        if (audio.readyState >= 1) startPlayback();
        return;
      }
      audio.pause();
      finished = false;
      lastTime = 0;
      audio.currentTime = 0;
      triggeredStops.current.clear();
      singleStopReached = false;
      updatePosition(0);
      setShowContinue(false);
      playbackOptions.current.registerAudio(audio, null, PLAYER_ID);
      if (audioTimeKey) {
        try { localStorage.removeItem(audioTimeKey); } catch { /* Optional persistence. */ }
      }
      audio.play().catch(() => {
        if (!disposed) { setPaused(true); setIsPlaying(false); }
      });
    };
    restartPlaybackRef.current = restartPlayback;

    const handleReplay = () => {
      if (initialized && finished) {
        finished = false;
        lastTime = audio.currentTime;
      }
    };
    const handleEnded = () => {
      finished = true;
      lastTime = 0;
      if (audioTimeKey) {
        try {
          localStorage.removeItem(audioTimeKey);
        } catch {
          /* Optional persistence. */
        }
      }
      audio.currentTime = 0;
      setCurrent(0);
      setActiveIndex(null);
      setShowContinue(true);
    };

    audio.addEventListener("timeupdate", trackPosition);
    audio.addEventListener("pause", trackPosition);
    audio.addEventListener("seeked", trackPosition);
    audio.addEventListener("play", handleReplay);
    audio.addEventListener("ended", handleEnded);
    window.addEventListener("pagehide", trackPosition);
    if (audio.readyState >= 3) startPlayback();
    else audio.addEventListener("canplay", startPlayback, { once: true });

    return () => {
      // Keep the old source's tracked time if src/pageId changed before cleanup.
      savePosition(lastTime);
      disposed = true;
      if (restartPlaybackRef.current === restartPlayback) restartPlaybackRef.current = null;
      if (stopsInterval) clearInterval(stopsInterval);
      if (stopAtInterval) clearInterval(stopAtInterval);
      audio.removeEventListener("timeupdate", trackPosition);
      audio.removeEventListener("pause", trackPosition);
      audio.removeEventListener("seeked", trackPosition);
      audio.removeEventListener("play", handleReplay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", startPlayback);
      window.removeEventListener("pagehide", trackPosition);
      audio.pause();
    };
  }, [audioRef, src, audioTimeKey]);

  // scroll للـ caption النشط
  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000);

    if (activeIndex === -1 || activeIndex === null)
      return () => clearInterval(timer);

    const el = document.getElementById(`caption-${activeIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return () => clearInterval(timer);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      stopCurrent();
      if (onPlay) onPlay();
      registerAudio(audio, null, PLAYER_ID);
      audio.play().catch(() => { setPaused(true); setIsPlaying(false); });
    } else {
      audio.pause();
    }
  };

  const handleRestart = () => {
    if (!restartPlaybackRef.current) return;
    stopCurrent();
    if (onPlay) onPlay();
    restartPlaybackRef.current();
  };
  const buttonKeys = {
    onKeyDown: (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) event.currentTarget.click();
    },
    onKeyUp: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };

  return (
    <div className="question-audio-player" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <style>{`
        .question-audio-player button:focus-visible,
        .question-audio-player input:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
        .question-audio-player input:focus-visible { border-radius: 8px; }
      `}</style>
      <div className="audio-popup-read" style={{ width: "50%" }}>
        <div className="audio-inner player-ui">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={(e) => {
              const time = e.target.currentTime;
              setCurrent(time);
              updateCaption(time);
              if (onTimeUpdate) onTimeUpdate(time);
            }}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
          />

          {/* top */}
          <div className="top-row">
            <span className="audio-time">
              {new Date(current * 1000).toISOString().substring(14, 19)}
            </span>
            <input
              type="range"
              className="audio-slider"
              aria-label="Audio progress"
              onKeyDown={(event) => event.stopPropagation()}
              onKeyUp={(event) => event.stopPropagation()}
              min="0"
              max={duration}
              value={current}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                updateCaption(Number(e.target.value));
              }}
              style={{
                background: `linear-gradient(to right, #430f68 ${
                  (current / duration) * 100
                }%, #d9d9d9ff ${(current / duration) * 100}%)`,
              }}
            />
            <span className="audio-time">
              {new Date(duration * 1000).toISOString().substring(14, 19)}
            </span>
          </div>

          {/* bottom */}
          <div className="bottom-row">
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                className="round-btn"
                style={{ background: "transparent", border: 0, padding: 0 }}
                {...buttonKeys}
                onClick={() => setShowCaption((value) => !value)}
                aria-label={showCaption ? "Hide captions" : "Show captions"}
                aria-expanded={showCaption}
              >
                <TbMessageCircle size={36} />
              </button>
              <div
                className={`caption-inPopup ${showCaption ? "show" : ""}`}
                tabIndex={-1}
                style={{ top: "100%", left: "10%" }}
              >
                {captions.map((cap, i) => (
                  <p
                    key={i}
                    id={`caption-${i}`}
                    className={`caption-inPopup-line2 ${
                      activeIndex === i ? "active" : ""
                    }`}
                  >
                    {cap.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="main-audio-controls">
              <button type="button" className="main-audio-btn" {...buttonKeys}
                onClick={togglePlay} aria-label={isPlaying ? "Pause audio" : "Play audio"}
                title={isPlaying ? "Pause audio" : "Play audio"}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>
              <button type="button" className="main-audio-btn" {...buttonKeys}
                onClick={handleRestart} aria-label="Restart audio" title="Restart audio">
                <FaRedo size={26} />
              </button>
            </div>

            <div className="settings-wrapper" ref={settingsRef}>
              <button
                type="button"
                {...buttonKeys}
                aria-label="Audio settings"
                aria-expanded={showSettings}
                className={`round-btn ${showSettings ? "active" : ""}`}
                onClick={() => setShowSettings(!showSettings)}
              >
                <IoMdSettings size={36} />
              </button>

              {showSettings && (
                <div className="settings-popup">
                  <label>Volume</label>
                  <input
                    type="range"
                    aria-label="Volume"
                    onKeyDown={(event) => event.stopPropagation()}
                    onKeyUp={(event) => event.stopPropagation()}
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = Number(e.target.value);
                      setVolume(newVolume);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <audio ref={clickAudioRef} style={{ display: "none" }} />
    </div>
  );
});

export default QuestionAudioPlayer;
