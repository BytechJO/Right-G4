import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Untitled-2 (3).png";
import page2_2 from "../../../assets/imgs/Voc.svg";

// import vocabulary from "../../../assets/img_unit3/sounds-unit3/Pg10_Vocabulary_Adult Lady.mp3";
import "./Unit9_Page1.css";
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
import num15 from "../../../assets/imgs/num/15_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound15.mp3";
import vocabulary from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_Vocab_Adult Lady.mp3";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Unit5_Page1_Vocab = () => {
  const mainAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const stopAtSecond = 3.4;
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
    { start: 0.5, end: 3.8, text: "Page 76, Unit 9, Vocabulary." },

    { start: 4.42, end: 6.5, text: "1. clinic." },
    { start: 6.5, end: 8.5, text: "2. post office." },
    { start: 8.5, end: 10.14, text: "3. restaurant." },
    { start: 11.74, end: 13.34, text: "4. swimming pool." },
    { start: 14.62, end: 15.66, text: "5. hospital." },
    { start: 17.22, end: 18.56, text: "6. car wash." },
    { start: 19.88, end: 20.9, text: "7. zoo." },
    { start: 22.2, end: 23.899, text: "8. airport." },

    { start: 24.939, end: 26.5, text: "9. bus stop." },
    { start: 26.5, end: 29.119, text: "10. gym." },

    { start: 30.159, end: 31.899, text: "11. bakery." },

    { start: 33.02, end: 35.5, text: "12. theater." },
    { start: 35.5, end: 38.5, text: "13. playground." },
    { start: 38.5, end: 41.0, text: "14. toy shop." },
    { start: 41.0, end: 43.539, text: "15. bank." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 4.42, end: 6.5 }, // clinic
    { start: 6.5, end: 8.5 }, // post office
    { start: 8.5, end: 10.14 }, // restaurant
    { start: 11.74, end: 13.34 }, // swimming pool
    { start: 14.62, end: 15.66 }, // hospital
    { start: 17.22, end: 18.56 }, // car wash
    { start: 19.88, end: 20.9 }, // zoo
    { start: 22.2, end: 23.899 }, // airport

    { start: 24.939, end: 26.5 }, // bus stop
    { start: 26.5, end: 29.119 }, // gym

    { start: 30.159, end: 31.899 }, // bakery

    { start: 33.02, end: 35.5 }, // theater
    { start: 35.5, end: 38.5 }, // playground
    { start: 38.5, end: 41.0 }, // toy shop
    { start: 41.0, end: 43.539 }, // bank
  ];
  const positions = [
    { top: "32.5%", left: "80%" }, //1
    { top: "26%", left: "54.5%" }, //2
    { top: "25.5%", left: "26%" }, //3
    { top: "23%", left: "7%" }, //4
    { top: "48.8%", left: "85.5%" }, //5
    { top: "63.5%", left: "45.5%" }, //6
    { top: "91%", left: "18.5%" }, //7
    { top: "74.5%", left: "24%" }, // 8
    { top: "82.5%", left: "65%" }, //9
    { top: "54.5%", left: "59.5%" }, //10
    { top: "70.5%", left: "52%" }, //11
    { top: "41.5%", left: "45%" }, //12
    { top: "80.5%", left: "49%" }, //13
    { top: "41%", left: "57%" }, //14
    { top: "51%", left: "20%" }, //15
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
    sound15,
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
    num15,
  ];
  const wordRefs = useRef(wordAudios.map(() => React.createRef()));

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
          src={page2_2}
          style={{
            height: "400px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-30.5%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "1.4%", right: "-18.5%" }}
        >
          {[
            "clinic",
            "post office",
            "restaurant",
            "swimming pool",
            "hospital",
            "car wash",
            "zoo",
            "airport",
            "bus stop",
            "gym",
            "bakery",
            "theater",
            "playground",
            "toy shop",
            "bank",
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
              height: "20px",
              position: "absolute",
              ...positions[i], // 👈 أهم سطر
            }}
          />
        ))}

        {/* الصورة الرئيسية */}
        <img
          src={backgroundImage}
          alt="interactive"
          style={{ height: "75vh" }}
        />
      </div>
      {wordAudios.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default Unit5_Page1_Vocab;
