import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    pairs: ["slow fast", "young old"],
    correct: "slow fast",
  },
  {
    id: 2,
    img: img2,
    pairs: ["old young", "big small"],
    correct: "big small",
  },
  {
    id: 3,
    img: img3,
    pairs: ["fast slow", "short tall"],
    correct: "short tall",
  },
  {
    id: 4,
    img: img4,
    pairs: ["short tall", "heavy light"],
    correct: "heavy light",
  },
];

export default function WB_Unit3_Page6_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};

    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const renderPair = (item, pair) => {
    const selected = answers[item.id] === pair;
    const isCorrect = pair === item.correct;

    let borderStyle = "2px solid transparent";

    if (selected && !showResults) {
      borderStyle = "4px solid #f39d66";
    }

    if (showResults) {
      if (selected && isCorrect) {
        borderStyle = "4px solid #f39d66";
      } else if (selected && !isCorrect) {
        borderStyle = "4px solid #ef4444";
      }
    }

    return (
      <div
        onClick={() => handleSelect(item.id, pair)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "180px",
          minHeight: "52px",
          padding: "8px 18px",
          border: borderStyle,
          borderRadius: "999px",
          background: "#fff",
          color: "#222",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "1.2",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          transition: "all 0.25s ease",
          whiteSpace: "nowrap",
        }}
      >
        {pair}

        {showResults && selected && !isCorrect && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
     
        <style>{`
          .wb-c6-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px 36px;
            width: 100%;
            align-items: start;
          }

          .wb-c6-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            min-width: 0;
          }

          .wb-c6-num {
            font-size: 22px;
            font-weight: 700;
            color: #222;
            line-height: 1;
            min-width: 18px;
            margin-top: 10px;
            flex-shrink: 0;
          }

          .wb-c6-body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            width: 100%;
            min-width: 0;
          }

          .wb-c6-img-frame {
            width: 100%;
            max-width: 470px;
            height: 185px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-sizing: border-box;
            background: transparent;
            border: none;
            border-radius: 0;
            box-shadow: none;
          }

          .wb-c6-img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            border: none;
            box-shadow: none;
          }

          .wb-c6-pairs {
            display: flex;
            flex-wrap: wrap;
            gap: 12px 16px;
            width: 100%;
            padding-left: 0;
          }

          .wb-c6-buttons {
            display: flex;
            justify-content: center;
            margin-top: 6px;
            width: 100%;
          }

          @media (max-width: 950px) {
            .wb-c6-grid {
              grid-template-columns: 1fr;
              gap: 28px;
            }

            .wb-c6-img-frame {
              max-width: 100%;
              height: 170px;
            }
          }

          @media (max-width: 768px) {
            .div-forall {
              padding: 0 20px;
            }

            .wb-c6-item {
              gap: 10px;
            }

            .wb-c6-num {
              font-size: 20px;
              margin-top: 8px;
            }

            .wb-c6-img-frame {
              height: 155px;
            }

            .wb-c6-pairs {
              gap: 10px 12px;
            }
          }

          @media (max-width: 600px) {
            .div-forall {
              padding: 0 16px;
            }

            .wb-c6-item {
              gap: 8px;
            }

            .wb-c6-body {
              gap: 12px;
            }

            .wb-c6-img-frame {
              height: 145px;
            }

            .wb-c6-pairs {
              flex-direction: column;
              align-items: stretch;
              gap: 10px;
            }

            .wb-c6-pairs > * {
              width: 100%;
            }
          }

          @media (max-width: 420px) {
            .div-forall {
              padding: 0 12px;
            }

            .wb-c6-num {
              font-size: 18px;
              min-width: 14px;
            }

            .wb-c6-img-frame {
              height: 125px;
            }
          }
        `}</style>

 <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >          <span className="WB-ex-A">C</span>
          Look and read. Circle the correct pair.
        </h1>

        <div className="wb-c6-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c6-item">
              <div className="wb-c6-num">{item.id}</div>

              <div className="wb-c6-body">
                <div className="wb-c6-img-frame">
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    className="wb-c6-img"
                  />
                </div>

                <div className="wb-c6-pairs">
                  {item.pairs.map((pair) => (
                    <React.Fragment key={pair}>
                      {renderPair(item, pair)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c6-buttons">
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