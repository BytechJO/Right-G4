import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 2.svg";

const Unit4_Page5_Q3 = () => {
  const grid = [
    [
      "t",
      "u",
      "e",
      "j",
      "k",
      "h",
      "t",
      "h",
      "e",
      "b",
      "v",
      "e",
      "d",
      "v",
      "e",
      "d",
      "n",
      "a",
      "m",
      "e",
      "p",
      "l",
      "o",
      "f",
      "y",
      "u",
    ],
    [
      "j",
      "u",
      "l",
      "i",
      "a",
      "s",
      "q",
      "w",
      "a",
      "c",
      "v",
      "x",
      "z",
      "c",
      "v",
      "o",
      "o",
      "s",
      "c",
      "h",
      "o",
      "o",
      "l",
      "k",
      "i",
      "s",
    ],
    [
      "f",
      "r",
      "t",
      "h",
      "e",
      "s",
      "x",
      "z",
      "l",
      "o",
      "n",
      "d",
      "o",
      "n",
      "e",
      "h",
      "g",
      "m",
      "c",
      "o",
      "u",
      "r",
      "t",
      "j",
      "r",
      "e",
    ],
    ["w", "d", "c", "s", "c", "h", "o", "o", "l", "m", "b", "v"],
  ];

  const letters = grid;
  const wordsToFind = [
    { id: "the", word: "the" },
    { id: "name", word: "name" },
    { id: "of", word: "of" },
    { id: "julias", word: "julias" },
    { id: "school1", word: "school" },
    { id: "is", word: "is" },
    { id: "london", word: "london" },
    { id: "court", word: "court" },
    { id: "school2", word: "school" },
  ];

  const correctPositions = {
    the: [6, 7, 8],

    name: [16, 17, 18, 19],

    of: [22, 23],

    julias: [100 + 0, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5],

    school1: [100 + 17, 100 + 18, 100 + 19, 100 + 20, 100 + 21, 100 + 22],

    is: [100 + 24, 100 + 25],

    london: [200 + 8, 200 + 9, 200 + 10, 200 + 11, 200 + 12, 200 + 13],

    court: [200 + 18, 200 + 19, 200 + 20, 200 + 21, 200 + 22],

    school2: [300 + 3, 300 + 4, 300 + 5, 300 + 6, 300 + 7, 300 + 8],
  };
  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (index) => {
    if (locked) return;

    const row = Math.floor(index / 100);
    const col = index % 100;

    setIsDragging(true);
    setSelected([index]);
    setCurrentWord(letters[row][col]);
  };
  const handleMouseEnter = (index) => {
    if (!isDragging || locked) return;

    const lastIndex = selected[selected.length - 1];

    if (index === lastIndex + 1 || index === lastIndex - 1) {
      if (!selected.includes(index)) {
        const row = Math.floor(index / 100);
        const col = index % 100;

        setSelected((prev) => [...prev, index]);
        setCurrentWord((prev) => prev + letters[row][col]);
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

    const reversedWord = currentWord.split("").reverse().join("");

    const matchedWord = wordsToFind.find(
      (item) =>
        (item.word === currentWord || item.word === reversedWord) &&
        !foundWords.includes(item.id),
    );

    if (matchedWord && !foundWords.includes(matchedWord.id)) {
      setFoundWords((prev) => [...prev, matchedWord.id]);
      setColoredCells((prev) => [...prev, ...selected]);
      setSentence(
        wordsToFind
          .filter((item) => [...foundWords, matchedWord.id].includes(item.id))
          .map((item) => item.word)
          .join(" "),
      );
    }

    setSelected([]);
    setCurrentWord("");
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
      if (correctPositions[word.id]) {
        allCells.push(...correctPositions[word.id]);
      }
    });
    setFoundWords(wordsToFind.map(w => w.id));
    setColoredCells(allCells);
    setSelected([]);
    setSentence(wordsToFind.map(w => w.word).join(" "));
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
          What’s the name of Julia’s school in Helen and Stella Get an e-Mail on
          page 29?
        </h5>

        {/* Words List */}
        <div className="flex flex-wrap justify-center gap-3 mb-5 border-2 border-dashed border-gray-300 rounded-[14px] p-3">
          {wordsToFind.map((word) => (
            <span
              key={word.id}
              className={`px-3 py-1.5 rounded-[10px] border-2 border-[#2c5287] font-semibold transition duration-200 ${
                foundWords.includes(word.id)
                  ? "bg-[#2c5287] text-white border-[#2c5287]"
                  : "bg-white text-black"
              }`}
              style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
            >
              {word.word}
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

export default Unit4_Page5_Q3;
