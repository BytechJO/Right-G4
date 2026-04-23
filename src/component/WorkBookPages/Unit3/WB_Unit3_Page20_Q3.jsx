import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import AudioWithCaption from "../../AudioWithCaption";
import sound from "../../../assets/audio/ClassBook/Grade 3/cd3pg20instruction-adult-lady_6VKGQN60.mp3";

const ITEMS = [
  { id: 1, options: ["chin",  "shin"],  correct: "chin"  },
  { id: 2, options: ["patch", "sash"],  correct: "patch" },
  { id: 3, options: ["lash",  "latch"], correct: "latch" },
  { id: 4, options: ["cheat", "sheet"], correct: "cheat" },
  { id: 5, options: ["chop",  "shop"],  correct: "shop"  },
  { id: 6, options: ["dish",  "ditch"], correct: "dish"  },
];

const captions = [
  { start: 0.58,  end: 4.06,  text: "Page 20, phonics exercise C." },
  { start: 4.06,  end: 6.00,  text: "Listen, read, and circle."    },
  { start: 7.18,  end: 8.82,  text: "1- chin."                     },
  { start: 9.86,  end: 12.70, text: "2- patch."                    },
  { start: 12.70, end: 14.60, text: "3- latch."                    },
  { start: 14.60, end: 17.22, text: "4- cheat."                    },
  { start: 18.32, end: 20.92, text: "5- shop."                     },
  { start: 20.92, end: 22.56, text: "6- dish."                     },
];

export default function WB_Unit3_Page18_QC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all words first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => { filledAnswers[item.id] = item.correct; });
    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong    = (item, option) => showResults && answers[item.id] === option && option !== item.correct;
  const isSelected = (item, option) => showAns ? item.correct === option : answers[item.id] === option;

  const renderOption = (item, option) => {
    const selected = isSelected(item, option);
    const wrong    = isWrong(item, option);

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "118px",
          minHeight: "54px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: selected ? "4px solid #d62828" : "2px solid transparent",
          background: "transparent",
          color: "#222",
          fontSize: "24px",
          fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          lineHeight: "1.1",
        }}
      >
        {option}
        {wrong && (
          <div style={{
            position: "absolute",
            top: "-8px", right: "-8px",
            width: "22px", height: "22px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "700",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          column-gap: 18px;
          row-gap: 18px;
          width: 100%;
          align-items: start;
        }

        /* ✅ FIX: الـ item عمودي — رقم فوق، كارت تحت */
        .wb-c-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          min-width: 0;
        }

        /* ✅ FIX: صف الرقم فوق الكارت محاذي للشمال */
        .wb-c-top-row {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          width: 100%;
          padding-bottom: 6px;
        }

        .wb-c-num {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-c-card {
          width: 126px;
          min-height: 138px;
          border: 2px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 10px 8px;
          box-sizing: border-box;
        }

        .wb-c-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 1200px) {
          .wb-c-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          .wb-c-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 500px) {
          .wb-c-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display:"flex", flexDirection:"column", gap:"28px", maxWidth:"1100px", margin:"0 auto" }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">C</span> Listen, read, and circle.
        </h1>

        <div style={{ display:"flex", justifyContent:"center" }}>
          <AudioWithCaption src={sound} captions={captions} />
        </div>

        <div className="wb-c-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c-item">

              {/* ✅ الرقم فوق الكارت في صف مستقل */}
              <div className="wb-c-top-row">
                <span className="wb-c-num">{item.id}</span>
              </div>

              {/* الكارت */}
              <div className="wb-c-card">
                {item.options.map((option) => (
                  <React.Fragment key={option}>
                    {renderOption(item, option)}
                  </React.Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div className="wb-c-buttons">
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