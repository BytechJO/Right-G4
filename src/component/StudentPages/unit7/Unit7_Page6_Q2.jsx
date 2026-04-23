import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 63/Ex E 5.svg";

const Unit7_Page6_Q2 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [checked, setChecked] = useState(false);

  const words = ["him", "us", "me", "them", "her"];

  const correctAnswers = {
    1: "him",
    2: "them",
    3: "her",
    4: "us",
    5: "me",
  };
  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
  ];

  const onDragEnd = (result) => {
    if (checked) return; // 🔥 منع التعديل بعد التشيك

    const { destination, draggableId } = result;
    if (!destination) return;

    const inputId = destination.droppableId;

    const word = draggableId.split("-")[0]; // 🔥 ناخذ الكلمة بس

    setUserAnswers((prev) => ({
      ...prev,
      [inputId]: word,
    }));
  };
  const checkAnswers = () => {
    if (checked) return;
    const hasEmpty = questions.some(
      (q) => !userAnswers[q.id] || userAnswers[q.id].trim() === "",
    );

    if (hasEmpty) {
      ValidationAlert.info("كمل كل الفراغات");
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (
        userAnswers[q.id]?.toLowerCase().trim() ===
        correctAnswers[q.id]?.toLowerCase()
      ) {
        score++;
      }
    });

    setChecked(true);

    const total = questions.length;
    ValidationAlert[
      score === total
        ? "success"
        : score === 0
          ? "error"
          : "warning"
    ](`
        Score: ${score} / ${total}
  `);
  };
  const handleShowAnswer = () => {
    const answers = {};
    questions.forEach((q) => {
      answers[q.id] = correctAnswers[q.id];
    });

    setUserAnswers(answers);
    setChecked(true);
  };
  const handleStartAgain = () => {
    setUserAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "" });
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
              E
            </span>
            Look and write. Use the words below.
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

          {/* الصور - صف واحد 5 صور */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "10px",
            }}
          >
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  borderRadius: "10px",
                  padding: "6px",
                  textAlign: "center",
                }}
              >
                {/* رقم السؤال */}
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "left",
                    marginBottom: "4px",
                    color: "#333",
                  }}
                >
                  {q.id}
                </div>

                <img
                  src={q.image}
                  alt={`q${q.id}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />

                <Droppable droppableId={String(q.id)}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        position: "relative",
                        marginTop: "6px",
                        borderBottom: checked
                          ? userAnswers[q.id]?.toLowerCase().trim() ===
                            correctAnswers[q.id]?.toLowerCase()
                            ? "2px solid black"
                            : "2px solid red"
                          : "2px solid black",
                        minHeight: "26px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "18px",
                      }}
                    >
                      <span style={{ color: "#2c5287", fontWeight: "bold" }}>
                        {" "}
                        {userAnswers[q.id]}
                      </span>
                      {checked &&
                        userAnswers[q.id] !== correctAnswers[q.id] && (
                          <span
                            style={{
                              position: "absolute",
                              left: "80%",
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
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
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

export default Unit7_Page6_Q2;
