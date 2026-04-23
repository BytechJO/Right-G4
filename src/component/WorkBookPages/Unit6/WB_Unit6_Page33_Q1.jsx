import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgHelen  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.1.svg";
import imgStella from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.2.svg";
import imgJohn   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.3.svg";
import imgHarley from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.4.svg";
import imgTom    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.5.svg";
import imgHansel from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/A.6.svg";

const NAME_BANK = ["Helen", "Stella", "John", "Harley", "Tom", "Hansel"];
const CORRECT_ORDER = ["Hansel", "Harley", "Helen", "John", "Stella", "Tom"];

const NAME_IMGS = {
  Hansel: imgHansel,
  Harley: imgHarley,
  Helen:  imgHelen,
  John:   imgJohn,
  Stella: imgStella,
  Tom:    imgTom,
};

const QUESTIONS = [
  { id: 1, question: "What is the first name?",  answer: "Hansel"         },
  { id: 2, question: "What is the fourth name?", answer: "John"           },
  { id: 3, question: "What is the sixth name?",  answer: "Tom"            },
  { id: 4, question: "What is the third name?",  answer: "Helen"          },
  { id: 5, question: "Is Hansel first?",         answer: "Yes, he is."    },
  { id: 6, question: "Is Helen fifth?",          answer: "No, she isn't." },
  { id: 7, question: "Is Stella third?",         answer: "No, she isn't." },
  { id: 8, question: "Is Tom sixth?",            answer: "Yes, he is."    },
];

const YES_NO_OPTIONS = ["Yes, he is.", "No, he isn't.", "Yes, she is.", "No, she isn't."];

const ErrorBadge = () => (
  <div style={{
    position:       "absolute",
    top:            -6,
    right:          -6,
    width:          16,
    height:         16,
    background:     "#ef4444",
    color:          "#fff",
    borderRadius:   "50%",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       9,
    fontWeight:     700,
    border:         "1.5px solid #fff",
    pointerEvents:  "none",
  }}>
    ✕
  </div>
);

