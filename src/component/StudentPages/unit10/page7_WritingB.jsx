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
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const [f5, setF5] = useState("");
  const [f6, setF6] = useState("");
  const [f7, setF7] = useState("");

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {setAnnouncement("Your writing cleared.");
    setF1(""); setF2(""); setF3("");
    setF4(""); setF5(""); setF6(""); setF7("");
  };

  const inp = (value, setter, label, flex = true) => (
    <input {...fieldKeys} aria-label={label} title={label} placeholder="Your answer"
      type="text"
      value={value}
      onChange={(e) => setter(e.target.value)}
      autoComplete="off"
      style={{
        borderBottom: "1px solid #333",
        background: "transparent",
        outline: "none",
        fontSize: "18px",
        color: "#1a1a1a",
        flex: flex ? 1 : undefined,
        minWidth: "80px",
      }}
    />
  );

  const txt = (t) => (
    <span style={{ fontSize: "16px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
      {t}
    </span>
  );

  return (
    <div data-adapt-scope="unit10_page7_WritingB" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit10_page7_WritingB"] input:focus-visible, [data-adapt-scope="unit10_page7_WritingB"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_page7_WritingB"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_page7_WritingB"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_page7_WritingB"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Write about something that you have done before. Use the outline below
        to help you.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Have you ever ___ before? I have ___ . */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("Have you ever")}
          {inp(f1, setF1, "Experience to ask about")}
          {txt("before? I have")}
          {inp(f2, setF2, "Something you have done before")}
          {txt(".")}
        </div>

        {/* First, I ___ . It feels ___ . */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("First, I")}
          {inp(f3, setF3, "What you did first")}
          {txt(". It feels")}
          {inp(f4, setF4, "How it feels")}
          {txt(".")}
        </div>

        {/* Then, I ___ . */}
        <div className="flex items-end gap-2">
          {txt("Then, I")}
          {inp(f5, setF5, "What you did next")}
          {txt(".")}
        </div>

        {/* After that, ___ . */}
        <div className="flex items-end gap-2">
          {txt("After that,")}
          {inp(f6, setF6, "What happened after that")}
          {txt(".")}
        </div>

        {/* It is ___ . */}
        <div className="flex items-end gap-2">
          {txt("It is")}
          {inp(f7, setF7, "Describe your experience")}
          {txt(".")}
        </div>

        {/* Static hint */}
        <p style={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}>
          (the best/worst activity; something I want to try again soon; amazing; etc.)
        </p>
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