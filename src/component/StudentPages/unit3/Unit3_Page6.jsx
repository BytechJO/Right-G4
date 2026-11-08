// import React, { useState } from "react";
import page_6 from "../../../assets/imgs/pages/Class Book/Right 4 Unit 3 Harley Eats All the Sweets Folder/Page 27.png";
// import song from "../../../assets/img_unit3/sounds-unit3/Pg15.Sing_Adult Lady.mp3";
import "./Unit3_Page6.css";
// import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
const pageKeys = { onKeyDown: event => { if(event.key !== "Enter" && event.key !== " ") return; event.preventDefault(); event.stopPropagation(); if(!event.repeat) event.currentTarget.dispatchEvent(new MouseEvent("click", {bubbles:true,cancelable:true})); }, onKeyUp: event => { if(event.key === "Enter" || event.key === " "){event.preventDefault();event.stopPropagation();} } };


const Unit3_Page6 = ({ openPopup }) => {


  return (
    <div
      className="page1-img-wrapper" data-unit3-scope="Unit3_Page6" role="group" aria-label="Unit 3, page 27. Written activities: questions about a bedroom, picture activities and questions with hints."
      style={{ backgroundImage: `url(${page_6})` }}
    >
 <style>{`[data-unit3-scope="Unit3_Page6"] :focus-visible { outline:4px solid #2563eb; outline-offset:3px; border-radius:6px; }`}</style>
      {/* <img src={page_6} /> */}

      <div
        className="click-icon-unit3-page6-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 1"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 25 })}
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
        className="click-icon-unit3-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 2"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 26 })}
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
      </div>    <div
        className="click-icon-unit3-page6-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg role="button" tabIndex={0} data-keyboard-choice {...pageKeys} aria-label={"Open exercise 3"}
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 27 })}
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

export default Unit3_Page6;
