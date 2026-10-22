import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANSWER_COLOR = "#c81e1e";
const NUMBER_COLOR = "#2b2b2b";
const CUE_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

const ITEMS = [
  {
    id: 1,
    cue: "he / won't / mall",
    correct: [
      "He won't go to the mall.",
      "he wont go to the mall",
      "he willnot go to the mall",
      "he will not go to the mall",
    ],
    answer: "He won't go to the mall.",
  },
  {
    id: 2,
    cue: "they / won't / doctor",
    correct: [
      "They won't go to the doctor.",
      "they wont go to the doctor",
      "they willnot go to the doctor",
      "they  will not to the doctor",
    ],
    answer: "They won't go to the doctor.",
  },
  {
    id: 3,
    cue: "we / won't / playground",
    correct: [
      "We won't play on the playground.",
      "we wont play on the playground",
      "We willnot go to the playground.",
      "we won't go to the playground",
    ],
    answer: "We won't play on the playground.",
  },
];

const normalize = (str) =>
  str
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

export default function WB_ReadWriteSentences_QE() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns || results[id] === "correct") return;
    if (!ITEMS.some((item) => item.id === id)) return;

    setAnswers((previous) => ({ ...previous, [id]: value }));
    setResults((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (!ITEMS.every((item) => answers[item.id]?.trim())) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(checked).filter(
      (result) => result === "correct",
    ).length;
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.answer;
    });
    setAnswers(filled);
    setResults({});
    setShowAns(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers({});
    setResults({});
    setShowAns(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const isWrong = (item) => !showAns && results[item.id] === "wrong";
  const isDisabled = (item) => showAns || results[item.id] === "correct";

  return (
    <div
      className="main-container-component"
      data-review12-scope="Review2_Page2_Q2"
    >
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-review12-scope="Review2_Page2_Q2"] input:focus-visible {
        outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px;
      }`}</style>
      <style>{`
        .rwse-list {
          display: flex;
          flex-direction: column;
          gap: clamp(35px, 2.2vw, 35px);
          width: 100%;
          margin : 10% 0 ; 
        }

        /* Single row: num + cue + input */
        .rwse-row {
          display: grid;
          grid-template-columns: auto clamp(120px, 16vw, 200px) 1fr;
          align-items: flex-end;
          gap: clamp(8px, 1.2vw, 16px);
          min-width: 0;
        }

        .rwse-num {
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          padding-bottom: 4px;
          line-height: 1;
        }

        .rwse-cue {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${CUE_COLOR};
          padding-bottom: 4px;
          line-height: 1;
          white-space: nowrap;
        }

        .rwse-input-wrap {
          position: relative;
        }

        .rwse-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: ${INPUT_TEXT_COLOR};
          padding: 4px 6px 5px;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .rwse-input:disabled   { opacity: 1; cursor: default; }
        .rwse-input--wrong     { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwse-input--answer    { color: ${INPUT_ANSWER_COLOR}; }

        .rwse-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(17px, 1.9vw, 22px);
          height: clamp(17px, 1.9vw, 22px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .rwse-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwse-row { grid-template-columns: auto 1fr; grid-template-rows: auto auto; }
          .rwse-input-wrap { grid-column: 1 / -1; }
        }
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
     
        <ExerciseHeader
          isReview
          sectionLetter={"E"}
          title={" Read and write sentences. You will need to add words."}
          subTitle={
            "Use the given words as a sentence frame, then add the missing grammar words and punctuation before checking."
          }
        />
        <div className="rwse-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = INPUT_TEXT_COLOR;
            const uColor = wrong
              ? INPUT_UNDERLINE_WRONG
              : isDisabled(item)
                ? "#16a34a"
                : INPUT_UNDERLINE_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rwse-row">
                <span className="rwse-num">{item.id}</span>
                <span className="rwse-cue">{item.cue}</span>
                <div className="rwse-input-wrap">
                  <input
                    {...fieldKeys}
                    aria-label={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      title={`Question ${item.id}. ${item.before || item.prefix || item.cue || item.scrambled || "Write an answer using the picture or diagram."} ${item.after || ""}`}
                      placeholder="Sentence"
                    aria-invalid={wrong}
                    type="text"
                    className={[
                      "rwse-input",
                      wrong ? "rwse-input--wrong" : "",
                      showAns ? "rwse-input--answer" : "",
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
                  {wrong && <div className="rwse-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rwse-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              {...activationKeys}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              {...activationKeys}
              onClick={handleCheck}
              disabled={checkDisabled}
              style={{ cursor: checkDisabled ? "not-allowed" : "pointer" }}
              className="check-button2"
            >
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
