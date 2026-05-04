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
import sound from "../../../assets/audio/ClassBook/Unit 8/P 73/unit8-pg73-EXC.mp3";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 15.svg";
import img16 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 16.svg";
import img17 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 17.svg";
import img18 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 18.svg";
import img19 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 19.svg";
import img20 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 20.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

/* ===== البيانات ===== */

const LETTERS = [
  "j",
  "v",
  "w",
  "c",
  "y",
  "n",
  "k",
  "b",
  "m",
  "f",
  "x",
  "e",
  "s",
  "z",
  "t",
  "h",
  "a",
  "d",
];
const ITEMS = [
  { id: "q1", word: "January", img: img1, correct: "j" },
  { id: "q2", word: "van", img: img2, correct: "v" },
  { id: "q3", word: "wagon", img: img3, correct: "w" },
  { id: "q4", word: "cat", img: img4, correct: "c" },
  { id: "q5", word: "yo-yo", img: img5, correct: "y" },

  { id: "q6", word: "jeep", img: img6, correct: "j" },
  { id: "q7", word: "nine", img: img7, correct: "n" },
  { id: "q8", word: "kite", img: img8, correct: "k" },
  { id: "q9", word: "bubbles", img: img9, correct: "b" },
  { id: "q10", word: "moon", img: img10, correct: "m" },

  { id: "q11", word: "food", img: img11, correct: "f" },
  { id: "q12", word: "book", img: img12, correct: "b" },
  { id: "q13", word: "x-ray", img: img13, correct: "x" },
  { id: "q14", word: "elephant", img: img14, correct: "e" },
  { id: "q15", word: "snail", img: img15, correct: "s" },

  { id: "q16", word: "zebra", img: img16, correct: "z" },
  { id: "q17", word: "tomato", img: img17, correct: "t" },
  { id: "q18", word: "house", img: img18, correct: "h" },
  { id: "q19", word: "apple", img: img19, correct: "a" },
  { id: "q20", word: "dog", img: img20, correct: "d" },
];
const captions = [
  {
    start: 0.099,
    end: 24.739,
    text: "Page 73, review eight, exercise C. Listen and write the beginning sound for each word. Calendar, van, wagon, cat, yo-yo, jeep, nine, kite, bubbles, moon, fries, book,",
  },
  {
    start: 25.899,
    end: 36.22,
    text: "X-ray, elephant, snail, zebra, tomatoes, house, apple, dog",
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
        padding: "6px 10px",
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "grab",
        minWidth: "35px",
        touchAction: "none", // مهم جدا
        userSelect: "none",
        WebkitUserSelect: "none",
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

const Review8_Page2_Q1 = () => {
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
            Listen and write the{" "}
            <span style={{ color: "#2e3192" }}> beginning sound</span> for each
            word.
          </h5>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={8}
          />

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            {/* 🔤 البنك */}
            <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                <SortableContext items={LETTERS}>
                  {LETTERS.map((l) => (
                    <DraggableLetter key={l} item={l} locked={locked} />
                  ))}
                </SortableContext>
              </div>
            </div>

            {/* 🧩 الصور */}
            <div className="grid grid-cols-5 gap-x-3 gap-y-3">
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

export default Review8_Page2_Q1;
