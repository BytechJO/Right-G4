import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#dc2626";

const PASSAGE =
  "Stella, Helen, and Sarah are at a picnic in the park. Stella has brought fruit like apples and peaches. Helen has peanut butter sandwiches. Sarah has brought cookies and chips.";

const QUESTIONS = [
  {
    id: 1,
    text: "Does Stella have any ...",
    options: ["chips?", "fruit?", "cookies?"],
    correctOption: "fruit?",
    correctPronoun: "she",
  },
  {
    id: 2,
    text: "Does Sarah have any ...",
    options: ["cookies?", "peaches?", "sandwiches?"],
    correctOption: "cookies?",
    correctPronoun: "she",
  },
  {
    id: 3,
    text: "Does Helen have any ...",
    options: ["apples?", "sandwiches?", "chips?"],
    correctOption: "sandwiches?",
    correctPronoun: "she",
  },
];

export default function WB_Unit3_Page17_QF() {
  const [answers, setAnswers] = useState({});
  const [pronouns, setPronouns] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelectOption = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handlePronounChange = (id, value) => {
    if (showAns) return;

    setPronouns((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every(
      (q) => answers[q.id] && pronouns[q.id]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = QUESTIONS.length * 2;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctOption) score++;
      if (pronouns[q.id] === q.correctPronoun) score++;
    });

    setShowResults(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};
    const correctPronouns = {};

    QUESTIONS.forEach((q) => {
      correctAnswers[q.id] = q.correctOption;
      correctPronouns[q.id] = q.correctPronoun;
    });

    setAnswers(correctAnswers);
    setPronouns(correctPronouns);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setPronouns({});
    setShowResults(false);
    setShowAns(false);
  };

  const isRowWrong = (q) => {
    if (!showResults) return false;

    return (
      answers[q.id] !== q.correctOption ||
      pronouns[q.id] !== q.correctPronoun
    );
  };

  const renderOption = (q, option) => {
    const selected = answers[q.id] === option;
    const wrong = showResults && selected && option !== q.correctOption;

    return (
      <div
        onClick={() => handleSelectOption(q.id, option)}
        style={{
          position: "relative",
          padding: "6px 16px",
          borderRadius: "999px",
          border: selected
            ? wrong
              ? `3px solid ${WRONG_COLOR}`
              : `3px solid ${ACTIVE_COLOR}`
            : "3px solid transparent",
          cursor: showAns ? "default" : "pointer",
          fontSize: "18px",
          transition: "0.2s ease",
          userSelect: "none",
          color: "#222",
        }}
      >
        {option}
      </div>
    );
  };

  return (
  <div className="main-container-component">
      <div
        className="div-forall"
            style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span> Read, circle, and answer.
        </h1>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#444",
          }}
        >
          {PASSAGE}
        </div>

        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              paddingRight: "30px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                color: "#444",
                fontWeight: "500",
              }}
            >
              {q.id} {q.text}
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {q.options.map((opt) => (
                <React.Fragment key={opt}>
                  {renderOption(q, opt)}
                </React.Fragment>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
                width: "fit-content",
                minWidth: "340px",
              }}
            >
              <span style={{ fontSize: "22px", color: "#000000ff" }}>
                Yes,
              </span>

              <select
                value={pronouns[q.id] || ""}
                onChange={(e) => handlePronounChange(q.id, e.target.value)}
                style={{
                  fontSize: "20px",
                  borderBottom: "2px solid #444",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#000000ff",
                }}
              >
                <option value=""></option>
                <option value="he">he</option>
                <option value="she">she</option>
              </select>

              <span style={{ fontSize: "22px", color: "#000000ff" }}>
                has some.
              </span>

              {isRowWrong(q) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-28px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: WRONG_COLOR,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "700",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>

            <div style={{ borderBottom: "2px solid #444", width: "100%" }} />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={checkAnswers}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}