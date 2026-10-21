import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

// Normalize comparison only; preserve the learner's original visible answer.
const normalizeAnswer = (value) =>
  value.normalize("NFKC").toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ").trim();

const GrammarB = () => {
  const questions = [
    {
      symbol: "✓",
      pronoun: "she",
      place: "market",
      answers: [
        "She will go to the market.",
        "She will go to the market",
      ],
    },
    {
      symbol: "✗",
      pronoun: "you",
      place: "playground",
      answers: [
        "You won't go to the playground.",
        "You wont go to the playground",
        "You willnot go to the playground.",
        "You will not go to the playground",
        "You won’t go to the playground.",

      ],
    },
    {
      symbol: "✓",
      pronoun: "I",
      place: "swimming pool",
      answers: [
        "I will go to the swimming pool.",
        "I will go to the swimming pool",
      ],
    },
  ];

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
    setErrors((previous) => {
      const next = { ...previous };
      delete next[index];
      return next;
    });
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
      const isCorrect = questions[i].answers.some(
        (a) => normalizeAnswer(a) === normalizeAnswer(ans)
      );
      if (isCorrect) {
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
    setAnswers(questions.map((q) => q.answers[0]));
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
    <div className="grammar-b mb-6 mx-auto">
      <style>{`
        .grammar-b .grammar-answer:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read and write. Write the sentence using{" "}
        <span className="text-[#f89631] font-bold">will</span> or{" "}
        <span className="text-[#f89631] font-bold">won't</span>.
      </h5>

      <div className="flex flex-col gap-5">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                minWidth: "18px",
              }}
            >
              {i + 1}
            </span>

            {/* Symbol ✓ or ✗ */}
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#ff0000ff",
                minWidth: "20px",
              }}
            >
              {q.symbol}
            </span>

            {/* Pronoun */}
            <span className="text-[18px] min-w-[40px]">{q.pronoun}</span>

            {/* Place */}
            <span className="text-[18px] min-w-[100px]">{q.place}</span>

            {/* Input */}
            <div className="relative flex items-center flex-1">
              <input
                style={{ fontSize: "18px" }}
                type="text"
                aria-label={`Question ${i + 1}. ${q.symbol} ${q.pronoun}, ${q.place}. Write a sentence using will or won't.`}
                aria-invalid={errors[i] === true}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") event.stopPropagation();
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") event.stopPropagation();
                }}
                disabled={locked || errors[i] === false}
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                autoComplete="off"
                className={`grammar-answer w-full px-2 py-1 border-b-1 bg-transparent outline-none transition disabled:pointer-events-none
                  ${
                    errors[i] === true
                      ? "border-red-500 text-gray-800"
                      : showed || errors[i] === false
                      ? "border-green-600 text-gray-800"
                      : "border-[#333] text-gray-800"
                  }
                `}
              />

              {/* ❌ Error Badge */}
              {errors[i] === true && (
                <div
                  style={{
                    position: "absolute",
                    right: "-28px",
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

export default GrammarB;