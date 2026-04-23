import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 5.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 6.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 7.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 8.svg";
import Button from "../../Button";
import blue from "../../../assets/audio/ClassBook/Unit 10/P 86/unit10-pg86-EXA2.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Unit10_Page5_Q2 = () => {
  const items = [
    {
      img: img1,
      options: ["br", "gr", "tr"],
      correct: "gr",
    },
    {
      img: img2,
      options: ["tr", "cr", "dr"],
      correct: "tr",
    },
    {
      img: img3,
      options: ["fr", "tr", "br"],
      correct: "fr",
    },
    {
      img: img4,
      options: ["br", "dr", "cr"],
      correct: "br",
    },
  ];
  const captions = [
  {
    start: 0.28,
    end: 6.899,
    text: "Page 86, write activities, exercise A, number two. Listen and choose."
  },
  {
    start: 6.899,
    end: 15.46,
    text: "One, grapes. Two, train. Three, fries. Four, broom."
  }
];
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
    setShowResult(true); // 🔥 مهم
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ color: "#2e3192", marginRight: "10px" }}>2</span>
          Listen and choose.
        </h5>
        <QuestionAudioPlayer src={blue} captions={captions} stopAtSecond={6.3} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-10 px-2">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center", // لتوسيط كل العناصر داخل العمود
              }}
            >
              {/* الرقم */}
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                {i + 1}
              </div>

              {/* الصورة */}
              <img
                src={item.img}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "160px",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              {/* الخيارات */}
              <div
                style={{
                  display: "flex",
                  gap: "10px", // مسافة منطقية بين الخيارات (بدل gap-12)
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {item.options.map((opt, idx) => {
                  // تحديد الألوان بناءً على الحالة
                  let borderColor = "#e5e7eb"; // رمادي افتراضي
                  let bgColor = "#f9fafb"; // خلفية افتراضية

                  if (selected[i] === opt) {
                    borderColor = "#1C398E";
                    bgColor = "#EBF0FF"; // أزرق فاتح لما يختار
                  }

                  if (
                    showResult &&
                    selected[i] === opt &&
                    opt !== item.correct
                  ) {
                    borderColor = "#ef4444";
                    bgColor = "#FEF2F2"; // أحمر فاتح لما يكون غلط
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => chooseOption(i, opt)}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "8px 12px", // padding شامل عشان يبان كـ زر
                        borderRadius: "20px",
                        cursor: locked ? "not-allowed" : "pointer",
                        border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        fontWeight: "500",
                        fontSize: "16px",
                        position: "relative",
                        transition: "all 0.2s ease", // حركة ناعمة لما يتغير اللون
                        maxWidth: "120px", // حتى لو الكلام قصير ما يكبر أوي
                      }}
                    >
                      {opt}

                      {/* ❌ أيقونة الخطأ */}
                      {showResult &&
                        selected[i] === opt &&
                        opt !== item.correct && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-10px",
                              left: "50%",
                              transform: "translateX(-50%)", // ضبط التوسيط فوق الزر بالظبط
                              width: "22px",
                              height: "22px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit10_Page5_Q2;
