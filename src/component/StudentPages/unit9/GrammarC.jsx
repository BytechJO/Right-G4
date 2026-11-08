import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 17.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 48/SVG/Asset 16.svg";
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



const GrammarC = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      sentence: "You shouldn't eat much sugar.",
      correct: 0,
    },
    {
      id: 2,
      image: img2,
      sentence: "You should ride your skateboard.",
      correct: 0,
    },
    {
      id: 3,
      image: img3,
      sentence: "You should do your homework.",
      correct: 1,
    },
  ];

  const [selected, setSelected] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleSelect = (qId, imgIndex) => {
    if (locked || errors[qId] === false) return;
    setSelected((prev) => ({ ...prev, [qId]: imgIndex }));setErrors(prev=>{const next={...prev};delete next[qId];return next;});setAnnouncement("Picture selected.");
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = questions.some((q) => selected[q.id] === null);
    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    questions.forEach((q) => {
      if (selected[q.id] === q.correct) {
        correctCount++;
        newErrors[q.id] = false;
      } else {
        newErrors[q.id] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount} out of ${questions.length}. Correct choices are locked.`);
    const total = questions.length;
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
    setSelected(Object.fromEntries(questions.map((q) => [q.id, q.correct])));
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct pictures shown and locked.");
  };

  const handleReset = () => {
    setSelected(Object.fromEntries(questions.map((q) => [q.id, null])));
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Selections and feedback cleared.");
  };

  const renderHalfImage = (q, imgIndex) => {
    const isSelected = selected[q.id] === imgIndex;
    const isWrong = errors[q.id] === true;
    

    return (
      <div role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label={`Question ${q.id}. ${q.sentence} Picture ${imgIndex+1}.`} aria-pressed={isSelected} aria-disabled={locked||errors[q.id]===false}
        onClick={() => handleSelect(q.id, imgIndex)}
        style={{...({
          flex: 1,
          overflow: "hidden",
          position: "relative",
          cursor: locked ? "default" : "pointer",
  
        }),borderRadius:6,outline:isSelected?`3px solid ${showed||errors[q.id]===false?"#16a34a":isWrong?"#ef4444":"#2563eb"}`:undefined,outlineOffset:-3,backgroundColor:isSelected&&!showed&&errors[q.id]===undefined?"#dbeafe":undefined}}
      >
        {/* Half image */}
        <img
          src={q.image}
          alt={q.id===3?"Two pictures of a girl with a dessert and a healthy snack.":"Two pictures of a skateboarder and a helmeted cyclist."}
          style={{
            width: "100%",
            height : "auto ", 
            display: "block",
          }}
        />

        {/* Checkmark circle */}
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `2px solid ${isSelected ? (isWrong ? "#ef4444" : showed||errors[q.id]===false?"#16a34a":"#2195a6") : "#ccc"}`,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelected && (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <polyline
                points="4,12 9,18 20,6"
                stroke={isWrong ? "#ef4444" : showed||errors[q.id]===false?"#16a34a":"#2195a6"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* ❌ Error Badge */}
        {isWrong && isSelected && (
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
              zIndex: 3,
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div data-adapt-scope="unit9_GrammarC" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit9_GrammarC"] input:focus-visible, [data-adapt-scope="unit9_GrammarC"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_GrammarC"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_GrammarC"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:-4px;border-radius:6px;} [data-adapt-scope="unit9_GrammarC"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Read and write ✓.
      </h5>

      <div className="grid grid-cols-3 gap-6">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-col gap-3">
            {/* Number */}
            <span
              style={{
                fontWeight: "400",
                WebkitTextStroke: "1px black",
                color: "#1a1a1a",
                fontSize: "18px",
              }}
            >
              {q.id}
            </span>

            {/* Split image */}
            <div style={{ display: "flex" }}>
              {renderHalfImage(q,0)}
              {renderHalfImage(q,1)}
            </div>

            {/* Sentence */}
            <p style={{ fontSize: "15px", color: "#1a1a1a", textAlign: "center" }}>
              {q.sentence}
            </p>
          </div>
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

export default GrammarC;