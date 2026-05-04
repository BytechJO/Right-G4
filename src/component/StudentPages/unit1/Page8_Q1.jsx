import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page8_Q1.css";
import Button from "../../Button";

const Page8_Q1 = () => {
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  const rows = [
    {
      vowel: "a",
      color: "#2ecc71",
      letters: [
        "n",
        "s",
        "m",
        "a",
        "p",
        "h",
        "i",
        "c",
        "a",
        "t",
        "y",
        "b",
        "a",
        "g",
        "a",
        "o",
        "t",
      ],
      words: ["map", "cat", "bag"],
    },
    {
      vowel: "e",
      color: "#e84393",
      letters: [
        "p",
        "e",
        "n",
        "b",
        "y",
        "b",
        "e",
        "d",
        "m",
        "n",
        "e",
        "t",
        "b",
        "e",
        "v",
        "c",
        "t",
      ],
      words: ["pen", "bed", "net"],
    },
    {
      vowel: "i",
      color: "#0984e3",
      letters: [
        "d",
        "b",
        "d",
        "x",
        "g",
        "s",
        "i",
        "t",
        "f",
        "i",
        "s",
        "h",
        "d",
        "s",
        "i",
        "c",
        "k",
      ],
      words: ["sit", "fish", "sick"],
    },
    {
      vowel: "o",
      color: "#8e44ad",
      letters: [
        "p",
        "t",
        "b",
        "o",
        "x",
        "m",
        "m",
        "o",
        "p",
        "g",
        "i",
        "s",
        "o",
        "c",
        "k",
        "u",
        "n",
      ],
      words: ["box", "mop", "sock"],
    },
    {
      vowel: "u",
      color: "#e74c3c",
      letters: [
        "a",
        "p",
        "i",
        "s",
        "n",
        "u",
        "t",
        "z",
        "y",
        "g",
        "u",
        "m",
        "c",
        "b",
        "u",
        "s",
        "r",
      ],
      words: ["nut", "gum", "bus"],
    },
  ];

  const [selected, setSelected] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [foundSelections, setFoundSelections] = useState([]);

  /* ================= Selection ================= */
  const startSelect = (rowIndex, colIndex) => {
    setCurrentRow(rowIndex);
    setSelected([{ row: rowIndex, col: colIndex }]);
  };

  const addSelect = (rowIndex, colIndex) => {
    if (currentRow !== rowIndex) return;

    setSelected((prev) => {
      if (prev.some((c) => c.col === colIndex && c.row === rowIndex))
        return prev;
      return [...prev, { row: rowIndex, col: colIndex }];
    });
  };

  const endSelect = () => {
    if (!selected.length) return;

    const rowIndex = selected[0].row;
    const row = rows[rowIndex];

    const word = selected
      .map((c) => row.letters[c.col])
      .join("")
      .toLowerCase();

    const reversed = word.split("").reverse().join("");

    if (row.words.includes(word) || row.words.includes(reversed)) {
      const correctWord = row.words.includes(word) ? word : reversed;

      setFoundSelections((prev) => {
        if (prev.some((f) => f.word === correctWord)) return prev;

        return [
          ...prev,
          {
            word: correctWord,
            cells: [...selected],
            row: rowIndex,
          },
        ];
      });
    }

    setSelected([]);
    setCurrentRow(null);
  };

  /* ================= Check ================= */
  const checkAnswers = () => {
    if (locked) return;

    if (foundSelections.length === 0) {
      ValidationAlert.info();
      return;
    }

    const total = rows.reduce((acc, r) => acc + r.words.length, 0);
    const score = foundSelections.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };

  const showAnswers = () => {
    let answers = [];

    rows.forEach((row, i) => {
      row.words.forEach((word) => {
        const start = row.letters.join("").indexOf(word);
        if (start !== -1) {
          const cells = [];
          for (let j = 0; j < word.length; j++) {
            cells.push({ row: i, col: start + j });
          }
          answers.push({ word, cells, row: i });
        }
      });
    });
    setLocked(true);
    setFoundSelections(answers);
  };

  const resetAll = () => {
    setFoundSelections([]);
    setSelected([]);
    setCurrentRow(null);
    setLocked(false);
  };

  /* ================= UI ================= */
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
          <span className="ex-A" style={{ marginRight: "10px" }}>
            A
          </span>
          <span style={{ color: "#2e3192", marginRight: "10px" }}>1</span>
          Find and circle three words in each box with{" "}
          <span style={{ color: "#2e3192" }}>short vowel</span> sounds.
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                margin: "15px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  color: row.color,
                  fontWeight: "bold",
                  minWidth: "80px",
                  textAlign: "right",
                }}
              >
                Short {row.vowel}
              </div>

              <div
                style={{
                  border: "2px solid orange",
                  borderRadius: "20px",
                  padding: "10px 15px",
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  gap: "6px",
                  background: "#fff",
                }}
              >
                {row.letters.map((letter, colIndex) => {
                  const isSelected = selected.some(
                    (c) => c.row === rowIndex && c.col === colIndex,
                  );

                  const isFound = foundSelections.some((f) =>
                    f.cells.some(
                      (c) => c.row === rowIndex && c.col === colIndex,
                    ),
                  );

                  return (
                    <span
                      key={colIndex}
                      data-row={rowIndex}
                      data-col={colIndex}
                      onMouseDown={() => startSelect(rowIndex, colIndex)}
                      onMouseEnter={() => addSelect(rowIndex, colIndex)}
                      onMouseUp={endSelect}
                      onTouchStart={() => startSelect(rowIndex, colIndex)}
                      onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(
                          touch.clientX,
                          touch.clientY,
                        );

                        if (!element) return;

                        const col = element.getAttribute("data-col");
                        const row = element.getAttribute("data-row");

                        if (row !== null && col !== null) {
                          addSelect(Number(row), Number(col));
                        }
                      }}
                      onTouchEnd={endSelect}
                      style={{
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        background: isFound
                          ? "rgba(231, 76, 60, 0.4)"
                          : isSelected
                            ? "rgba(52, 152, 219, 0.4)"
                            : "#fff",
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Page8_Q1;
