import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
const COLORS = [
  { key: "long a", color: "#D1232A" },
  { key: "long e", color: "#FFF101" },
  { key: "long i", color: "#ED028C" },
  { key: "long o", color: "#962A90" },
  { key: "long u", color: "#EE5625" },
  { key: "short a", color: "#40AE49" },
  { key: "short e", color: "#A3CF9A" },
  { key: "short i", color: "#7B4521" },
  { key: "short o", color: "#3730A3" },
  { key: "short u", color: "#00AEEF" },
];
const WORDS = [
  ["snow", "soap", "cup", "date", "may", "make", "cape", "coat", "grow"],
  ["five", "time", "chat", "hat", "desk", "man", "act", "glue", "mine"],
  ["kid", "sit", "bee", "log", "pop", "pen", "he", "see", "blue"],
];
const CORRECT = {
  snow: "long o",
  soap: "long o",
  cup: "short u",
  date: "long a",
  may: "long a",
  make: "long a",
  cape: "long a",
  coat: "long o",
  grow: "long o",
  five: "long i",
  time: "long i",
  chat: "short a",
  hat: "short a",
  desk: "short e",
  man: "short a",
  act: "short a",
  glue: "long u",
  mine: "long i",
  kid: "short i",
  sit: "short i",
  bee: "long e",
  log: "short o",
  pop: "short o",
  pen: "short e",
  he: "long e",
  see: "long e",
  blue: "long u",
};
const Review2_Page2_Q2 = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const handleSelectColor = (key) => {
    if (locked) return;
    setSelectedColor(key);
  };
  const handleClickWord = (word) => {
    if (locked || !selectedColor) return;
    setAnswers((prev) => ({ ...prev, [word]: selectedColor }));
  };
  const checkAnswers = () => {
    if (locked) return;
    const allWords = Object.keys(CORRECT);
    if (allWords.some((w) => !answers[w])) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    allWords.forEach((w) => {
      if (answers[w] === CORRECT[w]) score++;
    });
    const total = allWords.length;
    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score}/${total}`);
    else ValidationAlert.error(`Score: ${score}/${total}`);
    setLocked(true);
  };
  const reset = () => {
    setAnswers({});
    setSelectedColor(null);
    setLocked(false);
  };
  const showAnswer = () => {
    setAnswers(CORRECT);
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
          <span style={{ marginRight: "20px" }}>D</span>
          Color each square according to the{" "}
          <span style={{ color: "#2e3192" }}>vowel sound</span> you hear in the
          word.
        </h5>

        <div className="flex flex-col items-center px-6 mt-3">
          {" "}
          {/* 🎨 COLOR BAR */}{" "}
          <div className="mb-6">
            <table className="border-2 border-gray-500 text-center text-lg scale-100">
              <tbody>
                <tr>
                  <td className="border px-3 py-2 text-sm font-medium">
                    color
                  </td>
                  {COLORS.map((c) => (
                    <td
                      key={c.key}
                      onClick={() => handleSelectColor(c.key)}
                      className={`border cursor-pointer ${
                        selectedColor === c.key ? `ring-2 ${c.color}` : ""
                      }`}
                      style={{
                        background: c.color,
                        width: "60px",
                        height: "40px",
                      }}
                    />
                  ))}
                </tr>

                <tr>
                  <td className="border px-3 py-2 text-sm font-medium">
                    sound
                  </td>
                  {COLORS.map((c) => (
                    <td key={c.key} className="border px-2 text-xs">
                      {c.key}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full ">
            <div className="flex flex-col gap-6"></div>
            {/* 🧩 WORDS */}{" "}
            <div className="flex flex-col gap-4">
              {" "}
              {WORDS.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-9 border-2 border-orange-400 rounded-xl overflow-hidden w-full"
                >
                  {" "}
                  {row.map((word) => {
                    const colorKey = answers[word];
                    const colorObj = COLORS.find((c) => c.key === colorKey);
                    const isWrong =
                      locked && colorKey && colorKey !== CORRECT[word];
                    return (
                      <div
                        key={word}
                        onClick={() => handleClickWord(word)}
                        className="relative py-5 text-lg font-semibold cursor-pointer border-r last:border-r-0 flex items-center justify-center"
                        style={{
                          backgroundColor: colorObj?.color || "#f3f4f6",
                        }}
                      >
                        {word}
                        {isWrong && (
                          <div
                            className="absolute top-3 right-3 translate-x-1/2 -translate-y-1/2
                     w-5 h-5 text-xs bg-red-500 text-white rounded-full
                     flex items-center justify-center font-bold border-2 border-white
                     pointer-events-none shadow"
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* 🔘 BUTTON */}{" "}
            <Button
              handleShowAnswer={showAnswer}
              handleStartAgain={reset}
              checkAnswers={checkAnswers}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review2_Page2_Q2;
