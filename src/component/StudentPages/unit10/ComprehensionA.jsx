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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (value) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u0060\u00B4']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();


const ComprehensionA = () => {
  const rows = [
    {
      id: "arctic",
      label: "Arctic/cold",
      clothesFixed: "layered/warm",
      clothesAnswers: null,
      takeAnswers: ["food and water", "food and water."],
    },
    {
      id: "desert",
      label: "desert",
      clothesAnswers: ["light, loose material", "light loose material"],
      takeAnswers: ["water", "water."],
    },
    {
      id: "rainforest",
      label: "rainforest",
      clothesAnswers: ["covers arms and legs", "cover arms and legs"],
      takeAnswers: ["plenty of water", "plenty of water."],
    },
  ];

  const [answers, setAnswers] = useState({
    arctic_take: "",
    desert_clothes: "",
    desert_take: "",
    rainforest_clothes: "",
    rainforest_take: "",
  });
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleChange = (key, value) => {
    if (locked || errors[key] === false) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));setErrors(prev=>{const next={...prev};delete next[key];return next;});
  };

  const allFields = [
    { key: "arctic_take", answers: rows[0].takeAnswers },
    { key: "desert_clothes", answers: rows[1].clothesAnswers },
    { key: "desert_take", answers: rows[1].takeAnswers },
    { key: "rainforest_clothes", answers: rows[2].clothesAnswers },
    { key: "rainforest_take", answers: rows[2].takeAnswers },
  ];

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = Object.values(answers).some((v) => v.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all blanks.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    allFields.forEach(({ key, answers: correctAnswers }) => {
      const isCorrect = correctAnswers.some(
        (a) => normalizeAnswer(a) === normalizeAnswer(answers[key])
      );
      if (isCorrect) {
        correctCount++;
        newErrors[key] = false;
      } else {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount}. Correct answers are locked.`);
    const total = allFields.length;
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
    setAnswers({
      arctic_take: rows[0].takeAnswers[0],
      desert_clothes: rows[1].clothesAnswers[0],
      desert_take: rows[1].takeAnswers[0],
      rainforest_clothes: rows[2].clothesAnswers[0],
      rainforest_take: rows[2].takeAnswers[0],
    });
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers({
      arctic_take: "",
      desert_clothes: "",
      desert_take: "",
      rainforest_clothes: "",
      rainforest_take: "",
    });
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers and feedback cleared.");
  };

  const renderInputCell = (fieldKey) => {
    const isError = errors[fieldKey] === true;
    const isCorrect = errors[fieldKey] === false;
    return (
      <div className="relative w-full">
        <input {...fieldKeys} aria-label={`Table. ${fieldKey.split("_")[0]}. ${fieldKey.endsWith("take")?"What to take with you":"Clothes to wear"}.`} title={`Table. ${fieldKey.split("_")[0]}. ${fieldKey.endsWith("take")?"What to take with you":"Clothes to wear"}.`} placeholder="Your answer" aria-invalid={errors[fieldKey]===true}
          type="text"
          value={answers[fieldKey]}
          onChange={(e) => handleChange(fieldKey, e.target.value)}
          disabled={locked || isCorrect}
          autoComplete="off"
          style={{...({
            width: "100%",
            fontSize: "15px",
            background: "transparent",
            outline: "none",
            color: showed ? "#ef4444" : "#1a1a1a",
            padding: "2px 6px",
          }),color:"#1a1a1a",boxShadow:showed||errors[fieldKey]===false?"inset 0 -2px #16a34a":errors[fieldKey]===true?"inset 0 -2px #ef4444":undefined,borderBottomColor:showed||errors[fieldKey]===false?"#16a34a":errors[fieldKey]===true?"#ef4444":undefined}}
        />
        {isError && (
          <div style={{
            position: "absolute", right: "-22px", top: "0",
            width: "18px", height: "18px", background: "#ef4444",
            color: "white", borderRadius: "50%", fontSize: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)", zIndex: 3,
          }}>✕</div>
        )}
      </div>
    );
  };

  const cellStyle = {
    border: "2px solid #2195a6",
    padding: "10px 14px",
    fontSize: "15px",
    color: "#1a1a1a",
  };

  const headerStyle = {
    ...cellStyle,
    background: "rgb(33, 149, 166)",
    fontWeight: "600",
    textAlign: "center",
    color : "white"
  };

  return (
    <div data-adapt-scope="unit10_ComprehensionA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit10_ComprehensionA"] input:focus-visible, [data-adapt-scope="unit10_ComprehensionA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_ComprehensionA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_ComprehensionA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_ComprehensionA"] input:focus-visible {outline-offset:-4px;position:relative;z-index:1;} [data-adapt-scope="unit10_ComprehensionA"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Complete the table below.
      </h5>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: "20%" }}></th>
            <th style={{ ...headerStyle, width: "40%" }}>Clothes</th>
            <th style={{ ...headerStyle, width: "40%" }}>What to take with you</th>
          </tr>
        </thead>
        <tbody>
          {/* Arctic/cold */}
          <tr>
            <td style={cellStyle}>Arctic/cold</td>
            <td style={cellStyle}>layered/warm</td>
            <td style={{ ...cellStyle, paddingRight: "28px" }}>
              {renderInputCell("arctic_take")}
            </td>
          </tr>

          {/* desert */}
          <tr>
            <td style={cellStyle}>desert</td>
            <td style={{ ...cellStyle, paddingRight: "28px" }}>
              {renderInputCell("desert_clothes")}
            </td>
            <td style={{ ...cellStyle, paddingRight: "28px" }}>
              {renderInputCell("desert_take")}
            </td>
          </tr>

          {/* rainforest */}
          <tr>
            <td style={cellStyle}>rainforest</td>
            <td style={{ ...cellStyle, paddingRight: "28px" }}>
              {renderInputCell("rainforest_clothes")}
            </td>
            <td style={{ ...cellStyle, paddingRight: "28px" }}>
              {renderInputCell("rainforest_take")}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow"><FaRedo size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Reset</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow"><FaEye size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Show Answer</span>
        </div>

        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow"><FaCheck size={14} /></span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Check Answer</span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionA;