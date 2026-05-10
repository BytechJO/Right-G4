import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const ITEMS = [
  {
    id: 1,
    scrambled: "all at Not",
    correct: ["Not at all.", "Not at all"],
    answer: "Not at all.",
  },
  {
    id: 2,
    scrambled: "part That best the was",
    correct: ["That was the best part.", "That was the best part"],
    answer: "That was the best part.",
  },
  {
    id: 3,
    scrambled: "party a was it Yeah, great",
    correct: ["Yeah, it was quite a party.", "Yeah, it was quite a party"],
    answer: "Yeah, it was quite a party.",
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

export default function WB_UnscrambleWrite_QB_U3() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct))
      return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    setShowResults(true);
    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) =>
    showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        .usw3-list { display: flex; flex-direction: column; gap: clamp(55px, 1.8vw, 55px); width: 100%; margin-top : 10%  }
        .usw3-row  { display: flex; align-items: flex-end; gap: clamp(5px, 0.7vw, 9px); min-width: 0; }
        .usw3-num  { font-size: clamp(14px, 1.7vw, 20px); font-weight: 700; color: ${NUMBER_COLOR}; flex-shrink: 0; padding-bottom: 4px; line-height: 1; }
        .usw3-scrambled { font-size: clamp(13px, 1.6vw, 19px); color: #2b2b2b; white-space: nowrap; flex-shrink: 0; padding-bottom: 4px; line-height: 1; }
        .usw3-input-wrap { position: relative; flex: 1; min-width: clamp(80px, 10vw, 200px); }
        .usw3-input {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none; font-size: clamp(13px, 1.6vw, 19px); color: ${INPUT_TEXT_COLOR};
          line-height: 1; box-sizing: border-box;
          font-family: inherit; transition: border-color 0.2s;
        }
        .usw3-input:disabled   { opacity: 1; cursor: default; }
        .usw3-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .usw3-input--answer    { color: ${INPUT_ANSWER_COLOR}; }
        .usw3-badge {
          position: absolute; top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px); height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%; background: ${WRONG_BADGE_BG}; color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px); font-weight: 700;
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none; z-index: 2;
        }
        .usw3-buttons { display: flex; justify-content: center; margin-top: clamp(8px, 1.6vw, 18px); }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">B</span>
          Unscramble and write.
        </h1>

        <div className="usw3-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
            const uColor = wrong
              ? INPUT_UNDERLINE_WRONG
              : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);
            return (
              <div key={item.id} className="usw3-row">
                <span className="usw3-num">{item.id}</span>
                <span className="usw3-scrambled">{item.scrambled}</span>
                <div className="usw3-input-wrap">
                  <input
                    type="text"
                    className={[
                      "usw3-input",
                      wrong ? "usw3-input--wrong" : "",
                      showAns ? "usw3-input--answer" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderBottomColor: uColor, color: tColor }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {wrong && <div className="usw3-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="usw3-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
