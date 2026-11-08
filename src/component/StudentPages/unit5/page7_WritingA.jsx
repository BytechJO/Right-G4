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
  const [f1, setF1] = useState(""); // wake up at
  const [f2, setF2] = useState(""); // get dressed and ___
  const [f3, setF3] = useState(""); // After breakfast, I
  const [f4, setF4] = useState(""); // Then, I go
  const [f5, setF5] = useState(""); // At school, I
  const [f6, setF6] = useState(""); // After school, I
  const [f7, setF7] = useState(""); // At ___
  const [f8, setF8] = useState(""); // last thing
  const [f9, setF9] = useState(""); // last line

  const resetButtonRef=useRef(null);
  const handleReset = () => {
    setF1(""); setF2(""); setF3(""); setF4("");
    setF5(""); setF6(""); setF7(""); setF8(""); setF9("");
  };

  const inp = (value, setter, label) => (
    <input {...fieldKeys} aria-label={label} title={label} placeholder="Your answer"
      type="text"
      value={value}
      onChange={(e) => setter(e.target.value)}
      autoComplete="off"
      style={{
        borderBottom: "1px solid #333",
        background: "transparent",
        outline: "none",
        fontSize: "16px",
        color: "#1a1a1a",
        flex: 1,
        minWidth: "80px",
      }}
    />
  );

  const txt = (t) => (
    <span style={{ fontSize: "16px", color: "#1a1a1a", whiteSpace: "nowrap" }}>{t}</span>
  );

  const fullInp = (value, setter, label) => (
    <input {...fieldKeys} aria-label={label} title={label} placeholder="Your answer"
      type="text"
      value={value}
      onChange={(e) => setter(e.target.value)}
      autoComplete="off"
      style={{
        borderBottom: "1px solid #333",
        background: "transparent",
        outline: "none",
        fontSize: "16px",
        color: "#1a1a1a",
        padding: "2px 4px",
        width: "100%",
      }}
    />
  );

  return (
    <div data-adapt-scope="unit5_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit5_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit5_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_page7_WritingA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Write about your day by finishing the sentences.
      </h5>

      <div className="flex flex-col gap-5" style={{ fontSize: "16px", color: "#1a1a1a" }}>

        {/* Line 1: My usual day is busy but fun. I wake up at ___ I get dressed and */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("My usual day is busy but fun. I wake up at")}
          {inp(f1, setF1, "Time you wake up")}
          {txt("I get dressed and")}
        </div>

        {/* Line 2: ___ . After */}
        <div className="flex items-end gap-2">
          {fullInp(f2, setF2, "What you do after getting dressed")}
          {txt(". After")}
        </div>

        {/* Line 3: breakfast, I ___ . */}
        <div className="flex items-end gap-2">
          {txt("breakfast, I")}
          {inp(f3, setF3, "After breakfast")}
          {txt(".")}
        </div>

        {/* Line 4: Then, I go ___ . */}
        <div className="flex items-end gap-2">
          {txt("Then, I go")}
          {inp(f4, setF4, "Where you go next")}
          {txt(".")}
        </div>

        {/* Line 5: At school, I ___ . After school, I */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("At school, I")}
          {inp(f5, setF5, "What you do at school")}
          {txt(". After school, I")}
        </div>

        {/* Line 6: ___ . */}
        <div className="flex items-end gap-2">
          {fullInp(f6, setF6, "After school")}
          {txt(".")}
        </div>

        {/* Line 7: At ___ I eat dinner. The last thing I usually do is ___ */}
        <div className="flex items-end gap-2 flex-wrap">
          {txt("At")}
          {inp(f7, setF7, "Time of the next activity")}
          {txt("I eat dinner. The last thing I usually do is")}
          {inp(f8, setF8, "The last thing you do")}
        </div>

        {/* Line 8: ___ . That is my usual day! */}
        <div className="flex items-end gap-2">
          {fullInp(f9, setF9, "Complete your routine")}
          {txt(". That is my usual day!")}
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

export default WritingA;