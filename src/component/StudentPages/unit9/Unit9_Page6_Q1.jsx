import React, { useState, useRef } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🖼️  IMAGE + 🔊 AUDIO
// ─────────────────────────────────────────────
import imgScene from "../../../assets/imgs/pages/Class Book/Right 4 Unit 9 Tom Has Nothing to Do Folder/Page 81/SVG/Asset 1.svg";
import sound    from "../../../assets/audio/ClassBook/Grade 4/cd51pg81-instruction-adult-lady_bHLjAFzB.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const TEXT_COLOR       = "#2b2b2b";
const LABEL_COLOR      = "#2b2b2b";
const PARA_COLOR       = "#2b2b2b";
const BADGE_DEFAULT_BG = "transparent";
const BADGE_DEFAULT_CL = "#2b2b2b";
const BADGE_CORRECT_BG = "transparent";
const BADGE_CORRECT_CL = "#2b2b2b";
const BADGE_WRONG_BG   = "transparent";
const BADGE_WRONG_CL   = "#2b2b2b";
const WRONG_X_BG       = "#ef4444";
const WRONG_X_CL       = "#ffffff";

// ─────────────────────────────────────────────
//  📝  AUDIO CAPTIONS
// ─────────────────────────────────────────────
const captions = [
  { start: 0.0,  end: 5.0,  text: "Listen, read, and number." },
  { start: 5.0,  end: 13.0, text: "Troy likes to ride on a motorcycle because it's fun." },
  { start: 13.0, end: 22.0, text: "He's never afraid because he wears a helmet and rides safely." },
  { start: 22.0, end: 30.0, text: "He doesn't like driving cars because they're boring." },
  { start: 30.0, end: 40.0, text: "He always washes his motorcycle because he likes it to stay nice and clean." },
];

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
//  correct: الترتيب الصحيح لكل جملة في الفقرة
// ─────────────────────────────────────────────
const SENTENCES = [
  { id: "a", label: "a", text: "Troy rides a motorcycle because it's fun.",       correct: 2 },
  { id: "b", label: "b", text: "He's never afraid because he doesn't wear a helmet.", correct: 1 },
  { id: "c", label: "c", text: "He washes his motorcycle because he likes it to stay clean.", correct: 3 },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_ListenReadNumber_QD() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const inputRefs = useRef({});

  const handleChange = (id, value) => {
    if (showAns) return;
    const sent = SENTENCES.find((s) => s.id === id);
    if (showResults && sent && String(answers[id]) === String(sent.correct)) return;

    // رقم واحد فقط
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setAnswers((prev) => ({ ...prev, [id]: digit }));

    // auto-focus للتالية
    if (digit) {
      const idx  = SENTENCES.findIndex((s) => s.id === id);
      const next = SENTENCES[idx + 1];
      if (next && inputRefs.current[next.id]) {
        inputRefs.current[next.id].focus();
      }
    }
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = SENTENCES.every((s) => answers[s.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please number all sentences first."); return; }
    let score = 0;
    SENTENCES.forEach((s) => { if (String(answers[s.id]) === String(s.correct)) score++; });
    setShowResults(true);
    if (score === SENTENCES.length) ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    else if (score > 0)             ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    else                            ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    SENTENCES.forEach((s) => { filled[s.id] = String(s.correct); });
    setAnswers(filled); setShowResults(false); setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({}); setShowResults(false); setShowAns(false);
  };

  // badge state
  const getBadgeState = (s) => {
    const val = answers[s.id];
    if (!val) return "empty";
    if (showAns) return "correct";
    if (showResults) return String(val) === String(s.correct) ? "correct" : "wrong";
    return "filled";
  };

  const badgeBg  = (st) => st === "correct" ? BADGE_CORRECT_BG : st === "wrong" ? BADGE_WRONG_BG : BADGE_DEFAULT_BG;
  const badgeClr = (st) => st === "correct" ? BADGE_CORRECT_CL : st === "wrong" ? BADGE_WRONG_CL : BADGE_DEFAULT_CL;

  return (
    <div className="main-container-component">
      <style>{`
        /* ── Top: paragraph + image ── */
        .lrn-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px, 2.4vw, 32px);
          align-items: flex-start;
          width: 100%;
        }

        .lrn-para {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${PARA_COLOR};
          line-height: 1.85;
        }

        .lrn-scene-img {
          width: clamp(160px, 22vw, 290px);
          height: auto;
          border-radius: 10px;
          display: block;
          flex-shrink: 0;
        }

        /* ── Sentences list ── */
        .lrn-list {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        /* Single sentence row: label | text | badge */
        .lrn-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .lrn-label {
          font-size: clamp(13px, 1.6vw, 19px);
          font-weight: 700;
          color: ${LABEL_COLOR};
          flex-shrink: 0;
          line-height: 1.4;
        }

        .lrn-text {
          font-size: clamp(13px, 1.6vw, 19px);
          color: ${TEXT_COLOR};
          line-height: 1.4;
        }

        /* Badge wrap */
        .lrn-badge-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .lrn-badge {
          position: relative;
          width:  clamp(40px, 4vw, 40px);
          height: clamp(40px, 4vw, 40px);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2195a6;
          cursor: pointer;
        }

        .lrn-num-display {
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* Transparent input over badge */
        .lrn-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          font-size: clamp(14px, 1.8vw, 22px);
          font-weight: 700;
          color: transparent;
          caret-color: #333;
          cursor: pointer;
          z-index: 2;
          border-radius: 50%;
        }
        .lrn-input:disabled { cursor: default; }

        /* ✕ mini badge */
        .lrn-wrong-x {
          position: absolute;
          top: -6px; right: -6px;
          width: clamp(13px, 1.5vw, 16px);
          height: clamp(13px, 1.5vw, 16px);
          border-radius: 50%;
          background: ${WRONG_X_BG};
          color: ${WRONG_X_CL};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(6px, 0.7vw, 9px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 3;
        }

        .lrn-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }

        @media (max-width: 560px) {
          .lrn-top { grid-template-columns: 1fr; }
          .lrn-scene-img { width: 100%; max-width: 260px; margin: 0 auto; }
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
          <span className="WB-ex-A">D</span>
          Listen, read, and number.
        </h1>

        {/* ── Audio ── */}
        <div style={{ marginTop: "4px" }}>
          <QuestionAudioPlayer src={sound} captions={captions} stopAtSecond={2.70} />
        </div>

        {/* ── Paragraph + image ── */}
        <div className="lrn-top">
          <p className="lrn-para">
            Troy likes to ride on a motorcycle because it's fun. He's never
            afraid because he wears a helmet and rides safely. He doesn't
            like driving cars because they're boring. He always washes his
            motorcycle because he likes it to stay nice and clean.
          </p>
          <img src={imgScene} alt="motorcycle" className="lrn-scene-img" />
        </div>

        {/* ── Sentences ── */}
        <div className="lrn-list">
          {SENTENCES.map((s) => {
            const st       = getBadgeState(s);
            const val      = answers[s.id] || "";
            const bg       = badgeBg(st);
            const clr      = badgeClr(st);
            const isLocked = showAns || (showResults && st === "correct");
            const isWrong  = st === "wrong";

            return (
              <div key={s.id} className="lrn-row">
                <span className="lrn-label">{s.label}</span>
                <span className="lrn-text">{s.text}</span>

                <div className="lrn-badge-wrap">
                  <div className="lrn-badge" style={{ background: bg, color: clr }}>
                    <span className="lrn-num-display">{val}</span>
                    <input
                      ref={(el) => { inputRefs.current[s.id] = el; }}
                      className="lrn-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      disabled={isLocked}
                      onChange={(e) => handleChange(s.id, e.target.value)}
                    />
                    {isWrong && <div className="lrn-wrong-x">✕</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="lrn-buttons">
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