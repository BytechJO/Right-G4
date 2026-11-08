import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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



// ✅ InputField خارج GrammarB تماماً لمنع إعادة الإنشاء مع كل render
const InputField = ({ q, index, answers, errors, locked, showed, handleChange }) => {
  const isError = errors[index] === true;
  const isCorrect = errors[index] === false;

  return (
    <div className="relative inline-flex items-center">
      <input {...fieldKeys} aria-label={`Question ${q.id}. ${q.symbol==="✓"?"Positive":"Negative"}: ${q.before} blank ${q.after}`} title={`Question ${q.id}. ${q.symbol==="✓"?"Positive":"Negative"}: ${q.before} blank ${q.after}`} placeholder="Your answer" aria-invalid={errors[index]===true}
        type="text"
        value={answers[index]}
        onChange={(e) => handleChange(index, e.target.value)}
        disabled={locked || isCorrect}
        autoComplete="off"
        style={{...({
          fontSize: "18px",
          width: "90px",
          borderBottom: `1px solid ${isError ? "#ef4444" : "#333"}`,
          background: "transparent",
          outline: "none",
          color: showed ? "#ef4444" : "#1a1a1a",
          textAlign: "center",
        }),color:"#1a1a1a",boxShadow:showed||errors[index]===false?"inset 0 -2px #16a34a":errors[index]===true?"inset 0 -2px #ef4444":undefined,borderBottomColor:showed||errors[index]===false?"#16a34a":errors[index]===true?"#ef4444":undefined}}
      />
      {isError && (
        <div
          style={{
            position: "absolute",
            right: "-22px",
            width: "16px",
            height: "16px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

// ✅ QuestionRow خارج GrammarB أيضاً
const QuestionRow = ({ q, index, answers, errors, locked, showed, handleChange }) => (
  <div
    className="flex items-center gap-2 flex-wrap"
    style={{ fontSize: "18px", color: "#1a1a1a" }}
  >
    <span
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        minWidth: "16px",
        color: "#ff0000ff",
      }}
    >
      {q.symbol}
    </span>
    <span style={{ fontWeight: "700", minWidth: "18px", WebkitTextStroke: "0.5px black" }}>
      {q.id}
    </span>
    <span>{q.before}</span>
    <InputField q={q}
      index={index}
      answers={answers}
      errors={errors}
      locked={locked}
      showed={showed}
      handleChange={handleChange}
    />
    <span>{q.after}</span>
  </div>
);

const GrammarB = () => {
  const questions = [
    { id: 1, symbol: "✓", before: "She",  after: "been to the park.",       answers: ["has"] },
    { id: 2, symbol: "✗", before: "He",   after: "gone fishing.",            answers: ["hasn't", "has not"] },
    { id: 3, symbol: "✗", before: "They", after: "walked over the bridge.",  answers: ["haven't", "have not"] },
    { id: 4, symbol: "✓", before: "We",   after: "been skiing.",             answers: ["have"] },
    { id: 5, symbol: "✓", before: "We",   after: "found the lost backpack.", answers: ["have"] },
    { id: 6, symbol: "✗", before: "You",  after: "made your bed.",           answers: ["haven't", "have not"] },
    { id: 7, symbol: "✗", before: "I",    after: "been to Canada before.",   answers: ["haven't", "have not"] },
    { id: 8, symbol: "✓", before: "She",  after: "opened her present.",      answers: ["has"] },
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
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
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

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount}. Correct answers are locked.`);

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
      resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(msg);
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
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers and feedback cleared.");
  };

  const leftQuestions  = questions.filter((_, i) => i % 2 === 0);
  const rightQuestions = questions.filter((_, i) => i % 2 !== 0);

  return (
    <div data-adapt-scope="unit10_GrammarB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit10_GrammarB"] input:focus-visible, [data-adapt-scope="unit10_GrammarB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_GrammarB"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_GrammarB"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_GrammarB"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read and write{" "}
        <span className="text-[#f89631] font-bold">have</span>,{" "}
        <span className="text-[#f89631] font-bold">haven't</span>,{" "}
        <span className="text-[#f89631] font-bold">has</span>, or{" "}
        <span className="text-[#f89631] font-bold">hasn't</span>.
      </h5>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {/* العمود الأيسر */}
        <div className="flex flex-col gap-5">
          {leftQuestions.map((q) => {
            const index = questions.findIndex((item) => item.id === q.id);
            return (
              <QuestionRow
                key={q.id}
                q={q}
                index={index}
                answers={answers}
                errors={errors}
                locked={locked}
                showed={showed}
                handleChange={handleChange}
              />
            );
          })}
        </div>

        {/* العمود الأيمن */}
        <div className="flex flex-col gap-5">
          {rightQuestions.map((q) => {
            const index = questions.findIndex((item) => item.id === q.id);
            return (
              <QuestionRow
                key={q.id}
                q={q}
                index={index}
                answers={answers}
                errors={errors}
                locked={locked}
                showed={showed}
                handleChange={handleChange}
              />
            );
          })}
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
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

        {/* Show Answer */}
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

        {/* Check Answer */}
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

export default GrammarB;