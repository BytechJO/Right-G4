import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";

const GrammarC = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);
  const questions = [
    {
      sentence: "How many ____ would you like?",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "eggs",
    },
    {
      sentence: "How much ____ is in a big swimming pool?",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "water",
    },
    {
      sentence: "There are many ____ in Africa.",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "lions",
    },
    {
      sentence: "There is too much ____ in the cake.",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "sugar",
    },
  ];

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => !a || a.trim() === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];

    questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        correctCount++;
        newErrors[i] = false; // ✅
      } else {
        newErrors[i] = true; // ❌
      }
    });

    setErrors(newErrors);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) {
      setLocked(true); // 🔒 يقفل إذا كله صح
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const correctAnswers = questions.map((q) => q.correct);
    setAnswers(correctAnswers);
    setErrors([]); // يمسح الأخطاء
    setLocked(true);
  };
  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setErrors([]);
    setLocked(false);
  };
  const onDragEnd = (res) => {
    if (!res.destination || locked) return;

    const { draggableId, destination } = res;

    if (destination.droppableId.startsWith("bank")) return;

    const word = draggableId.split("-").slice(1).join("-");
    const index = Number(destination.droppableId.replace("drop-", ""));

    const updated = [...answers];
    updated[index] = word;

    setAnswers(updated);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {/* العنوان */}
        <h5 className="header-title-page8-read  mb-5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            C
          </span>
          Choose a noun that would go with each adjective (
          <span className="text-[#31B7F5]">many</span> or{" "}
          <span className="text-[#31B7F5]">much</span>).
        </h5>

        {/* 🟣 بنك الكلمات */}
        <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-3 px-4 py-2 rounded mb-10 w-fit mx-auto mt-10"
            >
              {questions[0].options.map((word, i) => {
                const isUsed = answers.includes(word);

                return (
                  <Draggable
                    key={word}
                    draggableId={`bank-${word}`}
                    index={i}
                    isDragDisabled={locked || isUsed}
                  >
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "6px 14px",
                          border: "2px solid #6D2980",
                          borderRadius: "10px",
                          background: "#fff",
                          cursor: isUsed ? "not-allowed" : "grab",
                          opacity: isUsed ? 0.5 : 1,
                          ...provided.draggableProps.style,
                        }}
                      >
                        {word}
                      </span>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* 🟡 الجمل */}
        <div className="flex flex-col gap-8 text-[15px]">
          {questions.map((q, i) => {
            const value = answers[i];

            return (
              <div key={i} className="relative">
                <span className="font-bold mr-2">{i + 1}</span>

                {q.sentence.split("____")[0]}

                <Droppable droppableId={`drop-${i}`}>
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        minWidth: "100px",
                        borderBottom: errors[i]
                          ? "2px solid #ef4444"
                          : "2px solid #000",
                        margin: "0 6px",
                        fontWeight: value ? "bold" : "normal",
                        color: value ? "#6D2980" : "#000",
                      }}
                    >
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                        onClick={() => {
                          if (errors[i] === false || locked) return;
                          const updated = [...answers];
                          updated[i] = ""; // 🔥 رجّعها للبنك
                          setAnswers(updated);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#E9D5FF"; // بنفسجي فاتح
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {value}
                      </span>
                      {provided.placeholder}
                    </span>
                  )}
                </Droppable>

                {q.sentence.split("____")[1]}

                {/* ❌ */}
                {errors[i] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "50%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-8">
          {/* Reset */}
          <div className="relative group">
            <div
              onClick={handleReset}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaRedo size={14} />
              </div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Reset
            </span>
          </div>

          {/* Show */}
          <div className="relative group">
            <div
              onClick={handleShow}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaEye size={14} />
              </div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Show Answer
            </span>
          </div>

          {/* Check */}
          <div className="relative group">
            <div
              onClick={handleCheck}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaCheck size={14} />
              </div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Check Answer
            </span>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default GrammarC;
