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
  const [name, setName] = useState("");
  const [parentsWork, setParentsWork] = useState("");
  const [parentsWork2, setParentsWork2] = useState("");
  const [dob, setDob] = useState("");
  const [pob, setPob] = useState("");
  const [grade, setGrade] = useState("");
  const [accomplishments1, setAccomplishments1] = useState("");
  const [accomplishments2, setAccomplishments2] = useState("");
  const [accomplishments3, setAccomplishments3] = useState("");
  const [siblings, setSiblings] = useState("");

const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleReset = () => {setAnnouncement("Your writing cleared.");
    setName(""); setParentsWork(""); setParentsWork2("");
    setDob(""); setPob(""); setGrade("");
    setAccomplishments1(""); setAccomplishments2("");
    setAccomplishments3(""); setSiblings("");
  };

  const lineStyle = {
    flex: 1,
    borderBottom: "1px solid #333",
    background: "transparent",
    outline: "none",
    fontSize: "16px",
    color: "#1a1a1a",
  };

  const labelStyle = {
    fontSize: "16px",
    color: "#1a1a1a",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return (
    <div data-adapt-scope="unit8_page7_WritingA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit8_page7_WritingA"] input:focus-visible, [data-adapt-scope="unit8_page7_WritingA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_page7_WritingA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_page7_WritingA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Now write a similar form about yourself.
      </h5>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Name:</span>
          <input {...fieldKeys} aria-label={"Your name"} title={"Your name"} placeholder="Your name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Parents names and work - 2 lines */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Parents' names and work:</span>
          <input {...fieldKeys} aria-label={"Parents’ names and work, line 1"} title={"Parents’ names and work, line 1"} placeholder="Name and work" type="text" value={parentsWork} onChange={(e) => setParentsWork(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input {...fieldKeys} aria-label={"Parents’ names and work, line 2"} title={"Parents’ names and work, line 2"} placeholder="Continue" type="text" value={parentsWork2} onChange={(e) => setParentsWork2(e.target.value)} autoComplete="off" style={{ ...lineStyle, marginLeft: "0" }} />
        </div>

        {/* Date of birth */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Date of birth:</span>
          <input {...fieldKeys} aria-label={"Your date of birth"} title={"Your date of birth"} placeholder="Date of birth" type="text" value={dob} onChange={(e) => setDob(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Place of birth */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Place of birth:</span>
          <input {...fieldKeys} aria-label={"Your place of birth"} title={"Your place of birth"} placeholder="Place of birth" type="text" value={pob} onChange={(e) => setPob(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Current grade */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Current grade in school:</span>
          <input {...fieldKeys} aria-label={"Your current school grade"} title={"Your current school grade"} placeholder="Your grade" type="text" value={grade} onChange={(e) => setGrade(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Accomplishments - 3 lines */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Accomplishments:</span>
          <input {...fieldKeys} aria-label={"Your accomplishments, line 1"} title={"Your accomplishments, line 1"} placeholder="Your accomplishment" type="text" value={accomplishments1} onChange={(e) => setAccomplishments1(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input {...fieldKeys} aria-label={"Your accomplishments, line 2"} title={"Your accomplishments, line 2"} placeholder="Continue" type="text" value={accomplishments2} onChange={(e) => setAccomplishments2(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>
        <div className="flex items-end gap-2">
          <input {...fieldKeys} aria-label={"Your accomplishments, line 3"} title={"Your accomplishments, line 3"} placeholder="Continue" type="text" value={accomplishments3} onChange={(e) => setAccomplishments3(e.target.value)} autoComplete="off" style={lineStyle} />
        </div>

        {/* Brothers and sisters */}
        <div className="flex items-end gap-2">
          <span style={labelStyle}>Brothers and sisters:</span>
          <input {...fieldKeys} aria-label={"Your siblings"} title={"Your siblings"} placeholder="Your siblings" type="text" value={siblings} onChange={(e) => setSiblings(e.target.value)} autoComplete="off" style={lineStyle} />
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