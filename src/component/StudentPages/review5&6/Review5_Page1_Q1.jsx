import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 6.svg";

const Review5_Page1_Q1 = () => {
  const objectsBank = [
    "ball",
    "sink",
    "book",
    "fruit",
    "car",
    "washing machine",
  ];

  const roomsBank = [
    "bathroom",
    "garage",
    "kitchen",
    "bedroom",
    "living room",
    "basement",
  ];

  const questions = [
    { id: 1, img: imgA, object: "ball", correct: "bedroom" },
    { id: 2, img: imgB, object: "sink", correct: "bathroom" },
    { id: 3, img: imgC, object: "book", correct: "living room" },
    { id: 4, img: imgD, object: "fruit", correct: "kitchen" },
    { id: 5, img: imgE, object: "car", correct: "garage" },
    { id: 6, img: imgF, object: "washing machine", correct: "basement" },
  ];
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [objectAnswers, setObjectAnswers] = useState({});
  const [roomAnswers, setRoomAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const draggableId = result.draggableId;
    const droppableId = result.destination.droppableId;

    const isObject = draggableId.startsWith("obj-");
    const isRoom = draggableId.startsWith("room-");

    // ❌ منع وضع object في مكان room
    if (droppableId.startsWith("room-") && !isRoom) return;

    // ❌ منع وضع room في مكان object
    if (droppableId.startsWith("object-") && !isObject) return;

    // 👇 كمل الكود تبعك زي ما هو
    if (droppableId.startsWith("object-")) {
      const id = droppableId.split("-")[1];
      const value = draggableId.replace("obj-", "");

      const existingKey = Object.keys(objectAnswers).find(
        (key) => objectAnswers[key] === value,
      );

      if (existingKey) {
        setObjectAnswers((prev) => {
          const newState = { ...prev };
          delete newState[existingKey];
          return newState;
        });
      }

      setObjectAnswers((prev) => ({
        ...prev,
        [id]: value,
      }));
    } else if (droppableId.startsWith("room-")) {
      const id = droppableId.split("-")[1];
      const value = draggableId.replace("room-", "");

      const existingKey = Object.keys(roomAnswers).find(
        (key) => roomAnswers[key] === value,
      );

      if (existingKey) {
        setRoomAnswers((prev) => {
          const newState = { ...prev };
          delete newState[existingKey];
          return newState;
        });
      }

      setRoomAnswers((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const reset = () => {
    setObjectAnswers({});
    setRoomAnswers({});
    setLocked(false);
  };

  const showAnswers = () => {
    const filledObjects = {};
    const filledRooms = {};
    questions.forEach((q) => {
      filledObjects[q.id] = q.object;
      filledRooms[q.id] = q.correct;
    });
    setObjectAnswers(filledObjects);
    setRoomAnswers(filledRooms);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const emptyObjects = questions.some((q) => !objectAnswers[q.id]);
    const emptyRooms = questions.some((q) => !roomAnswers[q.id]);

    if (emptyObjects || emptyRooms) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    const wrong = {};

    questions.forEach((q) => {
      const isCorrect =
        objectAnswers[q.id] === q.object && roomAnswers[q.id] === q.correct;

      if (!isCorrect) {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);
    let correct = 0;

    questions.forEach((q) => {
      if (objectAnswers[q.id] === q.object && roomAnswers[q.id] === q.correct) {
        correct++;
      }
    });

    const total = questions.length;

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <b>Score: ${correct} / ${total}</b>
      </div>
    `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };

  const getUsedObjects = () => Object.values(objectAnswers);
  const getUsedRooms = () => Object.values(roomAnswers);

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
            <span style={{ marginRight: "10px" }}>A</span>
            Read, look, and write. Use the words below.
          </h5>

          <div className="w-full mx-auto">
            {/* OBJECTS BANK */}
            <Droppable droppableId="objects-bank" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "10px",
                    border: "2px dashed #2c5287",
                    borderRadius: "10px",
                    marginTop: "20px",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {objectsBank
                    .filter((a) => !getUsedObjects().includes(a))
                    .map((a, index) => (
                      <Draggable
                        key={a}
                        draggableId={`obj-${a}`}
                        index={index}
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
                              fontSize: "16px",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {a}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* ROOMS BANK */}
            <Droppable droppableId="rooms-bank" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "10px",
                    border: "2px dashed #38a169",
                    borderRadius: "10px",
                    marginTop: "10px",
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {roomsBank
                    .filter((a) => !getUsedRooms().includes(a))
                    .map((a, index) => (
                      <Draggable
                        key={a}
                        draggableId={`room-${a}`}
                        index={index}
                        isDragDisabled={locked}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: "7px 14px",
                              border: "2px solid #38a169",
                              borderRadius: "8px",
                              background: "white",
                              fontWeight: "bold",
                              cursor: "grab",
                              fontSize: "16px",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {a}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* QUESTIONS GRID */}
            <div className="grid grid-cols-3 gap-10 mb-20">
              {questions.map((q) => (
                <div key={q.id} className="flex flex-col items-start">
                  {/* الرقم + الصورة */}
                  <div className="flex gap-2 items-start">
                    <span className="font-bold text-lg">{q.id}</span>
                    <img
                      src={q.img}
                      style={{
                        height: "120px",
                        border: "2px solid orange",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  {/* سؤال: Where is the [object]? */}
                  <Droppable droppableId={`object-${q.id}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          width: "270px",
                          borderBottom: "2px solid black",
                          minHeight: "35px",
                          marginTop: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "5px" }}>Where is the</span>

                        {objectAnswers[q.id] ? (
                          <Draggable
                            draggableId={`obj-${objectAnswers[q.id]}`}
                            index={0}
                            isDragDisabled={locked}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                              >
                                <div style={{ position: "relative" }}>
                                  <span className="text-[#1C398E] font-semibold">
                                    {objectAnswers[q.id]}
                                  </span>

                                  {locked && wrongAnswers[q.id] && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "-20px",
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
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ) : (
                          // 👇 البوكس الفاضي
                          <div
                            style={{
                              width: "60px",
                              height: "26px",
                              border: "2px dashed #aaa",
                              borderRadius: "6px",
                              margin: "0 6px",
                            }}
                          />
                        )}

                        <span style={{ marginLeft: "5px" }}>.</span>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* جواب: It's in the [room]. */}
                  <Droppable droppableId={`room-${q.id}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          width: "270px",
                          borderBottom: "2px solid black",
                          minHeight: "35px",
                          marginTop: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "5px" }}>It's in the</span>

                        {roomAnswers[q.id] ? (
                          <Draggable
                            draggableId={`room-${roomAnswers[q.id]}`}
                            index={0}
                            isDragDisabled={locked}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                              >
                                <div style={{ position: "relative" }}>
                                  <span className="text-[#1C398E] font-semibold">
                                    {roomAnswers[q.id]}
                                  </span>

                                  {locked && wrongAnswers[q.id] && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "-20px",
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
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ) : (
                          <div
                            style={{
                              width: "60px",
                              height: "26px",
                              border: "2px dashed #aaa",
                              borderRadius: "6px",
                              margin: "0 6px",
                            }}
                          />
                        )}

                        <span style={{ marginLeft: "5px" }}>.</span>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="action-buttons-container mt-10">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
            <button
              onClick={showAnswers}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review5_Page1_Q1;
