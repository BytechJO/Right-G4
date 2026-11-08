import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = (value) => value.normalize("NFKC").toLowerCase()
  .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
  .replace(/[.,!?;:…“”"]/g, " ").replace(/\s+/g, " ").trim();


const ComprehensionA = () => {
  const wordBank = ["How", "Dear", "fine", "will", "Your friend", "going to"];

  const questions = [
    { id: "dear", answer: "Dear" },
    { id: "how", answer: "How" },
    { id: "fine", answer: "fine" },
    { id: "goingTo", answer: "going to" },
    { id: "will", answer: "will" },
    { id: "yourFriend", answer: "Your friend" },
  ];

  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const resetButtonRef = useRef(null);

  const handleChange = (id, value) => {
    if (locked || errors[id] === false) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((previous) => { const next = { ...previous }; delete next[id]; return next; });
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
      if (normalizeAnswer(answers[q.id]) === normalizeAnswer(q.answer)) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
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
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, q.answer])));
    setErrors({});
    setLocked(true);
    setShowed(true);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setErrors({});
    setLocked(false);
    setShowed(false);
  };

  const renderInput = ({ id }) => (
    <div className="relative inline-flex items-center">
      <input aria-label={({dear:"Email greeting before William",how:"Blank before are you",fine:"Blank after I am",goingTo:"Blank before have a Sports Day",will:"Blank before play sports",yourFriend:"Email closing before Edward"})[id]}
                      title={({dear:"Email greeting before William",how:"Blank before are you",fine:"Blank after I am",goingTo:"Blank before have a Sports Day",will:"Blank before play sports",yourFriend:"Email closing before Edward"})[id]}
                      placeholder="Word(s)" {...fieldKeys}
                type="text"
        value={answers[id]}
        onChange={(e) => handleChange(id, e.target.value)}
        disabled={locked || errors[id] === false}
        autoComplete="off"
        style={   { lineHeight: "2.4px", fontSize: "16px", width :"200px" }}
        className={`border-b-1 bg-transparent outline-none text-center transition disabled:pointer-events-none
          ${
            errors[id] === true
              ? "border-red-500 text-gray-800"
              : showed || errors[id] === false
                      ? "border-green-600 text-gray-800"
              : "border-[#333] text-gray-800"
          }
        `}
      />
      {errors[id] === true && (
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

  return (
    <div className="mb-6 mx-auto w-[60%]" data-unit2-scope="page7_WritingA">
      <style>{`
        [data-unit2-scope="page7_WritingA"] input:focus-visible,
        [data-unit2-scope="page7_WritingA"] [data-keyboard-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
        
      `}</style>
      {/* Header + Word Bank */}
      <div className="flex items-start justify-between  gap-4">
        <h5 className="header-title-page8-read">
          <span className="ex-A-read mr-2">A</span>
          Read and complete the email.
        </h5>

        {/* Word Bank */}
        <div className="grid grid-cols-3 gap-2 flex-shrink-0" style={{                position : "relative",
top : "3em"}}>
          {wordBank.map((word) => (
            <div
              key={word}
              style={{

                border: "2px solid #e8eff1",
                borderRadius: "8px",
                padding: "3px 14px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#1a1a1a",
                background: "#e8eff1",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Email Body */}
      <div
        style={{
          fontSize: "16px",
          color: "#1a1a1a",
          lineHeight: "2.4",
          maxWidth: "600px",
        }}
      >
        {/* Line 1: Dear ___ William, */}
        <div className="flex items-end gap-2 flex-wrap">
          {renderInput({ id: "dear" })}
          <span>William,</span>
        </div>

        {/* Line 2: How ___ are you? I'm fine ___ . */}
        <div className="flex items-end gap-2 flex-wrap">
          {renderInput({ id: "how" })}
          <span>are you? I'm</span>
          {renderInput({ id: "fine" })}
          <span>.</span>
        </div>

        {/* Line 3: I'm going to ___ have a Sports Day at my school. We */}
        <div className="flex items-end gap-2 flex-wrap">
          <span>I'm</span>
          {renderInput({ id: "goingTo" })}
          <span>have a Sports Day at my school. We</span>
        </div>

        {/* Line 4: will ___ play sports for eight hours. I hope I make it! */}
        <div className="flex items-end gap-2 flex-wrap">
          {renderInput({ id: "will" })}
          <span>play sports for eight hours. I hope I make it!</span>
        </div>

        {/* Line 5: Your friend ___ , */}
        <div className="flex items-end gap-2 flex-wrap">
          {renderInput({ id: "yourFriend" })}
          <span>,</span>
        </div>

        {/* Line 6: Edward */}
        <div>
          <span>Edward</span>
        </div>
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

export default ComprehensionA;