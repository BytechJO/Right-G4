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

import imgShower from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 1.svg";
import imgBike from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 2.svg";
import imgSoccer from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 3.svg";
import imgFlowers from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex B 4.svg";
import WrongMark from "../../WrongMark";

const ACTIVITIES = [
  { id: "act4", text: "take a taxi." },
  { id: "act1", text: "take the subway." },
  { id: "act3", text: "take a bus." },
  { id: "act2", text: "ride a bike." },
];

const CORRECT_ANSWERS = {
  q1: "act1",
  q2: "act2",
  q3: "act3",
  q4: "act4",
};

function DraggableActivity({ item, isUsed }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isUsed ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...attributes}
      {...listeners}
      className={`p-2 bg-white border-2 border-gray-200 rounded-xl shadow-sm cursor-grab text-blue-700 font-medium text-xs text-center ${isUsed ? "bg-gray-50 text-gray-300 pointer-events-none" : "hover:border-blue-400 hover:shadow-md transition-all"}`}
    >
      {item.text}
    </div>
  );
}

function DropSlot({ id, content, isCorrect, isSubmitted }) {
  const { setNodeRef, isOver } = useSortable({ id });
  const borderColor = isSubmitted
    ? isCorrect
      ? "border-black"
      : "border-red-500"
    : isOver
      ? "border-blue-400 bg-blue-50"
      : "border-black";
  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-10 border-b-2 flex items-center justify-center px-2 transition-all ${borderColor}`}
    >
      {content ? (
        <div className="relative flex items-center justify-center">
          <span className="text-blue-900 font-bold text-sm text-center">
            {ACTIVITIES.find((a) => a.id === content).text}
          </span>

          {/* ❌ إذا الجواب غلط */}
          {isSubmitted && !isCorrect && (
            <div className="absolute -right-4">
              <WrongMark />
            </div>
          )}
        </div>
      ) : (
        <span className="text-gray-300 italic text-xs">
          Drop answer here...
        </span>
      )}
    </div>
  );
}

const Unit2_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null,
  });
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [locked, setLocked] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor),
  );

  const checkAnswers = () => {
    if (locked) return;

    const unanswered = Object.keys(CORRECT_ANSWERS).filter(
      (id) => !answers[id],
    );
    if (unanswered.length > 0) {
      ValidationAlert.info();
      return;
    }
    setShowResults(true);
    let score = 0;
    let total = Object.keys(CORRECT_ANSWERS).length;
    Object.keys(CORRECT_ANSWERS).forEach((id) => {
      if (answers[id] === CORRECT_ANSWERS[id]) score++;
    });
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleReset = () => {
    setAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
    });
    setShowResults(false);
    setLocked(false);
  };

  const QUESTIONS = [
    { id: "q1", img: imgShower },
    { id: "q2", img: imgBike },
    { id: "q3", img: imgSoccer },
    { id: "q4", img: imgFlowers },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (e.over)
          setAnswers((prev) => ({ ...prev, [e.over.id]: e.active.id }));
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
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              B
            </span>
            Look, read, and write. Use the words below.
          </h5>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-blue-50 p-5 rounded-2xl border-2 border-blue-100 h-fit sticky top-4">
              <h3 className="font-bold text-blue-800 mb-4 text-center">
                Activities Bank
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <SortableContext items={ACTIVITIES.map((a) => a.id)}>
                  {ACTIVITIES.map((act) => (
                    <DraggableActivity
                      key={act.id}
                      item={act}
                      isUsed={Object.values(answers).includes(act.id)}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>

            <div className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-3">
                  <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 flex justify-center">
                    <img
                      src={q.img}
                      alt="activity"
                      className="max-h-32 object-contain rounded-lg"
                    />
                  </div>
                  <DropSlot
                    id={q.id}
                    content={answers[q.id]}
                    isCorrect={answers[q.id] === CORRECT_ANSWERS[q.id]}
                    isSubmitted={showResults}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            handleShowAnswer={() => {
              setAnswers(CORRECT_ANSWERS);
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
          <div className="p-3 bg-white border-2 border-blue-500 rounded-xl shadow-2xl text-blue-700 font-bold text-xs scale-105">
            {ACTIVITIES.find((a) => a.id === activeId).text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page5_Q3;
