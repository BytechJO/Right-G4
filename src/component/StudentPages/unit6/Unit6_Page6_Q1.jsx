import React, { useState } from "react";
import "./Unit6_Page6_Q1.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 4.svg";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit6_Page6_Q1 = () => {
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      subject: "She",
      action: "study better",
      img: img1,
      correct: "must",
    },
    {
      id: 2,
      subject: "He",
      action: "stand under the hot sun",
      img: img2,
      correct: "mustnt",
    },
    { id: 3, subject: "You", action: "be quiet", img: img3, correct: "must" },
    {
      id: 4,
      subject: "She",
      action: "brush her hair",
      img: img4,
      correct: "must",
    },
  ];

  const handleAnswer = (id, value) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const reset = () => {
    setLocked(false);
    setAnswers({});
  };
  const showAnswers = () => {
    const correctAnswers = {};
    questions.forEach((q) => {
      correctAnswers[q.id] = q.correct;
    });

    setAnswers(correctAnswers);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    // تأكد إنو كل الأسئلة مجاوبة
    const unanswered = questions.some((q) => !answers[q.id]);
    if (unanswered) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

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
          // gap: "20px",
          width: "60%",
          justifyContent: "flex-start",
        }}
      >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "15px" }} className="ex-A">
            D
          </span>
          Look and write<span style={{ color: "#D1232A" }}>✓</span>or
          <span style={{ color: "#D1232A" }}>✗</span>.Then write.
        </h5>
        <div style={{ padding: "20px" }}>
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              {/* الرقم */}
              <span style={{ fontWeight: "bold" }}>{index + 1}</span>

              {/* الصورة */}
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  overflow: "hidden",
                  border: "3px solid orange",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={q.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* بوكسات الصح والخطا */}
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  onClick={() => handleAnswer(q.id, "must")}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid orange",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: answers[q.id] === "must" ? "#2a4e7c" : "white",
                    color: answers[q.id] === "must" ? "white" : "black",
                  }}
                >
                  ✓
                </div>

                <div
                  onClick={() => handleAnswer(q.id, "mustnt")}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid orange",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background:
                      answers[q.id] === "mustnt" ? "#2a4e7c" : "white",
                    color: answers[q.id] === "mustnt" ? "white" : "black",
                  }}
                >
                  ✕
                </div>
              </div>

              {/* الخط + الجملة */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  borderBottom: `2px solid ${
                    locked && answers[q.id] !== q.correct ? "red" : "black"
                  }`,
                  paddingBottom: "5px",
                  minHeight: "24px",
                  color: "#2a4e7c",
                  fontWeight: "500",
                }}
              >
                {answers[q.id] && (
                  <span>
                    {q.subject} {answers[q.id] === "must" ? "must" : "mustn't"}{" "}
                    {q.action}.{/* ❌ فقط عند الغلط */}
                    {locked && answers[q.id] !== q.correct && (
                      <span className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                        ✕
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit6_Page6_Q1;
