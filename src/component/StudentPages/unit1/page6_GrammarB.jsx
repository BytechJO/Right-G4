import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";

const GrammarB = () => {
  const correct = ["How long", "How much", "How far", "How high"];

  const questions = [
    "are your fingernails?",
    "does this cost?",
    "can you run?",
    "can you climb?",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔥 normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\.$/, "").replace(/\s+/g, " ");
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => !a || a.trim() === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];

    answers.forEach((ans, i) => {
      if (normalize(ans) === normalize(correct[i])) {
        correctCount++;
        newErrors[i] = false; // ✅
      } else {
        newErrors[i] = true; // ❌
      }
    });

    setErrors(newErrors);

    const total = correct.length;
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
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnswers(correct);
    setErrors([]); // 🔥 يمسح الأخطاء
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setErrors([]);
    setLocked(false);
  };

  const renderInput = (i) => (
    <span className="relative inline-block mx-2">
      <input
        value={answers[i]}
        disabled={locked || errors[i] === false}
        onChange={(e) => {
          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);
        }}
        className={`border-b outline-none w-[210px] text-center text-[#6D2980] font-semibold pr-6
          ${errors[i] ? "border-red-500" : "border-black"}
        `}
      />

      {/* ❌ X */}
      {errors[i] && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "250%",
            transform: "translateY(-50%)",
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
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </span>
  );

  return (
    <div>
      {/* Title */}
      <h5 className="header-title-page8-read mb-12">
        <span className="ex-A-read mr-2">B</span>
        Read and complete the questions.
      </h5>

      {/* Questions */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-12 text-[15px] mt-15">
        {questions.map((q, i) => (
          <div key={i}>
            <span className="font-bold mr-1">{i + 1}</span>
            {renderInput(i)} {q}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
