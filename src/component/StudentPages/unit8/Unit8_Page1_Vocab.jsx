import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/G5_U8_Pg_64.png";
import vocabularyImg from "../../../assets/imgs/Voc.svg";

// import vocabulary from "../../../assets/img_unit3/sounds-unit3/Pg10_Vocabulary_Adult Lady.mp3";
import "./Unit8_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound14.mp3";
import vocabulary from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_Vocab_Adult Lady.mp3";

import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Unit8_Page1_Vocab = () => {
  const mainAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const stopAtSecond = 3.0;
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
    { start: 0.319, end: 3.839, text: "Page 64, Unit 8, Vocabulary." },

    { start: 5.099, end: 7.0, text: "1. cottage." },
    { start: 7.0, end: 9.0, text: "2. tractor." },
    { start: 9.0, end: 11.46, text: "3. mill." },

    { start: 12.599, end: 14.259, text: "4. barn." },

    { start: 15.279, end: 17.0, text: "5. horse." },
    { start: 17.0, end: 18.5, text: "6. dog." },
    { start: 18.5, end: 21.68, text: "7. chick." },

    { start: 22.739, end: 24.5, text: "8. chicken." },
    { start: 24.5, end: 26.5, text: "9. sheep." },
    { start: 27.72, end: 29.48, text: "10. fence." },
    { start: 30.4, end: 31.56, text: "11. wheat." },
    { start: 32.9, end: 34.3, text: "12. farmer." },
    { start: 35.7, end: 36.88, text: "13. cow." },

    { start: 38.5, end: 40.5, text: "14. dog kennel." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 5.099, end: 7.0 }, // cottage
    { start: 7.0, end: 9.0 }, // tractor
    { start: 9.0, end: 11.46 }, // mill

    { start: 12.599, end: 14.259 }, // barn

    { start: 15.279, end: 17.0 }, // horse
    { start: 17.0, end: 18.5 }, // dog
    { start: 18.5, end: 21.68 }, // chick

    { start: 22.739, end: 24.5 }, // chicken
    { start: 24.5, end: 26.5 }, // sheep
    { start: 27.72, end: 29.48 }, // fence
    { start: 30.4, end: 31.56 }, // wheat
    { start: 32.9, end: 34.3 }, // farmer
    { start: 35.7, end: 36.88 }, // cow

    { start: 38.5, end: 40.5 }, // dog kennel
  ];
  const positions = [
    { top: "15.5%", left: "46%" }, //1
    { top: "47%", left: "35.5%" }, //2
    { top: "13.5%", left: "54%" }, //3
    { top: "33%", left: "75%" }, //4
    { top: "43%", left: "69.5%" }, //5
    { top: "48.8%", left: "85.5%" }, //6
    { top: "68%", left: "82.5%" }, //7
    { top: "49.5%", left: "65%" }, // 8
    { top: "53.5%", left: "84%" }, //9
    { top: "57.5%", left: "51.5%" }, //10
    { top: "33.5%", left: "28%" }, //11
    { top: "30.5%", left: "35%" }, //12
    { top: "55.5%", left: "78%" }, //13
    { top: "41%", left: "88%" }, //14
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
            right: "-50.8%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "2%", right: "-31%" }}
        >
          {[
            "cottage",
            "tractor",
            "mill",
            "barn",
            "horse",
            "dog",
            "chick",
            "chicken",
            "sheep",
            "fence",
            "wheat",
            "farmer",
            "cow",
            "dog kennel",
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

export default Unit8_Page1_Vocab;
