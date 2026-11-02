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



const GrammarA = () => {const [examples,setExamples]=useState(["desert","slam the door"]);const [announcement,setAnnouncement]=useState("");const choose=(row,text)=>{setExamples(prev=>prev.map((v,i)=>i===row?text:v));setAnnouncement(row===0?`I have been to the ${text}.`:`She has ${text}.`);};
  return (
    <div data-adapt-scope="unit10_GrammarA">
<style>{`[data-adapt-scope="unit10_GrammarA"] input:focus-visible, [data-adapt-scope="unit10_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit10_GrammarA"] [data-grid-cell]:focus-visible, [data-adapt-scope="unit10_GrammarA"] [data-listening]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;} [data-adapt-scope="unit10_GrammarA"] input[aria-invalid="true"]:focus-visible {border-bottom-color:#ef4444 !important;}`}</style>
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
             I have been to the {" "}
              <span className="text-[#f89631]">{examples[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="Dead Sea"} onClick={()=>choose(0,"Dead Sea")}><b>1</b> Dead Sea</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="beach"} onClick={()=>choose(0,"beach")}><b>2</b> beach</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[0]==="mall"} onClick={()=>choose(0,"mall")}><b>3</b> mall</span>
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
              She has{" "}
              <span className="text-[#f89631]">{examples[1]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="taken a picture"} onClick={()=>choose(1,"taken a picture")}><b>1</b> taken a picture</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="skated on the pond"} onClick={()=>choose(1,"skated on the pond")}><b>2</b> skated on the pond</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-pressed={examples[1]==="flown in a place"} onClick={()=>choose(1,"flown in a place")}><b>3</b> flown in a place</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;