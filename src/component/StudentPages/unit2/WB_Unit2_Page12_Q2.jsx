import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// عدلي المسارات حسب مشروعك
import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 7.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 8.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 9.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 10.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 11.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 12.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 13.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 14.svg";

const RED_COLOR = "#d62828";
const BORDER_COLOR = "#a8a8a8";
const ACTIVE_BORDER = "#f39b42";
const TEXT_COLOR = "#111";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    sentence: "She usually rides a bike to school.",
    images: [
      { key: "bike", src: img1a, alt: "bike to school" },
      { key: "walk", src: img1b, alt: "walk to school" },
    ],
    correct: "bike",
    bars: [4, 0],
  },
  {
    id: 2,
    sentence: "He never rides a taxi to work.",
    images: [
      { key: "work", src: img2a, alt: "go to work" },
      { key: "taxi", src: img2b, alt: "taxi" },
    ],
    correct: "taxi",
    bars: [1, 0],
  },
  {
    id: 3,
    sentence: "She always rides the bus to school.",
    images: [
      { key: "bus", src: img3a, alt: "bus to school" },
      { key: "car", src: img3b, alt: "car" },
    ],
    correct: "bus",
    bars: [5, 0],
  },
  {
    id: 4,
    sentence: "She sometimes walks to school.",
    images: [
      { key: "walk", src: img4a, alt: "walk to school" },
      { key: "car", src: img4b, alt: "car" },
    ],
    correct: "walk",
    bars: [2, 0],
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  gridWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(18px, 3vw, 42px) clamp(18px, 4vw, 54px)",
    width: "100%",
  },

  itemCard: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.4vw, 16px)",
    minWidth: 0,
  },

  topLine: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  number: {
    fontSize: "clamp(18px, 2vw, 30px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(18px, 2vw, 28px)",
    flexShrink: 0,
    paddingTop: "clamp(2px, 0.4vw, 4px)",
  },

  sentence: {
    fontSize: "clamp(14px, 2vw, 22px)",
    color: TEXT_COLOR,
    lineHeight: 1.25,
    fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0",
    width: "100%",
    borderRadius: "clamp(10px, 1.3vw, 16px)",
    overflow: "hidden",
  },

  imageOption: {
    position: "relative",
    border: `2px solid ${BORDER_COLOR}`,
    background: "#fff",
    cursor: "pointer",
    minWidth: 0,
    aspectRatio: "1.18 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  topOverlay: {
    position: "absolute",
    top: "clamp(6px, 0.8vw, 8px)",
    left: "clamp(6px, 0.8vw, 8px)",
    right: "clamp(6px, 0.8vw, 8px)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    pointerEvents: "none",
  },

  barsWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
  },

  bar: {
    width: "clamp(12px, 1.8vw, 22px)",
    height: "clamp(10px, 1.5vw, 18px)",
    border: "1.5px solid #9e9e9e",
    boxSizing: "border-box",
    background: "#fff",
  },

  emptyBox: {
    width: "clamp(18px, 3vw, 30px)",
    height: "clamp(18px, 3vw, 30px)",
    border: "1.5px solid #9e9e9e",
    background: "#fff",
    borderRadius: "clamp(4px, 0.5vw, 6px)",
  },

  checkMark: {
    position: "absolute",
    top: "clamp(4px, 0.4vw, 6px)",
    right: "clamp(8px, 1vw, 10px)",
    fontSize: "clamp(30px, 4.5vw, 54px)",
    lineHeight: 1,
    fontWeight: 700,
    color: RED_COLOR,
    zIndex: 2,
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(6px, 0.8vw, 8px)",
    right: "clamp(6px, 0.8vw, 8px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 3,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "clamp(8px, 1vw, 12px)",
  },
};

export default function WB_Unit2_Page12_QH() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (itemId, optionKey) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: optionKey,
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score += 1;
      }
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};

    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });

    setAnswers(filledAnswers);
    setChecked(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (itemId, optionKey, correctKey) => {
    if (!checked || showAns) return false;
    return answers[itemId] === optionKey && optionKey !== correctKey;
  };

  const renderBars = (filledCount) => {
    return (
      <span style={styles.barsWrap}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              ...styles.bar,
              background: n <= filledCount ? RED_COLOR : "#fff",
            }}
          />
        ))}
      </span>
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
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">H</span>
          Read, look, and write ✓.
        </h1>

        <div style={styles.pageWrap}>
          <div
            style={{
              ...styles.gridWrap,
            }}
          >
            {ITEMS.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.topLine}>
                  <div style={styles.number}>{item.id}</div>
                  <div style={styles.sentence}>{item.sentence}</div>
                </div>

                <div style={styles.imagesRow}>
                  {item.images.map((img, index) => {
                    const selected = answers[item.id] === img.key;
                    const wrong = isWrong(item.id, img.key, item.correct);
                    const isCorrectShown = answers[item.id] === img.key && img.key === item.correct;

                    return (
                      <div
                        key={img.key}
                        onClick={() => handleSelect(item.id, img.key)}
                        style={{
                          ...styles.imageOption,
                          borderColor: selected ? ACTIVE_BORDER : BORDER_COLOR,
                          cursor: showAns ? "default" : "pointer",
                          borderRight:
                            index === 0 ? `1px solid ${BORDER_COLOR}` : `2px solid ${BORDER_COLOR}`,
                        }}
                      >
                        <img src={img.src} alt={img.alt} style={styles.image} />

                        <div style={styles.topOverlay}>
                          {renderBars(item.bars[index])}
                          <div style={styles.emptyBox} />
                        </div>

                        {isCorrectShown && <div style={styles.checkMark}>✓</div>}
                        {wrong && <div style={styles.wrongBadge}>✕</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
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