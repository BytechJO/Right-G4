import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Untitled-2.png";
const Unit6_Page6_Q2 = () => {
  // الحروف المتاحة
  const letters = ["a", "e", "o", "i", "u"];
  const [results, setResults] = useState({});
  // الكلمات (كل slot إله index)
  const words = [
    {
      id: 1,
      structure: [
        "J",
        { slot: 0, symbol: "★" },
        "n",
        { slot: 1, symbol: "●" },
        { slot: 2, symbol: "★" },
        "ry",
      ],
      correct: ["a", "u", "a"],
    }, // January

    {
      id: 2,
      structure: [
        "F",
        { slot: 3, symbol: "▼" },
        "br",
        { slot: 4, symbol: "●" },
        { slot: 5, symbol: "★" },
        "ry",
      ],
      correct: ["e", "u", "a"],
    }, // February

    {
      id: 3,
      structure: ["M", { slot: 6, symbol: "★" }, "rch"],
      correct: ["a"],
    }, // March

    {
      id: 4,
      structure: [
        { slot: 7, symbol: "★" },
        "pr",
        { slot: 8, symbol: "■" },
        "l",
      ],
      correct: ["A", "i"],
    }, // April

    {
      id: 5,
      structure: ["M", { slot: 9, symbol: "★" }, "y"],
      correct: ["a"],
    }, // May

    {
      id: 6,
      structure: [
        "J",
        { slot: 10, symbol: "●" },
        "n",
        { slot: 11, symbol: "▼" },
      ],
      correct: ["u", "e"],
    }, // June

    {
      id: 7,
      structure: ["J", { slot: 12, symbol: "●" }, "ly"],
      correct: ["u"],
    }, // July

    {
      id: 8,
      structure: [
        { slot: 13, symbol: "★" },
        { slot: 14, symbol: "●" },
        "g",
        { slot: 15, symbol: "●" },
        "st",
      ],
      correct: ["A", "u"],
    }, // August

    {
      id: 9,
      structure: [
        "S",
        { slot: 16, symbol: "▼" },
        "pt",
        { slot: 17, symbol: "▼" },
        "mb",
        { slot: 18, symbol: "▼" },
        "r",
      ],
      correct: ["e", "e", "e"],
    }, // September

    {
      id: 10,
      structure: [
        { slot: 19, symbol: "#" },
        "ct",
        { slot: 20, symbol: "#" },
        "b",
        { slot: 21, symbol: "▼" },
        "r",
      ],
      correct: ["O", "o", "e"],
    }, // October

    {
      id: 11,
      structure: [
        "N",
        { slot: 22, symbol: "#" },
        "v",
        { slot: 23, symbol: "▼" },
        "mb",
        { slot: 24, symbol: "▼" },
        "r",
      ],
      correct: ["o", "e", "e"],
    }, // November

    {
      id: 12,
      structure: [
        "D",
        { slot: 25, symbol: "▼" },
        "c",
        { slot: 26, symbol: "▼" },
        "mb",
        { slot: 27, symbol: "▼" },
        "r",
      ],
      correct: ["e", "e", "e"],
    }, // December
  ];

  const totalSlots = 28;
  const [answers, setAnswers] = useState(Array(totalSlots).fill(""));
  const [locked, setLocked] = useState(false);

  // drag
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    if (destination.droppableId.startsWith("slot-")) {
      const index = Number(destination.droppableId.split("-")[1]);
      const letter = draggableId.split("-")[1];

      setAnswers((prev) => {
        const updated = [...prev];
        updated[index] = letter;
        return updated;
      });
    }
  };

  // check
  const checkAnswers = () => {
    if (locked) return;

    const usedSlots = words.flatMap((w) =>
      w.structure
        .filter((item) => typeof item !== "string")
        .map((item) => item.slot),
    );

    const hasEmpty = usedSlots.some((slot) => answers[slot] === "");

    if (hasEmpty) {
      ValidationAlert.info("");
      return;
    }

    let score = 0;
    let newResults = {};

    words.forEach((w) => {
      let isCorrect = true;
      let correctIndex = 0;

      w.structure.forEach((item) => {
        if (typeof item !== "string") {
          const slot = item.slot;
          const correctLetter = w.correct[correctIndex];

          if (answers[slot] !== correctLetter) {
            isCorrect = false;
          } else {
            score++;
          }

          correctIndex++;
        }
      });

      newResults[w.id] = isCorrect;
    });

    setResults(newResults);
    const total = totalSlots;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(totalSlots).fill(""));
    setLocked(false);
  };

  const showAnswers = () => {
    let filled = [];
    words.forEach((w) => {
      filled = [...filled, ...w.correct];
    });

    setAnswers(filled);
    setLocked(true);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            // gap: "20px",
            width: "60%",
            justifyContent: "flex-start",
          }}
        >
          <h5 className="header-title-page8">
            <span style={{ marginRight: "15px" }} className="ex-A">
              E
            </span>
            Look and write.
          </h5>
          {/* 🔤 Word Bank */}
          <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  marginTop: "20px",
                  justifyContent: "center",
                  width: "60%",
                  marginBottom: "20px",
                }}
              >
                {letters.map((l, i) => (
                  <Draggable
                    key={l + i}
                    draggableId={`letter-${l}-${i}`}
                    index={i}
                    isDragDisabled={locked}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "7px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          cursor: "grab",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {l}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الكلمات */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth <= 1024 ? "1fr" : "1fr 1fr",
              gap: "30px 40px",
            }}
          >
            {words.map((word) => (
              <div
                key={word.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  fontSize: "18px",
                  position: "relative",
                }}
              >
                {/* الرقم */}
                <span style={{ fontWeight: "bold", width: "25px" }}>
                  {word.id}
                </span>

                {/* الكلمة بالرموز */}
                <span style={{ minWidth: "80px", marginRight: "10px" }}>
                  {word.structure.map((item, i) => {
                    if (typeof item === "string") return item;

                    return (
                      <span key={i} style={{ fontWeight: "bold" }}>
                        {item.symbol}
                      </span>
                    );
                  })}
                </span>

                {/* drag (كما هو) */}
                <span>
                  {word.structure.map((item) => {
                    if (typeof item === "string") return item;

                    return (
                      <Droppable
                        key={item.slot}
                        droppableId={`slot-${item.slot}`}
                      >
                        {(provided) => (
                          <span
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "inline-block",
                              minWidth: "20px",
                              borderBottom: "2px solid black",
                              textAlign: "center",
                              margin: "0 4px",
                            }}
                          >
                            {answers[item.slot]}
                            {provided.placeholder}
                          </span>
                        )}
                      </Droppable>
                    );
                  })}
                </span>
                {locked && results[word.id] === false && (
                  <span className="absolute  -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                    ✕
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* أزرار */}
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
        <img
          src={img1}
          alt="exercise"
          style={{
            position: "absolute",
            top: "50px", // تتحكم بالمكان
            right: "5%", // تتحكم بالمكان
            width: "300px",
            height: "400px",
            zIndex: 999, // 🔥 فوق كل شي
            pointerEvents: "none", // 🔥 مهم عشان ما تخرب drag
          }}
        />
      </div>
    </DragDropContext>
  );
};

export default Unit6_Page6_Q2;
