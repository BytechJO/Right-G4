import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/1.svg"

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const CHECK_COLOR  = "#ef4444";

const ITEMS = [
  { id: 1, text: "Did Grandma have a radio?", correct: "yes" },
  { id: 2, text: "Did she have a TV?",        correct: "no"  },
  { id: 3, text: "Did she have a cat?",       correct: "no"  },
  { id: 4, text: "Did she have a bird?",      correct: "no"  },
  { id: 5, text: "Did she have a lamp?",      correct: "yes" },
  { id: 6, text: "Did she have a phone?",     correct: "no"  },
  { id: 7, text: "Did she have a rug?",       correct: "yes" },
  { id: 8, text: "Did she have a mirror?",    correct: "no"  },
];

export default function WB_YesNo_PageC() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (answers[i.id] === i.correct) score++; });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = i.correct; });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  const renderCheckbox = (item, value) => {
    const selected  = answers[item.id] === value;
    const wrong     = isWrong(item) && selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        style={{
          position:        "relative",
          width:           "clamp(28px,3.5vw,44px)",
          height:          "clamp(28px,3.5vw,44px)",
          border:          `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
          borderRadius:    "clamp(5px,0.6vw,8px)",
          background:      "#fff",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          showAns ? "default" : "pointer",
          boxSizing:       "border-box",
          flexShrink:      0,
          transition:      "border-color 0.2s",
        }}
      >
        {selected && (
          <span
            style={{
              fontSize:   "clamp(18px,2.8vw,36px)",
              fontWeight: 900,
              color:      wrong ? WRONG_COLOR : CHECK_COLOR,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ✓
          </span>
        )}

        {/* wrong badge — يسار أعلى */}
        {wrong && (
          <div
            style={{
              position:        "absolute",
              top:             "-7px",
              left:            "-7px",
              width:           "clamp(14px,1.6vw,20px)",
              height:          "clamp(14px,1.6vw,20px)",
              borderRadius:    "50%",
              backgroundColor: WRONG_COLOR,
              border:          "1px solid #fff",
              color:           "#fff",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              fontSize:        "clamp(8px,0.8vw,11px)",
              fontWeight:      700,
              boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
              zIndex:          5,
              pointerEvents:   "none",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">C</span>
          Look and write ✓ for{" "}
          <strong style={{ fontWeight: 900 }}>Yes</strong> or{" "}
          <strong style={{ fontWeight: 900 }}>No</strong>.
        </h1>

        {/* Main layout: image LEFT | table RIGHT */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)",
            gap:                 "clamp(16px,2.5vw,32px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {/* Room image */}
          <div
            style={{
              width:        "100%",
              borderRadius: "clamp(10px,1.2vw,16px)",
              overflow:     "hidden",
              border:       `2px solid ${BORDER_COLOR}`,
              background:   "#f7f7f7",
              flexShrink:   0,
            }}
          >
            <img
              src={roomImg}
              alt="grandma room"
              style={{
                width:      "100%",
                height:     "auto",
                display:    "block",
                userSelect: "none",
              }}
            />
          </div>

          {/* Questions table */}
          <div style={{ minWidth: 0 }}>
            {/* Header */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr clamp(50px,8vw,100px) clamp(50px,8vw,100px)",
                gap:                 "clamp(6px,1vw,12px)",
                marginBottom:        "clamp(8px,1vw,12px)",
                paddingRight:        "clamp(4px,0.5vw,8px)",
              }}
            >
              <div />
              <div
                style={{
                  textAlign:  "center",
                  fontSize:   "clamp(16px,2vw,26px)",
                  fontWeight: 700,
                  color:      "#111",
                }}
              >
                Yes
              </div>
              <div
                style={{
                  textAlign:  "center",
                  fontSize:   "clamp(16px,2vw,26px)",
                  fontWeight: 700,
                  color:      "#111",
                }}
              >
                No
              </div>
            </div>

            {/* Rows */}
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           "clamp(10px,1.5vw,18px)",
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "1fr clamp(50px,8vw,100px) clamp(50px,8vw,100px)",
                    gap:                 "clamp(6px,1vw,12px)",
                    alignItems:          "center",
                  }}
                >
                  {/* sentence */}
                  <div
                    style={{
                      display:    "flex",
                      alignItems: "center",
                      gap:        "clamp(6px,0.8vw,12px)",
                      minWidth:   0,
                    }}
                  >
                    <span
                      style={{
                        fontSize:   "clamp(15px,1.8vw,24px)",
                        fontWeight: 700,
                        color:      "#111",
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth:   "clamp(12px,1.6vw,22px)",
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      style={{
                        fontSize:   "clamp(13px,1.6vw,21px)",
                        fontWeight: 500,
                        color:      isWrong(item) ? WRONG_COLOR : "#111",
                        lineHeight: 1.35,
                        wordBreak:  "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>

                  {/* Yes checkbox */}
                  <div
                    style={{
                      display:        "flex",
                      justifyContent: "center",
                      alignItems:     "center",
                    }}
                  >
                    {renderCheckbox(item, "yes")}
                  </div>

                  {/* No checkbox */}
                  <div
                    style={{
                      display:        "flex",
                      justifyContent: "center",
                      alignItems:     "center",
                    }}
                  >
                    {renderCheckbox(item, "no")}
                  </div>
                </div>
              ))}
            </div>
          </div>
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