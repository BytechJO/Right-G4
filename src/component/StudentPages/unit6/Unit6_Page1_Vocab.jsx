import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/G5_U6_Pg_46.png";
import vocabularyImg from "../../../assets/imgs/Voc.svg";
import vocabulary from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_Vocab_Adult Lady.mp3";
import "./Unit6_Page1.css";
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
import num13 from "../../../assets/imgs/num/13_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound13.mp3";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Unit6_Page1_Vocab = () => {
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
    { start: 0.28, end: 3, text: "Page 46, Unit 6, Vocabulary." },

    { start: 3.49, end: 5.72, text: "1. rainbow." },
    { start: 5.74, end: 7.97, text: "2. cloud." },
    { start: 8.1, end: 10.52, text: "3. bird." },

    { start: 10.9, end: 13.01, text: "4. winner." },
    { start: 13.33, end: 15.81, text: "5. cheer." },
    { start: 16.0, end: 17.5, text: "6. tired." },
    { start: 18.36, end: 20.98, text: "7. stumble." },
    { start: 21.1, end: 23.4, text: "8. run." },

    { start: 23.65, end: 26.65, text: "9. race." },
    { start: 26.59, end: 29.07, text: "10. last." },
    { start: 29.26, end: 31.88, text: "11. swing." },

    { start: 32.26, end: 34.75, text: "12. finish line." },
    { start: 35.26, end: 37.87, text: "13. first." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 3.49, end: 5.72 }, // rainbow
    { start: 5.74, end: 7.97 }, // cloud
    { start: 8.1, end: 10.52 }, // bird

    { start: 10.9, end: 13.01 }, // winner
    { start: 13.33, end: 15.81 }, // cheer
    { start: 16.0, end: 18.43 }, // tired
    { start: 18.36, end: 20.98 }, // stumble
    { start: 21.1, end: 23.4 }, // run

    { start: 23.65, end: 26.65 }, // race
    { start: 26.59, end: 29.07 }, // last
    { start: 29.26, end: 31.88 }, // swing

    { start: 32.26, end: 34.75 }, // finish line
    { start: 35.26, end: 37.87 }, // first
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
    sound13,
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
    num13,
  ];
  const wordRefs = useRef(wordAudios.map(() => React.createRef()));
  const positions = [
    { top: "17.5%", left: "44%" }, //1
    { top: "28%", left: "64.5%" }, //2
    { top: "28.5%", left: "34%" }, //3
    { top: "54%", left: "36%" }, //4
    { top: "52%", left: "87.5%" }, //5
    { top: "51.8%", left: "55.5%" }, //6
    { top: "59%", left: "53.5%" }, //7
    { top: "54.5%", left: "69%" }, // 8
    { top: "37%", left: "45.5%" }, //9
    { top: "44.5%", left: "77.5%" }, //10
    { top: "39.5%", left: "70%" }, //11
    { top: "65.5%", left: "74%" }, //12
    { top: "57.5%", left: "35%" }, //13
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
            height: "355px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-41.8%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "2%", right: "-24%" }}
        >
          {[
            "rainbow",
            "cloud",
            "bird",
            "winner",
            "cheer",
            "tired",
            "stumble",
            "run",
            "race",
            "last",
            "swing",
            "finish line",
            "first",
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

export default Unit6_Page1_Vocab;
