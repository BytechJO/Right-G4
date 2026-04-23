import React, { useState, useCallback } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const WRONG_COLOR  = "#ef4444";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR   = "#ffca94";
const LINE_COLOR   = "#333";

const EXERCISES = [
  { id: 1, scrambled: ["he",  "won't", "plant",  "a",   "tree."    ], correct: "He won't plant a tree."       },
  { id: 2, scrambled: ["they","will",  "wash",   "the", "car."     ], correct: "They will wash the car."      },
  { id: 3, scrambled: ["she", "will",  "build",  "a",   "snowman." ], correct: "She will build a snowman."    },
  { id: 4, scrambled: ["I",   "won't", "watch",  "a",   "movie."   ], correct: "I won't watch a movie."       },
  { id: 5, scrambled: ["she", "won't", "lie",    "in",  "the","sun."], correct: "She won't lie in the sun."   },
  { id: 6, scrambled: ["he",  "will",  "read",   "a",   "book."    ], correct: "He will read a book."         },
];

// ── Single exercise row ──
function ExerciseRow({ item, showResults, showAns, onUpdate, resetKey }) {
  const initWords = () =>
    item.scrambled.map((w, i) => ({ id: `${item.id}-${i}`, text: w }));

  const [available, setAvailable] = useState(initWords);
  const [chosen,    setChosen]    = useState([]);

  // reset when resetKey changes
  React.useEffect(() => {
    setAvailable(initWords());
    setChosen([]);
    onUpdate("");
  }, [resetKey]);

  // show answer
  React.useEffect(() => {
    if (!showAns) return;
    const words = item.correct.split(" ").map((w, i) => ({
      id: `${item.id}-ans-${i}`,
      text: w,
    }));
    setChosen(words);
    setAvailable([]);
    onUpdate(item.correct);
  }, [showAns]);

  const addWord = (word) => {
    if (showAns) return;
    const newChosen = [...chosen, word];
    setChosen(newChosen);
    setAvailable((prev) => prev.filter((w) => w.id !== word.id));
    onUpdate(newChosen.map((w) => w.text).join(" "));
  };

  const removeWord = (word) => {
    if (showAns) return;
    const newChosen = chosen.filter((w) => w.id !== word.id);
    setChosen(newChosen);
    setAvailable((prev) =>
      [...prev, word].sort((a, b) => a.id.localeCompare(b.id))
    );
    onUpdate(newChosen.map((w) => w.text).join(" "));
  };

  const userAnswer  = chosen.map((w) => w.text).join(" ").trim().toLowerCase();
  const correctLow  = item.correct.trim().toLowerCase();
  const isWrong     = showResults && !showAns && !!userAnswer && userAnswer !== correctLow;

  return (
    <div
      style={{
        display:    "flex",
        alignItems: "flex-start",
        gap:        "clamp(8px,1.2vw,16px)",
        width:      "100%",
        minWidth:   0,
      }}
    >
      {/* number */}
      <span
        style={{
          fontSize:   "clamp(16px,1.9vw,26px)",
          fontWeight: 700,
          color:      "#111",
          lineHeight: 1.4,
          flexShrink: 0,
          minWidth:   "clamp(14px,1.8vw,22px)",
        }}
      >
        {item.id}
      </span>

      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(8px,1vw,12px)",
          flex:          1,
          minWidth:      0,
        }}
      >
        {/* scrambled words — الكلمات المبعثرة */}
        <div
          style={{
            fontSize:   "clamp(14px,1.7vw,22px)",
            fontWeight: 500,
            color:      "#555",
            lineHeight: 1.3,
          }}
        >
          {item.scrambled.join(" / ")}
        </div>

        {/* word bank للسؤال */}
        <div
          style={{
            display:      "flex",
            flexWrap:     "wrap",
            gap:          "clamp(5px,0.7vw,9px)",
            minHeight:    "clamp(32px,4vw,44px)",
            padding:      "clamp(6px,0.8vw,10px)",
            borderRadius: "clamp(8px,1vw,12px)",
            background:   "#f3f4f6",
            border:       "1px solid #e5e7eb",
            boxSizing:    "border-box",
          }}
        >
          {available.map((word) => (
            <div
              key={word.id}
              onClick={() => addWord(word)}
              style={{
                padding:      "clamp(4px,0.5vw,7px) clamp(8px,1vw,14px)",
                borderRadius: "clamp(6px,0.8vw,10px)",
                border:       `1.5px solid ${ACTIVE_COLOR}`,
                background:   SOFT_COLOR,
                color:        "#222",
                fontSize:     "clamp(13px,1.6vw,20px)",
                fontWeight:   500,
                cursor:       "pointer",
                userSelect:   "none",
                transition:   "0.15s ease",
                lineHeight:   1.2,
              }}
            >
              {word.text}
            </div>
          ))}
        </div>

        {/* answer line — الكلمات المختارة */}
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              display:       "flex",
              flexWrap:      "wrap",
              gap:           "clamp(5px,0.7vw,9px)",
              minHeight:     "clamp(32px,4vw,44px)",
              padding:       "clamp(4px,0.5vw,7px) clamp(4px,0.5vw,7px) clamp(8px,1vw,12px)",
              borderBottom:  `2.5px solid ${isWrong ? WRONG_COLOR : LINE_COLOR}`,
              boxSizing:     "border-box",
            }}
          >
            {chosen.map((word) => (
              <div
                key={word.id}
                onClick={() => removeWord(word)}
                style={{
                  padding:      "clamp(4px,0.5vw,7px) clamp(8px,1vw,14px)",
                  borderRadius: "clamp(6px,0.8vw,10px)",
                  border:       `1.5px solid ${isWrong ? WRONG_COLOR : ACTIVE_COLOR}`,
                  background:   isWrong ? "rgba(239,68,68,0.08)" : "rgba(243,155,66,0.12)",
                  color:        isWrong ? WRONG_COLOR : "#222",
                  fontSize:     "clamp(13px,1.6vw,20px)",
                  fontWeight:   600,
                  cursor:       showAns ? "default" : "pointer",
                  userSelect:   "none",
                  lineHeight:   1.2,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* wrong badge — يسار أعلى */}
          {isWrong && (
            <div
              style={{
                position:        "absolute",
                top:             "-8px",
                left:            "-8px",
                width:           "clamp(16px,1.8vw,22px)",
                height:          "clamp(16px,1.8vw,22px)",
                borderRadius:    "50%",
                backgroundColor: WRONG_COLOR,
                border:          "1px solid #fff",
                color:           "#fff",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "clamp(9px,0.9vw,12px)",
                fontWeight:      700,
                boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                zIndex:          3,
                pointerEvents:   "none",
              }}
            >
              ✕
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WB_Unit8_Page60_QH() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
  const [resetKey,    setResetKey]    = useState(0);

  const handleUpdate = useCallback((id, answer) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
    setShowResults(false);
  }, []);

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = EXERCISES.every((e) => userAnswers[e.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all sentences first."); return; }
    let score = 0;
    EXERCISES.forEach((e) => {
      if (userAnswers[e.id]?.trim().toLowerCase() === e.correct.trim().toLowerCase()) score++;
    });
    setShowResults(true);
    const total = EXERCISES.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    EXERCISES.forEach((e) => { filled[e.id] = e.correct; });
    setUserAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setUserAnswers({});
    setShowResults(false);
    setShowAns(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(18px,2.5vw,28px)",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">H</span> Read and write sentences.
        </h1>

        {/* Exercises */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(20px,3vw,36px)",
            width:         "100%",
          }}
        >
          {EXERCISES.map((item) => (
            <ExerciseRow
              key={`${item.id}-${resetKey}`}
              item={item}
              showResults={showResults}
              showAns={showAns}
              onUpdate={(ans) => handleUpdate(item.id, ans)}
              resetKey={resetKey}
            />
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}