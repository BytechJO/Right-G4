import { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Unit7_Page6_Q1 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [checked, setChecked] = useState(false);

  const words = ["them", "it", "you", "her", "us"];

  const correctAnswers = {
    1: "it",
    2: "her",
    3: "them",
    4: "them",
    5: "you",
    6: "us",
  };

  const questions = [
    {
      parts: [
        { type: "text", value: "1. Look! There's a car. Can you see " },
        { type: "blank", id: "1" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "2. There's Mom. Can you see" },
        { type: "blank", id: "2" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "3. There are crayons. Can you see" },
        { type: "blank", id: "3" },
        { type: "text", value: " ?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "4. There are two dogs. Can you see" },
        { type: "blank", id: "4" },
        { type: "text", value: "?" },
      ],
    },
    {
      parts: [
        { type: "text", value: "5. There you are. i can see " },
        { type: "blank", id: "5" },
        { type: "text", value: "!" },
      ],
    },
    {
      parts: [
        { type: "text", value: "6. Here we are. can you see ? " },
        { type: "blank", id: "6" },
        { type: "text", value: "?" },
      ],
    },
  ];

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const inputId = destination.droppableId;

    const word = draggableId.split("-")[0]; // 🔥 الحل

    setUserAnswers((prev) => ({
      ...prev,
      [inputId]: word,
    }));
  };

  const checkAnswers = () => {
    if (checked) return;

    const hasEmptyInputs = Object.keys(correctAnswers).some(
      (id) => !userAnswers[id] || userAnswers[id].trim() === "",
    );

    if (hasEmptyInputs) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let currentScore = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach((id) => {
      const userAnswer = userAnswers[id]?.toLowerCase().trim();
      const correctAnswer = correctAnswers[id].toLowerCase();

      if (userAnswer === correctAnswer) currentScore++;
    });

    setChecked(true);

     ValidationAlert[
      currentScore === totalQuestions ? "success" : currentScore === 0 ? "error" : "warning"
    ](`
        Score: ${currentScore} / ${totalQuestions}
  `);
  };

  const handleShowAnswer = () => {
    setUserAnswers({ ...correctAnswers });
    setChecked(true);
  };
  const handleStartAgain = () => {
    setUserAnswers({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    });

    setChecked(false);
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
        <div className="div-forall">
          <h5 className="header-title-page8 pb-2.5">
            <span
              className="ex-A"
              style={{ marginRight: "10px", marginBottom: 7 }}
            >
              D
            </span>
            Read and complete.
          </h5>

          {/* الكلمات */}
          <Droppable droppableId="words" direction="horizontal">
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
                  width: "100%",
                  marginBottom: "20px",
                  // justifyContent: "center",
                }}
              >
                {words.map((word, index) => {
                  return (
                    <Draggable
                      key={`${word}-${index}`}
                      draggableId={`${word}-${index}`}
                      index={index}
                      isDragDisabled={checked} // بس بعد التشيك
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
                            cursor: checked ? "not-allowed" : "grab",
                            fontSize: "16px",

                            opacity: provided.snapshot?.isDragging ? 0.6 : 1, // 🔥 بس وقت السحب

                            ...provided.draggableProps.style,
                          }}
                        >
                          {word}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* الأسئلة الديناميكية */}
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-4 text-xl">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex items-center gap-2 flex-wrap">
                {q.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={i}>{part.value}</span>;
                  }

                  return (
                    <Droppable key={i} droppableId={part.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`relative border-b-2 w-30 text-center min-h-[30px] ${
                            snapshot.isDraggingOver ? "bg-yellow-100" : ""
                          } ${
                            checked &&
                            userAnswers[part.id] &&
                            userAnswers[part.id].toLowerCase().trim() !==
                              correctAnswers[part.id].toLowerCase()
                              ? "border-red-500"
                              : "border-black"
                          }`}
                        >
                          {checked &&
                            userAnswers[part.id] &&
                            userAnswers[part.id].toLowerCase().trim() !==
                              correctAnswers[part.id].toLowerCase() && (
                              <span
                                style={{
                                  position: "absolute",
                                  left: "120%",
                                  top: "50%",
                                  transform: "translateY(-50%)",
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
                          <span
                            style={{ color: "#2c5287", fontWeight: "bold" }}
                          >
                            {" "}
                            {userAnswers[part.id]}
                          </span>

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            ))}
          </div>

          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit7_Page6_Q1;
