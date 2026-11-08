import ExerciseHeader from "../../ExerciseHeader";
import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import img1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 24/SVG/Asset 3.svg";
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

const GrammarB = () => {
  const questions = [
    {
      image: img1,
      qPrefix: "Q: Did he",
      qSuffix: "?",
      aPrefix: "A: No,",
      aSuffix: ".",
      qAnswers: ["have a drum", "have a drum?"],
      aAnswers: ["he didn't", "he did not"],
    },
    {
      image: img2,
      qPrefix: "Q: Did",
      qMiddle: "she",
      qSuffix: "?",
      aPrefix: "A: Yes,",
      aSuffix: ".",
      qField1Answers: ["Did", "did"],
      qAnswers: ["have a doll", "have a doll?"],
      aAnswers: ["she did"],
      hasQField1: true,
    },
    {
      image: img3,
      qPrefix: "Q: Did",
      qMiddle: "you",
      qSuffix: "?",
      aPrefix: "A: No,",
      aSuffix: ".",
      qField1Answers: ["Did", "did"],
      qAnswers: ["have a car", "have a car?"],
      aAnswers: ["I didn't", "I did not"],
      hasQField1: true,
    },
  ];

  const initialAnswers = questions.map(() => ({
    qField1: "",
    q: "",
    a: "",
  }));

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const [showed, setShowed] = useState(false);

  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const handleChange = (qIndex, field, value) => {
    const key = `${qIndex}_${field}`;
    if (locked || errors[key] === false) return;
    const updated = [...answers];
    updated[qIndex] = { ...updated[qIndex], [field]: value };
    setAnswers(updated);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((ans, i) => {
      const q = questions[i];
      return (
        ans.q.trim() === "" ||
        ans.a.trim() === "" ||
        (q.hasQField1 && ans.qField1.trim() === "")
      );
    });

    if (isEmpty) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correctCount = 0;
    let totalFields = 0;
    const newErrors = {};
    const normalize = normalizeAnswer;

    questions.forEach((q, i) => {
      // Q main field
      totalFields++;
      const qCorrect = q.qAnswers.some(
        (a) => normalize(a) === normalize(answers[i].q),
      );
      newErrors[`${i}_q`] = !qCorrect;
      if (qCorrect) correctCount++;

      // A field
      totalFields++;
      const aCorrect = q.aAnswers.some(
        (a) => normalize(a) === normalize(answers[i].a),
      );
      newErrors[`${i}_a`] = !aCorrect;
      if (aCorrect) correctCount++;

      // Q field1 (Did)
      if (q.hasQField1) {
        totalFields++;
        const f1Correct = q.qField1Answers.some(
          (a) => normalize(a) === normalize(answers[i].qField1),
        );
        newErrors[`${i}_qField1`] = !f1Correct;
        if (f1Correct) correctCount++;
      }
    });

    // mark correct ones
    Object.keys(newErrors).forEach((k) => {
      if (newErrors[k] === false || newErrors[k] === true) {
        if (!newErrors[k]) newErrors[k] = false;
      }
    });

    questions.forEach((q, i) => {
      if (!newErrors[`${i}_q`]) newErrors[`${i}_q`] = false;
      else newErrors[`${i}_q`] = true;
      if (!newErrors[`${i}_a`]) newErrors[`${i}_a`] = false;
      else newErrors[`${i}_a`] = true;
      if (q.hasQField1) {
        if (!newErrors[`${i}_qField1`]) newErrors[`${i}_qField1`] = false;
        else newErrors[`${i}_qField1`] = true;
      }
    });

    setErrors(newErrors);
    setAnnouncement(
      `Score: ${correctCount} out of ${totalFields}. Correct answers are locked; incorrect answers can be changed.`,
    );

    const color =
      correctCount === totalFields
        ? "green"
        : correctCount === 0
          ? "red"
          : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${totalFields}
        </span>
      </div>
    `;

    if (correctCount === totalFields) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(
      questions.map((q) => ({
        qField1: q.hasQField1 ? "Did" : "",
        q: q.qAnswers[0],
        a: q.aAnswers[0],
      })),
    );
    setErrors({});
    setLocked(true);
    setShowed(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Correct answers shown and locked.");
  };

  const handleReset = () => {
    setAnswers(questions.map(() => ({ qField1: "", q: "", a: "" })));
    setErrors({});
    setLocked(false);
    setShowed(false);
    setAnnouncement("Answers and feedback cleared.");
  };

  const renderInput = ({ qIndex, field, width = "200px" }) => {
    const key = `${qIndex}_${field}`;
    const isError = errors[key] === true;
    const isCorrect = errors[key] === false;
    return (
      <div className="relative inline-flex items-center">
        <input
          {...fieldKeys}
          aria-label={`Question ${qIndex + 1}. ${field === "a" ? "Complete the answer after " + questions[qIndex].aPrefix : field === "qField1" ? "Complete the first question blank before " + questions[qIndex].qMiddle : "Complete the question after " + (questions[qIndex].qMiddle || questions[qIndex].qPrefix)}`}
          title={`Question ${qIndex + 1}. ${field === "a" ? "Complete the answer after " + questions[qIndex].aPrefix : field === "qField1" ? "Complete the first question blank before " + questions[qIndex].qMiddle : "Complete the question after " + (questions[qIndex].qMiddle || questions[qIndex].qPrefix)}`}
          placeholder="Word(s)"
          type="text"
          value={answers[qIndex][field]}
          onChange={(e) => handleChange(qIndex, field, e.target.value)}
          disabled={locked || isCorrect}
          autoComplete="off"
          style={{ fontSize: "18px", width, padding: "0" }}
          className={`border-b-1 bg-transparent outline-none text-center transition disabled:pointer-events-none
            ${
              isError
                ? "border-red-500 text-gray-800"
                : showed || isCorrect
                  ? "border-green-600 text-gray-800"
                  : "border-[#333] text-gray-800"
            }
          `}
        />
        {isError && (
          <div
            style={{
              position: "absolute",
              right: "-24px",
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
    );
  };

  return (
    <div data-unit3-scope="GrammarB" className="mb-6 mx-auto">
      <style>{`[data-unit3-scope="GrammarB"] input:focus-visible, [data-unit3-scope="GrammarB"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
       <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Look, read, and write questions and answers.
      </h5>

      <div className="flex flex-col gap-8">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-6">
            {/* Image */}
            <img
              src={q.image}
              alt={
                [
                  "A red and yellow drum with two drumsticks.",
                  "A doll with dark pigtails and a pink dress.",
                  "A blue car.",
                ][i]
              }
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            {/* Q and A */}
            <div className="flex flex-col gap-3 flex-1">
              {/* Question */}
              <div
                className="flex items-end gap-2 flex-wrap"
                style={{ fontSize: "18px" }}
              >
                {q.hasQField1 ? (
                  <>
                    <span>Q:</span>
                    {renderInput({
                      qIndex: i,
                      field: "qField1",
                      width: "80px",
                    })}
                    <span>{q.qMiddle}</span>
                    {renderInput({ qIndex: i, field: "q", width: "200px" })}
                    <span>{q.qSuffix}</span>
                  </>
                ) : (
                  <>
                    <span>{q.qPrefix}</span>
                    {renderInput({ qIndex: i, field: "q", width: "220px" })}
                    <span>{q.qSuffix}</span>
                  </>
                )}
              </div>

              {/* Answer */}
              <div
                className="flex items-end gap-2 flex-wrap"
                style={{ fontSize: "18px" }}
              >
                <span>{q.aPrefix}</span>
                {renderInput({ qIndex: i, field: "a", width: "220px" })}
                <span>{q.aSuffix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
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

        <div className="relative group">
          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
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
          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
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

export default GrammarB;
