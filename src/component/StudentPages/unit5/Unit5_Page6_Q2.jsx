import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex E 1.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Button from "../../Button";

const questions = [
  {
    id: "q0",
    qWords: ["Where", "is", "the"],
    qEnd: ["bike", "?"],

    aWords: ["It's", "in", "the", "garage"],
    aEnd: ["."],
  },
  {
    id: "q1",
    qWords: ["Where", "is", "the"],
    qEnd: ["TV", "?"],

    aWords: ["It's", "in", "the", "living", "room"],
    aEnd: ["."],
  },
  {
    id: "q2",
    qWords: ["Where", "is", "the"],
    qEnd: ["bed", "?"],

    aWords: ["It's", "in", "the", "bedroom"],
    aEnd: ["."],
  },
  {
    id: "q3",
    qWords: ["Where", "is", "the"],
    qEnd: ["washing machine", "?"],

    aWords: ["It's", "in", "the", "basement"],
    aEnd: ["."],
  },
];
const Unit5_Page6_Q2 = () => {
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongInputs, setWrongInputs] = useState({});
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const [data, setData] = useState(() => {
    const obj = {};
    questions.forEach((q) => {
      obj[q.id] = {
        qBank: shuffleArray(q.qWords), // ✅ عشوائي
        aBank: shuffleArray(q.aWords), // ✅ عشوائي
        qLine: Array(q.qWords.length).fill(null),
        aLine: Array(q.aWords.length).fill(null),
      };
    });
    return obj;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const [qId, from] = source.droppableId.split("-");
    const [, to, indexStr] = destination.droppableId.split("-");

    if (from === "qBank" || from === "aBank") {
      const destArr = [...data[qId][to]];
      const i = Number(indexStr);

      const moved = result.draggableId.split("-")[2];

      if (destArr[i]) {
        destArr[i] = moved;
      } else {
        destArr[i] = moved;
      }

      setData({
        ...data,
        [qId]: {
          ...data[qId],
          [to]: destArr,
        },
      });
    }
  };

  const reset = () => {
    const newData = {};

    questions.forEach((q) => {
      newData[q.id] = {
        qBank: [...q.qWords],
        aBank: [...q.aWords],
        qLine: Array(q.qWords.length).fill(null),
        aLine: Array(q.aWords.length).fill(null),
      };
    });

    setData(newData);
    setLocked(false);
    setShowAnswer(false);
    setWrongInputs([]);
  };

  const showAnswers = () => {
    const newData = { ...data };

    questions.forEach((q) => {
      newData[q.id].qLine = [...q.qWords];
      newData[q.id].aLine = [...q.aWords];
    });

    setData(newData);
    setShowAnswer(true);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    let correct = 0;
    let wrong = {};
    let isIncomplete = false; // 🔥 جديد

    questions.forEach((q) => {
      const qLine = data[q.id].qLine;
      const aLine = data[q.id].aLine;

      // 🔴 تحقق من الفراغات
      if (qLine.includes(null) || aLine.includes(null)) {
        isIncomplete = true;
      }

      const userQ = qLine.join(" ");
      const userA = aLine.join(" ");

      const correctQ = q.qWords.join(" ");
      const correctA = q.aWords.join(" ");

      wrong[q.id] = {
        q: false,
        a: false,
      };

      if (userQ === correctQ) {
        correct++;
      } else {
        wrong[q.id].q = true;
      }

      if (userA === correctA) {
        correct++;
      } else {
        wrong[q.id].a = true;
      }
    });

    // ❌ إذا في فراغات
    if (isIncomplete) {
      ValidationAlert.info();
      return;
    }

    setWrongInputs(wrong);
    setLocked(true);

    const total = questions.length * 2;

    if (correct === total) {
      ValidationAlert.success(`Score: ${correct}/${total}`);
    } else if (correct === 0) {
      ValidationAlert.error(`Score: ${correct}/${total}`);
    } else {
      ValidationAlert.warning(`Score: ${correct}/${total}`);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <span
              className="ex-A"
              style={{ marginRight: "10px", marginBottom: "20px" }}
            >
              E
            </span>
            Look and answer.
          </h5>
          <div className="flex gap-10 items-start mb-7">
            {/* 🔵 LEFT SIDE */}
            <div className="flex flex-col gap-4">
              
              {/* 🔥 الأسئلة */}
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="bg-white p-2 rounded-2xl shadow w-full max-w-2xl"
                >
                  <div className="text-lg font-bold mb-1">{index + 1}.</div>
                  {/* 🔵 QUESTION WORDS */}
                  <Droppable
                    droppableId={`${q.id}-qBank`}
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-3 p-2 border-2 border-dashed rounded-lg w-full"
                      >
                        {data[q.id].qBank.map((word, index) => (
                          <Draggable
                            key={`${q.id}-q-${word}-${index}`}
                            draggableId={`${q.id}-q-${word}-${index}`}
                            index={index}
                            isDragDisabled={data[q.id].qLine.includes(word)}
                          >
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`px-3 py-1 border-2 border-blue-800 rounded font-bold text-sm ${
                                  data[q.id].qLine.includes(word)
                                    ? "opacity-40 cursor-not-allowed"
                                    : "cursor-grab"
                                }`}
                              >
                                {word}
                              </span>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* 🔵 QUESTION LINE */}
                  <div className="flex items-center gap-2 mt-2">
                    {data[q.id].qLine.map((word, i) => (
                      <Droppable droppableId={`${q.id}-qLine-${i}`} key={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`w-16 h-10 border-b-4 flex items-center justify-center ${
                              showAnswer || locked
                                ? data[q.id].qLine[i] === q.qWords[i]
                                  ? "border-black"
                                  : "border-red-500"
                                : "border-black"
                            }`}
                          >
                            {word && (
                              <Draggable
                                draggableId={`${q.id}-ql-${i}`}
                                index={0}
                              >
                                {(provided) => (
                                  <span
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="font-bold text-blue-800"
                                  >
                                    {word}
                                  </span>
                                )}
                              </Draggable>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}

                    {/* ثابت */}
                    {q.qEnd.map((w, i) => (
                      <span key={i} className="font-semibold">
                        {w}
                      </span>
                    ))}

                    {/* ❌ */}
                    {wrongInputs[q.id]?.q && (
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

                  {/* 🟢 ANSWER WORDS */}
                  <Droppable
                    droppableId={`${q.id}-aBank`}
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-3 p-2 border-2 border-dashed rounded-lg w-full mt-3"
                      >
                        {data[q.id].aBank.map((word, index) => (
                          <Draggable
                            key={`${q.id}-a-${word}-${index}`}
                            draggableId={`${q.id}-a-${word}-${index}`}
                            index={index}
                            isDragDisabled={data[q.id].aLine.includes(word)}
                          >
                            {(provided) => (
                              <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`px-3 py-1 border-2 border-blue-800 rounded font-bold text-sm ${
                                  data[q.id].aLine.includes(word)
                                    ? "opacity-40 cursor-not-allowed"
                                    : "cursor-grab"
                                }`}
                              >
                                {word}
                              </span>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* 🟢 ANSWER LINE */}
                  <div className="flex items-center gap-2 mt-2">
                    {data[q.id].aLine.map((word, i) => (
                      <Droppable droppableId={`${q.id}-aLine-${i}`} key={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`w-20 h-10 border-b-4 flex items-center justify-center ${
                              showAnswer || locked
                                ? data[q.id].aLine[i] === q.aWords[i]
                                  ? "border-black"
                                  : "border-red-500"
                                : "border-black"
                            }`}
                          >
                            {word && (
                              <Draggable
                                draggableId={`${q.id}-al-${i}`}
                                index={0}
                              >
                                {(provided) => (
                                  <span
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="font-bold text-blue-800"
                                  >
                                    {word}
                                  </span>
                                )}
                              </Draggable>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}

                    {/* ثابت */}
                    {q.aEnd.map((w, i) => (
                      <span key={i} className="font-semibold">
                        {w}
                      </span>
                    ))}

                    {/* ❌ */}
                    {wrongInputs[q.id]?.a && (
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
                </div>
              ))}
            </div>

            {/* 🟢 RIGHT SIDE (الصورة) */}
            <div className="shrink-0">
              <img
                src={img1}
                alt="house"
                style={{ height: "auto", width: "600px", objectFit: "contain" }}
              />
            </div>
          </div>
          {/* Buttons */}
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit5_Page6_Q2;
