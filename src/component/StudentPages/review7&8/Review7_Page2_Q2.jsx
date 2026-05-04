import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 6.svg";
import blue from "../../../assets/audio/ClassBook/Unit 8/P 71/unit8-pg71-EXD.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Review7_Page2_Q2 = () => {
  const [userAnswers, setUserAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [locked, setLocked] = useState(false);

  const [checked, setChecked] = useState(false);

  const words = ["s", "v", "w", "b", "m", "d"];
  const captions = [
    { start: 0.119, end: 3.439, text: "Page 71, review seven, exercise D." },
    {
      start: 4.44,
      end: 16.219,
      text: "What is the beginning sound of the word? Listen and write. One, milkshake. Two, bike. Three, duck. Four,",
    },
    { start: 17.299, end: 23.159, text: "van. Five, star. Six, wheel" },
  ];
  const correctAnswers = {
    1: "m",
    2: "b",
    3: "d",
    4: "v",
    5: "s",
    6: "w",
  };

  const questions = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
  ];

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    setUserAnswers((prev) => ({
      ...prev,
      [destination.droppableId]: draggableId.split("-")[0],
    }));
  };
  const showAnswer = () => {
    setUserAnswers(correctAnswers);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    const empty = Object.values(userAnswers).some((v) => !v?.trim());
    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    Object.keys(correctAnswers).forEach((id) => {
      if (
        userAnswers[id]?.toLowerCase().trim() ===
        correctAnswers[id].toLowerCase()
      ) {
        score++;
      }
    });

    const total = Object.keys(correctAnswers).length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    setChecked(true);
    setLocked(true);

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
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
    setLocked(false);
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
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "60%",
          }}
        >
          <div>
            <h5 className="header-title-page8">
              <span style={{ marginRight: "10px" }}>D</span> What is the{" "}
              <span style={{ color: "#2e3192" }}>beginning sound</span> of the
              word? Listen and write.
            </h5>
          </div>

          <QuestionAudioPlayer
            src={blue}
            captions={captions}
            stopAtSecond={8.5}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "900px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
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
                      justifyContent: "center",
                      width: "100%",
                      marginBottom: "10px",
                      // justifyContent: "center",
                    }}
                  >
                    {words.map((word, index) => {
                      const usedCount = Object.values(userAnswers).filter(
                        (v) => v === word,
                      ).length;

                      const totalCount = words.filter((w) => w === word).length;

                      const isUsed = usedCount >= totalCount;
                      return (
                        <Draggable
                          key={`${word}-${index}`}
                          draggableId={`${word}-${index}`}
                          index={index}
                          isDragDisabled={checked || isUsed}
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
                                cursor: isUsed ? "not-allowed" : "grab",
                                fontSize: "16px",
                                opacity: isUsed ? 0.4 : 1, // 🔥 تخفيف اللون
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

              {/* الأسئلة بالصور */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                }}
              >
                {questions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      padding: "6px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        zIndex: 2,
                      }}
                    >
                      {q.id}
                    </div>
                    <img
                      src={q.image}
                      alt={`q${q.id}`}
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "contain",
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
                            borderBottom: `2px solid ${
                              checked &&
                              userAnswers[q.id] !== correctAnswers[q.id]
                                ? "red"
                                : "#000"
                            }`,
                            minHeight: "28px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            color: "#1C398E",
                            fontWeight: "bold",
                          }}
                        >
                          {userAnswers[q.id]}

                          {checked &&
                            userAnswers[q.id] !== correctAnswers[q.id] && (
                              <span
                                style={{
                                  position: "absolute",
                                  left: "25%",
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
                handleShowAnswer={showAnswer}
                handleStartAgain={handleStartAgain}
                checkAnswers={checkAnswers}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review7_Page2_Q2;
