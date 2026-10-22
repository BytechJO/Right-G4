import ExerciseHeader from "../../ExerciseHeader";
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

const WritingC = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const resetButtonRef = useRef(null);

  const handleReset = () => {
    setLine1("");
    setLine2("");
  };

  const inputStyle = {
    flex: 1,
    borderBottom: "1px solid #333",
    background: "transparent",
    outline: "none",
    fontSize: "18px",
    color: "#1a1a1a",
    padding: "2px 4px",
  };

  return (
    <div data-unit3-scope="page7_WritingC" className="mb-6 mx-auto">
      <style>{`[data-unit3-scope="page7_WritingC"] input:focus-visible, [data-unit3-scope="page7_WritingC"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Now write a few sentences yourself.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Line 1 */}
        <div className="flex items-end gap-2">
          <span
            style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}
          >
            In the 1920s, people had
          </span>
          <input
            {...fieldKeys}
            aria-label="In the 1920s, people had"
            title="In the 1920s, people had"
            placeholder="Your idea"
            type="text"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            autoComplete="off"
            style={inputStyle}
          />
        </div>

        {/* Line 2 */}
        <div className="flex items-end gap-2">
          <span
            style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}
          >
            Most people didn't have
          </span>
          <input
            {...fieldKeys}
            aria-label="Most people didn't have"
            title="Most people didn't have"
            placeholder="Your idea"
            type="text"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            autoComplete="off"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-8">
        <div className="relative group">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
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

export default WritingC;
