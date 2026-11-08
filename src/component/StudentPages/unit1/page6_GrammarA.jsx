import { useState } from "react";
import img from "../../../assets/Page 01/Rabbit.svg";
const GrammarA = () => {
  const [places, setPlaces] = useState(["theater", "kitchen"]);
  const [announcement, setAnnouncement] = useState("");
  const choosePlace = (row, place) => {
    setPlaces((previous) => previous.map((value, index) => index === row ? place : value));
    setAnnouncement(row === 0 ? `She will go to the ${place}.` : `I won’t go into the ${place}.`);
  };
  const choiceKeys = {
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
  return (
    <div className="grammar-a">
      <style>{`
        .grammar-a .grammar-place {
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
        }
        .grammar-a .grammar-place:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
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
            <p className=" text-[18px]">
              She will go to the{" "}
              <span className="text-[#12C8F9]">{places[0]}</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <button type="button" className="grammar-place" aria-pressed={places[0] === "beach"} aria-label="Use beach in example 1" onClick={() => choosePlace(0, "beach")} {...choiceKeys}>
                <b>1</b> beach
              </button>
                       <button type="button" className="grammar-place" aria-pressed={places[0] === "museum"} aria-label="Use museum in example 1" onClick={() => choosePlace(0, "museum")} {...choiceKeys}>
                <b>2</b> museum
              </button>
              <button type="button" className="grammar-place" aria-pressed={places[0] === "library"} aria-label="Use library in example 1" onClick={() => choosePlace(0, "library")} {...choiceKeys}>
                <b>3</b> library
              </button>
              </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              I won’t go into the {" "}
              <span className="text-[#12C8F9]">{places[1]}</span>. 
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <button type="button" className="grammar-place" aria-pressed={places[1] === "living room"} aria-label="Use living room in example 2" onClick={() => choosePlace(1, "living room")} {...choiceKeys}>
                <b>1</b> living room
              </button>
              <button type="button" className="grammar-place" aria-pressed={places[1] === "basement"} aria-label="Use basement in example 2" onClick={() => choosePlace(1, "basement")} {...choiceKeys}>
                <b>2</b> basement
              </button>
              <button type="button" className="grammar-place" aria-pressed={places[1] === "garage"} aria-label="Use garage in example 2" onClick={() => choosePlace(1, "garage")} {...choiceKeys}>
                <b>3</b> garage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
