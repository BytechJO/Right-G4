import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 9.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 11.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 10.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 12.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 13.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 14.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 15.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Page 121/SVG/Asset 16.svg";

const RED_COLOR    = "#d62828";
const BORDER_COLOR = "#f39b42";
const ACTIVE_BORDER= "#f39b42";
const TEXT_COLOR   = "#111";
const WRONG_COLOR  = "#ef4444";

const ITEMS = [
  {
    id: 1,
    sentence: "She usually rides a bike to school.",
    correct: "bike",
    images: [
      { key: "bike", src: img1a, alt: "bike to school",    bars: 3, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
      { key: "walk", src: img1b, alt: "walk to school",    bars: 0, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
    ],
  },
  {
    id: 2,
    sentence: "He never rides a taxi to work.",
    correct: "taxi",
    images: [
      { key: "notTaxi", src: img2a, alt: "not taxi to work", bars: 1, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
      { key: "taxi",    src: img2b, alt: "taxi",             bars: 0, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
    ],
  },
  {
    id: 3,
    sentence: "She always rides the bus to school.",
    correct: "bus",
    images: [
      { key: "bus", src: img3a, alt: "bus to school", bars: 4, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
      { key: "car", src: img3b, alt: "car",           bars: 3, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
    ],
  },
  {
    id: 4,
    sentence: "She sometimes walks to school.",
    correct: "walk",
    images: [
      { key: "walk", src: img4a, alt: "walk to school", bars: 2, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
      { key: "car",  src: img4b, alt: "car",            bars: 2, overlay: { bars: { top:"8px", left:"8px" }, box: { top:"8px", right:"8px" } } },
    ],
  },
];

const styles = {
  pageWrap: { width: "100%" },

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
    fontSize: "22px",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "28px",
    flexShrink: 0,
    paddingTop: "2px",
  },

  sentence: {
    fontSize: "22px",
    color: TEXT_COLOR,
    lineHeight: 1.3,
    fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 0,
    width: "100%",
    borderRadius: "clamp(10px, 1.3vw, 16px)",
    overflow: "hidden",
  },

  imageOption: {
    position: "relative",
    border: `1px solid ${BORDER_COLOR}`,
    background: "#fff",
    cursor: "pointer",
    minWidth: 0,
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    userSelect: "none",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: `2px solid ${BORDER_COLOR}`,
  },

  overlayLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
  },

  barsWrap: {
    position: "absolute",
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

  // ✅ المربع الأبيض — دايماً موجود في نفس المكان
  emptyBox: {
    position: "absolute",
    width: "clamp(18px, 3vw, 30px)",
    height: "clamp(18px, 3vw, 30px)",
    border: "1.5px solid #9e9e9e",
    background: "#fff",
    borderRadius: "clamp(4px, 0.5vw, 6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "clamp(12px, 1.2vw, 16px)",
    lineHeight: 1,
    zIndex: 3,
  },

  // ✅ بادج الـ ✕ — تحت المربع الأبيض وليس فوقه
  wrongBadge: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
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
    zIndex: 4,
    pointerEvents: "none",
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
    setAnswers((prev) => ({ ...prev, [itemId]: optionKey }));
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
      if (answers[item.id] === item.correct) score += 1;
    });
    setChecked(true);
    if (score === ITEMS.length)   ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => { filledAnswers[item.id] = item.correct; });
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

  const renderBars = (filledCount, position = {}) => (
    <span style={{ ...styles.barsWrap, ...position }}>
      {[1, 2, 3, 4].map((n) => (
        <span key={n} style={{ ...styles.bar, background: n <= filledCount ? RED_COLOR : "#fff" }} />
      ))}
    </span>
  );

  // ✅ FIX: المربع يظهر ✓ على الخيار المحدد دايماً
  // عند Show Answer: الـ answers تتحدث للصحيح فبيظهر ✓ تلقائياً محله
  const getBoxContent = (itemId, imgKey, selected) => {
    if (selected) return "✓";
    return "";
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{ display:"flex", flexDirection:"column", gap:"18px", maxWidth:"1100px", margin:"0 auto" }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin:0, display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}
        >
          <span className="WB-ex-A">H</span>
          Read, look, and write ✓.
        </h1>

        <div style={styles.pageWrap}>
          <div style={styles.gridWrap}>
            {ITEMS.map((item) => (
              <div key={item.id} style={styles.itemCard}>

                <div style={styles.topLine}>
                  <div style={styles.number}>{item.id}</div>
                  <div style={styles.sentence}>{item.sentence}</div>
                </div>

                <div style={styles.imagesRow}>
                  {item.images.map((img, index) => {
                    const selected = answers[item.id] === img.key;
                    const wrong    = isWrong(item.id, img.key, item.correct);

                    return (
                      <div
                        key={img.key}
                        onClick={() => handleSelect(item.id, img.key)}
                        style={{
                          ...styles.imageOption,
                          borderColor: selected ? ACTIVE_BORDER : BORDER_COLOR,
                          cursor: showAns ? "default" : "pointer",
                          borderRight: index === 0
                            ? `1px solid ${BORDER_COLOR}`
                            : `2px solid ${BORDER_COLOR}`,
                        }}
                      >
                        <img src={img.src} alt={img.alt} style={styles.image} />

                        <div style={styles.overlayLayer}>
                          {/* Bars */}
                          {renderBars(img.bars, img.overlay?.bars)}

                          {/* ✅ المربع دايماً موجود — ✓ يظهر على الخيار المحدد فقط */}
                          <div style={{ ...styles.emptyBox, ...img.overlay?.box }}>
                            {getBoxContent(item.id, img.key, selected)}
                          </div>

                          {/* ✅ بادج الـ ✕ في الأسفل حتى ما يغطي المربع */}
                          {wrong && <div style={styles.wrongBadge}>✕</div>}
                        </div>
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