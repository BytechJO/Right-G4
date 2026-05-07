import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE
// ─────────────────────────────────────────────
import familyImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 32/SVG/Asset 4.svg";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const ANSWER_COLOR = "#c0392b";
const TEXT_DEFAULT = "#2b2b2b";
const LINE_COLOR   = "#2b2b2b";
const WRONG_COLOR  = "#ef4444";
const RIGHT_COLOR  = "#2096a6";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, base: "big",  baseBlank: false, comp: "bigger",  compBlank: false, super: "biggest", superBlank: false },
  { id: 2, base: "tall", baseBlank: true,  comp: "taller",  compBlank: false, super: "tallest", superBlank: true  },
  { id: 3, base: "slow", baseBlank: false, comp: "slower",  compBlank: true,  super: "slowest", superBlank: true  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function CB_ReadAndWrite_QA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const getKey     = (id, field) => `${id}-${field}`;

  const getCorrect = (item, field) => {
    if (field === "base")  return item.base  ?? "";
    if (field === "comp")  return item.comp  ?? "";
    if (field === "super") return item.super ?? "";
    return "";
  };

  const isBlank = (item, field) => {
    if (field === "base")  return item.baseBlank;
    if (field === "comp")  return item.compBlank;
    if (field === "super") return item.superBlank;
    return false;
  };

  const handleChange = (id, field, val) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [getKey(id, field)]: val }));
  };

  // جمع كل الخانات الفارغة
  const allBlanks = [];
  ITEMS.forEach((item) => {
    ["base", "comp", "super"].forEach((field) => {
      if (isBlank(item, field)) allBlanks.push({ item, field });
    });
  });

  const handleCheck = () => {
    if (isLocked) return;
    const allFilled = allBlanks.every(({ item, field }) => {
      const val = answers[getKey(item.id, field)] || "";
      return val.trim() !== "";
    });
    if (!allFilled) { ValidationAlert.info("Please fill in all the blanks."); return; }

    let score = 0;
    allBlanks.forEach(({ item, field }) => {
      const val  = (answers[getKey(item.id, field)] || "").trim().toLowerCase();
      const corr = getCorrect(item, field).toLowerCase();
      if (val === corr) score++;
    });
    setShowResults(true);
    if (score === allBlanks.length)  ValidationAlert.success(`Score: ${score} / ${allBlanks.length}`);
    else if (score > 0)              ValidationAlert.warning(`Score: ${score} / ${allBlanks.length}`);
    else                             ValidationAlert.error(`Score: ${score} / ${allBlanks.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    allBlanks.forEach(({ item, field }) => {
      filled[getKey(item.id, field)] = getCorrect(item, field);
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

  const getFieldState = (item, field) => {
    if (!isBlank(item, field)) return "static";
    const val  = (answers[getKey(item.id, field)] || "").trim().toLowerCase();
    const corr = getCorrect(item, field).toLowerCase();
    if (showAns)     return "answer";
    if (showResults) return val === corr ? "correct" : "wrong";
    return "editing";
  };

  const renderCell = (item, field) => {
    const blank = isBlank(item, field);
    const state = getFieldState(item, field);
    const val   = answers[getKey(item.id, field)] || "";
    const corr  = getCorrect(item, field);

    if (!blank) {
      return <span className="raw-cell">{corr}</span>;
    }

    let color = TEXT_DEFAULT;
    if (state === "answer")  color = ANSWER_COLOR;
    if (state === "correct") color = RIGHT_COLOR;
    if (state === "wrong")   color = WRONG_COLOR;

    return (
      <span className="input-cell">
        <input
          className="rw-input"
          type="text"
          value={state === "answer" ? corr : val}
          disabled={isLocked}
          onChange={(e) => handleChange(item.id, field, e.target.value)}
          style={{ color, borderBottomColor: color }}
        />
        {state === "wrong" && (
          <span className="wrong-hint" style={{ color: ANSWER_COLOR }}>{corr}</span>
        )}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rw-layout {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 40px);
          width: 100%;
          margin : 10% 0 ;
        }

        .rw-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.6vw, 32px);
          min-width: 0;
        }

        .rw-right img {
          width: clamp(180px, 28vw, 340px);
          height: auto;
          display: block;
        }

        .rw-row {
          display: flex;
          align-items: baseline;
          gap: clamp(10px, 1.6vw, 22px);
          flex-wrap: nowrap;
        }

        .rw-num {
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 700;
          color: ${TEXT_DEFAULT};
          flex-shrink: 0;
          min-width: 1.2em;
        }

        .raw-cell {
          font-size: clamp(14px, 1.6vw, 20px);
          color: ${TEXT_DEFAULT};
          white-space: nowrap;
        }

        .input-cell {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          min-width: clamp(80px, 10vw, 130px);
        }

        .rw-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${LINE_COLOR};
          outline: none;
          background: transparent;
          font-size: clamp(14px, 1.6vw, 20px);
          font-weight: 500;
          text-align: center;
          transition: border-color 0.2s, color 0.2s;
          color: ${TEXT_DEFAULT};
        }
        .rw-input:disabled { opacity: 1; cursor: default; }

        .wrong-hint {
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          padding: 0 4px;
        }

        .rw-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(10px, 1.8vw, 20px);
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
        {/* Header */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">C</span>
          Read and write.
        </h1>

        {/* Layout */}
        <div className="rw-layout">

          {/* الصفوف */}
          <div className="rw-left">
            {ITEMS.map((item) => (
              <div key={item.id} className="rw-row">
                <span className="rw-num">{item.id}</span>
                {renderCell(item, "base")}
                {renderCell(item, "comp")}
                {renderCell(item, "super")}
              </div>
            ))}
          </div>

          {/* الصورة */}
          <div className="rw-right">
            <img src={familyImg} alt="family illustration" />
          </div>

        </div>

        {/* Buttons */}
        <div className="rw-buttons">
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