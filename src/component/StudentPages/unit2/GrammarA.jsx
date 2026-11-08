import React, { useState } from "react";
import img from "../../../assets/Page 01/Rabbit.svg";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};


const GrammarA = () => {
  const [phrases, setPhrases] = useState(["eat quickly", "on the weekend"]);
  const [announcement, setAnnouncement] = useState("");
  const choose = (row, phrase) => {
    setPhrases((previous) => previous.map((value, index) => index === row ? phrase : value));
    setAnnouncement(row === 0 ? `I am going to ${phrase}.` : `What are they going to do ${phrase}?`);
  };
  return (
    <div data-unit2-scope="GrammarA">
      <style>{`
        [data-unit2-scope="GrammarA"] input:focus-visible,
        [data-unit2-scope="GrammarA"] [data-keyboard-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
        
      `}</style>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-4">
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              I am going to{" "}
              <span className="text-[#f89631]">{phrases[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[0] === "read quietly"} aria-label="Use read quietly in example 1" onClick={() => choose(0, "read quietly")} {...activationKeys}><b>1</b> read quietly</span>
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[0] === "watch closely"} aria-label="Use watch closely in example 1" onClick={() => choose(0, "watch closely")} {...activationKeys}><b>2</b> watch closely</span>
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[0] === "sew carefully"} aria-label="Use sew carefully in example 1" onClick={() => choose(0, "sew carefully")} {...activationKeys}><b>3</b> sew carefully</span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-2 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              What are they going to do{" "}
              <span className="text-[#f89631]">{phrases[1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[1] === "today"} aria-label="Use today in example 2" onClick={() => choose(1, "today")} {...activationKeys}><b>1</b> today</span>
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[1] === "tomorrow"} aria-label="Use tomorrow in example 2" onClick={() => choose(1, "tomorrow")} {...activationKeys}><b>2</b> tomorrow</span>
              <span role="button" tabIndex={0} data-keyboard-choice aria-pressed={phrases[1] === "next week"} aria-label="Use next week in example 2" onClick={() => choose(1, "next week")} {...activationKeys}><b>3</b> next week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;