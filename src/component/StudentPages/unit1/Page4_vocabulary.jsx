import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Asset 22.png";
import vocabularyImg from "../../../assets/imgs/Voc.svg";
import vocabulary from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_Vocab_Adult Lady.mp3";
import "./Page4.css";
import num1 from "../../../assets/imgs/num/1_1.svg";
import num2 from "../../../assets/imgs/num/2_1.svg";
import num3 from "../../../assets/imgs/num/3_1.svg";
import num4 from "../../../assets/imgs/num/4_1.svg";
import num5 from "../../../assets/imgs/num/5_1.svg";
import num6 from "../../../assets/imgs/num/6_1.svg";
import num7 from "../../../assets/imgs/num/7_1.svg";
import num8 from "../../../assets/imgs/num/8_1.svg";
import num9 from "../../../assets/imgs/num/9_1.svg";
import num10 from "../../../assets/imgs/num/10_1.svg";
import num11 from "../../../assets/imgs/num/11_1.svg";
import num12 from "../../../assets/imgs/num/12_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound12.mp3";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Page4_vocabulary = () => {
  const mainAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const stopAtSecond = 3.3;
  const [clickedIndex, setClickedIndex] = useState(null);
  // إعدادات الصوت
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [activeSpeed, setActiveSpeed] = useState(1);
  const settingsRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showCaption, setShowCaption] = useState(false);

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.459, end: 3.0, text: "Page 28. Unit 4 Vocabulary." },

    { start: 3.8, end: 4.74, text: "1. scoreboard." },
    { start: 6.06, end: 7.4, text: "2. young." },
    { start: 7.84, end: 9.6, text: "3. old." },
    { start: 10.32, end: 11.8, text: "4. small." },

    { start: 12.84, end: 14.14, text: "5. big." },
    { start: 15.02, end: 16.02, text: "6. referee." },
    { start: 17.62, end: 18.62, text: "7. whistle." },
    { start: 20.1, end: 21.66, text: "8. fast." },

    { start: 22.34, end: 24.02, text: "9. slow." },
    { start: 24.86, end: 26.38, text: "10. tall." },

    { start: 27.1, end: 28.8, text: "11. short" },
    { start: 29.52, end: 31.88, text: "12. basketball court." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 3.8, end: 4.74 }, // 1. scoreboard
    { start: 6.06, end: 7.4 }, // 2. young
    { start: 7.84, end: 9.6 }, // 3. old
    { start: 10.32, end: 11.8 }, // 4. small

    { start: 12.84, end: 14.14 }, // 5. big
    { start: 15.02, end: 16.02 }, // 6. referee
    { start: 17.62, end: 18.62 }, // 7. whistle
    { start: 20.1, end: 21.66 }, // 8. fast

    { start: 22.34, end: 24.02 }, // 9. slow
    { start: 24.86, end: 26.38 }, // 10. tall

    { start: 27.1, end: 28.8 }, // 11. short
    { start: 29.52, end: 31.88 }, // 12. basketball court
  ];

  // ================================
  // ✔ Update caption highlight
  // ================================
  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );
    setActiveIndex(index);
  };

  // ================================
  // ✔ Update Word highlight
  // ================================
  const updateWord = (time) => {
    const wordIndex = wordTimings.findIndex(
      (w) => time >= w.start && time <= w.end,
    );
    setActiveIndex2(wordIndex);
  };
  // ================================
  // ✔ INITIAL PLAY & STOP AT SECOND
  // ================================
  useEffect(() => {
    const audio = mainAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    // عند انتهاء الأوديو يرجع يبطل أنيميشن + يظهر Continue
    const handleEnded = () => {
      audio.currentTime = 0;
      setActiveIndex(null);
      setActiveIndex2(null);
      setPaused(true);
      setShowContinue(true);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000); // كل ثانية

    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    const audio = mainAudioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(false);
      setIsPlaying(true);
    } else {
      audio.pause();
      setPaused(true);
      setIsPlaying(false);
    }
  };
  const wordAudios = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
  ];
  const playWordAudio = (index) => {
    // أوقفي الأوديو الرئيسي
    mainAudioRef.current.pause();

    // أوقفي أي كلمة شغالة
    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    const audio = wordRefs.current[index].current;
    if (!audio) return;

    // تشغيل الصوت من البداية
    audio.currentTime = 0;
    audio.play();

    // 🔥 فعل الأنيميشن على طول فترة التشغيل
    setClickedIndex(index);

    // 🔥 عند انتهاء الصوت -> أطفئ الأنيميشن
    audio.onended = () => {
      setClickedIndex(null);
    };
  };

  const nums = [
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
    num10,
    num11,
    num12,
  ];
  const wordRefs = useRef(wordAudios.map(() => React.createRef()));
  const positions = [
    { top: "18.5%", left: "29%" }, //1
    { top: "32%", left: "55%" }, //2
    { top: "27%", left: "15%" }, //3
    { top: "24%", left: "39%" }, //4
    { top: "17%", left: "48.5%" }, //5
    { top: "47%", left: "89%" }, //6
    { top: "45%", left: "78.5%" }, //7
    { top: "50.5%", left: "63%" }, // 8
    { top: "37.5%", left: "40.5%" }, //9
    { top: "37.5%", left: "79.5%" }, //10
    { top: "35.5%", left: "61%" }, //11
    { top: "63.5%", left: "26%" }, //12
  ];
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className="audio-popup-vocab-container"
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0px 20px",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div className="audio-popup-vocab">
          <div className="audio-inner player-ui">
            <audio
              ref={mainAudioRef}
              src={vocabulary}
              onTimeUpdate={(e) => {
                const time = e.target.currentTime;
                setCurrent(time);
                updateCaption(time);
                updateWord(time); // 🔥 أهم خطوة
              }}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
            ></audio>

            {/* Time + Slider */}
            <div className="top-row">
              <span className="audio-time">
                {new Date(current * 1000).toISOString().substring(14, 19)}
              </span>

              <input
                type="range"
                min="0"
                max={duration}
                value={current}
                className="audio-slider"
                onChange={(e) => {
                  mainAudioRef.current.currentTime = e.target.value;
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

            {/* Buttons */}
            <div className="bottom-row">
              <div
                className={`round-btn ${showCaption ? "active" : ""}`}
                onClick={() => setShowCaption(!showCaption)}
              >
                <TbMessageCircle size={36} />
              </div>

              <button className="play-btn2" onClick={togglePlay}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>

              <div>
                <button
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
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => {
                        setVolume(e.target.value);
                        mainAudioRef.current.volume = e.target.value;
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "5px",
          width: "fit-content",
        }}
      >
        <div className={`caption-inPopup ${showCaption ? "show" : ""}`}>
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
        {/* كلمة + صورة صغيرة */}

        <img
          src={vocabularyImg}
          style={{
            height: "340px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-39.5%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "2%", right: "-33%" }}
        >
          {[
            "scoreboard",
            "young",
            "old",
            "small",
            "big",
            "referee",
            "whistle",
            "fast",
            "slow",
            "tall",
            "short",
            "basketball court",
          ].map((text, i) => (
            <h6
              key={i}
              className={
                (activeIndex2 === i && current >= 3.2) || clickedIndex === i
                  ? "active"
                  : ""
              }
              onClick={() => playWordAudio(i)}
            >
              {i + 1} {text}
            </h6>
          ))}
        </div>

        {/* الأرقام */}
        {nums.map((num, i) => (
          <img
            key={i}
            src={num}
            id={`num-${i + 1}`}
            className={`num-img ${
              (activeIndex2 === i && current >= 3.2) || clickedIndex === i
                ? "active"
                : ""
            }`}
            style={{
              height: "18px",
              position: "absolute",
              ...positions[i], // 👈 أهم سطر
            }}
          />
        ))}
        {/* الصورة الرئيسية */}
        <img
          src={backgroundImage}
          alt="interactive"
          style={{ height: "85vh" }}
        />
      </div>
      {wordAudios.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default Page4_vocabulary;
