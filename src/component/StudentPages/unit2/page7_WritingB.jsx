import { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";

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


const WritingB = () => {
  const [goingTo, setGoingTo] = useState("");
  const [maybeCan, setMaybeCan] = useState("");

  const resetButtonRef = useRef(null);

  const handleReset = () => {
    setGoingTo("");
    setMaybeCan("");
  };

  const inputStyle =
    "border-b-1 border-[#333] bg-transparent outline-none text-gray-800 px-1";

  return (
    <div className="mb-6 mx-auto w-[60%]" data-unit2-scope="page7_WritingB">
      <style>{`
        [data-unit2-scope="page7_WritingB"] input:focus-visible,
        [data-unit2-scope="page7_WritingB"] [data-keyboard-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
        
      `}</style>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Pretend you are writing to your friend and you want to tell them what you <br /> 
        are going to do next week. Use the letters above and the sentences below<br /> 
        to help you write an e-mail to them. Use a separate piece of paper.
      </h5>

      {/* Email body */}
      <div className="flex flex-col gap-4" style={{ fontSize: "16px", color: "#1a1a1a" }}>
        {/* Row 1 */}
        <div className="flex items-end gap-3 flex-wrap">
          <span>I'm fine.</span>
          <span>I'm going to</span>
          <input aria-label={"I'm going to"}
                      title={"I'm going to"}
                      placeholder="Your idea" {...fieldKeys}
            type="text"
            value={goingTo}
            onChange={(e) => setGoingTo(e.target.value)}
            autoComplete="off"
            style={{ fontSize: "16px", minWidth: "150px" }}
            className={inputStyle}
          />
          <span>.</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-end gap-3 flex-wrap">
          <span>Maybe we can</span>
          <input aria-label={"Maybe we can"}
                      title={"Maybe we can"}
                      placeholder="Your idea" {...fieldKeys}
            type="text"
            value={maybeCan}
            onChange={(e) => setMaybeCan(e.target.value)}
            autoComplete="off"
            style={{ fontSize: "18px", minWidth: "150px" }}
            className={inputStyle}
          />
          <span>.</span>
          <span className="ml-6">Write soon.</span>
          <span className="ml-6">Your friend,</span>
        </div>
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