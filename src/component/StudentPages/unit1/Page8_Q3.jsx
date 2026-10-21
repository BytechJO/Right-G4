import React, { useState, useRef } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd5pg8-instruction1-adult-lady_YJxh5Hg5.mp3";
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 1 Robots of the Future Folder/Page8/SVG/Asset 1.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG = "#ef4444";
const BOX_TEXT_DEFAULT = "#2b2b2b";
const BOX_TEXT_ANSWER = "#c81e1e";
const SENTENCE_COLOR = "#2b2b2b";
const LABEL_COLOR = "#2b2b2b";
const PARA_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const captions = [
  {
    start: 0.26,
    end: 5.84,
    text: "Page eight, write activities, exercise C. Listen, read, and number.",
  },
  {
    start: 7.36,
    end: 10.48,
    text: "Tim will visit the new Museum of Inventions tomorrow.",
  },
  {
    start: 10.48,
    end: 13.52,
    text: "He will take his little brother and friend with him.",
  },
  {
    start: 13.52,
    end: 18.56,
    text: "They will take a bus at eight o'clock and arrive at the museum at nine o'clock.",
  },
  {
    start: 18.56,
    end: 21.92,
    text: "Tim will pack a lunch in case they get hungry.",
  },
  {
    start: 21.92,
    end: 28.0,
    text: "He will have to remember to take his camera with him so he can take pictures in the museum.",
  },
  {
    start: 28.0,
    end: 32.68,
    text: "Tim is certain they will have a lot of fun at the museum tomorrow.",
  },
];
// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `Tim will visit the new Museum of Inventions tomorrow. He will take his little brother and friend with him. They will take a bus at eight o'clock and arrive at the museum at nine o'clock. Tim will pack a lunch in case they get hungry. He will have to remember to take his camera with him, so he can take pictures in the museum. Tim is certain they will have a lot of fun at the museum tomorrow.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: "a",
    sentence: "Tim will have to remember to take his camera with him.",
    correct: ["4"],
    answer: "4",
  },
  { id: "b", sentence: "Tim will pack a lunch.", correct: ["3"], answer: "3" },
  {
    id: "c",
    sentence: "Tim will visit the museum tomorrow.",
    correct: ["1"],
    answer: "1",
  },
  {
    id: "d",
    sentence: "They will have fun at the museum.",
    correct: ["5"],
    answer: "5",
  },
  {
    id: "e",
    sentence: "Tim will take his brother and friend.",
    correct: ["2"],
    answer: "2",
  },
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const NUMBER_OPTIONS = ITEMS.map((_, index) => String(index + 1));

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => userVal.trim() === c);

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
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

