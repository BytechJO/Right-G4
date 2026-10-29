import React,{useState} from "react";
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



const GrammarA = () => {const [examples,setExamples]=useState(["played soccer","fix the car"]);const [announcement,setAnnouncement]=useState("");const choose=(row,text)=>{setExamples(prev=>prev.map((v,i)=>i===row?text:v));setAnnouncement(row===0?`She ${text}.`:`Did he ${text}?`);};
  return (
    <div data-adapt-scope="unit8_GrammarA">
<style>{`[data-adapt-scope="unit8_GrammarA"] input:focus-visible, [data-adapt-scope="unit8_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit8_GrammarA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit8_GrammarA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
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
              She <span className="text-[#f89631]">{examples[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="jumped rope"} onClick={()=>choose(0,"jumped rope")}><b>1</b> jumped rope</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="chopped vegetables"} onClick={()=>choose(0,"chopped vegetables")}><b>2</b> chopped vegetables</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="washed dishes"} onClick={()=>choose(0,"washed dishes")}><b>3</b> washed dishes</span>
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
              Did he <span className="text-[#f89631]">{examples[1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="ride the bike"} onClick={()=>choose(1,"ride the bike")}><b>1</b> ride the bike</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="clear the table"} onClick={()=>choose(1,"clear the table")}><b>2</b> clear the table</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="wash the car"} onClick={()=>choose(1,"wash the car")}><b>3</b> wash the car</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;