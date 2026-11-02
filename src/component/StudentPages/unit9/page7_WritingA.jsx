import { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";
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


const WritingA = () => {
  const questions = [
    "Why is grass always green?",
    "Why is hair upon my head?",
    "Why does rain go down and not up?",
    "Why is salt in every sea?",
    "Why is there a sun and moon?",
    "Why is there only one me?",
    "Why is night so full of dreams?",
    "Why do we have one nose and two eyes?",
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {setAnnouncement("Your writing cleared.");
    setAnswers(Array(questions.length).fill(""));
  };

  return (
    <div data-adapt-scope="unit9_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit9_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit9_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_page7_WritingA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_page7_WritingA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit9_page7_WritingA"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        This poem is full of questions that a child might ask. How many of them
        can you answer?<br /> Start your answers with{" "} 
        <span className="text-[#f89631] font-bold">because</span>. Have fun
        being creative!
      </h5>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-end gap-3 flex-wrap">
            {/* Question */}
            <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
              {q}
            </span>

            {/* Input */}
            <input {...fieldKeys} aria-label={`Question ${i+1}. ${q} Give your own answer beginning with because.`} title={`Question ${i+1}. ${q}`} placeholder="Because…"
              type="text"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: "160px",
                borderBottom: "1px solid #333",
                background: "transparent",
                outline: "none",
                fontSize: "18px",
                color: "#1a1a1a",
              }}
            />
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-8">
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
      </div>
    </div>
  );
};

export default WritingA;