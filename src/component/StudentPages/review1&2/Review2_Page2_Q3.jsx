import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Review2_Page2_Q3 = () => {
  const questions = [
    {
      text: "I can you please fill my cup with milk?",
      underline: "cup",
      answer: "short u",
    },
    {
      text: "In math class, we studied the cube.",
      underline: "cube",
      answer: "long u",
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [locked, setLocked] = useState(false);

  const choose = (index, value) => {
    if (locked) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const resetAll = () => {
    setAnswers(Array(questions.length).fill(""));
    setLocked(false);
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    answers.forEach((a, i) => {
      if (a === questions[i].answer) score++;
    });

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);

    setLocked(true);
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
          <span style={{ marginRight: "10px" }}>E</span>
          Does the underlined word have a{" "}
          <span style={{ color: "#2e3192" }}>long u</span> or{" "}
          <span style={{ color: "#2e3192" }}>short u</span> sound?
        </h5>

        {questions.map((q, i) => {
          const parts = q.text.split(q.underline);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "2px solid #f97316",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              {/* الجملة */}
              <div>
                <b>{i + 1}.</b> {parts[0]}
                <span style={{ textDecoration: "underline", color: "#2e3192" }}>
                  {q.underline}
                </span>
                {parts[1]}
              </div>

              {/* الخيارات */}
              <div style={{ display: "flex", gap: "10px" }}>
                {["long u", "short u"].map((opt) => {
                  const selected = answers[i] === opt;

                  return (
                    <div
                      key={opt}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        onClick={() => choose(i, opt)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "2px solid #ccc",
                          cursor: "pointer",
                          background: selected ? "#1C398E" : "#fff",
                          color: selected ? "#fff" : "#000",
                        }}
                      >
                        {opt}
                      </div>

                      {locked && selected && opt !== q.answer && (
                        <div
                          style={{
                            position: "absolute",
                            right: "15px", 
                            zIndex: 10,
                          }}
                        >
                          <WrongMark />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review2_Page2_Q3;
