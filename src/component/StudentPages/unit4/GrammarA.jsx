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



const GrammarA = () => {
 const [examples,setExamples] = useState([["girl","shorter","boy"],["blue ball","heaviest"]]);
 const [announcement,setAnnouncement] = useState("");
 const choose = (row,words) => {setExamples(prev=>prev.map((value,i)=>i===row?words:value));setAnnouncement(row===0?`The ${words[0]} is ${words[1]} than the ${words[2]}.`:`The ${words[0]} is the ${words[1]}.`);};
  return (
    <div data-adapt-scope="unit4_GrammarA" className="mb-6 mx-auto">
<style>{`[data-adapt-scope="unit4_GrammarA"] input:focus-visible, [data-adapt-scope="unit4_GrammarA"] [data-keyboard-choice]:focus-visible, [data-adapt-scope="unit4_GrammarA"] [data-grid-cell]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
              The <span className="text-[#f89631]">{examples[0][0]}</span> is{" "}
              <span className="text-[#f89631]">{examples[0][1]}</span> than the{" "}
              <span className="text-[#f89631]">{examples[0][2]}</span>.
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use firefighter, taller, baker in example 1" aria-pressed={examples[0].join("|") === ["firefighter","taller","baker"].join("|")} onClick={()=>choose(0,["firefighter","taller","baker"])}><b>1</b> firefighter, taller, baker</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use grandma, older, grandpa in example 1" aria-pressed={examples[0].join("|") === ["grandma","older","grandpa"].join("|")} onClick={()=>choose(0,["grandma","older","grandpa"])}><b>2</b> grandma, older, grandpa</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use lion, braver, mouse in example 1" aria-pressed={examples[0].join("|") === ["lion","braver","mouse"].join("|")} onClick={()=>choose(0,["lion","braver","mouse"])}><b>3</b> lion, braver, mouse</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use car, shinier, van in example 1" aria-pressed={examples[0].join("|") === ["car","shinier","van"].join("|")} onClick={()=>choose(0,["car","shinier","van"])}><b>4</b> car, shinier, van</span>
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
              The <span className="text-[#f89631]">{examples[1][0]}</span> is the{" "}
              <span className="text-[#f89631]">{examples[1][1]}</span>.
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-5 text-[17px]">
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use basketball, lightest in example 2" aria-pressed={examples[1].join("|") === ["basketball","lightest"].join("|")} onClick={()=>choose(1,["basketball","lightest"])}><b>1</b> basketball, lightest</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use teacher, oldest in example 2" aria-pressed={examples[1].join("|") === ["teacher","oldest"].join("|")} onClick={()=>choose(1,["teacher","oldest"])}><b>2</b> teacher, oldest</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use cheetah, strongest in example 2" aria-pressed={examples[1].join("|") === ["cheetah","strongest"].join("|")} onClick={()=>choose(1,["cheetah","strongest"])}><b>3</b> cheetah, strongest</span>
              <span role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Use elephant, largest in example 2" aria-pressed={examples[1].join("|") === ["elephant","largest"].join("|")} onClick={()=>choose(1,["elephant","largest"])}><b>4</b> elephant, largest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;