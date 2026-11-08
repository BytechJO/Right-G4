import React, {useState} from "react";
import img from "../../../assets/Page 01/Rabbit.svg";
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



const GrammarA = () => {const [examples,setExamples]=useState(["meat","cookies"]);const [announcement,setAnnouncement]=useState("");const choose=(row,text)=>{setExamples(prev=>prev.map((value,i)=>i===row?text:value));setAnnouncement(row===0?`There was ${text}.`:`Were there any ${text}?`);};
  return (
    <div data-adapt-scope="unit7_GrammarA">
<style>{`[data-adapt-scope="unit7_GrammarA"] input:focus-visible, [data-adapt-scope="unit7_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit7_GrammarA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
              There was <span className="text-[#f89631]">{examples[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="fish"} onClick={()=>choose(0,"fish")}><b>1</b> fish</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="honey"} onClick={()=>choose(0,"honey")}><b>2</b> honey</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="chicken"} onClick={()=>choose(0,"chicken")}><b>3</b> chicken</span>
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
              Were there any <span className="text-[#f89631]">{examples[1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="brownies"} onClick={()=>choose(1,"brownies")}><b>1</b> brownies</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="apples"} onClick={()=>choose(1,"apples")}><b>2</b> apples</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="donuts"} onClick={()=>choose(1,"donuts")}><b>3</b> donuts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;