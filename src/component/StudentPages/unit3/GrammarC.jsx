import ExerciseHeader from "../../ExerciseHeader";
import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 11.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const GrammarC = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      options: [
        { text: "She had a boat.", correct: false },
        { text: "She had a bunny.", correct: true },
      ],
    },
    {
      id: 2,
      image: img2,
      options: [
        { text: "He had a bike.", correct: true },
        { text: "He had a dog.", correct: false },
      ],
    },
    {
      id: 3,
      image: img3,
      options: [
        { text: "She had a cat.", correct: false },
        { text: "She had a doll.", correct: true },
      ],
    },
    {
      id: 4,
      image: img4,
      options: [
        { text: "He had a laptop.", correct: true },
        { text: "He had a book.", correct: false },
      ],
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null])),
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const handleSelect = (qId, optIndex) => {
    if (locked || errors[qId] === false) return;
    setSelected((prev) => ({ ...prev, [qId]: optIndex }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = questions.some((q) => selected[q.id] === null);
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      const selectedOpt = q.options[selected[q.id]];
      if (selectedOpt?.correct) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
      }
    });

    setErrors(newErrors);
    setAnnouncement(
      `Score: ${correctCount} out of ${questions.length}. Correct answers are locked; incorrect answers can be changed.`,
    );

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
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const correct = {};
    questions.forEach((q) => {
      correct[q.id] = q.options.findIndex((o) => o.correct);
    });
    setSelected(correct);
    setErrors({});
    setLocked(true);
    setShowed(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setErrors({});
    setLocked(false);
    setShowed(false);
    setAnnouncement("Selections and feedback cleared.");
  };

  return (
    <div data-unit3-scope="GrammarC" className="mb-6 mx-auto">
      <style>{`[data-unit3-scope="GrammarC"] input:focus-visible, [data-unit3-scope="GrammarC"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Look, read, and write ✓.
      </h5>

      <div className="grid grid-cols-2 gap-8">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                fontSize: "18px",
                minWidth: "18px",
                alignSelf: "flex-start",
              }}
            >
              {q.id}
            </span>

            {/* Image */}
            <img
              src={q.image}
              alt={
                [
                  "A girl holding a white rabbit.",
                  "A boy riding a bicycle.",
                  "A girl holding a doll.",
                  "A boy using a laptop at a desk.",
                ][q.id - 1]
              }
              style={{
                width: "25%",
                height: "auto",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* Options */}
            <div className="flex flex-col gap-3 flex-1">
              {q.options.map((opt, optIndex) => {
                const isSelected = selected[q.id] === optIndex;
                const isWrong = errors[q.id] === true && isSelected;

                return (
                  <div
                    role="button"
                    tabIndex={0}
                    data-keyboard-choice
                    {...activationKeys}
                    aria-label={`Question ${q.id}. ${opt.text}${locked || errors[q.id] === false ? ". Locked" : ""}`}
                    aria-pressed={isSelected}
                    aria-disabled={locked || errors[q.id] === false}
                    style={{
                      borderRadius: "6px",
                      background:
                        isSelected && !showed && errors[q.id] === undefined
                          ? "#dbeafe"
                          : undefined,
                      boxShadow: isSelected
                        ? `inset 0 0 0 2px ${showed || errors[q.id] === false ? "#16a34a" : errors[q.id] === true ? "#ef4444" : "#2563eb"}`
                        : undefined,
                    }}
                    key={optIndex}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleSelect(q.id, optIndex)}
                  >
                    <span
                      style={{ fontSize: "15px", color: "#1a1a1a", flex: 1 }}
                    >
                      {opt.text}
                    </span>

                    {/* Checkbox */}
                    <div className="relative" style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "6px",
                          border: "2px solid #2195a6",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* Checkmark */}
                        {isSelected && (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                          >
                            <polyline
                              points="4,12 9,18 20,6"
                              stroke="#ff0000ff"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      {/* ❌ Error Badge */}
                      {isWrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "18px",
                            height: "18px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        <div className="relative group">
          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;
