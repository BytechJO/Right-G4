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


const WritingB = () => {
  const [lines, setLines] = useState(["", "", "", "", "", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...lines];
    updated[index] = value;
    setLines(updated);
  };

const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {setAnnouncement("Your writing cleared.");
    setLines(["", "", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div data-adapt-scope="unit8_page7_WritingB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit8_page7_WritingB"] input:focus-visible, [data-adapt-scope="unit8_page7_WritingB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_page7_WritingB"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_page7_WritingB"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Using the information on your form, write a paragraph about yourself.
      </h5>

      <div className="flex flex-col gap-5">
        {lines.map((line, i) => (
          <div key={i} className="flex items-end">
            <input {...fieldKeys} aria-label={`Your paragraph about yourself, line ${i+1}`} title={`Your paragraph about yourself, line ${i+1}`} placeholder="Continue your paragraph"
              type="text"
              value={line}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{
                flex: 1,
                borderBottom: "1px solid #333",
                background: "transparent",
                outline: "none",
                fontSize: "16px",
                color: "#1a1a1a",
                padding: "2px 4px",
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

export default WritingB;