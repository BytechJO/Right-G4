import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 63/SVG/Asset 3.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd1pg20-story-adult-lady_Nf7yHD6t.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const NUMBER_COLOR     = "#2b2b2b";
const PARA_COLOR       = "#2b2b2b";
const BOX_BORDER       = "#2096a6";
const BOX_RADIUS       = "8px";
const CHECK_COLOR      = "#c81e1e";
const CROSS_COLOR      = "#c81e1e";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Read, listen, and write ✓ or X." },
  { start: 5.0,  end: 14.0, text: "My family and I went to a restaurant that had a buffet." },
  { start: 14.0, end: 28.0, text: "There was so much food to choose from. There was spicy baked chicken with rice and spaghetti and meatballs." },
  { start: 28.0, end: 40.0, text: "There were rolls and fried chicken. There were cookies and cupcakes to eat for dessert." },
  { start: 40.0, end: 50.0, text: "There were apples, oranges, and even pistachio ice cream!" },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  { id: 1, text: "There was baked chicken.",           correct: "check" },
  { id: 2, text: "There wasn't any rice.",             correct: "cross" },
  { id: 3, text: "There weren't any rolls.",           correct: "cross" },
  { id: 4, text: "There was fried chicken.",           correct: "check" },
  { id: 5, text: "There were grapes and pears.",       correct: "cross" },
  { id: 6, text: "There was spaghetti and meatballs.", correct: "check" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ReadListenCheckCross_QE() {
  const [selected,    setSelected]    = useState({});   // { id: "check" | "cross" | null }
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const isLocked = showResults || showAns;

  const handleSelect = (id, boxType) => {
    if (isLocked) return;
    // لو ضغط على نفس المربع يلغيه، غير ذلك يحدده
    setSelected((prev) => ({ ...prev, [id]: prev[id] === boxType ? null : boxType }));
  };

  const handleCheck = () => {
    if (isLocked) return;
    const allAnswered = ITEMS.every((item) => selected[item.id]);
    if (!allAnswered) { ValidationAlert.info("Please answer all questions first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (selected[item.id] === item.correct) score++; });
    setShowResults(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.correct; });
    setSelected(filled);
    setShowResults(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  // ── هل هذا المربع غلط؟ ──
  // فقط المربع المحدد الغلط يأخذ badge — بدون أي تأثير آخر
  const isBoxWrong = (id, boxType) => {
    if (!showResults || showAns) return false;
    const item = ITEMS.find((i) => i.id === id);
    return selected[id] === boxType && boxType !== item.correct;
  };

  const renderBox = (id, boxType) => {
    const sel      = selected[id];
    const isChosen = sel === boxType;
    const wrong    = isBoxWrong(id, boxType);
    const symbol   = boxType === "check" ? "✓" : "✕";
    const symColor = boxType === "check" ? CHECK_COLOR : CROSS_COLOR;

    return (
      <div
        style={{
          position: "relative",
          width:  "clamp(40px, 3.8vw, 40px)",
          height: "clamp(40px, 3.8vw, 40px)",
          border: `2px solid ${BOX_BORDER}`,
          borderRadius: BOX_RADIUS,
          background: "#ffffff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: isLocked ? "default" : "pointer",
          flexShrink: 0,
          userSelect: "none",
        }}
        onClick={() => handleSelect(id, boxType)}
      >
        {/* رمز الصح أو الغلط — يظهر فقط لما يكون محدداً */}
        {isChosen && (
          <span style={{
            fontSize: "clamp(16px, 2.2vw, 28px)",
            fontWeight: 700,
            color: symColor,
            lineHeight: 1,
          }}>
            {symbol}
          </span>
        )}

        {/* ✕ badge — فقط لما يكون غلط */}
        {wrong && (
          <div style={{
            position: "absolute",
            top: -7, right: -7,
            width:  "clamp(14px, 1.6vw, 18px)",
            height: "clamp(14px, 1.6vw, 18px)",
            borderRadius: "50%",
            background: WRONG_BADGE_BG,
            color: WRONG_BADGE_TEXT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(7px, 0.8vw, 10px)",
            fontWeight: 700,
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .rlcc-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(14px, 2vw, 26px);
          align-items: flex-start;
          width: 100%;
        }
        .rlcc-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.8;
        }
        .rlcc-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }
        .rlcc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.8vw, 22px) clamp(20px, 3vw, 40px);
          width: 100%;
        }
        .rlcc-row {
          display: flex;
          align-items: center;
          gap: clamp(6px, 0.8vw, 10px);
        }
        .rlcc-num {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          min-width: clamp(14px, 1.8vw, 20px);
        }
        .rlcc-sentence {
          font-size: clamp(12px, 1.5vw, 18px);
          color: ${TEXT_COLOR};
          flex: 1;
          line-height: 1.4;
        }
        /* مربعان جنب بعض */
        .rlcc-boxes {
          display: flex;
          gap: clamp(5px, 0.7vw, 8px);
          flex-shrink: 0;
        }
        .rlcc-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
        @media (max-width: 560px) {
          .rlcc-top  { grid-template-columns: 1fr; }
          .rlcc-grid { grid-template-columns: 1fr; }
          .rlcc-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
          <span className="WB-ex-A-1">E</span>
          Read, listen, and write ✓ or X.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={5} />
        </div>

        {/* ── Paragraph + image ── */}
        <div className="rlcc-top">
          <p className="rlcc-para">
            My family and I went to a restaurant that had a buffet.
            There was so much food to choose from. There was spicy
            baked chicken with rice and spaghetti and meatballs.
            There were rolls and fried chicken. There were cookies and
            cupcakes to eat for dessert. There were apples, oranges,
            and even pistachio ice cream!
          </p>
          <img src={imgScene} alt="buffet" className="rlcc-scene-img" />
        </div>

        {/* ── 2-col sentences ── */}
        <div className="rlcc-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="rlcc-row">
              <span className="rlcc-num">{item.id}</span>
              <span className="rlcc-sentence">{item.text}</span>
              <div className="rlcc-boxes">
                {renderBox(item.id, "check")}
                {renderBox(item.id, "cross")}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="rlcc-buttons">
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