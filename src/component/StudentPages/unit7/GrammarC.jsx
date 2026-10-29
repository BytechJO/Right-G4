import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import tableImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 60/SVG/Asset 5.svg";
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



const GrammarC = () => {
  const questions = [
    {
      id: 1,
      question: "Was there any honey?",
      options: ["Yes, there was some.", "No, there wasn't any."],
      correct: 1,
    },
    {
      id: 2,
      question: "Were there any bananas?",
      options: ["Yes, there were some.", "No, there weren't any."],
      correct: 0,
    },
    {
      id: 3,
      question: "Were there any eggs?",
      options: ["Yes, there were some.", "No, there weren't any."],
      correct: 1,
    },
    {
      id: 4,
      question: "Was there any chicken?",
      options: ["Yes, there was some.", "No, there wasn't any."],
      correct: 0,
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleSelect=(id,index)=>{if(locked||errors[id]===false)return;setSelected(prev=>({...prev,[id]:index}));setErrors(prev=>{const next={...prev};delete next[id];return next;});setAnnouncement("Answer selected.");};

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => selected[q.id] === null);
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      if (selected[q.id] === q.correct) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount} out of ${questions.length}. Correct answers are locked.`);
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
    setSelected(Object.fromEntries(questions.map((q) => [q.id, q.correct])));
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers and feedback cleared.");
  };

  const getOptionStyle = (qId, optIndex) => {const isSelected=selected[qId]===optIndex;
    
    const isChecked = errors[qId] !== undefined;
    const isWrong = errors[qId] === true;

    if (!isSelected) return { border: "2px solid transparent" };

    if (showed) return { border: "2px solid #16a34a", borderRadius: "50px" };
    if (!isChecked) return { border: "2px solid #2195a6", borderRadius: "50px" };
    if (!isWrong) return { border: "2px solid #16a34a", borderRadius: "50px" };
    return { border: "2px solid #ef4444", borderRadius: "50px" };
  };

  return (
    <div data-adapt-scope="unit7_GrammarC" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit7_GrammarC"] input:focus-visible, [data-adapt-scope="unit7_GrammarC"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_GrammarC"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Read, look, and circle.
      </h5>

      <div className="flex gap-4 items-start">
        {/* Questions */}
        <div className="flex flex-col gap-4 flex-1">
          {questions.map((q) => {
            const isWrong = errors[q.id] === true;
            

            return (
              <div key={q.id} className="flex items-center gap-3 flex-wrap" style={{flexWrap : "nowrap"}}>
                {/* Number */}
                <span
                  style={{
                    fontWeight: "400",
                    WebkitTextStroke: "1px black",
                    color: "#1a1a1a",
                    fontSize: "16px",
                    minWidth: "16px",
                    flexShrink: 0,
                  }}
                >
                  {q.id}
                </span>

                {/* Question */}
                <span style={{ fontSize: "18px", color: "#1a1a1a", minWidth: "200px" }}>
                  {q.question}
                </span>

                {/* Options */}
                {q.options.map((opt, optIndex) => {
                  const isSel = selected[q.id] === optIndex;
                  const isWrongSel = isWrong && isSel;

                  return (
                    <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${q.id}. ${q.question} ${opt}`} aria-pressed={selected[q.id]===optIndex} aria-disabled={locked||errors[q.id]===false}
                      key={optIndex}
                      className="relative cursor-pointer"
                      onClick={() => handleSelect(q.id, optIndex)}
                      style={{...({
                        padding: "3px 12px",
                        ...getOptionStyle(q.id, optIndex),
                        transition: "all 0.15s",
                      }),borderRadius:({
                        padding: "3px 12px",
                        ...getOptionStyle(q.id, optIndex),
                        transition: "all 0.15s",
                      }).borderRadius||6,backgroundColor:selected[q.id]===optIndex&&!showed&&errors[q.id]===undefined?"#dbeafe":({
                        padding: "3px 12px",
                        ...getOptionStyle(q.id, optIndex),
                        transition: "all 0.15s",
                      }).backgroundColor,boxShadow:selected[q.id]===optIndex?`inset 0 -2px 0 ${showed||errors[q.id]===false?"#16a34a":errors[q.id]===true?"#ef4444":"#2563eb"}`:undefined}}
                    >
                      <span style={{ fontSize: "18px", color: "#1a1a1a" , whiteSpace:"nowrap" }}>
                        {opt}
                      </span>

                      {/* ❌ Error Badge */}
                      {isWrongSel && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
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
                })}
              </div>
            );
          })}
        </div>

        {/* Table Image */}
        <img
          src={tableImg}
          alt={"A round green table with several foods arranged on it."}
          style={{ width: "25%", flexShrink: 0, marginTop: "-16px" , height : "auto" }}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-3">
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

export default GrammarC;