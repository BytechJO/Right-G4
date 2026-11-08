import React from "react";
import page2 from "../../../assets/imgs/pages/Activity Book/Right Int WB G4 U3 Folder/Page 19.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};



const WB_Unit1_Page7 = ({ openPopup }) => {
 return (
      <div data-workbook-page="19" role="group" aria-label="Workbook Unit 3, page 19 exercise launchers"
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page2})` }}
      ><style>{`[data-workbook-page="19"] :focus-visible {outline:3px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="q10-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Open exercise 1"
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 30 })}
            style={{ overflow: "visible" }}
            // className="click-icon-page8-2 hover:scale-110 transition"
          >
            <image
              className="svg-img"
              href={arrowBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
  
        <div
          className="q11-3 hover:scale-110 transition "
          style={{ overflow: "visible" }}
        >
          <svg role="button" tabIndex={0} data-keyboard-choice {...activationKeys} aria-label="Open exercise 2"
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("exercise", { startIndex: 31 })}
            style={{ overflow: "visible" }}
            // className="click-icon-page8-2 hover:scale-110 tra5nsition"
          >
            <image
              className="svg-img"
              href={arrowBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
      </div>
    );
};

export default WB_Unit1_Page7;
