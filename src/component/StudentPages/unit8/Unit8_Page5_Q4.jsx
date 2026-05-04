import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Ex C 2.svg";

const Unit8_Page5_Q4 = () => {
  const grid = [
    [
      "o",
      "l",
      "k",
      "p",
      "t",
      "h",
      "e",
      "y",
      "w",
      "m",
      "n",
      "b",
      "v",
      "w",
      "e",
      "r",
      "e",
      "h",
      "g",
      "t",
      "y",
      "i",
      "f",
    ],
    [
      "v",
      "i",
      "s",
      "i",
      "t",
      "i",
      "n",
      "g",
      "u",
      "j",
      "t",
      "h",
      "e",
      "i",
      "r",
      "c",
      "x",
      "s",
      "a",
      "h",
      "y",
      "r",
      "o",
    ],
    [
      "g",
      "r",
      "a",
      "n",
      "d",
      "p",
      "a",
      "r",
      "e",
      "n",
      "t",
      "s",
      "j",
      "k",
      "o",
      "n",
      "s",
      "a",
      "z",
      "x",
      "t",
      "h",
      "e",
    ],
    ["i", "r", "b", "r", "g", "h", "f", "a", "r", "m", "p", "k", "i", "j", "c"],
  ];

  const letters = grid;
  const wordsToFind = [
    "they",
    "were",
    "visiting",
    "their",
    "grandparents",
    "on",
    "the",
    "farm",
  ];

  const correctPositions = {
    they: [4, 5, 6, 7],
    were: [13, 14, 15, 16],

    visiting: [
      100 + 0,
      100 + 1,
      100 + 2,
      100 + 3,
      100 + 4,
      100 + 5,
      100 + 6,
      100 + 7,
    ],

    // ✅ التصحيح هنا (row 1)
    their: [100 + 10, 100 + 11, 100 + 12, 100 + 13, 100 + 14],

    grandparents: [
      200 + 0,
      200 + 1,
      200 + 2,
      200 + 3,
      200 + 4,
      200 + 5,
      200 + 6,
      200 + 7,
      200 + 8,
      200 + 9,
      200 + 10,
      200 + 11,
    ],

    on: [200 + 14, 200 + 15],

    the: [200 + 20, 200 + 21, 200 + 22],

    farm: [300 + 6, 300 + 7, 300 + 8, 300 + 9],
  };
  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (index) => {
    if (locked) return;
    setIsDragging(true);
    setSelected([index]);
  };
  const handleMouseEnter = (index) => {
    if (!isDragging || locked) return;

    const lastIndex = selected[selected.length - 1];

    if (index === lastIndex + 1 || index === lastIndex - 1) {
      if (!selected.includes(index)) {
        setSelected((prev) => [...prev, index]);
      }
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || locked) return;
    e.preventDefault(); // منع التمرير في الصفحة أثناء السحب

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const index = element.getAttribute("data-index");
    if (index !== null) {
      handleMouseEnter(Number(index));
    }
  };

  const handleMouseUp = () => {
    if (locked) return;
    setIsDragging(false);

    const matchedWord = wordsToFind.find((word) => {
      const positions = correctPositions[word];
      if (!positions) return false;

      // تحقق نفس الترتيب
      const isSame =
        positions.length === selected.length &&
        positions.every((pos, i) => pos === selected[i]);

      // تحقق بالعكس (reverse)
      const isReverse =
        positions.length === selected.length &&
        positions
          .slice()
          .reverse()
          .every((pos, i) => pos === selected[i]);

      return isSame || isReverse;
    });
    if (matchedWord && !foundWords.includes(matchedWord)) {
      setFoundWords((prev) => [...prev, matchedWord]);
      setColoredCells((prev) => [...prev, ...selected]);
      setSentence(
        wordsToFind
          .filter((word) => [...foundWords, matchedWord].includes(word))
          .join(" "),
      );
    }

    setSelected([]);
  };

  const reset = () => {
    setSelected([]);
    setFoundWords([]);
    setColoredCells([]);
    setSentence("");
    setLocked(false);
  };

  const showAnswers = () => {
    let allCells = [];
    wordsToFind.forEach((word) => {
      if (correctPositions[word]) {
        allCells.push(...correctPositions[word]);
      }
    });
    setFoundWords(wordsToFind);
    setColoredCells(allCells);
    setSelected([]);
    setSentence(wordsToFind.join(" "));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const total = wordsToFind.length;
    const score = foundWords.length;

    if (score === 0) {
      ValidationAlert.info();
      return;
    }

    if (score < total) {
      ValidationAlert.warning(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:orange;">Score: ${score} / ${total}</b>
        </div>
      `);
    } else {
      ValidationAlert.success(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:green;">Score: ${score} / ${total}</b>
        </div>
      `);
    }
    setLocked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            C
          </span>
          Why weren’t Tom and his sister in school last week in Helping Out on
          the Farm on page 65?
        </h5>

        {/* Words List */}
        <div className="flex flex-wrap justify-center gap-3 mb-5 border-2 border-dashed border-gray-300 rounded-[14px] p-3">
          {wordsToFind.map((word) => (
            <span
              key={word}
              className={`px-3 py-1.5 rounded-[10px] border-2 border-[#2c5287] font-semibold transition duration-200 ${
                foundWords.includes(word)
                  ? "bg-[#2c5287] text-white border-[#2c5287]"
                  : "bg-white text-black"
              }`}
              style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
            >
              {word}
            </span>
          ))}
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* Grid Wrapper */}
          <div
            className="border-2 border-[#f28c63] px-4 pt-4 pb-5"
            style={{ width: "fit-content", margin: "0 auto" }}
          >
            <div
              className="bg-[#daf5ff] rounded-[15px] p-2 sm:p-[15px]"
              style={{
                userSelect: "none",
                width: "max-content",
                touchAction: "none", // 🔥 الحل السحري لمنع تحريك الصفحة أثناء السحب على الآيباد
                WebkitOverflowScrolling: "touch",
              }}
            >
              {letters.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: "clamp(1px, 0.3vw, 4px)", // مسافة تتغير حسب الشاشة
                    width: "fit-content",
                  }}
                >
                  {row.map((letter, colIndex) => {
                    const index = rowIndex * 100 + colIndex;
                    const isSelected = selected.includes(index);
                    const isFound = coloredCells.includes(index);

                    return (
                      <span
                        key={index}
                        data-index={index}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseUp={handleMouseUp}
                        onDragStart={(e) => e.preventDefault()}
                        onTouchStart={(e) => {
                          e.preventDefault(); // 🔥 منع تحريك الصفحة عند بدء اللمس
                          handleMouseDown(index);
                        }}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                        className={`
                          flex items-center justify-center
                          cursor-pointer
                          transition
                          ${isSelected ? "bg-[#ffd54f] rounded-sm" : ""}
                          ${isFound ? "bg-[#4caf50] text-white rounded-sm" : ""}
                        `}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)", // 🔥 عرض ديناميكي
                          height: "clamp(22px, 3.5vw, 35px)", // 🔥 طول ديناميكي
                          fontSize: "clamp(12px, 1.8vw, 18px)", // 🔥 حجم خط ديناميكي
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <img
                src={img1}
                alt="start"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
                  height: "auto",
                }}
              />

              <div
                style={{
                  flex: 1,
                  borderBottom: "2px solid black",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  value={sentence}
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "clamp(14px, 2vw, 18px)", // 🔥 حجم خط ديناميكي للإجابة
                  }}
                />
              </div>

              <img
                src={img2}
                alt="end"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit8_Page5_Q4;