export default function WB_Unit6_Page33_Q1() {
  const [orderAnswers, setOrderAnswers] = useState({ 1:"", 2:"", 3:"", 4:"", 5:"", 6:"" });
  const [qAnswers,     setQAnswers]     = useState({});
  const [checked,      setChecked]      = useState(false);
  const [showAns,      setShowAns]      = useState(false);
  const [wrongSlots,   setWrongSlots]   = useState({});
  const [wrongQIds,    setWrongQIds]    = useState({});

  const usedNames = Object.values(orderAnswers).filter(Boolean);

  const handleOrderSelect = (slot, name) => {
    if (showAns) return;
    setChecked(false);
    setWrongSlots({});
    setWrongQIds({});
    const newAnswers = { ...orderAnswers };
    Object.keys(newAnswers).forEach(k => {
      if (newAnswers[k] === name) newAnswers[k] = "";
    });
    newAnswers[slot] = name;
    setOrderAnswers(newAnswers);
  };

  const handleQSelect = (id, val) => {
    if (showAns) return;
    setChecked(false);
    setWrongSlots({});
    setWrongQIds({});
    setQAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    const allOrder = Object.values(orderAnswers).every(Boolean);
    const allQ     = QUESTIONS.every(q => qAnswers[q.id]);
    if (!allOrder || !allQ) {
      ValidationAlert.error("Please answer all questions first! ✏️");
      return;
    }

    const newWrongSlots = {};
    Object.entries(orderAnswers).forEach(([slot, name]) => {
      if (name !== CORRECT_ORDER[+slot - 1]) newWrongSlots[slot] = true;
    });

    const newWrongQIds = {};
    QUESTIONS.forEach(q => {
      if (qAnswers[q.id] !== q.answer) newWrongQIds[q.id] = true;
    });

    setWrongSlots(newWrongSlots);
    setWrongQIds(newWrongQIds);
    setChecked(true);
    setShowAns(false);

    const correct = (6 - Object.keys(newWrongSlots).length) + (QUESTIONS.length - Object.keys(newWrongQIds).length);
    const total   = 6 + QUESTIONS.length;

    if (correct === total) {
      ValidationAlert.success("Excellent! All correct! 🎉");
    } else {
      ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
    }
  };

  const handleShowAnswer = () => {
    const newOrder = {};
    CORRECT_ORDER.forEach((name, i) => { newOrder[i + 1] = name; });
    setOrderAnswers(newOrder);
    const newQ = {};
    QUESTIONS.forEach(q => { newQ[q.id] = q.answer; });
    setQAnswers(newQ);
    setWrongSlots({});
    setWrongQIds({});
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setOrderAnswers({ 1:"", 2:"", 3:"", 4:"", 5:"", 6:"" });
    setQAnswers({});
    setChecked(false);
    setShowAns(false);
    setWrongSlots({});
    setWrongQIds({});
  };

  // ستايل ثابت — بدون أي تغيير عند التحقق
  const qBtnStyle = (qId, option) => {
    const isSelected = qAnswers[qId] === option;
    return {
      background: isSelected ? "#3b82f6" : "#f3f4f6",
      color:      isSelected ? "#fff"    : "#374151",
      border:     isSelected ? "2px solid #3b82f6" : "2px solid #e5e7eb",
    };
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "18px" }}>

        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>{" "}
          Write the names in ABC order. Answer the questions.
        </h1>

        {/* Word Bank */}
        <div className="flex flex-wrap gap-2 justify-center p-3 bg-gray-50 rounded-2xl border border-gray-200">
          {NAME_BANK.map(name => (
            <span
              key={name}
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                background:     usedNames.includes(name) ? "#d1fae5" : "#f3f4f6",
                color:          usedNames.includes(name) ? "#16a34a" : "#374151",
                border:         usedNames.includes(name) ? "1.5px solid #86efac" : "1.5px solid #e5e7eb",
                textDecoration: usedNames.includes(name) ? "line-through" : "none",
              }}
            >
              {name}
            </span>
          ))}
        </div>

        {/* ── الجزء الأول: الترتيب ── */}
        <div className="flex flex-col gap-3">
          {[1,2,3,4,5,6].map(slot => (
            <div key={slot} className="flex items-center gap-3">

              <div style={{ width: 44, height: 44 }}>
                {orderAnswers[slot] && NAME_IMGS[orderAnswers[slot]] ? (
                  <img
                    src={NAME_IMGS[orderAnswers[slot]]}
                    alt={orderAnswers[slot]}
                    style={{ width: 44, height: 44, objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ width: 44, height: 44, background: "#f3f4f6", borderRadius: 8 }} />
                )}
              </div>

              <span className="font-bold text-gray-500 w-4">{slot}</span>

              <div style={{ position: "relative", display: "inline-block" }}>
                <select
                  disabled={showAns}
                  value={orderAnswers[slot]}
                  onChange={e => handleOrderSelect(slot, e.target.value)}
                  className="rounded-xl px-3 py-1 text-sm font-semibold outline-none"
                  style={{
                    border:     "2px solid #e5e7eb",
                    minWidth:   120,
                    background: "#fff",
                    color:      "#1f2937",
                    cursor:     showAns ? "default" : "pointer",
                  }}
                >
                  <option value="">— choose —</option>
                  {NAME_BANK.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>

                {checked && wrongSlots[slot] && <ErrorBadge />}
              </div>

            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* ── الجزء الثاني: الأسئلة ── */}
        <div className="grid grid-cols-1 gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {QUESTIONS.map(q => (
            <div key={q.id} className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-700">
                <span className="text-orange-400 font-bold mr-1">{q.id}</span>
                {q.question}
              </p>

              {q.id <= 4 ? (
                <div className="flex flex-wrap gap-1">
                  {CORRECT_ORDER.map(name => (
                    <button
                      key={name}
                      disabled={showAns}
                      onClick={() => handleQSelect(q.id, name)}
                      className="px-2 py-1 rounded-lg text-xs font-semibold transition-all relative"
                      style={qBtnStyle(q.id, name)}
                    >
                      {name}
                      {checked && qAnswers[q.id] === name && wrongQIds[q.id] && <ErrorBadge />}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {YES_NO_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      disabled={showAns}
                      onClick={() => handleQSelect(q.id, opt)}
                      className="px-2 py-1 rounded-lg text-xs font-semibold transition-all relative"
                      style={qBtnStyle(q.id, opt)}
                    >
                      {opt}
                      {checked && qAnswers[q.id] === opt && wrongQIds[q.id] && <ErrorBadge />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
            showAnswer={handleShowAnswer}
          />
        </div>

      </div>
    </div>
  );
}