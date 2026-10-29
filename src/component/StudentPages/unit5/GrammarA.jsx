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



const GrammarA = () => {const [examples,setExamples]=useState([["under","table"],["by","desk"]]);const [announcement,setAnnouncement]=useState("");const choose=(row,words)=>{setExamples(prev=>prev.map((value,i)=>i===row?words:value));setAnnouncement(row===0?`Lolo is ${words[0]} the ${words[1]}.`:`Is Lolo ${words[0]} the ${words[1]}?`);};
  return (
    <div data-adapt-scope="unit5_GrammarA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit5_GrammarA"] input:focus-visible, [data-adapt-scope="unit5_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit5_GrammarA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
              Lolo is{" "}
              <span className="text-[#f89631]">{examples[0][0]}</span> the{" "}
              <span className="text-[#f89631]">{examples[0][1]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0].join("|")===["on","couch"].join("|")} onClick={()=>choose(0,["on","couch"])}><b>1</b> on, couch</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0].join("|")===["by","bed"].join("|")} onClick={()=>choose(0,["by","bed"])}><b>2</b> by, bed</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0].join("|")===["over","roof"].join("|")} onClick={()=>choose(0,["over","roof"])}><b>3</b> over, roof</span>
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
              Is Lolo{" "}
              <span className="text-[#f89631]">{examples[1][0]}</span> the{" "}
              <span className="text-[#f89631]">{examples[1][1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1].join("|")===["near","TV"].join("|")} onClick={()=>choose(1,["near","TV"])}><b>1</b> near, TV</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1].join("|")===["beside","chair"].join("|")} onClick={()=>choose(1,["beside","chair"])}><b>2</b> beside, chair</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1].join("|")===["next to","bike"].join("|")} onClick={()=>choose(1,["next to","bike"])}><b>3</b> next to, bike</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;