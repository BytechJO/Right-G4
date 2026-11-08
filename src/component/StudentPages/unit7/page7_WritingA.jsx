import { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";

import roomImg from "../../../assets/imgs/pages/Class Book/Right 4 Unit 7  The Alligator Scare Folder/Page 61/SVG/Asset 2.svg";
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
  const [lines, setLines] = useState(["", "", "", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...lines];
    updated[index] = value;
    setLines(updated);
  };

const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {
    setLines(["", "", "", "", ""]);setAnnouncement("Your sentences cleared.");
  };

  return (
    <div data-adapt-scope="unit7_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit7_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit7_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_page7_WritingA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        
        Be a good writer and observer. Below is a picture of a<br /> living room from
        long ago.  Write about it. Use{" "}
        <span className="text-[#f89631] font-bold">there was</span> and{" "}
        <span className="text-[#f89631] font-bold">there were</span> to start
        each sentence.
      </h5>

      {/* Lines */}
      <div className="flex flex-col gap-4 mb-8">
        {lines.map((line, i) => (
          <div key={i} className="flex items-end gap-3">
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
              {i + 1}
            </span>
            <input {...fieldKeys} aria-label={`Sentence ${i+1}. Describe the old living room using there was or there were.`} title={`Sentence ${i+1}. Describe the room.`} placeholder="Your sentence"
              type="text"
              value={line}
              onChange={(e) => handleChange(i, e.target.value)}
              autoComplete="off"
              style={{
                flex: 1,
                borderBottom: "1px solid #333",
                background: "transparent",
                outline: "none",
                fontSize: "18px",
                color: "#1a1a1a",
                padding: "2px 4px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Room Image */}
      <img
        src={roomImg}
        alt={"An old living room with wooden furniture, windows, and a wall clock."}
        style={{ width: "100%", borderRadius: "12px", display: "block"  , height : "auto "}}
      />

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