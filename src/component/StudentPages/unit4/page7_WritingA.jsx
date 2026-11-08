import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


const WritingA = () => {
  const questions = [
    {
      id: "crust",
      before: "The crust",
      answers: [
        "is the outer layer and can be up to 44 miles thick",
        "is the outer layer and can be up to 44 miles thick.",
      ],
    },
    {
      id: "mantle",
      before: "The middle layer is the mantle, and it",
      answers: [
        "is the thickest",
        "is the thickest.",
      ],
    },
    {
      id: "core",
      before: "Finally, the core",
      answers: [
        "is the layer farthest into the earth, and it is very dense",
        "is the layer farthest into the earth, and it is very dense.",
      ],
    },
  ];

  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const [announcement,setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const handleChange = (id, value) => {
    if (locked || errors[id] === false) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors(prev=>{const next={...prev};delete next[id];return next;});
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => answers[q.id].trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      const isCorrect = q.answers.some(
        (a) => normalizeAnswer(a) === normalizeAnswer(answers[q.id])
      );
      if (isCorrect) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
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
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, q.answers[0]])));
    setErrors({});
    setLocked(true);
    setShowed(true);
    resetButtonRef.current?.focus({preventScroll:true});
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setErrors({});
    setLocked(false);
    setShowed(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  return (
    <div data-adapt-scope="unit4_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit4_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit4_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_page7_WritingA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Help write a report by finishing the sentences.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Static sentence */}
        <p style={{ fontSize: "18px", color: "#1a1a1a" }}>
          Our Earth is very thick and has many layers.
        </p>

        {questions.map((q) => (
          <div key={q.id} className="flex items-end gap-2">
            <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
              {q.before}
            </span>

            <div className="relative flex-1">
              <input {...fieldKeys} aria-label={`Complete the sentence: ${q.before}`} title={`Complete the sentence: ${q.before}`} placeholder="Answer" aria-invalid={errors[q.id] === true}
                type="text"
                value={answers[q.id]}
                onChange={(e) => handleChange(q.id, e.target.value)}
                disabled={locked || errors[q.id] === false}
                autoComplete="off"
                style={{...({
                  width: "100%",
                  fontSize: "18px",
                  borderBottom: `1px solid ${errors[q.id] === true ? "#ef4444" : "#333"}`,
                  background: "transparent",
                  outline: "none",
                  color: showed ? "#ef4444" : "#1a1a1a",
                  padding: "2px 4px",
                }),borderBottomColor:showed || errors[q.id] === false ? "#16a34a" : errors[q.id] === true ? "#ef4444" : ({
                  width: "100%",
                  fontSize: "18px",
                  borderBottom: `1px solid ${errors[q.id] === true ? "#ef4444" : "#333"}`,
                  background: "transparent",
                  outline: "none",
                  color: showed ? "#ef4444" : "#1a1a1a",
                  padding: "2px 4px",
                }).borderBottomColor}}
              />

              {/* ❌ Error Badge */}
              {errors[q.id] === true && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
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

            <span style={{ fontSize: "18px", color: "#1a1a1a" }}>.</span>
          </div>
        ))}

        {/* Static sentence */}
        <p style={{ fontSize: "18px", color: "#1a1a1a" }}>
          The inside of the Earth is very different than the ground we walk on!
        </p>
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
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
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

export default WritingA;