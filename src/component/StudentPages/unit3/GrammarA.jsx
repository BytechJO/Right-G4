import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";
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
  const [phrases, setPhrases] = useState(["whistle", "house"]);
  const [announcement, setAnnouncement] = useState("");
  const choose = (row, word) => {
    setPhrases((prev) => prev.map((value, i) => (i === row ? word : value)));
    setAnnouncement(
      row === 0 ? `He had a ${word}.` : `Did they have a ${word}?`,
    );
  };
  return (
    <div data-unit3-scope="GrammarA" className="mb-6 mx-auto">
      <style>{`[data-unit3-scope="GrammarA"] input:focus-visible, [data-unit3-scope="GrammarA"] [data-keyboard-choice]:focus-visible { outline: 4px solid #2563eb; outline-offset: 3px; border-radius: 6px; }`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
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
              He had a <span className="text-[#f89631]">{phrases[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[0] === "motorcycle"}
                aria-label="Use motorcycle in example 1"
                onClick={() => choose(0, "motorcycle")}
              >
                <b>1</b> motorcycle
              </span>
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[0] === "rabbit"}
                aria-label="Use rabbit in example 1"
                onClick={() => choose(0, "rabbit")}
              >
                <b>2</b> rabbit
              </span>
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[0] === "computer"}
                aria-label="Use computer in example 1"
                onClick={() => choose(0, "computer")}
              >
                <b>3</b> computer
              </span>
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
              Did they have a{" "}
              <span className="text-[#f89631]">{phrases[1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[600px]">
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[1] === "car"}
                aria-label="Use car in example 2"
                onClick={() => choose(1, "car")}
              >
                <b>1</b> car
              </span>
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[1] === "swimming pool"}
                aria-label="Use swimming pool in example 2"
                onClick={() => choose(1, "swimming pool")}
              >
                <b>2</b> swimming pool
              </span>
              <span
                role="button"
                tabIndex={0}
                data-keyboard-choice
                {...activationKeys}
                aria-pressed={phrases[1] === "boat"}
                aria-label="Use boat in example 2"
                onClick={() => choose(1, "boat")}
              >
                <b>3</b> boat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
