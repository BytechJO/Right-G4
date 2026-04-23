import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/G5_U3_Pg_22.png";
import page2_2 from "../../../assets/imgs/test.png";
import vocabulary from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_Vocab_Adult Lady.mp3";
import vocabularyImg from "../../../assets/imgs/Voc.svg";
import "./Unit3_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound14.mp3";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
const Unit3_Page1_Vocab = () => {
  const mainAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const stopAtSecond = 4.1;
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
    { start: 0.66, end: 4.08, text: "Page 22, Unit 3. Vocabulary." },

    { start: 5.16, end: 7.64, text: "1. Grocery store." },
    { start: 7.64, end: 9.88, text: "2. Bag." },
    { start: 9.88, end: 12.44, text: "3. Grapes." },
    { start: 12.44, end: 15.14, text: "4. Carrots." },
    { start: 15.14, end: 17.6, text: "5. Apples." },
    { start: 17.6, end: 19.34, text: "6. Bananas." },
    { start: 20.38, end: 22.7, text: "7. Basket." },
    { start: 22.7, end: 25.52, text: "8. Eggplants." },
    { start: 25.52, end: 27.7, text: "9. Carton of milk." },
    { start: 28.76, end: 32.22, text: "10. Shelf, shelves." },
    { start: 32.22, end: 34.6, text: "11. Soap." },
    { start: 34.6, end: 37.26, text: "12. Toothpaste." },
    { start: 37.26, end: 40.1, text: "13. Shopping cart." },
    { start: 40.1, end: 43.0, text: "14. Can, cans." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 5.16, end: 7.64 },
    { start: 7.64, end: 9.88 },
    { start: 9.88, end: 12.44 },
    { start: 12.44, end: 15.14 },
    { start: 15.14, end: 17.6 },
    { start: 17.6, end: 19.34 },
    { start: 20.38, end: 22.7 },
    { start: 22.7, end: 25.52 },
    { start: 25.52, end: 27.7 },
    { start: 28.76, end: 32.22 },
    { start: 32.22, end: 34.6 },
    { start: 34.6, end: 37.26 },
    { start: 37.26, end: 40.1 },
    { start: 40.1, end: 43.0 },
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
    { top: "20%", left: "70%" },//1
    { top: "32%", left: "82%" },//2
    {  top: "35%", left: "42%" },//3
    { top: "28%", left: "38%" },//4
    { top: "39%", left: "30%"},//5
    { top: "26%", left: "44%"  },//6
    { top: "41%", left: "49.5%" },//7
    { top: "26%", left: "69%" },// 8
    { top: "44%", left: "65%" },//9
    { top: "33%", left: "7%" },//10
    { top: "65%", left: "92%" },//11
    { top: "49%", left: "62%" },//12
    { top: "71%", left: "68%" },//13
    { top: "48%", left: "84%" },//14
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
            height: "370px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-49%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "0.9%", right: "-33.5%" }}
        >
          {[
            "grocery store",
            "bag",
            "grapes",
            "carrots",
            "apples",
            "bananas",
            "basket",
            "eggplants",
            "carton of milk",
            "shelf, shelves",
            "soap",
            "toothpaste",
            "shopping cart",
            "can, cans",
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
              height: "17px",
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

export default Unit3_Page1_Vocab;
