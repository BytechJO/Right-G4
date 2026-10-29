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


// ─────────────────────────────────────────────
//  INPUT FIELD — خارج الـ component لمنع re-create
// ─────────────────────────────────────────────
const InputField = ({ index, answers, errors, locked, showed, onChange, label }) => {
  const isError   = errors[index] === true;
  const isCorrect = errors[index] === false;
  return (
    <div className="relative inline-flex items-center">
      <input {...fieldKeys} aria-label={label} title={label} placeholder="Answer" aria-invalid={isError}
        type="text"
        value={answers[index]}
        onChange={(e) => onChange(index, e.target.value)}
        disabled={locked || isCorrect}
        autoComplete="off"
        style={{
          fontSize: "18px",
          minWidth: "160px",
          borderBottom: `1px solid ${showed||isCorrect?"#16a34a":isError?"#ef4444":"#333"}`,
          background: "transparent",
          outline: "none",
          color: showed ? "#ef4444" : "#1a1a1a",
          padding: "2px 4px",
        }}
      />
      {isError && (
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
  );
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
const ComprehensionA = () => {
  const questions = [
    {
      id: 1,
      after: "learned 12 languages by the time he was seven.",
      answers: ["Asad Ullah Qayyam", "Asad Ullah Qayyam."],
    },
    {
      id: 2,
      after: "started playing the piano when he was four years old.",
      answers: ["Wolfgang Mozart", "Wolfgang Mozart."],
    },
    {
      id: 3,
      before: "The person who graduated at the youngest age in the U.S. was",
      after: ".",
      answers: ["Jay Luo", "Jay Luo."],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors,  setErrors]  = useState({});
  const [locked,  setLocked]  = useState(false);
  const [showed,  setShowed]  = useState(false);

  const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleChange = (index, value) => {
    if (locked || errors[index] === false) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);setErrors(prev=>{const next={...prev};delete next[index];return next;});
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = answers.some((a) => a.trim() === "");
    if (isEmpty) { ValidationAlert.info("Please answer all questions."); return; }

    let correctCount = 0;
    const newErrors = {};
    answers.forEach((ans, i) => {
      const isCorrect = questions[i].answers.some(
        (a) => normalizeAnswer(a) === normalizeAnswer(ans)
      );
      if (isCorrect) { correctCount++; newErrors[i] = false; }
      else           { newErrors[i] = true; }
    });
    setErrors(newErrors);setAnnouncement(`Score: ${correctCount} out of ${questions.length}. Correct answers are locked.`);

    const total = questions.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color}; font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total)  { setLocked(true); resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(msg); }
    else if (correctCount === 0) { ValidationAlert.error(msg); }
    else                         { ValidationAlert.warning(msg); }
  };

  const handleShow = () => {
    setAnswers(questions.map((q) => q.answers[0]));
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers cleared.");
  };

  const inputProps = { answers, errors, locked, showed, onChange: handleChange };

  return (
    <div data-adapt-scope="unit8_ComprehensionA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit8_ComprehensionA"] input:focus-visible, [data-adapt-scope="unit8_ComprehensionA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_ComprehensionA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_ComprehensionA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="unit8_ComprehensionA"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        about the famous people.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Q1 */}
        <div className="flex items-end gap-2 flex-wrap">
          <span style={{ fontWeight: "400", WebkitTextStroke: "1px black", color: "#1a1a1a", fontSize: "16px", minWidth: "18px" }}>1</span>
          <InputField index={0} label={`Question 1. ${questions[0].before || ""} blank ${questions[0].after}`} {...inputProps} />
          <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{questions[0].after}</span>
        </div>

        {/* Q2 */}
        <div className="flex items-end gap-2 flex-wrap">
          <span style={{ fontWeight: "400", WebkitTextStroke: "1px black", color: "#1a1a1a", fontSize: "16px", minWidth: "18px" }}>2</span>
          <InputField index={1} label={`Question 2. ${questions[1].before || ""} blank ${questions[1].after}`} {...inputProps} />
          <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{questions[1].after}</span>
        </div>

        {/* Q3 */}
        <div className="flex items-end gap-2 flex-wrap">
          <span style={{ fontWeight: "400", WebkitTextStroke: "1px black", color: "#1a1a1a", fontSize: "16px", minWidth: "18px" }}>3</span>
          <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{questions[2].before}</span>
          <InputField index={2} label={`Question 3. ${questions[2].before || ""} blank ${questions[2].after}`} {...inputProps} />
          <span style={{ fontSize: "18px", color: "#1a1a1a" }}>.</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <span className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionA;