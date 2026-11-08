import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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




const ComprehensionA = () => {
  const items = [
    { id: 1, text: "sleep on a bed", correct: false },
    { id: 2, text: "wear a special suit", correct: true },
    { id: 3, text: "play football", correct: false },
    { id: 4, text: "open the windows for fresh air", correct: false },
    { id: 5, text: "eat food that floats", correct: true },
    { id: 6, text: "live just like people do on Earth", correct: false },
    { id: 7, text: "go for a float", correct: true },
    { id: 8, text: "take air with you if you go outside the station", correct: true },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(items.map((item) => [item.id, false]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const [announcement,setAnnouncement]=useState("");
 const resetButtonRef=useRef(null);

  const handleSelect = (id) => {
    if (locked || errors[id] === false) return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));setErrors(prev=>{const next={...prev};delete next[id];return next;});
  };

  const handleCheck = () => {
    if (locked) return;

    let correctCount = 0;
    const newErrors = {};

    items.forEach((item) => {
      if (selected[item.id] === item.correct) {
        correctCount++;
        newErrors[item.id] = false;
      } else {
        newErrors[item.id] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount}. Correct answers are locked; incorrect answers can be changed.`);
    const total = items.length;
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
    setSelected(Object.fromEntries(items.map((item) => [item.id, item.correct])));
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(items.map((item) => [item.id, false])));
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers and feedback cleared.");
  };

  // تقسيم العناصر لعمودين: فردي على اليسار، زوجي على اليمين
  
  

  const renderCheckBox = (item) => {
    const isSelected = selected[item.id];
    const isWrong = errors[item.id] === true;

    return (
      <div
        key={item.id} role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`${item.id}. ${item.text}`} aria-pressed={selected[item.id]} aria-disabled={locked || errors[item.id] === false} className="flex items-center gap-3 cursor-pointer"
        onClick={() => handleSelect(item.id)}
      >
        {/* Number */}
        <span
          style={{
            fontWeight: "400",
            WebkitTextStroke: "1px black",
            color: "#1a1a1a",
            fontSize: "16px",
            minWidth: "18px",
          }}
        >
          {item.id}
        </span>

        {/* Text */}
        <span style={{ fontSize: "15px", color: "#1a1a1a", flex: 1 }}>
          {item.text}
        </span>

        {/* Checkbox */}
        <div className="relative flex-shrink-0">
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              border: `2px solid ${showed || errors[item.id] === false ? "#16a34a" : isWrong ? "#ef4444" : "#2195a6"}`,
              background: isSelected && errors[item.id] === undefined && !showed ? "#dbeafe" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSelected && (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                <polyline
                  points="4,12 9,18 20,6"
                  stroke="#ff0000ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {/* ❌ Error Badge */}
          {isWrong && (
            <div
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "18px",
                height: "18px",
                background: "#ef4444",
                color: "white",
                borderRadius: "50%",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "2px solid white",
                boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
              }}
            >
              ✕
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div data-adapt-scope="unit5_ComprehensionA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit5_ComprehensionA"] input:focus-visible, [data-adapt-scope="unit5_ComprehensionA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_ComprehensionA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Read and <span style={{color : "red"}}>✓</span>the things you might do on a space station.
      </h5>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {items.map((item) => (
          renderCheckBox(item)
        ))}
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

export default ComprehensionA;