import ExerciseHeader from "../../ExerciseHeader";
import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys = {
 onKeyDown: (event) => { if (event.key !== "Enter" && event.key !== " ") return; event.preventDefault(); event.stopPropagation(); if (!event.repeat) event.currentTarget.click(); },
 onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); } },
};
const fieldKeys = {
 onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
 onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = value => value.normalize("NFKC").toLowerCase().replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "").replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ").replace(/\s+/g, " ").trim();


const ComprehensionB = () => {
  const questions = [
    {
      before: "Great-grandpa",
      after: "chickens and goats.",
      answers: ["had"],
    },
    {
      before: "There",
      after: "no computers in the 1920s.",
      answers: ["were"],
    },
    {
      before: "My great-grandpa",
      after: "four brothers.",
      answers: ["had"],
    },
    {
      before: "My great-grandpa",
      after: "electricity until he was thirteen.",
      answers: ["didn't have", "did not have"],
    },
    {
      before: "Life",
      after: "very different in the 1920s.",
      answers: ["was"],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (index, value) => {
    if (locked || errors[index] === false) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    setErrors(prev => { const next = {...prev}; delete next[index]; return next; });
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => a.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};
const normalize = normalizeAnswer;;

    answers.forEach((ans, i) => {
      const isCorrect = questions[i].answers.some(
        (a) => normalize(a) === normalize(ans)
      );
      if (isCorrect) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
      }
    });

    setErrors(newErrors);
    setAnnouncement(`Score: ${correctCount} out of ${questions.length}. Correct answers are locked; incorrect answers can be changed.`);

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
      resetButtonRef.current?.focus({preventScroll:true});
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
    resetButtonRef.current?.focus({preventScroll:true});
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  return (
    <div data-unit3-scope="page7_WritingB" className="mb-6 mx-auto">
 <style>{`[data-unit3-scope="page7_WritingB"] input:focus-visible, [data-unit3-scope="page7_WritingB"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
 <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
   <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read and write{" "}
        <span className="text-[#f89631] font-bold">was</span>,{" "}
        <span className="text-[#f89631] font-bold">were</span>,{" "}
        <span className="text-[#f89631] font-bold">had</span>, or{" "}
        <span className="text-[#f89631] font-bold">didn't have</span>.
      </h5>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-end gap-2 flex-wrap" style={{ fontSize: "18px", color: "#1a1a1a" }}>
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                minWidth: "18px",
                fontSize: "20px",
              }}
            >
              {i + 1}
            </span>

            {/* Before */}
            <span>{q.before}</span>

            {/* Input */}
            <div className="relative inline-flex items-center">
              <input {...fieldKeys} aria-label={`Sentence ${i + 1}. ${q.before} blank ${q.after}`} title={`Sentence ${i + 1}. ${q.before} blank ${q.after}`} placeholder="Word(s)"
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={locked || errors[i] === false}
                autoComplete="off"
                style={{ fontSize: "18px", minWidth: "180px" }}
                className={`border-b-1 bg-transparent outline-none px-1 transition disabled:pointer-events-none
                  ${
                    errors[i] === true
                      ? "border-red-500 text-gray-800"
                      : showed || errors[i] === false ? "border-green-600 text-gray-800"
                      : "border-[#333] text-gray-800"
                  }
                `}
              />

              {/* ❌ Error Badge */}
              {errors[i] === true && (
                <div
                  style={{
                    position: "absolute",
                    right: "-24px",
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

            {/* After */}
            <span>{q.after}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
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
          <button type="button" aria-label="Show Answer" {...activationKeys}
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
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{ cursor: locked ? "not-allowed" : "pointer" }}
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

export default ComprehensionB;