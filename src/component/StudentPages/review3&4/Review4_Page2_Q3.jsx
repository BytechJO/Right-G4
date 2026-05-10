import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE — الفيل والماوس صورة واحدة
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 37/SVG/Asset 9.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TABLE_BORDER            = "#2195a6";
const CELL_BG_DEFAULT         = "#ffffff";
const CELL_TEXT_GIVEN         = "transparent";   // خلايا معطاة — أسود
const INPUT_ANSWER_COLOR      = "#c81e1e";   // إجابة صح / show answer — أحمر
const INPUT_TEXT_COLOR        = "#2b2b2b";   // نص أثناء الكتابة
const INPUT_UNDERLINE_DEFAULT = "transparent";
const INPUT_UNDERLINE_WRONG   = "#ef4444";
const WRONG_BADGE_BG          = "#ef4444";
const WRONG_BADGE_TEXT        = "#ffffff";
const HEADER_BG               = "#transparent";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  type: "given" → خلية معطاة (عرضها فقط)
//        "input" → خلية فيها input
// ─────────────────────────────────────────────
// كل صف: [col0_base, col1_comparative, col2_superlative]
const ROWS = [
  {
    id: 1,
    cells: [
      { type: "given", text: "important"       },
      { type: "input", correct: ["more important"],      answer: "more important"      },
      { type: "given", text: "most important"  },
    ],
  },
  {
    id: 2,
    cells: [
      { type: "given", text: "careful"         },
      { type: "input", correct: ["more careful"],        answer: "more careful"        },
      { type: "input", correct: ["most careful"],        answer: "most careful"        },
    ],
  },
  {
    id: 3,
    cells: [
      { type: "input", correct: ["dangerous"],           answer: "dangerous"           },
      { type: "given", text: "more dangerous"  },
      { type: "input", correct: ["most dangerous"],      answer: "most dangerous"      },
    ],
  },
  {
    id: 4,
    cells: [
      { type: "given", text: "valuable"        },
      { type: "input", correct: ["more valuable"],       answer: "more valuable"       },
      { type: "input", correct: ["most valuable"],       answer: "most valuable"       },
    ],
  },
];

// collect all input keys: "rowId-colIdx"
const ALL_INPUTS = [];
ROWS.forEach((row) => {
  row.cells.forEach((cell, ci) => {
    if (cell.type === "input") ALL_INPUTS.push({ key: `${row.id}-${ci}`, cell });
  });
});

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadWrite_QF() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleChange = (key, value, correct) => {
    if (showAns) return;
    if (showResults && isCorrect(answers[key] || "", correct)) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ALL_INPUTS.every(({ key }) => answers[key]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ALL_INPUTS.forEach(({ key, cell }) => {
      if (isCorrect(answers[key] || "", cell.correct)) score++;
    });
    const total = ALL_INPUTS.length;
    setShowResults(true);
    if (score === total)   ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)    ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                   ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ALL_INPUTS.forEach(({ key, cell }) => { filled[key] = cell.answer; });
    setAnswers(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongCell = (key, correct) =>
    showResults && !showAns && !isCorrect(answers[key] || "", correct);

  const isDisabledCell = (key, correct) =>
    showAns || (showResults && isCorrect(answers[key] || "", correct));

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Layout: image left | table right ── */
        .rwf-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: center;
          width: 100%;
        }

        .rwf-scene-img {
          width: clamp(120px, 18vw, 240px);
          height: auto;
          display: block;
          flex-shrink: 0;
        }

        /* ── Table ── */
        .rwf-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .rwf-table th,
        .rwf-table td {
          border: 2px solid ${TABLE_BORDER};
          padding: clamp(8px, 1.1vw, 14px) clamp(10px, 1.4vw, 18px);
          text-align: center;
          vertical-align: middle;
        }

        /* header row — بدون header معطى بس بنحتاج padding */
        .rwf-table th {
          background: ${HEADER_BG};
          font-size: clamp(12px, 1.4vw, 17px);
          font-weight: 700;
          color: #6b7280;
          white-space: nowrap;
        }

        /* given cell */
        .rwf-given {
          font-size: clamp(13px, 1.55vw, 19px);
          font-weight: 500;
          color: ${CELL_TEXT_GIVEN};
          line-height: 1.4;
        }

        /* input cell */
        .rwf-input-wrap {
          position: relative;
          width: 100%;
        }

        .rwf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UNDERLINE_DEFAULT};
          outline: none;
          font-size: clamp(13px, 1.55vw, 19px);
          font-weight: 500;
          color: ${INPUT_TEXT_COLOR};
          text-align: center;
          line-height: 1.5;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
        }
        .rwf-input:focus        { border-bottom-color: #9ca3af; }
        .rwf-input:disabled     { opacity: 1; cursor: default; border-bottom-color: transparent; }
        .rwf-input--wrong       { border-bottom-color: ${INPUT_UNDERLINE_WRONG}; }
        .rwf-input--answer      { color: ${INPUT_ANSWER_COLOR}; font-size: clamp(14px, 1.7vw, 22px); font-weight: 700; }

        /* ✕ badge */
        .rwf-badge {
          position: absolute;
          top: -8px; right: -4px;
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
        .rwf-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 500px) {
          .rwf-body { grid-template-columns: 1fr; }
          .rwf-scene-img { width: clamp(100px, 40vw, 160px); margin: 0 auto; }
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
          <span className="WB-ex-A-1">F</span>
          Read and write.
        </h1>

        {/* ── Body ── */}
        <div className="rwf-body">

          {/* صورة الفيل والماوس */}
          <img src={imgScene} alt="elephant and mouse" className="rwf-scene-img" />

          {/* الجدول */}
          <table className="rwf-table">
            <thead>
              <tr>
                <th>Base</th>
                <th>Comparative</th>
                <th>Superlative</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, ci) => {
                    const key = `${row.id}-${ci}`;

                    if (cell.type === "given") {
                      return (
                        <td key={ci}>
                          <span className="rwf-given">{cell.text}</span>
                        </td>
                      );
                    }

                    // input cell
                    const wrong    = isWrongCell(key, cell.correct);
                    const disabled = isDisabledCell(key, cell.correct);
                    const value    = answers[key] || "";
                    const tColor   = showAns ? INPUT_ANSWER_COLOR : INPUT_TEXT_COLOR;
                    const uColor   = wrong ? INPUT_UNDERLINE_WRONG : INPUT_UNDERLINE_DEFAULT;

                    return (
                      <td key={ci}>
                        <div className="rwf-input-wrap">
                          <input
                            type="text"
                            className={[
                              "rwf-input",
                              wrong   ? "rwf-input--wrong"  : "",
                              showAns ? "rwf-input--answer" : "",
                            ].filter(Boolean).join(" ")}
                            value={value}
                            disabled={disabled}
                            onChange={(e) => handleChange(key, e.target.value, cell.correct)}
                            style={{ borderBottomColor: uColor, color: tColor }}
                            spellCheck={false}
                            autoComplete="off"
                          />
                          {wrong && <div className="rwf-badge">✕</div>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* ── Buttons ── */}
        <div className="rwf-buttons">
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