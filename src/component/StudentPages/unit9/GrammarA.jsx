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



const GrammarA = () => {const [examples,setExamples]=useState(["tigers","spiders"]);const [announcement,setAnnouncement]=useState("");const choose=(row,text)=>{setExamples(prev=>prev.map((v,i)=>i===row?text:v));setAnnouncement(row===0?`Because I like ${text}.`:`Because I am scared of ${text}.`);};
  return (
    <div data-adapt-scope="unit9_GrammarA">
<style>{`[data-adapt-scope="unit9_GrammarA"] input:focus-visible, [data-adapt-scope="unit9_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit9_GrammarA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit9_GrammarA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit9_GrammarA"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
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
              Because I like <span className="text-[#f89631]">{examples[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="flying"} onClick={()=>choose(0,"flying")}><b>1</b> flying</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="apples"} onClick={()=>choose(0,"apples")}><b>2</b> apples</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="libraries"} onClick={()=>choose(0,"libraries")}><b>3</b> libraries</span>
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
              Because I'm scared of <span className="text-[#f89631]">{examples[1]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="bugs"} onClick={()=>choose(1,"bugs")}><b>1</b> bugs</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="lions"} onClick={()=>choose(1,"lions")}><b>2</b> lions</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="fire"} onClick={()=>choose(1,"fire")}><b>3</b> fire</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;