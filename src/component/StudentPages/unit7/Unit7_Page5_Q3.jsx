import { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const exerciseData = {
  questions: [
    {
      id: 1,
      text: "Our teacher likes",
      options: ["us", "we"],
      correct: "us",
    },
    {
      id: 2,
      text: "Can you see",
      options: ["me", "I"],
      correct: "me",
    },
    {
      id: 3,
      text: "I don’t like snakes, but my brother likes",
      options: ["them", "they"],
      correct: "them",
    },
    {
      id: 4,
      text: "My friend likes",
      options: ["I", "me"],
      correct: "me",
    },
  ],
};

const Unit7_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showResults) return;
    const allAnswered = exerciseData.questions.every((q) => answers[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    setShowResults(true);

    let score = 0;

    exerciseData.questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    if (score === exerciseData.questions.length) {
      ValidationAlert.success(
        `Score: ${score} / ${exerciseData.questions.length}`,
      );
    } else if (score > 0) {
      ValidationAlert.warning(
        `Score: ${score} / ${exerciseData.questions.length}`,
      );
    } else {
      ValidationAlert.error(
        `Score: ${score} / ${exerciseData.questions.length}`,
      );
    }
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
  };

  const handleShowAnswer = () => {
    const autoAnswers = {};
    exerciseData.questions.forEach((q) => {
      autoAnswers[q.id] = q.correct;
    });
    setAnswers(autoAnswers);
    setShowResults(true);
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
              B
            </span>{" "}
            Read and choose.
          </h5>
        </div>
        <div style={{ marginTop: "20px" }}>
          {exerciseData.questions.map((q) => (
            <div
              key={q.id}
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {q.id}. {q.text}{" "}
                {q.options.map((opt, index) => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrect = opt === q.correct;
                  const isWrong = showResults && isSelected && !isCorrect;

                  return (
                    <span key={opt}>
                      <span
                        onClick={() => handleSelect(q.id, opt)}
                        style={{
                          cursor: "pointer",
                          margin: "0 5px",
                          padding: "2px 10px",
                          borderRadius: "50px",
                          border: isSelected
                            ? isWrong
                              ? "2px solid red"
                              : "2px solid #2c5287"
                            : "2px solid transparent",
                          fontWeight: "bold",
                        }}
                      >
                        {opt}
                      </span>
                      {index === 0 && " / "}
                    </span>
                  );
                })}
              </div>

              {showResults && answers[q.id] !== q.correct && (
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    pointerEvents: "none",
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          ))}
        </div>
        <Button
          checkAnswers={checkAnswers}
          handleStartAgain={handleStartAgain}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </div>
  );
};

export default Unit7_Page5_Q3;
