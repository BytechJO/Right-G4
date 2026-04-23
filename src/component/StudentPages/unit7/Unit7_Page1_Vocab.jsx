import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/G5_U7_Pg_58.png";
import page2_2 from "../../../assets/imgs/test.png";
import vocabulary from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_Vocab_Adult Lady.mp3";
import vocabularyImg from "../../../assets/imgs/Voc.svg";
import "./Unit7_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound13.mp3";
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
    { start: 0.44, end: 3.22, text: "Page 58, unit seven vocabulary." },
    { start: 4.10, end: 5.76, text: "1. Soccer field." },
    { start: 6.44, end: 7.86, text: "2. team." },
    { start: 8.68, end: 10.48, text: "3. Class." },
    { start: 11.42, end: 13.14, text: "4. Music room." },
    { start: 14.40, end: 15.46, text: "5. Cafeteria." },
    { start: 17.32, end: 19.20, text: "6. Library." },
    { start: 20.16, end: 22.04, text: "7. Computer lab" },
    { start: 22.86, end: 24.5, text: "8. Student." },
    { start: 25.5, end: 26.98, text: "9. Bus station." },
    { start: 28.32, end: 29.89, text: "10. Street" },
    { start: 31.00, end: 32.74, text: "11. Balcony." },
    { start: 33.78, end: 35.42, text: "12. City." },
    { start: 36.46, end: 38.06, text: "13. Walk." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
const wordTimings = [
  { start: 4.10, end: 5.76 },
  { start: 6.44, end: 7.86 },
  { start: 8.68, end: 10.48 },
  { start: 11.42, end: 13.14 },
  { start: 14.40, end: 15.46 },
  { start: 17.32, end: 19.20 },
  { start: 20.16, end: 22.04 },
  { start: 22.86, end: 24.5 },
  { start: 25.5, end: 26.98 },
  { start: 28.32, end: 29.89 },
  { start: 31.00, end: 32.74 },
  { start: 33.78, end: 35.42 },
  { start: 36.46, end: 38.06 },
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
    { top: "28%", left: "61%" },//1
    { top: "27%", left: "53%" },//2
    { top: "37%", left: "46%" },//3
    { top: "44%", left: "65%" },//4
    { top: "44%", left: "47%" },//5
    { top: "44%", left: "56%" },//6
    { top: "37%", left: "56%" },//7
    { top: "51%", left: "41%" },// 8
    { top: "70%", left: "61%" },//9
    { top: "76%", left: "37%" },//10
    { top: "53%", left: "77%" },//11
    { top: "23%", left: "82%" },//12
    { top: "54%", left: "68%" },//13
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
                  background: `linear-gradient(to right, #430f68 ${(current / duration) * 100
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
              className={`caption-inPopup-line2 ${activeIndex === i ? "active" : ""
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
            height: "350px",
            width: "auto",
            position: "absolute",
            bottom: "0%",
            right: "-46.5%",
            borderRadius: "5%",
          }}
        />

        {/* النصوص */}
        <div
          className="vocab_container"
          style={{ bottom: "0.9%", right: "-31.5%" }}
        >
          {[
            "Soccer field",
            "team",
            "Class",
            "Music room",
            "Cafeteria",
            "Library",
            "Computer lab",
            "Student",
            "Bus station",
            "Street",
            "Balcony",
            "City",
            "Walk"
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
            className={`num-img ${(activeIndex2 === i && current >= 3.2) || clickedIndex === i
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
