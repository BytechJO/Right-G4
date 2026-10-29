import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 8 I Lived in the Library Folder/Page 66/SVG/Asset 6.svg";
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
          width: "120px",
          borderBottom: `1px solid ${showed||isCorrect?"#16a34a":isError?"#ef4444":"#333"}`,
          background: "transparent",
          outline: "none",
          color: showed ? "#ef4444" : "#1a1a1a",
          padding: "2px 4px",
          textAlign: "center",
        }}
      />
      {isError && (
        <div
          style={{
            position: "absolute",
            right: "-22px",
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
const GrammarB = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      after: "her teeth.",
      answers: ["She brushed", "She brushed"],
    },
    {
      id: 2,
      image: img2,
      after: "a tree.",
      answers: ["It climbed", "a tree."],
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
    <div data-adapt-scope="unit8_GrammarB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit8_GrammarB"] input:focus-visible, [data-adapt-scope="unit8_GrammarB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_GrammarB"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_GrammarB"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}
[data-adapt-scope="unit8_GrammarB"] input[aria-invalid="true"]:focus {border-bottom-color:#ef4444 !important;}
`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Look and complete.
      </h5>

      <div className="grid grid-cols-2 gap-8">
        {questions.map((q, i) => (
          <div key={q.id} className="flex flex-col gap-4">

            {/* Number + Image */}
            <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
              <span style={{ fontWeight: "400", WebkitTextStroke: "1px black", color: "#1a1a1a", fontSize: "18px" }}>
                {q.id}
              </span>
              <img
                src={q.image}
                alt={q.id===1?"A girl brushing her teeth.":"A cat climbing a tree."}
                style={{ width: "50%", height: "auto", objectFit: "cover", marginBottom: "1em" }}
              />
            </div>

            {/* Sentence with input */}
            <div
              className="flex items-center gap-1 flex-wrap"
              style={{ position: "relative", left: "2.9em" }}
            >
              {q.before && (
                <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{q.before}</span>
              )}

              <InputField index={i} label={`Picture ${q.id}. Complete: blank ${q.after}`} {...inputProps} />

              <span style={{ fontSize: "18px", color: "#1a1a1a" }}>{q.after}</span>
            </div>

          </div>
        ))}
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

export default GrammarB;