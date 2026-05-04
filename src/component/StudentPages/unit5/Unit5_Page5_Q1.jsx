import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit5_Page5_Q1.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 12.svg";

const Unit5_Page5_Q1 = () => {
  const groups = [
    {
      title: "sky",
      correctWords: ["cry", "July", "shy"],
      items: [
        { img: img1, word: "candy" },
        { img: img2, word: "Penny" },
        { img: img3, word: "cry" },
        { img: img4, word: "bunny" },
        { img: img5, word: "July" },
        { img: img6, word: "baby" },
        { img: img7, word: "shy" },
      ],
    },
    {
      title: "candy",
      correctWords: ["party", "bunny", "baby", "sunny"],
      items: [
        { img: img8, word: "sky" },
        { img: img9, word: "party" },
        { img: img10, word: "July" },
        { img: img11, word: "bunny" },
        { img: img12, word: "baby" },
        { img: img1, word: "sunny" },
      ],
    },
  ];
  const [answers, setAnswers] = useState(
    groups.map((group) => Array(group.items.length).fill(false)),
  );
  const [locked, setLocked] = useState(false); // ⭐ NEW — يمنع التعديل بعد Show Answer

  // ----------- الداتا الجديدة الخاصة بسؤال short a ---------------

  const handleSelect = (groupIndex, itemIndex) => {
    if (locked) return;

    const updated = answers.map((group) => [...group]);
    updated[groupIndex][itemIndex] = !updated[groupIndex][itemIndex];
    setAnswers(updated);
  };

  const checkAnswers = () => {
    if (locked) return;

    // ✅ لازم على الأقل اختيار واحد من كل جروب
    const hasEmptyGroup = answers.some(
      (groupAnswers) => !groupAnswers.some((isSelected) => isSelected),
    );

    if (hasEmptyGroup) {
      ValidationAlert.info(
        "Oops!",
        "Please choose at least one picture from each group.",
      );
      return;
    }

    let score = 0;
    let total = 0;

    groups.forEach((group, groupIndex) => {
      group.items.forEach((item, itemIndex) => {
        const isSelected = answers[groupIndex][itemIndex];
        const isCorrect = group.correctWords.includes(item.word);

        if (isCorrect) total++;

        if (isSelected && isCorrect) {
          score++;
        }
      });
    });

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; text-align:center; margin-top: 8px;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setLocked(true);
  };
  const resetAnswers = () => {
    setAnswers(groups.map((group) => Array(group.items.length).fill(false)));
    setLocked(false);
  };

  // ⭐⭐⭐ NEW — Show Answer
  const showAnswer = () => {
    const correctSelections = groups.map((group) =>
      group.items.map((item) => group.correctWords.includes(item.word)),
    );

    setAnswers(correctSelections);
    setLocked(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "60%",
        }}
      >
        <div>
          <h5 className="header-title-page8">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              A
            </span>{" "}
            Which pictures have the same{" "}
            <span style={{ color: "#2e3192" }}>-y sound</span>? Circle.
          </h5>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                border: "2px solid #F79530",
                borderRadius: "18px",
                padding: "18px 16px 12px",
                position: "relative",
                width: "360px",
                background: "#fff",
              }}
            >
              {/* عنوان البوكس */}
              <div
                style={{
                  position: "absolute",
                  top: "-18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#FEF3E6",
                  padding: "6px 18px",
                  borderRadius: "14px",
                  fontWeight: "500",
                  fontSize: "22px",
                }}
              >
                {group.title}
              </div>

              {/* العناصر داخل البوكس */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "18px 14px",
                  alignItems: "start",
                  justifyItems: "center",
                  marginTop: "16px",
                }}
              >
                {group.items.map((item, itemIndex) => {
                  const isSelected = answers[groupIndex][itemIndex];
                  const isCorrect = group.correctWords.includes(item.word);
                  const isWrong = locked && isSelected && !isCorrect;

                  return (
                    <div
                      key={itemIndex}
                      onClick={() => handleSelect(groupIndex, itemIndex)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: locked ? "default" : "pointer",
                        position: "relative",
                        minHeight: "120px",
                      }}
                    >
                      {/* الدائرة الحمراء */}
                      <div
                        style={{
                          width: "92px",
                          height: "92px",
                          position: "relative", // 🔥 مهم
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* الصورة */}
                        <img
                          src={item.img}
                          alt={item.word}
                          style={{
                            width: "74px",
                            height: "74px",
                            objectFit: "contain",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />

                        {/* 🔵 الدائرة فوق الصورة */}
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: "50%",
                              border: "3px solid #2c5287",
                              zIndex: 2, // 🔥 فوق الصورة
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </div>

                      {/* الكلمة تحت الصورة */}
                      <span
                        style={{
                          marginTop: "6px",
                          fontSize: "18px",
                          textAlign: "center",
                          lineHeight: "1.1",
                        }}
                      >
                        {item.word}
                      </span>

                      {/* اكس إذا غلط */}
                      {isWrong && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "1",
                              transform: "translateY(-1px)",
                            }}
                          >
                            ✕
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetAnswers} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW: زر Show Answer */}
        <button onClick={showAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit5_Page5_Q1;
