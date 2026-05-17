import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGES — وهمية، عدّلها لاحقاً
// ─────────────────────────────────────────────
import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 73/SVG/Asset 3.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UNDERLINE_DEFAULT = "#3f3f3f";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR        = "#2b2b2b";
const INPUT_ANSWER_COLOR      = "#c81e1e";
const NUMBER_COLOR            = "#2b2b2b";
const TEXT_COLOR              = "#2b2b2b";
const GIVEN_TEXT_COLOR        = "#2b2b2b";
const ANSWER_GIVEN_COLOR      = "#c81e1e";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//
//  كل item فيه:
//  - id, src: الصورة
//  - questionParts: أجزاء سطر السؤال
//  - answerParts:   أجزاء سطر الجواب
//
//  كل جزء إما:
//  { t: "text",  v: "..." }              → نص ثابت أسود
//  { t: "given", v: "..." }              → نص معطى أحمر (جواب مثال)
//  { t: "input", id, correct, answer }  → input يكتبه الطالب
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:  1,
    src: img1,
    // السؤال معطى كله، الجواب معطى
    questionParts: [
      { t: "given", v: "Did he clean his shoes?" },
    ],
    answerParts: [
      { t: "given", v: "Yes, he did.", isAnswer: true },
    ],
  },
  {
    id:  2,
    src: img2,
    // السؤال: "Did they play ___ baseball?"
    questionParts: [
      { t: "given", v: "Did they play" },
      { t: "input", id: "2q", correct: [""], answer: "" },   // الفراغ في المنتصف
      { t: "text",  v: "baseball?" },
    ],
    answerParts: [
      { t: "given", v: "No, they didn't.", isAnswer: true },
    ],
  },
  {
    id:  3,
    src: img3,
    // السؤال: "Did they play ___ jump rope?"
    questionParts: [
      { t: "given", v: "Did they play" },
      { t: "input", id: "3q", correct: [""], answer: "" },
      { t: "text",  v: "jump rope?" },
    ],
    answerParts: [
      { t: "given", v: "No, they didn't.", isAnswer: true },
    ],
  },
];

// ─────────────────────────────────────────────
//  📝  NOTE FOR DEVELOPER
//
//  بناءً على الصورة:
//  - السؤال 1: كله معطى (أسود + أحمر) — لا input
//  - السؤال 2 و 3: فراغ في المنتصف في سطر السؤال
//
//  لو بدك تغير: حط correct: ["الكلمة"] و answer: "الكلمة"
//  لو الفراغ فاضي بالكامل بدون تحقق، خلي correct: [""] و answer: ""
// ─────────────────────────────────────────────

// collect all input parts that need checking
const ALL_INPUTS = ITEMS.flatMap((item) => [
  ...item.questionParts.filter((p) => p.t === "input"),
  ...item.answerParts.filter((p) => p.t === "input"),
]);

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9'\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) => {
  if (!correctArr || correctArr.length === 0) return true;
  if (correctArr[0] === "") return true; // no-check field
  return correctArr.some((c) => normalize(userVal) === normalize(c));
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_LookWriteQuestions_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (id, value, correctArr) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[id] || "", correctArr)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const checkable = ALL_INPUTS.filter((p) => p.correct && p.correct[0] !== "");
    const allAnswered = checkable.every((p) => answers[p.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    checkable.forEach((p) => { if (isCorrect(answers[p.id] || "", p.correct)) score++; });
    const total = checkable.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach((p) => { filled[p.id] = p.answer; });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  const isWrongPart    = (p) => showResults && !showAns && p.correct[0] !== "" && !isCorrect(answers[p.id] || "", p.correct);
  const isDisabledPart = (p) => showAns || (showResults && isCorrect(answers[p.id] || "", p.correct));

  // ── Render a single part ──
  const renderPart = (part, i) => {
    // نص ثابت أسود
    if (part.t === "text") {
      return (
        <span key={i} className="lwq-text" style={{ color: TEXT_COLOR }}>
          {part.v}
        </span>
      );
    }

    // نص معطى أحمر (أجوبة مثال أو أسئلة معطاة)
    if (part.t === "given") {
      return (
        <span
          key={i}
          className="lwq-given"
          style={{ color: part.isAnswer ? ANSWER_GIVEN_COLOR : GIVEN_TEXT_COLOR }}
        >
          {part.v}
        </span>
      );
    }

    // input
    const wrong    = isWrongPart(part);
    const disabled = isDisabledPart(part);
    const value    = answers[part.id] || "";
    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

    return (
      <span key={part.id} className="lwq-input-wrap">
        <input
          type="text"
          className={[
            "lwq-input",
            wrong   ? "lwq-input--wrong"  : "",
            showAns ? "lwq-input--answer" : "",
          ].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(part.id, e.target.value, part.correct)}
          style={{ borderBottomColor: uColor, color: tColor }}
          spellCheck={false}
          autoComplete="off"
        />
        {wrong && <span className="lwq-badge">✕</span>}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .lwq-list {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3.2vw, 42px);
          width: 100%;
        }

        /* Single item */
        .lwq-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Number */
        .lwq-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1;
          padding-top: clamp(18px, 2.5vw, 30px);
          min-width: clamp(16px, 2vw, 24px);
        }

        /* Image */
        .lwq-img {
          width: clamp(100px, 14vw, 180px);
          height: clamp(70px, 10vw, 130px);
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          display: block;
        }

        /* Lines block (Q + A) */
        .lwq-lines {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 16px);
          justify-content: center;
          min-height: clamp(70px, 10vw, 130px);
        }

        /* Single line (question or answer) */
        .lwq-line {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: clamp(4px, 0.5vw, 7px);
          border-bottom: 1.5px solid ${INPUT_UNDERLINE_DEFAULT};
          padding-bottom: 2px;
          width: 100%;
        }

        /* Given text (أحمر أو أسود) */
        .lwq-given {
          font-size: clamp(13px, 1.6vw, 19px);
          line-height: 1.5;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* Static black text */
        .lwq-text {
          font-size: clamp(13px, 1.6vw, 19px);
          line-height: 1.5;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* Input wrap */
        .lwq-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1;
          min-width: clamp(80px, 10vw, 160px);
        }

        .lwq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .lwq-input:disabled  { opacity: 1; cursor: default; }
        .lwq-input--wrong    { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .lwq-input--answer   { color: ${INPUT_ANSWER_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .lwq-badge {
          position: absolute;
          top: -8px; right: -4px;
          width: clamp(14px, 1.6vw, 18px);
          height: clamp(14px, 1.6vw, 18px);
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

        .lwq-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
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
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A-1">C</span>
          Look and write questions. Then answer.
        </h1>

        {/* ── Items ── */}
        <div className="lwq-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="lwq-item">

              {/* Number */}
              <span className="lwq-num">{item.id}</span>

              {/* Image */}
              <img src={item.src} alt={`img-${item.id}`} className="lwq-img" />

              {/* Q + A lines */}
              <div className="lwq-lines">
                {/* Question line */}
                <div className="lwq-line">
                  {item.questionParts.map((p, i) => renderPart(p, i))}
                </div>
                {/* Answer line */}
                <div className="lwq-line">
                  {item.answerParts.map((p, i) => renderPart(p, i))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="lwq-buttons">
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