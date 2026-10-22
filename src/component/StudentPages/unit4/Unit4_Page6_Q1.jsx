import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import sound from "../../../assets/audio/ClassBook/Grade 4/cd23pg33-instruction1-adult-lady_LmHqO0J8.mp3";
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 33/SVG/Asset 1.svg";
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

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const BOX_BORDER_DEFAULT = "#2096a6";
const BOX_BORDER_WRONG = "#ef4444";
const BOX_BORDER_CORRECT = "#2096a6";
const SENTENCE_COLOR = "#2b2b2b";
const LABEL_COLOR = "#2b2b2b";
const PARA_COLOR = "#2b2b2b";
const WRONG_BADGE_BG = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  🔊  CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  {
    start: 0.26,
    end: 9.32,
    text: "Page 33, write activities. Exercise E. Listen, read, and write check or X.",
  },
  {
    start: 9.32,
    end: 15.32,
    text: "My mom is taller than my dad. Dad is younger than my Uncle George.",
  },
  {
    start: 15.32,
    end: 18.58,
    text: "George is shorter than his friend Eric.",
  },
  {
    start: 18.58,
    end: 21.26,
    text: "My sister is younger than me.",
  },
  {
    start: 21.26,
    end: 24.02,
    text: "I'm older than my brother Joe.",
  },
  {
    start: 24.02,
    end: 29.14,
    text: "My cousin Ed is stronger than me, but I'm taller than him.",
  },
  {
    start: 29.14,
    end: 32.84,
    text: "My cousin Davey is the tallest of us three.",
  },
  {
    start: 32.84,
    end: 41.1,
    text: "Smallest, healthier, kindest, fatter, thinnest, braver.",
  },
];

