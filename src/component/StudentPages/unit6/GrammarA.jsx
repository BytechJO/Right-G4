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



const GrammarA = () => {const [examples,setExamples]=useState(["eat your vegetables","slam the door"]);const [announcement,setAnnouncement]=useState("");const choose=(row,text)=>{setExamples(prev=>prev.map((value,i)=>i===row?text:value));setAnnouncement(`You ${row===0?"should":"should not"} ${text}.`);};
  return (
    <div data-adapt-scope="unit6_GrammarA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit6_GrammarA"] input:focus-visible, [data-adapt-scope="unit6_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit6_GrammarA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
              You should{" "}
              <span className="text-[#f89631]">{examples[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="wash the dishes"} onClick={()=>choose(0,"wash the dishes")}><b>1</b> wash the dishes</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="clean your room"} onClick={()=>choose(0,"clean your room")}><b>2</b> clean your room</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="take out the trash"} onClick={()=>choose(0,"take out the trash")}><b>3</b> take out the trash</span>
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
              You shouldn't{" "}
              <span className="text-[#f89631]">{examples[1]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="play in the street"} onClick={()=>choose(1,"play in the street")}><b>1</b> play in the street</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="drive fast"} onClick={()=>choose(1,"drive fast")}><b>2</b> drive fast</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="watch TV"} onClick={()=>choose(1,"watch TV")}><b>3</b> watch TV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;