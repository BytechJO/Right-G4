import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review5_Page1_Q2.css";

import behind from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 1.svg";
import under from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 2.svg";
import between from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 3.svg";
import inFrontOf from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex B 4.svg";
import on from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Asset 10.svg";
import nextTo from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Asset 9.svg";

const Review5_Page1_Q2 = () => {
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const items = [
    { id: 1, text: "behind" },
    { id: 2, text: "in front of" },
    { id: 3, text: "next to" },
    { id: 4, text: "between" },
    { id: 5, text: "on" },
    { id: 6, text: "under" },
  ];

  const images = [
    { id: "a", src: behind },
    { id: "b", src: under },
    { id: "c", src: between },
    { id: "d", src: inFrontOf },
    { id: "e", src: on },
    { id: "f", src: nextTo },
  ];
  const correctAnswers = {
    1: "a",
    2: "d",
    3: "f",
    4: "c",
    5: "e",
    6: "b",
  };
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [connections, setConnections] = useState([]);
  const [wrongMap, setWrongMap] = useState({});
  const getRelativePos = (e) => {
    const rect = e.target.getBoundingClientRect();
    const parent = e.target.closest(".container").getBoundingClientRect();

    return {
      x: rect.left - parent.left + rect.width / 2,
      y: rect.top - parent.top + rect.height / 2,
    };
  };

  const handleSelect = (id, e) => {
    const pos = getRelativePos(e);
    setSelected({ id, ...pos });
  };

  const handleImage = (id, e) => {
    if (!selected) return;

    const pos = getRelativePos(e);

    const newConnection = {
      from: selected.id,
      to: id,
      x1: selected.x,
      y1: selected.y,
      x2: pos.x,
      y2: pos.y,
    };

    // ✅ نحذف القديم ونضيف الجديد
    const filtered = connections.filter(
      (c) => c.from !== selected.id && c.to !== id,
    );

    setConnections([...filtered, newConnection]);

    setSelected(null);
  };
  const resetAll = () => {
    setConnections([]);
    setSelected(null);
    setLocked(false);
    setWrongMap({});
  };

  const showAnswers = () => {
    const parent = document.querySelector(".container").getBoundingClientRect();

    const newConnections = items.map((item) => {
      const to = correctAnswers[item.id];

      const leftEl = leftRefs.current[item.id];
      const rightEl = rightRefs.current[to];

      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      return {
        from: item.id,
        to: to,
        x1: leftRect.left - parent.left + leftRect.width / 2,
        y1: leftRect.top - parent.top + leftRect.height / 2,
        x2: rightRect.left - parent.left + rightRect.width / 2,
        y2: rightRect.top - parent.top + rightRect.height / 2,
      };
    });

    setConnections(newConnections);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    if (connections.length !== items.length) {
      ValidationAlert.info("Complete all matches first!");
      return;
    }

    let score = 0;
    const wrongs = {};

    connections.forEach((c) => {
      const isCorrect = correctAnswers[c.from] === c.to;

      if (isCorrect) {
        score++;
      } else {
        wrongs[c.from] = true; // 👈 نخزن الغلط حسب رقم السؤال
      }
    });

    setWrongMap(wrongs);

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const message = `
<div style="font-size:20px;text-align:center;">
<span style="color:${color};font-weight:bold;">
Score: ${score} / ${total}
</span>
</div>
`;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

    setLocked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span>
          Read, match, and write.
        </h5>

        <div className="container relative w-full h-[600px]">
          {/* الخطوط */}
          <svg className="absolute w-full h-full pointer-events-none">
            {connections.map((c, i) => (
              <path
                key={i}
                d={`M ${c.x1} ${c.y1}
                C ${(c.x1 + c.x2) / 2} ${c.y1},
                  ${(c.x1 + c.x2) / 2} ${c.y2},
                  ${c.x2} ${c.y2}`}
                stroke="red"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            ))}
          </svg>

          {/* اليسار (كلمات + بوكس) */}
          <div className="absolute top-10 left-10 w-full flex flex-col gap-6">
            {items.map((item, index) => {
              const img = images[index];
              const isRight = index % 2 !== 0;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-[90%]"
                >
                  {/* 🔹 اليسار */}
                  <div className="flex items-center gap-4">
                    <div style={{ width: "150px" }}>
                      <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                        {item.id}
                      </span>
                      {item.text}
                      {wrongMap[item.id] && (
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                            zIndex: 3,
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </div>

                    <div
                      ref={(el) => (leftRefs.current[item.id] = el)}
                      onClick={(e) => handleSelect(item.id, e)}
                      className="w-10 h-10 flex items-center justify-center cursor-pointer"
                      style={{
                        border: "2px solid orange",
                        borderRadius: "10px",
                        backgroundColor:
                          selected?.id === item.id ? "#fde68a" : "#fff",
                      }}
                    >
                      {connections.find((c) => c.from === item.id)?.to}
                    </div>
                  </div>

                  {/* 🔹 اليمين (الصورة + البوكس) */}
                  <div
                    onClick={(e) => handleImage(img.id, e)}
                    className="flex items-center gap-3 cursor-pointer"
                    style={{
                      marginRight: isRight ? "40px" : "0px",
                    }}
                  >
                    <div
                      ref={(el) => (rightRefs.current[img.id] = el)}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "2px solid orange",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          selected?.id &&
                          connections.find((c) => c.to === img.id)
                            ? "#fff"
                            : "#fff",
                      }}
                    >
                      {img.id}
                    </div>

                    <img
                      src={img.src}
                      alt=""
                      style={{ width: "80px", height: "60px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review5_Page1_Q2;
