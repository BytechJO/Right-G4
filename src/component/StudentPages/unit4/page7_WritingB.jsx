import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import earthImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 31/SVG/Asset 26.svg";
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


const WritingB = () => {
  const wordBank = ["core", "mantle", "crust"];

  const questions = [
    { id: 1, answer: "lower mantle" },
    { id: 2, answer: "crust" },
    { id: 3, answer: "inner core" },
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
      if (normalizeAnswer(answers[q.id]) === normalizeAnswer(q.answer)) {
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
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, q.answer])));
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

  // المواقع بالنسبة للصورة نفسها (%)
  const inputPositions = {
    1: { top: "10%", left: "3%", width: "27%" },
    2: { top: "23%", left: "43%", width: "27%" },
    3: { top: "33%", left: "6%", width: "27%" },
  };

  return (
    <div data-adapt-scope="unit4_page7_WritingB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit4_page7_WritingB"] input:focus-visible, [data-adapt-scope="unit4_page7_WritingB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_page7_WritingB"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-6">
        <span className="ex-A-read mr-2">B</span>
        Label the layers of the Earth's atmosphere.
      </h5>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "3em",
        }}
      >
        {/* Word Bank */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {wordBank.map((word) => (
            <div
              key={word}
              style={{
                border: "2px solid #e8eff1",
                borderRadius: "8px",
                padding: "4px 18px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#1a1a1a",
                background: "#e8eff1",
                width: "fit-content",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Image + Inputs */}
        <div
          style={{
            flex: 2,
            position: "relative",
          }}
        >
          <img
            src={earthImg}
            alt="A cutaway Earth showing outer and inner layers, with two children beside it."
            style={{
              width: "80%",
              height: "auto",
              display: "block",
            }}
          />

          {questions.map((q) => {
            const pos = inputPositions[q.id];
            const isError = errors[q.id] === true;
            const isCorrect = errors[q.id] === false;

            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  gap: "4px",
                }}
              >
                {/* ✅ رقم السؤال + بادج الخطأ جنبه */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* ❌ Error Badge جمب الرقم */}
                  {isError && (
                    <div
                      style={{
                        marginLeft: "3px",
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
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </div>
                  )}

  
                </div>

                {/* Input */}
                <input {...fieldKeys} aria-label={`Diagram label ${q.id}. Write the layer name.`} title={`Diagram label ${q.id}. Write the layer name.`} placeholder="Answer" aria-invalid={errors[q.id] === true}
                  type="text"
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  disabled={locked || isCorrect}
                  autoComplete="off"
                  style={{...({
                    flex: 1,
                    fontSize: "18px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                    padding: "-2px 4px 2px 2px",
                  }),borderBottomColor:showed || errors[q.id] === false ? "#16a34a" : errors[q.id] === true ? "#ef4444" : ({
                    flex: 1,
                    fontSize: "18px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                    padding: "-2px 4px 2px 2px",
                  }).borderBottomColor}}
                />
              </div>
            );
          })}
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

export default WritingB;