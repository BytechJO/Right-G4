import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ── ثوابت ──────────────────────────────────────────────────────
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";

// ── بيانات ─────────────────────────────────────────────────────
const QUESTIONS = [
  { id: 1, text: "Will you go to school?"        },
  { id: 2, text: "Will you go to the park?"      },
  { id: 3, text: "Will you eat any cake?"        },
  { id: 4, text: "Will you buy new clothes?"     },
  { id: 5, text: "Will you play with your friends?" },
];

const OPTIONS = ["Yes, I will.", "No, I won't."];

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page57_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id, value) => {
    setChecked(false);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    const allAnswered = QUESTIONS.every((q) => answers[q.id]);
    if (!allAnswered) {
      ValidationAlert.error("Please answer all questions first! ✏️");
      return;
    }
    setChecked(true);
    ValidationAlert.success("Great! You answered all the questions. 🎉");
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(18px,2.5vw,32px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>{" "}
          What will you do tomorrow? Read and answer the questions.
        </h1>

        {/* ── صناديق الخيارات العلوية ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            "clamp(40px,10vw,130px)",
            flexWrap:       "wrap",
          }}
        >
          {OPTIONS.map((opt) => (
            <div
              key={opt}
              style={{
                minWidth:        "clamp(120px,16vw,170px)",
                height:          "clamp(40px,5vw,52px)",
                border:          `2px solid ${BORDER_COLOR}`,
                borderRadius:    "14px",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "clamp(15px,1.8vw,20px)",
                fontWeight:      500,
                color:           "#222",
                backgroundColor: "#fff",
                padding:         "0 clamp(12px,1.5vw,20px)",
                boxSizing:       "border-box",
              }}
            >
              {opt}
            </div>
          ))}
        </div>

        {/* ── الأسئلة ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(14px,2vw,22px)",
            width:         "100%",
            maxWidth:      "820px",
            margin:        "0 auto",
          }}
        >
          {QUESTIONS.map((q) => {
            const selected  = answers[q.id];
            const unanswered = checked && !selected;

            return (
              <div
                key={q.id}
                style={{
                  position:    "relative",
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "clamp(8px,1.2vw,16px)",
                  flexWrap:    "wrap",
                }}
              >
                {/* رقم + نص السؤال */}
                <div
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        "clamp(8px,1vw,12px)",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize:   "clamp(16px,1.9vw,22px)",
                      fontWeight: 700,
                      color:      "#111",
                      minWidth:   "clamp(14px,1.8vw,20px)",
                    }}
                  >
                    {q.id}
                  </span>
                  <span
                    style={{
                      fontSize:   "clamp(14px,1.7vw,20px)",
                      color:      "#222",
                      lineHeight: 1.4,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.text}
                  </span>
                </div>

                {/* أزرار الاختيار */}
                <div style={{ display: "flex", gap: "clamp(6px,0.8vw,10px)", flexShrink: 0 }}>
                  {OPTIONS.map((opt) => {
                    const active = selected === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        style={{
                          padding:         "clamp(5px,0.7vw,8px) clamp(10px,1.2vw,14px)",
                          borderRadius:    "20px",
                          border:          `1.5px solid ${active ? BORDER_COLOR : "#e2e8f0"}`,
                          backgroundColor: active ? "#ffca94" : "#f8fafc",
                          color:           active ? "#fff" : "#64748b",
                          fontSize:        "clamp(12px,1.4vw,15px)",
                          fontWeight:      600,
                          cursor:          "pointer",
                          whiteSpace:      "nowrap",
                          transition:      "all 0.15s",
                          userSelect:      "none",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* خط الإجابة */}
                <div
                  style={{
                    flex:         1,
                    minWidth:     "80px",
                    minHeight:    "clamp(30px,3.5vw,40px)",
                    borderBottom: `2px solid ${unanswered ? WRONG_COLOR : "#7f7f7f"}`,
                    display:      "flex",
                    alignItems:   "center",
                    fontSize:     "clamp(14px,1.7vw,20px)",
                    fontWeight:   600,
                    color:        "#000000ff",
                    paddingBottom:"2px",
                    transition:   "border-color 0.2s",
                  }}
                >
                  {selected || ""}
                </div>

                {/* بادج الخطأ — فقط لو ما أجاب بعد Check */}
                {unanswered && (
                  <div
                    style={{
                      position:        "absolute",
                      right:           -10,
                      top:             "50%",
                      transform:       "translateY(-50%)",
                      width:           "clamp(16px,1.8vw,20px)",
                      height:          "clamp(16px,1.8vw,20px)",
                      borderRadius:    "50%",
                      backgroundColor: WRONG_COLOR,
                      color:           "#fff",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "clamp(8px,0.9vw,11px)",
                      fontWeight:      700,
                      border:          "1.5px solid #fff",
                      pointerEvents:   "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── الأزرار — بدون showAnswer ── */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
          />
        </div>

      </div>
    </div>
  );
}