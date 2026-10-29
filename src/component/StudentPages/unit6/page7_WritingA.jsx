import { useState, useRef } from "react";
import { FaRedo, FaEye } from "react-icons/fa";
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
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans, setAns] = useState(false)

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {
    setAns1("");
    setAns2("");
    setAns(false);setAnnouncement("Answers cleared.");
  };

  const handleShow = () => {
    setAns1("keep it in a small pot.");
    setAns2("forget to water and care for my tree.");
    setAns(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Sample answers shown.");

  };

  const inputStyle = {
    flex: 1,
    borderBottom: ans ? "1px solid #16a34a" : "1px solid #333",
    background: "transparent",
    outline: "none",
    fontSize: "18px",
    color: ans ?  "#ff0000ff": "#1a1a1a",
  };

  return (
    <div data-adapt-scope="unit6_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit6_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit6_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_page7_WritingA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Write about how to help a bonsai tree grow.
      </h5>

      <div className="flex flex-col gap-6">
        {/* Line 1 */}
        <div className="flex items-end gap-2">
          <span
            style={{
              fontWeight: "400",
              WebkitTextStroke: "1px black",
              color: "#1a1a1a",
              minWidth: "18px",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            1
          </span>
          <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
            I should
          </span>
          <input {...fieldKeys} disabled={ans} aria-label="Complete: I should. How to help a bonsai tree grow." title="Complete: I should. How to help a bonsai tree grow." placeholder="Your advice"
            type="text"
            value={ans1}
            onChange={(e) => setAns1(e.target.value)}
            autoComplete="off"
            style={inputStyle}
          />
        </div>

        {/* Line 2 */}
        <div className="flex items-end gap-2">
          <span
            style={{
              fontWeight: "400",
              WebkitTextStroke: "1px black",
              color: "#1a1a1a",
              minWidth: "18px",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            2
          </span>
          <span style={{ fontSize: "18px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
            I shouldn't
          </span>
          <input {...fieldKeys} disabled={ans} aria-label="Complete: I should not. How to care for a bonsai tree." title="Complete: I should not. How to care for a bonsai tree." placeholder="Your advice"
            type="text"
            value={ans2}
            onChange={(e) => setAns2(e.target.value)}
            autoComplete="off"
            style={inputStyle}
          />
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
      </div>
    </div>
  );
};

export default WritingA;