import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const ComprehensionA = () => {
  const questions = [
    "The Museum of Future Inventions opened long ago.",
    "The museum will show ideas of future technology.",
    "All the museum displays will be the ideas of scientists only.",
    "There will be a room like a library of the future.",
  ];

  const correctAnswers = ["False", "True", "False", "True"];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);
  const resetButtonRef = useRef(null);

  const handleChange = (index, value) => {
    if (locked || errors[index] === false) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => a.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    answers.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === correctAnswers[i].toLowerCase()) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
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
    setAnswers(correctAnswers);
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  const buttonKeys = {
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

  return (
    <div className="comprehension-a mb-6 mx-auto">
      <style>{`
        .comprehension-a .comprehension-answer:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Read and write <span className="text-[#f89631] font-bold">true</span> or{" "}
        <span className="text-[#f89631] font-bold">false</span>.
      </h5>

      <div className="flex flex-col gap-3">
        {questions.map((q, i) => (
          <div key={i} className="flex gap-2 items-center justify-between gap-4">
            <span className="text-[18px]">
                  <span
              style={{
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                minWidth: "18px",
              }}
            >
              {i + 1}
            </span> {q}
            </span>

            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                aria-label={`Question ${i + 1}. ${q} Enter true or false.`}
                      title={`Question ${i + 1}. ${q} Enter true or false.`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") event.stopPropagation();
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") event.stopPropagation();
                }}
                disabled={locked || errors[i] === false}
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="True / False"
                autoComplete="off"
                className={`comprehension-answer w-[110px] px-4 py-1 rounded-full border-2 text-sm font-semibold text-center outline-none transition
                  ${
                    errors[i] === true
                      ? "border-red-400 bg-white text-gray-800"
                      : showed
                      ? "border-[#2195a6] bg-white text-red-500"
                      : "border-[#2195a6] bg-white text-gray-800 focus:border-[#2195a6]"
                  }
                  disabled:pointer-events-none
                `}
              />

              {/* ❌ Error Badge - غلط فقط */}
              {errors[i] === true && (
                <div
                  style={{
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
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...buttonKeys} ref={resetButtonRef}
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
          <button type="button" aria-label="Show Answer" {...buttonKeys}
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
          <button type="button" aria-label="Check Answer" {...buttonKeys} disabled={locked} style={{ cursor: locked ? "not-allowed" : "pointer" }}
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

export default ComprehensionA;