import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 35.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 27.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 28.svg";
import img4 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 6 Ready for School Folder/Page 47/SVG/SVG/Asset 29.svg";
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


const ComprehensionA = () => {
  // الترتيب الصح: img1=2, img2=4, img3=1, img4=3
  const images = [
    { id: 1, src: img1, answer: "2" },
    { id: 2, src: img2, answer: "4" },
    { id: 3, src: img3, answer: "1" },
    { id: 4, src: img4, answer: "3" },
  ];

  const [values, setValues] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);
  const inputRefs = useRef([]);

 const [announcement,setAnnouncement]=useState("");const resetButtonRef=useRef(null);
  const handleChange = (index, value) => {
    if (locked || errors[index] === false) return;
    // قبول رقم واحد بس
    if (value.length > 1) return;
    if (value !== "" && !/^[1-4]$/.test(value)) return;

    if(value && values.some((v,i)=>i!==index&&v===value)){setAnnouncement("That number is already used. Clear its previous box before moving it.");return;}
    setErrors(prev=>{const next={...prev};delete next[index];return next;});
    const updated = [...values];
    updated[index] = value;
    setValues(updated);

    // انتقل تلقائي للتالي
    if (value !== "" && index < images.length - 1) {
      // ابحث عن أول فراغ فاضي بعده
      const nextEmpty = updated.findIndex((v, i) => i > index && v === "" && errors[i] !== false);
      if (nextEmpty !== -1) {
        inputRefs.current[nextEmpty]?.focus();
      } else {
        // انتقل للتالي مباشرة
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = values.some((v) => v.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please fill in all boxes.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    images.forEach((img, i) => {
      if (values[i] === img.answer) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
      }
    });

    setErrors(newErrors);setAnnouncement(`Score: ${correctCount} out of ${images.length}. Correct answers are locked; incorrect answers can be changed.`);
    const total = images.length;
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
    setValues(images.map((img) => img.answer));
    setErrors({});
    setLocked(true);
    setShowed(true);resetButtonRef.current?.focus({preventScroll:true});setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setValues(["", "", "", ""]);
    setErrors({});
    setLocked(false);
    setShowed(false);setAnnouncement("Answers and feedback cleared.");
    inputRefs.current[0]?.focus();
  };

  return (
    <div data-adapt-scope="unit6_ComprehensionA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit6_ComprehensionA"] input:focus-visible, [data-adapt-scope="unit6_ComprehensionA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_ComprehensionA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Number the pictures to show the order for planting a vegetable garden.
      </h5>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => {
          const isError = errors[i] === true;
          const isCorrect = errors[i] === false;

          return (
            <div key={img.id} className="flex flex-col items-center gap-2">
              {/* Image with input badge */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={img.src}
                  alt={["A boy digging soil with a spade.","A person picking a cucumber from a plant.","A woman smoothing garden soil with a rake.","Water from a watering can falling onto garden plants."][i]}
                  style={{
                    width: "100%",
                    height : "auto"
                  }}
                />

                {/* Number Input Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1px",
                    right: "2px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background:  "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input {...fieldKeys} aria-label={`Picture ${i+1}. Enter its order in the story, from 1 to 4. Use each number once.`} title={`Picture ${i+1}. Story order, 1 to 4.`} placeholder="#" inputMode="numeric" aria-invalid={errors[i]===true}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    value={values[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={locked || isCorrect}
                    autoComplete="off"
                    maxLength={1}
                    style={{...({
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "black",
                      cursor: locked || isCorrect ? "default" : "text",
                    }),borderColor:showed||errors[i]===false?"#16a34a":errors[i]===true?"#ef4444":({
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "black",
                      cursor: locked || isCorrect ? "default" : "text",
                    }).borderColor}}
                  />
                </div>

                {/* ❌ Error Badge */}
                {isError && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "20px",
                      height: "20px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "11px",
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
        })}
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