// ─────────────────────────────────────────────
//  📝  PARAGRAPH
// ─────────────────────────────────────────────
const PARAGRAPH = `My mom is taller than my dad. Dad is younger than my uncle George. George is shorter than his friend Eric. My sister is younger than me. I'm older than my brother Joe. My cousin Ed is stronger than me, but I'm taller than him. My cousin Davy is the tallest of us three.`;

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// true = صح ✓ / false = غلط ✗
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, sentence: "George is taller than Eric.", correct: false },
  { id: 2, sentence: "Ed is stronger than me.", correct: true },
  { id: 3, sentence: "My sister is older than me.", correct: false },
  { id: 4, sentence: "Joe is younger than me.", correct: true },
  { id: 5, sentence: "Davy is the tallest.", correct: true },
  { id: 6, sentence: "Dad is older than my uncle.", correct: false },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ListenReadWriteTF_QE() {
  const [answers, setAnswers] = useState({}); // { id: true | false }
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [results, setResults] = useState({});
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);
  const checkDisabled =
    showAns || ITEMS.every((item) => results[item.id] === "correct");

  const isLocked = checkDisabled;

  const handleSelect = (id, value) => {
    if (showAns || results[id] === "correct") return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnnouncement("Selection updated.");
  };

  const handleCheck = () => {
    if (checkDisabled) return;
    if (
      !ITEMS.every(
        (item) =>
          answers[item.id] !== undefined &&
          answers[item.id] !== null &&
          answers[item.id] !== "",
      )
    ) {
      ValidationAlert.info("Please choose an answer for each question.");
      setAnnouncement("Please choose an answer for each question.");
      return;
    }
    const next = Object.fromEntries(
      ITEMS.map((item) => [
        item.id,
        results[item.id] === "correct" || answers[item.id] === item.correct
          ? "correct"
          : "wrong",
      ]),
    );
    const score = Object.values(next).filter(
      (value) => value === "correct",
    ).length;
    setResults(next);
    setShowResults(true);
    setAnnouncement(
      `Score: ${score} out of ${ITEMS.length}. Correct answers are locked; incorrect answers can be changed.`,
    );
    if (score === ITEMS.length) {
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
    setResults({});
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setResults({});
    setAnnouncement("Selections and feedback cleared.");
  };

  // حالة كل مربع
  const getBoxState = (item, boxValue) => {
    const sel = answers[item.id];
    const isSelected = sel === boxValue;
    if (!isSelected) return "none";
    if (showAns) return "answer";
    if (results[item.id] !== undefined)
      return item.correct === boxValue ? "correct" : "wrong";
    return "selected";
  };

  // لون border المربع
  const getBoxBorder = (item, boxValue) => {
    const state = getBoxState(item, boxValue);
    if (state === "correct" || state === "answer") return BOX_BORDER_CORRECT;
    if (state === "wrong") return "#ef4444";
    return BOX_BORDER_DEFAULT;
  };

  // محتوى المربع
  const getBoxContent = (item, boxValue) => {
    const state = getBoxState(item, boxValue);
    if (state === "none") return null;

    // يظهر الرمز دايماً لما يكون selected أو correct أو answer
    if (state === "selected" || state === "correct" || state === "answer") {
      return boxValue ? (
        <span
          style={{
            color: "#ff000f",
            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,
          }}
        >
          ✓
        </span>
      ) : (
        <span
          style={{
            color: "#ff000f",
            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,
          }}
        >
          ✗
        </span>
      );
    }

    // wrong: اختار الغلط
    if (state === "wrong") {
      return boxValue ? (
        <span
          style={{
            color: "#ff000f",
            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,
          }}
        >
          ✓
        </span>
      ) : (
        <span
          style={{
            color: "#ff000f",
            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,
          }}
        >
          ✗
        </span>
      );
    }

    return null;
  };

  // الـ 6 items تتوزع في عمودين: فردي يسار، زوجي يمين
  const leftItems = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 === 1);

  const renderItem = (item) => {
    // const wrongSelected =
    //   results[item.id] === "wrong" &&
    //   answers[item.id] !== undefined &&
    //   answers[item.id] !== item.correct;

    return (
      <div key={item.id} className="tf-row">
        {/* رقم */}
        <span className="tf-num">{item.id}</span>

        {/* جملة */}
        <span className="tf-sentence">{item.sentence}</span>

        {/* مربعي ✓ و ✗ */}
        <div className="tf-boxes">
          {/* مربع ✓ */}
          <div
            role="button"
            tabIndex={0}
            data-keyboard-choice
            {...activationKeys}
            aria-label={`Question ${item.id}. ${item.sentence} ${"True"}`}
            aria-pressed={answers[item.id] === true}
            aria-disabled={showAns || results[item.id] === "correct"}
            className={`tf-box ${!isLocked ? "tf-box--clickable" : ""}`}
            style={{
              ...{ borderColor: getBoxBorder(item, true) },
              borderRadius:
                { borderColor: getBoxBorder(item, true) }.borderRadius || "6px",
              background:
                answers[item.id] === true &&
                !showAns &&
                results[item.id] === undefined
                  ? "#dbeafe"
                  : { borderColor: getBoxBorder(item, true) }.background,
              boxShadow:
                answers[item.id] === true
                  ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                  : undefined,
            }}
            onClick={() => handleSelect(item.id, true)}
          >
            {getBoxContent(item, true)}
            {/* إذا اختار ✓ وكانت غلط */}
            {results[item.id] === "wrong" &&
              answers[item.id] === true &&
              item.correct !== true && <div className="tf-badge">✕</div>}
          </div>

          {/* مربع ✗ */}
          <div
            role="button"
            tabIndex={0}
            data-keyboard-choice
            {...activationKeys}
            aria-label={`Question ${item.id}. ${item.sentence} ${"False"}`}
            aria-pressed={answers[item.id] === false}
            aria-disabled={showAns || results[item.id] === "correct"}
            className={`tf-box ${!isLocked ? "tf-box--clickable" : ""}`}
            style={{
              ...{ borderColor: getBoxBorder(item, false) },
              borderRadius:
                { borderColor: getBoxBorder(item, false) }.borderRadius ||
                "6px",
              background:
                answers[item.id] === false &&
                !showAns &&
                results[item.id] === undefined
                  ? "#dbeafe"
                  : { borderColor: getBoxBorder(item, false) }.background,
              boxShadow:
                answers[item.id] === false
                  ? `inset 0 0 0 2px ${showAns || results[item.id] === "correct" ? "#16a34a" : results[item.id] === "wrong" ? "#ef4444" : "#2563eb"}`
                  : undefined,
            }}
            onClick={() => handleSelect(item.id, false)}
          >
            {getBoxContent(item, false)}
            {/* إذا اختار ✗ وكانت غلط */}
            {results[item.id] === "wrong" &&
              answers[item.id] === false &&
              item.correct !== false && <div className="tf-badge">✕</div>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      data-adapt-scope="unit4_Unit4_Page6_Q1"
      className="main-container-component"
    >
   <style>{`[data-unit4-scope="Unit4_Page6_Q1"] input:focus-visible, [data-unit4-scope="Unit4_Page6_Q1"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`
        /* ── Paragraph + image ── */
        .tf-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(12px, 1.8vw, 22px);
          align-items: flex-start;
          width: 100%;
        }

        .tf-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 2;
          margin: 0;
        }

        .tf-img {
          width: clamp(160px, 22vw, 280px);
          height: auto;
          display: block;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* ── Grid عمودين ── */
        .tf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 1.6vw, 20px) clamp(20px, 3vw, 40px);
          width: 100%;
        }

        /* ── صف واحد ── */
        .tf-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 12px);
        }

        .tf-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .tf-sentence {
          font-size: clamp(13px, 1.4vw, 17px);
          color: ${SENTENCE_COLOR};
          flex: 1;
          line-height: 1.4;
        }

        /* ── الصندوقين ── */
        .tf-boxes {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        .tf-box {
          width: clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border: 2px solid ${BOX_BORDER_DEFAULT};
          border-radius: 8px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: border-color 0.2s;
          box-sizing: border-box;
          user-select: none;
        }
        .tf-box--clickable { cursor: pointer; }
        .tf-box--clickable:hover { background: #f0fbfc; }

        /* ✕ badge فوق المربع */
        .tf-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(7px, 0.8vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .tf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 600px) {
          .tf-top  { grid-template-columns: 1fr; }
          .tf-img  { width: 100%; }
          .tf-grid { grid-template-columns: 1fr; }
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
          sectionLetter="E"
          title={
            <>
              Listen, read, and write{" "}
              <span style={{ color: "#ff000f" }}> ✓ </span>or{" "}
              <span style={{ color: "#ff000f" }}> ✗</span>.
            </>
          }
          subTitle={"Listen once, replay if needed, then compare each statement with what you heard before choosing the two-way answer."}
        />

        {/* ── Audio ── */}
        <div style={{ marginTop: "10px" }}>
          <QuestionAudioPlayer
            pageId="sb_unit4_page6_q1"
            src={sound}
            captions={captions}
            stopAtSecond={6}
          />
        </div>

        {/* ── Paragraph + Image ── */}
        <div className="tf-top">
          <p className="tf-para">{PARAGRAPH}</p>
          <img
            src={imgScene}
            alt="Three children outside a house with a football on the ground."
            className="tf-img"
          />
        </div>

        {/* ── Items Grid ── */}
        <div className="tf-grid">
          {/* عمود يسار */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.6vw,20px)",
            }}
          >
            {leftItems.map(renderItem)}
          </div>
          {/* عمود يمين */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.6vw,20px)",
            }}
          >
            {rightItems.map(renderItem)}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="tf-buttons">
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
              onClick={handleShowAnswer}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              aria-label="Check Answer"
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