export default function WB_ReadNumber_QC() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAns, setShowAns] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const handleChange = (id, value) => {
    if (showAns) return;
    const item = ITEMS.find((i) => i.id === id);
    if (!item || results[id] === "correct") return;
    if (value !== "" && !NUMBER_OPTIONS.includes(value)) return;
    if (
      value &&
      Object.entries(answers).some(
        ([otherId, number]) => otherId !== id && number === value,
      )
    ) {
      setAnnouncement(`Number ${value} is already used in another sentence.`);
      return;
    }
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    setAnnouncement(
      value
        ? `Sentence ${id}: number ${value} selected.`
        : `Sentence ${id}: number cleared.`,
    );
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) {
      setAnnouncement("Please complete all answers first.");
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (isCorrect(answers[item.id] || "", item.correct)) score++;
    });
    const checked = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" ||
        isCorrect(answers[item.id] || "", item.correct)
          ? "correct"
          : "wrong",
      ]),
    );
    setResults(checked);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. ${ITEMS.map((item) => `Question ${item.id}: ${checked[item.id]}`).join(". ")}`,
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
    <div className="main-container-component sb-unit1-page8_q3">
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        .sb-unit1-page8_q3 .rnqc-input:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 8px;
        }
        .sb-unit1-page8_q3 select.rnqc-input {
          appearance: none;
          cursor: pointer;
        }
        /* ── Paragraph + image row ── */
        .rnqc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .rnqc-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          text-indent: clamp(14px, 1.8vw, 22px);
          margin: 0;
        }

        .rnqc-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Items list ── */
        .rnqc-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 16px);
          width: 100%;
        }

        /* Single row: label | sentence | box */
        .rnqc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .rnqc-label {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.5;
        }

        .rnqc-sentence {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${SENTENCE_COLOR};
          line-height: 1.5;
        }

        /* Number input box */
        .rnqc-input-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .rnqc-input {
          width: clamp(40px, 4.2vw, 40px);
          height: clamp(40px, 4.2vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px ;
          background: #fff;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: ${BOX_TEXT_DEFAULT};
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          padding: 0;
          box-sizing: border-box;
          cursor: text;
        }
        .rnqc-input:disabled   { opacity: 1; cursor: default; }
        .rnqc-input--answer    { color: ${BOX_TEXT_ANSWER}; border-color: ${BOX_TEXT_ANSWER}; }

        /* ✕ badge */
        .rnqc-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(15px, 1.7vw, 19px);
          height: clamp(15px, 1.7vw, 19px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 10px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* Buttons */
        .rnqc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .rnqc-top { grid-template-columns: 1fr; }
          .rnqc-img { width: 100%; }
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
        {/* ── Header ── */}
        <ExerciseHeader
          sectionLetter="C"
          title={"Listen, read, and number."}
          subTitle={
            "isten to the whole passage first, then number each statement or picture in the order you hear it."
          }
        />
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={6}
            pageId="sb_unit1_page8_q3"
          />
        </div>
        {/* ── Paragraph + Image ── */}
        <div className="rnqc-top">
          <p className="rnqc-para">{PARAGRAPH}</p>
          <img
            src={imgScene}
            alt="An adult and a child looking at an exhibit in a museum."
            className="rnqc-img"
          />
        </div>

        {/* ── Items ── */}
        <p id="sb-unit1-page8-q3-number-help" className="sr-only">
          Choose a number from 1 to 5 for each sentence. Each number can be used
          once. Choose the dash to clear an editable answer and make its number
          available again.
        </p>
        <div className="rnqc-list">
          {ITEMS.map((item) => {
            const wrong = isWrong(item);
            const value = answers[item.id] || "";
            const tColor = BOX_TEXT_DEFAULT;
            const bColor = wrong
              ? BOX_BORDER_WRONG
              : isDisabled(item)
                ? "#16a34a"
                : BOX_BORDER_DEFAULT;
            const disabled = isDisabled(item);

            return (
              <div key={item.id} className="rnqc-row">
                {/* Label a/b/c... */}
                <span className="rnqc-label">{item.id}</span>

                {/* Sentence */}
                <span className="rnqc-sentence">{item.sentence}</span>

                {/* Number selector */}
                <div className="rnqc-input-wrap">
                  <select
                    aria-label={`Sentence ${item.id}. ${item.sentence} Choose its order number.`}
                    aria-invalid={wrong}
                    aria-describedby="sb-unit1-page8-q3-number-help"
                    {...fieldKeys}
                    className={["rnqc-input", wrong ? "rnqc-input--wrong" : ""]
                      .filter(Boolean)
                      .join(" ")}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    style={{ borderColor: bColor, color: tColor }}
                  >
                    <option
                      value=""
                      aria-label="Clear answer; no number selected"
                    >
                      —
                    </option>
                    {NUMBER_OPTIONS.map((number) => (
                      <option
                        key={number}
                        value={number}
                        disabled={ITEMS.some(
                          (other) =>
                            other.id !== item.id &&
                            answers[other.id] === number,
                        )}
                      >
                        {number}
                      </option>
                    ))}
                  </select>
                  {wrong && <div className="rnqc-badge">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="rnqc-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              ref={resetButtonRef}
              onClick={handleReset}
              {...activationKeys}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              onClick={handleShowAnswer}
              {...activationKeys}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              onClick={handleCheck}
              {...activationKeys}
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
