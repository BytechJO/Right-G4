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


const GrammarB = () => {
  const questions = [
    {
      id: 1,
      options: ["bigger", "biggest"],
      correct: "biggest",
      before: "The elephant is the",
      after: ".",
      answers: ["biggest"],
    },
    {
      id: 2,
      options: ["thinner", "thinnest"],
      correct: "thinnest",
      before: "Sandra is the",
      after: ".",
      answers: ["thinnest"],
    },
    {
      id: 3,
      options: ["cuter", "cutest"],
      correct: "cuter",
      before: "The white cat is",
      after: "than the brown cat.",
      answers: ["cuter"],
    },
    {
      id: 4,
      options: ["taller", "tallest"],
      correct: "tallest",
      before: "The building on the right is the",
      after: ".",
      answers: ["tallest"],
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [inputs, setInputs] = useState(
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [circleErrors, setCircleErrors] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const [announcement,setAnnouncement] = useState("");
  const resetButtonRef = useRef(null);

  const handleSelect = (qId, optIndex) => {
    if (locked || circleErrors[qId] === false) return;
    setSelected((prev) => ({ ...prev, [qId]: optIndex }));
    setCircleErrors(prev=>{const next={...prev};delete next[qId];return next;});
  };

  const handleInputChange = (qId, value) => {
    if (locked || inputErrors[qId] === false) return;
    setInputs((prev) => ({ ...prev, [qId]: value }));
    setInputErrors(prev=>{const next={...prev};delete next[qId];return next;});
  };

  const handleCheck = () => {
    if (locked) return;

    const isCircleEmpty = questions.some((q) => selected[q.id] === null);
    const isInputEmpty = questions.some((q) => inputs[q.id].trim() === "");

    if (isCircleEmpty || isInputEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    let total = 0;
    const newCircleErrors = {};
    const newInputErrors = {};

    questions.forEach((q) => {
      // Circle check
      total++;
      const selectedWord = q.options[selected[q.id]];
      if (selectedWord === q.correct) {
        correctCount++;
        newCircleErrors[q.id] = false;
      } else {
        newCircleErrors[q.id] = true;
      }

      // Input check
      total++;
      const isInputCorrect = q.answers.some(
        (a) => normalizeAnswer(a) === normalizeAnswer(inputs[q.id])
      );
      if (isInputCorrect) {
        correctCount++;
        newInputErrors[q.id] = false;
      } else {
        newInputErrors[q.id] = true;
      }
    });

    setCircleErrors(newCircleErrors);
    setInputErrors(newInputErrors);
    setAnnouncement(`Score: ${correctCount} out of ${total}. Correct parts are locked; incorrect parts can be changed.`);

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
    setSelected(
      Object.fromEntries(
        questions.map((q) => [q.id, q.options.indexOf(q.correct)])
      )
    );
    setInputs(Object.fromEntries(questions.map((q) => [q.id, q.correct])));
    setCircleErrors({});
    setInputErrors({});
    setLocked(true);
    setShowed(true);
    resetButtonRef.current?.focus({preventScroll:true});
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setInputs(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setCircleErrors({});
    setInputErrors({});
    setLocked(false);
    setShowed(false);
    setAnnouncement("Selections, answers and feedback cleared.");
  };

  return (
    <div data-adapt-scope="unit4_GrammarB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit4_GrammarB"] input:focus-visible, [data-adapt-scope="unit4_GrammarB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_GrammarB"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Read, circle, and write.
      </h5>

      <div className="flex flex-col gap-6">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center gap-4 flex-wrap">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                fontSize: "18px",
                minWidth: "18px",
                flexShrink: 0,
              }}
            >
              {q.id}
            </span>

            {/* Circle Options */}
            <div className="flex gap-2 flex-shrink-0">
              {q.options.map((opt, optIndex) => {
                const isSelected = selected[q.id] === optIndex;
                const isChecked = circleErrors[q.id] !== undefined;
                const isWrong = circleErrors[q.id] === true && isSelected;

                let borderColor = "transparent";
                if (isSelected) {
                  if (!isChecked) borderColor = "#2195a6";
                  else if (circleErrors[q.id] === false) borderColor = "#2195a6";
                  else borderColor = "#ef4444";
                }

                return (
                  <div key={optIndex} className="relative">
                    <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${q.id}. ${opt}`} aria-pressed={isSelected} aria-disabled={locked || circleErrors[q.id] === false}
                      onClick={() => handleSelect(q.id, optIndex)}
                      style={{...({
                        fontSize: "18px",
                        color: "#1a1a1a",
                        border: `2px solid ${borderColor}`,
                        borderRadius: "50px",
                        padding: "2px 10px",
                        cursor: locked ? "default" : "pointer",
                        display: "inline-block",
                        background: "#e8eff1",
                        transition: "all 0.15s",
                      }),borderColor:isSelected && (showed || circleErrors[q.id] === false) ? "#16a34a" : isSelected && circleErrors[q.id] === true ? "#ef4444" : borderColor}}
                    >
                      {opt}
                    </span>

                    {/* ❌ Error Badge */}
                    {isWrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
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
              })}
            </div>

            {/* Sentence with input */}
            <div className="flex items-end gap-2 flex-wrap flex-1">
              <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                {q.before}
              </span>

              <div className="relative inline-flex items-center flex-1" style={{ minWidth: "150px" }}>
                <input {...fieldKeys} aria-label={`Question ${q.id}. ${q.before} blank ${q.after}`} title={`Question ${q.id}. ${q.before} blank ${q.after}`} placeholder="Word" aria-invalid={inputErrors[q.id] === true}
                  type="text"
                  value={inputs[q.id]}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  disabled={locked || inputErrors[q.id] === false}
                  autoComplete="off"
                  style={{...({
                    fontSize: "18px",
                    width: "100%",
                    borderBottom: `1px solid ${inputErrors[q.id] === true ? "#ef4444" : "#333"}`,
                    background: "transparent",
                    outline: "none",
                    color: showed ? "#ef4444" : "#1a1a1a",
                    padding: "2px 4px",
                  }),borderBottomColor:showed || inputErrors[q.id] === false ? "#16a34a" : inputErrors[q.id] === true ? "#ef4444" : "#333",color:"#1a1a1a"}}
                />

                {/* ❌ Input Error Badge */}
                {inputErrors[q.id] === true && (
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

              {q.after !== "." && (
                <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                  {q.after}
                </span>
              )}
              {q.after === "." && (
                <span style={{ fontSize: "18px", color: "#1a1a1a" }}>.</span>
              )}
            </div>
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