import React, { useState } from "react";
import page_1 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 4 Joy Makes a Friend Folder/Page 34.png";
import "./Review3_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const pageKeys = {onKeyDown:event=>{if(event.key!=="Enter" && event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true}));},onKeyUp:event=>{if(event.key==="Enter" || event.key===" "){event.preventDefault();event.stopPropagation();}}};

// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Review3_Page1 = ({ openPopup }) => {

  return (
    <div data-page-scope="review3&4_Review3_Page1" role="group" aria-label="Review 3 and 4 page with activity launchers"
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_1})` }}
    ><style>{`[data-page-scope="review3&4_Review3_Page1"] [data-keyboard-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      {/* <img src={page_1} /> */}
      <div
        className="click-icon-review4-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 1"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 35 })}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-review4-page1-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 2"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 36 })}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>     <div
        className="click-icon-review4-page1-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 3"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 37 })}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
     
    </div>
  );
};

export default Review3_Page1;
