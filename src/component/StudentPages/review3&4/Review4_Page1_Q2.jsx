import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

const items = [
  {
    sentence: "rispng",
    scrambled: ["rispng"],
    correct: ["spring"],
  },
  {
    sentence: "mersum",
    scrambled: ["mersum"],
    correct: ["summer"],
  },
  {
    sentence: "ntauum",
    scrambled: ["ntauum"],
    correct: ["autumn"],
  },
  {
    sentence: "reniwt",
    scrambled: ["reniwt"],
    correct: ["winter"],
  },
];

export default function Review4_Page1_Q2() {
  // ✨ كل كلمة string بدل array
  const [answers, setAnswers] = useState(
    items.map((item) => Array(item.correct[0].length).fill("")),
  );

  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onDragEnd = (result) => {
    const { destination, draggableId, source } = result;
    if (!destination || locked) return;

    const letterId = draggableId;
    const letter = letterId.split("-")[0];

    // إذا سحب داخل نفس المكان → تجاهل
    if (destination.droppableId === source.droppableId) return;

    // إذا drop على slot
    if (destination.droppableId.startsWith("slot")) {
      const [, qIndex, letterIndex] = destination.droppableId.split("-");

      const updated = [...answers];

      // 🔁 إذا في حرف قديم → احذفه (عشان يرجع يتفعل بالبنك)
      updated[qIndex][letterIndex] = {
        char: letter,
        id: letterId,
      };

      setAnswers(updated);
    }
  };

  const resetAll = () => {
    setAnswers(items.map((item) => Array(item.correct[0].length).fill("")));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setAnswers(
      items.map((item) =>
        item.correct[0].split("").map((char, index) => ({
          char,
          id: `answer-${index}`,
        })),
      ),
    );
    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = answers.some((row) => row.some((word) => word === ""));

    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;

    answers.forEach((row, i) => {
      if (row.map((l) => l.char).join("") === items[i].correct[0]) {
        score++;
      }
    });

    const total = items.length;

    const message = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:#2e7d32;font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

    setShowResult(true);
    setLocked(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center p-8">
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>B</span>
            Unscramble and write.
          </h5>

          <div className="grid grid-cols-1 gap-6 justify-center pb-15 mt-5">
            {items.map((item, i) => {
              const userWord = answers[i].map((l) => l?.char || "").join("");

              const isWordWrong =
                showResult && userWord && userWord !== item.correct[0];

              return (
                <div key={i} className="flex items-center gap-4">
                  {/* 🔵 المحتوى */}
                  <div className="flex flex-col gap-2">
                    {/* السطر الأول */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg w-5">{i + 1}</span>
                      <span className="text-lg">{item.sentence}</span>
                    </div>

                    {/* السطر الثاني */}
                    <div className="flex items-center gap-3 ml-7 relative">
                      {/* 🔤 الحروف */}
                      <Droppable
                        droppableId={`bank-${i}`}
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-1"
                          >
                            {item.scrambled.map((word, wordIndex) => {
                              const letters = word
                                .split("")
                                .map((letter, index) => ({
                                  char: letter,
                                  id: `${letter}-${i}-${wordIndex}-${index}`,
                                }));

                              return (
                                <div key={wordIndex} className="flex gap-1">
                                  {letters.map((letterObj, letterIndex) => {
                                    const isUsed = answers[i].some(
                                      (l) => l?.id === letterObj.id,
                                    );

                                    return (
                                      <Draggable
                                        key={letterObj.id}
                                        draggableId={letterObj.id}
                                        index={wordIndex * 10 + letterIndex}
                                        isDragDisabled={locked || isUsed}
                                      >
                                        {(provided) => (
                                          <span
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`w-8 h-8 flex items-center justify-center rounded border font-bold
          ${
            isUsed
              ? "bg-gray-300 opacity-40 cursor-not-allowed"
              : "bg-yellow-200 cursor-grab"
          }`}
                                          >
                                            {letterObj.char}
                                          </span>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                </div>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      {isWordWrong && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-30px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "1",
                              transform: "translateY(-1px)",
                            }}
                          >
                            ✕
                          </span>
                        </div>
                      )}
                      {/* 🔲 البوكسات */}
                      <div className="flex gap-1 ml-4 relative">
                        {item.correct[0].split("").map((_, letterIndex) => {
                          const isCorrect =
                            answers[i][letterIndex]?.char ===
                            item.correct[0][letterIndex];

                          const isWrong =
                            showResult && answers[i][letterIndex] && !isCorrect;

                          return (
                            <Droppable
                              droppableId={`slot-${i}-${letterIndex}`}
                              key={letterIndex}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`w-8 h-8 border-b-2 flex items-center justify-center font-bold relative
                ${isWrong ? "border-red-500" : "border-black"}
              `}
                                >
                                  <span
                                    style={{
                                      color: "#1C398E",
                                    }}
                                  >
                                    {answers[i][letterIndex]?.char}
                                  </span>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* buttons */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={resetAll}>
              Start Again ↻
            </button>

            <button onClick={showAnswers} className="show-answer-btn">
              Show Answer
            </button>

            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
