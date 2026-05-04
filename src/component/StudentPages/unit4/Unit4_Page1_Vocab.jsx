import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/G5_U4_Pg_28.png";
import vocabularyImg from "../../../assets/imgs/Voc.svg";
import vocabulary from "../../../assets/audio/ClassBook/Unit 4/P 28/Pg28_Vocab_Adult Lady.mp3";
import "./Unit4_Page1.css";
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
import num14 from "../../../assets/imgs/num/14_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound14.mp3";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Unit4_Page1_Vocab = () => {
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
    { start: 0.459, end: 3.299, text: "Page 28. Unit 4 Vocabulary." },

    { start: 4.339, end: 6.2, text: "1. Email address." },
    { start: 6.82, end: 8.54, text: "2. Minimize." },
    { start: 9.32, end: 11.08, text: "3. Enlarge." },
    { start: 12.02, end: 13.74, text: "4. Exit." },

    { start: 14.56, end: 16.24, text: "5. Call." },
    { start: 17.0, end: 18.9, text: "6. Chat box." },
    { start: 19.62, end: 21.3, text: "7. Chat." },
    { start: 21.99, end: 23.73, text: "8. Camera." },

    { start: 24.91, end: 27.7, text: "9. Emoticons." },
    { start: 28.28, end: 30.21, text: "10. Picture." },

    { start: 30.8, end: 32.94, text: "11. Send." },
    { start: 33.4, end: 35.45, text: "12. Search." },

    { start: 36.28, end: 38.56, text: "13. Laptop." },
    { start: 39.06, end: 40.92, text: "14. Type." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 4.339, end: 6.2 }, // 1. Email address
    { start: 6.82, end: 8.54 }, // 2. Minimize
    { start: 9.32, end: 11.08 }, // 3. Enlarge
    { start: 12.02, end: 13.74 }, // 4. Exit

    { start: 14.56, end: 16.24 }, // 5. Call
    { start: 17.18, end: 18.5 }, // 6. Chat box
    { start: 19.92, end: 20.82 }, // 7. Chat
    { start: 22.14, end: 23.64 }, // 8. Camera

    { start: 25.18, end: 27.44 }, // 9. Emoticons
    { start: 28.519, end: 30.019 }, // 10. Picture

    { start: 31.06, end: 32.47 }, // 11. Send
    { start: 33.72, end: 35.32 }, // 12. Search

    { start: 36.44, end: 38.38 }, // 13. Laptop
    { start: 39.24, end: 40.92 }, // 14. Type
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
    sound14,
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
    num14,
  ];
  const wordRefs = useRef(wordAudios.map(() => React.createRef()));
  const positions = [
    { top: "12.5%", left: "38%" }, //1
    { top: "16%", left: "65%" }, //2
    { top: "16%", left: "68%" }, //3
    { top: "16%", left: "71%" }, //4
    { top: "18%", left: "37.5%" }, //5
    { top: "33%", left: "35%" }, //6
    { top: "23%", left: "32.5%" }, //7
    { top: "27.5%", left: "61%" }, // 8
    { top: "39.5%", left: "30.5%" }, //9
    { top: "38.5%", left: "67.5%" }, //10
    { top: "38.5%", left: "48%" }, //11
    { top: "40.5%", left: "48%" }, //12
    { top: "50%", left: "65%" }, //13
    { top: "59%", left: "67%" }, //14
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
            height: "380px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-44.5%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "0.9%", right: "-27.5%" }}
        >
          {[
            "Email address",
            "Minimize",
            "Enlarge",
            "Exit",
            "Call",
            "Chat box",
            "Chat",
            "Camera",
            "Emoticons",
            "Picture",
            "Send",
            "Search",
            "Laptop",
            "Type",
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
              height: "12px",
              position: "absolute",
              ...positions[i], // 👈 أهم سطر
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "15.2%",
            left: "66%",
            width: "10px",
            height: "1px",
            backgroundColor: "black",
            transform: "rotate(-61deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "68%",
            width: "9px",
            height: "1px",
            backgroundColor: "black",
            transform: "rotate(-90deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "70%",
            width: "13px",
            height: "1px",
            backgroundColor: "black",
            transform: "rotate(-130deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "27%",
            transform: "rotate(-142deg)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* الخط */}
          <div
            style={{
              width: "12px",
              height: "1px",
              backgroundColor: "black",
            }}
          />

          {/* رأس السهم */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "6px solid black",
            }}
          />
        </div>
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

export default Unit4_Page1_Vocab;
