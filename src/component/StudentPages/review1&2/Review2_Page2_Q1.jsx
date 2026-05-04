/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import sound from "../../../assets/audio/ClassBook/Unit 2/P 19/unit2-page19-EXC.mp3";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 15.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

/* ===== البيانات ===== */

const LETTERS = ["a", "e", "i", "o", "u"];

const ITEMS = [
  { id: "q1", word: "toast", img: img1, correct: "o" },
  { id: "q2", word: "bite", img: img2, correct: "i" },
  { id: "q3", word: "five", img: img3, correct: "i" },
  { id: "q4", word: "me", img: img4, correct: "e" },
  { id: "q5", word: "top", img: img5, correct: "o" },

  { id: "q6", word: "cap", img: img6, correct: "a" },
  { id: "q7", word: "cup", img: img7, correct: "u" },
  { id: "q8", word: "bike", img: img8, correct: "i" },
  { id: "q9", word: "cube", img: img9, correct: "u" },
  { id: "q10", word: "kitten", img: img10, correct: "i" },

  { id: "q11", word: "bed", img: img11, correct: "e" },
  { id: "q12", word: "soap", img: img12, correct: "o" },
  { id: "q13", word: "hen", img: img13, correct: "e" },
  { id: "q14", word: "music", img: img14, correct: "u" },
  { id: "q15", word: "boat", img: img15, correct: "o" },
];
const captions = [
  {
    start: 0.179,
    end: 26.52,
    text: "Page 19, review two, exercise C. Listen, read, and write the vowel sound. Toast, bite, five, knee, top, cap, cup, bike, cube, kitten, bed, soap, hen, music, boat",
  },
];
/* ===== draggable ===== */

function DraggableLetter({ item, locked }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item, disabled: locked });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 10px", // 👈 أكبر
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        fontSize: "18px", // 👈 أكبر
        cursor: "grab",
        minWidth: "35px", // 👈 حجم ثابت شوي
      }}
    >
      {item}
    </div>
  );
}

/* ===== drop slot ===== */

function DropSlot({ id, content }) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: "2px solid #F79530", // 🔥 نفس اللون
        borderRadius: "6px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      {content && (
        <span
          style={{
            color: content ? "#1C398E" : "#000",
          }}
        >
          {content}
        </span>
      )}
    </div>
  );
}
/* ===== main ===== */

const Review2_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(
    Object.fromEntries(ITEMS.map((i) => [i.id, null])),
  );
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [locked, setLocked] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
  );

  const checkAnswers = () => {
    if (locked) return;

    if (Object.values(answers).includes(null)) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    const total = ITEMS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);

    setShowResults(true);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, null])));
    setShowResults(false);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (locked) return;
        if (e.over) {
          setAnswers((prev) => ({
            ...prev,
            [e.over.id]: e.active.id,
          }));
        }
        setActiveId(null);
      }}
    >
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
            <span style={{ marginRight: "20px" }}>C</span>
            Listen, read, and write the{" "}
            <span style={{ color: "#2e3192" }}>vowel sound</span>.
          </h5>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={7.6}
          />

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 🔤 البنك */}
              <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100 h-fit w-fit">
                <h3 className="font-bold text-blue-800 mb-4 text-center">
                  Letters
                </h3>

                <div className="flex flex-col gap-3 items-center">
                  <SortableContext items={LETTERS}>
                    {LETTERS.map((l) => (
                      <DraggableLetter key={l} item={l} locked={locked} />
                    ))}
                  </SortableContext>
                </div>
              </div>

              {/* 🧩 الصور */}
              <div className="flex-2 grid grid-cols-5 gap-x-3 gap-y-3">
                {ITEMS.map((item) => (
                  <div key={item.id} style={{ textAlign: "center" }}>
                    {/* 🔥 wrapper للصورة فقط */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      {/* 📦 البوكس مربوط بالصورة */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                          zIndex: 2,
                        }}
                      >
                        <DropSlot
                          id={item.id}
                          content={answers[item.id]}
                          correct={item.correct}
                          isSubmitted={showResults}
                        />
                      </div>

                      {/* 🖼️ الصورة */}
                      <img
                        src={item.img}
                        style={{
                          width: "150px",
                          height: "120px",
                          border: "2px solid #F79530",
                          borderRadius: "10px",
                        }}
                      />
                      {showResults &&
                        answers[item.id] &&
                        answers[item.id] !== item.correct && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "25px",
                              right: "45px", // 🔥 زي المثال اللي بدك
                              zIndex: 10,
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                    </div>

                    {/* 📝 الكلمة */}
                    <div style={{ marginTop: "5px" }}>{item.word}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔴 نفس البوتون */}
            <Button
              handleShowAnswer={() => {
                setAnswers(
                  Object.fromEntries(ITEMS.map((i) => [i.id, i.correct])),
                );
                setShowResults(true);
                setLocked(true);
              }}
              handleStartAgain={handleReset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-3 bg-white border-2 rounded-xl shadow text-xs">
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review2_Page2_Q1;
