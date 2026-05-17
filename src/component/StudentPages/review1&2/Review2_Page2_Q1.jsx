import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 38.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 39.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 40.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 2 Welcome to the Big Apple Folder/Page 19/SVG/Asset 41-a.svg";
import sound from "../../../assets/audio/ClassBook/Grade 4/cd13pg19-instruction-adult-lady_CJNDmPbC.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const CHECK_COLOR      = "#e53935";
const CROSS_COLOR      = "#e53935";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";
const PARA_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";

const captions = [
  { start: 0.16,  end: 7.78,  text: "Page 19, review two, exercise D. Read, listen, and write check and X." },
  { start: 9.06,  end: 10.18, text: "It's Tuesday morning." },
  { start: 10.18, end: 13.02, text: "John is going to school at half past eight." },
  { start: 13.02, end: 16.26, text: "He is going to wear an orange shirt and black pants." },
  { start: 16.34, end: 18.76, text: "He isn't going to wear a cap." },
  { start: 18.76, end: 21.90, text: "He isn't going to ride his bike to school." },
  { start: 21.90, end: 23.64, text: "He is going to take a bus." },
  { start: 23.64, end: 27.36, text: "After school, he isn't going to watch TV." },
  { start: 27.36, end: 28.84, text: "He's going to do his homework." },
];

const PARAGRAPH = `It's Tuesday morning. John is going to school at half past eight. He is going to wear an orange shirt and black pants. He isn't going to wear a cap. He isn't going to ride his bike to school. He is going to take a bus. After school, he isn't going to watch TV. He's going to do his homework.`;

// correctSide: "left" | "right"  →  الجانب اللي يكون فيه ✓
const ITEMS = [
  { id: 1, src: img1, correctSide: "right" },
  { id: 2, src: img2, correctSide: "left"  },
  { id: 3, src: img3, correctSide: "right" },
  { id: 4, src: img4, correctSide: "right" },
];

// "A" = ✓ يسار  ✕ يمين
// "B" = ✓ يمين  ✕ يسار
const correctState = (item) => item.correctSide === "left" ? "A" : "B";

export default function WB_ReadListenWriteCheckCross_QD2() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  // كل ضغطة على الصورة تقلب الحالة: null → "A" → "B" → "A" ...
  const handleSelect = (itemId) => {
    if (isLocked) return;
    setSelected((prev) => {
      const cur  = prev[itemId];
      const next = !cur ? "A" : cur === "A" ? "B" : "A";
      return { ...prev, [itemId]: next };
    });
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please choose a picture for each question."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === correctState(item)) score++; });
    setShowResults(true);
    if (score === ITEMS.length) ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)         ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                        ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = correctState(item); });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // إيش يظهر على كل جانب
  const getSymbol = (item, side) => {
    const sel = selected[item.id];
    if (!sel) return null;
    if (side === "left")  return sel === "A" ? "✓" : "✕";
    if (side === "right") return sel === "B" ? "✓" : "✕";
    return null;
  };

  const getSymbolColor = (item, side) => {
    const sym = getSymbol(item, side);
    if (!sym) return "#2b2b2b";
    if (showAns || showResults) {
      const isCorrectSide = side === item.correctSide;
      return isCorrectSide 
    }
    return sym === "✓" ? CHECK_COLOR : CROSS_COLOR;
  };

  const isWrongSide = (item, side) =>
    showResults && !showAns && selected[item.id] && side !== item.correctSide && getSymbol(item, side) === "✓";

  return (
    <div className="main-container-component">
      <style>{`
        .rlcc2-para {
          font-size: clamp(13px, 1.5vw, 18px);
          color: ${PARA_COLOR};
          line-height: 1.8;
          margin: 0;
        }

        .rlcc2-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 1.8vw, 24px) clamp(16px, 2.4vw, 32px);
          width: 100%;
        }

        .rlcc2-card {
          display: flex;

    flex-direction: row;
          gap: clamp(4px, 0.5vw, 6px);
        }

        .rlcc2-num {
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          line-height: 1;
        }

        .rlcc2-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
        }
        .rlcc2-img-wrap--locked { cursor: default; }

        .rlcc2-img {
          width: 100%;
          height: auto;
          display: block;
          pointer-events: none;
        }

        .rlcc2-symbol {
          position: absolute;
          bottom: 0;
          width: clamp(28px, 3.6vw, 46px);
          height: clamp(28px, 3.6vw, 46px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 2.2vw, 28px);
          font-weight: 700;
          z-index: 2;
          pointer-events: none;
        }

        
        .rlcc2-symbol--left {


        border-radius: 0 8px 0 0;
        }

        .rlcc2-symbol--right {
          right: 0;
          border-radius: 8px 0 0 0;
        }

        .rlcc2-badge {
          position: absolute;
          top: -7px; right: -7px;
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
          z-index: 3;
        }

        .rlcc2-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 480px) {
          .rlcc2-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 22px)", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <span className="WB-ex-A">D</span>
          Read, listen, and write <span style={{color : "#ff0000ff"}}>✓</span>  and<span style={{color : "#ff0000ff"}}>✕</span> .
        </h1>
    <div style={{margin:"3em 0 2em"}} >
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={4}
        />
      </div>
        <p className="rlcc2-para">{PARAGRAPH}</p>

        <div className="rlcc2-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc2-card">
              <span className="rlcc2-num">{item.id}</span>

              <div
                className={`rlcc2-img-wrap${isLocked ? " rlcc2-img-wrap--locked" : ""}`}
                onClick={() => handleSelect(item.id)}
              >
                <img src={item.src} alt={`q${item.id}`} className="rlcc2-img" />

                {/* Left symbol */}
                {(() => {
                  const sym   = getSymbol(item, "left");
                  const color = getSymbolColor(item, "left");
                  const wrong = isWrongSide(item, "left");
                  return sym ? (
                    <div className="rlcc2-symbol rlcc2-symbol--left" style={{ color }}>
                      {sym}
                      {wrong && <div className="rlcc2-badge">✕</div>}
                    </div>
                  ) : null;
                })()}

                {/* Right symbol */}
                {(() => {
                  const sym   = getSymbol(item, "right");
                  const color = getSymbolColor(item, "right");
                  const wrong = isWrongSide(item, "right");
                  return sym ? (
                    <div className="rlcc2-symbol rlcc2-symbol--right" style={{ color }}>
                      {sym}
                      {wrong && <div className="rlcc2-badge">✕</div>}
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          ))}
        </div>

        <div className="rlcc2-buttons">
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